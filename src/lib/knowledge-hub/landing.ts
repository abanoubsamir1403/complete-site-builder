import { tx, type T } from "@/lib/i18n";
import type { KnowledgeSource } from "./types";
import { src } from "./helpers";

export type HubLandingBlock = { heading: T; paragraphs: T[] };

export const hubLandingTitle = tx("Welcome to the USCIS Knowledge Hub", "مرحبًا بك في مركز معرفة USCIS");

export const hubLandingBlocks: HubLandingBlock[] = [
  {
    heading: tx("Start with a clear purpose", "ابدأ بهدف واضح"),
    paragraphs: [
      tx(
        "Immigration paperwork becomes easier to manage when you know which agency handles your request, which documents support it, and what stage your case has reached. This hub explains common USCIS processes in plain English and connects you to official resources.",
        "تصبح أوراق الهجرة أسهل في الإدارة عندما تعرف أي جهة تتولى طلبك، وأي مستندات تدعمه، وأي مرحلة وصل إليها ملفك. يشرح هذا المركز إجراءات USCIS الشائعة بلغة واضحة ويربطك بالمصادر الرسمية.",
      ),
    ],
  },
  {
    heading: tx("Choose where to begin", "اختر من أين تبدأ"),
    paragraphs: [
      tx(
        "Browse the Forms Library if you already know your form number. Read a topic guide if you want to understand a process. Use a preparation checklist to organize potential evidence. Complete a questionnaire to record facts for a form you have selected. Use After Filing resources if you already have a receipt or notice.",
        "تصفّح مكتبة النماذج إذا كنت تعرف رقم النموذج. اقرأ دليل موضوع إذا أردت فهم إجراء. استخدم قائمة تحضير لتنظيم الأدلة المحتملة. أكمل استبيانًا لتسجيل الحقائق لنموذج اخترته. استخدم موارد «بعد التقديم» إذا كان لديك إيصال أو إشعار.",
      ),
    ],
  },
  {
    heading: tx("Using MIGRAFILE", "استخدام MIGRAFILE"),
    paragraphs: [
      tx(
        "Keep a separate record for each applicant and case. Before requesting preparation assistance, identify the form you want help with or seek legal advice about your options. Describe any uncertainties rather than guessing. A questionnaire records information; it does not decide which immigration benefit you qualify for.",
        "احتفظ بسجل منفصل لكل متقدم وملف. قبل طلب المساعدة في التحضير، حدّد النموذج الذي تريد المساعدة فيه أو اطلب استشارة قانونية حول خياراتك. صف أي شكوك بدل التخمين. الاستبيان يسجّل معلومات؛ ولا يقرر أي منفعة هجرية أنت مؤهل لها.",
      ),
      tx(
        "Next step: Open the guide that matches your existing request and read its official source before filing.",
        "الخطوة التالية: افتح الدليل الذي يطابق طلبك الحالي واقرأ مصدره الرسمي قبل التقديم.",
      ),
    ],
  },
];

export const hubLandingSources: KnowledgeSource[] = [
  src(tx("USCIS All Forms", "جميع نماذج USCIS"), "https://www.uscis.gov/forms/all-forms"),
  src(
    tx("USCIS Unauthorized Practice of Immigration Law Brochure", "كتيب USCIS حول ممارسة قانون الهجرة غير المصرح بها"),
    "https://www.uscis.gov/avoid-scams/unauthorized-practice-of-immigration-law",
  ),
];

export const hubQuickLinks: { label: T; to: string }[] = [
  { label: tx("Forms Library", "مكتبة النماذج"), to: "/forms" },
  { label: tx("Official resources", "المصادر الرسمية"), to: "/resources" },
  { label: tx("Track a case", "متابعة ملف"), to: "/track" },
];
