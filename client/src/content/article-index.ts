/**
 * All article metadata for sitemap generation and SEO tooling.
 * Import articleMeta from each article file so lastmod stays in sync with content.
 */
import { articleMeta as aiWorry } from "./article-ai-worry";
import { articleMeta as discipleshipMissions } from "./article-discipleship-missions-ai";
import { articleMeta as gardenTree } from "./article-garden-tree-knowledge";
import { articleMeta as groundHasShifted } from "./article-ground-has-shifted";
import { articleMeta as outsourcingHolySpirit } from "./article-outsourcing-holy-spirit";
import { articleMeta as questionNobodyAsking } from "./article-question-nobody-asking";
import { articleMeta as raisingHumans } from "./article-raising-humans";
import { articleMeta as safePhrase } from "./article-safe-phrase";
import { articleMeta as sabbathRest } from "./article-sabbath-rest-ai";
import { articleMeta as soulNeedsStruggle } from "./article-soul-needs-struggle";
import { articleMeta as teensAlgorithm } from "./article-teens-algorithm-friend";
import { articleMeta as workAiCannotTake } from "./article-work-ai-cannot-take";
import { articleMeta as worldOfFakes } from "./article-world-of-fakes";

export interface ArticleMetaEntry {
  slug: string;
  canonicalUrl: string;
  modifiedDate: string;
  publishedDate: string;
}

function toEntry(meta: {
  slug: string;
  canonicalUrl: string;
  modifiedDate: string;
  publishedDate: string;
}): ArticleMetaEntry {
  return {
    slug: meta.slug,
    canonicalUrl: meta.canonicalUrl,
    modifiedDate: meta.modifiedDate,
    publishedDate: meta.publishedDate,
  };
}

export const allArticleMetas: ArticleMetaEntry[] = [
  toEntry(aiWorry),
  toEntry(discipleshipMissions),
  toEntry(gardenTree),
  toEntry(groundHasShifted),
  toEntry(outsourcingHolySpirit),
  toEntry(questionNobodyAsking),
  toEntry(raisingHumans),
  toEntry(safePhrase),
  toEntry(sabbathRest),
  toEntry(soulNeedsStruggle),
  toEntry(teensAlgorithm),
  toEntry(workAiCannotTake),
  toEntry(worldOfFakes),
];

/** Path portion after SITE_URL, e.g. /resources/foo */
export function articlePathFromMeta(meta: ArticleMetaEntry): string {
  try {
    return new URL(meta.canonicalUrl).pathname;
  } catch {
    return `/resources/${meta.slug}`;
  }
}
