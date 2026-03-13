/**
 * Structured content for "Sabbath Rest in the Age of AI: Why Christians Must Learn to Stop"
 * Used by the article page for sections and SEO.
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
    text: "The original pitch of the AI revolution was simple: automate the repetitive tasks and you will finally get your time back. By 2026 we know what actually happened. Our digital counterparts never stop — and the implicit expectation has become that we shouldn't either. Cognitive exhaustion from AI is \"both real and significant.\" We built a world without limits, and we are collapsing under the weight of its speed.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "A day off isn't the same thing as Sabbath. Eugene Peterson called the secularised day off a \"bastard sabbath.\" Sabbath is resistance — a weekly declaration that you are not a machine. John Mark Comer: \"Any serious effort toward spiritual formation starts not with effort — it starts with rest.\"",
  },
  {
    type: "paragraph",
    text: "The always-on life is, at its root, a form of practical atheism. Sabbath is the weekly practice of releasing the grip — of resting in the reality that the world does not hinge on your productivity.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Pick a day and a tithe of time: if AI lets you finish 3 days of work in half a day, shabbat the rest instead of filling it with more work.",
      "Put the phone down. Stop coordinating, reviewing, producing. Let the agents run without you for 24 hours.",
      "The fight for Sabbath is not a scheduling problem. It is a trust problem.",
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
        text: "In the summer of 2023, I was asked to give a public talk at the University of the Nations campus in Kona, Hawaii — a Thursday night gathering that draws staff, students, and local community, in the main hall. My topic was AI.",
      },
      {
        type: "paragraph",
        text: "I remember preparing for the talk and even at that stage being shocked with what I was seeing with AI — the speed of the technology, the scope of what was being built, what it meant for the next generation of young people heading into missions, into careers, into every sphere of society. I wasn't pessimistic. But I was urgent. Because even then, before most people had caught up to what was happening, it was clear that this was not just a new tool. It was a new pace. A new pressure. A new set of expectations about what human beings should be able to produce, and how fast, and how constantly.",
      },
      {
        type: "paragraph",
        text: "What I didn't fully articulate that night — but have been sitting with ever since — is the spiritual question underneath all of it. Not just what AI does to our output, but what it does to our souls. Not just how it accelerates our productivity, but how it quietly erodes our capacity to stop, and why it is critical for us to stop and look at the impact of AI tricking us into an always on, always more lifestyle.",
      },
    ],
  },
  {
    id: "promise",
    title: "The Promise That Didn't Deliver",
    blocks: [
      {
        type: "paragraph",
        text: "The original pitch of the AI revolution was straight forward: automate the repetitive tasks, and you will finally get your time back.",
      },
      {
        type: "paragraph",
        text: "By 2026, we know what actually happened. The autonomous AI systems we've built don't sleep. They run 24/7. And because our digital counterparts never stop, the implicit expectation has become that we shouldn't either. A Harvard Business Review study of {{stat:1488: full-time workers}} found that cognitive exhaustion from AI is \"both real and significant\" — AI reduces the cost of production but consistently increases the cost of coordination, review, and decision-making. We are not doing less. We are doing different work — managing a relentless stream of synthetic output — and it is grinding people down in ways that feel new but are spiritually very old.",
      },
      {
        type: "paragraph",
        text: "Researchers studying regular AI users gave it a name: \"AI fatigue\" — a set of negative reactions to systems perceived as overly powerful, impersonal, or cognitively demanding (RSIS International, 2025). One participant in the study captured it simply: \"I no longer know if I like something because it's me, or because an algorithm suggested it to me.\"",
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
        text: "The late Eugene Peterson — the pastor and writer who gave us The Message translation of the Bible and decades of serious thinking about spiritual life — had a name for this: a bastard sabbath. A secularised day off dressed up as rest. The difference matters enormously. A day off is about recovery. Refuelling the tank so you can get back to producing. A Sabbath is something else entirely. It is resistance. Reorientation. A weekly declaration, made with your actual schedule, that you are not a machine.",
      },
      {
        type: "paragraph",
        text: "John Mark Comer, who has written and spoken extensively on the relationship between spiritual formation and the pace of modern life, frames it this way: \"Any serious effort toward spiritual formation starts not with effort — it starts with rest.\" That's a disorienting idea in a culture that treats output as the measure of everything. But it's grounded in something much older than any productivity philosophy.",
      },
      {
        type: "paragraph",
        text: "In Genesis 2, after six days of creation, God rested. Not because he was depleted. Not because he needed to recover. He rested because the work was complete — and in resting, he modelled something fundamental about what it means to be human. The Hebrew word is shabat — to stop, to cease, to be complete. It can also be translated: to celebrate. That texture gets lost when we reduce Sabbath to mere absence of work. It is not simply not-working. It is the deliberate choice to delight. Unless we are careful, AI's ability to build anything, generate anything and work without needing to rest, we will find ourselves unconsciously trying to keep up. Sam Altman has said that by the end of 2026 we will see agents capable of week-long autonomous work, checking in only for final sign-off (The AI Frontiers Summit 2026).",
      },
      {
        type: "paragraph",
        text: "The other critical reflection from the biblical understanding of sabbath is that there is a direct link between creating, stewarding, and working that is fundamental to the ability to sabbath. To celebrate you have to have completed a creation-work cycle. Outsourcing our role in work to AI is creating a strange new problem of the soul that we are beginning to see; incredible things completed, but because it didn't cost us anything to make it, what is there to celebrate.",
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
        text: "Over the last two years, our family navigated one of the most complex seasons we've faced — leaving our home in Kona after ten years of full-time missions work, transitioning across three countries, and landing back in Tauranga, New Zealand, in 2025 with 14 checked bags, four kids, and a very long to-do list. In that same window, I was finishing a decade of work developing new Bible engagement tools and launching a new Bible called SourceView Together — a platform that I AI coded in 6 months. The tool is designed to help people read Scripture together in groups, in person, in a way that's genuinely interactive and alive. It's exciting, hard work. Pioneering something new rarely isn't.",
      },
      {
        type: "paragraph",
        text: "And alongside all of that — the move, the app, the ongoing teaching trips to Norway, Kenya, Nigeria — I found myself noticing something. The AI tools I was using to accelerate my work weren't giving me more margin. They were filling every margin I had. Every time I got faster at one thing, there was more to do with the time I'd recovered. The machine never runs out of tasks. The question is whether I do. Or whether I should…",
      },
      {
        type: "paragraph",
        text: "The research backs up what I was feeling. One study described what happens when workers receive high-quality AI assistance: they become more likely to disengage their own judgment, to free-ride on the machine's output, to \"fall asleep at the wheel\" of their own thinking (Dell'Acqua, 2023). The always-on life doesn't just exhaust us. It quietly trains us out of the capacity for deep reflection, the very capacity that Sabbath is designed to protect.",
      },
    ],
  },
  {
    id: "theology",
    title: "A Theology of Human Limits",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the theological point underneath all of this: when we refuse to stop, we are functionally declaring that we do not trust God to hold the world without our constant input, needing us to strain to then become god-like. With 2026 AI tools it can be easy to think we are.",
      },
      {
        type: "paragraph",
        text: "Dallas Willard — one of the most important Christian thinkers on spiritual formation of the last century — argued that the disciplines of spiritual life are not religious extras. They are the means by which character is actually transformed. \"In essence,\" Willard wrote, \"the spirit of the disciplines is about cultivating a disposition of openness, willingness, and dependence on God.\" That disposition cannot survive in a life that never pauses. It requires margin. It requires deliberate, protected space where the noise stops and something else is allowed to take up residence. It requires practices of shabbat in our family, work, study, play, relationships.",
      },
      {
        type: "paragraph",
        text: "The always-on life is, at its root, a form of practical atheism. Not a denial that God exists, but a functional denial that He is enough — that His purposes can move forward without my constant output. Sabbath is the weekly practice of releasing that grip. Letting the servers run. Letting the agents execute. And resting in the reality that the world does not hinge on my productivity (or my ability to prompt my productivity).",
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
        text: "The Church has something extraordinary to offer into that exhaustion. Not a better productivity system. Not a more optimised workflow. But the ancient, embodied, countercultural practice of stopping — protecting a 24-hour window each week where nothing is produced, nothing is coordinated, and the measure of the day is not output but delight. Delight in God, in the people around you, in the physical world he made, in the life you have been given.",
      },
      {
        type: "paragraph",
        text: "Practicing the Way — a community built around the idea of living as a serious apprentice to Jesus — frames Sabbath as \"a practice to fight against the chronic restlessness of our condition.\" That framing is exactly right. Restlessness is the condition. The algorithms are engineered to exploit it, to keep us scrolling, responding, producing. Sabbath is the weekly refusal to be exploited. A declaration that our identity is not our output, that our worth is not our productivity, and that our schedule — at least one day in seven — will be shaped by what we actually believe rather than what the machine demands.",
      },
    ],
  },
  {
    id: "where-to-start",
    title: "Where to Start",
    blocks: [
      {
        type: "paragraph",
        text: "If I'm honest, Sabbath is still a practice I am growing into. The years of building, moving, pioneering, launching — they leave a certain kind of restlessness baked in. It takes more than good intentions to undo that. What I keep coming back to is this: the fight for Sabbath is not primarily a scheduling problem. It is a trust problem. It is the daily work of believing that God is who He says He is — that He sustains what I cannot, that His purposes are not derailed by my absence, that rest is not a reward for finishing but a rhythm built into creation itself.",
      },
      {
        type: "paragraph",
        text: "John Mark Comer puts it plainly: hurry is not just about having a lot to do. Hurry is having too much to do and not enough time — and it is, as he argues, the great enemy of spiritual life. The spirit of joy and the spirit of hurry cannot live in the same house.",
      },
      {
        type: "paragraph",
        text: "So the invitation is simple, if not easy: start somewhere. Pick a day as well as a tithe throughout the day. A tithe in your work, study: if AI enabled you to finish 3 days of work/research in half of a day, instead of filling excess with more work, shabbat. It will then take intentional effort to protect it. Put the phone down. Stop coordinating. Stop reviewing. Stop producing. Let the autonomous agents run without you for 24 hours and discover that the world does not end.",
      },
      {
        type: "paragraph",
        text: "We achieve inner peace when our schedule is aligned with our values. The question Sabbath puts to us, every single week, is whether we actually believe what we say we believe. Let it ask that question.",
      },
      {
        type: "discussion",
        questions: [
          "When was the last time you genuinely stopped — not recovered, not switched tasks, but actually ceased working and producing? What does your answer reveal about the rhythms built into your life?",
          "The difference between a \"day off\" and a Sabbath is the difference between recovery and resistance. How might framing rest as a spiritual discipline rather than a reward for productivity change how you approach your week?",
          "Dallas Willard argued that the spiritual disciplines cultivate \"a disposition of openness, willingness, and dependence on God.\" In what ways does your current pace make that disposition difficult to sustain?",
          "Sabbath is ultimately a trust issue — a weekly practice of releasing control and declaring that God is sufficient. What areas of your life or work do you find hardest to put down, even for one day? What does that reveal?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Comer, J.M., Practicing the Way (PracticingTheWay.org)",
  "Dell'Acqua, F. (2023), Falling Asleep at the Wheel: Human Cognitive Engagement with AI, osf.io/qp8et",
  "Practicing the Way, Unhurrying with a Rule of Life (practicingthewayarchives.org)",
  "RSIS International (2025), Consumer Fatigue with AI, dx.doi.org/10.47772/IJRISS.2025.910000615",
  "Willard, D. (1988), The Spirit of the Disciplines, HarperOne",
  "Sam Altman, The AI Frontiers Summit 2026",
];
