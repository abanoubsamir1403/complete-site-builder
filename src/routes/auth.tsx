import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { ShieldCheck, Eye, EyeOff, Lock, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => seo("Client Sign In", "Sign in or create your secure MIGRAFILE client portal account."),
  component: AuthPage,
});

const inputClass =
  "w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-xs transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-slate-700/80 dark:bg-slate-900/90 dark:focus:bg-slate-900";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.4 7.36 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.6 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function AuthPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const errDesc = params.get("error_description") || hashParams.get("error_description") || params.get("error");
      if (errDesc) {
        setMsgType("error");
        setMsg(decodeURIComponent(errDesc.replace(/\+/g, " ")));
      }
      const requestedMode = params.get("mode") || params.get("tab");
      if (requestedMode === "up" || requestedMode === "signup" || requestedMode === "register") {
        setMode("up");
      } else if (requestedMode === "forgot" || requestedMode === "reset") {
        setMode("forgot");
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/portal" });
    });
    const { data } = supabase.auth.onAuthStateChange((e, s) => {
      if (s && e === "SIGNED_IN") navigate({ to: "/portal" });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/portal",
            data: { full_name: name },
          },
        });
        if (error) throw error;
        setMsgType("success");
        setMsg(t(tx("Check your email to confirm your account.", "تحقق من بريدك الإلكتروني لتأكيد حسابك.")));
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        setMsgType("success");
        setMsg(
          t(tx("A reset link has been sent if the account exists.", "تم إرسال رابط إعادة التعيين إذا كان الحساب موجودًا.")),
        );
      }
    } catch (err) {
      setMsgType("error");
      setMsg((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setMsgType("error");
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
        {/* Subtle dark gradient overlay to ensure perfect contrast and depth */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/60 via-slate-950/40 to-navy/70 backdrop-brightness-95"
          aria-hidden
        />
      </div>

      {/* Frosted Glass Login / Register Card */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="glass-card auth-glass-card rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
          {/* Card Header & Brand Icon */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-13 w-13 items-center justify-center rounded-2xl bg-white/70 shadow-sm border border-white/60 dark:bg-slate-900/60 dark:border-white/10">
              <ShieldCheck className="h-7 w-7 text-accent" />
            </div>
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-0.5 text-xs font-medium text-accent">
              {t(tx("Secure Client Portal", "بوابة العملاء الآمنة"))}
            </span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {mode === "in"
                ? t(tx("Sign in to your account", "تسجيل الدخول إلى حسابك"))
                : mode === "up"
                ? t(tx("Create your account", "إنشاء حساب جديد"))
                : t(tx("Reset your password", "استعادة كلمة المرور"))}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {mode === "in"
                ? t(tx("Manage your cases, forms and track progress", "تابع قضاياك، معاملاتك وتقدم ملفك بكل سهولة"))
                : mode === "up"
                ? t(tx("Get started with your immigration documentation", "ابدأ إجراءات وتوثيق معاملات الهجرة الخاصة بك"))
                : t(tx("Enter your registered email to receive a reset link", "أدخل بريدك الإلكتروني المسجل لاستلام رابط الاستعادة"))}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Register) */}
          {mode !== "forgot" ? (
            <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-900/10 p-1 backdrop-blur-xs dark:bg-white/10">
              <button
                type="button"
                onClick={() => {
                  setMode("in");
                  setMsg(null);
                }}
                className={`cursor-pointer rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all ${
                  mode === "in"
                    ? "bg-white text-primary shadow-xs dark:bg-slate-900 dark:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(tx("Sign In", "تسجيل الدخول"))}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("up");
                  setMsg(null);
                }}
                className={`cursor-pointer rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all ${
                  mode === "up"
                    ? "bg-white text-primary shadow-xs dark:bg-slate-900 dark:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(tx("Create Account", "تسجيل حساب جديد"))}
              </button>
            </div>
          ) : (
            <div className="mb-5 flex items-center justify-start">
              <button
                type="button"
                onClick={() => {
                  setMode("in");
                  setMsg(null);
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
              >
                <BackIcon className="h-3.5 w-3.5" />
                <span>{t(tx("Back to Sign In", "العودة لتسجيل الدخول"))}</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="grid gap-4">
            {mode === "up" && (
              <label className="grid gap-1.5 text-xs font-medium text-foreground">
                <span>
                  {t(tx("Full name", "الاسم الكامل"))} <span className="text-destructive">*</span>
                </span>
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(tx("Enter your full name", "أدخل اسمك بالكامل"))}
                  required
                />
              </label>
            )}

            <label className="grid gap-1.5 text-xs font-medium text-foreground">
              <span>
                {lang === "ar" ? "البريد الإلكتروني" : "Email address"}{" "}
                <span className="text-destructive">*</span>
              </span>
              <input
                className={inputClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>

            {mode !== "forgot" && (
              <label className="grid gap-1.5 text-xs font-medium text-foreground">
                <div className="flex items-center justify-between">
                  <span>
                    {t(tx("Password", "كلمة المرور"))} <span className="text-destructive">*</span>
                  </span>
                  {mode === "in" && (
                    <button
                      type="button"
                      className="text-xs text-primary hover:text-accent hover:underline"
                      onClick={() => {
                        setMode("forgot");
                        setMsg(null);
                      }}
                    >
                      {t(tx("Forgot password?", "نسيت كلمة المرور؟"))}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    className={`${inputClass} pe-10`}
                    type={showPassword ? "text" : "password"}
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(tx("At least 8 characters", "8 أحرف على الأقل"))}
                    required
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
            )}

            {/* Notification / Feedback Banner */}
            {msg && (
              <div
                className={`flex items-start gap-2.5 rounded-xl p-3 text-xs ${
                  msgType === "success"
                    ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 dark:text-emerald-300"
                    : "bg-destructive/15 text-destructive border border-destructive/30"
                }`}
              >
                {msgType === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{msg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={busy}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
            >
              {busy ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />
              ) : null}
              <span>
                {mode === "in"
                  ? t(tx("Sign In", "تسجيل الدخول"))
                  : mode === "up"
                  ? t(tx("Create Account", "إنشاء الحساب"))
                  : t(tx("Send Reset Link", "إرسال رابط الاستعادة"))}
              </span>
            </button>

            {/* Google OAuth & Separator */}
            {mode !== "forgot" && (
              <>
                <div className="relative my-1 flex items-center justify-center">
                  <div className="min-w-0 flex-1 border-t border-slate-300/60 dark:border-slate-700/60" />
                  <span className="relative shrink-0 whitespace-nowrap bg-transparent px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {t(tx("Or continue with", "أو تابع عبر"))}
                  </span>
                  <div className="min-w-0 flex-1 border-t border-slate-300/60 dark:border-slate-700/60" />
                </div>

                <button
                  type="button"
                  onClick={google}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground shadow-xs transition-all duration-200 hover:bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-900 cursor-pointer"
                >
                  <GoogleIcon />
                  <span>{t(tx("Continue with Google", "المتابعة باستخدام Google"))}</span>
                </button>
              </>
            )}

            {/* Footer switcher link */}
            <div className="mt-1 flex items-center justify-center text-center text-xs text-muted-foreground">
              {mode === "up" ? (
                <span>
                  {t(tx("Already have an account?", "لديك حساب بالفعل؟"))}{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:text-accent hover:underline cursor-pointer"
                    onClick={() => {
                      setMode("in");
                      setMsg(null);
                    }}
                  >
                    {t(tx("Sign In", "سجّل الدخول"))}
                  </button>
                </span>
              ) : mode === "in" ? (
                <span>
                  {t(tx("Don't have an account?", "ليس لديك حساب بعد؟"))}{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:text-accent hover:underline cursor-pointer"
                    onClick={() => {
                      setMode("up");
                      setMsg(null);
                    }}
                  >
                    {t(tx("Create account", "أنشئ حسابك الآن"))}
                  </button>
                </span>
              ) : null}
            </div>
          </form>

          {/* Security badge at bottom of card */}
          <div className="mt-6 pt-4 border-t border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3 text-accent" />
            <span>{t(tx("256-bit encrypted • Secure official portal", "اتصال آمن ومشفّر • بوابة MIGRAFILE الرسمية"))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
