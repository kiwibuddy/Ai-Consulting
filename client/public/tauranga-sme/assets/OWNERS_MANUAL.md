# Tauranga SME — operator owner’s manual

Internal runbook for **you** (or staff) delivering the Bronze / Silver / Gold line. Lives next to gated-asset notes in `[README.md](./README.md)`.

**Tutorial-style playbook** (same visual language as Tauranga worksheets; long prose, reflection drills): on the deployed site open `**/resources/worksheet/tauranga-sme-operators-playbook`**. Source: `client/public/worksheets/tauranga-sme/operators-playbook.html` (registered in `client/src/content/worksheets.ts`). The HTML sets `**noindex, nofollow`** so it is omitted from typical search indexing.

---

## Quick map: what sells vs what ships


| Tier   | Stripe (env)                   | Automated email                            | Your human delivery                                                                            |
| ------ | ------------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Bronze | `STRIPE_PRICE_TAURANGA_BRONZE` | Worksheets + 4 deck links (+ video link)   | 1× email Q&A within 7 days; **verify cheat-sheet promise** ([gap](#productcopy-vs-email-gaps)) |
| Silver | `STRIPE_PRICE_TAURANGA_SILVER` | + gated templates + `SILVER_BOOKING_URL`   | 60‑min call (record + transcript); tool stack memo; Pilot prep doc; 30‑day email               |
| Gold   | `STRIPE_PRICE_TAURANGA_GOLD`   | + Te Tiriti checklist + `GOLD_BOOKING_URL` | ~20‑page Adoption Plan; 4× fortnightly check-ins; workshop; sovereignty + IP artefacts         |


Display copy and bullets: `**client/src/content/products.ts`** (keep in sync with `**server/lib/products.ts`**).

---

## Environment variables

Set in production `.env` (never commit `.env`). Reference: `**.env.example`** Tauranga block.

### Required for paid checkout


| Variable                       | Purpose                             |
| ------------------------------ | ----------------------------------- |
| `STRIPE_SECRET_KEY`            | API access                          |
| `STRIPE_WEBHOOK_SECRET`        | Verify `checkout.session.completed` |
| `STRIPE_PRICE_TAURANGA_BRONZE` | Price ID (`price_...`) for 197 SKU  |
| `STRIPE_PRICE_TAURANGA_SILVER` | Price ID for 497 SKU                |
| `STRIPE_PRICE_TAURANGA_GOLD`   | Price ID for 2,497 SKU              |


### Strongly recommended (emails & links)


| Variable             | Purpose                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `APP_URL`            | Server base URL; used with `Origin` fallback for Stripe success/cancel URLs                         |
| `PUBLIC_SITE_URL`    | Public marketing domain in outbound email footers / absolute links (`server/lib/email.ts` patterns) |
| `SILVER_BOOKING_URL` | In Silver access email (“Pick a time”). Fallback: intake URL in `server/lib/products.ts`            |
| `GOLD_BOOKING_URL`   | In Gold access email (kickoff). Same fallback                                                       |


### Email delivery


| Variable             | Purpose                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Sending access email via Resend                                                     |
| `RESEND_FROM_EMAIL`  | From line                                                                           |
| `SITE_CONTACT_EMAIL` | Operator receives BCC copy of each access email (`[Tauranga SME · tier] Sale to …`) |


---

## Stripe & webhook checklist

- Three **Products** in Stripe (NZD) with **Prices**: 197, 497, 2,497 — paste Price IDs into env vars above.
- Webhook endpoint receives `**checkout.session.completed`** (same pipeline as rest of payments; product branch keyed by `metadata.productSlug === "tauranga-sme"`).
- Test mode: complete a test checkout → buyer receives `**taurangaAccessEmail`** → operator receives BCC.
- Click **every link** in the email (worksheets, four sessions, gated assets, booking, walkthrough).
- Before **live**: repeat in live mode with small real payment or Stripe test-clock if you use one.

Route that starts checkout: `**POST /api/public/products/checkout`** — body `{ "tier": "bronze" | "silver" | "gold" }` (see `**server/routes.ts`**).

---

## Fulfillment checklist (after each sale)

### All tiers

- Confirm access email arrived (buyer + your BCC).
- File Stripe receipt mentally: **audit trail** (no `product_purchases` DB row in v1 — see `**server/lib/payments.ts`** `processProductCheckoutCompleted`).

### Bronze

- Monitor inbox for bounded Q&A (**7 days** per product copy).
- Deliver **Priority One cheat-sheet** if still promised on sales page (`products.ts`); not currently a dedicated row in `**TaurangaAccessEmailLinks`** — bundle as static PDF/link or align copy ([see gaps](#product-copy-vs-email-gaps)).

### Silver

- Buyer books via `**SILVER_BOOKING_URL`**.
- Deliver **recording + transcript** after call.
- Produce **NZ tool stack recommendation** + **Pilot prep document** as separate artefacts (templates live outside this repo unless you add them).

### Gold

- Schedule kickoff via `**GOLD_BOOKING_URL`**.
- **Within 1–2 business days** personal outreach (matches welcome copy expectation).
- Produce **written AI Adoption Plan** (~20 pp), cadence of **30‑min fortnightly × 4**, **90‑min workshop**, **Te Tiriti / MDS**, **copyright/IP statement** per tier list.

---

## Pre-go-live (product assets)

### Static worksheets & decks (already in repo under `public/`)

Registered in `**client/src/content/worksheets.ts`**:


| Resource            | Path                                                                |
| ------------------- | ------------------------------------------------------------------- |
| Readiness worksheet | `/worksheets/tauranga-sme/readiness.html`                           |
| Time audit          | `/worksheets/tauranga-sme/time-audit.html`                          |
| Team                | `/worksheets/tauranga-sme/team.html`                                |
| Legal               | `/worksheets/tauranga-sme/legal.html`                               |
| Presentation S1–S4  | `/worksheets/tauranga-sme/presentation/01-readiness/` … `04-legal/` |


### Gated downloads (THIS folder tree)

`**server/lib/products.ts` → `buildAccessLinks()`** builds URLs shaped as:

`/tauranga-sme/assets/<random-base64url>/nz-privacy-impact-assessment-template.pdf`  
(and parallel paths for AI policy PDF, tool register XLSX, Te Tiriti PDF, plus walkthrough base path.)

- For each deployed slug pattern, hosting must serve those files (**symlink**, **CDN rule**, **or** change code to fixed slugs per `**README.md`** recommendation).
- Populate files before Silver/Gold go live:


| Relative to `assets/`              | File (as referenced in code URLs)                |
| ---------------------------------- | ------------------------------------------------ |
| `<slug>/`                          | `nz-privacy-impact-assessment-template.pdf`      |
| `<slug>/`                          | `internal-ai-use-policy-template.pdf`            |
| `<slug>/`                          | `ai-tool-register-template.xlsx`                 |
| `<slug>/`                          | `te-tiriti-maori-data-sovereignty-checklist.pdf` |
| `<slug>/four-session-walkthrough/` | `index.html` (+ videos when ready)               |


**Note:** `[README.md](./README.md)` describes an alternate *folder-per-asset* layout (`pia/`, `tool-register/`…); the **shipping code today** expects **flat filenames under one random slug per email send**. Operators must reconcile deploy layout with `**buildAccessLinks()`** until refactored.

### Product copy vs email gaps

- **Bronze:** “Priority One conversation cheat-sheet (1-page)” is in `**products.ts`** / server mirror — ensure buyers receive it (email section, worksheet annex, or static link).
- **Silver:** “Tool stack recommendation” and “Prep document for Pilot” are **consultant-produced**, not wired in repo.
- **Sessions 2–4:** Product promises **preview now, full release on launch** — track parity with Session 1 (slides + citations) before marketing “complete programme.”

---

## Customer journey (five “zero → hero” arcs)

Use these when writing onboarding emails or refining `/tauranga-sme`:

1. **Readiness:** Overwhelmed → worksheets + Session 1 → clear **score**, **risks**, **one next step** aligned with advisory questions.
2. **Time audit:** “AI might help?” → prioritized **tasks** and **experiments**, not vendor shopping yet.
3. **Team:** Avoiding awkward conversations → framed **discussion guide** + roles exposure.
4. **Legal:** Ad-hoc tools → **Privacy / copyright literacy** + (Silver+) **templates**.
5. **Pilot path:** Wants subsidy clarity → Silver/Gold **human prep + Adoption Plan artefact**; **their** eligibility lives with **Priority One / RBPN**, not with your Stripe charge.

Sales page FAQ copy (Pilot numbers, eligibility) lives in `**client/src/pages/tauranga-sme.tsx`** — **reconcile with official partner comms** before scaling ads.

---

## Partners, Pilot, councils — operational rules

**Technical reality:** No MBIE/Priority API integration — narrative + FAQ only.

**Commercial reality:** Stripe payment is **your** revenue. **Pilot / co-funding** is a **separate** pathway the client pursues with **Priority One**. Position as *aligned prep and deliverables*, never “purchase includes guaranteed grant.”

**Branding:** Do not imply endorsement or use logos without **written approval** + agreed claim list.

Suggested ladder: (1) factual one-pager to partner; (2) resource-list / newsletter mention; (3) co-branding with legal review; (4) formal MOU/subcontract — outside default product scope.

---

## Source data / answering “where’s this stat?”


| Surface             | Where to look                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Session 1 deck      | `client/public/worksheets/tauranga-sme/presentation/01-readiness/` — citations / modal DB (`_shared` as applicable). |
| Sales sources strip | `client/src/pages/tauranga-sme.tsx` outbound links                                                                   |
| Worksheets          | In-page callouts → trace to deck bibliography or cited URL                                                           |


Maintain a lightweight **claims register** (spreadsheet): claim → URL/PDF → date reviewed.

---

## Key code references


| Concern                          | File                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| Product definitions (client)     | `client/src/content/products.ts`                                                      |
| Checkout session + webhook email | `server/lib/products.ts`, `server/lib/payments.ts`                                    |
| Access email HTML                | `server/lib/email.ts` (`taurangaAccessEmail`)                                         |
| Public checkout API              | `server/routes.ts` (`POST .../products/checkout`)                                     |
| Routes/pages                     | `client/src/App.tsx`, `client/src/pages/tauranga-sme.tsx`, `tauranga-sme-welcome.tsx` |


---

## Disclaimer

Pilot **budget figures**, **eligibility**, and **rebate mechanics** change. Prefer **linking to official RBPN/MBIE/Priority materials** over freezing numbers in prose. This manual describes **warehouse implementation**, not legal or tax advice.