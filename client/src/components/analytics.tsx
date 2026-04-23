/**
 * Vercel Web Analytics integration.
 * The Analytics component is a wrapper around the tracking script,
 * offering seamless integration with React and automatic route tracking.
 */
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export function Analytics() {
  return <VercelAnalytics />;
}
