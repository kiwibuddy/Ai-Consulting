import { useEffect } from "react";

const SITE_NAME = "Nathaniel Baldock";
const SITE_URL = "https://www.nathanielbaldock.com";
const DEFAULT_IMAGE = `${SITE_URL}/Nathaniel_Portrait.png`;
const DEFAULT_TITLE = "Nathaniel Baldock — AI Consulting for Faith, Education & Impact";

export interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  /** Defaults to "website"; set to "article" for articles. */
  ogType?: "website" | "article";
  /** Article-specific fields for JSON-LD structured data. */
  article?: {
    author: string;
    authorUrl: string;
    publishedDate: string;
    modifiedDate: string;
  };
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets per-page document.title, meta description, Open Graph, Twitter Card,
 * canonical URL, and optional Article JSON-LD structured data.
 * Resets document.title on unmount so navigating away restores the default.
 */
export function PageSEO({ title, description, canonicalPath, image, ogType = "website", article }: PageSEOProps) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const fullImage = image
    ? image.startsWith("http") ? image : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", fullImage, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", fullImage);

    const linkCanonical =
      (document.querySelector('link[rel="canonical"]') as HTMLLinkElement) || document.createElement("link");
    linkCanonical.rel = "canonical";
    linkCanonical.href = canonicalUrl;
    if (!document.querySelector('link[rel="canonical"]')) document.head.appendChild(linkCanonical);

    if (article) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: { "@type": "Person", name: article.author, url: article.authorUrl },
        datePublished: article.publishedDate,
        dateModified: article.modifiedDate,
        image: fullImage,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      };
      let script = document.getElementById("page-jsonld") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "page-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      const existing = document.getElementById("page-jsonld");
      if (existing) existing.remove();
    }

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [fullTitle, description, canonicalUrl, fullImage, ogType, title, article]);

  return null;
}
