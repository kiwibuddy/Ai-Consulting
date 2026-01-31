/**
 * One-off script: adds engagement variety to an existing DB without wiping data.
 * - Adds action items for Alex, Jordan, Riley, Sam, Morgan, Casey, and Nathaniel (dev).
 * - Optionally adds 1 completed session each for Casey and Morgan so they show
 *   "Last session" and better engagement on the dashboard.
 *
 * Run once: npx tsx script/one-off-add-engagement.ts
 * Requires: DATABASE_URL in .env (same as your app / seed).
 *
 * Safe to run on an existing DB. If you run it twice, you will get duplicate
 * action items and sessions for Casey/Morgan.
 */
import "dotenv/config";
import { authStorage } from "../server/auth/storage";
import { storage } from "../server/storage";
import { subDays, addDays } from "date-fns";

const COACH_EMAIL = "coach@example.com";

const CLIENT_EMAILS = [
  "alex@demo.com",
  "jordan@demo.com",
  "riley@demo.com",
  "sam@demo.com",
  "morgan@demo.com",
  "casey@demo.com",
  "nathanielbaldock@gmail.com",
];

const ACTION_TEMPLATES = [
  { title: "Complete StrengthsFinder reflection", status: "completed" as const, dueDaysAgo: 5 },
  { title: "Send weekly progress update", status: "completed" as const, dueDaysAgo: 2 },
  { title: "Practice boundary-setting script", status: "in_progress" as const, dueDaysAhead: 3 },
  { title: "Review leadership 360 feedback", status: "completed" as const, dueDaysAgo: 10 },
  { title: "Schedule 1:1 with direct report", status: "pending" as const, dueDaysAhead: 7 },
  { title: "Draft 90-day goals", status: "in_progress" as const, dueDaysAhead: 5 },
  { title: "Read assigned chapter", status: "completed" as const, dueDaysAgo: 1 },
];

async function main() {
  console.log("One-off: adding engagement data (action items + optional sessions)...\n");

  const coach = await authStorage.getUserByEmail(COACH_EMAIL);
  if (!coach) {
    console.error("Coach not found:", COACH_EMAIL);
    process.exit(1);
  }

  // Resolve client profiles by email
  const profiles: { email: string; profileId: string; userId: string }[] = [];
  for (const email of CLIENT_EMAILS) {
    const user = await authStorage.getUserByEmail(email);
    if (!user) {
      console.warn("  Skip (user not found):", email);
      continue;
    }
    const profile = await storage.getClientProfile(user.id);
    if (!profile) {
      console.warn("  Skip (no profile):", email);
      continue;
    }
    profiles.push({ email, profileId: profile.id, userId: user.id });
  }

  // Add one action item per client (except dev gets two)
  console.log("Adding action items...");
  for (let i = 0; i < profiles.length; i++) {
    const { email, profileId } = profiles[i];
    const isDev = email === "nathanielbaldock@gmail.com";
    const templates = isDev
      ? [
          { title: "Update career roadmap draft", status: "completed" as const, dueDaysAgo: 3 },
          { title: "Send follow-up email to sponsor", status: "in_progress" as const, dueDaysAhead: 2 },
        ]
      : [ACTION_TEMPLATES[i % ACTION_TEMPLATES.length]];

    for (const t of templates) {
      const dueDate =
        t.status === "completed"
          ? subDays(new Date(), (t as { dueDaysAgo?: number }).dueDaysAgo ?? 5)
          : addDays(new Date(), (t as { dueDaysAhead?: number }).dueDaysAhead ?? 7);
      await storage.createActionItem({
        clientId: profileId,
        title: t.title,
        description: "From coaching session.",
        dueDate,
        status: t.status,
        createdBy: coach.id,
      });
      console.log("  ✓", email, "–", t.title);
    }
  }

  // Optional: one completed session each for Casey and Morgan (so dashboard shows "Last session")
  const caseyProfile = profiles.find((p) => p.email === "casey@demo.com");
  const morganProfile = profiles.find((p) => p.email === "morgan@demo.com");

  if (caseyProfile) {
    const existing = await storage.getSessionsByClient(caseyProfile.profileId);
    const completed = existing.filter((s) => s.status === "completed");
    if (completed.length === 0) {
      await storage.createSession({
        clientId: caseyProfile.profileId,
        title: "Discovery Session – Casey Brown",
        description: "Initial coaching session.",
        scheduledAt: subDays(new Date(), 14),
        duration: 60,
        status: "completed",
        requestedBy: "coach",
        sessionNotes: "Good first session. Goals clarified.",
        notesVisibleToClient: true,
      });
      console.log("  ✓ Casey: 1 completed session added (2 weeks ago)");
    }
  }

  if (morganProfile) {
    const existing = await storage.getSessionsByClient(morganProfile.profileId);
    const completed = existing.filter((s) => s.status === "completed");
    if (completed.length < 2) {
      await storage.createSession({
        clientId: morganProfile.profileId,
        title: "Progress Review – Morgan Lee",
        description: "Coaching session.",
        scheduledAt: subDays(new Date(), 7),
        duration: 60,
        status: "completed",
        requestedBy: "client",
        sessionNotes: "Progress on confidence and boundaries.",
        notesVisibleToClient: true,
      });
      console.log("  ✓ Morgan: 1 completed session added (1 week ago)");
    }
  }

  console.log("\nDone. Dashboard client activity and action items should show more variety.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
