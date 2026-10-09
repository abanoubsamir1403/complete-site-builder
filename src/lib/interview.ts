import { supabase } from "@/integrations/supabase/client";
import { tx, type T } from "./i18n";
import { formatEgyptTime, formatUsTime } from "./timezone";
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
    inputLabel: tx("Telegram Username (@user) or Phone", "معرّف تيليجرام (@username) أو رقم الهاتف"),
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
  { id: "general_consultation", label: tx("General Immigration Consultation", "استشارة هجرة عامة") },
  { id: "other_services", label: tx("MigraFile Other Services (Legal, Business, Personal Documents)", "خدمات MigraFile الأخرى (عقود، إقرارات، ووثائق رسمية)") },
  { id: "embassy_prep", label: tx("Consular / Embassy Interview Preparation", "التحضير لمقابلة السفارة والقنصلية") },
  { id: "nvc_review", label: tx("NVC Stage & Document Review", "مراجعة مرحلة ومستندات NVC") },
  { id: "crba_consultation", label: tx("CRBA (Consular Report of Birth Abroad)", "استفسار ومستندات شهادة الميلاد الأمريكية (CRBA)") },
  { id: "case_review", label: tx("Existing Case Status Review", "مراجعة ومتابعة حالة ملف قائم") },
  { id: "other", label: tx("Other Inquiry", "استفسار آخر") },
];

export const STATUS_LABELS: Record<InterviewStatus, { label: T; badge: string }> = {
  upcoming: { label: tx("Upcoming", "قادمة"), badge: "bg-primary/10 text-primary border-primary/20" },
  confirmed: { label: tx("Confirmed", "مؤكدة"), badge: "bg-accent/15 text-accent border-accent/30" },
  link_sent: { label: tx("Link Sent", "تم إرسال الرابط"), badge: "bg-gold/20 text-foreground border-gold/40" },
  completed: { label: tx("Completed", "مكتملة"), badge: "bg-status-green/15 text-status-green border-status-green/30" },
  cancelled: { label: tx("Cancelled", "ملغية"), badge: "bg-destructive/15 text-destructive border-destructive/30" },
};

// Fallback storage key for local persistence when remote Supabase table is not yet migrated
const LOCAL_STORAGE_KEY = "mf_interview_appointments_store";

function getLocalStore(): InterviewAppointment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalStore(items: InterviewAppointment[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Local store error:", e);
  }
}

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
 * Inserts into Supabase `interview_appointments` table,
 * and falls back to local storage if Supabase table is not yet created.
 */
export async function createInterviewAppointment(input: CreateAppointmentInput): Promise<InterviewAppointment> {
  const reference = "IV-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const id = crypto.randomUUID ? crypto.randomUUID() : "iv-" + Date.now();
  const now = new Date().toISOString();

  const record: InterviewAppointment = {
    id,
    reference,
    client_id: input.client_id ?? null,
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
    video_link: null,
    staff_notes: null,
    created_at: now,
    updated_at: now,
  };

  // 1. Save centrally on server via Server Function
  try {
    const res = await saveAppointmentServerFn({ data: input });
    if (res && res.id) {
      const list = getLocalStore();
      list.unshift(res);
      saveLocalStore(list);
      return res;
    }
  } catch (err) {
    console.warn("ServerFn save failed, attempting Supabase/local fallback:", err);
  }

  // 2. Direct Supabase fallback
  try {
    const { data, error } = await (supabase.from("interview_appointments") as any)
      .insert(record)
      .select()
      .single();

    if (!error && data) {
      const list = getLocalStore();
      list.unshift(data as InterviewAppointment);
      saveLocalStore(list);
      return data as InterviewAppointment;
    }
  } catch {
    // continue
  }

  // 3. Local storage fallback
  const list = getLocalStore();
  list.unshift(record);
  saveLocalStore(list);
  return record;
}

/**
 * Retrieves all interview appointments.
 */
export async function fetchInterviewAppointments(): Promise<InterviewAppointment[]> {
  // 1. Fetch centrally from server via Server Function
  try {
    const serverList = await listAppointmentsServerFn();
    if (Array.isArray(serverList)) {
      // Merge with any local cache that may not have synced yet
      const local = getLocalStore();
      const idMap = new Map<string, InterviewAppointment>();
      for (const item of serverList) idMap.set(item.id, item);
      for (const item of local) {
        if (!idMap.has(item.id)) idMap.set(item.id, item);
      }
      const merged = Array.from(idMap.values()).sort(
        (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
      );
      saveLocalStore(merged);
      return merged;
    }
  } catch (err) {
    console.warn("ServerFn list failed, attempting Supabase/local fallback:", err);
  }

  // 2. Direct Supabase fallback
  try {
    const { data, error } = await (supabase.from("interview_appointments") as any)
      .select("*")
      .order("scheduled_at", { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      saveLocalStore(data as InterviewAppointment[]);
      return data as InterviewAppointment[];
    }
  } catch {
    // continue
  }

  // 3. Local store fallback
  return getLocalStore();
}

/**
 * Updates an appointment (status, video meeting link, staff notes).
 */
export async function updateInterviewAppointment(
  id: string,
  patch: Partial<Pick<InterviewAppointment, "status" | "video_link" | "staff_notes">>,
): Promise<void> {
  const now = new Date().toISOString();

  try {
    await updateAppointmentServerFn({ data: { id, patch } });
  } catch (err) {
    console.warn("ServerFn update error:", err);
  }

  try {
    await (supabase.from("interview_appointments") as any)
      .update({ ...patch, updated_at: now })
      .eq("id", id);
  } catch {
    // continue
  }

  // Update local cache
  const list = getLocalStore().map((item) => {
    if (item.id === id) {
      return { ...item, ...patch, updated_at: now };
    }
    return item;
  });
  saveLocalStore(list);
}

/**
 * Deletes an interview appointment.
 */
export async function deleteInterviewAppointment(id: string): Promise<void> {
  try {
    await deleteAppointmentServerFn({ data: { id } });
  } catch (err) {
    console.warn("ServerFn delete error:", err);
  }

  try {
    await (supabase.from("interview_appointments") as any).delete().eq("id", id);
  } catch {
    // continue
  }

  const list = getLocalStore().filter((item) => item.id !== id);
  saveLocalStore(list);
}

/**
 * Helper to generate a direct WhatsApp click-to-chat URL with a pre-filled Arabic message.
 */
export function buildWhatsAppChatUrl(apt: InterviewAppointment, isAr = true): string {
  // Clean phone number: remove spaces, dashes, parentheses
  const cleanPhone = apt.contact_detail.replace(/[^0-9]/g, "");
  const egTime = formatEgyptTime(apt.scheduled_at, isAr ? "ar-EG" : "en-US");
  const usTime = formatUsTime(apt.scheduled_at, apt.us_timezone, isAr ? "ar-EG" : "en-US");

  const meetingLine = apt.video_link
    ? `\nرابط مكالمة الفيديو (Video Call Link):\n${apt.video_link}\n`
    : "";

  const text = isAr
    ? `مرحبًا ${apt.client_name}، تحياتنا من فريق MIGRAFILE.\nنود تذكيرك بموعد المقابلة الشخصية (فيديو كول) المحددة:\n📅 التاريخ: ${egTime.date}\n⏰ التوقيت بمصر: ${egTime.time} (يعادل ${usTime.time} بتوقيت أمريكا)\n📌 كود الموعد: ${apt.reference}${meetingLine}\nيرجى تأكيد حضورك، ونتمنى لك التوفيق.`
    : `Hello ${apt.client_name}, Greetings from MIGRAFILE.\nThis is a reminder for your scheduled video interview:\n📅 Date: ${egTime.date}\n⏰ Egypt Time: ${egTime.time} (${usTime.time} US Time)\n📌 Reference: ${apt.reference}${meetingLine}\nPlease let us know if you have any questions.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Helper to generate a pre-filled mailto URL for sending meeting link via email.
 */
export function buildEmailInviteUrl(apt: InterviewAppointment, isAr = true): string {
  const recipient = apt.communication_method === "google_meet" || apt.communication_method === "teams"
    ? apt.contact_detail
    : apt.client_email;

  const egTime = formatEgyptTime(apt.scheduled_at, isAr ? "ar-EG" : "en-US");
  const usTime = formatUsTime(apt.scheduled_at, apt.us_timezone, isAr ? "ar-EG" : "en-US");

  const subject = isAr
    ? `MIGRAFILE: موعد المقابلة الشخصية (${apt.reference}) - رابط مكالمة الفيديو`
    : `MIGRAFILE: Video Interview Appointment (${apt.reference})`;

  const meetingLine = apt.video_link
    ? `\nرابط المقابلة (Video Call Link):\n${apt.video_link}\n`
    : "\nسيتم تزويدك برابط المقابلة قبل الموعد.\n";

  const body = isAr
    ? `عزيزي/عزيزتي ${apt.client_name}،\n\nتحياتنا من فريق MIGRAFILE.\nبخصوص موعد المقابلة الشخصية (فيديو كول) المحجوز لدينا:\n\n• كود الموعد: ${apt.reference}\n• الموعد بتوقيت مصر: ${egTime.full}\n• الموعد بالتوقيت الأمريكي: ${usTime.full}\n• وسيلة التواصل المحددة: ${apt.communication_method} (${apt.contact_detail})\n${meetingLine}\nنتطلع للتواصل معكم في الموعد المحدد.\n\nفريق MIGRAFILE`
    : `Dear ${apt.client_name},\n\nGreetings from MIGRAFILE.\nRegarding your scheduled video interview:\n\n• Reference: ${apt.reference}\n• Egypt Time: ${egTime.full}\n• US Time: ${usTime.full}\n• Contact Method: ${apt.communication_method} (${apt.contact_detail})\n${meetingLine}\nBest regards,\nMIGRAFILE Team`;

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
