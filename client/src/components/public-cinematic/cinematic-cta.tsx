"use client";

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { isFullPageNavigation } from "@/lib/public-navigation";

interface CinematicPrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  subtle?: boolean;
}

function CtaAnchor({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function CinematicPrimaryCTA({
  href,
  children,
  className,
  fullWidth,
  subtle,
}: CinematicPrimaryCTAProps) {
  const fullPage = isFullPageNavigation(href);
  const external = href.startsWith("http://") || href.startsWith("https://");

  if (subtle) {
    const subtleClass = cn(
      "inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[10px] border text-[var(--nb-ink)] text-sm font-semibold",
      "border-[var(--nb-rule-strong)] bg-transparent hover:border-[var(--nb-accent)] transition-colors",
      fullWidth && "w-full max-w-[360px]",
      className,
    );
    const inner = (
      <>
        {children}
        <ArrowRight className="h-4 w-4" />
      </>
    );
    return fullPage ? (
      <CtaAnchor href={href} className={subtleClass} external={external}>
        {inner}
      </CtaAnchor>
    ) : (
      <CtaLink href={href} className={subtleClass}>
        {inner}
      </CtaLink>
    );
  }

  const primaryClass = cn("nb-btn-primary", fullWidth && "w-full max-w-[360px]", className);
  const inner = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" />
    </>
  );
  return fullPage ? (
    <CtaAnchor href={href} className={primaryClass} external={external}>
      {inner}
    </CtaAnchor>
  ) : (
    <CtaLink href={href} className={primaryClass}>
      {inner}
    </CtaLink>
  );
}

interface CinematicSecondaryCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CinematicSecondaryCTA({ href, children, className }: CinematicSecondaryCTAProps) {
  const fullPage = isFullPageNavigation(href);
  const external = href.startsWith("http://") || href.startsWith("https://");
  const secondaryClass = cn("nb-btn-secondary", className);

  if (fullPage) {
    return (
      <CtaAnchor href={href} className={secondaryClass} external={external}>
        {children}
      </CtaAnchor>
    );
  }

  return <CtaLink href={href} className={secondaryClass}>{children}</CtaLink>;
}
