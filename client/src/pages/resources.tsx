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
import { ArrowRight, Play, FileText, ExternalLink, Headphones, ClipboardList } from "lucide-react";
import { videos } from "@/content/videos";
import { articles } from "@/content/articles";
import { deepDives } from "@/content/deep-dives";
import { worksheets } from "@/content/worksheets";
import { PageSEO } from "@/components/page-seo";

/** Articles sorted newest first for display. */
const articlesByNewest = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const ctaLabel = "Book a free 30-min consultation";
const worksheetCategories = ["AI & Family", "Christian Growth", "Education"] as const;

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function ResourcesPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      <PageSEO
        title="AI & Faith Resources — Articles on AI for Churches, Christian Education & Missions"
        description="Articles and essays on artificial intelligence from a Christian perspective. AI ethics for churches, digital discipleship, AI in education, parenting in the age of AI, and more. By Nathaniel Baldock."
        canonicalPath="/resources"
      />
      <SiteHeader currentPage="resources" />

      {/* Hero */}
      <section className={`pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-8 ${contentMax} mx-auto`}>
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 [text-wrap:balance]"
            variants={staggerRevealItemVariants}
          >
            Resources
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-neutral-600 leading-relaxed [text-wrap:balance]"
            variants={staggerRevealItemVariants}
          >
            Articles and essays on AI, faith, and leadership — from an AI consultant perspective. New Zealand and global.
          </motion.p>
        </motion.div>
      </section>

      {/* Articles & essays */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            Articles & essays
          </motion.h2>
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
                    <div className="aspect-video bg-neutral-100 flex items-center justify-center shrink-0">
                      <FileText className="h-12 w-12 text-neutral-300" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {article.category && (
                      <span className="text-xs font-medium text-[hsl(142,76%,42%)] uppercase tracking-wider mb-1">
                        {article.category}
                      </span>
                    )}
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-neutral-500">
                        {article.readTime && `${article.readTime} · `}
                        {article.date}
                      </span>
                      <span className="text-sm font-medium text-[hsl(142,76%,42%)] inline-flex items-center gap-1">
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
                  whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                  className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
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
        </div>
      </section>

      {/* Deep-Dives (NotebookLM podcasts) */}
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
            className="mb-8"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3"
              variants={staggerRevealItemVariants}
            >
              Deep-Dives
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl"
              variants={staggerRevealItemVariants}
            >
              AI-generated podcast conversations powered by NotebookLM. These are not authoritative sources — they are synthesised from carefully curated research, news, and content I have found valuable. I have found them to be thought-provoking companions to the topics I care about, and I hope you do too.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {deepDives.map((dive) => (
              <motion.div
                key={dive.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <a
                  href={dive.url}
                  target={isExternalUrl(dive.url) ? "_blank" : undefined}
                  rel={isExternalUrl(dive.url) ? "noopener noreferrer" : undefined}
                  className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                >
                  {dive.thumbnail ? (
                    <img
                      src={dive.thumbnail}
                      alt=""
                      className="aspect-video w-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shrink-0">
                      <Headphones className="h-12 w-12 text-neutral-300" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    {dive.category && (
                      <span className="text-xs font-medium text-[hsl(142,76%,42%)] uppercase tracking-wider mb-1">
                        {dive.category}
                      </span>
                    )}
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2">{dive.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                      {dive.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-neutral-500">
                        {dive.duration && `${dive.duration} · `}
                        {dive.date}
                      </span>
                      <span className="text-sm font-medium text-[hsl(142,76%,42%)] inline-flex items-center gap-1">
                        Listen
                        {isExternalUrl(dive.url) ? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Videos & talks */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            Videos & talks
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <a
                  href={video.url}
                  target={isExternalUrl(video.url) ? "_blank" : undefined}
                  rel={isExternalUrl(video.url) ? "noopener noreferrer" : undefined}
                  className="block aspect-video bg-neutral-200 flex items-center justify-center shrink-0 relative group"
                >
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                      <Play className="h-12 w-12" />
                      {video.duration && <span className="text-xs font-medium">{video.duration}</span>}
                    </div>
                  )}
                </a>
                <div className="p-5 flex-1 flex flex-col">
                  {video.category && (
                    <span className="text-xs font-medium text-[hsl(142,76%,42%)] uppercase tracking-wider mb-1">
                      {video.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-neutral-900 text-lg mb-2">{video.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-neutral-500">
                      {video.source === "youtube" ? "YouTube" : video.date}
                    </span>
                    <a
                      href={video.url}
                      target={isExternalUrl(video.url) ? "_blank" : undefined}
                      rel={isExternalUrl(video.url) ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium text-[hsl(142,76%,42%)] hover:underline inline-flex items-center gap-1"
                    >
                      Watch
                      {isExternalUrl(video.url) ? (
                        <ExternalLink className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Worksheets */}
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
            className="mb-10"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3"
              variants={staggerRevealItemVariants}
            >
              Worksheets
            </motion.h2>
            <motion.p
              className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl"
              variants={staggerRevealItemVariants}
            >
              Practical tools you can use in your family, workplace, and ministry. Open them in your browser, fill them in, and print or save when you're done.
            </motion.p>
          </motion.div>

          {worksheetCategories.map((cat) => {
            const items = worksheets.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-14 last:mb-0">
                <motion.h3
                  className="text-lg md:text-xl font-semibold text-neutral-800 mb-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={landingViewportReveal}
                  variants={fadeUpRevealVariants}
                >
                  {cat}
                </motion.h3>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={landingViewportReveal}
                  variants={cardSlideUpContainerVariants}
                >
                  {items.map((sheet) => (
                    <motion.div
                      key={sheet.id}
                      variants={cardSlideUpItemVariants}
                      whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                      className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <a
                        href={sheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                      >
                        {sheet.thumbnail ? (
                          <img
                            src={sheet.thumbnail}
                            alt=""
                            className="aspect-video w-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shrink-0">
                            <ClipboardList className="h-12 w-12 text-neutral-300" />
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col">
                          <h4 className="font-semibold text-neutral-900 text-lg mb-2">{sheet.title}</h4>
                          <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                            {sheet.description}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-neutral-500">
                              {sheet.format}
                            </span>
                            <span className="text-sm font-medium text-[hsl(142,76%,42%)] inline-flex items-center gap-1">
                              Open worksheet
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
