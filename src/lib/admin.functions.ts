import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string, supabaseAdmin?: any, _userEmail?: string) {
  const client = supabaseAdmin ?? supabase;
  try {
    const { data } = await client.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (data === true) return;
  } catch {}

  try {
    const { data: roleRow } = await client
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleRow) return;
  } catch {}

  throw new Error("Admins only");
}

async function log(supabase: any, actor: string, action: string, target: string, details: Record<string, unknown> = {}) {
  try {
    await supabase.from("activity_log").insert({ actor_id: actor, action, target, details });
  } catch {}
}

export type AdminUser = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  roles: string[];
  created_at: string;
  last_sign_in_at: string | null;
  banned: boolean;
  cases: number;
};

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ users: AdminUser[]; hasServiceRole: boolean }> => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const usersMap = new Map<string, AdminUser>();

    // 1. List users from Supabase Auth admin API if available
    if (supabaseAdmin) {
      try {
        for (let page = 1; page <= 50; page++) {
          const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
          if (error) throw error;
          for (const u of data.users) {
            usersMap.set(u.id, {
              id: u.id,
              email: u.email ?? "",
              full_name: (u.user_metadata?.["full_name"] as string) || null,
              phone: u.phone ?? null,
              roles: [],
              created_at: u.created_at,
              last_sign_in_at: u.last_sign_in_at ?? null,
              banned: !!u.banned_until && new Date(u.banned_until) > new Date(),
              cases: 0,
            });
          }
          if (data.users.length < 200) break;
        }
      } catch (err) {
        console.warn("Failed to list users from Supabase Auth admin:", err);
      }
    }

    // 2. Fetch profiles, user_roles, cases, and interview_appointments directly from Supabase
    const client = supabaseAdmin ?? context.supabase;
    const safeQuery = async (query: any) => {
      try {
        const { data, error } = await query;
        if (error) return [];
        return data || [];
      } catch {
        return [];
      }
    };
    const [profiles, dbRoles, cases, appointments] = await Promise.all([
      safeQuery(client.from("profiles").select("id, full_name, phone, created_at")),
      safeQuery(client.from("user_roles").select("user_id, role")),
      safeQuery(client.from("cases").select("id, client_id, reference")),
      safeQuery(client.from("interview_appointments").select("client_id, client_email, client_name, contact_detail, created_at")),
    ]);

    // 3. Merge profiles
    for (const p of profiles ?? []) {
      if (!usersMap.has(p.id)) {
        usersMap.set(p.id, {
          id: p.id,
          email: "",
          full_name: p.full_name,
          phone: p.phone,
          roles: [],
          created_at: p.created_at,
          last_sign_in_at: null,
          banned: false,
          cases: 0,
        });
      } else {
        const u = usersMap.get(p.id)!;
        if (p.full_name && !u.full_name) u.full_name = p.full_name;
        if (p.phone && !u.phone) u.phone = p.phone;
      }
    }

    // 4. Merge interview appointments
    for (const apt of appointments ?? []) {
      if (apt.client_id) {
        if (usersMap.has(apt.client_id)) {
          const u = usersMap.get(apt.client_id)!;
          if (!u.email && apt.client_email) u.email = apt.client_email;
          if (!u.full_name && apt.client_name) u.full_name = apt.client_name;
          if (!u.phone && apt.contact_detail) u.phone = apt.contact_detail;
        } else {
          usersMap.set(apt.client_id, {
            id: apt.client_id,
            email: apt.client_email,
            full_name: apt.client_name,
            phone: apt.contact_detail,
            roles: ["client"],
            created_at: apt.created_at,
            last_sign_in_at: null,
            banned: false,
            cases: 0,
          });
        }
      }
    }

    // 5. Group database roles from Supabase user_roles
    const dbRolesMap = new Map<string, string[]>();
    for (const r of dbRoles ?? []) {
      const existing = dbRolesMap.get(r.user_id) || [];
      existing.push(r.role);
      dbRolesMap.set(r.user_id, existing);
    }

    // 6. Assign authoritative roles from Supabase
    for (const u of usersMap.values()) {
      const userDbRoles = dbRolesMap.get(u.id) || [];
      if (userDbRoles.includes("admin")) {
        u.roles = ["admin"];
      } else if (userDbRoles.includes("staff")) {
        u.roles = ["staff"];
      } else {
        u.roles = ["client"];
      }
    }

    // 7. Count cases directly from Supabase
    const caseCountMap = new Map<string, number>();
    for (const c of cases ?? []) {
      if (c.client_id) {
        caseCountMap.set(c.client_id, (caseCountMap.get(c.client_id) || 0) + 1);
      }
    }

    for (const u of usersMap.values()) {
      u.cases = caseCountMap.get(u.id) || 0;
    }

    const list = Array.from(usersMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    return {
      users: list,
      hasServiceRole: !!supabaseAdmin,
    };
  });

const idSchema = z.string().min(1);

export const adminUpdateUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        id: idSchema,
        full_name: z.string().trim().max(120).nullable(),
        phone: z.string().trim().max(40).nullable(),
        role: z.enum(["client", "staff", "admin"]),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const client = supabaseAdmin ?? context.supabase;

    // 1. Prevent removing own admin role
    if (data.id === context.userId && data.role !== "admin") {
      return { ok: false as const, reason: "self" as const };
    }

    // 2. Update profile directly in Supabase
    try {
      await client.from("profiles").upsert({
        id: data.id,
        full_name: data.full_name,
        phone: data.phone,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Error updating profile in adminUpdateUser:", err);
    }

    // 3. Update user_roles directly in Supabase
    try {
      await client.from("user_roles").delete().eq("user_id", data.id);
      if (data.role !== "client") {
        await client.from("user_roles").insert({ user_id: data.id, role: data.role });
      }
    } catch (err) {
      console.warn("Error updating user_roles in Supabase:", err);
    }

    await log(context.supabase, context.userId, "user.update", data.id, { role: data.role });
    return { ok: true as const };
  });

export const adminSetBan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: idSchema, banned: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);
    if (data.id === context.userId) return { ok: false as const, reason: "self" as const };

    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin.auth.admin.updateUserById(data.id, {
          ban_duration: data.banned ? "876000h" : "none",
        });
        if (error) console.warn("Supabase ban error:", error);
      } catch (err) {
        console.warn("Failed to ban in Supabase:", err);
      }
    }

    await log(context.supabase, context.userId, data.banned ? "user.suspend" : "user.activate", data.id);
    return { ok: true as const };
  });

export const adminDeleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: idSchema }).parse(d))
  .handler(async ({ data, context }) => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);
    if (data.id === context.userId) return { ok: false as const, reason: "self" as const };

    const client = supabaseAdmin ?? context.supabase;
    let email = data.id;

    if (supabaseAdmin) {
      try {
        const { data: u } = await supabaseAdmin.auth.admin.getUserById(data.id);
        if (u?.user?.email) email = u.user.email;
        await supabaseAdmin.auth.admin.deleteUser(data.id);
      } catch (err) {
        console.warn("Failed to delete user in Supabase Auth:", err);
      }
    }

    try {
      await client.from("user_roles").delete().eq("user_id", data.id);
      await client.from("profiles").delete().eq("id", data.id);
    } catch {}

    await log(context.supabase, context.userId, "user.delete", email);
    return { ok: true as const };
  });

export const listActivity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const { data } = await context.supabase
      .from("activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);

    const ids = [...new Set((data ?? []).map((r: any) => r.actor_id).filter(Boolean))] as string[];
    const emails: Record<string, string> = {};

    if (supabaseAdmin && ids.length > 0) {
      for (const id of ids) {
        try {
          const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
          if (u?.user?.email) emails[id] = u.user.email;
        } catch {}
      }
    }

    if (ids.length > 0) {
      const missingIds = ids.filter((id) => !emails[id]);
      if (missingIds.length > 0) {
        try {
          const { data: profiles } = await context.supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", missingIds);
          for (const p of profiles ?? []) {
            if (p.full_name) emails[p.id] = p.full_name;
          }
        } catch {}
      }
    }

    return (data ?? []).map((r: any) => ({
      id: r.id as string,
      action: r.action as string,
      target: (r.target ?? "") as string,
      created_at: r.created_at as string,
      actor: r.actor_id ? emails[r.actor_id] ?? r.actor_id : "—",
    }));
  });
