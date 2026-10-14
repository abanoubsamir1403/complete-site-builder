import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { KeyRound, Eye, EyeOff, Lock, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => seo("Set New Password", "Choose a new password for your MIGRAFILE client account."),
  component: Reset,
});

const inputClass =
  "w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-xs transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-slate-700/80 dark:bg-slate-900/90 dark:focus:bg-slate-900";

function Reset() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) throw error;
      navigate({ to: "/portal" });
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-8 sm:py-14 overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/auth-bg.jpg"
          alt="MIGRAFILE client portal backdrop"
          className="h-full w-full object-cover object-[center_30%] sm:object-center brightness-[0.88] contrast-[1.05]"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Subtle dark gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/60 via-slate-950/40 to-navy/70 backdrop-brightness-95"
          aria-hidden
        />
      </div>

      {/* Frosted Glass Card */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/70 shadow-sm border border-white/60 dark:bg-slate-900/60 dark:border-white/10">
              <KeyRound className="h-7 w-7 text-accent" />
            </div>
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-0.5 text-xs font-medium text-accent">
              {t(tx("Security Check", "التحقق الأمني"))}
            </span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t(tx("Set a new password", "تعيين كلمة مرور جديدة"))}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {t(
                tx(
                  "Choose a strong password to protect your client account",
                  "اختر كلمة مرور قوية لحماية حسابك ومعاملاتك",
                ),
              )}
            </p>
          </div>

          <form onSubmit={submit} className="grid gap-4">
            <label className="grid gap-1.5 text-xs font-medium text-foreground">
              <span>
                {t(tx("New password", "كلمة المرور الجديدة"))} <span className="text-destructive">*</span>
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder={t(tx("At least 8 characters", "8 أحرف على الأقل"))}
                  className={`${inputClass} pe-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? t(tx("Hide password", "إخفاء كلمة المرور"))
                      : t(tx("Show password", "إظهار كلمة المرور"))
                  }
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground/75 hover:text-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {msg && (
              <div className="flex items-start gap-2.5 rounded-xl bg-destructive/15 border border-destructive/30 p-3 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{msg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
            >
              {busy ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
              ) : null}
              <span>{t(tx("Save password", "حفظ كلمة المرور"))}</span>
            </button>

            <div className="mt-2 flex items-center justify-center text-center">
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <BackIcon className="h-3.5 w-3.5" />
                <span>{t(tx("Back to Sign In", "العودة لتسجيل الدخول"))}</span>
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3 text-accent" />
            <span>{t(tx("256-bit encrypted • Secure official portal", "اتصال آمن ومشفّر • بوابة MIGRAFILE الرسمية"))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
