/**
 * Send sample Tauranga SME access emails (Bronze, Silver, Gold) for inbox QA.
 *
 * Requires: RESEND_API_KEY, RESEND_FROM_EMAIL (or Resend default domain setup)
 * Optional: PUBLIC_SITE_URL or APP_URL — link base in the email body
 * Optional: TAURANGA_TEST_TO — override recipient (default: nathanielbaldock@gmail.com)
 *
 * Run: npm run email:tauranga-test
 *      TAURANGA_TEST_TO=you@example.com npm run email:tauranga-test
 */
import "dotenv/config";
import { sendEmail, taurangaAccessEmail } from "../server/lib/email";
import { buildAccessLinks, type ProductTier, buyerFacingSiteOrigin } from "../server/lib/products";

const DEFAULT_TO = "nathanielbaldock@gmail.com";

function recipient(): string {
  const fromArgv = process.argv.find((a) => a.startsWith("--to="))?.slice("--to=".length);
  return (fromArgv || process.env.TAURANGA_TEST_TO || DEFAULT_TO).trim();
}

async function main() {
  const to = recipient();

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY — add it to .env then run again.");
    process.exit(1);
  }

  const base = buyerFacingSiteOrigin();
  console.info(`Buyer-facing link base for this send: ${base}`);
  if (base.includes("localhost")) {
    console.info(
      "(Tip: set PUBLIC_SITE_URL=https://www.nathanielbaldock.com in .env before sending so worksheet links resolve on the live site.)\n"
    );
  } else {
    console.info("");
  }
  console.info(`Sending 3 test emails → ${to}\n`);

  const tiers: ProductTier[] = ["bronze", "silver", "gold"];

  for (const tier of tiers) {
    const links = buildAccessLinks(tier);
    const opts = taurangaAccessEmail(to, "Nathaniel", tier, links);
    opts.subject = `[TEST] ${opts.subject}`;
    const ok = await sendEmail(opts);
    console.info(`${tier}: ${ok ? "sent" : "FAILED"} — "${opts.subject}"`);
    if (!ok) process.exitCode = 1;
  }

  console.info("\nDone. Check inbox (and spam). Subjects are prefixed with [TEST].");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
