/**
 * AI Use Audit paid packages — Stripe Checkout + webhook follow-up.
 *
 * Railway env (matches production variable names):
 *   AUDIT_PRICING_BASIC_URL / PLUS / PREMIUM — Stripe Price ID (`price_...`) for API checkout,
 *     or fallback redirect URL (`https://buy.stripe.com/...` / `mailto:...`).
 *   AUDIT_SALE_COUPON_ID — coupon applied automatically until AUDIT_SALE_ENDS_AT.
 *   AUDIT_SALE_ENDS_AT — ISO datetime when launch discount stops (default 1 Jul 2026 NZ).
 */

import Stripe from "stripe";
import { buyerFacingSiteOrigin } from "./products";

export type AuditPackageTier = "basic" | "plus" | "premium";

export const AUDIT_PRODUCT_SLUG = "ai-use-audit" as const;

export interface AuditPackage {
  tier: AuditPackageTier;
  title: string;
  /** Full list price in NZD — create Stripe Prices at this amount. */
  listPrice: number;
  /** Sale price shown on site when a time-limited coupon is active. */
  salePrice: number;
  includes: string[];
}

/** Default end of audit launch sale (NZ time). Override with AUDIT_SALE_ENDS_AT. */
const DEFAULT_SALE_ENDS_AT = "2026-07-01T23:59:59+12:00";

const DEFAULT_MAILTO: Record<AuditPackageTier, string> = {
  basic:
    "mailto:nathanielbaldock@gmail.com?subject=AI%20Basic%20package%20(%24250%20NZD%20-%2050%25%20off%20until%20July%201)",
  plus: "mailto:nathanielbaldock@gmail.com?subject=Ai%20Plus%20package%20(%24750%20NZD%20-%2050%25%20off%20until%20July%201)",
  premium:
    "mailto:nathanielbaldock@gmail.com?subject=AI%20Premium%20package%20(%241%2C250%20NZD%20-%2050%25%20off%20until%20July%201)",
};

export const AUDIT_PACKAGES: AuditPackage[] = [
  {
    tier: "basic",
    title: "AI Basic",
    listPrice: 500,
    salePrice: 250,
    includes: [
      "Emailed result report plus team results",
      "30-minute call to review results",
      "Custom AI policy / governance document",
    ],
  },
  {
    tier: "plus",
    title: "Ai Plus",
    listPrice: 1500,
    salePrice: 750,
    includes: [
      "Everything in AI Basic",
      "45-minute Zoom/in-person policy walkthrough and Q&A",
      "4 custom website, email footer, and document AI usage statements",
    ],
  },
  {
    tier: "premium",
    title: "AI Premium",
    listPrice: 2500,
    salePrice: 1250,
    includes: [
      "Everything in Ai Plus",
      "Custom team member specific AI usage document",
      "90-minute Zoom/in-person team implementation / best-practices training",
      "6-month AI tool, privacy and regulation and your team policy review call",
    ],
  },
];

export function getAuditPackage(tier: string | undefined): AuditPackage | undefined {
  if (!tier) return undefined;
  return AUDIT_PACKAGES.find((p) => p.tier === tier);
}

function getStripe(): Stripe | null {
  return process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
}

/** Raw value from Railway for this tier's pricing env var. */
export function getAuditPricingEnvValue(tier: AuditPackageTier): string | undefined {
  const raw =
    tier === "basic"
      ? process.env.AUDIT_PRICING_BASIC_URL
      : tier === "plus"
        ? process.env.AUDIT_PRICING_PLUS_URL
        : process.env.AUDIT_PRICING_PREMIUM_URL;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

function parseAuditPricingEnv(raw: string | undefined): {
  priceId?: string;
  redirectUrl?: string;
} {
  if (!raw) return {};
  if (raw.startsWith("price_")) return { priceId: raw };
  const lower = raw.toLowerCase();
  if (lower.startsWith("https://") || lower.startsWith("http://") || lower.startsWith("mailto:")) {
    return { redirectUrl: raw };
  }
  return {};
}

/** Stripe Price ID from AUDIT_PRICING_*_URL when the value is `price_...`. */
export function getStripePriceIdForAuditTier(tier: AuditPackageTier): string | undefined {
  return parseAuditPricingEnv(getAuditPricingEnvValue(tier)).priceId;
}

/** Redirect URL from AUDIT_PRICING_*_URL when the value is a link (not a Price ID). */
export function getAuditPricingFallbackUrl(tier: AuditPackageTier): string {
  const parsed = parseAuditPricingEnv(getAuditPricingEnvValue(tier));
  return parsed.redirectUrl || DEFAULT_MAILTO[tier];
}

export function isAuditStripeConfigured(): boolean {
  return AUDIT_PACKAGES.some((p) => !!getStripePriceIdForAuditTier(p.tier));
}

/** When the launch sale ends (ISO 8601). Unset env falls back to 1 July 2026 NZ time. */
export function getAuditSaleEndsAt(): Date {
  const raw = process.env.AUDIT_SALE_ENDS_AT?.trim() || DEFAULT_SALE_ENDS_AT;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date(DEFAULT_SALE_ENDS_AT) : parsed;
}

/**
 * True when AUDIT_SALE_COUPON_ID is set and we are before AUDIT_SALE_ENDS_AT.
 * After the deadline, checkout charges full listPrice automatically — no env change needed.
 */
export function isAuditSaleActive(): boolean {
  const couponId = process.env.AUDIT_SALE_COUPON_ID?.trim();
  if (!couponId) return false;
  return Date.now() <= getAuditSaleEndsAt().getTime();
}

export function auditPricingForApi(): Array<
  AuditPackage & { displayPrice: number; listPrice: number; onSale: boolean }
> {
  const onSale = isAuditSaleActive();
  return AUDIT_PACKAGES.map((p) => ({
    ...p,
    listPrice: p.listPrice,
    displayPrice: onSale ? p.salePrice : p.listPrice,
    onSale,
  }));
}

export interface CreateAuditCheckoutOptions {
  tier: AuditPackageTier;
  orgName?: string;
  origin?: string;
}

export interface CreateAuditCheckoutResult {
  url: string;
  mode: "stripe_checkout";
}

/**
 * Build a Stripe Checkout session for a guest audit-package buyer.
 * Returns null when Stripe or the tier Price ID is not configured.
 */
export async function createAuditCheckoutSession(
  options: CreateAuditCheckoutOptions
): Promise<CreateAuditCheckoutResult | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const pkg = getAuditPackage(options.tier);
  if (!pkg) return null;

  const priceId = getStripePriceIdForAuditTier(options.tier);
  if (!priceId) {
    const envName =
      options.tier === "basic"
        ? "AUDIT_PRICING_BASIC_URL"
        : options.tier === "plus"
          ? "AUDIT_PRICING_PLUS_URL"
          : "AUDIT_PRICING_PREMIUM_URL";
    console.error(
      `[ai-use-audit] No Stripe Price ID for tier "${options.tier}". ` +
        `Set ${envName} to a Stripe Price ID (price_...).`
    );
    return null;
  }

  const base = (options.origin || buyerFacingSiteOrigin()).replace(/\/$/, "");
  const org = (options.orgName || "").trim();
  const successUrl = `${base}/audit?purchased=1&tier=${options.tier}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${base}/audit?cancelled=1&tier=${options.tier}`;

  const saleCouponId = isAuditSaleActive() ? process.env.AUDIT_SALE_COUPON_ID!.trim() : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    ...(saleCouponId ? { discounts: [{ coupon: saleCouponId }] } : {}),
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: "always",
    metadata: {
      productSlug: AUDIT_PRODUCT_SLUG,
      tier: options.tier,
      orgName: org,
      saleApplied: saleCouponId ? "true" : "false",
    },
    payment_intent_data: {
      metadata: {
        productSlug: AUDIT_PRODUCT_SLUG,
        tier: options.tier,
        orgName: org,
        saleApplied: saleCouponId ? "true" : "false",
      },
    },
  });

  if (!session.url) return null;
  return { url: session.url, mode: "stripe_checkout" };
}

export function isAuditCheckoutSession(
  metadata: Stripe.Metadata | null | undefined
): metadata is { productSlug: string; tier: string; orgName?: string } {
  if (!metadata) return false;
  return metadata.productSlug === AUDIT_PRODUCT_SLUG && typeof metadata.tier === "string";
}

export function auditCalendarUrl(): string {
  return (
    process.env.AUDIT_CALENDAR_URL ||
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0mO1lxN2kh1ewSrKsEVMsCUeSoz4qauDZs0INinAtrgkBL_JxW0kRRHsWg_d_6qe0rT59-syU-"
  );
}
