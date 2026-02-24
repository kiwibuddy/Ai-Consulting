# Google Search Console Setup

The site includes `robots.txt` and `sitemap.xml` in the client public folder so they are served at the root of the deployed site.

**Note:** Search Console shows *search* performance (how you appear in Google, which pages are indexed). For *page-view traffic* (visits, sessions), use [Google Analytics](https://analytics.google.com) and set `VITE_GA_MEASUREMENT_ID` in Vercel — see `.env.example` and the Analytics section in the repo.

## Steps to get indexed

1. **Add the property**
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Make sure you’re in the right place: the top-left dropdown shows the current property (e.g. `nathanielbaldock.com` or `kingdomvocations.com`). If your site isn’t listed, add it.
   - Click **Add property** and choose **URL prefix**.
   - Enter your live site URL, e.g. `https://www.nathanielbaldock.com` or `https://www.kingdomvocations.com` (use the exact domain you want to track).
   - **Verify ownership** using one of the options Google offers:
     - **HTML tag:** Add the meta tag to your site’s `<head>` (e.g. in `index.html` or your root layout), then click Verify.
     - **DNS:** Add the TXT record they give you at your domain registrar, then click Verify.
     - **HTML file:** Download the file, put it in `client/public/`, deploy, then click Verify.
   - After verification, that property will appear in the dropdown and you’ll see its Overview (performance and indexing).

2. **Submit the sitemap**
   - In Search Console, open **Sitemaps**.
   - Enter: `sitemap.xml`
   - Submit. Google will crawl the URLs listed in the sitemap.

3. **Request indexing (optional)**
   - Use **URL Inspection** for the homepage and key URLs (`/`, `/speaking`, `/intake`) and request indexing to speed up discovery.

## Checking if your site (and articles) are in Google

- **Search:** In Google, run `site:www.nathanielbaldock.com` to see which pages are indexed.
- **Search Console:** After adding the property, use **Performance** for search traffic and **Coverage / Pages** (or **URL Inspection**) to see indexed URLs and request indexing for new articles.

## Files

- `client/public/robots.txt` — Allows all crawlers and points to the sitemap.
- `client/public/sitemap.xml` — Lists canonical URLs for `/`, `/speaking`, `/resources`, `/intake`, and each article under `/resources/...`. Update `lastmod` when you make significant content changes. When you add a new article, add its URL to the sitemap.
