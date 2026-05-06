/**
 * Tauranga SME product line — three tiers sold via Stripe Checkout.
 *
 * Server-side mirror lives in `server/lib/products.ts`. Keep both in sync.
 * Stripe Price IDs are NOT stored in this file — they are read from server
 * env (`STRIPE_PRICE_TAURANGA_*`) so test/live can swap without code changes.
 */

export type ProductTier = "bronze" | "silver" | "gold";

export interface Product {
  /** Stable client-side id used for analytics / URL fragments. */
  slug: string;
  /** Maps to the env var on the server: STRIPE_PRICE_TAURANGA_<TIER>. */
  tier: ProductTier;
  title: string;
  /** Short tagline shown under the title on the sales page card. */
  tagline: string;
  /** Promise sentence — the result the buyer pays for. */
  promise: string;
  /** Numeric price for display. Stripe is the source of truth at checkout. */
  price: number;
  currency: "NZD";
  /** Bullet list of what's inside the tier (rendered as a checklist). */
  includes: string[];
  /** Who this tier is for, in plain language. */
  bestFor: string;
  /** True if this tier is eligible for the RBPN AI Advisory Pilot rebate. */
  pilotEligible?: boolean;
  /** Highlights the card on the sales page. */
  featured?: boolean;
  /** CTA button label. */
  ctaLabel: string;
}

export const taurangaSmeProducts: Product[] = [
  {
    slug: "tauranga-sme-bronze",
    tier: "bronze",
    title: "AI-Ready Self-Pack",
    tagline: "For solo owner-operators doing the prep themselves.",
    promise:
      "In one weekend, you'll have your AI readiness score, a 3-task shortlist, your team conversation done, and your privacy obligations checked — ready for the Priority One conversation.",
    price: 197,
    currency: "NZD",
    bestFor: "Owner-operators, 1–10 staff, time-poor",
    ctaLabel: "Get the Self-Pack — $197",
    includes: [
      "All 4 fillable worksheets (Readiness, Time Audit, Team, Legal)",
      "Session 1 — full 22-slide deck with citations",
      "Sessions 2–4 — preview frames now, full release on launch",
      "Priority One conversation cheat-sheet (1-page)",
      "1× email Q&A within 7 days of purchase",
    ],
  },
  {
    slug: "tauranga-sme-silver",
    tier: "silver",
    title: "AI-Ready Implementation Pack",
    tagline: "For owners who want help applying it.",
    promise:
      "Everything in Bronze, plus a 60-minute 1:1 call where we work through your task shortlist, your team conversation, and the specific tools that fit your business — so you walk into the funded advisory call ready to talk implementation.",
    price: 497,
    currency: "NZD",
    bestFor: "Owner-operators, 5–25 staff, ready to act",
    featured: true,
    ctaLabel: "Get the Implementation Pack — $497",
    includes: [
      "Everything in Bronze",
      "60-min 1:1 strategy call with Nathaniel (recorded + transcript)",
      "Pre-filled NZ Privacy Impact Assessment template",
      "NZ-specific tool stack recommendation document",
      "30-day email support",
      "Prep document for the Priority One AI Advisory Pilot",
    ],
  },
  {
    slug: "tauranga-sme-gold",
    tier: "gold",
    title: "Full AI Adoption Plan",
    tagline:
      "Eligible for the RBPN AI Advisory Pilot rebate (up to $5,000 NZD).",
    promise:
      "A written 20-page AI Adoption Plan in your business's name — the deliverable the Government's funded pilot is paying for. Plus 8 weeks of fortnightly check-ins and a 90-min team workshop. Most qualifying SMEs net out ahead.",
    price: 2497,
    currency: "NZD",
    bestFor: "10–50 staff, board/owner-led, applying to the Pilot",
    pilotEligible: true,
    ctaLabel: "Apply for a Gold spot",
    includes: [
      "Everything in Silver",
      "Custom 20-page AI Adoption Plan in your business name",
      "4× fortnightly 30-min check-ins over 8 weeks",
      "Te Tiriti / Māori Data Sovereignty review",
      "Copyright/IP statement for AI outputs",
      "1× internal team workshop (90 min, virtual or in-person if local)",
      "Eligible for the RBPN $5,000 co-funded rebate",
    ],
  },
];

export function getTaurangaProductByTier(
  tier: string | undefined
): Product | undefined {
  if (!tier) return undefined;
  return taurangaSmeProducts.find((p) => p.tier === tier);
}
