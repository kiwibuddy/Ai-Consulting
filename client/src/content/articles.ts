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
    title: "Reclaiming the Sabbath in an Always-On World",
    excerpt:
      "AI hasn't just made us faster. It has trained us to live at a pace our souls cannot sustain. This article explores AI fatigue, a theology of human limits, and why practicing Sabbath is a radical act of trust in an always-on world.",
    url: "/resources/sabbath-rest-in-the-age-of-ai",
    date: "2026-02-25",
    readTime: "12 min",
    category: "AI & Faith",
    image: "/images/sabbath-rest-header.png",
  },
  {
    id: "soul-needs-struggle",
    title: "The Danger of Frictionless Faith: Why the Soul Needs the Struggle",
    excerpt:
      "AI promises to smooth out every rough edge of life, but the friction it removes is the very space where God forms us. This article looks at hurry, effort, and why becoming \"post-human\" is a spiritual dead end.",
    url: "/resources/why-your-soul-needs-the-struggle",
    date: "2026-02-25",
    readTime: "14 min",
    category: "AI & Faith",
    image: "/images/beach-coal-fire.jpg",
  },
];
