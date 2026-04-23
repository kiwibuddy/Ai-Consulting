import type { ArticleItem } from "./articles";
import { articles } from "./articles";

function byDateDesc(a: ArticleItem, b: ArticleItem) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Newest public article by `date` (aligns with landing “latest” article slot for articles only).
 * Returns null if the list is empty.
 */
export function getNewestArticle(): ArticleItem | null {
  if (articles.length === 0) return null;
  return [...articles].sort(byDateDesc)[0] ?? null;
}
