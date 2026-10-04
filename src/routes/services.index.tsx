import { createFileRoute, Link } from "@tanstack/react-router";
import { tx, useLang } from "@/lib/i18n";
import { services } from "@/lib/content";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => seo("Services", "Seven divisions of client-directed U.S. immigration documentation support: family, NVC, CRBA, visas, USCIS, translation and case management."),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={tx("MIGRAFILE Services", "خدمات MIGRAFILE")}
        title={tx("Administrative documentation support", "دعم توثيقي إداري")}
        intro={tx("You choose the process — alone or with qualified counsel. We organize, translate, enter data and track.", "أنت تختار الإجراء — بنفسك أو مع محامٍ مؤهل. ونحن ننظم ونترجم وندخل البيانات ونتابع.")}
      />
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        {services.map((s) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="doc-card group">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gold">{s.num}</span>
              <span className="text-xs text-accent opacity-0 transition group-hover:opacity-100">→</span>
            </div>
            <h2 className="mt-3 text-2xl text-primary">{t(s.title)}</h2>
            <p className="mt-2 text-muted-foreground">{t(s.summary)}</p>
            <ul className="mt-4 grid gap-1.5 text-sm">
              {s.includes.slice(0, 3).map((i) => (
                <li key={i.en} className="flex gap-2"><span className="text-accent">✓</span>{t(i)}</li>
              ))}
            </ul>
          </Link>
        ))}
      </Container>
    </>
  );
}
