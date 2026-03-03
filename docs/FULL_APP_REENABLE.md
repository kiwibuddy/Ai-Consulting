# Full App Mode Re-Activation

When you're ready to bring the full app back (coach/client dashboards, sessions, login), follow these steps. No schema or code changes are required; this is DNS and deployment visibility.

## Prerequisites

- Railway project for Ai-Consulting is still in place (not deleted).
- Postgres and env vars (`DATABASE_URL`, `SESSION_SECRET`, `APP_URL`, etc.) are still set in Railway.

## 1. Bring the backend up on Railway

1. In [Railway](https://railway.app), open your Ai-Consulting project.
2. Ensure the service is **not** paused or scaled to zero.
3. Trigger a deploy from the latest `main` if needed (or leave as-is if already running).
4. In **Settings → Networking**, add custom domain **`app.nathanielbaldock.com`**.
5. Note the target Railway gives you (e.g. `your-app.up.railway.app`).

## 2. Point app subdomain in DNS

1. In your DNS provider (e.g. Vercel Domains or your registrar), add a **CNAME** record:
   - **Name:** `app`
   - **Value:** the Railway hostname (e.g. `your-app.up.railway.app`).
2. Wait for DNS and SSL to propagate (often a few minutes).

## 3. Set backend env for app subdomain

1. In Railway → your app service → **Variables**, set:
   - **APP_URL** = `https://app.nathanielbaldock.com`
2. Redeploy if you changed env so the server picks it up.
3. If you use Google OAuth, add `https://app.nathanielbaldock.com/api/auth/google/callback` to authorised redirect URIs in Google Cloud Console.

## 4. Re-enable app entry in the marketing site

1. In Vercel (or wherever the marketing site is hosted), set:
   - **VITE_MARKETING_MODE** = `false` (or remove it).
2. Redeploy the frontend so **Sign In** appears again in the header and mobile nav.
3. Optionally keep **VITE_BOOKING_URL** set so the intake page still offers the 30-min booking link; the form can remain as an alternative.

## 5. Restore login/dashboard links

- With `VITE_MARKETING_MODE` off, **Sign In** is already back in the nav.
- Update any CTAs or docs that should point to the app: use **`https://app.nathanielbaldock.com`** for login and dashboard (e.g. “Sign in” → `https://app.nathanielbaldock.com/login`).
- If you want the root domain to redirect logged-in users to the app, you can add a redirect rule (e.g. in Vercel or in the app) so that `nathanielbaldock.com/login` redirects to `app.nathanielbaldock.com/login`. Optional.

## 6. Validate

- Open `https://app.nathanielbaldock.com` and confirm the app loads.
- Sign in (email or Google) and check coach and client dashboards, sessions, and core flows.
- Confirm session cookies and redirects use `app.nathanielbaldock.com` and that nothing points to the old single-domain URL unless intended.

## 7. Optional: intake and speaking behaviour

- **Intake:** If you keep **VITE_BOOKING_URL** set, the intake page continues to show “Book a 30-min call” as well as the form; the form again posts to `/api/intake` when the backend is live.
- **Speaking invite:** With **VITE_MARKETING_MODE** off, the speaking form again submits to `/api/intake` instead of opening mailto.

## Quick checklist

- [ ] Railway service running; custom domain `app.nathanielbaldock.com` added.
- [ ] DNS CNAME `app` → Railway hostname.
- [ ] `APP_URL` and OAuth redirect (if used) updated for `app.nathanielbaldock.com`.
- [ ] `VITE_MARKETING_MODE` set to `false` (or unset) and frontend redeployed.
- [ ] Sign In and app links point to `app.nathanielbaldock.com` where appropriate.
- [ ] Login, coach dashboard, and client dashboard tested.
