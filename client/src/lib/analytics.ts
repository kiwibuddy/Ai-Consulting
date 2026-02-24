/**
 * Google Analytics 4 integration.
 * The GA tag is in index.html so it loads immediately (required for "Data collection active" in GA4).
 * This module skips script injection when the tag is already present and handles SPA page_view on route change.
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

/** True when gtag is on the page (from index.html) so we can send events. */
function hasGtag(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

// Debug: in browser console type __GA_MEASUREMENT_ID__ and __GA_ENABLED__ to verify build
if (typeof window !== "undefined") {
  const w = window as unknown as { __GA_MEASUREMENT_ID__?: string; __GA_ENABLED__?: boolean };
  w.__GA_MEASUREMENT_ID__ = GA_ID;
  w.__GA_ENABLED__ = isEnabled();
}

export function initAnalytics(): void {
  // Tag is already in index.html; don't inject a second script.
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
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
  if (import.meta.env.PROD && hasGtag()) {
    window.gtag!("event", name, params);
  }
}

/** Send a page_view to GA4 (use on SPA route changes so each page gets counted). */
export function trackPageView(path: string, title?: string): void {
  if (import.meta.env.PROD && hasGtag()) {
    window.gtag!("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
    });
  }
}
