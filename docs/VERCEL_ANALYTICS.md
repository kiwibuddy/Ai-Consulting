# Vercel Web Analytics

The site uses **Vercel Web Analytics** (`@vercel/analytics`). The component is in `client/src/main.tsx` so it loads with the app entry. Data appears in **nathanielbaldock_consulting** → **Analytics** tab.

## Critical: enable Analytics *then* deploy

Vercel only starts collecting data when **Web Analytics is enabled in the project before (or at) the deployment that is Production**. If you enabled Analytics *after* your last deploy, the dashboard will keep showing "Get Started" until you **redeploy and that deployment is Production**.

1. In **nathanielbaldock_consulting** → **Analytics**, ensure Web Analytics is **enabled** (toggle on / Get Started completed).
2. **Redeploy:** either push a new commit, or open **Deployments** → open the **latest** deployment → **⋯** → **Promote to Production**.
3. Visit **https://www.nathanielbaldock.com**, click a few pages (with ad blocker off).
4. Wait 1–2 minutes; refresh the **Analytics** tab. You should see "Awaiting Data" or real numbers instead of the setup steps.

## If Analytics shows no data after deploy

1. **Confirm the right project**  
   In the Vercel dashboard, open **nathanielbaldock_consulting** (where www.nathanielbaldock.com is attached). Analytics data is per project; the **ai-consulting** project will not show traffic for your main domain.

2. **Confirm production has the Analytics commit**  
   In **nathanielbaldock_consulting** → **Deployments**, check the **Production** deployment:
   - Commit message should include "Vercel Analytics" (or the latest push).
   - Status should be **Ready**.  
   If the latest deployment is not production, open that deployment → **⋯** → **Promote to Production**.

3. **Generate traffic on the live domain**  
   Visit **https://www.nathanielbaldock.com** (not the `.vercel.app` URL). Click a few pages. Use a browser without ad blockers or strict privacy extensions; they can block the analytics script.

4. **Confirm the script is on the page**  
   On https://www.nathanielbaldock.com, open DevTools → **Network**. Reload and filter by "vercel" or "insights". You should see a request to `/_vercel/insights/...` or similar. If it’s blocked or missing, the script isn’t running (e.g. ad blocker or wrong deployment).

5. **Wait and refresh**  
   Vercel can take a few minutes to show the first data. After 30+ minutes with real traffic on the live site, refresh the Analytics tab. If you use a proxy (e.g. Cloudflare) in front of Vercel, ensure `/_vercel/insights/*` is not blocked and is proxied to Vercel.

## Enable in dashboard first (if you added code before enabling)

If you added the Analytics component and deployed *before* turning on Web Analytics in the project:

- In **nathanielbaldock_consulting** → **Analytics**, ensure Web Analytics is **enabled**.
- **Redeploy** (e.g. push a small change or **Deployments** → latest → **Promote to Production**) so the deployment is linked to Analytics.

## How it's loaded

The `<Analytics />` component from `@vercel/analytics/react` is rendered in `client/src/main.tsx` (app entry) so it is in the initial bundle and runs as soon as the app loads. Vercel detects the package in the deployment and serves `/_vercel/insights/script.js` when Web Analytics is enabled for the project.

## Files

- `client/src/main.tsx` — imports and renders `<VercelAnalytics />` at the root.
- `package.json` — dependency `@vercel/analytics`.
