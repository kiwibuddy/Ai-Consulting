import { and, desc, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { authStorage } from "../auth";
import { storage } from "../storage";
import { intakeForms, type InsertSession } from "@shared/schema";

const bookingPayloadSchema = z.object({
  eventId: z.string().min(1),
  title: z.string().min(1).max(200),
  attendeeEmail: z.string().email(),
  attendeeName: z.string().min(1).max(200).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  meetingLink: z.string().url().optional(),
  status: z.enum(["confirmed", "cancelled", "completed"]).default("confirmed"),
});

export type CalendarBookingPayload = z.infer<typeof bookingPayloadSchema>;

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function splitName(displayName?: string): { firstName: string; lastName?: string } {
  if (!displayName) return { firstName: "there" };
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "there" };
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function mapBookingStatus(status: CalendarBookingPayload["status"]): InsertSession["status"] {
  if (status === "cancelled") return "cancelled";
  if (status === "completed") return "completed";
  return "scheduled";
}

export function parseCalendarBookingPayload(
  body: unknown,
): { ok: true; data: CalendarBookingPayload } | { ok: false; error: string } {
  const parsed = bookingPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: "Invalid booking payload" };
  }
  return { ok: true, data: parsed.data };
}

export function verifyCalendarWebhookSecret(headerValue: string | undefined): boolean {
  const expected = process.env.GOOGLE_CALENDAR_WEBHOOK_SECRET;
  if (!expected) return false;
  if (!headerValue) return false;
  return headerValue === expected;
}

export async function ingestCalendarBooking(payload: CalendarBookingPayload): Promise<{ ok: true }> {
  const attendeeEmail = normalizeEmail(payload.attendeeEmail);
  const { firstName, lastName } = splitName(payload.attendeeName);

  let user = await authStorage.getUserByEmail(attendeeEmail);
  if (user?.role === "coach") {
    return { ok: true };
  }

  if (!user) {
    user = await authStorage.upsertUser({
      email: attendeeEmail,
      username: attendeeEmail,
      firstName,
      lastName: lastName ?? null,
      role: "client",
      emailVerified: true,
    });
  }

  let profile = await storage.getClientProfile(user.id);
  if (!profile) {
    profile = await storage.createClientProfile({
      userId: user.id,
      status: "active",
    });
  }

  const [latestUnlinkedIntake] = await db
    .select({ id: intakeForms.id })
    .from(intakeForms)
    .where(
      and(
        or(eq(intakeForms.email, attendeeEmail), eq(intakeForms.email, payload.attendeeEmail.trim())),
        isNull(intakeForms.linkedUserId),
      ),
    )
    .orderBy(desc(intakeForms.createdAt))
    .limit(1);

  if (latestUnlinkedIntake?.id) {
    await storage.linkIntakeToUser(latestUnlinkedIntake.id, user.id);
  }

  const start = new Date(payload.startTime);
  const end = new Date(payload.endTime);
  const durationMinutes = Math.max(15, Math.round((end.getTime() - start.getTime()) / (1000 * 60)));
  const status = mapBookingStatus(payload.status);
  const sourcePrefix = "[Google Calendar Booking]";

  await storage.upsertSessionByCalendarEventId(payload.eventId, {
    clientId: profile.id,
    title: payload.title || `${sourcePrefix} 30-min discovery call`,
    description: `${sourcePrefix}${payload.attendeeName ? ` for ${payload.attendeeName}` : ""}`,
    scheduledAt: start,
    duration: durationMinutes,
    status,
    requestedBy: "client",
    meetingLink: payload.meetingLink,
    calendarSyncedAt: new Date(),
  });

  const sessionCount = await storage.getSessionCountByClient(profile.id);
  if (sessionCount >= 2) {
    const coaches = await storage.getUsersByRole("coach");
    for (const coach of coaches) {
      await storage.createNotification({
        userId: coach.id,
        type: "action_due",
        title: "Client ready for billing follow-up",
        message: `${payload.attendeeName || attendeeEmail} now has ${sessionCount} sessions. Consider creating an invoice or quote.`,
        relatedId: profile.id,
      });
    }
  }

  return { ok: true };
}
