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
    title: tx("CRBA & Children", "CRBA والأطفال"),
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
    slug: "uscis",
    num: "05",
    title: tx("USCIS Administrative Documentation", "توثيق إداري لـ USCIS"),
    summary: tx("Independently reviewed and enabled services for forms you selected.", "خدمات مُراجعة ومُفعّلة بشكل مستقل للنماذج التي اخترتها."),
    includes: [
      tx("Data entry from your provided facts", "إدخال البيانات من المعلومات التي تقدمها"),
      tx("Administrative consistency checks", "فحوصات الاتساق الإدارية"),
      tx("Package assembly for your review and signature", "تجميع الملف لمراجعتك وتوقيعك"),
    ],
    excludes: tx("Availability varies per form; some forms are restricted.", "التوفر يختلف حسب النموذج؛ بعض النماذج مقيدة."),
  },
  {
    slug: "translation",
    num: "06",
    title: tx("Translation", "الترجمة"),
    summary: tx("Arabic–English translation of civil, court and financial records.", "ترجمة عربي–إنجليزي للمستندات المدنية والقضائية والمالية."),
    includes: [
      tx("Birth, marriage and divorce certificates", "شهادات الميلاد والزواج والطلاق"),
      tx("Court, military and police records", "السجلات القضائية والعسكرية والشرطية"),
      tx("Financial records", "المستندات المالية"),
      tx("Translator, version and correction tracking", "تتبع المترجم والإصدار والتصحيحات"),
    ],
    excludes: tx("We never claim a translation is universally accepted.", "لا نزعم أن الترجمة مقبولة لدى كل الجهات."),
  },
  {
    slug: "case-management",
    num: "07",
    title: tx("Case Management", "إدارة القضية"),
    summary: tx("Ongoing administrative tracking of your documents, tasks and deadlines.", "متابعة إدارية مستمرة لمستنداتك ومهامك ومواعيدك."),
    includes: [
      tx("Document tasks and correspondence organization", "مهام المستندات وتنظيم المراسلات"),
      tx("Source-labeled deadlines and reminders", "مواعيد نهائية موثقة المصدر وتذكيرات"),
      tx("Client-approved package status", "حالة الملف المعتمد من العميل"),
    ],
    excludes: tx("Tracking is administrative, not legal monitoring.", "المتابعة إدارية وليست متابعة قانونية."),
  },
];

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
