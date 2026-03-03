# OG Image and Favicon

## Current setup

- **OG image:** `client/public/hero.jpg` — referenced in `client/index.html` as `og:image` and `twitter:image` (full URL: `https://www.nathanielbaldock.com/hero.jpg`).
- **Favicon:** `client/public/favicon.png` — referenced in `client/index.html` as `rel="icon"`.

## Recommendations

1. **OG image:** For best display on social (Facebook, Twitter, LinkedIn), the image should be **1200×630 px**. If `hero.jpg` is a different size, resize or crop it to 1200×630, or create a dedicated OG image (e.g. with your name and tagline) and update the `og:image` and `twitter:image` meta tags in `client/index.html`.
2. **Favicon:** Common sizes are 32×32 or 48×48. Ensure `favicon.png` is clear at small sizes.

No code changes are required if the existing files meet the above; only replace or resize the assets as needed.
