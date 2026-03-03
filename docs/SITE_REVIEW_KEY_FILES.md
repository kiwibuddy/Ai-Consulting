# Site review: key files to check

Use this list when reviewing the site for **errors / completeness**, **marketing**, **SEO**, and **branding consistency**. Paths are relative to the repo root unless noted.

---

## 1. Errors & incomplete items

| File | What to check |
|------|----------------|
| **client/src/content/articles.ts** | Placeholder entries ("Coming soon: First article"); `url: "#"`. Replace with real articles or keep placeholders intentional. |
| **client/src/content/videos.ts** | Placeholder entries ("Coming soon: Faith and AI"); `url: "#"`. Same as above. |
| **client/src/content/latest.ts** | "Coming soon: Latest article/video"; links to `/resources`. Update when you have real latest content. |
| **client/src/pages/landing.tsx** | Footer: `Credits`, `Terms`, `Privacy` are `<a href="#">`. Point to real pages or remove. |
| **client/src/pages/speaking.tsx** | Footer: same `href="#"` for Credits, Terms, Privacy. |
| **client/src/pages/resources.tsx** | Footer: same. Video/article cards with `url: "#"` open dead links. |
| **client/src/pages/not-found.tsx** | Copy and link back to home; mobile layout. |
| **client/src/pages/intake.tsx** | Form validation, submit flow, error states, success message. |

**Quick grep for placeholders:**  
`client/src/content/` — all "Coming soon" and `#` URLs.

---

## 2. Marketing & conversion

| File | What to check |
|------|----------------|
| **client/src/pages/landing.tsx** | Hero headline and CTA; "Get started" section; number and placement of "Book a free 30-min consultation" buttons. |
| **client/src/pages/speaking.tsx** | Hero intro and "Available for"; booking CTA and "What to expect"; testimonial quotes; speaking email CTA. |
| **client/src/pages/resources.tsx** | Hero line; whether videos/articles drive to intake or external content. |
| **client/src/pages/intake.tsx** | Headline, steps, and field labels; clarity of "what happens next"; any mention of speaking vs consulting. |
| **client/src/content/speakingPage.ts** | Testimonials, booking copy, FAQ answers. |
| **client/src/content/speakingTopics.ts** | Topic titles and descriptions; "For" audiences; format tags. |

**Consistency:**  
- Primary CTA label: "Book a free 30-min consultation" (landing) vs "Book a discovery call" (speaking). Decide if you want one phrase everywhere.
- Contact: speaking page uses `speaking@nathanielbaldock.com` in booking section; footers use `nathanielbaldock@gmail.com`. Align if both should be used or one.

---

## 3. SEO

| File | What to check |
|------|----------------|
| **client/index.html** | Single set of meta tags for the whole SPA. `<title>`, `<meta name="description">`, canonical, `og:*`, `twitter:*`, `og:image` (hero). No per-route titles/descriptions unless you add a head manager. |
| **client/index.html** | Canonical and og:url point to `https://www.nathanielbaldock.com`. Confirm production URL. |
| **client/public/manifest.json** | `name`, `short_name`, `description`; matches positioning. |
| **client/public/** | No `robots.txt` or `sitemap.xml` found. Add if you want crawl rules or sitemap. |
| **client/src/pages/landing.tsx** | Main content for home: H1, section headings, anchor IDs (#problems, #how-i-help, etc.) for deep links. |
| **client/src/pages/speaking.tsx** | One main H1; section structure. |
| **client/src/pages/resources.tsx** | Same. |

**Gaps:**  
- No per-page `<title>` or meta (e.g. "Speaking – Nathaniel Baldock" for `/speaking`). Would require something like react-helmet or a layout that sets document title by route.
- No structured data (JSON-LD) for person/organization or events.

---

## 4. Branding consistency

| File | What to check |
|------|----------------|
| **client/src/index.css** | Tesoro theme variables (`--tesoro-green`, `--tesoro-gold`, etc.); `.tesoro-cta-gradient`; `.hero-accent-phrase`, `.problems-accent-phrase`. Shared by landing, speaking, resources. |
| **client/src/pages/landing.tsx** | Header (dark bar, white nav); logo; CTA button style; section colours (e.g. how-i-help cards); footer layout and links. |
| **client/src/pages/speaking.tsx** | Same header/footer as landing; same CTA button class; same section padding and content width (`contentMax`). |
| **client/src/pages/resources.tsx** | Same. |
| **client/src/pages/intake.tsx** | Whether header/footer and CTA style match (or are intentionally minimal). |
| **client/public/logo.png** | Used in header on all three. Dark header: if logo is dark, consider a light variant or the invert rule in `index.css` (commented). |
| **client/public/favicon.png** | Matches logo/brand. |
| **client/public/manifest.json** | `theme_color`, `background_color`, `name` align with site. |

**Copy/voice:**  
- Tone (e.g. "I" vs "Nathaniel") consistent across landing, speaking, resources, intake.
- Spelling: "organisation" vs "organization" — currently mixed in content; pick one for the brand.

---

## 5. File list summary (paths only)

**Public-facing pages:**  
- `client/src/pages/landing.tsx`  
- `client/src/pages/speaking.tsx`  
- `client/src/pages/resources.tsx`  
- `client/src/pages/intake.tsx`  
- `client/src/pages/not-found.tsx`  
- `client/src/pages/forgot-password.tsx`  
- `client/src/pages/reset-password.tsx`  

**Content (copy + data):**  
- `client/src/content/speakingTopics.ts`  
- `client/src/content/speakingPage.ts`  
- `client/src/content/articles.ts`  
- `client/src/content/videos.ts`  
- `client/src/content/latest.ts`  

**SEO & global:**  
- `client/index.html`  
- `client/public/manifest.json`  

**Branding & theme:**  
- `client/src/index.css` (Tesoro block and utility classes)  
- `client/public/logo.png`  
- `client/public/favicon.png`  

**Routing:**  
- `client/src/App.tsx` (public routes: `/`, `/intake`, `/speaking`, `/resources`).

---

## 6. Suggested review order

1. **Landing** — `landing.tsx` + `index.html` (SEO, hero, CTAs, footer links).  
2. **Speaking** — `speaking.tsx` + `speakingTopics.ts` + `speakingPage.ts` (topics, testimonials, booking, FAQ, contact).  
3. **Resources** — `resources.tsx` + `articles.ts` + `videos.ts` + `latest.ts` (placeholders, links).  
4. **Intake** — `intake.tsx` (flow, labels, post-submit).  
5. **Global** — `index.css` (theme), `manifest.json`, footer and Credits/Terms/Privacy across landing, speaking, resources.
