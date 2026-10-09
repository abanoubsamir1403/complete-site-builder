import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { tx, useLang, type T } from "@/lib/i18n";
import { formGroups, forms } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/forms")({
  head: () => seo("USCIS Forms Library", "Educational reference for USCIS G, I, and N forms with links to official sources. Separate from our service catalog."),
  component: FormsPage,
});

const badge = {
  enabled: { c: "bg-status-green", l: tx("Support available", "الدعم متاح") },
  restricted: { c: "bg-status-yellow", l: tx("Restricted — scope review", "مقيد — مراجعة النطاق") },
  info: { c: "bg-muted-foreground", l: tx("Information only", "معلومات فقط") },
};

const groupTitles: Record<(typeof formGroups)[number], T> = {
  "G / General": tx("G forms", "نماذج G"),
  "I / Immigration": tx("I forms", "نماذج I"),
  "N / Naturalization": tx("N forms", "نماذج N"),
};

const groupIntro: Record<(typeof formGroups)[number], T> = {
  "G / General": tx(
    "General, registration, representation, and payment forms",
    "نماذج عامة وتسجيل وتمثيل ودفع الرسوم",
  ),
  "I / Immigration": tx(
    "Immigration applications, petitions, and supporting forms",
    "طلبات الهجرة والالتماسات والنماذج الداعمة",
  ),
  "N / Naturalization": tx(
    "Citizenship and naturalization forms",
    "نماذج الجنسية والتجنس",
  ),
};

function formSearchText(f: (typeof forms)[number]) {
  return `${f.code} ${f.title.en} ${f.title.ar}`.toLowerCase();
}

function FormsPage() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const list = useMemo(() => forms.filter((f) => formSearchText(f).includes(q.toLowerCase())), [q]);
  const groups = formGroups.filter((g) => list.some((f) => f.group === g));
  return (
    <>
      <PageHeader
        eyebrow={tx("Forms Library", "مكتبة النماذج")}
        title={tx("Forms", "النماذج")}
        intro={tx(
          "Educational records only. A form listed here does not mean we prepare it.",
          "سجلات تعليمية فقط. وجود النموذج هنا لا يعني أننا نُعدّه.",
        )}
      />
      <Container className="py-12">
        <Notice>
          {t(
            tx(
              "Always confirm the current edition and fee on the official agency website before filing.",
              "تأكد دائمًا من الإصدار والرسوم الحالية على موقع الجهة الرسمية قبل التقديم.",
            ),
          )}
        </Notice>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t(tx("Search forms (e.g. I-130)", "ابحث عن نموذج (مثل I-130)"))}
          className="mt-8 w-full max-w-md rounded-md border bg-card px-4 py-2.5"
          aria-label="Search forms"
        />
        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="text-xl text-primary">{t(groupTitles[g])}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t(groupIntro[g])}</p>
            <div className="mt-4 hidden grid-cols-[90px_minmax(0,1fr)_210px_auto] gap-3 px-5 text-xs font-medium uppercase tracking-wide text-muted-foreground lg:grid">
              <span>{t(tx("Form", "النموذج"))}</span>
              <span>{t(tx("Name / purpose", "الاسم / الغرض"))}</span>
              <span>{t(tx("Support", "الدعم"))}</span>
              <span>{t(tx("Source", "المصدر"))}</span>
            </div>
            <div className="mt-2 divide-y rounded-lg border bg-card lg:mt-0">
              {list
                .filter((f) => f.group === g)
                .map((f) => (
                  <div
                    key={f.code}
                    className="flex flex-col gap-2 px-4 py-4 lg:grid lg:grid-cols-[90px_minmax(0,1fr)_210px_auto] lg:items-center lg:px-5"
                  >
                    <span className="ltr font-mono text-sm font-medium text-primary">{f.code}</span>
                    <span className="text-sm">{t(f.title)}</span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${badge[f.service].c}`} />
                      {t(badge[f.service].l)}
                    </span>
                    <a
                      href={`https://www.uscis.gov/${f.code.toLowerCase()}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      USCIS <ExternalLink className="h-3 w-3" />
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
