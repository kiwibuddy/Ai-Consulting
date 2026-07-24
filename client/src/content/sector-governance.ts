/**
 * Shared AI Policy & Governance lane for business, church, and nonprofit.
 * Same tiers and pricing; sector-specific framing, compliance hooks, and examples.
 * Founder / introductory pricing (2026).
 */

export type SectorId = "business" | "church" | "nonprofit";

export interface SectorComplianceHook {
  label: string;
  detail: string;
}

export interface SectorTier {
  id: "essentials" | "governance" | "partnership";
  name: string;
  price: string;
  duration: string;
  note: string;
  includes: string[];
  recommended?: boolean;
}

export interface SectorGovernanceContent {
  id: SectorId;
  path: string;
  seoTitle: string;
  seoDescription: string;
  heroTag: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  sub: string;
  lede: string;
  whyHeading: string;
  complianceHooks: SectorComplianceHook[];
  /** Short nouns used in card / body examples */
  examples: string[];
  charityNote: boolean;
  heroImage: string;
  heroObjectPosition?: string;
  relatedSeoHref?: string;
  relatedSeoLabel?: string;
}

export const SECTOR_PRICE_BAND = "$1,800–$5,900 + GST";

export const SECTOR_TIERS: SectorTier[] = [
  {
    id: "essentials",
    name: "Essentials",
    price: "$1,800",
    duration: "2 weeks",
    note: "For the organisation with nothing in place",
    includes: [
      "Facilitated AI use inventory and risk audit, run as a working session with your team",
      "Written findings report with risk ratings and a prioritised action list",
      "Custom AI policy written for your organisation",
      "Traffic Light quick-reference card for staff areas",
      "60-minute policy walkthrough",
    ],
  },
  {
    id: "governance",
    name: "Governance",
    price: "$3,500",
    duration: "3–4 weeks",
    note: "Where most clients should land",
    recommended: true,
    includes: [
      "Everything in Essentials",
      "New Zealand compliance review — Privacy Act 2020, IPP 3A, and sector obligations",
      "Delivered staff training session",
      "Public and website AI transparency statements",
      "Staff acknowledgement pack",
    ],
  },
  {
    id: "partnership",
    name: "Partnership",
    price: "$5,900",
    duration: "4–6 weeks + 12 months",
    note: "Roadmap, board pack, and ongoing advisory",
    includes: [
      "Everything in Governance",
      "Tool evaluation report with vendor-neutral recommendations",
      "Implementation roadmap",
      "Board or leadership presentation pack",
      "12 months advisory including the annual review",
    ],
  },
];

export const SECTOR_RETAINER = {
  price: "$1,200/yr",
  includes: [
    "Annual policy review against changes in AI technology and NZ law",
    "Ongoing tool vetting",
    "Priority notification when a legal or AI development requires an out-of-cycle update",
  ],
};

export const SECTOR_PHASES = [
  { phase: "1 Discovery", detail: "Facilitated inventory, risk ratings, action list" },
  { phase: "2 Policy", detail: "Custom policy, Traffic Light card, walkthrough" },
  { phase: "3 Compliance", detail: "NZ law review, statements, staff acknowledgement" },
  { phase: "4 Capability", detail: "Training, roadmap, leadership pack (higher tiers)" },
  { phase: "5 Retainer", detail: "Annual review and tool vetting" },
];

export const CHARITY_NOTE_COPY =
  "Registered charities and not-for-profits: an adjusted rate applies. Mention your registration number when you book and I will confirm it in your proposal.";

export const sectorGovernancePages: Record<SectorId, SectorGovernanceContent> = {
  business: {
    id: "business",
    path: "/business/governance",
    seoTitle: "AI Policy & Governance for Business | Nathaniel Baldock — Tauranga NZ",
    seoDescription:
      "Custom AI policy, Privacy Act 2020 compliance review, and staff training for New Zealand businesses. Packages from $1,800 + GST.",
    heroTag: "Privacy Act 2020 · IPP 3A · NIST AI RMF",
    eyebrow: "Business & organisations",
    title: "AI Policy & Governance",
    titleAccent: "for business.",
    sub: "From shadow AI to a policy your team actually follows.",
    lede:
      "Your staff are already using AI. Most teams are. The question is whether anyone has told them what is safe to put into it. This lane gives you a written policy, a compliance review against New Zealand law, and a team that knows the rules.",
    whyHeading: "Why businesses book this lane",
    complianceHooks: [
      {
        label: "Privacy Act 2020",
        detail: "How you collect, use, and protect customer and staff information",
      },
      {
        label: "IPP 3A",
        detail: "In force 1 May 2026 — covers indirectly collected personal information",
      },
      {
        label: "CERT NZ",
        detail: "10 Critical Controls alignment checked as part of the review",
      },
    ],
    examples: [
      "client data",
      "quotes and proposals",
      "customer records",
      "staff HR files",
      "supplier contracts",
      "financial data",
    ],
    charityNote: false,
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
    heroObjectPosition: "center 40%",
  },
  church: {
    id: "church",
    path: "/church/governance",
    seoTitle: "AI Policy & Governance for Churches | Nathaniel Baldock — Tauranga NZ",
    seoDescription:
      "AI policy written in your church's language. Protects pastoral confidentiality and congregation trust. Packages from $1,800 + GST. Charity rate available.",
    heroTag: "Privacy Act 2020 · IPP 3A · Pastoral confidentiality",
    eyebrow: "Churches & ministries",
    title: "AI Policy & Governance",
    titleAccent: "for churches.",
    sub: "Protecting the trust your congregation places in you.",
    lede:
      "Your team is already using AI for sermon prep, communications, and admin. Your congregation trusts you with prayer requests, pastoral conversations, and family situations. This lane gives you a clear policy in your own language, so your team knows exactly where the line is.",
    whyHeading: "Why churches book this lane",
    complianceHooks: [
      {
        label: "Privacy Act 2020",
        detail: "How you hold congregation and community information",
      },
      {
        label: "IPP 3A",
        detail: "Applies when someone registers another person through Planning Center or Church Center",
      },
      {
        label: "Māori data sovereignty",
        detail: "Personal information as taonga, aligned with Te Mana Raraunga principles",
      },
    ],
    examples: [
      "prayer requests",
      "pastoral care notes",
      "giving records",
      "children's ministry information",
      "safeguarding matters",
      "counselling notes",
    ],
    charityNote: true,
    heroImage:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=85",
    heroObjectPosition: "center 35%",
    relatedSeoHref: "/ai-consulting-for-churches",
    relatedSeoLabel: "More on AI consulting for churches",
  },
  nonprofit: {
    id: "nonprofit",
    path: "/nonprofit/governance",
    seoTitle: "AI Policy & Governance for Not-for-Profits | Nathaniel Baldock — Tauranga NZ",
    seoDescription:
      "Board-ready AI governance for NZ charities and NGOs. Privacy Act 2020 compliance and staff training. From $1,800 + GST. Charity rate available.",
    heroTag: "Privacy Act 2020 · IPP 3A · Funder reporting",
    eyebrow: "Not-for-profits & NGOs",
    title: "AI Policy & Governance",
    titleAccent: "for not-for-profits.",
    sub: "Governance your board and your funders can see.",
    lede:
      "Funders and boards are starting to ask how organisations govern AI. Your team is already using it. This lane gives you a written policy, a compliance review, and a board-ready summary, so the answer is on the shelf before the question arrives.",
    whyHeading: "Why not-for-profits book this lane",
    complianceHooks: [
      {
        label: "Privacy Act 2020",
        detail: "How you hold client, beneficiary, and volunteer information",
      },
      {
        label: "IPP 3A",
        detail: "In force 1 May 2026 — covers indirectly collected personal information",
      },
      {
        label: "Board & funder reporting",
        detail: "Governance evidence for accountability requirements",
      },
    ],
    examples: [
      "client and beneficiary records",
      "case notes",
      "volunteer information",
      "funder reporting data",
      "grant applications",
    ],
    charityNote: true,
    heroImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2400&q=85",
    heroObjectPosition: "center 30%",
    relatedSeoHref: "/ai-governance-for-nonprofits",
    relatedSeoLabel: "More on AI governance for nonprofits",
  },
};

/** Cards shown on /products under the business & organisations lane */
export const sectorProductCards = [
  {
    id: "business" as const,
    title: "Business & Organisations",
    badge: SECTOR_PRICE_BAND,
    body: "Facilitated AI use audit, custom policy (not a template), and staff training — for owners, boards, and team leads.",
    includes: [
      "Facilitated AI use audit",
      "Custom policy, not a template",
      "Staff training and quick-reference cards",
    ],
    ctaLabel: "Explore business governance",
    ctaHref: "/business/governance",
    featured: true,
    featuredLabel: "Recommended",
  },
  {
    id: "church" as const,
    title: "Churches & Ministries",
    badge: SECTOR_PRICE_BAND,
    body: "Policy written in your church's language — pastoral confidentiality, congregation trust, and Māori data sovereignty in view.",
    includes: [
      "Facilitated AI use audit",
      "Custom policy, not a template",
      "Staff training and quick-reference cards",
    ],
    ctaLabel: "Explore church governance",
    ctaHref: "/church/governance",
  },
  {
    id: "nonprofit" as const,
    title: "Not-for-Profits & NGOs",
    badge: SECTOR_PRICE_BAND,
    body: "Board-ready governance evidence for funders and trustees — same tier structure, charity rate available.",
    includes: [
      "Facilitated AI use audit",
      "Custom policy, not a template",
      "Staff training and quick-reference cards",
    ],
    ctaLabel: "Explore NFP governance",
    ctaHref: "/nonprofit/governance",
  },
];

export function getSectorGovernance(id: SectorId): SectorGovernanceContent {
  return sectorGovernancePages[id];
}
