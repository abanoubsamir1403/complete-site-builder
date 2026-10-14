import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { declarationClauses, declarationTitle, DECLARATION_VERSION, type Declaration } from "@/lib/declaration";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, type CSSProperties } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { services, serviceForms } from "@/lib/content";
import { formRequirements, getFormRequirement } from "@/lib/form-requirements";
import { requirements } from "@/lib/requirements";
import { EMBASSY_CODE, EMBASSY_PREREQS } from "@/lib/embassy-workflow";
import { NVC_CODE, NVC_PREREQS } from "@/lib/nvc-workflow";
import { DS160_CODE } from "@/lib/niv-workflow";
import type { Database } from "@/integrations/supabase/types";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Copy,
  Check,
  CreditCard,
  UploadCloud,
  ExternalLink,
  Headphones,
  FileText,
  Sparkles,
  QrCode,
  Bell,
  CheckCheck,
  User,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  notifyStaffOfDocUpload,
  notifyStaffOfPaymentUpload,
  notifyStaffOfNewCase,
  markNoticeAsRead,
  markAllCaseNoticesAsRead,
} from "@/lib/notifications";

export const Route = createFileRoute("/_authenticated/portal")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},
  head: () => seo("My Portal", "Your secure MIGRAFILE client dashboard: case progress, documents and notices."),
  component: Portal,
});

const CLIENT_MILESTONES: { key: string; label: T; stages: string[] }[] = [
  { key: "review_quote", label: tx("Admin Review", "مراجعة الإدارة"), stages: ["pending_admin_review", "intake"] },
  { key: "payment", label: tx("Payment", "السداد"), stages: ["pending_payment", "payment_verification"] },
  { key: "documents", label: tx("Documents", "المستندات"), stages: ["documents"] },
  { key: "review", label: tx("Review", "المراجعة"), stages: ["review"] },
  { key: "complete", label: tx("Complete", "مكتمل"), stages: ["complete"] },
];
const DOC_STATUS: Record<string, { l: T; c: string }> = {
  requested: { l: tx("Requested", "مطلوب"), c: "bg-muted text-muted-foreground" },
  uploaded: { l: tx("Uploaded", "تم الرفع"), c: "bg-secondary text-secondary-foreground" },
  under_review: { l: tx("Under review", "قيد المراجعة"), c: "bg-gold/20 text-foreground" },
  accepted: { l: tx("Accepted", "مستوفٍ"), c: "bg-accent/15 text-accent" },
  needs_attention: { l: tx("Needs attention", "يحتاج استكمال"), c: "bg-destructive/15 text-destructive" },
};
function formOptionTitle(code: string, title: string) {
  const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return title
    .replace(
      new RegExp(
        `^(?:(?:Form|نموذج)\\s+)?${escapedCode}(?=\\s|$|[:：—–-])\\s*(?:[:：—–-]\\s*)?`,
        "i",
      ),
      "",
    )
    .replace(
      new RegExp(`[（(]\\s*(?:(?:Form|نموذج)\\s+)?${escapedCode}\\s*[）)]\\s*$`, "i"),
      "",
    )
    .trim();
}
const keepEnglishCharacters = (value: string) => value.replace(/[^\p{ASCII}]/gu, "");
const isEnglishText = (value: string) => /^[\p{ASCII}]*$/u.test(value);
function localizedNoticeText(value: string, language: "en" | "ar", isTitle = false) {
  const separator = isTitle ? /\s*\|\s*/ : /\n+/;
  const parts = value.split(separator);
  const hasArabic = (part: string) => /\p{Script=Arabic}/u.test(part);

  if (!parts.some(hasArabic) || !parts.some((part) => /[A-Za-z]/.test(part) && !hasArabic(part))) {
    return value;
  }

  return parts
    .filter((part) => (language === "ar" ? hasArabic(part) : !hasArabic(part)))
    .join(isTitle ? " | " : "\n")
    .trim();
}
const DOC_TRANSLATIONS: Record<string, T> = {
  "passport (bio page)": tx("Passport (bio page)", "جواز السفر (صفحة البيانات)"),
  "birth certificate": tx("Birth certificate", "شهادة الميلاد"),
  "national id": tx("National ID", "بطاقة الرقم القومي"),
  "passport-style photo": tx("Passport-style photo", "صورة شخصية"),
  "passport-style photos": tx("Passport-style photos", "صور شخصية بمقاس الجواز"),
  "petitioner proof of u.s. citizenship or green card": tx("Petitioner proof of U.S. citizenship or green card", "إثبات جنسية الكفيل الأمريكية أو الجرين كارد"),
  "beneficiary passport (bio page)": tx("Beneficiary passport (bio page)", "جواز سفر المستفيد (صفحة البيانات)"),
  "birth certificates (petitioner and beneficiary)": tx("Birth certificates (petitioner and beneficiary)", "شهادات الميلاد (الكفيل والمستفيد)"),
  "marriage certificate (if spouse)": tx("Marriage certificate (if spouse)", "وثيقة الزواج (في حالة الزوج/الزوجة)"),
  "divorce or death certificates for any prior marriages": tx("Divorce or death certificates for any prior marriages", "وثائق الطلاق أو الوفاة لأي زواج سابق"),
  "evidence of the relationship (photos, correspondence)": tx("Evidence of the relationship (photos, correspondence)", "إثبات العلاقة (صور، مراسلات)"),
  "nvc welcome letter (case number + invoice id)": tx("NVC welcome letter (case number + invoice ID)", "خطاب NVC (رقم القضية ورقم الفاتورة)"),
  "valid passport": tx("Valid passport", "جواز سفر ساري"),
  "marriage / divorce certificates (if any)": tx("Marriage / divorce certificates (if any)", "وثائق الزواج / الطلاق (إن وجدت)"),
  "police certificate (egyptian criminal record)": tx("Police certificate (Egyptian criminal record)", "صحيفة الحالة الجنائية (الفيش والتشبيه)"),
  "military status certificate (males)": tx("Military status certificate (males)", "شهادة الموقف من التجنيد (للذكور)"),
  "sponsor financial documents (tax transcripts, w-2, pay stubs)": tx("Sponsor financial documents (tax transcripts, W-2, pay stubs)", "مستندات الكفيل المالية (الإقرارات الضريبية، W-2، كشوف المرتب)"),
  "u.s. citizen parent's passport": tx("U.S. citizen parent's passport", "جواز سفر الوالد/الوالدة الأمريكي"),
  "child's birth certificate (egyptian, with translation)": tx("Child's birth certificate (Egyptian, with translation)", "شهادة ميلاد الطفل المصرية مع الترجمة"),
  "parents' marriage certificate": tx("Parents' marriage certificate", "وثيقة زواج الوالدين"),
  "evidence of the u.s. parent's physical presence in the u.s. (transcripts, w-2, records)": tx("Evidence of the U.S. parent's physical presence in the U.S. (transcripts, W-2, records)", "إثبات إقامة الوالد الأمريكي في أمريكا (شهادات دراسية، W-2، سجلات)"),
  "non-u.s. parent's passport or id": tx("Non-U.S. parent's passport or ID", "جواز أو بطاقة الوالد غير الأمريكي"),
  "child's passport-style photo": tx("Child's passport-style photo", "صورة شخصية للطفل بمقاس الجواز"),
  "current passport biographical page (valid for at least 6 months beyond stay)": tx("Current passport biographical page", "صفحة بيانات جواز السفر الساري"),
  "relevant previous passport pages and previous u.s. visas": tx("Previous passports and U.S. visas", "الجوازات والتأشيرات الأمريكية السابقة"),
  "visa photograph meeting current department of state 2x2 inch digital specifications": tx("Visa photograph (State Dept. specifications)", "صورة شخصية للتأشيرة (مواصفات الخارجية)"),
  "ds-160 online confirmation page with barcode (after submission)": tx("DS-160 confirmation page", "صفحة تأكيد استمارة DS-160"),
  "consular appointment confirmation letter (after scheduling)": tx("Appointment confirmation letter", "خطاب تأكيد موعد المقابلة القنصلية"),
  "visa application fee (mrv) payment receipt": tx("Visa application fee (MRV) receipt", "إيصال سداد رسوم التأشيرة (MRV)"),
  "residence permit or proof of lawful status (if applying outside country of nationality)": tx("Proof of lawful residence", "إثبات الإقامة القانونية"),
  "previous visa refusal notices or form 221(g) correspondence (if applicable)": tx("Previous refusal / 221(g) notice", "إشعار الرفض السابق / 221(g)"),
  "uscis petition approval notice form i-797 / receipt details (for petition-based categories)": tx("USCIS I-797 petition approval", "إشعار موافقة التماس USCIS I-797"),
  "embassy-specific instructions and consular checklist for the selected post": tx("Embassy-specific checklist", "قائمة متطلبات السفارة المحددة"),
  "employment verification letter, approved leave letter, and recent pay stubs": tx("Employment letter and pay stubs", "خطاب العمل وكشوف المرتبات"),
  "commercial register, tax card, and company ownership documentation (if self-employed)": tx("Business registration and tax card", "السجل التجاري والبطاقة الضريبية"),
  "bank account statements (recent 3–6 months) or documented funding evidence": tx("Bank statements / funding evidence", "كشوف الحسابات البنكية / إثبات التمويل"),
  "sponsor letter and sponsor financial/tax documentation (if trip is sponsored)": tx("Sponsor letter and financial records", "خطاب الكفيل والمستندات المالية"),
  "proposed travel itinerary, hotel accommodation reservations, and flight plans": tx("Proposed travel itinerary", "خط سير الرحلة المقترح"),
  "official business correspondence, conference registration, or invitation letter": tx("Invitation letter / conference registration", "خطاب الدعوة / التسجيل بالمؤتمر"),
  "university/school enrollment certificate or official academic transcripts": tx("Enrollment certificate / transcripts", "شهادة القيد الدراسي / السجلات الأكاديمية"),
  "civil relationship documents (bilingual marriage and birth certificates for dependents)": tx("Civil relationship certificates", "المستندات المدنية لإثبات صلة القرابة"),
  "property titles, lease agreements, and home-country family/social ties evidence": tx("Property and home ties evidence", "عقود الملكية وإثبات روابط الوطن"),
  "certified court records, police records, or immigration disposition documents (if applicable)": tx("Court / police records", "سجلات المحاكم والشرطة"),
  "certified english translations for any supporting document not in english": tx("Certified English translations", "ترجمات معتمدة إلى الإنجليزية"),
};

const allRequirementDocs = [
  ...Object.values(requirements).flatMap((requirement) => requirement.docs),
  ...formRequirements.flatMap((requirement) => requirement.docs),
];

for (const item of allRequirementDocs) {
  const englishKey = item.en.trim().toLowerCase();
  const arabicKey = item.ar.trim().toLowerCase();
  if (!DOC_TRANSLATIONS[englishKey]) DOC_TRANSLATIONS[englishKey] = item;
  if (!DOC_TRANSLATIONS[arabicKey]) DOC_TRANSLATIONS[arabicKey] = item;
}

export function getDocLabel(label: string): T {
  const norm = label.trim().toLowerCase();
  if (DOC_TRANSLATIONS[norm]) return DOC_TRANSLATIONS[norm];
  return tx(label, label);
}

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
      <PageHeader eyebrow={tx("Client portal", "بوابة العملاء")} title={tx("My dashboard", "لوحتي")} intro={`${t(tx("Signed in as", "مسجّل الدخول باسم"))}: ${user.email}`} />
      <Container className="mf-reveal mf-delay-2 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {cases.data?.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={`rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${current?.id === c.id ? "-translate-y-0.5 border-primary bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"}`}>
              {c.reference}
            </button>
          ))}
          <div className="ms-auto flex flex-wrap items-center gap-2">
            <Link to="/book-interview" className="rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-accent-foreground">
              {t(tx("Schedule a Documentation Call", "احجز مكالمة لتنظيم المستندات"))}
            </Link>
            {isStaff.data && <Link to="/staff" className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{t(tx("Staff workspace", "مساحة الفريق"))}</Link>}
            <button onClick={signOut} className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted">{t(tx("Sign out", "تسجيل الخروج"))}</button>
          </div>
        </div>
        <NewCase userId={user.id} userEmail={user.email} presetSlug={presetService} hasCases={!!cases.data?.length} onCreated={(id) => setSelected(id)} />
        {current && <CaseView key={current.id} c={current} userEmail={user.email} profileName={profile.data?.full_name} />}
      </Container>
    </>
  );
}

const EMBASSY_OPTION = "__embassy";
const serviceOptions: { slug: string; title: T }[] = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
];

function NewCase({ userId, userEmail, presetSlug, hasCases, onCreated }: { userId: string; userEmail?: string | null; presetSlug?: string | undefined; hasCases: boolean; onCreated: (id: string) => void }) {
  const { t, lang } = useLang();
  const qc = useQueryClient();
  const normalizedPreset = presetSlug === EMBASSY_OPTION ? "embassy" : presetSlug;
  const preset = normalizedPreset && services.some((s) => s.slug === normalizedPreset) ? normalizedPreset : undefined;
  const [open, setOpen] = useState(!hasCases);
  const [chosen, setChosen] = useState("");
  const [form, setForm] = useState(
    preset === "nvc" ? NVC_CODE : preset === "embassy" ? EMBASSY_CODE : preset === "nonimmigrant-visas" ? DS160_CODE : ""
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const [signName, setSignName] = useState("");
  const slug = preset ?? chosen;
  const svc = services.find((s) => s.slug === slug);
  const formsList = !slug
    ? []
    : (serviceForms[slug] ?? [])
        .map((c) => getFormRequirement(c))
        .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const fr = getFormRequirement(form);
  const allQs = fr ? fr.questions.map((q) => ({ key: `${fr.code}.${q.id}`, q: q.q, type: q.type })) : [];
  const allDocs = fr?.docs ?? [];
  const prereqBlocked =
    (fr?.code === EMBASSY_CODE && EMBASSY_PREREQS.some((k) => answers[`${EMBASSY_CODE}.${k}`] === "no")) ||
    (fr?.code === NVC_CODE && NVC_PREREQS.some((k) => answers[`${NVC_CODE}.${k}`] === "no"));
  const missing = allQs.filter((q) => !(answers[q.key] ?? "").trim()).length;
  const m = useMutation({
    mutationFn: async () => {
      if (prereqBlocked) throw new Error(fr?.code === NVC_CODE ? t(tx("The USCIS stage must be completed first", "يجب إكمال مرحلة USCIS أولًا")) : t(tx("USCIS and NVC stages must be completed first", "يجب إكمال مرحلتي USCIS وNVC أولًا")));
      if (missing) throw new Error(t(tx("Please answer every question", "يرجى الإجابة على جميع الأسئلة")));
      if (Object.values(answers).some((answer) => !isEnglishText(answer)) || !isEnglishText(signName)) {
        throw new Error(t(tx("Please use English characters only for text answers and your signature.", "يرجى استخدام الأحرف الإنجليزية فقط في الإجابات النصية والتوقيع.")));
      }
      if (!confirm || signName.trim().length < 3) throw new Error(t(tx("You must sign the declaration", "يجب التوقيع على الإقرار")));
      const declaration: Declaration = { version: DECLARATION_VERSION, name: signName.trim(), lang, clauses: declarationClauses.map((c) => c[lang]) };
      const { data, error } = await supabase.from("cases").insert({
        client_id: userId,
        service_title: svc ? svc.title[lang] : (fr ? fr.title[lang] : (lang === "ar" ? "ملف توثيق" : "Documentation file")),
        service_slug: svc ? slug : null,
        form_code: fr?.code ?? null,
        intake_answers: answers,
        declaration,
        stage: "pending_admin_review",
      }).select("id, reference").single();
      if (error) throw error;
      if (allDocs.length) {
        const { data: existing } = await supabase.from("case_documents").select("label").eq("case_id", data.id);
        const have = new Set((existing ?? []).map((d) => d.label.toLowerCase()));
        const extra = [...new Set(allDocs.map((d) => d[lang]))].filter((l) => !have.has(l.toLowerCase())).map((label) => ({ case_id: data.id, label }));
        if (extra.length) await supabase.from("case_documents").insert(extra);
      }
      notifyStaffOfNewCase({
        caseId: data.id,
        reference: data.reference,
        clientName: signName.trim(),
        clientEmail: userEmail,
        actorId: userId,
        serviceTitle: svc ? svc.title[lang] : (fr ? fr.title[lang] : "Documentation file"),
        formCode: fr?.code ?? null,
      });
      return data.id;
    },
    onSuccess: (id) => { qc.invalidateQueries({ queryKey: ["cases"] }); onCreated(id); setOpen(false); setForm(""); setAnswers({}); setConfirm(false); setSignName(""); },
  });
  if (!open) return <button onClick={() => setOpen(true)} className="mb-8 text-sm text-accent underline">{t(tx("+ Open a new documentation file", "+ فتح ملف توثيق جديد"))}</button>;
  const field = "w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mf-expand-in mb-10 grid w-full min-w-0 gap-3 rounded-2xl border bg-card p-4 sm:max-w-2xl sm:p-6">
      <h2 className="text-xl text-primary">{t(tx("Open a documentation file", "فتح ملف توثيق"))}</h2>
      {svc && (
        <div className="grid gap-1 rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          <p>
            {t(tx("Service", "الخدمة"))}: <span className="font-medium text-foreground">{t(svc.title)}</span>
          </p>
          <p>{t(svc.summary)}</p>
          <p className="font-medium text-foreground">{t(svc.excludes)}</p>
        </div>
      )}
      {!preset && (
        <select
          value={chosen}
          onChange={(e) => {
            setChosen(e.target.value);
            setForm(
              e.target.value === "nvc"
                ? NVC_CODE
                : e.target.value === "embassy"
                ? EMBASSY_CODE
                : e.target.value === "nonimmigrant-visas"
                ? DS160_CODE
                : ""
            );
            setAnswers({});
          }}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label={t(tx("Service", "الخدمة"))}
        >
          <option value="">{t(tx("Choose the service", "اختر الخدمة"))}</option>
          {serviceOptions.map((o) => <option key={o.slug} value={o.slug}>{t(o.title)}</option>)}
        </select>
      )}
      <select value={form} onChange={(e) => { setForm(e.target.value); setAnswers({}); }} className="rounded-md border border-input bg-background px-3 py-2 text-sm" aria-label={t(tx("Form", "النموذج"))} disabled={!slug}>
        <option value="">{slug ? t(tx("Form you selected (optional)", "النموذج الذي اخترته (اختياري)")) : t(tx("Choose a service first to see its forms", "اختر الخدمة أولًا لتظهر نماذجها"))}</option>
        {formsList
          .filter((f): f is NonNullable<typeof f> => Boolean(f && f.code))
          .map((f) => (
            <option key={f.code} value={f.code}>
              {f.code} — {formOptionTitle(f.code, t(f.title))}
            </option>
          ))}
      </select>
      {slug && formsList.length === 0 && (
        <p className="text-xs text-muted-foreground">{t(tx("No forms are linked to this service — its documents are collected with you directly.", "لا توجد نماذج مرتبطة بهذه الخدمة — مستنداتها تُستلم معك مباشرة."))}</p>
      )}
      {allQs.length > 0 && (
        <div className="grid min-w-0 gap-3 rounded-xl bg-muted/60 p-3 sm:p-4">
          <p className="text-sm font-medium text-primary">{t(tx("Required questions — answer all of them", "أسئلة إلزامية — يجب الإجابة عليها جميعًا"))} <span className="text-xs text-muted-foreground">({allQs.length - missing}/{allQs.length})</span></p>
          <p className="text-xs text-muted-foreground">{t(tx("Enter text answers using English characters only. Arabic and other non-English characters will be removed.", "اكتب الإجابات النصية بالأحرف الإنجليزية فقط. ستتم إزالة الأحرف العربية وأي أحرف غير إنجليزية أخرى."))}</p>
          {allQs.map((q) => (
            <label key={q.key} className="grid min-w-0 gap-1 text-xs text-muted-foreground">
              <span>{t(q.q)} <span className="text-destructive">*</span></span>
              {q.type === "yesno" ? (
                <select required value={answers[q.key] ?? ""} onChange={(e) => set(q.key, e.target.value)} className={field}>
                  <option value="">—</option><option value="yes">{t(tx("Yes", "نعم"))}</option><option value="no">{t(tx("No", "لا"))}</option>
                </select>
              ) : q.type === "textarea" ? (
                <textarea required rows={3} maxLength={2000} value={answers[q.key] ?? ""} onChange={(e) => set(q.key, keepEnglishCharacters(e.target.value))} className={field} lang="en" dir="ltr" />
              ) : (
                <input required type={q.type === "date" ? "date" : "text"} maxLength={500} value={answers[q.key] ?? ""} onChange={(e) => set(q.key, q.type === "date" ? e.target.value : keepEnglishCharacters(e.target.value))} className={field} lang={q.type === "date" ? undefined : "en"} dir={q.type === "date" ? undefined : "ltr"} />
              )}
            </label>
          ))}
          <p className="text-xs text-muted-foreground">{allDocs.length} {t(tx("documents will be added to your checklist.", "مستندات ستُضاف إلى قائمتك."))}</p>
        </div>
      )}
      {slug === "crba" && (
        <Notice>
          {t(
            tx(
              "This service is limited to client-directed organization of selected records and transcription of a chronology exactly as provided. MIGRAFILE does not assess citizenship transmission, required residence, qualifying physical presence, or legal sufficiency of evidence. Follow the applicable official checklist and consult authorized counsel for legal questions.",
              "تقتصر هذه الخدمة على تنظيم السجلات التي يحددها العميل ونسخ التسلسل الزمني كما يقدمه حرفيًا. لا تقيّم MIGRAFILE انتقال الجنسية أو الإقامة المطلوبة أو التواجد الفعلي المؤهل أو الكفاية القانونية للأدلة. اتبع القائمة الرسمية المنطبقة واستشر محاميًا مخوّلًا للأسئلة القانونية.",
            ),
          )}
        </Notice>
      )}
      {slug === "nonimmigrant-visas" && (
        <Notice>
          {t(
            tx(
              "Complete a separate questionnaire for each applicant, including children. Start with the universal intake and add only the questions and documents relevant to the selected category. This intake is not a replacement for an official government application. Most visa applications are submitted to the U.S. Department of State through a U.S. embassy or consulate, using DS-160. Documents uploaded to the client portal are separate from documents submitted to the government; DS-160 generally does not accept a complete supporting-document package. Follow the selected embassy's submission instructions.",
              "أكمل استبيانًا منفصلًا لكل متقدم، بما في ذلك الأطفال. ابدأ بالاستبيان العام وأضف فقط الأسئلة والمستندات ذات الصلة بالفئة المختارة. هذا الاستبيان ليس بديلًا عن طلب حكومي رسمي. تُقدم معظم طلبات التأشيرات إلى وزارة الخارجية الأمريكية عبر السفارة أو القنصلية باستخدام نموذج DS-160. المستندات المرفوعة على بوابة العميل منفصلة عن المستندات المقدمة للحكومة؛ حيث لا يقبل نموذج DS-160 عمومًا حزمة المستندات الداعمة الكاملة. اتبع تعليمات التقديم الخاصة بالسفارة المختارة.",
            ),
          )}
        </Notice>
      )}
      <div className="grid gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm font-semibold text-primary">{t(declarationTitle)}</p>
        <ol className="grid list-decimal gap-1.5 ps-5 text-xs leading-relaxed text-foreground">
          {declarationClauses.map((c, i) => <li key={i}>{t(c)}</li>)}
        </ol>
        <label className="grid min-w-0 gap-1 text-xs text-muted-foreground">
          <span>{t(tx("Full name (as your electronic signature)", "الاسم بالكامل (كتوقيع إلكتروني)"))} <span className="text-destructive">*</span></span>
          <input required maxLength={150} value={signName} onChange={(e) => setSignName(keepEnglishCharacters(e.target.value))} placeholder={t(tx("Type your full name in English", "اكتب اسمك بالكامل باللغة الإنجليزية"))} className={field} lang="en" dir="ltr" />
          <span>{t(tx("Your electronic signature must use English characters only. Arabic and other non-English characters will be removed.", "يجب كتابة التوقيع الإلكتروني بالأحرف الإنجليزية فقط. ستتم إزالة الأحرف العربية وأي أحرف غير إنجليزية أخرى."))}</span>
        </label>
        <label className="flex gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} required />
          {t(tx("I have read this declaration and I sign it and agree to all of it.", "قرأت هذا الإقرار وأوقّع عليه وأوافق على كل ما جاء فيه."))}</label>
      </div>
      {prereqBlocked && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {fr?.code === NVC_CODE
            ? t(tx("The NVC stage can only start after the USCIS petition stage is completed and approved (with us or elsewhere). Open a USCIS file first.", "لا تبدأ مرحلة NVC إلا بعد اكتمال مرحلة الالتماس لدى USCIS والموافقة عليها (معنا أو خارجنا). افتح ملف USCIS أولًا."))
            : t(tx("The embassy stage can only start after the USCIS petition is approved and the NVC stage is complete (with us or elsewhere). Open a USCIS or NVC file first.", "لا تبدأ مرحلة السفارة إلا بعد الموافقة على الالتماس لدى USCIS واكتمال مرحلة NVC (معنا أو خارجنا). افتح ملف USCIS أو NVC أولًا."))}
        </p>
      )}
      {m.error && <p className="text-sm text-destructive">{(m.error as Error).message}</p>}
      <button disabled={m.isPending || !confirm || signName.trim().length < 3 || missing > 0 || prereqBlocked} className="justify-self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{t(tx("Open file", "فتح الملف"))}</button>

    </form>
  );
}

type CaseRow = Database["public"]["Tables"]["cases"]["Row"];

function ClientReceiptPreview({ url }: { url: string }) {
  const { t } = useLang();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function fetchUrl() {
      if (!url) return;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        setSignedUrl(url);
        return;
      }
      try {
        const { data } = await supabase.storage.from("case-files").createSignedUrl(url, 3600);
        if (active) setSignedUrl(data?.signedUrl ?? null);
      } catch {}
    }
    fetchUrl();
    return () => {
      active = false;
    };
  }, [url]);

  if (!signedUrl) return null;

  const isPdf = url.toLowerCase().endsWith(".pdf") || signedUrl.toLowerCase().includes(".pdf");

  return (
    <div className="mt-3 flex items-center gap-3">
      {isPdf ? (
        <a
          href={signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-accent underline hover:text-primary transition"
        >
          <FileText className="h-4 w-4" />
          {t(tx("View Uploaded Receipt PDF", "عرض إيصال PDF المرفوع"))}
        </a>
      ) : (
        <a
          href={signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-accent underline hover:text-primary transition"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t(tx("View Uploaded Receipt Screenshot", "عرض لقطة شاشة الإيصال المرفوعة"))}
        </a>
      )}
    </div>
  );
}

function PaymentSection({
  c,
  userEmail,
  onUploaded,
}: {
  c: CaseRow;
  userEmail?: string | null;
  onUploaded: () => void;
}) {
  const { t } = useLang();
  const [copied, setCopied] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  const paymentOptions = [
    {
      id: "apple_pay",
      name: "Apple Pay",
      value: "+1 (267) 467-7785",
      rawCopy: "2674677785",
      recipientName: "ABANOUP KALAD",
      description: tx("Direct transfer via Apple Cash / Messages", "تحويل مباشر عبر Apple Cash أو الرسائل"),
    },
    {
      id: "zelle",
      name: "Zelle",
      value: "267-467-7785",
      rawCopy: "2674677785",
      recipientName: "ABANOUP KALAD",
      qrImage: "/zelle-qr.jpg",
      description: tx("Recipient name: ABANOUP KALAD (Mobile / QR Code)", "اسم المستلم: ABANOUP KALAD (رقم الهاتف أو رمز QR)"),
    },
  ];

  const handleUploadReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const ext = file.name.split(".").pop() || "png";
      const path = `${c.id}/receipt-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("case-files").upload(path, file);
      if (upErr) throw upErr;

      const { error: updateErr } = await supabase
        .from("cases")
        .update({
          payment_receipt_url: path,
          stage: "payment_verification",
          updated_at: new Date().toISOString(),
        })
        .eq("id", c.id);

      if (updateErr) throw updateErr;

      notifyStaffOfPaymentUpload({
        caseId: c.id,
        reference: c.reference,
        clientName: (c.declaration as any)?.name || "Client",
        clientEmail: userEmail,
        actorId: c.client_id,
        amount: c.service_fee,
        filePath: path,
      });

      onUploaded();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="rounded-2xl border-2 border-accent/40 bg-card p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-1 h-6 w-6 shrink-0 text-accent" />
        <div>
          <h3 className="text-lg font-bold text-primary">
            {t(tx("Case Accepted — Service Fee Payment", "تم قبول الملف — سداد رسوم الخدمة"))}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-foreground">
            {t(
              tx(
                `Good news! Your case has been accepted. Please pay the service fee of $${c.service_fee ?? "0"} to proceed.`,
                `أخبار سارة! تم قبول ملفك. يرجى سداد رسوم الخدمة وقدرها $${c.service_fee ?? "0"} للمتابعة.`
              )
            )}
          </p>
        </div>
      </div>

      {/* Payment Methods UI */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t(tx("Payment Methods", "طرق السداد المتاحة"))}
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {paymentOptions.map((opt) => (
            <div
              key={opt.id}
              className="flex flex-col justify-between rounded-xl border bg-muted/40 p-4 transition hover:border-accent/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    {opt.name}
                  </span>
                  {opt.qrImage && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                      <QrCode className="h-3.5 w-3.5" />
                      {t(tx("QR Code", "رمز QR"))}
                    </span>
                  )}
                </div>

                <p className="mt-2 font-mono text-sm font-bold break-all text-foreground" dir="ltr">
                  {opt.value}
                </p>

                {opt.recipientName && (
                  <p className="mt-0.5 text-xs font-semibold text-foreground">
                    <span className="text-muted-foreground font-normal">{t(tx("Name:", "الاسم:"))} </span>
                    {opt.recipientName}
                  </p>
                )}

                <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                  {t(opt.description)}
                </p>

                {opt.qrImage && (
                  <div className="mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="group relative flex w-full flex-col items-center justify-center rounded-lg border border-border/80 bg-background p-2 shadow-2xs hover:border-accent hover:bg-accent/5 transition cursor-pointer"
                        >
                          <img
                            src={opt.qrImage}
                            alt="Zelle QR Code"
                            className="h-28 w-28 object-contain rounded-md transition group-hover:scale-105"
                          />
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                            <QrCode className="h-3 w-3" />
                            {t(tx("Click to expand QR Code", "اضغط لتكبير رمز الـ QR"))}
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm p-6 text-center">
                        <DialogHeader>
                          <DialogTitle className="text-center font-bold text-lg text-primary">
                            {t(tx("Scan to Pay with Zelle®", "امسح للدفع عبر Zelle®"))}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-3 flex flex-col items-center">
                          <div className="rounded-xl border bg-white p-3 shadow-xs">
                            <img
                              src={opt.qrImage}
                              alt="Zelle QR Code"
                              className="max-h-[340px] w-auto object-contain rounded-lg"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <p className="text-sm font-bold text-foreground">ABANOUP KALAD</p>
                            <p className="font-mono text-xs text-muted-foreground" dir="ltr">267-467-7785</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(opt.rawCopy || opt.value, opt.id)}
                className="mt-4 flex items-center justify-center gap-1.5 rounded-md border border-input bg-background py-1.5 text-xs font-semibold hover:bg-muted transition cursor-pointer"
              >
                {copied === opt.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent" />
                    <span className="text-accent">{t(tx("Copied!", "تم النسخ!"))}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{t(tx("Copy", "نسخ"))}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Upload UI */}
      <form onSubmit={handleUploadReceipt} className="mt-7 rounded-xl border border-dashed border-accent/40 bg-accent/5 p-5">
        <div className="flex items-start gap-3">
          <UploadCloud className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-primary">
              {t(tx("Upload Payment Receipt", "رفع إيصال السداد"))}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {t(
                tx(
                  "After completing the transfer, please upload a screenshot of your receipt for verification.",
                  "بعد إتمام التحويل، يرجى رفع لقطة شاشة لإيصالك للتحقق."
                )
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer rounded-md border border-input bg-background px-4 py-2 text-xs font-semibold shadow-sm hover:bg-muted transition">
                <span>{file ? file.name : t(tx("Select Receipt Screenshot (Image / PDF)", "اختر لقطة شاشة الإيصال (صورة أو PDF)"))}</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  required
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFile(f);
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={!file || uploading}
                className="rounded-md bg-accent px-5 py-2 text-xs font-bold text-accent-foreground shadow hover:bg-primary hover:text-primary-foreground disabled:opacity-50 transition"
              >
                {uploading ? t(tx("Uploading...", "جاري الرفع...")) : t(tx("Upload Receipt for Verification", "رفع الإيصال للتحقق"))}
              </button>
            </div>

            {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
          </div>
        </div>
      </form>
    </section>
  );
}

function CaseView({
  c,
  userEmail,
  profileName,
}: {
  c: CaseRow;
  userEmail?: string | null;
  profileName?: string | null;
}) {
  const { t, lang, locale } = useLang();
  const qc = useQueryClient();
  const [copiedRef, setCopiedRef] = useState(false);
  const effectiveStage = c.stage === "translation" || c.stage === "assembly" ? "complete" : c.stage;
  const activeMilestoneIndex = CLIENT_MILESTONES.findIndex((m) => m.stages.includes(effectiveStage));
  const signalBarClass = c.signal === "red" ? "bg-destructive" : c.signal === "yellow" ? "bg-status-yellow" : "bg-accent";
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

  const applicantName = (c.declaration as any)?.name || profileName || userEmail || "Client";
  const unreadNotices = notices.data?.filter((n) => !n.read_at) ?? [];

  const handleMarkNoticeRead = async (noticeId: string) => {
    await markNoticeAsRead(noticeId);
    qc.invalidateQueries({ queryKey: ["notices", c.id] });
  };

  const handleMarkAllNoticesRead = async () => {
    await markAllCaseNoticesAsRead(c.id);
    qc.invalidateQueries({ queryKey: ["notices", c.id] });
  };

  useEffect(() => {
    const channel = supabase
      .channel(`client-case-${c.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "case_notices", filter: `case_id=eq.${c.id}` },
        () => {
          qc.invalidateQueries({ queryKey: ["notices", c.id] });
          qc.invalidateQueries({ queryKey: ["cases"] });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "cases", filter: `id=eq.${c.id}` },
        () => {
          qc.invalidateQueries({ queryKey: ["cases"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [c.id, qc]);

  const svc = c.service_slug ? services.find((s) => s.slug === c.service_slug) : undefined;
  const fr = c.form_code ? getFormRequirement(c.form_code) : undefined;
  const displayTitle = svc ? t(svc.title) : (fr ? t(fr.title) : t(c.service_title));

  async function upload(docId: string, file: File) {
    setErr(null); setBusyId(docId);
    try {
      const path = `${c.id}/${docId}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const up = await supabase.storage.from("case-files").upload(path, file);
      if (up.error) throw up.error;
      const targetDoc = docs.data?.find((d) => d.id === docId);
      const isReplacement = Boolean(targetDoc?.file_path);
      const { error } = await supabase.from("case_documents").update({ file_path: path, file_name: file.name, status: "uploaded", uploaded_at: new Date().toISOString() }).eq("id", docId);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["docs", c.id] });
      notifyStaffOfDocUpload({
        caseId: c.id,
        reference: c.reference,
        clientName: applicantName,
        clientEmail: userEmail,
        actorId: c.client_id,
        docLabel: targetDoc ? targetDoc.label : "Document",
        fileName: file.name,
        isReplacement,
      });
    } catch (e) { setErr((e as Error).message); } finally { setBusyId(null); }
  }
  async function view(path: string) {
    const { data } = await supabase.storage.from("case-files").createSignedUrl(path, 60);
    if (data) window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="mf-panel-enter grid gap-8">
      {/* 6. Persistent Client UI Banner (Global Client Portal Rule) */}
      {c.stage !== "rejected" && (
        <aside aria-label={t(tx("Help & Support", "المساعدة والدعم"))} className="rounded-xl border border-accent/40 bg-accent/10 p-4 sm:p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="text-sm leading-relaxed text-foreground">
              {lang === "ar" ? (
                <>
                  هل تحتاج إلى مساعدة أو لديك أسئلة؟ يمكنك{" "}
                  <Link
                    to="/book-interview"
                    className="font-semibold text-accent underline underline-offset-4 hover:text-primary transition"
                  >
                    حجز مكالمة خاصة لتنظيم المستندات
                  </Link>{" "}
                  في أي وقت. إذا كانت هناك أي تحديثات مطلوبة لملفك، فسيتواصل معك فريق المتخصصين لدينا مباشرة.
                </>
              ) : (
                <>
                  Need help or have questions? You can{" "}
                  <Link
                    to="/book-interview"
                    className="font-semibold text-accent underline underline-offset-4 hover:text-primary transition"
                  >
                    Schedule a Private Documentation Call
                  </Link>{" "}
                  at any time. If there are any updates required for your file, our specialist team will contact you directly.
                </>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Case Header & Progress Tracker with Clear Applicant & Reference Info */}
      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4">
          <div className="grid gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                {t(tx("Case File", "ملف توثيقي"))}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString(locale)}</span>
            </div>
            <h2 className="text-2xl font-bold text-primary">
              {displayTitle}{c.form_code ? ` · ${c.form_code}` : ""}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <User className="h-3.5 w-3.5 text-accent" />
                <span>{t(tx("Applicant:", "مقدم الطلب:"))}</span>
                <span className="font-bold text-primary">{applicantName}</span>
              </span>
              {userEmail && (
                <span className="text-xs text-muted-foreground">
                  · {userEmail}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground">{t(tx("Case Reference Number", "رقم الملف / المرجع"))}</span>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/60 px-3 py-1.5 font-mono text-sm font-bold text-foreground">
              <span>{c.reference}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(c.reference);
                  setCopiedRef(true);
                  setTimeout(() => setCopiedRef(false), 2000);
                }}
                className="text-muted-foreground hover:text-accent transition cursor-pointer"
                title={t(tx("Copy case number", "نسخ رقم الملف"))}
              >
                {copiedRef ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {CLIENT_MILESTONES.map((s, i) => {
            const isCompletedOrCurrent = effectiveStage === "complete" || (activeMilestoneIndex >= 0 && i <= activeMilestoneIndex);
            const isCurrent = i === activeMilestoneIndex && effectiveStage !== "complete";
            return (
              <li key={s.key} className="grid gap-2">
                <div
                  className={`mf-stage-bar h-1.5 rounded-full ${
                    c.stage === "rejected"
                      ? "bg-destructive/30"
                      : isCompletedOrCurrent
                      ? signalBarClass
                      : "bg-muted"
                  }`}
                  style={{ "--mf-index": i } as CSSProperties}
                />
                <span
                  className={`text-xs ${
                    isCurrent ? "font-bold text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t(s.label)}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Unread Case Notices Banner */}
      {unreadNotices.length > 0 && (
        <aside aria-label={t(tx("Important Updates", "تحديثات هامة"))} className="rounded-xl border-2 border-accent/60 bg-accent/10 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-accent/20 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent animate-bounce" />
              <h3 className="text-sm font-bold text-primary">
                {t(tx(`New Updates on your File (${unreadNotices.length})`, `تحديثات جديدة على ملفك (${unreadNotices.length})`))}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleMarkAllNoticesRead}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground hover:bg-primary transition cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              {t(tx("Mark all as read", "تحديد الكل كمقروء"))}
            </button>
          </div>
          <div className="mt-3 grid gap-2.5">
            {unreadNotices.map((n) => (
              <div key={n.id} className="flex flex-wrap items-start justify-between gap-2 rounded-lg bg-background/90 p-3 text-xs shadow-2xs">
                <div className="flex-1">
                  <p className="font-bold text-primary">{n.title}</p>
                  <p className="mt-0.5 text-foreground leading-relaxed whitespace-pre-line">{n.body}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleDateString(locale)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleMarkNoticeRead(n.id)}
                  className="rounded border border-input px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                >
                  {t(tx("Mark as read", "تحديد كمقروء"))}
                </button>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* 2. Client Flow: Phase 1 (Pending Admin Review UI) */}
      {c.stage === "pending_admin_review" && (
        <section className="rounded-xl border border-gold/40 bg-gold/10 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {t(tx("File Under Review", "الملف قيد المراجعة"))}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {t(
                  tx(
                    "Your file is currently under review by our specialists. Once reviewed, we will determine the service fee and notify you of the next steps.",
                    "ملفك قيد المراجعة حاليًا من قبل متخصصينا. بعد المراجعة، سنحدد رسوم الخدمة ونبلغك بالخطوات التالية."
                  )
                )}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. Option A: Rejected UI */}
      {c.stage === "rejected" && (
        <section className="rounded-xl border border-destructive/40 bg-destructive/10 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <h3 className="text-sm font-bold text-destructive">
                {t(tx("Case Status: Rejected", "حالة الملف: مرفوض"))}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {lang === "ar" ? (
                  <>
                    للأسف، لا يمكننا قبول ملفك في هذا الوقت. لمزيد من الاستفسارات، يرجى{" "}
                    <Link to="/book-interview" className="font-semibold text-primary underline hover:text-accent">
                      حجز مكالمة خاصة لتنظيم المستندات
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Unfortunately, we cannot accept your case at this time. For further inquiries, please{" "}
                    <Link to="/book-interview" className="font-semibold text-primary underline hover:text-accent">
                      Schedule a Private Documentation Call
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Client Flow: Phase 2 (Pending Payment UI) */}
      {c.stage === "pending_payment" && (
        <PaymentSection
          c={c}
          userEmail={userEmail}
          onUploaded={() => qc.invalidateQueries({ queryKey: ["cases"] })}
        />
      )}

      {/* 5. Phase 2 (Payment Verification in Progress UI) */}
      {c.stage === "payment_verification" && (
        <section className="rounded-xl border border-accent/40 bg-accent/5 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-primary">
                {t(tx("Payment Verification in Progress", "التحقق من السداد قيد التنفيذ"))}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  tx(
                    "Your payment receipt has been submitted and is currently being verified by our team. Once confirmed, your case processing will begin immediately.",
                    "تم تقديم إيصال السداد وهو قيد التحقق حاليًا من قبل فريقنا. بمجرد التأكيد، ستبدأ معالجة ملفك فورًا."
                  )
                )}
              </p>
              {c.payment_receipt_url && <ClientReceiptPreview url={c.payment_receipt_url} />}
            </div>
          </div>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section>
          <h3 className="text-xl text-primary">{t(tx("Document checklist", "قائمة المستندات"))}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{t(tx("PDF or image, up to 15 MB.", "PDF أو صورة، حتى 15 ميجابايت."))}</p>
          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
          <ul className="mf-stagger mt-4 divide-y rounded-lg border bg-card">
            {docs.data?.map((d, index) => {
              const st = DOC_STATUS[d.status] ?? ({ l: tx("Requested", "مطلوب"), c: "bg-muted text-muted-foreground" });
              const canUpload = d.status === "requested" || d.status === "needs_attention" || d.status === "uploaded";
              return (
                <li key={d.id} className="mf-stagger-item grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]" style={{ "--mf-index": index } as CSSProperties}>
                  <div className="col-span-2 min-w-0 sm:col-span-1">
                    <p className="text-sm font-medium">{t(getDocLabel(d.label))}</p>
                    {d.file_name && d.file_path && <button onClick={() => d.file_path && view(d.file_path)} className="max-w-full break-all text-start text-xs text-accent underline">{d.file_name}</button>}
                    {d.staff_note && <p className="mt-1 text-xs text-destructive">{d.staff_note}</p>}
                  </div>
                  <span className={`rounded px-2 py-0.5 text-[11px] ${st.c}`}>{t(st.l)}</span>
                  {canUpload && (
                    <label className="justify-self-end whitespace-nowrap cursor-pointer rounded-md border px-3 py-1.5 text-xs hover:bg-muted">
                      {busyId === d.id ? "…" : t(d.file_path ? tx("Replace", "استبدال") : tx("Upload", "رفع"))}
                      <input type="file" accept="application/pdf,image/*" className="hidden" aria-label={t(tx("Upload document", "رفع مستند"))} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(d.id, f); e.target.value = ""; }} />
                    </label>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl text-primary">{t(tx("Notices", "التنبيهات"))}</h3>
            {unreadNotices.length > 0 && (
              <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent">
                {unreadNotices.length} {t(tx("new", "جديد"))}
              </span>
            )}
          </div>
          <div className="mf-stagger mt-4 grid gap-3">
            {notices.data?.length ? notices.data.map((n, index) => {
              const isUnread = !n.read_at;
              const title = t(localizedNoticeText(n.title, lang, true));
              const body = t(localizedNoticeText(n.body, lang));
              return (
                <div key={n.id} className={`mf-stagger-item rounded-lg border p-4 transition ${isUnread ? "border-accent bg-accent/5 shadow-xs" : "bg-card hover:border-accent/40"}`} style={{ "--mf-index": index } as CSSProperties}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-primary">{title}</p>
                    {isUnread && (
                      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                        {t(tx("New", "جديد"))}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs text-foreground/90 leading-relaxed whitespace-pre-line">{body}</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/40 pt-2">
                    <span>{new Date(n.created_at).toLocaleDateString(locale)}</span>
                    {isUnread && (
                      <button
                        type="button"
                        onClick={() => handleMarkNoticeRead(n.id)}
                        className="text-accent underline font-semibold hover:text-primary transition"
                      >
                        {t(tx("Mark as read", "تحديد كمقروء"))}
                      </button>
                    )}
                  </div>
                </div>
              );
            }) : <Notice>{t(tx("No notices yet. Our team will post updates here.", "لا توجد تنبيهات بعد. سينشر فريقنا التحديثات هنا."))}</Notice>}
          </div>
        </section>
      </div>
    </div>
  );
}
