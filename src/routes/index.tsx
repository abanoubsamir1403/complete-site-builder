import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, ShieldCheck, ClipboardList } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { tx, useLang } from "@/lib/i18n";
import { services } from "@/lib/content";
import { Container } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("U.S. Immigration Documentation. Organized.", "Professional immigration documentation and case-management support from Egypt. We organize the process — you stay in control."),
  component: Home,
});

const steps = [
  { t: tx("Tell us what help you need", "أخبرنا بنوع المساعدة"), d: tx("Translation, organizing a file, data entry for a form you selected, or tracking.", "ترجمة، تنظيم ملف، إدخال بيانات لنموذج اخترته، أو متابعة.") },
  { t: tx("Scope review", "مراجعة النطاق"), d: tx("Every case is checked against our GREEN / YELLOW / RED scope system before work begins.", "تُراجع كل قضية وفق نظام الأخضر/الأصفر/الأحمر قبل بدء العمل.") },
  { t: tx("Document specialist & QC", "أخصائي المستندات ومراجعة الجودة"), d: tx("A specialist organizes your file; an independent reviewer checks it.", "يُنظم الأخصائي ملفك ويراجعه مراجع مستقل.") },
  { t: tx("You review and approve", "أنت تراجع وتعتمد"), d: tx("Nothing is submitted without your explicit approval and signature.", "لا يُرسل أي شيء بدون موافقتك وتوقيعك الصريح.") },
];

function AnimatedMark() {
  return (
    <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32">
      {/* spinning dashed orbit */}
      <svg viewBox="0 0 120 120" className="mf-ring-spin absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" className="text-accent/60" />
      </svg>
      {/* drawing ring */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="mf-ring-draw text-accent" />
      </svg>
      {/* logo core */}
      <div className="mf-scale-in mf-d1 absolute inset-0 grid place-items-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-card shadow-2xl md:h-24 md:w-24">
          <img src={logoMark} alt="MIGRAFILE" className="h-14 w-14 object-contain md:h-16 md:w-16" />
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
  const { t } = useLang();
  const [s0, s1, s6] = [services[0]!, services[1]!, services[6]!];
  return (
    <>
      {/* Hero — dark navy with drifting orbs */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mf-orb pointer-events-none absolute -top-24 right-[-8%] h-[480px] w-[480px] rounded-full bg-accent/25 blur-[120px]" aria-hidden />
        <div className="mf-orb-2 pointer-events-none absolute bottom-[-15%] left-[-6%] h-[420px] w-[420px] rounded-full bg-gold/20 blur-[110px]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "56px 56px" }} aria-hidden />

        <Container className="relative pb-20 pt-16 text-center md:pb-28 md:pt-24">
          <AnimatedMark />
          <p className="mf-fade-up mf-d2 eyebrow mt-10 border-accent/40 bg-accent/15 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-status-green" />
            {t(tx("U.S. Immigration Documentation Services — from Egypt", "خدمات توثيق الهجرة الأمريكية — من مصر"))}
          </p>
          <h1 className="mf-fade-up mf-d3 mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            {t(tx("Your immigration file.", "ملف هجرتك."))}{" "}
            <span className="text-accent">{t(tx("Organized.", "منظّم."))}</span>
          </h1>
          <p className="mf-fade-up mf-d4 mx-auto mt-6 max-w-2xl text-lg text-navy-foreground/75">
            {t(tx("Professional documentation and case-management support. We organize the process — you stay in control.", "دعم احترافي لتوثيق الملفات وإدارة القضايا. نحن ننظم الإجراءات — وأنت صاحب القرار."))}
          </p>
          <div className="mf-fade-up mf-d5 mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/portal" className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-navy shadow-xl transition hover:-translate-y-0.5 hover:bg-navy-foreground">
              {t(tx("Start My Case", "ابدأ قضيتي"))} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border-2 border-navy-foreground/20 px-8 py-4 text-sm font-medium transition hover:bg-navy-foreground/10">
              {t(tx("Browse services", "تصفح الخدمات"))}
            </Link>
          </div>
        </Container>
      </section>

      {/* Services bento */}
      <section className="py-24">
        <Container>
          <div className="mf-fade-up flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{t(tx("Seven service divisions", "سبعة أقسام للخدمات"))}</p>
              <h2 className="mt-4 text-4xl text-primary md:text-5xl">{t(tx("Documentation support, clearly scoped", "دعم توثيقي بنطاق واضح"))}</h2>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground md:block">Egypt • USA</span>
          </div>

          <div className="mf-stagger mt-12 grid gap-4 md:grid-cols-4">
            {/* large feature card */}
            <Link to="/portal" className="bento mf-stagger-item group flex flex-col justify-between bg-secondary md:col-span-2 md:row-span-2 hover:-translate-y-1 hover:border-accent/60" style={{ "--mf-index": 0 } as CSSProperties}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><ShieldCheck className="h-6 w-6" /></span>
              <div>
                <span className="font-mono text-xs text-gold">{s0.num}</span>
                <h3 className="mt-2 text-2xl text-primary">{t(s0.title)}</h3>
                <p className="mt-3 text-muted-foreground">{t(s0.summary)}</p>
              </div>
            </Link>
            {/* dark card */}
            <Link to="/portal" className="bento mf-stagger-item group relative flex items-center justify-between overflow-hidden bg-primary text-primary-foreground md:col-span-2 hover:-translate-y-1" style={{ "--mf-index": 1 } as CSSProperties}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{t(s1.title)}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">{t(s1.summary)}</p>
              </div>
              <ArrowRight className="relative z-10 h-8 w-8 shrink-0 text-accent transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/10 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </Link>
            {/* small cards */}
            {services.slice(2, 6).map((s, index) => (
              <Link key={s.slug} to="/portal" className="bento mf-stagger-item group hover:-translate-y-1 hover:border-accent/60" style={{ "--mf-index": index + 2 } as CSSProperties}>
                <span className="font-mono text-xs text-gold">{s.num}</span>
                <h3 className="mt-3 font-semibold text-primary">{t(s.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(s.summary)}</p>
              </Link>
            ))}
            {/* long card */}
            <Link to="/portal" className="bento mf-stagger-item group flex items-center gap-6 hover:-translate-y-1 hover:border-accent/60 md:col-span-2" style={{ "--mf-index": 6 } as CSSProperties}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><ClipboardList className="h-5 w-5" /></span>
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
            <p className="mt-2 text-lg text-accent">{t(tx("From intake to an approved package", "من الاستلام حتى ملف معتمد"))}</p>
          </div>
          <ol className="mf-stagger grid gap-12 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={i} className="mf-stagger-item text-center" style={{ "--mf-index": i } as CSSProperties}>
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
          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-accent/30 bg-card p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-primary font-bold text-primary">!</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-primary">{t(tx("Legal Disclaimer", "إخلاء مسؤولية قانوني"))}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(tx("MIGRAFILE is a documentation assistance service. We are not a law firm, are not affiliated with USCIS or any government agency, and do not provide legal advice or representation. Our work is limited to preparing and organizing documents.", "ميجرافايل خدمة مساعدة في التوثيق. لسنا مكتب محاماة، ولا نتبع USCIS أو أي جهة حكومية، ولا نقدم مشورة أو تمثيلًا قانونيًا. عملنا يقتصر على تجهيز وتنظيم المستندات."))}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Container>
          <h2 className="mx-auto max-w-2xl text-4xl text-primary md:text-5xl">{t(tx("Ready to get your file organized?", "جاهز تنظم ملفك؟"))}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t(tx("Open a secure case, upload your documents, and follow every stage.", "افتح قضية آمنة، ارفع مستنداتك، وتابع كل مرحلة."))}</p>
          <div className="mt-10 inline-flex rounded-2xl bg-secondary p-1.5">
            <Link to="/portal" className="rounded-xl bg-primary px-10 py-4 font-bold text-primary-foreground transition hover:bg-accent">
              {t(tx("Start My Case", "ابدأ قضيتي"))}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
