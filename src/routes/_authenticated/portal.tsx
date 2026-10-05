import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => seo("My Portal", "Your secure MIGRAFILE client dashboard: case progress, documents and notices."),
  component: Portal,
});

const STAGES: { key: string; label: T }[] = [
  { key: "intake", label: tx("Intake", "الاستلام") },
  { key: "documents", label: tx("Documents", "المستندات") },
  { key: "review", label: tx("Review", "المراجعة") },
  { key: "translation", label: tx("Translation", "الترجمة") },
  { key: "assembly", label: tx("Assembly", "التجميع") },
  { key: "complete", label: tx("Complete", "مكتمل") },
];
const DOC_STATUS: Record<string, { l: T; c: string }> = {
  requested: { l: tx("Requested", "مطلوب"), c: "bg-muted text-muted-foreground" },
  uploaded: { l: tx("Uploaded", "تم الرفع"), c: "bg-secondary text-secondary-foreground" },
  under_review: { l: tx("Under review", "قيد المراجعة"), c: "bg-gold/20 text-foreground" },
  accepted: { l: tx("Accepted", "مستوفٍ"), c: "bg-accent/15 text-accent" },
  needs_attention: { l: tx("Needs attention", "يحتاج استكمال"), c: "bg-destructive/15 text-destructive" },
};
const DOC_AR: Record<string, string> = {
  "Passport (bio page)": "جواز السفر (صفحة البيانات)",
  "Birth certificate": "شهادة الميلاد",
  "National ID": "بطاقة الرقم القومي",
  "Passport-style photo": "صورة شخصية",
};

function Portal() {
  const { t, lang } = useLang();
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data,
  });
  const cases = useQuery({
    queryKey: ["cases", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("cases").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const isStaff = useQuery({
    queryKey: ["is-staff", user.id],
    queryFn: async () => (await supabase.rpc("is_staff", { _user_id: user.id })).data === true,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const current = cases.data?.find((c) => c.id === selected) ?? cases.data?.[0];

  const accept = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").upsert({ id: user.id, disclaimer_accepted_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (profile.isLoading) return <Container className="py-20 text-sm text-muted-foreground">…</Container>;

  if (!profile.data?.disclaimer_accepted_at) {
    return (
      <>
        <PageHeader eyebrow={tx("Client portal", "بوابة العملاء")} title={tx("Before you continue", "قبل المتابعة")} />
        <Container className="max-w-2xl py-14">
          <div className="grid gap-5 rounded-lg border bg-card p-6 text-sm leading-relaxed">
            <p>{t(tx("MIGRAFILE is a documentation and case-management service. We are not a law firm, do not provide legal advice, and do not recommend visas or predict outcomes.", "MIGRAFILE خدمة توثيق وإدارة ملفات. لسنا مكتب محاماة، ولا نقدم استشارات قانونية، ولا نرشّح تأشيرات أو نتوقع نتائج."))}</p>
            <p>{t(tx("You choose the form and category yourself, and you remain responsible for the accuracy of all information you provide.", "أنت من يختار النموذج والفئة بنفسك، وتظل مسؤولًا عن دقة جميع المعلومات التي تقدمها."))}</p>
            <button onClick={() => accept.mutate()} disabled={accept.isPending} className="justify-self-start rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-accent">
              {t(tx("I understand and agree", "أفهم وأوافق"))}
            </button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={tx("Client portal", "بوابة العملاء")} title={tx("My dashboard", "لوحتي")} intro={tx(`Signed in as ${user.email}`, `مسجّل الدخول باسم ${user.email}`)} />
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {cases.data?.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={`rounded-md border px-3 py-1.5 text-xs ${current?.id === c.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              {c.reference}
            </button>
          ))}
          <div className="ms-auto flex gap-2">
            {isStaff.data && <Link to="/staff" className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{t(tx("Staff workspace", "مساحة الفريق"))}</Link>}
            <button onClick={signOut} className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted">{t(tx("Sign out", "تسجيل الخروج"))}</button>
          </div>
        </div>
        <NewCase userId={user.id} hasCases={!!cases.data?.length} onCreated={(id) => setSelected(id)} />
        {current && <CaseView c={current} lang={lang} />}
      </Container>
    </>
  );
}

function NewCase({ userId, hasCases, onCreated }: { userId: string; hasCases: boolean; onCreated: (id: string) => void }) {
  const { t } = useLang();
  const qc = useQueryClient();
  const [open, setOpen] = useState(!hasCases);
  const [title, setTitle] = useState("");
  const [form, setForm] = useState("");
  const [confirm, setConfirm] = useState(false);
  const m = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from("cases").insert({ client_id: userId, service_title: title, form_code: form || null }).select("id").single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: (id) => { qc.invalidateQueries({ queryKey: ["cases"] }); onCreated(id); setOpen(false); setTitle(""); setForm(""); setConfirm(false); },
  });
  if (!open) return <button onClick={() => setOpen(true)} className="mb-8 text-sm text-accent underline">{t(tx("+ Open a new documentation file", "+ فتح ملف توثيق جديد"))}</button>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mb-10 grid gap-3 rounded-lg border bg-card p-6 sm:max-w-xl">
      <h2 className="text-xl text-primary">{t(tx("Open a documentation file", "فتح ملف توثيق"))}</h2>
      <input required placeholder={t(tx("Service you selected (e.g. Document translation)", "الخدمة التي اخترتها (مثال: ترجمة مستندات)"))} value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
      <input placeholder={t(tx("Form number you selected (optional, e.g. I-130)", "رقم النموذج الذي اخترته (اختياري، مثال I-130)"))} value={form} onChange={(e) => setForm(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
      <label className="flex gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} required />
        {t(tx("I confirm I selected this service and form myself.", "أؤكد أنني اخترت هذه الخدمة والنموذج بنفسي."))}</label>
      {m.error && <p className="text-sm text-destructive">{(m.error as Error).message}</p>}
      <button disabled={m.isPending || !confirm} className="justify-self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{t(tx("Open file", "فتح الملف"))}</button>
    </form>
  );
}

type CaseRow = { id: string; reference: string; service_title: string; form_code: string | null; stage: string; created_at: string };

function CaseView({ c, lang }: { c: CaseRow; lang: "en" | "ar" }) {
  const { t } = useLang();
  const qc = useQueryClient();
  const idx = STAGES.findIndex((s) => s.key === c.stage);
  const docs = useQuery({
    queryKey: ["docs", c.id],
    queryFn: async () => (await supabase.from("case_documents").select("*").eq("case_id", c.id).order("created_at")).data ?? [],
  });
  const notices = useQuery({
    queryKey: ["notices", c.id],
    queryFn: async () => (await supabase.from("case_notices").select("*").eq("case_id", c.id).order("created_at", { ascending: false })).data ?? [],
  });
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function upload(docId: string, file: File) {
    setErr(null); setBusyId(docId);
    try {
      const path = `${c.id}/${docId}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const up = await supabase.storage.from("case-files").upload(path, file);
      if (up.error) throw up.error;
      const { error } = await supabase.from("case_documents").update({ file_path: path, file_name: file.name, status: "uploaded", uploaded_at: new Date().toISOString() }).eq("id", docId);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["docs", c.id] });
    } catch (e) { setErr((e as Error).message); } finally { setBusyId(null); }
  }
  async function view(path: string) {
    const { data } = await supabase.storage.from("case-files").createSignedUrl(path, 60);
    if (data) window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="grid gap-10">
      <section className="rounded-lg border bg-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl text-primary">{c.service_title}{c.form_code ? ` · ${c.form_code}` : ""}</h2>
          <span className="font-mono text-xs text-muted-foreground">{c.reference}</span>
        </div>
        <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {STAGES.map((s, i) => (
            <li key={s.key} className="grid gap-2">
              <div className={`h-1.5 rounded-full ${i <= idx ? "bg-accent" : "bg-muted"}`} />
              <span className={`text-xs ${i === idx ? "font-semibold text-primary" : "text-muted-foreground"}`}>{t(s.label)}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <section>
          <h3 className="text-xl text-primary">{t(tx("Document checklist", "قائمة المستندات"))}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{t(tx("PDF or image, up to 15 MB.", "PDF أو صورة، حتى 15 ميجابايت."))}</p>
          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
          <ul className="mt-4 divide-y rounded-lg border bg-card">
            {docs.data?.map((d) => {
              const st = DOC_STATUS[d.status] ?? DOC_STATUS["requested"]!;
              const canUpload = d.status === "requested" || d.status === "needs_attention" || d.status === "uploaded";
              return (
                <li key={d.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{lang === "ar" ? DOC_AR[d.label] ?? d.label : d.label}</p>
                    {d.file_name && <button onClick={() => view(d.file_path!)} className="text-xs text-accent underline">{d.file_name}</button>}
                    {d.staff_note && <p className="mt-1 text-xs text-destructive">{d.staff_note}</p>}
                  </div>
                  <span className={`rounded px-2 py-0.5 text-[11px] ${st.c}`}>{t(st.l)}</span>
                  {canUpload && (
                    <label className="cursor-pointer rounded-md border px-3 py-1.5 text-xs hover:bg-muted">
                      {busyId === d.id ? "…" : t(d.file_path ? tx("Replace", "استبدال") : tx("Upload", "رفع"))}
                      <input type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(d.id, f); e.target.value = ""; }} />
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3 className="text-xl text-primary">{t(tx("Notices", "التنبيهات"))}</h3>
          <div className="mt-4 grid gap-3">
            {notices.data?.length ? notices.data.map((n) => (
              <div key={n.id} className="rounded-lg border bg-card p-4">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-2 text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</p>
              </div>
            )) : <Notice>{t(tx("No notices yet. Our team will post updates here.", "لا توجد تنبيهات بعد. سينشر فريقنا التحديثات هنا."))}</Notice>}
          </div>
        </section>
      </div>
    </div>
  );
}
