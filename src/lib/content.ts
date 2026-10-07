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
      tx("Relationship-evidence indexing", "فهرسة أدلة العلاقة"),
    ],
    excludes: tx("We do not assess eligibility or recommend a petition type.", "لا نقيّم الأهلية ولا نرشح نوع الالتماس."),
  },
  {
    slug: "nvc",
    num: "02",
    title: tx("NVC Documentation", "مستندات NVC"),
    summary: tx("Administrative organization for an existing National Visa Center case.", "تنظيم إداري لقضية قائمة لدى المركز الوطني للتأشيرات."),
    includes: [
      tx("Welcome Letter organization and case-number verification", "تنظيم خطاب الترحيب والتحقق من رقم القضية"),
      tx("Civil documents and client-supplied financial documents", "المستندات المدنية والمالية التي يقدمها العميل"),
      tx("DS-260 data-entry assistance from your answers", "المساعدة في إدخال بيانات DS-260 من إجاباتك"),
      tx("Permitted CEAC upload assistance and status logging", "المساعدة المسموح بها في الرفع على CEAC وتسجيل الحالة"),
      tx("Interview folder organization", "تنظيم ملف المقابلة"),
    ],
    excludes: tx("We do not answer legal questions on the DS-260 for you.", "لا نجيب عنك على الأسئلة القانونية في DS-260."),
  },
  {
    slug: "crba",
    num: "03",
    title: tx("Consular Report of Birth Abroad (CRBA)", "التقرير القنصلي للميلاد بالخارج (CRBA)"),
    summary: tx("Collecting and organizing documents for a Consular Report of Birth Abroad appointment.", "جمع وتنظيم مستندات موعد تسجيل ميلاد طفل بالخارج."),
    includes: [
      tx("Parent and child civil documents", "مستندات الوالدين والطفل المدنية"),
      tx("Physical-presence evidence organization", "تنظيم أدلة التواجد الفعلي"),
      tx("Travel chronology and appointment documents", "تسلسل السفر ومستندات الموعد"),
      tx("Passport documentation", "مستندات جواز السفر"),
    ],
    excludes: tx("No citizenship or transmission determination.", "لا نحدد الجنسية أو انتقالها."),
  },
  {
    slug: "visas",
    num: "04",
    title: tx("Fiancé & Visa Documentation", "مستندات الخطيب والتأشيرات"),
    summary: tx("Evidence organization for a K-1, B1/B2 or F-1 process you selected.", "تنظيم الأدلة لإجراء K-1 أو B1/B2 أو F-1 اخترته."),
    includes: [
      tx("Client-selected K-1 documentation", "مستندات K-1 التي اختارها العميل"),
      tx("B1/B2 and F-1 supporting document organization", "تنظيم المستندات الداعمة لـ B1/B2 وF-1"),
      tx("Evidence indexing for interview preparation", "فهرسة الأدلة استعدادًا للمقابلة"),
    ],
    excludes: tx("No visa category recommendation or approval prediction.", "لا نرشح فئة تأشيرة ولا نتوقع الموافقة."),
  },
  {
    slug: "embassy",
    num: "05",
    title: tx("U.S. Embassy / Consular Interview stage", "مرحلة السفارة / المقابلة القنصلية"),
    summary: tx("Organizing your consular interview file after the USCIS and NVC stages are complete, with us or elsewhere.", "تنظيم ملف المقابلة القنصلية بعد اكتمال مرحلتي USCIS وNVC، معنا أو خارجنا."),
    includes: [
      tx("Interview questionnaire and appointment records", "أسئلة المقابلة وسجلات الموعد"),
      tx("Civil documents, medical records and sponsor evidence organization", "تنظيم المستندات المدنية وسجلات الكشف الطبي وأدلة الكفيل"),
      tx("Recording changes and embassy requests for review", "تسجيل التغييرات وطلبات السفارة للمراجعة"),
    ],
    excludes: tx("No legal advice, automatic changes to submitted answers or outcome guarantees.", "لا استشارات قانونية أو تغييرات تلقائية للإجابات المقدمة أو ضمان للنتائج."),
  },
  {
    slug: "citizenship",
    num: "06",
    title: tx("Citizenship & Naturalization", "الجنسية والتجنس"),
    summary: tx("Document organization for a naturalization or citizenship form you selected, such as N-400 or N-600.", "تنظيم مستندات نموذج تجنس أو جنسية اخترته مثل N-400 أو N-600."),
    includes: [
      tx("N-400, N-600, N-565, N-470, N-336 and N-648 documentation", "مستندات N-400 وN-600 وN-565 وN-470 وN-336 وN-648"),
      tx("Fee payment and e-notification forms", "نماذج دفع الرسوم والإشعار الإلكتروني"),
    ],
    excludes: tx("We do not assess naturalization eligibility.", "لا نقيّم أهلية التجنس."),
  },
  {
    slug: "asylum",
    num: "07",
    title: tx("Asylum & Withholding of Removal Documentation", "مستندات اللجوء ووقف الترحيل"),
    summary: tx("Administrative organization for asylum-related forms you selected.", "تنظيم إداري لنماذج اللجوء التي اخترتها."),
    includes: [
      tx("I-589, I-730, I-131, I-131A, I-102, I-765 documentation", "مستندات I-589 وI-730 وI-131 وI-131A وI-102 وI-765"),
      tx("Return of original documents and fee forms", "استرجاع المستندات الأصلية ونماذج الرسوم"),
    ],
    excludes: tx("We do not evaluate asylum claims or give legal advice.", "لا نقيّم طلبات اللجوء ولا نقدم استشارات قانونية."),
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
    title: tx("Change of Address", "تغيير العنوان"),
    summary: tx("Help organizing your AR-11 change of address.", "المساعدة في تنظيم نموذج تغيير العنوان AR-11."),
    includes: [tx("AR-11 Alien's Change of Address Card", "بطاقة تغيير عنوان الأجنبي AR-11")],
    excludes: tx("Updating each pending case remains your responsibility.", "تحديث كل قضية قائمة يظل مسؤوليتك."),
  },
  {
    slug: "administrative",
    num: "11",
    title: tx("Other Administrative Documentation", "مستندات إدارية أخرى"),
    summary: tx("Organization for administrative USCIS requests you selected.", "تنظيم طلبات USCIS الإدارية التي اخترتها."),
    includes: [
      tx("G-639, G-1041, G-1651, I-9, I-407, I-824, I-907", "G-639 وG-1041 وG-1651 وI-9 وI-407 وI-824 وI-907"),
    ],
    excludes: tx("Availability varies per form.", "التوفر يختلف حسب النموذج."),
  },
];

const FEES = ["G-1055", "G-1145", "G-1450", "G-1650"];
// Which forms appear in the portal for each service. Services not listed show every form.
export const serviceForms: Record<string, string[]> = {
  family: ["I-130", "I-130A", "I-131", "I-485", "I-693", "I-765", "I-864", "I-864A", "I-864EZ", "I-864W", "I-864P", "I-912", ...FEES, "G-325A", "G-325R"],
  visas: ["I-129F", ...FEES, "I-912"],
  nvc: ["NVC"],
  embassy: ["EMBASSY"],
  crba: ["DS-2029", "DS-5507", "DS-11", "DS-3053", "DS-5525", "SS-5-FS", "DS-5542"],
  citizenship: ["N-336", "N-400", "N-470", "N-565", "N-600", "N-648", ...FEES, "I-912"],
  asylum: ["I-589", "I-730", "I-131", "I-131A", "I-102", "I-765", "G-884", ...FEES],
  tps: ["I-821", "I-102", "I-765", "G-884", ...FEES],
  status: ["I-539", "I-102", "G-884", ...FEES],
  address: ["AR-11"],
  administrative: ["G-639", "G-1041", "G-1651", "I-9", "I-407", "I-824", "I-907"],
};

export type Form = { code: string; title: string; agency: "USCIS" | "DOS"; group: string; service: "enabled" | "restricted" | "info" };

export const forms: Form[] = [
  { code: "AR-11", title: "Alien's Change of Address Card", agency: "USCIS", group: "G / General", service: "info" },
  { code: "G-28", title: "Notice of Entry of Appearance as Attorney or Accredited Representative", agency: "USCIS", group: "G / General", service: "info" },
  { code: "G-639", title: "Freedom of Information/Privacy Act Request", agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-1145", title: "e-Notification of Application/Petition Acceptance", agency: "USCIS", group: "G / General", service: "enabled" },
  { code: "G-1450", title: "Authorization for Credit Card Transactions", agency: "USCIS", group: "G / General", service: "info" },
  { code: "I-90", title: "Application to Replace Permanent Resident Card", agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-129F", title: "Petition for Alien Fiancé(e)", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-130", title: "Petition for Alien Relative", agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-130A", title: "Supplemental Information for Spouse Beneficiary", agency: "USCIS", group: "I / Immigration", service: "enabled" },
  { code: "I-131", title: "Application for Travel Documents", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-134", title: "Declaration of Financial Support", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-485", title: "Application to Register Permanent Residence or Adjust Status", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-751", title: "Petition to Remove Conditions on Residence", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-765", title: "Application for Employment Authorization", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-864", title: "Affidavit of Support Under Section 213A of the INA", agency: "USCIS", group: "I / Immigration", service: "restricted" },
  { code: "I-912", title: "Request for Fee Waiver", agency: "USCIS", group: "I / Immigration", service: "info" },
  { code: "N-400", title: "Application for Naturalization", agency: "USCIS", group: "N / Naturalization", service: "restricted" },
  { code: "N-565", title: "Application for Replacement Naturalization/Citizenship Document", agency: "USCIS", group: "N / Naturalization", service: "enabled" },
  { code: "N-600", title: "Application for Certificate of Citizenship", agency: "USCIS", group: "N / Naturalization", service: "restricted" },
  { code: "DS-160", title: "Online Nonimmigrant Visa Application", agency: "DOS", group: "DS / State Department", service: "enabled" },
  { code: "DS-260", title: "Immigrant Visa Electronic Application", agency: "DOS", group: "DS / State Department", service: "enabled" },
  { code: "DS-2029", title: "Application for Consular Report of Birth Abroad", agency: "DOS", group: "DS / State Department", service: "enabled" },
  { code: "DS-11", title: "Application for a U.S. Passport", agency: "DOS", group: "DS / State Department", service: "enabled" },
];

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
