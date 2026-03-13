"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate as fmAnimate,
} from "framer-motion";

const COLOR_STAT = "hsl(142, 76%, 42%)";
const COLOR_QUOTE = "hsl(38, 80%, 50%)";
const COLOR_PUNCHLINE = "hsl(215, 40%, 50%)";

export type AnimatedArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "punchline"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "discussion"; questions: string[] }
  | { type: "subheading"; text: string };

/* ================================================================
   A — WORD REVEAL + COLOR FADE  (punchline sentences)
   Words slide up with stagger, text fades to slate blue.
   Same font size as body text.
   ================================================================ */
export function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <p className={className} style={{ color: COLOR_PUNCHLINE }}>
        {text}
      </p>
    );
  }

  const words = text.split(/\s+/);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ color: "#404040" }}
      animate={inView ? { color: COLOR_PUNCHLINE } : {}}
      transition={{ duration: 1.2, delay: words.length * 0.035 * 0.5, ease: "easeOut" }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[3px]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={
                inView
                  ? { y: "0%", opacity: 1 }
                  : { y: "100%", opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.035,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.p>
  );
}

/* ================================================================
   B — ANIMATED COUNTER  (statistics)
   Parses {{stat:NUMBER:suffix}} markers.
   The number + suffix are styled together in green.
   All numbers count up regardless of size.
   ================================================================ */
type StatSegment =
  | { type: "text"; value: string }
  | { type: "stat"; number: number; suffix: string };

function parseStatSegments(text: string): StatSegment[] {
  const regex = /\{\{stat:(\d+(?:\.\d+)?):([^}]*)\}\}/g;
  const segments: StatSegment[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "stat",
      number: parseFloat(match[1]),
      suffix: match[2],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}

function AnimatedCount({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const hasAnimated = useRef(false);

  const display = useTransform(motionVal, (v) => {
    if (value >= 1000) return Math.round(v).toLocaleString();
    if (!Number.isInteger(value)) return v.toFixed(1);
    return Math.round(v).toString();
  });

  useEffect(() => {
    if (inView && !reducedMotion && !hasAnimated.current) {
      hasAnimated.current = true;
      fmAnimate(motionVal, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, reducedMotion, value, motionVal]);

  if (reducedMotion) {
    const formatted =
      value >= 1000
        ? value.toLocaleString()
        : Number.isInteger(value)
          ? value.toString()
          : value.toFixed(1);
    return <span>{formatted}</span>;
  }

  return <motion.span ref={ref}>{display}</motion.span>;
}

function StatPhrase({ number, suffix }: { number: number; suffix: string }) {
  return (
    <span
      className="font-semibold tabular-nums"
      style={{ color: COLOR_STAT }}
    >
      <AnimatedCount value={number} />
      {suffix}
    </span>
  );
}

export function StatParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = parseStatSegments(text);

  return (
    <p className={className}>
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <React.Fragment key={i}>{seg.value}</React.Fragment>
        ) : (
          <StatPhrase key={i} number={seg.number} suffix={seg.suffix} />
        ),
      )}
    </p>
  );
}

/* ================================================================
   C — QUOTE COLOR FADE  (attributed quotes)
   Text fades from neutral to warm amber on scroll.
   Border uses amber. No larger font.
   ================================================================ */
export function HighlightQuote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <blockquote
      ref={ref}
      className="my-8 pl-6 relative overflow-hidden rounded-r-lg"
      style={{ borderLeft: `4px solid ${COLOR_QUOTE}60` }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-r-lg"
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          style={{ transformOrigin: "left", backgroundColor: `${COLOR_QUOTE}0F` }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.1,
          }}
        />
        <motion.p
          className="relative text-lg italic leading-relaxed py-3 pr-4 [text-wrap:balance]"
          initial={reducedMotion ? { color: COLOR_QUOTE } : { color: "#525252" }}
          animate={inView ? { color: COLOR_QUOTE } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          &ldquo;{text}&rdquo;
        </motion.p>
      </div>
      {attribution && (
        <motion.cite
          className="block text-sm text-neutral-500 mt-1 mb-3 not-italic font-medium"
          initial={reducedMotion ? {} : { opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          — {attribution}
        </motion.cite>
      )}
    </blockquote>
  );
}

/* ================================================================
   INLINE QUOTE DETECTION  (for quotes within paragraphs)
   Detects "quoted text" within paragraphs and applies amber fade.
   ================================================================ */
function InlineQuoteSpan({ text }: { text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      className="italic"
      initial={reducedMotion ? { color: COLOR_QUOTE } : { color: "#525252" }}
      animate={inView ? { color: COLOR_QUOTE } : {}}
      transition={{ duration: 1.0, ease: "easeOut" }}
    >
      &ldquo;{text}&rdquo;
    </motion.span>
  );
}

function parseInlineQuotes(text: string): React.ReactNode[] {
  const regex = /["\u201C]([^"\u201D]+)["\u201D]/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <React.Fragment key={key++}>
          {text.slice(lastIndex, match.index)}
        </React.Fragment>,
      );
    }
    parts.push(<InlineQuoteSpan key={key++} text={match[1]} />);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={key++}>{text.slice(lastIndex)}</React.Fragment>,
    );
  }

  return parts;
}

function hasInlineQuotes(text: string): boolean {
  return /["\u201C][^"\u201D]+["\u201D]/.test(text);
}

/* ================================================================
   D — STAGGER DISCUSSION  (discussion questions)
   ================================================================ */
export function StaggerDiscussion({
  questions,
}: {
  questions: string[];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="my-10 p-6 rounded-2xl bg-neutral-100 border border-neutral-200"
    >
      <motion.h4
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: COLOR_STAT }}
        initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        Discussion questions
      </motion.h4>
      <ul className="space-y-3">
        {questions.map((q, i) => (
          <motion.li
            key={i}
            className="text-neutral-700 leading-relaxed pl-4 border-l-2 border-neutral-300"
            initial={reducedMotion ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : 0.15 + i * 0.12,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {q}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================
   E — SHIMMER HEADING  (section headings)
   ================================================================ */
export function ShimmerHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (inView && !reducedMotion) {
      const t = setTimeout(() => setDone(true), 1600);
      return () => clearTimeout(t);
    }
  }, [inView, reducedMotion]);

  const shimmerActive = inView && !reducedMotion && !done;

  return (
    <h2
      ref={ref}
      className={`${className ?? ""} ${shimmerActive ? "shimmer-text-active" : ""}`}
    >
      {children}
    </h2>
  );
}

/* ================================================================
   SHARED BLOCK RENDERER
   ================================================================ */
const PARAGRAPH_CLS =
  "text-neutral-700 leading-relaxed text-lg mb-8 [text-wrap:balance]";

export function AnimatedBlockContent({
  block,
}: {
  block: AnimatedArticleBlock;
}) {
  switch (block.type) {
    case "paragraph":
      if (/\{\{stat:\d/.test(block.text)) {
        return <StatParagraph text={block.text} className={PARAGRAPH_CLS} />;
      }
      if (hasInlineQuotes(block.text)) {
        return (
          <p className={PARAGRAPH_CLS}>{parseInlineQuotes(block.text)}</p>
        );
      }
      return <p className={PARAGRAPH_CLS}>{block.text}</p>;

    case "punchline":
      return (
        <WordReveal
          text={block.text}
          className={`${PARAGRAPH_CLS} font-medium`}
        />
      );

    case "quote":
      return (
        <HighlightQuote
          text={block.text}
          attribution={(block as { attribution?: string }).attribution}
        />
      );

    case "discussion":
      return <StaggerDiscussion questions={block.questions} />;

    case "subheading":
      return (
        <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">
          {block.text}
        </h3>
      );

    default:
      return null;
  }
}
