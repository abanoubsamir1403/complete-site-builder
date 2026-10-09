import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { setRoleAssignment, removeRoleAssignment } from "@/lib/role-store";

export type TeamMember = {
  user_id: string;
  email: string;
  role: "admin" | "staff";
  full_name?: string | null;
  created_at?: string;
};

const TEAM_STORE_FILE = "data/team_roles.json";

export async function getStoredTeamRoles(): Promise<TeamMember[]> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const fullPath = path.resolve(process.cwd(), TEAM_STORE_FILE);
    if (!fs.existsSync(fullPath)) return [];
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Failed to read team roles store:", err);
    return [];
  }
}

export async function writeStoredTeamRoles(list: TeamMember[]): Promise<void> {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.resolve(process.cwd(), "data");
    const fullPath = path.resolve(dir, "team_roles.json");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write team roles store:", err);
  }
}

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Admins only");
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();

    const teamMap = new Map<string, TeamMember>();

    // 1. Load stored team members
    const stored = await getStoredTeamRoles();
    for (const m of stored) {
      if (m.email) {
        teamMap.set(m.email.toLowerCase(), m);
      }
    }

    // 2. Load from Supabase Admin if available
    if (supabaseAdmin) {
      try {
        const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role").in("role", ["admin", "staff"]);
        for (const r of roles ?? []) {
          try {
            const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
            if (data?.user?.email) {
              const em = data.user.email.toLowerCase();
              const existing = teamMap.get(em);
              teamMap.set(em, {
                user_id: r.user_id,
                role: r.role as "admin" | "staff",
                email: data.user.email,
                full_name: (data.user.user_metadata?.full_name as string) || existing?.full_name || null,
                created_at: existing?.created_at || data.user.created_at,
              });
            }
          } catch {}
        }
      } catch (err) {
        console.warn("Failed to fetch team from supabaseAdmin:", err);
      }
    } else {
      // 3. Fallback: Query roles using the authenticated admin's context
      try {
        const { data: roles } = await context.supabase.from("user_roles").select("user_id, role").in("role", ["admin", "staff"]);
        const { data: profiles } = await context.supabase.from("profiles").select("id, full_name");
        for (const r of roles ?? []) {
          const p = profiles?.find((x: any) => x.id === r.user_id);
          // Look up if we have an email in stored map for this user_id
          const found = Array.from(teamMap.values()).find((x) => x.user_id === r.user_id);
          if (found) {
            found.role = r.role as "admin" | "staff";
            if (p?.full_name && !found.full_name) found.full_name = p.full_name;
          }
        }
      } catch (err) {
        console.warn("Fallback team query error:", err);
      }
    }

    const list = Array.from(teamMap.values());
    await writeStoredTeamRoles(list);
    return list;
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
    await assertAdmin(context.supabase, context.userId);
    const { getSupabaseAdminSafe } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = getSupabaseAdminSafe();

    const email = data.email.toLowerCase().trim();
    const role = data.role;

    if (data.remove) {
      if (email === context.claims?.email?.toLowerCase() || email === context.userId) {
        return { ok: false as const, reason: "self" as const };
      }

      // Remove from persistent store
      const stored = await getStoredTeamRoles();
      const updated = stored.filter((m) => m.email.toLowerCase() !== email);
      await writeStoredTeamRoles(updated);
      await removeRoleAssignment(email);

      // Remove from database if admin available
      if (supabaseAdmin) {
        try {
          let targetUserId: string | undefined;
          for (let page = 1; page <= 10 && !targetUserId; page++) {
            const { data: res } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
            targetUserId = res?.users.find((u) => u.email?.toLowerCase() === email)?.id;
            if (!res?.users.length || res.users.length < 200) break;
          }
          if (targetUserId) {
            if (targetUserId === context.userId) return { ok: false as const, reason: "self" as const };
            await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId).eq("role", role);
          }
        } catch (err) {
          console.warn("Failed to remove role in Supabase:", err);
        }
      }

      try {
        await context.supabase.from("activity_log").insert({
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
        // 1. Search if user already exists in Auth
        for (let page = 1; page <= 10 && !targetUserId; page++) {
          const { data: res } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
          targetUserId = res?.users.find((u) => u.email?.toLowerCase() === email)?.id;
          if (!res?.users.length || res.users.length < 200) break;
        }

        if (targetUserId) {
          // Existing user -> update role
          await supabaseAdmin.from("user_roles").upsert({ user_id: targetUserId, role }, { onConflict: "user_id,role" });
          if (data.full_name) {
            await supabaseAdmin.from("profiles").upsert({ id: targetUserId, full_name: data.full_name });
          }
        } else {
          // User does NOT exist -> Create new account directly
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
              full_name: data.full_name || email.split("@")[0],
            });
            await supabaseAdmin.from("user_roles").upsert(
              { user_id: targetUserId, role },
              { onConflict: "user_id,role" },
            );
          }
        }
      } catch (err) {
        console.warn("Supabase Admin error during setTeamRole:", err);
      }
    }

    // Always record in local store as well
    const stored = await getStoredTeamRoles();
    const existingIndex = stored.findIndex((m) => m.email.toLowerCase() === email);
    const memberRecord: TeamMember = {
      user_id: targetUserId || ("team-" + Math.random().toString(36).substring(2, 10)),
      email,
      role,
      full_name: data.full_name || (existingIndex >= 0 ? stored[existingIndex]!.full_name : email.split("@")[0]),
      created_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      stored[existingIndex] = { ...stored[existingIndex]!, ...memberRecord };
    } else {
      stored.unshift(memberRecord);
      if (!supabaseAdmin) createdNew = true;
    }
    await writeStoredTeamRoles(stored);
    await setRoleAssignment(email, role);
    if (targetUserId) await setRoleAssignment(targetUserId, role);

    try {
      await context.supabase.from("activity_log").insert({
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
      full_name: memberRecord.full_name,
    };
  });
