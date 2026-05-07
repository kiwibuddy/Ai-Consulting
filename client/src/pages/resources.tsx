import { useState } from "react";
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
import { ArrowRight, Play, FileText, ExternalLink, ClipboardList } from "lucide-react";
import { videos } from "@/content/videos";
import { articles } from "@/content/articles";
import { deepDives } from "@/content/deep-dives";
import { worksheets } from "@/content/worksheets";
import { PageSEO } from "@/components/page-seo";

/** Articles sorted newest first for display. */
const articlesByNewest = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

/** Worksheets sorted newest first (carousel: left = newest, right = oldest). */
const worksheetsByNewest = [...worksheets]
  .filter((w) => w.showInResources !== false)
  .sort((a, b) => {
    const tb = new Date(b.date).getTime();
    const ta = new Date(a.date).getTime();
    if (tb !== ta) return tb - ta;
    return a.id.localeCompare(b.id);
  });

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const ctaLabel = "Book a free 30-min consultation";
const worksheetCategories = [
  "AI & Family",
  "Christian Growth",
  "Education",
  "Working Professionals",
  "Presentations",
  "Tauranga SME",
] as const;
type WorksheetCategory = (typeof worksheetCategories)[number];
type WorksheetFilter = "All" | WorksheetCategory;
type WorksheetCardItem = (typeof worksheets)[number];
const deepDiveWaveHeights = [
  24, 36, 30, 48, 34, 58, 38, 52, 28, 46, 40, 32, 26, 42, 34, 30, 50, 36, 44, 30,
  28, 46, 34, 40, 30, 48, 32, 42,
];

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
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

export default function ResourcesPage() {
  const [showAllWorksheets, setShowAllWorksheets] = useState(false);
  const [worksheetFilter, setWorksheetFilter] = useState<WorksheetFilter>("All");
  const worksheetFilterOptions: WorksheetFilter[] = [
    "All",
    ...worksheetCategories.filter((cat) =>
      worksheetsByNewest.some((sheet) => sheet.category === cat)
    ),
  ];

  const worksheetGroups =
    worksheetFilter === "All"
      ? worksheetCategories
          .map((category) => ({
            category,
            items: worksheetsByNewest.filter((sheet) => sheet.category === category),
          }))
          .filter((group) => group.items.length > 0)
      : [
          {
            category: worksheetFilter,
            items: worksheetsByNewest.filter((sheet) => sheet.category === worksheetFilter),
          },
        ];

  const renderWorksheetCard = (sheet: WorksheetCardItem) => {
    const sheetExternal = isExternalUrl(sheet.url);
    const sheetCard = (
      <>
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
      </>
    );

    return (
      <motion.div
        key={sheet.id}
        variants={cardSlideUpItemVariants}
        whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
        className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
      >
        {sheetExternal ? (
          <a
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
          >
            {sheetCard}
          </a>
        ) : (
          <Link
            href={sheet.url}
            className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
          >
            {sheetCard}
          </Link>
        )}
      </motion.div>
    );
  };

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

      {/* Worksheets */}
      <section className={`${sectionPadding} bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
              <motion.h2
                className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900"
                variants={staggerRevealItemVariants}
              >
                Worksheets
              </motion.h2>
              <motion.button
                type="button"
                onClick={() => {
                  setShowAllWorksheets((prev) => !prev);
                  setWorksheetFilter("All");
                }}
                variants={staggerRevealItemVariants}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-[hsl(142,76%,42%)]/50 hover:text-[hsl(142,76%,42%)] transition"
              >
                {showAllWorksheets ? "Back to carousel" : "Show all"}
              </motion.button>
            </div>
            <motion.p
              className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl"
              variants={staggerRevealItemVariants}
            >
              Practical tools you can use in your family, workplace, and ministry. Open them in your browser, fill them in, and print or save when you're done.
            </motion.p>
          </motion.div>

          {!showAllWorksheets ? (
            <>
              <motion.div
                className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-6 pb-3 snap-x snap-mandatory"
                initial="hidden"
                whileInView="visible"
                viewport={landingViewportReveal}
                variants={cardSlideUpContainerVariants}
              >
                {worksheetsByNewest.map((sheet) => (
                  <div
                    key={sheet.id}
                    className="snap-start shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[calc((100%-3rem)/3)]"
                  >
                    {renderWorksheetCard(sheet)}
                  </div>
                ))}
              </motion.div>
              <p className="text-xs text-neutral-500 mt-2">
                Swipe or scroll horizontally to browse all worksheets.
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {worksheetFilterOptions.map((filter) => {
                  const active = worksheetFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setWorksheetFilter(filter)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "border-[hsl(142,76%,42%)] bg-[hsl(142,76%,42%)] text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-[hsl(142,76%,42%)]/50 hover:text-[hsl(142,76%,42%)]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
              {worksheetGroups.map((group) => (
                <div key={group.category} className="mb-14 last:mb-0">
                  {worksheetFilter === "All" && (
                    <motion.h3
                      className="text-lg md:text-xl font-semibold text-neutral-800 mb-5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={landingViewportReveal}
                      variants={fadeUpRevealVariants}
                    >
                      {group.category}
                    </motion.h3>
                  )}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={landingViewportReveal}
                    variants={cardSlideUpContainerVariants}
                  >
                    {group.items.map((sheet) => renderWorksheetCard(sheet))}
                  </motion.div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Deep-Dives (NotebookLM podcasts) */}
      <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
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
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <a
                  href={dive.url}
                  target={isExternalUrl(dive.url) ? "_blank" : undefined}
                  rel={isExternalUrl(dive.url) ? "noopener noreferrer" : undefined}
                  className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
                >
                  <DeepDiveAnimatedThumb id={dive.id} />
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
                        PODCAST · {dive.duration && `${dive.duration} · `}
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
      <section className={`${sectionPadding} bg-neutral-50`}>
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

      <SiteFooter />
    </div>
  );
}

