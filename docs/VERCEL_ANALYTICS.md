# Vercel Web Analytics

The site uses **Vercel Web Analytics** (`@vercel/analytics`) for page views. The component is in `client/src/App.tsx`. Data appears in the **nathanielbaldock_consulting** project → **Analytics** tab.

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

Analytics is loaded via a **script tag in `client/index.html`** so it runs with the initial HTML (before React). That way Vercel always sees the script and the dashboard can show data. The path `/_vercel/insights/script.js` is served by Vercel when Web Analytics is enabled for the project.

## Files

- `client/index.html` — includes `window.va` and `<script defer src="/_vercel/insights/script.js"></script>`.
- `package.json` — dependency `@vercel/analytics` (optional; script tag does not require it).
