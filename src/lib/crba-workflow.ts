// Owner-supplied CRBA intake, October 2026. Related applications remain separate.
import type { FormQuestion, FormRequirement } from './form-requirements';
import { tx } from './i18n';

type QuestionRow = [string, string, string];
const rows = (prefix: string, en: string, ar: string, items: QuestionRow[]): FormQuestion[] =>
  items.map(([id, english, arabic]) => ({
    id: `${prefix}_${id}`,
    q: tx(`${en}: ${english} (Dates: MM/DD/YYYY; write “Not applicable” where appropriate.)`, `${ar}: ${arabic} (التواريخ: شهر/يوم/سنة؛ اكتب «لا ينطبق» عند عدم الانطباق.)`),
    type: 'textarea',
  }));

const child = rows('child', 'Child', 'الطفل', [
  ['name', 'Full legal name exactly as on the foreign birth certificate (first, middle, last)', 'الاسم القانوني الكامل كما بشهادة الميلاد الأجنبية (الأول والأوسط والأخير)'],
  ['other_names', 'Other names, spelling differences and supporting name-change documents', 'الأسماء الأخرى واختلافات التهجئة ومستندات تغيير الاسم'],
  ['birth_date', 'Exact date of birth', 'تاريخ الميلاد الدقيق'],
  ['birth_place', 'Place of birth: city, province/state and country', 'مكان الميلاد: المدينة والمحافظة/الولاية والدولة'],
  ['sex', 'Sex recorded on the birth record', 'الجنس المسجل في شهادة الميلاد'],
  ['registration', 'Birth registration authority, date and certificate number', 'جهة تسجيل الميلاد وتاريخ التسجيل ورقم الشهادة'],
  ['address', 'Current complete physical address and country', 'عنوان الإقامة الفعلي الكامل والدولة'],
  ['passport', 'Foreign passport, if issued: country, number, issue date and expiry date', 'جواز السفر الأجنبي إن صدر: الدولة والرقم وتاريخ الإصدار والانتهاء'],
  ['previous_document', 'Has the child received a CRBA or U.S. passport? Give document details and copies', 'هل حصل الطفل على CRBA أو جواز أمريكي؟ اذكر التفاصيل والنسخ المتاحة'],
  ['previous_application', 'Any previous CRBA or U.S. passport application: embassy, date, outcome and correspondence', 'أي طلب سابق لـ CRBA أو جواز أمريكي: السفارة والتاريخ والنتيجة والمراسلات'],
  ['parentage', 'Adoption, surrogacy or assisted reproduction: circumstances and available parentage records', 'التبني أو الحمل البديل أو الإنجاب المساعد: الظروف وسجلات النسب المتاحة'],
  ['custody', 'Custody or guardianship orders: court, date and complete orders', 'أحكام الحضانة أو الوصاية: المحكمة والتاريخ والأحكام كاملة'],
]);
const parentRows: QuestionRow[] = [
  ['name', 'Full legal name matching passport or ID', 'الاسم القانوني الكامل المطابق للجواز أو الهوية'],
  ['other_names', 'All other legal names: birth, married and previous names', 'كل الأسماء القانونية الأخرى: اسم الميلاد والزواج والأسماء السابقة'],
  ['birth', 'Date and place of birth: city, state/province and country', 'تاريخ ومكان الميلاد: المدينة والولاية/المحافظة والدولة'],
  ['citizenships', 'All citizenships held', 'كل الجنسيات التي تحملها'],
  ['citizen_at_birth', 'Were you a U.S. citizen at the child’s birth? Yes/No and date citizenship was acquired', 'هل كنت مواطنًا أمريكيًا عند ميلاد الطفل؟ نعم/لا وتاريخ اكتساب الجنسية'],
  ['citizenship_basis', 'How was U.S. citizenship acquired: birth, naturalization, through a parent or other basis?', 'كيف اكتسبت الجنسية الأمريكية: الميلاد أو التجنس أو من أحد الوالدين أو أساس آخر؟'],
  ['citizenship_evidence', 'Citizenship evidence: U.S. passport, birth certificate, naturalization/citizenship certificate or CRBA', 'إثبات الجنسية: جواز أمريكي أو شهادة ميلاد أو تجنس/جنسية أو CRBA'],
  ['id', 'Current passport or government photo ID details', 'بيانات الجواز الحالي أو الهوية الحكومية المصورة'],
  ['relationship', 'Relationship to child: genetic, gestational, legal parent or guardian', 'العلاقة بالطفل: وراثية أو حمل وولادة أو والد قانوني أو وصي'],
  ['address', 'Complete current physical address', 'عنوان الإقامة الفعلي الحالي كاملًا'],
  ['mailing', 'Is your mailing address different? Give the complete mailing address', 'هل عنوان المراسلات مختلف؟ اذكره كاملًا'],
  ['contact', 'Telephone number and email', 'رقم الهاتف والبريد الإلكتروني'],
  ['attendance', 'Will you attend the consular appointment? Yes/No; explain if unavailable', 'هل ستحضر الموعد القنصلي؟ نعم/لا؛ وضّح إن تعذّر الحضور'],
];
const presenceRows: QuestionRow[] = [
  ['periods', 'Every U.S. physical-presence period before the child’s birth, including before citizenship: arrival and departure dates', 'كل فترات التواجد الفعلي بأمريكا قبل ميلاد الطفل، بما فيها قبل الجنسية: تواريخ الوصول والمغادرة'],
  ['addresses', 'Cities, states and available addresses during each period', 'المدن والولايات والعناوين المتاحة في كل فترة'],
  ['trips', 'Every trip outside the U.S., including short trips: departure, return and destination', 'كل رحلة خارج أمريكا بما فيها القصيرة: المغادرة والعودة والوجهة'],
  ['school', 'Schools, locations, attendance dates and transcripts', 'المدارس ومواقعها وتواريخ الدراسة والسجلات الدراسية'],
  ['work', 'Employers, locations, dates and employment records', 'جهات العمل ومواقعها والتواريخ وسجلات العمل'],
  ['evidence', 'Evidence for each period: school, work, medical, travel or other dated records', 'أدلة كل فترة: سجلات الدراسة أو العمل أو العلاج أو السفر أو غيرها المؤرخة'],
  ['service', 'U.S. military or qualifying government/international-organization service abroad: details and official records', 'الخدمة العسكرية الأمريكية أو العمل الحكومي/بالمنظمات الدولية المؤهل بالخارج: التفاصيل والسجلات الرسمية'],
  ['dependent', 'Time abroad as a qualifying dependent child of someone in such service: relationship, household, dates and records', 'الإقامة بالخارج كطفل معال مؤهل لشخص في هذه الخدمة: العلاقة والأسرة والتواريخ والسجلات'],
  ['uncertain', 'Uncertain dates or missing records: distinguish estimates from confirmed dates', 'التواريخ غير المؤكدة أو السجلات المفقودة: ميّز التقديرات عن التواريخ المؤكدة'],
];
const parents = [1, 2].flatMap((n) => rows(`parent${n}`, `Parent ${n}`, `الوالد ${n}`, parentRows));
const presence = [1, 2].flatMap((n) => rows(`presence${n}`, `Parent ${n} — U.S. physical presence`, `الوالد ${n} — التواجد الفعلي بأمريكا`, presenceRows));
const marriage = rows('marriage', 'Marriage / parentage', 'الزواج / النسب', [
  ['at_birth', 'Were the parents married to each other when the child was born? Yes/No', 'هل كان الوالدان متزوجين من بعضهما عند ميلاد الطفل؟ نعم/لا'],
  ['details', 'Marriage date, place and certificate', 'تاريخ ومكان الزواج وشهادته'],
  ['status', 'Current marital status: married, separated, divorced, widowed or never married', 'الحالة الحالية: متزوج أو منفصل أو مطلق أو أرمل أو لم يتزوج'],
  ['previous', 'Previous marriages of either parent: each spouse’s name, date and place', 'الزيجات السابقة لأي من الوالدين: اسم كل زوج وتاريخ ومكان الزواج'],
  ['ended', 'How each prior marriage ended: final divorce, annulment or death, with dates and records', 'كيف انتهى كل زواج سابق: طلاق نهائي أو بطلان أو وفاة، مع التواريخ والسجلات'],
  ['paternity', 'If born outside marriage, was paternity acknowledged or established? Give acknowledgment, court order or records', 'إن وُلد خارج الزواج، هل أُقرّ أو أُثبت النسب؟ اذكر الإقرار أو الحكم أو السجلات'],
  ['support', 'If claiming citizenship through an unmarried U.S. citizen father, existing parentage and support declarations and records', 'إن كان طلب الجنسية عن طريق أب أمريكي غير متزوج، اذكر إقرارات النسب والإعالة القائمة وسجلاتها'],
  ['discrepancies', 'Name or date discrepancies across documents: identify and explain each one', 'اختلافات الأسماء أو التواريخ بين المستندات: حدد ووضّح كل اختلاف'],
]);
const planning = rows('planning', 'Application / appointment', 'الطلب / الموعد', [
  ['post', 'Embassy or consulate and country where you will apply', 'السفارة أو القنصلية والدولة التي ستقدم بها'],
  ['ecrba', 'Have you started eCRBA? Application reference and status only — never passwords', 'هل بدأت eCRBA؟ مرجع الطلب وحالته فقط — دون كلمات مرور'],
  ['passport', 'Are you also requesting the child’s U.S. passport? Yes/No', 'هل تطلب جوازًا أمريكيًا للطفل أيضًا؟ نعم/لا'],
  ['attendance', 'Can both parents attend with the child? Attendance arrangements', 'هل يستطيع الوالدان الحضور مع الطفل؟ ترتيبات الحضور'],
  ['absent', 'If a parent cannot attend: available affidavit, passport consent, custody order or death certificate', 'إن تعذّر حضور أحد الوالدين: الإفادة أو موافقة الجواز أو حكم الحضانة أو شهادة الوفاة المتاحة'],
  ['ssn', 'Separate Social Security number request? Yes/No; responsible SSA / Federal Benefits Unit', 'هل تطلب رقم ضمان اجتماعي بشكل منفصل؟ نعم/لا؛ جهة SSA / وحدة المزايا الفيدرالية المسؤولة'],
  ['travel', 'Planned international travel: dates and destination', 'السفر الدولي المخطط: التواريخ والوجهة'],
  ['instructions', 'Additional embassy instructions or correspondence received', 'تعليمات السفارة الإضافية أو المراسلات المستلمة'],
]);
const doc = (en: string, ar: string) => tx(en, ar);
const childDocs = [
  doc('Child Records — complete foreign birth certificate showing child and parents', 'سجلات الطفل — شهادة الميلاد الأجنبية كاملة بأسماء الطفل والوالدين'),
  doc('Child Records — foreign passport, if issued or requested by the post', 'سجلات الطفل — الجواز الأجنبي إن صدر أو طلبته السفارة'),
];
const parentDocs = [1, 2].flatMap((n) => [
  doc(`Parent ${n} — passport / government photo ID, both sides of ID cards`, `الوالد ${n} — الجواز / الهوية الحكومية المصورة ووجها بطاقة الهوية`),
  doc(`Parent ${n} — U.S. citizenship evidence, if applicable`, `الوالد ${n} — إثبات الجنسية الأمريكية إن انطبق`),
]);
const marriageDocs = [
  doc('Marriage / Parentage — parents’ marriage certificate, if applicable', 'الزواج / النسب — شهادة زواج الوالدين إن انطبق'),
  doc('Marriage / Parentage — prior marriage termination records for either parent, if applicable', 'الزواج / النسب — سجلات انتهاء الزيجات السابقة لأي والد إن انطبق'),
  doc('Marriage / Parentage — parentage acknowledgments, support declarations or court orders, if applicable', 'الزواج / النسب — إقرارات النسب والإعالة أو أحكام النسب إن انطبق'),
];
const presenceDocs = [1, 2].flatMap((n) => [
  doc(`U.S. Physical Presence — Parent ${n}: dated education / attendance / transcript records, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: سجلات الدراسة والحضور المؤرخة إن انطبق`),
  doc(`U.S. Physical Presence — Parent ${n}: employer letters, payroll and work records, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: خطابات العمل والرواتب وسجلات العمل إن انطبق`),
  doc(`U.S. Physical Presence — Parent ${n}: old/current passports, stamps and travel history, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: الجوازات القديمة والحالية والأختام وسجل السفر إن انطبق`),
  doc(`U.S. Physical Presence — Parent ${n}: dated medical / hospital records, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: سجلات العلاج والمستشفيات المؤرخة إن انطبق`),
  doc(`U.S. Physical Presence — Parent ${n}: tax, bank, lease, rent and utility records, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: الضرائب والبنوك والإيجار والمرافق إن انطبق`),
  doc(`U.S. Physical Presence — Parent ${n}: qualifying overseas service / dependent records, as applicable`, `التواجد الفعلي بأمريكا — الوالد ${n}: سجلات الخدمة المؤهلة بالخارج / المعالين إن انطبق`),
]);
const conditionalDocs = [
  doc('Conditional Documents — English translations meeting the post’s instructions', 'مستندات مشروطة — الترجمات الإنجليزية وفق تعليمات السفارة'),
  doc('Conditional Documents — legal name changes / spelling discrepancy explanations', 'مستندات مشروطة — تغيير الاسم القانوني / تفسير اختلافات التهجئة'),
  doc('Conditional Documents — custody, guardianship, parental death or notarized authorization records, if applicable', 'مستندات مشروطة — الحضانة أو الوصاية أو وفاة والد أو تفويض موثق إن انطبق'),
  doc('Conditional Documents — hospital, prenatal, delivery, assisted reproduction or surrogacy records, if requested', 'مستندات مشروطة — المستشفى والحمل والولادة والإنجاب المساعد والحمل البديل إن طُلبت'),
];
const appointmentDocs = [
  doc('Appointment Records — eCRBA confirmation, payment receipt, appointment confirmation and post checklist, as applicable', 'سجلات الموعد — تأكيد eCRBA وإيصال الدفع وتأكيد الموعد وقائمة السفارة إن انطبق'),
  doc('Appointment Records — previous refusal / additional-evidence requests and embassy correspondence, if any', 'سجلات الموعد — الرفض السابق / طلبات الأدلة الإضافية ومراسلات السفارة إن وجدت'),
];
const allQuestions = [...child, ...parents, ...marriage, ...presence, ...planning];
const allDocs = [...childDocs, ...parentDocs, ...marriageDocs, ...presenceDocs, ...conditionalDocs, ...appointmentDocs];
const application = (code: string, en: string, ar: string, questions: FormQuestion[], docs: FormRequirement['docs']): FormRequirement => ({ code, title: tx(en, ar), questions, docs });

// The supplied questionnaire is shared context, not an invented official per-form questionnaire.
export const crbaWorkflows: FormRequirement[] = [
  application('DS-2029', 'Application for Consular Report of Birth Abroad', 'طلب التقرير القنصلي للميلاد بالخارج', allQuestions, allDocs),
  application('DS-5507', 'Affidavit of Physical Presence or Residence, Parentage, and Support', 'إفادة التواجد الفعلي أو الإقامة والنسب والإعالة', [...child, ...parents, ...marriage, ...presence], [...childDocs, ...parentDocs, ...marriageDocs, ...presenceDocs, ...conditionalDocs]),
  application('DS-11', 'Application for a U.S. Passport', 'طلب جواز سفر أمريكي', [...child, ...parents, ...marriage, ...planning], [...childDocs, ...parentDocs, ...marriageDocs, ...conditionalDocs, ...appointmentDocs]),
  application('DS-3053', 'Statement of Consent for a minor’s passport', 'بيان الموافقة على جواز سفر قاصر', [...child, ...parents, ...planning], [...childDocs, ...parentDocs, ...conditionalDocs, ...appointmentDocs]),
  application('DS-5525', 'Statement of Exigent / Special Family Circumstances', 'بيان الظروف العائلية الطارئة / الخاصة', [...child, ...parents, ...marriage, ...planning], [...childDocs, ...parentDocs, ...marriageDocs, ...conditionalDocs, ...appointmentDocs]),
  application('SS-5-FS', 'Application for a Social Security Card outside the United States', 'طلب بطاقة ضمان اجتماعي خارج الولايات المتحدة', [...child, ...parents, ...planning], [...childDocs, ...parentDocs, ...conditionalDocs, ...appointmentDocs]),
  application('DS-5542', 'Request for a Consular Report of Birth Abroad — replacement / amendment', 'طلب تقرير قنصلي للميلاد بالخارج — بدل / تعديل', [...child, ...parents, ...marriage, ...planning], [...childDocs, ...parentDocs, ...marriageDocs, ...conditionalDocs, ...appointmentDocs]),
];