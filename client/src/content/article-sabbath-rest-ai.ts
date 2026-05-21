/**
 * Structured content for "Reclaiming the Sabbath in an Always-On World"
 */

export const articleMeta = {
  slug: "sabbath-rest-in-the-age-of-ai",
  title: "Reclaiming the Sabbath in an Always-On World",
  subtitle:
    "Why the non-stop lifestyle is a deeper issue than we think, and how to find rest in the age of automation.",
  description:
    "Why Sabbath rest matters more than ever in the age of AI. AI fatigue, the difference between a day off and real Sabbath, practical atheism of the always-on life, and how Christians can reclaim rest as resistance.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-25",
  modifiedDate: "2026-05-21",
  readTime: "12 min",
  category: "AI & Faith",
  image: "/images/sabbath-rest-header.png",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/sabbath-rest-in-the-age-of-ai",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "The pitch was simple: automate the busywork and win back free time. By 2026, automated systems never sleep — and the unwritten rule is that we shouldn't either. A Harvard Business Review study of nearly 1,500 workers found cognitive exhaustion from AI is real and significant. We are collapsing under the speed of a world without limits.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Eugene Peterson's \"bastard sabbath\" versus real Sabbath as resistance. John Mark Comer on spiritual formation starting with rest. Personal cost of the accelerated life. The always-on mindset as practical atheism — and where to start putting the phone down.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Pick a day. Put the phone in a drawer. Let automated systems run without you for 24 hours.",
      "If AI saved you hours this week, resist filling that margin with more output — it is a gift, not a gap to close.",
      "The fight for Sabbath is not primarily scheduling; it is trust.",
      "Let Sabbath ask every week whether you truly believe the God you say you follow.",
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
        text: "Back in the summer of 2023, I stood in front of a packed room at the University of the Nations campus in Kona, Hawaii. My assignment was to talk about artificial intelligence.",
      },
      {
        type: "paragraph",
        text: "Preparing for that message, I remember feeling a genuine sense of shock at the sheer velocity of the software. It brought a fresh wave of pressure and a silent expectation that humans should produce more content, do it faster, and stay available around the clock.",
      },
      {
        type: "paragraph",
        text: "What I have been chewing on ever since is the quiet internal crisis beneath the surface. This isn't just about what automation does to our weekly output; it's about what it does to our inner lives. It slowly strips away our ability to simply stop.",
      },
      {
        type: "punchline",
        text: "That capacity to shut everything down might be the exact thing we are losing right now.",
      },
    ],
  },
  {
    id: "promise",
    title: "The Promise That Didn't Deliver",
    blocks: [
      {
        type: "paragraph",
        text: "The original marketing pitch for this digital shift was simple: outsource the busywork, and you will finally win back your free time. By 2026, we can see the reality. These automated workflows don't require sleep, and because our digital tools never take a break, an unwritten rule has emerged that we shouldn't either.",
      },
      {
        type: "paragraph",
        text: "A Harvard Business Review study tracking nearly {{stat:1500: full-time employees}} pointed out that the mental drain caused by these systems is a genuine issue. Automation drops the literal cost of making things, but it heavily jacks up the time we spend managing, reviewing, and making decisions. We are just shifting our energy to managing an endless mountain of digital clutter.",
      },
      {
        type: "paragraph",
        text: "People tracking this trend even coined a term for it: \"AI fatigue.\" It describes the frustration people feel when dealing with software that feels completely impersonal and mentally exhausting. As one person in the study put it, they no longer know if they actually like something or if a computer just picked it for them.",
      },
      {
        type: "punchline",
        text: "We built a world without limits, and we are collapsing under the weight of its speed.",
      },
    ],
  },
  {
    id: "day-off",
    title: "A Day Off Is Not a Sabbath",
    blocks: [
      {
        type: "paragraph",
        text: "When we finally hit a physical wall, our immediate instinct is to take a day off, run chores, or spend an hour scrolling on our phones. Eugene Peterson, the pastor who gave us The Message, called this a \"bastard sabbath\" — a completely secular day off disguised as real spiritual rest.",
      },
      {
        type: "paragraph",
        text: "The distinction here is massive. A day off is simply about basic maintenance, like filling up a gas tank so you can go back to being productive tomorrow.",
      },
      {
        type: "punchline",
        text: "A Sabbath is a completely different animal. It is an act of defiance. It is a weekly boundary that states, with your actual calendar, that you are a human being rather than a piece of equipment.",
      },
      {
        type: "paragraph",
        text: "John Mark Comer writes that serious spiritual growth doesn't start with raw effort; it starts with rest. In the creation account, God rested after six days of work. It wasn't because He was tired. He stopped because the work was fully realized. The ancient Hebrew word is Shabbat, which means to cease, to stop, or to celebrate. It is an intentional choice to enjoy what is there.",
      },
      {
        type: "paragraph",
        text: "Sam Altman, the head of OpenAI, noted at a recent summit that we will soon see automated systems capable of running for an entire week without a human needing to step in until the final approval. That is the speed the technology is setting.",
      },
      {
        type: "punchline",
        text: "The real question is whether we are going to let a machine dictate our lifestyle.",
      },
    ],
  },
  {
    id: "pressure",
    title: "The Pressure I Know Personally",
    blocks: [
      {
        type: "paragraph",
        text: "I'll be honest with you: I know exactly what this lifestyle costs because I have paid the price myself.",
      },
      {
        type: "paragraph",
        text: "Over the last couple of years, our family left our home on the Kona campus after a decade of full-time missions work, moved across three different countries, and finally landed in Tauranga, New Zealand. We arrived with 14 checked gear bags, four young kids, and a massive list of logistical things to sort out. In the middle of that chaos, I spent six months coding a new group-reading app called SourceView Together from scratch.",
      },
      {
        type: "paragraph",
        text: "Alongside the move and regular teaching trips to places like Norway, Kenya, and Nigeria, I started noticing a pattern. The digital tools I was using to speed up my workflow weren't actually creating free time. They were just filling up every spare second I had. Every time I found a faster way to finish a task, a new task immediately slid into its place.",
      },
      {
        type: "paragraph",
        text: "Studies look at what happens when people get access to smart digital assistants, noting that users often stop using their own critical thinking. They essentially fall asleep at the wheel of their own minds. This lifestyle actively trains us to lose our capacity for deep thought, which is the very thing the Sabbath is meant to safeguard.",
      },
    ],
  },
  {
    id: "theology",
    title: "A Theology of Human Limits",
    blocks: [
      {
        type: "paragraph",
        text: "When we refuse to stop working, we are essentially telling ourselves that the world will fall apart without our constant effort.",
      },
      {
        type: "punchline",
        text: "Living with an \"always-on\" mindset is a form of practical atheism. It acts like God isn't capable of running things without our constant hustle.",
      },
      {
        type: "paragraph",
        text: "Sabbath is the weekly habit of letting go of that control. It means letting the software run and the servers hum while you rest in the reality that the universe doesn't rely on your productivity. We are not pieces of machinery. God didn't design our bodies to run indefinitely. He built us to need food, sleep, and rest.",
      },
      {
        type: "paragraph",
        text: "Choosing to disconnect in a world that never sleeps is becoming a genuinely radical act. Research shows that people are experiencing a kind of relational fatigue from spending so much time interacting with automated systems. People are craving real, present connection.",
      },
      {
        type: "paragraph",
        text: "This is where the church has an incredible opportunity. We have an ancient, lived-out practice of stopping. We can protect a twenty-four-hour window every single week where we produce nothing, plan nothing, and measure the day by pure enjoyment rather than output. It is a statement that our worth isn't tied to our job performance, and that our time belongs to what we actually believe rather than what the technology demands.",
      },
    ],
  },
  {
    id: "where-to-start",
    title: "Where to Start",
    blocks: [
      {
        type: "paragraph",
        text: "If I am being transparent, the Sabbath is still something I am learning to practice well. But the battle for rest isn't a calendar issue; it's a trust issue. It is the regular practice of believing that God will sustain the things I cannot touch, and that rest is built into the universe from day one.",
      },
      {
        type: "quote",
        text: "A spirit of joy and a spirit of hurry simply cannot live in the same house.",
        attribution: "John Mark Comer",
      },
      {
        type: "paragraph",
        text: "The invitation is straightforward: start somewhere. Pick a day. Put the phone in a drawer. Let the automated systems run without your supervision for one day, and realize that the world keeps turning.",
      },
      {
        type: "paragraph",
        text: "If technology helps you finish a week's worth of work in two days, resist the urge to fill those open hours with more tasks. That open space is a gift, not a hole that needs filling. We find real peace when our schedules match our actual convictions.",
      },
      {
        type: "paragraph",
        text: "The Sabbath asks us, every single week, if we truly trust the God we say we follow.",
      },
      {
        type: "punchline",
        text: "Let it ask the question.",
      },
    ],
  },
  {
    id: "discussion",
    title: "Discussion Questions",
    blocks: [
      {
        type: "discussion",
        questions: [
          "When was the last time you genuinely stopped — not to recover or switch tasks, but to actually cease producing? What does that reveal about your current layout of life?",
          "How might framing rest as a serious spiritual discipline, rather than a reward for getting things done, change your weekly approach?",
          "In what ways does an accelerated digital pace make it difficult to maintain a posture of reliance on God?",
          "What area of your current work or life do you find hardest to put down for a single day? What is driving that hesitation?",
          "If new software tools have genuinely saved you hours of time this week, where did that recovered time actually go? Was it saved for margin, or consumed by more output?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Altman, S. (2026). Remarks on autonomous AI agents. AI Frontiers Summit 2026.",
  "Art of Manliness. (2023, November). Podcast #1013: Practicing spiritual disciplines as an act of resistance [Interview with J.M. Comer]. artofmanliness.com/character/advice/podcast-1013-practicing-spiritual-disciplines-as-an-act-of-resistance/",
  "Comer, J.M. (2015). Garden City: Work, rest, and the art of being human. Zondervan.",
  "Comer, J.M. (2019). The ruthless elimination of hurry: How to stay emotionally healthy and spiritually alive in the chaos of the modern world. WaterBrook.",
  "Comer, J.M. (2023). Practicing the Way: Be with Jesus. Become like him. Do as he did. WaterBrook.",
  "Dell'Acqua, F. (2023). Falling asleep at the wheel: Human cognitive engagement with AI. osf.io/qp8et.",
  "Harvard Business Review. (2025). Study of cognitive exhaustion and AI adoption among full-time workers (n ≈ 1,500).",
  "Practicing the Way. (n.d.). Unhurrying with a rule of life. practicingthewayarchives.org/unhurrying-with-a-rule-of-life/part-four",
  "RELEVANT Magazine. (2024). John Mark Comer: How discipleship changes everything. relevantmagazine.com/faith/john-mark-comer-how-discipleship-changes-everything/",
  "RSIS International. (2025). Consumer fatigue with AI. dx.doi.org/10.47772/IJRISS.2025.910000615.",
];

/** Full "A note on how I wrote this article" from the revised source. */
export const authorNote =
  "The personal material in this article — the Kona talk, the family transition back to Tauranga, the SourceView project, the observations about my own relationship with margin — is mine. These are not reconstructed experiences. They are what I've been living. " +
  "I used Google NotebookLM to gather and organise research across eighteen source documents including academic papers, podcast transcripts, and theological texts. I then worked with Claude Sonnet (Anthropic) across multiple drafting sessions — the AI generated initial structural and prose drafts for several sections, which I revised, cut, and rewrote substantially to bring them into line with my own thinking and voice. " +
  "The theological framework around Sabbath draws significantly on John Mark Comer's work across Garden City, The Ruthless Elimination of Hurry, and Practicing the Way — debts I have tried to make explicit in the text and bibliography rather than leave hidden in the background. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
