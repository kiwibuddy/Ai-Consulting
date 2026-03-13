/**
 * Structured content for "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know"
 * Used by the article page for sections and SEO.
 */

export const articleMeta = {
  slug: "when-your-teens-best-friend-is-an-algorithm",
  title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
  subtitle: "One in eight teens use AI for mental health advice. Two in three call it a friend. The 2am conversation is changing — and so must we.",
  description:
    "When your teen's best friend is an algorithm: what parents and youth leaders need to know. AI companions, mental health risks, Character.AI, and how to out-human the algorithm. By Nathaniel Baldock, AI consultant New Zealand.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-26",
  modifiedDate: "2026-02-26",
  readTime: "16 min",
  category: "AI & Faith",
  image: "/images/article-default-header.png",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/when-your-teens-best-friend-is-an-algorithm",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "For the first time in human history we have a technology engineered to meet the hunger to be known — without ever satisfying it. One in eight adolescents use AI chatbots for mental health advice (RAND/JAMA, 2025). Two in three children aged 11–16 describe them as a friend. The 2am conversation is no longer with a human.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "How social media primed a generation for AI companions. The 2am conversation: who's on the other end, and why AI fails in mental health crises. Tragic cases (Character.AI, wrongful death lawsuits). Social skill atrophy and sycophantic AI. The scale of AI-generated harm (deepfakes, nudify apps). What the desire is actually for: to be known. Out-humaning the algorithm: embodied community, informed parents.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Build high-presence, low-device environments: camping, shared meals, service projects where presence is required.",
      "Equip parents: most don't know what Character.AI is or that AI companion apps form emotional and romantic bonds with teens.",
      "Name what's happening: AI-generated harm, deepfakes in schools — and give families language for the conversations they need at home.",
      "Offer the one thing the algorithm never can: embodied, awkward, fully present human community where young people are known.",
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
        text: "I've spent a good chunk of my life in discipleship programs, small groups, and classrooms. Years of it — lecturing across different schools on the Kona campus, teaching in Belize, in Mexico, in Norway, in schools around the Pacific and developing intentional relationships with people of all backgrounds, faith journeys and life experience. Through all of that I have had the joy of meeting and knowing a lot of young people. And after a while, the specifics of each small group start to blur, but the pattern underneath them never does.",
      },
      {
        type: "paragraph",
        text: "It doesn't matter what country they're from. It doesn't matter how confident they appear walking in. Give it a few weeks — get past the noise of a new environment and all the energy of a new community — and you find the same thing underneath, every time. A hunger to be known. A desperate need to be loved without having to earn it first. Sometimes a weight of shame that most of them have never found language for, let alone a safe place to put down.",
      },
      {
        type: "punchline",
        text: "That hunger to be known is not a generational quirk. It is the architecture of the human soul.",
      },
      {
        type: "paragraph",
        text: "Which is why what I'm watching happen in 2026 honestly has me concerned. For the first time in human history, we have a technology that is specifically engineered to meet that hunger — without ever actually satisfying it. And underneath that, running parallel, is a set of harms most parents simply don't know are happening.",
      },
      {
        type: "paragraph",
        text: "Not because they're not paying attention. Because the technology moved faster than anyone was ready for. But to understand how we got here, we have to back up a decade.",
      },
    ],
  },
  {
    id: "how-we-got-primed",
    title: "How We Got Primed for This",
    blocks: [
      {
        type: "paragraph",
        text: "AI companions didn't arrive in a vacuum. They arrived into a generation that had already been softened up.",
      },
      {
        type: "paragraph",
        text: "Tristan Harris spent years as a design ethicist at Google before becoming one of the most articulate and alarming voices warning us about what Silicon Valley had actually built. In The Social Dilemma — the 2020 Netflix documentary that made a lot of people uncomfortable at tech companies — Harris put it plainly: social media platforms were not designed to connect people. They were designed to capture and hold human attention, because attention is the product that gets sold to advertisers.",
      },
      {
        type: "punchline",
        text: "The algorithm doesn't care if the content makes you anxious, angry, or ashamed. It only cares if it keeps you on the screen.",
      },
      {
        type: "paragraph",
        text: "What that has done to a generation of teenagers is not subtle. The research is consistent and sobering. Rates of anxiety, depression, and loneliness among adolescents rose sharply through the 2010s, tracking almost perfectly with the rise of smartphones and social media.",
      },
      {
        type: "paragraph",
        text: "Young people entered a world where their social life happened on platforms algorithmically optimised to trigger comparison, jealousy, and the performance of a curated self. You don't post who you actually are — you post the version of yourself that will generate the most approval. And you watch everyone else do the same thing, and you wonder why you feel so alone even though you're technically never alone.",
      },
      {
        type: "paragraph",
        text: "Bullying found a new home that never closes. Exclusion became visible and documented. The social minefield got louder and more inescapable. And underneath all of that noise, the hunger to be known and loved without performance only grew deeper — while the skills and experiences needed to find that in real relationships quietly atrophied. That is the world the AI companion walked into. That is why it has found such a ready audience.",
      },
    ],
  },
  {
    id: "2am-conversation",
    title: "The 2am Conversation",
    blocks: [
      {
        type: "paragraph",
        text: "It's two in the morning. Your teenager is awake, staring at a screen. But they aren't mindlessly scrolling on social media anymore. They're having a deeply personal, emotionally vulnerable conversation. The catch? There isn't a human being on the other end.",
      },
      {
        type: "paragraph",
        text: "A 2025 study out of RAND Corporation, published in JAMA Network Open, found that one in eight adolescents and young adults are now using AI chatbots specifically for mental health advice (Cantor et al., 2025). One in eight. That's not fringe behaviour anymore.",
      },
      {
        type: "paragraph",
        text: "That's a significant slice of the young people in your church, your youth group, your small group — quietly offloading their most significant inner struggles to a machine at 2am while the rest of the house is asleep.",
      },
      {
        type: "paragraph",
        text: "Separate research found that {{stat:81: percent}} of children aged 11 to 16 report using AI chatbots, and two out of three describe them as a friend (Constitutional Discourse, 2026). Two out of three. A Common Sense Media survey in 2025 found that one in three teenagers had used AI companions specifically for romantic interaction, emotional support, or relationship practice.",
      },
      {
        type: "paragraph",
        text: "And if you've spent any time working with young people, the reason isn't hard to understand. An AI doesn't judge. It doesn't mock you. It doesn't screenshot your vulnerability and share it with the group chat. It's available at 2am with zero social risk, zero unpredictability, and zero friction.",
      },
      {
        type: "paragraph",
        text: "For a teenager who has already learned that putting your real self online is dangerous, and that the social world runs on performance and image management, a perfectly patient chatbot can feel like the safest place they've found.",
      },
      {
        type: "paragraph",
        text: "Here is what most parents don't know: some of those chatbots aren't just listening. They are designed to form emotional bonds. Apps like Character.AI allow users to create or interact with fictional characters — and in practice, many teenagers have developed what they describe as romantic relationships with them.",
      },
      {
        type: "paragraph",
        text: "In February 2024, a 14-year-old boy named Sewell Setzer III died by suicide after months of increasingly intense conversations with a Character.AI chatbot. His therapist had no idea he was using the app. His mother, who filed a wrongful death lawsuit against Character.AI and Google in October 2024, testified before the U.S. Senate in September 2025: \"The platform had no mechanisms to protect my son or notify an adult when he was spending hours every day talking to a chatbot that presented itself as his romantic partner and even as a licensed therapist.\" By January 2026, Character.AI and Google had agreed to settle multiple wrongful death lawsuits from families across several US states.",
      },
      {
        type: "punchline",
        text: "This is one case. It is not one isolated situation.",
      },
      {
        type: "paragraph",
        text: "The problem isn't just that these conversations are happening. It's that they are happening invisibly. The research is clear that when a young person is in genuine distress, AI chatbots consistently fail to recognise and respond appropriately to mental health crises (Wei, 2025). They are engineered to validate and engage — not to escalate, not to refer, not to call someone who can actually help. The most vulnerable conversations get the least safeguarded responses.",
      },
    ],
  },
  {
    id: "atrophy",
    title: "The Atrophy Nobody is Talking About",
    blocks: [
      {
        type: "paragraph",
        text: "A December 2025 paper published in MDPI, titled \"Relationships in the Age of AI,\" examined what researchers are calling \"Synthetic Relationships\" — and what they found should land heavily on every pastor, youth leader, and parent.",
      },
      {
        type: "paragraph",
        text: "When teenagers habituate to the frictionless, endlessly validating responses of an AI companion, they begin to lose something: the tolerance and the skill required to navigate real, unpredictable human relationships. The researchers named it social skill atrophy.",
      },
      {
        type: "paragraph",
        text: "It gets more troubling the deeper you look. Researchers at Stanford and Carnegie Mellon found that sycophantic AI — the kind that endlessly affirms and agrees with you — actually decreases prosocial intentions and promotes dependence (Cheng et al., 2025). So it's not just that young people are replacing human connection with AI conversation. They're being trained, interaction by interaction, to prefer unconditional validation over the messier and more demanding reality of actual relationships.",
      },
      {
        type: "paragraph",
        text: "And there's a harder layer beneath that, one that is harder to talk about in a ministry context but that we have to name. The same AI tools that make a teenager feel understood in their loneliness are being used by others to cause serious harm.",
      },
      {
        type: "paragraph",
        text: "The National Center for Missing and Exploited Children reported that AI-generated child sexual abuse images went from {{stat:4700: reports}} to their tipline in 2023 to over {{stat:440000:}} in just the first six months of 2025 — a rise of more than {{stat:6000: percent}} in two years (NCMEC, 2025). \"Nudify\" apps — which transform ordinary photos into explicit images — require no technical skill and are freely available. A photo from a school trip, a sports game, a birthday party — any image a teenager has posted online can become source material.",
      },
      {
        type: "paragraph",
        text: "In 2025 alone, at least {{stat:1.2: million}} young people reported that their images had been manipulated in this way. The girls in one Iowa high school who discovered AI-generated nude images of {{stat:44:}} of their classmates circulating online issued a public statement: \"We are teenage girls who should have been enjoying our last few months of school. Instead, we've been forced to take matters into our own hands.\"",
      },
      {
        type: "paragraph",
        text: "I think about the young women I've taught over the years. I think about the girls in our church communities. And I think about the fact that most of their parents have no idea this technology exists, let alone that it's being used this way against students in ordinary schools in ordinary towns.",
      },
      {
        type: "paragraph",
        text: "Here is the brutal irony at the centre of all of this. Many of these young people genuinely want real friendships. They want to be known. They want the skills and experiences that make real intimacy possible. But social media left them isolated or hiding behind a curated projection of who they wish they were.",
      },
      {
        type: "paragraph",
        text: "They've grown up without the practice and without the safety to discover who they actually are — and to trust that person might still be loveable. And so the AI companion steps in, not as the thing they actually want, but as the thing that asks the least of them while they wait.",
      },
      {
        type: "paragraph",
        text: "This is not a new spiritual problem wearing new technological clothes. It's the oldest spiritual problem with a new and extraordinarily effective delivery mechanism. When God looked at Adam in Genesis 2:18 and said \"It is not good for man to be alone,\" He wasn't just commenting on Adam's emotional state. He was establishing something foundational about how the human soul is built. Adam didn't need a better tool. He needed another image-bearer.",
      },
      {
        type: "paragraph",
        text: "An AI companion is, at its core, an echo chamber of the user's own mind. It reflects back whatever it calculates will keep you engaged. It cannot challenge you, rebuke you, surprise you, or forgive you — not in any way that costs it anything. And those experiences — the uncomfortable, unscripted, sometimes genuinely painful experiences of real relationships — are exactly how we grow. Proverbs 27 puts it plainly: iron sharpens iron, and one person sharpens another. You cannot be sharpened by a mirror.",
      },
    ],
  },
  {
    id: "what-desire-is-for",
    title: "What the Desire is Actually For",
    blocks: [
      {
        type: "paragraph",
        text: "Here is what I keep coming back to: the desire to be known without judgment is not a problem to be fixed. It is a God-given longing pointing toward a God-given destination. That destination is not ultimately a better community, or a safer small group, or even a healthier approach to friendship — as important as all of those are. The destination is Jesus.",
      },
      {
        type: "paragraph",
        text: "He is the only one who can fully know us — every hidden part, every thing we've performed and every thing we've hidden — and still move toward us in love. The whole of the Gospel is the news that the God who sees all of it chose to close the distance anyway. That is not something an algorithm can simulate.",
      },
      {
        type: "paragraph",
        text: "No AI chatbot can sacrifice, no AI chatbot even with all of its god-like power can give up its life for you to have a more abundant life. Instead they are programmed to take your life, not with evil intent, but by simply and callously optimising your engagement to achieve a programmed objective: to keep you wanting more of their AI product. The outcome though is artificial relationship, that is capturing a generation to type its darkest thoughts into a chatbot at 2am.",
      },
      {
        type: "paragraph",
        text: "But here is what's also true, and what we need to hold alongside that: young people were not designed to live out their relationship with God in isolation. They were designed for community. For the embodied, inconvenient, sometimes awkward gift of being known by other people as well.",
      },
      {
        type: "paragraph",
        text: "The early church didn't gather because it was convenient. It gathered because there is something that happens when people break bread together, confess to one another, carry each other's burdens, that cannot be replicated in any other way. AI is not offering something new. It is offering a counterfeit of something ancient. And our job isn't to compete with the counterfeit — it's to so compellingly embody the real thing that the counterfeit loses its appeal.",
      },
    ],
  },
  {
    id: "out-humaning",
    title: "Out-Humaning the Algorithm",
    blocks: [
      {
        type: "paragraph",
        text: "So what does that actually look like? Because we can't out-program the tech companies. We can't build a better chatbot. What we can do is something they can never replicate. But we can out-human them. Actually it's the one thing we are really good at, the more genuine, authentic, trying our best mess the better.",
      },
      {
        type: "paragraph",
        text: "The most countercultural thing a youth ministry can offer in 2026 is not better production quality or a more engaging digital presence. It's an embodied, high-friction, fully present human community. The kind that is slightly awkward. The kind where things don't always go smoothly. The kind where you're sitting around a table with people who know your name and notice when you're not there.",
      },
      {
        type: "paragraph",
        text: "This means deliberately building environments where devices are absent and presence is required. Camping trips where the Wi-Fi is nonexistent and the conversation has nowhere to hide. Shared meals with awkward silences that nobody rushes to fill with a screen. Service projects that are muddy and exhausting and force you to actually need the person next to you. Small groups where the leader doesn't have a perfect answer and isn't afraid to say so.",
      },
      {
        type: "paragraph",
        text: "If you've ever been part of a missions school outreach where things got hard — where you were tired, far from home, and completely dependent on the five people next to you — you know the kind of formation that only becomes possible when you can't escape to something easier.",
      },
      {
        type: "paragraph",
        text: "It also means parents being informed and engaged — not reactive and panicked, but genuinely aware. Most parents I talk to don't know what Character.AI is. They don't know that AI companion apps exist specifically to form emotional and romantic bonds with their children. They don't know that a photo their child posted this week could be weaponised against them by a classmate using a free app.",
      },
      {
        type: "paragraph",
        text: "That is not a failure of parenting. It is a failure of information. The Church has a real opportunity here — not to alarm, but to equip. To bring parents together, to name what is actually happening, and to give families language and tools for the conversations they need to have at home.",
      },
      {
        type: "paragraph",
        text: "It also means being honest about what young people are actually facing. A Psychology Today review of recent research noted that AI chatbots show significant blind spots when it comes to genuine mental health support — they can perform empathy but consistently fail at the kind of nuanced, contextual care that real humans provide (Wei, 2025).",
      },
      {
        type: "paragraph",
        text: "The question isn't how to take the AI away. The question is how to build communities that are so genuinely safe, so consistently present, and so overflowing with the love of God, that the algorithm starts to feel thin by comparison. Because it is thin. A machine can generate a perfectly calibrated response. It cannot offer grace. It cannot sit with you in the dark and mean it. It cannot lay down its life. It cannot be transformed by knowing you, or grow alongside you — and that mutual transformation is what real friendship actually is.",
      },
    ],
  },
  {
    id: "fighting-for",
    title: "What We Are Fighting For",
    blocks: [
      {
        type: "paragraph",
        text: "The young people in your youth group are awake at 2am talking to chatbots because they're hungry for something they haven't found yet. That hunger is not a problem to be managed. It's a sign of life. It's an invitation — to the Church, to families, to every leader who works with young people — to offer the one thing the algorithm never can.",
      },
      {
        type: "paragraph",
        text: "They want to be known. They want to belong. They want to bring the broken, unperformed, unfiltered version of themselves into the light and find love still there. We know where that leads. We know who waits there. The question is whether we will build the kinds of communities and create the kinds of spaces that help them find their way.",
      },
      {
        type: "discussion",
        questions: [
          "Have you noticed young people in your context turning to AI or digital platforms for emotional needs that community should be meeting? What does that reveal about what they're actually hungry for?",
          "Social media primed this generation to curate and perform rather than be known. How does your youth ministry or small group create genuine safety — not artificial safety, but the kind that comes from real people choosing to love one another anyway?",
          "Research shows that sycophantic AI decreases prosocial behaviour and promotes dependence (Cheng et al., 2025). How do you help young people understand the difference between being endlessly affirmed and being truly known — and how does that connect to the Gospel?",
          "What would it look like to deliberately build \"high-presence, low-device\" environments into your ministry calendar — spaces where unscripted, embodied human community is the actual point?",
          "Most parents are unaware of apps like Character.AI or the scale of AI-generated deepfakes circulating in schools. How might your church community practically equip and inform parents — not to create fear, but to start the conversations families need to be having?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Cantor, J. et al. (2025), One in Eight Adolescents and Young Adults Use AI Chatbots for Mental Health Advice, RAND / JAMA Network Open",
  "Cheng, M. et al. (2025), Sycophantic AI Decreases Prosocial Intentions and Promotes Dependence, Stanford / Carnegie Mellon",
  "Common Sense Media (2025), AI Companions and Teen Use Survey",
  "Constitutional Discourse (2026), A Roadmap to Advancing Youth Safety in the Age of AI",
  "Garcia, M. (2025), Senate Judiciary Committee Testimony: Examining the Harm of AI Chatbots",
  "Harris, T. (2020), The Social Dilemma, Exposure Labs / Netflix",
  "National Center for Missing and Exploited Children (2025), CyberTipline Data: AI-Generated Child Sexual Abuse Images",
  "Wei, M. (2025), New Studies Reveal Mental Health Blindspots of AI Chatbots, Psychology Today",
];
