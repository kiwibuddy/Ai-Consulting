"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedBlockContent, ShimmerHeading } from "@/components/article-animations";
import type { AnimatedArticleBlock } from "@/components/article-animations";
import { tesoroEase } from "@/lib/animations";

/** Light reading surface — matches prose / card backgrounds (not cinematic --nb-bg). */
export const articleBodyClass = "bg-white text-neutral-900";

export const articleSectionPadding = "py-8 md:py-12 px-6 md:px-8";
export const articleContentMax = "max-w-3xl";

export interface ArticleContentSectionData {
  id: string;
  title: string;
  blocks: AnimatedArticleBlock[];
}

/**
 * Full-width section with opaque white background. Scroll reveal uses vertical
 * motion only so the dark page shell never flashes through during load-in.
 */
export function ArticleContentSection({
  section,
}: {
  section: ArticleContentSectionData;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={section.id}
      className={`${articleSectionPadding} ${articleBodyClass} border-b border-neutral-100 last:border-b-0`}
      initial={reducedMotion ? false : { y: 20 }}
      whileInView={reducedMotion ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-60px 0px -60px 0px", amount: 0.08 }}
      transition={{
        duration: 0.55,
        ease: tesoroEase,
      }}
    >
      <div
        className={`${articleContentMax} mx-auto article-prose prose prose-neutral prose-lg max-w-none`}
      >
        <ShimmerHeading className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 tracking-tight not-prose">
          {section.title}
        </ShimmerHeading>
        <div className="space-y-0">
          {section.blocks.map((block, i) => (
            <AnimatedBlockContent key={i} block={block} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function ArticleSourcesSection({ sources }: { sources: string[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={`${articleSectionPadding} ${articleBodyClass} border-t border-neutral-200`}
      initial={reducedMotion ? false : { y: 16 }}
      whileInView={reducedMotion ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-60px 0px", amount: 0.1 }}
      transition={{ duration: 0.5, ease: tesoroEase }}
    >
      <div className={`${articleContentMax} mx-auto`}>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Sources referenced</h2>
        <ul className="text-neutral-600 space-y-2 text-sm">
          {sources.map((source, i) => (
            <li key={i}>{source}</li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
