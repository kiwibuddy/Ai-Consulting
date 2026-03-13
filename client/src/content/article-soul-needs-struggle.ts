/**
 * Structured content for "Why Your Soul Needs the Struggle: The Spiritual Danger of an AI Life"
 * Used by the article page for sections and SEO.
 */

export const articleMeta = {
  slug: "why-your-soul-needs-the-struggle",
  title: "Why Your Soul Needs the Struggle: The Spiritual Danger of an AI Life",
  subtitle: "AI wasn't just removing friction from my work. It was offering me the chance to be like God.",
  description:
    "Why your soul needs the struggle: the spiritual danger of a frictionless AI life. Grace is not opposed to effort. How to fight for your humanness in the age of optimisation. By Nathaniel Baldock, AI consultant New Zealand.",
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
    text: "AI wasn't just helping me remove friction from my work. It was quietly, seductively, offering me something that no tool should ever offer a follower of Jesus: the chance to be like God. Not in some dramatic way — in the most ancient way. The way a serpent works. You can know more. You can do more. The limitations that define your humanity? Those are just inefficiencies waiting to be optimised away. That is not a productivity problem. That is a Genesis 3 problem.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "The promise of AI — removing error, confusion, limitation — is really a promise to make you less human. What gets optimised away is the very stuff under which love is learned and character is formed. Dallas Willard: grace is not opposed to effort; it is opposed to earning. The limitless life trains us to despise effort. But sanctification demands it.",
  },
  {
    type: "paragraph",
    text: "Jesus did not die to make us post-human. He died to make us fully, redeemably, gloriously human. Peter was restored not by bypassing his failure but by walking back through it at a charcoal fire. The friction is the restoration.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Leave your phone in another room. Let silence turn into prayer.",
      "Read the Bible slowly. Refuse the quick commentary until you have wrestled with the passage.",
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
        text: "I have a confession to make. I have been using AI tools almost every day since 2019. Not casually — but intentionally. Part of that was for genuine curiosity, productivity and to help increase my impact; I've spent years working at the intersection of technology and faith, always finding so much joy creating something new or discovering a new technology. I believe it's important to understand new tools and technology to both enable innovation but also to understand what impact that will have on our life and culture. iPhones, social media, autonomous cars are all \"things\" but they change and shape who we are as well. If I'm honest, engaging with AI these last 5 years has surprised me. It is not just a new technology or tool. I am discovering that it is something else entirely. Something I didn't see coming.",
      },
      {
        type: "paragraph",
        text: "At some point over the last few years, AI stopped being a tool and started being a kind of intoxicant. I began to notice that I could do five days of work in a single day. Genuinely. Tasks that used to take a week were done by Tuesday morning. And then — because the capacity was there — I started filling the space. New projects. New responsibilities. Jobs I would never have taken on before because I simply wouldn't have had the bandwidth. The productivity felt extraordinary. It felt, honestly, like a superpower. I don't know how to code but was able to build an entire Bible app in 6 months, then even added a French translation for the app as well… I don't speak French.",
      },
      {
        type: "paragraph",
        text: "What I didn't notice until much later was what was happening underneath. The fatigue had become structural. It wasn't the tiredness of a hard week — it was a deeper, bone-level exhaustion that didn't lift on weekends. Research from a Harvard Business Review study of nearly {{stat:1500: full-time workers}} has confirmed what I was experiencing in my own body: cognitive exhaustion from AI use is, in their words, \"both real and significant.\" A separate eight-month study inside a US technology company found something even more sobering — AI tools don't actually reduce work. They consistently intensify it. One developer in that study put it plainly: he had shipped more code that quarter than any quarter in his career. He had also felt more drained than any quarter in his career.",
      },
      {
        type: "punchline",
        text: "That was me. I was doing more than I had ever done, and I was less present in all of it.",
      },
      {
        type: "punchline",
        text: "It has only just been in this last month that I have been sitting with that feeling long enough to name what was actually happening. AI wasn't just helping me remove friction from my work. It was quietly, seductively, offering me something that no tool should ever offer a follower of Jesus. It was offering me the chance to be like God. Not in some dramatic, obvious way. In the most ancient and understated way — the way a serpent works. You can know more. You can do more. The limitations that define your humanity? Those are just inefficiencies waiting to be optimised away. That is not a productivity problem. That is a Genesis 3 problem. I don't think I'm the only one who is feeling this either. I think as AI continues to move more into our everyday life, this will be experienced on a massive scale.",
      },
    ],
  },
  {
    id: "human-problem",
    title: "Not a Convenience Problem. A Human Problem.",
    blocks: [
      {
        type: "paragraph",
        text: "If you read the roadmap of any major tech company in 2026, you will keep running into the same obsession: the elimination of friction and limitations by optimising machine learning to better do everything. The goal is to free humanity from \"work\" so we can be free to pursue more important things… which is what? Eternal leisure? Autonomous AI agents now handle the clunky parts of our lives — predicting what you want before you click, summarising a 300-page book into bullet points, smoothing over every operational bump on the road to maximum efficiency.",
      },
      {
        type: "paragraph",
        text: "In the Business and Technology world, removing friction and optimising output is a high virtue. It increases revenue, saves time, scales everything. But the real danger when we drag this expectation into our spiritual lives isn't just that we become lazy or distracted. It's something deeper and stranger. The promise of AI — removing the error, the confusion, the limitation, the inefficiency — is really a promise to make you less human.",
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
        text: "One study of regular AI users captured this unease well. Participants described a growing inability to distinguish their own preferences from what algorithms had shaped for them. One put it plainly: \"I no longer know if I like something because it's me, or because an algorithm suggested it to me.\" That is not just a consumer problem. That is a soul problem. When we outsource enough of our thinking, deciding, feeling, and forming — we don't become more than human. We become less.",
      },
      {
        type: "paragraph",
        text: "Dallas Willard understood the mechanism. Grace, he wrote, is not opposed to effort — it is opposed to earning. Earning is an attitude. Effort is an action. The limitless life trains us to despise effort. But sanctification demands it. We are not saved by our effort, but we are transformed through it. When we try to automate or bypass the heavy lifting of discipleship and work, we short-circuit the very process God uses to make us more like His Son and less like a human.",
      },
    ],
  },
  {
    id: "oldest-temptation",
    title: "The Oldest Temptation in a New Costume",
    blocks: [
      {
        type: "paragraph",
        text: "There is a reason this feels familiar. It is familiar. When Satan tempted Jesus in the wilderness, he wasn't asking Him to do evil things. He was asking the incarnated Son of God, now fully human, to reach for His \"Godness\", to redeem humanity not as a human but as a god. You're hungry — turn the stones to bread. You have a mission — skip the suffering and take the kingdoms now. You have a calling — prove it without the cost.",
      },
      {
        type: "paragraph",
        text: "Every temptation was an offer to accomplish something real and legitimate while bypassing the hard, slow, human road required to get there. And Jesus refused every single one. Not because the destination was wrong, but because the shortcut would have hollowed out everything the journey was meant to produce. We are called to be like Him, but how can we be like someone who is not human? Think of superhero movies — no one can be like Superman; he has an unfair advantage. He is not human. Try to keep up with him saving the world and you will quickly realise your human limits.",
      },
      {
        type: "paragraph",
        text: "The AI trap is the same temptation in a different costume. You have a sermon to preach — let the AI write the first draft. You have a congregation to pastor — let a tool analyse their needs. You have a calling to fulfil — here are ten ways to do it faster. The destination looks right. The route is the problem.",
      },
      {
        type: "paragraph",
        text: "In 2026 this problem is getting worse as the AI models are getting increasingly advanced. Research on AI in professional settings has documented a phenomenon called \"falling asleep at the wheel\" — where the higher the quality of AI assistance, the less effort humans apply to their own thinking. In one study, professional recruiters given better AI were actually less accurate in their assessments than those given worse AI. The conclusion was stark: AI quality and human effort are substitutes. The better the machine performs, the more we disengage.",
      },
      {
        type: "paragraph",
        text: "Spiritually, the stakes of that disengagement are enormous. When we let an algorithm summarise our theology, we miss the Holy Spirit's conviction that happens during the slow, frustrating process of reading. When we abandon prayer because it feels inefficient, we miss the breaking of our own pride that only happens in the silence. When we optimise our pastoral care through tools and templates, we lose the irreplaceable friction of one human genuinely sitting with another in the dark. When we abdicate our work to AI we lose part of our identity and uniqueness as a person by eliminating our quirks, struggles and limits. What you can do is as much a part of your identity as what you can't do.",
      },
      {
        type: "paragraph",
        text: "James K.A. Smith describes the way our loves are formed not by ideas but by practices — by repeated, embodied habits that calibrate our hearts over time. You cannot outsource liturgy. You cannot automate formation. The body is, as John Mark Comer puts it, the sphere where discipleship to Jesus becomes real. And the body is slow, limited, emotional, and breakable. That is not a problem to be solved. That is the point.",
      },
    ],
  },
  {
    id: "love-cannot-be-optimised",
    title: "Love Cannot Be Optimised",
    blocks: [
      {
        type: "paragraph",
        text: "There is a still deeper reason why the fully AI enhanced life fails the soul, and it gets to the heart of who God is. God is love. And love is inherently slow and inefficient.",
      },
      {
        type: "paragraph",
        text: "You cannot speed-hack a relationship with the Creator of the universe. Love requires presence — the friction of giving up your own agenda, sitting still, and offering your full, undistracted attention to another. Hurry, as Comer has articulated powerfully, is not having a lot to do. Hurry is having too much to do and not enough time to do it. Dallas Willard — whose wisdom Comer built an entire book around — called hurry \"the great enemy of spiritual life in our day.\" That diagnosis has never been more true than now.",
      },
      {
        type: "paragraph",
        text: "I think about this with my own kids. The moments that actually matter are never the efficient ones. They are the slow ones — where I put everything else down and sit on the floor with Asher or walk bare feet with my son Liam down our driveway, just showing up with nothing to produce and nowhere to be. No output. No deliverable. Just presence. Man, am I finding that hard, especially when I am so easily tricked into valuing my time by the value of the product or output.",
      },
      {
        type: "paragraph",
        text: "That is what love looks like. And it is what our relationship with God requires too. The irony of an AI-powered life is this: the more superhuman your output becomes, the more you risk becoming less present as a human being. And presence — full, unhurried, undistracted attention — is the one thing neither God nor the people who love you can receive from an optimised version of you.",
      },
      {
        type: "paragraph",
        text: "Researchers studying AI fatigue found that people aren't just tired from using these tools — they are experiencing what one study called \"relational fatigue\": a deep unease that comes from the soullessness of machine interaction, a growing longing for something that responds not just accurately but humanly. That longing is a signal. It is the imago Dei in us refusing to be fully satisfied by a mirror of itself.",
      },
    ],
  },
  {
    id: "fighting-for-humanness",
    title: "Fighting for Our Humanness",
    blocks: [
      {
        type: "paragraph",
        text: "Which brings me to a beach in Galilee, and a charcoal fire. John's Gospel features a charcoal fire in only two scenes. The first is the courtyard where Peter warmed his hands on the night of Jesus' arrest — the same night he denied knowing Him three times. The second is the beach where the risen Jesus stands waiting with breakfast already cooking. John does not make that detail accidental. He wants you to feel the weight of the location.",
      },
      {
        type: "paragraph",
        text: "This is the scene of Peter's restoration. And it is worth noticing what Jesus does not do. He does not offer Peter a clean slate that bypasses what happened. He does not optimise away the failure. He walks Peter directly back through it — one question for every denial, three times, at a charcoal fire. Peter has to re-enter the experience of his brokenness. The friction is not incidental to the restoration. It is the restoration.",
      },
      {
        type: "paragraph",
        text: "And when Peter — overwhelmed, grieved, stripped of every performance and pretension — says for the third time, \"Lord, you know everything; you know that I love you,\" Jesus does not say try harder, do better, be less weak, or prove it next time. He says: feed my sheep. He does not ask Peter to be God. He asks Peter to be a dependent human, shaped by failure and grace, and to go and serve from exactly that place.",
      },
      {
        type: "paragraph",
        text: "Peter spent most of his time with Jesus trying to be more than he was — making promises his humanity couldn't keep, reaching for a greatness that outran his actual formation. And in his worst moment, the gap between who he claimed to be and who he actually was collapsed entirely. Three denials. A charcoal fire, and the brutal reality of his own limits. And it is precisely there — in the wreckage of his own insufficiency — that Jesus meets him and commissions him. Not after Peter has proven he has fixed the problem. Not after he has demonstrated he is now capable of godlike loyalty. Right there in the ashes of his failure, with the smell of charcoal still in the air. That is the entire point.",
      },
      {
        type: "paragraph",
        text: "The temptation of our moment — the offer that AI is quietly making to every pastor, every leader, father, every person — is to become something that doesn't fail, doesn't struggle, doesn't slow down, doesn't need rest, doesn't get confused, doesn't feel overwhelmed. To be, in a word, post-human. But Jesus did not die to make us post-human. He died to make us fully, redeemably, gloriously human — the kind of human who knows their limits and depends on God within them, who loves imperfectly but actually, who serves not from optimised capacity but from broken, restored, Spirit-filled humanness.",
      },
      {
        type: "paragraph",
        text: "So here is what fighting for your humanness looks like in practice. Leave your phone in another room and let yourself feel the agonising boredom of silence until it turns into prayer. Read the Bible slowly, refusing the urge to look up the quick commentary until you have genuinely wrestled with the passage yourself. Embrace the beautiful and brokenness of church — learn to deal with difficult people over years that lets you grow in patience and grace that you simply cannot download. Let yourself not know the answer sometimes. Let the sermon be hard to write. Let the conversation be awkward. Let the prayer feel like nothing is happening.",
      },
      {
        type: "paragraph",
        text: "One of the projects I have been building for years is a Bible app designed specifically to get people reading Scripture together in person — four people, different voices, same room. The whole architecture runs against the grain of how technology usually operates. You have to show up. You have to wait. You have to be in the room with other actual humans. That friction is a feature, not a bug.",
      },
      {
        type: "paragraph",
        text: "For myself, I have had to make some hard decisions about what I say yes to. The fact that AI makes something possible does not make it wise. Doing five days of work every single day is not a calling. It is a slow unravelling — and one that is very easy to spiritualise as Kingdom productivity while it quietly hollows out the presence, patience, and humanness that the Kingdom actually runs on. I have begun to start my day with a simple pen and paper to first wait on the Lord for a sense of what I should prioritise each day, what limits I should have, when I should be \"done\". What is important and what isn't. Then most importantly, where should AI fit in that workflow if at all?",
      },
      {
        type: "paragraph",
        text: "The machines will keep promising us a life without struggle. But our Saviour did not save the world through an optimised, frictionless process. He saved it through the excruciating friction of a wooden cross — through meekness, not power; through intentionality, not efficiency; through a fully human body that got tired, wept, and bled. If we want to share in His resurrection, we have to stop trying to be God, stop trying to be machines, and be willing to be exactly what He made us: dependent, limited, loved, human. Feed His sheep.",
      },
      {
        type: "discussion",
        questions: [
          "Where in your own life has AI — or the mindset of efficiency — quietly offered you an escape from something human that God might actually want to use in you?",
          "The temptations of Jesus in the wilderness were all offers to do good things the frictionless, god-like way. Where are you most tempted to pursue the right destination by the wrong route?",
          "Peter was restored not by bypassing his failure but by walking back through it. Is there a place of failure or brokenness in your life that you have been trying to optimise around rather than allow God to redeem?",
          "What would it look like this week to deliberately choose the slower, harder, more present path — in prayer, in community, or in your own discipleship?",
          "How will you respond when working with others, or in an industry that expects more than is humanly possible? What does God think? What is his solution?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Harvard Business Review (cognitive exhaustion from AI use)",
  "Dallas Willard, The Spirit of the Disciplines; grace and effort",
  "John Mark Comer, Practicing the Way; hurry and spiritual life",
  "James K.A. Smith, cultural liturgies and formation",
  "Research on \"falling asleep at the wheel\" (AI quality and human effort as substitutes)",
  "Studies on AI fatigue and relational fatigue",
];
