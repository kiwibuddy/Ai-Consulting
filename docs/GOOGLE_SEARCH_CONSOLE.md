# Google Search Console Setup

The site includes `robots.txt` and an **auto-generated** `sitemap.xml` (built by `scripts/generate-sitemap.ts` on every deploy). Do not edit `sitemap.xml` by hand.

**Note:** Search Console shows *search* performance (how you appear in Google, which pages are indexed). For *page-view traffic* (visits, sessions), use [Google Analytics](https://analytics.google.com) — GA4 is installed in `client/index.html`.

---

## Before you start (checklist)

Complete these **before** opening Search Console:

- [ ] Your latest site changes are **deployed** to production (Vercel). GSC tests the live site, not your laptop.
- [ ] In a browser, confirm these load without errors:
  - [https://www.nathanielbaldock.com/](https://www.nathanielbaldock.com/)
  - [https://www.nathanielbaldock.com/sitemap.xml](https://www.nathanielbaldock.com/sitemap.xml) — should show XML with ~65 `<url>` entries
  - [https://www.nathanielbaldock.com/robots.txt](https://www.nathanielbaldock.com/robots.txt) — should include `Sitemap: https://www.nathanielbaldock.com/sitemap.xml`
- [ ] Sign in to Search Console with the **Google account you want to own the property long-term** (ideally the same one used for Analytics).
- [ ] Know where your **domain DNS** is managed (e.g. Vercel Domains, Cloudflare, Namecheap) if you choose DNS verification.

**Important:** Add the property as **`https://www.nathanielbaldock.com`** (with `www`). If you also care about the non-www version, add a separate property or set up redirects so Google sees one canonical host.

---

## Part 1 — Add and verify your property

### Step 1.1 — Open Search Console

1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. If prompted, accept terms and choose your account
3. Check the **property selector** (top-left). If you already see `https://www.nathanielbaldock.com`, skip to Part 2 — you're verified

### Step 1.2 — Add a new property

1. Click the property dropdown (top-left) → **+ Add property**
2. You will see two options:
   - **Domain** — `nathanielbaldock.com` (covers all subdomains; verifies via DNS only)
   - **URL prefix** — `https://www.nathanielbaldock.com` (**recommended for this project**)
3. Select **URL prefix**
4. Enter exactly: `https://www.nathanielbaldock.com`
5. Click **Continue**

### Step 1.3 — Choose a verification method

Google shows several methods. Pick **one** (DNS is best if you control DNS; HTML tag is fine if you deploy via this repo).

#### Option A — DNS TXT record (recommended, no redeploy)

Best if your domain DNS is at Vercel, Cloudflare, or your registrar.

1. On the verification screen, choose **Domain name provider** or **TXT record**
2. Google shows a record like:
   - **Type:** TXT  
   - **Host/Name:** `@` or `nathanielbaldock.com` (provider varies)  
   - **Value:** `google-site-verification=xxxxxxxxxxxxxxxx`
3. Log in to where DNS is managed:
   - **Vercel:** Project → Settings → Domains → select domain → DNS Records
   - **Cloudflare / registrar:** DNS management for `nathanielbaldock.com`
4. Add the TXT record Google gave you
5. Save and wait **5–30 minutes** (sometimes up to 24 hours)
6. Back in Search Console, click **Verify**
7. Success message: *Ownership verified*

**If verification fails:** Wait longer for DNS propagation, confirm you didn't add the record to the wrong domain, and use [https://dnschecker.org](https://dnschecker.org) to search for TXT records on `nathanielbaldock.com`.

#### Option B — HTML meta tag (requires deploy)

1. Choose **HTML tag** on the verification screen
2. Copy the meta tag, e.g.  
   `<meta name="google-site-verification" content="YOUR_CODE_HERE" />`
3. Add it inside `<head>` in [`client/index.html`](../client/index.html) (after the charset/viewport tags is fine)
4. Commit, push, and wait for Vercel deploy to finish
5. In Search Console, click **Verify**

#### Option C — HTML file upload (requires deploy)

1. Choose **HTML file** on the verification screen
2. Download the file (e.g. `google1234567890.html`)
3. Place it in [`client/public/`](../client/public/) (so it serves at `https://www.nathanielbaldock.com/google1234567890.html`)
4. Deploy, then open that URL in a browser to confirm it loads
5. In Search Console, click **Verify**

### Step 1.4 — Confirm you're in the right property

1. Top-left dropdown should show **`https://www.nathanielbaldock.com`**
2. Open **Overview** — you may see little data at first; that's normal for a new property
3. Optional: **Settings** (gear) → **Users and permissions** — add another Google account if someone else needs access

---

## Part 2 — Submit the sitemap

### Step 2.1 — Confirm sitemap is live

In your browser, open:

**https://www.nathanielbaldock.com/sitemap.xml**

You should see XML starting with `<?xml version="1.0"` and many `<loc>` entries. If you get 404, deploy first.

### Step 2.2 — Submit in Search Console

1. In the left sidebar, open **Indexing** → **Sitemaps**  
   (Older UI: **Sitemaps** under Indexing)
2. Find **Add a new sitemap**
3. In the text box, type only: **`sitemap.xml`**  
   Do **not** paste the full URL — GSC adds your property URL automatically
4. Click **Submit**
5. Status should change to **Success** or **Couldn't fetch** (see troubleshooting below)

### Step 2.3 — What success looks like

After a few minutes to hours:

| Column | Good sign |
|--------|-----------|
| Status | **Success** |
| Discovered pages | Number climbs toward **65** (may take days) |
| Last read | Recent date |

Google will re-fetch the sitemap periodically after deploys. You usually **do not** need to resubmit unless you changed URL structure or Google shows errors.

### Step 2.4 — If sitemap shows "Couldn't fetch"

1. Confirm [https://www.nathanielbaldock.com/sitemap.xml](https://www.nathanielbaldock.com/sitemap.xml) opens in an incognito window
2. Confirm [https://www.nathanielbaldock.com/robots.txt](https://www.nathanielbaldock.com/robots.txt) allows crawlers (`Allow: /`)
3. Wait 24 hours and check again — transient fetch errors are common
4. If still failing: remove the sitemap entry in GSC and submit `sitemap.xml` again

---

## Part 3 — Request indexing for priority URLs

The sitemap tells Google what exists; **URL Inspection** asks Google to crawl specific pages sooner. Do this **after** verification and sitemap submit.

### Step 3.1 — Open URL Inspection

1. Left sidebar → **Indexing** → **URL inspection**
2. You'll see a search bar at the top: *Inspect any URL in **https://www.nathanielbaldock.com***

### Step 3.2 — Inspect one URL at a time

For **each** URL in the list below:

1. **Copy** the full URL (including `https://www.nathanielbaldock.com`)
2. **Paste** into the inspection bar and press **Enter**
3. Wait while Google **tests live URL** (10–60 seconds)
4. Read the result panel:

| Message | What to do |
|---------|------------|
| **URL is on Google** | Indexed (or known). No action needed — move to next URL |
| **URL is not on Google** | Click **Request indexing** → confirm |
| **URL is not indexed: …** | Read reason; fix if it's a real error, then **Request indexing** |
| **Soft 404** | Wrong URL or page looks empty to Google — use exact URLs from this list |
| **Page fetch failed** | Site down or blocking Googlebot — fix hosting, retry later |

5. After clicking **Request indexing**, you may see *Indexing requested* — Google queues a crawl; it is **not instant**

**Rate limit:** Google limits how many indexing requests you can make per day. If blocked, continue tomorrow — the sitemap still helps.

### Step 3.3 — Priority URL list (copy-paste)

Work through these in order (core pages first):

```
https://www.nathanielbaldock.com/
https://www.nathanielbaldock.com/about
https://www.nathanielbaldock.com/who-is-nathaniel-baldock
https://www.nathanielbaldock.com/audit
https://www.nathanielbaldock.com/intake
https://www.nathanielbaldock.com/speaking
https://www.nathanielbaldock.com/resources
https://www.nathanielbaldock.com/resources/something-has-changed-you-are-not-imagining-it
https://www.nathanielbaldock.com/ai-consulting-for-churches
https://www.nathanielbaldock.com/ai-training-for-schools
https://www.nathanielbaldock.com/ai-governance-for-nonprofits
https://www.nathanielbaldock.com/ai-speaker-faith-and-technology
https://www.nathanielbaldock.com/ai-use-audit
```

**Optional (next session):** Inspect other articles and `/pricing` from your sitemap if you have requests left.

### Step 3.4 — Article URL rule

Always use **`/resources/...`** paths, never `/articles/...`. Example:

- Correct: `https://www.nathanielbaldock.com/resources/raising-humans-in-the-age-of-the-digital-god`
- Wrong: `https://www.nathanielbaldock.com/articles/...` (may show Soft 404)

---

## Part 4 — Monitor over 2–4 weeks

### Week 1

1. **Indexing → Pages** (or **Page indexing** report)
   - Note **Indexed** count — write it down as your baseline
   - Check **Not indexed** — click reasons (e.g. "Discovered – currently not indexed" is common for new sites)
2. **Google search:** run `site:www.nathanielbaldock.com`
   - Count roughly how many results appear
3. Re-inspect homepage and `/who-is-nathaniel-baldock` if still "not on Google"

### Weeks 2–4

1. **Performance** report (may stay empty until impressions begin)
   - Filter or scan for queries: `Nathaniel Baldock`, `AI consultant Tauranga`
2. **Sitemaps** — confirm **Discovered pages** approaches 65
3. Run `site:www.nathanielbaldock.com` again — compare to baseline
4. Optionally re-test AI tools: "Who is Nathaniel Baldock?"

### When to worry vs wait

| Situation | Action |
|-----------|--------|
| 0 indexed after 2 weeks | Re-check robots.txt, sitemap live, no `noindex` on pages; request indexing again for `/` and `/about` |
| Some pages indexed, not all | Normal — sitemap handles the long tail over weeks |
| "Crawled – currently not indexed" | Google chose not to index yet; improve internal links and external mentions |
| Coverage errors spike | Open the specific error type in Pages report and fix URLs |

---

## Part 5 — Google Business Profile (local entity)

Separate from Search Console but complements it for "AI consultant Tauranga" queries.

1. Go to [https://business.google.com](https://business.google.com) (same Google account is fine)
2. **Add business** → name: **`Nathaniel Baldock AI Consulting`**
3. **Category:** Management consultant (or Business management consultant)
4. **Service area business:** Yes — add Tauranga, Bay of Plenty, New Zealand (no public shopfront required)
5. **Website:** `https://www.nathanielbaldock.com`
6. **Phone / email:** match site contact (`nathanielbaldock@gmail.com`)
7. **Description** (copy-paste):

   > Nathaniel Baldock is an AI strategist, consultant, speaker, and educator based in Tauranga, New Zealand. He helps churches, schools, and mission-driven organisations navigate AI with clarity, ethics, and practical implementation.

8. Complete **verification** (postcard, phone, or email — Google decides)
9. After verified:
   - Upload portrait and speaking photos
   - Add services: AI consulting, AI training, speaking, AI Use Audit
   - Link to booking: `https://www.nathanielbaldock.com/intake`

In Search Console, once GBP is live, you may later see links between Business Profile and your website under performance/local reports.

---

## Quick reference — files on the site

| File | URL | Purpose |
|------|-----|---------|
| `client/public/robots.txt` | `/robots.txt` | Allows crawlers; points to sitemap |
| `client/public/sitemap.xml` | `/sitemap.xml` | ~65 URLs, regenerated on each build |
| `scripts/generate-sitemap.ts` | — | Run via `npm run build:client` |
| `shared/content/sitemap-sources.ts` | — | Source of truth for sitemap URLs |

---

## Related docs

- [AI_DISCOVERABILITY_ACCOMPLISHMENT_REPORT.md](./AI_DISCOVERABILITY_ACCOMPLISHMENT_REPORT.md) — what was built and how to validate
- [EXTERNAL_MENTIONS_PLAYBOOK.md](./EXTERNAL_MENTIONS_PLAYBOOK.md) — off-site links that help indexing and AI confidence
