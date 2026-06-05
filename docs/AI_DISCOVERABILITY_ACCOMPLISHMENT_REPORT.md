# AI Discoverability — Accomplishment Report

**Date:** June 2026  
**Site:** https://www.nathanielbaldock.com  
**Scope:** Phases 1–4 of the AI Discoverability Implementation Plan

This report documents what was implemented, **how well** it was done (with evidence), and what you should do next manually (Google Search Console, Google Business Profile, external mentions).

---

## 1. Sitemap automation

### What changed

- Added [`scripts/generate-sitemap.ts`](../scripts/generate-sitemap.ts) — builds `client/public/sitemap.xml` from code, not hand-editing.
- Single source of truth: [`shared/content/sitemap-sources.ts`](../shared/content/sitemap-sources.ts) pulls from articles, worksheets, expertise pages, and core static routes.
- Hooked into `npm run build:client` so **every deploy regenerates the sitemap**.

### Quality evidence

| Metric | Before | After |
|--------|--------|-------|
| URLs in sitemap | 12 | **65** |
| Missing newer articles | 6+ (e.g. ground-has-shifted, safe-phrase, ai-worry, work-ai-cannot-take, world-of-fakes, question-nobody-asking) | **0** — all 13 `articleMeta` entries included |
| `/audit` | Missing | **Included** (priority 0.9) |
| Worksheets | 0 | **~40** public worksheets (excludes internal-only operators playbook & master report) |
| Expertise landing pages | 0 | **5** routes |
| Who-is page | 0 | **1** route |

**Previously missing URLs now indexed in sitemap (examples):**

- `/resources/something-has-changed-you-are-not-imagining-it`
- `/resources/the-voice-on-the-phone-is-not-your-son`
- `/resources/how-worried-should-you-be-about-ai`
- `/resources/the-work-ai-cannot-take`
- `/resources/in-a-world-of-fakes-the-church-has-something-rare`
- `/resources/the-question-nobody-is-asking-about-ai`
- `/audit`
- `/who-is-nathaniel-baldock`
- `/ai-consulting-for-churches` … `/ai-use-audit`

**Verify locally:** `npx tsx scripts/generate-sitemap.ts` → should print `65 URLs`.

**After deploy:** Submit `sitemap.xml` in Search Console (see [GOOGLE_SEARCH_CONSOLE.md](./GOOGLE_SEARCH_CONSOLE.md)).

---

## 2. Person schema + `sameAs` (entity graph)

### What changed

- Central profile data: [`shared/content/site-profiles.ts`](../shared/content/site-profiles.ts)
  - `CANONICAL_BIO` — one sentence used on About page and in schema
  - `SOCIAL_PROFILES` — LinkedIn, Facebook, YouTube (GitHub skipped per your choice)
  - `buildPersonSchema()` — shared Person JSON-LD with `sameAs`, `knowsAbout`, `alumniOf`, `worksFor`, `image`
- Refactored [`client/src/components/json-ld.tsx`](../client/src/components/json-ld.tsx):
  - `HomepageJsonLd` — ProfessionalService + Person
  - `AboutPageJsonLd` — **richest** Person schema (used on `/about` and `/who-is-nathaniel-baldock`)
  - `SpeakingPageJsonLd` — Person + FAQ (same `sameAs` as everywhere else)
- **Server-side JSON-LD injection** in [`server/og-meta.ts`](../server/og-meta.ts) and prerender [`scripts/prerender-og.ts`](../scripts/prerender-og.ts) via [`shared/content/public-page-meta.ts`](../shared/content/public-page-meta.ts) → `getJsonLdForPath()`

Crawlers that **do not run JavaScript** now receive Person schema in the initial HTML for:

- `/` (Person + ProfessionalService)
- `/about` (full Person)
- `/who-is-nathaniel-baldock` (full Person + FAQPage)
- All 5 expertise pages (FAQPage)

### Quality evidence

**`sameAs` values (identical everywhere):**

1. https://www.linkedin.com/in/nathaniel-baldock-0371251bb/
2. https://www.facebook.com/buddybaldock
3. https://www.youtube.com/@nathanielbaldock5559/playlists

**Validate after deploy:**

1. [Google Rich Results Test](https://search.google.com/test/rich-results) → test `https://www.nathanielbaldock.com/about`
2. View source on `/about` or `/who-is-nathaniel-baldock` (prerendered `.html` on Vercel) → search for `"@type":"Person"` and `"sameAs"`

**About page copy:** Subheading now uses `CANONICAL_BIO` (present-tense "AI consultant" — no longer "building a consulting practice").

---

## 3. Footer social links

### What changed

[`client/src/components/site-footer.tsx`](../client/src/components/site-footer.tsx) **Connect** column now includes LinkedIn, Facebook, YouTube with `rel="noopener noreferrer"`.

URLs match Person schema `sameAs` exactly.

---

## 4. Speaking page SEO

### What changed

[`client/src/pages/speaking.tsx`](../client/src/pages/speaking.tsx) now includes `PageSEO` with title, description, and canonical `/speaking` — aligned with [`server/og-meta.ts`](../server/og-meta.ts) and prerender output.

### Quality evidence

After deploy, view source on `/speaking`:

- `<title>` should start with "Invite Nathaniel Baldock to Speak"
- `<link rel="canonical" href="https://www.nathanielbaldock.com/speaking">`
- `og:url` should match canonical

---

## 5. Who-is page + identity FAQs

### What changed

- New route: **`/who-is-nathaniel-baldock`**
- Page: [`client/src/pages/who-is-nathaniel-baldock.tsx`](../client/src/pages/who-is-nathaniel-baldock.tsx)
- Identity FAQs: [`shared/content/identity-faq.ts`](../shared/content/identity-faq.ts) — 5 questions AI users commonly ask
- FAQPage JSON-LD on page + in prerendered HTML

Structured sections: at-a-glance facts, career highlights, services (links to expertise pages), resources, connect, FAQs.

---

## 6. Five expertise landing pages

| URL | Target query focus |
|-----|-------------------|
| `/ai-consulting-for-churches` | AI consultant for churches New Zealand |
| `/ai-training-for-schools` | AI training Christian schools NZ |
| `/ai-governance-for-nonprofits` | AI policy nonprofit NZ |
| `/ai-speaker-faith-and-technology` | Christian AI speaker |
| `/ai-use-audit` | AI use audit tool NZ (CTA → `/audit`) |

Content: [`client/src/content/expertise-pages.ts`](../client/src/content/expertise-pages.ts)  
Template: [`client/src/pages/expertise-landing.tsx`](../client/src/pages/expertise-landing.tsx)

Each page includes: who for, problems, outcomes, proof points, **one citable hook**, CTAs, and 2 FAQs with FAQPage schema.

---

## 7. Pre-render / crawlability

### What changed

[`scripts/prerender-og.ts`](../scripts/prerender-og.ts) now:

- Iterates **all sitemap URLs**
- Injects OG meta + JSON-LD into static `.html` files for Vercel `cleanUrls`
- Resolves worksheet, christian-professional, and deep-dive meta

Build output: **65 prerendered routes** (after adding privacy/terms/speaking-invite meta).

---

## 8. Canonical bio copy-paste pack

Use on LinkedIn, Facebook, YouTube, GBP, podcast bios:

> Nathaniel Baldock is an AI strategist, consultant, speaker, and educator based in Tauranga, New Zealand. He helps churches, schools, and mission-driven organisations navigate AI with clarity, ethics, and practical implementation.

Website: https://www.nathanielbaldock.com  
Start here page: https://www.nathanielbaldock.com/who-is-nathaniel-baldock

Full platform checklist: [EXTERNAL_MENTIONS_PLAYBOOK.md](./EXTERNAL_MENTIONS_PLAYBOOK.md)

---

## 9. Manual steps for you (after deploy)

### Google Search Console

Follow [GOOGLE_SEARCH_CONSOLE.md](./GOOGLE_SEARCH_CONSOLE.md):

1. Verify `https://www.nathanielbaldock.com`
2. Submit `sitemap.xml`
3. URL Inspection → request indexing for priority URLs (listed in that doc)
4. Monitor **Indexing → Pages** for 2–4 weeks

**Baseline check (record today):** Google search `site:www.nathanielbaldock.com` — note how many results. Re-check in 2 and 4 weeks.

### Google Business Profile

1. [business.google.com](https://business.google.com) → Add `Nathaniel Baldock AI Consulting`
2. Category: Management consultant
3. Service area: Tauranga / Bay of Plenty / NZ
4. Website + canonical bio
5. Verify via Google's method (postcard/phone/email)
6. Add photos + services + link to `/intake`

### External mentions (90-day goal)

See [EXTERNAL_MENTIONS_PLAYBOOK.md](./EXTERNAL_MENTIONS_PLAYBOOK.md) — target **5 independent domains** linking to your site with consistent name/role/location.

### Re-test AI tools (in 2–4 weeks)

Ask ChatGPT, Claude, Gemini:

- "Who is Nathaniel Baldock?"
- "AI consultant Tauranga churches"
- "Nathaniel Baldock AI Use Audit"

---

## 10. Remaining gaps (future optional work)

| Item | Status |
|------|--------|
| GitHub in `sameAs` | Skipped by choice — add later if you publish a public profile |
| Full SSR / body pre-render | OG + JSON-LD pre-rendered; main content still SPA (Google usually OK; some AI crawlers may lag) |
| Media/Press page with downloadable bio PDF | Not built |
| Google Search Console verification | **You** must complete |
| 5+ external web mentions | **You** — see playbook |

---

## Files created or significantly changed

| File | Purpose |
|------|---------|
| `scripts/generate-sitemap.ts` | Auto-generate sitemap |
| `shared/content/sitemap-sources.ts` | URL registry |
| `shared/content/site-profiles.ts` | Bio, social, Person schema builder |
| `shared/content/public-page-meta.ts` | OG meta + server JSON-LD routing |
| `shared/content/identity-faq.ts` | Who-is FAQs |
| `client/src/content/article-index.ts` | All article metas for sitemap dates |
| `client/src/content/expertise-pages.ts` | 5 expertise pages content |
| `client/src/pages/who-is-nathaniel-baldock.tsx` | Start-here entity page |
| `client/src/pages/expertise-landing.tsx` | Shared expertise template |
| `docs/GOOGLE_SEARCH_CONSOLE.md` | Updated GSC + GBP guide |
| `docs/EXTERNAL_MENTIONS_PLAYBOOK.md` | Off-site citation strategy |

---

## Deploy reminder

```bash
npm run build:client
# Deploy dist/public to Vercel (automatic on push if CI connected)
```

After deploy, complete GSC + GBP steps above, then re-test AI discovery in 2–4 weeks.
