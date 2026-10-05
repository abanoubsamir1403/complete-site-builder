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
  uscis: {
    docs: [
      tx("Green card or current U.S. status document", "الجرين كارد أو مستند الوضع الحالي"),
      tx("Passport", "جواز السفر"),
      tx("Previous USCIS notices (receipts, approvals)", "إشعارات USCIS السابقة (إيصالات، موافقات)"),
      tx("Evidence listed in the official form instructions", "المستندات المذكورة في تعليمات النموذج الرسمية"),
      tx("Passport-style photos", "صور شخصية بمقاس الجواز"),
    ],
    questions: [
      { id: "form", q: tx("Form number you selected (e.g. I-90, N-400)", "رقم النموذج الذي اخترته (مثال I-90، N-400)") },
      { id: "a_number", q: tx("A-Number (if any)", "رقم A (إن وجد)") },
      { id: "receipts", q: tx("Previous receipt numbers", "أرقام الإيصالات السابقة") },
      { id: "address_history", q: tx("Addresses in the last 5 years", "العناوين خلال آخر 5 سنوات") },
      { id: "trips", q: tx("Trips outside the U.S. in the last 5 years", "الرحلات خارج أمريكا خلال آخر 5 سنوات") },
    ],
  },
  translation: {
    docs: [
      tx("Clear scans of every document to translate", "صور واضحة لكل مستند مطلوب ترجمته"),
      tx("Passport (for exact name spelling)", "جواز السفر (لتطابق كتابة الأسماء)"),
    ],
    questions: [
      { id: "pages", q: tx("Number of pages", "عدد الصفحات") },
      { id: "direction", q: tx("Translation direction (Arabic → English, etc.)", "اتجاه الترجمة (عربي ← إنجليزي، إلخ)") },
      { id: "use", q: tx("Which agency will receive it (USCIS, NVC, Embassy)?", "الجهة التي ستستلم الترجمة (USCIS، NVC، السفارة)؟") },
      { id: "deadline", q: tx("Deadline", "الموعد النهائي") },
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
};
