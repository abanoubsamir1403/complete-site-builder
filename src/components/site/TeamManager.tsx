import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTeam, setTeamRole } from "@/lib/team.functions";
import { tx, useLang } from "@/lib/i18n";

export function TeamManager() {
  const { t } = useLang();
  const qc = useQueryClient();
  const list = useServerFn(listTeam);
  const setRole = useServerFn(setTeamRole);
  const team = useQuery({ queryKey: ["team"], queryFn: () => list() });
  const [email, setEmail] = useState("");
  const [role, setR] = useState<"staff" | "admin">("staff");
  const [msg, setMsg] = useState("");

  async function run(e: string, r: "staff" | "admin", remove = false) {
    setMsg("");
    const res = await setRole({ data: { email: e, role: r, remove } });
    if (!res.ok)
      setMsg(res.reason === "self"
        ? t(tx("You can't remove your own role.", "لا يمكنك إزالة صلاحيتك بنفسك."))
        : t(tx("No account with this email. Ask them to sign up first.", "لا يوجد حساب بهذا البريد. اطلب منه إنشاء حساب أولًا.")));
    else { setEmail(""); qc.invalidateQueries({ queryKey: ["team"] }); }
  }

  return (
    <section className="mb-8 rounded-lg border bg-card p-5">
      <h2 className="font-display text-xl">{t(tx("Team & admins", "الفريق والمديرون"))}</h2>
      <form onSubmit={(e) => { e.preventDefault(); if (email) run(email, role); }} className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t(tx("Member email", "بريد العضو"))} className="ltr col-span-2 w-full min-w-0 sm:col-span-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm" />
        <select value={role} onChange={(e) => setR(e.target.value as "staff" | "admin")} className="rounded-md border border-input bg-background px-2 py-1.5 text-sm">
          <option value="staff">{t(tx("Staff", "موظف"))}</option>
          <option value="admin">{t(tx("Admin", "مدير"))}</option>
        </select>
        <button className="btn-primary px-4 py-1.5 text-sm">{t(tx("Add", "إضافة"))}</button>
      </form>
      {msg && <p className="mt-2 text-sm text-destructive">{msg}</p>}
      <ul className="mt-4 divide-y text-sm">
        {(team.data ?? []).map((m) => (
          <li key={m.user_id + m.role} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <span className="ltr col-span-2 min-w-0 break-all sm:col-span-1">{m.email}</span>
            <span className="rounded bg-muted px-2 py-0.5 text-xs">{m.role === "admin" ? t(tx("Admin", "مدير")) : t(tx("Staff", "موظف"))}</span>
            <button onClick={() => run(m.email, m.role as "staff" | "admin", true)} className="text-xs text-destructive underline">{t(tx("Remove", "إزالة"))}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
