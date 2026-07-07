# School Suite Brand Gap Audit

**Date:** 2026-07-06  
**Reference brand:** [`Nathaniel-Baldock-Complete-Branding-Package.md`](../Nathaniel-Baldock-Complete-Branding-Package.md) (Cinematic Public)  
**Facts:** [`canonical-fact-sheet.md`](../canonical-fact-sheet.md)  
**Rebrand output:** [`brand-strategy/school-suite/`](.)

---

## Executive summary

All school-facing HTML and outreach copy used a **Southern-sky** design system (Bricolage Grotesque, Instrument Sans, azure `#2451F5`, sunrise `#FF8A3C`, white/blue panels) that contradicted the live **Cinematic Public** brand (Newsreader, Inter, lime `#7CCC1E`, dark web shell). Classroom worksheets used a **third legacy** stack (Playfair + DM Sans).

Rebranded copies in `school-suite/` apply **Cinematic Light**: full brand typography and lime accent on **print-safe white/cream bodies** (hero band only uses dark scrim).

---

## 1. Visual gaps (before)

| Issue | Where found | Fix in rebrand |
|-------|-------------|----------------|
| Bricolage Grotesque display font | All flyers, educators-pd, tools, proposal shell | Newsreader |
| Instrument Sans body | Same | Inter |
| Azure/orange/violet palette | `_flyer-base.css`, inline `:root` blocks | Lime + cream panels via `_cinematic-light.css` |
| Blue gradient price bars | Flyers, cred-strip navy gradient | Warm cream bars + lime left border |
| Orange dashed fill pills | Proposal shell | Cream fill + lime underline |
| Playfair + DM Sans | Edu worksheets, Contact Card pattern | Newsreader + Inter |
| Full-page dark backgrounds | N/A (old suite was white) | Explicitly avoided — light body only |

---

## 2. Messaging gaps (before)

| Drift | Example (old) | Rebrand direction |
|-------|---------------|-------------------|
| Generic consultancy tone | "measurable outcomes", "Best value", "Full stack" | "Practical AI", "Recommended bundle", "Complete engagement" |
| Lane jargon | "Lane A / Lane B" + emoji headers | "01 — Policy & Governance" / "02 — Formation & Pathways" |
| Bio line | "AI consultant, speaker, and theological educator" | YWAM since October 2003 + discernment framing |
| Missing tagline | Ad-hoc per flyer | "Practical AI for people who lead with discernment" |
| Corporate-only policy pitch | Compliance without formation context | Two services: governance + formation |

---

## 3. Fact integrity (checked)

| Claim | Status | Rebrand handling |
|-------|--------|------------------|
| YWAM since 2003 | Drift | → **since October 2003** (canonical) |
| 416 passages / 8 spheres | OK in leave-behind | Kept |
| 23 years / 35+ nations | OK | Kept on credentials strip |
| SourceView two apps (2016 / 2025) | OK | Kept |
| 12 Tauranga schools gap analysis | OK (consulting context) | Kept |
| 400+ leaders trained | Unverified | **Not added** to rebrand |
| Testimonials | Must not publish | **None** in rebrand |

---

## 4. File inventory

### Flyers (`flyers/`)

| File | Visual | Copy | Facts |
|------|--------|------|-------|
| `index.html` | **Done** — self-contained CSS, hub cards | Tagline + italic discernment | — |
| `principal-leave-behind.html` | **Done** — print tighten pass | Lanes, bio, offers | YWAM October 2003 |
| `educators-pd.html` | **Done** | Frameworks kept | Pricing unchanged |
| `pathway-compass.html` | **Done** | Tool link to `../tools/` | — |
| `highest-return-portfolio.html` | **Done** | — | — |
| `whole-school-day.html` | **Done** | "Recommended" | — |
| `student-assembly.html` | **Done** | — | — |
| `parent-evening.html` | **Done** | — | — |
| `ai-policy-governance.html` | **Done** | — | Tiers unchanged |
| `classroom-worksheets.html` | **Done** | Worksheet paths + lime links | — |

### Outreach (`outreach/`)

| File | Status |
|------|--------|
| `proposal-shell.html` | **Done** — local CSS + header, footer link fixed |
| `post-wednesday-email-templates.md` | **Done** — brand line, paths, em-dash scan |

### Educators PD (`educators-pd/`)

| File | Status |
|------|--------|
| `index.html` | **Done** — local CSS, tool links fixed |
| `facilitator-deck.html` | **Done** — `#0F1014` deck chrome |
| `facilitator-guide.html` | **Done** — tool links |
| `participant-workbook.html` | **Done** — cinematic cover, print breaks |
| `parent-onepager.html` | **Done** — single A4 |
| `staffroom-covenant-poster.html` | **Done** — A3 print |

### Tools (`tools/`)

| File | Status |
|------|--------|
| `pathway-compass.html` | **Done** — lime CTAs, local CSS, dial gradient |
| `highest-return-portfolio.html` | **Done** — token sweep, local CSS |

### Worksheets (`worksheets/`)

| File | Status |
|------|--------|
| `Edu_Worksheet_1_VERIFY_Method.html` | **Done** — Newsreader/Inter, print margins |
| `Edu_Worksheet_2_Prompt_Engineering.html` | **Done** — Same |
| `Edu_Worksheet_3_What_Is_School_For.html` | **Done** — Same |

---

## 5. Remaining founder review

- [x] Safari `file://` self-contained CSS per folder (finishing pass 2026-07-06)
- [x] Google Fonts + viewport on all 22 HTML files
- [x] Broken internal links fixed (proposal shell, educators-pd tool links)
- [ ] Print Preview each A4 flyer on your machine — confirm no page-2 overflow for your printer
- [ ] Decide when to retire Southern-sky originals from active use (originals preserved on disk)
- [ ] Re-verify "400+ leaders trained" before adding to any school surface

---

## 6. Finishing pass (2026-07-06)

- `_sync_cinematic_css.py` — copies root CSS into `flyers/`, `outreach/`, `educators-pd/`, `tools/`, `worksheets/`
- `_finishing_pass.py` — head standardization, token sweep, link fixes (re-runnable)

---

*Audit complete. Originals unchanged in `site-assets/` and `planning/`.*
