"use client";

import React, { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

const contentMax = "max-w-2xl";

const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.96, x: "-50%", y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    x: "-50%",
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.98, x: "-50%", y: 8, transition: { duration: 0.2 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

interface ArticleSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: SummaryBlock[];
}

export function ArticleSummaryModal({ open, onOpenChange, title, summary }: ArticleSummaryModalProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <AnimatePresence>
          {open && (
            <>
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-neutral-900/70"
                  variants={reducedMotion ? undefined : overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => onOpenChange(false)}
                  aria-hidden
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl focus:outline-none"
                  style={{
                    position: "fixed",
                    left: "50%",
                    top: "10%",
                    width: "80vw",
                    height: "80vh",
                    maxWidth: "80vw",
                    maxHeight: "80vh",
                    zIndex: 100,
                  }}
                  variants={reducedMotion ? undefined : contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(142,76%,42%)]/15 text-[hsl(142,76%,42%)]">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-neutral-900">Summary of Article</h2>
                          <p className="text-sm text-neutral-500">{title}</p>
                        </div>
                      </div>
                      <DialogPrimitive.Close className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]">
                        <span className="sr-only">Close</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </DialogPrimitive.Close>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 flex flex-col bg-[hsl(142,76%,42%)]/5">
                      <motion.div
                        className={`${contentMax} mx-auto min-w-0 space-y-5 break-words border-l-4 border-[hsl(142,76%,42%)]/40 pl-5`}
                        variants={reducedMotion ? undefined : containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {summary.map((block, i) => (
                          <motion.div
                            key={i}
                            variants={reducedMotion ? undefined : itemVariants}
                            className="summary-block"
                          >
                            {block.type === "heading" && (
                              <h3 className="text-base font-semibold text-[hsl(142,76%,42%)] border-b border-[hsl(142,76%,42%)]/20 pb-1.5 mb-2">
                                {block.text}
                              </h3>
                            )}
                            {block.type === "paragraph" && (
                              <p className="text-neutral-700 leading-relaxed text-[15px]">
                                {block.text}
                              </p>
                            )}
                            {block.type === "bullets" && block.items && (
                              <ul className="list-disc list-inside space-y-2 text-neutral-700 text-[15px] leading-relaxed pl-1">
                                {block.items.map((item, j) => (
                                  <li key={j}>{item}</li>
                                ))}
                              </ul>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
