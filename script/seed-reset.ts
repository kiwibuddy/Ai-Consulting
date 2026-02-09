/**
 * Clears demo data tables so a fresh seed will recreate everything with new content.
 * Preserves users and client profiles (so you keep your login) but wipes sessions,
 * actions, resources, invoices, payments, messages, notifications, and intake forms.
 *
 * Run: npx tsx script/seed-reset.ts
 * Then: npm run db:seed
 */
import "dotenv/config";
import { db } from "../server/db";
import {
  messages,
  actionItems,
  resources,
  payments,
  invoices,
  coachingSessions,
  intakeForms,
  notifications,
} from "@shared/schema";
async function reset() {
  console.log("Clearing demo data tables...\n");

  // Delete in order (respecting foreign key constraints)
  await db.delete(messages);
  console.log("  ✓ messages");
  await db.delete(actionItems);
  console.log("  ✓ action_items");
  await db.delete(resources);
  console.log("  ✓ resources");
  await db.delete(payments);
  console.log("  ✓ payments");
  await db.delete(invoices);
  console.log("  ✓ invoices");
  await db.delete(coachingSessions);
  console.log("  ✓ coaching_sessions");
  await db.delete(intakeForms);
  console.log("  ✓ intake_forms");
  await db.delete(notifications);
  console.log("  ✓ notifications");

  console.log("\n✓ Demo data cleared. Run 'npm run db:seed' to add fresh AI consulting demo data.");
  process.exit(0);
}

reset().catch((err) => {
  console.error("Reset failed:", err);
  process.exit(1);
});
