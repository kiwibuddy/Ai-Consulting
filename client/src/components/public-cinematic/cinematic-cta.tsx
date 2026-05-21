"use client";

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CinematicPrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  subtle?: boolean;
}

export function CinematicPrimaryCTA({
  href,
  children,
  className,
  fullWidth,
  subtle,
}: CinematicPrimaryCTAProps) {
  if (subtle) {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[10px] border text-[var(--nb-ink)] text-sm font-semibold",
          "border-[var(--nb-rule-strong)] bg-transparent hover:border-[var(--nb-accent)] transition-colors",
          fullWidth && "w-full max-w-[360px]",
          className
        )}
      >
        {children}
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("nb-btn-primary", fullWidth && "w-full max-w-[360px]", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

interface CinematicSecondaryCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CinematicSecondaryCTA({ href, children, className }: CinematicSecondaryCTAProps) {
  return (
    <Link href={href} className={cn("nb-btn-secondary", className)}>
      {children}
    </Link>
  );
}
