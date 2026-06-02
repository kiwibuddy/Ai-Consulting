export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  image?: string;
  readTime?: string;
  date: string;
  category?: string;
}

export const articles: ArticleItem[] = [
  {
    id: "safe-phrase",
    title: "The Voice on the Phone Is Your Son. It Isn't.",
    excerpt:
      "AI voice cloning needs three seconds of audio. The defence costs nothing, takes ten minutes, and defeats the scam in fifteen seconds.",
    url: "/resources/the-voice-on-the-phone-is-not-your-son",
    date: "2026-06-03",
    readTime: "3 min",
    category: "AI & Safety",
    image: "/images/safe-phrase-header.jpg",
  },
  {
    id: "ai-worry",
    title: "The Calm Middle: How Worried Should You Actually Be About AI?",
    excerpt:
      "Between dismissal and doom lies a third option — and specific, cheap actions that help no matter which forecast turns out right.",
    url: "/resources/how-worried-should-you-be-about-ai",
    date: "2026-05-01",
    readTime: "5 min",
    category: "AI & Safety",
    image: "/images/ai-worry-header.jpg",
  },
  {
    id: "garden-tree-knowledge",
    title: "The Garden and the Tree of Knowledge in Your Pocket",
    excerpt:
      "AI is genuinely brilliant — and quietly offering itself as the source for things meant to come from a relationship. Genesis 3, the attachment economy, and protecting the walk with God.",
    url: "/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket",
    date: "2026-05-22",
    readTime: "20 min",
    category: "AI & Faith",
    image: "/images/garden-tree-knowledge-header.png",
  },
  {
    id: "teens-algorithm-friend",
    title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
    excerpt:
      "One in eight teenagers is turning to AI for mental health advice. Two out of three call a chatbot their friend. The classic 2 a.m. conversation has fundamentally shifted — and so must we.",
    url: "/resources/when-your-teens-best-friend-is-an-algorithm",
    date: "2026-05-21",
    readTime: "18 min",
    category: "AI & Faith",
    image: "/images/teens-algorithm-header.png",
  },
  {
    id: "sabbath-rest-ai",
    title: "Reclaiming the Sabbath in an Always-On World",
    excerpt:
      "Why the non-stop lifestyle is a deeper issue than we think, and how to find rest in the age of automation.",
    url: "/resources/sabbath-rest-in-the-age-of-ai",
    date: "2026-05-21",
    readTime: "12 min",
    category: "AI & Faith",
    image: "/images/sabbath-rest-header.png",
  },
  {
    id: "soul-needs-struggle",
    title: "The Danger of an Effortless Faith: Why the Soul Needs the Struggle",
    excerpt:
      "This technology wasn't just removing the natural resistance from my work. It was offering me a chance to be like God.",
    url: "/resources/why-your-soul-needs-the-struggle",
    date: "2026-05-21",
    readTime: "16 min",
    category: "AI & Faith",
    image: "/images/beach-coal-fire.jpg",
  },
];
