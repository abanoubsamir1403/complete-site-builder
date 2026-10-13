import { supabase } from "@/integrations/supabase/client";
import { tx, type T } from "./i18n";
import { formatUsTime } from "./timezone";
import {
  saveAppointmentServerFn,
  listAppointmentsServerFn,
  updateAppointmentServerFn,
  deleteAppointmentServerFn,
} from "./interview.functions";

export type CommMethod = "whatsapp" | "google_meet" | "zoom" | "teams" | "telegram" | "other";

export type InterviewStatus = "upcoming" | "confirmed" | "link_sent" | "completed" | "cancelled";

export type InterviewAppointment = {
  id: string;
  reference: string;
  client_id: string | null;
  client_name: string;
  client_email: string;
  communication_method: CommMethod;
  custom_method_name?: string | null;
  contact_detail: string;
  scheduled_at: string; // ISO UTC
  us_timezone: string;
  us_time_slot: string;
  topic: string;
  notes?: string | null;
  case_reference?: string | null;
  status: InterviewStatus;
  video_link?: string | null;
  staff_notes?: string | null;
  created_at: string;
  updated_at: string;
};

export type CommMethodConfig = {
  id: CommMethod;
  name: T;
  inputLabel: T;
  placeholder: string;
  inputType: "tel" | "email" | "text";
  helpText: T;
  example: string;
  icon: string; // identifier
};

export const COMMUNICATION_METHODS: CommMethodConfig[] = [
  {
    id: "whatsapp",
    name: tx("WhatsApp", "واتساب"),
    inputLabel: tx("WhatsApp Number (with country code)", "رقم الواتساب (مع كود الدولة)"),
    placeholder: "+20 101 234 5678 / +1 234 567 8900",
    inputType: "tel",
    helpText: tx(
      "We will send the video call link to this WhatsApp number before your scheduled interview.",
      "سنرسل رابط مكالمة الفيديو مباشرة إلى رقم الواتساب هذا قبل موعد المقابلة المحدد.",
    ),
    example: "+20 1012345678",
    icon: "whatsapp",
  },
  {
    id: "google_meet",
    name: tx("Google Meet", "Google Meet (جوجل ميت)"),
    inputLabel: tx("Google Account / Gmail Address", "البريد الإلكتروني لحساب جوجل (Gmail)"),
    placeholder: "name@gmail.com",
    inputType: "email",
    helpText: tx(
      "We will send the Google Meet calendar invite and meeting link to this email.",
      "سنرسل دعوة التقويم ورابط جلسة Google Meet إلى هذا البريد الإلكتروني.",
    ),
    example: "user@gmail.com",
    icon: "video",
  },
  {
    id: "zoom",
    name: tx("Zoom", "Zoom (زووم)"),
    inputLabel: tx("Zoom Email or Phone", "البريد الإلكتروني أو الهاتف المسجل بزووم"),
    placeholder: "name@example.com / +20...",
    inputType: "text",
    helpText: tx(
      "We will send the Zoom meeting URL and access code to this account.",
      "سنرسل رابط جلسة زووم ورمز الدخول إلى هذا الحساب قبل الموعد.",
    ),
    example: "name@example.com",
    icon: "video",
  },
  {
    id: "teams",
    name: tx("Microsoft Teams", "Microsoft Teams (تيمز)"),
    inputLabel: tx("Microsoft Account Email", "البريد الإلكتروني لحساب مايكروسوفت"),
    placeholder: "name@outlook.com",
    inputType: "email",
    helpText: tx(
      "We will send the Teams meeting invitation to this Microsoft address.",
      "سنرسل دعوة اجتماع تيمز إلى هذا البريد الإلكتروني.",
    ),
    example: "name@outlook.com",
    icon: "video",
  },
  {
    id: "telegram",
    name: tx("Telegram", "Telegram (تيليجرام)"),
    inputLabel: tx(
      "Telegram Username (@user) or Phone",
      "معرّف تيليجرام (@username) أو رقم الهاتف",
    ),
    placeholder: "@username or +20 10...",
    inputType: "text",
    helpText: tx(
      "We will reach out and send the video call link via Telegram.",
      "سنتواصل معك ونرسل رابط مكالمة الفيديو عبر تيليجرام قبل الموعد.",
    ),
    example: "@john_doe",
    icon: "send",
  },
  {
    id: "other",
    name: tx("Other method", "وسيلة تواصل أخرى"),
    inputLabel: tx("Account, handle, or contact details", "بيانات الحساب أو الرقم أو الرابط"),
    placeholder: "e.g. Signal +20..., Skype live:username",
    inputType: "text",
    helpText: tx(
      "Please enter the application name and exact contact info so we can reach you.",
      "يرجى توضيح اسم التطبيق وبيانات الاتصال الدقيقة لنتمكن من إرسال رابط المقابلة.",
    ),
    example: "Signal: +20 100 000 0000",
    icon: "message",
  },
];

export const INTERVIEW_TOPICS: { id: string; label: T }[] = [
  {
    id: "general_consultation",
    label: tx(
      "Document Preparation and Organization Inquiry",
      "استفسار عن إعداد المستندات وتنظيمها",
    ),
  },
  {
    id: "embassy_prep",
    label: tx("Consular Appointment File Organization", "تنظيم ملف الموعد القنصلي"),
  },
  {
    id: "nvc_review",
    label: tx("NVC Document Organization Inquiry", "استفسار عن تنظيم مستندات NVC"),
  },
  {
    id: "crba_consultation",
    label: tx("CRBA (Consular Report of Birth Abroad)", "استفسار عن تنظيم سجلات CRBA"),
  },
  {
    id: "case_review",
    label: tx("Administrative Case Tracking Inquiry", "استفسار عن المتابعة الإدارية للملف"),
  },
  { id: "other", label: tx("Other Inquiry", "استفسار آخر") },
];

export const STATUS_LABELS: Record<InterviewStatus, { label: T; badge: string }> = {
  upcoming: {
    label: tx("Upcoming", "قادمة"),
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  confirmed: {
    label: tx("Confirmed", "مؤكدة"),
    badge: "bg-accent/15 text-accent border-accent/30",
  },
  link_sent: {
    label: tx("Link Sent", "تم إرسال الرابط"),
    badge: "bg-gold/20 text-foreground border-gold/40",
  },
  completed: {
    label: tx("Completed", "مكتملة"),
    badge: "bg-status-green/15 text-status-green border-status-green/30",
  },
  cancelled: {
    label: tx("Cancelled", "ملغية"),
    badge: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

export type CreateAppointmentInput = {
  client_id?: string | null;
  client_name: string;
  client_email: string;
  communication_method: CommMethod;
  custom_method_name?: string | null;
  contact_detail: string;
  scheduled_at: string; // ISO UTC
  us_timezone?: string;
  us_time_slot: string;
  topic?: string;
  notes?: string | null;
  case_reference?: string | null;
};

/**
 * Creates a new interview appointment.
 * Inserts directly into Supabase `interview_appointments` table.
 */
export async function createInterviewAppointment(
  input: CreateAppointmentInput,
): Promise<InterviewAppointment> {
  const isValidUuid = (val?: string | null) =>
    typeof val === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val.trim());

  const clientId = isValidUuid(input.client_id) ? input.client_id!.trim() : null;

  // 1. Save centrally on server via Server Function
  try {
    const res = await saveAppointmentServerFn({ data: input });
    if (res && res.id) {
      return res;
    }
  } catch (err) {
    console.warn("ServerFn save failed, attempting direct Supabase fallback:", err);
  }

  // 2. Direct Supabase fallback
  const reference = "IV-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const payload: any = {
    reference,
    client_id: clientId,
    client_name: input.client_name.trim(),
    client_email: input.client_email.trim().toLowerCase(),
    communication_method: input.communication_method,
    custom_method_name: input.custom_method_name?.trim() || null,
    contact_detail: input.contact_detail.trim(),
    scheduled_at: input.scheduled_at,
    us_timezone: input.us_timezone || "America/New_York",
    us_time_slot: input.us_time_slot,
    topic: input.topic || "general_consultation",
    notes: input.notes?.trim() || null,
    case_reference: input.case_reference?.trim() || null,
    status: "upcoming",
  };

  const { data, error } = await (supabase.from("interview_appointments") as any)
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Direct Supabase insert error:", error);
    throw new Error(error.message || "Failed to schedule appointment in Supabase");
  }

  return data as InterviewAppointment;
}

/**
 * Retrieves all interview appointments directly from Supabase.
 */
export async function fetchInterviewAppointments(): Promise<InterviewAppointment[]> {
  // 1. Fetch centrally from server via Server Function
  try {
    const serverList = await listAppointmentsServerFn();
    if (Array.isArray(serverList)) {
      return serverList;
    }
  } catch (err) {
    console.warn("ServerFn list failed, attempting direct Supabase query:", err);
  }

  // 2. Direct Supabase query
  const { data, error } = await (supabase.from("interview_appointments") as any)
    .select("*")
    .order("scheduled_at", { ascending: true });

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message || "Failed to fetch appointments from Supabase");
  }

  return (data || []) as InterviewAppointment[];
}

/**
 * Updates an appointment (status, video meeting link, staff notes) directly in Supabase.
 */
export async function updateInterviewAppointment(
  id: string,
  patch: Partial<Pick<InterviewAppointment, "status" | "video_link" | "staff_notes">>,
): Promise<void> {
  const now = new Date().toISOString();

  try {
    await updateAppointmentServerFn({ data: { id, patch } });
    return;
  } catch (err) {
    console.warn("ServerFn update error, trying direct Supabase update:", err);
  }

  const { error } = await (supabase.from("interview_appointments") as any)
    .update({ ...patch, updated_at: now })
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to update appointment in Supabase");
  }
}

/**
 * Deletes an interview appointment directly from Supabase.
 */
export async function deleteInterviewAppointment(id: string): Promise<void> {
  try {
    await deleteAppointmentServerFn({ data: { id } });
    return;
  } catch (err) {
    console.warn("ServerFn delete error, trying direct Supabase delete:", err);
  }

  const { error } = await (supabase.from("interview_appointments") as any).delete().eq("id", id);

  if (error) {
    throw new Error(error.message || "Failed to delete appointment in Supabase");
  }
}

/**
 * Helper to generate a direct WhatsApp click-to-chat URL with a pre-filled Arabic message.
 */
export function buildWhatsAppChatUrl(apt: InterviewAppointment, isAr = true): string {
  // Clean phone number: remove spaces, dashes, parentheses
  const cleanPhone = apt.contact_detail.replace(/[^0-9]/g, "");
  const usTime = formatUsTime(apt.scheduled_at, apt.us_timezone, isAr ? "ar-EG" : "en-US");

  const meetingLine = apt.video_link
    ? `\nرابط مكالمة الفيديو (Video Call Link):\n${apt.video_link}\n`
    : "";

  const text = isAr
    ? `مرحبًا ${apt.client_name}، تحياتنا من فريق MIGRAFILE.\nنود تذكيرك بموعد المقابلة الشخصية (فيديو كول) المحددة:\n📅 التاريخ والوقت: ${usTime.full}\n📌 كود الموعد: ${apt.reference}${meetingLine}\nيرجى تأكيد حضورك، ونتمنى لك التوفيق.`
    : `Hello ${apt.client_name}, greetings from MIGRAFILE.\nThis is a reminder for your scheduled administrative documentation video call:\n📅 Date and time: ${usTime.full}\n📌 Reference: ${apt.reference}${meetingLine}\nPlease let us know if you have any questions.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Helper to generate a pre-filled mailto URL for sending meeting link via email.
 */
export function buildEmailInviteUrl(apt: InterviewAppointment, isAr = true): string {
  const recipient =
    apt.communication_method === "google_meet" || apt.communication_method === "teams"
      ? apt.contact_detail
      : apt.client_email;

  const usTime = formatUsTime(apt.scheduled_at, apt.us_timezone, isAr ? "ar-EG" : "en-US");

  const subject = isAr
    ? `MIGRAFILE: مكالمة توثيق إدارية (${apt.reference}) - رابط مكالمة الفيديو`
    : `MIGRAFILE: Administrative Documentation Call (${apt.reference})`;

  const meetingLine = apt.video_link
    ? `\nرابط المكالمة (Video Call Link):\n${apt.video_link}\n`
    : "\nسيتم تزويدك برابط المكالمة قبل الموعد.\n";

  const body = isAr
    ? `عزيزي/عزيزتي ${apt.client_name}،\n\nتحياتنا من فريق MIGRAFILE.\nبخصوص مكالمة التوثيق الإدارية المجدولة:\n\n• كود الموعد: ${apt.reference}\n• التاريخ والوقت: ${usTime.full}\n• وسيلة التواصل المحددة: ${apt.communication_method} (${apt.contact_detail})\n${meetingLine}\nنتطلع للتواصل معكم في الموعد المحدد.\n\nفريق MIGRAFILE`
    : `Dear ${apt.client_name},\n\nGreetings from MIGRAFILE.\nRegarding your scheduled administrative documentation call:\n\n• Reference: ${apt.reference}\n• Date and time: ${usTime.full}\n• Contact Method: ${apt.communication_method} (${apt.contact_detail})\n${meetingLine}\nBest regards,\nMIGRAFILE Team`;

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
