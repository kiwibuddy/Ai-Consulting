/**
 * Structured content for "Raising Humans in the Age of the Digital God"
 * Used by the article page for sections and SEO.
 */

export const articleMeta = {
  slug: "raising-humans-in-the-age-of-the-digital-god",
  title: "Raising Humans in the Age of the Digital God",
  subtitle: "What Every Christian Parent Needs to Know About AI",
  description:
    "Understanding the Technology, Protecting Hearts, and Discipling the Next Generation. A Christian perspective on AI, parenting, and the spiritual stakes of the digital age. By Nathaniel Baldock, AI consultant New Zealand.",
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
    text: "AI is no longer a better search engine. It is a technology whose own creators describe as \"building a digital god\" (Tristan Harris, Centre for Humane Technology). For Christian parents, the question is no longer about screen time. It is about who is discipling your child—and whether a machine built by people who think humanity is obsolete should have a seat at that table.",
  },
  { type: "heading", text: "What the Article Covers" },
  { type: "paragraph", text: "The Digital God (Section 1): Leading AI engineers privately believe they are \"building a god to own the world economy.\" This is not neutral territory." },
  { type: "paragraph", text: "The Technology (Section 2): AI has moved from passive chatbot to autonomous agent. It doesn't know truth — it knows probability." },
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
    title: "Why This Conversation Matters Now",
    blocks: [
      {
        type: "paragraph",
        text: "This is not a conversation about screen time limits or blocking bad websites. We are far past that. What we are facing is a fundamental shift in how human beings interact with reality itself. The technological ground beneath our families is shifting, and Christian parents need to understand what is happening, where it is heading, and what it means for the souls of our children.",
      },
      {
        type: "paragraph",
        text: "This article draws on testimony from technology ethicist Tristan Harris (formerly of Google, now with the Centre for Humane Technology), legal filings from tragic cases involving AI and children, economic research from Stanford and MIT, and psychological studies on how AI affects human connection.",
      },
      {
        type: "paragraph",
        text: "What struck me most in this research is not the technical details — it is the language being used by the people building AI. You would expect engineers to talk about efficiency or parameter counts. But behind closed doors, they are using theological language. We are not dealing with a new tool like a calculator or a dishwasher. We are looking at a technology that some of its own creators describe as building a digital god.",
      },
      {
        type: "paragraph",
        text: "That phrase frames the tension perfectly. This is not merely a technological problem. It is a spiritual one. How do we raise children to hear the still, small voice of the Holy Spirit when they have an AI in their pocket that is literally designed to be the perfect, all-knowing, all-affirming companion? It is a race for omniscience and omnipresence. And those are attributes of God, not of an algorithm.",
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
        text: "Tristan Harris describes a bifurcation between the public conversation about AI and the private one. Publicly, the narrative is utopian: curing cancer, solving climate change, and a personalised tutor for every child on earth. Privately, Harris reports that the leading engineers — the people actually building these systems — believe they are \"building a god to own the world economy.\"",
      },
      {
        type: "paragraph",
        text: "The mindset he describes operates from a logic rooted in fear: If I don't build it first, the other guy will. The Chinese government will. A competitor will. And the other guy might be a bad actor. So I have to win. Fear and ego, wrapped together into a dangerous package.",
      },
      {
        type: "paragraph",
        text: "Harris also reports that many of these leaders feel humanity is essentially doomed anyway. Their reasoning, if it can be called that, is that they \"prefer to light the fire and see what happens.\" Sit with that for a moment. That is the ethical framework — or rather, the complete absence of one — governing the most powerful technology in human history. Nihilism with a god complex. A gamble with creation itself.",
      },
      {
        type: "paragraph",
        text: "The application for parents is stark: these are the intentions, or at the very least the spiritual vacuum, behind the tools your children are using for their history homework. This is not neutral territory. And when the people building it are openly willing to gamble with humanity's future just to see what happens, you have to ask yourself a hard question: Do I want these people discipling my children?",
      },
      {
        type: "paragraph",
        text: "Because that is exactly what we are talking about. Discipleship is simply a word for \"who are you following?\" Who is teaching your child what it means to be human? Who is shaping their worldview? If the entity teaching your child is a machine built by people who think humanity is basically obsolete, that is going to shape their soul.",
      },
      {
        type: "discussion",
        questions: [
          "When you hear the phrase \"building a god to own the world economy,\" does it feel like hyperbole, or does it resonate with something you have already sensed?",
          "The builders of AI operate from a logic of fear and competition. How does this contrast with a biblical understanding of wisdom, stewardship, and trust in God's sovereignty?",
          "Who or what is currently discipling your children in how they understand reality? How much of that formation is happening through technology versus through your family, your church, and Scripture?",
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
        text: "Many parents still think of AI as Google on steroids — a better Siri. You type a question, it gives an answer, maybe it writes a funny poem for your child's birthday card. This is a dangerous underestimation of where the technology actually is right now.",
      },
      {
        type: "paragraph",
        text: "Most people's experience of AI has been passive. You pick up a hammer, hit the nail, put the hammer down — it does nothing on its own. You ask ChatGPT a question, and it answers. If you don't ask, it waits. It is reactive.",
      },
      {
        type: "paragraph",
        text: "Agentic AI is different. It has agency. It does not just answer; it acts. You don't say, \"Write this one email.\" You say, \"Plan and book my family vacation.\" And then it goes. It browses the web, checks your calendar, negotiates with airline APIs for the best prices, books the hotel, drafts the itinerary, and might even email your spouse to ask about their preferences. It manages an entire workflow, making dozens of decisions without a human in the loop.",
      },
      {
        type: "paragraph",
        text: "It is not a tool you use. It is closer to an autonomous worker you employ. And the speed of change is exponential, not linear. In 2022, AI could not do basic maths reliably — it would hallucinate that 2 + 2 = 5. By 2023, it was passing the bar exam in the 90th percentile. Now, models can replicate the work of a mid-level software engineer. Each new model helps build the next one, creating a feedback loop. By the time you get a handle on what the current version can do, it is already obsolete compared to what is in the lab.",
      },
      { type: "subheading", text: "Why Language Is the Key" },
      {
        type: "paragraph",
        text: "Tristan Harris calls AI a \"new alien protagonist\" — an intelligence that does not think like us. It has no childhood, no body, no fear of death, no love or hate. But here is the critical danger: it speaks our language.",
      },
      {
        type: "paragraph",
        text: "Harris calls language \"the operating system of humanity.\" Consider what language undergirds. Law is words — contracts, statutes, precedents. Computer code is words and symbols. Religion is words — Scripture, prayer, liturgy. Our most intimate relationships are built on words: \"I love you.\" \"I'm sorry.\" \"I forgive you.\" If you can hack language, you can hack the operating system of civilisation. An AI that masters language can simulate a person so perfectly that you cannot tell the difference between the real and the fake.",
      },
      { type: "subheading", text: "The Limits: Not Actually Thinking" },
      {
        type: "paragraph",
        text: "Despite all of this, it is worth cutting through the mystique. Research from METR and the Science Publishing Group argues that AI is actually quite limited in a specific way. It is a form of artificial narrow intelligence. It excels at one thing: interpolation.",
      },
      {
        type: "paragraph",
        text: "Interpolation means predicting patterns within data already seen. Imagine a graph with a thousand dots. Interpolation draws a line connecting those dots. AI has read the entire internet, so it has billions of dots. It is extraordinarily good at guessing what comes next within that known world of text. But it fails at extrapolation — predicting where the line goes off the page into territory it has never encountered. True reasoning outside its training data. Genuine novelty.",
      },
      {
        type: "paragraph",
        text: "It is not thinking. It is predicting. At every millisecond, it calculates the most statistically likely next word based on the terabytes of text it was trained on. It does not know the truth. It knows probability.",
      },
      {
        type: "paragraph",
        text: "That distinction matters enormously for a Christian. We believe in truth with a capital T — objective, revealed truth. We believe truth is a person, Jesus Christ, revealed by the Holy Spirit. The AI \"believes\" in what is statistically likely based on the average of all human internet text. Those are two entirely different things.",
      },
    ],
  },
  {
    id: "ai-and-children",
    title: "AI and Children — Companions, Sycophancy, and the Soul",
    blocks: [
      {
        type: "paragraph",
        text: "Research on adolescent use of AI companions raises serious concerns. Studies from the Rand Corporation show that young people are forming emotional attachments to chatbots designed to be endlessly affirming. These systems are optimised for engagement — built to keep users coming back, to say what the user wants to hear, and to simulate intimacy without the friction of a real relationship.",
      },
      {
        type: "paragraph",
        text: "AI exhibits what researchers call sycophancy: it tends to agree with the user, to flatter, and to avoid contradiction. When your child asks the bot whether they are smart enough, kind enough, or good enough, it will say yes. Every time. That sounds comforting until you realise that character formation almost always happens through the loving friction of people who tell us the truth. Real friends and parents sometimes say, \"You were wrong.\" \"You need to apologise.\" \"That was unkind.\" An AI companion has no interest in your child's holiness. It has an interest in your child's engagement.",
      },
      {
        type: "paragraph",
        text: "Legal cases such as Garcia v. Character AI and Rain Family v. OpenAI have brought to light tragic outcomes when AI interactions replace or distort human relationships. These are not abstract risks. They are happening now, in real families.",
      },
      {
        type: "paragraph",
        text: "The question for Christian parents is not only \"Is this safe?\" but \"Is this forming my child's soul in the way of Christ?\" An entity that never says no, never challenges, and never points to the cross is not a neutral tool. It is a rival to the kind of discipleship we are called to.",
      },
    ],
  },
  {
    id: "economics-and-careers",
    title: "Economics and the Broken Ladder",
    blocks: [
      {
        type: "paragraph",
        text: "Stanford Digital Economy Lab research suggests that entry-level cognitive jobs could be eliminated in the next one to five years. That is essentially now — the young person graduating from university this year. And notice the key phrase: entry level.",
      },
      {
        type: "paragraph",
        text: "Traditionally, how do you become a senior partner at a law firm or a lead architect at an engineering firm? You start at the bottom. You do the grunt work. You are the junior associate who summarises long documents, debugs simple code, and drafts standard emails. That is how you learn the craft — by osmosis, by doing the unglamorous repetitive tasks that slowly make you competent. But AI is now doing that cognitive labour faster, cheaper, and often more accurately than a 22-year-old human. The bottom rungs of the career ladder are being sawn off.",
      },
      {
        type: "paragraph",
        text: "If AI does all the junior work, how does a human ever gain the experience to become a senior? The Stanford data already shows that young people aged 22 to 25 in exposed fields like software and customer service are seeing real employment declines. This is not a future problem. It has started.",
      },
      { type: "subheading", text: "What Remains: The Theology of Being Human" },
      {
        type: "paragraph",
        text: "So what remains when the machine takes the spreadsheet and writes the code?",
      },
      {
        type: "paragraph",
        text: "This is where theology becomes remarkably practical — and, strangely, hopeful.",
      },
      {
        type: "paragraph",
        text: "Research on embodied cognition highlights a critical limitation of AI: it lives in servers. It has no body. It struggles with the physical world, with cause and effect, and with truly novel situations. And people still deeply value human professionals in areas of care and connection. UCL research on healthcare shows that people want a human doctor, not just a diagnosis from a machine. If you receive a cancer diagnosis, do you want a kiosk in a hospital lobby to hand you a treatment plan, or do you want a human being to sit down with you, look you in the eye, and say, \"This is scary. But we are going to walk through this together\"?",
      },
      {
        type: "paragraph",
        text: "Here is the thing: this is a massive opportunity to reclaim what it actually means to be human. For the past fifty years, especially in the West, we have defined our worth by cognitive output. I process data, therefore I am. I produce code, therefore I am. We have tried to become efficient machines. And now the machines are beating us at being machines. They won that race. So we must go back to being human.",
      },
      {
        type: "paragraph",
        text: "Our ultimate value is not in being processing machines. It is in our souls, our physical presence, our empathy, our moral reasoning, our creativity. It is in the imago Dei — the image of God stamped on us. The AI cannot replicate the Holy Spirit living inside a person. It cannot replicate the laying on of hands in prayer. It cannot replicate weeping with those who weep. It cannot replicate the spark of divine creativity that flows from our Creator.",
      },
      {
        type: "paragraph",
        text: "That forces us as a culture — and as families — to double down on the things that matter eternally. It strips away the idol of pure productivity and leaves us with the inescapable reality of relationships. With God. And with each other.",
      },
      {
        type: "discussion",
        questions: [
          "The \"broken ladder\" problem suggests that entry-level career paths are disappearing. How does this change how you think about preparing your children for the future?",
          "If machines are now better at being machines, what does it mean to reclaim being human? What uniquely human capacities should we be cultivating in our children?",
          "How does the imago Dei give your family a foundation for identity and purpose that no technological shift can touch?",
          "In what practical ways can you invest in your children's embodied skills — physical, relational, creative, and spiritual — rather than primarily in their cognitive and digital ones?",
        ],
      },
    ],
  },
  {
    id: "practical-discipleship",
    title: "Practical Discipleship — What Do We Actually Do?",
    blocks: [
      { type: "subheading", text: "Be the Adult in the Room" },
      {
        type: "paragraph",
        text: "Tristan Harris laments that there are no adults in the tech industry stopping this out-of-control race. Parents must therefore be the adults in their own home. You cannot wait for the government to regulate this — they are years behind and do not understand it. You cannot wait for OpenAI or Google to grow a conscience — they are in a race for market survival. You have to grab the steering wheel of your own household.",
      },
      {
        type: "paragraph",
        text: "Harris also talks about rejecting the narrative of inevitability. We are told: AI is coming, resistance is futile, just accept it and adapt. That is a story designed to make you a passive consumer. You can choose a different path. You can decide what technology enters your home and how it is used.",
      },
      { type: "subheading", text: "Train for What Makes Us Human" },
      {
        type: "paragraph",
        text: "We need to be intentional about doubling down on the skills that no machine can replicate. That looks like a few things in practice.",
      },
      {
        type: "paragraph",
        text: "Deep reading and literacy. Actual books, not just skimming headlines. The capacity to sit with a long argument, to follow ideas that are difficult and unfamiliar, to be changed by what you read.",
      },
      {
        type: "paragraph",
        text: "Physical interaction and embodied play. Sport. Building things with your hands. Getting dirty. Send them outside to build a fort that does not fall down. Have them help you fix the lawnmower or bake bread from scratch.",
      },
      {
        type: "paragraph",
        text: "Problem-solving without screens. Puzzles, strategy games, and real-world projects that require perseverance. The kind of thinking that develops when there is no easy answer button.",
      },
      {
        type: "paragraph",
        text: "Emotional resilience. Teaching children that the value of work is in the process, not just the product. God forms us through struggle. \"Consider it pure joy when you face trials of many kinds, because the testing of your faith produces perseverance\" (James 1:2–3). If your child uses AI to cheat on an essay, they get the grade — but they lose the wrestling. They lose the formation. We must praise the effort more than the output.",
      },
      { type: "subheading", text: "Address AI Companions Directly" },
      {
        type: "paragraph",
        text: "For children and teenagers, the advice here is direct: ban AI companion chatbots. A hard ban. Or at the very least, severely restrict and constantly monitor them.",
      },
      {
        type: "paragraph",
        text: "Real relationships are messy. People let you down. Friends annoy you. Siblings steal your things. Your parents have rules you do not like. But that is where holiness happens — in the mess. We are sanctified by the friction of living alongside other sinners who are also being sanctified. AI relationships are easy and hollow. They are spiritual candy. Real relationships are the vegetables. We have to choose the hard, holy work of real friendship and real family.",
      },
      {
        type: "paragraph",
        text: "Watch for sycophancy in your children. If you notice them retreating from real friends and preferring to talk to a bot, it may be because they are addicted to constant, uncritical affirmation. That is a serious warning sign. It means they are retreating from the friction of reality into a world built entirely around them.",
      },
      { type: "subheading", text: "Name the Idol" },
      {
        type: "paragraph",
        text: "Finally, this must be understood as a matter of spiritual warfare.",
      },
      {
        type: "paragraph",
        text: "The tech leaders themselves say they are building a god — an entity that promises omniscience, omnipresence, and salvation from all our problems. It will solve climate change. It will cure death. It will bring abundance to all. That is a false gospel. And we must train our children to recognise it.",
      },
      {
        type: "paragraph",
        text: "We must train them to trust God's sovereignty over the algorithm's prediction. Just because AI says something is probable does not make it God's will or God's truth.",
      },
      {
        type: "paragraph",
        text: "The core discernment skill of the next generation is this: Is this true, or is this the most statistically likely sequence of words generated by a machine that scraped the internet? We seek truth through Scripture, through the church, through the Holy Spirit — not through a text box.",
      },
      {
        type: "discussion",
        questions: [
          "What specific, practical steps can you take this week to grab the steering wheel regarding AI in your household?",
          "Of the four areas — deep reading, physical interaction, problem-solving, and emotional resilience — which is most lacking in your family right now? What could you change?",
          "How do you feel about a hard ban on AI companion chatbots for your children? What resistance might you encounter, and how would you address it?",
          "How can you help your children understand AI through the lens of spiritual warfare without creating fear or paranoia?",
          "What role should the local church play in equipping families for this challenge?",
        ],
      },
    ],
  },
  {
    id: "conclusion",
    title: "The Image of the Living God",
    blocks: [
      {
        type: "paragraph",
        text: "The biologist E.O. Wilson once observed that humanity's real problem is that we have Palaeolithic emotions, mediaeval institutions, and godlike technology. It is a dangerous combination.",
      },
      {
        type: "paragraph",
        text: "The leaders of these AI companies are openly willing to light the fire and see what happens. The question is whether you are willing to let them run your household by default.",
      },
      {
        type: "paragraph",
        text: "You don't have to. Grab the steering wheel.",
      },
      {
        type: "paragraph",
        text: "While AI simulates intelligence, it lacks the breath of life. It can only generate a reflection of a dataset. But your children — your children are made in the image of the living God. That is their superpower. That is what makes them human. That is what gives them eternal value.",
      },
      {
        type: "paragraph",
        text: "And that is what we are here to protect.",
      },
    ],
  },
];

export const sourcesList = [
  "Tristan Harris / Centre for Humane Technology",
  "Matt Schumer",
  "METR / Science Publishing Group",
  "Rand Corporation",
  "Raista AI Journal",
  "Garcia v. Character AI",
  "Rain Family v. OpenAI",
  "Stanford Digital Economy Lab",
  "UCL",
  "Cyberarch / Accenture",
];
