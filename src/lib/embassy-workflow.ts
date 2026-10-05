// U.S. Embassy / Consular Interview workflow — supplied by the MIGRAFILE owner. Not legal advice.
// A client may start here directly, but must confirm the USCIS petition and NVC stages are complete (even if done elsewhere).
import type { FormQuestion, FormRequirement } from "./form-requirements";

const q = (id: string, en: string, ar: string, type: FormQuestion["type"] = "text"): FormQuestion => ({ id, q: { en, ar }, type });
const d = (en: string, ar: string) => ({ en, ar });
const NA_EN = " (write \"None\" if not applicable)";
const NA_AR = " (اكتب \"لا يوجد\" إن لم ينطبق)";

export const EMBASSY_CODE = "EMBASSY";
/** Answers that must be "yes" before an Embassy-stage file can be opened. */
export const EMBASSY_PREREQS = ["uscis_done", "nvc_done"];

export const embassyWorkflow: FormRequirement = {
  code: EMBASSY_CODE,
  title: { en: "U.S. Embassy / Consular Interview stage", ar: "مرحلة السفارة / المقابلة القنصلية" },
  questions: [
    q("uscis_done", "Has the USCIS petition been approved (with MIGRAFILE or elsewhere)?", "هل تمت الموافقة على الالتماس لدى USCIS (معنا أو خارجنا)؟", "yesno"),
    q("nvc_done", "Has the NVC stage been completed (documents submitted / case sent to the embassy), with MIGRAFILE or elsewhere?", "هل اكتملت مرحلة NVC (تقديم المستندات / تحويل القضية للسفارة)، معنا أو خارجنا؟", "yesno"),
    q("category", "Visa category and approved petition", "فئة التأشيرة والالتماس الموافق عليه"),
    q("nvc_status", "NVC case number and current CEAC status", "رقم قضية NVC وحالة CEAC الحالية"),
    q("post", "Which embassy or consulate is handling the case?", "أي سفارة أو قنصلية تتولى القضية؟"),
    q("appointment", "Have you received an interview appointment?", "هل استلمت موعد المقابلة؟", "yesno"),
    q("appointment_date", "Interview date and time" + NA_EN, "تاريخ ووقت المقابلة" + NA_AR),
    q("applicants", "Who will attend or immigrate with you? (names, relationship, ages)", "من سيحضر أو يهاجر معك؟ (الأسماء وصلة القرابة والأعمار)", "textarea"),
    q("passports", "Is each passport valid? Has any passport changed since NVC?", "هل كل الجوازات سارية؟ هل تغيّر أي جواز منذ NVC؟", "textarea"),
    q("delivery_reg", "Have you registered for passport delivery or collection?", "هل سجّلت لخدمة توصيل أو استلام الجواز؟", "yesno"),
    q("medical", "Medical exam with an embassy-approved panel physician: scheduled or completed? (date)", "الكشف الطبي لدى طبيب معتمد من السفارة: محجوز أم تم؟ (التاريخ)"),
    q("originals", "Do you have the originals of every document submitted to NVC? List any missing", "هل لديك أصول كل المستندات المقدمة لـ NVC؟ اذكر أي ناقص", "textarea"),
    q("ds260_changes", "Has anything changed since DS-260 (marriage, divorce, children, address, job, arrests, immigration history)?" + NA_EN, "هل تغيّر أي شيء منذ DS-260 (زواج، طلاق، أطفال، عنوان، عمل، قضايا، تاريخ هجرة)؟" + NA_AR, "textarea"),
    q("sponsor_changes", "Have the sponsor's income, domicile or household changed?" + NA_EN, "هل تغيّر دخل الكفيل أو محل إقامته أو أسرته؟" + NA_AR, "textarea"),
    q("assistance", "Do you need an interpreter, accessibility help or an accompanying person?" + NA_EN, "هل تحتاج مترجمًا أو مساعدة لذوي الاحتياجات أو مرافقًا؟" + NA_AR),
    q("refusal", "Have you received a refusal (e.g. 221(g)) or an additional-document request? Paste the exact instructions" + NA_EN, "هل استلمت رفضًا (مثل 221(g)) أو طلب مستندات إضافية؟ انسخ التعليمات كما هي" + NA_AR, "textarea"),
  ],
  docs: [
    d("Interview appointment letter", "خطاب موعد المقابلة"),
    d("DS-260 confirmation page — each applicant", "صفحة تأكيد DS-260 — لكل متقدم"),
    d("Original valid passport — each applicant", "جواز السفر الأصلي الساري — لكل متقدم"),
    d("Visa photographs (post specifications)", "صور التأشيرة (حسب مواصفات السفارة)"),
    d("Original / certified civil documents submitted to NVC", "أصول / نسخ معتمدة من المستندات المدنية المقدمة لـ NVC"),
    d("Bilingual Arabic/English birth certificate (Egyptian applicants)", "شهادة ميلاد ثنائية اللغة عربي/إنجليزي (للمتقدمين المصريين)"),
    d("Photocopies and required translations", "صور المستندات والترجمات المطلوبة"),
    d("Medical exam (sealed envelope — do not open — or electronic)", "نتيجة الكشف الطبي (مظروف مغلق — لا يُفتح — أو إلكترونيًا)"),
    d("Passport-delivery registration confirmation", "تأكيد التسجيل في خدمة توصيل الجواز"),
    d("Affidavit of support, tax evidence and sponsor status (family cases)", "إقرار الإعالة والمستندات الضريبية ووضع الكفيل (قضايا العائلة)"),
    d("Relationship evidence (family cases)", "إثبات العلاقة (قضايا العائلة)"),
    d("Divorce / annulment / death records for previous marriages", "مستندات الطلاق / البطلان / الوفاة للزيجات السابقة"),
    d("Police certificates (and replacements if expired)", "شهادات حسن السير والسلوك (وبدائلها إن انتهت)"),
    d("Certified court and prison records (if any convictions)", "سجلات المحاكم والسجون المعتمدة (عند وجود أحكام)"),
    d("Military records (if served)", "السجلات العسكرية (لمن خدم)"),
    d("Adoption / stepchild custody and relationship records (if applicable)", "مستندات التبني / ابن الزوج والحضانة وإثبات العلاقة (إن وجدت)"),
  ],
};
