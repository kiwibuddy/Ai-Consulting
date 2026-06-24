"use client";
import { cn } from "@/lib/utils";

interface HeroAuditPillProps {
  className?: string;
}

/** Floating hero badge linking to the free AI use survey — highlights the limited-time 50% discount. */
export function HeroAuditPill({ className }: HeroAuditPillProps) {
  return (
    <a
      href="/audit"
      data-event="hero-floating-audit"
      aria-label="Take the free 10-minute AI use survey — 50% off all packages until July 1"
      className={cn("nb-hero-audit-pill", className)}
    >
      <span aria-hidden className="relative flex h-3 w-3 shrink-0">
        <span className="nb-hero-audit-pill-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--nb-accent)]" />
      </span>
      <span className="nb-hero-audit-pill-text">
        <span className="nb-hero-audit-pill-label">Free · 10-min AI survey</span>
        <span className="nb-hero-audit-pill-sale">50% off all packages · until July 1</span>
      </span>
      <span aria-hidden className="nb-hero-audit-pill-arrow">
        →
      </span>
    </a>
  );
}
