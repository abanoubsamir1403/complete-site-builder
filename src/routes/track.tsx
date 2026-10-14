import { createFileRoute, Link } from "@tanstack/react-router";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { useSessionUser } from "@/lib/use-session";
import { WHATSAPP_URL } from "@/components/site/Layout";
import {
  ShieldCheck,
  Lock,
  Clock,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  FolderLock,
  UserCheck,
} from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    ...seo(
      "Track My Case",
      "Secure client portal for tracking your MIGRAFILE case progress, documents, and milestones.",
    ),
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/track-bg.avif",
        type: "image/avif",
        fetchpriority: "high",
      },
    ],
  }),
  component: PTrack,
});

function PTrack() {
  const { t, lang } = useLang();
  const user = useSessionUser();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source type="image/avif" srcSet="/track-bg.avif" />
          <source type="image/webp" srcSet="/track-bg.webp" />
          <img
            src="/track-bg.jpg"
            alt={t(tx("MIGRAFILE case tracking portal backdrop", "خلفية بوابة تتبع معاملات MIGRAFILE"))}
            className="h-full w-full object-cover object-center sm:object-[center_35%] brightness-[0.98] contrast-[1.02]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
        {/* Frosted backdrop overlay to ensure contrast and readability while keeping the 3D illustration visible */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/65 to-background/85 backdrop-blur-[2px] dark:from-slate-950/85 dark:via-slate-950/80 dark:to-slate-950/90"
          aria-hidden
        />
      </div>

      {/* Centered Frosted Glass Tracking Card */}
      <div className="relative z-10 w-full max-w-xl mx-auto mf-fade-up">
        <div className="glass-card auth-glass-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all">
          {/* Header & Icon */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 shadow-sm border border-white/60 dark:bg-slate-900/70 dark:border-white/10">
              <ShieldCheck className="h-7 w-7 text-accent" />
            </div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3.5 py-1 text-xs font-semibold text-accent">
              <Lock className="h-3.5 w-3.5" />
              {t(tx("Secure Client Portal", "بوابة العملاء المشفرة"))}
            </span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t(tx("Track Your Case", "تتبع مسار قضيتك"))}
            </h1>
            <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              {t(
                tx(
                  "Sign in to your private account to view real-time case progress, active milestones, and organized documents.",
                  "سجّل الدخول إلى حسابك الخاص لمتابعة تقدم المعاملة، المراحل الجارية، والمستندات المنظمة بأمان.",
                ),
              )}
            </p>
          </div>

          {/* Action Area */}
          <div className="mb-6">
            {user ? (
              <div className="grid gap-3">
                <div className="flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-medium text-accent">
                  <UserCheck className="h-4 w-4" />
                  <span>
                    {t(tx("Signed in as:", "مسجل الدخول باسم:"))} <strong className="font-semibold">{user.email}</strong>
                  </span>
                </div>
                <Link
                  to="/portal"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-accent"
                >
                  <span>{t(tx("Open My Portal Dashboard", "افتح لوحة تحكم بوابتي"))}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/auth"
                  search={{ redirect: "/portal" } as never}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-accent"
                >
                  <span>{t(tx("Sign In to Portal", "تسجيل الدخول إلى البوابة"))}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: "up" } as never}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white/70 px-5 py-3 text-sm font-semibold text-primary shadow-xs transition hover:border-accent hover:bg-accent/10 dark:bg-slate-900/60 dark:text-white"
                >
                  <span>{t(tx("Create Account", "إنشاء حساب جديد"))}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Tracking Value Props */}
          <div className="grid gap-2.5 rounded-2xl border border-border/70 bg-white/50 p-3.5 sm:p-4 text-xs text-muted-foreground backdrop-blur-xs dark:bg-slate-900/40">
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <strong className="text-foreground">{t(tx("Live Milestone Updates:", "متابعة المراحل أولاً بأول:"))}</strong>{" "}
                {t(
                  tx(
                    "Monitor every stage from initial intake to clerical check and final client approval.",
                    "متابعة كل خطوة من بدء الخدمة والفحص وحتى الاعتماد النهائي للملف.",
                  ),
                )}
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <strong className="text-foreground">{t(tx("Document Repository:", "أرشيف المستندات والملفات:"))}</strong>{" "}
                {t(
                  tx(
                    "Upload requested records and download organized packages whenever you need.",
                    "رفع النواقص المطلوبة وتنزيل المعاملات المنظمة والجاهزة في أي وقت.",
                  ),
                )}
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <FolderLock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <strong className="text-foreground">{t(tx("Protected & Confidential:", "سرية وخصوصية تامة:"))}</strong>{" "}
                {t(
                  tx(
                    "For your privacy, case files cannot be looked up by public case number alone.",
                    "لحمايتك، لا يمكن الاستعلام عن القضايا برقم الملف وحده دون تسجيل دخول آمن وموثق.",
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Help & Support Footer Link */}
          <div className="mt-5 text-center text-xs text-muted-foreground">
            <span>{t(tx("Need assistance accessing your case?", "تواجه صعوبة في الوصول إلى ملفك؟"))}</span>{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{t(tx("Contact WhatsApp Support", "تواصل مع الدعم عبر واتساب"))}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
