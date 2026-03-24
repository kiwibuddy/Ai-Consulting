/** Working Professionals (Christian) series — embedded HTML worksheets under /resources/christian-professional/:slug */
export interface ChristianProfessionalWorksheetMeta {
  slug: string;
  /** Path under public/ */
  iframeSrc: string;
  title: string;
  description: string;
  /** For share cards and SEO */
  shareDescription: string;
  seriesPart: string;
}

export const christianProfessionalWorksheets: ChristianProfessionalWorksheetMeta[] = [
  {
    slug: "automation-or-augmentation-christian",
    iframeSrc: "/worksheets/christian-professional/wp-01-automation-augmentation.html",
    title: "Is My Job Automation or Augmentation?",
    description:
      "A personal risk audit: map where your tasks sit on the automation vs augmentation spectrum, with research-backed stats and a 90-day plan.",
    shareDescription:
      "The question every employed person needs to answer — for themselves. Working Professionals worksheet 1 of 4.",
    seriesPart: "WP–01 of 4",
  },
  {
    slug: "52-minute-opportunity-christian",
    iframeSrc: "/worksheets/christian-professional/wp-02-52-minute-opportunity.html",
    title: "The 52-Minute Opportunity",
    description:
      "AI may give you roughly an hour back each day. What will you do with it? Plan the trade before someone else claims that time.",
    shareDescription:
      "What will you do with the time AI gives you back? Working Professionals worksheet 2 of 4.",
    seriesPart: "WP–02 of 4",
  },
  {
    slug: "what-will-they-still-pay-me-for-christian",
    iframeSrc: "/worksheets/christian-professional/wp-03-what-will-they-still-pay-me-for.html",
    title: "What Will They Still Pay Me For?",
    description:
      "Separate what’s on your job description from what you’re actually valued for — and what AI can’t replace.",
    shareDescription:
      "Your human value proposition: what makes you irreplaceable. Working Professionals worksheet 3 of 4.",
    seriesPart: "WP–03 of 4",
  },
  {
    slug: "five-year-positioning-map-christian",
    iframeSrc: "/worksheets/christian-professional/wp-04-five-year-positioning-map.html",
    title: "The Five-Year Positioning Map",
    description:
      "Scenario planning for your career when you don’t know exactly what’s coming — moves that pay off across conservative, disruptive, and radical futures.",
    shareDescription:
      "Career strategy for uncertain times. Working Professionals worksheet 4 of 4.",
    seriesPart: "WP–04 of 4",
  },
];

export function getChristianProfessionalWorksheetBySlug(
  slug: string | undefined
): ChristianProfessionalWorksheetMeta | undefined {
  if (!slug) return undefined;
  return christianProfessionalWorksheets.find((w) => w.slug === slug);
}
