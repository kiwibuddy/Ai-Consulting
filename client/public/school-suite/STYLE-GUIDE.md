# Cinematic Light — School Asset Style Guide

One-page reference for new school flyers, landings, and printables. Full brand: [`Nathaniel-Baldock-Complete-Branding-Package.md`](../Nathaniel-Baldock-Complete-Branding-Package.md).

---

## When to use

- Principal handouts, proposals, PD kit, student tools hosted as HTML
- **Not** the live dark marketing site (that stays `data-theme="public"` on nathanielbaldock.com)

---

## Tokens

```css
--nb-bg: #FFFFFF;
--nb-bg-warm: #F4EFE2;
--nb-ink: #0F1014;
--nb-ink-soft: rgba(15,16,20,.65);
--nb-accent: #7CCC1E;
--nb-green: #11C25C;
--nb-cta-gradient: linear-gradient(135deg, #11C25C, #7CCC1E);
--nb-hero-dark: #0F1014; /* hero band only */
--nb-cream: #F4EFE2;
```

---

## Typography

| Role | Font | Example class |
|------|------|---------------|
| Headlines | Newsreader 400 | `.nb-display`, `.hero h1` |
| Italic emphasis | Instrument Serif italic | `.nb-italic-accent`, `.hero h1 em` |
| Body | Inter | `.lede`, `.box` |
| Labels | IBM Plex Mono uppercase | `.tag`, `.sec-hd`, `.nb-section-label` |

Load Google Fonts in every HTML `<head>` (see `flyers/index.html` for the canonical URL). Copy `cinematic-light.css` into the **same folder** as the HTML file.

---

## Print rules

1. **Body:** white or `#F4EFE2` panels only — no full-page `#0F1014`.
2. **Hero:** ~200–260px band with photo + dark scrim; cream headline text.
3. **Accent:** lime borders, pills, section numbers — not blue or orange.
4. **CTAs:** `.nb-btn-primary` green gradient, or underlined lime link.
5. Link CSS: local `cinematic-light.css` + `cinematic-light-print.css`.

---

## Copy

- **Primary tagline:** Practical AI for people who lead with *discernment*.
- **Secondary:** Wisdom over hype. People over margins.
- **Section labels:** `01 — Policy & Governance` (mono, no emoji).
- **Voice:** Professional consulting register; apply [`voice-rules.md`](../voice-rules.md) hard bans (no em dashes in emails).
- **Facts:** [`canonical-fact-sheet.md`](../canonical-fact-sheet.md) only.

---

## File checklist (new asset)

- [ ] `cinematic-light.css` + `cinematic-light-print.css` in **same folder** as HTML (run `_sync_cinematic_css.py` after root edits)
- [ ] Header images in `headers/` subfolder next to HTML (no `../assets/`)
- [ ] Google Fonts `<link>` in `<head>` (charset + viewport first)
- [ ] No `#2451F5`, `#FF8A3C`, `#7C5CFC`, `#0A1633`, Bricolage, Instrument Sans
- [ ] Print Preview A4 before handout
