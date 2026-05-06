/**
 * Route ownership for Marketing Mode vs Full App Mode.
 * Used to hide app entry points when running in marketing-only mode (e.g. Vercel static).
 */

/** Public routes: safe to serve from static/Vercel with no backend. */
export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/speaking",
  "/speaking/invite",
  "/survey",
  "/resources",
  "/resources/christian-professional/automation-or-augmentation-christian",
  "/resources/christian-professional/52-minute-opportunity-christian",
  "/resources/christian-professional/what-will-they-still-pay-me-for-christian",
  "/resources/christian-professional/five-year-positioning-map-christian",
  "/resources/christian-professional/deepfakes-digital-truth-2026",
  "/resources/raising-humans-in-the-age-of-the-digital-god",
  "/resources/discipleship-and-missions-in-an-ai-age",
  "/resources/outsourcing-the-holy-spirit-to-ai",
  "/pricing",
  "/tauranga-sme",
  "/tauranga-sme/welcome",
  "/intake",
  "/pay",
  "/privacy",
  "/terms",
  "/login",
  "/forgot-password",
  "/reset-password",
] as const;

/** App routes: require backend (auth, DB). Hide from nav when in marketing mode. */
export const APP_ROUTES = [
  "/client",
  "/client/complete-profile",
  "/client/sessions",
  "/client/actions",
  "/client/resources",
  "/client/profile",
  "/client/billing",
  "/consultant",
  "/consultant/setup",
  "/consultant/clients",
  "/consultant/sessions",
  "/consultant/intake",
  "/consultant/resources",
  "/consultant/calculator",
  "/consultant/billing",
  "/consultant/analytics",
] as const;

export function isAppRoute(path: string): boolean {
  const p = path.split("?")[0];
  return p.startsWith("/client") || p.startsWith("/consultant");
}

export function isPublicRoute(path: string): boolean {
  return !isAppRoute(path);
}
