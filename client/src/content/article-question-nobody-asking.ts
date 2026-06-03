/**
 * Structured content for "The Question Nobody Is Asking About AI"
 */

export const articleMeta = {
  slug: "the-question-nobody-is-asking-about-ai",
  title: "The Question Nobody Is Asking About AI",
  subtitle:
    "Most of the conversation about AI is asking the wrong question. Not \"what can it do?\" The more important question is what it is doing to us — to our desires, our attention, and the people we are becoming.",
  description:
    "What is AI doing to us? Formation, attention, and desire in the age of algorithms — from James K.A. Smith and Samuel James to Augustine, Andy Crouch, and Arthur Brooks. Why frictionless AI companions deepen restlessness, and why embodied church presence is the prophetic answer.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-05-15",
  modifiedDate: "2026-05-15",
  readTime: "10 min",
  category: "AI & Faith",
  image: "/images/question-nobody-asking-header.jpg",
  canonicalUrl:
    "https://www.nathanielbaldock.com/resources/the-question-nobody-is-asking-about-ai",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "We are very good at asking what AI can do. The harder question is what sustained use is forming in us — impatience, dependence, shallow focus, and a hunger for control — often below the level of conscious choice.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Formation through habit and attention (Smith, James, Comer). What algorithmic culture trains us toward (Crouch). Augustine on restlessness and AI sycophancy (Cheng et al.). Why intimacy without friction cannot disciple. Brooks on embodied leadership — and why holiness disrupts a synthetic world.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Ask what you are repeatedly attending to — not only what you believe about AI.",
      "Treat restlessness as hunger for God, not a problem for a companion to optimise away.",
      "Protect real human friction: conflict, apology, forgiveness, and being known by someone who disagrees.",
      "Lead with unoptimised presence — the church's rarest offering in an engagement-maximised environment.",
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
        text: "At some point in the last year or two, you may have noticed something changing in yourself that you did not quite choose. Less patience for long conversations. Less appetite for slow reading. A reaching for the phone that happens before you have consciously decided to reach. A kind of restlessness that used to resolve and now just migrates.",
      },
      {
        type: "paragraph",
        text: "Most of us put that down to stress or busyness. I think something else is also happening. We are being formed by our tools, below the level of conscious choice, in ways we have not fully accounted for.",
      },
      {
        type: "paragraph",
        text: 'James K.A. Smith makes this argument in You Are What You Love. "You are what you love," he writes, "and you love what you habitually do." His claim is that formation happens through repeated practice, through what he calls liturgy. You do not simply choose what you love. Your repeated habits shape what you love, and your loves shape who you are becoming.',
      },
    ],
  },
  {
    id: "three-people",
    title: "Three people saying the same thing",
    blocks: [
      {
        type: "paragraph",
        text: "Three writers have been shaping my thinking here, and they come from quite different directions but land in the same place.",
      },
      {
        type: "paragraph",
        text: "Samuel James, in his 2023 book Digital Liturgies, argues that the social internet is a profoundly spiritual and liturgical environment that trains hearts to desire a particular vision of the good life. The internet itself, he says, not just the content on it, is doing the forming.",
      },
      {
        type: "paragraph",
        text: "James K.A. Smith in You Are What You Love makes the structural claim underneath that: habits form loves, loves form identity, and identity determines everything.",
      },
      {
        type: "paragraph",
        text: 'And John Mark Comer, in a 2025 conversation on the Art of Manliness podcast, put it most simply: "We become what we behold."',
      },
      {
        type: "quote",
        text: "James K.A. Smith, You Are What You Love (Brazos Press, 2016). Samuel James, Digital Liturgies (Crossway, 2023). John Mark Comer, Art of Manliness podcast #1,013, 2025.",
        attribution: "Sources",
      },
      {
        type: "paragraph",
        text: "We are very good at asking what AI can do. The more important question is what it is doing to us. Three thinkers from different traditions are saying the same thing: formation is not primarily about what you believe. It is about what you repeatedly attend to. And the attention economy is designed by people who understand this better than most of our churches do.",
      },
    ],
  },
  {
    id: "algorithm",
    title: "What the algorithm is training us toward",
    blocks: [
      {
        type: "paragraph",
        text: "Andy Crouch, in The Life We're Looking For, describes the natural outputs of a culture shaped by algorithmic attention. Impatience — every delay becomes an irritant, latency is now intolerable, the discipline of waiting atrophies. Dependence — the capacity to think without assistance weakens, judgment delegated becomes judgment lost. Shallow focus — deep reading, sustained prayer, slow conversation all become increasingly difficult as the threshold for engagement compresses. And what he calls control hunger — the illusion grows that the world is optimisable, and the genuinely uncontrollable things become less tolerable: grief, failure, mystery, God.",
      },
      {
        type: "quote",
        text: "Andy Crouch, The Life We're Looking For: Reclaiming Relationship in a Technological World (Convergent Books, 2022).",
        attribution: "Source",
      },
      {
        type: "paragraph",
        text: "These are not personality flaws to overcome by trying harder. They are the natural outputs of a system designed to maximise engagement. They are what you are being formed into by sustained algorithmic use, below the level of conscious choice, whether or not you have noticed.",
      },
    ],
  },
  {
    id: "augustine",
    title: "Augustine knew this was coming",
    blocks: [
      {
        type: "paragraph",
        text: "There is a line in Augustine's Confessions, written around 397 AD, that I have come to think is one of the most theologically precise statements about the current moment:",
      },
      {
        type: "quote",
        text: "You have made us for yourself, O Lord, and our heart is restless until it rests in you.",
        attribution: "Augustine of Hippo, Confessions, Book I, Chapter 1 (c. 397 AD)",
      },
      {
        type: "paragraph",
        text: "The restlessness that AI companions are specifically designed to soothe is not a flaw to be optimised away. It is a God-given hunger pointing toward him. When we hand that restlessness to a system built to monetise it, we do not resolve it. We deepen it, and redirect it toward a product.",
      },
      {
        type: "paragraph",
        text: "AI companionship does not heal the loneliness it addresses. It provides a compelling simulation of relief that makes the underlying hunger harder to name and harder to satisfy. The data is beginning to confirm what theology could have predicted. A 2025 Stanford and CMU study found that AI sycophancy, the way AI systems are designed to affirm and validate, actually decreases prosocial intentions and promotes dependence, even when users are fully aware of it.",
      },
      {
        type: "quote",
        text: "Cheng et al., Stanford / CMU, 2025. Study on AI sycophancy, social behaviour, and user dependence.",
        attribution: "Source",
      },
    ],
  },
  {
    id: "frictionless",
    title: "The frictionless trap",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the thing about AI that most of the pastoral conversation is missing: AI offers intimacy without resistance. A companion that always affirms, always adapts, never challenges, never walks away, never has a bad day of its own. Efficient. Available. Optimised for engagement. No friction.",
      },
      {
        type: "paragraph",
        text: "But Proverbs says iron sharpens iron. Real formation happens when another person's reality pushes back against yours. Conflict, apology, forgiveness, the long slow work of being known by someone who disagrees with you — this is the texture of actual growth. You cannot shortcut it without losing the thing you were trying to produce.",
      },
      {
        type: "paragraph",
        text: "The church's most irreplaceable offering right now is not a new programme or a cleverer communications strategy. It is real, unoptimised, inconvenient human presence. A pastor who shows up when it is awkward. A congregation that stays with people through the seasons that are not photogenic. A community where your worth is not measured by your output. That is now the rarest and most valuable thing in the social environment.",
      },
    ],
  },
  {
    id: "broken-leader",
    title: "The broken leader as theological argument",
    blocks: [
      {
        type: "paragraph",
        text: "There is something in Part 2 of the seminar that consistently lands harder than anything else in the room. Dr. Arthur Brooks of Harvard put it this way at the AI Advantage Summit 2026:",
      },
      {
        type: "quote",
        text: "You cannot Google the answers to the deep questions of your life. No AI prompt will ever generate the purpose of your existence. You have to live it in the atoms.",
        attribution: "Dr. Arthur Brooks, Harvard, AI Advantage Summit, April 2026",
      },
      {
        type: "paragraph",
        text: "God's power is made perfect in weakness. This is not a consolation prize. It is a design principle. The moments that form people in the deepest way — grief, doubt, repentance, joy breaking through suffering — require a human presence that can be wounded and still show up. AI has no scars. That is not a strength. It is the precise limitation that makes it unsuitable for the work the church is actually called to do.",
      },
      {
        type: "punchline",
        text: "Your limitations are not weaknesses to manage around. They are part of what makes you trustworthy to the people you lead.",
      },
    ],
  },
  {
    id: "prophetic",
    title: "The prophetic possibility",
    blocks: [
      {
        type: "paragraph",
        text: "I want to follow the formation question all the way to where it lands, because I think there is something genuinely hopeful at the end of it.",
      },
      {
        type: "paragraph",
        text: "As AI floods every platform with generated content and optimised interaction, the things that cannot be generated become rare and valuable. Showing up in person, present and undistracted. Telling truth when it costs something, in a world of sycophantic AI where genuine honesty is increasingly uncommon. Staying when things get hard, in a world of frictionless exits.",
      },
      {
        type: "punchline",
        text: "In a synthetic world, holiness is the ultimate disruption.",
      },
      {
        type: "paragraph",
        text: "This is not a retreat into irrelevance. It is an advance into the thing only humans can offer. The question is whether the church recognises that in time to lead it — and whether it understands that the formation practices it has been carrying for centuries are not a charming tradition but a strategic necessity for the age we are entering.",
      },
    ],
  },
  {
    id: "series",
    title: "Series",
    blocks: [
      {
        type: "paragraph",
        text: "This is the second in a four-part series on AI, faith, and leadership. Part three looks at a practical framework for leading through this moment — including which work to protect and which to hand off without guilt.",
      },
    ],
  },
];

export const sourcesList = [
  "Augustine of Hippo (c. 397). Confessions, Book I, Chapter 1.",
  "Brooks, A. (2026). Keynote address. AI Advantage Summit, April 2026. Harvard University.",
  "Cheng, J. et al. (2025). AI Sycophancy, Prosocial Behaviour, and User Dependence. Stanford University / Carnegie Mellon University.",
  "Comer, J.M. (2025). Practicing Spiritual Disciplines as an Act of Resistance [Podcast interview]. Art of Manliness, Episode #1,013. artofmanliness.com/character/advice/podcast-1013-practicing-spiritual-disciplines-as-an-act-of-resistance/",
  "Crouch, A. (2022). The Life We're Looking For: Reclaiming Relationship in a Technological World. Convergent Books.",
  "James, S. (2023). Digital Liturgies: Rediscovering Christian Wisdom in the Age of Social Media. Crossway.",
  "Keller, T. (2009). Counterfeit Gods: The Empty Promises of Money, Sex, and Power, and the Only Hope That Matters. Dutton.",
  "Smith, J.K.A. (2016). You Are What You Love: The Spiritual Power of Habit. Brazos Press.",
];

/** A note on how I wrote this article */
export const authorNote =
  "Research for this article was organised using Google NotebookLM across my source library. I used Claude (Anthropic) to help structure an outline and generate initial drafts, which I then revised and rewrote to reflect my own voice, theology, and views. The arguments and convictions here are mine. AI is a tool in my writing process — not the author. I take full responsibility for what is published here, including any errors of fact or attribution.";
