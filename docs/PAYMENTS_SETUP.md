# Payments: Stripe, PayPal, and webhooks

This app uses **Stripe** (primary) for card payments, **Stripe Invoicing** for PDF/hosted pay pages, **Stripe Subscriptions** for retainers, and **PayPal** (optional) for clients who prefer it.

## Environment variables

Set in **Railway** (or your Node host) and in **`.env`** for local dev:

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Optional for future client-only flows |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from Stripe Dashboard → Webhooks |
| `PAYPAL_CLIENT_ID` | PayPal REST app (Sandbox or Live) |
| `PAYPAL_CLIENT_SECRET` | — |
| `PAYPAL_MODE` | `sandbox` or `live` |
| `APP_URL` | Public base URL, e.g. `https://app.nathanielbaldock.com` (no trailing slash) — used for Stripe/PayPal return URLs |
| `RESEND_API_KEY` | Required to email invoice links and payment confirmations |

## Stripe webhooks

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**.
2. URL: `https://<your-app-host>/api/webhooks/stripe`
3. **Events to send** (minimum):

   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `invoice.voided`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `charge.refunded`

4. Copy the **signing secret** into `STRIPE_WEBHOOK_SECRET`.

**Local testing:** use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## PayPal

1. [PayPal Developer](https://developer.paypal.com/) → create REST app.
2. Use **Sandbox** keys with `PAYPAL_MODE=sandbox` for dev.
3. For production, switch to Live credentials and `PAYPAL_MODE=live`.

## NZD and USD

- Invoices default to **NZD**; the coach can choose **USD** per invoice.
- All amounts in the API/database are in **cents** (smallest currency unit).

## Retainers (subscriptions)

**Consultant** → **Billing** → **New retainer** creates a **Stripe Product + Price + Subscription** with metadata `localRetainerId` so webhooks can update the `retainers` row.

## Refunds

From **Billing** → **Payments** → **Refund** on a Stripe card payment. Partial refunds and disputes can also be done in the Stripe Dashboard; the app syncs `charge.refunded` when configured.

## GST (future)

`coach_settings` includes `gstNumber`, `gstEnabled`, and `defaultTaxRate` (basis points) for when you are GST-registered. Configure in DB or via **PATCH** `/api/coach/settings` until a UI is added.

## Troubleshooting

- On boot, logs show: `Payments: Stripe=✓ PayPal=✓` (or ✗) so you can see if keys are loaded.
- If webhooks return **400**, check `STRIPE_WEBHOOK_SECRET` and that the raw body is used (this project stores `rawBody` in `server/index.ts` for signature verification).
- If clients see “no payment methods,” ensure the coach has not disabled PayPal in settings (`acceptPaypal: false`).

## Live vs test

- Use **test keys** until you are ready, then switch to **live** keys and a **live** webhook endpoint in production.
- Redeploy after changing env vars; `VITE_*` and server secrets both require a new deploy/restart.
