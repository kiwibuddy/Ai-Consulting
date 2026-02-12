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
    id: "placeholder-1",
    title: "Coming soon: First article",
    excerpt: "Articles on AI, faith, discipleship, and practical wisdom will appear here.",
    url: "#",
    date: "2026-02-01",
    readTime: "5 min",
    category: "AI & Theology",
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
