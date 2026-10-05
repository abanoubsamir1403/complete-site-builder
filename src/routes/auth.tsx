import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { tx, useLang } from "@/lib/i18n";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => seo("Client Sign In", "Sign in or create your secure MIGRAFILE client portal account."),
  component: AuthPage,
});

const input = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

function AuthPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/portal" }); });
    const { data } = supabase.auth.onAuthStateChange((e, s) => { if (s && e === "SIGNED_IN") navigate({ to: "/portal" }); });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/portal", data: { full_name: name } } });
        if (error) throw error;
        setMsg(t(tx("Check your email to confirm your account.", "تحقق من بريدك الإلكتروني لتأكيد حسابك.")));
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
        if (error) throw error;
        setMsg(t(tx("A reset link has been sent if the account exists.", "تم إرسال رابط إعادة التعيين إذا كان الحساب موجودًا.")));
      }
    } catch (err) {
      setMsg((err as Error).message);
    } finally { setBusy(false); }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (r.error) setMsg(r.error.message);
  }

  const title = mode === "in" ? tx("Sign in", "تسجيل الدخول") : mode === "up" ? tx("Create account", "إنشاء حساب") : tx("Reset password", "إعادة تعيين كلمة المرور");

  return (
    <>
      <PageHeader eyebrow={tx("Client portal", "بوابة العملاء")} title={title} />
      <Container className="max-w-md py-14">
        <form onSubmit={submit} className="grid gap-4 rounded-lg border bg-card p-6">
          {mode === "up" && (
            <label className="grid gap-1 text-sm">{t(tx("Full name", "الاسم الكامل"))}
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} required /></label>
          )}
          <label className="grid gap-1 text-sm">{t(tx("Email", "البريد الإلكتروني"))}
            <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          {mode !== "forgot" && (
            <label className="grid gap-1 text-sm">{t(tx("Password", "كلمة المرور"))}
              <input className={input} type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          )}
          {msg && <p className="text-sm text-accent">{msg}</p>}
          <button disabled={busy} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent disabled:opacity-60">{t(title)}</button>
          {mode !== "forgot" && (
            <button type="button" onClick={google} className="rounded-md border px-4 py-2 text-sm hover:bg-muted">{t(tx("Continue with Google", "المتابعة باستخدام Google"))}</button>
          )}
          <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
            <button type="button" className="underline" onClick={() => setMode(mode === "up" ? "in" : "up")}>
              {t(mode === "up" ? tx("Have an account? Sign in", "لديك حساب؟ سجّل الدخول") : tx("New client? Create account", "عميل جديد؟ أنشئ حسابًا"))}
            </button>
            {mode === "in" && <button type="button" className="underline" onClick={() => setMode("forgot")}>{t(tx("Forgot password?", "نسيت كلمة المرور؟"))}</button>}
          </div>
        </form>
      </Container>
    </>
  );
}
