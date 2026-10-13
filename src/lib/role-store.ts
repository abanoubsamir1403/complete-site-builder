import { getSupabaseAdminSafe } from "@/integrations/supabase/client.server";

export async function getRoleAssignments(): Promise<Record<string, "client" | "staff" | "admin">> {
  const admin = getSupabaseAdminSafe();
  if (!admin) return {};
  try {
    const { data, error } = await admin.from("user_roles").select("user_id, role");
    if (error) {
      console.warn("Failed to fetch roles from Supabase:", error);
      return {};
    }
    const map: Record<string, "client" | "staff" | "admin"> = {};
    for (const r of data ?? []) {
      map[r.user_id] = r.role as "client" | "staff" | "admin";
    }
    return map;
  } catch (err) {
    console.error("Failed to fetch roles from Supabase:", err);
    return {};
  }
}

export async function setRoleAssignment(
  userId: string,
  role: "client" | "staff" | "admin",
): Promise<void> {
  const admin = getSupabaseAdminSafe();
  if (!admin) return;
  try {
    await admin.from("user_roles").delete().eq("user_id", userId);
    if (role !== "client") {
      await admin.from("user_roles").insert({ user_id: userId, role });
    }
  } catch (err) {
    console.error("Failed to set role assignment in Supabase:", err);
  }
}

export async function removeRoleAssignment(userId: string): Promise<void> {
  const admin = getSupabaseAdminSafe();
  if (!admin) return;
  try {
    await admin.from("user_roles").delete().eq("user_id", userId);
  } catch (err) {
    console.error("Failed to remove role assignment from Supabase:", err);
  }
}
