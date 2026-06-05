/**
 * Post-build script: generates per-route index.html files with correct OG tags and JSON-LD.
 *
 * Vercel serves a static build so there is no server-side processing.  Social
 * crawlers fetch raw HTML without running JS — this script pre-renders meta and
 * structured data for every sitemap URL.
 *
 * Run: npx tsx scripts/prerender-og.ts  (called automatically by build:client)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSitemapEntries } from "../shared/content/sitemap-sources";
import {
  DEFAULT_IMAGE,
  getJsonLdForPath,
  lookupPublicPageMeta,
  SITE,
} from "../shared/content/public-page-meta";
import { worksheets } from "../client/src/content/worksheets";
import { christianProfessionalWorksheets } from "../client/src/content/christian-professional-worksheets";
import { deepDives } from "../client/src/content/deep-dives";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist", "public");

interface PageMeta {
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
}

function worksheetMeta(routePath: string): PageMeta | null {
  const worksheet = worksheets.find((w) => w.url === routePath);
  if (worksheet) {
    return {
      title: `${worksheet.title} — Worksheet`,
      description: worksheet.description,
      image: worksheet.shareImage ? `${SITE}${worksheet.shareImage}` : DEFAULT_IMAGE,
      ogType: "article",
    };
  }

  const cp = christianProfessionalWorksheets.find(
    (w) => `/resources/christian-professional/${w.slug}` === routePath,
  );
  if (cp) {
    return {
      title: `${cp.title} — Worksheet`,
      description: cp.shareDescription,
      image: cp.shareImage ? `${SITE}${cp.shareImage}` : DEFAULT_IMAGE,
      ogType: "article",
    };
  }

  const dive = deepDives.find((d) => d.url === routePath);
  if (dive) {
    return {
      title: `${dive.title} — Deep Dive`,
      description: dive.description,
      image: dive.shareImage ? `${SITE}${dive.shareImage}` : DEFAULT_IMAGE,
      ogType: "article",
    };
  }

  return null;
}

function resolveMeta(routePath: string): PageMeta | null {
  return lookupPublicPageMeta(routePath) ?? worksheetMeta(routePath);
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectMeta(html: string, routePath: string, meta: PageMeta): string {
  const canonicalUrl = `${SITE}${routePath}`;
  const t = esc(meta.title);
  const d = esc(meta.description);
  const img = esc(meta.image);
  const url = esc(canonicalUrl);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  out = out.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`);
  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`);
  out = out.replace(/(<meta\s+property="og:type"\s+content=")[^"]*(")/, `$1${meta.ogType}$2`);
  out = out.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`);
  out = out.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${t}$2`);
  out = out.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`);
  out = out.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${img}$2`);
  out = out.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${t}$2`);
  out = out.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`);
  out = out.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `$1${img}$2`);

  const schemas = getJsonLdForPath(routePath);
  if (schemas.length > 0 && out.includes("</head>")) {
    const scripts = schemas
      .map(
        (schema) =>
          `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
      )
      .join("\n    ");
    out = out.replace("</head>", `    ${scripts}\n  </head>`);
  }

  return out;
}

const indexHtmlPath = path.join(DIST, "index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error("✗ dist/public/index.html not found — run vite build first");
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
let count = 0;

for (const entry of getSitemapEntries()) {
  const meta = resolveMeta(entry.path);
  if (!meta) continue;

  const parentDir = path.join(DIST, path.dirname(entry.path));
  fs.mkdirSync(parentDir, { recursive: true });

  const outPath = path.join(DIST, `${entry.path}.html`);
  fs.writeFileSync(outPath, injectMeta(indexHtml, entry.path, meta), "utf-8");
  count++;
}

console.log(`✓ Pre-rendered OG meta + JSON-LD for ${count} routes`);
