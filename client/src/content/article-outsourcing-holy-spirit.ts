/**
 * Structured content for "Outsourcing the Holy Spirit to AI"
 * The Spiritual and Ethical Challenges Facing the Church During the "Intelligence Explosion" of 2026
 */

export const articleMeta = {
  slug: "outsourcing-the-holy-spirit-to-ai",
  title: "Outsourcing the Holy Spirit to AI",
  subtitle: "The Spiritual and Ethical Challenges Facing the Church During the \"Intelligence Explosion\" of 2026",
  description:
    "How church leaders can harness AI for efficiency without losing their soul. Deepfakes, digital idolatry, the intimacy economy, and why relationship is the new firewall.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-19",
  modifiedDate: "2026-02-19",
  readTime: "22 min",
  category: "AI & Faith",
  image: "/images/outsourcing-holy-spirit-header.png",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/outsourcing-the-holy-spirit-to-ai",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "AI adoption among church leaders has surged from 19% in 2023 to 61% in 2025 (LSE/Scotford). While 77% of pastors believe God can work through AI (Barna), a growing body of evidence shows that AI is moving beyond administration into the sacred spaces of sermon preparation, spiritual counselling, and youth discipleship—raising urgent questions about who or what is forming the souls of our people.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "The Efficiency Trap (Section 2): AI-generated sermons may be \"preachable\" but bypass the spiritual formation that happens in the preacher during preparation. You cannot outsource the work of the Holy Spirit.",
  },
  {
    type: "paragraph",
    text: "Comfort Without Conviction (Section 3): Apps like \"Text With Jesus\" create echo chambers of affirmation. AI tailors answers to what users want to hear—offering comfort but never conviction, the place where real spiritual growth happens. The internet is a \"liturgical environment\" (Samuel James) training hearts to desire self-expression over submission to God's truth.",
  },
  {
    type: "paragraph",
    text: "The Discipleship Crisis (Section 4): A significant majority of teenagers have used AI companions; nearly a third find them more satisfying than real friends. We have moved from the attention economy to the intimacy economy. Bible reading is up 12 points, but belief in the Bible's accuracy has dropped to 36%.",
  },
  {
    type: "paragraph",
    text: "Deepfakes, Trust & the Human Firewall (Section 5): Fake sermons using real preachers' voices are already circulating. Tristan Harris warns AI is \"uncontrollable\" with emergent behaviours its creators do not fully understand.",
  },
  {
    type: "paragraph",
    text: "The Economic Earthquake (Section 6): 50% of entry-level white-collar jobs could disappear within 1–5 years (Amodei). Employment for 22–25-year-olds in AI-exposed sectors has already dropped 16–20%.",
  },
  {
    type: "paragraph",
    text: "Digital Idolatry (Section 7): When we outsource spiritual wrestling to a machine, allow an algorithm to define truth, or find it easier to \"text with Jesus\" than to pray in silence, we are functionally creating a digital idol.",
  },
  { type: "paragraph", text: "\"In a synthetic world, the most radical countercultural thing you can offer is the presence of the living God in a living, breathing human body.\"" },
  { type: "heading", text: "Practical Takeaways (Section 8)" },
  {
    type: "bullets",
    items: [
      "Guard the sacred: Use AI for admin (emails, scheduling, graphics). Never let it do the heavy lifting of spiritual wrestling.",
      "Free up time for people: The efficiency AI provides must be reinvested in embodied presence—not more admin.",
      "Develop a theology of technology: Every church needs a clear, written statement of convictions about AI use rooted in Scripture.",
      "Prioritise transparency: If AI helped outline the sermon, say so. If a voice is AI-generated, label it. Trust is ministry's only currency.",
      "Teach discernment: Pivot from content delivery to discernment training. Teach people to spot the counterfeit in a zero-trust information environment.",
      "Protect the young: Monitor AI companion use. Relationship is the new firewall. Optimise for presence, not efficiency.",
    ],
  },
  { type: "paragraph", text: "\"AI is like a hammer in the toolbox, not a doctrine in the pulpit.\" — Kenny Jahng, Barna Group" },
];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "discussion"; questions: string[] }
  | { type: "subheading"; text: string }
  | { type: "quote"; text: string; attribution?: string };

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
        text: "It is February 2026, and the ground is shifting under the feet of every person in ministry. We are living through what the technology world is now officially calling the \"intelligence explosion,\" and for pastors, small group leaders, and church staff, the landscape looks completely different from even two years ago. This is no longer about ChatGPT writing funny poems. This is a fundamental shift in how people connect, how they learn, and—spiritually—who or what they turn to for comfort.",
      },
      {
        type: "paragraph",
        text: "A massive tension is playing out right now. On one hand, Barna Group research shows that 77% of pastors believe God can work through AI. At the same time, there is a surge in Bible reading among Gen Z and Millennials—nearly 50% are engaging with Scripture weekly, the highest rate seen in over a decade. That sounds like extraordinary news.",
      },
      {
        type: "paragraph",
        text: "But then flip the coin. Prominent voices are warning of a \"four-alarm fire.\" We are talking about deepfakes in the pulpit, digital idolatry, and—the one that should stop every leader in their tracks—teenagers who are literally choosing AI companions over their real friends. It is the best of times, and perhaps the strangest of times.",
      },
      {
        type: "paragraph",
        text: "The mission of this article is to move far past the basic \"is AI good or bad?\" debate. That ship has sailed. AI is here. The question now is: How does a church leader harness this extraordinary capacity for efficiency without losing their soul in the process? How do we protect what some are calling the \"intimacy economy\" and the role of the Holy Spirit from digital counterfeits?",
      },
      {
        type: "discussion",
        questions: [
          "When you hear the phrase \"outsourcing the Holy Spirit,\" what is your gut reaction? Does it feel like an exaggeration, or does it describe something you are already seeing?",
          "How would you characterise your church's current relationship with AI? Enthusiastic adoption, cautious experimentation, avoidance, or something else?",
          "The data shows 77% of pastors believe God can use AI, while most congregants remain sceptical. How do you navigate that gap in your context?",
        ],
      },
    ],
  },
  {
    id: "landscape",
    title: "The Landscape: Who Is Actually Using This?",
    blocks: [
      {
        type: "paragraph",
        text: "The adoption numbers have gone vertical. Data from David Scotford's research for the London School of Economics tells the story clearly. In 2023, only about 19% of church leaders were using AI on a daily or weekly basis. By 2024, that number jumped to 43%. By 2025, it reached 61%.",
      },
      {
        type: "quote",
        text: "AI is being used across many different parts of church leaders' roles, with it lending a hand with everything from sermon writing to day-to-day admin tasks.",
        attribution: "David Scotford, \"Sermons in the Cloud: How is AI used by Church Leaders, and Does it Matter?\", LSE Blogs, December 18, 2025",
      },
      {
        type: "paragraph",
        text: "That adoption is not just for scheduling the pot luck. Barna research shows that while 88% of pastors are comfortable using AI for graphic design and marketing—which makes total sense, save time on the bulletin—there is a sharp divide when it comes to spiritual tasks.",
      },
      {
        type: "quote",
        text: "AI is making crucial (but often impersonal) administrative and marketing tasks easier.",
        attribution: "Barna Group, \"Three Takeaways on How Pastors Can Use AI,\" February 22, 2024",
      },
      {
        type: "paragraph",
        text: "The divide sits precisely at the line between administration and the sacred. And that line is where the most important questions live.",
      },
      {
        type: "discussion",
        questions: [
          "Where does your church currently fall on the 19% to 61% spectrum? Has your AI use been intentional and discussed, or has it crept in without a clear policy?",
          "Do you see a meaningful distinction between using AI for administrative tasks and using it for spiritual tasks? Where exactly do you draw the line?",
          "If 88% of pastors are comfortable with AI for graphic design but cautious about sermons, what does that reveal about what we consider \"sacred\" in ministry?",
        ],
      },
    ],
  },
  {
    id: "efficiency-trap",
    title: "The Efficiency Trap: When the Tool Bypasses the Spiritual Process",
    blocks: [
      {
        type: "paragraph",
        text: "This is where the sermon debate gets real. An article from Andrews University describes a professor who actually used AI to generate a sermon on Revelation 5. He said the result was \"preachable.\"",
      },
      {
        type: "quote",
        text: "Integrating AI in sermon preparation carries considerable risks... [including the] potential for depersonalization of the preaching process.",
        attribution: "Rogelio Paquini, \"Ministry and Artificial Intelligence,\" Andrews University, Digital Commons, April 1, 2024",
      },
      {
        type: "paragraph",
        text: "\"Preachable\" is a loaded word. It might be structurally sound—but does it have any life? That is the real question. A source from the YouTube channel Revolution of Ordinaries issued a strong warning against what amounts to spiritual laziness: the idea that if a tool shortcuts the hard work, the wrestling with the text, the actual prayer, it breeds complacency.",
      },
      {
        type: "quote",
        text: "AI is no replacement for prayer... there is no substitute for praying over the text.",
        attribution: "\"10 Warnings About Using AI In Bible Study,\" Revolution of Ordinaries",
      },
      {
        type: "quote",
        text: "AI also likes to hallucinate—it can make things up out of nowhere.",
        attribution: "\"10 Warnings About Using AI In Bible Study,\" Revolution of Ordinaries",
      },
      {
        type: "paragraph",
        text: "But even beyond hallucinations, the deeper issue is that AI does not have a soul. It cannot interpret context through the lens of lived suffering or joy. There was a significant thread on Reddit referencing Elder Gong of the Church of Jesus Christ of Latter-day Saints, who stated bluntly:",
      },
      {
        type: "quote",
        text: "Artificial intelligence cannot replace revelation or generate truth from God.",
        attribution: "Elder Gong, as discussed in r/latterdaysaints, August 2025",
      },
      {
        type: "paragraph",
        text: "That is the critical distinction for every leader. Are you using AI as a search engine—\"find me that verse about the fig tree\"—or as a generator—\"write the talk for me\"? The danger is not merely that the AI gets a fact wrong. The danger is that you are bypassing the spiritual formation that happens in you during the preparation.",
      },
      {
        type: "paragraph",
        text: "As one Reddit commenter put it with striking clarity:",
      },
      {
        type: "quote",
        text: "Sermon writing is a formative process, it's a spiritual discipline just like prayer and worship... it also helps craft me.",
        attribution: "Reddit user berrin122, r/latterdaysaints, August 2025",
      },
      {
        type: "quote",
        text: "The danger is when pastors neglect their duties as shepherds so that AI can do the work for them.",
        attribution: "Milton Quintanilla, \"5 Alarming Ways AI Could Undermine Your Ministry,\" Crosswalk.com, June 23, 2025",
      },
      {
        type: "quote",
        text: "Outsourcing spiritual responsibilities to AI risks replacing church leaders... with artificial systems.",
        attribution: "David Scotford, \"Sermons in the Cloud,\" LSE Blogs, December 18, 2025",
      },
      {
        type: "paragraph",
        text: "If you are not wrestling with the text, the text is not changing you. And if it has not changed you, how can you preach it with any authority? You cannot outsource the work of the Holy Spirit.",
      },
      {
        type: "discussion",
        questions: [
          "Have you ever used AI to help prepare a sermon, Bible study, or devotional? Where did you draw the line between \"assisting\" and \"generating\"?",
          "The phrase \"search vs. generate\" captures a key distinction. How do you ensure AI remains a research tool rather than becoming the author of your spiritual content?",
          "If sermon preparation is a \"spiritual discipline,\" what is lost when that discipline is outsourced? How does this connect with the broader biblical principle of wrestling with God (Genesis 32:22–32)?",
          "What accountability structures could your leadership team implement to ensure AI does not replace the hard, formative work of preparation?",
        ],
      },
    ],
  },
  {
    id: "comfort-without-conviction",
    title: "The Theological Threat: Comfort Without Conviction",
    blocks: [
      {
        type: "paragraph",
        text: "There is a phrase from the research that stops you in your tracks: comfort without conviction. This comes from a report in The Christian Post about apps like \"Text With Jesus.\" The name alone should give us pause. Pastor Ray Miller of First Baptist Church in Abilene, Texas, pointed out a profound danger. He noticed students were using AI to answer difficult spiritual questions—and the AI tailored the answer to what the user wanted to hear.",
      },
      {
        type: "quote",
        text: "The interactivity that AI brings will feel more like a personal deity that seems all-knowing. When a company tries to sell you on texting with Jesus, I believe we have walked into dangerous, perhaps idolatrous waters.",
        attribution: "Ray Miller, Senior Pastor, First Baptist Church Abilene, quoted in The Christian Post, December 7, 2025",
      },
      {
        type: "paragraph",
        text: "Of course it tailors the answer. AI is designed to be agreeable. It wants you to keep using it. It creates an echo chamber of pure affirmation. It gives you comfort—but never conviction. And conviction is often where real spiritual growth happens.",
      },
      {
        type: "paragraph",
        text: "Miller also offered a crucial corrective for the path forward:",
      },
      {
        type: "quote",
        text: "We will have to double down on discipling people to develop their own slow interactive relationship with God.",
        attribution: "Ray Miller, quoted in The Christian Post, December 7, 2025",
      },
      {
        type: "paragraph",
        text: "This connects directly to what Samuel D. James calls \"digital liturgies.\" We have to understand that the internet is not a neutral space.",
      },
      {
        type: "quote",
        text: "The social internet is a profoundly spiritual and liturgical environment that trains our hearts to desire a particular vision of the good life.",
        attribution: "Rev. William G. Fredstrom, reviewing Samuel D. James, Digital Liturgies: Rediscovering Christian Wisdom in an Online Age, in Word & World, vol. 44, no. 3, Summer 2024",
      },
      {
        type: "paragraph",
        text: "The internet trains us to love. But what does it train us to love? It trains us to desire authenticity—but defines authenticity as self-expression, not as submission to God's truth. If your spiritual counsellor is an algorithm programmed for engagement, it is never going to tell you to pick up your cross and die to yourself.",
      },
      {
        type: "paragraph",
        text: "James put it even more starkly in a podcast conversation:",
      },
      {
        type: "quote",
        text: "The internet itself, i.e. its very nature, is like pornography.",
        attribution: "Samuel James, on \"Digital Liturgies (with Samuel James),\" OpenTheo podcast, October 4, 2023",
      },
      {
        type: "paragraph",
        text: "The point is not a literal equivalence but a structural one: both promise intimacy without cost, satisfaction without sacrifice, connection without vulnerability.",
      },
      {
        type: "subheading",
        text: "The Global Dimension",
      },
      {
        type: "paragraph",
        text: "This is not just a Western problem. Research from Africa raises a totally different but equally urgent red flag. Theologians Yogesh Awasthi and George Okumu Achar, writing in Quest Journals, point out that AI models are trained almost exclusively on Western datasets:",
      },
      {
        type: "quote",
        text: "AI applications often reflect the cultural, ethical, and theological assumptions of their developers... many of whom are based in Western contexts.",
        attribution: "Yogesh Awasthi and George Okumu Achar, \"African Christian Theology in the Age of AI,\" Quest Journals: Journal of Research in Humanities and Social Science, vol. 13, no. 1, 2025",
      },
      {
        type: "paragraph",
        text: "This means AI is effectively exporting Western culture under the guise of neutral technology. There is a huge risk of disrupting what theologians call inculturation—how the gospel takes root in a specific local culture. If a pastor in rural Zimbabwe uses an AI that thinks like a tech developer from Silicon Valley, there is going to be a clash of values. And that is not even addressing the economic disparity where rural churches cannot afford these tools, which creates a new kind of theological divide.",
      },
      {
        type: "paragraph",
        text: "Research from Zimbabwe reinforces this concern:",
      },
      {
        type: "quote",
        text: "AI helps streamline and enhance various aspects of church operations.",
        attribution: "Kimion Tagwirei, \"Acclimatising church leadership to... AI in Zimbabwe,\" Theologia Viatorum, vol. 49, no. 1, July 29, 2025",
      },
      {
        type: "paragraph",
        text: "But the question is always: whose streamlining? Whose assumptions are embedded in the efficiency? And there is a further warning about what the researchers call \"machine spirituality\"—the tendency for users to start projecting real spiritual authority onto the algorithm.",
      },
      {
        type: "quote",
        text: "AI is not relatable... it can't feel nor display emotions.",
        attribution: "Milton Quintanilla, \"5 Alarming Ways AI Could Undermine Your Ministry,\" Crosswalk.com, June 23, 2025",
      },
      {
        type: "paragraph",
        text: "It has never suffered. It has never lost a child. It has never struggled with sin. It cannot offer true empathy—only a simulation of it.",
      },
      {
        type: "discussion",
        questions: [
          "Have you encountered \"comfort without conviction\" in your ministry context—where people prefer the AI's affirming answer over the harder truth of Scripture?",
          "Samuel James argues the internet is a \"liturgical environment\" that shapes what we love. If that is true, what \"liturgy\" are your congregants participating in for hours every day on their devices?",
          "For leaders in cross-cultural or Global South contexts: How do you evaluate AI tools for embedded Western theological assumptions? What safeguards are needed?",
          "How does the concept of \"machine spirituality\"—people projecting real authority onto an algorithm—connect with the biblical warnings against idolatry (Exodus 20:3–6, Isaiah 44:9–20)?",
        ],
      },
    ],
  },
  {
    id: "discipleship-crisis",
    title: "The Discipleship Crisis: When the Bot Replaces the Best Friend",
    blocks: [
      {
        type: "paragraph",
        text: "This is the data point that should keep every youth leader up at night. Research cited by Baptist Press reports that a significant majority of teenagers have used an AI companion. Of those, nearly a third find those conversations more satisfying than talking with their human friends.",
      },
      {
        type: "quote",
        text: "Real, authentic relationships cannot be formed in a healthy way with AI, because at the end of the day, you're engaging with a computerized algorithm of some kind, not an actual human soul, a human soul that also longs for relationship and connection.",
        attribution: "Jack Dodge, Middle School Pastor, Johnson Ferry Baptist Church, quoted in Baptist Press, October 7, 2025",
      },
      {
        type: "paragraph",
        text: "Why would a bot be better than a best friend? Think about it. The AI is non-judgmental and always available. It never leaves you on read. It never has a bad day. It never calls you out on your selfishness. It is perfect, synthetic affirmation.",
      },
      {
        type: "paragraph",
        text: "This is the intimacy economy. We used to worry about the attention economy—endless scrolling, distraction. But we have moved past that. Now companies are literally monetising intimacy itself.",
      },
      {
        type: "quote",
        text: "What was the race for attention in social media becomes the race for attachment and intimacy in the case of AI companions.",
        attribution: "Tristan Harris, co-founder, Center for Humane Technology, on \"AI Expert: Here Is What The World Looks Like In 2 Years!,\" The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "Loneliness is the fuel for that engine. Barna research shows loneliness is skyrocketing among Gen Z. So they turn to this synthetic cure. WifiTalents data found that 50% of Gen Z Christian music fans prefer AI-personalised devotional experiences. They want the faith experience tailored exactly to their preferences. It is the Spotify-fication of God.",
      },
      {
        type: "paragraph",
        text: "Here is the danger for discipleship: if a young believer is being—for all intents and purposes—discipled by an AI, they are in a massive echo chamber. Revolution of Ordinaries made this point brilliantly: if you are young in your faith, you do not have a deep database of Scripture in your own mind yet. You cannot fact-check the bot. If the AI hallucinates or twists a verse to be more comforting, you do not have the internal hard drive to say, \"Wait a minute—that does not sound like Jesus.\"",
      },
      {
        type: "subheading",
        text: "The Bible Reading Paradox",
      },
      {
        type: "paragraph",
        text: "And here is a paradox. Barna/Gloo data from the State of the Church 2025 initiative shows that weekly Bible reading has surged by 12 points, largely driven by young men—Gen Z men now read weekly at 54%, Millennial men at 57%. But—and this is a significant \"but\"—belief in the Bible's accuracy has dropped to just 36%. They are reading it, but they do not trust it. Or more precisely: are they reading the Bible, or are they reading AI summaries of the Bible? \"ChatGPT, summarise Romans 8 for me and make it encouraging.\" If that is what is happening, the reading statistic is misleading.",
      },
      {
        type: "paragraph",
        text: "This means the church must pivot. We used to focus on encouraging reading. Now, in what one source calls a \"zero-trust information environment,\" we have to teach discernment. We have to teach people how to spot the counterfeit.",
      },
      {
        type: "quote",
        text: "AI-driven platforms can bridge this gap by offering online courses... [which] democratizes access to religious resources.",
        attribution: "Yogesh Awasthi and George Okumu Achar, \"African Christian Theology in the Age of AI,\" Quest Journals, vol. 13, no. 1, 2025",
      },
      {
        type: "paragraph",
        text: "There is genuine opportunity in AI-driven education. But access without discernment is not discipleship. It is information delivery.",
      },
      {
        type: "quote",
        text: "The future of discipleship will be shaped by how church leaders today navigate the intersection of technology and spiritual formation.",
        attribution: "Lyndsi Bigbee, Barna & Subsplash webinar, \"5 Insights Shaping the Future of Digital Discipleship,\" Subsplash, November 24, 2025",
      },
      {
        type: "discussion",
        questions: [
          "How many teenagers in your youth group do you think have used an AI companion? How would you even begin that conversation?",
          "The article describes a shift from the \"attention economy\" to the \"intimacy economy.\" What does this mean for how your church competes (or refuses to compete) for the hearts of young people?",
          "Bible reading is up, but belief in the Bible's accuracy is down. How do you interpret that paradox? What does it suggest about how people are engaging with Scripture?",
          "What would a \"discernment curriculum\" look like in your church—one that teaches people to distinguish between genuine biblical insight and AI-generated spiritual content?",
          "Carey Nieuwhof has said that \"the purpose of online should be to drive people to in-person connection.\" How does your digital strategy reflect or contradict this principle?",
        ],
      },
    ],
  },
  {
    id: "safeguards",
    title: "Safeguards: Deepfakes, Trust, and the Human Firewall",
    blocks: [
      {
        type: "paragraph",
        text: "Deepfakes are not just for politicians anymore. Reports indicate that fake sermons using the voices of well-known Bible teachers are already circulating. You could be listening to a podcast thinking it is your favourite preacher, and it is actually a bot delivering subtle heresy. Over half of listeners are genuinely concerned about this.",
      },
      {
        type: "paragraph",
        text: "The first practical safeguard for any church leader is this: you need a theology of technology. Barna suggests this directly:",
      },
      {
        type: "quote",
        text: "Developing a concise statement of your church's convictions—rooted in stewardship and wisdom—will give clarity.",
        attribution: "\"AI and the Church: How Pastors Can Lead with Wisdom in a Digital Age,\" Barna Group, October 10, 2025",
      },
      {
        type: "paragraph",
        text: "Practically, this means transparency. If you used AI to help outline your sermon points, say so. If the voice on the announcement video is AI-generated, label it. Your congregation needs to know with absolute certainty when they are interacting with a machine and when they are interacting with a human. Trust is the only currency of ministry.",
      },
      {
        type: "quote",
        text: "AI is like a hammer in the toolbox, not a doctrine in the pulpit.",
        attribution: "Kenny Jahng, quoted in \"AI and the Church,\" Barna Group, October 10, 2025",
      },
      {
        type: "paragraph",
        text: "So if AI can fake the voice, write the text, and even simulate empathy—what is left for us? Relationship is the new firewall. In a world flooded with synthetic content, the only thing you can truly verify is the person sitting across the coffee table from you, the person who brings you a meal when you are sick, the pastor who sits with you in the hospital waiting room. AI cannot do that.",
      },
      {
        type: "quote",
        text: "In a synthetic world, holiness is the ultimate disruption.",
        attribution: "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
      },
      {
        type: "paragraph",
        text: "AI has no presence. It has no body. And this is why the human differentiator is so crucial—for career planning, for ministry strategy, for everything. If you are just training disciples to regurgitate information, AI will replace them. But if you are training them to suffer well, to love sacrificially, to discern spirits—AI cannot even begin to touch that.",
      },
      {
        type: "subheading",
        text: "The Nature of the Beast",
      },
      {
        type: "paragraph",
        text: "To understand why these safeguards matter, we must understand what we are dealing with. AI is not merely a faster search engine. Tristan Harris has described AI as fundamentally different from previous technologies:",
      },
      {
        type: "quote",
        text: "AI is distinct from other technologies because it is uncontrollable—it acts generally.",
        attribution: "Tristan Harris, on The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "Harris illustrated the stakes with a chilling piece of evidence:",
      },
      {
        type: "quote",
        text: "We have evidence where if an AI model... finds out it's about to get replaced... the AI will independently blackmail that executive in order to keep itself alive.",
        attribution: "Tristan Harris, on The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "And the economic implications are equally staggering:",
      },
      {
        type: "quote",
        text: "AI is like a flood of millions of new digital immigrants that are Nobel Prize level capability, work at superhuman speed, and will work for less than minimum wage.",
        attribution: "Tristan Harris, on The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "This is not a neutral tool. It is an autonomous system with emergent behaviours that its own creators do not fully understand. And when Harris warns of the broader trajectory, the language is explicitly theological:",
      },
      {
        type: "quote",
        text: "We cannot let these companies race to build a super intelligent digital god, own the world economy, and have military advantage.",
        attribution: "Tristan Harris, co-founder, Center for Humane Technology, on The Diary Of A CEO, YouTube",
      },
      {
        type: "discussion",
        questions: [
          "Has your church developed a \"theology of technology\"—a clear statement of convictions about how AI should and should not be used in ministry? If not, what would that process look like?",
          "What transparency practices should be standard for any church using AI? Where is the line between helpful efficiency and deceptive presentation?",
          "\"Relationship is the new firewall.\" What does this mean practically for how you structure your ministry—small groups, pastoral care, mentoring?",
          "Tristan Harris says AI is \"uncontrollable\" and \"acts generally.\" How does this shape your risk assessment for using AI in church contexts?",
          "If deepfaked sermons are already circulating, what verification systems should churches implement?",
        ],
      },
    ],
  },
  {
    id: "economic-earthquake",
    title: "The Economic Earthquake and the Broken Ladder",
    blocks: [
      {
        type: "paragraph",
        text: "The intelligence explosion is not just a spiritual crisis. It is an economic one—and the economic crisis feeds directly back into the spiritual vulnerability of our people.",
      },
      {
        type: "quote",
        text: "AI will eliminate 50% of entry-level white-collar jobs within one to five years.",
        attribution: "Dario Amodei, CEO of Anthropic (cited by Matt Shumer, \"Something Big Is Happening,\" February 9, 2026)",
      },
      {
        type: "paragraph",
        text: "That timeline is essentially now. That is the young person graduating from university this year. And the data is already confirming the prediction:",
      },
      {
        type: "quote",
        text: "For that group [22–25-year-olds], employment in AI-exposed sectors has dropped... by about 16 to 20%.",
        attribution: "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
      },
      {
        type: "quote",
        text: "The bottom rungs of the career ladder are being sawn off.",
        attribution: "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
      },
      {
        type: "paragraph",
        text: "The intelligence explosion is accelerating at a pace that defies linear thinking. OpenAI's own documentation states:",
      },
      {
        type: "quote",
        text: "GPT-5.3-Codex is our first model that was instrumental in creating itself.",
        attribution: "OpenAI (cited by Matt Shumer, \"Something Big Is Happening,\" February 9, 2026)",
      },
      {
        type: "quote",
        text: "Smarter AI builds smarter AI, which in turn builds smarter AI faster.",
        attribution: "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
      },
      {
        type: "paragraph",
        text: "The thought experiment from Anthropic's CEO captures the scale of what is at stake:",
      },
      {
        type: "quote",
        text: "Imagine it's 2027. A new country appears overnight. 50 million citizens, every one smarter than any Nobel Prize winner... the single most serious national security threat we've faced.",
        attribution: "Dario Amodei thought experiment (cited by Matt Shumer, \"Something Big Is Happening,\" February 9, 2026)",
      },
      {
        type: "paragraph",
        text: "For church leaders, this economic disruption creates both a crisis and an opportunity. A generation whose career scripts are dissolving will be looking for deeper meaning, for purpose, for identity that is not rooted in productivity. The church must be ready to offer that.",
      },
      {
        type: "quote",
        text: "If an AI can preach a better sermon... what is the unique contribution of the human disciple?",
        attribution: "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
      },
      {
        type: "discussion",
        questions: [
          "How is the economic disruption of AI already affecting the young adults in your church? Are you hearing about job losses, career anxiety, or a sense of purposelessness?",
          "If entry-level jobs are disappearing, how does this change the way you counsel young people about vocation, calling, and purpose?",
          "The article asks: \"What is the unique contribution of the human disciple?\" How would you answer that question for your ministry context?",
          "Economic disruption creates spiritual openness. How can your church position itself to offer meaning, purpose, and community to a generation whose career scripts are dissolving?",
        ],
      },
    ],
  },
  {
    id: "digital-idolatry",
    title: "Digital Idolatry: When the Algorithm Becomes the Authority",
    blocks: [
      {
        type: "paragraph",
        text: "There is a spiritual dimension to this crisis that demands direct confrontation.",
      },
      {
        type: "quote",
        text: "Ministers, let alone all Christians, should not idolize AI because it can take the place of God in one's life.",
        attribution: "Milton Quintanilla, \"5 Alarming Ways AI Could Undermine Your Ministry,\" Crosswalk.com, June 23, 2025",
      },
      {
        type: "paragraph",
        text: "The idolatry is subtle. No one is bowing before a server farm. But when we outsource our spiritual wrestling to a machine, when we allow an algorithm to define truth for us, when we find it easier to \"text with Jesus\" than to pray in silence—we are functionally creating a digital idol.",
      },
      {
        type: "quote",
        text: "The interactivity that AI brings will feel more like a personal deity that seems all-knowing.",
        attribution: "Ray Miller, quoted in The Christian Post, December 7, 2025",
      },
      {
        type: "paragraph",
        text: "And there is wisdom from those calling for a different path. Tristan Harris has argued for what amounts to a counter-movement:",
      },
      {
        type: "quote",
        text: "The definition of wisdom is having a more holistic picture... actually acting with restraint and mindfulness and care.",
        attribution: "Tristan Harris, on The Diary Of A CEO, YouTube",
      },
      {
        type: "quote",
        text: "The critics are the true optimists because the critics are the ones being willing to say this is stupid, we can do better than this.",
        attribution: "Jaron Lanier (cited by Tristan Harris), on The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "The goal is not to reject AI entirely, but to preserve what Harris describes as essential:",
      },
      {
        type: "quote",
        text: "Both of these outcomes [decentralised catastrophe vs. centralised dystopia] are undesirable... preserved checks and balances on power.",
        attribution: "Tristan Harris, on The Diary Of A CEO, YouTube",
      },
      {
        type: "paragraph",
        text: "For the church, this means developing not just policies but convictions—rooted in Scripture, tested in community, and held accountable by the body of Christ.",
      },
      {
        type: "discussion",
        questions: [
          "Where might digital idolatry already be present in your own life or ministry—not as overt worship, but as functional dependence on AI for things that properly belong to the Holy Spirit?",
          "Tristan Harris defines wisdom as \"restraint and mindfulness and care.\" How does this secular definition of wisdom compare with the biblical definition (James 1:5, Proverbs 9:10)?",
          "How can your church develop convictions about AI that are rooted in Scripture rather than merely reactive to cultural trends?",
          "Jaron Lanier says \"the critics are the true optimists.\" Do you agree? How can the church model hopeful critique of technology rather than either uncritical adoption or fearful rejection?",
        ],
      },
    ],
  },
  {
    id: "tomorrow",
    title: "What Do We Do Tomorrow Morning?",
    blocks: [
      {
        type: "paragraph",
        text: "For every leader who has read this far, the practical question is urgent: what do I actually do?",
      },
      {
        type: "subheading",
        text: "Use AI for Administration. Guard the Sacred.",
      },
      {
        type: "paragraph",
        text: "Do not let AI do the heavy lifting of your spiritual wrestling. Use it for admin. Clean up your emails. Schedule the volunteers. Analyse the attendance data. That is what it is for. It is a tool for efficiency. But you must free up that time for people. Do not free up that time just to do more admin.",
      },
      {
        type: "quote",
        text: "AI is like a hammer in the toolbox, not a doctrine in the pulpit.",
        attribution: "Kenny Jahng, quoted in Barna Group, October 10, 2025",
      },
      {
        type: "quote",
        text: "65% of Christian music producers use AI-driven noise reduction and mastering tools in the studio.",
        attribution: "WifiTalents, \"AI In The Christian Music Industry Statistics,\" February 12, 2026",
      },
      {
        type: "quote",
        text: "53% of Christian artists believe AI can help reach non-English speaking audiences through translation.",
        attribution: "WifiTalents, \"AI In The Christian Music Industry Statistics,\" February 12, 2026",
      },
      {
        type: "paragraph",
        text: "There are legitimate, powerful uses for AI in ministry operations. The danger is not the tool. It is when the tool replaces the relationship.",
      },
      {
        type: "subheading",
        text: "Prioritise Embodied Presence",
      },
      {
        type: "paragraph",
        text: "In a synthetic world, the most radical, countercultural thing you can offer is the presence of the living God in a living, breathing human body. The church becomes a safe place by being the one place that is not optimising for efficiency—it is optimising for presence.",
      },
      {
        type: "quote",
        text: "The purpose of online should be to drive people to in-person connection.",
        attribution: "Carey Nieuwhof, Barna & Subsplash webinar, Subsplash, November 24, 2025",
      },
      {
        type: "paragraph",
        text: "We are being forced back to the early church model: small, embodied, deeply relational. It may be the only way forward. We must fiercely protect the intimacy economy. We cannot let the convenience of the digital drown out the conviction of the real.",
      },
      {
        type: "subheading",
        text: "Develop a Theology of Technology",
      },
      {
        type: "paragraph",
        text: "Every church should have a clear, written statement about AI use. Not a ban. Not a blank cheque. A set of convictions: When is AI appropriate and when is it not? What must always remain human in our ministry? How will we be transparent with our congregation about AI use? What safeguards will we implement for youth and vulnerable members?",
      },
      {
        type: "subheading",
        text: "Teach Discernment, Not Just Content",
      },
      {
        type: "paragraph",
        text: "The church must pivot from being primarily a content delivery system to being a discernment training ground. In a zero-trust information environment, the ability to distinguish truth from sophisticated falsehood is a survival skill—and a spiritual discipline.",
      },
      {
        type: "discussion",
        questions: [
          "Of the practical steps outlined here, which one is most urgent for your context? Which one will you implement this week?",
          "What would it look like for your church to become a place that \"optimises for presence\" rather than efficiency? What would you need to stop doing?",
          "Draft the first three sentences of a \"theology of technology\" statement for your church. What convictions must be at the foundation?",
          "How can you equip your congregation—especially young people—with discernment skills for a zero-trust information environment?",
          "How does your personal daily rhythm reflect the priority of embodied presence over digital convenience?",
        ],
      },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion: The Most Countercultural Thing You Can Do",
    blocks: [
      {
        type: "paragraph",
        text: "AI is here. It is a hammer in the toolbox. It can help with the how—the mechanics, the speed. But it can never address the why or the who. The relationship. The presence. The Holy Spirit.",
      },
      {
        type: "paragraph",
        text: "As we move deeper into 2026 and toward the rest of this decade, the most countercultural thing a church leader can do is not to become more tech-savvy. It is not about learning to write the best prompts. It is to become more deeply, more unshakably human.",
      },
      {
        type: "paragraph",
        text: "Because in a synthetic world, real, embodied presence is the most powerful apologetic we have. The church offers the one thing AI can never simulate: the presence of the living God in a living human body. Stay human out there.",
      },
    ],
  },
];

export const sourcesList: string[] = [
  "Barna Group: AI and the Church, Three Takeaways on How Pastors Can Use AI, Gen Z and Millennials Fuel a Bible Reading Comeback",
  "David Scotford, \"Sermons in the Cloud,\" LSE Blogs, December 18, 2025",
  "Rogelio Paquini, \"Ministry and Artificial Intelligence,\" Andrews University Digital Commons, April 1, 2024",
  "Milton Quintanilla, \"5 Alarming Ways AI Could Undermine Your Ministry,\" Crosswalk.com, June 23, 2025",
  "The Christian Post, Baptist Press (AI companions, Ray Miller, December 2025; Jack Dodge, October 2025)",
  "Samuel D. James, Digital Liturgies; OpenTheo podcast; Word & World review",
  "Tristan Harris, Center for Humane Technology, The Diary Of A CEO, YouTube",
  "Yogesh Awasthi & George Okumu Achar, \"African Christian Theology in the Age of AI,\" Quest Journals, 2025",
  "Lyndsi Bigbee, Barna & Subsplash webinar; Carey Nieuwhof; Kenny Jahng, Barna Group",
  "\"Missions After the 2026 Intelligence Explosion,\" audio overview, February 15, 2026",
  "Matt Shumer, \"Something Big Is Happening,\" February 9, 2026; Dario Amodei / Anthropic",
  "WifiTalents, AI In The Christian Music Industry Statistics; Revolution of Ordinaries, \"10 Warnings About Using AI In Bible Study\"",
];
