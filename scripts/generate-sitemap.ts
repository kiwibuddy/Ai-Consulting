/**
 * Generates client/public/sitemap.xml from shared content sources.
 * Run automatically before vite build — do not edit sitemap.xml by hand.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSitemapEntries } from "../shared/content/sitemap-sources";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://www.nathanielbaldock.com";
const OUT_PATH = path.resolve(__dirname, "../client/public/sitemap.xml");

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(): string {
  const entries = getSitemapEntries();
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${e.path}`)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const xml = buildSitemapXml();
fs.writeFileSync(OUT_PATH, xml, "utf-8");
console.log(`✓ Generated sitemap with ${getSitemapEntries().length} URLs → ${OUT_PATH}`);
