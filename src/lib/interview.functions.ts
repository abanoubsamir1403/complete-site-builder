import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { InterviewAppointment } from "./interview";

const DATA_FILE = "data/interview_appointments.json";

async function getStoredAppointments(): Promise<InterviewAppointment[]> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const fullPath = path.resolve(process.cwd(), DATA_FILE);

    if (!fs.existsSync(fullPath)) {
      return [];
    }
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Failed to read stored appointments on server:", err);
    return [];
  }
}

async function writeStoredAppointments(list: InterviewAppointment[]): Promise<void> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.resolve(process.cwd(), "data");
    const fullPath = path.resolve(dir, "interview_appointments.json");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save appointments on server:", err);
  }
}

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

    const payload: any = {
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

    // 1. Try Supabase insert (primary destination)
    try {
      let client: any;
      try {
        const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
        client = getSupabaseAdminSafe();
      } catch {}
      if (!client) {
        const { supabase } = await import("@/integrations/supabase/client");
        client = supabase;
      }

      const { data: inserted, error } = await (client.from("interview_appointments") as any)
        .insert(payload)
        .select()
        .single();

      if (!error && inserted) {
        // Save copy to local file store if available (localhost backup)
        try {
          const currentList = await getStoredAppointments();
          currentList.unshift(inserted as InterviewAppointment);
          await writeStoredAppointments(currentList);
        } catch {}
        return inserted as InterviewAppointment;
      }

      if (error) {
        console.error("Supabase insert error in saveAppointmentServerFn:", error);
      }
    } catch (err) {
      console.error("Supabase insert failed with exception:", err);
    }

    // 2. Fallback only if Supabase insert failed
    const now = new Date().toISOString();
    const fallbackRecord: InterviewAppointment = {
      id: crypto.randomUUID ? crypto.randomUUID() : "iv-" + Date.now(),
      reference: "IV-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
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
      video_link: null,
      staff_notes: null,
      created_at: now,
      updated_at: now,
    };

    try {
      const currentList = await getStoredAppointments();
      currentList.unshift(fallbackRecord);
      await writeStoredAppointments(currentList);
    } catch {}

    return fallbackRecord;
  });

export const listAppointmentsServerFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<InterviewAppointment[]> => {
    // 1. Try Supabase first (primary production store)
    try {
      let client: any;
      try {
        const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
        client = getSupabaseAdminSafe();
      } catch {}
      if (!client) {
        const { supabase } = await import("@/integrations/supabase/client");
        client = supabase;
      }

      const { data, error } = await (client.from("interview_appointments") as any)
        .select("*")
        .order("scheduled_at", { ascending: true });

      if (!error && Array.isArray(data)) {
        return data as InterviewAppointment[];
      }
    } catch (err) {
      console.warn("Failed to fetch appointments from Supabase:", err);
    }

    // 2. Fallback to local server file store (localhost only)
    return await getStoredAppointments();
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

    // Update in Supabase
    try {
      let client: any;
      try {
        const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
        client = getSupabaseAdminSafe();
      } catch {}
      if (!client) {
        const { supabase } = await import("@/integrations/supabase/client");
        client = supabase;
      }

      await (client.from("interview_appointments") as any)
        .update({ ...data.patch, updated_at: now })
        .eq("id", data.id);
    } catch {
      // Continue
    }

    // Update in server file store if available
    try {
      const currentList = await getStoredAppointments();
      const updated = currentList.map((item) => {
        if (item.id === data.id) {
          return { ...item, ...data.patch, updated_at: now };
        }
        return item;
      });
      await writeStoredAppointments(updated);
    } catch {}

    return { ok: true };
  });

export const deleteAppointmentServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    // Delete in Supabase
    try {
      let client: any;
      try {
        const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
        client = getSupabaseAdminSafe();
      } catch {}
      if (!client) {
        const { supabase } = await import("@/integrations/supabase/client");
        client = supabase;
      }

      await (client.from("interview_appointments") as any).delete().eq("id", data.id);
    } catch {
      // Continue
    }

    // Delete in server file store if available
    try {
      const currentList = await getStoredAppointments();
      const filtered = currentList.filter((item) => item.id !== data.id);
      await writeStoredAppointments(filtered);
    } catch {}

    return { ok: true };
  });
