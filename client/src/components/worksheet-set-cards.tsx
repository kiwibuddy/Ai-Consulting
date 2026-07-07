import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import type { WorksheetItem } from "@/content/worksheets";
import { RESOURCE_SETS } from "@shared/content/resource-sets";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  cinematicEase,
  landingViewportReveal,
} from "@/lib/animations";

interface WorksheetSetCardsProps {
  worksheetsById: Map<string, WorksheetItem>;
}

export function WorksheetSetCards({ worksheetsById }: WorksheetSetCardsProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewportReveal}
      variants={cardSlideUpContainerVariants}
    >
      {RESOURCE_SETS.map((setDef) => {
        const preview = worksheetsById.get(setDef.previewWorksheetId);
        if (!preview) return null;
        const thumbSrc = preview.thumbnail ?? preview.shareImage;
        const count = setDef.worksheetIds.length;

        return (
          <motion.div
            key={setDef.id}
            variants={cardSlideUpItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: cinematicEase } }}
            className="flex flex-col rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
          >
            <Link
              href={preview.url}
              className="flex flex-col flex-1 no-underline text-inherit cursor-pointer"
            >
              {thumbSrc ? (
                <img src={thumbSrc} alt="" className="aspect-video w-full object-cover shrink-0" />
              ) : (
                <div className="aspect-video bg-[var(--nb-bg-panel)] flex items-center justify-center shrink-0">
                  <FileText className="h-12 w-12 text-[var(--nb-ink-dim)]" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs font-medium text-[var(--nb-accent)] uppercase tracking-wider mb-1">
                  {count} worksheets
                </span>
                <h3 className="nb-card-title mb-2">{setDef.label}</h3>
                <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed flex-1 mb-4">
                  {setDef.summary}
                </p>
                <span className="text-sm font-medium text-[var(--nb-accent)] inline-flex items-center gap-1">
                  Start with worksheet 1
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
