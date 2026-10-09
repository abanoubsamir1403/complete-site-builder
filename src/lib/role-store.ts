import fs from "fs";
import path from "path";

const ROLE_ASSIGNMENTS_FILE = "data/role_assignments.json";

export async function getRoleAssignments(): Promise<Record<string, "client" | "staff" | "admin">> {
  try {
    const fullPath = path.resolve(process.cwd(), ROLE_ASSIGNMENTS_FILE);
    if (!fs.existsSync(fullPath)) return {};
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content || "{}");
  } catch {
    return {};
  }
}

export async function setRoleAssignment(
  userIdOrEmail: string,
  role: "client" | "staff" | "admin",
): Promise<void> {
  try {
    const assignments = await getRoleAssignments();
    assignments[userIdOrEmail.toLowerCase()] = role;
    const dir = path.resolve(process.cwd(), "data");
    const fullPath = path.resolve(dir, "role_assignments.json");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(assignments, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save role assignment:", err);
  }
}

export async function removeRoleAssignment(userIdOrEmail: string): Promise<void> {
  try {
    const assignments = await getRoleAssignments();
    delete assignments[userIdOrEmail.toLowerCase()];
    const dir = path.resolve(process.cwd(), "data");
    const fullPath = path.resolve(dir, "role_assignments.json");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, JSON.stringify(assignments, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to remove role assignment:", err);
  }
}
