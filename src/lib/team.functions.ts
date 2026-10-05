import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Error("Admins only");
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin.from("user_roles").select("user_id, role").in("role", ["admin", "staff"]);
    if (error) throw error;
    const out: { user_id: string; email: string; role: string }[] = [];
    for (const r of roles ?? []) {
      const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      out.push({ user_id: r.user_id, role: r.role, email: data.user?.email ?? r.user_id });
    }
    return out;
  });

export const setTeamRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ email: z.string().email().max(255), role: z.enum(["admin", "staff"]), remove: z.boolean().default(false) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();
    let userId: string | undefined;
    for (let page = 1; page <= 20 && !userId; page++) {
      const { data: res, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
      if (error) throw error;
      userId = res.users.find((u) => u.email?.toLowerCase() === email)?.id;
      if (res.users.length < 200) break;
    }
    if (!userId) return { ok: false as const, reason: "not_found" as const };
    if (data.remove) {
      if (userId === context.userId) return { ok: false as const, reason: "self" as const };
      await supabaseAdmin.from("user_roles").delete().eq("user_id", userId).eq("role", data.role);
    } else {
      await supabaseAdmin.from("user_roles").upsert({ user_id: userId, role: data.role }, { onConflict: "user_id,role" });
    }
    return { ok: true as const };
  });
