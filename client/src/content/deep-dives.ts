export interface DeepDiveItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  date: string;
  category?: string;
}

export const deepDives: DeepDiveItem[] = [
  {
    id: "placeholder-deep-dive-1",
    title: "Coming soon: AI & the Future of the Church",
    description:
      "An AI-generated podcast exploring how artificial intelligence is reshaping ministry, discipleship, and church life — synthesised from key research and thought leaders.",
    url: "#",
    date: "2026-03-01",
    category: "AI & Faith",
    duration: "18 min",
  },
  {
    id: "placeholder-deep-dive-2",
    title: "Coming soon: Parenting in the Age of AI",
    description:
      "Two AI-generated voices unpack what the latest research says about kids, screens, and emerging tech — and what faithful parents can do about it.",
    url: "#",
    date: "2026-03-01",
    category: "Family & Tech",
    duration: "22 min",
  },
];
