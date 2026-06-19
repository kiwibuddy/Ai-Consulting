# Nathaniel Baldock — Brand Identity & Guidelines

**Domain:** [nathanielbaldock.com](https://www.nathanielbaldock.com)  
**Version:** 1.0 — June 2026  
**Scope:** Public marketing website only (what visitors see before signing in)  
**Canonical source of truth:** Live public site (`data-theme="public"`) and `client/src/styles/cinematic.css`  
**Companion doc:** `Nathaniel-Baldock-Complete-Branding-Package.md` (messaging + content strategy)

**Not covered here:** Client/coach dashboard (`data-theme="app"`), worksheets, HTML presentations, Tauranga SME materials, or audit tool product UI — those use separate design systems unless deliberately aligned later.

---

## 1. Brand overview

### Name & legal

| Use | Text |
|-----|------|
| **Primary brand** | Nathaniel Baldock |
| **Descriptor (footer, meta)** | AI Consulting for Faith, Education & Mission-Driven Leaders |
| **Optional formal** | Nathaniel Baldock Consulting |
| **Location line** | Based in Tauranga, Aotearoa — serving NZ & globally |

### Positioning

**For** faith-based organisations, schools, nonprofits, and mission-driven leaders  
**Who** need to adopt AI without compromising values, trust, or mission  
**Nathaniel Baldock** is an AI consultant  
**Who** brings 20+ years of global mission experience plus proven technical delivery  
**Unlike** corporate AI consultants who miss your context, or faith consultants who lack technical depth  
**He** designs practical systems — from strategy to shipped product — that serve formation, not exploitation.

### Brand essence

| Attribute | Expression |
|-----------|------------|
| **Promise** | AI consulting that serves formation, not exploitation |
| **Personality** | Wise, grounded, proven, human-centred, global, calm |
| **Voice** | Professional but warm; confident without arrogance; technical without jargon; values-explicit without preachiness; direct and honest |

### Tagline system

| Context | Line |
|---------|------|
| **Homepage hero (current)** | Practical AI for people who lead with *discernment*. |
| **SEO / title** | AI Consultant Tauranga \| Nathaniel Baldock — AI Consulting New Zealand & Global |
| **Footer descriptor** | AI Consulting for Faith, Education & Mission-Driven Leaders |
| **Values (supporting)** | Wisdom over hype. People over margins. |
| **Legacy (Feb 2026 doc — do not use on site)** | AI Consulting Grounded in 20+ Years of Global Mission Work |

### Key messages

- Practical AI — not hype, not fear.
- Guardrails and safeguarding built in from day one.
- Real builder credibility (apps, platforms, training at scale).
- NZ + global delivery (Zoom).
- No data resale; transparent about where AI is used.

---

## 2. Visual identity — Cinematic Public (canonical)

The public marketing site uses the **Cinematic Hybrid** theme: dark editorial shell, warm cream typography, lime-green accent, serif display type.

> **Note:** Section 1 of `Nathaniel-Baldock-Complete-Branding-Package.md` now matches this document. Older drafts in that file (navy/amber light theme) are removed — ignore any cached copies.

### 2.1 Colour palette

#### Core tokens (copy-paste)

```css
:root {
  /* Surfaces */
  --nb-bg:           #0f1014;   /* page shell */
  --nb-bg-raised:    #16181d;   /* sections, cards on dark */
  --nb-bg-panel:     rgba(255, 255, 255, 0.04);

  /* Typography colours */
  --nb-ink:          #f4efe2;   /* primary text (warm cream) */
  --nb-ink-soft:     rgba(244, 239, 226, 0.65);
  --nb-ink-dim:      rgba(244, 239, 226, 0.40);

  /* Structure */
  --nb-rule:         rgba(244, 239, 226, 0.14);
  --nb-rule-strong:  rgba(244, 239, 226, 0.24);

  /* Accent & CTA */
  --nb-accent:       #7ccc1e;   /* lime — highlights, eyebrows, italic accent */
  --nb-green:        #11c25c;   /* green — CTA gradient start */
  --nb-green-bright: #7ccc1e;   /* CTA gradient end */
  --nb-cta-gradient: linear-gradient(135deg, #11c25c, #7ccc1e);

  /* Semantic (audit, worksheets on dark shell) */
  --nb-amber:        #e3a93b;
  --nb-red:          #f87171;
  --nb-green-ok:     #11c25c;
}
```

#### Colour roles

| Token | Hex | Role |
|-------|-----|------|
| `--nb-bg` | `#0F1014` | Page background, `theme-color` meta, letterbox bars |
| `--nb-bg-raised` | `#16181D` | Raised sections, header blur base |
| `--nb-ink` | `#F4EFE2` | Headlines, primary copy |
| `--nb-accent` | `#7CCC1E` | Eyebrows, italic emphasis, selection, progress accents |
| `--nb-green` | `#11C25C` | Primary button gradient (with bright lime) |
| White | `#FFFFFF` | Text on primary buttons only |

#### What not to use on brand materials

| Avoid | Why |
|-------|-----|
| Navy `#1A2E4A` + amber `#E8952A` as primary pair | Legacy doc; conflicts with live site |
| Orange CTA (`hsl(25, 75%, 47%)`) | Reserved for **dashboard** (`data-theme="app"`) only |
| Rainbow / Sphere gradients (`#D94F3C → #3B82A3`) | Sphere Devotions palette — wrong brand |
| Sky blue `#3A5A6D` as primary accent | Holger / email legacy; not public site |
| Full white page backgrounds | Breaks cinematic identity (OK inside `public-form-light` fields only) |
| Montserrat, Fraunces, Playfair as display | Not loaded on canonical site |

### 2.2 Typography

#### Font stack

| Role | Family | Weights | Usage |
|------|--------|---------|-------|
| **Display** | Newsreader | 300–700 | H1, H2, hero headlines, stat numbers, card titles |
| **Italic accent** | Instrument Serif | 300 italic | Emphasised words in headlines (*discernment*, pull quotes) |
| **Body** | Inter | 300–700 | Paragraphs, UI, buttons, nav |
| **Mono / labels** | IBM Plex Mono | 400, 500 | Eyebrows, section labels, metadata, step kickers |

#### Google Fonts URL (canonical)

```
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap
```

#### Type scale (public site)

| Element | Size | Notes |
|---------|------|-------|
| Hero H1 | `clamp(48px, 8.4vw, 108px)` | `.nb-display-hero`, weight 300 |
| Section H2 | `clamp(32px, 4.4vw, 60px)` | `.nb-display-lg` |
| Page title | `clamp(36px, 5vw, 56px)` | Inner pages |
| Body | `clamp(15px, 1.2vw, 17px)` | Line-height 1.7 |
| Body large | `clamp(17px, 1.4vw, 20px)` | Hero subcopy |
| Mono label | 11px | Letter-spacing `0.18em`, uppercase |

#### Typography rules

- Headlines: tight tracking (`-0.028em` to `-0.035em`), `text-wrap: balance` where supported.
- Accent words: Instrument Serif italic + `--nb-accent` colour (or underline at 45% accent mix).
- Never use all-caps for body copy; reserve uppercase for mono labels only.
- Article long-form: `text-wrap: pretty` on paragraphs.

### 2.3 Logo

#### Assets

| File | Path | Use |
|------|------|-----|
| Logo (wordmark) | `client/public/logo.png` | Header, footer, presentations |
| Logo (full) | `client/public/logo-full.png` | Wide layouts, print |
| Favicon | `client/public/favicon.png` | Browser tab, PWA |
| Portrait (OG) | `client/public/Nathaniel_Portrait.png` | Social sharing |

#### Usage

- On **dark** backgrounds: apply `filter: brightness(0) invert(1)` (`.nb-logo-invert` in codebase).
- On **light** form islands inside dark pages: use full-colour logo without invert.
- Minimum width: **120px** for legibility.
- Clear space: at least the height of the logomark on all sides.
- Do not stretch, rotate, add drop-shadows, or place on busy photography without a scrim.

### 2.4 UI components (public)

#### Primary CTA — `.nb-btn-primary`

```css
.nb-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 26px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #11c25c, #7ccc1e);
  color: #fff;
  font-family: Inter, system-ui, sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  box-shadow: 0 16px 40px color-mix(in srgb, #7ccc1e 25%, transparent);
}
```

**Label (standard):** `Book a free 30-min consultation`

#### Secondary CTA — `.nb-btn-secondary`

Text link with bottom border; hover shifts border to accent. No filled background.

#### Section label

Mono uppercase, optional numeric prefix in accent: `01 — How I help`

#### Cards / grids

- Rule grid: 1px gaps with `--nb-rule` background; cells have **top border** in `--nb-accent`.
- Raised sections: `--nb-bg-raised` + top rule border.

### 2.5 Imagery & photography

- **Hero:** Real portrait (`hero-portrait-wide.jpg` / `hero-portrait.jpg`), natural light, warm grade.
- **Treatment:** Dark gradient scrims over photos (`nb-hero-gradient-side`); never raw full-bleed text on faces.
- **Context shots:** Teaching, schools, mission field — human-centred, not stock “diverse team high-fiving.”
- **Avoid:** Generic AI brain illustrations, neon cyberpunk, cold corporate stock.

### 2.6 Motion & texture

- Subtle film grain acceptable on hero (`grain-subtle`).
- Scroll reveal: opacity + translate; respect `prefers-reduced-motion`.
- Hero photo: slow zoom (`nb-slowzoom`, 14s) — disable on mobile/reduced motion.
- Selection highlight: `rgba(124, 204, 30, 0.3)` on cream text.

---

## 3. Public routes using this brand

| Route | Page |
|-------|------|
| `/` | Homepage (hero, sections, footer) |
| `/about` | About Me |
| `/who-is-nathaniel-baldock` | Extended bio |
| `/speaking` | Speaking |
| `/resources` | Articles & resources index |
| `/resources/*` | Individual articles (public shell) |
| `/pricing` | Pricing |
| `/intake` | Consultation booking (form uses `public-form-light`) |
| `/privacy`, `/terms` | Legal (`.nb-prose` on dark shell) |

`/login` renders the sign-in form on the public shell; after authentication, users enter `data-theme="app"` (orange dashboard) — outside this document.

**Form islands:** Intake and similar forms wrap inputs in `public-form-light` so fields stay readable (white cards) on the dark page shell.

---

## 4. Voice & copy guidelines

### Tone checklist

- [ ] Lead with discernment and practical outcomes, not tool names.
- [ ] Name the audience (churches, schools, nonprofits) early.
- [ ] Acknowledge risk and safeguarding — don’t oversell AI.
- [ ] Use NZ spelling (*organisation*, *honour*) for NZ-facing copy.
- [ ] CTAs: conversation-first (“Book a free 30-min consultation”), not aggressive sales.

### Words to favour

Practical, wisely, guardrails, formation, mission-driven, discernment, grounded, shipped, training, safeguarding, clarity.

### Words to limit

Revolutionary, disruptive, game-changing, leverage (as buzzword), seamless, cutting-edge, unlock, synergy.

### Example eyebrow strings

- `AI Consulting · Tauranga · Aotearoa · Global`
- `Speaking · Faith & Education`
- `Free resource · AI & discipleship`

---

## 5. Key asset inventory (public site)

### Brand & identity

| Asset | Location |
|-------|----------|
| Brand guidelines (this file) | `docs/BRAND_IDENTITY_AND_GUIDELINES.md` |
| Cinematic CSS (React site) | `client/src/styles/cinematic.css` |
| Cinematic CSS (standalone HTML) | `client/public/audit-cinematic.css` |
| Public theme rule | `.cursor/rules/public-site-theme.mdc` |
| Branding + marketing package | `Nathaniel-Baldock-Complete-Branding-Package.md` |

### Logos & icons

| Asset | Location |
|-------|----------|
| `logo.png` | `client/public/logo.png` |
| `logo-full.png` | `client/public/logo-full.png` |
| `favicon.png` | `client/public/favicon.png` |

### Photography

| Asset | Location |
|-------|----------|
| Hero wide | `client/public/hero-portrait-wide.jpg` |
| Hero mobile | `client/public/hero-portrait.jpg` |
| OG / social portrait | `client/public/Nathaniel_Portrait.png` |
| Teaching | `client/public/Teaching-2.png` |
| School context | `client/public/School_Profile.png` |

---

## 6. Public site implementation checklist

When editing public React pages or `cinematic.css`:

- [ ] Page root has `nb-page`; layout sets `data-theme="public"`.
- [ ] CTAs use `nb-btn-primary` / `CinematicPrimaryCTA` — not shadcn orange `Button variant="default"`.
- [ ] Headlines use `nb-display` / Newsreader — not Inter bold for hero.
- [ ] Eyebrows use `nb-mono-label` or `SectionLabel`.
- [ ] Logo uses `nb-logo-invert` on dark header/footer.
- [ ] No light full-page backgrounds (`bg-neutral-50` strips) on marketing pages.
- [ ] Forms on public routes use `public-form-light` wrapper.

---

## 7. Quick reference card

```
BRAND:     Nathaniel Baldock
PROMISE:   Formation, not exploitation
LOOK:      Dark cinematic editorial
BG:        #0F1014
TEXT:      #F4EFE2
ACCENT:    #7CCC1E
CTA:       linear-gradient(135deg, #11C25C, #7CCC1E)
DISPLAY:   Newsreader
ACCENT IT: Instrument Serif italic
BODY:      Inter
LABELS:    IBM Plex Mono 11px uppercase
CTA COPY:  Book a free 30-min consultation
```

---

*Scoped to the public marketing website. Dashboard, worksheets, presentations, and programme materials are documented separately.*
