import crypto from "node:crypto";
import { z } from "zod";
import type { IntakeForm } from "@shared/schema";
import { authStorage } from "../auth/storage";
import { storage } from "../storage";
import {
  sendEmail,
  intakeConfirmationEmail,
  portalActivationEmail,
  intakeExistingClientEmail,
  intakeGoogleUserEmail,
} from "./email";

const ACTIVATION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function appBaseUrl(): string {
  return (
    process.env.APP_URL ||
    process.env.PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://nathanielbaldock.com" : "http://localhost:3000")
  );
}

async function sendActivationTokenEmail(userId: string, email: string, firstName: string) {
  const token = crypto.randomBytes(32).toString("hex");
  await authStorage.setPasswordResetToken(userId, token, new Date(Date.now() + ACTIVATION_TTL_MS));
  await sendEmail(portalActivationEmail(email, firstName, token));
}

/**
 * After a public intake is saved: create or link a client user, then send the right follow-up email(s).
 * Does not throw — log errors; intake HTTP response should still succeed.
 */
export async function provisionPortalAfterIntake(intake: IntakeForm): Promise<void> {
  const raw = intake.email?.trim();
  if (!raw) return;
  const email = raw.toLowerCase();
  const firstName = intake.firstName || "there";
  const lastName = intake.lastName || "";
  const displayName = `${firstName} ${lastName}`.trim() || firstName;
  const goals = intake.problemStatement || intake.goals || undefined;
  const phone = intake.phone || undefined;

  try {
    const existing = await authStorage.getUserByEmail(email);
    if (existing?.role === "coach") {
      await sendEmail(intakeConfirmationEmail(raw, firstName));
      return;
    }

    const loginUrl = `${appBaseUrl()}/login`;

    if (existing) {
      await storage.linkIntakeToUser(intake.id, existing.id);
      const profile = await storage.getClientProfile(existing.id);
      if (!profile) {
        await storage.createClientProfile({
          userId: existing.id,
          phone: phone ?? null,
          goals: goals ?? null,
          status: "active",
        });
      } else if (goals && !profile.goals) {
        await storage.updateClientProfile(profile.id, { goals });
      }

      await sendEmail(intakeConfirmationEmail(raw, firstName));

      if (existing.googleId && !existing.password) {
        await sendEmail(intakeGoogleUserEmail(raw, displayName, loginUrl));
        return;
      }
      if (existing.password) {
        await sendEmail(intakeExistingClientEmail(raw, firstName, loginUrl));
        return;
      }
      await sendActivationTokenEmail(existing.id, raw, firstName);
      return;
    }

    const newUser = await authStorage.upsertUser({
      email,
      username: email,
      firstName: intake.firstName,
      lastName: intake.lastName,
      role: "client",
      emailVerified: false,
    });
    await storage.createClientProfile({
      userId: newUser.id,
      phone: phone ?? null,
      goals: goals ?? null,
      status: "active",
    });
    await storage.linkIntakeToUser(intake.id, newUser.id);
    await sendEmail(intakeConfirmationEmail(raw, firstName));
    await sendActivationTokenEmail(newUser.id, raw, firstName);
  } catch (err) {
    console.error("[portal-provision] provisionPortalAfterIntake failed:", err);
  }
}

const claimSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
});

export function parseCalendarClaimBody(body: unknown): { ok: true; data: z.infer<typeof claimSchema> } | { ok: false; error: string } {
  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: "Valid email is required" };
  }
  return { ok: true, data: parsed.data };
}

/**
 * After booking via Google Calendar UI (self-reported email on thank-you form).
 */
export async function provisionPortalFromCalendarClaim(input: {
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) {
    return { ok: false, error: "Valid email is required" };
  }
  const firstName = (input.firstName?.trim() || "there").slice(0, 100);
  const lastName = (input.lastName?.trim() || "").slice(0, 100);
  const displayName = `${firstName} ${lastName}`.trim() || firstName;

  try {
    const existing = await authStorage.getUserByEmail(email);
    if (existing?.role === "coach") {
      return { ok: false, error: "This email can’t be used for client portal signup" };
    }

    const loginUrl = `${appBaseUrl()}/login`;

    if (existing) {
      if (!(await storage.getClientProfile(existing.id))) {
        await storage.createClientProfile({ userId: existing.id, status: "active" });
      }
      if (existing.googleId && !existing.password) {
        await sendEmail(intakeGoogleUserEmail(email, displayName, loginUrl));
        return { ok: true };
      }
      if (existing.password) {
        await sendEmail(intakeExistingClientEmail(email, firstName, loginUrl));
        return { ok: true };
      }
      await sendActivationTokenEmail(existing.id, email, firstName);
      return { ok: true };
    }

    const newUser = await authStorage.upsertUser({
      email,
      username: email,
      firstName: input.firstName?.trim() || null,
      lastName: input.lastName?.trim() || null,
      role: "client",
      emailVerified: false,
    });
    await storage.createClientProfile({ userId: newUser.id, status: "active" });
    await sendActivationTokenEmail(newUser.id, email, firstName);
    return { ok: true };
  } catch (err) {
    console.error("[portal-provision] provisionPortalFromCalendarClaim failed:", err);
    return { ok: false, error: "Could not complete request. Please try again." };
  }
}
