# AI Consulting Website Conversion — Full Plan

## Overview

Convert the coaching site to an AI consulting site: (1) **Phase 1** — landing page content and visuals; (2) **Phase 2** — **all backend files and all app pages** updated from coach/coaching to consultant/consulting terminology, including API routes, server code, shared schema (with migration strategy), and client UI.

---

## Phase 1: Landing Page (unchanged summary)

- [client/src/pages/landing.tsx](client/src/pages/landing.tsx): Hero, nav, footer, new sections (Market Reality, Who I Help, Core AI x6, How Engagements Work, About, Why Choose, Testimonials placeholders, Investment, Contact CTA). New constants and copy; same Tailwind/Framer Motion.
- Optional: hero/about images in [client/public/](client/public/).

---

## Phase 2: Coach → Consultant (Backend + All Pages)

All backend files and all app pages must use **consultant** (and **consulting**) instead of **coach** (and **coaching**) in:

- User-facing copy (UI labels, emails, messages)
- API route paths and middleware names
- Code identifiers (variables, functions, types) where they represent “the consultant”
- Database enum and, optionally, table/column names (with migration)

**“Client”** stays as-is (clients of the consultant).

---

### 2.1 Strategy: DB and API paths

Two approaches:

| Approach | DB enum / tables | API paths | Pros | Cons |
|----------|------------------|-----------|------|------|
| **A) UI-only** | Keep `user_role = 'coach'`, keep `coaching_sessions`, `coach_settings`, etc. | Keep `/api/coach/*` | No migrations; minimal risk | URLs and DB still say “coach” |
| **B) Full rename** | Migrate to `user_role = 'consultant'`; optionally rename tables to `consulting_sessions`, `consultant_settings` | Change to `/api/consultant/*` | Consistent terminology everywhere | Requires migration and updating every reference |

**Recommendation:** Use **B) Full rename** so that “all backend files and pages” truly use consultant/consulting. Implementation steps below assume B; if you choose A, skip migration and API path renames and only change display strings and client-side route labels.

---

### 2.2 Shared schema and database

**File:** [shared/schema.ts](shared/schema.ts)

- **Enum:** Change `user_role` from `["coach", "client"]` to `["consultant", "client"]`. Requires a **DB migration**: add new enum value `consultant`, backfill existing `coach` users to `consultant`, drop `coach` from enum (or leave both during transition).
- **Tables/columns (optional but consistent):**
  - `coaching_sessions` → `consulting_sessions` (table name); columns like `requestedBy: 'client' | 'consultant'`, comments “consultant” instead of “coach”.
  - `coach_settings` → `consultant_settings`; column comments “consultant’s portal”.
  - `client_profiles`: columns `previousCoaching` / `previousCoachingExperience` → e.g. `previousConsulting` / `previousConsultingExperience`; `coachNotes` → `consultantNotes`.
- **Relations and types:** Rename all exports (e.g. `coachingSessions` → `consultingSessions`, `CoachSettings` → `ConsultantSettings`, `coachingSessionsRelations` → `consultingSessionsRelations`). Update [shared/models/auth.ts](shared/models/auth.ts) role type to `'consultant' | 'client'`.

**Migration:** Add a Drizzle migration that: (1) creates new enum value / new tables if renaming; (2) copies data; (3) drops old columns/tables or old enum value. Run after schema code is updated and all references are switched.

---

### 2.3 Server — routes and middleware

**File:** [server/routes.ts](server/routes.ts)

- **Middleware:** Rename `requireCoach` → `requireConsultant`; check `role === "consultant"` (or keep `"coach"` if using approach A).
- **API base path:** Replace `/api/coach/` with `/api/consultant/` for all coach-only routes (clients, intake, sessions, resources, actions, settings, payments, invoices, analytics). Keep route logic; only path and role check change.
- **Internal logic:** Replace variable names like `coaches` → `consultants`, `coach` → `consultant` in loops and messages. Replace string literals “coach” in session flow (e.g. `requestedBy: "consultant"`, “requested by consultant”, “confirmed by consultant”).
- **Notifications:** “Notify all coaches” → “Notify all consultants”; use `getUsersByRole("consultant")` when enum is updated.
- **Emails:** Pass “consultant” display name into email helpers instead of “Coach”; session confirmation/request copy “your coach” → “your consultant”.

---

### 2.4 Server — storage

**File:** [server/storage.ts](server/storage.ts)

- Replace imports and usages of `coachingSessions`, `coachSettings` with `consultingSessions`, `consultantSettings` (matching schema renames).
- Any comment or log that says “coach” → “consultant”.

---

### 2.5 Server — auth

**File:** [server/auth/routes.ts](server/auth/routes.ts)

- Redirect: `role === "coach"` → `role === "consultant"` (and redirect to `/consultant/dashboard` if client routes are renamed).
- Registration/default role: `role === "coach"` → `role === "consultant"` when assigning role.

---

### 2.6 Server — email templates

**File:** [server/lib/email.ts](server/lib/email.ts)

- **From name / default:** “Holger Coaching” → e.g. “AI Consulting” or your chosen sender name.
- **Functions:** Parameter names like `coachEmail` → `consultantEmail` where they denote the consultant’s address.
- **Copy:** Replace all user-facing “coach”/“coaching” with “consultant”/“consulting”, e.g.:
  - “Your coach” → “Your consultant”
  - “coaching dashboard” → “consultant dashboard” or “consulting portal”
  - “coaching session” → “consultation” or “consulting session”
  - “coaching application” → “consultation request” or “application”
  - “coaching portal” → “client portal” or “consulting portal”
- **Links:** If you change client routes, update `/coach/` to `/consultant/` in URLs (e.g. billing link).

---

### 2.7 Server — other libs and jobs

- **[server/lib/calendar.ts](server/lib/calendar.ts):** Imports and references to `coachingSessions` → `consultingSessions`; comments “coach” → “consultant”.
- **[server/lib/analytics.ts](server/lib/analytics.ts):** Same: `coachingSessions` → `consultingSessions`; comments “for coach view” → “for consultant view”.
- **[server/jobs/sessionReminders.ts](server/jobs/sessionReminders.ts):** `coachingSessions` → `consultingSessions`; email body “coaching session” → “consultation” or “consulting session”.

---

### 2.8 Client — routing and app shell

**File:** [client/src/App.tsx](client/src/App.tsx)

- Route paths: `/coach` → `/consultant` (e.g. `/consultant`, `/consultant/dashboard`, `/consultant/clients`, …). Keep `/client/*` as-is.
- Redirect after login: `user.role === "coach"` → `user.role === "consultant"` and navigate to `/consultant` (or keep role value `"coach"` in API and only change path to `/consultant` if you prefer not to change enum yet).
- Any visible “Coach” label in app shell → “Consultant”.

---

### 2.9 Client — consultant (ex-coach) pages

**Directory:** [client/src/pages/coach/](client/src/pages/coach/)

- **Option 1:** Rename folder `coach/` → `consultant/` and update all imports and route definitions in App.tsx and any links (e.g. sidebar).
- **Option 2:** Keep folder name `coach/` for fewer file renames, but change every user-visible string to “Consultant” / “consulting” / “consultation”.
- In every page under this directory: replace headings, titles, empty states, and copy “Coach” → “Consultant”, “coaching” → “consulting”, “session” → “consultation” where it refers to consultant–client meetings. Update any API base path from `/api/coach/` to `/api/consultant/` in [client/src/lib/queryClient.ts](client/src/lib/queryClient.ts) or per-page request URLs.

---

### 2.10 Client — client-facing pages

**Directory:** [client/src/pages/client/](client/src/pages/client/)

- Replace user-facing “coach”/“coaching” with “consultant”/“consulting” (e.g. “Your coach”, “coaching session”, “Message your coach” → “Your consultant”, “consultation”, “Message your consultant”). No path change for `/client/*` unless you want to rename to something like `/portal` (optional).

---

### 2.11 Client — shared components

- **[client/src/components/app-sidebar.tsx](client/src/components/app-sidebar.tsx):** “Coach” / “Coach dashboard” → “Consultant” / “Consultant dashboard”; links `/coach/*` → `/consultant/*` if routes are renamed.
- **[client/src/components/demo-login-dialog.tsx](client/src/components/demo-login-dialog.tsx):** Role label “Coach” → “Consultant”; redirect after login to `/consultant` when role is consultant.
- **Command palette, onboarding, modals, notifications:** Any “coach”/“coaching” in copy or links → “consultant”/“consulting” and `/consultant` where applicable.

---

### 2.12 Client — intake and auth pages

- **[client/src/pages/intake.tsx](client/src/pages/intake.tsx):** Form labels and body copy “coaching” → “consulting”; “Meet & Greet” / “coaching application” → “Request a consultation” / “consultation request”. API endpoint may stay or change to `/api/consultant/...` depending on backend.
- Forgot/reset password and auth flows: replace “coaching” in any message with “consulting” if present.

---

### 2.13 Scripts and config

- **[script/seed.ts](script/seed.ts):** If it creates users or sessions, use role `"consultant"` and any new table/column names from schema.
- **Environment / README:** Replace references to “coaching” app with “AI consulting” or “consulting portal” where relevant.

---

## Implementation order (Phase 2)

1. **Schema and migration** — Update [shared/schema.ts](shared/schema.ts) (enum, table/column renames, types); add and run Drizzle migration.
2. **Server** — [server/storage.ts](server/storage.ts), [server/routes.ts](server/routes.ts) (middleware, API paths, variables, copy), [server/auth/routes.ts](server/auth/routes.ts), [server/lib/email.ts](server/lib/email.ts), [server/lib/calendar.ts](server/lib/calendar.ts), [server/lib/analytics.ts](server/lib/analytics.ts), [server/jobs/sessionReminders.ts](server/jobs/sessionReminders.ts).
3. **Client API base** — Ensure all fetch calls use `/api/consultant/` and role checks use `"consultant"` where applicable.
4. **Client routes and app shell** — [client/src/App.tsx](client/src/App.tsx) paths and redirects; optionally rename [client/src/pages/coach/](client/src/pages/coach/) to `consultant/` and update imports.
5. **Client pages** — All consultant (ex-coach) and client pages: copy and links.
6. **Client components** — Sidebar, demo login, command palette, onboarding, modals.
7. **Intake and auth** — Intake form copy and any auth-related strings.
8. **Scripts and docs** — Seed script and README/env notes.

---

## Files to modify (Phase 2 summary)

| Area | Files |
|------|--------|
| **Shared** | [shared/schema.ts](shared/schema.ts), [shared/models/auth.ts](shared/models/auth.ts) |
| **Server** | [server/routes.ts](server/routes.ts), [server/storage.ts](server/storage.ts), [server/auth/routes.ts](server/auth/routes.ts), [server/lib/email.ts](server/lib/email.ts), [server/lib/calendar.ts](server/lib/calendar.ts), [server/lib/analytics.ts](server/lib/analytics.ts), [server/jobs/sessionReminders.ts](server/jobs/sessionReminders.ts) |
| **Client** | [client/src/App.tsx](client/src/App.tsx), all [client/src/pages/coach/*](client/src/pages/coach/), all [client/src/pages/client/*](client/src/pages/client/), [client/src/pages/intake.tsx](client/src/pages/intake.tsx), [client/src/components/app-sidebar.tsx](client/src/components/app-sidebar.tsx), [client/src/components/demo-login-dialog.tsx](client/src/components/demo-login-dialog.tsx), plus command-palette, onboarding, modals, notifications as needed |
| **Scripts** | [script/seed.ts](script/seed.ts) |
| **DB** | New Drizzle migration for enum and optional table renames |

This plan ensures **all backend files and pages** are updated from coach to consultant (and coaching to consulting) as requested.
