import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Video } from "lucide-react";
import { tx, useLang } from "@/lib/i18n";
import { services } from "@/lib/content";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...seo(
      "Services & Documentation | MIGRAFILE",
      "Client-directed U.S. immigration documentation support, including file organization, translation, data entry, and case tracking.",
    ),
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/Services.avif",
        type: "image/avif",
        // @ts-expect-error fetchpriority attribute
        fetchpriority: "high",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={tx("MIGRAFILE Services", "خدمات MIGRAFILE")}
        title={tx("Professional Documentation & Case Management", "خدمات التوثيق وإدارة المعاملات")}
        imageSrc="/Services.jpeg"
        imageAlt={tx(
          "MIGRAFILE immigration documentation services",
          "خدمات MIGRAFILE لتوثيق معاملات الهجرة",
        )}
        intro={tx(
          "Explore our client-directed U.S. immigration documentation and case-management services.",
          "تعرّف على خدمات توثيق معاملات الهجرة الأمريكية وإدارتها بتوجيه منك.",
        )}
      />

      <div className="border-b bg-background">
        <Container>
          <div className="flex justify-end py-3">
            <Link
              to="/book-interview"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent hover:text-navy"
            >
              <Video className="h-3.5 w-3.5" />
              {t(tx("Book Video Consultation", "حجز موعد مقابلة فيديو كول"))}
            </Link>
          </div>
        </Container>
      </div>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-10">
            <p className="eyebrow">{t(tx("Immigration Divisions", "أقسام الهجرة"))}</p>
            <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
              {t(tx("Administrative Documentation Support", "الدعم التوثيقي الإداري للهجرة"))}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(
                tx(
                  "You choose the process — alone or with qualified counsel. We organize, translate, enter data and track.",
                  "أنت تختار الإجراء — بنفسك أو مع محامٍ مؤهل. ونحن ننظم ونترجم وندخل البيانات ونتابع.",
                ),
              )}
            </p>
          </div>

          <div className="mf-stagger grid gap-6 md:grid-cols-2">
            {services.map((s, index) => (
              <Link
                key={s.slug}
                to="/portal"
                search={{ service: s.slug }}
                className="doc-card mf-stagger-item group"
                style={{ "--mf-index": index } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold">{s.num}</span>
                  <span className="text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1">
                    →
                  </span>
                </div>
                <h3 className="mt-3 text-2xl text-primary">{t(s.title)}</h3>
                <p className="mt-2 text-muted-foreground">{t(s.summary)}</p>
                <ul className="mt-4 grid gap-1.5 text-sm">
                  {s.includes.slice(0, 3).map((item) => (
                    <li key={item.en} className="flex gap-2">
                      <span className="text-accent">✓</span>
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-semibold text-primary">
                  <span className="text-accent group-hover:underline">
                    {t(tx("Start Case or View Details", "بدء المعاملة أو عرض التفاصيل"))}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-muted-foreground">
                    {s.slug}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
