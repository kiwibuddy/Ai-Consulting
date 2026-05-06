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
  /**
   * How the iframe should be sized.
   * - `auto` (default): grow the iframe to match the inner document's scroll height.
   * - `fit-viewport`: render at a fixed clamped viewport height. Use for
   *   interactive content that styles its root with `min-height: 100vh`,
   *   which would otherwise feedback-loop the auto-resize logic.
   */
  displayMode?: "auto" | "fit-viewport";
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
  {
    id: "deepfakes-digital-truth-2026",
    title: "Deepfakes & Digital Truth",
    description:
      "Spot AI-generated images, video, voice, text, fake profiles, and emergency scams — a practical reference for families, churches, and leaders.",
    url: "/resources/christian-professional/deepfakes-digital-truth-2026",
    iframeSrc: "/worksheets/deepfakes-digital-truth-2026.html",
    shareImage: "/images/worksheets/deepfakes-digital-truth.svg",
    thumbnail: "/images/worksheets/deepfakes-digital-truth.svg",
    date: "2026-03-25",
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

  // ── Presentations ───────────────────────────────────────────
  {
    id: "presentations-ai-threats-explained",
    title: "AI: What's Actually Going On — And What to Do About It",
    description:
      "A plain-English briefing on where AI is actually headed, the risks that matter for families and churches, and the few practical moves worth making this week.",
    url: "/resources/worksheet/presentations-ai-threats-explained",
    iframeSrc: "/worksheets/presentations/ai-threats-explained.html",
    shareImage: "/images/worksheets/presentations-ai-threats.svg",
    thumbnail: "/images/worksheets/presentations-ai-threats.svg",
    date: "2026-05-04",
    category: "Presentations",
    format: "Presentation",
    displayMode: "fit-viewport",
  },
  {
    id: "presentations-life-calling-discovery",
    title: "Life Calling Discovery",
    description:
      "Work through a guided reflection on identity, gifts, and direction — designed to help you name a clear next step in your life calling without rushing to certainty.",
    url: "/resources/worksheet/presentations-life-calling-discovery",
    iframeSrc: "/worksheets/presentations/life-calling-discovery.html",
    shareImage: "/images/worksheets/presentations-life-calling.svg",
    thumbnail: "/images/worksheets/presentations-life-calling.svg",
    date: "2026-04-02",
    category: "Presentations",
    format: "Reflection",
    displayMode: "fit-viewport",
  },
  {
    id: "presentations-lords-prayer-through-spheres",
    title: "The Lord's Prayer Through the Spheres",
    description:
      "A meditative walk through the Lord's Prayer across the spheres of life — a quiet companion for personal devotion or small-group reflection on prayer and abiding.",
    url: "/resources/worksheet/presentations-lords-prayer-through-spheres",
    iframeSrc: "/worksheets/presentations/the-lords-prayer.html",
    shareImage: "/images/worksheets/presentations-lords-prayer.svg",
    thumbnail: "/images/worksheets/presentations-lords-prayer.svg",
    date: "2026-03-30",
    category: "Presentations",
    format: "Reflection",
    displayMode: "fit-viewport",
  },
  {
    id: "presentations-research-to-presentation",
    title: "From Research to a Finished Presentation",
    description:
      "A repeatable workflow for turning raw research into a polished, defensible presentation using NotebookLM and Claude — built for teachers, leaders, and speakers.",
    url: "/resources/worksheet/presentations-research-to-presentation",
    iframeSrc: "/worksheets/presentations/research-to-presentation.html",
    shareImage: "/images/worksheets/presentations-research-to-presentation.svg",
    thumbnail: "/images/worksheets/presentations-research-to-presentation.svg",
    date: "2026-04-24",
    category: "Presentations",
    format: "Workflow",
    displayMode: "fit-viewport",
  },
  {
    id: "presentations-workflow-claude-to-live-site",
    title: "From Claude Chat to a Live Site (Claude Code Workflow)",
    description:
      "A step-by-step walkthrough for taking a Claude-generated HTML file all the way to a live website using Claude Code — for non-developers who want to actually ship.",
    url: "/resources/worksheet/presentations-workflow-claude-to-live-site",
    iframeSrc: "/worksheets/presentations/workflow-claude-html-to-live-site.html",
    shareImage: "/images/worksheets/presentations-workflow-claude.svg",
    thumbnail: "/images/worksheets/presentations-workflow-claude.svg",
    date: "2026-04-23",
    category: "Presentations",
    format: "Workflow",
  },
  {
    id: "presentations-workflow-cursor-to-live-site",
    title: "From a Claude HTML File to a Live Site (Cursor Workflow)",
    description:
      "Take an HTML file generated by Claude and ship it as a live site using Cursor — a practical workflow for pastors, teachers, and consultants new to coding tools.",
    url: "/resources/worksheet/presentations-workflow-cursor-to-live-site",
    iframeSrc: "/worksheets/presentations/workflow-cursor-html-to-live-site.html",
    shareImage: "/images/worksheets/presentations-workflow-cursor.svg",
    thumbnail: "/images/worksheets/presentations-workflow-cursor.svg",
    date: "2026-04-22",
    category: "Presentations",
    format: "Workflow",
  },
  {
    id: "presentations-ai-prep-onboarding",
    title: "30-Day AI Resilience Onboarding",
    description:
      "A simple 30-day plan to make your household more resilient to AI-driven scams, deepfakes, and over-reliance — done in small, no-regret steps anyone can follow.",
    url: "/resources/worksheet/presentations-ai-prep-onboarding",
    iframeSrc: "/worksheets/presentations/ai-preparation-tools/onboarding-plan.html",
    shareImage: "/images/worksheets/presentations-prep-onboarding.svg",
    thumbnail: "/images/worksheets/presentations-prep-onboarding.svg",
    date: "2026-05-03",
    category: "Presentations",
    format: "Printable",
  },
  {
    id: "presentations-ai-prep-readiness-checklist",
    title: "Household AI Readiness Checklist",
    description:
      "A printable annual checklist your household can run through to stay ahead of AI scams, deepfakes, and digital risk — with sign-off and an ongoing rhythm.",
    url: "/resources/worksheet/presentations-ai-prep-readiness-checklist",
    iframeSrc: "/worksheets/presentations/ai-preparation-tools/readiness-checklist.html",
    shareImage: "/images/worksheets/presentations-prep-readiness.svg",
    thumbnail: "/images/worksheets/presentations-prep-readiness.svg",
    date: "2026-05-03",
    category: "Presentations",
    format: "Printable",
  },
  {
    id: "presentations-ai-prep-safe-phrase-protocol",
    title: "The Safe Phrase Protocol",
    description:
      "Set up a family safe phrase to defeat AI voice-cloning and emergency scams — a one-page protocol you can print, agree on, and use the next time something feels off.",
    url: "/resources/worksheet/presentations-ai-prep-safe-phrase-protocol",
    iframeSrc: "/worksheets/presentations/ai-preparation-tools/safe-phrase-protocol.html",
    shareImage: "/images/worksheets/presentations-prep-safe-phrase.svg",
    thumbnail: "/images/worksheets/presentations-prep-safe-phrase.svg",
    date: "2026-05-03",
    category: "Presentations",
    format: "Printable",
  },
  {
    id: "presentations-ai-prep-analog-asset-log",
    title: "The Analog Asset Log",
    description:
      "Keep an offline record of the documents, references, and overrides your family will need when digital systems fail — a practical analog backup for an AI-shaped world.",
    url: "/resources/worksheet/presentations-ai-prep-analog-asset-log",
    iframeSrc: "/worksheets/presentations/ai-preparation-tools/analog-asset-log.html",
    shareImage: "/images/worksheets/presentations-prep-analog-asset.svg",
    thumbnail: "/images/worksheets/presentations-prep-analog-asset.svg",
    date: "2026-05-03",
    category: "Presentations",
    format: "Printable",
  },

  // ── Tauranga SME ─────────────────────────────────────────────
  // Free worksheets — lead magnets for the paid product line at /tauranga-sme.
  {
    id: "tauranga-sme-readiness",
    title: "Is Your Business Ready for AI? A Tauranga SME Self-Assessment",
    description:
      "A scored self-assessment for Bay of Plenty owner-operators. Map your current tools, time drains, barriers, and willingness to invest — then walk into your Priority One conversation knowing exactly where you stand.",
    url: "/resources/worksheet/tauranga-sme-readiness",
    iframeSrc: "/worksheets/tauranga-sme/readiness.html",
    date: "2026-05-05",
    category: "Tauranga SME",
    format: "Interactive",
  },
  {
    id: "tauranga-sme-time-audit",
    title: "Where Does AI Actually Save You Time? A 30-Minute Audit",
    description:
      "A practical task-mapping audit for Tauranga SMEs. Find exactly which of your weekly tasks AI can genuinely handle — and which ones it can't — then pick three to pilot in the next 30 days.",
    url: "/resources/worksheet/tauranga-sme-time-audit",
    iframeSrc: "/worksheets/tauranga-sme/time-audit.html",
    date: "2026-05-05",
    category: "Tauranga SME",
    format: "Interactive",
  },
  {
    id: "tauranga-sme-team",
    title: "AI and Your Team — A Conversation Guide for BoP Employers",
    description:
      "A scripted conversation guide for an employer to run with their team on AI: role impacts, upskilling commitments, redeployment, and what stays human. Done honestly, without panic or denial.",
    url: "/resources/worksheet/tauranga-sme-team",
    iframeSrc: "/worksheets/tauranga-sme/team.html",
    date: "2026-05-05",
    category: "Tauranga SME",
    format: "Interactive",
  },
  {
    id: "tauranga-sme-legal",
    title: "Staying Legal While Using AI — NZ Privacy & Copyright for BoP Businesses",
    description:
      "A plain-language guide to NZ's Privacy Act 2020 and Copyright Act obligations as they apply to AI tool use — data inputs, customer information, and output ownership. Know your obligations before you add the next tool.",
    url: "/resources/worksheet/tauranga-sme-legal",
    iframeSrc: "/worksheets/tauranga-sme/legal.html",
    date: "2026-05-05",
    category: "Tauranga SME",
    format: "Interactive",
  },

  // Premium 4-part presentation (paid via /tauranga-sme; URLs are public so
  // buyers can deep-link from the Stripe receipt email and previews can drive
  // sales — gated assets like videos and templates live elsewhere).
  {
    id: "tauranga-sme-presentation-readiness",
    title: "Session 1: Ready or Not? An Honest Tauranga AI Readiness Check",
    description:
      "The full 22-slide deck companion to the Readiness worksheet — local context (Port of Tauranga, PlantTech, Toi Kai Rawa), the SME gap, and the Priority One pathway. Every stat opens its source.",
    url: "/resources/worksheet/tauranga-sme-presentation-readiness",
    iframeSrc: "/worksheets/tauranga-sme/presentation/01-readiness/index.html",
    date: "2026-05-06",
    category: "Tauranga SME",
    format: "Presentation",
    displayMode: "fit-viewport",
  },
  {
    id: "tauranga-sme-presentation-time-audit",
    title: "Session 2: Where Does AI Actually Save You Time? (Preview)",
    description:
      "Preview frame for the Time Audit deck — hero plus the first five slides. Full release coming soon. Buyers of any tier are notified the moment it ships.",
    url: "/resources/worksheet/tauranga-sme-presentation-time-audit",
    iframeSrc: "/worksheets/tauranga-sme/presentation/02-time-audit/index.html",
    date: "2026-05-06",
    category: "Tauranga SME",
    format: "Presentation",
    displayMode: "fit-viewport",
  },
  {
    id: "tauranga-sme-presentation-team",
    title: "Session 3: AI and Your Team — The Conversation You Have to Have (Preview)",
    description:
      "Preview frame for the Team deck — hero plus the first five slides. Full release coming soon.",
    url: "/resources/worksheet/tauranga-sme-presentation-team",
    iframeSrc: "/worksheets/tauranga-sme/presentation/03-team/index.html",
    date: "2026-05-06",
    category: "Tauranga SME",
    format: "Presentation",
    displayMode: "fit-viewport",
  },
  {
    id: "tauranga-sme-presentation-legal",
    title: "Session 4: Staying Legal While Using AI — NZ Privacy & Copyright (Preview)",
    description:
      "Preview frame for the Legal deck — hero plus the first five slides. Full release coming soon.",
    url: "/resources/worksheet/tauranga-sme-presentation-legal",
    iframeSrc: "/worksheets/tauranga-sme/presentation/04-legal/index.html",
    date: "2026-05-06",
    category: "Tauranga SME",
    format: "Presentation",
    displayMode: "fit-viewport",
  },
];

export function getWorksheetById(id: string | undefined): WorksheetItem | undefined {
  if (!id) return undefined;
  return worksheets.find((worksheet) => worksheet.id === id);
}
