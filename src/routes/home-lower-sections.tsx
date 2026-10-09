import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { tx, useLang } from "@/lib/i18n";
import { Container } from "@/components/site/Layout";

const steps = [
  { t: tx("Tell us what help you need", "أخبرنا بنوع المساعدة"), d: tx("Translation, organizing a file, data entry for a form you selected, or tracking.", "ترجمة، تنظيم ملف، إدخال بيانات لنموذج اخترته، أو متابعة.") },
  { t: tx("Scope review", "مراجعة النطاق"), d: tx("Every case is checked against our GREEN / YELLOW / RED scope system before work begins.", "تُراجع كل قضية وفق نظام الأخضر/الأصفر/الأحمر قبل بدء العمل.") },
  { t: tx("Document specialist & QC", "أخصائي المستندات ومراجعة الجودة"), d: tx("A specialist organizes your file; an independent reviewer checks it.", "يُنظم الأخصائي ملفك ويراجعه مراجع مستقل.") },
  { t: tx("You review and approve", "أنت تراجع وتعتمد"), d: tx("Nothing is submitted without your explicit approval and signature.", "لا يُرسل أي شيء بدون موافقتك وتوقيعك الصريح.") },
];

export default function HomeLowerSections() {
  const { t } = useLang();

  return (
    <>
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
          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-accent/30 bg-card p-4 sm:p-8">
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
          <h2 className="mx-auto max-w-2xl text-3xl text-primary md:text-5xl">{t(tx("Ready to get your file organized?", "جاهز تنظم ملفك؟"))}</h2>
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
