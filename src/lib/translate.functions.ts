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
    if (!apiKey) return out;
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const system = `You translate UI text for MIGRAFILE, a U.S. immigration documentation website (not a law firm, not legal advice).
Translate each English string into ${loc.en}.${loc.dialect ? " Use natural, friendly everyday wording of this dialect, but keep official terms (form names, agency names, legal/document terms) precise and standard." : ""}
Rules: keep form codes (I-130, N-400, DS-260...), agency names (USCIS, NVC, CEAC, IRS), "MIGRAFILE", URLs, emails, phone numbers, placeholders and formats like MM/DD/YYYY unchanged. Keep punctuation like "·", "—", "*" and leading/trailing spaces. Do not add explanations.
Return ONLY a JSON array of translated strings, same order and same length as the input array.`;
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system,
        prompt: JSON.stringify(missing),
        providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] } },
      });
      const raw = await result.text;
      const arr = JSON.parse(raw.slice(raw.indexOf("["), raw.lastIndexOf("]") + 1)) as unknown[];
      if (!Array.isArray(arr) || arr.length !== missing.length) return out;
      const rows = await Promise.all(missing.map(async (s, i) => ({ locale: loc.code, source: s, source_hash: await sha(s), text: String(arr[i] ?? s) })));
      await supabaseAdmin.from("ui_translations").upsert(rows, { onConflict: "locale,source_hash" });
      for (const r of rows) out[r.source] = r.text;
    } catch (e) {
      console.error("translateBatch failed", e);
    }
    return out;
  });
