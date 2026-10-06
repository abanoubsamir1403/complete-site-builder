import { tx, type T } from "@/lib/i18n";

export const DECLARATION_VERSION = "v1";

export const declarationTitle: T = tx("Client Declaration & Undertaking", "إقرار وتعهد العميل");

export const declarationClauses: T[] = [
  tx("I personally selected this service and the form(s) in this file, of my own free choice. MIGRAFILE did not choose, recommend or advise on any visa, form or immigration route for me.",
    "أقر بأنني اخترت هذه الخدمة والنموذج/النماذج الواردة في هذا الملف بنفسي وبكامل إرادتي، وأن MIGRAFILE لم تختر أو توصِ أو تنصحني بأي تأشيرة أو نموذج أو مسار هجرة."),
  tx("All answers I provided and every document I upload to this file were provided by me personally.",
    "أقر بأن جميع الإجابات التي قدمتها وجميع المستندات التي أرفعها على هذا الملف مقدمة مني شخصيًا."),
  tx("I declare that all information and documents are true, accurate, complete and genuine, and not altered or forged.",
    "أقر بأن جميع المعلومات والمستندات صحيحة ودقيقة وكاملة وأصلية، وغير معدّلة أو مزورة."),
  tx("I alone am fully responsible for the accuracy and authenticity of this information and documents and for any consequence arising from them. MIGRAFILE bears no responsibility for them.",
    "أتحمل وحدي المسؤولية الكاملة عن صحة هذه المعلومات والمستندات وأصالتها وعن أي نتائج تترتب عليها، ولا تتحمل MIGRAFILE أي مسؤولية عنها."),
  tx("I understand MIGRAFILE provides documentation organization services only — not legal advice — and is not affiliated with USCIS, NVC or the U.S. Department of State, and does not guarantee any outcome.",
    "أفهم أن MIGRAFILE تقدم خدمات تنظيم وتوثيق مستندات فقط وليست استشارة قانونية، وأنها غير تابعة لـ USCIS أو NVC أو وزارة الخارجية الأمريكية، ولا تضمن أي نتيجة."),
];

export type Declaration = { version: string; name: string; lang: "en" | "ar"; clauses: string[] };
