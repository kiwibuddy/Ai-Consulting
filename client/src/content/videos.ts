export interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  date: string;
  category?: string;
  source?: "youtube" | "vimeo" | "other";
}

export const videos: VideoItem[] = [
  {
    id: "talk-ai-and-global-discipleship",
    title: "AI and Global Discipleship",
    description:
      "An honest look at how AI is reshaping work, learning, and faith across the world — and what global Christian discipleship needs to look like in response.",
    url: "/worksheets/presentations/ai-and-global-discipleship.html",
    thumbnail: "/images/worksheets/presentations-global-discipleship.svg",
    date: "2026-04-22",
    category: "Presentations",
    source: "other",
  },
  {
    id: "talk-leveraging-ai-kingdom-impact",
    title: "Leveraging AI for Evangelism, Discipleship & Church Growth",
    description:
      "Practical ways churches and ministry leaders can use AI for evangelism, discipleship, and growth — without outsourcing the soul work that only people can do.",
    url: "/worksheets/presentations/leveraging-ai-for-kingdom-impact.html",
    thumbnail: "/images/worksheets/presentations-leveraging-ai.svg",
    date: "2026-03-19",
    category: "Presentations",
    source: "other",
  },
  {
    id: "placeholder-1",
    title: "Coming soon: Faith and AI",
    description: "Video content on faith, AI, and the church will be added here.",
    url: "#",
    date: "2026-02-01",
    category: "AI & Faith",
    source: "youtube",
  },
  {
    id: "placeholder-2",
    title: "Coming soon: Leadership and AI",
    description: "Leadership perspectives on navigating AI in ministry.",
    url: "#",
    date: "2026-01-15",
    category: "Leadership",
    source: "youtube",
  },
];
