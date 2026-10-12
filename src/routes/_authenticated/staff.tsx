import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import type { Database } from "@/integrations/supabase/types";
const AdminConsole = lazy(() =>
  import("@/components/site/AdminConsole").then((m) => ({ default: m.AdminConsole }))
);
import { InterviewsManager } from "@/components/site/InterviewsManager";
import { FolderKanban, Video, CheckCircle, XCircle, CreditCard, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { requirements } from "@/lib/requirements";
import { getFormRequirement } from "@/lib/form-requirements";
import { DeclarationBox } from "@/components/site/DeclarationBox";
import { services } from "@/lib/content";
import { getDocLabel } from "./portal";
import { fetchInterviewAppointments } from "@/lib/interview";

export const Route = createFileRoute("/_authenticated/staff")({
  validateSearch: (search: Record<string, unknown>): { view?: string | undefined } => ({
    view: typeof search["view"] === "string" ? search["view"] : undefined,
  }),
  head: () => seo("Staff Workspace", "MIGRAFILE internal case management for staff."),
  component: Staff,
});

type Stage = Database["public"]["Enums"]["case_stage"];
type Signal = Database["public"]["Enums"]["case_signal"];
type CaseRow = Database["public"]["Tables"]["cases"]["Row"];
type DocStatus = Database["public"]["Enums"]["doc_status"];

const STAGES: { key: Stage; label: T }[] = [
  { key: "pending_admin_review", label: tx("Pending Admin Review", "بانتظار مراجعة الإدارة") },
  { key: "pending_payment", label: tx("Pending Payment", "بانتظار السداد") },
  { key: "payment_verification", label: tx("Payment Verification", "التحقق من السداد") },
  { key: "documents", label: tx("Documents", "المستندات") },
  { key: "review", label: tx("Review", "المراجعة") },
  { key: "translation", label: tx("Translation", "الترجمة") },
  { key: "assembly", label: tx("Assembly", "التجميع") },
  { key: "complete", label: tx("Complete", "مكتمل") },
  { key: "rejected", label: tx("Rejected", "مرفوض") },
  { key: "intake", label: tx("Intake (Legacy)", "الاستلام (سابق)") },
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
const sel = "w-full min-w-0 rounded-md border border-input bg-background px-2 py-1.5 text-xs";

function Staff() {
  const { t } = useLang();
  const { user } = Route.useRouteContext();
  const searchParams = Route.useSearch();
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
  const [workspaceView, setWorkspaceView] = useState<"cases" | "interviews">(() => {
    return searchParams.view === "interviews" ? "interviews" : "cases";
  });

  const appointments = useQuery({
    queryKey: ["interview-appointments"],
    queryFn: fetchInterviewAppointments,
  });

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
  const interviewCount = appointments.data?.length ?? 0;

  return (
    <>
      <PageHeader
        eyebrow={tx("Staff workspace", "مساحة الفريق")}
        title={workspaceView === "interviews" ? tx("Video Call Interviews", "مقابلات الفيديو كول") : tx("Case management", "إدارة الملفات")}
      />
      <Container className="py-10">
        {/* Prominent Banner Alert for Booked Interviews */}
        {interviewCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground font-bold">
                <Video className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-primary text-sm">
                  {t(tx("Booked Video Interviews", "مواعيد مقابلات الفيديو كول المحجوزة"))} ({interviewCount})
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(
                    tx(
                      "Clients have scheduled video interviews. Appointment times are displayed in your local time.",
                      "حجز العملاء مواعيد مقابلات فيديو كول شخصية — المواعيد معروضة بالتوقيت المحلي لديك.",
                    ),
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWorkspaceView("interviews")}
              className={`rounded-full px-5 py-2 text-xs font-bold transition shadow ${
                workspaceView === "interviews"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {workspaceView === "interviews"
                ? t(tx("Viewing Interviews", "معروضة حالياً بالأسفل"))
                : t(tx("View All Bookings (Local Time)", "عرض جميع الحجوزات بالتوقيت المحلي"))}
            </button>
          </div>
        )}

        {isAdmin.data && (
          <Suspense fallback={<div className="mb-8 h-48 animate-pulse rounded-2xl bg-muted" />}>
            <AdminConsole cases={cases.data ?? []} />
          </Suspense>
        )}

        {/* View Switcher: Cases vs Video Call Interviews */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex gap-2 rounded-xl bg-muted p-1">
            <button
              onClick={() => setWorkspaceView("cases")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                workspaceView === "cases" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FolderKanban className="h-4 w-4" />
              {t(tx("Case Management", "إدارة الملفات والقضايا"))}
            </button>
            <button
              onClick={() => setWorkspaceView("interviews")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                workspaceView === "interviews" ? "bg-card text-primary shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="h-4 w-4" />
              {t(tx("Video Call Interviews", "مقابلات الفيديو كول"))}
              {interviewCount > 0 && (
                <span className="ms-1.5 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  {interviewCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {workspaceView === "interviews" ? (
          <InterviewsManager />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button onClick={() => setFilter("all")} className={`rounded-md border px-3 py-1.5 text-xs ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{t(tx("All", "الكل"))} ({cases.data?.length ?? 0})</button>
              {SIGNALS.map((s) => (
                <button key={s.key} onClick={() => setFilter(s.key)} className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs ${filter === s.key ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />{t(s.label)} ({counts[s.key]})
                </button>
              ))}
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(tx("Search reference, service, form…", "ابحث بالمرجع أو الخدمة أو النموذج…"))} aria-label={t(tx("Search cases", "البحث في الملفات"))} className="w-full min-w-0 rounded-md sm:ms-auto sm:max-w-xs border border-input bg-background px-3 py-1.5 text-sm" />
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <ul className="divide-y self-start rounded-lg border bg-card">
                {list.length === 0 && <li className="p-4 text-sm text-muted-foreground">{t(tx("No cases.", "لا توجد ملفات."))}</li>}
                {list.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => setSelected(c.id)} className={`flex w-full items-center gap-3 p-4 text-start hover:bg-muted ${selected === c.id ? "bg-muted" : ""}`}>
                      <span className={`h-3 w-3 shrink-0 rounded-full ${SIGNALS.find((s) => s.key === c.signal)?.dot}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{(c.service_slug && services.find((s) => s.slug === c.service_slug) ? t(services.find((s) => s.slug === c.service_slug)!.title) : (c.form_code && getFormRequirement(c.form_code) ? t(getFormRequirement(c.form_code)!.title) : t(c.service_title)))}{c.form_code ? ` · ${c.form_code}` : ""}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{c.reference} · {t(STAGES.find((s) => s.key === c.stage)!.label)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {current ? <CaseEditor key={current.id} c={current} /> : <Notice>{t(tx("Select a case to manage it.", "اختر ملفًا لإدارته."))}</Notice>}
            </div>
          </>
        )}
      </Container>
    </>
  );
}

function ReceiptViewer({ url }: { url: string }) {
  const { t } = useLang();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchUrl() {
      if (!url) {
        setLoading(false);
        return;
      }
      if (url.startsWith("http://") || url.startsWith("https://")) {
        setSignedUrl(url);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.storage.from("case-files").createSignedUrl(url, 3600);
        if (error) throw error;
        if (active) setSignedUrl(data?.signedUrl ?? null);
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchUrl();
    return () => {
      active = false;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-border/60 bg-muted/30 text-xs text-muted-foreground animate-pulse">
        {t(tx("Loading receipt...", "جاري تحميل الإيصال..."))}
      </div>
    );
  }

  if (loadError || !signedUrl) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-xs text-destructive">
        {t(tx("Could not load receipt preview.", "تعذر تحميل معاينة الإيصال."))}
      </div>
    );
  }

  const isPdf = url.toLowerCase().endsWith(".pdf") || signedUrl.toLowerCase().includes(".pdf");

  return (
    <div className="grid gap-2">
      {isPdf ? (
        <div className="rounded-lg border bg-muted/40 p-5 text-center">
          <p className="mb-2 text-xs text-muted-foreground">{t(tx("Uploaded PDF Receipt Document", "مستند إيصال سداد بصيغة PDF"))}</p>
          <a
            href={signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-accent"
          >
            <FileText className="h-4 w-4" />
            {t(tx("Open PDF in New Tab", "عرض ملف PDF في نافذة جديدة"))}
          </a>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5">
          <a href={signedUrl} target="_blank" rel="noopener noreferrer" className="block cursor-zoom-in">
            <img
              src={signedUrl}
              alt={t(tx("Uploaded payment receipt", "إيصال السداد المرفوع"))}
              className="max-h-96 w-full object-contain p-2"
            />
          </a>
        </div>
      )}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span>{t(tx("Click image to view in full resolution", "انقر على الصورة للعرض بالدقة الكاملة"))}</span>
        <a
          href={signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-accent underline hover:text-primary"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t(tx("Open in new tab", "فتح في نافذة جديدة"))}
        </a>
      </div>
    </div>
  );
}

function CaseEditor({ c }: { c: CaseRow }) {
  const { t, lang, locale } = useLang();
  const qc = useQueryClient();
  const [err, setErr] = useState<string | null>(null);
  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [feeInput, setFeeInput] = useState(c.service_fee ? String(c.service_fee) : "");
  const [rejectConfirm, setRejectConfirm] = useState(false);
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
  const logAct = (action: string, details: Record<string, string> = {}) =>
    supabase.auth.getUser().then(({ data }) => supabase.from("activity_log").insert({ actor_id: data.user?.id ?? null, action, target: c.reference, details }));
  const updateCase = (patch: Partial<CaseRow>) => {
    logAct("case.update", patch as Record<string, string>);
    return run(() => supabase.from("cases").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", c.id), [["staff-cases"]]);
  };

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    const fee = parseFloat(feeInput);
    if (isNaN(fee) || fee <= 0) {
      setErr(t(tx("Please enter a valid service fee amount", "يرجى إدخال مبلغ رسوم خدمة صحيح")));
      return;
    }
    await updateCase({ stage: "pending_payment", service_fee: fee });
    setShowAcceptForm(false);
  };

  const handleReject = async () => {
    await updateCase({ stage: "rejected" });
    setRejectConfirm(false);
  };

  const [zipping, setZipping] = useState(false);
  async function download(path: string, name: string) {
    const { data } = await supabase.storage.from("case-files").download(path);
    if (!data) return setErr(t(tx("Download failed", "فشل التنزيل")));
    const a = document.createElement("a"); a.href = URL.createObjectURL(data); a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    logAct("doc.download", { file: name });
  }
  async function downloadAll() {
    const files = (docs.data ?? []).filter((d) => d.file_path);
    if (!files.length) return;
    setZipping(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      for (const d of files) {
        const { data } = await supabase.storage.from("case-files").download(d.file_path!);
        if (data) zip.file(`${d.label.replace(/[\\/:*?"<>|]/g, "_")} - ${d.file_name ?? "file"}`, data);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${c.reference}.zip`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      logAct("doc.download", { file: "ZIP (" + files.length + ")" });
    } finally { setZipping(false); }
  }

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
    <div className="grid min-w-0 gap-6">
      <section className="grid gap-4 rounded-lg border bg-card p-5">
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
          <h2 className="text-xl text-primary">{c.service_slug && services.find((s) => s.slug === c.service_slug) ? t(services.find((s) => s.slug === c.service_slug)!.title) : (c.form_code && getFormRequirement(c.form_code) ? t(getFormRequirement(c.form_code)!.title) : t(c.service_title))}{c.form_code ? ` · ${c.form_code}` : ""}</h2>
          <span className="font-mono text-xs text-muted-foreground">{c.reference}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>{t(tx("Client", "العميل"))}: {client.data?.full_name ?? "—"}{client.data?.phone ? ` · ${client.data.phone}` : ""}</p>
          {c.service_fee !== null && c.service_fee !== undefined && (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-bold text-accent">
              {t(tx("Service Fee", "رسوم الخدمة"))}: ${c.service_fee}
            </span>
          )}
        </div>
        {c.service_slug && requirements[c.service_slug] && (
          <dl className="mt-3 grid gap-1.5 rounded-xl bg-muted/60 p-3 text-xs">
            {requirements[c.service_slug]!.questions.map((q) => (
              <div key={q.id} className="grid gap-1 border-b border-border/60 pb-2 last:border-0"><dt className="text-muted-foreground">{t(q.q)}</dt><dd className="font-medium">{String((c.intake_answers as Record<string, string> | null)?.[q.id] ?? "—")}</dd></div>
            ))}
          </dl>
        )}
        {getFormRequirement(c.form_code) && (
          <dl className="mt-3 grid gap-1.5 rounded-xl bg-muted/60 p-3 text-xs">
            <p className="font-medium text-primary">{c.form_code}</p>
            {getFormRequirement(c.form_code)!.questions.map((q) => (
              <div key={q.id} className="grid gap-1 border-b border-border/60 pb-2 last:border-0"><dt className="text-muted-foreground">{t(q.q)}</dt><dd className="font-medium">{String((c.intake_answers as Record<string, string> | null)?.[`${c.form_code}.${q.id}`] ?? "—")}</dd></div>
            ))}
          </dl>
        )}
        <DeclarationBox c={c} clientName={client.data?.full_name ?? null} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-xs">{t(tx("Stage", "المرحلة"))}
            <select className={sel} value={c.stage} aria-label={t(tx("Stage", "المرحلة"))} onChange={(e) => updateCase({ stage: e.target.value as Stage })}>
              {STAGES.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
            </select></label>
          <label className="grid gap-1 text-xs">{t(tx("Signal", "الإشارة"))}
            <select className={sel} value={c.signal} aria-label={t(tx("Signal", "الإشارة"))} onChange={(e) => updateCase({ signal: e.target.value as Signal })}>
              {SIGNALS.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
            </select></label>
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
      </section>

      {/* Case Decision UI Section (pending_admin_review) */}
      {c.stage === "pending_admin_review" && (
        <section className="rounded-xl border-2 border-primary/40 bg-primary/5 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-primary">
                {t(tx("Case Decision", "قرار الملف"))}
              </h3>
            </div>
            <span className="rounded-full bg-gold/20 px-3 py-0.5 text-xs font-semibold text-foreground">
              {t(tx("Under Admin Review", "قيد مراجعة الإدارة"))}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {t(
              tx(
                "Review the intake answers and applicant details. Decide whether to accept with a quoted service fee or reject the case.",
                "راجع إجابات الاستبيان وبيانات المتقدم. قرر إما قبول الملف مع تحديد رسوم الخدمة أو رفض الملف."
              )
            )}
          </p>

          {!showAcceptForm ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAcceptForm(true);
                  setRejectConfirm(false);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:bg-accent transition"
              >
                <CheckCircle className="h-4 w-4" />
                {t(tx("Accept Case", "قبول الملف"))}
              </button>

              {!rejectConfirm ? (
                <button
                  type="button"
                  onClick={() => setRejectConfirm(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground transition"
                >
                  <XCircle className="h-4 w-4" />
                  {t(tx("Reject Case", "رفض الملف"))}
                </button>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-2">
                  <span className="text-xs font-medium text-destructive">
                    {t(tx("Confirm reject?", "تأكيد الرفض؟"))}
                  </span>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="rounded bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground hover:opacity-90"
                  >
                    {t(tx("Yes, Reject", "نعم، ارفض"))}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRejectConfirm(false)}
                    className="rounded border border-input px-2 py-1 text-xs hover:bg-muted"
                  >
                    {t(tx("Cancel", "إلغاء"))}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleAccept} className="mt-4 grid gap-3 rounded-lg border bg-card p-4 sm:max-w-md">
              <label className="grid gap-1.5 text-xs font-semibold text-foreground">
                <span>{t(tx("Enter Service Fee ($)", "أدخل رسوم الخدمة ($)"))} <span className="text-destructive">*</span></span>
                <div className="relative">
                  <span className="absolute start-3 top-2 text-sm text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={feeInput}
                    onChange={(e) => setFeeInput(e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full rounded-md border border-input bg-background ps-7 pe-3 py-1.5 text-sm font-medium focus:border-primary focus:outline-none"
                    autoFocus
                  />
                </div>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!feeInput || Number(feeInput) <= 0}
                  className="rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-accent disabled:opacity-50"
                >
                  {t(tx("Save & Request Payment", "حفظ وطلب السداد"))}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAcceptForm(false)}
                  className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted"
                >
                  {t(tx("Cancel", "إلغاء"))}
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* Verify Payment UI Section (payment_verification) */}
      {c.stage === "payment_verification" && (
        <section className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              <h3 className="text-base font-bold text-primary">
                {t(tx("Verify Payment", "التحقق من السداد"))}
              </h3>
            </div>
            {c.service_fee !== null && c.service_fee !== undefined && (
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                {t(tx("Agreed Service Fee", "رسوم الخدمة المعتمدة"))}: ${c.service_fee}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {t(
              tx(
                "The client transferred the fee and uploaded their receipt screenshot below. Verify the transfer and confirm payment to start active processing.",
                "قام العميل بتحويل الرسوم ورفع لقطة شاشة للإيصال أدناه. تحقق من التحويل وأكد السداد لبدء المعالجة الفعلية."
              )
            )}
          </p>

          <div className="mt-4">
            {c.payment_receipt_url ? (
              <ReceiptViewer url={c.payment_receipt_url} />
            ) : (
              <p className="rounded-lg border border-dashed p-4 text-xs text-muted-foreground text-center">
                {t(tx("No payment receipt URL found for this case.", "لم يتم العثور على رابط إيصال سداد لهذا الملف."))}
              </p>
            )}
          </div>

          <div className="mt-5 border-t border-border/60 pt-4">
            <button
              type="button"
              onClick={() => updateCase({ stage: "documents" })}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground shadow hover:bg-primary hover:text-primary-foreground transition"
            >
              <CheckCircle className="h-4 w-4" />
              {t(tx("Confirm Payment & Start Processing", "تأكيد الدفع وبدء المعالجة"))}
            </button>
          </div>
        </section>
      )}

      {/* Status Info for Pending Payment */}
      {c.stage === "pending_payment" && (
        <section className="rounded-xl border border-primary/20 bg-muted/40 p-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-primary">
              {t(tx("Case Accepted · Waiting for Client Payment", "تم قبول الملف · بانتظار سداد العميل"))}
            </span>
            <span className="font-bold text-accent">
              {t(tx("Service Fee", "رسوم الخدمة"))}: ${c.service_fee ?? "—"}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">
            {t(
              tx(
                "Client was quoted the fee and prompted to transfer via Apple Pay, Venmo, or Zelle and upload receipt.",
                "تم تزويد العميل بعرض الرسوم وطُلب منه التحويل عبر Apple Pay أو Venmo أو Zelle ورفع الإيصال."
              )
            )}
          </p>
        </section>
      )}

      {/* Status Info for Rejected Case */}
      {c.stage === "rejected" && (
        <section className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs">
          <span className="font-semibold text-destructive">
            {t(tx("Case Rejected", "الملف مرفوض"))}
          </span>
          <p className="mt-1 text-muted-foreground">
            {t(
              tx(
                "This case was rejected. The client portal displays the rejection notice and booking call link.",
                "تم رفض هذا الملف. تعرض بوابة العميل إشعار الرفض ورابط حجز المكالمة."
              )
            )}
          </p>
        </section>
      )}

      <section className="rounded-lg border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg text-primary">{t(tx("Documents", "المستندات"))}</h3>
          {docs.data?.some((d) => d.file_path) && <button onClick={downloadAll} disabled={zipping} className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted">{zipping ? "…" : t(tx("Download all (ZIP)", "تنزيل الكل (ZIP)"))}</button>}
        </div>
        <ul className="mt-3 divide-y">
          {docs.data?.map((d) => (
            <li key={d.id} className="grid gap-2 py-3">
              <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <span className="min-w-0 text-sm font-medium sm:col-span-2">{t(getDocLabel(d.label))}</span>
                {d.file_path && <span className="flex min-w-0 flex-wrap items-center gap-3"><button onClick={() => d.file_path && view(d.file_path)} className="min-w-0 break-all text-start text-xs text-accent underline">{d.file_name}</button><button onClick={() => download(d.file_path!, d.file_name ?? "file")} className="text-xs underline">{t(tx("Download", "تنزيل"))}</button></span>}
                <select className={sel} value={d.status} aria-label={t(tx("Document status", "حالة المستند"))} onChange={(e) => { logAct("doc.status", { doc: d.label, status: e.target.value }); run(() => supabase.from("case_documents").update({ status: e.target.value as DocStatus }).eq("id", d.id), [["docs", c.id]]); }}>
                  {DOC_STATUSES.map((s) => <option key={s.key} value={s.key}>{t(s.label)}</option>)}
                </select>
              </div>
              <input defaultValue={d.staff_note ?? ""} placeholder={t(tx("Note visible to client (e.g. photo is blurry)", "ملاحظة يراها العميل (مثال: الصورة غير واضحة)"))} className="rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                onBlur={(e) => { const v = e.target.value.trim() || null; if (v !== d.staff_note) run(() => supabase.from("case_documents").update({ staff_note: v }).eq("id", d.id), [["docs", c.id]]); }} />
            </li>
          ))}
        </ul>
        <form className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2" onSubmit={(e) => { e.preventDefault(); if (!newDoc.trim()) return; run(() => supabase.from("case_documents").insert({ case_id: c.id, label: newDoc.trim() }), [["docs", c.id]]); setNewDoc(""); }}>
          <input value={newDoc} onChange={(e) => setNewDoc(e.target.value)} placeholder={t(tx("Request another document…", "طلب مستند إضافي…"))} className="min-w-0 rounded-md border border-input bg-background px-2 py-1.5 text-xs" />
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
            <li key={n.id} className="rounded border p-2 text-xs"><b>{n.title}</b> — {n.body} <span className="text-muted-foreground">· {new Date(n.created_at).toLocaleDateString(locale)}</span></li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-dashed bg-muted/40 p-5">
        <h3 className="text-lg text-primary">{t(tx("Internal notes (staff only)", "ملاحظات داخلية (للفريق فقط)"))}</h3>
        <form className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2" onSubmit={(e) => { e.preventDefault(); if (!noteBody.trim()) return; run(() => supabase.from("case_internal_notes").insert({ case_id: c.id, body: noteBody.trim() }), [["internal", c.id]]); setNoteBody(""); }}>
          <input value={noteBody} onChange={(e) => setNoteBody(e.target.value)} placeholder={t(tx("Add internal note…", "إضافة ملاحظة داخلية…"))} aria-label={t(tx("Add internal note…", "إضافة ملاحظة داخلية…"))} className="min-w-0 rounded-md border border-input bg-background px-2 py-1.5 text-xs" />
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">{t(tx("Add", "إضافة"))}</button>
        </form>
        <ul className="mt-3 grid gap-1 text-xs">
          {notes.data?.map((n) => <li key={n.id}>{new Date(n.created_at).toLocaleString(locale)} — {n.body}</li>)}
        </ul>
      </section>
    </div>
  );
}
