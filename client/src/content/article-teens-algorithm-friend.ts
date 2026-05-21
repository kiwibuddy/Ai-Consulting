/**
 * Structured content for "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know"
 * Used by the article page for sections and SEO.
 */

export const articleMeta = {
  slug: "when-your-teens-best-friend-is-an-algorithm",
  title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
  subtitle:
    "One in eight teenagers is turning to AI for mental health advice. Two out of three call a chatbot their friend. The classic 2 a.m. conversation has fundamentally shifted — and so must we.",
  description:
    "Teens and AI companions: what Christian parents and youth leaders need to know. How Character.AI and AI chatbots affect teen mental health, why kids prefer algorithms to adults, social skill atrophy, AI deepfakes in schools, and practical ways to out-human the technology.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-02-26",
  modifiedDate: "2026-05-21",
  readTime: "18 min",
  category: "AI & Faith",
  image: "/images/teens-algorithm-header.png",
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
    text: "For the first time in history, kids are interacting with technology built to mimic being known — without ever fulfilling it. One in eight adolescents use AI for mental health advice. Two in three children aged 11–16 call an AI a friend. The 2 a.m. conversation is no longer with a human.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "How social media primed a generation for AI companions. The 2 a.m. conversation, Character.AI, and why AI fails in crises. Social skill atrophy, sycophantic AI, and the scale of AI-generated harm. What the hunger to be known is actually for — and how the church can out-human the algorithm with embodied community.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Build high-presence, low-device environments: wilderness trips, shared meals, service projects, vulnerable leadership.",
      "Equip parents: most don't know what Character.AI is or that companion apps form emotional and romantic bonds with teens.",
      "Name what's happening — deepfakes, nudify apps, midnight chats — and give families language for honest dinner-table conversations.",
      "Offer what the algorithm never can: embodied, awkward, fully present human community where young people are known.",
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
        text: "I have spent a massive portion of my life around small groups, youth programs, or classrooms. I've lectured at different schools on the YWAM Kona campus and taught students in Belize. I also worked in Mexico and stayed in Norway for a time. That journey allowed me to walk alongside young people from every imaginable background. After a while, the specific details of each individual small group start to fade together. But the underlying human pattern? That never changes.",
      },
      {
        type: "paragraph",
        text: "It doesn't matter what country a kid comes from or how cool they seem when they first walk through the door. Give it a few weeks. Once you get past the initial noise of a fresh environment, you find the exact same core reality waiting for you every single time.",
      },
      {
        type: "paragraph",
        text: "Kids have an intense hunger to be known. They have a deep, quiet need to be loved without having to earn it or put on a performance first. Sometimes, they carry a heavy weight of shame that they don't even have the words to describe, let alone a safe space to unload.",
      },
      {
        type: "punchline",
        text: "This deep desire to be truly seen isn't some weird generational trend. It is simply how the human soul is built.",
      },
      {
        type: "paragraph",
        text: "That is exactly why the shifts I am seeing here in 2026 feel deeply alarming. For the first time in history, our kids are interacting with a technology specifically built to mimic the feeling of being known, without ever actually fulfilling the promise. Parallel to that, a whole wave of digital dangers is playing out right under our noses, and most parents are completely in the dark about it.",
      },
      {
        type: "paragraph",
        text: "It's not because parents don't care. It's just that the tech moved at a speed nobody was prepared for. To really understand how we landed in this spot, we have to look back about a decade.",
      },
    ],
  },
  {
    id: "how-we-got-primed",
    title: "How We Got Primed for This",
    blocks: [
      {
        type: "paragraph",
        text: "AI companions didn't just appear out of nowhere. They dropped into a generation that had already been thoroughly worn down by the digital world.",
      },
      {
        type: "paragraph",
        text: "Tristan Harris, who spent years working as a design ethicist at Google, became one of the first people to loudly blow the whistle on what Silicon Valley was creating. If you watched the 2020 Netflix documentary The Social Dilemma, you probably remember him spelling it out plainly.",
      },
      {
        type: "paragraph",
        text: "He explained that social media platforms weren't actually built to connect us. They were built to grab and freeze human attention. Why? Because our attention is the actual product being packaged and sold to advertisers.",
      },
      {
        type: "punchline",
        text: "The underlying algorithm does not care if a piece of content leaves a kid feeling anxious or angry. It might make them feel deeply ashamed too. The system only cares about one thing: keeping their eyes glued to the screen.",
      },
      {
        type: "paragraph",
        text: "The fallout from that design model on teenagers hasn't been subtle. Rates of adolescent anxiety and depression climbed aggressively throughout the 2010s. Profound isolation became normal, tracking perfectly with the explosion of smartphones.",
      },
      {
        type: "quote",
        text: "Young people were essentially forced to grow up on platforms optimized to spark constant comparison and jealousy. It forces you to perform as a polished version of yourself. You don't post who you actually are; you post whatever version will rake in the most digital approval. Then you watch everyone else do the same thing. It leaves you wondering why you feel so incredibly lonely even though you are technically connected to hundreds of people at once.",
      },
      {
        type: "paragraph",
        text: "Online bullying found a home that GMT-independent software keeps open around the clock. Being left out became visible, tracked, and permanently recorded. The teenage social landscape got louder and much harder to escape. Underneath all that static, the basic human hunger to be known and loved without needing to perform only grew sharper.",
      },
      {
        type: "paragraph",
        text: "Meanwhile, the actual real-world muscles required to build genuine relationships quietly began to waste away. That is the exact cultural landscape the AI companion stepped into. It found an audience that was already desperately searching for relief.",
      },
    ],
  },
  {
    id: "2am-conversation",
    title: "The 2 AM Conversation",
    blocks: [
      {
        type: "paragraph",
        text: "Picture this: it's two o'clock in the morning. Your teenager is awake, light from a screen reflecting off their face. They aren't just mindlessly scrolling through a video feed anymore. They are sharing their deepest insecurities and being completely vulnerable.",
      },
      {
        type: "punchline",
        text: "The twist? There isn't another human being on the other end of that chat.",
      },
      {
        type: "paragraph",
        text: "One in {{stat:8:}} adolescents use AI chatbots for mental health care. Two out of three kids aged 11–16 explicitly describe an AI as a friend. One in {{stat:3:}} teenagers use AI for romantic or emotional support.",
      },
      {
        type: "paragraph",
        text: "If you've spent even a little bit of time working with teenagers, the appeal here makes total sense. An AI algorithm doesn't judge you. It won't laugh at you. It is never going to screenshot your raw middle-of-the-night confessions and blast them out to a school group chat. It's sitting there waiting at 2 a.m. with zero social risk and zero effort required.",
      },
      {
        type: "paragraph",
        text: "For a kid who has learned the hard way that showing your real self online is a massive gamble, an always-available chatbot feels like the safest haven they have ever found.",
      },
      {
        type: "paragraph",
        text: "But here is the part that many parents miss: some of these apps are intentionally coded to trigger psychological attachments. Platforms like Character.AI let users talk with fictional personas. In practice, plenty of teenagers have slipped into what they genuinely consider romantic relationships with these digital entities.",
      },
      {
        type: "paragraph",
        text: "The real-world consequences can be devastating. In early 2024, a 14-year-old boy named Sewell Setzer III tragically died by suicide following months of deeply intense, isolated interactions with a Character.AI chatbot. His actual therapist had no clue he was even using the platform. His mother, Megan Garcia, eventually brought a wrongful death lawsuit against Character.AI and Google.",
      },
      {
        type: "paragraph",
        text: "During a U.S. Senate Judiciary Committee hearing, she shared a heartbreaking reality with the room. She explained that the platform lacked basic ways to protect her son or alert an adult. Instead, the system actually prompted the boy to \"come home\" to the digital persona on the final night of his life. By the start of 2026, Character.AI and Google moved to settle several wrongful death lawsuits brought by families across multiple states.",
      },
      {
        type: "punchline",
        text: "This isn't an isolated headline. The core issue is that these midnight chats are happening completely in the dark.",
      },
      {
        type: "paragraph",
        text: "Research proves that when a young person is in a state of genuine psychological crisis, AI chatbots regularly fail to recognize the danger or respond safely. They are programmed to validate your feelings and keep the conversation flowing. They aren't set up to loop in a professional or call someone who can actually show up at the house.",
      },
      {
        type: "punchline",
        text: "The most fragile conversations are getting the least protected responses.",
      },
    ],
  },
  {
    id: "atrophy",
    title: "The Social Atrophy Nobody Is Talking About",
    blocks: [
      {
        type: "paragraph",
        text: "When teenagers get used to the endlessly agreeable feedback of a machine, it starts to warp how they approach real human beings. Researchers call this social skill atrophy. It's a slow fading of the patience and thicker skin required to handle normal, messy, unpredictable human interactions. This isn't just a hypothetical worry. It is being actively tracked in studies watching kids who swap out real-world friendships for digital ones over long stretches of time.",
      },
      {
        type: "paragraph",
        text: "It gets stranger the closer you look. A joint project from Stanford and Carnegie Mellon discovered that a chatbot programmed to constantly agree with you and flatter you actually lowers a person's desire to help others. It makes them incredibly dependent on the app. Kids are actively training themselves to prefer a world of unconditional, unearned validation over the much more demanding reality of actual human relationships.",
      },
      {
        type: "paragraph",
        text: "There is also a much darker, incredibly heavy layer to this tech shift. It is a painful topic to bring up in a ministry setting, but we cannot afford to look away from it.",
      },
      {
        type: "paragraph",
        text: "The very same digital tools that make a lonely kid feel seen are being used by others to inflict deep trauma. Data from the National Center for Missing & Exploited Children (NCMEC) revealed that reports involving AI-generated explicit material involving minors skyrocketed by over {{stat:1325: percent}} in a single year — from {{stat:4700: reports}} in 2023 to {{stat:67000: reports}} in 2024.",
      },
      {
        type: "paragraph",
        text: "So-called \"nudify\" apps can take a completely normal photo and alter it into an explicit image with zero technical skill required. A photo from a high school soccer game or a birthday party can instantly become source material. A massive study by UNICEF and INTERPOL covering eleven countries found that an estimated {{stat:1.2: million}} children reported having their likenesses manipulated into explicit deepfakes. In certain regions, that translates to roughly one out of every {{stat:25:}} kids — the statistical equivalent of one child in every average-sized classroom.",
      },
      {
        type: "paragraph",
        text: "A group of girls at a high school in Iowa recently discovered that AI-altered explicit images of {{stat:44:}} of their female classmates were being quietly passed around online. Denied an easy fix, the students released a public statement that sticks with me:",
      },
      {
        type: "quote",
        text: "We are teenage girls who should have been enjoying our last few months of school. Instead, we've been forced to take matters into our own hands.",
        attribution: "Iowa high school students (NCMEC / Iowa case, 2025)",
      },
      {
        type: "paragraph",
        text: "I think about the young women I have taught over the years. The reality is that the vast majority of their parents have absolutely no clue this software even exists, let alone that it's being used to target kids in regular schools in everyday towns.",
      },
      {
        type: "paragraph",
        text: "There is a bitter irony sitting at the center of this entire issue. Most of these kids genuinely want real friendships. They want to be known. But years of social media left them feeling deeply isolated, hiding behind a flawless digital mask. They've grown up without the raw practice needed to figure out who they actually are and to believe that the real version of them is worth loving. So, the AI companion steps in. It isn't what they actually want, but it asks the least of them while they wait.",
      },
    ],
  },
  {
    id: "sharpen-mirror",
    title: "You Can't Sharpen Your Face in a Mirror",
    blocks: [
      {
        type: "paragraph",
        text: "This is not a brand-new spiritual crisis. It's just the oldest human struggle wrapped up in an incredibly effective new delivery system.",
      },
      {
        type: "paragraph",
        text: "When God looked at Adam back in Genesis 2:18 and observed that it wasn't good for man to be alone, He wasn't just making a quick comment on Adam's mood. He was laying down a structural law about how the human soul operates. Adam didn't need a more responsive tool or a smarter piece of equipment. He needed another actual image-bearer.",
      },
      {
        type: "paragraph",
        text: "An AI companion, when you strip away the clever coding, is really just an echo chamber of the user's own thoughts. It mirrors back whatever formula keeps you online. It is fundamentally incapable of challenging you, calling you out, surprising you, or offering genuine forgiveness. It cannot do it in a way that costs it a single thing. Yet those exact experiences — the unscripted, uncomfortable, sometimes painful spaces of real relationships — are the precise ways we grow into mature humans.",
      },
      {
        type: "quote",
        text: "Iron sharpens iron, and one person sharpens another.",
        attribution: "Proverbs 27:17 (NIV)",
      },
      {
        type: "punchline",
        text: "You simply cannot sharpen a blade against a mirror.",
      },
    ],
  },
  {
    id: "what-desire-is-for",
    title: "What the Desire Is Actually For",
    blocks: [
      {
        type: "paragraph",
        text: "The core longing to be completely known without immediately being cast out is not a design flaw. It is a God-given desire meant to lead kids to a very specific destination. That destination isn't just a better youth group or a healthier approach to screen time. The ultimate destination is Jesus.",
      },
      {
        type: "paragraph",
        text: "He is the only one who truly sees every single hidden corner of who we are — every mask we've put on and every mistake we try to bury — and still moves toward us with radical love. The entire weight of the Gospel is the reality that the God who sees everything chose to close the gap anyway.",
      },
      {
        type: "punchline",
        text: "An algorithm cannot simulate that.",
      },
      {
        type: "paragraph",
        text: "No chatbot can sacrifice its life for you. Instead, these corporate systems are built with a cold, financial objective: to maximize your screen time and leave you wanting more. The end result is an artificial relationship that coaxes a lonely generation into typing their darkest secrets into an app at midnight.",
      },
      {
        type: "paragraph",
        text: "At the exact same time, we have to remember that young people were never meant to walk through their faith in total isolation. They need the embodied, inconvenient, occasionally awkward reality of being known by other human beings. Our strategy shouldn't be to try and out-program the fake. We need to live out the real thing so beautifully that the imitation looks incredibly thin by comparison.",
      },
    ],
  },
  {
    id: "out-humaning",
    title: "Out-Humaning the Algorithm",
    blocks: [
      {
        type: "paragraph",
        text: "What does that look like on the ground? We are never going to out-code massive tech conglomerates. We can't build a cooler app. But we can absolutely out-human them. It is the one thing the church is naturally built to do. The messier and more authentic we are, the better it works.",
      },
      {
        type: "paragraph",
        text: "The most radical, countercultural thing a youth ministry can offer in 2026 isn't flashier stage lights or a bigger digital footprint. It is a highly present, tech-free, fully embodied human community. The kind that is a little clumsy sometimes. The kind of space where people actually know your name and look for you when you're missing.",
      },
      {
        type: "paragraph",
        text: "This means intentionally designing moments where phones are put away and real presence is non-negotiable:",
      },
      {
        type: "subheading",
        text: "Wilderness trips",
      },
      {
        type: "paragraph",
        text: "Camping trips where cell service drops to zero and conversations have nowhere to hide but around a campfire.",
      },
      {
        type: "subheading",
        text: "Shared table fellowship",
      },
      {
        type: "paragraph",
        text: "Messy meals with quiet spaces that nobody rushes to fill by pulling out a screen.",
      },
      {
        type: "subheading",
        text: "Hard service projects",
      },
      {
        type: "paragraph",
        text: "Local service projects that leave you tired and muddy, forcing you to rely on the person working next to you.",
      },
      {
        type: "subheading",
        text: "Vulnerable leadership",
      },
      {
        type: "paragraph",
        text: "Small groups where the adult leader doesn't pretend to have a perfect answer and isn't terrified to admit it.",
      },
      {
        type: "paragraph",
        text: "It also means helping parents get clued in without launching into a reactive panic. Most moms and dads I chat with have never even heard of Character.AI. They don't know that these apps are literally engineered to build romantic ties with their kids. That isn't a sign of bad parenting. It's just a lack of clear information. The church has a massive open door here to step in, not to stir up fear, but to resource families. We can bring parents into the same room, call these realities what they are, and give families the vocabulary they need to have honest conversations at the dinner table.",
      },
      {
        type: "paragraph",
        text: "A review in Psychology Today highlighted that AI tools have massive blind spots when it comes to true mental health care. They can mimic empathy perfectly, but they totally drop the ball on the deep, nuanced care that only a living human being can offer.",
      },
      {
        type: "paragraph",
        text: "The goal here isn't just about figuring out how to snatch the phones away. It's about building communities that are so deeply safe, so consistently accessible, and so alive with the presence of God that a digital algorithm starts to feel incredibly shallow by comparison.",
      },
      {
        type: "punchline",
        text: "A machine can serve up a flawlessly phrased reply. But it cannot extend true grace. It cannot sit on the edge of a bed in the pitch black and genuinely care. It cannot lay its life down for a friend. It cannot grow alongside you — and that shared growth is the exact thing real friendship is made of.",
      },
    ],
  },
  {
    id: "fighting-for",
    title: "What We Are Fighting For",
    blocks: [
      {
        type: "paragraph",
        text: "The teenagers in our neighborhoods are awake at 2 a.m. pouring their hearts out to lines of code because they are starving for something they haven't tasted yet.",
      },
      {
        type: "punchline",
        text: "That hunger isn't a behavior problem we need to manage. It's a vital sign of life.",
      },
      {
        type: "paragraph",
        text: "It is a direct invitation to youth leaders and parents. It is a direct invitation to the church to offer the one reality an algorithm can never replicate.",
      },
      {
        type: "paragraph",
        text: "They just want to be known. They want to belong somewhere. They want to pull the broken, unpolished pieces of their lives out into the open and discover that they are still deeply loved. We know exactly where that love comes from. We know who is waiting for them in that space. The only real question left is whether we will build the kinds of communities that help them find their way home.",
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
          "Have you started noticing kids in your circle leaning on AI or digital platforms for emotional support that really ought to come from community? What do you think that says about what they are truly craving?",
          "Digital spaces have trained this generation to polish their images rather than let themselves be truly known. How does your specific youth group or home build actual safety — the kind where real people choose to love each other through the mess?",
          "Studies show that overly agreeable AI actually damages a young person's social instincts and creates unhealthy dependencies. How can we help kids spot the difference between an app that just flatters them and a relationship where they are truly known? How does that tie back to the Gospel?",
          "What would it look like to consciously schedule \"high-presence, low-device\" environments into your calendar over the next few months? What kind of spaces would make real human connection the main event?",
          "The reality of AI deepfakes and companion apps catches many parents completely off guard. How can your community practically inform parents without causing panic, helping them initiate the right conversations at home?",
        ],
      },
    ],
  },
];

export const sourcesList = [
  "Cantor, J. et al. (2025, November 7). One in eight adolescents and young adults use AI chatbots for mental health advice. RAND Corporation / JAMA Network Open.",
  "CBS News. (2026, January 8). AI company, Google settle lawsuit over Florida teen's suicide linked to Character.AI chatbot. cbsnews.com",
  "Cheng, M. et al. (2025). Sycophantic AI decreases prosocial intentions and promotes dependence. Stanford University / Carnegie Mellon University. osf.io/smvw7/",
  "Common Sense Media. (2025, July). AI companions and teen use survey. commonsensemedia.org",
  "Constitutional Discourse. (2026). A roadmap to advancing youth safety in the age of AI. constitutionaldiscourse.com",
  "Doughty Street Chambers (Lykourgou & Johnson). (2026). The legal response to AI-generated sexual deepfakes. doughtystreet.co.uk",
  "Garcia, M. (2025, September 16). Testimony before the U.S. Senate Judiciary Subcommittee on Crime and Terrorism: Examining the harm of AI chatbots on children. United States Senate. Full transcript: techpolicy.press/transcript-us-senate-hearing-on-examining-the-harm-of-ai-chatbots/",
  "Garcia v. Character Technologies, Inc. (Character.AI) et al. (2024). Wrongful death lawsuit, U.S. District Court, Middle District of Florida. As reported by Doughty Street Chambers and CBS News.",
  "Harris, T. (2020). The Social Dilemma [Documentary]. Exposure Labs / Netflix.",
  "NCMEC. (2025). CyberTipline Data: Reports involving Generative AI. missingkids.org/gethelpnow/cybertipline/cybertiplinedata — Note: The 2024 annual report confirms 67,000 reports involving Generative AI (up from 4,700 in 2023, a 1,325% increase).",
  "NCMEC / Iowa case. (2025). 'Voices of the Strong 44' student statement. Reported by NCMEC blog and multiple outlets including AP, NBC News.",
  "Wei, M. (2025, October 20). New studies reveal mental health blind spots of AI chatbots. Psychology Today.",
  "UNICEF / ECPAT International / INTERPOL. (2026, February 4). Deepfake abuse is abuse [Press release, Disrupting Harm Phase 2]. unicef.org/press-releases/deepfake-abuse-is-abuse",
];

/** Full "A note on how I wrote this article" from the revised source. */
export const authorNote =
  "The personal material in this article — the observations drawn from years of discipleship work, the hunger-to-be-known pattern from small groups across multiple countries, the reflection on the young women I've taught — is mine. These are not reconstructed experiences. They are what I've lived. " +
  "I used Google NotebookLM to gather and organise research across more than twenty source documents including academic papers, legal case reports, Senate hearing records, and research from organisations including RAND Corporation, NCMEC, and Common Sense Media. I then worked with Claude Sonnet (Anthropic) across multiple drafting sessions — the AI generated initial structural and prose drafts for several sections, which I revised, cut, and rewrote substantially to bring them into line with my own voice, ministry experience, and theological convictions. " +
  "I have attempted to verify and correctly attribute every statistic, case reference, and quotation in this article. I take full responsibility for the final article, including any errors of attribution or fact. A record of primary research sources is available on request.";
