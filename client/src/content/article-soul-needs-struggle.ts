/**
 * Structured content for "The Danger of an Effortless Faith: Why the Soul Needs the Struggle"
 */

export const articleMeta = {
  slug: "why-your-soul-needs-the-struggle",
  title: "The Danger of an Effortless Faith: Why the Soul Needs the Struggle",
  subtitle:
    "This technology wasn't just removing the natural resistance from my work. It was offering me a chance to be like God.",
  description:
    "The spiritual danger of effortless AI: why struggle, effort, and limitation are essential to Christian formation. Genesis 3, wilderness temptations, Peter's charcoal fire, and practical ways to fight for your humanness.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-25",
  modifiedDate: "2026-05-21",
  readTime: "16 min",
  category: "AI & Faith",
  image: "/images/beach-coal-fire.jpg",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/why-your-soul-needs-the-struggle",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "AI did not just remove friction from work — it quietly offered something no tool should offer a follower of Jesus: the chance to act like God. Five days of output in an afternoon. More accomplished than ever, less present for all of it. That is not a productivity problem. It is a Genesis 3 problem.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "Why the promise of automation is really a promise to make you less human. Dallas Willard on grace and effort. Jesus's wilderness refusals, cognitive disengagement with AI assistance, love as slow and inefficient, Peter restored at the charcoal fire — and practical choices to fight for humanness.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Leave your phone in another room. Let silence turn into prayer.",
      "Read the Bible slowly. Wrestle with the text before reaching for commentary.",
      "Embrace the messy reality of church. Let the sermon be hard to write. Let the conversation be awkward.",
      "Start the day with pen and paper: wait on the Lord for priorities, limits, and where AI fits — if at all.",
      "Stop trying to be machines. Be dependent, limited, and deeply loved.",
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
        text: "Here is something I have discovered about AI.",
      },
      {
        type: "paragraph",
        text: "I have been working with artificial intelligence tools since 2020. My use was highly intentional. I spent years working where technology and faith overlap, and I genuinely enjoy creating things. It seems to me that the only responsible way to evaluate software is to understand it deeply. But if I am being totally honest with myself, another underlying drive was at play. At a certain point, the software crossed a line from being a helpful tool to a genuine addiction. There is a distinct thrill in suddenly possessing superhuman output. If I wanted to build more or move faster, all I had to do was surrender another piece of the process to the machine.",
      },
      {
        type: "paragraph",
        text: "I realized I could squeeze five days of output into a single afternoon. Jobs that normally took a week were completely wrapped up by Tuesday morning. Since the extra time was there, I just started filling it. I took on fresh projects. I accepted responsibilities I never would have considered before because my bandwidth used to be so limited. The sheer volume of output felt incredible. I do not know how to code, yet I managed to build a complete Bible app in six months. I even added a full French translation (which is slightly ridiculous considering I do not speak the language).",
      },
      {
        type: "paragraph",
        text: "What I missed until much later was the heavy toll accumulating underneath it all. My fatigue had become a structural problem. It was not just the normal tiredness you feel after a long week. It was a deep, bone-level exhaustion that refused to lift on Saturday morning.",
      },
      {
        type: "paragraph",
        text: "A 2025 Harvard Business Review study involving nearly {{stat:1500: full-time employees}} suggests that the cognitive drain from using these systems is highly significant. A separate longitudinal study inside a tech company uncovered something perhaps even more alarming. These systems do not actually reduce our workload. They appear to consistently intensify it. A developer in that study mentioned shipping more code than at any other point in his career. At the exact same time, he felt more drained than ever before.",
      },
      {
        type: "punchline",
        text: "That was exactly my life. I was accomplishing more than ever, but I was noticeably less present for it.",
      },
      {
        type: "paragraph",
        text: "It took me until very recently to finally name what was happening. This software was not just removing the natural tension from my daily tasks. It was quietly offering me something that a follower of Jesus should probably never entertain.",
      },
      {
        type: "punchline",
        text: "It was offering me the chance to act like God.",
      },
      {
        type: "paragraph",
        text: "This was not some dramatic, cinematic temptation. It happened in the most ancient, understated way imaginable. It is the exact same pitch the serpent always uses. You are told you can know more. Doing more is suddenly easy. The basic limitations that define your humanity are treated as mere inefficiencies waiting to be optimized away.",
      },
      {
        type: "punchline",
        text: "That is not a time-management issue. It is a Genesis 3 issue. I highly doubt I am the only person feeling it.",
      },
    ],
  },
  {
    id: "human-problem",
    title: "Not a Convenience Problem. A Human Problem.",
    blocks: [
      {
        type: "paragraph",
        text: "If you read the roadmap of any major tech company right now, you will keep running into the same obsession. They want to eliminate all effort. Autonomous agents handle the clunky parts of our schedules. They summarize a massive book into a few bullet points and smooth over every operational bump on the road to maximum output. In the business world, removing resistance is the highest possible virtue. It saves time and scales everything beautifully.",
      },
      {
        type: "paragraph",
        text: "But dragging this expectation into our spiritual lives creates a strange danger. It isn't just that we become lazy.",
      },
      {
        type: "punchline",
        text: "The promise of automation is really a promise to make you less human.",
      },
      {
        type: "paragraph",
        text: "Think about what gets optimized away. We lose emotion. Miscommunication disappears. The slow process of not knowing what to say, but trying to say it anyway, is completely bypassed. Awkward silences are erased. These are not bugs in the human operating system. They are the exact conditions where love is learned and character is forged. It is where God does His deepest work.",
      },
      {
        type: "paragraph",
        text: "We are made in the image of God. We are not made in the image of a machine. But we are also not divine ourselves. The offer currently on the table is a third option that Scripture never endorses: becoming something post-human. A version of yourself that is error-free, tireless, and completely independent of God.",
      },
      {
        type: "paragraph",
        text: "A recent study on regular software users found that participants described a growing inability to distinguish their own preferences from what algorithms had shaped for them. One person plainly stated they no longer knew if they liked something organically, or if a computer just trained them to like it. When we outsource our thinking and feeling to a server, we do not become superhuman. We become a little less human.",
      },
      {
        type: "quote",
        text: "Grace is not opposed to effort. It is opposed to earning. Earning is a specific attitude, while effort is simply an action.",
        attribution: "Dallas Willard, The Great Omission",
      },
      {
        type: "paragraph",
        text: "An effortless life trains us to despise hard work. But the process of sanctification actually demands it. We are not saved by our effort. We are, however, transformed through it. When we try to automate the heavy lifting of discipleship, we short-circuit the very process God uses to make us look more like Jesus.",
      },
    ],
  },
  {
    id: "oldest-temptation",
    title: "The Oldest Temptation in a New Costume",
    blocks: [
      {
        type: "paragraph",
        text: "There is a reason this feels so familiar.",
      },
      {
        type: "paragraph",
        text: "When Satan tempted Jesus in the wilderness, he was not asking Him to do obviously evil things. He was asking the incarnate Son of God to reach for His divine nature. He wanted Jesus to redeem the world as a god rather than as a human. If you are hungry, just turn the stones to bread. If you have a mission, skip the suffering and take the kingdoms immediately.",
      },
      {
        type: "paragraph",
        text: "Every single temptation was an offer to accomplish something legitimate while completely bypassing the slow, painful human road required to get there. Jesus refused every time.",
      },
      {
        type: "punchline",
        text: "The destination was not the problem. The shortcut was the problem, because it would have hollowed out everything the journey was meant to produce.",
      },
      {
        type: "paragraph",
        text: "The efficiency trap is the exact same temptation wearing modern clothes. If you have a sermon to preach, you might let an algorithm write the first draft. If you have a congregation to care for, you might let software analyze their needs. The final result looks correct, but the route is compromised.",
      },
      {
        type: "paragraph",
        text: "Research on professional settings documents a phenomenon where humans apply less effort to their own thinking when they have high-quality software assistance. A study of recruiters reviewing resumes showed that those given better digital tools were actually less accurate in their assessments. The better the machine performs, the more we check out mentally.",
      },
      {
        type: "paragraph",
        text: "The spiritual stakes of that disengagement are massive. When an algorithm summarizes our theology, we miss the Holy Spirit's conviction that usually happens during the slow process of reading. When we abandon prayer because it feels like a waste of time, we miss the breaking of our own pride. When we automate pastoral care, we lose the irreplaceable tension of one human genuinely sitting with another in the dark.",
      },
      {
        type: "paragraph",
        text: "James K.A. Smith points out that our hearts are shaped primarily by repeated physical practices rather than raw information. You cannot outsource liturgy. The body is slow, emotional, and breakable. That is not a design flaw to be solved. That is the entire point.",
      },
    ],
  },
  {
    id: "love-cannot-be-optimised",
    title: "Love Cannot Be Optimized",
    blocks: [
      {
        type: "paragraph",
        text: "There is a deeper reason why a fully automated life fails the soul. It gets right to the heart of who God actually is.",
      },
      {
        type: "punchline",
        text: "God is love. Love is inherently slow and wonderfully inefficient.",
      },
      {
        type: "paragraph",
        text: "You cannot speed-hack a relationship with the Creator. Love requires genuine presence. It demands the effort of giving up your own agenda to offer your full attention to someone else. John Mark Comer articulates that hurry is not just having a lot to do. It is having too much to do and lacking the time to do it well. Dallas Willard called hurry the great enemy of the modern spiritual life. That diagnosis feels truer today than ever.",
      },
      {
        type: "paragraph",
        text: "I think about this constantly with my own kids. The moments that actually matter are never the efficient ones. The important moments happen when I put everything else down and just sit on the floor with Asher. They happen when I walk barefoot down the driveway with Liam. I show up with nothing to produce and nowhere else to be.",
      },
      {
        type: "paragraph",
        text: "That is what love looks like. It is exactly what our relationship with God requires.",
      },
      {
        type: "punchline",
        text: "The brutal irony of an automated life is that the more superhuman your output becomes, the less present you are as a person. Unhurried attention is the one thing neither God nor your family can receive from a hyper-optimized version of you.",
      },
      {
        type: "paragraph",
        text: "Researchers studying digital fatigue note that people are experiencing a deep unease from the soullessness of machine interactions. People are longing for a response that is actually human rather than just accurate. That longing is a signal. It is the image of God inside us refusing to be satisfied by a cheap mirror.",
      },
    ],
  },
  {
    id: "fighting-for-humanness",
    title: "Fighting for Our Humanness",
    blocks: [
      {
        type: "paragraph",
        text: "This brings me to a beach in Galilee and a small charcoal fire.",
      },
      {
        type: "paragraph",
        text: "The Gospel of John mentions a charcoal fire in exactly two specific scenes. The first is the courtyard where Peter warmed his hands on the night he denied knowing Jesus. The second is the beach where the risen Jesus stands waiting with breakfast. John does not make that detail an accident. He wants the reader to feel the heavy weight of that location.",
      },
      {
        type: "paragraph",
        text: "This is the scene of Peter's restoration. Notice what Jesus does not do here. He does not offer Peter a clean slate that simply bypasses the failure. He walks Peter directly back through the pain. One question is asked for every single denial. Peter has to re-enter the experience of his brokenness. The tension is not incidental to the restoration; it is the core of the restoration. When Peter is finally stripped of his performance and says he loves Him, Jesus does not tell him to try harder next time. He simply says to feed His sheep. He asks Peter to be a dependent human and to serve from that exact place of weakness.",
      },
      {
        type: "paragraph",
        text: "Peter spent most of his time with Jesus trying to be more than he actually was. In his worst moment, the gap between who he claimed to be and who he was completely collapsed. Yet Jesus meets him right there in the ashes of his failure.",
      },
      {
        type: "paragraph",
        text: "The temptation of our current moment is the offer to become something that never fails, never slows down, and never feels overwhelmed.",
      },
      {
        type: "punchline",
        text: "But Jesus did not die to make us post-human. He died to make us fully and gloriously human. He wants us to be people who know our limits and depend on God within them.",
      },
      {
        type: "paragraph",
        text: "Fighting for your humanness requires practical choices.",
      },
      {
        type: "paragraph",
        text: "Leave your phone in another room. Let yourself feel the agonizing boredom of silence until it finally turns into prayer. Read the Bible slowly. Refuse the urge to look up a quick commentary until you have wrestled with the text yourself. Embrace the messy reality of church. Learn to deal with difficult people over the years to grow patience that simply cannot be downloaded. Let the sermon be hard to write. Let the conversation be awkward.",
      },
      {
        type: "paragraph",
        text: "One of the projects I spent years building is a Bible app designed to get people reading Scripture together in person. Four people use different voices in the same room. The whole architecture runs against the grain of how modern software usually operates. You have to actually show up and wait for others. That built-in resistance is a feature, not a bug.",
      },
      {
        type: "paragraph",
        text: "I have had to make some hard decisions about my own schedule. The fact that software makes something possible does not automatically make it wise. Doing five days of work every single day is a slow unraveling. It is incredibly easy to spiritualize that output as Kingdom productivity while it quietly hollows out your soul. I now start my day with pen and paper. I wait on the Lord to sense my priorities and my limits.",
      },
      {
        type: "paragraph",
        text: "The machines will keep promising us a life without struggle. But our Savior saved the world through the excruciating agony of a wooden cross. It was accomplished through weakness and slowness. If we want to share in His resurrection, we have to stop trying to be machines. We need to be willing to be exactly what He made us: dependent, limited, and deeply loved.",
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
          "Where in your own life has an efficiency mindset quietly offered you an escape from a difficult human situation that God might actually want to use?",
          "The temptations of Jesus in the wilderness were all offers to do good things the easy, god-like way. Where are you most tempted to pursue the right destination by the wrong route?",
          "Peter was restored not by bypassing his failure, but by walking back through it. Is there a place of brokenness in your life that you are trying to optimize around rather than allowing God to redeem?",
          "What would it look like this week to deliberately choose the slower, harder, more present path in your own discipleship?",
          "How will you respond when working in an environment that expects more than is humanly possible?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Comer, J.M. (2019). The Ruthless Elimination of Hurry: How to Stay Emotionally Healthy and Spiritually Alive in the Chaos of the Modern World. WaterBrook.",
  "Comer, J.M. (2023). Practicing the Way: Be with Jesus. Become Like Him. Do as He Did. WaterBrook.",
  "Dell'Acqua, F. (2023). Falling asleep at the wheel: Human cognitive engagement with AI. Harvard Business School / Open Science Framework. osf.io/qp8et",
  "Giurge, L. et al. (2025). Cognitive exhaustion from AI use. Harvard Business Review.",
  "Mendes, R. et al. (2025). Longitudinal study: AI intensification of developer workload [US technology company].",
  "RSIS International. (2025). Consumer fatigue with AI. International Journal of Research in Innovative Science and Research. dx.doi.org/10.47772/IJRISS.2025.910000615",
  "Smith, J.K.A. (2016). You Are What You Love: The Spiritual Power of Habit. Baker Books.",
  "Willard, D. (2006). The Great Omission: Reclaiming Jesus's Essential Teachings on Discipleship. HarperOne.",
  "Willard, D. (1988). The Spirit of the Disciplines: Understanding How God Changes Lives. HarperOne.",
];

/** Full "A note on how I wrote this article" from the revised source. */
export const authorNote =
  "The personal material in this article — the confession about AI use since 2020, the bone-level fatigue, my kids Asher and Liam, the Bible app I have been building — is mine. These are not reconstructed experiences. They are what I have been living. " +
  "I used Google NotebookLM to organise research across source documents including academic papers and studies on AI fatigue, cognitive disengagement, and consumer research. I then worked with Claude Sonnet (Anthropic) across multiple drafting sessions — the AI produced initial structural and prose drafts for several sections, which I revised, cut, and rewrote substantially. The Peter/charcoal fire reflection, the wilderness temptation framing, and the theological argument throughout are mine. " +
  "The intellectual framework of hurry-as-spiritual-enemy is substantially indebted to John Mark Comer's The Ruthless Elimination of Hurry and Practicing the Way, and to Dallas Willard's The Spirit of the Disciplines and The Great Omission — debts I have tried to make explicit in the text and bibliography rather than leave hidden in the background. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
