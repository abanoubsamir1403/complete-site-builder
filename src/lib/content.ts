import { tx, type T } from "./i18n";

export const PENDING = tx("To be confirmed", "يُحدد لاحقًا");

export type Service = {
  slug: string;
  num: string;
  title: T;
  summary: T;
  includes: T[];
  excludes: T;
};

export const services: Service[] = [
  {
    slug: "family",
    num: "01",
    title: tx("Family Immigration Documentation", "توثيق الهجرة العائلية"),
    summary: tx(
      "Organizing documents for a family-based process you have already selected, such as I-130.",
      "تنظيم مستندات إجراء عائلي اخترته بنفسك مسبقًا مثل I-130.",
    ),
    includes: [
      tx("Client-selected I-130 documentation support", "دعم مستندات I-130 الذي اختاره العميل"),
      tx("Spouse, parent, child and sibling document organization", "تنظيم مستندات الزوج/الزوجة والوالدين والأبناء والإخوة"),
      tx("Indexing relationship records selected by you, counsel, or an explicit official checklist", "فهرسة سجلات العلاقة التي تحددها أنت أو محاميك أو قائمة رسمية صريحة"),
    ],
    excludes: tx("We do not assess eligibility, select a petition type, or decide whether records prove a legal requirement. Financial figures are transcribed as provided; we do not determine sponsor eligibility, household size, domicile, exemptions, or financial sufficiency.", "لا نقيّم الأهلية ولا نختار نوع الالتماس ولا نحدد ما إذا كانت السجلات تثبت متطلبًا قانونيًا. ننسخ الأرقام المالية كما يقدمها العميل ولا نحدد أهلية الكفيل أو حجم الأسرة أو محل الإقامة أو الإعفاءات أو كفاية الموارد المالية."),
  },
  {
    slug: "nvc",
    num: "02",
    title: tx("NVC Documentation Organization", "تنظيم مستندات NVC"),
    summary: tx("Administrative organization of client-selected records for an existing National Visa Center case.", "تنظيم إداري للسجلات التي يحددها العميل في قضية قائمة لدى المركز الوطني للتأشيرات."),
    includes: [
      tx("Welcome Letter organization and case-number verification", "تنظيم خطاب الترحيب والتحقق من رقم القضية"),
      tx("Client-selected civil and financial records, indexed as instructed", "فهرسة السجلات المدنية والمالية التي يحددها العميل وفق تعليماته"),
      tx("DS-260 data-entry assistance from your answers", "المساعدة في إدخال بيانات DS-260 من إجاباتك"),
      tx("Permitted CEAC upload assistance and status logging", "المساعدة المسموح بها في الرفع على CEAC وتسجيل الحالة"),
      tx("Interview folder organization", "تنظيم ملف المقابلة"),
    ],
    excludes: tx("We transcribe client-provided financial figures and organize selected records only. We do not determine sponsor eligibility, household size, domicile, exemptions, or financial sufficiency, and do not answer legal questions on DS-260.", "ننسخ الأرقام المالية التي يقدمها العميل وننظم السجلات التي يحددها فقط. لا نحدد أهلية الكفيل أو حجم الأسرة أو محل الإقامة أو الإعفاءات أو كفاية الموارد المالية، ولا نجيب عن الأسئلة القانونية في DS-260."),
  },
  {
    slug: "crba",
    num: "03",
    title: tx("Consular Report of Birth Abroad (CRBA)", "التقرير القنصلي للميلاد بالخارج (CRBA)"),
    summary: tx("Collecting and organizing documents for a Consular Report of Birth Abroad appointment.", "جمع وتنظيم مستندات موعد تسجيل ميلاد طفل بالخارج."),
    includes: [
      tx("Parent and child civil documents", "مستندات الوالدين والطفل المدنية"),
      tx("Client-directed organization of records identified by the client, authorized counsel, or an explicit official checklist", "تنظيم السجلات التي يحددها العميل أو محاميه المخوّل أو قائمة رسمية صريحة، بناءً على توجيه العميل"),
      tx("Transcription of a client-provided chronology and appointment records only", "نسخ التسلسل الزمني الذي يقدمه العميل وتنظيم سجلات الموعد فقط"),
      tx("Passport documentation", "مستندات جواز السفر"),
    ],
    excludes: tx("We do not assess citizenship transmission, required residence, or qualifying physical presence, and do not determine whether evidence is legally sufficient.", "لا نقيّم انتقال الجنسية أو الإقامة المطلوبة أو التواجد الفعلي المؤهل، ولا نحدد الكفاية القانونية للأدلة."),
  },
  {
    slug: "visas",
    num: "04",
    title: tx("Fiancé & Visa Documentation", "مستندات الخطيب والتأشيرات"),
    summary: tx("Organization of records selected by you, authorized counsel, or an explicit official checklist for a K-1, B1/B2, or F-1 process you selected.", "تنظيم السجلات التي تحددها أنت أو محامٍ مخوّل أو قائمة رسمية صريحة لإجراء K-1 أو B1/B2 أو F-1 اخترته."),
    includes: [
      tx("Client-selected K-1 documentation", "مستندات K-1 التي اختارها العميل"),
      tx("B1/B2 and F-1 records selected by the client, counsel, or an explicit official checklist", "سجلات B1/B2 وF-1 التي يحددها العميل أو المحامي أو قائمة رسمية صريحة"),
      tx("Indexing client-selected records only; no interview coaching or evidence-sufficiency assessment", "فهرسة السجلات التي يحددها العميل فقط، دون تدريب للمقابلة أو تقييم لكفاية الأدلة"),
    ],
    excludes: tx("No visa category recommendation or approval prediction.", "لا نرشح فئة تأشيرة ولا نتوقع الموافقة."),
  },
  {
    slug: "embassy",
    num: "05",
    title: tx("Consular Appointment File Organization", "تنظيم ملف الموعد القنصلي"),
    summary: tx("Organizing client-selected records for a consular appointment; this is not interview coaching.", "تنظيم السجلات التي يحددها العميل للموعد القنصلي، دون تدريب على المقابلة."),
    includes: [
      tx("Consular appointment and client-selected file records", "سجلات الموعد القنصلي والمستندات التي يحددها العميل"),
      tx("Organization of client-selected civil, medical and sponsor records", "تنظيم السجلات المدنية والطبية وسجلات الكفيل التي يحددها العميل"),
      tx("Transcribing client-provided changes and indexing records listed on an explicit official checklist", "نسخ التغييرات التي يقدمها العميل وفهرسة السجلات الواردة في قائمة رسمية صريحة"),
    ],
    excludes: tx("We organize client-selected records only. We do not advise on interview answers, legal eligibility, immigration strategy, or whether evidence is legally sufficient.", "ننظم السجلات التي يحددها العميل فقط. لا نقدم مشورة بشأن إجابات المقابلة أو الأهلية القانونية أو استراتيجية الهجرة أو الكفاية القانونية للأدلة."),
  },
  {
    slug: "citizenship",
    num: "06",
    title: tx("Citizenship & Naturalization", "الجنسية والتجنس"),
    summary: tx("Document organization for a naturalization or citizenship form you selected, such as N-400 or N-600.", "تنظيم مستندات نموذج تجنس أو جنسية اخترته مثل N-400 أو N-600."),
    includes: [
      tx("Client-directed document organization for forms available within the stated administrative scope", "تنظيم المستندات بتوجيه العميل للنماذج المتاحة ضمن النطاق الإداري المعلن"),
      tx("N-648 assistance is limited to document organization; no diagnosis or medical certification preparation", "تقتصر المساعدة بشأن N-648 على تنظيم المستندات، دون تشخيص أو إعداد للشهادة الطبية"),
      tx("Fee payment and e-notification forms", "نماذج دفع الرسوم والإشعار الإلكتروني"),
    ],
    excludes: tx("We do not assess naturalization eligibility.", "لا نقيّم أهلية التجنس."),
  },
  {
    slug: "asylum",
    num: "07",
    title: tx("Asylum & Withholding of Removal Documentation", "مستندات اللجوء ووقف الترحيل"),
    summary: tx("Limited to exact client-directed transcription or faithful translation, only where permitted.", "تقتصر على النسخ الحرفي بتوجيه العميل أو الترجمة الأمينة، حيثما كان ذلك مسموحًا."),
    includes: [
      tx("Exact client-directed transcription or faithful translation only, where permitted", "النسخ الحرفي بتوجيه العميل أو الترجمة الأمينة فقط، حيثما كان ذلك مسموحًا"),
      tx("Return of original documents and fee forms", "استرجاع المستندات الأصلية ونماذج الرسوم"),
    ],
    excludes: tx("We do not develop an asylum claim, legal grounds, narrative strategy, or supporting-evidence strategy. Refer legal questions to authorized counsel.", "لا نطور طلب اللجوء أو أسبابه القانونية أو استراتيجية السرد أو استراتيجية الأدلة الداعمة. تُحال الأسئلة القانونية إلى محامٍ مخوّل."),
  },
  {
    slug: "tps",
    num: "08",
    title: tx("Temporary Protected Status (TPS)", "الحماية المؤقتة (TPS)"),
    summary: tx("Document organization for a TPS filing you selected.", "تنظيم مستندات طلب TPS الذي اخترته."),
    includes: [
      tx("I-821, I-102, I-765 documentation", "مستندات I-821 وI-102 وI-765"),
      tx("Return of original documents and fee forms", "استرجاع المستندات الأصلية ونماذج الرسوم"),
    ],
    excludes: tx("We do not determine TPS eligibility.", "لا نحدد أهلية TPS."),
  },
  {
    slug: "status",
    num: "09",
    title: tx("Extend / Change Nonimmigrant Status", "تمديد / تغيير وضع غير المهاجر"),
    summary: tx("Document organization for an I-539 filing you selected.", "تنظيم مستندات طلب I-539 الذي اخترته."),
    includes: [
      tx("I-539 and I-102 documentation", "مستندات I-539 وI-102"),
      tx("Return of original documents and fee forms", "استرجاع المستندات الأصلية ونماذج الرسوم"),
    ],
    excludes: tx("We do not recommend a status or category.", "لا نرشح وضعًا أو فئة."),
  },
  {
    slug: "address",
    num: "10",
    title: tx("AR-11 Administrative Address-Change Organization", "تنظيم إداري لتغيير العنوان بنموذج AR-11"),
    summary: tx("Administrative organization of client-provided information for AR-11 only.", "تنظيم إداري للمعلومات التي يقدمها العميل لنموذج AR-11 فقط."),
    includes: [tx("Client-directed AR-11 data entry and document organization only", "إدخال بيانات AR-11 وتنظيم مستنداته بتوجيه العميل فقط")],
    excludes: tx("You remain responsible for confirming the information and updating each pending case as required.", "تظل مسؤولًا عن تأكيد المعلومات وتحديث كل قضية قائمة حسب المطلوب."),
  },
  {
    slug: "administrative",
    num: "11",
    title: tx("Other Administrative Documentation", "مستندات إدارية أخرى"),
    summary: tx("Organization for administrative USCIS requests you selected.", "تنظيم طلبات USCIS الإدارية التي اخترتها."),
    includes: [
      tx("G-639, G-1041, G-1651, I-9, I-824 and I-907 (I-407 information only)", "G-639 وG-1041 وG-1651 وI-9 وI-824 وI-907 (معلومات فقط عن I-407)"),
    ],
    excludes: tx("Availability varies per form.", "التوفر يختلف حسب النموذج."),
  },
  {
    slug: "nonimmigrant-visas",
    num: "12",
    title: tx("U.S. Nonimmigrant Visas (DS-160)", "تأشيرات غير المهاجرين للولايات المتحدة (DS-160)"),
    summary: tx(
      "Client questionnaire, document requirements, category guides, and forms inventory for client-selected U.S. nonimmigrant visas.",
      "استبيان العميل ومتطلبات المستندات وأدلة الفئات وحصر النماذج لتأشيرات غير المهاجرين للولايات المتحدة التي يختارها العميل.",
    ),
    includes: [
      tx("Universal DS-160 biographic, contact, travel, and security history questionnaire", "استبيان DS-160 الشامل للبيانات الشخصية والاتصال والسفر وسجل الأمان"),
      tx("Core document verification (valid passport, biometric photo, appointment and fee receipts)", "التحقق من المستندات الأساسية (جواز ساري، صورة بيومترية، إيصالات الحجز والرسوم)"),
      tx("Category-specific requirements across 40+ nonimmigrant classifications (B, F, M, J, H, L, O, P, E, TN, I, R, Q, C, D, A, G, K, etc.)", "متطلبات تخصصية لأكثر من 40 فئة لتأشيرات غير المهاجرين (الزيارة، الدراسة، التبادل، العمل، الشركات، الرياضة، التجارة، الإعلام، الدبلوماسي، الخطيب، وغيرها)"),
      tx("Comprehensive inventory of State Department, SEVIS, and USCIS petitions and forms", "حصر كامل لنماذج وزارة الخارجية الأمريكية ونظام SEVIS والتماسات USCIS"),
      tx("Clear handling separation: client portal scans vs. official consular submission at CEAC / Embassy", "فصل واضح بين رفع المستندات للمراجعة بالبوابة والتقديم القنصلي الرسمي في CEAC والسفارة"),
    ],
    excludes: tx("We do not assess visa eligibility, select your visa category, or predict consular decisions.", "لا نقيّم أهلية التأشيرة، ولا نختار فئة التأشيرة نيابة عنك، ولا نتوقع القرارات القنصلية."),
  },
];

const FEES = ["G-1055", "G-1145", "G-1450", "G-1650"];
// Which forms appear in the portal for each service. Services not listed show every form.
export const serviceForms: Record<string, string[]> = {
  family: ["I-130", "I-130A", "I-131", "I-485", "I-765", "I-864", "I-864A", "I-864EZ", "I-864P", "I-912", ...FEES, "G-325A", "G-325R"],
  visas: ["I-129F", ...FEES, "I-912"],
  nvc: ["NVC"],
  embassy: ["EMBASSY"],
  crba: ["DS-2029", "DS-5507", "DS-11", "DS-3053", "DS-5525", "SS-5-FS", "DS-5542"],
  citizenship: ["N-400", "N-470", "N-565", "N-600", ...FEES, "I-912"],
  asylum: [],
  tps: ["I-821", "I-102", "I-765", "G-884", ...FEES],
  status: ["I-539", "I-102", "G-884", ...FEES],
  address: ["AR-11"],
  administrative: ["G-639", "G-1041", "G-1651", "I-9", "I-824", "I-907"],
  "nonimmigrant-visas": [
    "DS-160",
    "DS-156E",
    "DS-1648",
    "DS-2019",
    "DS-7002",
    "DS-5535",
    "DS-3035",
    "I-20",
    "I-901",
    "I-129",
    "I-129S",
    "I-129F",
    "I-539",
    "I-765",
    "I-134",
    ...FEES,
  ],
};

export type Form = { code: string; title: T; agency: "USCIS" | "DOS"; group: string; service: "enabled" | "restricted" | "info"; scopeNote?: T };

/** USCIS forms library (G, I, N). Order matches the public forms page. */
export const forms: Form[] = [
  { code: "AR-11", title: tx("Alien's Change of Address Card", "بطاقة تغيير عنوان الأجنبي"), agency: "USCIS", group: "G / General", service: "restricted", scopeNote: tx("Administrative organization and client-directed data entry only.", "تنظيم إداري وإدخال بيانات بتوجيه العميل فقط.") },
  { code: "G-325A", title: tx("Biographic Information — Deferred Action", "معلومات السيرة الذاتية — الإجراء المؤجل"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-325R", title: tx("Biographic Information — Registration", "معلومات السيرة الذاتية — التسجيل"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-639", title: tx("Freedom of Information / Privacy Act Request", "طلب قانون حرية المعلومات / قانون الخصوصية"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-884", title: tx("Request for the Return of Original Documents", "طلب استعادة المستندات الأصلية"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-1041", title: tx("Genealogy Index Search Request", "طلب البحث في فهرس الأنساب"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-1055", title: tx("Fee Schedule", "جدول الرسوم"), agency: "USCIS", group: "G / General", service: "info" },
  { code: "G-1145", title: tx("E-Notification of Application/Petition Acceptance", "إشعار إلكتروني بقبول الطلب/الالتماس"), agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-1450", title: tx("Authorization for Credit Card Transactions", "تفويض لمعاملات بطاقة الائتمان"), agency: "USCIS", group: "G / General", service: "info" },
  { code: "G-1650", title: tx("Authorization for ACH Transactions", "تفويض لمعاملات ACH"), agency: "USCIS", group: "G / General", service: "info" },
  { code: "I-9", title: tx("Employment Eligibility Verification", "التحقق من أهلية التوظيف"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-90", title: tx("Replace Permanent Resident Card", "استبدال بطاقة الإقامة الدائمة"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-102", title: tx("Replace / Obtain Initial Nonimmigrant Arrival-Departure Document", "استبدال / الحصول على وثيقة وصول ومغادرة لغير المهاجرين"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-129F", title: tx("Petition for Alien Fiancé(e)", "طلب لخطيب/خطيبة أجنبي/ة"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-130", title: tx("Petition for Alien Relative", "طلب قريب أجنبي"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-130A", title: tx("Supplemental Information for Spouse Beneficiary", "معلومات إضافية للمستفيد الزوج/الزوجة"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-131", title: tx("Travel Documents, Parole Documents, and Arrival/Departure Records", "وثائق السفر والإفراج المشروط وسجلات الوصول/المغادرة"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-131A", title: tx("Application for Carrier Documentation", "طلب وثائق الناقل"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-134", title: tx("Declaration of Financial Support", "إقرار الدعم المالي"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-407", title: tx("Abandonment of Lawful Permanent Resident Status", "التخلي عن صفة المقيم الدائم الشرعي"), agency: "USCIS", group: "I / Immigration", service: "info", scopeNote: tx("Information only - independent legal advice recommended. No form-completion service is offered without separate review of legal authority and permissible scope.", "معلومات فقط - يُنصح بالحصول على مشورة قانونية مستقلة. لا نقدم خدمة إعداد النموذج دون مراجعة منفصلة للصلاحية القانونية والنطاق المسموح.") },
  { code: "I-485", title: tx("Register Permanent Residence or Adjust Status", "تسجيل الإقامة الدائمة أو تعديل الوضع"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-539", title: tx("Extend / Change Nonimmigrant Status", "تمديد / تغيير وضع غير المهاجر"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-589", title: tx("Asylum and Withholding of Removal", "اللجوء وحجب الترحيل"), agency: "USCIS", group: "I / Immigration", service: "restricted", scopeNote: tx("For asylum-related services only: exact client-directed transcription or faithful translation where permitted. No claim development, legal grounds, narrative strategy, or supporting-evidence strategy.", "في الخدمات المتعلقة باللجوء فقط: نسخ حرفي بتوجيه العميل أو ترجمة أمينة حيثما كان ذلك مسموحًا. لا نطور الطلب أو أسبابه القانونية أو استراتيجية السرد أو استراتيجية الأدلة الداعمة.") },
  { code: "I-693", title: tx("Immigration Medical Examination and Vaccination Record", "الفحص الطبي الخاص بالهجرة وسجل التطعيمات"), agency: "USCIS", group: "I / Immigration", service: "info", scopeNote: tx("Administrative appointment and document organization only. An authorized civil surgeon must perform and certify the medical examination.", "تنظيم إداري للموعد والمستندات فقط. يجب أن يجري طبيب مدني معتمد الفحص الطبي ويصدّق عليه.") },
  { code: "I-730", title: tx("Refugee/Asylee Relative Petition", "طلب لم شمل أقارب اللاجئين/طالبي اللجوء"), agency: "USCIS", group: "I / Immigration", service: "restricted", scopeNote: tx("For asylum-related services only: exact client-directed transcription or faithful translation where permitted. No claim or legal-strategy development.", "في الخدمات المتعلقة باللجوء فقط: نسخ حرفي بتوجيه العميل أو ترجمة أمينة حيثما كان ذلك مسموحًا. لا نطور الطلب أو الاستراتيجية القانونية.") },
  { code: "I-751", title: tx("Remove Conditions on Residence", "إزالة شروط الإقامة"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-765", title: tx("Employment Authorization", "تصريح العمل"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-821", title: tx("Temporary Protected Status", "الحماية المؤقتة"), agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-824", title: tx("Action on an Approved Application or Petition", "إجراء بشأن طلب أو التماس موافق عليه"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-864", title: tx("Affidavit of Support Under Section 213A", "إفادة دعم بموجب القسم 213A"), agency: "USCIS", group: "I / Immigration", service: "restricted", scopeNote: tx("Client-provided figures are transcribed exactly and client-selected records are organized only. No sponsor eligibility, household-size, domicile, exemption, or financial-sufficiency assessment.", "تُنسخ الأرقام التي يقدمها العميل حرفيًا وتُنظم السجلات التي يحددها فقط. لا نقيّم أهلية الكفيل أو حجم الأسرة أو محل الإقامة أو الإعفاءات أو كفاية الموارد المالية.") },
  { code: "I-864A", title: tx("Contract Between Sponsor and Household Member", "عقد بين الكفيل وأفراد الأسرة"), agency: "USCIS", group: "I / Immigration", service: "restricted", scopeNote: tx("Client-provided figures are transcribed exactly and client-selected records are organized only. No household-size, sponsor-eligibility, or financial-sufficiency assessment.", "تُنسخ الأرقام التي يقدمها العميل حرفيًا وتُنظم السجلات التي يحددها فقط. لا نقيّم حجم الأسرة أو أهلية الكفيل أو كفاية الموارد المالية.") },
  { code: "I-864EZ", title: tx("Affidavit of Support — Simplified Form", "إفادة دعم — نموذج مبسط"), agency: "USCIS", group: "I / Immigration", service: "restricted", scopeNote: tx("Client-provided figures are transcribed exactly and client-selected records are organized only. No sponsor eligibility or financial-sufficiency assessment.", "تُنسخ الأرقام التي يقدمها العميل حرفيًا وتُنظم السجلات التي يحددها فقط. لا نقيّم أهلية الكفيل أو كفاية الموارد المالية.") },
  { code: "I-864P", title: tx("HHS Poverty Guidelines for Affidavit of Support", "إرشادات الفقر لوزارة الصحة لإفادة الدعم"), agency: "USCIS", group: "I / Immigration", service: "info", scopeNote: tx("Information only. MIGRAFILE does not calculate sponsor eligibility or financial sufficiency.", "معلومات فقط. لا تحسب MIGRAFILE أهلية الكفيل أو كفاية الموارد المالية.") },
  { code: "I-864W", title: tx("Request for Exemption for Intending Immigrant’s Affidavit of Support", "طلب إعفاء من إقرار دعم المهاجر المزمع"), agency: "USCIS", group: "I / Immigration", service: "info", scopeNote: tx("Information only. MIGRAFILE does not determine exemption or sponsor eligibility.", "معلومات فقط. لا تحدد MIGRAFILE الإعفاء أو أهلية الكفيل.") },
  { code: "I-865", title: tx("Sponsor’s Notice of Change of Address", "إخطار الكفيل بتغيير العنوان"), agency: "USCIS", group: "I / Immigration", service: "info" },
  { code: "I-907", title: tx("Request for Premium Processing Service", "طلب خدمة المعالجة المستعجلة"), agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-912", title: tx("Request for Fee Waiver", "طلب إعفاء من الرسوم"), agency: "USCIS", group: "I / Immigration", service: "info" },
  { code: "N-336", title: tx("Hearing on a Decision in Naturalization Proceedings", "جلسة استماع بشأن قرار في إجراءات التجنس"), agency: "USCIS", group: "N / Naturalization", service: "info", scopeNote: tx("Information only - legal review required before any service. No appeal grounds or legal arguments are drafted as an administrative service.", "معلومات فقط - تلزم مراجعة قانونية قبل تقديم أي خدمة. لا نصوغ أسباب استئناف أو حججًا قانونية كخدمة إدارية.") },
  { code: "N-400", title: tx("Application for Naturalization", "طلب التجنس"), agency: "USCIS", group: "N / Naturalization", service: "restricted" },
  { code: "N-470", title: tx("Preserve Residence for Naturalization Purposes", "الحفاظ على الإقامة لأغراض التجنس"), agency: "USCIS", group: "N / Naturalization", service: "enabled" },
  { code: "N-565", title: tx("Replacement Naturalization/Citizenship Document", "وثيقة بديلة للتجنس/المواطنة"), agency: "USCIS", group: "N / Naturalization", service: "enabled" },
  { code: "N-600", title: tx("Application for Certificate of Citizenship", "طلب شهادة الجنسية"), agency: "USCIS", group: "N / Naturalization", service: "restricted" },
  { code: "N-648", title: tx("Medical Certification for Disability Exceptions", "شهادة طبية للإعفاءات المتعلقة بالإعاقة"), agency: "USCIS", group: "N / Naturalization", service: "restricted", scopeNote: tx("Document organization only. MIGRAFILE does not diagnose a disability or prepare a medical professional's certification.", "تنظيم المستندات فقط. لا تشخّص MIGRAFILE الإعاقة ولا تُعد شهادة المختص الطبي.") },
];

export const formGroups = ["G / General", "I / Immigration", "N / Naturalization"] as const;

export const officialResources = [
  { name: "USCIS", desc: tx("Forms, fees, case status and policy", "النماذج والرسوم وحالة القضية والسياسات"), url: "https://www.uscis.gov" },
  { name: "USCIS Forms", desc: tx("Official forms and instructions", "النماذج الرسمية والتعليمات"), url: "https://www.uscis.gov/forms/all-forms" },
  { name: "USCIS Fee Schedule", desc: tx("Current filing fees (G-1055)", "الرسوم الحالية (G-1055)"), url: "https://www.uscis.gov/g-1055" },
  { name: "Case Status Online", desc: tx("Check a USCIS receipt number", "الاستعلام برقم إيصال USCIS"), url: "https://egov.uscis.gov/" },
  { name: "Travel.State.Gov — Immigrate", desc: tx("Immigrant visa process", "إجراءات تأشيرة الهجرة"), url: "https://travel.state.gov/content/travel/en/us-visas/immigrate.html" },
  { name: "CEAC", desc: tx("Consular Electronic Application Center", "مركز الطلبات الإلكترونية القنصلية"), url: "https://ceac.state.gov/" },
  { name: "Visa Bulletin", desc: tx("Monthly priority date chart", "جدول تواريخ الأولوية الشهري"), url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" },
  { name: "U.S. Embassy Cairo", desc: tx("Consular services in Egypt", "الخدمات القنصلية في مصر"), url: "https://eg.usembassy.gov/" },
  { name: "CBP", desc: tx("U.S. entry and I-94", "الدخول للولايات المتحدة وI-94"), url: "https://www.cbp.gov/" },
  { name: "EOIR", desc: tx("Immigration court information", "معلومات محاكم الهجرة"), url: "https://www.justice.gov/eoir" },
  { name: "FTC — Immigration Scams", desc: tx("Avoiding notario fraud", "تجنب احتيال الهجرة"), url: "https://consumer.ftc.gov/articles/avoid-scams-immigrants" },
];

export const knowledgeCenters: { title: T; topics: T[] }[] = [
  { title: tx("Start Here", "ابدأ من هنا"), topics: [tx("How U.S. immigration agencies differ", "الفرق بين جهات الهجرة الأمريكية"), tx("Glossary of common terms", "قاموس المصطلحات")] },
  { title: tx("Family Immigration", "الهجرة العائلية"), topics: [tx("Organizing marriage documents", "تنظيم مستندات الزواج"), tx("Prior marriage documentation", "مستندات الزواج السابق")] },
  { title: tx("NVC Center", "مركز NVC"), topics: [tx("What the Welcome Letter contains", "ماذا يحتوي خطاب الترحيب"), tx("Reviewing DS-260 data before submission", "مراجعة بيانات DS-260 قبل الإرسال")] },
  { title: tx("Affidavit of Support", "إقرار الدعم المالي"), topics: [tx("IRS tax transcript explained", "شرح كشف الضرائب IRS"), tx("W-2 vs 1099", "الفرق بين W-2 و1099")] },
  { title: tx("CRBA & Children", "CRBA والأطفال"), topics: [tx("Physical-presence evidence types", "أنواع أدلة التواجد الفعلي"), tx("Child passport documents", "مستندات جواز الطفل")] },
  { title: tx("U.S. Visa Center", "مركز التأشيرات"), topics: [tx("Immigrant vs nonimmigrant visas", "تأشيرات الهجرة وغير الهجرة"), tx("Preparing an interview folder", "تحضير ملف المقابلة")] },
  { title: tx("After Arriving", "بعد الوصول"), topics: [tx("Social Security card basics", "أساسيات بطاقة الضمان الاجتماعي"), tx("Change of address (AR-11)", "تغيير العنوان AR-11")] },
  { title: tx("Scam Awareness", "التوعية بالاحتيال"), topics: [tx("Red flags of immigration fraud", "علامات احتيال الهجرة"), tx("Verifying official websites", "التحقق من المواقع الرسمية")] },
];
