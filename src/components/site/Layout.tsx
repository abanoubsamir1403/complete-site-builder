import { Link } from "@tanstack/react-router";
import { useSessionUser } from "@/lib/use-session";
import { useState, type ReactNode } from "react";
import { Menu, X, Globe } from "lucide-react";
import { tx, useLang, type T } from "@/lib/i18n";

const nav: { to: string; label: T; params?: Record<string, string> }[] = [
  { to: "/services", label: tx("Services", "الخدمات") },
  { to: "/knowledge", label: tx("Knowledge Hub", "مركز المعرفة") },
  { to: "/forms", label: tx("Forms", "النماذج") },
  { to: "/services/$slug", params: { slug: "nvc" }, label: tx("NVC", "NVC") },
  { to: "/tools", label: tx("Tools", "الأدوات") },
  { to: "/resources", label: tx("Official Resources", "المصادر الرسمية") },
  { to: "/updates", label: tx("Updates", "التحديثات") },
  { to: "/pricing", label: tx("Pricing", "الأسعار") },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-2">
      <span className="font-display text-xl font-semibold tracking-tight text-primary">MIGRAFILE</span>
      <span className="hidden h-1.5 w-1.5 rounded-full bg-gold sm:block" />
    </Link>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary"
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to + (n.params?.["slug"] ?? "")}
              to={n.to as never}
              params={n.params as never}
              className="text-sm text-muted-foreground transition hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: !!n.params }}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <Link to={user ? "/portal" : "/track"} className="hidden rounded-md bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground hover:bg-accent sm:inline-flex">
            {t(user ? tx("My Portal", "بوابتي") : tx("Track My Case", "تتبع قضيتي"))}
          </Link>
          <button className="xl:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background px-5 py-4 xl:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {[...nav, { to: "/track", label: tx("Track My Case", "تتبع قضيتي") }].map((n) => (
              <li key={n.to + ("params" in n && n.params ? n.params["slug"] : "")}>
                <Link
                  to={n.to as never}
                  params={("params" in n ? n.params : undefined) as never}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm hover:bg-muted"
                >
                  {t(n.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function DisclaimerBar() {
  const { t } = useLang();
  return (
    <div className="bg-navy px-5 py-2 text-center text-[11px] leading-relaxed text-navy-foreground/80">
      {t(
        tx(
          "MIGRAFILE is not a law firm or a U.S. government agency and does not provide legal advice. Services are client-directed administrative documentation only.",
          "MIGRAFILE ليست مكتب محاماة ولا جهة حكومية أمريكية ولا تقدم استشارات قانونية. خدماتنا توثيق إداري بتوجيه من العميل فقط.",
        ),
      )}{" "}
      <Link to="/legal" className="underline underline-offset-2 hover:text-gold">
        {t(tx("Legal notice", "الإشعار القانوني"))}
      </Link>
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  const cols: { h: T; links: { to: string; l: T }[] }[] = [
    {
      h: tx("Platform", "المنصة"),
      links: [
        { to: "/services", l: tx("Services", "الخدمات") },
        { to: "/find-assistance", l: tx("Find documentation assistance", "ابحث عن المساعدة المناسبة") },
        { to: "/how-it-works", l: tx("How it works", "كيف نعمل") },
        { to: "/pricing", l: tx("Pricing & fees", "الأسعار والرسوم") },
      ],
    },
    {
      h: tx("Knowledge", "المعرفة"),
      links: [
        { to: "/knowledge", l: tx("Knowledge Hub", "مركز المعرفة") },
        { to: "/forms", l: tx("Forms Library", "مكتبة النماذج") },
        { to: "/tools", l: tx("Free tools", "أدوات مجانية") },
        { to: "/resources", l: tx("Official directory", "الدليل الرسمي") },
      ],
    },
    {
      h: tx("Company", "الشركة"),
      links: [
        { to: "/about", l: tx("About", "من نحن") },
        { to: "/contact", l: tx("Contact & complaints", "التواصل والشكاوى") },
        { to: "/outside-scope", l: tx("Services outside our scope", "خدمات خارج نطاقنا") },
        { to: "/security", l: tx("Security & privacy", "الأمان والخصوصية") },
        { to: "/legal", l: tx("Legal notice & terms", "الإشعار القانوني والشروط") },
      ],
    },
  ];
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">MIGRAFILE</p>
          <p className="mt-3 text-sm text-navy-foreground/70">
            {t(tx("We organize the immigration process. You stay in control.", "نحن ننظم إجراءات الهجرة. وأنت تبقى صاحب القرار."))}
          </p>
          <p className="mt-6 text-xs text-navy-foreground/50">{t(tx("Operated from Egypt", "يُدار من مصر"))}</p>
        </div>
        {cols.map((c) => (
          <div key={c.h.en}>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{t(c.h)}</p>
            <ul className="mt-4 grid gap-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to as never} className="text-sm text-navy-foreground/75 hover:text-navy-foreground">
                    {t(l.l)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-navy-foreground/10 px-5 py-6 text-center text-xs text-navy-foreground/50">
        © 2026 MIGRAFILE ·{" "}
        {t(tx("Not affiliated with USCIS, the U.S. Department of State, or any government agency.", "غير تابعة لـ USCIS أو وزارة الخارجية الأمريكية أو أي جهة حكومية."))}
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: T; title: T; intro?: T | undefined }) {
  const { t } = useLang();
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="eyebrow">{t(eyebrow)}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-primary md:text-5xl">{t(title)}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t(intro)}</p>}
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 ${className}`}>{children}</div>;
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border-s-2 border-gold bg-secondary px-5 py-4 text-sm text-muted-foreground">{children}</div>;
}
