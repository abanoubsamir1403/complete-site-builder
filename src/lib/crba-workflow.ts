// CRBA service intake is limited to client-directed record organization and chronology transcription.
import type { FormRequirement } from "./form-requirements";
import { tx } from "./i18n";

const organizationQuestions = [
  {
    id: "record_index",
    q: tx(
      "List only records you selected, your authorized counsel identified, or an explicit official checklist names. We organize records by your instructions and do not determine what proves eligibility or whether evidence is legally sufficient.",
      "اذكر فقط السجلات التي اخترتها أو حددها محاميك المخوّل أو وردت في قائمة رسمية صريحة. ننظم السجلات وفق تعليماتك ولا نحدد ما يثبت الأهلية أو ما إذا كانت الأدلة كافية قانونيًا.",
    ),
    type: "textarea",
  },
  {
    id: "chronology",
    q: tx(
      "Provide the chronology exactly as you want it transcribed, including dates and source records. Mark estimates or unknown dates as such. MIGRAFILE does not assess citizenship transmission, required residence, or qualifying physical presence.",
      "قدم التسلسل الزمني بالطريقة التي تريد نسخه بها حرفيًا، بما يشمل التواريخ والسجلات المصدرية. وضح التواريخ التقديرية أو غير المعروفة. لا تقيّم MIGRAFILE انتقال الجنسية أو الإقامة المطلوبة أو التواجد الفعلي المؤهل.",
    ),
    type: "textarea",
  },
] satisfies FormRequirement["questions"];

const application = (code: string, en: string, ar: string): FormRequirement => ({
  code,
  title: tx(en, ar),
  questions: organizationQuestions,
  docs: [],
});

export const crbaWorkflows: FormRequirement[] = [
  application("DS-2029", "Application for Consular Report of Birth Abroad", "طلب التقرير القنصلي للميلاد بالخارج"),
  application("DS-5507", "Affidavit of Physical Presence or Residence, Parentage, and Support", "إفادة التواجد الفعلي أو الإقامة والنسب والإعالة"),
  application("DS-11", "Application for a U.S. Passport", "طلب جواز سفر أمريكي"),
  application("DS-3053", "Statement of Consent for a minor’s passport", "بيان الموافقة على جواز سفر قاصر"),
  application("DS-5525", "Statement of Exigent / Special Family Circumstances", "بيان الظروف العائلية الطارئة / الخاصة"),
  application("SS-5-FS", "Application for a Social Security Card outside the United States", "طلب بطاقة ضمان اجتماعي خارج الولايات المتحدة"),
  application("DS-5542", "Request for a Consular Report of Birth Abroad — replacement / amendment", "طلب تقرير قنصلي للميلاد بالخارج — بدل / تعديل"),
];
