# Deploy Marketing Site to Vercel

Use this when running in **Marketing Mode**: public pages only, no backend.

## 1. Connect repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New** → **Project** → import `kiwibuddy/Ai-Consulting`.
3. Leave **Root Directory** as `.` (repo root).
4. Build and output are set via `vercel.json`:
   - **Build Command:** `npm run build:client`
   - **Output Directory:** `dist/public`
5. Add environment variables (optional, for marketing behaviour):
   - `VITE_BOOKING_URL` — your Google Calendar 30-min booking link (so intake CTA goes there).
   - `VITE_MARKETING_MODE` — set to `true` to hide "Sign In" and use mailto for speaking form.
6. Deploy.

## 2. Point domain to Vercel

1. In the Vercel project → **Settings** → **Domains**.
2. Add `nathanielbaldock.com` and `www.nathanielbaldock.com`.
3. Follow Vercel’s instructions to update DNS (e.g. in Vercel Domains or your registrar):
   - Usually: A record for `@` and CNAME for `www` to Vercel’s target.
4. Wait for SSL and DNS to propagate.

## 3. After cutover

- Root and www will serve the static marketing site from Vercel.
- Keep the Railway project intact; do not point the root domain at Railway in marketing mode.
- To switch back to Full App mode, see [FULL_APP_REENABLE.md](./FULL_APP_REENABLE.md).
