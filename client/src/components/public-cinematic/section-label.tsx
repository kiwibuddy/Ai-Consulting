"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "./scroll-reveal";

interface SectionLabelProps {
  num: string;
  children: ReactNode;
}

export function SectionLabel({ num, children }: SectionLabelProps) {
  return (
    <ScrollReveal>
      <div className="nb-section-label">
        <span className="nb-num">—</span>
        <span className="nb-num">{num}</span>
        <span>{children}</span>
      </div>
    </ScrollReveal>
  );
}
