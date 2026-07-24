# Fulfilment & product notes

## How the Basic tier hands this over

When someone buys **AI Basic ($500 + GST)**, the deliverable is this kit:

1. `exports/01-ai-policy-template.docx` — editable policy template
2. `exports/02-traffic-light-data-guide.pdf` — print-ready one-pager (+ `.docx` if they want to edit)
3. `exports/03-staff-acknowledgement-form.docx` — acknowledgement form
4. The matching **sector flavour** page (business / church / NGO / school) so they
   know which framing and examples to use.

Suggested handover email line:

> Here's your AI Policy Starter Kit — an editable policy template, a one-page Traffic
> Light data guide, and a staff acknowledgement form. Start with the sector flavour
> that fits you, fill in anything in [square brackets] in your own words, and adopt
> it with your team. Want it written for you instead? That's Ai Plus, or a
> facilitated Governance engagement.

**Wiring TODO (not yet done):** decide delivery mechanism — attach the files to the
Basic purchase confirmation email, or host them behind an unlock link. The audit
purchase email template lives in `server/routes/audit.ts`; the Basic tier metadata
lives in `client/public/audit.html` (`PURCHASE_PACKAGE_META`).

---

## How the same master powers the paid custom work

| Product | What we do with this master |
|---------|------------------------------|
| Ai Plus ($1,500) | Fill in the brackets and tailor for the one organisation. |
| Sector Governance ($1,800–$5,900) | Facilitated: discovery + custom policy + staff training + board adoption. |
| Schools Governance ($3,500–$8,500) | Swap in the full 9-part schools framework (NZQA/MoE aligned). |

This is consistent with the Bethlehem College Letter of Engagement clause: the
consultant retains the right to reuse the underlying frameworks, templates, and
methodologies across engagements.

---

## ⚠️ Pricing reconciliation flag — schools/governance vs Bethlehem letter

We recently lowered the schools tiers to **$3,500 / $5,900 / $8,500** (Enhancement /
Standard / Full Build).

The `Bethlehem_College_Letter_of_Engagement_v1.0` quotes:

> "Standard Tier — Full AI Policy Build (Phases 1–3)" · **NZD $8,500** · ~10 weeks

So the **same $8,500 figure** now maps to **"Full Build"** on the site but is called
**"Standard Tier"** in the letter. If that engagement letter is live or about to be
sent, reconcile one of two ways:

- **Option A (recommended):** update the letter to match the new site ladder — either
  reprice the Bethlehem engagement to the new "Full Build" ($8,500, name change only)
  or to "Standard" ($5,900) if scope allows.
- **Option B:** if Bethlehem is already committed at $8,500 for that scope, leave the
  letter and note that it predates the new public pricing.

Nothing else in the research contradicts `/schools/governance` — the 9-part
framework, the "50-source" claim, and the NZQA/MoE/Privacy Act references all check
out against the source documents.

---

## Not verified / founder decisions still open

- Delivery mechanism for the Basic tier files (email attachment vs gated download).
- Whether to also publish a public **sample/preview** of the template (watermarked)
  as a lead magnet on `/products`.
- Bethlehem pricing reconciliation (above).
