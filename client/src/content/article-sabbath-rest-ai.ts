/**
 * Structured content for "Reclaiming the Sabbath in an Always-On World"
 * Source: Assets/Articles/Reclaiming the Sabbath in an Always-On World_REVISED.md
 */

export const articleMeta = {
  slug: "sabbath-rest-in-the-age-of-ai",
  title: "Reclaiming the Sabbath in an Always-On World",
  subtitle: "Why the always-on life is a spiritual problem — and what to do about it in the age of AI",
  description:
    "Why Sabbath rest matters more than ever in the age of AI. Explores AI fatigue, digital burnout, the biblical theology of human limits, and why Christians must reclaim rest as resistance in an always-on world. A Christian perspective on technology and rest.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-25",
  modifiedDate: "2026-02-25",
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
    text: "The original pitch of the AI revolution was straightforward: automate the repetitive tasks, and you will finally get your time back. By 2026, we know what actually happened. The autonomous AI systems we've built don't sleep. They run 24/7. And because our digital counterparts never stop, the implicit expectation has become that we shouldn't either. A Harvard Business Review study of 1,488 full-time workers found that cognitive exhaustion from AI is \"both real and significant.\" We built a world without limits, and we are collapsing under the weight of its speed.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Eugene Peterson had a name for the secularised day off: a \"bastard sabbath.\" Sabbath is resistance — a weekly declaration that you are not a machine. John Mark Comer argues that \"any serious effort toward spiritual formation starts not with effort, but with rest.\" The always-on life is, at its root, a form of practical atheism. Sabbath is the weekly practice of releasing that grip.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Pick a day. Put the phone down. Stop coordinating, reviewing, producing. Let the autonomous agents run without you for 24 hours.",
      "If AI has enabled you to finish three days of work in half a day, resist the reflex to fill that recovered time with more work. That margin is a gift — a tithe of time.",
      "The fight for Sabbath is not primarily a scheduling problem. It is a trust problem.",
      "We achieve inner peace when our schedule is aligned with our values. Let Sabbath ask that question every week.",
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
        text: "In the summer of 2023, I was asked to give a public talk at the University of the Nations campus in Kona, Hawaii — a Thursday night gathering that draws staff, students, and local community into the main hall.\n\nMy topic was AI.",
      },
      {
        type: "paragraph",
        text: "I remember preparing for that talk and even at that early stage being genuinely shocked by what I was seeing — the speed of the technology, the scope of what was being built, what it meant for the next generation heading into missions, into careers, into every sphere of society. I wasn't pessimistic. But I was urgent. Even then, before most people had caught up to what was happening, it was clear that this was not just a new tool. It was a new pace. A new pressure. A new set of expectations about what human beings should be able to produce, and how fast, and how constantly.",
      },
      {
        type: "paragraph",
        text: "What I didn't fully articulate that night — but have been sitting with ever since — is the spiritual question underneath all of it. Not just what AI does to our output, but what it does to our souls. Not just how it accelerates our productivity, but how it quietly erodes our capacity to stop. And why that capacity to stop might be one of the most important things we're losing right now.",
      },
    ],
  },
  {
    id: "promise",
    title: "The Promise That Didn't Deliver",
    blocks: [
      {
        type: "paragraph",
        text: "The original pitch of the AI revolution was straightforward: automate the repetitive tasks, and you will finally get your time back.",
      },
      {
        type: "paragraph",
        text: "By 2026, we know what actually happened. The autonomous AI systems we've built don't sleep. They run 24/7. And because our digital counterparts never stop, the implicit expectation has become that we shouldn't either. A Harvard Business Review study of {{stat:1488: full-time workers}} found that cognitive exhaustion from AI is \"both real and significant\" — AI reduces the cost of production but consistently increases the cost of coordination, review, and decision-making. We are not doing less. We are doing different work — managing a relentless stream of synthetic output — and it is grinding people down in ways that feel new but are spiritually very old.",
      },
      {
        type: "paragraph",
        text: "Researchers studying regular AI users gave it a name: \"AI fatigue\" — a set of negative reactions to systems perceived as overly powerful, impersonal, or cognitively demanding (RSIS International, 2025). One participant in the study put it plainly: \"I no longer know if I like something because it's me, or because an algorithm suggested it to me.\"",
      },
      {
        type: "punchline",
        text: "We built a world without limits, and we are collapsing under the weight of its speed.",
      },
    ],
  },
  {
    id: "day-off",
    title: "A Day Off Isn't the Same Thing",
    blocks: [
      {
        type: "paragraph",
        text: "When our bodies finally hit a wall, the cultural default is to take a day off. Sleep in. Catch up on errands. Watch a few episodes of something. Maybe scroll.",
      },
      {
        type: "paragraph",
        text: "Eugene Peterson — the pastor and writer who gave us The Message and spent decades thinking seriously about the shape of the spiritual life — had a name for this: a \"bastard sabbath.\" The term appears in an Art of Manliness interview with John Mark Comer, who attributes it to Peterson: \"a secularised day off dressed up as rest.\" The difference matters enormously. A day off is about recovery. Refuelling the tank so you can get back to producing. A Sabbath is something else entirely. It is resistance. Reorientation. A weekly declaration, made with your actual schedule, that you are not a machine.",
      },
      {
        type: "paragraph",
        text: "John Mark Comer — whose books The Ruthless Elimination of Hurry and Garden City, and whose Practicing the Way framework have been among the most serious contemporary engagements with the relationship between spiritual formation and pace — argues that \"any serious effort toward spiritual formation starts not with effort, but with rest\" (Comer, as cited in RELEVANT Magazine, 2024). That's a disorienting idea in a culture that treats output as the measure of everything. But it's grounded in something much older than any productivity philosophy.",
      },
      {
        type: "paragraph",
        text: "In Genesis 2, \"after six days of creation, God rested.\" Not because he was depleted. Not because he needed to recover. He rested because the work was complete — and in resting, he modelled something fundamental about what it means to be human. The Hebrew word is \"Shabbat\" — to stop, to cease, to be complete. It can also be translated: to celebrate. That texture gets lost when we reduce Sabbath to mere absence of work. It is not simply not-working. It is the deliberate choice to delight. Unless we are careful, AI's ability to build anything, generate anything, and work without needing to rest will unconsciously train us to try to keep up.",
      },
      {
        type: "quote",
        text: "I expect that by the end of 2026, we will see agents capable of week-long autonomous work, checking in only for final sign-off.",
        attribution: "Sam Altman, CEO of OpenAI (AI Frontiers Summit, 2026)",
      },
      {
        type: "paragraph",
        text: "That is the pace the machine is setting. The question is whether we're going to let it set ours.",
      },
      {
        type: "paragraph",
        text: "There is also a theological reflection here that I keep coming back to. Scripture connects work, creativity, and Sabbath in a sequence that matters. God worked, and then God rested — and the rest was a celebration of a completed creation-work cycle. When we outsource significant portions of our work to AI systems, we create a strange new problem of the soul: extraordinary things get completed, but because we didn't make them, there is nothing to celebrate. The feast has no host.",
      },
    ],
  },
  {
    id: "pressure",
    title: "The Pressure I Know Personally",
    blocks: [
      {
        type: "paragraph",
        text: "I'll be honest: I know what the accelerated life costs, because I've paid some of it.",
      },
      {
        type: "paragraph",
        text: "Over the last two years, our family navigated one of the most complex seasons we've faced — leaving our home in Kona after ten years of full-time missions work, transitioning across three countries, and landing back in Tauranga, New Zealand, in 2025 with 14 checked bags, four kids, and a very long to-do list. In that same window, I was finishing a decade of work developing new Bible engagement tools and launching a new app called SourceView Together — a platform I AI-coded in six months. It's designed to help people read Scripture together in groups, in person, in a way that's genuinely interactive and alive. Exciting work. Hard work. Pioneering something new rarely isn't.",
      },
      {
        type: "paragraph",
        text: "And alongside all of that — the move, the app, the ongoing teaching trips to Norway, Kenya, Nigeria — I found myself noticing something. The AI tools I was using to accelerate my work weren't giving me more margin. They were filling every margin I had. Every time I got faster at one thing, there was more to do with the time I'd recovered. The machine never runs out of tasks. The question is whether I do. Or whether I should.",
      },
      {
        type: "paragraph",
        text: "The research backs up what I was feeling. One study described what happens when workers receive high-quality AI assistance: \"they become more likely to disengage their own judgment, to free-ride on the machine's output, to 'fall asleep at the wheel' of their own thinking\" (Dell'Acqua, 2023). The always-on life doesn't just exhaust us. It quietly trains us out of the capacity for deep reflection — the very capacity that Sabbath is designed to protect.",
      },
    ],
  },
  {
    id: "theology",
    title: "A Theology of Human Limits",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the theological point underneath all of this: when we refuse to stop, we are functionally declaring that we do not trust God to hold the world without our constant input. With 2026 AI tools, it becomes easy to feel that we might be right.",
      },
      {
        type: "paragraph",
        text: "Dallas Willard — one of the most important Christian thinkers on spiritual formation of the last century — argued that \"the disciplines of spiritual life are not religious extras. They are the means by which character is actually transformed.\" Drawing on Willard's Spirit of the Disciplines, the core practice he describes cultivates what he called \"a disposition of openness, willingness, and dependence on God\" (Willard, 1988, p. 68). That disposition cannot survive in a life that never pauses. It requires margin. It requires deliberate, protected space where the noise stops and something else is allowed to take up residence.",
      },
      {
        type: "paragraph",
        text: "The always-on life is, at its root, a form of practical atheism. Not a denial that God exists, but a functional denial that He is enough — that His purposes can move forward without my constant output. Sabbath is the weekly practice of releasing that grip. Letting the servers run. Letting the agents execute. And resting in the reality that the world does not hinge on my productivity.",
      },
      {
        type: "paragraph",
        text: "We are not machines. God did not wire us to run indefinitely. He designed us to need sleep, to require nourishment, to stop. That is not a limitation to be overcome by better technology. It is the architecture of being human — made in the image of a God who himself chose to rest.",
      },
    ],
  },
  {
    id: "countercultural",
    title: "The Most Countercultural Thing You Can Do",
    blocks: [
      {
        type: "paragraph",
        text: "Here is what strikes me: in a world that is now genuinely \"always on,\" choosing to switch off is becoming a subversive act.",
      },
      {
        type: "paragraph",
        text: "Researchers studying AI users found what they called \"relational fatigue\" — a weariness that comes specifically from the soulless quality of interaction with automated systems (RSIS International, 2025). Users reported wanting more sensitive, less automated connection. They were tired of efficiency without presence, speed without meaning.",
      },
      {
        type: "paragraph",
        text: "The Church has something extraordinary to offer into that exhaustion. Not a better productivity system. Not a more optimised workflow. But the ancient, embodied, countercultural practice of stopping — protecting a 24-hour window each week where nothing is produced, nothing is coordinated, and the measure of the day is not output but delight.",
      },
      {
        type: "paragraph",
        text: "Comer's Practicing the Way community, whose materials on Sabbath I have found consistently useful, frames it this way: \"Sabbath is a practice from the life and teachings of Jesus to fight against the chronic restlessness of our condition and culture\" (Practicing the Way, practicingthewayarchives.org). The restlessness is the condition. The algorithms are engineered to exploit it — to keep us scrolling, responding, producing. Sabbath is the weekly refusal to be exploited. A declaration that our identity is not our output, that our worth is not our productivity, and that our schedule — at least one day in seven — will be shaped by what we actually believe rather than what the machine demands.",
      },
      {
        type: "paragraph",
        text: "I want to be clear that my thinking on Sabbath has been substantially shaped by Comer's work across Garden City, The Ruthless Elimination of Hurry, and the Practicing the Way materials. I'm building on his framework, not originating it. He's drawing on a long tradition — Abraham Joshua Heschel, Eugene Peterson, Dallas Willard — and I'm drawing on him drawing on that tradition. The ideas aren't mine to claim.",
      },
    ],
  },
  {
    id: "where-to-start",
    title: "Where to Start",
    blocks: [
      {
        type: "paragraph",
        text: "If I'm honest, Sabbath is still a practice I am growing into. The years of building, moving, pioneering, launching — they leave a certain kind of restlessness baked in. It takes more than good intentions to undo that.",
      },
      {
        type: "paragraph",
        text: "What I keep coming back to is this: the fight for Sabbath is not primarily a scheduling problem. It is a trust problem. It is the daily work of believing that God is who He says He is — that He sustains what I cannot, that His purposes are not derailed by my absence, that rest is not a reward for finishing but a rhythm built into creation itself.",
      },
      {
        type: "paragraph",
        text: "Comer puts it plainly in his Art of Manliness interview: \"hurry is not just about having a lot to do. Hurry is having too much to do and not enough time — and it is the great enemy of spiritual life. The spirit of joy and the spirit of hurry cannot live in the same house\" (Comer, Art of Manliness Podcast #1013, 2023).",
      },
      {
        type: "paragraph",
        text: "So the invitation is simple, if not easy: start somewhere. Pick a day. It will take intentional effort to protect it. Put the phone down. Stop coordinating. Stop reviewing. Stop producing. Let the autonomous agents run without you for 24 hours, and discover that the world does not end.",
      },
      {
        type: "paragraph",
        text: "If AI has enabled you to finish three days of work in half a day, resist the reflex to fill that recovered time with more work. That margin is not a gap to close. It's a gift to receive. A small, built-in Sabbath. A tithe of time.",
      },
      {
        type: "paragraph",
        text: "We achieve inner peace when our schedule is aligned with our values. The question Sabbath puts to us, every single week, is whether we actually believe what we say we believe.",
      },
      {
        type: "punchline",
        text: "Let it ask that question.",
      },
      {
        type: "discussion",
        questions: [
          "When was the last time you genuinely stopped — not recovered, not switched tasks, but actually ceased working and producing? What does your answer reveal about the rhythms built into your life?",
          "The difference between a \"day off\" and a Sabbath is the difference between recovery and resistance. How might framing rest as a spiritual discipline rather than a reward for productivity change how you approach your week?",
          "Dallas Willard argued that the spiritual disciplines cultivate \"a disposition of openness, willingness, and dependence on God.\" In what ways does your current pace make that disposition difficult to sustain?",
          "Sabbath is ultimately a trust issue — a weekly practice of releasing control and declaring that God is sufficient. What areas of your life or work do you find hardest to put down, even for one day? What does that reveal?",
          "If AI has genuinely made you more productive, what are you doing with the time you've recovered? Is it margin, or more output?",
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
  "Practicing the Way. (n.d.). Unhurrying with a rule of life. practicingthewayarchives.org/unhurrying-with-a-rule-of-life/part-four",
  "RELEVANT Magazine. (2024). John Mark Comer: How discipleship changes everything. relevantmagazine.com/faith/john-mark-comer-how-discipleship-changes-everything/",
  "RSIS International. (2025). Consumer fatigue with AI. dx.doi.org/10.47772/IJRISS.2025.910000615.",
  "Willard, D. (1988). The spirit of the disciplines: Understanding how God changes lives. HarperOne.",
];

/** Full "A note on how I wrote this article" from the revised source. */
export const authorNote =
  "The personal material in this article — the Kona talk, the family transition back to Tauranga, the SourceView project, the observations about my own relationship with margin — is mine. These are not reconstructed experiences. They are what I've been living. " +
  "I used Google NotebookLM to gather and organise research across eighteen source documents including academic papers, podcast transcripts, and theological texts. I then worked with Claude Sonnet (Anthropic) across multiple drafting sessions — the AI generated initial structural and prose drafts for several sections, which I revised, cut, and rewrote substantially to bring them into line with my own thinking and voice. " +
  "The theological framework around Sabbath draws significantly on John Mark Comer's work across Garden City, The Ruthless Elimination of Hurry, and Practicing the Way — debts I have tried to make explicit in the text and bibliography rather than leave hidden in the background. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
