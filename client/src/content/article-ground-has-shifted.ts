/**
 * Structured content for "Something Has Changed. You Are Not Imagining It."
 */

export const articleMeta = {
  slug: "something-has-changed-you-are-not-imagining-it",
  title: "Something Has Changed. You Are Not Imagining It.",
  subtitle:
    "The public conversation on AI offers you two options: it is nothing to worry about, or it is the end of everything. Both are a way of not thinking. Here is an attempt at something more honest.",
  description:
    "If AI disorientation feels impossible to name, you are not imagining it. Why capability is outpacing opinion, what the shift from the Information Age to the Discernment Age means for leaders, and the pastoral gap Barna's research reveals in the church.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-08",
  modifiedDate: "2026-05-08",
  readTime: "9 min",
  category: "AI & Faith",
  image: "/images/ground-has-shifted-header.jpg",
  canonicalUrl:
    "https://www.nathanielbaldock.com/resources/something-has-changed-you-are-not-imagining-it",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "Many leaders carry a low-level disorientation about AI they cannot quite name. The public conversation offers dismissal or doom — neither helps on Monday, and neither matches what responsibility for other people actually feels like.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Why frontier AI capability has been doubling roughly every seven months — and why feeling behind is a noise problem, not a knowledge problem. How AI differs from prior technology waves by targeting cognition and judgment. The shift from the Information Age to the Discernment Age. Barna data on trust in AI spiritual advice versus pastoral guidance. What the weight of the moment asks of your specific calling.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Stop treating disorientation as personal failure; the framework is moving faster than settled opinion.",
      "Name the real shift: advantage moves from access to information toward discernment — what matters, what is true, what to do.",
      "See the pastoral gap as opportunity: congregants want guidance on AI; most pastors have not yet addressed it.",
      "Sit with the question your role is asking now — not a generic checklist — before the next article in the series.",
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
        text: "Most of the public conversation about AI gives you two options. It is nothing, or it is the end. The dismissal feels calm and grown-up. The alarm feels alert and serious. Neither of them tells you what to do on Monday, and neither of them is particularly useful to someone who carries responsibility for other people and is trying to figure out what they are actually looking at.",
      },
      {
        type: "paragraph",
        text: "If you have been sitting with a low-level disorientation about AI that you cannot quite put into words, that is a reasonable response to what is actually happening. The problem is not that you are slow. The problem is that the thing is moving faster than any framework can comfortably track.",
      },
      {
        type: "paragraph",
        text: "Here is the thing the public conversation keeps missing. AI capability has been doubling every seven months for the past six years. That is not a prediction or a tech-optimist projection. It is a measured trend across frontier model evaluations, tracked by METR (Model Evaluation and Threat Research) as of March 2025. By the time most leaders have formed a settled opinion about what AI is and what it can do, the thing they formed an opinion about no longer exists.",
      },
      {
        type: "punchline",
        text: "So if you feel behind, that is the honest starting point. You are not behind because you are slow. You are behind because you have been trying to solve a noise problem as if it were a knowledge problem. More information will not fix it. A clearer framework for what you are actually looking at might.",
      },
    ],
  },
  {
    id: "not-software-story",
    title: "This is not a software story",
    blocks: [
      {
        type: "paragraph",
        text: "Every major technology has reshaped the institutions it entered. Agriculture changed where people lived and how they organised around land. The Industrial Revolution replaced physical labour and produced the working class. The internet democratised information access and disrupted anyone whose advantage rested on knowing more than others.",
      },
      {
        type: "paragraph",
        text: "AI is different in one specific way that I think we have not named clearly enough. Every previous wave of technology came for muscle, or came for logistics, or came for information access. AI is coming for cognition, coordination, and judgment. The tasks that were supposed to be safe. The work that white-collar professionals have been telling themselves was immune.",
      },
      {
        type: "paragraph",
        text: "That does not mean everything collapses. It does mean the question sitting in front of us is larger than most of the conversations I am hearing would suggest. The Stanford Digital Economy Lab tracked ADP payroll data across millions of US workers and found that entry-level software developers aged 22-25 saw a nearly {{stat:20:%}} employment decline from their 2022 peak by mid-2025, while older workers in the same roles grew {{stat:6:}}–{{stat:9:%}} over the same period.",
      },
      {
        type: "quote",
        text: "Erik Brynjolfsson et al., \"Canaries in the Coal Mine,\" Stanford Digital Economy Lab, August 2025. Based on ADP payroll data covering millions of workers.",
        attribution: "digitaleconomy.stanford.edu",
      },
      {
        type: "punchline",
        text: "That is not a blip. It is a pattern worth understanding, particularly for anyone responsible for the next generation of workers, students, or ministry leaders.",
      },
    ],
  },
  {
    id: "shift-nobody-talking",
    title: "The shift nobody is talking about",
    blocks: [
      {
        type: "paragraph",
        text: "There is a slide in my Tauranga seminar that I keep coming back to because I think it captures something that most of the AI conversation misses entirely. It describes a transition from what I call the Information Age to what I think we should call the Discernment Age.",
      },
      {
        type: "paragraph",
        text: "In the Information Age, the leader with the most relevant knowledge held the advantage. Access was scarce. Research took time. Expertise was currency. That world is gone.",
      },
      {
        type: "paragraph",
        text: "In a world where AI can generate information on demand, information is abundant and essentially free. Anyone with a smartphone now has research support that previously required a team. The advantage shifts entirely to those who can judge what matters, what is true, and what to do about it.",
      },
      {
        type: "quote",
        text: "The definition of wisdom is having a more holistic picture and actually acting with restraint and mindfulness and care.",
        attribution: "Tristan Harris · The Diary of a CEO · Centre for Humane Technology",
      },
      {
        type: "paragraph",
        text: "That is worth sitting with. AI can generate information on demand. It cannot generate wisdom on demand. That is still yours. The question is whether you are developing it.",
      },
    ],
  },
  {
    id: "gap-churches",
    title: "The gap in our churches",
    blocks: [
      {
        type: "paragraph",
        text: "The research that has stayed with me longest is from Barna's 2026 work on AI and the church. Close to one in three US adults say that spiritual advice from AI is as trustworthy as advice from a pastor. Among Gen Z that rises to {{stat:39:%}}. Among Millennials to {{stat:40:%}}.",
      },
      {
        type: "paragraph",
        text: "And there is a companion finding. {{stat:57:%}} of Gen Z Christians say they want guidance from their pastor on how to use AI in personal communication. Only {{stat:14:%}} of pastors think that topic is important enough to address.",
      },
      {
        type: "quote",
        text: "Barna Group / Gloo, \"State of the Church 2026\" (survey of 1,514 US adults, November 2025).",
        attribution: "barna.com",
      },
      {
        type: "quote",
        text: "Their views are shifting and remain largely uninformed by their pastor. There's a real opportunity here for pastors to disciple their congregants on how to use this technology in a beneficial way.",
        attribution: "Daniel Copeland, Barna Group",
      },
      {
        type: "paragraph",
        text: "I want to sit with that word \"opportunity\" for a moment, because I think it is the right framing and we keep missing it. The conversation in most Christian circles has been either anxious or dismissive. What Barna is pointing to is a different option: engaged, present, pastorally informed leadership in a moment when the people you serve are working through this largely without you.",
      },
      {
        type: "paragraph",
        text: "And beyond the pastoral gap, the numbers are further along than the conversation. One in {{stat:8:}} US adolescents are now using AI chatbots for mental health advice, according to a 2025 RAND/JAMA Network Open study. The young people in your community are not waiting for the church to get ready.",
      },
      {
        type: "quote",
        text: "RAND / JAMA Network Open, November 2025. Study on adolescent AI chatbot use for mental health.",
        attribution: "jamanetwork.com",
      },
    ],
  },
  {
    id: "weight",
    title: "What the weight of it asks",
    blocks: [
      {
        type: "paragraph",
        text: "I do not want to end with a list of action steps, because I do not think steps are what is missing. What is missing is the weight of the moment.",
      },
      {
        type: "paragraph",
        text: "Once you have sat with the fact that this is not a software story, that the leadership advantage has shifted from knowing to discerning, and that the people in your church or business or school are already working through this without much guidance, you do not need five steps. You need the question that your specific role and calling is asking of you right now.",
      },
      {
        type: "punchline",
        text: "The ground has shifted. That is not a cause for panic. But it does mean you are standing somewhere different than you were five years ago, whether or not you have noticed the move yet.",
      },
      {
        type: "paragraph",
        text: "The next question is what you do from here.",
      },
    ],
  },
  {
    id: "series",
    title: "This series",
    blocks: [
      {
        type: "paragraph",
        text: "This is the first in a four-part series on AI, faith, and leadership. Part 1 — this article — names the ground we are standing on: capability moving faster than opinion, cognition under pressure, and the shift toward discernment as the scarce leadership skill.",
      },
      {
        type: "paragraph",
        text: "Part 2, \"The Question Nobody Is Asking About AI,\" goes inside what AI is doing to us — formation, attention, and the questions we have been avoiding. Part 3, \"The Work That AI Cannot Take,\" offers a practical framework for leading through the transition without pretending the old playbook still applies. Part 4, \"In a World of Fakes, the Church Has Something Rare,\" turns to faithful leadership from Monday onwards — presence, trust, and mission when synthetic content is everywhere.",
      },
    ],
  },
];

export const sourcesList = [
  "Barna Group / Gloo. (2025). State of the Church 2026: Trends Report. Survey of 1,514 US adults, November 2025. https://www.barna.com/research/state-of-the-church-2026-trends/",
  "Barna Group. (2024). Pastors and AI: Three Takeaways. Survey of 278 US Protestant senior pastors. https://www.barna.com/research/pastors-use-ai/",
  "Brynjolfsson, E., Chandar, A., & Chen, D. (2025). Canaries in the Coal Mine: AI and Entry-Level Employment. Stanford Digital Economy Lab, August 2025. https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf",
  "Harris, T. (2025). The Diary of a CEO [Podcast]. Centre for Humane Technology.",
  "McKinsey Global Institute. (2024). A New Future of Work: The Race to Deploy AI and Raise Skills. https://www.mckinsey.com/mgi/our-research/a-new-future-of-work",
  "METR — Model Evaluation & Threat Research. (2025). Tracking AI Capability Trends. https://metr.org",
  "RAND Corporation / JAMA Network Open. (2025). Adolescent use of AI chatbots for mental health support. November 2025. https://jamanetwork.com",
];

/** A note on how I wrote this article */
export const authorNote =
  "I used Google NotebookLM to gather and organise research across my source library, including Barna Group, Stanford Digital Economy Lab, METR, and RAND/JAMA reporting. Claude Sonnet (Anthropic) helped structure an outline and draft initial prose; I revised and rewrote the final article so it reflects my own voice, theology, and convictions. I use AI as a drafting tool, not as the author — and I take full responsibility for what is published here, including any errors of fact or attribution.";
