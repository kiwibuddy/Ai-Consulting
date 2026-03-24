import { articles } from "@/content/articles";
import { worksheets } from "@/content/worksheets";
import { videos } from "@/content/videos";

export type LatestItemType = "article" | "video" | "worksheet";

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
 * Landing "Latest from Nathaniel":
 * - Slot 1: most recent article (by date).
 * - Slots 2–3: next newest items from articles, worksheets, and videos combined,
 *   excluding the featured article so it never repeats. Placeholders (url "#") excluded.
 */
function articleToLatest(a: (typeof articles)[number]): LatestItem {
  return {
    type: "article",
    title: a.title,
    excerpt: a.excerpt,
    url: a.url,
    date: a.date,
    thumbnail: a.image,
    readTime: a.readTime,
  };
}

function worksheetToLatest(w: (typeof worksheets)[number]): LatestItem {
  return {
    type: "worksheet",
    title: w.title,
    excerpt: w.description,
    url: w.url,
    date: w.date,
    thumbnail: w.thumbnail,
  };
}

function videoToLatest(v: (typeof videos)[number]): LatestItem {
  return {
    type: "video",
    title: v.title,
    excerpt: v.description,
    url: v.url,
    date: v.date,
    thumbnail: v.thumbnail,
    duration: v.duration,
  };
}

const realArticles = articles.filter((a) => isRealContent(a.url)).slice().sort(byDateDesc);
const featuredArticle = realArticles[0];

const secondaryPool: LatestItem[] = [
  ...realArticles.map(articleToLatest),
  ...worksheets.filter((w) => isRealContent(w.url)).map(worksheetToLatest),
  ...videos.filter((v) => isRealContent(v.url)).map(videoToLatest),
]
  .slice()
  .sort(byDateDesc);

const secondary = featuredArticle
  ? secondaryPool.filter((item) => item.url !== featuredArticle.url).slice(0, 2)
  : secondaryPool.slice(0, 3);

export const latestFromNathaniel: LatestItem[] = featuredArticle
  ? [articleToLatest(featuredArticle), ...secondary]
  : secondary;
