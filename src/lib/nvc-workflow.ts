// NVC / Consular Processing workflow (Department of State, via CEAC) — supplied by the MIGRAFILE owner. Not legal advice.
// A client may start here directly if they completed the USCIS petition stage on their own.
import type { FormQuestion, FormRequirement } from "./form-requirements";

const q = (id: string, en: string, ar: string, type: FormQuestion["type"] = "text"): FormQuestion => ({ id, q: { en, ar }, type });
const d = (en: string, ar: string) => ({ en, ar });
const NA_EN = " (write \"None\" if not applicable)";
const NA_AR = " (اكتب \"لا يوجد\" إن لم ينطبق)";

export const NVC_CODE = "NVC";
export const NVC_PREREQS = ["uscis_done"];

export const nvcWorkflow: FormRequirement = {
  code: NVC_CODE,
  title: { en: "NVC / Consular Processing workflow", ar: "مرحلة NVC / الإجراءات القنصلية" },
  questions: [
    // 1. Initial screening
    q("uscis_done", "Has the USCIS petition stage been completed and approved (with MIGRAFILE or elsewhere)?", "هل اكتملت مرحلة الالتماس لدى USCIS وتمت الموافقة عليها (معنا أو خارجنا)؟", "yesno"),
    q("petition_category", "Which petition was approved (e.g. I-130) and what is the visa category?", "ما الالتماس الذي تمت الموافقة عليه (مثل I-130) وما فئة التأشيرة؟"),
    q("petition_stage_done", "Did you complete the USCIS petition stage on your own (without MIGRAFILE)?", "هل أنهيت مرحلة الالتماس لدى USCIS بنفسك (بدون MIGRAFILE)؟", "yesno"),
    q("welcome_letter", "Have you received the NVC Welcome Letter?", "هل استلمت خطاب الترحيب من NVC؟", "yesno"),
    q("case_number", "NVC case number (do not write the Invoice ID here — upload the letter instead)" + NA_EN, "رقم قضية NVC (لا تكتب رقم الفاتورة هنا — ارفع الخطاب بدلًا من ذلك)" + NA_AR),
    q("embassy", "Which U.S. embassy or consulate will interview you?", "أي سفارة أو قنصلية أمريكية ستُجري المقابلة؟"),
    q("people", "Names of the petitioner, the principal applicant, and each accompanying applicant (including children)", "أسماء الكفيل والمتقدم الرئيسي وكل متقدم مرافق (بما فيهم الأطفال)", "textarea"),
    q("priority_date", "Priority date (from the I-797 approval notice)", "تاريخ الأولوية (من إشعار الموافقة I-797)", "date"),
    q("ceac_status", "Current CEAC status as it appears to you", "حالة CEAC الحالية كما تظهر لك"),
    q("fees_paid", "Have the NVC fees been paid?", "هل تم دفع رسوم NVC؟", "yesno"),
    q("ds260_submitted", "Has the DS-260 been submitted for every applicant?", "هل تم تقديم DS-260 لكل متقدم؟", "yesno"),
    q("nvc_requests", "Has NVC requested corrections or additional documents? Paste the exact message" + NA_EN, "هل طلبت NVC تصحيحات أو مستندات إضافية؟ انسخ الرسالة كما هي" + NA_AR, "textarea"),
    q("special_category", "Is this a fiancé(e), adoption, or other special category case?", "هل القضية خطيب/خطيبة أو تبنٍّ أو فئة خاصة أخرى؟", "yesno"),
    // 2. DS-260 preparation (principal applicant; staff collect a separate record for each applicant)
    q("names", "Full name exactly as in passport, plus any other names used", "الاسم الكامل كما في الجواز وأي أسماء أخرى استُخدمت", "textarea"),
    q("birth", "Date, city and country of birth", "تاريخ ومدينة ودولة الميلاد"),
    q("nationality_passport", "Nationality, passport number, and issue/expiry dates", "الجنسية ورقم الجواز وتاريخ الإصدار والانتهاء"),
    q("addresses", "Current and previous addresses (with dates), phone and email", "العناوين الحالية والسابقة (بالتواريخ) والهاتف والبريد الإلكتروني", "textarea"),
    q("us_address", "Intended U.S. address", "العنوان المقصود في أمريكا"),
    q("family", "Parents, current spouse, previous marriages, and all children (names and dates of birth)", "الوالدان والزوج/الزوجة الحالي والزيجات السابقة وجميع الأبناء (الأسماء وتواريخ الميلاد)", "textarea"),
    q("work_education", "Employment and education history", "تاريخ العمل والتعليم", "textarea"),
    q("military_orgs", "Military service and organization memberships" + NA_EN, "الخدمة العسكرية وعضوية المنظمات" + NA_AR, "textarea"),
    q("us_history", "Previous U.S. travel, visas, immigration proceedings, refusals or removals" + NA_EN, "السفر السابق لأمريكا والتأشيرات والإجراءات والرفض أو الترحيل" + NA_AR, "textarea"),
    q("eligibility", "Any medical, criminal, security or other DS-260 eligibility issues? (our team will review scope)", "هل توجد أي مسائل طبية أو جنائية أو أمنية أو أهلية أخرى في DS-260؟ (سيراجع الفريق النطاق)", "yesno"),
    q("social_media", "Social-media identifiers used in the last 5 years" + NA_EN, "معرّفات وسائل التواصل خلال آخر 5 سنوات" + NA_AR, "textarea"),
    // 3. Police-certificate screening
    q("countries_lived", "Every country you lived in, with dates and your age at the time", "كل دولة عشت فيها مع التواريخ وعمرك وقتها", "textarea"),
    q("arrests", "Have you ever been arrested, charged or convicted anywhere (even if pardoned)?", "هل سبق القبض عليك أو اتهامك أو إدانتك في أي مكان (حتى لو صدر عفو)؟", "yesno"),
    q("served_military", "Have you served in any military?", "هل خدمت في أي جيش؟", "yesno"),
    // 4. Sponsor
    q("sponsor_status", "Sponsor's status (U.S. citizen / green card) and U.S. domicile", "وضع الكفيل (مواطن / جرين كارد) ومحل إقامته في أمريكا"),
    q("household_size", "Sponsor's household size", "عدد أفراد أسرة الكفيل"),
    q("income_tax", "Sponsor's annual income and whether they filed U.S. taxes for the latest year", "دخل الكفيل السنوي وهل قدّم الضرائب الأمريكية لآخر سنة"),
    q("joint_sponsor", "Is there a joint sponsor, household-member contribution (I-864A) or assets being relied on?", "هل يوجد كفيل مشارك أو مساهمة من فرد بالأسرة (I-864A) أو أصول سيُعتمد عليها؟", "yesno"),
  ],
  docs: [
    d("NVC Welcome Letter (case number + Invoice ID)", "خطاب الترحيب من NVC (رقم القضية ورقم الفاتورة)"),
    d("I-797 petition approval notice", "إشعار الموافقة على الالتماس I-797"),
    d("Valid passport biographic page — each applicant", "صفحة بيانات جواز سفر ساري — لكل متقدم"),
    d("Birth certificate — each applicant", "شهادة الميلاد — لكل متقدم"),
    d("Marriage certificates (current and previous, as applicable)", "وثائق الزواج (الحالي والسابق حسب الحالة)"),
    d("Final divorce decrees, annulments or death certificates for previous marriages", "أحكام الطلاق النهائية أو البطلان أو شهادات الوفاة للزيجات السابقة"),
    d("Police certificates (per country-residence rules; not U.S.)", "شهادات حسن السير والسلوك (حسب قواعد الإقامة؛ ليست الأمريكية)"),
    d("Certified court and prison records (if any convictions)", "سجلات المحاكم والسجون المعتمدة (عند وجود أحكام)"),
    d("Military records (if served)", "السجلات العسكرية (لمن خدم)"),
    d("Adoption and custody records (if applicable)", "مستندات التبني والحضانة (إن وجدت)"),
    d("Certified translations combined with each non-English document", "ترجمات معتمدة مدمجة مع كل مستند غير إنجليزي"),
    d("Signed I-864 / I-864EZ / I-864A, or evidence of exemption", "نموذج I-864 / I-864EZ / I-864A موقّع أو إثبات الإعفاء"),
    d("Sponsor's most recent IRS tax transcript (or permitted alternative)", "أحدث كشف ضريبي IRS للكفيل (أو البديل المسموح)"),
    d("Sponsor W-2s and schedules", "نماذج W-2 والجداول الخاصة بالكفيل"),
    d("Sponsor current income evidence", "إثبات دخل الكفيل الحالي"),
    d("Sponsor status and U.S. domicile evidence", "إثبات وضع الكفيل ومحل إقامته في أمريكا"),
    d("Asset evidence or joint sponsor documents (if relied upon)", "إثبات الأصول أو مستندات الكفيل المشارك (إن وُجد)"),
    d("DS-260 confirmation page — each applicant", "صفحة تأكيد DS-260 — لكل متقدم"),
    d("Passport-style photos", "صور شخصية بمقاس الجواز"),
  ],
};
