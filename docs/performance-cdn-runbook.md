# CDN and caching (Railway + optional Cloudflare)

Use this when putting a CDN (for example Cloudflare) in front of the Railway origin so you keep fast assets without breaking Open Graph or SPA deploys.

## Origin behavior (this repo)

- **Gzip**: Express serves compressed responses when `Accept-Encoding: gzip` is present (`compression` middleware in `server/index.ts`).
- **Fingerprinted assets** (`/assets/*`): `Cache-Control: public, max-age=31536000, immutable` (see `server/static.ts`).
- **Other static files**: ~1 day `max-age` from Express.
- **HTML (SPA shell + per-path OG)**: `Cache-Control: no-cache` on the catch-all that runs `injectOgMeta` in `server/static.ts`. Each URL must receive HTML with the correct `og:title` / `og:description` for that path.

## CDN rules (recommended)

1. **Compression / Brotli**: Enable automatic compression at the edge. The origin gzip remains a useful fallback.
2. **Cache `/assets/*`**: Long TTL (align with `immutable` on the origin). Vite filenames are content-hashed, so a deploy changes URLs; stale HTML pointing at old hashed names is not a problem once clients get fresh HTML.
3. **Do not cache HTML as “one URL fits all”**: SPA responses differ by path because of OG injection. Either bypass caching for `text/html` document requests, or cache only with a cache key that includes the **full request URL** (path and query if you use it for content), never a single shared object for every page.
4. **Authenticated routes**: Same HTML shell as the rest of the app; avoid treating `Set-Cookie` responses as publicly cacheable at the edge.
5. **Verify after changes**: `curl -s` through the CDN for `/`, `/about`, and a deep `/resources/...` URL and confirm distinct `og:title` meta tags.

## Quick checks

```bash
# Compression
curl -sI -H 'Accept-Encoding: gzip' 'https://www.example.com/assets/<hashed-chunk>.js'

# OG per path (replace host)
curl -s 'https://www.example.com/about' | rg 'og:title'
curl -s 'https://www.example.com/resources/sabbath-rest-in-the-age-of-ai' | rg 'og:title'
```
