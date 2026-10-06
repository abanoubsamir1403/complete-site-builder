import { createFileRoute } from "@tanstack/react-router";
import { tx, useLang, type T } from "@/lib/i18n";
import { PageHeader, Container, Notice, WHATSAPP_URL } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import type { CSSProperties } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Send,
  Music2,
  MessageCircle,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo("Contact Us", "Contact MIGRAFILE — WhatsApp, email, social media and the complaints process."),
  component: PContact,
});

// ============ SOCIAL MEDIA LINKS ============
// Add each link between the quotes when it's ready, e.g. url: "https://facebook.com/migrafile".
// A section with url: "" shows as "Coming soon" until you fill it in.
// To hide a platform entirely, set enabled: false.
const SOCIALS: { key: string; name: T; icon: LucideIcon; url: string; handle?: string; enabled?: boolean }[] = [
  { key: "whatsapp", name: tx("WhatsApp", "واتساب"), icon: MessageCircle, url: WHATSAPP_URL, handle: "+1 (267) 467-7785" },
  { key: "facebook", name: "Facebook", icon: Facebook, url: "" },
  { key: "instagram", name: "Instagram", icon: Instagram, url: "" },
  { key: "tiktok", name: "TikTok", icon: Music2, url: "" },
  { key: "x", name: "X (Twitter)", icon: Twitter, url: "" },
  { key: "youtube", name: "YouTube", icon: Youtube, url: "" },
  { key: "linkedin", name: "LinkedIn", icon: Linkedin, url: "" },
  { key: "telegram", name: "Telegram", icon: Send, url: "" },
];
// ============================================

function SocialGrid() {
  const { t } = useLang();
  return (
    <div className="mf-stagger grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {SOCIALS.filter((s) => s.enabled !== false).map((s, i) => {
        const Icon = s.icon;
        const ready = s.url !== "";
        const inner = (
          <>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display text-sm font-semibold text-primary">{t(s.name)}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground" dir="ltr">
              {ready ? (s.handle ?? s.url.replace(/^https?:\/\/(www\.)?/, "")) : t(tx("Coming soon", "قريبًا"))}
            </p>
          </>
        );
        return (
          <div
            key={s.key}
            style={{ "--mf-index": i } as React.CSSProperties}
            className={`doc-card mf-stagger-item group p-5 ${ready ? "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]" : "opacity-70"}`}
          >
            {ready ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={t(s.name)} className="block">
                {inner}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  {t(tx("Open", "افتح"))}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </span>
              </a>
            ) : (
              inner
            )}
          </div>
        );
      })}
    </div>
  );
}

function PContact() {
  const { t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={tx("Get in touch", "تواصل معنا")}
        title={tx("Contact us", "تواصل معنا")}
        intro={tx(
          "We're on WhatsApp, and our official social media channels are listed below. Follow us for updates and reach out any time.",
          "أهلًا بك. تواصل معنا واتساب في أي وقت، وتابع حساباتنا الرسمية على السوشيال ميديا من هنا.",
        )}
      />
      <Container className="py-16">
        <div className="mf-reveal mf-delay-1 grid gap-10">
          <section aria-labelledby="contact-social">
            <h2 id="contact-social" className="text-xl font-semibold text-primary">
              {t(tx("Follow us", "تابعنا على السوشيال ميديا"))}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(tx("Our official accounts — tap any card to open the profile.", "حساباتنا الرسمية — اضغط على أي كارت لفتح الحساب."))}
            </p>
            <div className="mt-6">
              <SocialGrid />
            </div>
          </section>

          <section aria-labelledby="contact-details">
            <h2 id="contact-details" className="text-xl font-semibold text-primary">
              {t(tx("Contact details", "بيانات التواصل"))}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">{t(tx("WhatsApp", "واتساب"))}</p>
                <p className="ltr mt-3 font-display text-lg font-semibold text-primary">+1 (267) 467-7785</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:bg-accent"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  {t(tx("Chat with us", "ابدأ محادثة"))}
                </a>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">{t(tx("Email", "البريد الإلكتروني"))}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t(tx("To be confirmed", "يُحدد لاحقًا"))}</p>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">{t(tx("Office", "المكتب"))}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t(tx("To be confirmed", "يُحدد لاحقًا"))}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="contact-complaints">
            <h2 id="contact-complaints" className="text-xl font-semibold text-primary">
              {t(tx("Complaints", "الشكاوى"))}
            </h2>
            <div className="mt-5">
              <Notice>
                {t(
                  tx(
                    "Every complaint receives a reference number and a written response. Send complaints through WhatsApp with the words “Complaint / شكوى” and we will register it for you.",
                    "كل شكوى تحصل على رقم مرجعي ورد مكتوب. ابعت شكواك من خلال واتساب بكلمة «شكوى» وهنسجلها لك فورًا.",
                  ),
                )}
              </Notice>
            </div>
            <div className="mt-6">
              <Notice>
                {t(
                  tx(
                    "Do not send passports or personal documents by email or chat. Upload them only through your secure portal.",
                    "لا ترسل جوازات السفر أو مستنداتك الشخصية عبر البريد أو المحادثات. ارفعها فقط من خلال بوابتك الآمنة.",
                  ),
                )}
              </Notice>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
