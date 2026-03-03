# Step-by-step: Reconfigure Vercel, Point Domain at Vercel, Remove Root from Railway

Use these steps to **reconfigure your existing Vercel project** (nathanielbaldock_consulting) so the landing page is served from Vercel and no longer from Railway.

---

## Part 1: Reconfigure the existing Vercel project

Work in the **nathanielbaldock_consulting** project (not ai-consulting).

### 1.1 Open the project and check build settings

1. Go to **[vercel.com](https://vercel.com)** and sign in.
2. Open the **nathanielbaldock_consulting** project.
3. Go to **Settings** → **General**.
4. Under **Build & Development Settings**, set or confirm:
   - **Build Command:** `npm run build:client` (not `npm run build` — that builds the full app including server; we only want the client for marketing mode). Turn **Override** on and enter this.
   - **Output Directory:** `dist/public` (not `public`). Turn **Override** on and enter `dist/public`.
   - **Root Directory:** Must be **`.`** (repo root) or **empty**. If it shows anything else (e.g. `redirect-vercel`), clear it or set to `.` so Vercel builds from the repo root where `vercel.json`, `package.json`, and `client/` live.
5. **Production Overrides** (same page): if it shows **Output Directory** as `public`, you can't edit them — they're read-only. Just ensure Project Settings above are correct, then Save. If they still show old values, that's expected; redeploy (step 1.3) and the next build will use the new settings.
6. Click **Save**. Then redeploy (step 1.3) so the next production build uses the new config; the warning will disappear.

### 1.2 Set environment variables (marketing mode)

1. In the same project, go to **Settings** → **Environment Variables**.
2. Add or update:
   - **Name:** `VITE_BOOKING_URL`  
     **Value:** your Google Calendar 30-min booking page URL (e.g. `https://calendar.app.google/...`).  
     **Environment:** Production (and Preview if you want).
   - **Name:** `VITE_MARKETING_MODE`  
     **Value:** `true`  
     **Environment:** Production (and Preview if you want).
3. Save. Any new deployment will use these.

### 1.3 Redeploy and verify the Vercel URL

1. Go to **Deployments**.
2. Open the **⋯** menu on the latest deployment and click **Redeploy** (or push a commit to `main` to trigger a new deploy).
3. When the deploy is **Ready**, open the **Vercel deployment URL** (e.g. `nathanielbaldockconsulting-xxxx.vercel.app` from the deployment card).
4. Confirm you see your **marketing site** (landing, speaking, resources, intake).  
   - Use the **Vercel-assigned URL** (e.g. `nathanielbaldockconsulting-xxxx.vercel.app`) for this check, not nathanielbaldock.com — if your domain still points to Railway, the custom domain will show Railway’s page until you complete Part 2.
5. Once the Vercel URL shows the correct site, continue to Part 2 to point your domain at this project.

---

## Part 2: Point the domain at Vercel

Your domain must point to Vercel instead of Railway so the landing page is served by Vercel.

### 2.1 Add or verify domains in Vercel

1. In **nathanielbaldock_consulting**, open **Settings** (top nav) → **Domains**.
2. Ensure both are listed:
   - **nathanielbaldock.com**
   - **www.nathanielbaldock.com**
3. If either is missing, under “Add”, type the domain and click **Add**.
4. For each domain, Vercel shows the DNS records you need (e.g. A record for root, CNAME for www). Note the target (e.g. `cname.vercel-dns.com` or the A record IP).

### 2.2 Update DNS where your domain is managed

Your domain might be managed in:

- **Vercel Domains** (if you bought it there), or  
- **Another registrar** (e.g. Google Domains, Namecheap, Cloudflare, or where you bought it).

Do the following **where your DNS is** (same place you’d add any A/CNAME records):

1. **Root domain (nathanielbaldock.com):**
   - Either:
     - **A record:** Name `@` (or blank), Value = the IP Vercel shows (e.g. `76.76.21.21`), or  
     - **CNAME (if your DNS allows CNAME on root):** Name `@`, Value = the hostname Vercel gives (e.g. `cname.vercel-dns.com`).
   - Remove or delete any existing A or CNAME for `@` that points to Railway.

2. **www subdomain:**
   - **CNAME record:** Name `www`, Value = the hostname Vercel gives (e.g. `cname.vercel-dns.com`).
   - Remove or delete any existing CNAME for `www` that points to Railway.

3. Save the DNS changes.

### 2.3 Let DNS and SSL settle

- DNS can take from a few minutes up to 24–48 hours (often under 15 minutes).
- In Vercel → **Settings** → **Domains**, each domain will show a status (e.g. “Valid Configuration” or “Pending”). Wait until both show as valid and SSL is active.
- Then open **https://nathanielbaldock.com** and **https://www.nathanielbaldock.com** in a browser; you should see your marketing site (Vercel), not Railway.

---

## Part 3: Stop using the root domain on Railway

So that the root domain is only served by Vercel, remove it from Railway.

### 3.1 Open Railway and your service

1. Go to **[railway.app](https://railway.app)** and sign in.
2. Open your **Ai-Consulting** project (or the service that was serving nathanielbaldock.com).
3. Click the **service** (the app, not the Postgres DB).

### 3.2 Remove the custom domains

1. Go to **Settings** (or the **Networking** / **Domains** tab, depending on Railway’s UI).
2. Under **Custom Domains** (or **Domains**), you should see **nathanielbaldock.com** and/or **www.nathanielbaldock.com** if they were added.
3. For each of these:
   - Click the **three dots** or **Remove** next to the domain.
   - Confirm removal.
4. Do **not** remove the default Railway URL (e.g. `xxx.up.railway.app`). You can keep the project and that URL for later **Full App Mode** at **app.nathanielbaldock.com**.

### 3.3 Confirm

- Visit **https://nathanielbaldock.com** again. You should see your Vercel-hosted marketing site, not a Railway 404 or “train has not arrived” page.
- If you still see Railway, DNS may still be pointing to Railway: re-check Part 2.2 and ensure the A/CNAME records for `@` and `www` point to **Vercel**, not Railway.

---

## Quick checklist

- [ ] **nathanielbaldock_consulting** build settings use `npm run build:client` and `dist/public` (or rely on `vercel.json`).
- [ ] Env vars `VITE_BOOKING_URL` and `VITE_MARKETING_MODE=true` set; redeploy done; Vercel deployment URL shows the marketing site.
- [ ] `nathanielbaldock.com` and `www.nathanielbaldock.com` added in Vercel → Settings → Domains.
- [ ] DNS updated so `@` and `www` point to Vercel (no longer to Railway).
- [ ] Both domains show “Valid” in Vercel and open the marketing site over HTTPS.
- [ ] Root and www removed from Railway custom domains; Railway project kept for later app subdomain.

After this, the landing page is served from Vercel only; Railway is no longer used for the root domain.
