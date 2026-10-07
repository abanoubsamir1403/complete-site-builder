import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { tx, useLang } from "@/lib/i18n";
import { services, PENDING } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { requirements } from "@/lib/requirements";
import { getFormRequirement } from "@/lib/form-requirements";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    return s ? seo(s.title.en, s.summary.en) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const { t } = useLang();
  const req = s.slug === "crba" ? getFormRequirement("DS-2029") : s.slug === "embassy" ? getFormRequirement("EMBASSY") : requirements[s.slug];
  return (
    <>
      <PageHeader eyebrow={tx(`Division ${s.num}`, `القسم ${s.num}`)} title={s.title} intro={s.summary} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="mf-reveal mf-delay-2">
          <h2 className="text-2xl text-primary">{t(tx("What's included", "ما الذي تشمله الخدمة"))}</h2>
          <ul className="mf-stagger mt-6 grid gap-3">
            {s.includes.map((i, index) => (
              <li key={i.en} className="mf-stagger-item flex gap-3 rounded-md border bg-card px-4 py-3 transition hover:border-accent/50 hover:shadow-sm" style={{ "--mf-index": index } as CSSProperties}><span className="text-status-green" aria-hidden>✓</span>{t(i)}</li>
            ))}
          </ul>
          {req && (
            <>
              <h2 className="mt-12 text-2xl text-primary">{t(tx("Documents we'll ask for", "المستندات التي سنطلبها"))}</h2>
              <ul className="mf-stagger mt-6 grid gap-3 sm:grid-cols-2">
                {req.docs.map((d, index) => (
                  <li key={d.en} className="mf-stagger-item flex gap-3 rounded-xl border bg-card px-4 py-3 text-sm transition hover:border-accent/50 hover:shadow-sm" style={{ "--mf-index": index } as CSSProperties}><span className="text-accent" aria-hidden>▢</span>{t(d)}</li>
                ))}
              </ul>
              <h2 className="mt-12 text-2xl text-primary">{t(tx("Questions you'll answer", "الأسئلة التي ستجيب عنها"))}</h2>
              <ol className="mt-6 grid gap-2 text-sm text-muted-foreground">
                {req.questions.map((q, i) => <li key={q.id}><span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span> · {t(q.q)}</li>)}
              </ol>
              <p className="mt-3 text-xs text-muted-foreground">{t(tx("Draft list — final requirements follow the official agency instructions.", "قائمة مبدئية — المتطلبات النهائية وفق تعليمات الجهة الرسمية."))}</p>
            </>
          )}
          <h2 className="mt-12 text-2xl text-primary">{t(tx("What we don't do", "ما لا نقوم به"))}</h2>
          <div className="mt-4"><Notice>{t(s.excludes)} {t(tx("Legal questions are routed to independently qualified U.S. counsel.", "تُحال الأسئلة القانونية إلى محامٍ أمريكي مؤهل ومستقل."))}</Notice></div>
        </div>
        <aside className="mf-reveal mf-delay-3 h-fit rounded-lg border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
          <p className="eyebrow">{t(tx("Fee", "الرسوم"))}</p>
          <p className="mt-2 font-display text-3xl text-primary">{t(PENDING)}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t(tx("MIGRAFILE service fees are separate from government filing fees.", "رسوم MIGRAFILE منفصلة عن الرسوم الحكومية."))}</p>
          <Link to="/portal" search={{ service: s.slug }} className="btn-primary mt-6 w-full">{t(tx("Start My Case", "ابدأ قضيتي"))}</Link>
        </aside>
      </Container>
    </>
  );
}
