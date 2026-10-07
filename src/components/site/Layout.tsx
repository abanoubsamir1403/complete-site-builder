import logoMark from "@/assets/logo-mark.png";
import { Link } from "@tanstack/react-router";
import { useSessionUser } from "@/lib/use-session";
import { useState, type ReactNode } from "react";
import { Menu, X, Globe } from "lucide-react";
import { tx, useLang, type T } from "@/lib/i18n";

const nav: { to: string; label: T; params?: Record<string, string> }[] = [
  { to: "/services", label: tx("Services", "الخدمات") },
  { to: "/knowledge", label: tx("Knowledge Hub", "مركز المعرفة") },
  { to: "/forms", label: tx("Forms", "النماذج") },
  { to: "/tools", label: tx("Tools", "الأدوات") },
  { to: "/resources", label: tx("Official Resources", "المصادر الرسمية") },
];

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="MIGRAFILE home">
      <span className="mf-header-mark grid h-9 w-9 place-items-center rounded-full bg-secondary transition-colors group-hover:bg-accent/15">
        <img src={logoMark} alt="" width={32} height={32} className="h-7 w-auto transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" />
      </span>
      <span className="ltr font-display text-lg font-bold tracking-tight text-primary">MIGRAFILE</span>
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
  const user = useSessionUser();
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

export const WHATSAPP_URL = "https://wa.me/12674677785";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppHelp() {
  const { t } = useLang();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(tx("Contact us on WhatsApp +1 (267) 467-7785", "تواصل معنا عبر واتساب ‎+1 (267) 467-7785"))}
      className="group fixed bottom-4 start-4 z-50 flex items-center gap-3 rounded-2xl border border-[#12968C]/25 bg-white/90 px-3 py-2.5 shadow-xl shadow-[#0D2B5E]/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#12968C]/45 hover:shadow-2xl hover:shadow-[#12968C]/15 sm:bottom-6 sm:start-6 sm:px-4 sm:py-3"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] text-[#12968C] sm:h-10 sm:w-10">
        <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="hidden flex-col items-start gap-0.5 sm:flex">
        <span
          className="text-sm font-semibold leading-none tracking-tight text-[#0D2B5E]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {t(tx("Need help?", "محتاج مساعدة؟"))}
        </span>
        <span className="ltr text-[11px] font-medium leading-none text-[#7A9FD1]">
          +1 (267) 467-7785
        </span>
      </span>
      <span className="hidden w-4 overflow-hidden sm:flex sm:items-center">
        <svg
          className="h-4 w-4 -translate-x-1 text-[#12968C] transition-transform duration-300 group-hover:translate-x-0 rtl:rotate-180 rtl:translate-x-1 rtl:group-hover:translate-x-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
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
        { to: "/contact", l: tx("Contact us", "تواصل معنا") },
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
    <section className="mf-page-header relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-y-0 start-0 w-1 bg-accent" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="eyebrow mf-reveal mf-delay-1">{t(eyebrow)}</p>
        <h1 className="mf-reveal mf-delay-2 mt-4 max-w-3xl text-3xl leading-tight text-primary md:text-5xl">{t(title)}</h1>
        {intro && <p className="mf-reveal mf-delay-3 mt-5 max-w-2xl text-lg text-muted-foreground">{t(intro)}</p>}
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
