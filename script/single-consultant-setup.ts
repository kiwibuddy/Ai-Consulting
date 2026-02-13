/**
 * One-off script: ensure only one consultant exists (nathanielbaldock@gmail.com)
 * and remove all other coach accounts.
 *
 * Run once (e.g. after cloning or when converting to single-consultant):
 *   CONSULTANT_INITIAL_PASSWORD=YourPassword npx tsx script/single-consultant-setup.ts
 *
 * Do not commit the password. Unset CONSULTANT_INITIAL_PASSWORD after running.
 */
import "dotenv/config";

import bcrypt from "bcryptjs";
import { eq, and, ne } from "drizzle-orm";
import { db } from "../server/db";
import { users } from "@shared/models/auth";
import { authStorage } from "../server/auth/storage";

const CONSULTANT_EMAIL = "nathanielbaldock@gmail.com";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const password = process.env.CONSULTANT_INITIAL_PASSWORD;
  if (!password || password.length < 8) {
    console.error(
      "CONSULTANT_INITIAL_PASSWORD must be set and at least 8 characters. Example:\n  CONSULTANT_INITIAL_PASSWORD=YourPassword npx tsx script/single-consultant-setup.ts"
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 1. Delete all users with role 'coach' and email !== CONSULTANT_EMAIL
  const coachesToRemove = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(and(eq(users.role, "coach"), ne(users.email, CONSULTANT_EMAIL)));

  for (const row of coachesToRemove) {
    await authStorage.deleteUser(row.id);
    console.log("Removed coach:", row.email ?? row.id);
  }

  if (coachesToRemove.length === 0) {
    console.log("No other coach accounts to remove.");
  }

  // 2. Ensure CONSULTANT_EMAIL exists as coach; create or update password
  let consultant = await authStorage.getUserByEmail(CONSULTANT_EMAIL);

  if (!consultant) {
    consultant = await authStorage.upsertUser({
      email: CONSULTANT_EMAIL,
      username: CONSULTANT_EMAIL,
      password: hashedPassword,
      firstName: "Nathaniel",
      lastName: "Baldock",
      role: "coach",
      emailVerified: true,
    });
    console.log("Created single consultant:", CONSULTANT_EMAIL);
  } else {
    if (consultant.role !== "coach") {
      await db
        .update(users)
        .set({ role: "coach", updatedAt: new Date() })
        .where(eq(users.id, consultant.id));
      console.log("Updated role to coach for:", CONSULTANT_EMAIL);
    }
    await authStorage.upsertUser({
      id: consultant.id,
      email: consultant.email,
      username: consultant.username,
      password: hashedPassword,
      firstName: consultant.firstName ?? "Nathaniel",
      lastName: consultant.lastName ?? "Baldock",
      role: "coach",
      emailVerified: consultant.emailVerified ?? true,
    });
    console.log("Updated password for single consultant:", CONSULTANT_EMAIL);
  }

  console.log("\nDone. Only consultant login is:", CONSULTANT_EMAIL);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
