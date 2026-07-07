/** Paths served as standalone HTML — need full document navigation, not wouter SPA routing. */
const FULL_PAGE_PATHS = new Set(["/audit", "/companion"]);

export function isFullPageNavigation(href: string): boolean {
  if (href.startsWith("http://") || href.startsWith("https://")) return true;
  if (href.endsWith(".html")) return true;
  const path = href.split("?")[0]?.split("#")[0] ?? href;
  return FULL_PAGE_PATHS.has(path);
}
