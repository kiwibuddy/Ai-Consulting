import { allArticleMetas, articlePathFromMeta } from "../../client/src/content/article-index";
import { christianProfessionalWorksheets } from "../../client/src/content/christian-professional-worksheets";
import { deepDives } from "../../client/src/content/deep-dives";
import { EXPERTISE_PAGE_PATHS } from "../../client/src/content/expertise-pages";
import { SCHOOL_SUITE_SITEMAP_PATHS } from "../../client/src/content/school-suite";
import { worksheets } from "../../client/src/content/worksheets";

export interface SitemapEntry {
  path: string;
  lastmod: string;
  changefreq: "weekly" | "monthly";
  priority: number;
}

const TODAY = new Date().toISOString().slice(0, 10);

/** High-priority marketing and conversion pages. */
const CORE_STATIC: Array<{ path: string; priority: number; changefreq: "weekly" | "monthly"; lastmod?: string }> = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.9, changefreq: "monthly" },
  { path: "/products", priority: 0.9, changefreq: "monthly" },
  { path: "/speaking", priority: 0.9, changefreq: "monthly" },
  { path: "/speaking/invite", priority: 0.8, changefreq: "monthly" },
  { path: "/resources", priority: 0.8, changefreq: "monthly" },
  { path: "/pricing", priority: 0.8, changefreq: "monthly" },
  { path: "/intake", priority: 0.9, changefreq: "monthly" },
  { path: "/audit", priority: 0.9, changefreq: "monthly" },
  { path: "/privacy", priority: 0.3, changefreq: "monthly" },
  { path: "/terms", priority: 0.3, changefreq: "monthly" },
];

function entry(
  path: string,
  priority: number,
  changefreq: "weekly" | "monthly",
  lastmod: string = TODAY,
): SitemapEntry {
  return { path, priority, changefreq, lastmod };
}

/** All public URLs for sitemap.xml — single source of truth. */
export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();

  function add(e: SitemapEntry) {
    if (seen.has(e.path)) return;
    seen.add(e.path);
    entries.push(e);
  }

  for (const page of CORE_STATIC) {
    add(entry(page.path, page.priority, page.changefreq, page.lastmod ?? TODAY));
  }

  for (const path of EXPERTISE_PAGE_PATHS) {
    add(entry(path, 0.9, "monthly"));
  }

  for (const meta of allArticleMetas) {
    add(entry(articlePathFromMeta(meta), 0.8, "monthly", meta.modifiedDate));
  }

  for (const worksheet of worksheets) {
    if (worksheet.showInResources === false) continue;
    add(entry(worksheet.url, 0.7, "monthly", worksheet.date));
  }

  for (const worksheet of christianProfessionalWorksheets) {
    add(
      entry(
        `/resources/christian-professional/${worksheet.slug}`,
        0.7,
        "monthly",
        worksheet.date ?? TODAY,
      ),
    );
  }

  for (const dive of deepDives) {
    add(entry(dive.url, 0.7, "monthly", dive.date));
  }

  for (const path of SCHOOL_SUITE_SITEMAP_PATHS) {
    add(entry(path, 0.8, "monthly"));
  }

  return entries.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.path.localeCompare(b.path);
  });
}

/** Priority URLs for Google Search Console URL Inspection. */
export function getGscPriorityUrls(siteUrl = "https://www.nathanielbaldock.com"): string[] {
  const paths = [
    "/",
    "/about",
    "/audit",
    "/resources/something-has-changed-you-are-not-imagining-it",
    "/speaking",
    "/intake",
    ...EXPERTISE_PAGE_PATHS,
  ];
  return paths.map((p) => `${siteUrl}${p}`);
}
