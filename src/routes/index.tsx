import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, FileCheck2, Languages, ClipboardList } from "lucide-react";
import hero from "@/assets/hero-documents.jpg";
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

const lights = [
  { c: "bg-status-green", k: "GREEN", t: tx("We can complete the administrative work.", "نستطيع إكمال العمل الإداري.") },
  { c: "bg-status-yellow", k: "YELLOW", t: tx("Work pauses for clarification or additional review.", "يتوقف العمل للتوضيح أو لمراجعة إضافية.") },
  { c: "bg-status-red", k: "RED", t: tx("Outside our scope — we refer you to qualified U.S. counsel.", "خارج نطاقنا — نحيلك إلى محامٍ أمريكي مؤهل.") },
];

function Home() {
  const { t } = useLang();
  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">{t(tx("U.S. Immigration Documentation Services", "خدمات توثيق الهجرة الأمريكية"))}</p>
            <h1 className="mt-5 text-5xl leading-[1.05] text-primary md:text-6xl lg:text-7xl">
              {t(tx("U.S. Immigration Documentation.", "توثيق الهجرة الأمريكية."))}{" "}
              <em className="text-accent">{t(tx("Organized.", "منظّم."))}</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {t(tx("Professional immigration documentation and case-management support from Egypt.", "دعم احترافي لتوثيق الهجرة وإدارة القضايا من مصر."))}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/find-assistance" className="btn-primary">
                {t(tx("Start My Case", "ابدأ قضيتي"))} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link to="/resources" className="btn-outline">{t(tx("Explore Official Resources", "استكشف المصادر الرسمية"))}</Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="gold-rule" />
              {t(tx("We organize the immigration process. You stay in control.", "نحن ننظم إجراءات الهجرة. وأنت تبقى صاحب القرار."))}
            </p>
          </div>
          <div className="relative">
            <img src={hero} alt="" width={1600} height={1104} className="aspect-[4/3] w-full rounded-lg object-cover" />
            <div className="absolute -bottom-6 start-6 w-64 rounded-lg border bg-card p-4 shadow-lg">
              <p className="text-xs text-muted-foreground">{t(tx("Sample case · fictional", "قضية نموذجية · افتراضية"))}</p>
              <p className="ltr mt-1 font-mono text-sm text-primary">MF-2026-000125</p>
              <ul className="mt-3 grid gap-1.5 text-xs">
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-green" />{t(tx("Civil documents — complete", "المستندات المدنية — مكتملة"))}</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-green" />{t(tx("Translation — complete", "الترجمة — مكتملة"))}</li>
                <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-yellow" />{t(tx("Financial documents — missing", "المستندات المالية — ناقصة"))}</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y bg-card">
        <Container className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: ClipboardList, l: tx("Services", "الخدمات"), d: tx("Paid administrative support", "دعم إداري مدفوع") },
            { i: FileCheck2, l: tx("Knowledge", "المعرفة"), d: tx("Sourced general information", "معلومات عامة موثقة المصدر") },
            { i: Languages, l: tx("Tools", "الأدوات"), d: tx("Free organizational utilities", "أدوات تنظيم مجانية") },
            { i: ShieldCheck, l: tx("Portal", "البوابة"), d: tx("Secure records & tracking", "سجلات ومتابعة آمنة") },
          ].map(({ i: I, l, d }) => (
            <div key={l.en} className="flex gap-3">
              <I className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-primary">MIGRAFILE {t(l)}</p>
                <p className="text-sm text-muted-foreground">{t(d)}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{t(tx("Seven service divisions", "سبعة أقسام للخدمات"))}</p>
              <h2 className="mt-3 text-4xl text-primary">{t(tx("Documentation support, clearly scoped", "دعم توثيقي بنطاق واضح"))}</h2>
            </div>
            <Link to="/services" className="text-sm font-medium text-accent hover:underline">{t(tx("All services →", "كل الخدمات ←"))}</Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group bg-card p-7 transition hover:bg-background">
                <span className="font-mono text-xs text-gold">{s.num}</span>
                <h3 className="mt-3 text-xl text-primary group-hover:text-accent">{t(s.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.summary)}</p>
              </Link>
            ))}
            <Link to="/find-assistance" className="flex flex-col justify-between bg-primary p-7 text-primary-foreground hover:bg-accent">
              <span className="font-mono text-xs text-gold">→</span>
              <p className="mt-3 text-xl font-display">{t(tx("Not sure what you need? Find documentation assistance", "لست متأكدًا؟ ابحث عن المساعدة المناسبة"))}</p>
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-24 text-navy-foreground">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{t(tx("Case traffic light", "إشارة القضية"))}</p>
            <h2 className="mt-3 text-4xl">{t(tx("Every case is scope-checked before we start", "كل قضية تُراجع قبل أن نبدأ"))}</h2>
            <p className="mt-5 text-navy-foreground/70">
              {t(tx("We never recommend a visa, a legal route or predict an outcome. Our scope system protects you and keeps our work administrative.", "لا نرشح تأشيرة أو مسارًا قانونيًا ولا نتوقع نتيجة. نظام النطاق يحميك ويبقي عملنا إداريًا."))}
            </p>
          </div>
          <ul className="grid gap-4">
            {lights.map((l) => (
              <li key={l.k} className="flex items-start gap-4 rounded-lg border border-navy-foreground/10 p-5">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${l.c}`} aria-hidden />
                <div>
                  <p className="ltr font-mono text-sm tracking-widest">{l.k}</p>
                  <p className="mt-1 text-navy-foreground/75">{t(l.t)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <p className="eyebrow">{t(tx("How it works", "كيف نعمل"))}</p>
          <h2 className="mt-3 text-4xl text-primary">{t(tx("From intake to an approved package", "من الاستلام حتى ملف معتمد"))}</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={i} className="border-t-2 border-primary pt-5">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <p className="mt-2 font-medium text-primary">{t(s.t)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.d)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <Link to="/find-assistance" className="btn-primary">{t(tx("Start My Case", "ابدأ قضيتي"))}</Link>
          </div>
        </Container>
      </section>
    </>
  );
}
