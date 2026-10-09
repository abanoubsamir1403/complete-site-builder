import { tx, type T } from "./i18n";

// DRAFT — compiled from general public guidance (USCIS, NVC/travel.state.gov, U.S. Embassy Cairo).
// Must be reviewed by the MIGRAFILE team before being treated as final. Not legal advice.
export type Question = { id: string; q: T; type?: "text" | "yesno" };
export type Requirement = { docs: T[]; questions: Question[] };

const yn = "yesno" as const;

export const requirements: Record<string, Requirement> = {
  family: {
    docs: [
      tx("Petitioner proof of U.S. citizenship or green card", "إثبات جنسية الكفيل الأمريكية أو الجرين كارد"),
      tx("Beneficiary passport (bio page)", "جواز سفر المستفيد (صفحة البيانات)"),
      tx("Birth certificates (petitioner and beneficiary)", "شهادات الميلاد (الكفيل والمستفيد)"),
      tx("Marriage certificate (if spouse)", "وثيقة الزواج (في حالة الزوج/الزوجة)"),
      tx("Divorce or death certificates for any prior marriages", "وثائق الطلاق أو الوفاة لأي زواج سابق"),
      tx("Evidence of the relationship (photos, correspondence)", "إثبات العلاقة (صور، مراسلات)"),
      tx("Passport-style photos", "صور شخصية بمقاس الجواز"),
    ],
    questions: [
      { id: "relationship", q: tx("What is your relationship to the U.S. petitioner?", "ما صلة القرابة بالكفيل الأمريكي؟") },
      { id: "petitioner_status", q: tx("Is the petitioner a U.S. citizen or green card holder?", "هل الكفيل مواطن أمريكي أم حامل جرين كارد؟") },
      { id: "prior_marriages", q: tx("Has either party been married before?", "هل سبق لأي طرف الزواج؟"), type: yn },
      { id: "prior_petitions", q: tx("Has a petition been filed for this person before?", "هل قُدّم التماس لهذا الشخص من قبل؟"), type: yn },
      { id: "name_spelling", q: tx("Full names in English exactly as in passports", "الأسماء الكاملة بالإنجليزية كما في الجوازات") },
    ],
  },
  nvc: {
    docs: [
      tx("NVC welcome letter (case number + invoice ID)", "خطاب NVC (رقم القضية ورقم الفاتورة)"),
      tx("Valid passport", "جواز سفر ساري"),
      tx("Birth certificate", "شهادة الميلاد"),
      tx("Marriage / divorce certificates (if any)", "وثائق الزواج / الطلاق (إن وجدت)"),
      tx("Police certificate (Egyptian criminal record)", "صحيفة الحالة الجنائية (الفيش والتشبيه)"),
      tx("Military status certificate (males)", "شهادة الموقف من التجنيد (للذكور)"),
      tx("Sponsor financial documents (tax transcripts, W-2, pay stubs)", "مستندات الكفيل المالية (الإقرارات الضريبية، W-2، كشوف المرتب)"),
      tx("Passport-style photos", "صور شخصية بمقاس الجواز"),
    ],
    questions: [
      { id: "case_number", q: tx("NVC case number", "رقم قضية NVC") },
      { id: "ds260", q: tx("Has the DS-260 been submitted?", "هل تم تقديم نموذج DS-260؟"), type: yn },
      { id: "household", q: tx("Sponsor's household size", "عدد أفراد أسرة الكفيل") },
      { id: "criminal", q: tx("Any arrests or criminal records? (if yes, our team will review scope)", "هل يوجد أي قضايا أو سوابق؟ (إن وجد سيراجع الفريق النطاق)"), type: yn },
      { id: "refusals", q: tx("Any previous U.S. visa refusals?", "هل سبق رفض تأشيرة أمريكية؟"), type: yn },
    ],
  },
  crba: {
    docs: [
      tx("U.S. citizen parent's passport", "جواز سفر الوالد/الوالدة الأمريكي"),
      tx("Child's birth certificate (Egyptian, with translation)", "شهادة ميلاد الطفل المصرية مع الترجمة"),
      tx("Parents' marriage certificate", "وثيقة زواج الوالدين"),
      tx("Evidence of the U.S. parent's physical presence in the U.S. (transcripts, W-2, records)", "إثبات إقامة الوالد الأمريكي في أمريكا (شهادات دراسية، W-2، سجلات)"),
      tx("Non-U.S. parent's passport or ID", "جواز أو بطاقة الوالد غير الأمريكي"),
      tx("Child's passport-style photo", "صورة شخصية للطفل بمقاس الجواز"),
    ],
    questions: [
      { id: "us_parent", q: tx("Which parent is a U.S. citizen?", "أي الوالدين يحمل الجنسية الأمريكية؟") },
      { id: "how_citizen", q: tx("How did that parent become a citizen (birth / naturalization)?", "كيف حصل على الجنسية (بالميلاد / بالتجنس)؟") },
      { id: "child_dob", q: tx("Child's date of birth", "تاريخ ميلاد الطفل") },
      { id: "presence", q: tx("Approximate years the U.S. parent lived in the U.S. before the birth", "عدد السنوات التقريبي لإقامة الوالد في أمريكا قبل الولادة") },
    ],
  },
  visas: {
    docs: [
      tx("Valid passport + old passports with U.S. visas", "جواز ساري + الجوازات القديمة التي بها تأشيرات أمريكية"),
      tx("Digital photo meeting State Dept. requirements", "صورة رقمية وفق مواصفات الخارجية الأمريكية"),
      tx("Employment letter or business documents", "خطاب عمل أو مستندات النشاط التجاري"),
      tx("Bank statements", "كشوف حساب بنكية"),
      tx("Invitation letter or I-20 / DS-2019 (if applicable)", "خطاب دعوة أو I-20 / DS-2019 (إن وجد)"),
    ],
    questions: [
      { id: "visa_type", q: tx("Visa category you selected yourself", "فئة التأشيرة التي اخترتها بنفسك") },
      { id: "travel_dates", q: tx("Planned travel dates", "مواعيد السفر المتوقعة") },
      { id: "prior_travel", q: tx("Countries visited in the last 5 years", "الدول التي زرتها خلال آخر 5 سنوات") },
      { id: "refusals", q: tx("Any previous U.S. visa refusals?", "هل سبق رفض تأشيرة أمريكية؟"), type: yn },
      { id: "employer", q: tx("Current employer and job title", "جهة العمل الحالية والمسمى الوظيفي") },
    ],
  },
  "case-management": {
    docs: [
      tx("Receipt / case number notices", "إشعارات أرقام القضايا والإيصالات"),
      tx("All previous correspondence from the agency", "كل المراسلات السابقة من الجهة"),
      tx("Passport", "جواز السفر"),
    ],
    questions: [
      { id: "agency", q: tx("Which agency (USCIS / NVC / Embassy)?", "أي جهة (USCIS / NVC / السفارة)؟") },
      { id: "case_number", q: tx("Case or receipt number", "رقم القضية أو الإيصال") },
      { id: "latest", q: tx("Latest status you see", "آخر حالة تظهر لك") },
      { id: "goal", q: tx("What would you like us to track?", "ما الذي تريد منا متابعته؟") },
    ],
  },
  "nonimmigrant-visas": {
    docs: [
      tx("Current passport biographical page", "صفحة بيانات جواز السفر الساري"),
      tx("Relevant previous passport pages and U.S. visas", "صفحات الجوازات والتأشيرات الأمريكية السابقة"),
      tx("Visa photograph (State Dept. specifications)", "صورة شخصية للتأشيرة وفق مواصفات الخارجية"),
      tx("DS-160 online confirmation page with barcode", "صفحة تأكيد استمارة DS-160 بالباركود"),
      tx("Consular appointment confirmation letter", "خطاب تأكيد موعد المقابلة القنصلية"),
      tx("Visa application fee (MRV) payment receipt", "إيصال سداد رسوم طلب التأشيرة (MRV)"),
      tx("Employment letter, leave approval or business records", "خطاب جهة العمل أو إثبات السجل التجاري"),
      tx("Bank statements or documented funding evidence", "كشوف الحسابات البنكية أو إثبات التمويل المالي"),
      tx("Proposed itinerary and U.S. accommodation details", "خط سير الرحلة المقترح وبيانات الإقامة بأمريكا"),
      tx("Embassy-specific checklist and category-specific documents (e.g. I-20, DS-2019, I-797)", "قائمة متطلبات السفارة ومستندات الفئة المحددة (مثل I-20، DS-2019، I-797)"),
    ],
    questions: [
      { id: "full_legal_name", q: tx("Full legal name exactly as shown in your passport", "الاسم القانوني الكامل مطابقًا تمامًا لجواز السفر") },
      { id: "visa_category", q: tx("Visa category you selected (e.g., B-1/B-2, F-1, J-1, H-1B, L-1, etc.)", "فئة التأشيرة التي اخترتها (مثل B-1/B-2، F-1، J-1، H-1B، L-1)") },
      { id: "travel_purpose", q: tx("Stated purpose of travel to the United States", "الغرض المحدد من السفر إلى الولايات المتحدة") },
      { id: "intended_travel_dates", q: tx("Proposed arrival date and duration of stay", "تاريخ الوصول المتوقع ومدة الإقامة المقترحة") },
      { id: "applying_location", q: tx("U.S. Embassy or Consulate where you will apply", "السفارة أو القنصلية الأمريكية التي ستتقدم بها") },
      { id: "trip_payer", q: tx("Who is paying for the trip (self, employer, sponsor)?", "من يتكفل بمصاريف الرحلة (المتقدم، العمل، الكفيل)؟") },
      { id: "us_contact", q: tx("U.S. contact person or organization details", "بيانات جهة الاتصال أو المؤسسة في أمريكا") },
      { id: "prev_us_visits", q: tx("Have you previously visited the U.S. or held a U.S. visa?", "هل زرت الولايات المتحدة سابقًا أو حصلت على تأشيرة أمريكية؟"), type: yn },
      { id: "refusal_history", q: tx("Have you ever been refused a U.S. visa or admission?", "هل سبق رفض طلب تأشيرة أمريكية أو منعك من الدخول؟"), type: yn },
      { id: "immigrant_petitions", q: tx("Has an immigrant petition ever been filed for you?", "هل سبق لأحد تقديم التماس هجرة لك؟"), type: yn },
      { id: "current_employment", q: tx("Current occupation, employer, and monthly income", "العمل الحالي وجهة التوظيف والدخل الشهري") },
      { id: "security_eligibility", q: tx("Any security, criminal, medical, or immigration violations?", "هل توجد أي سوابق أمنية أو جنائية أو طبية أو مخالفات هجرة؟"), type: yn },
    ],
  },
};
