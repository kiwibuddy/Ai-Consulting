import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { DemoLoginDialog } from "@/components/demo-login-dialog";
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
import { ArrowRight, Play, FileText, ExternalLink } from "lucide-react";
import { videos } from "@/content/videos";
import { articles } from "@/content/articles";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const ctaLabel = "Book a free 30-min consultation";

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function ResourcesPage() {
  return (
    <div data-theme="tesoro" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      {/* Header — dark header, white text (match landing) */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-900/98 backdrop-blur-xl isolate">
        <div className={`container mx-auto ${contentMax} px-6 md:px-10 h-14 md:h-16 flex items-center justify-between gap-6`}>
          <Link href="/" className="flex items-center min-w-0">
            <img src="/logo.png?v=2" alt="Nathaniel Baldock — AI Consulting" className="h-10 md:h-12 w-auto flex-shrink-0 dark-header-logo" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
            <Link href="/#problems" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              The challenge
            </Link>
            <Link href="/#how-i-help" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              How I help
            </Link>
            <Link href="/#who-and-why" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Who it's for
            </Link>
            <Link href="/#proof" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Proof
            </Link>
            <Link href="/#get-started" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Get started
            </Link>
            <Link href="/speaking" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Speaking
            </Link>
            <span className="text-sm font-medium text-white">Resources</span>
          </nav>
          <div className="flex items-center gap-3 flex-shrink-0 text-white/90 [&_button]:text-white/90 [&_button:hover]:text-white [&_a]:text-white/90 [&_a:hover]:text-white">
            <ThemeToggle />
            <DemoLoginDialog />
            <Button size="sm" variant="default" className="tesoro-cta-gradient rounded-lg font-medium text-white" asChild>
              <Link href="/intake">
                {ctaLabel}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

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
            Practical wisdom for navigating AI from a Christian worldview.
          </motion.p>
        </motion.div>
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
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
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

      {/* Articles & essays */}
      <section className={`${sectionPadding} bg-neutral-50`}>
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
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
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
                    {isExternalUrl(article.url) ? (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[hsl(142,76%,42%)] hover:underline inline-flex items-center gap-1"
                      >
                        Read full article
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={article.url}
                        className="text-sm font-medium text-[hsl(142,76%,42%)] hover:underline inline-flex items-center gap-1"
                      >
                        Read full article
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer — match landing */}
      <footer className="border-t border-neutral-200 py-16 px-6 md:px-10 bg-neutral-100">
        <div className={`container mx-auto ${contentMax}`}>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-neutral-900 mb-2">Sign up for updates</p>
                <form
                  className="flex gap-2 max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
                    if (input?.value) input.value = "";
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 min-w-0 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]"
                  />
                  <Button type="submit" variant="default" size="default" className="tesoro-cta-gradient rounded-lg shrink-0">
                    Submit
                  </Button>
                </form>
              </div>
              <div className="text-sm text-neutral-600">
                <p>Tauranga, NZ · Working NZ + Global (Zoom)</p>
                <p className="mt-1">
                  Contact:{" "}
                  <a href="mailto:nathanielbaldock@gmail.com" className="hover:text-neutral-900 transition-colors duration-300">
                    nathanielbaldock@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-600">© 2026 Nathaniel Baldock</p>
              <div className="flex items-center gap-6">
                <Link href="/speaking" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Speaking
                </Link>
                <Link href="/resources" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Resources
                </Link>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Credits
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Terms
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
