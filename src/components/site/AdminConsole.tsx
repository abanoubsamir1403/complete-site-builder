import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Users, BarChart3, Activity, Settings2, Search, Video, UserPlus, Shield, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang } from "@/lib/i18n";
import { adminDeleteUser, adminSetBan, adminUpdateUser, listActivity, listAllUsers, type AdminUser } from "@/lib/admin.functions";
import { TeamManager } from "@/components/site/TeamManager";
import { InterviewsManager } from "@/components/site/InterviewsManager";
import { fetchInterviewAppointments } from "@/lib/interview";

type Tab = "overview" | "interviews" | "users" | "stats" | "activity";
const COLORS = ["var(--color-primary)", "var(--color-accent)", "var(--color-gold)", "var(--color-destructive)", "var(--color-muted-foreground)", "var(--color-navy)"];
const input = "w-full min-w-0 rounded-md border border-input bg-background px-2 py-1.5 text-sm";

export function AdminConsole({ cases }: { cases: { id: string; reference: string; stage: string; signal: string; service_title: string; form_code: string | null; created_at: string; client_id: string }[] }) {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("overview");
  const aptQuery = useQuery({ queryKey: ["interview-appointments"], queryFn: fetchInterviewAppointments });
  const aptCount = aptQuery.data?.length ?? 0;

  const tabs: { k: Tab; l: string; i: typeof Users }[] = [
    { k: "overview", l: t(tx("Overview", "نظرة عامة")), i: BarChart3 },
    { k: "interviews", l: `${t(tx("Video Interviews", "مقابلات الفيديو كول"))}${aptCount > 0 ? ` (${aptCount})` : ""}`, i: Video },
    { k: "users", l: t(tx("Users", "المستخدمون")), i: Users },
    { k: "stats", l: t(tx("Homepage stats", "إحصائيات الرئيسية")), i: Settings2 },
    { k: "activity", l: t(tx("Activity log", "سجل النشاط")), i: Activity },
  ];
  return (
    <section className="mb-10 rounded-2xl border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-primary">{t(tx("Admin control center", "مركز تحكم المدير"))}</h2>
        <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
          {tabs.map(({ k, l, i: I }) => (
            <button key={k} onClick={() => setTab(k)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${tab === k ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"}`}>
              <I className="h-3.5 w-3.5" />{l}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {tab === "overview" && <Overview cases={cases} />}
        {tab === "interviews" && <InterviewsManager />}
        {tab === "users" && <UsersPanel />}
        {tab === "stats" && <StatsPanel />}
        {tab === "activity" && <ActivityPanel />}
      </div>
    </section>
  );
}

async function exportXlsx(name: string, rows: Record<string, string | number>[]) {
  const { default: writeXlsxFile } = await import("write-excel-file/browser");
  if (!rows.length) return;
  const keys = Object.keys(rows[0]!);
  const data = [keys.map((k) => ({ value: k, fontWeight: "bold" as const })), ...rows.map((r) => keys.map((k) => ({ value: r[k] ?? "" })))];
  await (writeXlsxFile as any)(data, { fileName: `${name}.xlsx` });
}

function Overview({ cases }: { cases: Parameters<typeof AdminConsole>[0]["cases"] }) {
  const { t, locale } = useLang();
  const stats = useMemo(() => {
    const STAGE_LABELS: Record<string, import("@/lib/i18n").T> = {
      intake: tx("Intake", "جمع البيانات"),
      review: tx("Review", "المراجعة"),
      filing: tx("Filing", "التقديم"),
      decision: tx("Decision", "القرار"),
      complete: tx("Complete", "مكتمل"),
    };
    const months: { name: string; value: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      months.push({ name: d.toLocaleDateString(locale, { month: "short" }), value: cases.filter((c) => { const x = new Date(c.created_at); return `${x.getFullYear()}-${x.getMonth()}` === key; }).length });
    }
    const stage = Object.entries(cases.reduce<Record<string, number>>((a, c) => {
      const label = t(STAGE_LABELS[c.stage] ?? tx(c.stage, c.stage));
      a[label] = (a[label] ?? 0) + 1;
      return a;
    }, {})).map(([name, value]) => ({ name, value }));
    const service = Object.entries(cases.reduce<Record<string, number>>((a, c) => {
      const label = t(c.service_title);
      a[label] = (a[label] ?? 0) + 1;
      return a;
    }, {})).map(([name, value]) => ({ name, value }));
    return { stage, service, months, clients: new Set(cases.map((c) => c.client_id)).size };
  }, [cases, locale, t]);
  const kpis = [
    { l: tx("Total cases", "إجمالي الملفات"), v: cases.length },
    { l: tx("Completed", "مكتملة"), v: cases.filter((c) => c.stage === "complete").length },
    { l: tx("In progress", "قيد العمل"), v: cases.filter((c) => c.stage !== "complete").length },
    { l: tx("Blocked (red)", "متوقفة (أحمر)"), v: cases.filter((c) => c.signal === "red").length },
    { l: tx("Clients", "العملاء"), v: stats.clients },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.l.en} className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">{t(k.l)}</p>
            <p className="mt-1 font-display text-3xl text-primary">{k.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Chart title={t(tx("New cases (6 months)", "ملفات جديدة (6 أشهر)"))}>
          <BarChart data={stats.months}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" fontSize={11} /><YAxis allowDecimals={false} fontSize={11} /><Tooltip /><Bar dataKey="value" fill="var(--color-accent)" radius={[6, 6, 0, 0]} /></BarChart>
        </Chart>
        <Chart title={t(tx("Cases by stage", "الملفات حسب المرحلة"))}>
          <PieChart><Pie data={stats.stage} dataKey="value" nameKey="name" outerRadius={80} label={{ fontSize: 11 }}>{stats.stage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
        </Chart>
        <div className="lg:col-span-2">
          <Chart title={t(tx("Cases by service", "الملفات حسب الخدمة"))}>
            <BarChart data={stats.service} layout="vertical" margin={{ left: 20 }}><XAxis type="number" allowDecimals={false} fontSize={11} /><YAxis type="category" dataKey="name" width={170} fontSize={10} /><Tooltip /><Bar dataKey="value" fill="var(--color-primary)" radius={[0, 6, 6, 0]} /></BarChart>
          </Chart>
        </div>
      </div>
      <button onClick={() => exportXlsx("migrafile-cases", cases.map((c) => ({ Reference: c.reference, Service: c.service_title, Form: c.form_code ?? "", Stage: c.stage, Signal: c.signal, Created: new Date(c.created_at).toLocaleString(locale) })))} className="btn-primary inline-flex items-center gap-2 justify-self-start px-4 py-2 text-sm">
        <Download className="h-4 w-4" />{t(tx("Export cases to Excel", "تصدير الملفات إلى Excel"))}
      </button>
    </div>
  );
}

function Chart({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <div className="min-w-0 rounded-xl border bg-background p-4">
      <p className="mb-3 text-sm font-medium">{title}</p>
      <div className="h-64 ltr" dir="ltr"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>
    </div>
  );
}

function UsersPanel() {
  const { t, locale } = useLang();
  const qc = useQueryClient();
  const list = useServerFn(listAllUsers);
  const update = useServerFn(adminUpdateUser);
  const ban = useServerFn(adminSetBan);
  const del = useServerFn(adminDeleteUser);
  const users = useQuery({ queryKey: ["admin-users"], queryFn: () => list() });
  const [q, setQ] = useState("");
  const [roleF, setRoleF] = useState("all");
  const [edit, setEdit] = useState<AdminUser | null>(null);
  const [msg, setMsg] = useState("");
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-users"] });
  const topRole = (u: AdminUser) => (u.roles.includes("admin") ? "admin" : u.roles.includes("staff") ? "staff" : "client");
  const roleLabel = (r: string) => t(r === "admin" ? tx("Admin", "مدير") : r === "staff" ? tx("Staff", "موظف") : tx("Client", "عميل"));

  const allUsers: AdminUser[] = useMemo(() => {
    if (!users.data) return [];
    if ("users" in (users.data as any) && Array.isArray((users.data as any).users)) {
      return (users.data as any).users;
    }
    if (Array.isArray(users.data)) return users.data as AdminUser[];
    return [];
  }, [users.data]);

  const hasServiceRole = users.data && "hasServiceRole" in (users.data as any) ? (users.data as any).hasServiceRole : true;

  const shown = allUsers.filter(
    (u) =>
      (roleF === "all" || (roleF === "banned" ? u.banned : topRole(u) === roleF)) &&
      (!q || `${u.email} ${u.full_name ?? ""} ${u.phone ?? ""}`.toLowerCase().includes(q.toLowerCase())),
  );
  const selfErr = t(tx("You can't do this to your own account.", "لا يمكنك تنفيذ ذلك على حسابك."));

  return (
    <div className="grid gap-5">
      {!hasServiceRole && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-3.5 text-xs text-foreground">
          <p className="font-bold text-gold flex items-center gap-1.5 mb-1">
            <Shield className="h-4 w-4" />
            {t(tx("Note: Direct Supabase Auth Integration", "ملاحظة: المزامنة المباشرة مع Supabase Auth"))}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              tx(
                "Users and team members are currently loaded and managed from registered platform data. To enable direct Supabase Auth management (fetching all auth accounts, automatic passwords, auth bans), add SUPABASE_SERVICE_ROLE_KEY to your .env file from Supabase Dashboard > Settings > API.",
                "يتم جلب وعرض المستخدمين وفريق العمل حالياً من بيانات المنصة والملفات المسجلة. لتفعيل إدارة حسابات Supabase Auth بشكل مباشر وكامل (جلب كافة الحسابات، وإنشاء كلمات المرور تلقائياً)، يُرجى إضافة SUPABASE_SERVICE_ROLE_KEY في ملف .env من لوحة تحكم Supabase > Settings > API.",
              ),
            )}
          </p>
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(tx("Search name, email, phone…", "ابحث بالاسم أو البريد أو الهاتف…"))}
            className={`${input} ps-8`}
          />
        </label>
        <select value={roleF} onChange={(e) => setRoleF(e.target.value)} className={input}>
          <option value="all">
            {t(tx("All", "الكل"))} ({allUsers.length})
          </option>
          <option value="client">{roleLabel("client")}</option>
          <option value="staff">{roleLabel("staff")}</option>
          <option value="admin">{roleLabel("admin")}</option>
          <option value="banned">{t(tx("Suspended", "موقوف"))}</option>
        </select>
        <a
          href="#team-manager-section"
          className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold"
        >
          <UserPlus className="h-3.5 w-3.5" />
          {t(tx("Add Staff/Admin", "إضافة موظف / مدير"))}
        </a>
        <button
          onClick={() =>
            exportXlsx(
              "migrafile-users",
              shown.map((u) => ({
                Email: u.email,
                Name: u.full_name ?? "",
                Phone: u.phone ?? "",
                Role: topRole(u),
                Cases: u.cases,
                Suspended: u.banned ? "yes" : "no",
                Joined: new Date(u.created_at).toLocaleDateString(locale),
              })),
            )
          }
          className="inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs hover:bg-muted"
        >
          <Download className="h-3.5 w-3.5" />
          {t(tx("Excel", "إكسل"))}
        </button>
      </div>

      {msg && <p className="text-sm text-destructive">{msg}</p>}

      {users.isLoading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">…</p>
      ) : shown.length === 0 ? (
        <p className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
          {t(tx("No users found matching your search.", "لم يتم العثور على مستخدمين يطابقون البحث."))}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                {[
                  tx("User", "المستخدم"),
                  tx("Phone", "الهاتف"),
                  tx("Role", "الصلاحية"),
                  tx("Cases", "الملفات"),
                  tx("Joined", "التسجيل"),
                  tx("Actions", "إجراءات"),
                ].map((h) => (
                  <th key={h.en} className="p-3 text-start font-medium">
                    {t(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {shown.map((u) => (
                <tr key={u.id} className={u.banned ? "opacity-60" : ""}>
                  <td className="p-3">
                    <p className="font-medium text-foreground">{u.full_name || "—"}</p>
                    <p className="ltr text-xs text-muted-foreground">{u.email || `ID: ${u.id.substring(0, 8)}...`}</p>
                  </td>
                  <td className="ltr p-3 text-xs">{u.phone || "—"}</td>
                  <td className="p-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-semibold ${
                        topRole(u) === "admin"
                          ? "bg-primary text-primary-foreground"
                          : topRole(u) === "staff"
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {roleLabel(topRole(u))}
                    </span>
                    {u.banned && (
                      <span className="ms-1 rounded bg-destructive/15 px-2 py-0.5 text-xs text-destructive">
                        {t(tx("Suspended", "موقوف"))}
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-semibold">{u.cases}</td>
                  <td className="p-3 text-xs">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString(locale) : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button onClick={() => setEdit(u)} className="text-accent underline font-medium">
                        {t(tx("Edit", "تعديل"))}
                      </button>
                      <button
                        onClick={async () => {
                          setMsg("");
                          const r = await ban({ data: { id: u.id, banned: !u.banned } });
                          if (!r.ok) setMsg(selfErr);
                          refresh();
                        }}
                        className="underline"
                      >
                        {u.banned ? t(tx("Activate", "تفعيل")) : t(tx("Suspend", "إيقاف"))}
                      </button>
                      <button
                        onClick={async () => {
                          if (
                            !confirm(
                              `${t(tx("Delete user permanently?", "حذف المستخدم نهائيًا؟"))}\n${u.email || u.id}`,
                            )
                          )
                            return;
                          setMsg("");
                          const r = await del({ data: { id: u.id } });
                          if (!r.ok) setMsg(selfErr);
                          refresh();
                        }}
                        className="text-destructive underline font-medium"
                      >
                        {t(tx("Delete", "حذف"))}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {edit && (
        <form
          className="grid gap-3 rounded-xl border bg-background p-4 sm:grid-cols-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setMsg("");
            const r = await update({
              data: {
                id: edit.id,
                full_name: String(f.get("n") || "") || null,
                phone: String(f.get("p") || "") || null,
                role: f.get("r") as "client" | "staff" | "admin",
              },
            });
            if (!r.ok) setMsg(selfErr);
            setEdit(null);
            refresh();
            qc.invalidateQueries({ queryKey: ["team"] });
          }}
        >
          <p className="ltr text-sm font-medium sm:col-span-3 text-primary">{edit.email || edit.id}</p>
          <label className="grid gap-1 text-xs">
            {t(tx("Full name", "الاسم الكامل"))}
            <input name="n" defaultValue={edit.full_name ?? ""} className={input} />
          </label>
          <label className="grid gap-1 text-xs">
            {t(tx("Phone", "الهاتف"))}
            <input name="p" defaultValue={edit.phone ?? ""} className={`${input} ltr`} />
          </label>
          <label className="grid gap-1 text-xs">
            {t(tx("Role", "الصلاحية"))}
            <select name="r" defaultValue={topRole(edit)} className={input}>
              <option value="client">{roleLabel("client")}</option>
              <option value="staff">{roleLabel("staff")}</option>
              <option value="admin">{roleLabel("admin")}</option>
            </select>
          </label>
          <div className="flex gap-2 sm:col-span-3">
            <button className="btn-primary px-4 py-1.5 text-sm font-semibold">{t(tx("Save", "حفظ"))}</button>
            <button
              type="button"
              onClick={() => setEdit(null)}
              className="rounded-md border px-4 py-1.5 text-sm hover:bg-muted"
            >
              {t(tx("Cancel", "إلغاء"))}
            </button>
          </div>
        </form>
      )}

      <TeamManager />
    </div>
  );
}

function StatsPanel() {
  const { t } = useLang();
  const qc = useQueryClient();
  const s = useQuery({ queryKey: ["site-stats"], queryFn: async () => (await supabase.from("site_stats").select("*").eq("id", 1).single()).data });
  const pub = useQuery({ queryKey: ["public-stats"], queryFn: async () => (await supabase.rpc("public_stats")).data as Record<string, number> | null });
  const [saved, setSaved] = useState(false);
  if (!s.data) return <p className="text-sm text-muted-foreground">…</p>;
  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={async (e) => {
      e.preventDefault(); const f = new FormData(e.currentTarget);
      await supabase.from("site_stats").update({ extra_completed: Number(f.get("c")) || 0, extra_clients: Number(f.get("cl")) || 0, years_experience: Number(f.get("y")) || 0, show_on_home: f.get("show") === "on", updated_at: new Date().toISOString() }).eq("id", 1);
      const { data: u } = await supabase.auth.getUser();
      await supabase.from("activity_log").insert({ actor_id: u.user?.id ?? null, action: "stats.update", target: "homepage" });
      setSaved(true); qc.invalidateQueries({ queryKey: ["site-stats"] }); qc.invalidateQueries({ queryKey: ["public-stats"] });
    }}>
      <p className="text-sm text-muted-foreground sm:col-span-2">{t(tx("Homepage numbers = completed files on the site automatically + the extra number you enter (e.g. clients served before the platform).", "أرقام الرئيسية = الملفات المكتملة على الموقع تلقائيًا + الرقم الإضافي الذي تدخله (مثل عملاء قبل المنصة)."))}</p>
      <label className="grid gap-1 text-xs">{t(tx("Extra completed files", "ملفات مكتملة إضافية"))}<input name="c" type="number" min={0} defaultValue={s.data.extra_completed} className={input} /></label>
      <label className="grid gap-1 text-xs">{t(tx("Extra clients served", "عملاء إضافيون"))}<input name="cl" type="number" min={0} defaultValue={s.data.extra_clients} className={input} /></label>
      <label className="grid gap-1 text-xs">{t(tx("Years of experience (0 = hide)", "سنوات الخبرة (0 = إخفاء)"))}<input name="y" type="number" min={0} defaultValue={s.data.years_experience} className={input} /></label>
      <label className="flex items-center gap-2 self-end text-sm"><input name="show" type="checkbox" defaultChecked={s.data.show_on_home} />{t(tx("Show on homepage", "إظهار في الرئيسية"))}</label>
      {pub.data && <p className="rounded-lg bg-muted p-3 text-sm sm:col-span-2">{t(tx("Currently shown", "المعروض حاليًا"))}: {pub.data["completed"]} {t(tx("completed", "مكتمل"))} · {pub.data["clients"]} {t(tx("clients", "عميل"))}</p>}
      <div className="flex items-center gap-3"><button className="btn-primary px-4 py-1.5 text-sm">{t(tx("Save", "حفظ"))}</button>{saved && <span className="text-xs text-accent">✓</span>}</div>
    </form>
  );
}

const ACTIONS: Record<string, { en: string; ar: string }> = {
  "user.update": tx("Edited user", "عدّل مستخدمًا"), "user.suspend": tx("Suspended user", "أوقف مستخدمًا"), "user.activate": tx("Activated user", "فعّل مستخدمًا"),
  "user.delete": tx("Deleted user", "حذف مستخدمًا"), "stats.update": tx("Updated homepage stats", "عدّل إحصائيات الرئيسية"),
  "case.update": tx("Updated case", "عدّل ملفًا"), "doc.download": tx("Downloaded documents", "نزّل مستندات"), "doc.status": tx("Changed document status", "غيّر حالة مستند"),
};

function ActivityPanel() {
  const { t, locale } = useLang();
  const fn = useServerFn(listActivity);
  const a = useQuery({ queryKey: ["activity"], queryFn: () => fn() });
  if (a.isLoading) return <p className="text-sm text-muted-foreground">…</p>;
  if (!a.data?.length) return <p className="text-sm text-muted-foreground">{t(tx("No activity yet.", "لا يوجد نشاط بعد."))}</p>;
  return (
    <ul className="divide-y rounded-xl border text-sm">
      {a.data.map((r) => (
        <li key={r.id} className="grid gap-1 p-3 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center">
          <span className="ltr truncate text-xs text-muted-foreground">{r.actor}</span>
          <span className="min-w-0 break-all">{ACTIONS[r.action] ? t(ACTIONS[r.action]!) : r.action} {r.target && <span className="font-mono text-xs text-muted-foreground">· {r.target}</span>}</span>
          <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString(locale)}</span>
        </li>
      ))}
    </ul>
  );
}
