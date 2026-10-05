import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import type { Database } from "@/integrations/supabase/types";
import { TeamManager } from "@/components/site/TeamManager";
import { requirements } from "@/lib/requirements";
import { getFormRequirement } from "@/lib/form-requirements";

export const Route = createFileRoute("/_authenticated/staff")({
  head: () => seo("Staff Workspace", "MIGRAFILE internal case management for staff."),
  component: Staff,
});

type Stage = Database["public"]["Enums"]["case_stage"];
type Signal = Database["public"]["Enums"]["case_signal"];
type DocStatus = Database["public"]["Enums"]["doc_status"];

const STAGES: { key: Stage; label: T }[] = [
  { key: "intake", label: tx("Intake", "الاستلام") },
  { key: "documents", label: tx("Documents", "المستندات") },
  { key: "review", label: tx("Review", "المراجعة") },
  { key: "translation", label: tx("Translation", "الترجمة") },
  { key: "assembly", label: tx("Assembly", "التجميع") },
  { key: "complete", label: tx("Complete", "مكتمل") },
];
const SIGNALS: { key: Signal; label: T; dot: string }[] = [
  { key: "green", label: tx("Green · on track", "أخضر · يسير جيدًا"), dot: "bg-accent" },
  { key: "yellow", label: tx("Yellow · waiting", "أصفر · بانتظار"), dot: "bg-gold" },
  { key: "red", label: tx("Red · blocked / outside scope", "أحمر · متوقف / خارج النطاق"), dot: "bg-destructive" },
];
const DOC_STATUSES: { key: DocStatus; label: T }[] = [
  { key: "requested", label: tx("Requested", "مطلوب") },
  { key: "uploaded", label: tx("Uploaded", "تم الرفع") },
  { key: "under_review", label: tx("Under review", "قيد المراجعة") },
  { key: "accepted", label: tx("Accepted", "مستوفٍ") },
  { key: "needs_attention", label: tx("Needs attention", "يحتاج استكمال") },
];
const sel = "rounded-md border border-input bg-background px-2 py-1.5 text-xs";

function Staff() {
  const { t } = useLang();
  const { user } = Route.useRouteContext();
  const role = useQuery({
    queryKey: ["is-staff", user.id],
    queryFn: async () => (await supabase.rpc("is_staff", { _user_id: user.id })).data === true,
  });
  const isAdmin = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => (await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" })).data === true,
  });
  const [filter, setFilter] = useState<Signal | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const cases = useQuery({
    enabled: role.data === true,
    queryKey: ["staff-cases"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cases").select("*").order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (role.isLoading) return <Container className="py-20 text-sm text-muted-foreground">…</Container>;
  if (!role.data)
    return (
      <Container className="max-w-xl py-20">
        <Notice>{t(tx("This area is for MIGRAFILE staff only.", "هذه المنطقة مخصصة لفريق MIGRAFILE فقط."))}</Notice>
        <Link to="/portal" className="mt-4 inline-block text-sm text-accent underline">{t(tx("Go to my portal", "الذهاب إلى بوابتي"))}</Link>
      </Container>
    );

  const list = (cases.data ?? []).filter((c) => (filter === "all" || c.signal === filter) && (!q || `${c.reference} ${c.service_title} ${c.form_code ?? ""}`.toLowerCase().includes(q.toLowerCase())));
  const counts = Object.fromEntries(SIGNALS.map((s) => [s.key, cases.data?.filter((c) => c.signal === s.key).length ?? 0]));
  const current = cases.data?.find((c) => c.id === selected);

  return (
    <>
      <PageHeader eyebrow={tx("Staff workspace", "مساحة الفريق")} title={tx("Case management", "إدارة الملفات")} />
      <Container className="py-10">
        {isAdmin.data && <TeamManager />}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button onClick={() => setFilter("all")} className={`rounded-md border px-3 py-1.5 text-xs ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{t(tx("All", "الكل"))} ({cases.data?.length ?? 0})</button>
          {SIGNALS.map((s) => (
            <button key={s.key} onClick={() => setFilter(s.key)} className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${filter === s.key ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />{t(s.label)} ({counts[s.key]})
            </button>
          ))}
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(tx("Search reference, service, form…", "ابحث بالمرجع أو الخدمة أو النموذج…"))} className="ms-auto min-w-56 rounded-md border border-input bg-background px-3 py-1.5 text-sm" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <ul className="divide-y self-start rounded-lg border bg-card">
            {list.length === 0 && <li className="p-4 text-sm text-muted-foreground">{t(tx("No cases.", "لا توجد ملفات."))}</li>}
            {list.map((c) => (
              <li key={c.id}>
                <button onClick={() => setSelected(c.id)} className={`flex w-full items-center gap-3 p-4 text-start hover:bg-muted ${selected === c.id ? "bg-muted" : ""}`}>
                  <span className={`h-3 w-3 shrink-0 rounded-full ${SIGNALS.find((s) => s.key === c.signal)?.dot}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{c.service_title}{c.form_code ? ` · ${c.form_code}` : ""}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{c.reference} · {t(STAGES.find((s) => s.key === c.stage)!.label)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {current ? <CaseEditor key={current.id} c={current} /> : <Notice>{t(tx("Select a case to manage it.", "اختر ملفًا لإدارته."))}</Notice>}
        </div>
      </Container>
    </>
  );
}

type CaseRow = Database["public"]["Tables"]["cases"]["Row"];

function CaseEditor({ c }: { c: CaseRow }) {
  const { t, lang } = useLang();
  const qc = useQueryClient();
  const [err, setErr] = useState<string | null>(null);
  const client = useQuery({
    queryKey: ["staff-client", c.client_id],
    queryFn: async () => (await supabase.from("profiles").select("full_name, phone").eq("id", c.client_id).maybeSingle()).data,
  });
  const docs = useQuery({
    queryKey: ["docs", c.id],
    queryFn: async () => (await supabase.from("case_documents").select("*").eq("case_id", c.id).order("created_at")).data ?? [],
  });
  const notes = useQuery({
    queryKey: ["internal", c.id],
    queryFn: async () => (await supabase.from("case_internal_notes").select("*").eq("case_id", c.id).order("created_at", { ascending: false })).data ?? [],
  });
  const notices = useQuery({
    queryKey: ["notices", c.id],
    queryFn: async () => (await supabase.from("case_notices").select("*").eq("case_id", c.id).order("created_at", { ascending: false })).data ?? [],
  });

  const run = async (fn: () => PromiseLike<{ error: { message: string } | null }>, keys: string[][]) => {
    setErr(null);
    const { error } = await fn();
    if (error) return setErr(error.message);
    keys.forEach((k) => qc.invalidateQueries({ queryKey: k }));
  };
  const updateCase = (patch: Partial<CaseRow>) =>
    run(() => supabase.from("cases").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", c.id), [["staff-cases"]]);

  const [newDoc, setNewDoc] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [nTitle, setNTitle] = useState("");
  const [nBody, setNBody] = useState("");

  async function view(path: string) {
    const { data } = await supabase.storage.from("case-files").createSignedUrl(path, 60);
    if (data) window.open(data.signedUrl, "_blank");
  }

  const addNotice = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("case_notices").insert({ case_id: c.id, title: nTitle, body: nBody });
      if (error) throw error;
    },
    onSuccess: () => { setNTitle(""); setNBody(""); qc.invalidateQueries({ queryKey: ["notices", c.id] }); },
    onError: (e) => setErr((e as Error).message),
  });

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-lg border bg-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl text-primary">{c.service_title}{c.form_code ? ` · ${c.form_code}` : ""}</h2>
          <span className="font-mono text-xs text-muted-foreground">{c.reference}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t(tx("Client", "العميل"))}: {client.data?.full_name ?? "—"}{client.data?.phone ? ` · ${client.data.phone}` : ""}</p>
        {c.service_slug && requirements[c.service_slug] && (
          <dl className="mt-3 grid gap-1.5 rounded-xl bg-muted/60 p-3 text-xs">
            {requirements[c.service_slug]!.questions.map((q) => (
              <div key={q.id} className="flex gap-2"><dt className="text-muted-foreground">{t(q.q)}</dt><dd className="font-medium">{String((c.intake_answers as Record<string, string> | null)?.[q.id] ?? "—")}</dd></div>
            ))}
          </dl>
        )}
        {getFormRequirement(c.form_code) && (
          <dl className="mt-3 grid gap-1.5 rounded-xl bg-muted/60 p-3 text-xs">
            <p className="font-medium text-primary">{c.form_code}</p>
            {getFormRequirement(c.form_code)!.questions.map((q) => (
              <div key={q.id} className="flex gap-2"><dt className="text-muted-foreground">{t(q.q)}</dt><dd className="font-medium">{String((c.intake_answers as Record<string, string> | null)?.[`${c.form_code}.${q.id}`] ?? "—")}</dd></div>
            ))}
          </dl>
        )}
        <div className="flex flex-wrap gap-4">
          <label className="grid gap-1 text-xs">{t(tx("Stage", "المرحلة"))}
            <select className={sel} value={c.stage} onChange={(e) => updateCase({ stage: e.target.value as Stage })}>
              {STAGES.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
            </select></label>
          <label className="grid gap-1 text-xs">{t(tx("Signal", "الإشارة"))}
            <select className={sel} value={c.signal} onChange={(e) => updateCase({ signal: e.target.value as Signal })}>
              {SIGNALS.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
            </select></label>
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="text-lg text-primary">{t(tx("Documents", "المستندات"))}</h3>
        <ul className="mt-3 divide-y">
          {docs.data?.map((d) => (
            <li key={d.id} className="grid gap-2 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1 text-sm font-medium">{d.label}</span>
                {d.file_path && <button onClick={() => view(d.file_path!)} className="text-xs text-accent underline">{d.file_name}</button>}
                <select className={sel} value={d.status} onChange={(e) => run(() => supabase.from("case_documents").update({ status: e.target.value as DocStatus }).eq("id", d.id), [["docs", c.id]])}>
                  {DOC_STATUSES.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
                </select>
              </div>
              <input defaultValue={d.staff_note ?? ""} placeholder={t(tx("Note visible to client (e.g. photo is blurry)", "ملاحظة يراها العميل (مثال: الصورة غير واضحة)"))} className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                onBlur={(e) => { const v = e.target.value.trim() || null; if (v !== d.staff_note) run(() => supabase.from("case_documents").update({ staff_note: v }).eq("id", d.id), [["docs", c.id]]); }} />
            </li>
          ))}
        </ul>
        <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!newDoc.trim()) return; run(() => supabase.from("case_documents").insert({ case_id: c.id, label: newDoc.trim() }), [["docs", c.id]]); setNewDoc(""); }}>
          <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} placeholder={t(tx("Request another document…", "طلب مستند إضافي…"))} className="flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-xs" />
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">{t(tx("Add", "إضافة"))}</button>
        </form>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="text-lg text-primary">{t(tx("Send notice to client", "إرسال تنبيه للعميل"))}</h3>
        <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); addNotice.mutate(); }}>
          <input required value={nTitle} onChange={(e) => setNTitle(e.target.value)} placeholder={t(tx("Title", "العنوان"))} className="rounded-md border border-input bg-background px-2 py-1.5 text-sm" />
          <textarea required value={nBody} onChange={(e) => setNBody(e.target.value)} rows={3} placeholder={t(tx("Message (administrative updates only — no legal advice)", "الرسالة (تحديثات إدارية فقط — بدون استشارات قانونية)"))} className="rounded-md border border-input bg-background px-2 py-1.5 text-sm" />
          <button disabled={addNotice.isPending} className="justify-self-start rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">{t(tx("Send", "إرسال"))}</button>
        </form>
        <ul className="mt-3 grid gap-2">
          {notices.data?.map((n) => (
            <li key={n.id} className="rounded border p-2 text-xs"><b>{n.title}</b> — {n.body} <span className="text-muted-foreground">· {new Date(n.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span></li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-dashed bg-muted/40 p-5">
        <h3 className="text-lg text-primary">{t(tx("Internal notes (staff only)", "ملاحظات داخلية (للفريق فقط)"))}</h3>
        <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!noteBody.trim()) return; run(() => supabase.from("case_internal_notes").insert({ case_id: c.id, body: noteBody.trim() }), [["internal", c.id]]); setNoteBody(""); }}>
          <input value={noteBody} onChange={(e) => setNoteBody(e.target.value)} className="flex-1 rounded-md border border-input bg-background px-2 py-1.5 text-xs" />
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">{t(tx("Add", "إضافة"))}</button>
        </form>
        <ul className="mt-3 grid gap-1 text-xs">
          {notes.data?.map((n) => <li key={n.id}>{new Date(n.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")} — {n.body}</li>)}
        </ul>
      </section>
    </div>
  );
}
