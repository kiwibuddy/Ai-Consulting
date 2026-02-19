import { articles } from "@/content/articles";

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

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Only include items that have a real URL (not placeholders). */
function isRealContent(url: string) {
  return url && url !== "#" && !url.startsWith("#");
}

/**
 * Derived from articles (and optionally videos). The 3 most recent articles are
 * shown on the landing page "Latest from Nathaniel" section, with a "See more"
 * link to the Resources page. Placeholders (url "#") are excluded.
 */
export const latestFromNathaniel: LatestItem[] = articles
  .filter((a) => isRealContent(a.url))
  .slice()
  .sort(byDateDesc)
  .slice(0, 3)
  .map((a) => ({
    type: "article" as const,
    title: a.title,
    excerpt: a.excerpt,
    url: a.url,
    date: a.date,
    thumbnail: a.image,
    readTime: a.readTime,
  }));
