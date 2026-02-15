/**
 * Startup health check: verify DB connection and that required tables exist.
 * Run before listening so production fails fast with clear errors.
 */
import { pool, db } from "./db";
import { intakeForms } from "@shared/schema";

export async function checkDatabaseHealth(): Promise<void> {
  try {
    await pool.query("SELECT 1");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[startup] Database connection failed:", msg);
    console.error("Check DATABASE_URL in Railway → Variables (or .env).");
    process.exit(1);
  }

  try {
    await db.select().from(intakeForms).limit(1);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("does not exist") || msg.includes("relation")) {
      console.error("[startup] Table intake_forms (or schema) missing.");
      console.error("Apply schema by running against your production DB:");
      console.error("  DATABASE_URL=<your-production-url> npm run db:push");
      console.error("Or in Railway: set Release Command to: npm run db:push");
    } else {
      console.error("[startup] Database check failed:", msg);
    }
    process.exit(1);
  }
}
