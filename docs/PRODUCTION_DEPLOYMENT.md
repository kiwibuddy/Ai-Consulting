# Production Deployment Guide

This guide covers everything needed to deploy the site to production and receive real consultations.

## Pre-launch: ready for real consultations

Before going live, complete these so you receive intake submissions and can log in as the only consultant.

### 1. Environment (required for intake emails)

- **`RESEND_API_KEY`** – From [Resend](https://resend.com). Without it, intake form submissions are saved but no email is sent to you.
- **`RESEND_FROM_EMAIL`** – Use a verified domain in Resend (e.g. `Nathaniel Baldock AI Consulting <noreply@nathanielbaldock.com>`).
- **`APP_URL`** – Your live URL with HTTPS (e.g. `https://nathanielbaldock.com`).
- **`PUBLIC_SITE_URL`** – Same as `APP_URL` or your marketing domain (used in email links and logo).
- **`DATABASE_URL`** – Production Postgres (with `?sslmode=require` if required by host).
- **`SESSION_SECRET`** – Generate with `openssl rand -hex 32`; keep it secret.

Intake notifications go to **nathanielbaldock@gmail.com** (set in `shared/constants.ts` as `SITE_CONTACT_EMAIL`).

### 2. Single consultant (production database)

The app is configured for one consultant only. After the first deploy and `db:push`:

1. Run the one-off script **once** against the production database (e.g. from your machine with `DATABASE_URL` pointing at production):
   ```bash
   CONSULTANT_INITIAL_PASSWORD=YourSecurePassword npx tsx script/single-consultant-setup.ts
   ```
2. This removes any other coach accounts and ensures **nathanielbaldock@gmail.com** is the only consultant login. Unset the env var after running.
3. Do **not** run `npm run db:seed` in production (it is blocked unless `ALLOW_SEED_IN_PRODUCTION=1`); seed is for local/demo data only.

### 3. Optional: site traffic analytics

- **Plausible:** set `VITE_PLAUSIBLE_DOMAIN=nathanielbaldock.com` (or your domain), then rebuild and deploy. View stats at [plausible.io](https://plausible.io).
- **Google Analytics 4:** set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`, rebuild and deploy. View at [analytics.google.com](https://analytics.google.com).

### 4. After deploy

- Submit a test intake form and confirm you receive the notification at nathanielbaldock@gmail.com and the submitter receives the confirmation email.
- Log in at `/login` with nathanielbaldock@gmail.com and your consultant password; you should be redirected to `/consultant`.

---

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Supabase, Railway, or similar)
- Domain with HTTPS configured
- Google Cloud Console account (for OAuth and optional GCS)
- Resend account (for emails)
- Stripe account (optional, for payments)
- PayPal Developer account (optional, for payments)

---

## Required Environment Variables

Create a `.env` file with the following variables:

### Core Configuration

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Session Security (generate with: openssl rand -hex 32)
SESSION_SECRET=<64-character-random-hex-string>

# Application URL (no trailing slash)
APP_URL=https://yourdomain.com

# Server Port
PORT=3000
```

### Authentication (Required)

```env
# Google OAuth 2.0 (for "Sign in with Google")
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Setup Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `https://yourdomain.com/api/auth/google/callback`
6. Copy Client ID and Client Secret

### Email Notifications (Required)

```env
# Resend API
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Holger Coaching <noreply@yourdomain.com>
```

**Setup Steps:**
1. Sign up at [Resend](https://resend.com)
2. Verify your domain
3. Create an API key
4. Update `RESEND_FROM_EMAIL` with your verified domain

### Payment Processing (Optional)

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxx

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=live
```

**Stripe Setup:**
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your live secret key from API Keys
3. Set up webhook endpoint at `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy webhook signing secret

**PayPal Setup:**
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create a Live app
3. Copy Client ID and Secret
4. Set `PAYPAL_MODE=live` for production

### Google Calendar Sync (Optional)

```env
# Google Calendar OAuth (can use same project as sign-in)
GOOGLE_CALENDAR_CLIENT_ID=your-calendar-client-id.apps.googleusercontent.com
GOOGLE_CALENDAR_CLIENT_SECRET=your-calendar-client-secret
```

**Setup Steps:**
1. In Google Cloud Console, enable Google Calendar API
2. Create separate OAuth client for calendar (or reuse sign-in client)
3. Add redirect URI: `https://yourdomain.com/api/auth/google-calendar/callback`

### File Storage (Optional)

```env
# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
GCS_BUCKET_NAME=your-bucket-name
```

---

## Pre-Deployment Checklist

### Security

- [ ] Generate unique `SESSION_SECRET` (never reuse from development)
- [ ] Remove or change demo account passwords
- [ ] Ensure `APP_URL` uses HTTPS
- [ ] Configure CORS if using separate frontend domain
- [ ] Review database connection uses SSL (`sslmode=require`)

### Database

- [ ] Run `npm run db:push` to apply schema to production database
- [ ] Verify all tables are created
- [ ] Set up database backups

### Authentication

- [ ] Update Google OAuth redirect URIs for production domain
- [ ] Test Google sign-in flow
- [ ] Verify email domain is verified in Resend

### Payments (if enabled)

- [ ] Switch Stripe from test to live keys
- [ ] Register production webhook URL in Stripe Dashboard
- [ ] Switch PayPal from sandbox to live
- [ ] Test payment flow with small amount

### Email

- [ ] Verify sending domain in Resend
- [ ] Test email delivery (check spam folders)
- [ ] Review email templates for correct APP_URL

### Consultant account

The app is single-consultant. Only **nathanielbaldock@gmail.com** should have the coach role. Use `script/single-consultant-setup.ts` once on the production DB (see Pre-launch above). New users can only register as clients; consultant registration is disabled.

---

## First coach onboarding & testing

### GitHub vs live app

- **GitHub** holds your code and history; it does **not** host a running website. Pushing to GitHub does not give you a link people can open in a browser.
- To get a **web link** (e.g. `https://your-app.onrender.com`) that your first coach can log into, you must **deploy** the app to a hosting service (Render, Railway, Vercel, etc.). The repo stays on GitHub; the host builds and runs the app and gives you the URL.

### No separate “admin” login

The app has two roles only: **Coach** and **Client**. There is no “main admin” or “creator” role. As the creator you can:

1. **Use it as a coach** – Sign up at your own deployed URL as a Coach (or use a demo coach account) to test and demo.
2. **Let the first coach create their own account** – Send them the live link and have them Sign up → choose **Coach** → complete registration (email/password or Sign in with Google). That coach account is then the one they use for their clients.

### Recommended flow for your first coach

1. **Deploy** the app (e.g. [Render](https://render.com) or [Railway](https://railway.app)) and set `APP_URL` and all required env vars (see above). You get a URL like `https://holger-coaching.onrender.com`.
2. **Optional – you test first:** Open the URL, click **Sign up**, register as **Coach** with your email. Use that account to add a test client (or use the intake flow), run through sessions and billing, then you can keep this as your “admin”/testing coach or stop using it once the real coach is set up.
3. **Invite the coach:** Send the coach the link, e.g.  
   *“Here’s your coaching portal: [https://your-app.onrender.com]. Open it, click ‘Sign up’, choose ‘Coach’, and create your account with your email and a password (or Sign in with Google). Once you’re in, you can share the same link with clients so they can sign up as Client or submit an intake from the landing page.”*
4. **Coach usage:** The coach signs in → sees Coach dashboard → can create sessions, manage clients, use intake (clients submit from the public intake form), accept intakes (which creates client accounts and sends the “Sign in with Google” email), and run billing/sessions/actions as in the MVP.

### If you want a coach account created for them

There is no in-app “Create coach” button. To create a coach account without the coach using Sign up:

- Run a **one-off script** (or SQL) that inserts a row into `users` with `role = 'coach'` and a bcrypt-hashed password, then send the coach their login email and a temporary password (they can change it later if you add a “change password” flow).
- Or use the **seed script** only for staging: add a known coach user in `script/seed.ts`, run `npm run db:seed` on the production DB once, then send that coach the credentials. (Not ideal for production; normal flow is coach self-sign-up.)

---

## Deployment Steps

### Option 1: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and initialize
railway login
railway init

# Add environment variables in Railway dashboard
# Then deploy
railway up
```

### Option 2: Render

1. Connect your GitHub repository
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Add environment variables in dashboard
5. Deploy

### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 4: VPS (Ubuntu)

```bash
# Clone repository
git clone https://github.com/your-username/Coaching-hub.git
cd Coaching-hub

# Install dependencies
npm ci

# Build
npm run build

# Apply database schema
npm run db:push

# Start with PM2
npm install -g pm2
pm2 start npm --name "coaching-portal" -- start
pm2 save
pm2 startup
```

---

## HTTPS Configuration

### Using Nginx (recommended for VPS)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Post-Deployment Verification

1. **Homepage loads**: Visit `https://yourdomain.com`
2. **Authentication works**: Try "Sign in with Google"
3. **Intake form submits**: Submit a test intake
4. **Email delivery**: Check for confirmation email
5. **Coach login**: Login as coach and accept intake
6. **Client receives email**: Verify welcome email sent
7. **Client can login**: New client signs in with Google
8. **Payments (if enabled)**: Test small payment

---

## Monitoring & Maintenance

### Health Check Endpoint

The app exposes a health check at `/api/health` (you may need to add this):

```typescript
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
```

### Logs

If using PM2:
```bash
pm2 logs coaching-portal
pm2 monit
```

### Database Backups

Set up automated backups in your database provider (Supabase, Railway, etc.) or use `pg_dump`:

```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## Troubleshooting

### "Invalid callback URL" on Google Sign-in

- Check that redirect URI in Google Console exactly matches `APP_URL + /api/auth/google/callback`
- Ensure no trailing slashes mismatch

### Emails not sending

- Verify domain is confirmed in Resend
- Check API key is correct
- Review server logs for errors

### Session not persisting

- Ensure `SESSION_SECRET` is set
- Check that cookies are being set with `secure: true` for HTTPS
- Verify `trust proxy` is set if behind a reverse proxy

### Database connection errors

- Verify `DATABASE_URL` is correct
- Check SSL mode (`?sslmode=require`)
- Ensure IP is whitelisted in database firewall

---

## Support

For issues or questions, check:
- GitHub Issues
- Application logs
- Database connection status
