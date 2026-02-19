"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeft, FileText } from "lucide-react";
import {
  articleMeta,
  articleSections,
  articleSummary,
  sourcesList,
  type ArticleBlock,
} from "@/content/article-raising-humans";
import { ArticleSummaryModal } from "@/components/article-summary-modal";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
  tesoroEase,
} from "@/lib/animations";

const contentMax = "max-w-3xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";

function ArticleSEO() {
  const { title, description, author, publishedDate, image, canonicalUrl } = articleMeta;
  const fullImageUrl = image.startsWith("http") ? image : `https://www.nathanielbaldock.com${image}`;

  useEffect(() => {
    document.title = `${title} — Nathaniel Baldock`;
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", fullImageUrl, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", "article", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", fullImageUrl);

    const linkCanonical =
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement) || document.createElement("link");
    linkCanonical.rel = "canonical";
    linkCanonical.href = canonicalUrl;
    if (!document.querySelector('link[rel="canonical"]')) document.head.appendChild(linkCanonical);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: { "@type": "Person", name: author, url: articleMeta.authorUrl },
      datePublished: publishedDate,
      dateModified: articleMeta.modifiedDate,
      image: fullImageUrl,
      publisher: { "@type": "Organization", name: "Nathaniel Baldock", url: "https://www.nathanielbaldock.com" },
    };
    let script = document.getElementById("article-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "article-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = "Nathaniel Baldock — AI Consulting for Faith, Education & Impact";
    };
  }, [title, description, author, publishedDate, image, canonicalUrl, fullImageUrl]);

  return null;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  if (reducedMotion || progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[hsl(142,76%,42%)]/30 z-[100]"
      role="presentation"
      aria-hidden
    >
      <motion.div
        className="h-full bg-[hsl(142,76%,42%)]"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.15 }}
              />
    </div>
  );
}

function ArticleHero() {
  const reducedMotion = useReducedMotion();
  const container = useRef(null);
  const inView = useInView(container, { once: true, amount: 0.2 });

  return (
    <header ref={container} className="relative min-h-[70vh] flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={articleMeta.image}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-neutral-900/60"
          aria-hidden
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24 pt-32 md:pt-40 text-center">
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate={reducedMotion || inView ? "visible" : "hidden"}
          variants={staggerRevealContainerVariants}
        >
          <motion.p
            className="text-sm md:text-base font-medium uppercase tracking-widest text-white/90"
            variants={staggerRevealItemVariants}
          >
            {articleMeta.category}
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight [text-wrap:balance] drop-shadow-lg"
            variants={staggerRevealItemVariants}
          >
            {articleMeta.title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/95 [text-wrap:balance] max-w-2xl mx-auto"
            variants={staggerRevealItemVariants}
          >
            {articleMeta.subtitle}
          </motion.p>
          <motion.p
            className="text-sm text-white/80"
            variants={staggerRevealItemVariants}
          >
            {articleMeta.author} · {articleMeta.readTime} · {articleMeta.publishedDate}
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}

function BlockContent({ block }: { block: ArticleBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-neutral-700 leading-relaxed text-lg mb-6 [text-wrap:balance]">
        {block.text}
      </p>
    );
  }
  if (block.type === "subheading") {
    return (
      <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
        {block.text}
      </h3>
    );
  }
  if (block.type === "discussion") {
    return (
      <div className="my-10 p-6 rounded-2xl bg-neutral-100 border border-neutral-200">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(142,76%,42%)] mb-4">
          Discussion questions
        </h4>
        <ul className="space-y-3">
          {block.questions.map((q, i) => (
            <li key={i} className="text-neutral-700 leading-relaxed pl-4 border-l-2 border-neutral-300">
              {q}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

function ArticleSection({ section, index }: { section: (typeof articleSections)[0]; index: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={section.id}
      className={`${sectionPadding} ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
      initial={reducedMotion ? false : { opacity: 0, y: 48 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px -80px 0px", amount: 0.1 }}
      transition={{
        duration: 0.7,
        ease: tesoroEase,
        delay: reducedMotion ? 0 : 0.08,
      }}
    >
      <div className={`${contentMax} mx-auto prose prose-neutral prose-lg max-w-none`}>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 tracking-tight not-prose">
          {section.title}
        </h2>
        <div className="space-y-0">
          {section.blocks.map((block, i) => (
            <BlockContent key={i} block={block} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function ArticleRaisingHumans() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  return (
    <div
      data-theme="site"
      className="min-h-screen bg-neutral-50 text-neutral-900 font-sans overflow-x-hidden"
    >
      <ArticleSEO />
      <ReadingProgress />
      <ArticleSummaryModal
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        title={articleMeta.title}
        summary={articleSummary}
      />
      <SiteHeader currentPage="resources" />

      <article>
        <ArticleHero />
        <section className="bg-white border-b border-neutral-200 px-6 py-5">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3">
            <p className="text-sm text-neutral-600">
              Get a quick one page summary here
            </p>
            <button
              type="button"
              onClick={() => setSummaryOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:border-[hsl(142,76%,42%)]/50 hover:text-[hsl(142,76%,42%)] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
            >
              <FileText className="h-4 w-4" />
              Summary of Article
            </button>
          </div>
        </section>

        {articleSections.map((section, index) => (
          <ArticleSection key={section.id} section={section} index={index} />
        ))}

        <motion.section
          className={`${sectionPadding} bg-white border-t border-neutral-200`}
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
        >
          <div className={`${contentMax} mx-auto`}>
            <motion.h2
              className="text-2xl font-bold text-neutral-900 mb-6"
              variants={staggerRevealItemVariants}
            >
              Sources referenced
            </motion.h2>
            <motion.ul
              className="text-neutral-600 space-y-2 text-sm"
              variants={staggerRevealItemVariants}
            >
              {sourcesList.map((source, i) => (
                <li key={i}>{source}</li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        <section className="py-12 px-6 border-t border-neutral-200 bg-neutral-50">
          <div className={`${contentMax} mx-auto flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-[hsl(142,76%,42%)] font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
            <Button asChild>
              <a
                href="https://www.nathanielbaldock.com/#contact"
                className="tesoro-cta-gradient"
              >
                Book a free 30-min consultation
              </a>
            </Button>
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
