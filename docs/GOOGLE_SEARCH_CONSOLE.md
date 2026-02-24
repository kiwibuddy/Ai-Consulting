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
   - In the left sidebar, click **Sitemaps** (under "Indexing").
   - In the "Add a new sitemap" box, enter: **sitemap.xml** (not the full URL — just the path).
   - Click **Submit**. Google will start crawling the URLs in your sitemap. Status may show "Succeeded" after a short while, or "Couldn't fetch" if the site is slow; wait and try again if needed.
   - To **re-submit** after updating the sitemap: go to the same Sitemaps page. If the sitemap is already listed, you can leave it as is (Google will re-crawl periodically), or remove it and add `sitemap.xml` again to trigger a fresh fetch.

3. **Request indexing for key URLs (optional but recommended)**
   - In the left sidebar, click **URL Inspection** (under "Indexing").
   - In the bar at the top, paste or type each URL below, then press Enter. For each one:
     1. Wait for Google to "test" the URL (retrieve the page).
     2. If it says "URL is not on Google", click **Request indexing**. If it says "URL is on Google", you're done for that URL; no need to request again.
   - **URLs to inspect (paste one at a time):**
     - `https://www.nathanielbaldock.com/`
     - `https://www.nathanielbaldock.com/about`
     - `https://www.nathanielbaldock.com/resources`
     - `https://www.nathanielbaldock.com/resources/raising-humans-in-the-age-of-the-digital-god`
     - `https://www.nathanielbaldock.com/resources/discipleship-and-missions-in-an-ai-age`
     - `https://www.nathanielbaldock.com/resources/outsourcing-the-holy-spirit-to-ai`
     - `https://www.nathanielbaldock.com/speaking`
     - `https://www.nathanielbaldock.com/intake`
     - `https://www.nathanielbaldock.com/pricing`
   - Requesting indexing does not guarantee immediate inclusion; it asks Google to prioritise crawling. Results can appear in a few days or longer.

## Checking if your site (and articles) are in Google

- **Search:** In Google, run `site:www.nathanielbaldock.com` to see which pages are indexed.
- **Search Console:** After adding the property, use **Performance** for search traffic and **Coverage / Pages** (or **URL Inspection**) to see indexed URLs and request indexing for new articles.

## Files

- `client/public/robots.txt` — Allows all crawlers and points to the sitemap.
- `client/public/sitemap.xml` — Lists canonical URLs for `/`, `/speaking`, `/resources`, `/intake`, and each article under `/resources/...`. Update `lastmod` when you make significant content changes. When you add a new article, add its URL to the sitemap.
