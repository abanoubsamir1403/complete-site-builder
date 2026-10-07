import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { forms } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/forms")({
  head: () => seo("USCIS & State Department Forms Library", "Educational reference for USCIS and Department of State forms, with links to official sources. Separate from our service catalog."),
  component: FormsPage,
});

const badge = {
  enabled: { c: "bg-status-green", l: tx("Support available", "الدعم متاح") },
  restricted: { c: "bg-status-yellow", l: tx("Restricted — scope review", "مقيد — مراجعة النطاق") },
  info: { c: "bg-muted-foreground", l: tx("Information only", "معلومات فقط") },
};

function FormsPage() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const list = useMemo(() => forms.filter((f) => (f.code + f.title).toLowerCase().includes(q.toLowerCase())), [q]);
  const groups = [...new Set(list.map((f) => f.group))];
  return (
    <>
      <PageHeader eyebrow={tx("Forms Library", "مكتبة النماذج")} title={tx("Official forms, explained", "النماذج الرسمية بشرح مبسط")} intro={tx("Educational records only. A form listed here does not mean we prepare it.", "سجلات تعليمية فقط. وجود النموذج هنا لا يعني أننا نُعدّه.")} />
      <Container className="py-12">
        <Notice>{t(tx("Always confirm the current edition and fee on the official agency website before filing.", "تأكد دائمًا من الإصدار والرسوم الحالية على موقع الجهة الرسمية قبل التقديم."))}</Notice>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(tx("Search forms (e.g. I-130)", "ابحث عن نموذج (مثل I-130)"))} className="mt-8 w-full max-w-md rounded-md border bg-card px-4 py-2.5" aria-label="Search forms" />
        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="ltr text-xl text-primary">{g}</h2>
            <div className="mt-4 divide-y rounded-lg border bg-card">
              {list.filter((f) => f.group === g).map((f) => (
                <div key={f.code} className="flex flex-col gap-2 px-4 py-4 lg:grid lg:grid-cols-[90px_minmax(0,1fr)_210px_auto] lg:items-center lg:px-5">
                  <span className="ltr font-mono text-sm font-medium text-primary">{f.code}</span>
                  <span className="ltr text-sm">{f.title}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`h-2 w-2 shrink-0 rounded-full ${badge[f.service].c}`} />{t(badge[f.service].l)}</span>
                  <a href={f.agency === "USCIS" ? `https://www.uscis.gov/${f.code.toLowerCase()}` : "https://travel.state.gov"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                    {f.agency} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
