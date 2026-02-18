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
    id: "raising-humans-digital-god",
    title: "Raising Humans in the Age of the Digital God",
    excerpt: "What every Christian parent needs to know about AI: understanding the technology, protecting hearts, and discipling the next generation.",
    url: "/resources/raising-humans-in-the-age-of-the-digital-god",
    date: "2026-02-19",
    readTime: "18 min",
    category: "AI & Faith",
    image: "/images/raising-humans-header.png",
  },
  {
    id: "discipleship-missions-ai",
    title: "Discipleship and Missions in an AI Age",
    excerpt: "A strategic briefing for pastors, mission leaders, and Christian educators: the intelligence explosion, the broken ladder, the intimacy economy, and the Great Commission.",
    url: "/resources/discipleship-and-missions-in-an-ai-age",
    date: "2026-02-19",
    readTime: "16 min",
    category: "AI & Faith",
    image: "/images/discipleship-missions-ai-header.png",
  },
  {
    id: "placeholder-2",
    title: "Coming soon: Practical implementation",
    excerpt: "Practical guidance for churches and organizations.",
    url: "#",
    date: "2026-01-15",
    readTime: "4 min",
    category: "Practical Implementation",
  },
];
