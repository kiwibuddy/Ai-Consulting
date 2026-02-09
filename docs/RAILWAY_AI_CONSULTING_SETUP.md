# Deploy Ai-Consulting to Railway (nathanielbaldock.com)

Step-by-step guide to deploy your **Nathaniel Baldock AI Consulting** site to Railway and connect it to **nathanielbaldock.com**.

---

## Step 1: Sign in to Railway

1. Go to **[railway.app](https://railway.app)**
2. Click **Login** → **Sign in with GitHub**
3. Authorize Railway to access your GitHub account

---

## Step 2: Create a New Project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose **kiwibuddy/Ai-Consulting** (your repo)
4. Select branch **main**
5. Railway will create the project and start a deployment

---

## Step 3: Add PostgreSQL Database

1. In your project, click **+ New**
2. Select **Database** → **PostgreSQL**
3. Railway will provision a PostgreSQL instance
4. Wait for it to finish provisioning (green status)

---

## Step 4: Connect Database to Your App

1. Click on your **Ai-Consulting** service (the main app)
2. Go to **Variables** tab
3. Click **+ New Variable** or **Add Variable Reference**
4. Add **DATABASE_URL**:
   - Click **Add Variable Reference**
   - Select your **Postgres** service
   - Choose **DATABASE_PRIVATE_URL** (internal URL: `postgres.railway.internal`) — preferred for app-to-db within Railway
   - Or **DATABASE_URL** (public URL) — both work; private is faster and more secure within Railway
   - This links the app to the database automatically

---

## Step 5: Add Required Environment Variables

In your app service → **Variables**, add these:

| Variable | Value | Required? |
|----------|-------|-----------|
| **SESSION_SECRET** | Random 64-char string (run `openssl rand -hex 32` locally) | ✅ Yes |
| **APP_URL** | `https://nathanielbaldock.com` | ✅ Yes |
| **NODE_ENV** | `production` | ✅ Yes |

**Optional** (add later if you use them):

| Variable | Value |
|----------|-------|
| **GOOGLE_CLIENT_ID** | From Google Cloud Console |
| **GOOGLE_CLIENT_SECRET** | From Google Cloud Console |
| **RESEND_API_KEY** | From [resend.com](https://resend.com) |
| **RESEND_FROM_EMAIL** | `Nathaniel Baldock AI Consulting <noreply@nathanielbaldock.com>` |
| **STRIPE_SECRET_KEY** | If using payments |
| **PAYPAL_CLIENT_ID** / **PAYPAL_CLIENT_SECRET** | If using PayPal |

---

## Step 6: Generate SESSION_SECRET

On your Mac, run in Terminal:

```bash
openssl rand -hex 32
```

Copy the output and paste it as the value for **SESSION_SECRET** in Railway.

---

## Step 7: Configure Build & Start (if needed)

Railway usually auto-detects Node.js. If not, in your app service → **Settings**:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Root Directory** | *(leave blank)* |

---

## Step 8: Deploy & Get Your URL

1. Railway will deploy automatically after you connect the repo
2. Once deployed, go to your app service → **Settings** → **Networking**
3. Click **Generate Domain** (or **Add Domain**)
4. Railway will give you a URL like `ai-consulting-production-xxxx.up.railway.app`

---

## Step 9: Run Database Schema (Required)

The app needs the database tables. From your local machine:

1. Get the **DATABASE_URL** from Railway:
   - Railway → Postgres service → **Variables** → copy **DATABASE_PRIVATE_URL** or **DATABASE_URL**

2. Run schema push and seed locally (one-time):

```bash
cd /Users/nathanielb/Documents/GitHub/Ai-Consulting

# Set the Railway database URL (replace with your actual URL)
export DATABASE_URL="postgresql://postgres:xxxxx@xxxxx.railway.app:5432/railway"

npm run db:push    # Creates tables
npm run db:seed    # Seeds demo users (optional)
```

3. After this, the live app will work. You can log in with seeded users (e.g. `nathanielbaldock@gmail.com` / `demo123`).

---

## Step 10: Connect nathanielbaldock.com

1. In Railway → your app service → **Settings** → **Networking** → **Custom Domain**
2. Click **Add Custom Domain**
3. Enter **nathanielbaldock.com** and **www.nathanielbaldock.com**
4. Railway will show you DNS records (CNAME or A record)

5. **In Vercel** (where you bought the domain):
   - Go to [vercel.com](https://vercel.com) → your account → **Domains**
   - Find **nathanielbaldock.com** → **Manage** or **DNS**
   - Add the CNAME record Railway gives you:
     - **Name:** `@` (or `www` for www subdomain)
     - **Value:** `your-app.up.railway.app` (Railway’s exact URL)

6. Wait for DNS to propagate (a few minutes to an hour)
7. Railway will automatically provision SSL for your domain

---

## Quick Checklist

- [ ] Signed in to Railway with GitHub
- [ ] Created project from **kiwibuddy/Ai-Consulting** repo
- [ ] Added PostgreSQL database
- [ ] Connected **DATABASE_URL** to the app
- [ ] Set **SESSION_SECRET** (from `openssl rand -hex 32`)
- [ ] Set **APP_URL** = `https://nathanielbaldock.com`
- [ ] Set **NODE_ENV** = `production`
- [ ] Ran `npm run db:push` (and `db:seed`) with Railway’s DATABASE_URL
- [ ] Added custom domain **nathanielbaldock.com** in Railway
- [ ] Updated DNS in Vercel to point to Railway

---

## Troubleshooting

**"column does not exist" error**  
→ Run `npm run db:push` with the Railway DATABASE_URL.

**App won’t start**  
→ Check **Deployments** → **View Logs** for errors. Common causes:
- **Missing SESSION_SECRET** — Run `openssl rand -hex 32` and add it to Variables
- **Missing DATABASE_URL** — Add it via Variable Reference from the Postgres service (use DATABASE_PRIVATE_URL for internal)
- **"Missing required env vars"** — The app exits with a clear message; add the missing vars and redeploy

**Google Sign-in doesn’t work**  
→ Add `https://nathanielbaldock.com/api/auth/google/callback` to Google Cloud Console OAuth authorized redirect URIs.

**Domain not loading**  
→ DNS can take up to 48 hours. Check that CNAME/A records match Railway’s instructions.
