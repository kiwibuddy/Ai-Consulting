/**
 * Seed script: creates demo consultant and 8 clients with robust demo data (~6 months
 * of operation: varied tenure, 1 pending intake, sessions, action items, resources).
 *
 * Run: npm run db:seed
 *
 * Demo credentials (password for all): demo123
 * - Consultant: coach@example.com
 * - Clients: client@example.com, nathanielbaldock@gmail.com, alex@demo.com, jordan@demo.com,
 *   sam@demo.com, morgan@demo.com, casey@demo.com, riley@demo.com
 * - 1 pending intake: Jamie Rivera
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { authStorage } from "../server/auth/storage";
import { storage } from "../server/storage";
import { db } from "../server/db";
import { payments, invoices } from "@shared/schema";
import type { ClientProfile } from "@shared/schema";
import { subDays, addDays, subWeeks, subMonths, addHours } from "date-fns";

const DEMO_PASSWORD = "demo123";
const COACH_EMAIL = "coach@example.com";
const CLIENT_EMAIL = "client@example.com";

type ClientSeed = {
  email: string;
  firstName: string;
  lastName: string;
  goals: string;
  phone?: string;
  tenure: "6months" | "4months" | "2months" | "1month" | "new" | "dev";
};

async function ensureClient(
  hashedPassword: string,
  coachId: string,
  def: ClientSeed
): Promise<{ user: { id: string }; profile: ClientProfile }> {
  let user = await authStorage.getUserByEmail(def.email);
  if (!user) {
    user = await authStorage.upsertUser({
      email: def.email,
      username: def.email,
      password: hashedPassword,
      firstName: def.firstName,
      lastName: def.lastName,
      role: "client",
      emailVerified: true,
    });
  } else {
    await authStorage.upsertUser({
      id: user.id,
      email: user.email,
      username: user.username,
      password: hashedPassword,
      firstName: def.firstName,
      lastName: def.lastName,
      role: "client",
      emailVerified: true,
    });
  }
  let profile = await storage.getClientProfile(user!.id);
  if (!profile) {
    profile = await storage.createClientProfile({
      userId: user!.id,
      status: "active",
      phone: def.phone ?? "+1 (555) 000-0000",
      goals: def.goals,
      preferredContactMethod: "email",
    });
  } else {
    profile = await storage.updateClientProfile(profile.id, { goals: def.goals }) ?? profile;
  }
  return { user: user!, profile };
}

async function seed() {
  console.log("Starting comprehensive seed...\n");
  
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  // ----- Consultant -----
  let coach = await authStorage.getUserByEmail(COACH_EMAIL);
  if (!coach) {
    coach = await authStorage.upsertUser({
      email: COACH_EMAIL,
      username: COACH_EMAIL,
      password: hashedPassword,
      firstName: "Demo",
      lastName: "Consultant",
      role: "coach",
      emailVerified: true, // Demo account – skip verification for local/testing
    });
    console.log("✓ Created consultant:", COACH_EMAIL);
  } else {
    await authStorage.upsertUser({
      id: coach.id,
      email: coach.email,
      username: coach.username,
      password: hashedPassword,
      firstName: "Demo",
      lastName: "Consultant",
      role: "coach",
      emailVerified: true, // Demo account – skip verification for local/testing
    });
    console.log("✓ Updated consultant password:", COACH_EMAIL);
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
      emailVerified: true, // Demo account – skip verification for local/testing
    });
    console.log("✓ Created client:", CLIENT_EMAIL);
  } else {
    await authStorage.upsertUser({
      id: client.id,
      email: client.email,
      username: client.username,
      password: hashedPassword,
      firstName: client.firstName ?? "Demo",
      lastName: client.lastName ?? "Client",
      role: "client",
      emailVerified: true, // Demo account – skip verification for local/testing
    });
    console.log("✓ Updated client password:", CLIENT_EMAIL);
  }

  // ----- Client profile -----
  let clientProfile = await storage.getClientProfile(client.id);
  if (!clientProfile) {
    clientProfile = await storage.createClientProfile({
      userId: client.id,
      status: "active",
      phone: "+1 (555) 123-4567",
      goals: "Exploring AI adoption for donor engagement and content creation. Want to automate routine communications while preserving mission voice.",
      preferredContactMethod: "email",
    });
    console.log("✓ Created client profile");
  } else {
    await storage.updateClientProfile(clientProfile.id, {
      goals: "Exploring AI adoption for donor engagement and content creation. Want to automate routine communications while preserving mission voice.",
    });
  }

  // ----- Dev login (nathanielbaldock@gmail.com) so you can log in at localhost:3001 -----
  const DEV_EMAIL = "nathanielbaldock@gmail.com";
  let devUser = await authStorage.getUserByEmail(DEV_EMAIL);
  if (!devUser) {
    devUser = await authStorage.upsertUser({
      email: DEV_EMAIL,
      username: DEV_EMAIL,
      password: hashedPassword,
      firstName: "Nathaniel",
      lastName: "Baldock",
      role: "client",
      emailVerified: true,
    });
    console.log("✓ Created dev login:", DEV_EMAIL, "(password: demo123)");
  } else {
    await authStorage.upsertUser({
      id: devUser.id,
      email: devUser.email,
      username: devUser.username,
      password: hashedPassword,
      firstName: devUser.firstName ?? "Nathaniel",
      lastName: devUser.lastName ?? "Baldock",
      role: devUser.role ?? "client",
      emailVerified: true,
    });
    console.log("✓ Updated dev login:", DEV_EMAIL, "(password: demo123)");
  }
  let devProfile = await storage.getClientProfile(devUser!.id);
  if (!devProfile) {
    devProfile = await storage.createClientProfile({
      userId: devUser!.id,
      status: "active",
      goals: "Dev account for testing the AI consulting portal.",
      preferredContactMethod: "email",
    });
    console.log("✓ Created client profile for", DEV_EMAIL);
  } else {
    await storage.updateClientProfile(devProfile.id, { goals: "Dev account for testing the AI consulting portal." });
  }

  // ----- 6 additional demo clients (8 total with Demo Client + dev) -----
  const extraClientDefs: ClientSeed[] = [
    {
      email: "alex@demo.com",
      firstName: "Alex",
      lastName: "Chen",
      goals: "AI strategy for mission organisation. Exploring LLMs for donor communications, content creation, and program reporting automation.",
      tenure: "6months",
    },
    {
      email: "jordan@demo.com",
      firstName: "Jordan",
      lastName: "Smith",
      goals: "Curriculum team wants to pilot AI-assisted lesson planning and assessment. Need guidance on safe deployment and guardrails.",
      tenure: "4months",
    },
    {
      email: "riley@demo.com",
      firstName: "Riley",
      lastName: "Davis",
      goals: "Nonprofit leadership exploring AI for grant writing, impact reporting, and volunteer coordination. Faith-sector sensitivity required.",
      tenure: "6months",
    },
    {
      email: "sam@demo.com",
      firstName: "Sam",
      lastName: "Taylor",
      goals: "Education sector: AI tools for student support and administrative workflows. Focus on ethical use and data privacy.",
      tenure: "2months",
    },
    {
      email: "morgan@demo.com",
      firstName: "Morgan",
      lastName: "Lee",
      goals: "First-time AI adoption. Small team needs practical tools for outreach, social media, and internal operations.",
      tenure: "1month",
    },
    {
      email: "casey@demo.com",
      firstName: "Casey",
      lastName: "Brown",
      goals: "Church communications lead. Exploring AI for newsletters, sermon prep support, and pastoral care workflows.",
      tenure: "new",
    },
  ];

  const extraClients: { user: { id: string }; profile: ClientProfile }[] = [];
  for (const def of extraClientDefs) {
    const c = await ensureClient(hashedPassword, coach.id, def);
    extraClients.push(c);
    console.log("✓ Client:", def.firstName, def.lastName, `(${def.email})`);
  }

  // ----- 1 new pending intake form -----
  const existingIntakes = await storage.getAllIntakeForms();
  if (existingIntakes.length < 2) {
    await storage.createIntakeForm({
      firstName: "Jamie",
      lastName: "Rivera",
      email: "jamie.rivera@example.com",
      phone: "+1 (555) 987-6543",
      problemStatement: "Our mission organisation needs to scale donor communications and impact reporting without adding headcount. We're manually writing newsletters, grant reports, and program updates. We're exploring AI but need guidance on strategy, tool selection, and maintaining our mission voice. We have theological and safeguarding considerations.",
      organisation: "Rivera Foundation",
      industry: "faith_mission",
      role: "Director of Communications",
      currentSituation: "Using Mailchimp, Google Workspace, and spreadsheets. Grant reporting is a major bottleneck.",
      shortTermGoals: "Pilot AI for newsletter drafts and one grant report within 3 months.",
      availability: "afternoons",
      howDidYouHear: "linkedin",
      location: "San Francisco, CA",
      preferredMeetingFormat: "video_zoom",
      status: "pending",
    });
    console.log("✓ Pending intake: Jamie Rivera (jamie.rivera@example.com)");
  }

  // ----- Coach settings -----
  let coachSettings = await storage.getCoachSettings(coach.id);
  if (!coachSettings) {
    coachSettings = await storage.createOrUpdateCoachSettings(coach.id, {
      hourlyRate: 175,
      sessionDuration: 60,
      packageDiscount: 15,
    });
    console.log("✓ Created coach settings");
  }

  // ----- Multiple Sessions -----
  const existingSessions = await storage.getSessionsByClient(clientProfile.id);
  
  if (existingSessions.length < 5) {
    // Clear existing sessions for fresh data
    console.log("Creating comprehensive session history...");

    // Session 1: Completed session from 3 weeks ago
    const session1 = await storage.createSession({
      clientId: clientProfile.id,
      title: "Discovery & Scoping",
      description: "Initial consultation to understand AI goals, current tools, and constraints.",
      scheduledAt: subWeeks(new Date(), 3),
      duration: 90,
      status: "completed",
      requestedBy: "coach",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      prepNotes: "Review intake form. Prepare AI use-case discovery questions.",
      sessionNotes: "Strong initial session. Client wants to automate donor comms and impact reporting. Key focus: tool selection, mission voice, and data privacy.",
      notesVisibleToClient: true,
      clientReflection: "Very helpful! I have a clearer picture of where AI can help and what to avoid.",
    });
    console.log("  ✓ Session 1: Discovery & Scoping (completed)");

    // Session 2: Completed session from 2 weeks ago
    const session2 = await storage.createSession({
      clientId: clientProfile.id,
      title: "AI Tool Evaluation",
      description: "Evaluating ChatGPT, Claude, and other tools for mission use cases.",
      scheduledAt: subWeeks(new Date(), 2),
      duration: 60,
      status: "completed",
      requestedBy: "client",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      prepNotes: "Prepare tool comparison matrix. Review client's use cases.",
      sessionNotes: "Walked through tool options. Client leaning toward Claude for drafting. Assigned prompt-engineering exercises.",
      notesVisibleToClient: true,
      clientReflection: "The tool comparison was really useful. I'll try the prompt exercises this week.",
    });
    console.log("  ✓ Session 2: AI Tool Evaluation (completed)");

    // Session 3: Completed session from 1 week ago
    const session3 = await storage.createSession({
      clientId: clientProfile.id,
      title: "Prompt Engineering & Guardrails",
      description: "Building effective prompts and safety guardrails for mission-sensitive content.",
      scheduledAt: subWeeks(new Date(), 1),
      duration: 60,
      status: "completed",
      requestedBy: "coach",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      prepNotes: "Review prompt templates. Prepare theological guardrail examples.",
      sessionNotes: "Reviewed prompt patterns. Created custom system prompts for donor comms. Discussed review workflows.",
      notesVisibleToClient: true,
    });
    console.log("  ✓ Session 3: Prompt Engineering (completed)");

    // Session 4: Upcoming session tomorrow
    const tomorrow = addDays(new Date(), 1);
    tomorrow.setHours(14, 0, 0, 0);
    const session4 = await storage.createSession({
      clientId: clientProfile.id,
      title: "Pilot Implementation Review",
      description: "Review first AI-assisted newsletter and grant report drafts.",
      scheduledAt: tomorrow,
      duration: 60,
      status: "scheduled",
      requestedBy: "coach",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      prepNotes: "Review client's draft outputs. Prepare feedback framework.",
      notesVisibleToClient: false,
    });
    console.log("  ✓ Session 4: Pilot Implementation Review (tomorrow)");

    // Session 5: Upcoming session next week
    const nextWeek = addDays(new Date(), 8);
    nextWeek.setHours(10, 30, 0, 0);
    const session5 = await storage.createSession({
      clientId: clientProfile.id,
      title: "Mid-Program Review",
      description: "Review progress, celebrate wins, and adjust roadmap.",
      scheduledAt: nextWeek,
      duration: 60,
      status: "scheduled",
      requestedBy: "client",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notesVisibleToClient: false,
    });
    console.log("  ✓ Session 5: Mid-Program Review (next week)");

    // Session 6: Cancelled session (for variety)
    const session6 = await storage.createSession({
      clientId: clientProfile.id,
      title: "Advanced Integrations",
      description: "Exploring API integrations and custom workflows.",
      scheduledAt: subDays(new Date(), 5),
      duration: 60,
      status: "cancelled",
      requestedBy: "client",
      notesVisibleToClient: false,
    });
    console.log("  ✓ Session 6: Advanced Integrations (cancelled)");

    // ----- Sessions across the other 7 clients (~6 months of operation) -----
    // 6-month clients: ~11 sessions; 4-month: ~8; 3-month: ~5; 2-month: ~4; 1-month: ~2; new: ~1
    const allOtherProfiles = [
      { profile: devProfile, userId: devUser!.id, name: "Nathaniel", sessionsCount: 4 },
      { profile: extraClients[0].profile, userId: (await authStorage.getUserByEmail("alex@demo.com"))!.id, name: "Alex Chen", sessionsCount: 11 },
      { profile: extraClients[1].profile, userId: (await authStorage.getUserByEmail("jordan@demo.com"))!.id, name: "Jordan Smith", sessionsCount: 8 },
      { profile: extraClients[2].profile, userId: (await authStorage.getUserByEmail("riley@demo.com"))!.id, name: "Riley Davis", sessionsCount: 11 },
      { profile: extraClients[3].profile, userId: (await authStorage.getUserByEmail("sam@demo.com"))!.id, name: "Sam Taylor", sessionsCount: 4 },
      { profile: extraClients[4].profile, userId: (await authStorage.getUserByEmail("morgan@demo.com"))!.id, name: "Morgan Lee", sessionsCount: 3 },
      { profile: extraClients[5].profile, userId: (await authStorage.getUserByEmail("casey@demo.com"))!.id, name: "Casey Brown", sessionsCount: 2 },
    ];

    const sessionTitles = [
      "Discovery & Scoping",
      "Tool Evaluation",
      "Prompt Engineering",
      "Pilot Review",
      "Action Planning",
      "Mid-Program Check-in",
      "Implementation Support",
      "Next Steps",
      "Wrap-up",
    ];

    let sessionCount = 6;
    for (const { profile: prof, userId: uid, name, sessionsCount: n } of allOtherProfiles) {
      // Spread past sessions over ~6 months (26w), 4 months (18w), 2 months (12w), 1 month (6w), or new (2w)
      const baseWeeksAgo = n >= 10 ? 26 : n >= 6 ? 18 : n >= 4 ? 12 : n >= 2 ? 6 : 2;
      for (let i = 0; i < n; i++) {
        const weeksAgo = baseWeeksAgo - i * (baseWeeksAgo / Math.max(1, n - 1));
        const isPast = i < n - 1 || (n === 1 && i === 0);
        const isUpcoming = !isPast && i === n - 1;
        const scheduledAt = isUpcoming
          ? addDays(new Date(), 7 + i * 7)
          : subWeeks(new Date(), Math.max(1, Math.floor(weeksAgo)));
        const status = isUpcoming ? "scheduled" : isPast ? (i === 0 && n > 1 ? "cancelled" : "completed") : "scheduled";
        const title = sessionTitles[Math.min(i, sessionTitles.length - 1)] + (n > 1 ? ` (${name})` : "");
        await storage.createSession({
          clientId: prof.id,
          title: i === 0 ? `Discovery Session – ${name}` : title,
          description: "Consultation.",
          scheduledAt,
          duration: 60,
          status,
          requestedBy: i % 2 === 0 ? "coach" : "client",
          meetingLink: status === "scheduled" ? "https://meet.google.com/abc-defg-hij" : undefined,
          sessionNotes: status === "completed" ? `Solid session with ${name}.` : undefined,
          notesVisibleToClient: status === "completed",
        });
        sessionCount++;
      }
      console.log(`  ✓ ${n} sessions for ${name} (total: ${sessionCount})`);
    }

    // ----- Action Items with various statuses -----
    console.log("\nCreating action items...");

    // Completed actions
    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session1.id,
      title: "Complete AI use-case inventory",
      description: "Document 5–10 tasks or workflows where AI could help, with priority and constraints.",
      dueDate: subWeeks(new Date(), 2),
      status: "completed",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Use-case inventory (completed)");

    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session2.id,
      title: "Test 3 prompt templates for donor comms",
      description: "Use the provided templates to draft donor thank-you notes and update excerpts.",
      dueDate: subWeeks(new Date(), 1),
      status: "completed",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Prompt templates test (completed)");

    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session2.id,
      title: "Document tool evaluation results",
      description: "Compare ChatGPT vs Claude for your use cases and note pros/cons.",
      dueDate: subDays(new Date(), 10),
      status: "completed",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Tool evaluation (completed)");

    // In-progress actions
    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session3.id,
      title: "Draft first AI-assisted newsletter",
      description: "Use the system prompts we built to generate a draft newsletter. Share for review.",
      dueDate: addDays(new Date(), 3),
      status: "in_progress",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Newsletter draft (in progress)");

    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session3.id,
      title: "Set up review workflow",
      description: "Define who approved AI-generated content before it goes out. Document the process.",
      dueDate: addDays(new Date(), 5),
      status: "in_progress",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Review workflow (in progress)");

    // Pending actions
    await storage.createActionItem({
      clientId: clientProfile.id,
      sessionId: session4.id,
      title: "Read AI prompt best practices guide",
      description: "Review the shared resource and note 3 improvements for your prompts.",
      dueDate: addDays(new Date(), 7),
      status: "pending",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Prompt best practices (pending)");

    await storage.createActionItem({
      clientId: clientProfile.id,
      title: "Pilot one grant report section with AI",
      description: "Draft the methodology section of your next grant report using AI. Bring to next session.",
      dueDate: addDays(new Date(), 14),
      status: "pending",
      createdBy: coach.id,
    });
    console.log("  ✓ Action: Grant report pilot (pending)");

    // ----- Action items for other clients (engagement variety for dashboard) -----
    const actionTemplates = [
      { title: "Complete AI use-case inventory", status: "completed" as const, dueDaysAgo: 5 },
      { title: "Send pilot results update", status: "completed" as const, dueDaysAgo: 2 },
      { title: "Test prompt templates", status: "in_progress" as const, dueDaysAhead: 3 },
      { title: "Review tool comparison", status: "completed" as const, dueDaysAgo: 10 },
      { title: "Schedule team AI training", status: "pending" as const, dueDaysAhead: 7 },
      { title: "Draft AI roadmap", status: "in_progress" as const, dueDaysAhead: 5 },
      { title: "Read prompt best practices", status: "completed" as const, dueDaysAgo: 1 },
      { title: "Prepare agenda for next session", status: "pending" as const, dueDaysAhead: 4 },
    ];
    for (let i = 0; i < extraClients.length; i++) {
      const prof = extraClients[i].profile;
      const t = actionTemplates[i % actionTemplates.length];
      const dueDate = t.status === "completed"
        ? subDays(new Date(), t.dueDaysAgo ?? 5)
        : addDays(new Date(), t.dueDaysAhead ?? 7);
      await storage.createActionItem({
        clientId: prof.id,
        title: t.title,
        description: "From consultation.",
        dueDate,
        status: t.status,
        createdBy: coach.id,
      });
    }
    await storage.createActionItem({
      clientId: devProfile.id,
      title: "Update career roadmap draft",
      status: "completed",
      dueDate: subDays(new Date(), 3),
      createdBy: coach.id,
    });
    await storage.createActionItem({
      clientId: devProfile.id,
      title: "Send follow-up email to sponsor",
      status: "in_progress",
      dueDate: addDays(new Date(), 2),
      createdBy: coach.id,
    });
    console.log("  ✓ Action items for other clients (engagement variety)");

    // ----- Resources -----
    console.log("\nCreating resources...");

    await storage.createResource({
      title: "AI Prompt Best Practices",
      description: "Guide to writing effective prompts for mission and nonprofit use cases.",
      fileType: "pdf",
      fileName: "ai-prompt-best-practices.pdf",
      clientId: clientProfile.id,
      sessionId: session2.id,
      isGlobal: false,
      uploadedBy: coach.id,
    });
    console.log("  ✓ Resource: AI Prompt Best Practices");

    await storage.createResource({
      title: "Tool Comparison Matrix",
      description: "Spreadsheet comparing ChatGPT, Claude, and other tools for mission orgs.",
      fileType: "spreadsheet",
      fileName: "tool-comparison.xlsx",
      clientId: clientProfile.id,
      sessionId: session3.id,
      isGlobal: false,
      uploadedBy: coach.id,
    });
    console.log("  ✓ Resource: Tool Comparison Matrix");

    await storage.createResource({
      title: "AI Roadmap Workbook",
      description: "Interactive workbook for planning your AI adoption journey.",
      fileType: "pdf",
      fileName: "ai-roadmap-workbook.pdf",
      clientId: clientProfile.id,
      isGlobal: false,
      uploadedBy: coach.id,
    });
    console.log("  ✓ Resource: AI Roadmap Workbook");

    await storage.createResource({
      title: "Sample Prompt Templates",
      description: "Ready-to-use prompts for donor comms, newsletters, and grant reports.",
      fileType: "pdf",
      fileName: "prompt-templates.pdf",
      isGlobal: true,
      uploadedBy: coach.id,
    });
    console.log("  ✓ Resource: Sample Prompt Templates (global)");

    // ----- Session Messages -----
    console.log("\nCreating session messages...");

    await storage.createMessage({
      sessionId: session4.id,
      senderId: coach.id,
      content: "Looking forward to our session tomorrow! Please review the AI prompt best practices guide I shared.",
    });
    await storage.createMessage({
      sessionId: session4.id,
      senderId: client.id,
      content: "Thanks! I've tried the templates and have a few questions about adjusting them for our donor voice.",
    });
    await storage.createMessage({
      sessionId: session4.id,
      senderId: coach.id,
      content: "Great - we'll go through that. Bring your draft newsletter so we can refine the prompts together.",
    });
    console.log("  ✓ Session messages created");

    // ----- Payments & Invoices -----
    console.log("\nCreating payment history...");

    // Invoice 1: Paid
    const [invoice1] = await db.insert(invoices).values({
      invoiceNumber: "INV-00001",
      clientId: clientProfile.id,
      amount: 52500, // $525.00
      currency: "usd",
      status: "paid",
      dueDate: subWeeks(new Date(), 4),
      paidAt: subWeeks(new Date(), 4),
      items: JSON.stringify([
        { description: "AI Consulting Package - 3 Sessions", amount: 52500 }
      ]),
      notes: "Initial coaching package",
    }).returning();
    console.log("  ✓ Invoice 1: $525.00 (paid)");

    // Payment for Invoice 1
    await db.insert(payments).values({
      clientId: clientProfile.id,
      invoiceId: invoice1.id,
      amount: 52500,
      currency: "usd",
      status: "completed",
      provider: "stripe",
      providerPaymentId: "pi_demo_" + Math.random().toString(36).substring(7),
      description: "AI Consulting Package - 3 Sessions",
      paidAt: subWeeks(new Date(), 4),
    });
    console.log("  ✓ Payment 1: $525.00 via Stripe");

    // Invoice 2: Paid
    const [invoice2] = await db.insert(invoices).values({
      invoiceNumber: "INV-00002",
      clientId: clientProfile.id,
      amount: 17500, // $175.00
      currency: "usd",
      status: "paid",
      dueDate: subWeeks(new Date(), 1),
      paidAt: subDays(new Date(), 5),
      items: JSON.stringify([
        { description: "Individual Consultation", amount: 17500 }
      ]),
    }).returning();
    console.log("  ✓ Invoice 2: $175.00 (paid)");

    // Payment for Invoice 2
    await db.insert(payments).values({
      clientId: clientProfile.id,
      invoiceId: invoice2.id,
      amount: 17500,
      currency: "usd",
      status: "completed",
      provider: "paypal",
      providerPaymentId: "PAY-demo-" + Math.random().toString(36).substring(7),
      description: "Individual Consultation",
      paidAt: subDays(new Date(), 5),
    });
    console.log("  ✓ Payment 2: $175.00 via PayPal");

    // Invoice 3: Pending
    await db.insert(invoices).values({
      invoiceNumber: "INV-00003",
      clientId: clientProfile.id,
      amount: 35000, // $350.00
      currency: "usd",
      status: "sent",
      dueDate: addDays(new Date(), 14),
      items: JSON.stringify([
        { description: "Consultations - 2 Sessions", amount: 35000 }
      ]),
      notes: "Payment due within 14 days",
    });
    console.log("  ✓ Invoice 3: $350.00 (pending)");
  } else {
    console.log("Sessions already exist, skipping comprehensive data creation");
  }

  // ----- Notifications -----
  console.log("\nCreating notifications...");
  
  const coachNotifications = await storage.getNotificationsByUser(coach.id);
  if (coachNotifications.length < 3) {
    await storage.createNotification({
      userId: coach.id,
      type: "session_scheduled",
      title: "Session Tomorrow",
      message: "You have a consultation with Demo Client tomorrow at 2:00 PM.",
    });
    await storage.createNotification({
      userId: coach.id,
      type: "payment_received",
      title: "Payment Received",
      message: "Demo Client paid $175.00 for Individual Consultation.",
    });
    await storage.createNotification({
      userId: coach.id,
      type: "intake_submitted",
      title: "New Inquiry",
      message: "A new potential client has submitted an intake form.",
    });
    console.log("  ✓ Coach notifications created");
  }

  const clientNotifications = await storage.getNotificationsByUser(client.id);
  if (clientNotifications.length < 3) {
    await storage.createNotification({
      userId: client.id,
      type: "session_scheduled",
      title: "Session Tomorrow",
      message: "Your consultation is tomorrow at 2:00 PM. Don't forget to prepare!",
    });
    await storage.createNotification({
      userId: client.id,
      type: "action_assigned",
      title: "New Action Item",
      message: "You have a new action item: Read AI prompt best practices guide.",
    });
    await storage.createNotification({
      userId: client.id,
      type: "resource_uploaded",
      title: "New Resource Available",
      message: "Your consultant shared a new resource: AI Roadmap Workbook.",
    });
    console.log("  ✓ Client notifications created");
  }

  console.log("\n" + "=".repeat(50));
  console.log("✓ DEMO ACCOUNTS READY");
  console.log("=".repeat(50));
  console.log("\nCredentials (password for both): demo123");
  console.log("┌─────────────┬─────────────────────┬──────────────────┐");
  console.log("│ Role        │ Email               │ Dashboard        │");
  console.log("├─────────────┼─────────────────────┼──────────────────┤");
  console.log("│ Consultant  │ coach@example.com   │ /consultant      │");
  console.log("│ Client      │ client@example.com  │ /client          │");
  console.log("└─────────────┴─────────────────────┴──────────────────┘");
  console.log("\nDemo data includes:");
  console.log("  • 8 clients (varied tenure: 6 months to new), 1 pending intake");
  console.log("  • Sessions across all clients (~6 months of operation)");
  console.log("  • Action items, resources, session messages");
  console.log("  • 3 invoices ($525 + $175 paid, $350 pending), 2 payments");
  console.log("  • Notifications for coach and clients");
  console.log("");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
