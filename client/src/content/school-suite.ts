/**
 * Public school-suite paths under client/public/school-suite/.
 * Pricing bands match the print flyers (GST exclusive unless noted on flyer).
 *
 * Sales funnel: Products + /schools → flyers only.
 * Live deliverables (PD kit, HRP site, school-suite worksheets) are not linked publicly.
 * Exception: Pathway Compass live tool stays free at SCHOOL_SUITE_PATHWAY_COMPASS_TOOL.
 */

/** Branded React browse page — canonical schools pack hub. */
export const SCHOOL_SUITE_PACK = "/schools";
export const SCHOOL_SUITE_STAFF_PAGE = "/schools/staff";
export const SCHOOL_SUITE_STUDENTS_PAGE = "/schools/students";
export const SCHOOL_SUITE_GOVERNANCE_PAGE = "/schools/governance";

/** @deprecated Static hub — redirects to SCHOOL_SUITE_PACK. */
export const SCHOOL_SUITE_HUB = "/school-suite/flyers/index.html";

export const SCHOOL_SUITE_STAFF_LANE = "/school-suite/flyers/staff-lane.html";
export const SCHOOL_SUITE_STUDENTS_LANE = "/school-suite/flyers/students-lane.html";

/** Flyer (sales) — not the live PD landing or kit. */
export const SCHOOL_SUITE_EDUCATORS_PD_FLYER =
  "/school-suite/flyers/educators-pd.html";

/** Free live interactive tool (exception). */
export const SCHOOL_SUITE_PATHWAY_COMPASS_TOOL =
  "/school-suite/tools/pathway-compass.html";

/** Flyer (sales) for Pathway Compass. */
export const SCHOOL_SUITE_PATHWAY_COMPASS_FLYER =
  "/school-suite/flyers/pathway-compass.html";

/** Flyer (sales) — not the live HRP pitch site. */
export const SCHOOL_SUITE_HIGHEST_RETURN_FLYER =
  "/school-suite/flyers/highest-return-portfolio.html";

export interface SchoolSuiteOffer {
  id: string;
  label: string;
  detail: string;
  priceNote: string;
  /** Print flyer — opens as a static HTML asset. */
  href: string;
  /** Header image under /school-suite/flyers/headers/ */
  headerImage?: string;
  /** Lane for grouping on /schools */
  lane?: "governance" | "staff" | "students";
  recommended?: boolean;
  /** Secondary link to free live tool (Pathway Compass only). */
  liveToolHref?: string;
}

export const schoolSuiteOffers: SchoolSuiteOffer[] = [
  {
    id: "free-on-ramp",
    label: "Pathway Compass",
    detail:
      "Interactive Y12–13 leaver decision tool — university, trades, work, or a purpose year weighed against NZ AI-era data.",
    priceNote: "Free",
    href: SCHOOL_SUITE_PATHWAY_COMPASS_FLYER,
    headerImage: "pathway-compass.png",
    lane: "students",
    liveToolHref: SCHOOL_SUITE_PATHWAY_COMPASS_TOOL,
  },
  {
    id: "student-assembly",
    label: "Student assembly",
    detail: '"Who Are You Before AI Tells You?" - a direct session for ages 13 to 18.',
    priceNote: "Bundled with whole-school day",
    href: "/school-suite/flyers/student-assembly.html",
    headerImage: "student-assembly.png",
    lane: "students",
  },
  {
    id: "parent-evening",
    label: "Parent & whānau evening",
    detail:
      "AI at home, deepfakes and scams, and family boundaries kids will actually keep.",
    priceNote: "Included in whole-school day",
    href: "/school-suite/flyers/parent-evening.html",
    headerImage: "parent-evening.png",
    lane: "students",
  },
  {
    id: "staff-pd",
    label: "Staff PD",
    detail:
      '"Teaching for the Discernment Age" - twilight or full PD day, with facilitator deck, guide, and participant workbook.',
    priceNote: "$1,500–$4,000 + GST (by staff size)",
    href: SCHOOL_SUITE_EDUCATORS_PD_FLYER,
    headerImage: "educators-pd.png",
    lane: "staff",
  },
  {
    id: "whole-school-day",
    label: "Whole-School Day",
    detail: "Assembly + staff PD + parent evening in one visit.",
    priceNote: "By quote (bundled)",
    href: "/school-suite/flyers/whole-school-day.html",
    headerImage: "whole-school-day.png",
    lane: "staff",
    recommended: true,
  },
  {
    id: "policy-governance",
    label: "AI Policy & Governance",
    detail:
      "Tool audit, written school AI policy, and staff guidance - the schools edition of the audit.",
    priceNote: "$3,500–$8,500 (by phase)",
    href: "/school-suite/flyers/ai-policy-governance.html",
    headerImage: "ai-policy-governance.png",
    lane: "governance",
  },
  {
    id: "hrs-12-13",
    label: "Yrs 12–13 programme",
    detail:
      "The Highest-Return Portfolio: a term-to-year careers and skills programme. Pilot programme with founding-school pricing.",
    priceNote: "By quote (founding-school pilot)",
    href: SCHOOL_SUITE_HIGHEST_RETURN_FLYER,
    headerImage: "highest-return-portfolio.png",
    lane: "students",
  },
  {
    id: "classroom-worksheets",
    label: "Classroom worksheets",
    detail:
      "VERIFY method, prompt engineering, and What Is School For? — print-ready follow-up after PD or assembly.",
    priceNote: "Included with PD delivery",
    href: "/school-suite/flyers/classroom-worksheets.html",
    headerImage: "classroom-worksheets.png",
    lane: "staff",
  },
];

export interface SchoolProductCard {
  id: string;
  title: string;
  badge: string;
  body: string;
  includes: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
}

/** Three decision lanes for principals — detail lives in the schools pack flyers. */
export const schoolProductCards: SchoolProductCard[] = [
  {
    id: "governance",
    title: "AI Policy & Governance",
    badge: "$3,500–$8,500 + GST",
    body:
      "Board-ready policy suite when you need compliance, not just conversation. Tool audit, written acceptable-use policy, NZQA integrity addendum, Privacy Act provisions, and a staff workshop so the policy actually lands.",
    includes: [
      "9-part school policy framework",
      "Board presentation pack",
      "Green / amber / red tool register",
    ],
    ctaLabel: "Explore policy & governance",
    ctaHref: SCHOOL_SUITE_GOVERNANCE_PAGE,
  },
  {
    id: "staff",
    title: "For your staff",
    badge: "From $1,500 + GST",
    body:
      "Teaching for the Discernment Age — twilight or full PD day with facilitator deck, guide, and participant workbook. Most schools book the Whole-School Day: staff PD, student assembly, and parent evening in one coordinated visit.",
    includes: [
      "Staff PD with facilitator kit",
      "Whole-School Day (recommended bundle)",
      "Signed staffroom covenant + follow-up worksheets",
    ],
    ctaLabel: "Browse staff offers",
    ctaHref: SCHOOL_SUITE_STAFF_PAGE,
    featured: true,
  },
  {
    id: "students",
    title: "For your students & whānau",
    badge: "Free tools · sessions by quote",
    body:
      "What you book for learners and families — not what they browse on this site. Student assembly, parent evening, free Pathway Compass for seniors, and the Highest-Return Portfolio programme for Years 12–13.",
    includes: [
      "Student assembly (Years 9–13)",
      "Parent & whānau evening",
      "Pathway Compass + classroom VERIFY worksheets",
    ],
    ctaLabel: "Browse student & whānau offers",
    ctaHref: SCHOOL_SUITE_STUDENTS_PAGE,
  },
];

/** Key public school-suite URLs for sitemap generation (flyers + free Compass tool + /schools). */
export const SCHOOL_SUITE_SITEMAP_PATHS = [
  SCHOOL_SUITE_PACK,
  SCHOOL_SUITE_STAFF_PAGE,
  SCHOOL_SUITE_STUDENTS_PAGE,
  SCHOOL_SUITE_GOVERNANCE_PAGE,
  SCHOOL_SUITE_PATHWAY_COMPASS_TOOL,
  ...schoolSuiteOffers.map((o) => o.href),
  "/school-suite/flyers/principal-leave-behind.html",
].filter((path, index, all) => all.indexOf(path) === index);
