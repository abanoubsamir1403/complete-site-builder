import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type TeamMember = {
  user_id: string;
  email: string;
  role: "admin" | "staff";
  full_name?: string | null;
  created_at?: string;
};

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

export async function getStoredTeamRoles(): Promise<TeamMember[]> {
  const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
  const admin = getSupabaseAdminSafe();
  if (!admin) return [];
  try {
    const { data: roles, error: rolesError } = await admin
      .from("user_roles")
      .select("user_id, role")
      .in("role", ["admin", "staff"]);

    if (rolesError || !roles) return [];

    const userIds = roles.map((r: any) => r.user_id);
    if (userIds.length === 0) return [];

    const { data: profiles } = await admin
      .from("profiles")
      .select("id, full_name, created_at")
      .in("id", userIds);

    const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p]));

    const teamList: TeamMember[] = [];
    for (const r of roles) {
      const p = profileMap.get(r.user_id);
      let email = "";
      let createdAt = p?.created_at || new Date().toISOString();
      let fullName = p?.full_name || null;

      try {
        const { data: u } = await admin.auth.admin.getUserById(r.user_id);
        if (u?.user) {
          email = u.user.email ?? "";
          createdAt = u.user.created_at || createdAt;
          if (!fullName && u.user.user_metadata?.["full_name"]) {
            fullName = u.user.user_metadata["full_name"];
          }
        }
      } catch {}

      teamList.push({
        user_id: r.user_id,
        role: r.role as "admin" | "staff",
        email,
        full_name: fullName,
        created_at: createdAt,
      });
    }
    return teamList;
  } catch {
    return [];
  }
}

export async function writeStoredTeamRoles(_list: TeamMember[]): Promise<void> {
  // Server is 100% stateless - all mutations are saved directly to Supabase.
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const client = supabaseAdmin ?? context.supabase;

    const { data: roles, error: rolesError } = await client
      .from("user_roles")
      .select("user_id, role")
      .in("role", ["admin", "staff"]);

    if (rolesError) {
      console.warn("Failed to fetch team roles from Supabase:", rolesError);
      return [];
    }

    const userIds = (roles ?? []).map((r: any) => r.user_id);
    if (userIds.length === 0) return [];

    const { data: profiles } = await client
      .from("profiles")
      .select("id, full_name, created_at")
      .in("id", userIds);

    const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p]));

    const teamList: TeamMember[] = [];
    for (const r of roles ?? []) {
      const p = profileMap.get(r.user_id);
      let email = "";
      let createdAt = p?.created_at || new Date().toISOString();
      let fullName = p?.full_name || null;

      if (supabaseAdmin) {
        try {
          const { data: u } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
          if (u?.user) {
            email = u.user.email ?? "";
            createdAt = u.user.created_at || createdAt;
            if (!fullName && u.user.user_metadata?.["full_name"]) {
              fullName = u.user.user_metadata["full_name"];
            }
          }
        } catch {}
      }

      teamList.push({
        user_id: r.user_id,
        role: r.role as "admin" | "staff",
        email,
        full_name: fullName,
        created_at: createdAt,
      });
    }

    return teamList;
  });

export const setTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().email().max(255),
        role: z.enum(["admin", "staff"]),
        full_name: z.string().max(150).optional().nullable(),
        password: z.string().min(6).max(100).optional().nullable(),
        remove: z.boolean().default(false),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();
    await assertAdmin(context.supabase, context.userId, supabaseAdmin, context.claims?.email);

    const email = data.email.toLowerCase().trim();
    const role = data.role;
    const client = supabaseAdmin ?? context.supabase;

    if (data.remove) {
      if (email === context.claims?.email?.toLowerCase() || email === context.userId) {
        return { ok: false as const, reason: "self" as const };
      }

      let targetUserId: string | undefined;
      if (supabaseAdmin) {
        try {
          for (let page = 1; page <= 10 && !targetUserId; page++) {
            const { data: res } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
            targetUserId = res?.users.find((u) => u.email?.toLowerCase() === email)?.id;
            if (!res?.users.length || res.users.length < 200) break;
          }
        } catch (err) {
          console.warn("Failed to search user by email in Supabase:", err);
        }
      }

      if (targetUserId) {
        if (targetUserId === context.userId) return { ok: false as const, reason: "self" as const };
        await client.from("user_roles").delete().eq("user_id", targetUserId).eq("role", role);
      }

      try {
        await client.from("activity_log").insert({
          actor_id: context.userId,
          action: "user.role_remove",
          target: email,
          details: { role },
        });
      } catch {}

      return { ok: true as const, removed: true as const };
    }

    // Adding or updating member role
    let targetUserId: string | undefined;
    let createdNew = false;
    const tempPassword = data.password || ("Mf!" + Math.random().toString(36).substring(2, 8) + "@2026");

    if (supabaseAdmin) {
      try {
        for (let page = 1; page <= 10 && !targetUserId; page++) {
          const { data: res } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
          targetUserId = res?.users.find((u) => u.email?.toLowerCase() === email)?.id;
          if (!res?.users.length || res.users.length < 200) break;
        }

        if (targetUserId) {
          // Existing user -> set role in user_roles
          await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
          await supabaseAdmin.from("user_roles").insert({ user_id: targetUserId, role });
          if (data.full_name) {
            await supabaseAdmin.from("profiles").upsert({ id: targetUserId, full_name: data.full_name });
          }
        } else {
          // New user -> Create in Supabase Auth
          const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
              full_name: data.full_name || email.split("@")[0],
              role,
            },
          });

          if (createError) throw createError;

          if (newUser?.user) {
            targetUserId = newUser.user.id;
            createdNew = true;
            await supabaseAdmin.from("profiles").upsert({
              id: targetUserId,
              full_name: data.full_name || (email.split("@")[0] ?? email),
            });
            await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
            await supabaseAdmin.from("user_roles").insert({ user_id: targetUserId, role });
          }
        }
      } catch (err) {
        console.warn("Supabase Admin error during setTeamRole:", err);
        throw err;
      }
    } else {
      throw new Error("Supabase Admin client required to configure team roles");
    }

    try {
      await client.from("activity_log").insert({
        actor_id: context.userId,
        action: createdNew ? "user.create_team" : "user.role_update",
        target: email,
        details: { role, createdNew },
      });
    } catch {}

    return {
      ok: true as const,
      createdNew,
      email,
      role,
      tempPassword: createdNew ? tempPassword : null,
      full_name: data.full_name || (email.split("@")[0] ?? email),
    };
  });
