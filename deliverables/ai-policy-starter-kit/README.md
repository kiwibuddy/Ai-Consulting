# AI Policy Starter Kit

A self-serve, editable AI policy pack for New Zealand organisations. This is the
productised deliverable for the **AI Basic ($500 + GST)** audit tier — and the
sector-neutral master behind every custom policy engagement.

Prepared by Nathaniel Baldock — AI Consulting New Zealand & Global · nathanielbaldock.com

---

## What's in the kit

| # | File | What the customer gets |
|---|------|------------------------|
| 1 | `01-ai-policy-template.md` | Editable AI policy template — plain-language, bracketed fields, ready to adopt |
| 2 | `02-traffic-light-data-guide.md` | One-page Green / Amber / Red data + tools guide for the wall or staff handbook |
| 3 | `03-staff-acknowledgement-form.md` | Staff / volunteer acknowledgement form to sign on reading the policy |
| 4 | `05-website-ai-statements.md` | Four graduated public AI transparency statements (footer → dedicated page) + a case-for/against brief |

Plus four sector flavour intros in `sectors/` (business · church · not-for-profit ·
school) that swap the opening framing and examples so the same master reads
naturally for each audience.

`00-master-spec.md` is the source of truth — the distilled content all components are
built from. Edit the spec, then regenerate the components and exports.

**Sales / fulfilment layer (not part of the self-serve $500 download):**
`templates/cover-letter.md` — a genericised consultant→client covering letter for
facilitated / Ai Plus engagements.

---

## Where this fits in the product ladder

The **same master template** powers three price points. The only difference is how
much of it is filled in and tailored:

| Product | Price | What they receive |
|---------|-------|-------------------|
| **AI Basic** (audit tier) | $500 + GST | This kit as-is — blank template + Traffic Light guide + acknowledgement form. Self-serve. |
| **Ai Plus** (audit tier) | $1,500 + GST | The template filled in and tailored for the organisation. |
| **Sector Governance** (business / church / NGO) | $1,800 – $5,900 + GST | Facilitated build: discovery, custom policy, staff training, board-ready adoption. |
| **Schools Governance** | $3,500 – $8,500 + GST | Full schools framework build (9-part, NZQA/MoE aligned). |

This mirrors the IP position already stated in the Bethlehem College Letter of
Engagement: the consultant retains the right to reuse the underlying frameworks,
templates, and methodologies across engagements. The Starter Kit is that reusable
engine, sold blank at the entry tier.

---

## How the customer uses it (include this in the handover email)

1. Pick the sector flavour that fits you (business, church, not-for-profit, school).
2. Work through the template with your leadership team. Anything in **[square
   brackets]** is a prompt for you to write in your own voice — the framing should
   be yours, not ours.
3. Fill in your **Approved AI Tools** table and pin up the **Traffic Light** guide.
4. Have every staff member and key volunteer sign the **Acknowledgement Form**.
5. Adopt it, date it, and review it once a year.

> Want it written for you instead of DIY? That's Ai Plus ($1,500 + GST) or a
> facilitated Governance engagement. See nathanielbaldock.com/products.

---

## Regenerating the exports (and publishing the customer bundle)

Source of truth is Markdown. Editable `.docx` and styled `.pdf` files are generated
into `exports/`, **and the customer-facing bundle is published** into the served
static tree at `client/public/downloads/ai-policy-starter-kit/` (plus a zip of the
whole pack):

```bash
cd deliverables/ai-policy-starter-kit
.venv/bin/python build-exports.py
```

Requires macOS `textutil` (docx) and Google Chrome (pdf) — both already present on
the build machine. `.venv/` holds the one dependency (`markdown`). Re-run this
whenever the Markdown changes so the live downloads stay in sync.

---

## How customers receive it

**Paid — AI Basic ($500 + GST), instant delivery.** On successful Stripe checkout,
`processAuditCheckoutCompleted` (`server/lib/payments.ts`) sends
`auditPackagePurchaseEmail` (`server/lib/email.ts`), which now includes a
**download block** linking to the published files (zip + template + Traffic Light +
acknowledgement). All three tiers show it. The on-site success page copy
(`client/public/audit.html`, `PURCHASE_PACKAGE_META.basic`) also tells buyers the
kit is downloadable instantly.

**Free — gated lead-magnet sample.** A watermarked sample is served at
`/downloads/ai-policy-starter-kit-sample.pdf` behind an email-capture form on the
`/ai-policy-starter-kit` landing page. Flow:

- Landing page: `client/src/pages/ai-policy-starter-kit.tsx` +
  `client/src/components/lead-magnet-unlock-form.tsx`
- Definition: `shared/content/lead-magnets.ts`
- Endpoint: `POST /api/lead-magnet-request` (`server/routes.ts`) — persists the lead
  to the `lead_magnet_downloads` table and emails the sample via `leadMagnetEmail`.
- Lead capture requires the DB table: run `npm run db:push` once the database is
  reachable. Until then the endpoint still emails + reveals the download; the lead
  write is wrapped in try/catch and only logged if it fails.

---

## Grounding

Content distilled from real client work and 50 cited sources (UNESCO, OECD,
ISO/IEC 42001:2023, NIST AI RMF, NZ Privacy Act 2020 + Office of the Privacy
Commissioner, NZQA, MoE). Source documents live in
`Product review/AI Policy Product assets/`.
