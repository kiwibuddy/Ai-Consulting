/** Working Professionals (Christian) series and standalone professional worksheets under /resources/christian-professional/:slug */
export interface ChristianProfessionalWorksheetMeta {
  slug: string;
  /** Path under public/ */
  iframeSrc: string;
  title: string;
  description: string;
  /** For share cards and SEO */
  shareDescription: string;
  /** Optional social card image for this worksheet. */
  shareImage?: string;
  /** 1–4 within the Working Professionals series; omit for standalone worksheets. */
  seriesNumber?: 1 | 2 | 3 | 4;
  /** Shown above the iframe when `seriesNumber` is omitted. */
  standAloneRibbon?: string;
}

export const christianProfessionalWorksheets: ChristianProfessionalWorksheetMeta[] = [
  {
    slug: "automation-or-augmentation-christian",
    iframeSrc: "/worksheets/christian-professional/wp-01-automation-augmentation.html",
    title: "Is My Job Automation or Augmentation?",
    description:
      "A personal risk audit: map where your tasks sit on the automation vs augmentation spectrum, with research-backed stats and a 90-day plan.",
    shareDescription:
      "The question every employed person needs to answer — for themselves. Working Professionals · Worksheet ONE OF FOUR.",
    shareImage: "/images/worksheets/wp-christian-01.svg",
    seriesNumber: 1,
  },
  {
    slug: "52-minute-opportunity-christian",
    iframeSrc: "/worksheets/christian-professional/wp-02-52-minute-opportunity.html",
    title: "The 52-Minute Opportunity",
    description:
      "AI may give you roughly an hour back each day. What will you do with it? Plan the trade before someone else claims that time.",
    shareDescription:
      "What will you do with the time AI gives you back? Working Professionals · Worksheet TWO OF FOUR.",
    shareImage: "/images/worksheets/wp-christian-02.svg",
    seriesNumber: 2,
  },
  {
    slug: "what-will-they-still-pay-me-for-christian",
    iframeSrc: "/worksheets/christian-professional/wp-03-what-will-they-still-pay-me-for.html",
    title: "What Will They Still Pay Me For?",
    description:
      "Separate what’s on your job description from what you’re actually valued for — and what AI can’t replace.",
    shareDescription:
      "Your human value proposition: what makes you irreplaceable. Working Professionals · Worksheet THREE OF FOUR.",
    shareImage: "/images/worksheets/wp-christian-03.svg",
    seriesNumber: 3,
  },
  {
    slug: "five-year-positioning-map-christian",
    iframeSrc: "/worksheets/christian-professional/wp-04-five-year-positioning-map.html",
    title: "The Five-Year Positioning Map",
    description:
      "Scenario planning for your career when you don’t know exactly what’s coming — moves that pay off across conservative, disruptive, and radical futures.",
    shareDescription:
      "Career strategy for uncertain times. Working Professionals · Worksheet FOUR OF FOUR.",
    shareImage: "/images/worksheets/wp-christian-04.svg",
    seriesNumber: 4,
  },
  {
    slug: "deepfakes-digital-truth-2026",
    iframeSrc: "/worksheets/deepfakes-digital-truth-2026.html",
    title: "Deepfakes & Digital Truth",
    description:
      "A practical reference guide to spotting AI-generated images, video, voice, text, fake profiles, and emergency scams — for families, churches, and leaders.",
    shareDescription:
      "Digital discernment in 2026: deepfakes, voice scams, and how to verify what you see and hear online.",
    shareImage: "/images/worksheets/deepfakes-digital-truth.svg",
    standAloneRibbon: "Digital Discernment",
  },
];

export function getChristianProfessionalWorksheetBySlug(
  slug: string | undefined
): ChristianProfessionalWorksheetMeta | undefined {
  if (!slug) return undefined;
  return christianProfessionalWorksheets.find((w) => w.slug === slug);
}
