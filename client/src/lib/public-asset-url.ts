/**
 * Use for <img src> of files under /public when the SPA might be opened from a
 * non-canonical hostname (apex vs www) or an embedded WebView — absolute URLs
 * avoid broken thumbnails from odd relative resolution.
 *
 * Override with `VITE_PUBLIC_SITE_URL` (no trailing slash) for staging previews.
 */
export function resolvePublicAssetUrl(path: string): string {
  if (!path.startsWith("/")) return path;

  const fromEnv =
    typeof import.meta.env.VITE_PUBLIC_SITE_URL === "string"
      ? import.meta.env.VITE_PUBLIC_SITE_URL.replace(/\/$/, "").trim()
      : "";

  if (fromEnv.length > 0) return `${fromEnv}${path}`;
  if (import.meta.env.PROD) return `https://www.nathanielbaldock.com${path}`;
  return path;
}
