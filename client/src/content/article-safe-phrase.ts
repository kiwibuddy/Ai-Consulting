/**
 * Structured content for "The Voice on the Phone Is Your Son. It Isn't."
 */

export const articleMeta = {
  slug: "the-voice-on-the-phone-is-not-your-son",
  title: "The Voice on the Phone Is Your Son. It Isn't.",
  subtitle:
    "AI voice cloning needs three seconds of audio. The defence costs nothing, takes ten minutes, and works against every variant of the scam.",
  description:
    "AI voice-cloning scams explained: how the call works, why familiar voices are no longer proof, and the family safe phrase protocol that defeats impersonation in fifteen seconds.",
  author: "Nathaniel Baldock",
  authorUrl: "https://www.nathanielbaldock.com",
  publishedDate: "2026-06-03",
  modifiedDate: "2026-06-03",
  readTime: "3 min",
  category: "AI & Safety",
  image: "/images/safe-phrase-header.jpg",
  canonicalUrl: "https://www.nathanielbaldock.com/resources/the-voice-on-the-phone-is-not-your-son",
};

export type SummaryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

export const articleSummary: SummaryBlock[] = [
  { type: "heading", text: "The Challenge" },
  {
    type: "paragraph",
    text: "Your phone rings. It is your daughter's voice, crying, saying she has been in an accident and needs money now. Every instinct you have says move. That instinct is now the attack.",
  },
  { type: "heading", text: "What the Article Covers" },
  {
    type: "paragraph",
    text: "How AI voice-cloning scams actually work in 2026. Why victims are not foolish — a familiar voice has been proof for a hundred years. The three-step safe phrase protocol, and how to have the highest-leverage conversation with your parents.",
  },
  { type: "heading", text: "Practical Takeaways" },
  {
    type: "bullets",
    items: [
      "Choose four to seven unrelated words; share them in person only, never digitally.",
      "Any call asking for money must produce the phrase — if the caller dodges, hang up.",
      "Frame the parents' conversation as a backup, not a test of their judgement.",
      "Practice three times at the kitchen table, then run it once for real a week later.",
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
        text: "Your phone rings. It is your daughter's voice, crying, saying she has been in an accident and needs money now. Every instinct you have says move.",
      },
      {
        type: "punchline",
        text: "That instinct is now the attack.",
      },
      {
        type: "paragraph",
        text: "Here is the call, the way it actually happens. A number you do not recognise, but the voice is unmistakable. It is your son. He is panicking. There has been a crash, someone is hurt, the police are involved, he needs bail money transferred in the next ten minutes and please, please do not tell Dad. The whole thing lasts ninety seconds. By the end of it you have either sent the money or you have not.",
      },
      {
        type: "punchline",
        text: "None of it is real. Your son is at work, fine, with no idea any of this is happening.",
      },
      {
        type: "paragraph",
        text: 'The voice on the phone was built by an AI that needed three seconds of audio of him talking, lifted from a video on a public account. The crying, the urgency, the "don\'t tell Dad" — all of it is engineered to switch off the part of your brain that checks.',
      },
      {
        type: "quote",
        text: "Modern voice-cloning tools can produce a convincing copy of a specific person's voice from as little as three seconds of source audio. That audio is everywhere: a birthday video on a public Instagram account, a few words in a friend's TikTok, a voicemail greeting, a work presentation posted to a company channel. None of it was ever meant to be a security risk.",
      },
      {
        type: "paragraph",
        text: "This is not a rare event or a future worry. The losses are already large and growing fast, and they land hardest on older people, who lost billions to fraud last year. Police in New Zealand now see the kidnap-hoax version of this call every month.",
      },
      {
        type: "quote",
        text: "The FBI's Internet Crime Complaint Center reported roughly US$893 million in AI-related fraud losses in 2025. Adults aged 60 and over lost about US$7.7 billion to fraud across all categories in 2025, up roughly 60% on the year before. AARP's research suggests one in five Americans aged 65+ has been targeted by an AI voice-cloning scam, and one in ten has lost money to one. The average successful theft is around US$18,000.",
        attribution: "ic3.gov · aarp.org/money/scams-fraud",
      },
      {
        type: "paragraph",
        text: "The reason these calls work is not that the victims are foolish. It is that for your entire life, a familiar voice on the phone has been proof. You have never needed to question it. The scam runs straight through that hundred-year-old assumption, adds panic and urgency so you cannot stop to think, and it is done before your slower, wiser judgement ever arrives.",
      },
    ],
  },
  {
    id: "the-fix",
    title: "The fix costs nothing",
    blocks: [
      {
        type: "paragraph",
        text: "Here is the part that sounds too simple to matter. The defence against a technology this sophisticated is four to seven ordinary words.",
      },
      {
        type: "paragraph",
        text: "A family safe phrase is a short string of unrelated words that everyone in your household knows by heart. Tulip, anchor, wrench, blue. It is never written down, never texted, never saved on a device. It lives only in the heads of the people you trust. And the rule is simple: any call asking for money or urgent action has to be able to produce it.",
      },
      {
        type: "subheading",
        text: "Choose",
      },
      {
        type: "paragraph",
        text: "Pick four to seven unrelated words with no obvious link between them. Avoid anything a stranger could find or guess: pet names, children's names, schools, birthdays, anything that has appeared in your social media.",
      },
      {
        type: "subheading",
        text: "Share",
      },
      {
        type: "paragraph",
        text: "Tell every member of your household over the age of ten, in person, out loud. Never text it, never email it, never save it in a notes app or a password manager. Anything searchable can leak.",
      },
      {
        type: "subheading",
        text: "Use",
      },
      {
        type: "paragraph",
        text: "Any phone or video call that asks for money, your location, or an urgent action gets the question: what is the phrase? If the caller dodges it, becomes hostile, or redirects to urgency, hang up and call back on the number you already have saved.",
      },
      {
        type: "punchline",
        text: "A real family member, even a frightened one, can say the phrase. An AI clone cannot. It has no way to know it.",
      },
      {
        type: "paragraph",
        text: "The most advanced impersonation technology in the world is defeated by something a scammer simply does not have access to, and the call ends in fifteen seconds instead of costing you eighteen thousand dollars.",
      },
    ],
  },
  {
    id: "parents",
    title: "The conversation that matters most",
    blocks: [
      {
        type: "paragraph",
        text: "If you do only one thing after reading this, make it this: have the safe-phrase conversation with your parents.",
      },
      {
        type: "paragraph",
        text: "Older adults are the most targeted and the most likely to lose money, partly because they are at home, answer the phone, and were raised to be polite to a caller. The conversation is awkward. It can feel like you are telling them they are not sharp enough to spot a fake. So do not frame it that way. Frame it as a backup, a shared family word, something you are setting up for everyone, not a test of them. Most of the resistance melts when you do.",
      },
      {
        type: "paragraph",
        text: 'A line that works: "There\'s a phone scam now that\'s getting really good. Someone calls pretending to be me, using a voice that sounds exactly like mine. I want us to set up a simple word so you always know it\'s really me. It\'s a backup, that\'s all. It costs us five minutes."',
      },
      {
        type: "paragraph",
        text: 'If they push back with "I\'d know your voice" — do not argue the point. Agree with them. Say: "You probably would. This is for the one time someone catches you tired, or distracted, or half-asleep." Framing it as a backup rather than a test of their judgement dissolves most of the resistance.',
      },
      {
        type: "paragraph",
        text: "Then practice it three times at the kitchen table, and call them a week later to run it once for real.",
      },
      {
        type: "punchline",
        text: "It is, genuinely, the highest-value half hour you can spend on any of this.",
      },
      {
        type: "paragraph",
        text: "Ten minutes to choose the words. Ten minutes to teach them. Ten minutes, a week later, to practise once for real.",
      },
      {
        type: "paragraph",
        text: "The technology that makes these scams possible is not slowing down. But the defence does not need to keep pace with the technology. It just needs to be something the machine cannot reach. A few words, said out loud at a kitchen table, never written anywhere. That is the whole thing. Go and choose yours this weekend.",
      },
    ],
  },
  {
    id: "go-further",
    title: "Go further",
    blocks: [
      {
        type: "paragraph",
        text: "The full Safe Phrase Protocol is a print-and-keep worksheet with the four scam scripts to watch for, a build-your-own-phrase page, and the complete conversation guide for older relatives. Find it on the Resources page under Presentations.",
      },
    ],
  },
];

export const sourcesList = [
  "Federal Bureau of Investigation, Internet Crime Complaint Center (IC3). (2025). Internet Crime Report — approximately US$893 million in AI-related fraud losses reported in 2025; adults aged 60 and over lost approximately US$7.7 billion to fraud across all categories (up roughly 60% year-on-year). ic3.gov",
  "AARP. (2025). Fraud and scams research — approximately one in five Americans aged 65+ targeted by an AI voice-cloning scam; approximately one in ten reported losing money; average successful theft around US$18,000. aarp.org/money/scams-fraud",
  "Resemble AI. (2025). Q1 voice-scam report — 148% increase in AI-generated voice scams documented; financial damages from deepfake and voice-cloning incidents exceeded US$200 million in Q1 2025 alone. resemble.ai",
  "ACA International. (2026, February). AI voice cloning surges as scammers target emotional pressure points. acainternational.org",
  "Old National Bank (Reed, C.). (2026, March). AI scam alert: How fraudsters are mimicking family voices in 2026. oldnational.com",
  "Federal Trade Commission. (2024–2025). Voice Cloning Challenge — public initiative to develop detection and prevention tools for AI-generated voice fraud. ftc.gov",
];

/** A note on how I wrote this article */
export const authorNote =
  "I used Google NotebookLM to gather and organise research on AI voice-cloning fraud, including FBI IC3 reporting, AARP survey data, Resemble AI's voice-scam tracking, and ACA International's 2026 analysis. Claude Sonnet (Anthropic) helped draft the initial outline and prose; I edited the final version so it reflects my own views and how I actually advise families. I have attempted to verify and correctly attribute every statistic in this article. The positions here are mine — AI assisted the writing, it did not set them. I take full responsibility for the published article, including any errors of fact or attribution.";
