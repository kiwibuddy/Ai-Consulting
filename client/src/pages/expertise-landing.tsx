import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { AboutPageJsonLd, ExpertisePageJsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import {
  CinematicPrimaryCTA,
  CinematicSecondaryCTA,
} from "@/components/public-cinematic/cinematic-cta";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  getExpertisePageByPath,
  type ExpertisePagePath,
} from "@/content/expertise-pages";
import {
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";
import { motion } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ExpertiseLandingPageProps {
  pagePath: ExpertisePagePath;
}

export default function ExpertiseLandingPage({ pagePath }: ExpertiseLandingPageProps) {
  const content = getExpertisePageByPath(pagePath);
  if (!content) return null;

  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title={content.seoTitle}
        description={content.seoDescription}
        canonicalPath={content.path}
      />
      <ExpertisePageJsonLd faqs={content.faqs} />

      <main className="pt-28 pb-20 nb-section scroll-mt-24">
        <div className="nb-container px-0 max-w-[1240px]">
          <SectionLabel num="01">{content.sectionLabel}</SectionLabel>

          <motion.div
            className="mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h1
              className="nb-display nb-display-lg font-normal m-0 mb-4 max-w-3xl"
              variants={staggerRevealItemVariants}
            >
              {content.h1}
            </motion.h1>
            <motion.p className="nb-body-lg m-0 max-w-2xl" variants={staggerRevealItemVariants}>
              {content.subheading}
            </motion.p>
          </motion.div>

          <ScrollReveal>
            <section className="mb-12 pb-12 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Who this is for
              </h2>
              <p className="nb-body text-[17px] m-0 max-w-3xl">{content.whoFor}</p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-12 pb-12 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Problems we address
              </h2>
              <ul className="space-y-3 m-0 pl-5 nb-body text-[17px] max-w-3xl">
                {content.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-12 pb-12 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Outcomes you can expect
              </h2>
              <ul className="space-y-3 m-0 pl-5 nb-body text-[17px] max-w-3xl">
                {content.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-12 pb-12 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                {content.proofHeading}
              </h2>
              <ul className="space-y-3 m-0 pl-5 nb-body text-[17px] max-w-3xl mb-6">
                {content.proofPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <blockquote className="border-l-2 border-[var(--nb-accent)] pl-5 m-0 nb-body text-[17px] max-w-3xl text-[var(--nb-ink-soft)]">
                {content.citableHook}
              </blockquote>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <CinematicPrimaryCTA href={content.primaryCta.href}>
                {content.primaryCta.label}
              </CinematicPrimaryCTA>
              <CinematicSecondaryCTA href={content.secondaryCta.href}>
                {content.secondaryCta.label} →
              </CinematicSecondaryCTA>
            </div>
          </ScrollReveal>

          {content.faqs.length > 0 && (
            <ScrollReveal>
              <section>
                <h2 className="nb-mono-label mb-6" style={{ color: "var(--nb-accent)" }}>
                  Frequently asked questions
                </h2>
                <div className="space-y-3 max-w-3xl">
                  {content.faqs.map((faq) => (
                    <Collapsible key={faq.question}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] px-5 py-4 text-left nb-body text-[16px] hover:border-[var(--nb-rule-strong)] transition-colors">
                        <span>{faq.question}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--nb-ink-dim)]" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-5 pt-3 pb-4 nb-body text-[16px] text-[var(--nb-ink-soft)]">
                        {faq.answer}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

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
