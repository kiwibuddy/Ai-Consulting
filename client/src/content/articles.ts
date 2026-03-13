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
    id: "teens-algorithm-friend",
    title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
    excerpt: "One in eight teens use AI for mental health advice. Two in three call it a friend. The 2am conversation is changing — and so must we.",
    url: "/resources/when-your-teens-best-friend-is-an-algorithm",
    date: "2026-02-26",
    readTime: "16 min",
    category: "AI & Faith",
    image: "/images/teens-algorithm-header.png",
  },
  {
    id: "sabbath-rest-ai",
    title: "Sabbath Rest in the Age of AI: Why Christians Must Learn to Stop",
    excerpt: "Why the always-on life is a spiritual problem. AI fatigue, the difference between a day off and real rest, and a theology of human limits.",
    url: "/resources/sabbath-rest-in-the-age-of-ai",
    date: "2026-02-25",
    readTime: "12 min",
    category: "AI & Faith",
    image: "/images/sabbath-rest-header.png",
  },
  {
    id: "soul-needs-struggle",
    title: "Why Your Soul Needs the Struggle: The Spiritual Danger of an AI Life",
    excerpt: "AI wasn't just removing friction from my work. It was offering me the chance to be like God. Grace is not opposed to effort — how to fight for your humanness.",
    url: "/resources/why-your-soul-needs-the-struggle",
    date: "2026-02-25",
    readTime: "14 min",
    category: "AI & Faith",
    image: "/images/beach-coal-fire.jpg",
  },
];
