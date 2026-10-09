import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { declarationClauses, declarationTitle, DECLARATION_VERSION, type Declaration } from "@/lib/declaration";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type CSSProperties } from "react";
import { supabase } from "@/integrations/supabase/client";
import { tx, useLang, type T } from "@/lib/i18n";
import { Container, Notice, PageHeader } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { services, serviceForms } from "@/lib/content";
import { getFormRequirement } from "@/lib/form-requirements";
import { EMBASSY_CODE, EMBASSY_PREREQS } from "@/lib/embassy-workflow";
import { NVC_CODE, NVC_PREREQS } from "@/lib/nvc-workflow";
import { DS160_CODE } from "@/lib/niv-workflow";

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

export function getDocLabel(label: string): T {
  const norm = label.toLowerCase().trim();
  if (DOC_TRANSLATIONS[norm]) return DOC_TRANSLATIONS[norm];
  for (const item of Object.values(DOC_TRANSLATIONS)) {
    if (item.ar.trim() === label.trim() || item.en.trim().toLowerCase() === norm) return item;
  }
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
              {t(tx("Book Video Interview", "حجز مقابلة فيديو كول"))}
            </Link>
            {isStaff.data && <Link to="/staff" className="rounded-md bg-accent px-3 py-1.5 text-xs text-accent-foreground">{t(tx("Staff workspace", "مساحة الفريق"))}</Link>}
            <button onClick={signOut} className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted">{t(tx("Sign out", "تسجيل الخروج"))}</button>
          </div>
        </div>
        <NewCase userId={user.id} presetSlug={presetService} hasCases={!!cases.data?.length} onCreated={(id) => setSelected(id)} />
        {current && <CaseView key={current.id} c={current} />}
      </Container>
    </>
  );
}

const EMBASSY_OPTION = "__embassy";
const serviceOptions: { slug: string; title: T }[] = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
];

function NewCase({ userId, presetSlug, hasCases, onCreated }: { userId: string; presetSlug?: string | undefined; hasCases: boolean; onCreated: (id: string) => void }) {
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
      if (!confirm || signName.trim().length < 3) throw new Error(t(tx("You must sign the declaration", "يجب التوقيع على الإقرار")));
      const declaration: Declaration = { version: DECLARATION_VERSION, name: signName.trim(), lang, clauses: declarationClauses.map((c) => c[lang]) };
      const { data, error } = await supabase.from("cases").insert({
        client_id: userId, service_title: svc ? svc.title[lang] : (fr ? fr.title[lang] : (lang === "ar" ? "ملف توثيق" : "Documentation file")), service_slug: svc ? slug : null, form_code: fr?.code ?? null, intake_answers: answers,
        declaration,
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
    onSuccess: (id) => { qc.invalidateQueries({ queryKey: ["cases"] }); onCreated(id); setOpen(false); setForm(""); setAnswers({}); setConfirm(false); setSignName(""); },
  });
  if (!open) return <button onClick={() => setOpen(true)} className="mb-8 text-sm text-accent underline">{t(tx("+ Open a new documentation file", "+ فتح ملف توثيق جديد"))}</button>;
  const field = "w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mf-expand-in mb-10 grid w-full min-w-0 gap-3 rounded-2xl border bg-card p-4 sm:max-w-2xl sm:p-6">
      <h2 className="text-xl text-primary">{t(tx("Open a documentation file", "فتح ملف توثيق"))}</h2>
      {preset && svc && (
        <p className="rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          {t(tx("Service", "الخدمة"))}: <span className="font-medium text-foreground">{t(svc.title)}</span>
        </p>
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
          aria-label="Service"
        >
          <option value="">{t(tx("Choose the service", "اختر الخدمة"))}</option>
          {serviceOptions.map((o) => <option key={o.slug} value={o.slug}>{t(o.title)}</option>)}
        </select>
      )}
      <select value={form} onChange={(e) => { setForm(e.target.value); setAnswers({}); }} className="rounded-md border border-input bg-background px-3 py-2 text-sm" aria-label="Form" disabled={!slug}>
        <option value="">{slug ? t(tx("Form you selected (optional)", "النموذج الذي اخترته (اختياري)")) : t(tx("Choose a service first to see its forms", "اختر الخدمة أولًا لتظهر نماذجها"))}</option>
        {formsList.filter((f): f is NonNullable<typeof f> => Boolean(f && f.code)).map((f) => <option key={f.code} value={f.code}>{f.code} — {t(f.title)}</option>)}
      </select>
      {slug && formsList.length === 0 && (
        <p className="text-xs text-muted-foreground">{t(tx("No forms are linked to this service — its documents are collected with you directly.", "لا توجد نماذج مرتبطة بهذه الخدمة — مستنداتها تُستلم معك مباشرة."))}</p>
      )}
      {allQs.length > 0 && (
        <div className="grid min-w-0 gap-3 rounded-xl bg-muted/60 p-3 sm:p-4">
          <p className="text-sm font-medium text-primary">{t(tx("Required questions — answer all of them", "أسئلة إلزامية — يجب الإجابة عليها جميعًا"))} <span className="text-xs text-muted-foreground">({allQs.length - missing}/{allQs.length})</span></p>
          {allQs.map((q) => (
            <label key={q.key} className="grid min-w-0 gap-1 text-xs text-muted-foreground">
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
          <p className="text-xs text-muted-foreground">{allDocs.length} {t(tx("documents will be added to your checklist.", "مستندات ستُضاف إلى قائمتك."))}</p>
        </div>
      )}
      {slug === "crba" && (
        <Notice>{t(tx("These are separate applications, not a package requiring every form. FS-240 is the issued certificate, not an application. Complete a separate file for each child and give each parent's details separately. Scans do not replace originals or certified copies at the interview. Follow the embassy's checklist and signature instructions: do not pre-sign DS-2029 or DS-11 when a witnessed signature is required; DS-3053 requires notarization and consent is generally submitted within 90 days. A U.S. address or tax return alone does not prove physical presence. Related-form intake uses the shared questionnaire you provided, not a substitute for official form instructions.", "هذه طلبات منفصلة وليست حزمة تتطلب كل النماذج. FS-240 هي الشهادة الصادرة وليست طلبًا. افتح ملفًا منفصلًا لكل طفل وأدخل بيانات كل والد على حدة. النسخ المرفوعة لا تغني عن الأصول أو النسخ المعتمدة بالمقابلة. اتبع قائمة السفارة وتعليمات التوقيع: لا توقّع DS-2029 أو DS-11 مسبقًا عندما يلزم شاهد رسمي؛ DS-3053 يتطلب توثيقًا وعادة تُقدم الموافقة خلال 90 يومًا. العنوان الأمريكي أو الإقرار الضريبي وحده لا يثبت التواجد الفعلي. أسئلة النماذج المرتبطة مأخوذة من الاستبيان المشترك وليست بديلًا عن تعليمات النماذج الرسمية."))}</Notice>
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
          <input required maxLength={150} value={signName} onChange={(e) => setSignName(e.target.value)} className={field} />
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

type CaseRow = { id: string; reference: string; service_title: string; service_slug?: string | null; form_code: string | null; stage: string; created_at: string };

function CaseView({ c }: { c: CaseRow }) {
  const { t, locale } = useLang();
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

  const svc = c.service_slug ? services.find((s) => s.slug === c.service_slug) : undefined;
  const fr = c.form_code ? getFormRequirement(c.form_code) : undefined;
  const displayTitle = svc ? t(svc.title) : (fr ? t(fr.title) : t(c.service_title));

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
      <section className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
        <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
          <h2 className="text-2xl text-primary">{displayTitle}{c.form_code ? ` · ${c.form_code}` : ""}</h2>
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
                <p className="mt-2 text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleDateString(locale)}</p>
              </div>
            )) : <Notice>{t(tx("No notices yet. Our team will post updates here.", "لا توجد تنبيهات بعد. سينشر فريقنا التحديثات هنا."))}</Notice>}
          </div>
        </section>
      </div>
    </div>
  );
}
