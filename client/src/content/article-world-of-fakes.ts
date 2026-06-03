/**
 * Structured content for "In a World of Fakes, the Church Has Something Rare"
 */

export const articleMeta = {
  slug: "in-a-world-of-fakes-the-church-has-something-rare",
  title: "In a World of Fakes, the Church Has Something Rare",
  subtitle:
    "The same technology that raises legitimate concern may be the greatest opportunity the church has had in a generation. Not because the concerns are wrong. Because of what those concerns make uniquely valuable.",
  description:
    "Leadership, mission, and the AI opportunity: Bible translation at scale, mentoring a generation that is economically unsettled and relationally substituting, why trustworthiness and physical presence are competitive advantages, the church as shock absorber, and a 90-day plan for faithful engagement.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-29",
  modifiedDate: "2026-05-29",
  readTime: "10 min",
  category: "AI & Faith",
  image: "/images/world-of-fakes-header.jpg",
  canonicalUrl:
    "https://www.nathanielbaldock.com/resources/in-a-world-of-fakes-the-church-has-something-rare",
  seriesNumber: 4 as const,
  seriesTotal: 4 as const,
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "AI erodes trust, presence, and constancy — yet the church has been practising the scarcest things in the current environment for two thousand years. The question is whether we will lead this moment or follow it.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Mission acceleration through translation tools. The 22–25 cohort in employment and relational crisis. Trustworthiness as competitive advantage. Social capital and the church as shock absorber. Paul's frame in Ephesians, three failure modes, and a concrete 90-day plan.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Days 1–30: Sacred Tasks exercise, honest AI audit, formation-cost review.",
      "Days 31–60: One counter-formation practice, one mentor for someone 18–35, protect one Sacred task.",
      "Days 61–90: Share learning, advocate for AI policy, write down what faithfulness looks like for you now.",
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
        text: "Part 4 of 4 · AI, faith, and leadership",
      },
      {
        type: "paragraph",
        text: "The church has been practising the rarest things in the current environment for two thousand years. It just has not named them that way yet.",
      },
      {
        type: "paragraph",
        text: "Demonstrable trustworthiness. Physical presence. Constancy through upheaval. Multigenerational community built on covenant rather than transaction. Worth that is not measured by productivity. These are not religious add-ons to a social strategy. In 2026, they are the scarcest things in the social environment. AI cannot generate any of them. The attention economy actively erodes most of them. And the church, at its best, has been doing them all along.",
      },
      {
        type: "paragraph",
        text: "This is the positive case I want to make. Not the naive version — where AI is simply a better version of previous church tech and everyone should lean in uncritically. A more specific argument: the particular disruptions AI is causing are simultaneously creating demand for exactly what the church carries.",
      },
    ],
  },
  {
    id: "two-thousand-languages",
    title: "Two thousand languages",
    blocks: [
      {
        type: "paragraph",
        text: "Let me start with the Great Commission, because I think it reframes everything else.",
      },
      {
        type: "paragraph",
        text: "Around 2,000 languages still lack a complete Bible translation. For decades, the work of organisations like Wycliffe Bible Translators and SIL International has been moving through this at a pace constrained by the complexity of the task, the availability of trained linguists, and the reach of funding. AI-assisted translation tools are now being deployed in partnership with local translators with the potential to compress timelines from decades to years.",
      },
      {
        type: "quote",
        text: "AI-assisted translation tools deployed in partnership with local translators are compressing Bible translation timelines that were previously measured in decades.",
        attribution: "Wycliffe Bible Translators, 2025 Annual Update · SIL International, partnership reporting 2025",
      },
      {
        type: "paragraph",
        text: "A pastor in rural Kenya with a smartphone now has research and teaching support that previously required access to a seminary library. In many majority-world contexts, AI is arriving as an equaliser rather than a disruptor.",
      },
      {
        type: "paragraph",
        text: "The same AI that raises the concerns in the first three articles of this series is the AI that can accelerate the mission at a scale the church has never had access to. The question is always the same: who is holding the tool, with what values, toward what end?",
      },
    ],
  },
  {
    id: "cohort-without-you",
    title: "The cohort working through this without you",
    blocks: [
      {
        type: "paragraph",
        text: "The Stanford data I mentioned in the first article places the sharpest AI-related employment disruption on workers aged 22–25 in AI-exposed fields. Entry-level software developers in that cohort saw a nearly 20% employment decline from their 2022 peak. These are people at the start of their careers, trying to find their footing in a labour market restructuring beneath them faster than any previous generation has experienced.",
      },
      {
        type: "paragraph",
        text: "That same cohort is also, according to Common Sense Media's 2025 research, the group most likely to describe an AI chatbot as a close friend. And 1 in 8 US adolescents are now using AI chatbots for mental health advice, according to a 2025 RAND/JAMA study.",
      },
      {
        type: "quote",
        text: "Entry-level software developers aged 22–25 saw a nearly 20% employment decline from their 2022 peak in AI-exposed fields; the same generation is among those most likely to treat AI chatbots as close friends or mental health support.",
        attribution:
          "Stanford Digital Economy Lab, August 2025 · Common Sense Media, 2025 · RAND/JAMA Network Open, November 2025",
      },
      {
        type: "paragraph",
        text: "What I am describing is a generation that is economically unsettled and relationally substituting. They are looking for someone who will sit with them and say: here is what I think is happening, here is what I think it means, and here is what I think you should do. That mentor role is available. In most of our churches and communities, it is largely vacant.",
      },
      {
        type: "punchline",
        text: "AI can provide information. AI can validate. AI cannot give what a formed human being with real experience, real scars, and genuine investment in another person's flourishing can give.",
      },
    ],
  },
  {
    id: "ethics-advantage",
    title: "Why ethics is now a competitive advantage",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the argument I have been making to business leaders. In an environment of deepfakes and AI-generated content, demonstrable trustworthiness is no longer assumed. It has to be earned and demonstrated, over time, in public. The organisation known to tell the truth becomes the place people turn when they genuinely need to know what is actually true.",
      },
      {
        type: "paragraph",
        text: "Physical presence has become the premium product. AI cannot show up. The leader who is consistently, reliably, visibly present — in the room, in the hard conversations, in the long seasons when nothing feels productive — has something that cannot be generated or scaled.",
      },
      {
        type: "paragraph",
        text: "Constancy is rarer than it appears. AI optimises for engagement, which means it rewards novelty, outrage, and validation. The community that stays constant through technological upheaval, same values, same people, same commitments, becomes a refuge in the truest sense of the word.",
      },
      {
        type: "paragraph",
        text: "The church has been practising all three of these for two thousand years. The technology just made visible how rare they are.",
      },
    ],
  },
  {
    id: "shock-absorber",
    title: "The church as shock absorber",
    blocks: [
      {
        type: "paragraph",
        text: "The research on disaster recovery is consistent across different events and different contexts. Communities with strong social capital — bonds of trust and obligation that exist independent of economic productivity — suffer less during major disruptions and recover faster. The evidence comes from the Christchurch earthquakes, the COVID years, and decades of international disaster sociology. FEMA's \"Whole Community\" framework and New Zealand Civil Defence's community-led model rest on the same underlying observation: a household with five reliable people in walking distance is more resilient than a household with twice the resources and no community.",
      },
      {
        type: "paragraph",
        text: "The church, at its best, is exactly that community. Multigenerational. Geographically local. Built on covenant relationship rather than transactional value. When your job disappears, when your productivity metric vanishes, when your economic identity is disrupted — the church is the community where your worth was never measured that way to begin with.",
      },
      {
        type: "punchline",
        text: "The AI disruption is a pastoral event as much as an economic one. The community that shows up for people in their hardest seasons is not a nice addition to the response strategy. It is the response strategy.",
      },
    ],
  },
  {
    id: "paul-frame",
    title: "The frame Paul gave us",
    blocks: [
      {
        type: "paragraph",
        text: 'Paul writes to the church in Ephesus: "Be very careful, then, how you live — not as unwise but as wise, making the most of every opportunity, because the days are evil" (Ephesians 5:15–16, NIV).',
      },
      {
        type: "paragraph",
        text: "He wrote those words into a specific cultural moment of crisis and opportunity. The church in Ephesus was navigating a city shaped by imperial power, religious plurality, and economic pressure. His instruction was not to retreat. It was to redeem — to buy back the time, to use the moment wisely, to act with urgency and clarity.",
      },
      {
        type: "paragraph",
        text: "The theological frame for Christian leadership in the age of AI is not fear, and it is not uncritical enthusiasm, and it is not pretending nothing has changed. It is redemption. The same city, the same moment, the same community — but used with wisdom toward the purposes of God.",
      },
      {
        type: "subheading",
        text: "Fear",
      },
      {
        type: "paragraph",
        text: "Fear produces paralysis. The leaders who respond to AI from anxiety will be reactive, late, and shaped by whatever the loudest voice is saying. You have been given a spirit not of fear but of power, love, and self-control.",
      },
      {
        type: "subheading",
        text: "Uncritical adoption",
      },
      {
        type: "paragraph",
        text: "Uncritical adoption produces its own problems. Timothy Keller's diagnosis in Counterfeit Gods applies directly: a good thing turned into an absolute value is idolatry. The efficiency gains are real. They are not the point.",
      },
      {
        type: "quote",
        text: "A good thing turned into an absolute value is idolatry.",
        attribution: "Timothy Keller, Counterfeit Gods (Dutton, 2009)",
      },
      {
        type: "subheading",
        text: "Sleepwalking",
      },
      {
        type: "paragraph",
        text: "Sleepwalking is the most common failure mode of all — continuing as if nothing has changed, hoping it will sort itself out, delegating the question to someone more technical or more alarmed. The ground has shifted. The leaders who act with clarity now will shape what their communities look like in five years.",
      },
    ],
  },
  {
    id: "ninety-day-plan",
    title: "Your 90-day plan",
    blocks: [
      {
        type: "paragraph",
        text: "The seminar I run closes with a 90-day plan, because I believe conviction without action is just knowledge, and knowledge without action is its own kind of failure.",
      },
      {
        type: "subheading",
        text: "Days 1–30: Assessment",
      },
      {
        type: "paragraph",
        text: "Complete the Sacred Tasks exercise for your own role. Name your current level of AI engagement honestly. Audit what you are already using AI for and ask what it is costing in formation terms.",
      },
      {
        type: "subheading",
        text: "Days 31–60: Implementation",
      },
      {
        type: "paragraph",
        text: "Introduce one counter-formation practice into your community's rhythms. Identify one person aged 18–35 in your sphere who most needs a mentor who understands what is happening. Protect one task you were on the verge of automating because the struggle is the point.",
      },
      {
        type: "subheading",
        text: "Days 61–90: Advocacy",
      },
      {
        type: "paragraph",
        text: "Share what you have learned with one other leader in your network. Advocate for an AI policy in your church or organisation. Write down what faithfulness looks like for you specifically in this season. Not generically. Specifically.",
      },
      {
        type: "punchline",
        text: "The ground has shifted. You understand why. The question is whether the church will lead this moment or follow it.",
      },
    ],
  },
  {
    id: "series-close",
    title: "The series",
    blocks: [
      {
        type: "paragraph",
        text: "This is the fourth and final article in a series on AI, faith, and leadership. The full series covers the ground we are standing on, what AI is doing to us from the inside, a practical framework for leading through it, and the positive case for faithful engagement.",
      },
    ],
  },
];

export const sourcesList = [
  "Brynjolfsson, E., Chandar, A., & Chen, D. (2025). Canaries in the Coal Mine: AI and Entry-Level Employment. Stanford Digital Economy Lab, August 2025. digitaleconomy.stanford.edu",
  "Common Sense Media. (2025). Teens and AI: Annual Survey Report.",
  "Federal Emergency Management Agency. (n.d.). Whole Community Approach to Emergency Management: Principles, Themes, and Pathways for Action. FEMA.",
  "The Holy Bible, New International Version (2011). Ephesians 5:15–16. Biblica.",
  "Keller, T. (2009). Counterfeit Gods: The Empty Promises of Money, Sex, and Power, and the Only Hope That Matters. Dutton.",
  "RAND Corporation / JAMA Network Open. (2025). Adolescent Use of AI Chatbots for Mental Health Support. November 2025.",
  "SIL International. (2025). AI-Assisted Translation: Partnership Reporting Update.",
  "Wycliffe Bible Translators. (2025). Annual Update: Progress Toward Bible Translation Completion.",
];

/** A note on how I wrote this article */
export const authorNote =
  "I used Google NotebookLM to gather and organise research across my source library, including Stanford Digital Economy Lab employment data, Common Sense Media and RAND/JAMA adolescent AI use studies, Wycliffe and SIL translation reporting, FEMA community resilience frameworks, and Timothy Keller's Counterfeit Gods. Claude (Anthropic) helped structure an outline and generate initial drafts, which I then revised and rewrote to reflect my own voice, theology, and convictions. The arguments here are mine. I use AI as a drafting tool, not as the author — and I take full responsibility for what is published here, including any errors of fact or attribution.";
