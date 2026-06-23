/**
 * Server-side Open Graph meta tag injection.
 *
 * Social-media crawlers (Facebook, LinkedIn, Twitter/X) fetch the raw HTML and
 * do NOT execute JavaScript.  Because this is an SPA, every route serves the
 * same index.html whose <meta> tags are the homepage defaults.  This module
 * replaces those defaults with the correct per-page values before the HTML is
 * sent, so link previews show the right title, description, and image.
 *
 * Also injects JSON-LD for key routes so crawlers that skip JS still see Person schema.
 */

import { getJsonLdForPath, lookupPublicPageMeta, SITE } from "../shared/content/public-page-meta";

interface PageMeta {
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
}

/** Unlisted pages: have rich link previews but must stay out of search results. */
const NOINDEX_PATHS = new Set<string>(["/ai-leadership-collective", "/thank-you"]);

function lookupMeta(urlPath: string): PageMeta | null {
  return lookupPublicPageMeta(urlPath);
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectJsonLd(html: string, urlPath: string): string {
  const schemas = getJsonLdForPath(urlPath);
  if (schemas.length === 0) return html;

  const scripts = schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");

  if (html.includes("</head>")) {
    return html.replace("</head>", `    ${scripts}\n  </head>`);
  }
  return html;
}

/**
 * Replace the default OG / Twitter / title / description / canonical meta tags
 * in the given HTML string with the values for `urlPath`.  Returns the original
 * HTML unchanged if no mapping exists for the path.
 */
export function injectOgMeta(html: string, urlPath: string): string {
  const meta = lookupMeta(urlPath);
  let out = html;

  if (meta) {
    const canonicalUrl = `${SITE}${urlPath.split("?")[0].replace(/\/+$/, "") || "/"}`;
    const t = esc(meta.title);
    const d = esc(meta.description);
    const img = esc(meta.image);
    const url = esc(canonicalUrl);

    out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
    out = out.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${d}$2`,
    );
    out = out.replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`,
    );
    out = out.replace(
      /(<meta\s+property="og:type"\s+content=")[^"]*(")/,
      `$1${meta.ogType}$2`,
    );
    out = out.replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`,
    );
    out = out.replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${t}$2`,
    );
    out = out.replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${d}$2`,
    );
    out = out.replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${img}$2`,
    );
    out = out.replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${t}$2`,
    );
    out = out.replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${d}$2`,
    );
    out = out.replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${img}$2`,
    );
  }

  const clean = urlPath.split("?")[0].replace(/\/+$/, "") || "/";
  if (NOINDEX_PATHS.has(clean) && !/<meta\s+name="robots"/.test(out) && out.includes("</head>")) {
    out = out.replace("</head>", `    <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  }

  return injectJsonLd(out, urlPath);
}
