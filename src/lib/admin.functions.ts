import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getRoleAssignments, setRoleAssignment } from "@/lib/role-store";

async function assertAdmin(supabase: any, userId: string, supabaseAdmin?: any, userEmail?: string) {
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

  try {
    const assignments = await getRoleAssignments();
    if (assignments[userId] === "admin") return;
    if (userEmail && assignments[userEmail.toLowerCase()] === "admin") return;
  } catch {}

  try {
    const { getStoredTeamRoles } = await import("./team.functions");
    const team = await getStoredTeamRoles();
    const found = team.find(
      (t) => t.user_id === userId || (userEmail && t.email?.toLowerCase() === userEmail.toLowerCase()),
    );
    if (found?.role === "admin") return;
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

const USERS_CACHE_FILE = "data/users_cache.json";

export async function getStoredUsersCache(): Promise<AdminUser[]> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const fullPath = path.resolve(process.cwd(), USERS_CACHE_FILE);
    if (!fs.existsSync(fullPath)) return [];
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}

export async function writeStoredUsersCache(list: AdminUser[]): Promise<void> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.resolve(process.cwd(), "data");
    const fullPath = path.resolve(dir, "users_cache.json");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Read-only filesystem on Vercel
  }
}

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ users: AdminUser[]; hasServiceRole: boolean }> => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const usersMap = new Map<string, AdminUser>();

    // 1. If service role is available, list users from Supabase Auth admin API
    if (supabaseAdmin) {
      try {
        for (let page = 1; page <= 50; page++) {
          const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
          if (error) throw error;
          for (const u of data.users) {
            usersMap.set(u.id, {
              id: u.id,
              email: u.email ?? "",
              full_name: (u.user_metadata?.full_name as string) || null,
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

    // 2. Fetch profiles, user_roles, cases, and interview_appointments from database
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

    // 3. Load previously cached users to recover emails/names if Auth API is offline
    const cachedUsers = await getStoredUsersCache();
    for (const c of cachedUsers) {
      if (!usersMap.has(c.id)) {
        usersMap.set(c.id, {
          ...c,
          cases: 0, // ALWAYS reset cases to 0, never accumulate!
        });
      } else {
        const existing = usersMap.get(c.id)!;
        if (!existing.email && c.email) existing.email = c.email;
        if (!existing.full_name && c.full_name) existing.full_name = c.full_name;
        if (!existing.phone && c.phone) existing.phone = c.phone;
      }
    }

    // 4. Merge profiles
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

    // 5. Match interview appointments emails to client_id
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

    // 6. Load explicit role assignments and team members
    const roleAssignments = await getRoleAssignments();
    let teamList: any[] = [];
    try {
      const { getStoredTeamRoles } = await import("./team.functions");
      teamList = await getStoredTeamRoles();
    } catch {}

    // Group database roles by user_id
    const dbRolesMap = new Map<string, string[]>();
    for (const r of dbRoles ?? []) {
      const existing = dbRolesMap.get(r.user_id) || [];
      existing.push(r.role);
      dbRolesMap.set(r.user_id, existing);
    }

    // 7. Resolve SINGLE authoritative role for each user
    for (const u of usersMap.values()) {
      let resolvedRole: "client" | "staff" | "admin" = "client";

      // Priority 1: Explicit assignment saved by admin
      if (roleAssignments[u.id]) {
        resolvedRole = roleAssignments[u.id]!;
      } else if (u.email && roleAssignments[u.email.toLowerCase()]) {
        resolvedRole = roleAssignments[u.email.toLowerCase()]!;
      }
      // Priority 2: Stored in team members
      else {
        const teamMember = teamList.find(
          (t) => t.user_id === u.id || (u.email && t.email?.toLowerCase() === u.email.toLowerCase()),
        );
        if (teamMember) {
          resolvedRole = teamMember.role;
          if (!u.email && teamMember.email) u.email = teamMember.email;
          if (!u.full_name && teamMember.full_name) u.full_name = teamMember.full_name;
        }
        // Priority 3: Database user_roles
        else {
          const userDbRoles = dbRolesMap.get(u.id) || [];
          if (userDbRoles.includes("admin")) {
            resolvedRole = "admin";
          } else if (userDbRoles.includes("staff")) {
            resolvedRole = "staff";
          } else {
            resolvedRole = "client";
          }
        }
      }

      u.roles = [resolvedRole];
    }

    // Include any team member from teamList who isn't yet in usersMap
    for (const t of teamList) {
      if (t.email) {
        const exists = Array.from(usersMap.values()).some((u) => u.email.toLowerCase() === t.email.toLowerCase());
        if (!exists) {
          const id = t.user_id || ("team-" + Math.random().toString(36).substring(2, 10));
          usersMap.set(id, {
            id,
            email: t.email,
            full_name: t.full_name || t.email.split("@")[0],
            phone: null,
            roles: [t.role],
            created_at: t.created_at || new Date().toISOString(),
            last_sign_in_at: null,
            banned: false,
            cases: 0,
          });
        }
      }
    }

    // 8. Count REAL cases directly from database - NEVER accumulate!
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

    // Save accurate state to cache
    await writeStoredUsersCache(list);

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

    // 2. Update profile in database
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

    // 3. Update user_roles in Supabase if admin client available
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id);
        await supabaseAdmin.from("user_roles").insert({ user_id: data.id, role: data.role });
      } catch (err) {
        console.warn("Error updating roles via supabaseAdmin:", err);
      }
    }

    // 4. Save explicit role assignment (takes permanent priority in UI and queries)
    await setRoleAssignment(data.id, data.role);

    // 5. Update team store & cache
    let userEmail: string | undefined;
    const cache = await getStoredUsersCache();
    const target = cache.find((u) => u.id === data.id);
    if (target) {
      userEmail = target.email;
      target.full_name = data.full_name;
      target.phone = data.phone;
      target.roles = [data.role];
      if (userEmail) {
        await setRoleAssignment(userEmail, data.role);
      }
      await writeStoredUsersCache(cache);
    }

    try {
      const { getStoredTeamRoles, writeStoredTeamRoles } = await import("./team.functions");
      const storedTeam = await getStoredTeamRoles();
      if (data.role === "client") {
        // Remove from team store if changed to client
        const filtered = storedTeam.filter(
          (m) => m.user_id !== data.id && (!userEmail || m.email.toLowerCase() !== userEmail.toLowerCase()),
        );
        await writeStoredTeamRoles(filtered);
      } else {
        // Add or update in team store
        const existingIdx = storedTeam.findIndex(
          (m) => m.user_id === data.id || (userEmail && m.email.toLowerCase() === userEmail.toLowerCase()),
        );
        if (existingIdx >= 0) {
          storedTeam[existingIdx]!.role = data.role;
          if (data.full_name) storedTeam[existingIdx]!.full_name = data.full_name;
        } else if (userEmail) {
          storedTeam.unshift({
            user_id: data.id,
            email: userEmail,
            role: data.role,
            full_name: data.full_name,
            created_at: new Date().toISOString(),
          });
        }
        await writeStoredTeamRoles(storedTeam);
      }
    } catch {}

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

    const cache = await getStoredUsersCache();
    const target = cache.find((u) => u.id === data.id);
    if (target) {
      target.banned = data.banned;
      await writeStoredUsersCache(cache);
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

    let email = data.id;
    if (supabaseAdmin) {
      try {
        const { data: u } = await supabaseAdmin.auth.admin.getUserById(data.id);
        if (u?.user?.email) email = u.user.email;
        await supabaseAdmin.auth.admin.deleteUser(data.id);
      } catch (err) {
        console.warn("Failed to delete user in Supabase:", err);
      }
    }

    // Clean from cache & team
    const cache = await getStoredUsersCache();
    const updated = cache.filter((u) => u.id !== data.id);
    await writeStoredUsersCache(updated);

    try {
      const { getStoredTeamRoles, writeStoredTeamRoles } = await import("./team.functions");
      const storedTeam = await getStoredTeamRoles();
      const filteredTeam = storedTeam.filter((m) => m.user_id !== data.id && m.email !== email);
      await writeStoredTeamRoles(filteredTeam);
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

    if (supabaseAdmin) {
      for (const id of ids) {
        try {
          const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
          if (u?.user?.email) emails[id] = u.user.email;
        } catch {}
      }
    }

    // Fallback for emails from cache
    const cache = await getStoredUsersCache();
    for (const id of ids) {
      if (!emails[id]) {
        const found = cache.find((u) => u.id === id);
        if (found?.email) emails[id] = found.email;
        else if (found?.full_name) emails[id] = found.full_name;
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
