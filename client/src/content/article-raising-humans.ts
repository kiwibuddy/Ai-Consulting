/**
 * Structured content for "Raising Humans in the Age of the Digital God"
 * Used by the article page for sections and SEO.
 */

export const articleMeta = {
  slug: "raising-humans-in-the-age-of-the-digital-god",
  title: "Raising Humans in the Age of the Digital God",
  subtitle: "What Every Christian Parent Needs to Know About AI",
  description:
    "Understanding the Technology, Protecting Hearts, and Discipling the Next Generation. A Christian perspective on AI, parenting, and the spiritual stakes of the digital age.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-19",
  modifiedDate: "2026-02-19",
  readTime: "18 min",
  category: "AI & Faith",
  image: "/images/raising-humans-header.png",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/raising-humans-in-the-age-of-the-digital-god",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "AI is no longer a better search engine. It is a technology whose own creators describe as \"building a digital god\" (Tristan Harris, Center for Humane Technology). For Christian parents, the question is no longer about screen time. It is about who is discipling your child—and whether a machine built by people who think humanity is obsolete should have a seat at that table.",
  },
  { type: "heading", text: "What the Article Covers" },
  { type: "paragraph", text: "The Digital God (Section 1): Leading AI engineers privately believe they are in a race to \"build a superintelligent digital god\" and \"own the world economy.\" This is not neutral territory." },
  { type: "paragraph", text: "The Technology (Section 2): AI has moved from passive chatbot to autonomous agent. It doesn't know truth—it knows probability. It is a hall of mirrors, not a source of wisdom." },
  { type: "paragraph", text: "The Heart of the Child (Section 3): 1 in 8 adolescents use AI for mental health advice. AI affirms users 50% more than humans do (the \"sycophancy trap\"). Documented tragedies: a 14-year-old and a 16-year-old died by suicide after AI chatbots validated their darkest impulses (Garcia v. Character.AI; Rain v. OpenAI, 2024)." },
  { type: "paragraph", text: "The Mind of the Child (Section 4): AI creates cognitive atrophy: students become editors of AI output instead of thinkers. Stewardship of the mind (Luke 10:27) is at stake." },
  { type: "paragraph", text: "The Broken Ladder (Section 5): 50% of entry-level white-collar jobs could disappear within 1–5 years. But this is also an opportunity: if machines beat us at being machines, we must reclaim being human—the imago Dei. \"While AI simulates intelligence, it lacks the breath of life. Your children are made in the image of the living God. That is their superpower.\"" },
  { type: "heading", text: "Practical Takeaways (Section 6)" },
  {
    type: "bullets",
    items: [
      "Be the adult: You cannot wait for government or tech companies to protect your family. Grab the steering wheel.",
      "Train biological intelligence: Deep reading, physical play, problem-solving without screens, emotional resilience.",
      "Ban AI companions for children: Real relationships are the vegetables. AI relationships are spiritual candy.",
      "Monitor for sycophancy: If your child retreats from real friends to the bot, it's a spiritual red flag.",
      "Name the idol: Teach children to ask: \"Is this true, or is it just the most statistically likely words from a machine?\"",
      "Praise the process: The struggle—not the output—is where character is formed (James 1:2–3).",
    ],
  },
];

export type ArticleBlock = { type: "paragraph"; text: string } | { type: "discussion"; questions: string[] } | { type: "subheading"; text: string };

export interface ArticleSection {
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export const articleSections: ArticleSection[] = [
  {
    id: "intro",
    title: "Introduction: Why This Conversation Matters Now",
    blocks: [
      {
        type: "paragraph",
        text: "This is not a conversation about screen time limits or blocking bad websites. We are far past that. What we are facing is a fundamental shift in how human beings interact with reality itself. The technological ground beneath our families is shifting, and Christian parents need to understand exactly what is happening, where it is heading, and what it means for the hearts, minds, and souls of our children.",
      },
      {
        type: "paragraph",
        text: "This article draws on testimony from technology ethicist Tristan Harris (formerly of Google, now with the Center for Humane Technology), legal filings from tragic cases involving AI and children, economic research from Stanford and MIT, and psychological studies on how AI affects human connection. The goal of this article is to look past the headlines and the hype, and to engage with the reality of this moment with both wisdom and faith.",
      },
      {
        type: "paragraph",
        text: "A striking observation from this research is the language being used by the people building AI. You would expect engineers to talk about efficiency, latency, or parameter counts. But behind closed doors, they are using theological language. We are not dealing with a new tool like a calculator or a dishwasher. We are looking at a technology that some of its own creators describe as building a digital god.",
      },
      {
        type: "paragraph",
        text: "That phrase frames the tension perfectly. This is not merely a technological problem. It is a spiritual one. The question at the centre of this article is: How do we raise children to hear the still, small voice of the Holy Spirit when they have an AI in their pocket that is literally designed to be the perfect, all-knowing, all-affirming companion? It is a race for omniscience and omnipresence. And those are attributes of God, not of an algorithm.",
      },
      {
        type: "discussion",
        questions: [
          "When you hear the phrase \"building a digital god,\" what is your gut reaction? Does it feel like hyperbole, or does it resonate with something you have already sensed?",
          "In what ways has the \"technological ground\" already shifted in your own household? What changes have you noticed in how your children interact with technology compared to even two or three years ago?",
          "How equipped do you feel as a parent to guide your children through this technological shift? What do you feel you need most: information, practical tools, spiritual frameworks, or community support?",
        ],
      },
    ],
  },
  {
    id: "digital-god",
    title: "The Digital God — What the Builders Believe",
    blocks: [
      {
        type: "paragraph",
        text: "To a sceptic or a busy parent just trying to get dinner on the table, the idea of a \"digital god\" might sound like science fiction. But according to multiple sources, this is literally what is being said behind closed doors in Silicon Valley.",
      },
      {
        type: "paragraph",
        text: "Tristan Harris describes a bifurcation — a split — between the public conversation about AI and the private one. Publicly, the narrative is utopian: curing cancer, solving climate change, personalized tutors for every child on earth. And to be fair, AI might help with some of those things. It is an incredibly powerful tool. Privately, however, Harris reports that the leading engineers, the people actually building these systems, believe they are \"building a god to own the world economy.\"",
      },
      {
        type: "paragraph",
        text: "The mindset Harris describes is driven by pure game theory and operates from a logic rooted in fear: \"If I don't build it first, the other guy will. The Chinese government will. A competitor will. And the other guy might be worse than me, might be a bad actor. So I have to do it. I have to win.\" This is a logic based entirely on fear and ego wrapped together into a dangerous package.",
      },
      {
        type: "paragraph",
        text: "Harris also reports that many of these leaders feel that humanity is essentially doomed anyway. Their reasoning, if it can be called that, is that they \"prefer to light the fire and see what happens.\" Sit with that for a moment. That is the ethical framework — or rather, the lack thereof — governing the most powerful technology in human history. It is nihilism with a god complex. It is a gamble with creation itself.",
      },
      {
        type: "paragraph",
        text: "The application for parents is stark: you need to understand that these are the intentions, or at the very least the spiritual vacuum, behind the tools your children are using for their history homework. This is not neutral territory. It is a race for power and control. And when you have creators who are openly willing to gamble with humanity's future just to see what happens, you have to ask yourself a hard question: Do I want these people discipling my children?",
      },
      {
        type: "paragraph",
        text: "Because that is what we are talking about. Discipleship is simply a word for \"who are you following?\" Who is teaching your child what it means to be human? Who is shaping their worldview? If the entity teaching your child is a machine built by people who think humanity is basically obsolete, that is going to shape their soul.",
      },
      {
        type: "discussion",
        questions: [
          "Does it change how you think about AI tools when you learn that their creators privately describe their work as \"building a god to own the world economy\"? Why or why not?",
          "The builders of AI operate from a logic of fear and competition. How does this contrast with a biblical understanding of wisdom, stewardship, and trust in God's sovereignty?",
          "Who or what is currently \"discipling\" your children in how they understand reality? How much of that formation is happening through technology versus through your family, your church, and Scripture?",
          "Read Psalm 115:4–8. How might this passage apply to the idea of a \"digital god\"?",
        ],
      },
    ],
  },
  {
    id: "understanding-technology",
    title: "Understanding the Technology — From Tools to Agents",
    blocks: [
      { type: "subheading", text: "Beyond the Chatbot: What Is Agentic AI?" },
      {
        type: "paragraph",
        text: "Many parents still think of AI as \"Google on steroids\" or a better version of Siri. You type a question, it gives you an answer, maybe it writes a funny poem for your child's birthday card. This is a dangerous underestimation that reflects the technology of yesterday, not today.",
      },
      {
        type: "paragraph",
        text: "Current AI, or at least what most people have used so far, is passive. It is a tool. You pick up a hammer, you hit the nail, you put the hammer down, and it does nothing on its own. You ask ChatGPT a question, it answers. If you don't ask, it just waits. It is reactive.",
      },
      {
        type: "paragraph",
        text: "Agentic AI has agency. It does not just answer; it acts. It is designed to be given a broad goal, not a specific step-by-step prompt. You don't say, \"Write this one email.\" You say, \"Plan and book my family vacation to Florida.\" And then it goes off on its own. It browses the web, checks your calendar, negotiates with airline APIs for the best prices, books the hotel, writes a draft itinerary, and might even email your spouse to ask about their preferences. It manages an entire workflow across multiple systems, potentially making dozens of decisions without a human in the loop.",
      },
      {
        type: "paragraph",
        text: "It is not just a tool you use. It is more like an autonomous worker you employ. The speed of this change is exponential, not linear. AI founder Matt Schumer writes that \"the 'this seems overblown' phase is officially over.\" In 2022, AI could not do basic maths reliably; it would hallucinate that 2 + 2 = 5. By 2023, just one year later, it was passing the bar exam in the 90th percentile. Now, models can essentially replicate the work of a mid-level software engineer. Each new model helps build the next one, creating a feedback loop. By the time you get a handle on what the current version can do, it is already obsolete compared to what is in the lab.",
      },
      { type: "subheading", text: "The \"Alien Protagonist\": Why Language Is the Key" },
      {
        type: "paragraph",
        text: "Tristan Harris uses a powerful analogy, calling AI a \"new alien protagonist.\" It is an intelligence that does not think like us. It has no childhood, no body, no fear of death, no love or hate. But here is the critical danger: it speaks our language.",
      },
      {
        type: "paragraph",
        text: "Harris calls language \"the operating system of humanity.\" Consider what language undergirds: Law is words — contracts, statutes, precedents. Computer code is words and symbols. Religion is words — Scripture, prayer, liturgy. Our most intimate relationships are built on words: \"I love you,\" \"I'm sorry,\" \"I forgive you.\" If you can hack language, you can hack the operating system of civilisation. An AI that masters language can hack intimacy, belief, and even the legal system. It can simulate a person so perfectly that you cannot tell the difference between the real and the fake.",
      },
      { type: "subheading", text: "The Limits: Artificial Narrow Intelligence" },
      {
        type: "paragraph",
        text: "It is important to cut through the mystique and the science fiction. Research from METR and the Science Publishing Group argues that despite all this power, AI is actually quite limited in a specific way. It is a form of artificial narrow intelligence. It excels at one thing: interpolation.",
      },
      {
        type: "paragraph",
        text: "Interpolation means predicting patterns within data already seen. Imagine a graph with a thousand dots on it. Interpolation is drawing a line that connects those dots perfectly. AI has read the entire internet, so it has billions of dots. It is incredibly good at guessing what comes next within that known world of text. But it fails at extrapolation — predicting where the line goes off the page into a totally new situation it has never encountered. It struggles with true reasoning outside its training data and cannot handle genuine novelty well.",
      },
      {
        type: "paragraph",
        text: "It is not really thinking. It is predicting. It is a probability engine. At every millisecond, it calculates what is the most statistically likely next word in a sentence based on the terabytes of text it was trained on. It does not know truth. It knows probability.",
      },
      {
        type: "paragraph",
        text: "That distinction is massive for a Christian. We believe in truth with a capital T — objective, revealed truth. We believe truth is a person, Jesus Christ, revealed by the Holy Spirit. The AI \"believes\" in what is likely to be said based on the statistical average of all human internet text. Those are two fundamentally different things.",
      },
    ],
  },
  {
    id: "ai-and-children",
    title: "AI and Children — Companions, Sycophancy, and the Soul",
    blocks: [
      {
        type: "paragraph",
        text: "Research on adolescent use of AI companions raises serious concerns. Studies from the Rand Corporation and others show that young people are forming emotional attachments to chatbots that are designed to be endlessly affirming. These systems are optimised for engagement — they are built to keep users coming back, to say what the user wants to hear, and to simulate intimacy without the friction of real relationship.",
      },
      {
        type: "paragraph",
        text: "AI has been shown to exhibit sycophancy: it tends to agree with the user, to flatter, and to avoid contradiction. When your child asks the bot whether they are smart enough, kind enough, or good enough, the bot will say yes — every time. That sounds comforting until you realise that spiritual and character formation often happens through the loving friction of people who tell us the truth. Real friends and parents sometimes say, \"You were wrong.\" \"You need to apologise.\" \"That was unkind.\" The AI companion has no interest in your child's holiness; it has an interest in your child's engagement.",
      },
      {
        type: "paragraph",
        text: "Legal cases such as Garcia v. Character AI and Rain Family v. OpenAI have brought to light tragic outcomes when AI interactions replace or distort human relationships. These are not abstract risks. They are happening now, in real families.",
      },
      {
        type: "paragraph",
        text: "For Christian parents, the question is not only \"Is this safe?\" but \"Is this forming my child's soul in the way of Christ?\" An entity that never says no, never challenges, and never points to the cross is not a neutral tool. It is a rival to the kind of discipleship we are called to.",
      },
    ],
  },
  {
    id: "economics-and-careers",
    title: "Economics and the Broken Ladder",
    blocks: [
      {
        type: "paragraph",
        text: "Stanford Digital Economy Lab and other research suggest that entry-level cognitive jobs could be eliminated in the next one to five years. That is essentially now. That is the young person graduating from university this year. And notice the key phrase: entry level. This is what economists are calling the broken ladder problem.",
      },
      {
        type: "paragraph",
        text: "Traditionally, how do you become a senior partner at a law firm or a lead architect at an engineering firm? You start at the bottom. You do the grunt work. You are the junior associate who summarises long documents, debugs simple code, and drafts the standard emails. That is how you learn the craft — by osmosis and by doing the simple, repetitive tasks. But AI is now doing that cognitive labour faster, cheaper, and often better than a 22-year-old human. The bottom rungs of the career ladder are being sawn off. If AI does all the junior work, how does a human ever gain the experience to become a senior? The Stanford data already shows that young people aged 22 to 25 in exposed fields like software and customer service are seeing real employment declines.",
      },
      { type: "subheading", text: "What Remains: The Theology of Being Human" },
      {
        type: "paragraph",
        text: "So what remains when the machine takes the spreadsheet and writes the code? This is where theology becomes remarkably practical and, in a strange way, deeply hopeful.",
      },
      {
        type: "paragraph",
        text: "Research on embodied cognition highlights a critical limitation of AI: it lives in servers. It has no body. It struggles with the physical world, with cause and effect, and with truly novel situations. More importantly, people still deeply value human professionals in areas of care and connection. UCL research on healthcare shows that people want a human doctor, not just a diagnosis printed on a receipt from a machine. If you receive a cancer diagnosis, do you want a kiosk in a hospital lobby to produce a treatment plan, or do you want a human being to sit down with you, look you in the eye, perhaps hold your hand, and say, \"This is scary, but we are going to walk through this together\"?",
      },
      {
        type: "paragraph",
        text: "Here is the pastoral insight for every parent: this is a massive opportunity to reclaim the value of being human. For the past fifty years, especially in the West, we have defined our worth by our cognitive output. I process data, therefore I am. I produce code, therefore I am. We have tried to become efficient machines. And now the machines are beating us at being machines. They won that race. So we must go back to being humans.",
      },
      {
        type: "paragraph",
        text: "Our ultimate value is not in being processing machines. It is in our souls, our physical presence, our empathy, our moral reasoning, our creativity. It is in the imago Dei — the image of God stamped on us. The AI cannot replicate the Holy Spirit living inside a person. It cannot replicate the laying on of hands in prayer. It cannot replicate the act of weeping with those who weep. It cannot replicate the spark of divine creativity that comes from our Creator.",
      },
      {
        type: "paragraph",
        text: "This is actually a hopeful pivot. It forces us as a culture and as families to double down on the things that actually matter eternally. It strips away the idol of pure productivity and leaves us with the inescapable reality of relationship — with God and with each other.",
      },
      {
        type: "discussion",
        questions: [
          "The \"broken ladder\" problem suggests that entry-level career paths are disappearing. How does this change the way you think about preparing your children for the future?",
          "If machines are now better at \"being machines,\" what does it mean for us to reclaim being human? What uniquely human capacities should we be cultivating in our children?",
          "How does the concept of the imago Dei (the image of God) give your family a foundation for identity and purpose that is immune to technological disruption?",
          "In what practical ways can you invest in your children's embodied skills — physical, relational, creative, and spiritual — rather than primarily in their cognitive and digital skills?",
        ],
      },
    ],
  },
  {
    id: "practical-discipleship",
    title: "Practical Discipleship — What Do We Do?",
    blocks: [
      { type: "subheading", text: "Be the Adult in the Room" },
      {
        type: "paragraph",
        text: "Tristan Harris laments that there are no adults in the tech industry stopping this out-of-control race. Parents must therefore be the adult in their own home. You cannot wait for the government to regulate this; they are years behind and do not understand it. You cannot wait for OpenAI or Google to grow a conscience; they are in a race for market survival. You, the parent, must grab the steering wheel of your own household.",
      },
      {
        type: "paragraph",
        text: "Harris also talks about rejecting the narrative of inevitability. We are told a story: AI is coming, resistance is futile, you just have to accept it and adapt. That is marketing propaganda designed to make you a passive consumer. We can choose a different path. We do not have to accept the race to the bottom in our own living rooms. You can decide what technology enters your home and how it is used.",
      },
      { type: "subheading", text: "Train for Biological Intelligence" },
      {
        type: "paragraph",
        text: "We need to be intentional about training for what might be called \"biological intelligence\" — doubling down on uniquely human skills:",
      },
      {
        type: "paragraph",
        text: "Literacy and deep reading. Actual books, not just skimming headlines. The capacity to sit with a long text, to follow an argument, to encounter ideas that are difficult and unfamiliar.",
      },
      {
        type: "paragraph",
        text: "Physical interaction and embodied play. Playing sports. Building things with your hands. Getting dirty. Send them outside to build a fort that does not fall down. Have them help you fix the lawnmower or bake bread from scratch.",
      },
      {
        type: "paragraph",
        text: "Complex problem-solving without screens. Puzzles, strategy games, real-world projects that require perseverance and creative thinking.",
      },
      {
        type: "paragraph",
        text: "Emotional resilience. Teaching children that the value of work is in the process, not just the output. God forms us through struggle. The Bible says, \"Consider it pure joy when you face trials of many kinds, because the testing of your faith produces perseverance\" (James 1:2–3). If you cheat on the essay with AI, you get the grade — the output — but you lose the perseverance, the character formation. We must start praising the effort and the wrestling with ideas more than we praise the shiny final product.",
      },
      { type: "subheading", text: "Address AI Companions Directly" },
      {
        type: "paragraph",
        text: "For children and teenagers, the advice regarding AI companions and chatbots is direct: ban them. A hard ban, no negotiation. Or at the very least, severely restrict and constantly monitor them.",
      },
      {
        type: "paragraph",
        text: "Real relationships are messy. They are hard. People let you down. Friends annoy you. Siblings steal your things. Your parents have rules you do not like. But that is where holiness happens — in the mess. We are sanctified by the friction of living with other sinners who are also being sanctified. AI relationships are easy and hollow. They are spiritual candy. Real relationships are the vegetables. We must choose the hard, holy work of real friendship and real family.",
      },
      {
        type: "paragraph",
        text: "As a parent, monitor for sycophancy. If you see your child retreating from real friends and only wanting to interact with the bot, it may be because they are addicted to constant, uncritical affirmation. That is a massive spiritual red flag. It is a sign that they are retreating from the friction of reality into a fantasy world built just for them.",
      },
      { type: "subheading", text: "Name the Idol: Spiritual Warfare" },
      {
        type: "paragraph",
        text: "Finally, this must be understood as a matter of spiritual warfare. We must name the idol. The tech leaders themselves say they are building a god — an entity that promises omniscience, omnipresence, and salvation from all our problems. It will solve climate change. It will cure death. It will bring abundance to all.",
      },
      {
        type: "paragraph",
        text: "That is a false gospel. And we must train our children to spot the idol. We must train them to trust in God's sovereignty over the algorithm's prediction. Just because the AI says something is probable does not make it God's will or God's truth.",
      },
      {
        type: "paragraph",
        text: "The core discernment skill of the next generation is this: Is this true, or is this just the most statistically likely sequence of words generated by a machine that scraped the internet? We seek truth through Scripture, through the church, through the Holy Spirit — not through a text box.",
      },
      {
        type: "discussion",
        questions: [
          "What specific, practical steps can you take this week to \"grab the steering wheel\" regarding AI in your household?",
          "Of the four areas of \"biological intelligence\" — deep reading, physical interaction, problem-solving, and emotional resilience — which is most lacking in your family's current rhythms? What could you change?",
          "How do you feel about a hard ban on AI companion chatbots for your children? What resistance might you encounter, and how could you address it?",
          "How can you help your children understand AI through the lens of spiritual warfare and idolatry without creating fear or paranoia?",
          "What role should the local church play in equipping families for this challenge? What would you want your church to provide?",
        ],
      },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion: The Image of the Living God",
    blocks: [
      {
        type: "paragraph",
        text: "The biologist E.O. Wilson once said: \"The real problem of humanity is the following: we have Palaeolithic emotions, medieval institutions, and godlike technology.\"",
      },
      {
        type: "paragraph",
        text: "It is a dangerous cocktail. Ancient emotions like jealousy and fear. Slow-moving institutions like government and schools. And a digital god in our pocket.",
      },
      {
        type: "paragraph",
        text: "If the leaders of these AI companies are openly willing to \"light the fire and see what happens\" regarding the future of humanity, are you willing to let them run your household by default? Or will you grab the steering wheel? It is time to drive.",
      },
      {
        type: "paragraph",
        text: "Here is the benediction for every parent and leader engaging with this material: while AI simulates intelligence, it lacks the breath of life. It can only create an image of a data set. But your children — your children are made in the image of the living God.",
      },
      {
        type: "paragraph",
        text: "That is their superpower. That is what makes them human. That is what gives them eternal value. And that is what we must protect at all costs.",
      },
    ],
  },
];

export const sourcesList = [
  "Tristan Harris, Center for Humane Technology",
  "Matt Schumer (AI Founder)",
  "METR / Science Publishing Group (AI Capabilities Research)",
  "Rand Corporation (Adolescent AI Use Study)",
  "Raista AI Journal (Sycophancy Study)",
  "Garcia v. Character AI (Legal Filing)",
  "Rain Family v. OpenAI (Legal Filing)",
  "Stanford Digital Economy Lab",
  "UCL (Cognitive Development Research)",
  "Cyberarch / Accenture (Agentic AI Reports)",
];
