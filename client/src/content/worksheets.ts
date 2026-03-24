export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  /** Public route users should open/share. */
  url: string;
  /** Under /public, loaded into an iframe by the shareable worksheet page. */
  iframeSrc?: string;
  /** Optional social card image for SEO/share previews. */
  shareImage?: string;
  thumbnail?: string;
  date: string;
  category?: string;
  format?: string;
}

export const worksheets: WorksheetItem[] = [
  // ── AI & Family ──────────────────────────────────────────────
  {
    id: "family-who-is-raising-our-kids",
    title: "Who's Raising Our Kids?",
    description:
      "Map the influences actually shaping your child right now — honestly, without shame — so you can make intentional choices about what stays and what changes.",
    url: "/resources/worksheet/family-who-is-raising-our-kids",
    iframeSrc: "/worksheets/who-is-raising-our-kids.html",
    shareImage: "/images/worksheets/ai-family-01.svg",
    thumbnail: "/images/worksheets/ai-family-01.svg",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-ai-agreement",
    title: "The Family AI Agreement",
    description:
      "Co-create AI boundaries with your kids. Rules made together are rules they actually keep. Built to be filled in as a family.",
    url: "/resources/worksheet/family-ai-agreement",
    iframeSrc: "/worksheets/family-ai-agreement.html",
    shareImage: "/images/worksheets/ai-family-02.svg",
    thumbnail: "/images/worksheets/ai-family-02.svg",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-attachment-audit",
    title: "The Attachment Audit",
    description:
      "Not all connection is the same. Map real vs. digital relationships and honestly assess what your kids call friendship.",
    url: "/resources/worksheet/family-attachment-audit",
    iframeSrc: "/worksheets/attachment-audit.html",
    shareImage: "/images/worksheets/ai-family-03.svg",
    thumbnail: "/images/worksheets/ai-family-03.svg",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-rewiring-rhythms",
    title: "Rewiring Family Rhythms",
    description:
      "You become what you repeatedly do — not just what you believe. Four weeks, four habits, one family. This is how formation actually works.",
    url: "/resources/worksheet/family-rewiring-rhythms",
    iframeSrc: "/worksheets/rewiring-family-rhythms.html",
    shareImage: "/images/worksheets/ai-family-04.svg",
    thumbnail: "/images/worksheets/ai-family-04.svg",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },

  // ── Christian Growth ─────────────────────────────────────────
  {
    id: "christian-digital-liturgy-audit",
    title: "Your Digital Liturgy Audit",
    description:
      "The internet is training your desires right now — whether you know it or not. This isn't about guilt; it's about clarity on what's shaping you.",
    url: "/resources/worksheet/christian-digital-liturgy-audit",
    iframeSrc: "/worksheets/digital-liturgy-audit.html",
    shareImage: "/images/worksheets/christian-growth-01.svg",
    thumbnail: "/images/worksheets/christian-growth-01.svg",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-think-without-assistance",
    title: "When Did I Last Think Without Assistance?",
    description:
      "Track one week of decisions, questions, and moments of uncertainty — and map how many you handed away before you had a chance to think or pray.",
    url: "/resources/worksheet/christian-think-without-assistance",
    iframeSrc: "/worksheets/think-without-assistance.html",
    shareImage: "/images/worksheets/christian-growth-02.svg",
    thumbnail: "/images/worksheets/christian-growth-02.svg",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-scrolling-to-sabbath",
    title: "From Scrolling to Sabbath",
    description:
      "A four-week reset guide. Not a fast, not a detox — a gradual reorientation, one week and one practice at a time.",
    url: "/resources/worksheet/christian-scrolling-to-sabbath",
    iframeSrc: "/worksheets/scrolling-to-sabbath.html",
    shareImage: "/images/worksheets/christian-growth-03.svg",
    thumbnail: "/images/worksheets/christian-growth-03.svg",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-healthy-ai-use",
    title: "What Would You Ask a Person?",
    description:
      "A healthy AI use guide for Christians — not warnings, but a practical framework for knowing when AI helps, when it limits, and when a real person is irreplaceable.",
    url: "/resources/worksheet/christian-healthy-ai-use",
    iframeSrc: "/worksheets/healthy-ai-use.html",
    shareImage: "/images/worksheets/christian-growth-04.svg",
    thumbnail: "/images/worksheets/christian-growth-04.svg",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },

  // ── Education ────────────────────────────────────────────────
  {
    id: "edu-verify-method",
    title: "The VERIFY Method",
    description:
      "AI can be brilliantly useful — and it can also make things up completely. Learn a six-step method for checking any AI claim before you use, share, or act on it.",
    url: "/resources/worksheet/edu-verify-method",
    iframeSrc: "/worksheets/verify-method.html",
    shareImage: "/images/worksheets/education-01.svg",
    thumbnail: "/images/worksheets/education-01.svg",
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },
  {
    id: "edu-prompt-engineering",
    title: "The Prompt Engineering Workshop",
    description:
      "Most students think AI reduces the need to think. It's the opposite. Learn to think on paper before you type a single prompt.",
    url: "/resources/worksheet/edu-prompt-engineering",
    iframeSrc: "/worksheets/prompt-engineering.html",
    shareImage: "/images/worksheets/education-02.svg",
    thumbnail: "/images/worksheets/education-02.svg",
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },
  {
    id: "edu-what-is-school-for",
    title: "What Is School Actually For?",
    description:
      "If AI can retrieve information, write essays, and generate code — what does that leave for school to be? A student reflection for the age of AI.",
    url: "/resources/worksheet/edu-what-is-school-for",
    iframeSrc: "/worksheets/what-is-school-for.html",
    shareImage: "/images/worksheets/education-03.svg",
    thumbnail: "/images/worksheets/education-03.svg",
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },

  // ── Working Professionals (Christian series) ─────────────────
  {
    id: "wp-christian-automation-augmentation",
    title: "Is My Job Automation or Augmentation?",
    description:
      "Map where your tasks sit on the automation vs augmentation spectrum, with research-backed stats and a 90-day plan — for people who follow Jesus.",
    url: "/resources/christian-professional/automation-or-augmentation-christian",
    iframeSrc: "/worksheets/christian-professional/wp-01-automation-augmentation.html",
    shareImage: "/images/worksheets/wp-christian-01.svg",
    thumbnail: "/images/worksheets/wp-christian-01.svg",
    date: "2026-03-24",
    category: "Working Professionals",
    format: "Interactive",
  },
  {
    id: "wp-christian-52-minute",
    title: "The 52-Minute Opportunity",
    description:
      "AI may return roughly an hour a day. Plan what you’ll do with that time before someone else claims it.",
    url: "/resources/christian-professional/52-minute-opportunity-christian",
    iframeSrc: "/worksheets/christian-professional/wp-02-52-minute-opportunity.html",
    shareImage: "/images/worksheets/wp-christian-02.svg",
    thumbnail: "/images/worksheets/wp-christian-02.svg",
    date: "2026-03-24",
    category: "Working Professionals",
    format: "Interactive",
  },
  {
    id: "wp-christian-pay-me-for",
    title: "What Will They Still Pay Me For?",
    description:
      "Separate your job description from what you’re actually valued for — and what AI can’t replace.",
    url: "/resources/christian-professional/what-will-they-still-pay-me-for-christian",
    iframeSrc: "/worksheets/christian-professional/wp-03-what-will-they-still-pay-me-for.html",
    shareImage: "/images/worksheets/wp-christian-03.svg",
    thumbnail: "/images/worksheets/wp-christian-03.svg",
    date: "2026-03-24",
    category: "Working Professionals",
    format: "Interactive",
  },
  {
    id: "wp-christian-five-year-map",
    title: "The Five-Year Positioning Map",
    description:
      "Scenario planning for your career: moves that pay off whether change is slow, sharp, or radical.",
    url: "/resources/christian-professional/five-year-positioning-map-christian",
    iframeSrc: "/worksheets/christian-professional/wp-04-five-year-positioning-map.html",
    shareImage: "/images/worksheets/wp-christian-04.svg",
    thumbnail: "/images/worksheets/wp-christian-04.svg",
    date: "2026-03-24",
    category: "Working Professionals",
    format: "Interactive",
  },
];

export function getWorksheetById(id: string | undefined): WorksheetItem | undefined {
  if (!id) return undefined;
  return worksheets.find((worksheet) => worksheet.id === id);
}
