/**
 * Set nathanielbaldock@gmail.com to consultant (coach) role.
 * Run against production DB to fix "client portal" redirect:
 *
 *   DATABASE_URL="postgresql://..." npx tsx script/set-consultant-role.ts
 *
 * Use Railway Postgres URL (from Variables or Connect). Does not change password.
 */
import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../server/db";
import { users } from "@shared/models/auth";

const CONSULTANT_EMAIL = "nathanielbaldock@gmail.com";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Use your Railway Postgres URL.");
    process.exit(1);
  }

  const normalizedEmail = CONSULTANT_EMAIL.trim().toLowerCase();
  const [updated] = await db
    .update(users)
    .set({ role: "coach", updatedAt: new Date() })
    .where(eq(users.email, normalizedEmail))
    .returning({ id: users.id, email: users.email, role: users.role });

  if (updated) {
    console.log("Updated to consultant:", updated.email, "→ role:", updated.role);
  } else {
    console.log("No user found with email:", CONSULTANT_EMAIL);
    console.log("Create an account first (e.g. sign up or use password reset), then run this again.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
