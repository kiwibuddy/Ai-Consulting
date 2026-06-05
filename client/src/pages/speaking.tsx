import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
  cinematicEase,
} from "@/lib/animations";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import { CinematicPrimaryCTA, CinematicSecondaryCTA } from "@/components/public-cinematic/cinematic-cta";
import { speakingTopics, speakingFormats } from "@/content/speakingTopics";
import {
  speakingHero,
  speakingBooking,
  speakingAbout,
  speakingFaqs,
} from "@/content/speakingPage";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SpeakingPageJsonLd } from "@/components/json-ld";
import { PageSEO } from "@/components/page-seo";

const contentMax = "nb-container max-w-6xl px-0 mx-auto";
const ctaLabel = "Book a free 30-min consultation";

export default function SpeakingPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Invite Nathaniel Baldock to Speak — AI, Faith & Technology Keynotes"
        description="Book Nathaniel Baldock as a speaker for your church, conference, or Christian school. Keynotes and workshops on AI and faith, digital discipleship, technology ethics, and navigating AI as a Christian leader."
        canonicalPath="/speaking"
      />
      <SpeakingPageJsonLd faqs={speakingFaqs} />
      <div className="overflow-x-hidden">
      {/* Hero — same shell as homepage */}
      <section id="top" className="nb-hero nb-hero--speaking relative overflow-hidden pt-[76px]">
        <div className="absolute inset-0 z-0 overflow-hidden nb-hero-zoom">
          <img
            src="/speaking-hero.jpg"
            alt=""
            className="nb-hero-photo w-full h-full object-cover"
          />
        </div>
        <div className="nb-hero-gradient-side absolute inset-0 z-[1]" aria-hidden />
        <div className="nb-hero-gradient-bottom absolute inset-0 z-[1]" aria-hidden />

        <div className="nb-hero-inner relative z-[5] max-w-[1440px] mx-auto flex items-center px-[var(--nb-section-x)]">
          <div className="nb-hero-copy w-full max-w-[820px] py-[clamp(56px,8vw,88px)]">
            <ScrollReveal>
              <div className="nb-hero-eyebrow flex flex-wrap items-center gap-3.5 mb-10 nb-mono-label">
                <span
                  className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
                  style={{
                    background: "var(--nb-accent)",
                    boxShadow: "0 0 0 4px color-mix(in srgb, var(--nb-accent) 22%, transparent)",
                  }}
                />
                <span>{speakingHero.eyebrow}</span>
                <span className="w-[18px] h-px bg-[var(--nb-rule)]" />
                <span>Tauranga · Aotearoa · Global</span>
              </div>
            </ScrollReveal>

            <h1 className="nb-display nb-display-hero nb-display-hero--speaking m-0 pb-[0.08em]">
              <ScrollReveal delay={50}>
                <span className="block">{speakingHero.titleLine1}</span>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <span className="block">
                  {speakingHero.titleLine2}{" "}
                  <em
                    className="nb-italic-accent not-italic font-light underline decoration-[color-mix(in_srgb,var(--nb-accent)_45%,transparent)] decoration-[0.07em] underline-offset-[0.05em]"
                    style={{ fontStyle: "italic" }}
                  >
                    {speakingHero.titleAccent}
                  </em>
                  <span className="text-[var(--nb-accent)]">.</span>
                </span>
              </ScrollReveal>
            </h1>

            <ScrollReveal delay={420}>
              <p className="nb-body-lg mt-10 mb-0 max-w-[620px]">
                {speakingHero.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={580}>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <CinematicPrimaryCTA href="/speaking/invite">
                  {speakingHero.heroCtaLabel}
                </CinematicPrimaryCTA>
                <CinematicSecondaryCTA href="#topics">Speaking topics →</CinematicSecondaryCTA>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={660}>
              <p
                className="nb-mono-label mt-7 mb-0 max-w-[620px] text-[var(--nb-ink-dim)]"
                style={{ fontSize: 10, letterSpacing: "0.14em", lineHeight: 1.65 }}
              >
                Available for: {speakingHero.availableFor}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Speaking topics — cards */}
      <section
        id="topics"
        className="nb-inner-section bg-[var(--nb-bg-raised)] border-y border-[var(--nb-rule)]/80 scroll-mt-24"
      >
        <div className={contentMax}>
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            <h2 className="nb-section-title mb-3">
              Speaking topics
            </h2>
            <p className="text-[var(--nb-ink-soft)] max-w-2xl mx-auto">
              Each topic can be tailored to your audience and format — from a single keynote to a multi-session course.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {speakingTopics.map((topic, i) => (
              <motion.div
                key={topic.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: cinematicEase } }}
                className="rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="nb-card-title mb-2">{topic.title}</h3>
                <p className="text-[var(--nb-ink-soft)] text-sm md:text-base leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {topic.formats.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center rounded-full bg-[var(--nb-bg-panel)] px-3 py-1 text-xs font-medium text-[var(--nb-ink-soft)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--nb-ink-dim)]">
                  <span className="font-medium">For:</span> {topic.forAudience}
                </p>
                {topic.outlineUrl && (
                  <a
                    href={topic.outlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-[var(--nb-accent)] hover:underline"
                  >
                    View outline →
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formats */}
      <section className="nb-inner-section bg-[var(--nb-bg)]">
        <div className={contentMax}>
          <motion.h2
            className="nb-section-title mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            Speaking formats
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            {speakingFormats.map((format) => (
              <motion.div
                key={format.name}
                variants={staggerRevealItemVariants}
                className="rounded-xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-5 shadow-sm"
              >
                <h3 className="nb-card-title mb-1">{format.name}</h3>
                <p className="text-sm text-[var(--nb-ink-dim)] mb-2">{format.duration}</p>
                <p className="text-sm text-[var(--nb-ink-soft)]">{format.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="nb-inner-section bg-[var(--nb-bg)]">
        <div className={contentMax}>
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h2
              className="nb-section-title text-center"
              variants={staggerRevealItemVariants}
            >
              {speakingBooking.heading}
            </motion.h2>
            <motion.p className="text-[var(--nb-ink-soft)] text-center" variants={staggerRevealItemVariants}>
              {speakingBooking.body}
            </motion.p>
            <motion.p className="text-sm text-[var(--nb-ink-dim)] text-center" variants={staggerRevealItemVariants}>
              {speakingBooking.availability}
            </motion.p>
            <motion.h3 className="nb-card-title pt-4" variants={staggerRevealItemVariants}>
              {speakingBooking.ctaHeading}
            </motion.h3>
            <motion.p className="text-[var(--nb-ink-soft)]" variants={staggerRevealItemVariants}>
              {speakingBooking.ctaBody}
            </motion.p>
            <motion.ul className="list-disc list-inside text-[var(--nb-ink-soft)] text-sm space-y-1" variants={staggerRevealItemVariants}>
              {speakingBooking.whatToExpect.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </motion.ul>
            <motion.div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 flex-wrap" variants={staggerRevealItemVariants}>
              <Button
                variant="default"
                size="lg"
                className="nb-btn-primary rounded-xl font-semibold px-8"
                asChild
              >
                <Link href="/intake">
                  Book a discovery call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl font-semibold px-8 border-neutral-300"
                asChild
              >
                <Link href="/speaking/invite">
                  Invite me to speak
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a
                href={`mailto:${speakingBooking.email}?subject=${encodeURIComponent(speakingBooking.mailtoSubject ?? "Inquiry - nathanielbaldock.com")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-[var(--nb-bg-raised)] px-6 py-3 text-sm font-medium text-[var(--nb-ink-soft)] hover:bg-[var(--nb-bg)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                {speakingBooking.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="nb-inner-section bg-[var(--nb-bg-raised)] border-y border-[var(--nb-rule)]/80">
        <div className={contentMax}>
          <motion.h2
            className="nb-section-title mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            Frequently asked questions
          </motion.h2>
          <motion.div
            className="max-w-2xl mx-auto space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            {speakingFaqs.map((faq, i) => (
              <Collapsible key={i}>
                <motion.div variants={staggerRevealItemVariants}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--nb-ink)] hover:bg-[var(--nb-bg-panel)] transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="rounded-b-lg border border-t-0 border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] px-4 py-3 text-sm text-[var(--nb-ink-soft)]">
                      {faq.answer}
                    </p>
                  </CollapsibleContent>
                </motion.div>
              </Collapsible>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Nathaniel */}
      <section className="nb-inner-section bg-[var(--nb-bg)]">
        <div className={contentMax}>
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h2
              className="nb-card-title mb-3"
              variants={staggerRevealItemVariants}
            >
              About Nathaniel
            </motion.h2>
            <motion.p className="text-[var(--nb-ink-soft)] text-sm leading-relaxed" variants={staggerRevealItemVariants}>
              {speakingAbout.blurb}
            </motion.p>
            <motion.div className="mt-4" variants={staggerRevealItemVariants}>
              <Link
                href="/#who-and-why"
                className="text-sm font-medium text-[var(--nb-accent)] hover:underline inline-flex items-center gap-1"
              >
                Learn more about consulting services
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </div>
  );
}
