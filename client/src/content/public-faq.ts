/** Shared Q&A for Live panel, static FAQ, and FAQPage JSON-LD. */
export type PublicFaqCategory = "faith" | "families" | "education" | "work";

export interface PublicFaqItem {
  id: string;
  category: PublicFaqCategory;
  question: string;
  answer: string;
  /** Optional deep link to article or worksheet. */
  resourceHref?: string;
  resourceLabel?: string;
}

export const publicFaqCategoryMeta: Record<
  PublicFaqCategory,
  { title: string; description: string }
> = {
  faith: {
    title: "Faith",
    description:
      "Sabbath, formation, and ministry — when AI helps and when it quietly replaces prayer, struggle, or the work of the Spirit.",
  },
  families: {
    title: "Families",
    description:
      "Parenting, teens, household boundaries, deepfakes, and scams — practical discernment for Christian homes.",
  },
  education: {
    title: "Education",
    description:
      "Schools and students — truth-checking, thinking before prompting, and what school is for when AI can write the essay.",
  },
  work: {
    title: "Work",
    description:
      "Small business and teams — where AI saves real time, and how to talk honestly with staff about change.",
  },
};

export const publicFaqCategoryOrder: PublicFaqCategory[] = [
  "faith",
  "families",
  "education",
  "work",
];

export const publicFaqItems: PublicFaqItem[] = [
  {
    id: "sabbath-ai-fatigue",
    category: "faith",
    question: "AI saves me an hour a day. Why do I feel more exhausted, not less?",
    answer:
      "Because the tools don't sleep — and neither do the expectations around you. That recovered hour isn't spare capacity; it's a gift. Sabbath is where you learn to stop filling it.",
    resourceHref: "/resources/sabbath-rest-in-the-age-of-ai",
    resourceLabel: "Read the article",
  },
  {
    id: "frictionless-faith",
    category: "faith",
    question: "Can I use AI to write my sermon or devotional?",
    answer:
      "It might be preachable. The risk is you skip the wrestling where the Holy Spirit usually does the work. Grace isn't opposed to effort — it's opposed to outsourcing formation to a machine.",
    resourceHref: "/resources/why-your-soul-needs-the-struggle",
    resourceLabel: "Read the article",
  },
  {
    id: "think-without-assistance",
    category: "faith",
    question: "When did I last make a hard decision without asking AI first?",
    answer:
      "Notice what your hand reaches for in the first four seconds — that shapes what you trust most. Some things should stay prayer-shaped, not prompt-shaped.",
    resourceHref: "/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket",
    resourceLabel: "Read the article",
  },
  {
    id: "teens-ai-friend",
    category: "families",
    question: "My teenager talks to an AI like it's a close friend. Should I be worried?",
    answer:
      "Yes — but not because they're bad with tech. One in eight teens already use AI for mental health advice, and the bot is engineered to agree. The question is who gets the 2am conversation now.",
    resourceHref: "/resources/when-your-teens-best-friend-is-an-algorithm",
    resourceLabel: "Read the article",
  },
  {
    id: "who-raising-kids",
    category: "families",
    question: "We're a Christian family. Isn't church enough to shape our kids?",
    answer:
      "Church matters — but influence doesn't stop at the youth group door. Map who's actually raising them right now: algorithms, peers, coaches, creators. Then choose what stays.",
    resourceHref: "/resources/worksheet/family-who-is-raising-our-kids",
    resourceLabel: "Open the worksheet",
  },
  {
    id: "digital-god-deep-dive",
    category: "families",
    question: "Is AI really just another app in their pocket?",
    answer:
      "Some of its builders use theological language about what they're making. For parents, the sharper question is simpler: who is discipling your children — you, or the machine designed to never say no?",
    resourceHref: "/resources/worksheet/the-digital-god-in-your-childs-pocket",
    resourceLabel: "Listen to the deep dive",
  },
  {
    id: "deepfakes-verify",
    category: "families",
    question: "Someone sent a video of a leader saying something outrageous. How do we know it's real?",
    answer:
      "Don't share it first. Check lip sync, odd angles, and whether real news outlets are reporting it. If it's a panicked phone call — hang up and call back on a number you already trust.",
    resourceHref: "/resources/christian-professional/deepfakes-digital-truth-2026",
    resourceLabel: "Deepfakes & digital truth guide",
  },
  {
    id: "family-ai-agreement",
    category: "families",
    question: "What rules should we set for ChatGPT at home?",
    answer:
      "Don't hand down a policy over dinner. Co-create it — phones in the middle, everyone gets a say, revisit in three months. Rules made together are rules kids actually keep.",
    resourceHref: "/resources/worksheet/family-ai-agreement",
    resourceLabel: "Family AI agreement worksheet",
  },
  {
    id: "safe-phrase",
    category: "families",
    question: "What if we get a scam call that sounds exactly like Mum?",
    answer:
      "Agree a family safe phrase now. Voice cloning makes sounds like them worthless without it.",
    resourceHref: "/resources/worksheet/presentations-ai-prep-safe-phrase-protocol",
    resourceLabel: "Safe phrase protocol",
  },
  {
    id: "verify-method",
    category: "education",
    question: "My student used ChatGPT for research. How do we know what's true?",
    answer:
      "Treat every AI claim like a witness, not a textbook. Run VERIFY before they use, share, or submit — especially on names, dates, stats, and sounds-right sentences.",
    resourceHref: "/resources/worksheet/edu-verify-method",
    resourceLabel: "The VERIFY method",
  },
  {
    id: "what-is-school-for",
    category: "education",
    question: "If AI can write the essay, what's school actually for?",
    answer:
      "Retrieval isn't formation. School is still where students learn to think, struggle, belong, and become someone — not just produce output faster.",
    resourceHref: "/resources/worksheet/edu-what-is-school-for",
    resourceLabel: "Student reflection worksheet",
  },
  {
    id: "prompt-engineering",
    category: "education",
    question: "Doesn't AI mean students don't have to think anymore?",
    answer:
      "It's the opposite: AI is a mirror of thinking quality. Think on paper first — then type the prompt.",
    resourceHref: "/resources/worksheet/edu-prompt-engineering",
    resourceLabel: "Prompt engineering workshop",
  },
  {
    id: "tauranga-time-audit",
    category: "work",
    question: "Everyone says we need an AI strategy. Where do we even start?",
    answer:
      "Not with a strategy deck — with your actual week on paper. Pick one task AI genuinely helps, one tool, one week. One use case beats ten subscriptions.",
    resourceHref: "/resources/worksheet/tauranga-sme-time-audit",
    resourceLabel: "Tauranga SME time audit",
  },
  {
    id: "tauranga-team",
    category: "work",
    question: "Should we tell staff AI might replace roles?",
    answer:
      "Have the conversation honestly — upskilling, redeployment, what stays human — before rumour does it for you.",
    resourceHref: "/resources/worksheet/tauranga-sme-team",
    resourceLabel: "Team conversation guide",
  },
];

/** Live panel typing animation (question + answer only). */
export const publicFaqDialogue = publicFaqItems.map(({ question, answer, resourceHref, resourceLabel }) => ({
  q: question,
  a: answer,
  resourceHref,
  resourceLabel,
}));

/** Hero dock — representative mix; shorter rotation than full FAQ list. */
const publicFaqHeroDialogueIds = [
  "sabbath-ai-fatigue",
  "teens-ai-friend",
  "verify-method",
  "tauranga-time-audit",
  "frictionless-faith",
  "tauranga-team",
] as const;

export const publicFaqHeroDialogue = publicFaqHeroDialogueIds.map((id) => {
  const item = publicFaqItems.find((i) => i.id === id)!;
  return {
    q: item.question,
    a: item.answer,
    resourceHref: item.resourceHref,
    resourceLabel: item.resourceLabel,
  };
});
