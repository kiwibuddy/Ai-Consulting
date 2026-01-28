# Coaching Portal – Remaining Work & Data Source Report

**Generated:** January 2026  
**Sources:** Holger-Coaching-Portal-PRD.md (v2.0), codebase review, external audit (Coaching Platform Evaluation & Market Analysis).  
**Note:** The gap analysis plan file was not found in the repo; this report is based on the main PRD, direct code/schema inspection, and the audit in `docs/# Coaching Platform Evaluation & Market Analysis.md`.

---

## 1. Live Data vs Hardcoded / Mock Data

### 1.1 Largely or fully live (API + database)

| Area | What’s live | Notes |
|------|-------------|--------|
| **Auth** | Users, sessions, roles | Google OAuth + email/password; session in DB (connect-pg-simple). |
| **Client portal** | Dashboard, sessions, session detail, actions, resources, profile | All key client views use `/api/client/*` and show real DB data. |
| **Coach portal** | Dashboard, clients list, intake list, sessions, resources, calculator | Uses `/api/coach/*`; clients, intakes, sessions, resources, coach settings from DB. |
| **Intake** | Form submission, coach list | `POST /api/intake`; coach notification email (when Resend configured). |
| **Intake workflow (coach)** | Accept / decline, status, coach notes | PATCH updates status; welcome email on accept. Does **not** yet create user or client profile (see High priority). |
| **Sessions** | CRUD, confirm (client/coach), notes, reflection, messages | Session data, messages, prep notes, reflections stored and served from DB. |
| **Resources** | Upload (signed URL → GCS), list by client/session, delete | File metadata and access via API; actual files in Google Cloud Storage. |
| **Action items** | Create, list, update status | Stored and fetched from DB; client can toggle status. |
| **Notifications** | In-app list, read/read-all | Stored in DB; bell UI uses `/api/notifications`. |
| **Email (triggered)** | Intake submitted, account created (on accept), session scheduled, resource uploaded | Implemented in `server/lib/email.ts` and called from routes when Resend is configured. |
| **Calendar** | .ics export per session | Generated from live session data via `/api/sessions/:id/export-ics`. |
| **Profile** | Client profile GET/PATCH, timezone | `/api/client/profile`, `/api/user/timezone` backed by DB. |

**Approximate share of “app” that is live:** Most of the authenticated app (client and coach flows) is **live**. Roughly **~80% of core flows** (sessions, actions, resources, notifications, profile, calculator, intake list, clients list) are driven by API/DB.

### 1.2 Hardcoded or mock / stub

| Area | What’s hardcoded or stub | Location |
|------|---------------------------|----------|
| **Landing page** | Features list (4 items), testimonials (3 items), benefits list, copy | `client/src/pages/landing.tsx` (constants `features`, `testimonials`, `benefits`) |
| **Landing – pricing** | Three tiers (Discovery $150, Growth $500, Executive $1,200) and bullet points | Same file, pricing section |
| **Testimonials (public)** | Not loaded from DB | `testimonials` table exists in schema but no public API or admin; landing uses in-file array only |
| **Data deletion** | Request only; no actual delete | `POST /api/client/request-deletion` returns success message only; no user/data deletion (see High priority) |
| **Session reminders** | Email template exists; no scheduler | `sessionReminderEmail` in `server/lib/email.ts`; no cron or job to send “session tomorrow” emails |
| **Coach clients list** | Client identified by ID slice only | Coach clients table shows “Client #{id.slice(0,8)}”; no joined user name (e.g. firstName/lastName) |
| **Client detail (coach)** | Route may be missing | “View” links to `/coach/clients/:id`; need to confirm if detail route exists in App.tsx |

**Approximate share that is hardcoded/stub:** **~15–20%** — mostly landing (testimonials, pricing, features/benefits), data-deletion behavior, and session-reminder automation; plus small UX gaps (client display name, possible missing coach client detail route).

---

## 2. Remaining Work by Priority

Based on the PRD (MVP scope, success criteria, security, and UX), the following items are grouped by priority.

---

### High priority

| # | Item | PRD / reference | Current state |
|---|------|------------------|----------------|
| 1 | **Intake accept → create client account and profile** | §6.2 “Acceptance creates client account and data structure” | Accept only updates intake status and sends welcome email. No user or client profile creation. Coach cannot assign sessions to “accepted” intakes until they have a profile (and today profiles are created on first client login). |
| 2 | **Data deletion (GDPR-aligned)** | §9 “GDPR-aligned data deletion workflow” | “Request deletion” exists in profile; API only returns a message. No actual deletion of user, client profile, or related data. |
| 3 | **Session reminder emails** | §8.1 “Session reminder” | Template exists; no scheduled job/cron to send “session tomorrow” (or similar) reminders. |

**Suggested implementation hints**

- **H1:** On intake accept, create `users` row (no password or with invite link) and `client_profiles` row linked to that user; optionally send “set your password” or invite link.
- **H2:** Implement a real deletion flow: anonymize or delete user, client_profile, and cascade/clear sessions, actions, resources, messages, notifications as per policy; or mark deleted and filter in queries.
- **H3:** Add a small job (cron or scheduler) that finds sessions scheduled for “tomorrow” (or next 24h) and calls `sessionReminderEmail` for the relevant client (and optionally coach).

---

### Medium priority

| # | Item | PRD / reference | Current state |
|---|------|------------------|----------------|
| 4 | **Testimonials from DB** | §6.1 “Testimonials” | Table and schema exist; landing uses a hardcoded array. No public API to list published testimonials; no coach/admin UI to manage them. |
| 5 | **Coach client list: show client name** | §6.4 “Client list” | List shows “Client #{id}”; no joined user name. Need to enrich `/api/coach/clients` (or frontend) with user.firstName/lastName (or email) so coaches see who the client is. |
| 6 | **Coach client detail page** | §6.4 “Client list”, UX | “View” on clients table links to `/coach/clients/:id`. Confirm route exists and page shows client profile + sessions/actions/resources; add route and page if missing. |
| 7 | **Engagement metrics / scores** | §6.4 “View engagement metrics” | No engagement score or metrics on client list or dashboard. Could be derived (e.g. session count, last session date, actions completed) and shown in list or detail. |
| 8 | **Landing pricing from config or DB** | §6.1 “Pricing” (implied) | Pricing tiers and text are hardcoded. Optional: drive from config or CMS/DB for easier updates. |
| 9 | **Accessibility and performance** | §10 “Lighthouse 90+”, “Zero critical accessibility violations” | Not verified in this pass. Add Lighthouse run and a11y audit; fix critical issues. |

---

### Low priority

| # | Item | PRD / reference | Current state |
|---|------|------------------|----------------|
| 10 | **Landing features/benefits from CMS or config** | §6.1 | Copy is hardcoded. Low impact; optional for MVP. |
| 11 | **Soft deletion / auditability** | §7 “Soft deletion and auditability” | Schema and flows do not yet implement soft deletes or audit log. Defer or add when tightening compliance. |
| 12 | **PWA and offline** | §2.1 “Responsive, mobile-first PWA” | Manifest and basic service worker exist. Optional: expand caching for key routes and assets. |
| 13 | **SEO (landing)** | §6.1 “SEO-friendly structure” | Not audited. Add meta tags, structured data if needed for launch. |

---

## 3. Build List / Phases (PRD §11) – Status

| Phase | Content | Status |
|-------|---------|--------|
| 1. Foundation & Auth | Stack, auth, roles | Done (Google + email/password, session, protected routes). |
| 2. Intake + Client Creation | Intake form, accept/decline, client creation | Intake form and accept/decline done; **client creation on accept not done**. |
| 3. Client Portal | Dashboard, sessions, resources, actions, profile | Done (live data). |
| 4. Coach Dashboard | Overview, clients, intake, sessions, notes, resources | Done except **client creation from intake**, **client names in list**, and optional **client detail route** and **engagement metrics**. |
| 5. Notifications & PWA | Email, in-app, reminders, PWA | Email + in-app done; **session reminders (scheduled) not done**; PWA basics in place. |
| 6. QA, Security Review, Launch | Quality and security | **Data deletion** and **intake→client** are the main gaps before launch; then Lighthouse/a11y. |

---

## 4. Summary

- **Data:** Most of the app (~80% of core flows) is **live** (API + DB). The remainder is **landing content** (testimonials, pricing, features/benefits), **stub behavior** (data deletion), and **missing automation** (session reminder job).
- **High priority:** (1) Create user + client profile when intake is accepted. (2) Implement real GDPR-aligned data deletion. (3) Add scheduled session reminder emails.
- **Medium priority:** Testimonials from DB + admin, coach client list names, client detail page/route, engagement metrics, configurable pricing, Lighthouse/a11y.
- **Low priority:** Config/CMS for landing copy, soft delete/audit, PWA/offline tweaks, SEO.

Addressing the three high-priority items and verifying coach client detail route will bring the app in line with the PRD’s MVP and launch criteria.

---

## 5. External Audit: MVP Launch vs Add-Ons

*Source: **Coaching Platform Evaluation & Market Analysis** (in `docs/# Coaching Platform Evaluation & Market Analysis.md`).*

The audit evaluates the platform as a dual-portal coaching system and calls out what is required for a **launch** (demos / first paying customers) vs what can be **deferred or offered as add-ons**.

---

### 5.1 What the audit says is required for MVP launch

For a **live demo and first customers** (custom installs, not full SaaS), the audit’s “What to Build vs What to Fake” and pre-launch section say:

| Feature | Required for launch? | Audit note |
|--------|----------------------|------------|
| **Client / Coach portals** | **YES** | Core value proposition. |
| **Session management** | **YES** | “They’ll test this first.” |
| **Action items** | **YES** | Differentiator vs competitors. |
| **Session notes** | **YES** (Tier 1 in audit) | Coaches need to document sessions; HIPAA-adjacent. |
| **StrengthsFinder-related fields** | **YES** (if SF niche) | “Your entire positioning” for that market. |
| **Payment processing** | **NO** for first ~20 | Manual invoicing is acceptable at first; Stripe can wait. |
| **Calendar / scheduling** | **FAKE IT** | Embed Calendly (or similar) iframe; don’t build from scratch yet. |
| **Email notifications** | **NO** at first | Coaches can check the platform manually; build after revenue. |
| **Mobile app** | **NO** | Not expected for custom installs. |

**Pre-launch assets (audit):**

- Live demo site (fully working, not “coming soon”).
- Short video walkthrough (e.g. 2 min Loom).
- At least one case study + testimonial (e.g. from a pilot coach).
- Clear pricing/packages page.
- Calendar booking link for demos (e.g. Calendly).

**Current alignment:**  
Client/Coach portals, session management, and action items are in place and backed by live data. Session notes exist (prep notes, session notes, notes visible to client). StrengthsFinder-specific fields are not present in this codebase; that is a product/positioning choice for the SF niche. Email notifications are partially built (triggered emails exist; scheduled reminders are not). So for a **generic coaching** MVP launch (no SF), the main gaps vs the audit are: demo-ready polish, testimonial/case study, pricing page clarity, and optionally “fake” calendar (e.g. meeting link + Calendly embed) rather than full calendar sync.

---

### 5.2 Audit “Tier 1” – must-have for broader market viability

For the product to be **market-viable beyond early adopters**, the audit lists these as Tier 1 (must-have):

| Feature | Audit rationale | Current state |
|---------|------------------|---------------|
| **Payment processing** | “Coaches need to get paid.” Stripe/PayPal. | Not implemented; manual invoicing only. |
| **Scheduling / calendar** | Booking links, calendar sync (Google/Outlook), timezone handling. | Manual meeting links only; no booking widget or calendar sync. |
| **Video integration** | Zoom/Meet links or embedded video (hybrid coaching). | Meeting link field only; no embed or native video. |
| **Email notifications** | “Session tomorrow” reminders, new message alerts. | Triggered emails (intake, account created, session scheduled, resource) exist; **scheduled session reminders** not implemented. |
| **Session notes** | Coaches document sessions; HIPAA-adjacent. | Implemented (prep notes, session notes, visibility toggle). |

These are treated as **required for a full MVP** in a competitive market, but the same audit allows **launching without** payment and full calendar/email for the **first ~20 custom installs**.

---

### 5.3 What could be add-ons (post-launch or paid extras)

The audit explicitly calls these **add-ons or later-phase** work.

**Tier 2 – competitive differentiators (can be add-ons):**

- Goal tracking (charts, progress toward objectives).
- StrengthsFinder / assessment integration (if not already core).
- Document signing (coaching agreements, NDAs).
- Mobile app or stronger PWA.
- Analytics dashboard (retention, completion rates, revenue).
- Group coaching (webinars, cohorts, forums).
- White-label / branding (custom domain, logo, colors).

**Tier 3 – nice-to-have:**

- Multi-coach practices.
- Client testimonials / reviews (collection and display).
- Blog / content marketing (CMS).
- Referral system.
- AI (e.g. session summaries, action-item extraction).

**Explicit add-on services (audit pricing):**

- Hosting & maintenance (e.g. $100/month or $1,000/year).
- Ongoing feature updates (e.g. $200/month).
- Migration from another platform (e.g. one-time fee).
- Custom feature development (e.g. hourly).
- Training / workshops (e.g. fixed fee per workshop).

**In this codebase:**  
Testimonials table exists but no admin or public API; goal tracking and analytics are not built; group coaching and multi-coach are out of scope per PRD. So the report’s existing “Medium/low priority” items (testimonials from DB, engagement metrics, configurable pricing, etc.) line up with these add-on / Tier 2–3 categories.

---

### 5.4 Combined view: MVP launch vs add-ons

| Category | For MVP launch (demos / first customers) | Add-ons / post-launch |
|----------|------------------------------------------|------------------------|
| **Auth & portals** | Done. | — |
| **Sessions & notes** | Done. | — |
| **Action items** | Done. | — |
| **Intake → client** | **Needed** (create account/profile on accept). | — |
| **Data deletion** | **Needed** (GDPR-aligned). | — |
| **Session reminders** | Can defer (“check platform manually”). | Implement when scaling (scheduled job). |
| **Payment** | Optional; manual invoicing OK. | Stripe (or similar) for scale. |
| **Calendar** | Fake it (e.g. Calendly embed / meeting link). | Full booking + calendar sync later. |
| **Video** | Meeting link sufficient. | Embedded Zoom/Meet if desired. |
| **Testimonials** | Get 3–5 externally; can keep hardcoded. | DB + admin + public API. |
| **Pricing page** | Clear tiers on landing. | Configurable from DB/config. |
| **Goal tracking, analytics, SF, white-label, group, AI** | Not required for launch. | Add-on or Phase 2. |

This section reflects the external audit’s MVP vs add-on split; the rest of the report (e.g. §1–4) is unchanged and still reflects the current codebase and PRD.
