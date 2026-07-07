/**
 * Public worker-suite paths under client/public/business-suite/.
 * Research citations: see business-suite/Conversation history and hand-off/
 */

export const WORKER_SUITE_PAGE = "/business/workers";

export const WORKER_GHOST_JOB_TOOL = "/business-suite/tools/ghost-job-detector.html";
export const WORKER_ATS_SURVIVAL_TOOL = "/business-suite/tools/ats-survival.html";
export const WORKER_ATS_SURVIVAL_WORKSHEET =
  "/business-suite/tools/ats-survival.html";
export const WORKER_HITL_RESUME_LAB = "/business-suite/tools/hitl-resume-lab.html";
export const WORKER_SKILLS_BRIDGE_PREVIEW =
  "/business-suite/tools/skills-bridge-preview.html";

export const WORKER_GHOST_JOB_FLYER = "/business-suite/flyers/ghost-job-detector.html";
export const WORKER_ATS_SURVIVAL_FLYER = "/business-suite/flyers/ats-survival.html";
export const WORKER_HITL_RESUME_FLYER = "/business-suite/flyers/human-in-the-loop-resume.html";
export const WORKER_SKILLS_BRIDGE_FLYER = "/business-suite/flyers/skills-bridge.html";
export const WORKER_HIRING_SEMINAR_FLYER =
  "/business-suite/flyers/how-hiring-works-now.html";

export interface WorkerSuiteOffer {
  id: string;
  label: string;
  detail: string;
  priceNote: string;
  href: string;
  headerImage?: string;
  /** Full URL when not using school-suite header folder */
  headerImageUrl?: string;
  recommended?: boolean;
  liveToolHref?: string;
}

export const workerSuiteOffers: WorkerSuiteOffer[] = [
  {
    id: "ghost-job-detector",
    label: "Ghost Job Detector",
    detail:
      "Interactive checklist — spot listings 30+ days old, reposted roles, vague scope, and five other phantom signals before you invest another evening.",
    priceNote: "Free",
    href: WORKER_GHOST_JOB_FLYER,
    headerImageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    liveToolHref: WORKER_GHOST_JOB_TOOL,
  },
  {
    id: "ats-survival",
    label: "ATS Survival one-pager",
    detail:
      "Mechanical fixes recruiters rarely mention: .docx over PDF, single column, MM/YYYY dates, standard headers — the cheapest win in a machine-screened market.",
    priceNote: "Free",
    href: WORKER_ATS_SURVIVAL_FLYER,
    headerImageUrl:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    liveToolHref: WORKER_ATS_SURVIVAL_TOOL,
  },
  {
    id: "hitl-resume",
    label: "Human-in-the-Loop Résumé Kit",
    detail:
      "Brain-dump real achievements, use AI for structure, human review for truth. Workbook + facilitator outline for church job circles, WINZ groups, or 1:1 coaching.",
    priceNote: "From $197 + GST",
    href: WORKER_HITL_RESUME_FLYER,
    headerImageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    recommended: true,
    liveToolHref: WORKER_HITL_RESUME_LAB,
  },
  {
    id: "skills-bridge",
    label: "Skills Bridge + Evidence Portfolio",
    detail:
      "Map current expertise to adjacent AI-augmented roles, then document three verifiable projects — the combination skills-based hiring now rewards.",
    priceNote: "From $497 + GST · 4 sessions",
    href: WORKER_SKILLS_BRIDGE_FLYER,
    headerImageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    liveToolHref: WORKER_SKILLS_BRIDGE_PREVIEW,
  },
  {
    id: "hiring-seminar",
    label: "How Hiring Actually Works Now",
    detail:
      '90-minute seminar for churches, community groups, or outplacement cohorts — demystify the funnel, ghost jobs, and the "augmented worker" path without false hope.',
    priceNote: "By quote",
    href: WORKER_HIRING_SEMINAR_FLYER,
    headerImageUrl:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  },
];
