# Google Analytics 4 Setup

The site already includes Google Analytics 4. You only need to create a GA4 property and set one environment variable where the app is **built and deployed** (e.g. Railway for www.nathanielbaldock.com).

## 1. Create a GA4 property and get the Measurement ID

1. Go to [Google Analytics](https://analytics.google.com) and sign in.
2. Click **Admin** (gear icon, bottom left).
3. In the **Property** column, click **Create property**.
4. Enter a property name (e.g. "Nathaniel Baldock Consulting"), choose time zone and currency, then click **Next** → complete the rest → **Create**.
5. When asked to set up a data stream, choose **Web**.
6. Enter your website URL: `https://www.nathanielbaldock.com`, and a stream name (e.g. "Main site"), then click **Create stream**.
7. On the stream details page, copy the **Measurement ID** (format `G-XXXXXXXXXX`). You’ll use this in the next step.

## 2. Set the environment variable where you deploy

The client reads **`VITE_GA_MEASUREMENT_ID`** at **build time**. Set it in the environment of the place that **builds and serves** your site (e.g. Railway).

### If your live site is on Railway

**Step-by-step:**

1. **Open Railway**
   - Go to [railway.app](https://railway.app) and log in.
   - Open the **project** that hosts www.nathanielbaldock.com (the one that builds and serves your Ai-Consulting app).

2. **Open the right service**
   - On the project dashboard you’ll see one or more **services** (e.g. "web", "api", or the repo name).
   - Click the **service** that serves the frontend (the one that runs the build and serves the site). If you only have one service, click that one.

3. **Open the Variables tab**
   - In the service view, click the **Variables** tab in the top menu (next to Settings, Deployments, etc.).
   - You’ll see a list of existing variables (or an empty list).

4. **Add the new variable**
   - Click **"+ New Variable"** or **"Add Variable"** (or **"RAW Editor"** if you prefer to paste many at once).
   - In the **Variable name** field, type exactly:  
     `VITE_GA_MEASUREMENT_ID`  
     (no spaces; copy-paste to avoid typos.)
   - In the **Value** field, type:  
     `G-T13W0W8XCT`  
     (your GA4 Measurement ID.)
   - Save (e.g. **Add** or **Save**). The variable will appear in the list.

5. **Deploy the change**
   - In Railway, changing variables creates **staged changes**. You have to deploy for them to apply.
   - Either:
     - Look for a **"Deploy"** or **"Redeploy"** button on the Variables page or in a banner about pending changes and click it, or  
     - Go to the **Deployments** tab, open the **⋯** menu on the latest deployment, and choose **Redeploy** (this rebuilds and redeploys with the new variable).
   - Wait until the new deployment shows **Success** or **Active**. That build will have `VITE_GA_MEASUREMENT_ID` set, so the app will send data to GA4.

6. **Check that it’s working**
   - Open **https://www.nathanielbaldock.com** in a browser (ad blocker off).
   - In [Google Analytics](https://analytics.google.com), open the **Nathaniel Baldock Consulting** property → **Reports** → **Realtime**.
   - You should see at least one active user (you) within a minute or two.

If you don’t see the Variables tab, try **Settings** → **Variables** or the **Environment** section for that service. Names can vary by Railway UI version.

### If you also deploy to Vercel

In the Vercel project (**nathanielbaldock_consulting**) → **Settings** → **Environment Variables**, add:

- **Name:** `VITE_GA_MEASUREMENT_ID`
- **Value:** same `G-XXXXXXXXXX`
- **Environment:** Production (and Preview if you want).

Then trigger a new deployment so the build picks it up.

## 3. Confirm it’s working

1. Deploy with the variable set, then open **https://www.nathanielbaldock.com**.
2. In Google Analytics: **Reports** → **Realtime**. You should see your own visit within a minute or two (with ad blockers off).

## How it’s implemented

- **`client/src/lib/analytics.ts`** — loads the gtag script and configures GA4 when `VITE_GA_MEASUREMENT_ID` is set and the app is built for production.
- **`client/src/main.tsx`** — calls `initAnalytics()` on load.
- **`trackEvent()`** — used on intake and speaking-invite pages for custom events; optional for basic page views.

Analytics runs only in production builds (`import.meta.env.PROD`). In development it does nothing.

## Privacy

If you use GA, mention it in your privacy policy (e.g. in **client/src/pages/privacy.tsx**). The existing privacy copy already refers to "analytics where configured."

---

## Troubleshooting: still seeing 0 in Realtime

### 1. Confirm the variable in Railway

- Railway → your **Ai-Consulting** service → **Variables**.
- Find **VITE_GA_MEASUREMENT_ID**. Click the **⋯** (or edit) and check the **value**.
- It must be exactly: `G-T13W0W8XCT` — no spaces before/after, no quotes, correct letters and numbers. Fix if needed, then **redeploy**.

### 2. Confirm the script is loading on the site

After a deploy that has the variable set:

1. Open **https://www.nathanielbaldock.com** (ad blocker off, or use an incognito window).
2. Open **DevTools** (F12 or Cmd+Option+I) → **Network** tab.
3. In the filter box, type **gtag** or **googletagmanager**.
4. Reload the page (Ctrl+R or Cmd+R).
5. Look for a request to **googletagmanager.com/gtag/js** with **id=G-T13W0W8XCT** and **Status 200**.

- **If you see that request with 200:** The script is loading. Data should reach GA (allow 1–2 minutes, then check Realtime again). If it still shows 0, try another browser/device or check for blockers.
- **If you don't see that request:** The Measurement ID wasn't in the build. Confirm the variable in Railway (step 1), redeploy, and test again.

### 3. Console check (after deploying the latest code)

The code sets two globals so you can verify what was baked in at build time:

1. On **https://www.nathanielbaldock.com**, open DevTools → **Console**.
2. Type: `__GA_MEASUREMENT_ID__` and press Enter. You should see `"G-T13W0W8XCT"` if the variable was set at build time, or `undefined` if not.
3. Type: `__GA_ENABLED__` and press Enter. You should see `true` when GA is active (correct ID + production build), or `false` otherwise.

If `__GA_MEASUREMENT_ID__` is `undefined` or wrong, the build didn't get the variable — fix it in Railway and redeploy. “analytics where configured.”
