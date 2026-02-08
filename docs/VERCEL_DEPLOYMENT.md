# Deploying to nathanielbaldock.com via Vercel

This guide covers connecting your **Nathaniel Baldock AI Consulting** site to the domain **nathanielbaldock.com** you purchased with Vercel.

## Your setup

- **Brand:** Nathaniel Baldock AI Consulting
- **Domain:** nathanielbaldock.com (purchased with Vercel)
- **Project:** Full-stack app (Express + React + PostgreSQL)

---

## Option A: Deploy full app to Railway (recommended)

This app is a full-stack Node/Express app with a database, auth, and file storage. **Railway** or **Render** are better suited for this than Vercel’s serverless model.

### Steps

1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app) and sign in with GitHub
   - New Project → Deploy from GitHub repo (your Ai-Consulting repo)
   - Add a PostgreSQL database (Railway → New → Database → PostgreSQL)
   - Set env vars (see `.env.example`), including:
     - `DATABASE_URL` (from Railway Postgres)
     - `SESSION_SECRET`
     - `APP_URL=https://nathanielbaldock.com`
     - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (OAuth)
     - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (email)
   - Deploy; Railway will build and run the app, and give you a URL (e.g. `your-app.up.railway.app`)

2. **Point nathanielbaldock.com to Railway**
   - In **Vercel** → Domains → nathanielbaldock.com → Configure
   - Add a CNAME record pointing to your Railway URL, or configure DNS in Vercel to point to Railway’s IP
   - Or: In **Railway** → your project → Settings → Domains → add `nathanielbaldock.com` and follow Railway’s DNS instructions (often easier if the domain is managed by Vercel)

3. **Alternative: domain in Vercel, backend elsewhere**
   - Keep the domain in Vercel
   - In Vercel Domains → nathanielbaldock.com → DNS
   - Add a CNAME record: `@` (or `www`) → `your-app.up.railway.app`
   - Or an A record to Railway’s IP (Railway will show the exact target)

---

## Option B: Deploy to Vercel (static + API)

Vercel can host the frontend and run the backend as serverless functions. This requires refactoring the Express app for serverless and has limits (e.g. no WebSockets, session timeouts).

### Prerequisites

- PostgreSQL (e.g. Vercel Postgres, Supabase, Neon)
- All env vars in Vercel Project Settings → Environment Variables

### Steps

1. **Connect repo to Vercel**
   - [vercel.com](https://vercel.com) → Add New Project → Import your GitHub repo
   - Framework: Other (no framework)
   - Build Command: `npm run build` (already in `vercel.json`)
   - Output Directory: `dist/public` (already in `vercel.json`)
   - Root Directory: `./` (project root)

2. **Environment variables**
   - Add all vars from `.env.example` (and any extras you use)
   - Set `APP_URL=https://nathanielbaldock.com`
   - Add `VERCEL=1` (for serverless detection)

3. **Domain**
   - Project → Settings → Domains → Add `nathanielbaldock.com`
   - Vercel will configure DNS if the domain is in your Vercel account

4. **Deploy**
   - Push to `main` to trigger a deploy, or use the Vercel dashboard to redeploy

**Note:** The current `vercel.json` is set up for static hosting. Running the full Express backend on Vercel requires an API handler and server refactor. For a quick live site, Option A (Railway) is simpler.

---

## After deployment

1. **Google OAuth**
   - Add `https://nathanielbaldock.com/api/auth/google/callback` to the Google Cloud Console OAuth client’s authorized redirect URIs.

2. **Testing**
   - Visit `https://nathanielbaldock.com` and confirm the hero headline: **“AI Consulting Grounded in 20+ Years of Global Mission Work”**.

3. **HTTPS**
   - Vercel and Railway both provide HTTPS automatically.

---

## Quick reference: env vars for production

```env
DATABASE_URL=postgresql://...
SESSION_SECRET=<64-char-hex>
APP_URL=https://nathanielbaldock.com
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=Nathaniel Baldock AI Consulting <noreply@nathanielbaldock.com>
```
