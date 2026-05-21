"use client";

import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeUpRevealVariants,
  landingViewportReveal,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
} from "@/lib/animations";
import {
  publicFaqCategoryMeta,
  publicFaqCategoryOrder,
  publicFaqItems,
  type PublicFaqCategory,
  type PublicFaqItem,
} from "@/content/public-faq";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PublicFaqSectionProps {
  id?: string;
  className?: string;
}

function FaqEntry({ item }: { item: PublicFaqItem }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 rounded-md border border-[var(--nb-rule-strong)] bg-[var(--nb-bg-panel)] px-4 py-3.5 text-left text-[15px] font-medium text-[var(--nb-ink)] hover:bg-[var(--nb-bg-raised)] transition-colors [&[data-state=open]>svg]:rotate-180">
        <span>{item.question}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[var(--nb-ink-soft)] transition-transform duration-200" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-b-md border border-t-0 border-[var(--nb-rule-strong)] bg-[var(--nb-bg)] px-4 py-3.5">
          <p className="text-[15px] leading-relaxed text-[var(--nb-ink-soft)] m-0">{item.answer}</p>
          {item.resourceHref && item.resourceLabel && (
            <Link
              href={item.resourceHref}
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--nb-accent)] no-underline hover:underline"
            >
              {item.resourceLabel}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function itemsForCategory(category: PublicFaqCategory) {
  return publicFaqItems.filter((item) => item.category === category);
}

export function PublicFaqSection({ id = "faq", className = "" }: PublicFaqSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 md:py-24 px-6 md:px-8 border-t border-[var(--nb-rule)] ${className}`}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="nb-display text-[clamp(28px,3.2vw,40px)] font-normal tracking-tight m-0 mb-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={fadeUpRevealVariants}
        >
          Frequently asked questions
        </motion.h2>
        <motion.p
          className="nb-body text-center text-[var(--nb-ink-soft)] mb-14 m-0 mx-auto max-w-[560px]"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={fadeUpRevealVariants}
        >
          Plain-language answers from articles, worksheets, and deep dives — grouped by topic, with
          links to go deeper.
        </motion.p>

        <div className="flex flex-col gap-14">
          {publicFaqCategoryOrder.map((category) => {
            const meta = publicFaqCategoryMeta[category];
            const items = itemsForCategory(category);
            if (items.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={landingViewportReveal}
                variants={fadeUpRevealVariants}
              >
                <div className="mb-6">
                  <h3 className="nb-display text-[clamp(22px,2.4vw,28px)] font-normal tracking-tight m-0 mb-2">
                    {meta.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[var(--nb-ink-soft)] m-0">
                    {meta.description}
                  </p>
                </div>
                <motion.div
                  className="space-y-2.5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={landingViewportReveal}
                  variants={staggerRevealContainerVariants}
                >
                  {items.map((item) => (
                    <motion.div key={item.id} variants={staggerRevealItemVariants}>
                      <FaqEntry item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
