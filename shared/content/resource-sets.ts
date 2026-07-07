/**
 * Worksheet bundles for email-gated unlock on /resources.
 * First worksheet in each set is the free preview; the rest unlock after email.
 */

export interface ResourceSetDefinition {
  id: string;
  label: string;
  /** Card copy on /resources — what the full set covers. */
  summary: string;
  /** Longer blurb in the unlock email. */
  emailBlurb: string;
  /** Worksheet id shown open without email. */
  previewWorksheetId: string;
  /** All worksheet ids in the set (preview first). */
  worksheetIds: string[];
}

export const RESOURCE_SETS: ResourceSetDefinition[] = [
  {
    id: "family",
    label: "AI & Family",
    summary:
      "Four worksheets for parents: who is shaping your kids, a family AI agreement, an attachment audit, and four weeks of formation habits.",
    emailBlurb:
      "These four interactive worksheets help your household name the influences on your kids, agree AI boundaries together, audit real vs digital connection, and build rhythms that stick.",
    previewWorksheetId: "family-who-is-raising-our-kids",
    worksheetIds: [
      "family-who-is-raising-our-kids",
      "family-ai-agreement",
      "family-attachment-audit",
      "family-rewiring-rhythms",
    ],
  },
  {
    id: "christian-growth",
    label: "Christian Growth",
    summary:
      "Five reflections: digital liturgy, thinking without AI, scrolling to Sabbath, healthy AI use, and a deepfakes truth guide for 2026.",
    emailBlurb:
      "Formation for believers navigating AI — from what is training your desires to how you rest, think, and spot digital deception without panic.",
    previewWorksheetId: "christian-digital-liturgy-audit",
    worksheetIds: [
      "christian-digital-liturgy-audit",
      "christian-think-without-assistance",
      "christian-scrolling-to-sabbath",
      "christian-healthy-ai-use",
      "deepfakes-digital-truth-2026",
    ],
  },
  {
    id: "education",
    label: "Education",
    summary:
      "Three classroom-ready tools: the VERIFY method, prompt engineering basics, and a reflection on what school is for in the AI era.",
    emailBlurb:
      "Built for teachers and school leaders — practical classroom tools that help students check AI claims before they act on them.",
    previewWorksheetId: "edu-verify-method",
    worksheetIds: ["edu-verify-method", "edu-prompt-engineering", "edu-what-is-school-for"],
  },
  {
    id: "working-professionals",
    label: "Working Professionals",
    summary:
      "Four career worksheets: automation vs augmentation, the 52-minute opportunity, your human value proposition, and a five-year map.",
    emailBlurb:
      "For Christians in paid work — map where AI helps vs replaces you, claim the time it gives back, and position the work only you can do.",
    previewWorksheetId: "wp-christian-automation-augmentation",
    worksheetIds: [
      "wp-christian-automation-augmentation",
      "wp-christian-52-minute",
      "wp-christian-pay-me-for",
      "wp-christian-five-year-map",
    ],
  },
  {
    id: "ai-preparedness",
    label: "AI Preparedness",
    summary:
      "Four practical prep tools: safe-phrase protocol, readiness checklist, onboarding guide, and an analog asset log.",
    emailBlurb:
      "Household and leadership prep — scams, readiness, onboarding people safely, and keeping offline assets that matter when systems fail.",
    previewWorksheetId: "presentations-ai-prep-safe-phrase-protocol",
    worksheetIds: [
      "presentations-ai-prep-safe-phrase-protocol",
      "presentations-ai-prep-readiness-checklist",
      "presentations-ai-prep-onboarding",
      "presentations-ai-prep-analog-asset-log",
    ],
  },
  {
    id: "tauranga-sme",
    label: "Tauranga Businesses",
    summary:
      "Four free prep worksheets for Bay of Plenty SMEs: readiness, time audit, team conversation, and privacy basics — the free layer of the AI-Ready Business Pack.",
    emailBlurb:
      "The free prep layer of the AI-Ready Business Pack. Work through readiness, where AI saves time, how to talk with your team, and the legal basics before you invest in Bronze, Silver, or Gold.",
    previewWorksheetId: "tauranga-sme-readiness",
    worksheetIds: [
      "tauranga-sme-readiness",
      "tauranga-sme-time-audit",
      "tauranga-sme-team",
      "tauranga-sme-legal",
    ],
  },
];

export const RESOURCE_SET_ID_VALUES = [
  "family",
  "christian-growth",
  "education",
  "working-professionals",
  "ai-preparedness",
  "tauranga-sme",
] as const;

export type ResourceSetId = (typeof RESOURCE_SET_ID_VALUES)[number];

export const RESOURCE_SET_IDS: ResourceSetId[] = [...RESOURCE_SET_ID_VALUES];

export function getResourceSetById(id: string): ResourceSetDefinition | undefined {
  return RESOURCE_SETS.find((s) => s.id === id);
}

export function getResourceSetByWorksheetId(worksheetId: string): ResourceSetDefinition | undefined {
  return RESOURCE_SETS.find((s) => s.worksheetIds.includes(worksheetId));
}
