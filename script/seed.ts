/**
 * Seed script: creates demo coach and client accounts with sample data
 * so you can log in and test all features.
 *
 * Run: npm run db:seed
 *
 * Demo credentials (password for both): demo123
 * - Coach: coach@example.com
 * - Client: client@example.com
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { authStorage } from "../server/auth/storage";
import { storage } from "../server/storage";

const DEMO_PASSWORD = "demo123";
const COACH_EMAIL = "coach@example.com";
const CLIENT_EMAIL = "client@example.com";

async function seed() {
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  // ----- Coach -----
  let coach = await authStorage.getUserByEmail(COACH_EMAIL);
  if (!coach) {
    coach = await authStorage.upsertUser({
      email: COACH_EMAIL,
      username: COACH_EMAIL,
      password: hashedPassword,
      firstName: "Demo",
      lastName: "Coach",
      role: "coach",
    });
    console.log("Created coach:", COACH_EMAIL);
  } else {
    await authStorage.upsertUser({
      id: coach.id,
      email: coach.email,
      username: coach.username,
      password: hashedPassword,
      firstName: coach.firstName ?? "Demo",
      lastName: coach.lastName ?? "Coach",
      role: "coach",
    });
    console.log("Updated coach password:", COACH_EMAIL);
  }

  // ----- Client -----
  let client = await authStorage.getUserByEmail(CLIENT_EMAIL);
  if (!client) {
    client = await authStorage.upsertUser({
      email: CLIENT_EMAIL,
      username: CLIENT_EMAIL,
      password: hashedPassword,
      firstName: "Demo",
      lastName: "Client",
      role: "client",
    });
    console.log("Created client:", CLIENT_EMAIL);
  } else {
    await authStorage.upsertUser({
      id: client.id,
      email: client.email,
      username: client.username,
      password: hashedPassword,
      firstName: client.firstName ?? "Demo",
      lastName: client.lastName ?? "Client",
      role: "client",
    });
    console.log("Updated client password:", CLIENT_EMAIL);
  }

  // ----- Client profile (required for client dashboard, sessions, actions) -----
  let clientProfile = await storage.getClientProfile(client.id);
  if (!clientProfile) {
    clientProfile = await storage.createClientProfile({
      userId: client.id,
      status: "active",
      goals: "Demo goals for testing. Explore sessions, actions, and resources.",
    });
    console.log("Created client profile for", CLIENT_EMAIL);
  }

  // ----- Coach settings (for calculator, scheduling defaults) -----
  let coachSettings = await storage.getCoachSettings(coach.id);
  if (!coachSettings) {
    coachSettings = await storage.createOrUpdateCoachSettings(coach.id, {
      hourlyRate: 150,
      sessionDuration: 60,
      packageDiscount: 10,
    });
    console.log("Created coach settings for", COACH_EMAIL);
  }

  // ----- One demo session (coach + client can both access) -----
  let demoSession: Awaited<ReturnType<typeof storage.getSession>>;
  const existingSessions = await storage.getSessionsByClient(clientProfile.id);
  if (existingSessions.length === 0) {
    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 1);
    scheduledAt.setHours(14, 0, 0, 0);
    demoSession = await storage.createSession({
      clientId: clientProfile.id,
      title: "Welcome / Kickoff Session",
      description: "Demo session to explore the portal. Try viewing details, adding notes, and reflecting.",
      scheduledAt,
      duration: 60,
      status: "scheduled",
      requestedBy: "coach",
      meetingLink: "https://meet.example.com/demo",
      prepNotes: "Prep notes visible to coach only (unless you enable notes visible to client).",
      notesVisibleToClient: false,
    });
    console.log("Created demo session for coach & client");
  } else {
    demoSession = existingSessions[0];
  }
  const existingActions = await storage.getActionItemsByClient(clientProfile.id);
  if (existingActions.length === 0) {
    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: demoSession.id,
      title: "Complete intake reflection",
      description: "Demo action item. Try marking it in progress or completed.",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      createdBy: coach.id,
    });
    console.log("Created demo action item");
  }

  // ----- Notifications (so coach and client see something in the bell) -----
  const coachNotifications = await storage.getNotificationsByUser(coach.id);
  const clientNotifications = await storage.getNotificationsByUser(client.id);
  if (coachNotifications.length === 0) {
    await storage.createNotification({
      userId: coach.id,
      type: "session_scheduled",
      title: "Session scheduled",
      message: "Demo session with Demo Client is on the calendar.",
      relatedId: demoSession.id,
    });
    console.log("Created demo notification for coach");
  }
  if (clientNotifications.length === 0) {
    await storage.createNotification({
      userId: client.id,
      type: "session_scheduled",
      title: "Session scheduled",
      message: "Your demo session with Demo Coach is on the calendar.",
      relatedId: demoSession.id,
    });
    console.log("Created demo notification for client");
  }

  // ----- One demo resource (client can see Resources list) -----
  const clientResources = await storage.getResourcesByClient(clientProfile.id);
  if (clientResources.length === 0) {
    await storage.createResource({
      title: "Welcome resource",
      description: "Demo resource. You can upload more from the coach or client side.",
      fileType: "document",
      fileName: "welcome.pdf",
      clientId: clientProfile.id,
      sessionId: demoSession.id,
      isGlobal: false,
      uploadedBy: coach.id,
    });
    console.log("Created demo resource for client");
  }

  console.log("\n--- Demo accounts ready ---");
  console.log("Password for both: " + DEMO_PASSWORD);
  console.log("Coach:  " + COACH_EMAIL + "  → sign in, then go to /coach/dashboard");
  console.log("Client: " + CLIENT_EMAIL + " → sign in, then go to /client/dashboard");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
