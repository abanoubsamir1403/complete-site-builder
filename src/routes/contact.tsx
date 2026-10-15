import { createFileRoute, Link } from "@tanstack/react-router";
import { tx, useLang, type T } from "@/lib/i18n";
import { PageHeader, Container, Notice, WHATSAPP_URL } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import type { CSSProperties, ReactNode } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  ExternalLink,
  Video,
  QrCode,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seo(
      "Contact Us",
      "Contact MIGRAFILE — WhatsApp, email, social media and the complaints process.",
    ),
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/contact%20us.avif",
        type: "image/avif",
        fetchpriority: "high",
      },
    ],
  }),
  component: PContact,
});

// ============ SOCIAL MEDIA LINKS ============
// Add each link between the quotes when it's ready, e.g. url: "https://facebook.com/migrafile".
// A section with url: "" shows as "Coming soon" until you fill it in.
// To hide a platform entirely, set enabled: false.
const SOCIALS: {
  key: string;
  name: T;
  icon: LucideIcon;
  url: string;
  handle?: string;
  hasQr?: boolean;
  enabled?: boolean;
}[] = [
  {
    key: "whatsapp",
    name: tx("WhatsApp", "واتساب"),
    icon: MessageCircle,
    url: WHATSAPP_URL,
    handle: "+1 (267) 467-7785",
    hasQr: true,
  },
  { key: "facebook", name: tx("Facebook", "Facebook"), icon: Facebook, url: "" },
  { key: "instagram", name: tx("Instagram", "Instagram"), icon: Instagram, url: "" },
  { key: "linkedin", name: tx("LinkedIn", "LinkedIn"), icon: Linkedin, url: "" },
];
// ============================================

function WhatsAppQrDialog({ trigger }: { trigger: ReactNode }) {
  const { t } = useLang();
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm p-6 text-center">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-lg text-primary">
            {t(tx("Chat on WhatsApp", "تواصل معنا عبر واتساب"))}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3 flex flex-col items-center">
          <div className="overflow-hidden rounded-2xl border bg-white p-2 shadow-sm">
            <picture>
              <source srcSet="/whatsapp-qr.webp" type="image/webp" />
              <img
                src="/whatsapp-qr.jpg"
                alt={t(tx("MIGRAFILE WhatsApp QR Code", "رمز QR لواتساب MIGRAFILE"))}
                className="max-h-[360px] w-auto rounded-xl object-contain"
              />
            </picture>
          </div>
          <p className="mt-3 font-mono text-sm font-semibold text-primary" dir="ltr">
            +1 (267) 467-7785
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t(
              tx(
                "Scan with WhatsApp camera or click below to start a chat.",
                "امسح الرمز بكاميرا واتساب أو اضغط بالأسفل لبدء المحادثة.",
              ),
            )}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-accent transition"
          >
            <MessageCircle className="h-4 w-4" />
            {t(tx("Open WhatsApp Chat", "فتح محادثة واتساب"))}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SocialGrid() {
  const { t } = useLang();
  return (
    <div className="mf-stagger grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              {ready
                ? (s.handle ?? s.url.replace(/^https?:\/\/(www\.)?/, ""))
                : t(tx("Coming soon", "قريبًا"))}
            </p>
          </>
        );
        return (
          <div
            key={s.key}
            style={{ "--mf-index": i } as CSSProperties}
            className={`doc-card mf-stagger-item group flex flex-col justify-between p-5 ${ready ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]" : "opacity-70"}`}
          >
            {ready ? (
              <>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(s.name)}
                  className="block cursor-pointer"
                >
                  {inner}
                </a>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/40 pt-2.5">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    {t(tx("Open", "افتح"))}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                  {s.hasQr && (
                    <WhatsAppQrDialog
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-accent cursor-pointer transition"
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          {t(tx("QR Code", "رمز QR"))}
                        </button>
                      }
                    />
                  )}
                </div>
              </>
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
        imageSrc="/contact%20us.jpeg"
        imageAlt={tx(
          "MIGRAFILE team member ready to help",
          "أحد أعضاء فريق MIGRAFILE مستعد لمساعدتك",
        )}
        intro={tx(
          "MIGRAFILE is an online private service. Contact us on WhatsApp for support and privacy inquiries; appointments are remote.",
          "MIGRAFILE خدمة خاصة عبر الإنترنت. تواصل معنا عبر واتساب للدعم واستفسارات الخصوصية؛ والمواعيد عن بُعد.",
        )}
      />
      <Container className="py-16">
        <div className="mf-reveal mf-delay-1 grid gap-10">
          <section aria-labelledby="contact-social">
            <h2 id="contact-social" className="text-xl font-semibold text-primary">
              {t(tx("Follow us", "تابعنا على السوشيال ميديا"))}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                tx(
                  "Our official accounts — tap any card to open the profile.",
                  "حساباتنا الرسمية — اضغط على أي كارت لفتح الحساب.",
                ),
              )}
            </p>
            <div className="mt-6">
              <SocialGrid />
            </div>
          </section>

          <section aria-labelledby="contact-details">
            <h2 id="contact-details" className="text-xl font-semibold text-primary">
              {t(tx("Contact details", "بيانات التواصل"))}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="doc-card flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                        {t(
                          tx(
                            "Support & Privacy Contact — WhatsApp",
                            "الدعم واستفسارات الخصوصية — واتساب",
                          ),
                        )}
                      </p>
                      <p className="ltr mt-2 font-display text-lg font-semibold text-primary">
                        +1 (267) 467-7785
                      </p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-4">
                    <WhatsAppQrDialog
                      trigger={
                        <button
                          type="button"
                          className="group relative flex w-full flex-col items-center justify-center rounded-xl border border-border/80 bg-background/80 p-3 shadow-2xs hover:border-accent hover:bg-accent/5 transition cursor-pointer"
                        >
                          <div className="rounded-lg bg-white p-2 shadow-xs ring-1 ring-border/50">
                            <picture>
                              <source srcSet="/whatsapp-qr-square.webp" type="image/webp" />
                              <img
                                src="/whatsapp-qr-square.jpg"
                                alt={t(tx("WhatsApp QR Code", "رمز QR للواتساب"))}
                                width={112}
                                height={112}
                                className="h-28 w-28 object-contain transition group-hover:scale-105"
                              />
                            </picture>
                          </div>
                          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                            <QrCode className="h-3.5 w-3.5" />
                            {t(tx("Click to expand QR Code", "اضغط لتكبير رمز QR"))}
                          </span>
                        </button>
                      }
                    />
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition hover:bg-accent"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  {t(tx("Chat with us", "ابدأ محادثة"))}
                </a>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {t(tx("Service availability", "توفر الخدمة"))}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "Appointments are remote; no walk-in option is offered. Clients in all 50 U.S. states may request listed administrative documentation tasks, subject to MIGRAFILE's stated scope and applicable requirements.",
                      "المواعيد عن بُعد ولا تتوفر خدمة استقبال دون موعد. يمكن للعملاء في الولايات الأمريكية الخمسين طلب مهام التوثيق الإداري المدرجة، وفق نطاق MIGRAFILE المعلن والمتطلبات المنطبقة.",
                    ),
                  )}
                </p>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {t(tx("Email — support & privacy", "البريد الإلكتروني — الدعم والخصوصية"))}
                </p>
                <a
                  className="ltr mt-3 inline-block text-sm text-accent hover:underline"
                  href="mailto:Support@migrafile.com"
                >
                  Support@migrafile.com
                </a>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {t(tx("Legal service operator", "الجهة القانونية المشغّلة للخدمة"))}
                </p>
                <p className="mt-3 text-sm font-semibold text-primary">Bob’s Preparations LLC</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "MIGRAFILE is a private service provided by this business.",
                      "MIGRAFILE خدمة خاصة تقدمها هذه الشركة.",
                    ),
                  )}
                </p>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {t(tx("Correspondence address", "عنوان المراسلات"))}
                </p>
                <address className="ltr mt-3 text-sm not-italic text-primary">
                  618 S Broad St
                  <br />
                  Lansdale, PA 19446-5200 USA
                </address>
              </div>
              <div className="doc-card p-5">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {t(tx("Operating model", "طريقة تشغيل الخدمة"))}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(
                    tx(
                      "MIGRAFILE is operated online by Bob’s Preparations LLC. Appointments are remote; the correspondence address is not a walk-in location.",
                      "تُشغّل Bob’s Preparations LLC خدمة MIGRAFILE عبر الإنترنت. المواعيد عن بُعد؛ وعنوان المراسلات ليس موقعًا لاستقبال الزوار.",
                    ),
                  )}
                </p>
              </div>
              <div className="doc-card border-accent/40 bg-accent/5 p-5 sm:col-span-2 lg:col-span-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Video className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-primary">
                        {t(
                          tx(
                            "Schedule a Private Documentation Call",
                            "احجز مكالمة خاصة لتنظيم المستندات",
                          ),
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(
                          tx(
                            "Schedule a Documentation Call. The call covers administrative scope, client-selected records, and workflow only.",
                            "احجز مكالمة لتنظيم المستندات. تقتصر المكالمة على نطاق الخدمة الإدارية والسجلات التي تحددها وسير العمل.",
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/book-interview"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent"
                  >
                    <Video className="h-3.5 w-3.5" />
                    {t(tx("Schedule a Documentation Call", "احجز مكالمة لتنظيم المستندات"))}
                  </Link>
                </div>
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
                    "Every complaint receives a reference number and a written response. Send complaints through WhatsApp with the word “Complaint” and we will register it for you.",
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
