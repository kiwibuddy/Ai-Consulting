# AI Use Audit — Content Export

> Generated from Coaching-hub source files for review and offline processing.
> Export date: 2026-05-31

## Source files

| File | Role |
|------|------|
| `client/public/audit.html` | UI copy, flow, tools database, scoring logic |
| `client/public/audit-policies.js` | Vendor policy explainers (modal + emails) |
| `client/public/audit-countries.js` | Country dropdown list |
| `client/public/audit-cinematic.css` | Visual styling |
| `client/public/audit-hero-carousel.js` | Hero image carousel |
| `server/routes/audit.ts` | API, emails, pricing CTAs |

**Live URLs:** `/audit` (owner + team via `?team=TOKEN&biz=Name`), `/companion` (consultant briefing), `/api/audit/*`

---

## What the audit does

A guided survey that:
1. Collects optional business context (name, country, sector, team size).
2. Optionally invites team members to an anonymous 5-minute parallel survey.
3. Lets the owner select AI tools in use and answer per-tool questions (plan/tier, data sensitivity, review habit).
4. Scores each tool+tier as **green** (Good to go), **amber** (Check this), or **red** (Act now / Review settings).
5. Emails personalised results (no audit content stored in DB — transient processing + `audit_sessions` token counts only).

---

## Owner flow (5 steps)

### Step 1 — Welcome + business info

- **Kicker:** AI Use Audit · 10 minutes
- **Title:** Clarity on AI *for business, church or school*
- **Intro:** A simple walk-through to see what AI tools are in use, what's safe to keep doing, and what needs a small adjustment. No jargon, no scare tactics, no tech knowledge required — just clear answers you can act on.
- **How this works:** Your audit answers aren't saved to any database — they stay in your browser while you fill them in. When you submit, your personalised results go straight to your inbox, and a copy is sent to Nathaniel so he can offer deeper insights on a follow-up call if you'd like one.

**Fields:**
- Business name (optional)
- Country (dropdown, default New Zealand)
- Sector: Professional services; Trades and construction; Retail and hospitality; Health and wellness; Real estate and property; Creative and marketing; Not-for-profit; Primary school; Secondary school; Tertiary education; Church; Missions organisation; Other
- Team size: 1–5; 6–10; 11–20; 20+ staff

**Optional team invites:**
- Label: Optional · Invite your team for a fuller picture
- Copy: Totally optional — most owners do this audit alone first. Anonymous 5-minute survey; 2-day window + reminder email.

**Privacy / consent:**
- Data emailed via Resend (US); nothing stored in database.
- Team surveys anonymous; individual responses never shared with owner.
- IPP 12 NZ Privacy Act cross-border disclosure notice.
- Consent checkbox required to start.
- CTA: **Start my survey →**

### Step 1b — Team invited (if emails added)

- **Title:** Your team has been invited
- Note: 2 days to complete; reminder if not done; full picture on follow-up call.
- CTA: **Now let's do yours →**

### Step 2 — Tool selection

- **Kicker:** Step 2 — Tools
- **Title:** Which tools does *your team use?*
- **Sub:** Tick everything, including tools used on personal accounts.
- Tools grouped by category (see Tools database below).
- CTA: **Rate selected →**

### Step 3 — Per-tool questions (repeat for each selected tool)

1. **Which plan does your team use?** (tier options per tool)
2. **What kind of information goes into it?**
   - *public* — Just public stuff — drafts, ideas, general questions
   - *internal* — Internal business info — plans, notes, operations
   - *personal* — Customer or staff personal details
3. **Does someone review the output before it's used?**
   - *always* — Always / Every output checked
   - *usually* — Usually / Most of the time
   - *rarely* — Often not / Goes straight out

Live RAG bar updates as answers are chosen.

### Step 4 — Review and send

- **Title:** Here's what *we found*
- Summary counts (red / amber / green) + per-tool cards with warnings, flags, actions, policy modal link.
- **Who should receive the results?** Consultant email pre-filled; add/remove recipients.
- **Free / Included:** Report emailed instantly; no server storage.
- CTA: **Send my results →**
- Paid upgrade cards (see Pricing).

### Step 5 — Done

- **Title:** Done — results sent
- Quick wins section (dynamic)
- **Book a follow-up call** (Google Calendar link)
- Paid pricing repeat
- Footer: Prepared by Nathaniel Baldock AI Consulting; drafted with AI assistance, reviewed by Nathaniel.

---

## Team member flow (3 steps)

URL: `/audit?team={token}&biz={encodedBusinessName}`

### Team Step 1

- **Title:** How is AI *helping your work?*
- Intro: Employer building a picture; ~5 minutes.
- Anonymous by default; optional name toggle.
- CTA: **Start the survey →**

### Team Steps 2–3

- Same tool grid and per-tool questions as owner.
- Extra field: **How is this helping your work?** (optional textarea) — not shown to employer individually.

### Team completion overlay

- Thank you; explains no email confirmation (anonymity).
- Results to consultant only; owner sees summary on follow-up call.

---

## Team invite emails (server)

**Invite subject:** `{bizName} — a quick question about how you use AI at work`

Key copy: Kia ora; 5 minutes; anonymous; no wrong answers; survey closes in 2 days; responses to independent consultant, never shared with owner.

**Reminder (48h):** `Just a nudge — {bizName} AI survey closes tomorrow`

---

## Scoring model

```
data sensitivity:  public=1, internal=2, personal=3
review habit:      always=1, usually=2, rarely=3
tier vendorRisk:   1 (low) | 2 (medium) | 3 (high) — per tier in TOOLS

pe = privacy exposure from data + ipp12 + vendor risk
ai = AI-use risk from data + review habit
overall = max(data, review, vendorRisk, pe, ai)
rag = overall 3 → red, 2 → amber, 1 → green

ragLabel red:  "Act now" OR "Review settings" (if red only from vendor tier, low data/review)
ragLabel amber: "Check this"
ragLabel green: "Good to go"
```

**Flags (when triggered):**
- Sensitive data in an unsafe tool
- Personal data — unreviewed output
- High-impact use with little oversight
- Tool may train on this data by default

**Tier fields:** `trainingOn`, `ipp12` (overseas disclosure / IPP 12 note in emails), `action`, `warning`

---

## Pricing packages

| Package | Price | Includes |
|---------|-------|----------|
| AI Basic | $500 NZD | Emailed report + team results; 30-min review call; custom AI policy/governance doc |
| Ai Plus | $1,500 NZD | Everything in Basic + 45-min policy walkthrough; 4 custom usage statements (web, email footer, docs) |
| AI Premium | $2,500 NZD | Everything in Plus + team-specific usage doc; 90-min team training; 6-month review call |

Note on page: Package names and pricing are indicative — confirmed on free review call.

---

## Tool categories

- **AI Assistants** (`assistants`) — Chat and analysis tools
- **Writing and Work Tools** (`writing`) — AI inside everyday apps
- **Creative Tools** (`creative`) — Design, image and video
- **Meetings and Voice** (`meetings`) — Recording and transcription

---

## Tools database (17 tools)

### 💬 ChatGPT (`chatgpt`)

- **Vendor:** OpenAI
- **Category:** AI Assistants

#### Tier: Free account (`free`)

| Field | Value |
|-------|-------|
| Note | Standard free |
| Vendor risk (1–3) | 3 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Consumer data used for training by default. |
| Recommended action | Settings › Data Controls › toggle off "Improve the model for everyone" |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/) |

**Policy summary:** Prompts and responses are used by default to train OpenAI's foundation models, and may be reviewed by humans for quality assurance.

**Explainer:**
- When you use ChatGPT Free, every message you send becomes part of OpenAI's training data unless you explicitly opt out. That includes spreadsheets you paste, client details, draft emails, and code — anything in the conversation. A small fraction of those conversations are also reviewed by human moderators for safety and quality.
- The most important thing to know about the opt-out: it's forward-looking only. Anything OpenAI has already used to train a model cannot be removed from that model. So the safer path for business work is to switch to ChatGPT Team or Enterprise, which contractually exclude your conversations from training — or use a Temporary Chat if you must use a free account.

**Sources:**
- [How your data is used to improve model performance (OpenAI Help)](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)
- [OpenAI data controls FAQ](https://help.openai.com/en/articles/7730893-data-controls-faq)

#### Tier: Plus ($20/month) (`plus`)

| Field | Value |
|-------|-------|
| Note | Paid personal plan |
| Vendor risk (1–3) | 3 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Same training exposure as free tier. |
| Recommended action | Settings › Data Controls › toggle off "Improve the model for everyone" |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/) |

**Policy summary:** Paying $20/month doesn't change the training defaults — Plus uses the same consumer-tier terms as Free.

**Explainer:**
- ChatGPT Plus gives you priority access and newer models, but it sits on exactly the same consumer privacy terms as the free tier. Your conversations are used to train OpenAI's models unless you turn off "Improve the model for everyone" in Settings → Data Controls.
- If you do disable training, your chat history is preserved in the web interface, but the opt-out only protects future conversations — past ones are already in the training pipeline. For sensitive business work, Team or Enterprise is the right fit; for casual personal use, Plus with training off is workable.

**Sources:**
- [How your data is used to improve model performance (OpenAI Help)](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance)

#### Tier: Team or business plan (`team`)

| Field | Value |
|-------|-------|
| Note | Shared workspace |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | No model training on workspace data. |
| Recommended action | Admin Workspace Settings › confirm data sharing disabled. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [OpenAI Business Data Privacy](https://openai.com/business-data/) |

**Policy summary:** Customer data is excluded from model training by default and isolated to your workspace.

**Explainer:**
- ChatGPT Team and Enterprise plans are governed by OpenAI's Business Terms, which contractually prohibit OpenAI from using your inputs or outputs to train its foundation models. Your workspace is isolated from other customers and admins control role-based access for custom GPTs, integrations, and external actions.
- This is the tier I generally recommend for any business that wants people using ChatGPT — it removes the main category of risk (your prompts feeding a public model) without removing the everyday utility staff get from the tool.

**Sources:**
- [Business data privacy, security, and compliance (OpenAI)](https://openai.com/business-data/)
- [ChatGPT Enterprise security](https://openai.com/enterprise-privacy/)

### 🔷 Microsoft Copilot (`copilot`)

- **Vendor:** Microsoft
- **Category:** AI Assistants

#### Tier: Standalone / free Copilot (`standalone`)

| Field | Value |
|-------|-------|
| Note | copilot.microsoft.com |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Consumer version trains on data by default. |
| Recommended action | Profile › Settings › Privacy › turn off training. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) |

**Policy summary:** Standalone (free) Copilot logs your conversations and uses personalisation data to improve consumer models unless you opt out.

**Explainer:**
- The free Copilot at copilot.microsoft.com is consumer-tier: personalisations, search histories, and conversation logs are captured by default to train Microsoft's consumer models. Users authenticated through a business Entra ID (Azure AD) account are treated differently, and users under 18 are excluded from training.
- To turn training off on a personal Microsoft account: open your profile → Settings → Privacy, then disable "Training on conversation activity" and "Training on voice conversations". For any business use, you really want to be on Microsoft 365 Copilot instead.

**Sources:**
- [Microsoft Copilot privacy (Microsoft Support)](https://support.microsoft.com/en-us/copilot)

#### Tier: Microsoft 365 Copilot (`m365`)

| Field | Value |
|-------|-------|
| Note | Business subscription |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Enterprise Data Protection. No model training. |
| Recommended action | Apply Purview sensitivity labels to tenant. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Microsoft 365 Copilot Enterprise Data Protection](https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection) |

**Policy summary:** Governed by the Enterprise Data Protection framework — your tenant data stays inside your tenant and is never used for training.

**Explainer:**
- Microsoft 365 Copilot is built on top of your Microsoft 365 tenant, which means it inherits all the data-protection guarantees of your existing Microsoft 365 contract: the Data Processing Addendum (DPA), Product Terms, and the Enterprise Data Protection (EDP) framework. Your documents, emails, and prompts never leave the tenant boundary and are never used to train Microsoft's foundation models.
- It also respects existing controls — Purview sensitivity labels, DLP policies, and retention rules all apply automatically. This is one of the strongest privacy postures in this audit, provided your admin has the standard Purview controls turned on.

**Sources:**
- [Enterprise data protection in Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection)
- [Microsoft 365 Copilot data security FAQ](https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy)

### 🔮 Google Gemini (`gemini`)

- **Vendor:** Google
- **Category:** AI Assistants

#### Tier: Free or personal account (`consumer`)

| Field | Value |
|-------|-------|
| Note | gemini.google.com |
| Vendor risk (1–3) | 3 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Human-reviewed conversations retained up to 3 years. |
| Recommended action | Settings › Gemini Apps Activity › turn off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Gemini Apps Activity controls](https://myactivity.google.com/product/gemini) |

**Policy summary:** Gemini Apps Activity is on by default. De-identified prompts can be reviewed by humans and stored for up to 3 years.

**Explainer:**
- On any personal Google account (not a Workspace business account), Gemini Apps Activity is enabled by default. A sample of your conversations is reviewed by human raters and retained for up to three years to improve Google's models. This setting applies to anything you do at gemini.google.com or in the Gemini app on your phone.
- Turning Apps Activity off stops human review and training — but it also disables conversation history beyond 72 hours. That trade-off is deliberate on Google's part: it discourages people from opting out. For business use, you want to be on Gemini for Workspace, which excludes data from training without losing history.

**Sources:**
- [Gemini Apps & your data (Google)](https://support.google.com/gemini/answer/13594961)

#### Tier: Gemini for Workspace (`workspace`)

| Field | Value |
|-------|-------|
| Note | Business Google account |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | No human review. No model training. |
| Recommended action | Admin Console › set regional data residency. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Gemini for Workspace Privacy](https://workspace.google.com/security/ai-privacy/) |

**Policy summary:** Customer inputs, files, and drafts stay inside your Workspace domain — excluded from training, no human review.

**Explainer:**
- Gemini for Workspace runs under the same enterprise data protections as the rest of Workspace: ISO 27001/42001, BSI C5, HIPAA-compliant. Your prompts, the files Gemini accesses in Drive, and any drafts it produces are never used to train Google's models and are never reviewed by humans.
- Admins can also pin regional data residency (EU or US) and use Workspace DLP to restrict what kinds of sensitive data leave the org. This is one of the safest configurations in the audit when set up correctly.

**Sources:**
- [Gemini for Workspace security & privacy](https://workspace.google.com/security/ai-privacy/)

### 🤖 Claude (`claude`)

- **Vendor:** Anthropic
- **Category:** AI Assistants

#### Tier: Free or Pro account (`consumer`)

| Field | Value |
|-------|-------|
| Note | claude.ai personal |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Since Sept 2025 consumer accounts train on conversations by default. |
| Recommended action | Settings › Privacy › turn off "Help improve Claude". |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Claude consumer privacy settings](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings) |

**Policy summary:** Since September 2025, Anthropic uses Free/Pro conversations to train Claude unless you opt out. Safety-flagged chats may still be processed.

**Explainer:**
- Anthropic changed their stance in 2025: by default, consumer Free and Pro Claude accounts now permit Anthropic to use your prompts, documents, and code to train future models. You have to actively go into Menu → Settings → Privacy and turn off "Help improve Claude" to opt out — and even then, conversations that get flagged by their safety systems can still be processed for safety training.
- The other lever is feedback buttons (thumbs up / thumbs down). Submitting feedback uploads that conversation to Anthropic regardless of your training setting, so the conservative rule is: don't click feedback buttons on consumer Claude. For team work, use Claude for Work instead.

**Sources:**
- [Is my data used for model training? (Claude)](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training)

#### Tier: Claude Team / for Work (`team`)

| Field | Value |
|-------|-------|
| Note | claude.ai/work |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Commercial workspace isolation. No model training. |
| Recommended action | Admin Settings › Data and Privacy › confirm training off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Claude Team / Enterprise data policy](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training) |

**Policy summary:** Workspace data, inputs, and files are excluded from model training by default. Workspaces are isolated from each other.

**Explainer:**
- Claude for Work (Team, Pro, and Enterprise) sits on Anthropic's Commercial Terms, which contractually exclude your workspace conversations and uploaded files from model training. Each workspace is isolated — Anthropic staff don't read your conversations and your data isn't accessible to other customers.
- The one operational hygiene step worth taking: in Admin Settings → Data and Privacy, disable the "Rate chats" feedback buttons across the workspace. That prevents staff from accidentally uploading a conversation through a thumbs-up click.

**Sources:**
- [Anthropic Commercial Terms](https://www.anthropic.com/legal/commercial-terms)

### 🔍 Perplexity (`perplexity`)

- **Vendor:** Perplexity AI
- **Category:** AI Assistants

#### Tier: Free or Pro (`consumer`)

| Field | Value |
|-------|-------|
| Note | Personal account |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Consumer data used for model improvement. |
| Recommended action | Account Settings › Preferences › AI Data Retention › toggle off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Perplexity Privacy Policy](https://www.perplexity.ai/hub/legal/privacy-policy) |

**Policy summary:** Free and Pro Perplexity logs your prompts and uploads by default, shares aggregated analytics with advertising partners, and reserves the right to transfer your data in a corporate acquisition.

**Explainer:**
- Perplexity's consumer tiers (Free and Pro) treat your search queries, uploaded files, and Gmail/Calendar integrations as training material by default. They also share aggregated analytics with advertising partners. The least-known clause is their "Business Transactions" provision: if Perplexity gets acquired, your search history and any uploaded documents can be transferred to the acquirer without further consent.
- Turn data retention off in Account Settings → Preferences → AI Data Retention, and disconnect any synced Google or calendar accounts. For real business use, move to Perplexity Enterprise or the Sonar API, which both use a zero-retention framework.

**Sources:**
- [Perplexity AI Data Privacy Policy (analysis by Cape)](https://www.cape.co/blog/perplexity-ai-data-privacy-policy)

#### Tier: Enterprise Pro (`enterprise`)

| Field | Value |
|-------|-------|
| Note | Business plan |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Zero-retention framework. |
| Recommended action | API Dashboard › restrict debug logging metrics. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Perplexity Privacy Policy](https://www.perplexity.ai/hub/legal/privacy-policy) |

**Policy summary:** Enterprise workspace data and Sonar API queries are excluded from training. Uploads are purged within 7 days.

**Explainer:**
- Perplexity Enterprise and the Sonar API are governed by their commercial terms: workspace inputs and API queries are excluded from training, and uploads are purged after 7 days (compared to 30 days on consumer). Sonar API operates under a zero-retention framework where Perplexity only logs billing and token metrics.
- Admins can set retention thresholds, restrict third-party syncs, and limit debug logging. This is a solid configuration when paired with the standard admin lock-downs.

**Sources:**
- [Perplexity Enterprise security](https://www.perplexity.ai/enterprise)

### ✍️ Grammarly (`grammarly`)

- **Vendor:** Grammarly
- **Category:** Writing and Work Tools

#### Tier: Free or individual (`consumer`)

| Field | Value |
|-------|-------|
| Note | Personal account |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Text inputs used for training by default. |
| Recommended action | Account Settings › Security & Privacy › toggle off "Product Improvement and Training". |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Grammarly Privacy Policy](https://www.grammarly.com/privacy-policy) |

**Policy summary:** Personal Grammarly accounts analyse the text you write across the web to train Grammarly's ML models unless you opt out.

**Explainer:**
- On a personal Grammarly account, the text you write through their browser extension or desktop app is captured and used to train Grammarly's machine-learning models by default. They make a best-effort to exclude sensitive fields like passwords and credit-card numbers, but everything else is fair game — including business documents you draft in browser-based editors.
- Turn it off in Account Settings → Security & Privacy → "Product Improvement and Training". Also turn off tailored assistance to delete the personalisation data they've already built up. For any team use, Business or Enterprise is the right fit — training is off by default there.

**Sources:**
- [Product Improvement and Training Control (Grammarly)](https://support.grammarly.com/hc/en-us/articles/25555503115277-Product-Improvement-and-Training-Control)

#### Tier: Business or Enterprise (`business`)

| Field | Value |
|-------|-------|
| Note | Team account |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Training off by default. |
| Recommended action | Admin Console › verify training toggles off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Grammarly Business Security](https://www.grammarly.com/business/security) |

**Policy summary:** Product improvement and training are off by default. Customer data is never used to train foundational models.

**Explainer:**
- Grammarly Business and Enterprise have training disabled by default and treat customer text as confidential. They enforce AES-256 at rest, TLS 1.2 in transit, and admins can use their own KMS keys in AWS.
- Admin hygiene: verify the training toggle is off, mandate SAML SSO, and require FIDO2 (hardware-key) authentication on devices used to access sensitive documents.

**Sources:**
- [Grammarly Business security](https://www.grammarly.com/business/security)

### 📓 Notion AI (`notion`)

- **Vendor:** Notion
- **Category:** Writing and Work Tools

#### Tier: Plus or Free with AI (`plus`)

| Field | Value |
|-------|-------|
| Note | Personal workspace |
| Vendor risk (1–3) | 2 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Verify current sub-processor terms. |
| Recommended action | Workspace Settings › Notion AI › disable web search. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Notion AI Security Practices](https://www.notion.com/help/notion-ai-security-practices) |

**Policy summary:** Notion's contracts with their AI subprocessors prohibit training on customer data — workspace embeddings stay isolated.

**Explainer:**
- Notion AI runs through subprocessors (currently OpenAI and Anthropic) but Notion's commercial agreements with them explicitly prohibit using customer data to train models. The vector embeddings Notion AI uses to make your workspace searchable are isolated per workspace — they can't leak across organisations.
- The one knob worth touching: Workspace Settings → Notion AI → either disable "Enable web search for workspace" or require confirmation before Notion makes a web request. That stops it from leaking your local document schema into a public search query.

**Sources:**
- [Notion AI security & privacy](https://www.notion.com/help/notion-ai-security-practices)

#### Tier: Business or Enterprise (`business`)

| Field | Value |
|-------|-------|
| Note | Admin workspace |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Workspace embeddings isolated. |
| Recommended action | Admin settings › verify sub-processor handling. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Notion AI Security Practices](https://www.notion.com/help/notion-ai-security-practices) |

**Policy summary:** Same training exclusions as the Plus tier, plus admin-level controls over sub-processors and workspace access.

**Explainer:**
- Business and Enterprise tiers inherit the same no-training contractual protections as Plus, but add admin-level visibility and control: detailed audit logs, SCIM provisioning, SAML SSO, and granular control over which sub-processors are enabled.
- The Enterprise plan also adds a custom DPA and the ability to request specific sub-processor configurations if you have regulatory constraints (e.g. data residency).

**Sources:**
- [Notion AI security & privacy](https://www.notion.com/help/notion-ai-security-practices)

### 🧡 HubSpot AI (`hubspot`)

- **Vendor:** HubSpot
- **Category:** Writing and Work Tools

#### Tier: Standard account (`standard`)

| Field | Value |
|-------|-------|
| Note | Default CRM |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Uses CRM data for training by default. |
| Recommended action | Settings › AI › Access tab › toggle off "AI Model Training". |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [HubSpot Machine Learning Data Policy](https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data) |

**Policy summary:** HubSpot's Breeze AI uses your CRM data and files to train its machine-learning models by default — but tenants are isolated and you can opt out globally.

**Explainer:**
- On a standard HubSpot account, the AI features (Breeze / ML) pull on your CRM data and files to train HubSpot's machine-learning models. Importantly, training is done within tenant boundaries — your data never reaches another customer's models. But it does improve HubSpot's product across the customer base.
- Turn it off globally in Settings → AI → Access tab → toggle off "AI Model Training". If your account contains regulated information (health, financial), also enable the "Sensitive Data" setting — accounts with that on are opted out of training automatically.

**Sources:**
- [HubSpot machine learning data (Knowledge Base)](https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data)

#### Tier: Sensitive Data enabled (`sensitive`)

| Field | Value |
|-------|-------|
| Note | With opt-out configured |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Opted out of training by default. |
| Recommended action | Enable Sensitive Data setting and confirm training off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [HubSpot Machine Learning Data Policy](https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data) |

**Policy summary:** With "Sensitive Data" enabled and the global training opt-out off, HubSpot AI doesn't train on your CRM data.

**Explainer:**
- When you enable the "Sensitive Data" account setting (designed for HIPAA-style use cases) and confirm the global AI training opt-out is off, HubSpot stops using your CRM data to train Breeze or any of its ML models. Tenant isolation guarantees no cross-customer leakage, and your account is treated as a regulated tenant.
- Worth pairing this with strict role-based access on the AI features — not every staff member needs to be able to trigger AI generations across the whole CRM.

**Sources:**
- [HubSpot machine learning data (Knowledge Base)](https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data)

### 📔 NotebookLM (`notebooklm`)

- **Vendor:** Google
- **Category:** Writing and Work Tools

#### Tier: Personal Google account (`consumer`)

| Field | Value |
|-------|-------|
| Note | notebooklm.google.com |
| Vendor risk (1–3) | 2 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Feedback triggers human review, retained up to 3 years. |
| Recommended action | Avoid thumbs-up/down ratings — trigger human review. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [NotebookLM data & privacy](https://support.google.com/notebooklm/answer/17004255) |

**Policy summary:** Notebook sources and chat logs are private by default. Submitting thumbs-up/down feedback triggers human review and 3-year retention.

**Explainer:**
- On a personal Google account, NotebookLM is unusually private for a consumer Google product: your uploaded sources and chat logs stay in your account, and Google does not train its foundation models on them — unless you submit thumbs-up or thumbs-down feedback. That feedback triggers a human review pathway and retains the surrounding chat context for up to three years.
- Practical rule: never click feedback buttons on a personal NotebookLM if the conversation touched anything sensitive, and don't put highly confidential corporate documents into an unmanaged personal notebook in the first place.

**Sources:**
- [NotebookLM data privacy (Google Support)](https://support.google.com/notebooklm/answer/17004255)

#### Tier: Workspace Core (`workspace`)

| Field | Value |
|-------|-------|
| Note | Business Google account |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | No human review. Enterprise-grade. |
| Recommended action | Admin Console › turn on NotebookLM for specific org units. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [NotebookLM for Workspace admin guide](https://knowledge.workspace.google.com/admin/users/access/turn-notebooklm-on-or-off-for-users) |

**Policy summary:** Governed by Google Cloud/Workspace core agreements — no human review of uploads, no training on domain data.

**Explainer:**
- NotebookLM on a Workspace account inherits the full Workspace enterprise contract: SOC 1/2/3, ISO 27001, BSI C5 certifications, no human review of your uploads, no training of Google's models on your domain's data. Admins can enable it globally or restrict to specific organisational units.
- Worth pairing with Drive sharing restrictions — NotebookLM can only access documents users have permission to read, so tightening Drive sharing limits the blast radius of any single user adding sources.

**Sources:**
- [Turn NotebookLM on/off (Workspace Admin)](https://knowledge.workspace.google.com/admin/users/access/turn-notebooklm-on-or-off-for-users)

### 🎨 Canva AI (`canva`)

- **Vendor:** Canva
- **Category:** Creative Tools

#### Tier: Free or Pro (`free-pro`)

| Field | Value |
|-------|-------|
| Note | Personal creator |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | AI training enabled by default as of November 2025. |
| Recommended action | Account Settings › Privacy Controls › toggle off AI training. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Canva Privacy Policy](https://www.canva.com/policies/privacy-policy/) |

**Policy summary:** Canva uses design text, prompts, and uploaded media to train its AI models by default. Manual opt-out required, and syncing accounts with Affinity can re-enable it.

**Explainer:**
- On Canva Free or Pro, the text you type, the prompts you give to Magic Studio, and the media you upload are all used to train Canva's AI models by default. You have to manually opt out in Account Settings → Privacy Controls → "Use my content for AI/model training".
- Watch out for one trap: syncing your Canva account with Affinity (their professional design suite) or other Canva-linked apps can reset that opt-out to default. Periodically check the toggle and disconnect any linkages you don't need.

**Sources:**
- [Canva Trust Center](https://www.canva.com/trust/privacy/)

#### Tier: Teams or Business (`teams`)

| Field | Value |
|-------|-------|
| Note | Shared workspace |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Content never used for training. |
| Recommended action | Admin Settings › Security › Data and Privacy. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Canva Privacy Policy](https://www.canva.com/policies/privacy-policy/) |

**Policy summary:** Canva Teams / Enterprise is governed by Canva Shield — customer content is excluded from foundation model training.

**Explainer:**
- Canva Teams, Business, and Enterprise plans are covered by Canva Shield, their enterprise data-protection programme. Customer content (designs, uploads, prompts) is excluded from foundation model training, admins can control shared folder visibility, and external sharing can be restricted.
- One admin hygiene step: in Admin Settings → Security → Data and Privacy, turn off "Allow team members to temporarily share affected designs with Canva Support". That stops staff inadvertently routing a sensitive design through a support ticket.

**Sources:**
- [Canva Trust Center](https://www.canva.com/trust/privacy/)

### 🔥 Adobe Firefly (`adobe`)

- **Vendor:** Adobe
- **Category:** Creative Tools

#### Tier: Individual or personal (`individual`)

| Field | Value |
|-------|-------|
| Note | Creative Cloud personal |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Analyses creations for model training unless opted out. |
| Recommended action | Adobe Account Privacy Settings › toggle off "Content analysis". |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Adobe Generative AI User Guidelines](https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html) |

**Policy summary:** Personal Creative Cloud uses the "Content analysis" setting to scan your creative work for model training unless you opt out.

**Explainer:**
- Individual / personal Creative Cloud accounts have a "Content analysis" setting that, when on, allows Adobe to scan your creative files and edits to improve their AI models. Turning it off prevents that scanning entirely.
- Go to Adobe Account → Privacy Settings → locate "Content analysis" → toggle off. Note: Firefly's foundation models themselves are trained on Adobe Stock and licensed/public-domain content, not your work — the content analysis setting only governs what Adobe learns from your behaviour and edits.

**Sources:**
- [Adobe Content Analysis FAQ](https://helpx.adobe.com/manage-account/using/machine-learning-faq.html)

#### Tier: Firefly for Business (`business`)

| Field | Value |
|-------|-------|
| Note | Enterprise Creative Cloud |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Trained on licensed content only. |
| Recommended action | Enterprise Admin Console › restrict custom model permissions. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Firefly for Business model training policy](https://business.adobe.com/products/firefly-business/custom-models/ai-model-training.html) |

**Policy summary:** Firefly's foundation models are trained exclusively on licensed and public-domain content. Enterprise content is excluded from training and Adobe offers IP indemnification.

**Explainer:**
- Firefly for Business is one of the cleanest enterprise creative-AI options because of how the model itself was trained: only Adobe Stock content, openly licensed content, and public-domain images. That means generated images are far less likely to reproduce copyrighted material, and Adobe offers IP indemnification for enterprise customers.
- Your enterprise content (the designs you make, custom style models you train) is excluded from foundation training. Admins should restrict custom-model permissions and ensure creators select enterprise-approved partner models from the dropdown rather than community ones.

**Sources:**
- [Firefly for Business model training](https://business.adobe.com/products/firefly-business/custom-models/ai-model-training.html)

### 🖼️ Midjourney (`midjourney`)

- **Vendor:** Midjourney
- **Category:** Creative Tools

#### Tier: Basic or Standard (`basic`)

| Field | Value |
|-------|-------|
| Note | Standard subscription |
| Vendor risk (1–3) | 3 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | All outputs PUBLIC by default. No training opt-out. |
| Recommended action | No safe configuration available. Do not use for business assets. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Midjourney Privacy Policy](https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy) |

**Policy summary:** Every prompt and every generated image on Basic and Standard plans is PUBLIC on midjourney.com — even from private Discord DMs and private servers. No training opt-out.

**Explainer:**
- This is the single most surprising finding for many of the businesses I audit: on Midjourney Basic and Standard plans, every prompt you type and every image you generate is published to your public gallery on midjourney.com — even if you generated it in a private Discord direct message or a private Discord server. The basic and standard tiers do not offer a way to opt out of either public visibility or model training.
- There is no safe configuration for proprietary work on these tiers. If you're generating anything trademarked, brand-sensitive, or client-confidential, you must be on Pro or Mega with Stealth Mode enabled — and even that doesn't stop the prompts from being used for training.

**Sources:**
- [Midjourney Privacy Policy](https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy)

#### Tier: Pro or Mega (Stealth) (`pro`)

| Field | Value |
|-------|-------|
| Note | Higher tier |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Stealth hides outputs but prompts still used for training. |
| Recommended action | Type /settings in Discord › enable Stealth Mode. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Midjourney Stealth Mode docs](https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode) |

**Policy summary:** Stealth Mode hides your creations from public midjourney.com feeds, but does not stop training on your prompts and does not protect Discord-server visibility.

**Explainer:**
- Pro and Mega plans unlock Stealth Mode (type /settings in Discord and toggle it on — the public button should turn grey). Stealth removes your generations from the public midjourney.com gallery, which is a real upgrade over Basic/Standard.
- But two limits remain. First, Stealth does not stop Midjourney from using your prompts and inputs to train models — the training opt-out simply doesn't exist on this platform. Second, Stealth only hides web visibility — if you generate inside a shared Discord channel, other channel members can still see your work. For corporate visual assets, generate only in private servers or via the personal Create web page.

**Sources:**
- [Midjourney Stealth Mode](https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode)

### 🦦 Otter.ai (`otter`)

- **Vendor:** Otter.ai
- **Category:** Meetings and Voice

#### Tier: Basic or Pro (`basic-pro`)

| Field | Value |
|-------|-------|
| Note | Personal plan |
| Vendor risk (1–3) | 3 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Trains on audio files by default. |
| Recommended action | Email support@otter.ai to request deletion. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | medium |
| Policy link | [Otter.ai Privacy Policy](https://otter.ai/privacy-policy) |

**Policy summary:** Otter Basic and Pro train their ML models on your de-identified audio and transcripts by default, and have historically faced lawsuits over unconsented recording.

**Explainer:**
- Otter.ai automatically trains its proprietary models on de-identified customer audio and transcripts on the Basic and Pro tiers. The model-training risk is one issue; the bigger operational risk is consent: Otter has been linked to data breach incidents and litigation around recording meeting participants without consent under US wiretapping laws (California's CIPA in particular).
- If you must use the consumer tier, disconnect Google/Outlook calendar linkages so the Otter bot doesn't auto-join meetings, and email support@otter.ai to request data deletion when projects close. For business use, move to Otter Business — or better, a privacy-first alternative like Granola or Fireflies.

**Sources:**
- [Otter.ai Privacy Center](https://otter.ai/privacy-policy)

#### Tier: Business plan (`business`)

| Field | Value |
|-------|-------|
| Note | Team admin |
| Vendor risk (1–3) | 2 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Excludes from third-party training. |
| Recommended action | Admin Panel › enable mandatory participant notifications. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | medium |
| Policy link | [Otter.ai Privacy Policy](https://otter.ai/privacy-policy) |

**Policy summary:** Otter Business excludes meeting data from third-party model training but still permits internal training on proprietary systems.

**Explainer:**
- Otter Business contractually excludes meeting data from third-party model training, but Otter still permits itself to train its own internal models on your data. That's a meaningful improvement over consumer tiers, but it's not as strict as competitors like Fireflies or Fellow.
- The other concern at Business tier is calendar-access scope: high-volume calendar integration registers organiser details, attendee emails, and meeting-room URLs. Admins should enable mandatory participant-notification pop-ups and restrict the auto-join feature globally.

**Sources:**
- [Otter.ai Privacy Policy](https://otter.ai/privacy-policy)

### 🎙️ Fathom (`fathom`)

- **Vendor:** Fathom Video
- **Category:** Meetings and Voice

#### Tier: Free account (`free`)

| Field | Value |
|-------|-------|
| Note | Individual free |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | De-identified meeting assets used for training by default. |
| Recommended action | Account Settings › training controls › toggle off. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Fathom Privacy Policy](https://fathom.video/privacy-policy) |

**Policy summary:** Fathom Free uses de-identified meeting assets to improve internal model performance by default. Third-party training is excluded.

**Explainer:**
- Fathom's free tier uses de-identified meeting transcripts and summaries to improve their own internal models by default. They explicitly do not share that data with third-party model trainers, which is better than Otter's consumer posture — but it's still training-by-default.
- Go to Account Settings, find the training controls, and toggle them off to stop Fathom from using your meetings for internal model improvement. Note: calendar linkage on Free still reads organiser and attendee details, so be deliberate about which calendars you connect.

**Sources:**
- [Fathom Privacy Hub](https://fathom.video/privacy-policy)

#### Tier: Team Edition (`team`)

| Field | Value |
|-------|-------|
| Note | Paid team plan |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | SOC 2 Type II. No training on meeting content. |
| Recommended action | Admin Panel › enable global training opt-out. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Fathom Security & Privacy](https://fathom.video/security) |

**Policy summary:** Fathom Team Edition excludes meeting notes, transcripts, and summaries from all training programs. SOC 2 Type II certified.

**Explainer:**
- Fathom Team Edition has training off across the board — meeting notes, transcripts, and summaries are excluded from every training programme they run. They're SOC 2 Type II certified and integrate cleanly with Salesforce and HubSpot for sales pipelines.
- Admin step: enable the global model-training opt-out at the Admin Panel level to make sure the protection is locked across all org members, not relying on individual settings.

**Sources:**
- [Fathom security & compliance](https://fathom.video/security)

### 🌾 Granola AI (`granola`)

- **Vendor:** Granola
- **Category:** Meetings and Voice

#### Tier: Personal or Enterprise (`any`)

| Field | Value |
|-------|-------|
| Note | Any plan |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | On-device transcription. Raw audio deleted immediately. SOC 2 Type II. |
| Recommended action | Settings › Profile › toggle off "Model Training". |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Granola Model Training & Privacy](https://docs.granola.ai/help-center/consent-security-privacy/model-training) |

**Policy summary:** Granola transcribes on-device and immediately deletes raw audio. Enterprise contracts prohibit OpenAI/Anthropic sub-processors from training on the data.

**Explainer:**
- Granola is architecturally different from most meeting tools: it transcribes audio on-device in real time and deletes the raw audio file immediately after processing. There's no central audio database to compromise. It's SOC 2 Type II certified and runs locally without joining calls as a visible bot.
- The personal tier still uses de-identified summaries for model improvement unless you turn it off in Settings → Profile → "Model Training". The enterprise tier goes further: contractual prohibition on OpenAI/Anthropic sub-processors training on data, and global training opt-out locked at the admin level. One operational note: because Granola doesn't join as a visible bot, the host must still inform attendees that AI transcription is active to comply with multi-party consent laws.

**Sources:**
- [Granola Privacy Policy](https://granola.ai/privacy-policy)
- [Participant privacy & consent (Granola blog)](https://www.granola.ai/blog/ai-notetaker-participant-privacy-consent)

### ✨ Fireflies.ai (`fireflies`)

- **Vendor:** Fireflies.ai
- **Category:** Meetings and Voice

#### Tier: Any plan (`any`)

| Field | Value |
|-------|-------|
| Note | Free, Pro, or Business |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Restricts API providers from training on meeting data. |
| Recommended action | Account Settings › force zero-data-retention. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Fireflies Privacy Policy](https://fireflies.ai/privacy-policy) |

**Policy summary:** Fireflies transcribes meetings and contractually restricts downstream API providers from caching or training on the data. SOC 2 Type II, AES-256, TLS 1.3.

**Explainer:**
- Fireflies takes a strong privacy posture across all tiers: AES-256 at rest, TLS 1.3 in transit on AWS, SOC 2 Type II certified, and downstream API providers (the LLMs they use under the hood) are contractually prohibited from caching or training on meeting data.
- Worth doing on any account: in Account Settings, force zero-data-retention with third-party vendors, and set calendar linkage boundaries so the Fireflies bot doesn't auto-join external client sessions you'd rather it stay out of.

**Sources:**
- [Fireflies Trust & Security](https://trust.fireflies.ai/faq)

### 📹 Zoom AI Companion (`zoom-ai`)

- **Vendor:** Zoom
- **Category:** Meetings and Voice

#### Tier: Basic or Pro Zoom (`consumer`)

| Field | Value |
|-------|-------|
| Note | Standard Zoom plan |
| Vendor risk (1–3) | 2 |
| Training on by default | Yes |
| IPP 12 / overseas | Yes |
| Warning | Consumer AI features may be used for model improvement. |
| Recommended action | Zoom Settings › AI Companion › disable data improvement. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | high |
| Policy link | [Zoom AI Companion & Trust](https://www.zoom.com/en/trust/ai/) |

**Policy summary:** Zoom does not use your audio, video, chat, screen-sharing or attachments to train its own or any third-party AI models — confirmed contractually since the August 2023 policy update.

**Explainer:**
- After significant public backlash in August 2023 over an ambiguous ToS clause, Zoom rewrote and re-published their AI data policy. Their current commitment is explicit and applies to every Zoom plan that has AI Companion enabled (Pro, Business, Business Plus, Enterprise — AI Companion is not part of the free Basic tier): customer content (audio, video, chat, screen sharing, attachments, polls, whiteboard, transcripts) is never used to train Zoom's or any third-party generative AI models.
- Two things to know on a personal Pro account. First, AI Companion is opt-in per meeting and per host — meeting hosts must actively turn it on, and participants see a notification when it's active. Second, account-level telemetry and what Zoom calls "service-generated data" (usage patterns, settings, feature engagement — not the content of meetings) can still be used to improve the product. For most personal use that's fine; for highly confidential meetings, leave AI Companion off rather than relying on retention settings.

**Sources:**
- [Zoom AI Companion FAQ](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058778)
- [How Zoom's AI Companion handles your data (Zoom blog)](https://www.zoom.com/en/blog/zoom-ai-companion-data-handling/)
- [Zoom Privacy Statement](https://www.zoom.com/en/trust/privacy/)

#### Tier: Zoom Business or Enterprise (`business`)

| Field | Value |
|-------|-------|
| Note | Business account |
| Vendor risk (1–3) | 1 |
| Training on by default | No |
| IPP 12 / overseas | Yes |
| Warning | Business accounts excluded from AI training by default. |
| Recommended action | Account Admin › AI Companion › confirm training exclusions. |
| Policy status | verified |
| Last reviewed | 2026-05-26 |
| Confidence | very-high |
| Policy link | [Zoom AI Companion & Trust](https://www.zoom.com/en/trust/ai/) |

**Policy summary:** Customer content is contractually excluded from AI training, with full admin control over which AI features are enabled, who can use them, and what gets retained. SOC 2 Type II, HIPAA BAA available.

**Explainer:**
- Zoom Business and Enterprise accounts are governed by Zoom's commercial Data Processing Addendum, which contractually prohibits Zoom or any sub-processor from using customer meeting content to train AI models — the same protection consumer tiers receive, but with the additional weight of a signed enterprise contract. Zoom is SOC 2 Type II certified and offers a HIPAA Business Associate Agreement for healthcare customers.
- The big advantage at this tier is admin control: in the account Admin Portal under AI Companion settings, you can enable or disable specific AI features (meeting summary, smart recording, in-meeting Q&A, etc.) globally or per-group, restrict who can host AI-assisted meetings, configure retention windows for AI-generated summaries, and audit usage. Verify the standard hardening — disable AI Companion for external/guest meetings by default, require host confirmation before activation, and align retention with your own data-retention policy.

**Sources:**
- [Zoom AI Companion for admins](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058778)
- [Zoom Trust Center](https://www.zoom.com/en/trust/)
- [Zoom HIPAA compliance](https://www.zoom.com/en/trust/hipaa-compliance/)

---

## Countries list

196 countries. Default: **New Zealand**. Full list:

- New Zealand
- Afghanistan
- Albania
- Algeria
- Andorra
- Angola
- Antigua and Barbuda
- Argentina
- Armenia
- Australia
- Austria
- Azerbaijan
- Bahamas
- Bahrain
- Bangladesh
- Barbados
- Belarus
- Belgium
- Belize
- Benin
- Bhutan
- Bolivia
- Bosnia and Herzegovina
- Botswana
- Brazil
- Brunei
- Bulgaria
- Burkina Faso
- Burundi
- Cabo Verde
- Cambodia
- Cameroon
- Canada
- Central African Republic
- Chad
- Chile
- China
- Colombia
- Comoros
- Congo (Democratic Republic of the)
- Congo (Republic of the)
- Costa Rica
- Croatia
- Cuba
- Cyprus
- Czechia
- Denmark
- Djibouti
- Dominica
- Dominican Republic
- Ecuador
- Egypt
- El Salvador
- Equatorial Guinea
- Eritrea
- Estonia
- Eswatini
- Ethiopia
- Fiji
- Finland
- France
- Gabon
- Gambia
- Georgia
- Germany
- Ghana
- Greece
- Grenada
- Guatemala
- Guinea
- Guinea-Bissau
- Guyana
- Haiti
- Honduras
- Hungary
- Iceland
- India
- Indonesia
- Iran
- Iraq
- Ireland
- Israel
- Italy
- Ivory Coast
- Jamaica
- Japan
- Jordan
- Kazakhstan
- Kenya
- Kiribati
- Kuwait
- Kyrgyzstan
- Laos
- Latvia
- Lebanon
- Lesotho
- Liberia
- Libya
- Liechtenstein
- Lithuania
- Luxembourg
- Madagascar
- Malawi
- Malaysia
- Maldives
- Mali
- Malta
- Marshall Islands
- Mauritania
- Mauritius
- Mexico
- Micronesia
- Moldova
- Monaco
- Mongolia
- Montenegro
- Morocco
- Mozambique
- Myanmar
- Namibia
- Nauru
- Nepal
- Netherlands
- Nicaragua
- Niger
- Nigeria
- North Korea
- North Macedonia
- Norway
- Oman
- Pakistan
- Palau
- Palestine
- Panama
- Papua New Guinea
- Paraguay
- Peru
- Philippines
- Poland
- Portugal
- Qatar
- Romania
- Russia
- Rwanda
- Saint Kitts and Nevis
- Saint Lucia
- Saint Vincent and the Grenadines
- Samoa
- San Marino
- Sao Tome and Principe
- Saudi Arabia
- Senegal
- Serbia
- Seychelles
- Sierra Leone
- Singapore
- Slovakia
- Slovenia
- Solomon Islands
- Somalia
- South Africa
- South Korea
- South Sudan
- Spain
- Sri Lanka
- Sudan
- Suriname
- Sweden
- Switzerland
- Syria
- Taiwan
- Tajikistan
- Tanzania
- Thailand
- Timor-Leste
- Togo
- Tonga
- Trinidad and Tobago
- Tunisia
- Turkey
- Turkmenistan
- Tuvalu
- Uganda
- Ukraine
- United Arab Emirates
- United Kingdom
- United States
- Uruguay
- Uzbekistan
- Vanuatu
- Vatican City
- Venezuela
- Vietnam
- Yemen
- Zambia
- Zimbabwe

---

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/audit/invite` | Send team invite + 48h reminder emails; store session token |
| POST | `/api/audit/submit` | Owner or team submission → Resend emails |
| GET | `/api/audit/pricing-click` | Track package CTA clicks → redirect (mailto or checkout) |

**Owner submit emails:** Results to client emails; optional BCC consultant. Consultant gets companion link + JSON.

**Team submit:** Consultant only (not team member).

---

## Consultant companion tool

- **File:** `client/public/companion.html`
- **URL:** `/companion#d={base64url-json}` — pre-call briefing from owner audit payload in email fragment.
