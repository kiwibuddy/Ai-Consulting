import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { PublicPageProgressFallback } from "@/components/public-page-loader";
import { Skeleton } from "@/components/ui/skeleton";

/** Thin top bar only — no full-screen logo loader. */
export function PublicSuspenseFallback() {
  return <PublicPageProgressFallback />;
}

/**
 * Avoids a loading flash when the chunk is already cached (eager routes, prefetch).
 * Resets when the route path changes.
 */
export function DelayedPublicSuspenseFallback({ delayMs = 180 }: { delayMs?: number }) {
  const [location] = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const id = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(id);
  }, [location, delayMs]);

  if (!show) {
    return (
      <main className="min-h-[calc(100vh-76px)]" aria-busy="true" aria-label="Loading page" />
    );
  }

  return <PublicSuspenseFallback />;
}

/** Compact in-content skeleton for dashboard page chunks. */
export function DashboardSuspenseFallback() {
  return (
    <div className="space-y-4 p-6" aria-busy="true">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-48 w-full rounded-md" />
    </div>
  );
}

export function DelayedDashboardSuspenseFallback({ delayMs = 160 }: { delayMs?: number }) {
  const [location] = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const id = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(id);
  }, [location, delayMs]);

  if (!show) {
    return <main className="flex-1 min-h-[12rem]" aria-busy="true" />;
  }

  return <DashboardSuspenseFallback />;
}
