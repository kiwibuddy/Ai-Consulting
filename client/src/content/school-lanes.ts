/**
 * Copy, citations, and lane metadata for /schools/* lane pages.
 * Research citations from sphere-worldview-corpus job-market source database.
 */

export interface SchoolCitation {
  quote: string;
  source: string;
  href: string;
}

export interface SchoolContentSection {
  title: string;
  body: string;
  citations?: SchoolCitation[];
}

export interface SchoolLaneConfig {
  id: "staff" | "students" | "governance";
  canonicalPath: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroObjectPosition?: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede: string;
  problemSections: SchoolContentSection[];
}

export const SCHOOL_LANE_STAFF: SchoolLaneConfig = {
  id: "staff",
  canonicalPath: "/schools/staff",
  seoTitle: "Staff Formation & PD — AI Training for NZ Schools | Nathaniel Baldock",
  seoDescription:
    "Teaching for the Discernment Age: staff PD, whole-school days, and classroom worksheets for NZ schools. Formation-first professional development with facilitator kit included.",
  heroImage:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2400&q=85",
  heroObjectPosition: "center 40%",
  eyebrow: "Staff formation & PD",
  title: "Teach discernment,",
  titleAccent: "not just tools.",
  lede:
    "A formation-first PD day that gives your team frameworks they keep — VERIFY drills, traffic-light assignment sorts, protected struggle maps, and a signed staffroom covenant. Most schools book the Whole-School Day bundle.",
  problemSections: [
    {
      title: "Why staff PD has to change",
      body:
        "Generic \"AI 101\" decks do not shift classroom behaviour. Teachers need defensible practice: when AI helps lesson prep, when it undermines assessment integrity, and how to model discernment students will actually copy. The PD kit is complete — deck, workbook, facilitator guide, and parent one-pager — so nothing is left for your team to build.",
      citations: [
        {
          quote:
            "78.7% of observed AI interactions in the workplace represent augmentation (collaborative) rather than automation (replacement).",
          source: "Truffle — AI in recruiting 2026",
          href: "https://www.hiretruffle.com/reports/ai-in-recruiting-2026",
        },
        {
          quote:
            "Mathematics (73.2) and Programming (71.8) have the highest automation feasibility, while Active Listening (42.2) has the lowest.",
          source: "The AI Skills Shift (SAFI) — arXiv",
          href: "https://arxiv.org/abs/2604.06906v1",
        },
      ],
    },
    {
      title: "Assessment integrity in the AI era",
      body:
        "NCEA authenticity expectations have not paused while ChatGPT arrived. Staff PD maps which formation stages AI skips in each subject, runs VERIFY on real output, and produces a traffic-light register your departments can defend to NZQA and parents.",
      citations: [
        {
          quote:
            "74% of large U.S. firms now use human-in-the-loop tools specifically for hiring decisions.",
          source: "Parseur — Human-in-the-Loop AI guide",
          href: "https://parseur.com/blog/what-is-human-in-the-loop-ai",
        },
        {
          quote:
            "Only 23% of candidates believe AI screening is fair — high-stakes decisions still need human judgment.",
          source: "Mokka — AI resume screening tools 2026",
          href: "https://www.gomokka.com/resources/10-best-ai-resume-screening-tools-in-2026.html",
        },
      ],
    },
    {
      title: "What you book",
      body:
        "Twilight pilot or full 6-hour day, banded by staff size. The Whole-School Day adds student assembly and parent evening in one visit — the format schools rebook because it moves the whole community at once.",
    },
  ],
};

export const SCHOOL_LANE_STUDENTS: SchoolLaneConfig = {
  id: "students",
  canonicalPath: "/schools/students",
  seoTitle: "Students & Whānau — AI Programmes for NZ Schools | Nathaniel Baldock",
  seoDescription:
    "Student assemblies, parent evenings, the free Pathway Compass for seniors, and the Highest-Return Portfolio Years 12–13 programme. School-facing sessions for NZ learners and families.",
  heroImage: "/school-suite/flyers/headers/student-assembly.png?v=5",
  heroObjectPosition: "center 35%",
  eyebrow: "Students & whānau",
  title: "Senior pathways",
  titleAccent: "they can defend.",
  lede:
    "Assemblies, parent evenings, the free Pathway Compass for seniors, and the Highest-Return Portfolio programme — so Years 12–13 leave with tested pathway decisions and evidence employers actually trust.",
  problemSections: [
    {
      title: "The leaver landscape has shifted",
      body:
        "School leavers face automated résumé gates, skills-based hiring, and listings that never convert to jobs. Seniors need honest data on four pathways — university, trades, work, and a purpose year — weighed against AI-era labour reality, not brochure optimism.",
      citations: [
        {
          quote:
            "95% of HR teams believe skills-based hiring will become the dominant model by 2030; 81% of companies now use skills assessments to evaluate candidates.",
          source: "CandyCV — Skills-based hiring 2026 report",
          href: "https://www.candycv.com/reports/the-skills-based-hiring-report-what-it-is-and-how-it-will-reshape-work-in-2026-32",
        },
        {
          quote:
            "Mathematics (73.2) and Programming (71.8) score highest for automation feasibility; Active Listening (42.2) scores lowest — human connective skills retain value.",
          source: "The AI Skills Shift (SAFI) — arXiv",
          href: "https://arxiv.org/abs/2604.06906v1",
        },
      ],
    },
    {
      title: "Evidence beats polish",
      body:
        "When AI can draft any CV, employers look for verifiable capability — artefacts, referees, and skills demonstrations. The Highest-Return Portfolio builds a term-to-year evidence trail; Pathway Compass gives every senior a defensible pathway decision with NZ data.",
      citations: [
        {
          quote:
            "67% of hiring managers caught at least one fabricated skill on a resume in the last twelve months.",
          source: "SkillUpArc — Job readiness platforms 2026",
          href: "https://www.skilluparc.com/blog/best-platforms-verify-job-readiness-2026",
        },
        {
          quote:
            "Roughly 1 in 3 job listings lead nowhere — more than 2.5 million roles in a single month.",
          source: "My Perfect Resume — Ghost jobs economy",
          href: "https://www.myperfectresume.com/career-center/careers/basics/ghost-job-economy",
        },
      ],
    },
    {
      title: "Families need the same language",
      body:
        "The parent evening sends every whānau home with traffic-light AI rules, scam awareness, and pathway conversations that match what students heard in assembly. No conflicting advice between school and home.",
    },
  ],
};

export const SCHOOL_GOVERNANCE_FLYER =
  "/school-suite/flyers/ai-policy-governance.html";

export const SCHOOL_LANE_HUB_CARDS = [
  {
    id: "governance" as const,
    num: "01",
    href: "/schools/governance",
    title: "Policy & governance",
    body:
      "Board-ready AI policy suite — 9-part framework, NZQA integrity addendum, Privacy Act provisions, and green/amber/red tool register.",
    badge: "$3,500–$8,500 + GST",
    image: "/school-suite/flyers/headers/ai-policy-governance.png?v=5",
  },
  {
    id: "staff" as const,
    num: "02",
    href: "/schools/staff",
    title: "Staff formation & PD",
    body:
      "Teaching for the Discernment Age — twilight or full PD day, facilitator kit, Whole-School Day bundle, and classroom worksheets.",
    badge: "From $1,500 + GST",
    image: "/school-suite/flyers/headers/educators-pd.png?v=5",
    featured: true,
  },
  {
    id: "students" as const,
    num: "03",
    href: "/schools/students",
    title: "Students & whānau",
    body:
      "Assemblies, parent evenings, free Pathway Compass for seniors, and the Highest-Return Portfolio programme for Years 12–13.",
    badge: "Free tools · sessions by quote",
    image: "/school-suite/flyers/headers/student-assembly.png?v=5",
  },
];
