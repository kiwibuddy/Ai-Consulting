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
    date: "2026-03-17",
    category: "Education",
    format: "Interactive",
  },
];
