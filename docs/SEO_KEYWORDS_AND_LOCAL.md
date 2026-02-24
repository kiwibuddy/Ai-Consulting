# SEO: Keywords & Local (AI Consultant Tauranga, New Zealand)

This doc summarises the target keywords and changes made so the site and articles can show up in Google for **AI consultants in Tauranga** and **AI consulting New Zealand**.

## Target keywords

| Priority | Keyword / phrase | Where used |
|----------|------------------|------------|
| Primary | AI consultant Tauranga | Homepage title, meta, hero line; About page; JSON-LD; article meta |
| Primary | AI consulting New Zealand | Homepage title, meta, JSON-LD; article meta |
| Secondary | AI consultant New Zealand | Article descriptions; JSON-LD |
| Secondary | AI consultant NZ | OG/twitter title; footer (Tauranga, NZ) |
| Long-tail | AI consulting for churches / schools / nonprofits | Meta descriptions; landing copy |
| Long-tail | AI strategy faith organisations | Existing copy; articles |

## Changes made

1. **index.html**
   - **Title:** `AI Consultant Tauranga | Nathaniel Baldock — AI Consulting New Zealand & Global`
   - **Meta description:** Includes "AI consultant in Tauranga, New Zealand", "churches, schools, nonprofits", "NZ + Global".
   - **OG and Twitter** title/description updated to match for shares.

2. **Homepage (landing)**
   - **Hero:** Added line: "Based in Tauranga, New Zealand — working with organisations across NZ and globally."
   - **JSON-LD:** `HomepageJsonLd` with `ProfessionalService` (LocalBusiness-style) and `Person` schema: name, description, address (Tauranga, NZ), areaServed (New Zealand, Tauranga), serviceType "AI Consulting". Helps Google understand location and service for local/search.

3. **About page**
   - Subheading under "About Me": "AI consultant in Tauranga, New Zealand — strategy, training, and advisory for faith, education, and mission-driven organisations."

4. **Resources page**
   - Subtitle includes "AI consultant perspective" and "New Zealand and global."

5. **Articles (meta descriptions)**
   - Each article’s meta description now ends with a short byline: "By Nathaniel Baldock, AI consultant New Zealand" or "Nathaniel Baldock — AI consultant Tauranga, NZ." so article pages can rank for those terms too.

6. **Sitemap**
   - Added `/about` and `/pricing` so they get indexed; `lastmod` set for recent changes.

## Existing SEO basics (unchanged)

- **Canonical URLs** on homepage and all articles.
- **robots.txt** allows crawlers and points to sitemap.
- **Article JSON-LD** (headline, author, datePublished) on each article page.
- **Speaking page** has Person + FAQ schema with Tauranga in address.

## How to keep improving

### A. Google Search Console (sitemap and URL Inspection)

See **docs/GOOGLE_SEARCH_CONSOLE.md** for full steps. Summary:

1. **Submit or re-submit the sitemap**
   - Go to [Google Search Console](https://search.google.com/search-console) and select the property for **www.nathanielbaldock.com**.
   - Left sidebar → **Indexing** → **Sitemaps**.
   - In "Add a new sitemap", enter: **sitemap.xml** → **Submit**.
   - To re-submit after changing the sitemap: you can leave the existing sitemap (Google re-crawls) or remove it and add `sitemap.xml` again.

2. **Request indexing for important URLs**
   - Left sidebar → **Indexing** → **URL Inspection**.
   - Paste each URL below into the bar, press Enter, wait for the test to finish, then click **Request indexing** if the URL is not yet on Google:
     - `https://www.nathanielbaldock.com/`
     - `https://www.nathanielbaldock.com/about`
     - `https://www.nathanielbaldock.com/resources`
     - `https://www.nathanielbaldock.com/resources/raising-humans-in-the-age-of-the-digital-god`
     - `https://www.nathanielbaldock.com/resources/discipleship-and-missions-in-an-ai-age`
     - `https://www.nathanielbaldock.com/resources/outsourcing-the-holy-spirit-to-ai`
     - `https://www.nathanielbaldock.com/speaking`
     - `https://www.nathanielbaldock.com/intake`
     - `https://www.nathanielbaldock.com/pricing`

### B. Google Business Profile (optional, for local search)

Creating a Business Profile helps you show up for "AI consultant Tauranga" and in local results. Steps:

1. **Go to Google Business**
   - Visit [business.google.com](https://business.google.com) and sign in with your Google account.

2. **Add or claim your business**
   - Click **Add your business to Google** (or **Manage now** if you already have one).
   - Enter business name: **Nathaniel Baldock AI Consulting** (or the name you use publicly).
   - Choose **Local business** if you have an address clients can visit, or **Service area business** if you serve Tauranga/NZ but don’t have a public office.

3. **Location and area**
   - **Address:** Add Tauranga (and street address if you want it public). Or select "I deliver goods and services to my customers" and add service areas (e.g. Tauranga, Bay of Plenty, New Zealand).
   - **Service area:** If you’re service-area only, add at least **Tauranga** and **New Zealand** so local searches can find you.

4. **Category and details**
   - **Category:** Choose something like **Management consultant** or **Business consultant** (there may not be "AI consultant"; pick the closest).
   - Add a short **Description** that includes "AI consulting", "Tauranga", "New Zealand", "churches", "schools", "nonprofits" so it matches your site.

5. **Website and contact**
   - **Website:** Set to **https://www.nathanielbaldock.com** so Google links your profile to this site.
   - Add phone and/or email if you want them shown.

6. **Verify**
   - Google will ask you to verify (usually by postcard to your address, or by phone/email in some cases). Complete the steps they show. Once verified, your profile can appear in local search and on Google Maps.

### C. Commit and deploy (SEO pass)

Commit and push the SEO changes so they go live. Suggested commands:

```bash
# Stage the SEO-related files
git add client/index.html \
  client/public/sitemap.xml \
  client/src/components/json-ld.tsx \
  client/src/pages/landing.tsx \
  client/src/pages/about.tsx \
  client/src/pages/resources.tsx \
  client/src/content/article-raising-humans.ts \
  client/src/content/article-discipleship-missions-ai.ts \
  client/src/content/article-outsourcing-holy-spirit.ts \
  docs/GOOGLE_SEARCH_CONSOLE.md \
  docs/SEO_KEYWORDS_AND_LOCAL.md

# Commit
git commit -m "SEO: Tauranga/NZ keywords, LocalBusiness JSON-LD, sitemap, GSC instructions"

# Push (then deploy via Railway/Vercel as usual)
git push
```

**Files included in this SEO pass:**
- `client/index.html` — title, meta description, OG, Twitter
- `client/public/sitemap.xml` — added /about, /pricing
- `client/src/components/json-ld.tsx` — HomepageJsonLd (ProfessionalService + Person)
- `client/src/pages/landing.tsx` — hero location line, HomepageJsonLd
- `client/src/pages/about.tsx` — subheading with location keywords
- `client/src/pages/resources.tsx` — subtitle with AI consultant / NZ
- `client/src/content/article-raising-humans.ts` — meta description
- `client/src/content/article-discipleship-missions-ai.ts` — meta description
- `client/src/content/article-outsourcing-holy-spirit.ts` — meta description
- `docs/GOOGLE_SEARCH_CONSOLE.md` — sitemap and URL Inspection steps
- `docs/SEO_KEYWORDS_AND_LOCAL.md` — this file (keywords, GBP, commit list)

---

## Ongoing: content, local, links

- **Content:** For new articles, use target phrases in the title, first paragraph, and meta description (e.g. "AI strategy for churches in New Zealand"). Add new article URLs to `client/public/sitemap.xml` and update `lastmod` when you publish.
- **Local:** If you add a physical address or phone, put them in the footer and in the JSON-LD so Google can show local pack. A verified Google Business Profile linked to this site strengthens local search.
- **Links:** Internal links to key articles are in place. External links from NZ, faith, or education sites (guest posts, directories) help authority.

## Files touched

- `client/index.html` — title, meta description, OG, Twitter.
- `client/src/components/json-ld.tsx` — `HomepageJsonLd` (ProfessionalService + Person).
- `client/src/pages/landing.tsx` — hero location line, `HomepageJsonLd`.
- `client/src/pages/about.tsx` — subheading with location keywords.
- `client/src/pages/resources.tsx` — subtitle with AI consultant / NZ.
- `client/src/content/article-*.ts` — meta descriptions (raising-humans, discipleship-missions-ai, outsourcing-holy-spirit).
- `client/public/sitemap.xml` — `/about`, `/pricing` added.
