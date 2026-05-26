# Kiwi Clarity AI — Cursor Implementation Brief
## Getting the AI Use Audit tool fully live on nathanielbaldock.com

**What this is:** A complete step-by-step guide for Cursor to integrate four files into the existing nathanielbaldock.com codebase and get the AI Use Audit tool live with every feature working.

**Where things live:** The server code goes into the existing `nathanielbaldock.com` repository. It shares the Railway deployment, Postgres database, Drizzle ORM, and Resend email setup already running there. Do not create a new repository for the server code.

**About the GitHub repo question:** Create a new repo only for the static HTML files if you want a separate `kiwiclarityai.co.nz` site later. For now, serve the HTML from the existing server as described in Phase 4.

---

## The four files

| File | What it is | Where it goes |
|------|-----------|---------------|
| `Kiwi_Clarity_Audit_Tool_v3.html` | Client-facing audit tool | Served as a static HTML file |
| `audit-route.ts` | Express router with two API endpoints | `server/routes/audit.ts` |
| `schema-addition.ts` | One new Drizzle table definition | Add content to `shared/schema.ts` |
| `Kiwi_Clarity_Companion_Tool.html` | Nathaniel's internal pre-call briefing tool | Served as a static HTML file |

---

## Phase 1 — Update the database schema

**1.1 Open `shared/schema.ts` and add the following import at the top alongside the existing imports:**

```typescript
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
```

If those imports already exist, skip this step.

**1.2 Add this table definition at the bottom of `shared/schema.ts`:**

```typescript
// Tracks team invite sessions for the AI Use Audit tool.
// Stores NO personal data — only counts.
export const auditSessions = pgTable("audit_sessions", {
  token: text("token").primaryKey(),
  bizName: text("biz_name").notNull().default(""),
  invitedCount: integer("invited_count").notNull().default(0),
  respondedCount: integer("responded_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AuditSession = typeof auditSessions.$inferSelect;
export type NewAuditSession = typeof auditSessions.$inferInsert;
```

**1.3 Push the schema to the database:**

```bash
npm run db:push
```

Confirm the `audit_sessions` table now exists in your Railway Postgres instance.

---

## Phase 2 — Add the server route

**2.1 Copy `audit-route.ts` into the project as `server/routes/audit.ts`.**

**2.2 Open your main server entry file** (likely `server/index.ts` or `server/app.ts` — wherever your other routes are registered) and add:

```typescript
import auditRouter from "./routes/audit";

// Add alongside your other route registrations
app.use("/api/audit", auditRouter);
```

**2.3 Verify the imports in `server/routes/audit.ts`.**

The file imports from `"../db"` and `"../../shared/schema"`. Check these paths match your project structure. Compare against an existing route file (e.g. the intake or session route) to confirm the relative path depth is correct. Adjust if needed.

**2.4 Check the Resend `scheduledAt` support.**

The invite endpoint uses Resend's scheduled send feature:

```typescript
scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
```

If TypeScript throws a type error on `scheduledAt`, add a type assertion on that email send call. Check your installed version of the `resend` package. If it is below `2.0.0`, upgrade it:

```bash
npm install resend@latest
```

If the type error persists after upgrading, wrap the scheduled send call:

```typescript
await (resend.emails.send as Function)({
  from: FROM_EMAIL,
  to: email,
  subject: `...`,
  html: buildTeamReminderEmail(bizName, surveyUrl),
  scheduledAt: twodays,
});
```

---

## Phase 3 — Set environment variables on Railway

Open your Railway project dashboard, go to the service's Variables tab, and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `AUDIT_CONSULTANT_EMAIL` | `nathanielbaldock@gmail.com` | Your Gmail. Resend delivers to any inbox — no custom domain needed. |
| `AUDIT_TOOL_URL` | `https://nathanielbaldock.com/audit` | The URL where the audit HTML will be served (see Phase 4). |
| `AUDIT_CALENDAR_URL` | Your Google Calendar booking URL | Already hardcoded in the HTML but also used by the server. |

The following variables should already exist from your current setup. Confirm they are present:

- `DATABASE_URL` — Railway Postgres connection string
- `RESEND_API_KEY` — Your Resend API key
- `RESEND_FROM_EMAIL` — Already set to `noreply@nathanielbaldock.com` or similar. No change needed.
- `PUBLIC_SITE_URL` — `https://nathanielbaldock.com`

---

## Phase 4 — Serve the HTML files

The audit tool and companion tool are self-contained single HTML files. They need to be accessible at a URL.

**4.1 Find where your server serves static files.**

Look for a line like `app.use(express.static(...))` in your server entry file, or a `public/` folder at the project root. If you already serve static assets, use that same folder.

If no static serving exists yet, add this to your server entry file **before** your route registrations:

```typescript
import path from "path";
app.use(express.static(path.join(__dirname, "../public")));
```

**4.2 Create a `public/` folder at the project root if it does not exist.**

**4.3 Place the HTML files:**

- Copy `Kiwi_Clarity_Audit_Tool_v3.html` → rename to `audit.html` → place in `public/audit.html`
- Copy `Kiwi_Clarity_Companion_Tool.html` → rename to `companion.html` → place in `public/companion.html`

The audit tool will now be accessible at:
```
https://nathanielbaldock.com/audit
```

Team survey links will look like:
```
https://nathanielbaldock.com/audit?team=TOKEN&biz=BusinessName
```

The companion tool will be accessible at:
```
https://nathanielbaldock.com/companion
```

> **Note:** The companion tool is internal. You may want to add basic auth or move it to a private route later. For now, it is low-risk because it only reads data pasted into it — it has no server connection of its own.

**4.4 Update the constants at the top of `public/audit.html`.**

Open the file and find the config block near the top of the `<script>` tag:

```javascript
var API_SUBMIT = 'https://nathanielbaldock.com/api/audit/submit';
var API_INVITE = 'https://nathanielbaldock.com/api/audit/invite';
var CONSULTANT_EMAIL = 'nathanielbaldock@gmail.com';
var CALENDAR_URL = 'https://calendar.google.com/...';
```

Update `CONSULTANT_EMAIL` to `nathanielbaldock@gmail.com`. Resend sends TO any email address — your Gmail inbox is fine and no custom domain email is needed.

Update `CALENDAR_URL` to your actual Google Calendar booking link.

The `API_SUBMIT` and `API_INVITE` URLs should already point to the correct paths once the route is registered.

---

## Phase 5 — CORS configuration

If the HTML is served from the same domain as the API (both on `nathanielbaldock.com`), CORS is not an issue and you can skip this phase.

If you later move the HTML to a separate domain (e.g. `kiwiclarityai.co.nz`), add CORS configuration to your server:

```bash
npm install cors @types/cors
```

```typescript
import cors from "cors";

app.use(cors({
  origin: [
    "https://nathanielbaldock.com",
    "https://kiwiclarityai.co.nz",
    // during development:
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST"],
}));
```

---

## Phase 6 — Email setup (nothing to do right now)

All consultant notification emails go to `nathanielbaldock@gmail.com`. Resend already sends from the verified `noreply@nathanielbaldock.com` domain. No additional email configuration is required.

When you register `kiwiclarityai.co.nz` in the future and want a professional sender address:

1. Go to Resend dashboard → Domains → Add Domain → enter `kiwiclarityai.co.nz`
2. Add the DNS records Resend provides to your domain registrar
3. Update `RESEND_FROM_EMAIL` on Railway to: `Kiwi Clarity AI <noreply@kiwiclarityai.co.nz>`
4. Update `AUDIT_CONSULTANT_EMAIL` on Railway to: `hello@kiwiclarityai.co.nz`
5. Update `CONSULTANT_EMAIL` in the audit tool HTML

Until then, everything works as-is with Gmail.

---

## Phase 7 — Testing checklist

Work through these in order. Do not consider any item done until you have confirmed the result, not just that the code ran without errors.

### Schema
- [ ] Run `npm run db:push` without errors
- [ ] Confirm `audit_sessions` table exists in Railway Postgres (check via Railway dashboard or a Drizzle query)

### Owner audit flow
- [ ] Open `https://nathanielbaldock.com/audit` in a browser — welcome screen loads
- [ ] Fill in business name, sector, size
- [ ] Add 1 test email address in the invite section
- [ ] Tick consent, click submit
- [ ] Confirm `s1b` transition screen shows "1 survey sent"
- [ ] Complete the full owner audit through to submit
- [ ] Confirm the owner results email arrives at the test address
- [ ] Confirm Nathaniel's consultant email arrives with the full JSON payload
- [ ] Confirm the `audit_sessions` row exists in the database with `invited_count: 1`

### Team survey flow
- [ ] Open the team survey URL from the invite email
- [ ] Confirm the business name appears in the header badge
- [ ] Complete the survey anonymously
- [ ] Submit — confirm the anonymous confirmation overlay appears
- [ ] Confirm Nathaniel's team result email arrives tagged with the business name
- [ ] Confirm `responded_count` incremented to 1 in `audit_sessions`

### Reminder email
- [ ] Check Resend dashboard — confirm a scheduled email exists for 48 hours after the invite was sent
- [ ] If `scheduledAt` is not supported by your Resend version and you used the workaround, confirm the scheduled email still appears in the queue

### Companion tool
- [ ] Open `https://nathanielbaldock.com/companion`
- [ ] Copy the JSON from Nathaniel's consultant email
- [ ] Paste into the companion tool, click Load
- [ ] Confirm the briefing renders with the correct business name, tool findings, and interview prompts

### Edge cases
- [ ] Submit the owner audit with 0 invite emails — confirm the tool skips the invite API call and goes straight to the audit
- [ ] Submit the owner audit with an invalid email in the invite list — confirm the server handles it gracefully (does not crash)
- [ ] Navigate to the audit URL with `?team=INVALID_TOKEN&biz=Test` — confirm the team survey loads without crashing even though the token is not in the database (the responded_count update will silently fail, which is acceptable)

---

## Phase 8 — New GitHub repository (for kiwiclarityai.co.nz, future)

When you are ready to build a separate public-facing site for the Kiwi Clarity AI brand, create a new repository at that point. Do not create it now — the current setup is faster to ship and uses proven infrastructure.

When the time comes:

1. Create a new repo: `kiwi-clarity-ai` (or `kiwiclarityai-site`)
2. Set up a new Railway service pointing to that repo
3. Create a new Postgres database in Railway for that service
4. Copy the `audit-route.ts`, `schema-addition.ts`, and relevant email templates across
5. Set all environment variables on the new Railway service
6. Register `kiwiclarityai.co.nz` and configure DNS
7. Move the audit and companion HTML to that site's public folder
8. Update `API_SUBMIT`, `API_INVITE`, and `CONSULTANT_EMAIL` constants in the HTML

---

## Quick reference: what each API endpoint does

### `POST /api/audit/invite`
Accepts: `{ bizName, bizSector, bizSize, emails: string[] }`
Actions:
1. Generates a UUID token
2. Stores `{ token, bizName, invitedCount: emails.length, respondedCount: 0 }` in `audit_sessions`
3. For each email: sends an invite email immediately via Resend
4. For each email: schedules a reminder email for 48 hours later via Resend
5. Returns: `{ token, invitedCount }`

### `POST /api/audit/submit` (owner)
Accepts: `{ isTeam: false, bizName, tools[], emails[], inviteToken, ... }`
Actions:
1. Sends the client their results email (styled, with RAG summary and per-tool guidance)
2. Sends Nathaniel his consultant briefing email (includes full JSON payload for companion tool)
3. Returns: `{ ok: true }`
4. Writes nothing to the database

### `POST /api/audit/submit` (team member)
Accepts: `{ isTeam: true, teamToken, bizName, memberName, tools[], ... }`
Actions:
1. Increments `responded_count` in `audit_sessions` for that token
2. Sends Nathaniel a team result email (includes `howHelps` insights pulled into a highlighted section)
3. Does NOT send anything to the team member — confirmation is a browser overlay only
4. Returns: `{ ok: true }`

---

## Files summary — exactly what goes where

```
existing-nathanielbaldock-repo/
├── shared/
│   └── schema.ts              ← ADD the auditSessions table from schema-addition.ts
├── server/
│   └── routes/
│       └── audit.ts           ← NEW FILE — copy from audit-route.ts
├── server/
│   └── index.ts (or app.ts)   ← ADD: import and register auditRouter
└── public/
    ├── audit.html             ← NEW FILE — rename from Kiwi_Clarity_Audit_Tool_v3.html
    └── companion.html         ← NEW FILE — rename from Kiwi_Clarity_Companion_Tool.html
```

---

## Known issues and notes for Cursor

**Resend `scheduledAt` type:** The TypeScript types in older Resend SDK versions do not include `scheduledAt`. The route uses a type cast to work around this. If you see a TypeScript error, upgrade the `resend` package to the latest version first. If the error persists, the type cast approach in the route file handles it.

**Token collision:** UUID v4 collision probability is negligible for the volume expected (under 10,000 sessions). No collision handling is needed.

**Drizzle import paths:** The route imports `db` from `"../db"` and `auditSessions` from `"../../shared/schema"`. These paths assume the file is at `server/routes/audit.ts`. If your project structure differs, adjust accordingly.

**No auth on companion tool:** The companion tool at `/companion` is publicly accessible by URL. It only reads data pasted into it and makes no server calls, so exposure risk is low. If Nathaniel wants it protected, add a simple HTTP Basic Auth middleware to that route, or move the file off the public server entirely and open it locally from his desktop.

**Rate limiting:** The `/api/audit/invite` and `/api/audit/submit` endpoints are not rate limited in the current implementation. For a low-volume tool with 10 clients, this is acceptable. If you deploy this more widely, add `express-rate-limit` to the invite endpoint to prevent invite spam.

---

*Prepared by Nathaniel Baldock using Claude (Anthropic) and NotebookLM for research. Reviewed and approved by Nathaniel Baldock.*
