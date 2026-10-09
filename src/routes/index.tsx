import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowRight, Video } from "lucide-react";
import logo56Avif from "@/assets/logo-56.avif";
import logo112Avif from "@/assets/logo-112.avif";
import logo56Webp from "@/assets/logo-56.webp";
import logo112Webp from "@/assets/logo-112.webp";
import { tx, useLang } from "@/lib/i18n";
import { Container } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

// Lazy load all below-the-fold content to slash initial index.js bundle size
const HomeBelowTheFold = lazy(() => import("@/components/site/HomeBelowTheFold"));

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "U.S. Immigration Documentation. Organized.",
      "Professional immigration documentation and case-management support from Egypt. We organize the process — you stay in control."
    ),
    links: [
      // Preload lightweight mobile-optimized hero image for mobile screens
      {
        rel: "preload",
        as: "image",
        href: "/HomePage-mobile.avif",
        type: "image/avif",
        media: "(max-width: 768px)",
        // @ts-expect-error fetchpriority attribute
        fetchpriority: "high",
      },
      // Preload desktop hero image for larger screens
      {
        rel: "preload",
        as: "image",
        href: "/HomePage.avif",
        type: "image/avif",
        media: "(min-width: 769px)",
        // @ts-expect-error fetchpriority attribute
        fetchpriority: "high",
      },
    ],
  }),
  component: Home,
});

function AnimatedMark() {
  return (
    <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32">
      {/* spinning dashed orbit */}
      <svg viewBox="0 0 120 120" className="mf-ring-spin absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" className="text-accent/60" />
      </svg>
      {/* drawing ring */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="mf-ring-draw text-accent" />
      </svg>
      {/* logo core */}
      <div className="mf-scale-in mf-d1 absolute inset-0 grid place-items-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-card shadow-2xl md:h-24 md:w-24">
          <picture>
            <source type="image/avif" srcSet={`${logo56Avif} 1x, ${logo112Avif} 2x`} />
            <source type="image/webp" srcSet={`${logo56Webp} 1x, ${logo112Webp} 2x`} />
            <img
              src={logo56Webp}
              srcSet={`${logo56Webp} 1x, ${logo112Webp} 2x`}
              width={56}
              height={56}
              alt="MIGRAFILE emblem"
              loading="eager"
              decoding="async"
              className="h-14 w-14 object-contain md:h-16 md:w-16"
            />
          </picture>
        </div>
      </div>
      {/* pulsing status dot */}
      <span className="absolute -right-0.5 top-2 h-3.5 w-3.5">
        <span className="mf-dot-ping absolute inset-0 rounded-full bg-status-green" />
        <span className="absolute inset-0 rounded-full border-2 border-navy bg-status-green" />
      </span>
    </div>
  );
}

function Home() {
  const { t, lang } = useLang();

  return (
    <>
      {/* Hero — clear photo background with a dark gradient for readable copy */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <picture>
          <source media="(max-width: 768px)" type="image/avif" srcSet="/HomePage-mobile.avif" />
          <source media="(max-width: 768px)" type="image/webp" srcSet="/HomePage-mobile.webp" />
          <source type="image/avif" srcSet="/HomePage.avif" />
          <source type="image/webp" srcSet="/HomePage.webp" />
          <img
            src="/HomePage.jpeg"
            width={1672}
            height={940}
            alt={t(tx("MIGRAFILE documentation specialist organizing an immigration file", "أخصائي توثيق من MIGRAFILE ينظم ملف هجرة"))}
            className="absolute inset-0 h-full w-full object-cover object-[60%_center] brightness-110 saturate-110"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div
          className={`absolute inset-0 ${lang === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-navy/85 via-navy/55 to-navy/20`}
          aria-hidden="true"
        />
        <div className="mf-orb pointer-events-none absolute -top-24 right-[-8%] h-[480px] w-[480px] rounded-full bg-accent/25 blur-[120px]" aria-hidden="true" />
        <div className="mf-orb-2 pointer-events-none absolute bottom-[-15%] left-[-6%] h-[420px] w-[420px] rounded-full bg-gold/20 blur-[110px]" aria-hidden="true" />

        <Container className="relative pb-12 pt-10 text-center sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-4xl">
            <AnimatedMark />
            <p className="mf-fade-up mf-d2 eyebrow mt-10 border-accent/40 bg-accent/15 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
              {t(tx("U.S. Immigration Documentation Services — from Egypt", "خدمات توثيق الهجرة الأمريكية — من مصر"))}
            </p>
            <h1 className="mf-fade-up mf-d3 mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {t(tx("Your immigration file.", "ملف هجرتك."))}{" "}
              <span className="text-white">{t(tx("Organized.", "منظّم."))}</span>
            </h1>
            <p className="mf-fade-up mf-d4 mx-auto mt-6 max-w-2xl text-lg text-navy-foreground/75">
              {t(tx("Professional documentation and case-management support. We organize the process — you stay in control.", "دعم احترافي لتوثيق الملفات وإدارة القضايا. نحن ننظم الإجراءات — وأنت صاحب القرار."))}
            </p>
            <div className="mf-fade-up mf-d5 mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-navy-foreground"
                aria-label={t(tx("Start My Case in client portal", "ابدأ قضيتي في بوابة العميل"))}
              >
                {t(tx("Start My Case", "ابدأ قضيتي"))} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                to="/book-interview"
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent/60 bg-accent/15 px-8 py-4 text-sm font-bold text-white transition hover:bg-accent hover:text-navy"
                aria-label={t(tx("Book a video consultation call", "حجز موعد استشارة فيديو كول"))}
              >
                <Video className="h-4 w-4" aria-hidden="true" />
                {t(tx("Book A Video Call", "حجز مقابلة فيديو كول"))}
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy-foreground/20 px-8 py-4 text-sm font-medium transition hover:bg-navy-foreground/20"
                aria-label={t(tx("Browse all immigration documentation services", "تصفح جميع خدمات توثيق الهجرة"))}
              >
                {t(tx("Browse services", "تصفح الخدمات"))}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Below-the-fold content lazy loaded to keep index.js ultra-lean */}
      <Suspense fallback={<div className="min-h-96" />}>
        <HomeBelowTheFold />
      </Suspense>
    </>
  );
}
