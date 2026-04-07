import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "@shared/models/auth";
import { authStorage } from "./storage";

const CONSULTANT_EMAIL = "nathanielbaldock@gmail.com";

/**
 * Auto-ensure the single consultant account on every startup when
 * CONSULTANT_PASSWORD is set. Handles all edge cases:
 *   - Account doesn't exist yet → creates it
 *   - Account exists via Google OAuth (no password) → sets the password
 *   - Account exists with wrong password → updates it
 *   - Account has wrong role → corrects to "coach"
 *   - emailVerified is false → sets to true
 */
export async function bootstrapConsultant(): Promise<void> {
  const password = process.env.CONSULTANT_PASSWORD;
  if (!password) return;

  if (password.length < 8) {
    console.warn("[bootstrap] CONSULTANT_PASSWORD is set but shorter than 8 chars — skipping.");
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await authStorage.getUserByEmail(CONSULTANT_EMAIL);

    if (!existing) {
      await authStorage.upsertUser({
        email: CONSULTANT_EMAIL,
        username: CONSULTANT_EMAIL,
        password: hashedPassword,
        firstName: "Nathaniel",
        lastName: "Baldock",
        role: "coach",
        emailVerified: true,
      });
      console.log("[bootstrap] Created consultant account:", CONSULTANT_EMAIL);
      return;
    }

    const needsPasswordUpdate =
      !existing.password || !(await bcrypt.compare(password, existing.password));
    const needsRoleUpdate = existing.role !== "coach";
    const needsVerification = !existing.emailVerified;

    if (!needsPasswordUpdate && !needsRoleUpdate && !needsVerification) return;

    await authStorage.upsertUser({
      id: existing.id,
      email: existing.email,
      username: existing.username ?? CONSULTANT_EMAIL,
      password: needsPasswordUpdate ? hashedPassword : existing.password!,
      firstName: existing.firstName ?? "Nathaniel",
      lastName: existing.lastName ?? "Baldock",
      role: "coach",
      emailVerified: true,
    });

    const changes: string[] = [];
    if (needsPasswordUpdate) changes.push("password");
    if (needsRoleUpdate) changes.push("role→coach");
    if (needsVerification) changes.push("emailVerified→true");
    console.log(`[bootstrap] Updated consultant (${changes.join(", ")}):`, CONSULTANT_EMAIL);
  } catch (err) {
    console.error("[bootstrap] Failed to bootstrap consultant account:", err);
  }
}
