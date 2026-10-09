import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findLocale } from "@/lib/locales";

async function sha(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, 40);
}

const localeSchema = z.string().max(10).refine((c) => { const l = findLocale(c); return !!l && c !== "en" && c !== "ar"; });

export const getTranslations = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ locale: localeSchema }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const out: Record<string, string> = {};
    for (let from = 0; from < 20000; from += 1000) {
      const { data: rows } = await supabaseAdmin.from("ui_translations").select("source, text").eq("locale", data.locale).range(from, from + 999);
      for (const r of rows ?? []) out[r.source] = r.text;
      if (!rows || rows.length < 1000) break;
    }
    return out;
  });

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ locale: localeSchema, texts: z.array(z.string().min(1).max(3000)).min(1).max(60) }).parse(d),
  )
  .handler(async ({ data }) => {
    const loc = findLocale(data.locale)!;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const texts = [...new Set(data.texts)];
    const hashes = await Promise.all(texts.map(sha));
    const { data: existing } = await supabaseAdmin.from("ui_translations").select("source, text").eq("locale", loc.code).in("source_hash", hashes);
    const out: Record<string, string> = {};
    for (const r of existing ?? []) out[r.source] = r.text;
    const missing = texts.filter((t) => !(t in out));
    if (!missing.length) return out;

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      try {
        const langCode = loc.code.startsWith("zh") ? loc.code : loc.code.split("-")[0];
        const rows: { locale: string; source: string; source_hash: string; text: string }[] = [];
        await Promise.all(
          missing.map(async (str) => {
            try {
              const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(str)}&langpair=en|${langCode}&de=support@migrafile.com`;
              const res = await fetch(url);
              const data = await res.json();
              const translated = data?.responseData?.translatedText;
              if (translated && !translated.startsWith("MYMEMORY WARNING")) {
                const cleaned = translated.replace(/^[^\w\s\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]+/i, "").trim();
                const resultText = cleaned || translated;
                rows.push({
                  locale: loc.code,
                  source: str,
                  source_hash: await sha(str),
                  text: resultText,
                });
                out[str] = resultText;
                return;
              }
            } catch {}
            rows.push({
              locale: loc.code,
              source: str,
              source_hash: await sha(str),
              text: str,
            });
            out[str] = str;
          }),
        );
        if (rows.length) {
          try {
            await supabaseAdmin.from("ui_translations").upsert(rows, { onConflict: "locale,source_hash" });
          } catch {}
        }
      } catch (err) {
        console.error("Fallback translateBatch error:", err);
      }
      return out;
    }
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { generateText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const system = `You translate UI text for MIGRAFILE, a U.S. immigration documentation website (not a law firm, not legal advice).
Translate each English string into ${loc.en}.${loc.dialect ? ` Use natural, friendly everyday wording of this dialect (${loc.name}), but keep official terms (form names, agency names, legal/document terms) precise and standard.` : ""}
Rules: keep form codes (I-130, N-400, DS-260...), agency names (USCIS, NVC, CEAC, IRS), "MIGRAFILE", URLs, emails, phone numbers, placeholders and formats like MM/DD/YYYY unchanged. Keep punctuation like "·", "—", "*" and leading/trailing spaces. Do not add explanations.
Return ONLY a valid JSON array of translated strings in the same order and same length as the input array.`;
    try {
      let rawText = "";
      try {
        const result = await generateText({
          model: provider("google/gemini-2.5-flash"),
          system,
          prompt: JSON.stringify(missing),
        });
        rawText = result.text;
      } catch {
        const resultFallback = await generateText({
          model: provider("openai/gpt-4o-mini"),
          system,
          prompt: JSON.stringify(missing),
        });
        rawText = resultFallback.text;
      }

      let cleaned = rawText.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      }
      const sIdx = cleaned.indexOf("[");
      const eIdx = cleaned.lastIndexOf("]");
      if (sIdx !== -1 && eIdx !== -1) {
        cleaned = cleaned.slice(sIdx, eIdx + 1);
      }
      const arr = JSON.parse(cleaned) as unknown[];
      if (!Array.isArray(arr) || arr.length !== missing.length) return out;
      const rows = await Promise.all(missing.map(async (s, i) => ({ locale: loc.code, source: s, source_hash: await sha(s), text: String(arr[i] ?? s) })));
      await supabaseAdmin.from("ui_translations").upsert(rows, { onConflict: "locale,source_hash" });
      for (const r of rows) out[r.source] = r.text;
    } catch (e) {
      console.error("translateBatch failed", e);
    }
    return out;
  });
