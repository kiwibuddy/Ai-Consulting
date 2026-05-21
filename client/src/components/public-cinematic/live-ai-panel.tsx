"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { publicFaqDialogue, publicFaqHeroDialogue } from "@/content/public-faq";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type DialogueItem = (typeof publicFaqDialogue)[number];

function useTyper(text: string, speed: number, active: boolean) {
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return out;
}

function Caret() {
  return (
    <span
      aria-hidden
      className="inline-block w-[0.45ch] h-[1em] ml-0.5 align-[-3px] bg-current"
      style={{ animation: "nb-blink 1s steps(2) infinite" }}
    />
  );
}

function ResourceLink({
  href,
  label,
  visible,
  inline = false,
}: {
  href: string;
  label: string;
  visible: boolean;
  inline?: boolean;
}) {
  if (!visible) return null;

  return (
    <Link
      href={href}
      className={cn(
        "font-[family-name:var(--nb-font-mono)] font-medium text-[var(--nb-accent)] no-underline hover:underline transition-colors",
        inline
          ? "inline align-baseline whitespace-normal"
          : "inline-flex items-center gap-1 mt-2.5 text-[12px]"
      )}
      style={{ fontSize: inline ? 10.5 : 10.5, letterSpacing: "0.04em" }}
    >
      {inline ? (
        <>
          <span className="text-[var(--nb-ink-dim)] not-italic font-normal" aria-hidden>
            {" · "}
          </span>
          <span className="not-italic">{label}</span>
          <span aria-hidden> →</span>
        </>
      ) : (
        <>
          {label}
          <span aria-hidden>→</span>
        </>
      )}
    </Link>
  );
}

function AnswerBlock({
  text,
  item,
  showCaret,
  showResourceLink,
  dock,
}: {
  text: string;
  item: DialogueItem;
  showCaret: boolean;
  showResourceLink: boolean;
  dock?: boolean;
}) {
  const hasLink = Boolean(item.resourceHref && item.resourceLabel);

  const linkInline = dock && hasLink;

  return (
    <div className="min-w-0 flex-1">
      <div
        className={cn(
          "nb-hero-panel-answer font-[family-name:var(--nb-font-display)] italic leading-snug text-[var(--nb-ink)]",
          dock ? "text-[clamp(17px,2vw,20px)]" : "text-[19px]"
        )}
        style={{ letterSpacing: "-0.01em" }}
      >
        {text}
        {showCaret && <Caret />}
        {linkInline && (
          <ResourceLink
            href={item.resourceHref!}
            label={item.resourceLabel!}
            visible={showResourceLink}
            inline
          />
        )}
      </div>
      {hasLink && !linkInline && (
        <ResourceLink
          href={item.resourceHref!}
          label={item.resourceLabel!}
          visible={showResourceLink}
        />
      )}
    </div>
  );
}

interface LiveAIPanelProps {
  /** Card in sidebar; dock = full-width band below hero */
  variant?: "card" | "dock";
  compact?: boolean;
  collapsed?: boolean;
  /** Dock uses section label on the page instead */
  hideLabel?: boolean;
  label?: string;
}

export function LiveAIPanel({
  variant = "card",
  compact,
  collapsed: collapsedProp,
  hideLabel = false,
  label = "Live · A typical conversation",
}: LiveAIPanelProps) {
  const isMobile = useIsMobile();
  const dock = variant === "dock";
  const collapsed = collapsedProp ?? (dock ? false : isMobile);

  const dialogue = dock ? publicFaqHeroDialogue : publicFaqDialogue;

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"q" | "a" | "hold">("q");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dockHeights, setDockHeights] = useState({ q: 40, answer: 96 });
  const [cardHeights, setCardHeights] = useState({ q: 44, answer: 168 });

  const panelRef = useRef<HTMLDivElement>(null);
  const qMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dockQMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dockAMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const measureSet = collapsed ? dialogue.slice(0, 1) : dialogue;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (dock) {
        let maxQ = 0;
        let maxAnswer = 0;
        for (const el of dockQMeasureRefs.current) {
          if (el) maxQ = Math.max(maxQ, el.offsetHeight);
        }
        for (const el of dockAMeasureRefs.current) {
          if (el) maxAnswer = Math.max(maxAnswer, el.offsetHeight);
        }
        if (maxQ > 0 || maxAnswer > 0) {
          setDockHeights((prev) => ({
            q: maxQ > 0 ? maxQ : prev.q,
            answer: maxAnswer > 0 ? maxAnswer : prev.answer,
          }));
        }
        return;
      }

      let maxQ = 0;
      let maxAnswer = 0;
      for (const el of qMeasureRefs.current) {
        if (el) maxQ = Math.max(maxQ, el.offsetHeight);
      }
      for (const el of answerMeasureRefs.current) {
        if (el) maxAnswer = Math.max(maxAnswer, el.offsetHeight);
      }
      if (maxQ > 0 || maxAnswer > 0) {
        setCardHeights((prev) => ({
          q: maxQ > 0 ? maxQ : prev.q,
          answer: maxAnswer > 0 ? maxAnswer : prev.answer,
        }));
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [collapsed, compact, dock]);

  const cur = collapsed ? dialogue[0] : dialogue[idx];
  const animate = !collapsed && !reducedMotion;

  useEffect(() => {
    if (!animate) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "q") {
      t = setTimeout(() => setPhase("a"), cur.q.length * 26 + 600);
    } else if (phase === "a") {
      t = setTimeout(() => setPhase("hold"), cur.a.length * 20 + 1800);
    } else {
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % dialogue.length);
        setPhase("q");
      }, 700);
    }
    return () => clearTimeout(t);
  }, [idx, phase, cur, animate, dialogue.length]);

  const qTyped = useTyper(cur.q, 26, animate);
  const aTyped = useTyper(cur.a, 20, animate && (phase === "a" || phase === "hold"));
  const qText = collapsed || reducedMotion ? cur.q : qTyped;
  const aText = collapsed || reducedMotion ? cur.a : aTyped;

  const showQCaret = animate && phase === "q" && qText.length < cur.q.length;
  const showACaret = animate && (phase === "a" || phase === "hold") && aText.length < cur.a.length;
  const showResourceLink =
    Boolean(cur.resourceHref && cur.resourceLabel) &&
    (collapsed ||
      reducedMotion ||
      phase === "hold" ||
      (phase === "a" && aText.length >= cur.a.length));

  const padding = dock
    ? undefined
    : collapsed
      ? "16px 18px 18px"
      : compact
        ? "20px 22px 22px"
        : "24px 26px 28px";

  const qMinHeight = dock ? dockHeights.q : cardHeights.q;
  const answerMinHeight = dock ? dockHeights.answer : cardHeights.answer;

  const measureLayer = (
    <div
      aria-hidden
      className="pointer-events-none invisible absolute left-0 right-0 top-0 -z-10 w-full"
      style={padding ? { padding } : undefined}
    >
      {measureSet.map((item, i) =>
        dock ? (
          <div key={item.q} className="nb-hero-live-stack mb-4 w-full">
            <div className="flex gap-3 items-start min-w-0 w-full">
              <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-1.5 shrink-0 opacity-0">
                Q.
              </span>
              <div
                ref={(el) => {
                  dockQMeasureRefs.current[i] = el;
                }}
                className="font-[family-name:var(--nb-font-mono)] text-sm leading-snug flex-1 min-w-0"
              >
                {item.q}
              </div>
            </div>
            <div className="flex gap-3 items-start min-w-0 w-full mt-3">
              <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-2 shrink-0 opacity-0">
                A.
              </span>
              <div
                ref={(el) => {
                  dockAMeasureRefs.current[i] = el;
                }}
                className="min-w-0 flex-1"
              >
                <AnswerBlock
                  text={item.a}
                  item={item}
                  showCaret={false}
                  showResourceLink={Boolean(item.resourceHref && item.resourceLabel)}
                  dock
                />
              </div>
            </div>
          </div>
        ) : (
          <div key={item.q} className="mb-4">
            <div className="flex gap-3 items-start">
              <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-1.5 shrink-0 opacity-0">
                Q.
              </span>
              <div
                ref={(el) => {
                  qMeasureRefs.current[i] = el;
                }}
                className="font-[family-name:var(--nb-font-mono)] text-sm leading-snug flex-1 min-w-0"
              >
                {item.q}
              </div>
            </div>
            <div className="flex gap-3 items-start mt-3.5">
              <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-2 shrink-0 opacity-0">
                A.
              </span>
              <div
                ref={(el) => {
                  answerMeasureRefs.current[i] = el;
                }}
                className="min-w-0 flex-1"
              >
                <AnswerBlock
                  text={item.a}
                  item={item}
                  showCaret={false}
                  showResourceLink={Boolean(item.resourceHref && item.resourceLabel)}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

  const allQuestionsLink = (
    <Link
      href="/resources#faq"
      className={cn(
        "nb-mono-label font-medium text-[var(--nb-accent)] no-underline hover:underline transition-colors shrink-0 whitespace-nowrap",
        !dock && collapsed && "ml-auto"
      )}
      style={{ fontSize: 10.5, letterSpacing: "0.04em" }}
    >
      All questions →
    </Link>
  );

  const footer = (
    <div className="flex items-center justify-between gap-3 flex-wrap mt-4">
      {!collapsed && (
        <div className="flex gap-1.5">
          {dialogue.map((_, i) => (
            <span
              key={i}
              className="h-0.5 transition-all duration-280"
              style={{
                width: i === idx ? 22 : 6,
                background: i === idx ? "var(--nb-accent)" : "var(--nb-rule-strong)",
              }}
            />
          ))}
        </div>
      )}
      {allQuestionsLink}
    </div>
  );

  const liveLabel = (
    <div
      className={cn(
        "flex items-center gap-2 nb-mono-label",
        dock ? "mb-5" : "absolute -top-2.5 left-[18px] px-2.5 py-0.5"
      )}
      style={{
        background: dock ? undefined : "var(--nb-bg-raised)",
        fontSize: 10,
      }}
    >
      <span
        className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
        style={{
          background: "var(--nb-accent)",
          boxShadow: "0 0 0 3px color-mix(in srgb, var(--nb-accent) 22%, transparent)",
        }}
      />
      {label}
    </div>
  );

  if (dock) {
    return (
      <div
        ref={panelRef}
        className="nb-hero-live-dock relative w-full flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
      >
        {measureLayer}
        {!hideLabel && liveLabel}
        <div className="nb-hero-live-stack flex-1 min-w-0 w-full space-y-2.5 sm:space-y-3">
          <div className="flex gap-3 items-start w-full min-w-0">
            <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-1.5 text-[var(--nb-accent)] tracking-wider shrink-0">
              Q.
            </span>
            <div
              className="font-[family-name:var(--nb-font-mono)] text-sm leading-snug text-[var(--nb-ink-soft)] flex-1 min-w-0 w-full"
              style={{ minHeight: qMinHeight }}
            >
              {qText}
              {showQCaret && <Caret />}
            </div>
          </div>
          <div className="flex gap-3 items-start w-full min-w-0">
            <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-2 text-[var(--nb-ink)] tracking-wider shrink-0">
              A.
            </span>
            <div className="min-w-0 flex-1 w-full" style={{ minHeight: answerMinHeight }}>
              <AnswerBlock
                text={aText}
                item={cur}
                showCaret={showACaret}
                showResourceLink={showResourceLink}
                dock
              />
            </div>
          </div>
        </div>
        <div className="shrink-0 self-end sm:self-start sm:pt-1">{allQuestionsLink}</div>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className="nb-hero-panel relative rounded-md border border-[var(--nb-rule-strong)] backdrop-blur-md"
      style={{
        background: "var(--nb-bg-panel)",
        padding,
      }}
    >
      {measureLayer}
      {liveLabel}

      <div className="flex gap-3 items-start mt-1">
        <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-1.5 text-[var(--nb-accent)] tracking-wider shrink-0">
          Q.
        </span>
        <div
          className="font-[family-name:var(--nb-font-mono)] text-sm leading-snug text-[var(--nb-ink-soft)] flex-1 min-w-0"
          style={{ minHeight: qMinHeight }}
        >
          {qText}
          {showQCaret && <Caret />}
        </div>
      </div>

      <div className="flex gap-3 items-start mt-3.5">
        <span className="font-[family-name:var(--nb-font-mono)] text-[11px] mt-2 text-[var(--nb-ink)] tracking-wider shrink-0">
          A.
        </span>
        <div style={{ minHeight: answerMinHeight }} className="min-w-0 flex-1">
          <AnswerBlock
            text={aText}
            item={cur}
            showCaret={showACaret}
            showResourceLink={showResourceLink}
          />
        </div>
      </div>

      {footer}
    </div>
  );
}
