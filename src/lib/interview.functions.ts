import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { InterviewAppointment } from "./interview";

const appointmentInputSchema = z.object({
  client_id: z.string().nullable().optional(),
  client_name: z.string().min(1).max(150),
  client_email: z.string().email(),
  communication_method: z.enum(["whatsapp", "google_meet", "zoom", "teams", "telegram", "other"]),
  custom_method_name: z.string().nullable().optional(),
  contact_detail: z.string().min(1).max(200),
  scheduled_at: z.string(),
  us_timezone: z.string().default("America/New_York"),
  us_time_slot: z.string(),
  topic: z.string().default("general_consultation"),
  notes: z.string().nullable().optional(),
  case_reference: z.string().nullable().optional(),
});

export const saveAppointmentServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => appointmentInputSchema.parse(d))
  .handler(async ({ data }): Promise<InterviewAppointment> => {
    const isValidUuid = (val?: string | null) =>
      typeof val === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val.trim());

    const clientId = isValidUuid(data.client_id) ? data.client_id!.trim() : null;
    const reference = "IV-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const payload: any = {
      reference,
      client_id: clientId,
      client_name: data.client_name.trim(),
      client_email: data.client_email.trim().toLowerCase(),
      communication_method: data.communication_method,
      custom_method_name: data.custom_method_name?.trim() || null,
      contact_detail: data.contact_detail.trim(),
      scheduled_at: data.scheduled_at,
      us_timezone: data.us_timezone || "America/New_York",
      us_time_slot: data.us_time_slot,
      topic: data.topic || "general_consultation",
      notes: data.notes?.trim() || null,
      case_reference: data.case_reference?.trim() || null,
      status: "upcoming",
    };

    let client: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      client = getSupabaseAdminSafe();
    } catch {}
    if (!client) {
      const { supabase } = await import("@/integrations/supabase/client");
      client = supabase;
    }

    const { data: inserted, error } = await client
      .from("interview_appointments")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error in saveAppointmentServerFn:", error);
      throw new Error(error.message || "Failed to schedule appointment in Supabase");
    }

    return inserted as InterviewAppointment;
  });

export const listAppointmentsServerFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<InterviewAppointment[]> => {
    let client: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      client = getSupabaseAdminSafe();
    } catch {}
    if (!client) {
      const { supabase } = await import("@/integrations/supabase/client");
      client = supabase;
    }

    const { data, error } = await client
      .from("interview_appointments")
      .select("*")
      .order("scheduled_at", { ascending: true });

    if (error) {
      console.warn("Failed to fetch appointments from Supabase:", error);
      throw new Error(error.message || "Failed to fetch appointments from Supabase");
    }

    return (data || []) as InterviewAppointment[];
  });

export const updateAppointmentServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        id: z.string(),
        patch: z.object({
          status: z.enum(["upcoming", "confirmed", "link_sent", "completed", "cancelled"]).optional(),
          video_link: z.string().nullable().optional(),
          staff_notes: z.string().nullable().optional(),
        }),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const now = new Date().toISOString();
    let client: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      client = getSupabaseAdminSafe();
    } catch {}
    if (!client) {
      const { supabase } = await import("@/integrations/supabase/client");
      client = supabase;
    }

    const { error } = await client
      .from("interview_appointments")
      .update({ ...data.patch, updated_at: now })
      .eq("id", data.id);

    if (error) {
      console.error("Supabase update error in updateAppointmentServerFn:", error);
      throw new Error(error.message || "Failed to update appointment in Supabase");
    }

    return { ok: true };
  });

export const deleteAppointmentServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    let client: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      client = getSupabaseAdminSafe();
    } catch {}
    if (!client) {
      const { supabase } = await import("@/integrations/supabase/client");
      client = supabase;
    }

    const { error } = await client
      .from("interview_appointments")
      .delete()
      .eq("id", data.id);

    if (error) {
      console.error("Supabase delete error in deleteAppointmentServerFn:", error);
      throw new Error(error.message || "Failed to delete appointment in Supabase");
    }

    return { ok: true };
  });
