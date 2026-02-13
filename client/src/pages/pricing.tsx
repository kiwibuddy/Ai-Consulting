import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const ctaLabel = "Book a free 30-min consultation";

export default function PricingPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      <SiteHeader currentPage="pricing" />

      <main className={`pt-28 pb-20 ${sectionPadding}`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="mb-12 max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-4"
              variants={staggerRevealItemVariants}
            >
              Pricing
            </motion.h1>
            <motion.p
              className="text-lg text-neutral-600 leading-relaxed"
              variants={staggerRevealItemVariants}
            >
              Simple, honest pricing. I use a sliding scale so churches, schools, and nonprofits can access the right level of support for their size and budget.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Discovery call</h2>
              <p className="text-neutral-600 mb-4">
                A free 30-minute conversation to understand your needs, answer questions, and see if we're a good fit. No obligation.
              </p>
              <p className="text-2xl font-bold text-[hsl(142,76%,42%)]">Free</p>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Speaking & workshops</h2>
              <p className="text-neutral-600 mb-4">
                Keynotes, seminars, workshops, and multi-session courses. Fees vary by format, duration, audience size, and travel. I offer a sliding scale for churches, schools, and mission organisations so that budget isn't a barrier to getting the right content.
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-1 mb-4">
                <li>Single keynote or seminar: from a base rate, scaled down for smaller organisations</li>
                <li>Half-day or full-day workshops: flat day rate with discounts for nonprofits and churches</li>
                <li>Multi-session courses: quoted per series based on scope</li>
              </ul>
              <p className="text-neutral-600">
                Exact figures are discussed on the discovery call so you get a clear quote with no surprises.
              </p>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Consulting & strategy</h2>
              <p className="text-neutral-600 mb-4">
                Ongoing advisory, AI strategy, implementation support, and training for leadership teams. Typically offered as retainer or project-based engagement, with sliding-scale options for smaller organisations.
              </p>
              <p className="text-neutral-600">
                Scope and investment are agreed after the discovery call so you know what you're committing to.
              </p>
            </section>

            <motion.div className="pt-4 flex flex-wrap gap-3" variants={staggerRevealItemVariants}>
              <Button variant="default" size="lg" className="tesoro-cta-gradient rounded-xl font-semibold" asChild>
                <Link href="/intake">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl font-semibold border-neutral-300" asChild>
                <Link href="/speaking/invite">
                  Invite me to speak
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <p className="mt-12">
            <Link href="/" className="text-[hsl(142,76%,42%)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
