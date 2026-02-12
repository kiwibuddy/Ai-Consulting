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
