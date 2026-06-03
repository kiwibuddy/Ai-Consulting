/**
 * Structured content for "The Work That AI Cannot Take"
 */

export const articleMeta = {
  slug: "the-work-ai-cannot-take",
  title: "The Work That AI Cannot Take",
  subtitle:
    "The anxiety underneath the AI conversation is not really about jobs. It is about whether you were ever doing anything irreplaceable. Here is the honest answer — and a framework for acting on it.",
  description:
    "Vocation, identity, and the age of automation: why work was never a curse, the Brooks distinction between complicated and complex, the four levers (Automate, Augment, Accelerate, Activate), Sacred Tasks, and five disciplines for faithful leadership in the AI age.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-22",
  modifiedDate: "2026-05-22",
  readTime: "11 min",
  category: "AI & Faith",
  image: "/images/work-ai-cannot-take-header.jpg",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/the-work-ai-cannot-take",
  seriesNumber: 3 as const,
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
    text: "The fear underneath most AI conversations is not really about jobs. It is whether AI reveals that the work you have been doing was never as irreplaceable as you thought.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Work as vocation before the fall. Complicated versus complex leadership. Four levers for sorting your relationship to AI. The Sacred Tasks exercise. Apprenticeship, atoms versus bits, and five disciplines that hold the posture together.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Sort tasks with Automate, Augment, Accelerate, and Activate — default to Activate where mission opens new reach.",
      "Run Sacred Tasks: three questions to find the ~20% of work that is genuinely yours to protect.",
      "Name what you are deliberately not automating because the struggle forms people.",
      "Hold Discernment, Dignity, Design, Discipleship, and Mission together as leadership disciplines.",
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
        text: "Part 3 of 4 · AI, faith, and leadership",
      },
      {
        type: "paragraph",
        text: "The fear underneath most AI conversations is not really about jobs. It is this: what if AI reveals that the work you have been doing was never as irreplaceable as you thought?",
      },
      {
        type: "paragraph",
        text: "That is worth sitting with honestly rather than rushing past into reassurance. Because there is a genuine answer to it. But the answer is theological before it is practical.",
      },
    ],
  },
  {
    id: "work-never-curse",
    title: "Work was never a curse",
    blocks: [
      {
        type: "paragraph",
        text: "The standard Christian framing around work tends to treat it as a post-fall necessity, something we endure until something better comes along. But Genesis puts Adam in the garden before the fall, tending and keeping, naming the animals, cultivating the earth. Work as vocation, work as co-creative partnership with God, is built into what it means to be made in his image. It is not a curse. It is a calling.",
      },
      {
        type: "paragraph",
        text: "AI cannot change that. It can reshape which tasks fall to humans and which to machines, the way the tractor reshaped which tasks fell to farmers and which to horses. But the calling to tend, to cultivate, to serve, to create, to steward — that is not a task. It is an identity. And identity is not automatable.",
      },
    ],
  },
  {
    id: "leadership",
    title: "Where leadership actually lives",
    blocks: [
      {
        type: "paragraph",
        text: "Dr. Arthur Brooks of Harvard draws a distinction that I have found more useful than anything else in thinking through this practically. Some problems are complicated. Many moving parts, but the right expertise applied correctly produces the right answer. A tax return. A scheduling system. A content calendar. AI is extraordinary here, and these tasks are being transferred to machines at pace.",
      },
      {
        type: "paragraph",
        text: "Some problems are complex. They involve people with agency, competing values, and unpredictable responses. A marriage in trouble. A congregation navigating a hard season. A grieving team. A community in crisis. These have no solution, only navigation. They require formed humans who have done the patient work of developing wisdom.",
      },
      {
        type: "quote",
        text: "Complicated problems yield to expertise; complex problems require formed humans who can navigate people with agency, competing values, and unpredictable responses.",
        attribution: "Dr. Arthur Brooks, Harvard, AI Advantage Summit, April 2026",
      },
      {
        type: "paragraph",
        text: "Here is what I find genuinely clarifying about this distinction: the more AI handles the complicated, the more the value of leadership is concentrated in the complex. That is not a threat to your calling. It is a clarification of it, if you have done the formation work. If you have not, the complicated work was always going to fall away eventually.",
      },
    ],
  },
  {
    id: "four-levers",
    title: "The four levers",
    blocks: [
      {
        type: "paragraph",
        text: "Dean Graziosi introduced the Four Levers of Accelerated Success at the AI Advantage Summit (April 2026): Activate, Accelerate, Amplify, and Augment — a sequence for onboarding AI as a partner rather than a search engine. I adapt that language for faith leaders as four ways to sort any task: Automate, Augment, Accelerate, and Activate. The words overlap with the summit, but the frame here is pastoral — which work to hand off, which to keep, and which to open because mission demands it — not the summit’s step-by-step adoption path.",
      },
      {
        type: "subheading",
        text: "Automate",
      },
      {
        type: "paragraph",
        text: "Hand the task off entirely. AI runs it without your involvement. For tasks where the outcome is defined, repeatable, and the struggle involved in doing them is not itself formative.",
      },
      {
        type: "subheading",
        text: "Augment",
      },
      {
        type: "paragraph",
        text: "Use AI to enhance your thinking and output while the judgment and presence remain yours. You are still doing the work, better and faster.",
      },
      {
        type: "subheading",
        text: "Accelerate",
      },
      {
        type: "paragraph",
        text: "Use AI to speed up existing processes without changing their fundamental nature. Faster research, faster synthesis, faster communication.",
      },
      {
        type: "subheading",
        text: "Activate",
      },
      {
        type: "paragraph",
        text: "Use AI to unlock work you could not previously do at all. A small team doing the work of a large one. New mission reach. The church that could never afford a communications director now running one effectively.",
      },
      {
        type: "punchline",
        text: "The error I see most often is leaders defaulting to Automate when their mission would be better served by Activate.",
      },
      {
        type: "paragraph",
        text: "The tractor did not automate the farmer out of farming. It activated a scale of cultivation that would have been impossible without it. The question is not which tasks to eliminate but which possibilities to open.",
      },
    ],
  },
  {
    id: "sacred-tasks",
    title: "Sacred Tasks",
    blocks: [
      {
        type: "paragraph",
        text: "Leor Weinstein’s atoms-and-bits audit at the same summit asks you to list what you did in a day and hand the digital work you do not love to AI so you can return to embodied life. I build on that with an exercise I use with leaders: for each significant task in your work, three questions.",
      },
      {
        type: "paragraph",
        text: "The first: does this task require a human being? Some tasks genuinely need human judgment, empathy, or presence. Others just have a human doing them out of habit or inertia. If the honest answer is no, automate with confidence and without guilt.",
      },
      {
        type: "paragraph",
        text: "The second: does it require this specific human? Your history, your relationships, your particular calling in this community. If the honest answer is no, delegate or systematise.",
      },
      {
        type: "paragraph",
        text: "The third: is the struggle itself part of the formation? Is doing this task, wrestling with it, forming you or the people you serve? The difficulty might be the point.",
      },
      {
        type: "paragraph",
        text: "If the answer to the third question is yes, that task is what I call Sacred. Protect it. Do not automate it. Not because AI cannot do it, but because doing it is the thing you are actually here to do.",
      },
      {
        type: "punchline",
        text: "Most leaders, when they work honestly through this exercise, find roughly 20% of their tasks are genuinely Sacred, and that they have been spending too much time on the other 80%.",
      },
    ],
  },
  {
    id: "apprenticeship",
    title: "The apprenticeship question",
    blocks: [
      {
        type: "paragraph",
        text: "There is a dimension to this that goes beyond individual work and into leadership responsibility. The Stanford data shows entry-level workers aged 22–25 experiencing the sharpest employment decline in AI-exposed fields. This matters theologically as much as economically. Formation requires stages. You cannot skip them.",
      },
      {
        type: "paragraph",
        text: "Senior lawyers are made by being junior lawyers first. The cases you lose at 25 form the wisdom you deploy at 45. There is no shortcut to that formation. When AI automates the entry level, it does not just change the labour market. It severs the intergenerational transmission of knowledge and character. The same is true in ministry. The associate pastor making visible mistakes at 27 is being formed. Those stages are not inefficiencies to be optimised away. They are the thing itself.",
      },
      {
        type: "discussion",
        questions: [
          "What are you deliberately not automating because the struggle is the point?",
          "What formation pathway are you actively protecting in the people below you?",
        ],
      },
    ],
  },
  {
    id: "mission-atoms",
    title: "Where mission lives",
    blocks: [
      {
        type: "paragraph",
        text: "Leor Weinstein’s bits-and-atoms distinction from the AI Advantage Summit is the frame that consistently helps leaders stop worrying about the wrong things. Bits are the digital domain — information, content, code, analysis, synthesis. Atoms are embodied life — physical presence, relationship, a hand on a shoulder at the right moment, trust built over years of showing up when it was inconvenient. AI lives in bits; mission, at its deepest, lives in atoms.",
      },
      {
        type: "paragraph",
        text: 'God chose atoms. The incarnation is the definitive theological statement that embodied presence is not optional, not a nice pastoral add-on, but the thing itself. "The Word became flesh and made his dwelling among us" (John 1:14). The strategic question for every leader is this: where are you accidentally treating atoms work like bits work, and losing what makes it powerful?',
      },
      {
        type: "paragraph",
        text: "The counter-formation practices that matter most in this moment follow from that. Sabbath as a weekly act of resistance against the always-on culture. Showing up physically, present and undistracted. Telling the truth when it costs something, in a world where AI will always tell people what they want to hear. Protecting the apprenticeship pipeline by keeping formation work in human hands.",
      },
    ],
  },
  {
    id: "five-disciplines",
    title: "The frame that holds it together",
    blocks: [
      {
        type: "paragraph",
        text: "The five disciplines below are my synthesis for Christian leaders — a pastoral frame I use alongside the summit material above, not something Arthur Brooks or the AI Advantage faculty presented as a package:",
      },
      {
        type: "subheading",
        text: "Discernment",
      },
      {
        type: "paragraph",
        text: "Ask the formation question before the efficiency question.",
      },
      {
        type: "subheading",
        text: "Dignity",
      },
      {
        type: "paragraph",
        text: "Treat every person in your sphere as an image-bearer, not an optimisation target.",
      },
      {
        type: "subheading",
        text: "Design",
      },
      {
        type: "paragraph",
        text: "Build systems that use AI without deforming the people inside them.",
      },
      {
        type: "subheading",
        text: "Discipleship",
      },
      {
        type: "paragraph",
        text: "Actively form the next generation in the habits AI cannot replicate.",
      },
      {
        type: "subheading",
        text: "Mission",
      },
      {
        type: "paragraph",
        text: "Use AI to extend the reach of the mission without replacing the human core of it.",
      },
      {
        type: "paragraph",
        text: "Hold all five and AI becomes a servant of the work. Let any one fall away and the others bend out of shape.",
      },
      {
        type: "punchline",
        text: 'The question AI forces on every leader is not "what will survive?" It is: "what are you actually for?" Name that. Protect it. Use every tool available to extend it. That is the whole game.',
      },
    ],
  },
  {
    id: "series-next",
    title: "What comes next",
    blocks: [
      {
        type: "paragraph",
        text: "This is the third in a four-part series on AI, faith, and leadership. Part four makes the positive case: what the church uniquely holds in this moment and what faithful leadership looks like from Monday onwards.",
      },
    ],
  },
];

export const sourcesList = [
  "Brooks, A. (2026). Keynote address (complicated vs. complex; left-brain AI use). AI Advantage Summit, April 2026. Harvard University.",
  "Graziosi, D. (2026). Four Levers of Accelerated Success (Activate, Accelerate, Amplify, Augment). AI Advantage Summit, April 2026. aiadvantage.com",
  "Weinstein, L. (2026). Atoms-and-bits audit and bits-vs.-atoms framework. AI Advantage Summit, Day 2, April 2026.",
  "Brynjolfsson, E., Chandar, A., & Chen, D. (2025). Canaries in the Coal Mine: AI and Entry-Level Employment. Stanford Digital Economy Lab, August 2025. digitaleconomy.stanford.edu",
  "Hamilton, D. (2014). God Revealed Through the Spheres. Referenced in the Seven Spheres of Society framework.",
  "The Holy Bible, New International Version (2011). John 1:14; Proverbs 27:17. Biblica.",
  "Smith, J.K.A. (2016). You Are What You Love: The Spiritual Power of Habit. Brazos Press.",
];

/** A note on how I wrote this article */
export const authorNote =
  "I used Google NotebookLM to gather and organise research across my source library, including Arthur Brooks's and Leor Weinstein's AI Advantage Summit sessions, Dean Graziosi's Four Levers framework, Stanford Digital Economy Lab employment data, and the theological and formation literature cited below. The Sacred Tasks three-question exercise and the Five Disciplines (Discernment, Dignity, Design, Discipleship, Mission) are my pastoral adaptations and synthesis for faith leaders — built on summit material, not presented as original summit content. Claude (Anthropic) helped structure an outline and generate initial drafts, which I then revised and rewrote to reflect my own voice, theology, and convictions. I use AI as a drafting tool, not as the author — and I take full responsibility for what is published here, including any errors of fact or attribution.";
