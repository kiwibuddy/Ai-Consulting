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
