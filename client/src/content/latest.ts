export type LatestItemType = "article" | "video";

export interface LatestItem {
  type: LatestItemType;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  thumbnail?: string;
  duration?: string;
  readTime?: string;
}

/**
 * Most recent 1–2 items for "Latest from Nathaniel" on the landing page.
 * Update when you publish new content; keep sorted by date descending.
 */
export const latestFromNathaniel: LatestItem[] = [
  {
    type: "article",
    title: "Coming soon: Latest article",
    excerpt: "Your most recent article or essay will appear here. Update this entry when you publish.",
    url: "/resources",
    date: "2026-02-01",
    readTime: "5 min",
  },
  {
    type: "video",
    title: "Coming soon: Latest video",
    excerpt: "Your most recent video or talk will appear here. Update this entry when you publish.",
    url: "/resources",
    date: "2026-01-15",
    duration: "12 min",
  },
];
