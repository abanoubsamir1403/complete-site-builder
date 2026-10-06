import { tx, useLang } from "@/lib/i18n";
import type { Declaration } from "@/lib/declaration";
import type { Database } from "@/integrations/supabase/types";

type CaseRow = Database["public"]["Tables"]["cases"]["Row"];

export function DeclarationBox({ c, clientName }: { c: CaseRow; clientName: string | null }) {
  const { t } = useLang();
  const d = c.declaration as unknown as Declaration | null;
  if (!d) return <p className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">{t(tx("No signed declaration on this file (opened before declarations were required).", "لا يوجد إقرار موقّع على هذا الملف (فُتح قبل تفعيل الإقرار)."))}</p>;
  const signed = c.declaration_signed_at ? new Date(c.declaration_signed_at).toLocaleString(d.lang === "ar" ? "ar-EG" : "en-US") : "—";
  const print = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
    const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
    const ar = d.lang === "ar";
    w.document.write(`<!doctype html><html dir="${ar ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${esc(c.reference)}</title>
<style>body{font-family:system-ui,'Segoe UI',Tahoma,sans-serif;max-width:720px;margin:40px auto;color:#0D2B5E;line-height:1.7}h1{font-size:22px;border-bottom:2px solid #12968C;padding-bottom:8px}table{width:100%;font-size:14px;margin:16px 0}td{padding:4px 0}td:first-child{color:#555;width:40%}li{margin:8px 0}.sig{margin-top:32px;border-top:1px solid #ccc;padding-top:12px;font-size:14px}</style></head><body>
<h1>MIGRAFILE — ${ar ? "إقرار وتعهد العميل" : "Client Declaration &amp; Undertaking"}</h1>
<table><tr><td>${ar ? "رقم الملف" : "File reference"}</td><td>${esc(c.reference)}</td></tr>
<tr><td>${ar ? "الخدمة / النموذج" : "Service / form"}</td><td>${esc(c.service_title)}${c.form_code ? " · " + esc(c.form_code) : ""}</td></tr>
<tr><td>${ar ? "اسم الحساب" : "Account name"}</td><td>${esc(clientName ?? "—")}</td></tr></table>
<ol>${d.clauses.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
<div class="sig"><p>${ar ? "التوقيع الإلكتروني (الاسم بالكامل)" : "Electronic signature (full name)"}: <b>${esc(d.name)}</b></p>
<p>${ar ? "تاريخ ووقت التوقيع" : "Signed on"}: ${esc(signed)}</p><p>${ar ? "إصدار الإقرار" : "Declaration version"}: ${esc(d.version)}</p></div>
<script>window.onload=()=>window.print()</script></body></html>`);
    w.document.close();
  };
  return (
    <div className="grid gap-2 rounded-xl border border-accent/30 bg-accent/5 p-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-primary">{t(tx("Signed client declaration", "إقرار العميل الموقّع"))} ✓</p>
        <button type="button" onClick={print} className="rounded-md border border-input bg-background px-3 py-1 text-xs font-medium hover:bg-muted">{t(tx("Print / save as PDF", "طباعة / حفظ PDF"))}</button>
      </div>
      <p className="text-muted-foreground">{t(tx("Signed by", "وقّع باسم"))}: <span className="font-medium text-foreground">{d.name}</span> · {signed}</p>
      <ol className="grid list-decimal gap-1 ps-5 text-muted-foreground">{d.clauses.map((x, i) => <li key={i}>{x}</li>)}</ol>
    </div>
  );
}
