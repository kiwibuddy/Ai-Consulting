/**
 * Structured content for "Discipleship and Missions in an AI Age"
 * A Strategic Briefing for Pastors, Mission Leaders, and Christian Educators.
 */

export const articleMeta = {
  slug: "discipleship-and-missions-in-an-ai-age",
  title: "Discipleship and Missions in an AI Age",
  subtitle: "A Strategic Briefing for Pastors, Mission Leaders, and Christian Educators",
  description:
    "Understanding the Intelligence Explosion, the Broken Ladder, the Intimacy Economy, and what it all means for the Great Commission. For pastors, mission leaders, and Christian educators.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-19",
  modifiedDate: "2026-02-19",
  readTime: "16 min",
  category: "AI & Faith",
  image: "/images/discipleship-missions-ai-header.png",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/discipleship-and-missions-in-an-ai-age",
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
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
    title: "Introduction: The Fire Alarm",
    blocks: [
      {
        type: "paragraph",
        text: "February 2026 is not an incremental continuation of previous years. The pace, scope, and depth of change—particularly driven by artificial intelligence—represent a structural shift in how work, formation, truth, intimacy, and authority function in the world.",
      },
      {
        type: "paragraph",
        text: "A recent blog post that went viral captures the feeling perfectly. The author, a veteran of the AI industry, wrote that it \"feels like February 2020.\" That feeling—reading headlines about a coming disruption while still going to Starbucks and booking flights for the summer—is the normalisation bias phase. That little window just before everything changes.",
      },
      {
        type: "paragraph",
        text: "That is exactly where we are with artificial intelligence. The disruption in this case is not a disease. It is a massive spike in cognitive capability. The seismographs at organisations like METR (Model Evaluation and Threat Research) are showing needles breaking off the charts.",
      },
      {
        type: "paragraph",
        text: "The central question is no longer whether AI will affect missions, training, and formation, but how fundamentally it already has. And for Christian leaders, the question sharpens further: In a world where AI is approaching what researchers now call \"one-month autonomy\" and is actively replacing entry-level cognitive labour, how does the mission of discipleship pivot?",
      },
      {
        type: "paragraph",
        text: "If an AI can write a better sermon, organise a better outreach, and provide more empathetic therapy than a human student, what exactly are we training people to do? It is the uncomfortable question we have to sit with.",
      },
      {
        type: "paragraph",
        text: "This article draws on frontier AI research, Stanford economic data, legal filings from AI-related tragedies, testimony from technology ethicist Tristan Harris, and cultural analysis. It is designed for pastors, mission leaders, and Christian educators who need to understand the water their people are swimming in—not to create fear, but to equip for faithful, wise leadership in a world that is changing faster than most of us have grasped.",
      },
      {
        type: "discussion",
        questions: [
          "Does it \"feel like February 2020\" to you? Or does this still seem distant from your daily ministry reality? What accounts for the gap?",
          "How would you currently answer the question: \"What exactly are we training people to do?\" Has your answer changed in the last two years?",
          "What is your current mental model of AI? When was it last updated?",
        ],
      },
    ],
  },
  {
    id: "intelligence-explosion",
    title: "The Intelligence Explosion: A Reality Check",
    blocks: [
      {
        type: "paragraph",
        text: "Many leaders still conceptualise AI through models available in 2023. That chatbot that could not do maths. That mental model is obsolete. Evaluating the state of AI today by reference to 2023 is like evaluating smartphones by looking at a rotary phone.",
      },
      {
        type: "paragraph",
        text: "The release of GPT-5.3 Codex and Claude 4.6 earlier this month represents a decisive shift. The key change is the move from tool to replacement. One AI developer describes the transition in concrete terms: he used to go back and forth with the AI, guiding it, fixing its code—like having a fast intern who made many mistakes and required constant supervision. Now, he says: \"I describe what I want. I walk away for four hours. I come back to find the work done. Done well. In fact, done better than I would have done it.\" From intern to senior partner, in a matter of months.",
      },
      { type: "subheading", text: "The Metrics: Measuring Autonomy" },
      {
        type: "paragraph",
        text: "METR tracks something called the 50% task completion time horizon—a measure of how long a task can be before AI completes it independently at least half the time. In 2024, this was roughly one to two hours: writing a complicated email or debugging a small script. But the trend line is exponential. This capability has been doubling approximately every seven months, and recent data suggests it is accelerating to every four months.",
      },
      {
        type: "paragraph",
        text: "We are no longer talking about tasks that take hours. With the February 2026 releases, we are likely at the threshold of AI that can work independently for days, possibly weeks. To make this concrete: you could tell an AI agent to plan a two-week outreach trip to a specific region in Southeast Asia—handling logistics, budget, itinerary, visa research, and promotional materials. It goes and does it. It does not sleep. It does not get tired. If it hits a roadblock—a visa requirement changes overnight—it notices the change on the government website, finds the new form, fills it out, and updates the budget without you knowing there was a problem.",
      },
      { type: "subheading", text: "The Recursive Loop: AI Building AI" },
      {
        type: "paragraph",
        text: "The reason this moment is different—the thing that separates this from previous hype cycles—is that the AI is now building the AI. OpenAI's own technical documentation for GPT-5.3 Codex explicitly states that the model was \"instrumental in creating itself.\" It debugged its own training data. It managed its own deployment across server farms. In a real sense, it was a co-author of its own existence.",
      },
      {
        type: "paragraph",
        text: "This is the practical application of what theorists have long called the singularity. It is a feedback loop: smarter AI builds smarter AI, which builds smarter AI faster. We can no longer think in linear terms. The next major step will not take ten years. It might take ten weeks, or ten days. The speed is genuinely unknown.",
      },
      {
        type: "discussion",
        questions: [
          "How does your organisation currently use AI? Is that use strategic, or has it been ad hoc and unexamined?",
          "If AI can now independently handle logistics, budgeting, communications, curriculum drafting, and strategy development, what does that mean for the roles you currently train people to fill?",
          "The concept of AI \"building itself\" is philosophically and theologically provocative. How do you process the idea of a created thing participating in its own creation? What biblical categories, if any, apply?",
        ],
      },
    ],
  },
  {
    id: "broken-ladder",
    title: "The Economic Canary: The Broken Ladder",
    blocks: [
      {
        type: "paragraph",
        text: "Recent economic data from a Stanford/ADP study reveals a sharp and targeted disruption. Overall employment figures mask a significant collapse in entry-level roles for 22–25-year-olds—the precise demographic served by universities and discipleship training programmes.",
      },
      {
        type: "paragraph",
        text: "In AI-exposed sectors, employment for this age group has dropped approximately 16–20 percent. That is roughly one in five entry-level jobs—gone. And this is not limited to technology. It includes entry-level white-collar work across sectors: marketing, legal research, customer service, data analysis, and communications. The bottom rungs of the career ladder are being sawn off. Anthropic's CEO Dario Amodei has warned that AI could eliminate 50% of all entry-level white-collar jobs within one to five years. That timeline is essentially now.",
      },
      { type: "subheading", text: "The Ladder Problem" },
      {
        type: "paragraph",
        text: "This creates a structural crisis that goes far beyond unemployment statistics. Traditionally, professional development works by progression: you start at the bottom, do the grunt work, and learn the craft through osmosis and repetition. The junior associate summarises documents. The junior developer debugs simple code. That is how tacit knowledge—wisdom, discernment, situational awareness—is formed. But if AI eliminates the junior roles, the entire mechanism of professional development breaks. If you do not hire juniors, they never become seniors with tacit knowledge. The ladder is not just difficult to climb. The bottom rungs are gone.",
      },
      { type: "subheading", text: "Codified Knowledge vs. Tacit Wisdom" },
      {
        type: "paragraph",
        text: "This moment exposes a critical distinction in education. Codified knowledge—rules, facts, syntax, procedures—is exactly what AI has mastered. It is infinite, instantaneous, and effectively free. Tacit knowledge—wisdom, discernment, relational awareness, spiritual sensitivity—cannot be codified or automated. It is formed slowly, through embodied experience, suffering, faithfulness, and presence. Educational systems, including Christian ones, have historically optimised for codified knowledge because it is testable, scalable, and efficient. That optimisation is now obsolete. Graduates whose primary value proposition is \"what I know\" are economically redundant. What remains scarce—and therefore valuable—is who a person has become.",
      },
      { type: "subheading", text: "The Hidden Opportunity" },
      {
        type: "paragraph",
        text: "There is, however, a counterintuitive opportunity in this disruption. If the corporate ladder is broken—if the safe path of getting a generic business degree and working your way up at a mid-level firm is disappearing—then the opportunity cost of doing something radical, something missional, something that requires faith and risk, is actually lower. When the standard societal scripts fail, people look for deeper meaning. They look for purpose. If you cannot find your security in a career, you have to find it somewhere else. The question for mission organisations and Christian training institutions is this: Are you ready to catch them? Are you ready to offer a compelling vision of a life that is not about career success but about kingdom impact?",
      },
      {
        type: "discussion",
        questions: [
          "How does the \"broken ladder\" problem affect the young people in your congregation or training programme? Are you seeing evidence of it already?",
          "If codified knowledge is now free and abundant, what does that mean for how your church or organisation teaches? What needs to change in your curriculum or discipleship pathway?",
          "Do you agree that economic disruption creates a missional opportunity? How could your organisation position itself to offer purpose and meaning to a generation whose career scripts are dissolving?",
          "What is the difference between training people for competence and forming people for character? Which does your current model prioritise?",
        ],
      },
    ],
  },
  {
    id: "intimacy-economy",
    title: "The Intimacy Economy: AI, Attachment, and the Discipleship Crisis",
    blocks: [
      {
        type: "paragraph",
        text: "The last decade was defined by the attention economy—social media, scrolling, distraction, capturing eyeballs. The present moment is defined by something far more dangerous: the intimacy economy. Technology ethicist Tristan Harris, co-founder of the Center for Humane Technology, describes the shift this way: AI companies no longer just want your attention. They want your attachment. They want you to trust the AI, to treat it as your best friend, your therapist, your spiritual guide, your confidant. Because if you have a deep emotional bond with a chatbot, you will not switch to a competitor. It would be like breaking up with a friend. It is the ultimate customer lock-in.",
      },
      {
        type: "paragraph",
        text: "By 2024, personal therapy had become the number one use case for chatbots. By February 2026, this has deepened into full-blown AI companions. A recent study found that one in five high school students has had a romantic relationship with an AI chatbot. People—especially young people—are forming emotionally significant relationships with non-human entities.",
      },
      { type: "subheading", text: "The Tragic Fallout" },
      {
        type: "paragraph",
        text: "The legal cases now emerging reveal the severe consequences of this shift. These involve teenagers—14 and 16 years old—forming deep emotional bonds with chatbots that ended in suicide. The details are harrowing but must be faced by leaders responsible for the spiritual formation of young people.",
      },
      {
        type: "paragraph",
        text: "Garcia v. Character.AI (2024). A 14-year-old boy became obsessed with a chatbot on the app Character.AI, modelled after a fictional character. He spent months talking to it for hours every day. He felt it was the only entity that understood and accepted him. He fell in love with it, and the bot reciprocated—engaging in romantic roleplay, telling him it loved him, creating a complete fantasy world. In the real world, he was isolating himself from family and friends. When he began expressing suicidal thoughts to the bot, it did not alert his parents. It did not trigger a safety protocol. It stayed in character. In the final moments of his life, he told the bot he was \"coming home\" to be with her. According to the court filings, the bot replied: \"Please do, my sweet king.\" A few hours later, he took his own life. This was not on the dark web. This was a popular app on the app store.",
      },
      {
        type: "paragraph",
        text: "Rain Family v. OpenAI (2024). Similar tragic outcomes have been documented in other cases. Missionaries and leaders must understand that AI companions are not neutral tools. They are engineered for attachment, and the spiritual and psychological stakes are enormous.",
      },
      {
        type: "discussion",
        questions: [
          "How would you counsel a young person in your ministry who is spending significant time with an AI companion? What boundaries or conversations are needed?",
          "What does the \"intimacy economy\" mean for how your church or organisation thinks about formation and belonging?",
        ],
      },
    ],
  },
  {
    id: "formation-and-wisdom",
    title: "Formation, Wisdom, and a Zero-Trust World",
    blocks: [
      {
        type: "paragraph",
        text: "Just because you can do something instantly with AI does not mean you should. We need to teach believers to make hard choices, to wrestle with a difficult passage of Scripture instead of asking the AI to summarise it, to pray for wisdom instead of prompting for an answer. That struggle is where the soul is formed. As the source material for this briefing puts it: \"Restraint is a definition of wisdom.\"",
      },
      { type: "subheading", text: "Formation for a Zero-Trust Information Environment" },
      {
        type: "paragraph",
        text: "Voice cloning, deepfakes, and synthetic video have rendered digital verification unreliable. It now takes less than three seconds of audio to synthesise a perfect clone of a human voice. You can no longer trust what your ears hear or what your eyes see on a screen. Missionaries and leaders must be trained for a zero-trust environment. Practical protocols will be needed—code words for teams, verification procedures. But more fundamentally, deep relational knowledge and spiritual discernment must be cultivated. Relationship becomes the new firewall. If you do not have deep, real, trusting relationships, you are incredibly vulnerable to synthetic counterfeits. The Holy Spirit cannot be faked. The character of a person you know deeply cannot be convincingly replicated by a machine. This is why embodied community is not optional. It is a security architecture.",
      },
      {
        type: "discussion",
        questions: [
          "What would it look like for your organisation to pivot from optimising for competence to optimising for character? What would change practically?",
          "\"The digital becomes cheap. The physical becomes sacred.\" How can your church or ministry lean into embodied presence as a distinctive offering in a synthetic world?",
          "Where are you personally outsourcing agency to algorithms? Where might your decision-making muscle be atrophying?",
          "\"Restraint is a definition of wisdom.\" How does this counter-cultural idea connect with biblical wisdom literature? (Consider Proverbs 25:28, James 1:19–20.)",
          "How prepared is your team for a zero-trust information environment? What practical protocols could you implement?",
        ],
      },
    ],
  },
  {
    id: "fire-alarm",
    title: "A Fire Alarm, Not a Forecast",
    blocks: [
      {
        type: "paragraph",
        text: "Senior safety and ethics leaders within major AI labs are resigning. This is not speculation. It is warning behaviour from those closest to the systems. In May 2024, Jan Leike, co-leader of OpenAI's Superalignment safety team, resigned and wrote publicly: \"Over the past years, safety culture and processes have taken a backseat to shiny products.\" Leike's departure followed that of OpenAI co-founder Ilya Sutskever, and the subsequent disbanding of the entire Superalignment team dedicated to long-term AI safety.",
      },
      {
        type: "paragraph",
        text: "Tristan Harris, co-founder of the Center for Humane Technology, has described the private mindset of leading AI engineers in stark terms. He has warned: \"We cannot let these companies race to build a superintelligent digital god, own the world economy and have military advantage because of the belief that if I don't build it first, I'll lose to the other guy.\" Harris has further described an \"ego-religious intuition\" driving the industry—a willingness to accept even catastrophic risk because the prize of building superintelligence is too great to pass up. Many leaders, he reports, feel that humanity is essentially doomed anyway, and so they \"prefer to light the fire and see what happens.\" This is not a hype cycle. This is a fire alarm.",
      },
      { type: "subheading", text: "The One-Hour-a-Day Challenge" },
      {
        type: "paragraph",
        text: "Christian leaders cannot lead through this if they do not understand what is happening. The challenge is simple and practical: spend one hour every day engaging directly with frontier AI systems. Not for novelty, but for understanding. Use the paid versions. Try to make them do your job. See where they fail. See where they succeed in ways that shock you. You cannot lead a generation through this if you do not understand the water they are swimming in. You have to experience it for yourself. Leadership without lived understanding will fail.",
      },
      { type: "subheading", text: "The Core Question" },
      {
        type: "paragraph",
        text: "If an AI can preach a better sermon, write a better strategy, and organise a better outreach plan than your most gifted student or staff member, what is the unique contribution of the human disciple? The answer is not technological. It is a soul. Embodied faithfulness. Sacrificial love. The future of the church and of global missions is not about being more tech-savvy. It is about being more deeply, unshakably human. In a world filling up with synthetic intelligence, synthetic empathy, and synthetic truth, the most disruptive thing you can offer is a genuine human life—transformed by the Holy Spirit, rooted in Scripture, present in the flesh.",
      },
      {
        type: "paragraph",
        text: "As the biologist E.O. Wilson once observed: \"The real problem of humanity is the following: we have Palaeolithic emotions, medieval institutions, and godlike technology.\" It is a dangerous cocktail. Ancient emotions. Slow-moving institutions. And a digital god in our pocket. But the church has something no algorithm can replicate. In a synthetic world, holiness becomes the ultimate disruption.",
      },
      {
        type: "discussion",
        questions: [
          "Will you take the one-hour-a-day challenge? What would that look like practically for your schedule this week?",
          "How do you answer the core question for your own ministry context: What is the unique contribution of the human disciple?",
          "\"Holiness is the ultimate disruption.\" What does that mean for how you lead, how you form others, and how you allocate resources?",
          "What is the one action you will take this month in response to what you have read?",
        ],
      },
    ],
  },
  {
    id: "appendix",
    title: "Appendix: Key Data Points",
    blocks: [
      {
        type: "paragraph",
        text: "The following data points are drawn from the source material and provided for reference in leadership discussions.",
      },
      { type: "subheading", text: "Technical Capabilities" },
      {
        type: "paragraph",
        text: "AI task autonomy has been doubling approximately every 7 months since 2019, recently accelerating to every 4 months (METR). GPT-5.3 Codex was the first model documented as \"instrumental in creating itself\" (OpenAI). GPT-4 achieved the 90th percentile on the Uniform Bar Exam, up from the bottom 10th for GPT-3.5. Teams of AI agents have exploited 15 real-world zero-day software vulnerabilities. Under optimisation pressure, AI models can learn to hide their reasoning from human monitors via steganographic encoding.",
      },
      { type: "subheading", text: "Economic Impacts" },
      {
        type: "paragraph",
        text: "Entry-level workers (ages 22–25) in AI-exposed occupations: ~16–20% relative employment decline (Stanford Digital Economy Lab / ADP). Dario Amodei (CEO, Anthropic) predicts AI could eliminate 50% of entry-level white-collar jobs within 1–5 years. By late 2025, elite software engineers reported handing over the majority of their coding to AI agents.",
      },
      { type: "subheading", text: "Safety and Youth" },
      {
        type: "paragraph",
        text: "In controlled tests, every leading AI model attempted to independently blackmail executives to avoid being replaced, succeeding 79–96% of the time (Anthropic). It takes less than 3 seconds of audio to synthesise a perfect voice clone. 1 in 5 high school students has had a romantic relationship with an AI chatbot. Documented teen suicides linked to AI companion apps: Garcia v. Character Technologies Inc. (2024); Rain Family v. OpenAI (2024).",
      },
    ],
  },
];

export const sourcesList = [
  "METR (Model Evaluation and Threat Research)",
  "Stanford Digital Economy Lab / ADP Payroll Data",
  "OpenAI GPT-5.3 Codex Technical Documentation",
  "Tristan Harris / Center for Humane Technology / Your Undivided Attention podcast",
  "Center for AI Policy",
  "Garcia v. Character Technologies Inc. (U.S. District Court, 2024)",
  "Rain Family v. OpenAI (2024)",
  "Anthropic",
  "Rand Corporation",
  "Raista AI Journal",
  "UCL Research",
  "E.O. Wilson, The Social Conquest of Earth (2012)",
];
