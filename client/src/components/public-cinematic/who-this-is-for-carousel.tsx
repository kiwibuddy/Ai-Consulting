"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { audienceSlideVariants } from "@/lib/animations";
import { CinematicSecondaryCTA } from "@/components/public-cinematic/cinematic-cta";
import { cn } from "@/lib/utils";

export type WhoAudience = {
  tag: string;
  title: string;
  body: string;
  body2: string;
  image: string;
  alt: string;
};

const AUTO_ROTATE_MS = 8000;
const SWIPE_THRESHOLD = 80;

function AudienceSlide({ audience, index }: { audience: WhoAudience; index: number }) {
  return (
    <div
      className="nb-audience-row grid items-center gap-10"
      style={{
        gridTemplateColumns: index % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
      }}
    >
      <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
        <div className="nb-mono-label text-[var(--nb-accent)] mb-4">
          0{index + 1} · {audience.tag}
        </div>
        <h3 className="nb-display text-[clamp(28px,3.6vw,48px)] font-normal tracking-tight m-0 mb-6 leading-tight">
          {audience.title}
        </h3>
        <p className="text-[16.5px] leading-relaxed text-[var(--nb-ink-soft)] mb-3.5 m-0">
          {audience.body}
        </p>
        <p className="text-[16.5px] leading-relaxed text-[var(--nb-ink-soft)] m-0">{audience.body2}</p>
        <div className="mt-8">
          <CinematicSecondaryCTA href="/intake">Talk about this →</CinematicSecondaryCTA>
        </div>
      </div>
      <div
        className="relative aspect-[4/3] overflow-hidden border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)]"
        style={{ order: index % 2 === 0 ? 2 : 1 }}
      >
        <img
          src={audience.image}
          alt={audience.alt}
          className="w-full h-full object-cover saturate-[0.85] contrast-[1.05] brightness-[0.92]"
          draggable={false}
        />
        <div
          className="absolute left-4 bottom-4 px-3.5 py-2 nb-mono-label backdrop-blur-md border border-[var(--nb-rule-strong)]"
          style={{ background: "rgba(15,16,20,0.78)", fontSize: 10 }}
        >
          Fig. 0{index + 1}
        </div>
      </div>
    </div>
  );
}

interface WhoThisIsForCarouselProps {
  audiences: WhoAudience[];
}

export function WhoThisIsForCarousel({ audiences }: WhoThisIsForCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPaused, setAutoPaused] = useState(false);
  const [stageMinHeight, setStageMinHeight] = useState(480);
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pauseAutoRotate = useCallback(() => {
    setAutoPaused(true);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % audiences.length);
  }, [audiences.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + audiences.length) % audiences.length);
  }, [audiences.length]);

  useEffect(() => {
    if (reducedMotion || autoPaused) return;
    const id = window.setInterval(goNext, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, autoPaused, goNext, index]);

  useLayoutEffect(() => {
    const measure = () => {
      let max = 0;
      for (const el of measureRefs.current) {
        if (el) max = Math.max(max, el.offsetHeight);
      }
      if (max > 0) setStageMinHeight(max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [audiences]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) return;
    pauseAutoRotate();
    if (info.offset.x < 0) goNext();
    else goPrev();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pauseAutoRotate();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pauseAutoRotate();
      goPrev();
    }
  };

  const slideVariants = reducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : audienceSlideVariants;

  const active = audiences[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Who this is for"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--nb-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--nb-bg-raised)] rounded-sm"
    >
      <nav
        className="flex flex-wrap gap-2 mb-8"
        aria-label="Choose audience"
      >
        {audiences.map((a, i) => (
          <button
            key={a.tag}
            type="button"
            onClick={() => {
              pauseAutoRotate();
              goTo(i);
            }}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "nb-mono-label px-3 py-2 border transition-colors cursor-pointer",
              i === index
                ? "border-[var(--nb-accent)] text-[var(--nb-accent)] bg-[var(--nb-bg-panel)]"
                : "border-[var(--nb-rule)] text-[var(--nb-ink-soft)] hover:border-[var(--nb-rule-strong)] bg-transparent"
            )}
            style={{ fontSize: 10 }}
          >
            0{i + 1}
            <span className="hidden sm:inline"> · {a.tag}</span>
          </button>
        ))}
      </nav>

      {/* Off-screen measurement so stage height stays stable across slides */}
      <div
        aria-hidden
        className="pointer-events-none invisible absolute left-0 right-0 top-0 -z-10 w-full"
      >
        {audiences.map((a, i) => (
          <div
            key={a.tag}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
          >
            <AudienceSlide audience={a} index={i} />
          </div>
        ))}
      </div>

      <div
        ref={stageRef}
        className="relative overflow-hidden"
        style={{ minHeight: stageMinHeight }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.tag}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={pauseAutoRotate}
            onDragEnd={handleDragEnd}
            className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
            aria-live="polite"
          >
            <AudienceSlide audience={active} index={index} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
