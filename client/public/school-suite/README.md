# School Suite — Cinematic Light (Rebrand)

Rebranded school-facing marketing and print assets aligned to [`Nathaniel-Baldock-Complete-Branding-Package.md`](../Nathaniel-Baldock-Complete-Branding-Package.md) **Cinematic Public** identity, adapted for **print-friendly light backgrounds** (no full-page dark sheets).

**Start here for new meetings:** [`flyers/index.html`](flyers/index.html)

Original (Southern-sky) versions remain untouched in `site-assets/` and `planning/`.

---

## Old → new path map

| Original | Rebranded |
|----------|-----------|
| `site-assets/school-flyers/` | `brand-strategy/school-suite/flyers/` |
| `site-assets/school-outreach/proposal-shell.html` | `brand-strategy/school-suite/outreach/proposal-shell.html` |
| `planning/school-outreach/post-wednesday-email-templates.md` | `brand-strategy/school-suite/outreach/post-wednesday-email-templates.md` |
| `site-assets/educators-pd/*.html` | `brand-strategy/school-suite/educators-pd/` |
| `site-assets/pathway-compass.html` | `brand-strategy/school-suite/tools/pathway-compass.html` |
| `site-assets/highest-return-portfolio.html` | `brand-strategy/school-suite/tools/highest-return-portfolio.html` |
| `worksheets-tools/Edu_Worksheet_*.html` | `brand-strategy/school-suite/worksheets/` |

---

## Design system files

| File | Purpose |
|------|---------|
| `_cinematic-light.css` | **Source of truth** — core tokens + flyer/print components |
| `_cinematic-light-print.css` | A4 print overrides |
| `_cinematic-light-kit.css` | PD kit overrides (cover gradients, covenant blocks) |
| `_cinematic-light-landing.css` | Web landing var mapping (educators-pd index, tools) |
| `STYLE-GUIDE.md` | One-page reference for future school assets |
| `BRAND-GAP-AUDIT.md` | Before/after gap analysis |

Each subfolder has **local copies** of the CSS it needs (no `../` for styles or images) so Safari `file://` loads everything.

---

## How to open and print

1. Open from **`brand-strategy/school-suite/flyers/index.html`** — each folder is self-contained:
   - `flyers/cinematic-light.css` + `flyers/headers/*.png`
   - `outreach/cinematic-light.css` + `outreach/headers/`
   - `educators-pd/cinematic-light*.css` (kit + landing on index)
   - `tools/cinematic-light*.css`
   - `worksheets/cinematic-light.css`
2. Hard-refresh (**Cmd+Shift+R**) — images use `headers/*.png?v=5`.
3. **Print Preview** (Cmd+P) on A4 — body is white/cream; hero band only uses dark ink (~15–20% of page). Covenant poster uses A3.

**Sync CSS after token edits:** run `python3 _sync_cinematic_css.py` from this folder to copy root `_cinematic-light*.css` into all subfolders.

---

## Brand rules (summary)

- **Tagline:** Practical AI for people who lead with *discernment*.
- **Fonts:** Newsreader · Inter · Instrument Serif (italic accent) · IBM Plex Mono
- **Accent:** Lime `#7CCC1E` · CTA gradient `#11C25C` → `#7CCC1E`
- **Facts:** [`canonical-fact-sheet.md`](../canonical-fact-sheet.md) only
- **No testimonials** in any school asset

---

## Maintenance

New school marketing work goes in **`brand-strategy/school-suite/`** only. Do not extend the Southern-sky palette in `site-assets/school-flyers/`.

After editing `_cinematic-light*.css` at the suite root, run:

```bash
python3 brand-strategy/school-suite/_sync_cinematic_css.py
```
