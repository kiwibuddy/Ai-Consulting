import { Link } from "wouter";
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
import { ArrowRight, FileText, ExternalLink } from "lucide-react";
import { articles } from "@/content/articles";
import { deepDives, deepDivesSection } from "@/content/deep-dives";
import { worksheets } from "@/content/worksheets";
import { PageSEO } from "@/components/page-seo";
import { FaqPageJsonLd } from "@/components/json-ld";
import { PublicFaqSection } from "@/components/public-cinematic/public-faq-section";
import { publicFaqItems } from "@/content/public-faq";
import { WorksheetSetCards } from "@/components/worksheet-set-cards";
import { SCHOOL_SUITE_PACK } from "@/content/school-suite";

const articlesByNewest = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const worksheetsById = new Map(worksheets.map((w) => [w.id, w]));

const contentMax = "nb-container max-w-6xl px-0 mx-auto";
const deepDiveWaveHeights = [
  24, 36, 30, 48, 34, 58, 38, 52, 28, 46, 40, 32, 26, 42, 34, 30, 50, 36, 44, 30,
  28, 46, 34, 40, 30, 48, 32, 42,
];

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

const resourceCardCtaClass =
  "text-sm font-medium text-[var(--nb-accent)] inline-flex items-center gap-1";

function formatResourceDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function DeepDiveAnimatedThumb({ id }: { id: string }) {
  const blueVariant = id === "the-broken-ladder-and-the-race-for-their-soul";
  const bandClass = blueVariant
    ? "from-[hsl(224,48%,24%)] via-[hsl(226,52%,30%)] to-[hsl(224,48%,24%)]"
    : "from-[hsl(280,54%,20%)] via-[hsl(278,56%,28%)] to-[hsl(280,54%,20%)]";
  const bgClass = blueVariant
    ? "from-[hsl(230,38%,10%)] via-[hsl(234,34%,14%)] to-[hsl(246,32%,18%)]"
    : "from-[hsl(254,36%,10%)] via-[hsl(260,34%,13%)] to-[hsl(272,34%,18%)]";

  return (
    <div className={`aspect-video w-full shrink-0 bg-gradient-to-br ${bgClass} flex items-center justify-center overflow-hidden`}>
      <div className={`w-full h-[28%] bg-gradient-to-r ${bandClass} flex items-center justify-center`}>
        <div className="flex items-center justify-center gap-[7px] px-5">
          {deepDiveWaveHeights.map((height, index) => {
            const isGreen = index % 2 === 0;
            const delay = `${(index % 10) * 0.11}s`;
            return (
              <span
                key={`${id}-wave-${index}`}
                className={`inline-block w-[6px] rounded-full will-change-transform ${
                  isGreen ? "bg-[hsl(150,42%,40%)]" : "bg-[hsl(266,50%,58%)]"
                }`}
                style={{
                  height: `${height}px`,
                  animation: "deepDiveWavePulse 1.9s ease-in-out infinite",
                  animationDelay: delay,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResourceSection({
  title,
  intro,
  children,
  raised = false,
  footer,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
  raised?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <section
      className={`nb-inner-section border-y border-[var(--nb-rule)]/80 ${
        raised ? "bg-[var(--nb-bg-raised)]" : "bg-[var(--nb-bg)]"
      }`}
    >
      <div className={contentMax}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
          className="mb-8"
        >
          <motion.h2 className="nb-section-title mb-3" variants={staggerRevealItemVariants}>
            {title}
          </motion.h2>
          {intro && (
            <motion.p
              className="text-sm md:text-base text-[var(--nb-ink-soft)] leading-relaxed max-w-3xl m-0"
              variants={staggerRevealItemVariants}
            >
              {intro}
            </motion.p>
          )}
        </motion.div>
        {children}
        {footer}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="AI & Faith Resources - Articles on AI for Churches, Christian Education & Missions"
        description="Articles and essays on artificial intelligence from a Christian perspective. AI ethics for churches, digital discipleship, AI in education, parenting in the age of AI, FAQs, and free worksheets. By Nathaniel Baldock."
        canonicalPath="/resources"
      />
      <FaqPageJsonLd
        faqs={publicFaqItems.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <section className={`nb-inner-main ${contentMax}`}>
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
        >
          <motion.h1
            className="nb-page-title mb-6 [text-wrap:balance]"
            variants={staggerRevealItemVariants}
          >
            Resources
          </motion.h1>
          <motion.p
            className="nb-body-lg text-[var(--nb-ink-soft)] leading-relaxed [text-wrap:balance]"
            variants={staggerRevealItemVariants}
          >
            Articles, worksheet sets, and research briefings. Start anywhere — each worksheet set
            opens with one free preview; email unlocks the rest.
          </motion.p>
        </motion.div>
      </section>

      <ResourceSection title="Articles & essays" raised>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={cardSlideUpContainerVariants}
        >
          {articlesByNewest.map((article) => {
            const isExternal = isExternalUrl(article.url);
            const cardContent = (
              <>
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    className="aspect-video w-full object-cover shrink-0"
                  />
                ) : (
                  <div className="aspect-video bg-[var(--nb-bg-panel)] flex items-center justify-center shrink-0">
                    <FileText className="h-12 w-12 text-[var(--nb-ink-dim)]" />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  {article.category && (
                    <span className="text-xs font-medium text-[var(--nb-ink-soft)] uppercase tracking-wider mb-1">
                      {article.category}
                    </span>
                  )}
                  <h3 className="nb-card-title mb-2">{article.title}</h3>
                  <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[var(--nb-ink-dim)]">
                      {article.readTime && `${article.readTime} · `}
                      {formatResourceDate(article.date)}
                    </span>
                    <span className={resourceCardCtaClass}>
                      Read full article
                      {isExternal ? (
                        <ExternalLink className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={article.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: cinematicEase } }}
                className="flex flex-col rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg)] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {isExternal ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    href={article.url}
                    className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                  >
                    {cardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </ResourceSection>

      <ResourceSection
        title="Worksheet sets"
        intro="Six sets for families, faith, schools, professionals, preparedness, and Tauranga businesses. Open worksheet 1 free; enter your email at the bottom of any preview to unlock the full set."
        footer={
          <p className="text-sm text-[var(--nb-ink-soft)] mt-8 m-0">
            Want live teaching?{" "}
            <Link href="/speaking" className="text-[var(--nb-accent)] hover:underline">
              Book a speaking session
            </Link>
            . Schools: see the{" "}
            <Link href={SCHOOL_SUITE_PACK} className="text-[var(--nb-accent)] hover:underline">
              schools pack
            </Link>
            . Businesses: the paid{" "}
            <Link href="/tauranga-sme" className="text-[var(--nb-accent)] hover:underline">
              AI-Ready Business Pack
            </Link>{" "}
            goes deeper.
          </p>
        }
      >
        <WorksheetSetCards worksheetsById={worksheetsById} />
      </ResourceSection>

      <section className="nb-inner-section border-y border-[var(--nb-rule)]/80 bg-[var(--nb-bg)]">
        <div className={contentMax}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
            className="mb-8"
          >
            <motion.p
              className="nb-mono-label text-[11px] mb-3 m-0 tracking-[0.16em]"
              style={{ color: "var(--nb-accent)" }}
              variants={staggerRevealItemVariants}
            >
              {deepDivesSection.eyebrow}
            </motion.p>
            <motion.h2 className="nb-section-title mb-3" variants={staggerRevealItemVariants}>
              {deepDivesSection.title}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-[var(--nb-ink-soft)] leading-relaxed max-w-3xl m-0"
              variants={staggerRevealItemVariants}
            >
              {deepDivesSection.intro}
            </motion.p>
            <motion.p
              className="text-xs md:text-sm text-[var(--nb-ink-dim)] leading-relaxed max-w-3xl m-0 mt-5 pl-4 border-l-2 border-[hsl(280,40%,45%)]/50"
              variants={staggerRevealItemVariants}
            >
              {deepDivesSection.sourceNote}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {deepDives.map((dive) => (
              <motion.div
                key={dive.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: cinematicEase } }}
                className="flex flex-col rounded-2xl border border-dashed border-[hsl(280,36%,42%)]/35 bg-[var(--nb-bg-raised)] overflow-hidden shadow-sm hover:shadow-lg hover:border-[hsl(280,36%,52%)]/50 transition-all duration-300"
              >
                <a
                  href={dive.url}
                  className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                >
                  <div className="relative">
                    <DeepDiveAnimatedThumb id={dive.id} />
                    <span className="absolute top-3 left-3 nb-mono-label text-[10px] px-2 py-1 rounded-full bg-[#0f1014]/80 border border-[hsl(280,40%,55%)]/40 text-[hsl(280,50%,78%)] backdrop-blur-sm">
                      AI audio briefing
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    {dive.category && (
                      <span className="text-xs font-medium text-[hsl(280,40%,65%)] uppercase tracking-wider mb-1">
                        {dive.category}
                      </span>
                    )}
                    <h4 className="nb-card-title mb-2">{dive.title}</h4>
                    <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed flex-1 mb-4">
                      {dive.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      {dive.duration && (
                        <span className="text-xs text-[var(--nb-ink-dim)]">{dive.duration}</span>
                      )}
                      <span className={`${resourceCardCtaClass} ml-auto`}>
                        {deepDivesSection.cardCta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PublicFaqSection className="bg-[var(--nb-bg-raised)]" />

      <SiteFooter />
    </div>
  );
}
