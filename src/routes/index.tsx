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
      <section className="hero-glow relative overflow-hidden">
        <Container className="pb-10 pt-16 md:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{t(tx("U.S. Immigration Documentation Services", "خدمات توثيق الهجرة الأمريكية"))}</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-primary md:text-7xl">
              {t(tx("Your immigration file.", "ملف هجرتك."))}{" "}
              <span className="text-accent">{t(tx("Organized.", "منظّم."))}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t(tx("Professional documentation and case-management support from Egypt. We organize the process — you stay in control.", "دعم احترافي لتوثيق الملفات وإدارة القضايا من مصر. نحن ننظم الإجراءات — وأنت صاحب القرار."))}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/find-assistance" className="btn-primary">{t(tx("Start My Case", "ابدأ قضيتي"))} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></Link>
              <Link to="/services" className="btn-outline">{t(tx("Browse services", "تصفح الخدمات"))}</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-4">
            <div className="bento relative overflow-hidden p-0 md:col-span-2 md:row-span-2">
              <img src={hero} alt="" width={1600} height={1104} className="h-full min-h-72 w-full object-cover" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border bg-card/95 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{t(tx("Sample case · fictional", "قضية نموذجية · افتراضية"))}</p>
                  <p className="ltr font-mono text-xs text-primary">MF-2026-000125</p>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/3 rounded-full bg-accent" /></div>
                <ul className="mt-3 grid gap-1.5 text-xs">
                  <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-green" />{t(tx("Civil documents — complete", "المستندات المدنية — مكتملة"))}</li>
                  <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-status-yellow" />{t(tx("Financial documents — missing", "المستندات المالية — ناقصة"))}</li>
                </ul>
              </div>
            </div>
            <div className="bento flex flex-col justify-between bg-primary text-primary-foreground md:col-span-2">
              <ShieldCheck className="h-7 w-7 text-gold" />
              <div>
                <p className="font-display text-2xl">{t(tx("Secure client portal", "بوابة عميل آمنة"))}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{t(tx("Upload documents, answer questions, follow every stage.", "ارفع مستنداتك، أجب عن الأسئلة، وتابع كل مرحلة."))}</p>
              </div>
            </div>
            {[
              { i: FileCheck2, l: tx("Clear checklists", "قوائم واضحة"), d: tx("Exactly which documents each service needs.", "المستندات المطلوبة لكل خدمة بالتحديد.") },
              { i: Languages, l: tx("Arabic ⇄ English", "عربي ⇄ إنجليزي"), d: tx("Translation matched to your passport spelling.", "ترجمة مطابقة لكتابة اسمك في الجواز.") },
            ].map(({ i: I, l, d }) => (
              <div key={l.en} className="bento flex flex-col justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"><I className="h-5 w-5" /></span>
                <div><p className="font-display text-lg text-primary">{t(l)}</p><p className="mt-1 text-sm text-muted-foreground">{t(d)}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{t(tx("Seven service divisions", "سبعة أقسام للخدمات"))}</p>
              <h2 className="mt-4 text-4xl text-primary md:text-5xl">{t(tx("Documentation support, clearly scoped", "دعم توثيقي بنطاق واضح"))}</h2>
            </div>
            <Link to="/services" className="text-sm font-medium text-accent hover:underline">{t(tx("All services →", "كل الخدمات ←"))}</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className={`bento group hover:-translate-y-1 hover:border-accent/50 ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold">{s.num}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent rtl:rotate-180" />
                </div>
                <h3 className="mt-6 text-xl text-primary">{t(s.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.summary)}</p>
              </Link>
            ))}
            <Link to="/find-assistance" className="bento flex flex-col justify-between bg-accent text-accent-foreground hover:-translate-y-1 md:col-span-2 lg:col-span-4">
              <ClipboardList className="h-6 w-6" />
              <p className="mt-6 font-display text-xl">{t(tx("Not sure what you need? Find documentation assistance", "لست متأكدًا؟ ابحث عن المساعدة المناسبة"))}</p>
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
              <li key={l.k} className="flex items-start gap-4 rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-5">
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
