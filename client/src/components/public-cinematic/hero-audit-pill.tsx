"use client";

import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface HeroAuditPillProps {
  className?: string;
}

/** Inline hero link to the free AI use audit — sits beside primary CTAs on all breakpoints. */
export function HeroAuditPill({ className }: HeroAuditPillProps) {
  return (
    <Link
      href="/audit"
      data-event="hero-floating-audit"
      aria-label="Take the free 10-minute AI use audit"
      className={cn("nb-hero-audit-pill", className)}
    >
      <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
        <span className="nb-hero-audit-pill-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--nb-accent)] sm:h-3 sm:w-3" />
      </span>
      <span className="nb-hero-audit-pill-new nb-mono-label">NEW</span>
      <span aria-hidden className="nb-hero-audit-pill-divider" />
      <span className="nb-hero-audit-pill-label">Free · 10-min AI audit</span>
      <span aria-hidden className="nb-hero-audit-pill-arrow">
        →
      </span>
    </Link>
  );
}
