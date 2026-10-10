import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileText,
  Landmark,
  Pause,
  Play,
  ShieldCheck,
  Video,
  Wrench,
} from "lucide-react";
import logo56Avif from "@/assets/logo-56.avif";
import logo112Avif from "@/assets/logo-112.avif";
import logo56Webp from "@/assets/logo-56.webp";
import logo112Webp from "@/assets/logo-112.webp";
import { tx, useLang } from "@/lib/i18n";
import { forms, services } from "@/lib/content";
import { allKnowledgeArticles } from "@/lib/knowledge-hub";
import { Container } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "U.S. Immigration Documentation. Organized.",
      "Professional immigration documentation and case-management support from Egypt. We organize the process — you stay in control.",
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
      <svg
        viewBox="0 0 120 120"
        className="mf-ring-spin absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          className="text-accent/60"
        />
      </svg>
      {/* drawing ring */}
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="mf-ring-draw text-accent"
        />
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

function TrustStats() {
  const { t } = useLang();
  const q = useQuery({
    queryKey: ["public-stats"],
    queryFn: async () =>
      (await supabase.rpc("public_stats")).data as {
        completed: number;
        clients: number;
        active: number;
        years: number;
        show: boolean;
      } | null,
  });
  const d = q.data;
  if (!d || !d.show) return null;
  const items = [
    { v: d.completed, l: tx("Files completed", "ملفات تم تخليصها") },
    { v: d.clients, l: tx("Clients served", "عملاء خدمناهم") },
    { v: d.active, l: tx("Files in progress", "ملفات قيد العمل") },
    ...(d.years > 0 ? [{ v: d.years, l: tx("Years of experience", "سنوات خبرة") }] : []),
  ];
  return (
    <section className="border-b bg-card py-14">
      <Container>
        <div
          className={`mf-stagger grid grid-cols-2 gap-4 ${items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
        >
          {items.map((i) => (
            <div
              key={i.l.en}
              className="mf-fade-up rounded-2xl border bg-background p-6 text-center"
            >
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                {i.v.toLocaleString()}
                <span className="text-accent">+</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t(i.l)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const steps = [
  {
    t: tx("Tell us what help you need", "أخبرنا بنوع المساعدة"),
    d: tx(
      "Translation, organizing a file, data entry for a form you selected, or tracking.",
      "ترجمة، تنظيم ملف، إدخال بيانات لنموذج اخترته، أو متابعة.",
    ),
  },
  {
    t: tx("Scope review", "مراجعة النطاق"),
    d: tx(
      "Every case is checked against our GREEN / YELLOW / RED scope system before work begins.",
      "تُراجع كل قضية وفق نظام الأخضر/الأصفر/الأحمر قبل بدء العمل.",
    ),
  },
  {
    t: tx("Document specialist & QC", "أخصائي المستندات ومراجعة الجودة"),
    d: tx(
      "A specialist organizes your file; an independent reviewer checks it.",
      "يُنظم الأخصائي ملفك ويراجعه مراجع مستقل.",
    ),
  },
  {
    t: tx("You review and approve", "أنت تراجع وتعتمد"),
    d: tx(
      "Nothing is submitted without your explicit approval and signature.",
      "لا يُرسل أي شيء بدون موافقتك وتوقيعك الصريح.",
    ),
  },
];

const featuredArticles = allKnowledgeArticles.slice(0, 3);
const featuredForms = forms.filter((form) => ["I-130", "I-485", "N-400"].includes(form.code));

function KnowledgeSpotlight() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const article = featuredArticles[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion || featuredArticles.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % featuredArticles.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  if (!article) return null;

  const showPrevious = () =>
    setActiveIndex((index) => (index - 1 + featuredArticles.length) % featuredArticles.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % featuredArticles.length);

  return (
    <div
      className="flex min-h-[330px] flex-col justify-between rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-8 xl:col-span-2"
      role="region"
      aria-roledescription={t(tx("carousel", "عارض شرائح"))}
      aria-label={t(tx("Featured Knowledge Hub articles", "مقالات مختارة من مركز المعرفة"))}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-xs font-semibold text-accent">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {t(tx("Knowledge Hub", "مركز المعرفة"))}
          </span>
          <span className="font-mono text-xs text-primary-foreground/50">
            0{activeIndex + 1} / 0{featuredArticles.length}
          </span>
        </div>
        <div className="mt-8 min-h-36">
          <h3 className="text-2xl font-semibold leading-snug sm:text-3xl" aria-live="polite">
            {t(article.title)}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-primary-foreground/70">
            {t(
              article.sections[0]?.paragraphs[0] ??
                tx(
                  "Explore practical guides and official sources.",
                  "اكتشف أدلة عملية ومصادر رسمية.",
                ),
            )}
          </p>
        </div>
        <Link
          to="/knowledge"
          hash={article.slug}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-primary-foreground"
        >
          {t(tx("Read this guide", "اقرأ هذا الدليل"))}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-primary-foreground/15 pt-5">
        <div
          className="flex items-center gap-2"
          aria-label={t(tx("Choose an article", "اختر مقالًا"))}
        >
          {featuredArticles.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-7 bg-accent"
                  : "w-2.5 bg-primary-foreground/30 hover:bg-primary-foreground/60"
              }`}
              aria-label={t(tx(`Go to article ${index + 1}`, `انتقل إلى المقال ${index + 1}`))}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="rounded-full p-2 text-primary-foreground/70 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label={t(
                paused
                  ? tx("Resume automatic rotation", "استئناف العرض التلقائي")
                  : tx("Pause automatic rotation", "إيقاف العرض التلقائي"),
              )}
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
          <button
            type="button"
            onClick={showPrevious}
            className="rounded-full p-2 text-primary-foreground/70 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
            aria-label={t(tx("Previous article", "المقال السابق"))}
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="rounded-full p-2 text-primary-foreground/70 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
            aria-label={t(tx("Next article", "المقال التالي"))}
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { t, lang } = useLang();
  const [s0, s1, s6] = [services[0]!, services[1]!, services[6]!];

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
            alt={t(
              tx(
                "MIGRAFILE documentation specialist organizing an immigration file",
                "أخصائي توثيق من MIGRAFILE ينظم ملف هجرة",
              ),
            )}
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
        <div
          className="mf-orb pointer-events-none absolute -top-24 right-[-8%] h-[480px] w-[480px] rounded-full bg-accent/25 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="mf-orb-2 pointer-events-none absolute bottom-[-15%] left-[-6%] h-[420px] w-[420px] rounded-full bg-gold/20 blur-[110px]"
          aria-hidden="true"
        />

        <Container className="relative pb-12 pt-10 text-center sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-4xl">
            <AnimatedMark />
            <p className="mf-fade-up mf-d2 eyebrow mt-10 border-white/40 bg-accent/15 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
              {t(
                tx(
                  "U.S. Immigration Documentation Services — from Egypt",
                  "خدمات توثيق الهجرة الأمريكية — من مصر",
                ),
              )}
            </p>
            <h1 className="mf-fade-up mf-d3 mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {t(tx("Your immigration file.", "ملف هجرتك."))}{" "}
              <span className="text-white">{t(tx("Organized.", "منظّم."))}</span>
            </h1>
            <p className="mf-fade-up mf-d4 mx-auto mt-6 max-w-2xl text-lg text-navy-foreground/75">
              {t(
                tx(
                  "Professional documentation and case-management support. We organize the process — you stay in control.",
                  "دعم احترافي لتوثيق الملفات وإدارة القضايا. نحن ننظم الإجراءات — وأنت صاحب القرار.",
                ),
              )}
            </p>
            <div className="mf-fade-up mf-d5 mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-navy-foreground"
                aria-label={t(tx("Start My Case in client portal", "ابدأ قضيتي في بوابة العميل"))}
              >
                {t(tx("Start My Case", "ابدأ قضيتي"))}{" "}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
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
                aria-label={t(
                  tx(
                    "Browse all immigration documentation services",
                    "تصفح جميع خدمات توثيق الهجرة",
                  ),
                )}
              >
                {t(tx("Browse services", "تصفح الخدمات"))}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <TrustStats />

      {/* Explore the public resource library */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <Container>
          <div className="mf-fade-up mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">{t(tx("Explore MIGRAFILE", "اكتشف MIGRAFILE"))}</p>
              <h2 className="mt-3 max-w-2xl text-3xl text-primary md:text-4xl">
                {t(
                  tx(
                    "Clear answers. Useful tools. Official sources.",
                    "إجابات واضحة. أدوات مفيدة. مصادر رسمية.",
                  ),
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {t(
                tx(
                  "Explore practical guides, browse common forms, and find trusted resources for your next step.",
                  "اكتشف أدلة عملية، وتصفح النماذج الشائعة، واعثر على مصادر موثوقة لخطوتك التالية.",
                ),
              )}
            </p>
          </div>

          <div className="mf-stagger grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KnowledgeSpotlight />

            <div className="mf-stagger-item flex min-w-0 flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(tx("Forms Library", "مكتبة النماذج"))}
                  </p>
                  <h3 className="mt-1 font-semibold text-primary">
                    {t(tx("Find a form", "ابحث عن نموذج"))}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(
                  tx(
                    "Browse form numbers and plain-language purposes.",
                    "تصفح أرقام النماذج واستخداماتها بلغة واضحة.",
                  ),
                )}
              </p>
              <ul className="mt-4 space-y-2 border-t pt-4">
                {featuredForms.map((form) => (
                  <li
                    key={form.code}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2 text-xs"
                  >
                    <span className="ltr font-mono font-semibold text-accent">{form.code}</span>
                    <span className="line-clamp-1 text-muted-foreground">{t(form.title)}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/forms"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary hover:text-accent"
              >
                {t(tx("Browse all forms", "تصفح كل النماذج"))}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>

            <div className="mf-stagger-item flex min-w-0 flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(tx("Tools", "الأدوات"))}
                  </p>
                  <h3 className="mt-1 font-semibold text-primary">
                    {t(tx("Go straight to the tool", "انتقل مباشرة إلى الأداة"))}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(
                  tx(
                    "Official tools for checking your case and planning next steps.",
                    "أدوات رسمية لمتابعة ملفك والتخطيط للخطوات التالية.",
                  ),
                )}
              </p>
              <div className="mt-4 space-y-2 border-t pt-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t(tx("USCIS Case Status", "متابعة حالة الملف لدى USCIS"))}
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t(tx("USCIS Processing Times", "مدد معالجة USCIS"))}
                </p>
              </div>
              <Link
                to="/tools"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary hover:text-accent"
              >
                {t(tx("Explore all tools", "اكتشف كل الأدوات"))}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>

            <div className="mf-stagger-item flex min-w-0 flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Landmark className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(tx("Official Resources", "المصادر الرسمية"))}
                  </p>
                  <h3 className="mt-1 font-semibold text-primary">
                    {t(tx("Start with the source", "ابدأ من المصدر"))}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(
                  tx(
                    "Go directly to U.S. government information and services.",
                    "انتقل مباشرة إلى معلومات وخدمات الحكومة الأمريكية.",
                  ),
                )}
              </p>
              <div className="mt-4 space-y-2 border-t pt-4">
                <a
                  href="https://www.usa.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 text-sm font-medium text-primary hover:text-accent"
                >
                  USA.gov <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href="https://america.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 text-sm font-medium text-primary hover:text-accent"
                >
                  America.gov <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
              <Link
                to="/resources"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary hover:text-accent"
              >
                {t(tx("View official directory", "تصفح الدليل الرسمي"))}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services bento */}
      <section className="py-24">
        <Container>
          <div className="mf-fade-up flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{t(tx("Seven service divisions", "سبعة أقسام للخدمات"))}</p>
              <h2 className="mt-4 text-3xl text-primary md:text-5xl">
                {t(tx("Documentation support, clearly scoped", "دعم توثيقي بنطاق واضح"))}
              </h2>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground md:block">
              Egypt • USA
            </span>
          </div>

          <div className="mf-stagger mt-12 grid gap-4 md:grid-cols-4">
            {/* large feature card */}
            <Link
              to="/portal"
              className="bento mf-stagger-item group flex flex-col justify-between bg-secondary md:col-span-2 md:row-span-2 hover:-translate-y-1 hover:border-accent/60"
              style={{ "--mf-index": 0 } as CSSProperties}
              aria-label={`${t(s0.title)} - ${t(tx("Start Case", "ابدأ قضية"))}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <span className="font-mono text-xs text-gold">{s0.num}</span>
                <h3 className="mt-2 text-2xl text-primary">{t(s0.title)}</h3>
                <p className="mt-3 text-muted-foreground">{t(s0.summary)}</p>
              </div>
            </Link>
            {/* dark card */}
            <Link
              to="/portal"
              className="bento mf-stagger-item group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden bg-primary text-primary-foreground md:col-span-2 hover:-translate-y-1"
              style={{ "--mf-index": 1 } as CSSProperties}
              aria-label={`${t(s1.title)} - ${t(tx("Start Case", "ابدأ قضية"))}`}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{t(s1.title)}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">{t(s1.summary)}</p>
              </div>
              <ArrowRight className="relative z-10 h-8 w-8 shrink-0 text-accent transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/10 opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
            </Link>
            {/* small cards */}
            {services.slice(2, 6).map((s, index) => (
              <Link
                key={s.slug}
                to="/portal"
                search={{ service: s.slug }}
                className="bento mf-stagger-item group hover:-translate-y-1 hover:border-accent/60"
                style={{ "--mf-index": index + 2 } as CSSProperties}
                aria-label={`${t(s.title)} - ${t(tx("Start Case", "ابدأ قضية"))}`}
              >
                <span className="font-mono text-xs text-gold">{s.num}</span>
                <h3 className="mt-3 font-semibold text-primary">{t(s.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(s.summary)}</p>
              </Link>
            ))}
            {/* long card */}
            <Link
              to="/portal"
              className="bento mf-stagger-item group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:gap-6 hover:-translate-y-1 hover:border-accent/60 md:col-span-2"
              style={{ "--mf-index": 6 } as CSSProperties}
              aria-label={`${t(s6.title)} - ${t(tx("Start Case", "ابدأ قضية"))}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-primary">{t(s6.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(s6.summary)}</p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-secondary py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-4xl text-primary">{t(tx("How it works", "كيف نعمل"))}</h2>
            <p className="mt-2 text-lg text-accent">
              {t(tx("From intake to an approved package", "من الاستلام حتى ملف معتمد"))}
            </p>
          </div>
          <ol className="mf-stagger grid gap-12 md:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={i}
                className="mf-stagger-item text-center"
                style={{ "--mf-index": i } as CSSProperties}
              >
                <div className="font-display text-5xl font-bold text-primary/10">0{i + 1}</div>
                <p className="mt-3 font-semibold text-primary">{t(s.t)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.d)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Disclaimer */}
      <section className="border-b py-20">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-accent/30 bg-card p-4 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-primary font-bold text-primary">
                !
              </span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                  {t(tx("Legal Disclaimer", "إخلاء مسؤولية قانوني"))}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    tx(
                      "MIGRAFILE is a documentation assistance service. We are not a law firm, are not affiliated with USCIS or any government agency, and do not provide legal advice or representation. Our work is limited to preparing and organizing documents.",
                      "ميجرافايل خدمة مساعدة في التوثيق. لسنا مكتب محاماة، ولا نتبع USCIS أو أي جهة حكومية، ولا نقدم مشورة أو تمثيلًا قانونيًا. عملنا يقتصر على تجهيز وتنظيم المستندات.",
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Container>
          <h2 className="mx-auto max-w-2xl text-3xl text-primary md:text-5xl">
            {t(tx("Ready to get your file organized?", "جاهز تنظم ملفك؟"))}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {t(
              tx(
                "Open a secure case, upload your documents, and follow every stage.",
                "افتح قضية آمنة، ارفع مستنداتك، وتابع كل مرحلة.",
              ),
            )}
          </p>
          <div className="mt-10 inline-flex rounded-2xl bg-secondary p-1.5">
            <Link
              to="/portal"
              className="rounded-xl bg-primary px-10 py-4 font-bold text-primary-foreground transition hover:bg-accent"
            >
              {t(tx("Start My Case", "ابدأ قضيتي"))}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
