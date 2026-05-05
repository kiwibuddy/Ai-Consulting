import { Link } from "wouter";

export interface WorksheetLeadCTAProps {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  /** Serif headline shown as the panel title. */
  headline?: string;
  /** Supporting paragraph beneath the headline. */
  body?: string;
  /** Primary call-to-action label. */
  primaryLabel?: string;
  /** Primary call-to-action URL — defaults to the public booking anchor. */
  primaryHref?: string;
  /** Secondary link label. */
  secondaryLabel?: string;
  /** Secondary link URL — internal routes use client-side navigation. */
  secondaryHref?: string;
}

const DEFAULTS = {
  eyebrow: "Tauranga · Bay of Plenty",
  headline: "Want help putting this into practice?",
  body: "A 30-minute conversation can turn this worksheet into a clear next step for your family, church, school, or team — tailored to your specific situation. No jargon, no pitch.",
  primaryLabel: "Book a free 30-min call",
  primaryHref: "https://www.nathanielbaldock.com/#contact",
  secondaryLabel: "See more free resources",
  secondaryHref: "/resources",
} as const;

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Navy lead-magnet CTA shown beneath every worksheet/deep-dive iframe.
 * Visual language matches the in-worksheet "Not sure if your current AI use
 * is compliant?" panel, but lives in React so changes propagate everywhere.
 */
export function WorksheetLeadCTA({
  eyebrow = DEFAULTS.eyebrow,
  headline = DEFAULTS.headline,
  body = DEFAULTS.body,
  primaryLabel = DEFAULTS.primaryLabel,
  primaryHref = DEFAULTS.primaryHref,
  secondaryLabel = DEFAULTS.secondaryLabel,
  secondaryHref = DEFAULTS.secondaryHref,
}: WorksheetLeadCTAProps) {
  const primaryExternal = isExternal(primaryHref);
  const secondaryExternal = isExternal(secondaryHref);

  return (
    <section className="px-6 py-12 md:py-16 bg-neutral-50">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-[hsl(207,38%,18%)] text-white px-7 py-9 sm:px-10 sm:py-11 md:px-12 md:py-12 shadow-lg">
          <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-white/55 mb-4">
            {eyebrow}
          </p>
          <h2
            className="font-serif text-2xl sm:text-[28px] md:text-[32px] leading-tight text-white mb-4 [text-wrap:balance]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {headline}
          </h2>
          <p className="text-sm sm:text-[15px] leading-relaxed text-white/75 max-w-xl mb-7">
            {body}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {primaryExternal ? (
              <a
                href={primaryHref}
                className="tesoro-cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(92,82%,55%)]/60"
              >
                {primaryLabel}
              </a>
            ) : (
              <Link
                href={primaryHref}
                className="tesoro-cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(92,82%,55%)]/60"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-transparent px-5 py-3 text-xs font-medium tracking-wide text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-transparent px-5 py-3 text-xs font-medium tracking-wide text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
