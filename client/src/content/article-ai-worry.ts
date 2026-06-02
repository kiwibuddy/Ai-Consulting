/**
 * Structured content for "The Calm Middle: How Worried Should You Actually Be About AI?"
 */

export const articleMeta = {
  slug: "how-worried-should-you-be-about-ai",
  title: "The Calm Middle: How Worried Should You Actually Be About AI?",
  subtitle:
    "The public conversation gives you two options: it is nothing, or it is the end. Here is a third — and what to do about it this week.",
  description:
    "How worried should you be about AI? A calm middle path between dismissal and doom: what Level 1 actually looks like, practical household steps, and why preparation pays off no matter which forecast is right.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-01",
  modifiedDate: "2026-06-03",
  readTime: "5 min",
  category: "AI & Safety",
  image: "/images/ai-worry-header.jpg",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/how-worried-should-you-be-about-ai",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "Headlines pitch AI as either nothing to worry about or civilisational collapse. Both extremes avoid the harder question: what should you actually do on Monday?",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "A five-level framing borrowed from emergency management. Where we are now (Level 1): real harms, especially voice-cloning fraud. Specific, cheap actions that help regardless of the forecast. The honest case that optimists might be right — and why that does not make preparation wasteful.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Set up a family safe phrase and have the conversation with your parents.",
      "Add hardware security keys to email, bank, and government logins.",
      "Move family chats to an encrypted app; keep a few months of expenses in reserve.",
      "Protect sustained attention — yours and your children's — as the capacity AI most readily erodes.",
    ],
  },
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "punchline"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "discussion"; questions: string[] }
  | { type: "subheading"; text: string };

export interface ArticleSection {
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export const articleSections: ArticleSection[] = [
  {
    id: "intro",
    title: "Introduction",
    blocks: [
      {
        type: "paragraph",
        text: "The public conversation about artificial intelligence gives you two options: it is nothing, or it is the end. Both are a way of not thinking. Here is a third.",
      },
      {
        type: "paragraph",
        text: 'If a friend asked you over coffee this weekend, "How worried should I be about AI, and what should I actually do?", could you answer without sliding into either dismissal or doom?',
      },
      {
        type: "paragraph",
        text: "Most of us cannot, and that is not a personal failing. It is what happens when every headline is pitched at one of two extremes and almost nothing is pitched at the middle. The dismissal feels calm and grown-up. The doom feels alert and serious. Neither tells you what to do on Monday.",
      },
      {
        type: "paragraph",
        text: "There is a better way to think about this, and it is borrowed from how governments already think about earthquakes, pandemics, and infrastructure failure. Not all bad scenarios are equally likely or equally bad, so you sort them into levels. Level 1 is roughly where we are now: AI is a genuinely powerful tool, the harms are real but contained, and daily life is recognisable. Level 5 is the civilisational catastrophe that gets the headlines. The levels in between are the territory where actual preparation happens.",
      },
      {
        type: "punchline",
        text: "The single most useful thing this framing does is separate two questions that the doom-or-nothing conversation keeps mashed together: how likely is the worst case, and what should I do this week. The answer to the first is genuinely uncertain. The answer to the second is not.",
      },
    ],
  },
  {
    id: "where-we-are",
    title: "Where we actually are",
    blocks: [
      {
        type: "paragraph",
        text: "Start with the honest version of the present. AI can write competently, code, summarise, and pass exams that used to certify expertise. It also still makes things up, fails at long tasks, and cannot do most physical or relational work. Documented AI-related incidents rose {{stat:55:%}} from 2024 to 2025 — which is a real trend and not yet a daily-life crisis.",
      },
      {
        type: "quote",
        text: "The 2026 International AI Safety Report — backed by more than 30 governments and chaired by Turing Award winner Yoshua Bengio — documents {{stat:362: AI-related incidents}} in 2025, up from 233 in 2024.",
        attribution: "internationalaisafetyreport.org",
      },
      {
        type: "paragraph",
        text: "The harm that has already arrived at scale is fraud. Voice cloning now needs about three seconds of audio, and the losses are large and falling hardest on older people. This is not a future risk. It is happening to someone's parents this week.",
      },
      {
        type: "quote",
        text: "The FBI's Internet Crime Complaint Center reported roughly US$893 million in AI-related fraud losses in 2025. Adults aged 60 and over lost about US$7.7 billion to fraud across all categories in 2025, up roughly 60% on the year before. AARP's research suggests one in five Americans aged 65+ has been targeted by an AI voice-cloning scam.",
        attribution: "ic3.gov · aarp.org/money/scams-fraud",
      },
      {
        type: "punchline",
        text: "That is the texture of Level 1. Not collapse. Not nothing either. A powerful new force, unevenly distributed, with a few sharp edges that are already drawing blood.",
      },
    ],
  },
  {
    id: "what-to-do",
    title: "What to actually do",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the part the doom-or-nothing conversation never reaches, because dismissal says there is nothing to do and doom says there is nothing that would help. Both are wrong. The useful actions are specific, cheap, and they make you better off no matter which way AI develops.",
      },
      {
        type: "paragraph",
        text: "Set up a family safe phrase: a few unrelated words, shared out loud and never written down, that any caller asking for money has to be able to say. It takes ten minutes and it defeats nearly every voice-cloning scam. Then have the same conversation with your parents, which is the highest-value half hour in this entire piece.",
      },
      {
        type: "paragraph",
        text: "Put a hardware security key on your email, your bank, and your government login. Move family chats to an encrypted app like Signal. Keep a few months of expenses in reserve and physical copies of your important documents somewhere dry. None of this is exotic. It is what every emergency-management agency already tells you to do, with one new line item for the age of cloned voices.",
      },
      {
        type: "paragraph",
        text: "Then the quieter work, which matters more than it sounds. Protect your own capacity for sustained attention, and your children's especially, because the thing AI most readily erodes is the ability to think slowly and unaided. Read physical books. Keep one screen-free day. Know your neighbours by name, because every honest study of how communities survive disruption finds the same thing: relationships predict resilience, not stockpiles. Engage once with somewhere AI policy is being decided near you — a school board, a council, a church. Individual voices carry further now than they will later.",
      },
    ],
  },
  {
    id: "counterweight",
    title: "The honest counterweight",
    blocks: [
      {
        type: "paragraph",
        text: "It would be dishonest to end without saying that this framing could be too alarmed. A serious case exists that AI is following the ordinary path of every general-purpose technology, electricity and the internet included, and that today's anxiety is mostly pattern-matching to old fears. Careful labour-market studies through 2025 found limited measurable job displacement so far.",
      },
      {
        type: "paragraph",
        text: "The people whose profession is forecasting put the odds of a true civilisational catastrophe low — well under one percent for the most calibrated group.",
      },
      {
        type: "quote",
        text: "The Forecasting Research Institute ran a structured tournament with 169 experts and superforecasters estimating the chance of an AI-caused catastrophe by 2100. AI domain experts gave a median of about 6%. General risk experts gave about 1%. Superforecasters gave about 0.4%.",
        attribution: "forecastingresearch.org/xpt",
      },
      {
        type: "paragraph",
        text: "Hold that genuinely. It might be Level 0.5, not Level 1. But notice that none of the actions above become wrong if the optimists are right. A family safe phrase, a security key, a few months of savings, unhurried attention, neighbours you can call: that is just a good life, lightly fortified. The framing earns its keep precisely because it does not ask you to bet on a forecast.",
      },
      {
        type: "punchline",
        text: "The worst response to AI is not fear and it is not dismissal. It is paralysis dressed up as one of those two.",
      },
      {
        type: "paragraph",
        text: "The calm middle is available, and it asks little of you this week: one conversation, one afternoon of setup, one honest look at how you spend your attention.",
      },
      {
        type: "punchline",
        text: "Do that, and you can answer your friend over coffee.",
      },
    ],
  },
  {
    id: "go-further",
    title: "Go further",
    blocks: [
      {
        type: "paragraph",
        text: "For the practical side, four short worksheets go deeper: a 30-day onboarding plan, a household readiness checklist, the safe phrase protocol, and an analog asset log. Find them on the Resources page under Presentations.",
      },
    ],
  },
];

export const sourcesList = [
  "2026 International AI Safety Report. internationalaisafetyreport.org",
  "Federal Bureau of Investigation, Internet Crime Complaint Center (IC3). ic3.gov",
  "AARP — Money & Scams. aarp.org/money/scams-fraud",
  "Forecasting Research Institute — AI catastrophe forecasting tournament (XPT). forecastingresearch.org/xpt",
];

export const authorNote =
  "Nathaniel Baldock writes and consults on technology, faith, and being fully human in an AI world. He is based in Tauranga, New Zealand. I take full responsibility for the final article, including any errors of attribution or fact.";
