import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { tx, useLang } from "@/lib/i18n";
import { services, PENDING } from "@/lib/content";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

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
  const s = services.find((x) => x.slug === slug)!;
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={tx(`Division ${s.num}`, `القسم ${s.num}`)} title={s.title} intro={s.summary} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl text-primary">{t(tx("What's included", "ما الذي تشمله الخدمة"))}</h2>
          <ul className="mt-6 grid gap-3">
            {s.includes.map((i) => (
              <li key={i.en} className="flex gap-3 rounded-md border bg-card px-4 py-3"><span className="text-status-green" aria-hidden>✓</span>{t(i)}</li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl text-primary">{t(tx("What we don't do", "ما لا نقوم به"))}</h2>
          <div className="mt-4"><Notice>{t(s.excludes)} {t(tx("Legal questions are routed to independently qualified U.S. counsel.", "تُحال الأسئلة القانونية إلى محامٍ أمريكي مؤهل ومستقل."))}</Notice></div>
        </div>
        <aside className="h-fit rounded-lg border bg-card p-6">
          <p className="eyebrow">{t(tx("Fee", "الرسوم"))}</p>
          <p className="mt-2 font-display text-3xl text-primary">{t(PENDING)}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t(tx("MIGRAFILE service fees are separate from government filing fees.", "رسوم MIGRAFILE منفصلة عن الرسوم الحكومية."))}</p>
          <Link to="/find-assistance" className="btn-primary mt-6 w-full">{t(tx("Start My Case", "ابدأ قضيتي"))}</Link>
        </aside>
      </Container>
    </>
  );
}
