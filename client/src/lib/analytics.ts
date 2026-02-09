/**
 * Google Analytics 4 integration.
 * Set VITE_GA_MEASUREMENT_ID in .env to enable tracking.
 * Won't load in dev if not set.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const PLACEHOLDER = "G-XXXXXXXXXX";

function isEnabled(): boolean {
  return !!GA_ID && GA_ID !== PLACEHOLDER && import.meta.env.PROD;
}

export function initAnalytics(): void {
  if (!isEnabled()) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (isEnabled() && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
