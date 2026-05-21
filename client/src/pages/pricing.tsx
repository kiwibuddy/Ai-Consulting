import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { PageSEO } from "@/components/page-seo";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import { CinematicPrimaryCTA, CinematicSecondaryCTA } from "@/components/public-cinematic/cinematic-cta";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

const ctaLabel = "Book a free 30-min consultation";

const tiers = [
  {
    title: "Discovery call",
    body: "A free 30-minute conversation to understand your needs, answer questions, and see if we're a good fit. No obligation.",
    price: "Free",
  },
  {
    title: "Speaking & workshops",
    body: "Keynotes, seminars, workshops, and multi-session courses. Fees vary by format, duration, audience size, and travel. I offer a sliding scale for churches, schools, and mission organisations.",
    bullets: [
      "Single keynote or seminar: from a base rate, scaled down for smaller organisations",
      "Half-day or full-day workshops: flat day rate with discounts for nonprofits and churches",
      "Multi-session courses: quoted per series based on scope",
    ],
    foot: "Exact figures are discussed on the discovery call so you get a clear quote with no surprises.",
  },
  {
    title: "Consulting & strategy",
    body: "Ongoing advisory, AI strategy, implementation support, and training for leadership teams. Typically offered as retainer or project-based engagement, with sliding-scale options for smaller organisations.",
    foot: "Scope and investment are agreed after the discovery call so you know what you're committing to.",
  },
];

export default function PricingPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="AI Consulting Pricing — Workshops, Strategy Sessions & Speaking for Churches and Schools"
        description="Transparent pricing for AI consulting, workshops, and keynote speaking. Tailored for churches, Christian schools, nonprofits, and mission organisations. Free 30-minute discovery call available."
        canonicalPath="/pricing"
      />

      <main className="pt-28 pb-20 nb-section scroll-mt-24">
        <div className="nb-container px-0 max-w-[1240px]">
          <SectionLabel num="01">Pricing</SectionLabel>
          <motion.div
            className="mb-12 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h1
              className="nb-display nb-display-lg font-normal m-0 mb-4"
              variants={staggerRevealItemVariants}
            >
              Simple, honest pricing
            </motion.h1>
            <motion.p className="nb-body-lg m-0" variants={staggerRevealItemVariants}>
              I use a sliding scale so churches, schools, and nonprofits can access the right level of
              support for their size and budget.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            {tiers.map((tier) => (
              <section
                key={tier.title}
                className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6 md:p-8"
              >
                <h2 className="nb-display text-2xl font-normal text-[var(--nb-ink)] m-0 mb-3">
                  {tier.title}
                </h2>
                <p className="nb-body m-0 mb-4">{tier.body}</p>
                {tier.bullets && (
                  <ul className="list-disc list-inside text-[var(--nb-ink-soft)] space-y-1 mb-4 text-[15px]">
                    {tier.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {tier.price && (
                  <p className="nb-stat-value text-[var(--nb-accent)] text-3xl">{tier.price}</p>
                )}
                {tier.foot && <p className="nb-body mt-4 mb-0">{tier.foot}</p>}
              </section>
            ))}

            <div className="pt-4 flex flex-wrap gap-4">
              <CinematicPrimaryCTA href="/intake">{ctaLabel}</CinematicPrimaryCTA>
              <CinematicSecondaryCTA href="/speaking/invite">
                Invite me to speak →
              </CinematicSecondaryCTA>
            </div>
          </motion.div>

          <p className="mt-12">
            <Link href="/" className="nb-btn-secondary">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
