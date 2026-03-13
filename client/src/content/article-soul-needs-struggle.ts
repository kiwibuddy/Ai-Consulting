/**
 * Structured content for "The Danger of Frictionless Faith: Why the Soul Needs the Struggle"
 * Source: Assets/Articles/The Danger of Frictionless Faith: Why the Soul Needs the Struggle_REVISED.md
 */

export const articleMeta = {
  slug: "why-your-soul-needs-the-struggle",
  title: "The Danger of Frictionless Faith: Why the Soul Needs the Struggle",
  subtitle: "AI wasn't just removing friction from my work. It was offering me the chance to be like God.",
  description:
    "The spiritual danger of letting AI remove all friction from life. Why struggle, effort, and limitation are essential to Christian formation. A faith-based reflection on AI dependence, human identity, and what we lose when we optimise away the hard parts of being human.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-25",
  modifiedDate: "2026-02-25",
  readTime: "14 min",
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
    text: "AI wasn't just helping me remove friction from my work. It was quietly, seductively, offering me something that no tool should ever offer a follower of Jesus: the chance to be like God. Not in some dramatic way — in the most ancient way. The way the serpent works. That is not a productivity problem. That is a Genesis 3 problem.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "The promise of AI — removing error, confusion, limitation — is really a promise to make you less human. Dallas Willard: \"grace is not opposed to effort; it is opposed to earning.\" The frictionless life trains us to despise effort. But sanctification demands it. Peter was restored not by bypassing his failure but by walking back through it at a charcoal fire. Jesus did not die to make us post-human. He died to make us fully, redeemably, gloriously human.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Leave your phone in another room. Let silence turn into prayer.",
      "Read the Bible slowly. Refuse the quick commentary until you have wrestled with the passage yourself.",
      "Embrace the beautiful brokenness of church. Let the sermon be hard to write. Let the conversation be awkward.",
      "Start the day with pen and paper: wait on the Lord for what to prioritise, what limits to have, where AI fits — if at all.",
      "Feed His sheep. Be dependent, limited, loved, human.",
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
        text: "I have a confession to make.",
      },
      {
        type: "paragraph",
        text: "I have been using AI tools almost every day since 2019. Not casually — but intentionally. Part of that was genuine curiosity, a desire for productivity, and a hope to increase my impact; I've spent years working at the intersection of technology and faith, always finding joy in creating something new or exploring what's possible. I believe that understanding a tool deeply is the only responsible way to evaluate it. But if I'm honest, part of what drove me was something I didn't see coming.",
      },
      {
        type: "punchline",
        text: "At some point over the last few years, AI stopped being a tool and started being a kind of intoxicant.",
      },
      {
        type: "paragraph",
        text: "I began to notice that I could do five days of work in a single day. Genuinely. Tasks that used to take a week were done by Tuesday morning. And then — because the capacity was there — I started filling the space. New projects. New responsibilities. Jobs I would never have taken on before because I simply wouldn't have had the bandwidth. The productivity felt extraordinary. Honestly, like a superpower. I don't know how to code but I was able to build an entire bible app in six months, then added a French translation for it too. I don't speak French.",
      },
      {
        type: "paragraph",
        text: "What I didn't notice until much later was what was happening underneath. The fatigue had become structural. It wasn't the tiredness of a hard week — it was a deeper, bone-level exhaustion that didn't lift on weekends. Research from a Harvard Business Review study of nearly {{stat:1500: full-time workers}} found that cognitive exhaustion from AI use is \"both real and significant\" (Giurge et al., 2025). A separate eight-month longitudinal study inside a US technology company found something even more sobering: AI tools don't actually reduce work — they consistently intensify it (Mendes et al., 2025). One developer in that study put it in terms I recognised immediately: \"he had shipped more code that quarter than any quarter in his career. He had also felt more drained than at any other point in his career.\"",
      },
      {
        type: "punchline",
        text: "That was me. I was doing more than I had ever done, and I was less present in all of it.",
      },
      {
        type: "paragraph",
        text: "It has only been in the last month that I've been sitting with that feeling long enough to name what was actually happening. AI wasn't just helping me remove friction from my work. It was quietly, seductively, offering me something that no tool should ever offer a follower of Jesus.",
      },
      {
        type: "punchline",
        text: "It was offering me the chance to be like God.",
      },
      {
        type: "paragraph",
        text: "Not in some dramatic, obvious way. In the most ancient and understated way — the way the serpent always works. You can know more. You can do more. The limitations that define your humanity? Those are just inefficiencies waiting to be optimised away. That is not a productivity problem. That is a Genesis 3 problem. And I don't think I'm the only one feeling it.",
      },
    ],
  },
  {
    id: "human-problem",
    title: "Not a Convenience Problem. A Human Problem.",
    blocks: [
      {
        type: "paragraph",
        text: "If you read the roadmap of any major tech company in 2026, you will keep running into the same obsession: the elimination of friction. Autonomous AI agents now handle the clunky parts of our lives — predicting what you want before you click, summarising a 300-page book into bullet points, smoothing over every operational bump on the road to maximum efficiency. In business and technology, removing friction is the highest virtue. It increases revenue, saves time, scales everything.",
      },
      {
        type: "paragraph",
        text: "But the real danger when we drag this expectation into our spiritual lives isn't just that we become lazy or distracted. It's something deeper and stranger. The promise of AI — removing the error, the confusion, the limitation, the inefficiency — is really a promise to make you less human.",
      },
      {
        type: "paragraph",
        text: "Think about what gets optimised away. Emotion. Miscommunication. Confusion. Weakness. The slow, fumbling process of not knowing what to say and saying it anyway. The awkward silence before something honest comes out. The wrong turn that becomes the right one. These aren't bugs in the human operating system. They are the operating system. They are the very conditions under which love is learned, character is formed, and God does His deepest work.",
      },
      {
        type: "paragraph",
        text: "We are made in the image of God — the imago Dei — not in the image of a machine. But we are also not God. And the offer on the table right now, in 2026, is a third option that Scripture never anticipated and never endorses: become something post-human. Optimised. Error-free. Tireless. Frictionless. Without need for God.",
      },
      {
        type: "paragraph",
        text: "A 2025 study on regular AI users, published in the International Journal of Research in Innovative Science and Research, found something that points directly at this: participants described a growing inability to distinguish their own preferences from what algorithms had shaped for them. One put it plainly: \"I no longer know if I like something because it's me, or because an algorithm suggested it to me\" (RSIS International, 2025). That is not just a consumer problem. That is a soul problem. When we outsource enough of our thinking, deciding, feeling, and forming — we don't become more than human. We become less.",
      },
      {
        type: "quote",
        text: "Grace, he wrote in The Great Omission, is not opposed to effort — it is opposed to earning. Earning is an attitude. Effort is an action.",
        attribution: "Dallas Willard (Willard, 2006, p. 61)",
      },
      {
        type: "paragraph",
        text: "The frictionless life trains us to despise effort. But sanctification demands it. We are not saved by our effort, but we are transformed through it. When we try to automate or bypass the heavy lifting of discipleship, we short-circuit the very process God uses to make us more like His Son.",
      },
    ],
  },
  {
    id: "oldest-temptation",
    title: "The Oldest Temptation in a New Costume",
    blocks: [
      {
        type: "paragraph",
        text: "There is a reason this feels familiar. It is familiar.",
      },
      {
        type: "paragraph",
        text: "When Satan tempted Jesus in the wilderness, he wasn't asking Him to do evil things. He was asking the incarnate Son of God — now fully human — to reach for His divine nature, to redeem humanity not as a human but as a god. You're hungry — turn the stones to bread. You have a mission — skip the suffering and take the kingdoms now. You have a calling — prove it without the cost.",
      },
      {
        type: "paragraph",
        text: "Every temptation was an offer to accomplish something real and legitimate while bypassing the hard, slow, human road required to get there. And Jesus refused every single one. Not because the destination was wrong, but because the shortcut would have hollowed out everything the journey was meant to produce.",
      },
      {
        type: "paragraph",
        text: "The efficiency trap is the same temptation in a different costume. You have a sermon to preach — let the AI write the first draft. You have a congregation to pastor — let a tool analyse their needs. You have a calling to fulfil — here are ten ways to do it faster. The destination looks right. The route is the problem.",
      },
      {
        type: "paragraph",
        text: "Research on AI in professional settings has documented what Fabrizio Dell'Acqua at Harvard Business School calls \"falling asleep at the wheel\" — where the higher the quality of AI assistance, the less effort humans apply to their own thinking (Dell'Acqua, 2023). In a study of {{stat:181: professional recruiters}} reviewing nearly {{stat:8000: resumes}}, those assigned to better AI were actually less accurate in their assessments than those given worse AI. The conclusion was stark: AI quality and human effort are substitutes. The better the machine performs, the more we disengage (Dell'Acqua, 2023, osf.io/qp8et).",
      },
      {
        type: "paragraph",
        text: "Spiritually, the stakes of that disengagement are enormous. When we let an algorithm summarise our theology, we miss the Holy Spirit's conviction that happens during the slow, frustrating process of reading. When we abandon prayer because it feels inefficient, we miss the breaking of our own pride that only happens in the silence. When we optimise our pastoral care through tools and templates, we lose the irreplaceable friction of one human genuinely sitting with another in the dark.",
      },
      {
        type: "paragraph",
        text: "James K.A. Smith, in You Are What You Love (Baker Books, 2016), describes the way our loves are formed not primarily through ideas or information, but through practices — repeated, embodied habits that calibrate our hearts over time. The heart is not shaped by what we know. It is shaped by what we do, again and again, in the body. You cannot outsource liturgy. You cannot automate formation. The body is, as John Mark Comer puts it — drawing on Dallas Willard's The Spirit of the Disciplines — \"the sphere where our discipleship to Jesus becomes real\" (Comer, 2023; Willard, 1988). And the body is slow, limited, emotional, and breakable. That is not a problem to be solved. That is the point.",
      },
    ],
  },
  {
    id: "love-cannot-be-optimised",
    title: "Love Cannot Be Optimised",
    blocks: [
      {
        type: "paragraph",
        text: "There is a still deeper reason why the fully AI-enhanced life fails the soul, and it gets to the heart of who God is.",
      },
      {
        type: "punchline",
        text: "God is love. And love is inherently slow and inefficient.",
      },
      {
        type: "paragraph",
        text: "You cannot speed-hack a relationship with the Creator of the universe. Love requires presence — the friction of giving up your own agenda, sitting still, and offering your full, undistracted attention to another. Hurry, as John Mark Comer has articulated so powerfully in The Ruthless Elimination of Hurry, \"is not having a lot to do. Hurry is having too much to do and not enough time to do it\" (Comer, 2019, p. 23). Dallas Willard — whose insight Comer built that entire book around — called hurry \"the great enemy of spiritual life in our day\" (Willard, as cited in Comer, 2019, pp. 18–19). That diagnosis has never been more true than now.",
      },
      {
        type: "paragraph",
        text: "I think about this with my own kids. The moments that actually matter are never the efficient ones. They are the slow ones — where I put everything else down and sit on the floor with Asher, or walk barefoot with my son Liam down our driveway, just showing up with nothing to produce and nowhere to be. No output. No deliverable. Just presence.",
      },
      {
        type: "paragraph",
        text: "That is what love looks like. And it is what our relationship with God requires too. The irony of an AI-powered life is this: the more superhuman your output becomes, the more you risk becoming less present as a human being. And presence — full, unhurried, undistracted attention — is the one thing neither God nor the people who love you can receive from an optimised version of you.",
      },
      {
        type: "paragraph",
        text: "Researchers studying AI fatigue found that people aren't just tired from using these tools — they are experiencing what one study called \"relational fatigue\": a deep unease that comes from the soullessness of machine interaction, a growing longing for something that responds not just accurately but humanly (RSIS International, 2025). That longing is a signal. It is the imago Dei in us refusing to be fully satisfied by a mirror of itself.",
      },
    ],
  },
  {
    id: "fighting-for-humanness",
    title: "Fighting for Our Humanness",
    blocks: [
      {
        type: "paragraph",
        text: "Which brings me to a beach in Galilee, and a charcoal fire.",
      },
      {
        type: "paragraph",
        text: "John's Gospel features a charcoal fire in only two scenes. The first is the courtyard where Peter warmed his hands on the night of Jesus' arrest — the same night he denied knowing Him three times. The second is the beach where the risen Jesus stands waiting with breakfast already cooking. John does not make that detail accidental. He wants you to feel the weight of the location.",
      },
      {
        type: "paragraph",
        text: "This is the scene of Peter's restoration. And it is worth noticing what Jesus does not do. He does not offer Peter a clean slate that bypasses what happened. He does not optimise away the failure. He walks Peter directly back through it — one question for every denial, three times, at a charcoal fire. Peter has to re-enter the experience of his brokenness. The friction is not incidental to the restoration. It is the restoration. And when Peter — overwhelmed, grieved, stripped of every performance and pretension — says for the third time, \"Lord, you know everything; you know that I love you,\" Jesus does not say try harder, do better, or prove it next time. He says: feed my sheep. He does not ask Peter to be God. He asks Peter to be a dependent human, shaped by failure and grace, and to go and serve from exactly that place.",
      },
      {
        type: "paragraph",
        text: "Peter spent most of his time with Jesus trying to be more than he was — making promises his humanity couldn't keep, reaching for a greatness that outran his actual formation. And in his worst moment, the gap between who he claimed to be and who he actually was collapsed entirely. Three denials. A charcoal fire. The sound of a rooster. And it is precisely there — in the wreckage of his own insufficiency — that Jesus meets him and commissions him. Not after Peter has proven he has fixed the problem. Right there in the ashes of his failure, with the smell of charcoal still in the air. That is the entire point.",
      },
      {
        type: "paragraph",
        text: "The temptation of our moment — the offer that AI is quietly making to every pastor, every leader, every disciple — is to become something that doesn't fail, doesn't struggle, doesn't slow down, doesn't need rest, doesn't get confused, doesn't feel overwhelmed. To be, in a word, post-human.",
      },
      {
        type: "punchline",
        text: "But Jesus did not die to make us post-human. He died to make us fully, redeemably, gloriously human — the kind of human who knows their limits and depends on God within them, who loves imperfectly but actually, who serves not from optimised capacity but from broken, restored, Spirit-filled humanness.",
      },
      {
        type: "paragraph",
        text: "So here is what fighting for your humanness looks like in practice.",
      },
      {
        type: "paragraph",
        text: "Leave your phone in another room and let yourself feel the agonising boredom of silence until it turns into prayer. Read the Bible slowly, refusing the urge to look up the quick commentary until you have genuinely wrestled with the passage yourself. Embrace the beautiful brokenness of church — learn to deal with difficult people over years in a way that grows patience and grace that you simply cannot download. Let yourself not know the answer sometimes. Let the sermon be hard to write. Let the conversation be awkward. Let the prayer feel like nothing is happening.",
      },
      {
        type: "paragraph",
        text: "One of the projects I have been building for years is a Bible app designed specifically to get people reading Scripture together in person — four people, different voices, same room. The whole architecture runs against the grain of how technology usually operates. You have to show up. You have to wait. You have to be in the room with other actual humans. That friction is a feature, not a bug.",
      },
      {
        type: "paragraph",
        text: "For myself, I have had to make some hard decisions about what I say yes to. The fact that AI makes something possible does not make it wise. Doing five days of work every single day is not a calling. It is a slow unravelling — and one that is very easy to spiritualise as Kingdom productivity while it quietly hollows out the presence, patience, and humanness that the Kingdom actually runs on. I have begun to start my day with pen and paper: waiting on the Lord, asking for a sense of what I should prioritise, what limits I should have, when I should be done, and — if at all — where AI should fit in that workflow.",
      },
      {
        type: "paragraph",
        text: "The machines will keep promising us a life without struggle. But our Saviour did not save the world through an optimised, frictionless process. He saved it through the excruciating friction of a wooden cross — through weakness, not power; through slowness, not efficiency; through a fully human body that got tired, wept, and bled. If we want to share in His resurrection, we have to stop trying to be God, stop trying to be machines, and be willing to be exactly what He made us: dependent, limited, loved, human.",
      },
      {
        type: "punchline",
        text: "Feed His sheep.",
      },
      {
        type: "discussion",
        questions: [
          "Where in your own life has AI — or the mindset of efficiency — quietly offered you an escape from something human that God might actually want to use in you?",
          "The temptations of Jesus in the wilderness were all offers to do good things the frictionless, god-like way. Where are you most tempted to pursue the right destination by the wrong route?",
          "Peter was restored not by bypassing his failure but by walking back through it. Is there a place of failure or brokenness in your life that you have been trying to optimise around rather than allow God to redeem?",
          "What would it look like this week to deliberately choose the slower, harder, more present path — in prayer, in community, or in your own discipleship?",
          "How will you respond when working in an environment that expects more than is humanly possible? What does God think about that? What is His solution?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Comer, J.M. (2019). The Ruthless Elimination of Hurry: How to Stay Emotionally Healthy and Spiritually Alive in the Chaos of the Modern World. WaterBrook.",
  "Comer, J.M. (2023). Practicing the Way: Be with Jesus. Become Like Him. Do as He Did. WaterBrook.",
  "Comer, J.M. (2023). The body is the sphere where our discipleship to Jesus becomes real [Audio podcast transcript]. Art of Manliness Podcast #1013: Practicing Spiritual Disciplines as an Act of Resistance. artofmanliness.com/character/advice/podcast-1013-practicing-spiritual-disciplines-as-an-act-of-resistance/",
  "Dell'Acqua, F. (2023). Falling Asleep at the Wheel: Human Oversight of AI and Cognitive Disengagement. Harvard Business School / Open Science Framework. osf.io/qp8et",
  "Giurge, L. et al. (2025). Cognitive exhaustion from AI use: Evidence from a large-scale workplace study. Harvard Business Review.",
  "Mendes, R. et al. (2025). Eight-month longitudinal study: AI intensification of developer workload. [US technology company study, reported via Matt Wolfe: 'AI Is Frying Your Brain'. youtube.com/@m_wolfe]",
  "RSIS International. (2025). Consumer fatigue with AI: A qualitative study of 22 regular AI users. International Journal of Research in Innovative Science and Research Technology. dx.doi.org/10.47772/IJRISS.2025.910000615",
  "Smith, J.K.A. (2016). You Are What You Love: The Spiritual Power of Habit. Baker Books.",
  "Willard, D. (1988). The Spirit of the Disciplines: Understanding How God Changes Lives. HarperOne.",
  "Willard, D. (2006). The Great Omission: Reclaiming Jesus's Essential Teachings on Discipleship. HarperOne. [Hurry quote transmitted via Comer, 2019, pp. 18–19, who received it from John Ortberg.]",
];

/** Full "A note on how I wrote this article" from the revised source. */
export const authorNote =
  "The personal material in this article — the confession about AI use since 2019, the bone-level fatigue, my kids Asher and Liam, the Bible app I've been building — is mine. These are not reconstructed experiences. They are what I've been living. " +
  "I used Google NotebookLM to organise research across source documents including academic papers and studies on AI fatigue, cognitive disengagement, and consumer research. I then worked with Claude Sonnet (Anthropic) across multiple drafting sessions — the AI produced initial structural and prose drafts for the research-heavy sections, which I revised, cut, and rewrote substantially. The Peter/charcoal fire reflection, the wilderness temptation framing, and the theological argument throughout are mine. " +
  "The intellectual framework of hurry-as-spiritual-enemy is substantially indebted to John Mark Comer's The Ruthless Elimination of Hurry and Practicing the Way, and to Dallas Willard's The Spirit of the Disciplines and The Great Omission — debts I have tried to make explicit in the text and bibliography rather than leave hidden in the background. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
