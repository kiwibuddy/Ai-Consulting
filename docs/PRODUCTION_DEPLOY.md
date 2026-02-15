# Production deploy checklist

Use this when deploying to Railway (or similar) so the site and intake form work correctly.

## 1. Required environment variables

In **Railway → your project → Variables**, set:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection URL (Railway Postgres plugin provides this; link it to your service). |
| `SESSION_SECRET` | Random string for session cookies (e.g. `openssl rand -hex 32`). |
| `APP_URL` | Full URL of the app (e.g. `https://nathanielbaldock.com`). |

Optional but recommended:

- `SITE_CONTACT_EMAIL` – Receives intake form notifications (see `shared/constants.ts`).
- `RESEND_API_KEY` + `RESEND_FROM_EMAIL` – So confirmation and notification emails are sent for intake submissions.
- `NODE_ENV=production` – Usually set automatically by Railway.

## 2. Database schema (fixes “Failed to submit intake form”)

The app expects the `intake_forms` table (and other schema) to exist. If it’s missing, the server will **fail at startup** with a clear message and tell you to run the schema push.

**Option A – One-time (or after schema changes)**  
From your machine, using the **production** database URL:

```bash
DATABASE_URL="postgresql://..." npm run db:push
```

Use the same `DATABASE_URL` Railway uses (from Variables or from the Postgres plugin).

**Option B – Automatic on each deploy (Railway)**  
In Railway → your service → **Settings**:

- **Release Command:** `npm run db:push`
- **Start Command:** leave as `npm start` (or whatever runs the app)

Railway runs the release command before starting the new instance, so the schema is applied on every deploy.

## 3. Startup checks

In production the server:

- Exits immediately if `DATABASE_URL` or `SESSION_SECRET` is missing.
- Runs a DB health check before listening: connects and verifies `intake_forms` exists. If the connection fails or the table is missing, it logs a clear error and exits so you see the problem in deploy logs instead of a generic 500 on the first form submit.

## 4. If intake form still returns 500

1. Check **Railway logs** for the deploy. Look for `[startup]` messages or `Intake form error:` (the latter appears when a submit fails and includes the real error).
2. Confirm `DATABASE_URL` points at the same database you ran `db:push` against.
3. Ensure the Postgres service is running and reachable from your app service (same project / private network on Railway).
