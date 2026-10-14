import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ClientActivityItem = {
  id: string;
  action: string;
  target: string | null;
  actor_id: string | null;
  client_name: string;
  client_email?: string | null;
  details: {
    case_id?: string;
    reference?: string;
    doc_label?: string;
    file_name?: string;
    is_replacement?: boolean;
    amount?: number;
    service_title?: string;
    form_code?: string;
    note?: string;
    timestamp?: string;
    [key: string]: unknown;
  };
  created_at: string;
};

export type StaffClientInfo = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

const clientActivitySchema = z.object({
  action: z.enum([
    "client.upload_doc",
    "client.replace_doc",
    "client.upload_payment",
    "client.new_case",
    "client.update_doc",
  ]),
  target: z.string(), // Case reference (e.g. MF-XXXXXXXX)
  actor_id: z.string().nullable().optional(),
  client_name: z.string(),
  client_email: z.string().nullable().optional(),
  details: z.record(z.unknown()),
});

/**
 * Server function invoked when a client performs an action in the portal
 * (e.g. uploading document, replacing document, uploading payment receipt, opening case).
 * Logs to activity_log with service role credentials to bypass client RLS restrictions.
 */
export const logClientActivityServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => clientActivitySchema.parse(d))
  .handler(async ({ data }) => {
    let client: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      client = getSupabaseAdminSafe();
    } catch {}

    if (!client) {
      const { supabase } = await import("@/integrations/supabase/client");
      client = supabase;
    }

    const payload = {
      actor_id: data.actor_id || null,
      action: data.action,
      target: data.target,
      details: {
        ...data.details,
        client_name: data.client_name,
        client_email: data.client_email || null,
        timestamp: new Date().toISOString(),
      },
    };

    const { data: inserted, error } = await client
      .from("activity_log")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Failed to insert client activity:", error);
      return { success: false, error: error.message };
    }

    return { success: true, item: inserted };
  });

/**
 * Server function for staff to fetch recent client activity alerts from activity_log.
 */
export const listStaffActivityServerFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<ClientActivityItem[]> => {
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
      .from("activity_log")
      .select("*")
      .like("action", "client.%")
      .order("created_at", { ascending: false })
      .limit(60);

    if (error) {
      console.warn("Failed to list staff activity log:", error);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      action: row.action,
      target: row.target,
      actor_id: row.actor_id,
      client_name: (row.details?.client_name as string) || "Client",
      client_email: (row.details?.client_email as string) || null,
      details: (row.details || {}) as any,
      created_at: row.created_at,
    }));
  });

/**
 * Server function to fetch client details (name, email, phone) for staff view.
 * Combines Supabase Auth users and public.profiles.
 */
export const fetchStaffClientsMapServerFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<Record<string, StaffClientInfo>> => {
    let supabaseAdmin: any;
    try {
      const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
      supabaseAdmin = getSupabaseAdminSafe();
    } catch {}

    const map: Record<string, StaffClientInfo> = {};

    // 1. Fetch from Auth Admin if available
    if (supabaseAdmin) {
      try {
        const { data } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 500 });
        for (const u of data?.users || []) {
          map[u.id] = {
            id: u.id,
            email: u.email || null,
            full_name: (u.user_metadata?.full_name as string) || null,
            phone: u.phone || null,
          };
        }
      } catch (err) {
        console.warn("Failed to list auth users in fetchStaffClientsMapServerFn:", err);
      }
    }

    // 2. Supplement with profiles table
    try {
      let client = supabaseAdmin;
      if (!client) {
        const { supabase } = await import("@/integrations/supabase/client");
        client = supabase;
      }

      const { data: profiles } = await client.from("profiles").select("id, full_name, phone");
      for (const p of profiles || []) {
        if (!map[p.id]) {
          map[p.id] = {
            id: p.id,
            email: null,
            full_name: p.full_name || null,
            phone: p.phone || null,
          };
        } else {
          if (p.full_name) map[p.id].full_name = p.full_name;
          if (p.phone) map[p.id].phone = p.phone;
        }
      }
    } catch (err) {
      console.warn("Failed to query profiles in fetchStaffClientsMapServerFn:", err);
    }

    return map;
  });
