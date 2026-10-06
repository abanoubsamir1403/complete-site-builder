import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type CSSProperties } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { services } from "@/lib/content";
import { formRequirements, getFormRequirement } from "@/lib/form-requirements";
import { EMBASSY_CODE, EMBASSY_PREREQS } from "@/lib/embassy-workflow";
import { NVC_CODE, NVC_PREREQS } from "@/lib/nvc-workflow";

export const Route = createFileRoute("/_authenticated/portal")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},
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
  const presetService = Route.useSearch().service;
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
      <Container className="mf-reveal mf-delay-2 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {cases.data?.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={`rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${current?.id === c.id ? "-translate-y-0.5 border-primary bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"}`}>
              {c.reference}
            </button>
          ))}
          <div className="ms-auto flex gap-2">
            {isStaff.data && <Link to="/staff" className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{t(tx("Staff workspace", "مساحة الفريق"))}</Link>}
            <button onClick={signOut} className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted">{t(tx("Sign out", "تسجيل الخروج"))}</button>
          </div>
        </div>
        <NewCase userId={user.id} presetSlug={presetService} hasCases={!!cases.data?.length} onCreated={(id) => setSelected(id)} />
        {current && <CaseView key={current.id} c={current} lang={lang} />}
      </Container>
    </>
  );
}

function NewCase({ userId, presetSlug, hasCases, onCreated }: { userId: string; presetSlug?: string | undefined; hasCases: boolean; onCreated: (id: string) => void }) {
  const { t, lang } = useLang();
  const qc = useQueryClient();
  const preset = presetSlug && services.some((s) => s.slug === presetSlug) ? presetSlug : undefined;
  const [open, setOpen] = useState(!hasCases);
  const [form, setForm] = useState(preset === "nvc" ? "NVC" : "");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const slug = preset ?? "";
  const svc = services.find((s) => s.slug === slug);
  const fr = getFormRequirement(form);
  const allQs = (fr?.questions ?? []).map((q) => ({ key: `${fr!.code}.${q.id}`, q: q.q, type: q.type }));
  const allDocs = fr?.docs ?? [];
  const prereqBlocked =
    (fr?.code === EMBASSY_CODE && EMBASSY_PREREQS.some((k) => answers[`${EMBASSY_CODE}.${k}`] === "no")) ||
    (fr?.code === NVC_CODE && NVC_PREREQS.some((k) => answers[`${NVC_CODE}.${k}`] === "no"));
  const missing = allQs.filter((q) => !(answers[q.key] ?? "").trim()).length;
  const m = useMutation({
    mutationFn: async () => {
      if (prereqBlocked) throw new Error(fr?.code === NVC_CODE ? (lang === "ar" ? "يجب إكمال مرحلة USCIS أولًا" : "The USCIS stage must be completed first") : (lang === "ar" ? "يجب إكمال مرحلتي USCIS وNVC أولًا" : "USCIS and NVC stages must be completed first"));
      if (missing) throw new Error(lang === "ar" ? "يرجى الإجابة على جميع الأسئلة" : "Please answer every question");
      const { data, error } = await supabase.from("cases").insert({
        client_id: userId, service_title: svc ? svc.title[lang] : (fr ? fr.title[lang] : (lang === "ar" ? "ملف توثيق" : "Documentation file")), service_slug: slug || null, form_code: fr?.code ?? null, intake_answers: answers,
      }).select("id").single();
      if (error) throw error;
      if (allDocs.length) {
        const { data: existing } = await supabase.from("case_documents").select("label").eq("case_id", data.id);
        const have = new Set((existing ?? []).map((d) => d.label.toLowerCase()));
        const extra = [...new Set(allDocs.map((d) => d[lang]))].filter((l) => !have.has(l.toLowerCase())).map((label) => ({ case_id: data.id, label }));
        if (extra.length) await supabase.from("case_documents").insert(extra);
      }
      return data.id;
    },
    onSuccess: (id) => { qc.invalidateQueries({ queryKey: ["cases"] }); onCreated(id); setOpen(false); setForm(""); setAnswers({}); setConfirm(false); },
  });
  if (!open) return <button onClick={() => setOpen(true)} className="mb-8 text-sm text-accent underline">{t(tx("+ Open a new documentation file", "+ فتح ملف توثيق جديد"))}</button>;
  const field = "rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mf-expand-in mb-10 grid gap-3 rounded-2xl border bg-card p-6 sm:max-w-2xl">
      <h2 className="text-xl text-primary">{t(tx("Open a documentation file", "فتح ملف توثيق"))}</h2>
      {preset && svc && (
        <p className="rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          {t(tx("Service", "الخدمة"))}: <span className="font-medium text-foreground">{t(svc.title)}</span>
        </p>
      )}
      <select value={form} onChange={(e) => setForm(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" aria-label="Form">
        <option value="">{t(tx("Form you selected (optional)", "النموذج الذي اخترته (اختياري)"))}</option>
        {formRequirements.map((f) => <option key={f.code} value={f.code}>{f.code} — {t(f.title)}</option>)}
      </select>
      {allQs.length > 0 && (
        <div className="grid gap-3 rounded-xl bg-muted/60 p-4">
          <p className="text-sm font-medium text-primary">{t(tx("Required questions — answer all of them", "أسئلة إلزامية — يجب الإجابة عليها جميعًا"))} <span className="text-xs text-muted-foreground">({allQs.length - missing}/{allQs.length})</span></p>
          {allQs.map((q) => (
            <label key={q.key} className="grid gap-1 text-xs text-muted-foreground">
              <span>{t(q.q)} <span className="text-destructive">*</span></span>
              {q.type === "yesno" ? (
                <select required value={answers[q.key] ?? ""} onChange={(e) => set(q.key, e.target.value)} className={field}>
                  <option value="">—</option><option value="yes">{t(tx("Yes", "نعم"))}</option><option value="no">{t(tx("No", "لا"))}</option>
                </select>
              ) : q.type === "textarea" ? (
                <textarea required rows={3} maxLength={2000} value={answers[q.key] ?? ""} onChange={(e) => set(q.key, e.target.value)} className={field} />
              ) : (
                <input required type={q.type === "date" ? "date" : "text"} maxLength={500} value={answers[q.key] ?? ""} onChange={(e) => set(q.key, e.target.value)} className={field} />
              )}
            </label>
          ))}
          <p className="text-xs text-muted-foreground">{t(tx(`${allDocs.length} documents will be added to your checklist.`, `سيُضاف ${allDocs.length} مستندًا إلى قائمتك.`))}</p>
        </div>
      )}
      <label className="flex gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} required />
        {t(tx("I confirm I selected this service and form myself.", "أؤكد أنني اخترت هذه الخدمة والنموذج بنفسي."))}</label>
      {prereqBlocked && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {fr?.code === NVC_CODE
            ? t(tx("The NVC stage can only start after the USCIS petition stage is completed and approved (with us or elsewhere). Open a USCIS file first.", "لا تبدأ مرحلة NVC إلا بعد اكتمال مرحلة الالتماس لدى USCIS والموافقة عليها (معنا أو خارجنا). افتح ملف USCIS أولًا."))
            : t(tx("The embassy stage can only start after the USCIS petition is approved and the NVC stage is complete (with us or elsewhere). Open a USCIS or NVC file first.", "لا تبدأ مرحلة السفارة إلا بعد الموافقة على الالتماس لدى USCIS واكتمال مرحلة NVC (معنا أو خارجنا). افتح ملف USCIS أو NVC أولًا."))}
        </p>
      )}
      {m.error && <p className="text-sm text-destructive">{(m.error as Error).message}</p>}
      <button disabled={m.isPending || !confirm || missing > 0 || prereqBlocked} className="justify-self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{t(tx("Open file", "فتح الملف"))}</button>

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
    <div className="mf-panel-enter grid gap-10">
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl text-primary">{c.service_title}{c.form_code ? ` · ${c.form_code}` : ""}</h2>
          <span className="font-mono text-xs text-muted-foreground">{c.reference}</span>
        </div>
        <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {STAGES.map((s, i) => (
            <li key={s.key} className="grid gap-2">
              <div className={`mf-stage-bar h-1.5 rounded-full ${i <= idx ? "bg-accent" : "bg-muted"}`} style={{ "--mf-index": i } as CSSProperties} />
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
          <ul className="mf-stagger mt-4 divide-y rounded-lg border bg-card">
            {docs.data?.map((d, index) => {
              const st = DOC_STATUS[d.status] ?? DOC_STATUS["requested"]!;
              const canUpload = d.status === "requested" || d.status === "needs_attention" || d.status === "uploaded";
              return (
                <li key={d.id} className="mf-stagger-item flex flex-wrap items-center gap-3 p-4" style={{ "--mf-index": index } as CSSProperties}>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{lang === "ar" ? DOC_AR[d.label] ?? d.label : d.label}</p>
                    {d.file_name && d.file_path && <button onClick={() => d.file_path && view(d.file_path)} className="text-xs text-accent underline">{d.file_name}</button>}
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
          <div className="mf-stagger mt-4 grid gap-3">
            {notices.data?.length ? notices.data.map((n, index) => (
              <div key={n.id} className="mf-stagger-item rounded-lg border bg-card p-4 transition hover:border-accent/40 hover:shadow-sm" style={{ "--mf-index": index } as CSSProperties}>
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
