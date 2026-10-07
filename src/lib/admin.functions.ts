import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Admins only");
}

async function log(supabase: any, actor: string, action: string, target: string, details: Record<string, unknown> = {}) {
  await supabase.from("activity_log").insert({ actor_id: actor, action, target, details });
}

export type AdminUser = {
  id: string; email: string; full_name: string | null; phone: string | null;
  roles: string[]; created_at: string; last_sign_in_at: string | null;
  banned: boolean; cases: number;
};

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminUser[]> => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const users: any[] = [];
    for (let page = 1; page <= 50; page++) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      users.push(...data.users);
      if (data.users.length < 200) break;
    }
    const [{ data: profiles }, { data: roles }, { data: cases }] = await Promise.all([
      supabaseAdmin.from("profiles").select("id, full_name, phone"),
      supabaseAdmin.from("user_roles").select("user_id, role"),
      supabaseAdmin.from("cases").select("client_id"),
    ]);
    return users.map((u) => {
      const p = profiles?.find((x) => x.id === u.id);
      return {
        id: u.id,
        email: u.email ?? "",
        full_name: p?.full_name ?? null,
        phone: p?.phone ?? null,
        roles: (roles ?? []).filter((r) => r.user_id === u.id).map((r) => r.role),
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
        banned: !!u.banned_until && new Date(u.banned_until) > new Date(),
        cases: (cases ?? []).filter((c) => c.client_id === u.id).length,
      };
    });
  });

const idSchema = z.string().uuid();

export const adminUpdateUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      id: idSchema,
      full_name: z.string().trim().max(120).nullable(),
      phone: z.string().trim().max(40).nullable(),
      role: z.enum(["client", "staff", "admin"]),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("profiles").upsert({ id: data.id, full_name: data.full_name, phone: data.phone });
    if (data.id === context.userId && data.role !== "admin") return { ok: false as const, reason: "self" as const };
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id).in("role", ["staff", "admin"]);
    if (data.role !== "client") await supabaseAdmin.from("user_roles").upsert({ user_id: data.id, role: data.role }, { onConflict: "user_id,role" });
    await supabaseAdmin.from("user_roles").upsert({ user_id: data.id, role: "client" }, { onConflict: "user_id,role" });
    await log(context.supabase, context.userId, "user.update", data.id, { role: data.role });
    return { ok: true as const };
  });

export const adminSetBan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: idSchema, banned: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    if (data.id === context.userId) return { ok: false as const, reason: "self" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.id, { ban_duration: data.banned ? "876000h" : "none" });
    if (error) throw error;
    await log(context.supabase, context.userId, data.banned ? "user.suspend" : "user.activate", data.id);
    return { ok: true as const };
  });

export const adminDeleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: idSchema }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    if (data.id === context.userId) return { ok: false as const, reason: "self" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u } = await supabaseAdmin.auth.admin.getUserById(data.id);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (error) throw error;
    await log(context.supabase, context.userId, "user.delete", u.user?.email ?? data.id);
    return { ok: true as const };
  });

export const listActivity = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await context.supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(300);
    const ids = [...new Set((data ?? []).map((r: any) => r.actor_id).filter(Boolean))] as string[];
    const emails: Record<string, string> = {};
    for (const id of ids) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(id);
      emails[id] = u.user?.email ?? id;
    }
    return (data ?? []).map((r: any) => ({ id: r.id as string, action: r.action as string, target: (r.target ?? "") as string, created_at: r.created_at as string, actor: r.actor_id ? emails[r.actor_id] ?? "" : "—" }));
  });
