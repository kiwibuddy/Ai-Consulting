export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  url: string;
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
    url: "/worksheets/who-is-raising-our-kids.html",
    thumbnail: "/images/worksheets/who-is-raising-our-kids.png",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-ai-agreement",
    title: "The Family AI Agreement",
    description:
      "Co-create AI boundaries with your kids. Rules made together are rules they actually keep. Built to be filled in as a family.",
    url: "/worksheets/family-ai-agreement.html",
    thumbnail: "/images/worksheets/family-ai-agreement.png",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-attachment-audit",
    title: "The Attachment Audit",
    description:
      "Not all connection is the same. Map real vs. digital relationships and honestly assess what your kids call friendship.",
    url: "/worksheets/attachment-audit.html",
    thumbnail: "/images/worksheets/attachment-audit.png",
    date: "2026-03-17",
    category: "AI & Family",
    format: "Interactive",
  },
  {
    id: "family-rewiring-rhythms",
    title: "Rewiring Family Rhythms",
    description:
      "You become what you repeatedly do — not just what you believe. Four weeks, four habits, one family. This is how formation actually works.",
    url: "/worksheets/rewiring-family-rhythms.html",
    thumbnail: "/images/worksheets/rewiring-family-rhythms.png",
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
    url: "/worksheets/digital-liturgy-audit.html",
    thumbnail: "/images/worksheets/digital-liturgy-audit.png",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-think-without-assistance",
    title: "When Did I Last Think Without Assistance?",
    description:
      "Track one week of decisions, questions, and moments of uncertainty — and map how many you handed away before you had a chance to think or pray.",
    url: "/worksheets/think-without-assistance.html",
    thumbnail: "/images/worksheets/think-without-assistance.png",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-scrolling-to-sabbath",
    title: "From Scrolling to Sabbath",
    description:
      "A four-week reset guide. Not a fast, not a detox — a gradual reorientation, one week and one practice at a time.",
    url: "/worksheets/scrolling-to-sabbath.html",
    thumbnail: "/images/worksheets/scrolling-to-sabbath.png",
    date: "2026-03-17",
    category: "Christian Growth",
    format: "Interactive",
  },
  {
    id: "christian-healthy-ai-use",
    title: "What Would You Ask a Person?",
    description:
      "A healthy AI use guide for Christians — not warnings, but a practical framework for knowing when AI helps, when it limits, and when a real person is irreplaceable.",
    url: "/worksheets/healthy-ai-use.html",
    thumbnail: "/images/worksheets/healthy-ai-use.png",
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
    url: "/worksheets/verify-method.html",
    thumbnail: "/images/worksheets/verify-method.png",
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },
  {
    id: "edu-prompt-engineering",
    title: "The Prompt Engineering Workshop",
    description:
      "Most students think AI reduces the need to think. It's the opposite. Learn to think on paper before you type a single prompt.",
    url: "/worksheets/prompt-engineering.html",
    thumbnail: "/images/worksheets/prompt-engineering.png",
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },
  {
    id: "edu-what-is-school-for",
    title: "What Is School Actually For?",
    description:
      "If AI can retrieve information, write essays, and generate code — what does that leave for school to be? A student reflection for the age of AI.",
    url: "/worksheets/what-is-school-for.html",
    thumbnail: "/images/worksheets/what-is-school-for.png",
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
    date: "2026-03-24",
    category: "Working Professionals",
    format: "Interactive",
  },
];
