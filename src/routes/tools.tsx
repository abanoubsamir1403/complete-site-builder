import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tx, useLang } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () => seo("Free Organizational Tools", "Free document checklists, date calculators and organizational utilities for your immigration paperwork."),
  component: Tools,
});

const docs = [
  tx("Passport", "جواز السفر"), tx("Birth certificate", "شهادة الميلاد"), tx("Marriage certificate", "قسيمة الزواج"),
  tx("Divorce / death decree (prior marriages)", "وثيقة طلاق/وفاة (زواج سابق)"), tx("Police certificate", "شهادة حسن السير والسلوك"),
  tx("Military records", "السجلات العسكرية"), tx("Tax documents", "المستندات الضريبية"), tx("Passport photos", "صور شخصية"),
];

function Tools() {
  const { t } = useLang();
  const [done, setDone] = useState<number[]>([]);
  const [from, setFrom] = useState("");
  const [days, setDays] = useState(90);
  const target = from ? new Date(new Date(from).getTime() + days * 864e5).toISOString().slice(0, 10) : "";
  return (
    <>
      <PageHeader eyebrow={tx("MIGRAFILE Tools", "أدوات MIGRAFILE")} title={tx("Free organizational tools", "أدوات تنظيم مجانية")} intro={tx("Arithmetic and organization only — no eligibility results.", "حسابات وتنظيم فقط — بدون نتائج أهلية.")} />
      <Container className="grid gap-8 py-12 lg:grid-cols-2">
        <section className="doc-card">
          <h2 className="text-2xl text-primary">{t(tx("Civil document checklist", "قائمة المستندات المدنية"))}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{done.length} / {docs.length}</p>
          <div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(done.length / docs.length) * 100}%` }} /></div>
          <ul className="mt-5 grid gap-2">
            {docs.map((d, i) => (
              <li key={d.en}>
                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={done.includes(i)} onChange={() => setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i])} />
                  {t(d)}
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{t(tx("Generic list. Your required documents depend on official instructions.", "قائمة عامة. المستندات المطلوبة تحددها التعليمات الرسمية."))}</p>
        </section>
        <section className="doc-card">
          <h2 className="text-2xl text-primary">{t(tx("Date calculator", "حاسبة التواريخ"))}</h2>
          <div className="mt-5 grid gap-4">
            <label className="text-sm">{t(tx("Start date", "تاريخ البداية"))}<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="ltr mt-1 block w-full rounded-md border bg-background px-3 py-2" /></label>
            <label className="text-sm">{t(tx("Add days", "إضافة أيام"))}<input type="number" value={days} onChange={(e) => setDays(+e.target.value)} className="ltr mt-1 block w-full rounded-md border bg-background px-3 py-2" /></label>
            <div className="rounded-md bg-secondary p-4">
              <p className="text-xs text-muted-foreground">{t(tx("Resulting date", "التاريخ الناتج"))}</p>
              <p className="ltr font-mono text-2xl text-primary">{target || "—"}</p>
            </div>
          </div>
          <div className="mt-4"><Notice>{t(tx("Calendar arithmetic only. Official deadlines are set by the agency.", "حساب تقويمي فقط. المواعيد الرسمية تحددها الجهة المختصة."))}</Notice></div>
        </section>
      </Container>
    </>
  );
}
