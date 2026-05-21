"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  as?: ElementType;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  distance = 18,
  as: Tag = "div",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
        transition: shown
          ? `opacity 900ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`
          : undefined,
      }}
    >
      {children}
    </Component>
  );
}
