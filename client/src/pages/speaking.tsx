import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
  tesoroEase,
} from "@/lib/animations";
import { ArrowRight, Mic2, Quote, Mail, ChevronDown } from "lucide-react";
import { speakingTopics, speakingFormats } from "@/content/speakingTopics";
import {
  speakingHero,
  speakingTestimonials,
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

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const ctaLabel = "Book a free 30-min consultation";

export default function SpeakingPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <SpeakingPageJsonLd faqs={speakingFaqs} />
      <SiteHeader currentPage="speaking" />
      <div className="overflow-x-hidden">
      {/* Hero */}
      <section className={`pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-8 ${contentMax} mx-auto`}>
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
        >
          <motion.div className="flex items-center gap-2 text-[hsl(142,76%,42%)] mb-4" variants={staggerRevealItemVariants}>
            <Mic2 className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Speaking & Workshops</span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 [text-wrap:balance]"
            variants={staggerRevealItemVariants}
          >
            {speakingHero.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-neutral-600 leading-relaxed [text-wrap:balance] mb-6"
            variants={staggerRevealItemVariants}
          >
            {speakingHero.intro}
          </motion.p>
          <motion.p
            className="text-sm font-medium text-neutral-500 uppercase tracking-wider"
            variants={staggerRevealItemVariants}
          >
            Available for: {speakingHero.availableFor}
          </motion.p>
        </motion.div>
      </section>

      {/* Speaking topics — cards */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
              Speaking topics
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
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
                whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{topic.title}</h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {topic.formats.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="font-medium">For:</span> {topic.forAudience}
                </p>
                {topic.outlineUrl && (
                  <a
                    href={topic.outlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-[hsl(142,76%,42%)] hover:underline"
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
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8 text-center"
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
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-neutral-900 mb-1">{format.name}</h3>
                <p className="text-sm text-neutral-500 mb-2">{format.duration}</p>
                <p className="text-sm text-neutral-600">{format.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What People Are Saying */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            What people are saying
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {speakingTestimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={cardSlideUpItemVariants}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
              >
                <Quote className="h-8 w-8 text-[hsl(142,76%,42%)]/40 mb-3" />
                <p className="text-neutral-700 text-sm leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-medium text-neutral-900">— {t.attribution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 text-center"
              variants={staggerRevealItemVariants}
            >
              {speakingBooking.heading}
            </motion.h2>
            <motion.p className="text-neutral-600 text-center" variants={staggerRevealItemVariants}>
              {speakingBooking.body}
            </motion.p>
            <motion.p className="text-sm text-neutral-500 text-center" variants={staggerRevealItemVariants}>
              {speakingBooking.availability}
            </motion.p>
            <motion.h3 className="text-xl font-semibold text-neutral-900 pt-4" variants={staggerRevealItemVariants}>
              {speakingBooking.ctaHeading}
            </motion.h3>
            <motion.p className="text-neutral-600" variants={staggerRevealItemVariants}>
              {speakingBooking.ctaBody}
            </motion.p>
            <motion.ul className="list-disc list-inside text-neutral-600 text-sm space-y-1" variants={staggerRevealItemVariants}>
              {speakingBooking.whatToExpect.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </motion.ul>
            <motion.div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 flex-wrap" variants={staggerRevealItemVariants}>
              <Button
                variant="default"
                size="lg"
                className="tesoro-cta-gradient rounded-xl font-semibold px-8"
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {speakingBooking.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8 text-center"
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
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="rounded-b-lg border border-t-0 border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600">
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
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h2
              className="text-xl font-bold tracking-tight text-neutral-900 mb-3"
              variants={staggerRevealItemVariants}
            >
              About Nathaniel
            </motion.h2>
            <motion.p className="text-neutral-600 text-sm leading-relaxed" variants={staggerRevealItemVariants}>
              {speakingAbout.blurb}
            </motion.p>
            <motion.div className="mt-4" variants={staggerRevealItemVariants}>
              <Link
                href="/#who-and-why"
                className="text-sm font-medium text-[hsl(142,76%,42%)] hover:underline inline-flex items-center gap-1"
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
