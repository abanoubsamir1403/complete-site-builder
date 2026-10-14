import { supabase } from "@/integrations/supabase/client";
import {
  logClientActivityServerFn,
  listStaffActivityServerFn,
  fetchStaffClientsMapServerFn,
  type ClientActivityItem,
  type StaffClientInfo,
} from "./notifications.functions";
import type { Database } from "@/integrations/supabase/types";

type Stage = Database["public"]["Enums"]["case_stage"];
type DocStatus = Database["public"]["Enums"]["doc_status"];

export {
  listStaffActivityServerFn,
  fetchStaffClientsMapServerFn,
  type ClientActivityItem,
  type StaffClientInfo,
};

/**
 * Stage translation and descriptions for automated client notices
 */
const STAGE_NOTICES: Record<
  string,
  { title: { en: string; ar: string }; body: { en: string; ar: string } }
> = {
  pending_payment: {
    title: {
      en: "Case Accepted — Service Fee Payment",
      ar: "تم قبول الملف — سداد رسوم الخدمة",
    },
    body: {
      en: "Your case has been accepted by our specialists. Please review the quoted service fee and complete the payment to start processing.",
      ar: "تمت مراجعة ملفك وقبوله من قبل المتخصصين. يرجى مراجعة رسوم الخدمة وإتمام السداد لبدء المعالجة الفعلية.",
    },
  },
  payment_verification: {
    title: {
      en: "Payment Receipt Submitted",
      ar: "تم إرسال إيصال السداد",
    },
    body: {
      en: "We received your payment transfer receipt. Our team is verifying it and will confirm processing shortly.",
      ar: "استلمنا إيصال تحويل الرسوم. يجري التحقق منه وسنؤكد بدء المعالجة في أقرب وقت.",
    },
  },
  documents: {
    title: {
      en: "Payment Confirmed — Document Preparation Started",
      ar: "تم تأكيد السداد — بدأ العمل على المستندات",
    },
    body: {
      en: "Your payment has been verified and confirmed! Your case is now in active preparation. Please review your checklist and upload any remaining required documents.",
      ar: "تم التحقق من إيصال السداد واعتماده بنجاح! بدأ العمل الفعلي على ملفك. يرجى مراجعة قائمة المستندات ورفع أي ملفات متبقية.",
    },
  },
  review: {
    title: {
      en: "Case Stage: Specialist Review",
      ar: "حالة الملف: مرحلة المراجعة الفنية",
    },
    body: {
      en: "Your case documentation is currently undergoing thorough review and quality inspection by our senior specialists.",
      ar: "تخضع وثائق ملفك حاليًا للمراجعة الفنية الشاملة وفحص الجودة من قبل كبار المتخصصين.",
    },
  },
  translation: {
    title: {
      en: "Case Stage: Certified Translation",
      ar: "حالة الملف: مرحلة الترجمة المعتمدة",
    },
    body: {
      en: "Your supporting documents are currently being processed for certified professional translation and formatting.",
      ar: "تخضع المستندات الداعمة حاليًا للترجمة المعتمدة والتنسيق الرسمي.",
    },
  },
  assembly: {
    title: {
      en: "Case Stage: Packet Assembly",
      ar: "حالة الملف: مرحلة التجميع النهائي",
    },
    body: {
      en: "All forms and certified translations are being compiled into a complete, organized documentation package.",
      ar: "يجري تجميع كافة النماذج والمستندات المترجمة في حزمة توثيقية نهائية متكاملة ومنظمة.",
    },
  },
  complete: {
    title: {
      en: "Case Completed Successfully! 🎉",
      ar: "تم اكتمال الملف بنجاح! 🎉",
    },
    body: {
      en: "All documentation organization, preparation, and translation for your file have been completed successfully.",
      ar: "تم الانتهاء من جميع إجراءات التنظيم والترجمة والتجهيز التوثيقي لملفك بنجاح تام.",
    },
  },
  rejected: {
    title: {
      en: "Case Status: Not Accepted",
      ar: "حالة الملف: لم يتم القبول",
    },
    body: {
      en: "Unfortunately, we cannot accept your case at this time. If you have questions, you may book a private documentation consultation.",
      ar: "للأسف، لا يمكننا قبول ملفك في الوقت الحالي. إذا كانت لديك أسئلة، يمكنك حجز مكالمة خاصة لتنظيم المستندات.",
    },
  },
};

/**
 * Creates an automated notice in case_notices for the client when staff updates case stage
 */
export async function notifyClientOfStageChange(
  caseId: string,
  newStage: Stage,
  serviceFee?: number | null,
) {
  const config = STAGE_NOTICES[newStage];
  let title = config
    ? `${config.title.ar} | ${config.title.en}`
    : `تحديث حالة الملف | Case Stage Updated (${newStage})`;

  let body = config
    ? `${config.body.ar}\n\n${config.body.en}`
    : `تم تحديث مرحلة الملف إلى: ${newStage}\nCase stage updated to: ${newStage}`;

  if (newStage === "pending_payment" && serviceFee) {
    title = `تم قبول الملف — رسوم الخدمة: $${serviceFee} | Case Accepted ($${serviceFee})`;
    body = `تمت مراجعة ملفك وقبوله برسم خدمة $${serviceFee}. يرجى إتمام السداد عبر Apple Pay أو Zelle ورفع الإيصال.\n\nYour case has been accepted with a quoted service fee of $${serviceFee}. Please complete transfer and upload receipt.`;
  }

  try {
    const { error } = await supabase.from("case_notices").insert({
      case_id: caseId,
      title,
      body,
    });
    if (error) console.error("Error creating stage notice for client:", error);
  } catch (err) {
    console.error("Exception creating stage notice:", err);
  }
}

/**
 * Creates an automated notice in case_notices when staff updates a document's status or note
 */
export async function notifyClientOfDocStatusChange(
  caseId: string,
  docLabel: string,
  status: DocStatus,
  staffNote?: string | null,
) {
  let title = "";
  let body = "";

  if (status === "needs_attention") {
    title = `⚠️ مستند يحتاج استكمال: ${docLabel} | Document Needs Attention`;
    body = `يحتاج المستند (${docLabel}) إلى استكمال أو إعادة رفع.${
      staffNote ? `\nملاحظة المتخصص: "${staffNote}"` : ""
    }\n\nPlease review or re-upload "${docLabel}".${
      staffNote ? ` Specialist note: "${staffNote}"` : ""
    }`;
  } else if (status === "accepted") {
    title = `✓ تم قبول المستند: ${docLabel} | Document Accepted`;
    body = `تم فحص وقبول المستند (${docLabel}) بنجاح واستيفاء كافة الشروط.${
      staffNote ? `\nملاحظة: "${staffNote}"` : ""
    }\n\n"${docLabel}" has been verified and accepted.`;
  } else if (status === "under_review") {
    title = `مستند قيد المراجعة: ${docLabel} | Document Under Review`;
    body = `المستند (${docLabel}) قيد الفحص والمراجعة حاليًا من قبل المتخصصين.\n\n"${docLabel}" is currently under review.`;
  } else {
    title = `تحديث مستند: ${docLabel} (${status}) | Document Updated`;
    body = `تم تحديث حالة المستند (${docLabel}) إلى "${status}".${
      staffNote ? `\nملاحظة: ${staffNote}` : ""
    }`;
  }

  try {
    const { error } = await supabase.from("case_notices").insert({
      case_id: caseId,
      title,
      body,
    });
    if (error) console.error("Error creating doc notice for client:", error);
  } catch (err) {
    console.error("Exception creating doc notice:", err);
  }
}

/**
 * Creates an automated notice when staff requests a new document in the checklist
 */
export async function notifyClientOfDocRequest(caseId: string, docLabel: string) {
  const title = `طلب مستند جديد: ${docLabel} | New Document Requested`;
  const body = `طلب فريق المتخصصين مستندًا إضافيًا لملفك: "${docLabel}". يرجى الدخول إلى قائمة المستندات ورفعه.\n\nA new document has been requested: "${docLabel}". Please upload it in your document checklist.`;

  try {
    const { error } = await supabase.from("case_notices").insert({
      case_id: caseId,
      title,
      body,
    });
    if (error) console.error("Error creating doc request notice:", error);
  } catch (err) {
    console.error("Exception creating doc request notice:", err);
  }
}

/**
 * Client-to-Staff Alert: Notify staff when client uploads or replaces a document
 */
export async function notifyStaffOfDocUpload(params: {
  caseId: string;
  reference: string;
  clientName: string;
  clientEmail?: string | null;
  actorId?: string | null;
  docLabel: string;
  fileName: string;
  isReplacement: boolean;
}) {
  try {
    await logClientActivityServerFn({
      data: {
        action: params.isReplacement ? "client.replace_doc" : "client.upload_doc",
        target: params.reference,
        actor_id: params.actorId || null,
        client_name: params.clientName,
        client_email: params.clientEmail || null,
        details: {
          case_id: params.caseId,
          reference: params.reference,
          doc_label: params.docLabel,
          file_name: params.fileName,
          is_replacement: params.isReplacement,
        },
      },
    });
  } catch (err) {
    console.error("Failed to notify staff of doc upload:", err);
  }
}

/**
 * Client-to-Staff Alert: Notify staff when client uploads a payment receipt
 */
export async function notifyStaffOfPaymentUpload(params: {
  caseId: string;
  reference: string;
  clientName: string;
  clientEmail?: string | null;
  actorId?: string | null;
  amount?: number | null;
  filePath: string;
}) {
  try {
    await logClientActivityServerFn({
      data: {
        action: "client.upload_payment",
        target: params.reference,
        actor_id: params.actorId || null,
        client_name: params.clientName,
        client_email: params.clientEmail || null,
        details: {
          case_id: params.caseId,
          reference: params.reference,
          amount: params.amount ?? undefined,
          file_path: params.filePath,
        },
      },
    });
  } catch (err) {
    console.error("Failed to notify staff of payment upload:", err);
  }
}

/**
 * Client-to-Staff Alert: Notify staff when client submits a new case
 */
export async function notifyStaffOfNewCase(params: {
  caseId: string;
  reference: string;
  clientName: string;
  clientEmail?: string | null;
  actorId?: string | null;
  serviceTitle: string;
  formCode?: string | null;
}) {
  try {
    await logClientActivityServerFn({
      data: {
        action: "client.new_case",
        target: params.reference,
        actor_id: params.actorId || null,
        client_name: params.clientName,
        client_email: params.clientEmail || null,
        details: {
          case_id: params.caseId,
          reference: params.reference,
          service_title: params.serviceTitle,
          form_code: params.formCode ?? undefined,
        },
      },
    });
  } catch (err) {
    console.error("Failed to notify staff of new case:", err);
  }
}

/**
 * Mark a single notice as read by client
 */
export async function markNoticeAsRead(noticeId: string): Promise<boolean> {
  const { error } = await supabase
    .from("case_notices")
    .update({ read_at: new Date().toISOString() })
    .eq("id", noticeId);
  return !error;
}

/**
 * Mark all unread notices for a case as read
 */
export async function markAllCaseNoticesAsRead(caseId: string): Promise<boolean> {
  const { error } = await supabase
    .from("case_notices")
    .update({ read_at: new Date().toISOString() })
    .eq("case_id", caseId)
    .is("read_at", null);
  return !error;
}
