import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang } from "@/lib/i18n";
import { Container, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reset-password")({
  head: () => seo("Set New Password", "Choose a new password for your MIGRAFILE client account."),
  component: Reset,
});

function Reset() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return setMsg(error.message);
    navigate({ to: "/portal" });
  }
  return (
    <>
      <PageHeader eyebrow={tx("Client portal", "بوابة العملاء")} title={tx("Set a new password", "تعيين كلمة مرور جديدة")} />
      <Container className="max-w-md py-14">
        <form onSubmit={submit} className="grid gap-4 rounded-lg border bg-card p-6">
          <label className="grid gap-1 text-sm text-muted-foreground">
            <span>{t(tx("New password", "كلمة المرور الجديدة"))} <span className="text-destructive">*</span></span>
            <input
              type="password"
              minLength={8}
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder={t(tx("New password (at least 8 characters)", "كلمة المرور الجديدة (8 أحرف على الأقل)"))}
              aria-label={t(tx("New password", "كلمة المرور الجديدة"))}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            />
          </label>
          {msg && <p className="text-sm text-accent">{msg}</p>}
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t(tx("Save password", "حفظ كلمة المرور"))}</button>
        </form>
      </Container>
    </>
  );
}
