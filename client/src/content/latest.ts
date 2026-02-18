import { articles } from "@/content/articles";
import { videos } from "@/content/videos";

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
 * Derived from articles and videos content. Most recent article and most recent
 * video are shown on the landing page "Latest from Nathaniel" section.
 * Add new entries to articles.ts or videos.ts and they will appear here automatically.
 * Placeholders (url "#") are excluded so only published content is shown.
 */
export const latestFromNathaniel: LatestItem[] = [
  ...articles
    .filter((a) => isRealContent(a.url))
    .slice()
    .sort(byDateDesc)
    .slice(0, 1)
    .map((a) => ({
      type: "article" as const,
      title: a.title,
      excerpt: a.excerpt,
      url: a.url,
      date: a.date,
      thumbnail: a.image,
      readTime: a.readTime,
    })),
  ...videos
    .filter((v) => isRealContent(v.url))
    .slice()
    .sort(byDateDesc)
    .slice(0, 1)
    .map((v) => ({
      type: "video" as const,
      title: v.title,
      excerpt: v.description,
      url: v.url,
      date: v.date,
      thumbnail: v.thumbnail,
      duration: v.duration,
    })),
].sort((a, b) => byDateDesc(a, b)); // So the newest of the two is first
