/**
 * Tauranga SME product line — server-side definitions and Stripe wiring.
 *
 * Mirror of `client/src/content/products.ts`. Keep both in sync.
 *
 * Stripe Price IDs are read from env (`STRIPE_PRICE_TAURANGA_*`) so the
 * test/live split happens at deploy time and never lands in source control.
 *
 * Buyer access model (locked in plan): Stripe receipts + unguessable URLs.
 * No `product_purchases` table; the webhook generates random asset slugs and
 * sends them to the buyer's Stripe-collected email. URLs are unguessable
 * because the slug component is `randomBytes(24).toString("base64url")`.
 */

import Stripe from "stripe";
import { randomBytes } from "crypto";

export type ProductTier = "bronze" | "silver" | "gold";

export const PRODUCT_SLUG = "tauranga-sme" as const;

export interface ServerProduct {
  slug: string;
  tier: ProductTier;
  title: string;
  /** Display amount in NZD whole dollars (Stripe is the source of truth at checkout). */
  displayPrice: number;
  /** What's included — used in the access email body. */
  includes: string[];
  /** Calendly / scheduling link (Silver+ get a 1:1, Gold gets check-ins). */
  schedulingUrl?: string;
}

export const TAURANGA_PRODUCTS: ServerProduct[] = [
  {
    slug: "tauranga-sme-bronze",
    tier: "bronze",
    title: "AI-Ready Self-Pack",
    displayPrice: 197,
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
    displayPrice: 497,
    includes: [
      "Everything in Bronze",
      "60-min 1:1 strategy call with Nathaniel (recorded + transcript)",
      "Pre-filled NZ Privacy Impact Assessment template",
      "NZ-specific tool stack recommendation document",
      "30-day email support",
      "Prep document for the Priority One AI Advisory Pilot",
    ],
    schedulingUrl: process.env.SILVER_BOOKING_URL || "https://nathanielbaldock.com/intake",
  },
  {
    slug: "tauranga-sme-gold",
    tier: "gold",
    title: "Full AI Adoption Plan",
    displayPrice: 2497,
    includes: [
      "Everything in Silver",
      "Custom 20-page AI Adoption Plan in your business name",
      "4× fortnightly 30-min check-ins over 8 weeks",
      "Te Tiriti / Māori Data Sovereignty review",
      "Copyright/IP statement for AI outputs",
      "1× internal team workshop (90 min, virtual or in-person if local)",
      "Eligible for the RBPN $5,000 co-funded rebate",
    ],
    schedulingUrl: process.env.GOLD_BOOKING_URL || "https://nathanielbaldock.com/intake",
  },
];

export function getProductByTier(tier: string | undefined): ServerProduct | undefined {
  if (!tier) return undefined;
  return TAURANGA_PRODUCTS.find((p) => p.tier === tier);
}

/** Read the Stripe Price ID configured for this tier. */
export function getStripePriceIdForTier(tier: ProductTier): string | undefined {
  switch (tier) {
    case "bronze":
      return process.env.STRIPE_PRICE_TAURANGA_BRONZE;
    case "silver":
      return process.env.STRIPE_PRICE_TAURANGA_SILVER;
    case "gold":
      return process.env.STRIPE_PRICE_TAURANGA_GOLD;
    default:
      return undefined;
  }
}

/** Lazy Stripe client — same pattern as `server/lib/payments.ts`. */
function getStripe(): Stripe | null {
  return process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
}

function appBaseUrl(): string {
  return process.env.APP_URL || process.env.PUBLIC_SITE_URL || "http://localhost:3000";
}

export interface CreateProductCheckoutOptions {
  tier: ProductTier;
  /** Origin from the inbound request — used to build success/cancel URLs. */
  origin?: string;
}

export interface CreateProductCheckoutResult {
  url: string;
}

/**
 * Build a Stripe Checkout session for a guest buyer (no Stripe customer
 * required). Buyer's email is collected by Stripe at checkout and read from
 * the webhook event later.
 *
 * Returns null on configuration errors (caller should respond 503).
 */
export async function createProductCheckoutSession(
  options: CreateProductCheckoutOptions
): Promise<CreateProductCheckoutResult | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const product = getProductByTier(options.tier);
  if (!product) return null;

  const priceId = getStripePriceIdForTier(options.tier);
  if (!priceId) {
    console.error(
      `[tauranga-sme] No Stripe Price ID configured for tier "${options.tier}". ` +
        `Set STRIPE_PRICE_TAURANGA_${options.tier.toUpperCase()}.`
    );
    return null;
  }

  const base = (options.origin || appBaseUrl()).replace(/\/$/, "");
  const successUrl = `${base}/tauranga-sme/welcome?tier=${options.tier}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${base}/tauranga-sme?cancelled=1`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    // Tell Stripe to collect the buyer's email — we read it back in the webhook
    // to send the access email. No `customer` needed (guest checkout).
    customer_creation: "always",
    metadata: {
      productSlug: PRODUCT_SLUG,
      tier: options.tier,
    },
    payment_intent_data: {
      metadata: {
        productSlug: PRODUCT_SLUG,
        tier: options.tier,
      },
    },
    // GST + NZ-specific: leave taxes off for v1 (sliding-scale pricing already
    // includes GST messaging on the sales page FAQ). Add automatic_tax later.
  });

  if (!session.url) return null;
  return { url: session.url };
}

/**
 * Build the per-purchase asset URLs for the access email.
 *
 * URLs are unguessable because the slug component is 24 random bytes
 * (`base64url`). They're not stored anywhere — Stripe receipts are the audit
 * trail. For v1 soft-launch with hand-picked Gold buyers, this is enough.
 */
export interface AccessLinks {
  // Always available (free anyway, but we include them in the email so the
  // buyer has a single place to start)
  worksheets: {
    readiness: string;
    timeAudit: string;
    team: string;
    legal: string;
  };
  // Premium presentation (paid)
  presentation: {
    session1: string;
    session2: string;
    session3: string;
    session4: string;
  };
  // Tier-specific gated assets — random slugs make the URLs unguessable
  templates: {
    pia: string;
    aiUsePolicy: string;
    toolRegister: string;
    teTiritiChecklist: string;
  };
  videoWalkthrough: string;
  /** Calendly / booking link if the tier includes a 1:1 call. */
  bookingUrl?: string;
}

export function buildAccessLinks(tier: ProductTier): AccessLinks {
  const base = appBaseUrl().replace(/\/$/, "");
  const slug = () => randomBytes(24).toString("base64url");
  const product = getProductByTier(tier);

  return {
    worksheets: {
      readiness: `${base}/resources/worksheet/tauranga-sme-readiness`,
      timeAudit: `${base}/resources/worksheet/tauranga-sme-time-audit`,
      team: `${base}/resources/worksheet/tauranga-sme-team`,
      legal: `${base}/resources/worksheet/tauranga-sme-legal`,
    },
    presentation: {
      session1: `${base}/resources/worksheet/tauranga-sme-presentation-readiness`,
      session2: `${base}/resources/worksheet/tauranga-sme-presentation-time-audit`,
      session3: `${base}/resources/worksheet/tauranga-sme-presentation-team`,
      session4: `${base}/resources/worksheet/tauranga-sme-presentation-legal`,
    },
    templates: {
      pia: `${base}/tauranga-sme/assets/${slug()}/nz-privacy-impact-assessment-template.pdf`,
      aiUsePolicy: `${base}/tauranga-sme/assets/${slug()}/internal-ai-use-policy-template.pdf`,
      toolRegister: `${base}/tauranga-sme/assets/${slug()}/ai-tool-register-template.xlsx`,
      teTiritiChecklist: `${base}/tauranga-sme/assets/${slug()}/te-tiriti-maori-data-sovereignty-checklist.pdf`,
    },
    videoWalkthrough: `${base}/tauranga-sme/assets/${slug()}/four-session-walkthrough/`,
    bookingUrl: product?.schedulingUrl,
  };
}

/**
 * Type guard for the webhook branch.
 */
export function isProductCheckoutSession(
  metadata: Stripe.Metadata | null | undefined
): metadata is { productSlug: string; tier: string } {
  if (!metadata) return false;
  return metadata.productSlug === PRODUCT_SLUG && typeof metadata.tier === "string";
}
