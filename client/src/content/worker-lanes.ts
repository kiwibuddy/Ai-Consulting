/**
 * Copy, citations, and lane metadata for /business/workers.
 * Research citations from job-market source database (see business-suite hand-off).
 */

export interface WorkerCitation {
  quote: string;
  source: string;
  href: string;
}

export interface WorkerContentSection {
  title: string;
  body: string;
  citations?: WorkerCitation[];
}

export interface WorkerLaneConfig {
  id: "workers";
  canonicalPath: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroObjectPosition?: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede: string;
  problemSections: WorkerContentSection[];
}

export const WORKER_LANE: WorkerLaneConfig = {
  id: "workers",
  canonicalPath: "/business/workers",
  seoTitle:
    "Job Transition Toolkit — AI-Era Job Search for NZ Workers | Nathaniel Baldock",
  seoDescription:
    "Hiring is machine-to-machine now. Free Ghost Job Detector and ATS Survival tools, plus workshops for workers laid off or long between roles — triage listings, pass parsers, build evidence you can defend.",
  heroImage:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
  heroObjectPosition: "center 40%",
  eyebrow: "Workers in transition",
  title: "Hiring has become",
  titleAccent: "machine-to-machine war.",
  lede:
    "You might not be losing to better candidates — or to someone more AI-savvy. Invisible screeners often reject applications before a human sees them, and you would never know. That is not a verdict on your capability. Start with free tools that protect your hours; book workshops for the human-in-the-loop method and evidence employers actually check.",
  problemSections: [
    {
      title: "The funnel changed — rejection is often system noise",
      body:
        "Most applications never reach a human. Automated screeners filter roughly three in four résumés before a recruiter sees them, and ghost listings waste an average of nine hours per phantom role. Understanding the machine-to-machine funnel reframes silence as infrastructure failure, not a personal verdict — but you still need tactics that work inside it.",
      citations: [
        {
          quote:
            "75% of resumes never reach a human recruiter due to automated filtering.",
          source: "Mokka — AI resume screening tools 2026",
          href: "https://www.gomokka.com/resources/10-best-ai-resume-screening-tools-in-2026.html",
        },
        {
          quote:
            "Roughly 1 in 3 job listings lead nowhere — more than 2.5 million roles in a single month.",
          source: "My Perfect Resume — Ghost jobs economy",
          href: "https://www.myperfectresume.com/career-center/careers/basics/ghost-job-economy",
        },
        {
          quote:
            "The average ghost-job cycle wastes 9 hours of a candidate's time.",
          source: "JobsTrack — Ghost jobs explained 2026",
          href: "https://jobstrack.io/blog/ghost-jobs-2026",
        },
      ],
    },
    {
      title: "Cheapest wins: format, truth, and proof",
      body:
        "Formatting alone causes nearly a quarter of immediate rejections — single-column .docx, standard headers, and MM/YYYY dates are the mechanical fixes recruiters rarely mention. In parallel, employers are shifting to skills-based hiring and catching fabricated claims: AI can polish prose, but verified artefacts and human-in-the-loop integrity win interviews.",
      citations: [
        {
          quote:
            "Formatting issues alone cause 23% of immediate candidate rejections.",
          source: "ResumeAdapter — ATS formatting rules 2026",
          href: "https://www.resumeadapter.com/blog/ats-resume-formatting-rules-2026",
        },
        {
          quote:
            "67% of hiring managers caught at least one fabricated skill on a resume in the last twelve months.",
          source: "SkillUpArc — Job readiness platforms 2026",
          href: "https://www.skilluparc.com/blog/best-platforms-verify-job-readiness-2026",
        },
        {
          quote:
            "81% of companies now use skills assessments to evaluate candidates, up from 56% in 2022.",
          source: "CandyCV — Skills-based hiring 2026 report",
          href: "https://www.candycv.com/reports/the-skills-based-hiring-report-what-it-is-and-how-it-will-reshape-work-in-2026-32",
        },
      ],
    },
    {
      title: "Don't flee AI-exposed fields — become the augmented person in them",
      body:
        "PwC's NZ analysis shows skills in AI-exposed roles are changing faster — but those roles saw smaller posting declines than less-exposed work when workers adapt. Basic AI literacy is achievable in weeks; the NBER finds least-experienced users often gain the most from augmentation tools. The goal is not a scatter of micro-certificates — it is demonstrating you can create with AI while keeping human judgment in the loop.",
      citations: [
        {
          quote:
            "Skills sought for AI-exposed jobs are changing 66% faster than for other roles; highly exposed roles saw smaller declines in job postings.",
          source: "PwC — 2025 Global AI Jobs Barometer (NZ analysis)",
          href: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf",
        },
        {
          quote:
            "The lowest-skilled and least experienced workers saw the highest productivity gains from GenAI tools, at 35%.",
          source: "NBER — Measuring the productivity impact of generative AI",
          href: "https://www.nber.org/digest/20236/measuring-productivity-impact-generative-ai",
        },
        {
          quote:
            "78.7% of observed AI interactions in the workplace represent augmentation (collaborative) rather than automation (replacement).",
          source: "Truffle — AI in recruiting 2026",
          href: "https://www.hiretruffle.com/reports/ai-in-recruiting-2026",
        },
      ],
    },
  ],
};
