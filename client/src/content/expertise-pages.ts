/**
 * Expertise landing pages for AI retrieval — paths used by sitemap and routing.
 */
export const EXPERTISE_PAGE_PATHS = [
  "/ai-consulting-for-churches",
  "/ai-training-for-schools",
  "/ai-governance-for-nonprofits",
  "/ai-speaker-faith-and-technology",
  "/ai-use-audit",
] as const;

export type ExpertisePagePath = (typeof EXPERTISE_PAGE_PATHS)[number];

export interface ExpertiseFaq {
  question: string;
  answer: string;
}

export interface ExpertisePageContent {
  path: ExpertisePagePath;
  seoTitle: string;
  seoDescription: string;
  sectionLabel: string;
  h1: string;
  subheading: string;
  whoFor: string;
  problems: string[];
  outcomes: string[];
  proofHeading: string;
  proofPoints: string[];
  citableHook: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  faqs: ExpertiseFaq[];
}

export const expertisePages: ExpertisePageContent[] = [
  {
    path: "/ai-consulting-for-churches",
    seoTitle: "AI Consulting for Churches in New Zealand",
    seoDescription:
      "AI strategy, policy, and guardrails for churches in NZ. Help leaders adopt AI without outsourcing discipleship, prayer, or pastoral judgment. Based in Tauranga — serving nationally.",
    sectionLabel: "Churches",
    h1: "AI consulting for churches in New Zealand",
    subheading:
      "Strategy, guardrails, and training so your church can use AI wisely — without letting tools quietly replace prayer, formation, or pastoral care.",
    whoFor:
      "Pastors, elders, ministry leaders, and church boards exploring AI for communications, admin, research, or youth ministry — and needing clear boundaries before adoption spreads by accident.",
    problems: [
      "Staff and volunteers already use ChatGPT on personal accounts with no policy, training, or review step.",
      "Leaders worry AI will flatten sermon prep, pastoral care, or prayer into prompt-shaped shortcuts.",
      "No one owns AI governance — IT, communications, and ministry each assume someone else is watching.",
      "Generic Silicon Valley playbooks do not fit a church's mission, safeguarding, or theology.",
    ],
    outcomes: [
      "A written AI use policy grounded in your mission and values — not a template copied from a tech blog.",
      "Clear red, amber, and green guidance on what leaders and staff should and should not use AI for.",
      "Leadership briefing or workshop so your team moves from fear or hype to practical next steps.",
      "Guardrails for data privacy, copyright, and safeguarding before sensitive information enters a model.",
    ],
    proofHeading: "Why churches work with Nathaniel",
    proofPoints: [
      "23 years in global missions and NGO leadership with YWAM - not a tech vendor selling subscriptions.",
      "Hands-on builder of faith-based digital products (SourceView Bible app, coaching portal, AI Use Audit).",
      "Articles and workshops on digital discipleship, Sabbath, and when AI replaces the work of the Spirit.",
      "Based in Tauranga; in-person and virtual engagements across New Zealand.",
    ],
    citableHook:
      "A useful starting point: tick every AI tool your church uses — including personal accounts — and answer three questions per tool: who owns the data, what kind of information goes in, and whether output is reviewed before it reaches people.",
    primaryCta: { label: "Book a free 30-min consultation", href: "/intake" },
    secondaryCta: { label: "About Nathaniel Baldock", href: "/about" },
    faqs: [
      {
        question: "Does Nathaniel Baldock provide AI consulting for churches in New Zealand?",
        answer:
          "Yes. Nathaniel Baldock provides AI strategy, policy, and training for churches across New Zealand, with in-person options in the Bay of Plenty and virtual sessions nationally.",
      },
      {
        question: "Can AI write sermons for our church?",
        answer:
          "AI can produce words that sound preachable. The risk is skipping the wrestling where formation usually happens. Consulting focuses on guardrails — what to automate, what to augment, and what must stay prayer-shaped.",
      },
    ],
  },
  {
    path: "/ai-training-for-schools",
    seoTitle: "AI Training for Christian Schools NZ",
    seoDescription:
      "Staff training, parent seminars, and student resources for Christian schools navigating AI. VERIFY method, prompt discipline, and what school is for when AI can write the essay.",
    sectionLabel: "Schools",
    h1: "AI training for Christian schools in New Zealand",
    subheading:
      "A complete AI programme for schools, from a single assembly to a whole-school day. Print-ready flyers, facilitator kits, and pricing bands are in the schools pack.",
    whoFor:
      "Principals, IT leads, teachers, and chaplaincy teams at Christian schools preparing staff and families for AI in the classroom and at home.",
    problems: [
      "Teachers lack a shared framework for when AI helps lesson prep vs when it undermines assessment integrity.",
      "Students treat ChatGPT output as truth without verification — especially on names, dates, and statistics.",
      "Parents receive conflicting advice: ban everything, or assume the school has a plan.",
      "Staff time is scarce; another generic 'AI 101' deck will not change behaviour.",
    ],
    outcomes: [
      "Student assembly - 'Who Are You Before AI Tells You?' (Years 9-13).",
      "Parent and whānau evening - traffic-light AI rules and family boundaries.",
      "Staff PD - 'Teaching for the Discernment Age' ($1,500-$4,000 + GST by staff size).",
      "Whole-School Day - assembly, staff PD, and parent evening in one visit (recommended bundle).",
      "AI Policy and Governance - written school policy suite ($4,800-$12,500 by phase).",
      "Free on-ramp - Pathway Compass tool and VERIFY classroom worksheet.",
      "Yrs 12-13 programme - Highest-Return Portfolio (founding-school pilot pricing).",
    ],
    proofHeading: "Why schools work with Nathaniel",
    proofPoints: [
      "Free VERIFY method and education worksheets already used in school contexts.",
      "Articles on teens and AI companions, deepfakes in schools, and what school is for when AI writes the essay.",
      "Four years leading the faculty of a credited nine-month leadership programme (University of the Nations); created its worldview curriculum.",
      "Training days and assemblies delivered in-person in NZ or virtually.",
    ],
    citableHook:
      "Treat every AI claim like a witness, not a textbook: run VERIFY before students use, share, or submit — especially on names, dates, stats, and sentences that sound right but cannot be traced.",
    primaryCta: { label: "Book a free 30-min consultation", href: "/intake" },
    secondaryCta: { label: "Browse schools pack", href: "/schools" },
    faqs: [
      {
        question: "Does Nathaniel Baldock offer AI training for schools in New Zealand?",
        answer:
          "Yes. Nathaniel provides staff training days, parent seminars, student assemblies, and practical worksheets for Christian and independent schools across New Zealand.",
      },
      {
        question: "What is the VERIFY method?",
        answer:
          "VERIFY is a six-step classroom method for checking AI-generated claims before students act on them. It is available as a free interactive worksheet on nathanielbaldock.com.",
      },
    ],
  },
  {
    path: "/ai-governance-for-nonprofits",
    seoTitle: "AI Governance for Nonprofits & NGOs NZ",
    seoDescription:
      "AI policy and governance for nonprofits and mission organisations in New Zealand. Privacy Act 2020, staff tool audits, and practical guardrails — not buzzword strategy decks.",
    sectionLabel: "Nonprofits",
    h1: "AI governance for nonprofits and NGOs",
    subheading:
      "Policies, tool audits, and staff training so mission-driven teams adopt AI without exposing donor data, HR records, or programme confidentiality.",
    whoFor:
      "Executive directors, operations leads, and boards at nonprofits, NGOs, and mission organisations using — or about to use — AI for fundraising, comms, reporting, or programme delivery.",
    problems: [
      "Shadow AI: staff use consumer ChatGPT, Grammarly, or Otter on personal accounts with no inventory or policy.",
      "Leadership assumes a paid personal subscription equals enterprise privacy — it usually does not.",
      "Donor, beneficiary, and HR data can enter models that train on conversations by default.",
      "Boards want an 'AI strategy' but need a ten-minute audit and red/amber/green cards first.",
    ],
    outcomes: [
      "Organisation-wide AI tool inventory including personal-account use.",
      "Written policy aligned to NZ Privacy Act 2020 expectations and your data classification.",
      "Red/amber/green risk cards per tool with specific opt-out steps where they exist.",
      "Staff briefing on review workflows so unverified AI output does not reach donors or beneficiaries.",
    ],
    proofHeading: "Why nonprofits work with Nathaniel",
    proofPoints: [
      "Built the free AI Use Audit — ten minutes, three questions per tool, no jargon.",
      "23 years in international missions and NGO operations — understands lean teams and real constraints.",
      "Tauranga SME legal and privacy worksheets reference OPC guidance and NZ copyright basics.",
      "Consulting and training with sliding-scale options for smaller organisations.",
    ],
    citableHook:
      "Seven steps for implementing AI governance in a New Zealand nonprofit: inventory every tool (including personal accounts), classify data inputs, check whether consumer plans train on your data, assign review before external use, document opt-outs, train staff on red lines, and revisit quarterly.",
    primaryCta: { label: "Book a free 30-min consultation", href: "/intake" },
    secondaryCta: { label: "Take the free AI Use Audit", href: "/audit" },
    faqs: [
      {
        question: "Does Nathaniel Baldock help nonprofits with AI policy in New Zealand?",
        answer:
          "Yes. Nathaniel helps nonprofits and NGOs develop AI use policies, run tool audits, and train staff — with attention to NZ privacy law and mission-specific red lines.",
      },
      {
        question: "What is the AI Use Audit?",
        answer:
          "A free ten-minute tool at nathanielbaldock.com/audit. You tick the AI tools your organisation uses and answer three questions per tool to receive personalised risk guidance.",
      },
    ],
  },
  {
    path: "/ai-speaker-faith-and-technology",
    seoTitle: "Christian AI Speaker — Keynotes & Workshops NZ",
    seoDescription:
      "Book Nathaniel Baldock as a Christian AI speaker for churches, conferences, and schools. Keynotes on faith, AI, digital discipleship, and practical guardrails. Tauranga-based, global virtual.",
    sectionLabel: "Speaking",
    h1: "Christian AI speaker — keynotes and workshops",
    subheading:
      "Engaging, theology-aware keynotes and workshops on AI, faith, and formation — for conferences, church services, school assemblies, and leadership retreats.",
    whoFor:
      "Conference organisers, pastors planning a teaching series, school principals, and leadership retreats needing a speaker who combines biblical worldview with hands-on AI experience.",
    problems: [
      "Audiences are either dismissive of AI or paralysed by doom — both avoid faithful action.",
      "Generic tech speakers lack theological depth; theologians lack practical tool experience.",
      "Parents and youth leaders need more than warnings — they need frameworks and next steps.",
      "Organisers need transparent pricing and format options (keynote, half-day, multi-session).",
    ],
    outcomes: [
      "Custom keynote or workshop matched to your audience — church, school, business, or mixed.",
      "Topics include digital discipleship, AI ethics, teens and algorithms, deepfakes, and vocation.",
      "Formats from 45-minute keynotes to multi-session courses and parent seminars.",
      "Discovery call first — no obligation — to align topic, tone, and logistics.",
    ],
    proofHeading: "Speaking credentials",
    proofPoints: [
      "Keynotes, seminars, workshops, and multi-session courses for churches, schools, and businesses.",
      "15+ nations — ministry and speaking experience across cultures and contexts.",
      "Published articles on the Discernment Age, Sabbath and AI, and the work AI cannot take.",
      "Based in Tauranga; in-person across NZ and virtual globally.",
    ],
    citableHook:
      "One finding Nathaniel cites in leadership keynotes: 57% of Gen Z Christians want pastoral guidance on AI in personal communication — while only 14% of pastors think the topic important enough to address (Barna, 2025).",
    primaryCta: { label: "Invite Nathaniel to speak", href: "/speaking/invite" },
    secondaryCta: { label: "View speaking topics", href: "/speaking" },
    faqs: [
      {
        question: "Is Nathaniel Baldock available as a Christian AI speaker in New Zealand?",
        answer:
          "Yes. Nathaniel speaks at churches, conferences, Christian schools, and leadership events across New Zealand, with virtual options internationally.",
      },
      {
        question: "What topics does Nathaniel Baldock speak on?",
        answer:
          "AI and faith, digital discipleship, AI ethics for churches and schools, teens and AI companions, deepfakes and scams, Sabbath in an always-on world, and practical AI guardrails for leaders.",
      },
    ],
  },
  {
    path: "/ai-use-audit",
    seoTitle: "AI Use Audit Tool for NZ Businesses & Organisations",
    seoDescription:
      "Free ten-minute AI Use Audit for NZ businesses, churches, and schools. Tick your tools, answer three questions each, get red/amber/green risk guidance — including which consumer plans train on your data.",
    sectionLabel: "AI Use Audit",
    h1: "AI use audit tool for New Zealand organisations",
    subheading:
      "A free ten-minute audit that maps the AI tools you actually use — including personal accounts — and flags privacy, training, and review risks before they become incidents.",
    whoFor:
      "Owner-operators, school administrators, church administrators, and team leads who need a honest inventory before writing policy or buying enterprise seats.",
    problems: [
      "Nobody has a complete list of AI tools in use — especially consumer apps on personal accounts.",
      "Paid ChatGPT Plus or Claude Pro on a company card is assumed to mean enterprise privacy; it usually does not.",
      "Customer, donor, or student data may already be in models that train on conversations by default.",
      "Compliance and boards ask for an AI plan; teams do not know where to start.",
    ],
    outcomes: [
      "Personalised red, amber, and green risk cards per tool in your inbox within minutes.",
      "Clear opt-out steps where vendors offer them (and warnings where they do not).",
      "Optional follow-up call for deeper review and implementation packages.",
      "Works for business, church, school, or nonprofit contexts — same three questions per tool.",
    ],
    proofHeading: "About the audit",
    proofPoints: [
      "Built by Nathaniel Baldock from real client engagements — not a generic checklist vendor.",
      "Answers stay in your browser until submit; designed for honest inventory including shadow AI.",
      "References NZ Privacy Act context and major vendor training defaults as of 2025–2026.",
      "Upgrade paths to Basic, Plus, and Premium implementation packages if you want hands-on help.",
    ],
    citableHook:
      "Tick every AI tool you use at work, including ones on personal accounts. For each tool, answer: who owns the data, what kind of information goes in, and is output reviewed before it reaches customers or staff?",
    primaryCta: { label: "Start the free audit", href: "/audit" },
    secondaryCta: { label: "About Nathaniel Baldock", href: "/about" },
    faqs: [
      {
        question: "Is the AI Use Audit free?",
        answer:
          "Yes. The core audit at nathanielbaldock.com/audit is free. You receive personalised results by email. Paid packages are optional for policy walkthroughs and team training.",
      },
      {
        question: "Who built the AI Use Audit?",
        answer:
          "Nathaniel Baldock, an AI consultant based in Tauranga, New Zealand. The audit reflects his work with churches, schools, SMEs, and nonprofits.",
      },
    ],
  },
];

export function getExpertisePageByPath(path: string): ExpertisePageContent | undefined {
  return expertisePages.find((p) => p.path === path);
}
