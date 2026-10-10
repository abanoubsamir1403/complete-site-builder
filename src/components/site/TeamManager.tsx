import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTeam, setTeamRole } from "@/lib/team.functions";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang } from "@/lib/i18n";
import { Shield, UserPlus, Check, Copy, UserCheck, KeyRound } from "lucide-react";

export function TeamManager() {
  const { t } = useLang();
  const qc = useQueryClient();
  const list = useServerFn(listTeam);
  const setRole = useServerFn(setTeamRole);
  const getAuthHeaders = async () => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { authorization: `Bearer ${token}` } : {};
  };
  const team = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      return list({ headers });
    },
  });

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleState] = useState<"staff" | "admin">("staff");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [createdInfo, setCreatedInfo] = useState<{
    email: string;
    role: string;
    tempPassword?: string | null;
    isNew: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setMsg("");
    setCreatedInfo(null);

    try {
      const headers = await getAuthHeaders();
      const res = await setRole({
        data: {
          email,
          role,
          full_name: fullName.trim() || null,
          password: password.trim() || null,
          remove: false,
        },
        headers,
      });

      if (!res.ok) {
        setMsg(
          res.reason === "self"
            ? t(tx("You cannot modify your own administrative role.", "لا يمكنك تعديل صلاحيتك الإدارية بنفسك."))
            : t(tx("Failed to set role. Please check the email format.", "تعذر تعيين الصلاحية. يرجى التحقق من صحة البريد الإلكتروني.")),
        );
      } else {
        setCreatedInfo({
          email: res.email,
          role: res.role,
          tempPassword: res.tempPassword,
          isNew: !!res.createdNew,
        });
        setEmail("");
        setFullName("");
        setPassword("");
        qc.invalidateQueries({ queryKey: ["team"] });
        qc.invalidateQueries({ queryKey: ["admin-users"] });
      }
    } catch (err: any) {
      setMsg(err?.message || t(tx("An error occurred while saving the member.", "حدث خطأ أثناء حفظ العضو.")));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRemove(memberEmail: string, memberRole: "staff" | "admin") {
    if (!confirm(t(tx(`Remove ${memberEmail} from ${memberRole}?`, `هل أنت متأكد من إزالة ${memberEmail} من فريق ${memberRole === "admin" ? "المديرين" : "الموظفين"}؟`)))) {
      return;
    }
    setMsg("");
    setCreatedInfo(null);

    try {
      const headers = await getAuthHeaders();
      const res = await setRole({
        data: {
          email: memberEmail,
          role: memberRole,
          remove: true,
        },
        headers,
      });

      if (!res.ok) {
        setMsg(t(tx("You cannot remove your own role.", "لا يمكنك إزالة صلاحيتك بنفسك.")));
      } else {
        qc.invalidateQueries({ queryKey: ["team"] });
        qc.invalidateQueries({ queryKey: ["admin-users"] });
      }
    } catch (err: any) {
      setMsg(err?.message || t(tx("Failed to remove role.", "فشل إزالة الصلاحية.")));
    }
  }

  function copyCredentials() {
    if (!createdInfo) return;
    const text = `Email: ${createdInfo.email}\nRole: ${createdInfo.role}${
      createdInfo.tempPassword ? `\nPassword: ${createdInfo.tempPassword}` : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="team-manager-section" className="rounded-2xl border bg-card p-5 sm:p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl text-primary">{t(tx("Team & Staff Management", "إدارة فريق العمل والمديرين"))}</h3>
            <p className="text-xs text-muted-foreground">
              {t(
                tx(
                  "Add staff or admins directly. If they don't have an account, one will be created automatically.",
                  "أضف موظفين أو مدراء مباشرةً. إذا لم يكن لديهم حساب، فسيتم إنشاؤه وتعيين كلمة مرور له تلقائيًا.",
                ),
              )}
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground">
          {team.data?.length ?? 0} {t(tx("Active Members", "أعضاء نشطون"))}
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="mt-5 rounded-xl border bg-background/50 p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
          <UserPlus className="h-4 w-4 text-accent" />
          {t(tx("Add Employee or Admin", "إضافة موظف أو مدير جديد"))}
        </h4>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-1 text-xs font-medium">
            {t(tx("Member Email *", "البريد الإلكتروني *"))}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@migrafile.com"
              className="ltr rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium">
            {t(tx("Full Name (optional)", "الاسم الكامل (اختياري)"))}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t(tx("e.g. Ahmed Mostafa", "مثال: أحمد مصطفى"))}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium">
            {t(tx("Assign Role", "تحديد الصلاحية"))}
            <select
              value={role}
              onChange={(e) => setRoleState(e.target.value as "staff" | "admin")}
              className="rounded-lg border border-input bg-background px-2.5 py-2 text-sm"
            >
              <option value="staff">{t(tx("Staff (Case Reviewer)", "موظف (مراجعة الملفات)"))}</option>
              <option value="admin">{t(tx("Admin (Full Access)", "مدير (صلاحيات كاملة)"))}</option>
            </select>
          </label>

          <label className="grid gap-1 text-xs font-medium">
            {t(tx("Password (auto if blank)", "كلمة المرور (تلقائية إن تُركت فارغة)"))}
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t(tx("Leave blank to auto-generate", "اتركه فارغاً للتوليد التلقائي"))}
              className="ltr rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {t(tx("They can sign in immediately using these credentials.", "سيتمكن من تسجيل الدخول فورًا بهذه البيانات."))}
          </p>
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold disabled:opacity-50"
          >
            <UserCheck className="h-4 w-4" />
            {isSubmitting ? t(tx("Adding...", "جاري الإضافة...")) : t(tx("Add / Create Account", "إضافة / إنشاء الحساب"))}
          </button>
        </div>
      </form>

      {/* Success Banner */}
      {createdInfo && (
        <div className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-bold text-primary flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                {createdInfo.isNew
                  ? t(tx("New account created and role assigned successfully!", "تم إنشاء الحساب وتعيين الصلاحية بنجاح!"))
                  : t(tx("User role updated successfully!", "تم تحديث صلاحية المستخدم بنجاح!"))}
              </p>
              <p className="mt-1 text-xs text-muted-foreground ltr">
                Email: <span className="font-semibold text-foreground">{createdInfo.email}</span> · Role:{" "}
                <span className="font-semibold text-foreground uppercase">{createdInfo.role}</span>
                {createdInfo.tempPassword && (
                  <>
                    {" "}· Password: <span className="font-mono font-bold text-accent">{createdInfo.tempPassword}</span>
                  </>
                )}
              </p>
            </div>
            {createdInfo.tempPassword && (
              <button
                type="button"
                onClick={copyCredentials}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t(tx("Copied!", "تم النسخ!")) : t(tx("Copy Credentials", "نسخ بيانات الدخول"))}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {msg && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive font-medium">
          {msg}
        </div>
      )}

      {/* Members List */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          {t(tx("Current Team Members & Roles", "أعضاء الفريق الحاليين والصلاحيات"))}
        </h4>

        {team.isLoading ? (
          <p className="py-4 text-center text-sm text-muted-foreground">…</p>
        ) : team.isError ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center">
            <p className="text-sm font-medium text-destructive">
              {t(tx("Failed to load team members: ", "تعذر تحميل أعضاء الفريق: "))}
              {(team.error as Error)?.message || t(tx("Unknown error", "خطأ غير معروف"))}
            </p>
            <button
              onClick={() => team.refetch()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              {t(tx("Retry", "إعادة المحاولة"))}
            </button>
          </div>
        ) : (team.data?.length ?? 0) === 0 ? (
          <p className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
            {t(tx("No team members found. Add an admin or staff member above.", "لا يوجد أعضاء في الفريق حالياً. أضف مديراً أو موظفاً بالأعلى."))}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="p-3 text-start font-medium">{t(tx("Member", "العضو"))}</th>
                  <th className="p-3 text-start font-medium">{t(tx("Role", "الصلاحية"))}</th>
                  <th className="p-3 text-end font-medium">{t(tx("Action", "الإجراء"))}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(team.data ?? []).map((m) => (
                  <tr key={m.user_id + m.role} className="hover:bg-muted/30">
                    <td className="p-3">
                      <p className="font-medium text-foreground">{m.full_name || "—"}</p>
                      <p className="ltr text-xs text-muted-foreground">{m.email}</p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                          m.role === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent/20 text-accent font-bold"
                        }`}
                      >
                        <Shield className="h-3 w-3" />
                        {m.role === "admin" ? t(tx("Admin", "مدير")) : t(tx("Staff", "موظف"))}
                      </span>
                    </td>
                    <td className="p-3 text-end">
                      <button
                        type="button"
                        onClick={() => handleRemove(m.email, m.role)}
                        className="text-xs text-destructive hover:underline font-medium"
                      >
                        {t(tx("Remove Role", "إزالة الصلاحية"))}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
