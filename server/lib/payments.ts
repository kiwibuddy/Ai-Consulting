import Stripe from "stripe";
import { randomBytes } from "crypto";
import { db } from "../db";
import { storage } from "../storage";
import { authStorage } from "../auth";
import {
  payments,
  invoices,
  retainers,
  clientProfiles,
  type Payment,
  type InsertPayment,
  type Invoice,
  type InsertInvoice,
  type Retainer,
} from "@shared/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";
import { sendEmail, paymentReceivedEmail, invoiceSentEmail, invoicePaymentFailedEmail } from "./email";
import { SITE_CONTACT_EMAIL } from "@shared/constants";
import {
  Client,
  Environment,
  OrdersController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";

// Initialize Stripe (only if API key is set)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion })
  : null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY not set. Stripe payments will be disabled.");
}

// PayPal Server SDK
const paypalClient =
  process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET
    ? new Client({
        environment: process.env.PAYPAL_MODE === "live" ? Environment.Production : Environment.Sandbox,
        clientCredentialsAuthCredentials: {
          oAuthClientId: process.env.PAYPAL_CLIENT_ID,
          oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
        },
      })
    : null;

const ordersController = paypalClient ? new OrdersController(paypalClient) : null;

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  console.warn("PayPal credentials not set. PayPal payments will be disabled.");
}

// ============================================================
// Utilities
// ============================================================

export function generatePublicToken(): string {
  return randomBytes(24).toString("base64url");
}

function appUrl(): string {
  return process.env.APP_URL || "http://localhost:3000";
}

type LineItem = { description: string; amount: number };

function parseLineItems(itemsJson: string): LineItem[] {
  try {
    const arr = JSON.parse(itemsJson) as LineItem[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// ============================================================
// Stripe customer (per client profile)
// ============================================================

export async function getOrCreateStripeCustomer(
  clientProfileId: string,
  user: { email: string; firstName?: string | null; lastName?: string | null }
): Promise<string | null> {
  if (!stripe) return null;

  const profile = await storage.getClientProfileById(clientProfileId);
  if (!profile) return null;

  if (profile.stripeCustomerId) {
    return profile.stripeCustomerId;
  }

  const customer = await stripe.customers.create(
    {
      email: user.email,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || undefined,
      metadata: { clientProfileId },
    },
    { idempotencyKey: `cus_${clientProfileId}` }
  );

  await storage.updateClientProfile(clientProfileId, { stripeCustomerId: customer.id });
  return customer.id;
}

// ============================================================
// STRIPE — Checkout (one-off / invoice mirror)
// ============================================================

export async function createStripeCheckoutSession(options: {
  clientId: string;
  userEmail: string;
  userName?: { firstName?: string | null; lastName?: string | null };
  amount: number; // cents
  currency: string;
  description: string;
  sessionId?: string;
  invoiceId?: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ sessionId: string; url: string } | null> {
  if (!stripe) return null;

  const customerId = await getOrCreateStripeCustomer(options.clientId, {
    email: options.userEmail,
    firstName: options.userName?.firstName,
    lastName: options.userName?.lastName,
  });
  if (!customerId) return null;

  const idemKey = options.invoiceId
    ? `co_inv_${options.invoiceId}`
    : `co_${options.clientId}_${options.amount}_${Date.now()}`;

  const session = await stripe.checkout.sessions.create(
    {
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: options.currency.toLowerCase(),
            product_data: {
              name: options.description,
            },
            unit_amount: options.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      client_reference_id: options.invoiceId,
      payment_intent_data: {
        metadata: {
          clientId: options.clientId,
          sessionId: options.sessionId || "",
          invoiceId: options.invoiceId || "",
        },
      },
      metadata: {
        clientId: options.clientId,
        sessionId: options.sessionId || "",
        invoiceId: options.invoiceId || "",
      },
    },
    { idempotencyKey: idemKey }
  );

  return {
    sessionId: session.id,
    url: session.url!,
  };
}

/** Build checkout for an existing invoice; amounts come from DB only. */
export async function createCheckoutSessionForInvoice(
  invoiceId: string,
  clientProfileId: string,
  user: { email: string; firstName?: string | null; lastName?: string | null },
  successUrl: string,
  cancelUrl: string
): Promise<{ sessionId: string; url: string } | null> {
  const inv = await getInvoice(invoiceId);
  if (!inv || inv.clientId !== clientProfileId) {
    return null;
  }
  if (inv.status === "paid" || inv.status === "void" || inv.status === "cancelled") {
    return null;
  }

  const lines = parseLineItems(inv.items);
  const desc =
    lines.length === 1
      ? lines[0]!.description
      : `Invoice ${inv.invoiceNumber}`;

  return createStripeCheckoutSession({
    clientId: clientProfileId,
    userEmail: user.email,
    userName: user,
    amount: inv.amount,
    currency: inv.currency,
    description: desc,
    invoiceId: inv.id,
    successUrl,
    cancelUrl,
  });
}

// ============================================================
// STRIPE — Invoicing (hosted PDF + email)
// ============================================================

export async function createAndSendStripeInvoice(
  localInvoice: Invoice,
  clientUser: { email: string; firstName?: string | null; lastName?: string | null }
): Promise<{ stripeInvoiceId: string; hostedInvoiceUrl: string; invoicePdf: string } | null> {
  if (!stripe) return null;

  const customerId = await getOrCreateStripeCustomer(localInvoice.clientId, clientUser);
  if (!customerId) return null;

  const lines = parseLineItems(localInvoice.items);
  if (lines.length === 0) {
    lines.push({ description: `Invoice ${localInvoice.invoiceNumber}`, amount: localInvoice.amount });
  }

  const inv = await stripe.invoices.create(
    {
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 14,
      metadata: { localInvoiceId: localInvoice.id },
      auto_advance: false,
    },
    { idempotencyKey: `stinv_draft_${localInvoice.id}` }
  );

  for (const line of lines) {
    await stripe.invoiceItems.create(
      {
        customer: customerId,
        invoice: inv.id,
        amount: line.amount,
        currency: localInvoice.currency.toLowerCase(),
        description: line.description,
      },
      { idempotencyKey: `stinv_item_${localInvoice.id}_${line.description}`.slice(0, 120) }
    );
  }

  const finalized = await stripe.invoices.finalizeInvoice(
    inv.id,
    { auto_advance: true },
    { idempotencyKey: `stinv_fin_${localInvoice.id}` }
  );

  let pdfUrl = "";
  if (typeof finalized.invoice_pdf === "string") {
    pdfUrl = finalized.invoice_pdf;
  }
  const hosted = finalized.hosted_invoice_url || "";

  await stripe.invoices.sendInvoice(finalized.id, {
    idempotencyKey: `stinv_send_${localInvoice.id}`,
  });

  return {
    stripeInvoiceId: finalized.id,
    hostedInvoiceUrl: hosted,
    invoicePdf: pdfUrl,
  };
}

// ============================================================
// STRIPE — Webhook
// ============================================================

async function paymentExistsByProviderId(providerId: string): Promise<boolean> {
  const [row] = await db.select().from(payments).where(eq(payments.providerPaymentId, providerId)).limit(1);
  return !!row;
}

async function findPaymentByProviderId(providerId: string): Promise<Payment | undefined> {
  const [row] = await db.select().from(payments).where(eq(payments.providerPaymentId, providerId)).limit(1);
  return row;
}

export async function handleStripeWebhook(
  payload: Buffer,
  signature: string
): Promise<{ success: boolean; paymentId?: string; eventId?: string }> {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return { success: false };
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook verify error:", err);
    return { success: false };
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const result = await processCheckoutSessionCompleted(session, event.id);
        return { success: true, paymentId: result.paymentId, eventId: event.id };
      }
      case "invoice.paid": {
        const inv = event.data.object as Stripe.Invoice;
        await processStripeInvoicePaid(inv, event.id);
        return { success: true, eventId: event.id };
      }
      case "invoice.payment_failed": {
        const inv = event.data.object as Stripe.Invoice;
        await processStripeInvoiceFailed(inv);
        return { success: true, eventId: event.id };
      }
      case "invoice.voided": {
        const inv = event.data.object as Stripe.Invoice;
        await processStripeInvoiceVoided(inv);
        return { success: true, eventId: event.id };
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await syncRetainerFromSubscription(sub);
        return { success: true, eventId: event.id };
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        await processChargeRefunded(charge);
        return { success: true, eventId: event.id };
      }
      default:
        return { success: true, eventId: event.id };
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return { success: false };
  }
}

async function processCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  _eventId: string
): Promise<{ paymentId?: string }> {
  if (!stripe) return {};

  const piRef = session.payment_intent;
  const paymentIntentId = typeof piRef === "string" ? piRef : piRef?.id;
  if (!paymentIntentId) {
    return {};
  }

  if (await paymentExistsByProviderId(paymentIntentId)) {
    return { paymentId: undefined };
  }

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge", "latest_charge.receipt_url"],
  });

  const charge = pi.latest_charge;
  const chargeId = typeof charge === "string" ? charge : charge?.id;
  let receiptUrl: string | null = null;
  if (typeof charge === "object" && charge) {
    receiptUrl = (charge as Stripe.Charge).receipt_url;
  } else if (chargeId) {
    const c = await stripe.charges.retrieve(chargeId);
    receiptUrl = c.receipt_url;
  }

  const meta = { ...pi.metadata, ...session.metadata } as {
    clientId?: string;
    sessionId?: string;
    invoiceId?: string;
  };

  const [payment] = await db
    .insert(payments)
    .values({
      clientId: meta.clientId || session.metadata?.clientId || "",
      sessionId: meta.sessionId || null,
      invoiceId: meta.invoiceId || null,
      amount: session.amount_total || pi.amount || 0,
      currency: (session.currency || pi.currency || "nzd") as string,
      status: "completed",
      provider: "stripe",
      providerPaymentId: paymentIntentId,
      providerCustomerId: (typeof session.customer === "string" ? session.customer : (session.customer as Stripe.Customer | null)?.id) || (typeof pi.customer === "string" ? pi.customer : null),
      description: `Payment for ${meta.sessionId ? "session" : "invoice"}`,
      paidAt: new Date(),
      receiptUrl: receiptUrl || null,
    })
    .returning();

  if (meta.invoiceId) {
    await db
      .update(invoices)
      .set({ status: "paid", paidAt: new Date(), updatedAt: new Date() })
      .where(eq(invoices.id, meta.invoiceId));
  }

  await sendPaymentNotifications(payment);
  return { paymentId: payment.id };
}

async function processStripeInvoicePaid(inv: Stripe.Invoice, _eventId: string): Promise<void> {
  if (!stripe) return;
  const localId = inv.metadata?.localInvoiceId;
  if (localId) {
    await db
      .update(invoices)
      .set({
        status: "paid",
        paidAt: inv.status_transitions?.paid_at
          ? new Date(inv.status_transitions.paid_at * 1000)
          : new Date(),
        stripeHostedInvoiceUrl: inv.hosted_invoice_url || null,
        stripeInvoicePdf: inv.invoice_pdf && typeof inv.invoice_pdf === "string" ? inv.invoice_pdf : null,
        updatedAt: new Date(),
      })
      .where(eq(invoices.id, localId));

    const [existing] = await db
      .select()
      .from(payments)
      .where(eq(payments.providerPaymentId, inv.id))
      .limit(1);
    if (!existing) {
      const [payment] = await db
        .insert(payments)
        .values({
          clientId: (await getInvoice(localId))?.clientId || "",
          invoiceId: localId,
          amount: inv.amount_paid,
          currency: (inv.currency || "nzd") as string,
          status: "completed",
          provider: "stripe",
          providerPaymentId: inv.id,
          providerCustomerId: typeof inv.customer === "string" ? inv.customer : (inv.customer as Stripe.Customer | null)?.id || null,
          description: "Stripe invoice",
          paidAt: new Date(),
          metadata: JSON.stringify({ stripeInvoice: true }),
        })
        .returning();
      await sendPaymentNotifications(payment);
    }
  }

  // Subscription invoice: link retainer
  const subId = typeof inv.subscription === "string" ? inv.subscription : inv.subscription?.id;
  if (subId) {
    const [r] = await db.select().from(retainers).where(eq(retainers.stripeSubscriptionId, subId)).limit(1);
    if (r) {
      const [existingP] = await db
        .select()
        .from(payments)
        .where(eq(payments.providerPaymentId, `sub_inv_${inv.id}`))
        .limit(1);
      if (!existingP) {
        const [payment] = await db
          .insert(payments)
          .values({
            clientId: r.clientId,
            amount: inv.amount_paid,
            currency: (inv.currency || "nzd") as string,
            status: "completed",
            provider: "stripe",
            providerPaymentId: `sub_inv_${inv.id}`,
            description: `Retainer: ${r.name}`,
            paidAt: new Date(),
            metadata: JSON.stringify({ retainerId: r.id, stripeInvoiceId: inv.id }),
          })
          .returning();
        await sendPaymentNotifications(payment);
      }
    }
  }
}

async function processStripeInvoiceFailed(inv: Stripe.Invoice): Promise<void> {
  const localId = inv.metadata?.localInvoiceId;
  if (localId) {
    await db
      .update(invoices)
      .set({ status: "overdue", updatedAt: new Date() })
      .where(eq(invoices.id, localId));
    const invRow = await getInvoice(localId);
    if (invRow) {
      const user = await authStorage.getUser(
        (await storage.getClientProfileById(invRow.clientId))?.userId || ""
      );
      if (user?.email) {
        try {
          await sendEmail(
            invoicePaymentFailedEmail(
              user.email,
              [user.firstName, user.lastName].filter(Boolean).join(" "),
              invRow.invoiceNumber,
              (invRow.amount / 100).toFixed(2),
              invRow.currency
            )
          );
        } catch (e) {
          console.error("Failed to send invoice failed email", e);
        }
      }
    }
  }
}

async function processStripeInvoiceVoided(inv: Stripe.Invoice): Promise<void> {
  const localId = inv.metadata?.localInvoiceId;
  if (localId) {
    await db
      .update(invoices)
      .set({ status: "void", updatedAt: new Date() })
      .where(eq(invoices.id, localId));
  }
}

async function syncRetainerFromSubscription(sub: Stripe.Subscription): Promise<void> {
  const localId = sub.metadata?.localRetainerId;
  if (!localId) return;
  const status = sub.status === "active" || sub.status === "trialing" ? "active" : sub.status === "past_due" ? "past_due" : "cancelled";
  await db
    .update(retainers)
    .set({
      status: status as Retainer["status"],
      currentPeriodEnd: sub.current_period_end
        ? new Date(sub.current_period_end * 1000)
        : null,
      cancelledAt: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
      updatedAt: new Date(),
    })
    .where(eq(retainers.id, localId));
}

async function processChargeRefunded(charge: Stripe.Charge): Promise<void> {
  const paymentIntent = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntent) return;
  const [p] = await db.select().from(payments).where(eq(payments.providerPaymentId, paymentIntent)).limit(1);
  if (p) {
    const refunded = charge.amount_refunded || 0;
    await db
      .update(payments)
      .set({
        status: refunded >= p.amount ? "refunded" : p.status,
        refundedAmount: refunded,
        updatedAt: new Date(),
      })
      .where(eq(payments.id, p.id));
  }
}

async function sendPaymentNotifications(payment: Payment): Promise<void> {
  const profile = await storage.getClientProfileById(payment.clientId);
  if (!profile) return;
  const user = await authStorage.getUser(profile.userId);
  if (!user?.email) return;

  const amountStr = new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: payment.currency.toUpperCase(),
  }).format(payment.amount / 100);

  const desc = payment.description || "Payment";
  const date = (payment.paidAt || new Date()).toLocaleString("en-NZ");

  try {
    await sendEmail(
      paymentReceivedEmail(user.email, [user.firstName, user.lastName].filter(Boolean).join(" ") || "there", { amount: amountStr, description: desc, date }, false)
    );
    if (payment.receiptUrl) {
      // receipt already in Stripe email often; we link in our template
    }
    if (SITE_CONTACT_EMAIL) {
      await sendEmail(
        paymentReceivedEmail(SITE_CONTACT_EMAIL, "Nathaniel", { amount: amountStr, description: desc, date }, true)
      );
    }
  } catch (e) {
    console.error("sendPaymentNotifications error", e);
  }
}

// ============================================================
// PAYPAL (Server SDK)
// ============================================================

export async function createPayPalOrder(options: {
  clientId: string;
  amount: number;
  currency?: string;
  description: string;
  sessionId?: string;
  invoiceId?: string;
  returnPath?: string;
}): Promise<{ orderId: string; approvalUrl: string } | null> {
  if (!ordersController) return null;

  const amountInDollars = (options.amount / 100).toFixed(2);
  const returnPath = options.returnPath || "/client/billing?success=true";
  const cancelPath = returnPath.includes("?")
    ? returnPath + "&cancelled=true"
    : returnPath + "?cancelled=true";

  const res = await ordersController.createOrder(
    {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: (options.currency || "nzd").toUpperCase(),
              value: amountInDollars,
            },
            description: options.description,
            customId: JSON.stringify({
              clientId: options.clientId,
              sessionId: options.sessionId,
              invoiceId: options.invoiceId,
              returnPath,
            }),
          },
        ],
        applicationContext: {
          returnUrl: `${appUrl()}/api/payments/paypal/capture`,
          cancelUrl: `${appUrl()}${cancelPath}`,
        },
      },
      prefer: "return=representation",
    }
  );

  if (!res.result) {
    console.error("PayPal create order failed", res);
    return null;
  }

  const order = res.result;
  const approvalUrl = order.links?.find((l) => l.rel === "approve")?.href;
  if (!order.id || !approvalUrl) {
    return null;
  }
  return { orderId: order.id, approvalUrl };
}

export async function createPayPalOrderForInvoice(
  invoiceId: string,
  clientProfileId: string,
  returnPath: string
): Promise<{ orderId: string; approvalUrl: string } | null> {
  const inv = await getInvoice(invoiceId);
  if (!inv || inv.clientId !== clientProfileId) return null;
  const lines = parseLineItems(inv.items);
  const desc = lines[0]?.description || `Invoice ${inv.invoiceNumber}`;

  return createPayPalOrder({
    clientId: clientProfileId,
    amount: inv.amount,
    currency: inv.currency,
    description: desc,
    invoiceId: inv.id,
    returnPath,
  });
}

export async function capturePayPalOrder(orderId: string): Promise<{ success: boolean; paymentId?: string }> {
  if (!ordersController) return { success: false };

  const cap = await ordersController.captureOrder(
    { id: orderId, prefer: "return=representation" } as { id: string; prefer?: string }
  );

  if (!cap.result) {
    console.error("PayPal capture failed", cap);
    return { success: false };
  }

  const capture = cap.result;
  const pu = capture.purchaseUnits?.[0];
  const captureData = pu?.payments?.captures?.[0];
  if (!captureData) {
    return { success: false };
  }

  let metadata: { clientId: string; sessionId?: string; invoiceId?: string; returnPath?: string } = { clientId: "" };
  try {
    metadata = JSON.parse(pu?.customId || "{}");
  } catch {
    /* empty */
  }

  if (await paymentExistsByProviderId(orderId)) {
    return { success: true };
  }

  const [payment] = await db
    .insert(payments)
    .values({
      clientId: metadata.clientId,
      sessionId: metadata.sessionId || null,
      invoiceId: metadata.invoiceId || null,
      amount: Math.round(parseFloat(captureData.amount?.value || "0") * 100),
      currency: (captureData.amount?.currencyCode || "NZD").toLowerCase(),
      status: "completed",
      provider: "paypal",
      providerPaymentId: orderId,
      description: "PayPal payment",
      paidAt: new Date(),
      receiptUrl: captureData.id ? `https://www.paypal.com/activity/payment/${captureData.id}` : null,
    })
    .returning();

  if (metadata.invoiceId) {
    await db
      .update(invoices)
      .set({ status: "paid", paidAt: new Date(), updatedAt: new Date() })
      .where(eq(invoices.id, metadata.invoiceId));
  }

  await sendPaymentNotifications(payment);
  return { success: true, paymentId: payment.id };
}

// ============================================================
// Invoice CRUD
// ============================================================

export async function getPaymentsByClient(clientId: string): Promise<Payment[]> {
  return db.select().from(payments).where(eq(payments.clientId, clientId)).orderBy(desc(payments.createdAt));
}

export async function getAllPayments(): Promise<Payment[]> {
  return db.select().from(payments).orderBy(desc(payments.createdAt));
}

export async function getInvoicesByClient(clientId: string): Promise<Invoice[]> {
  return db.select().from(invoices).where(eq(invoices.clientId, clientId)).orderBy(desc(invoices.createdAt));
}

export async function getAllInvoices(): Promise<Invoice[]> {
  return db.select().from(invoices).orderBy(desc(invoices.createdAt));
}

export async function getInvoice(id: string): Promise<Invoice | undefined> {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
  return invoice;
}

export async function getInvoiceByPublicToken(token: string): Promise<Invoice | undefined> {
  const [invoice] = await db.select().from(invoices).where(eq(invoices.publicToken, token));
  return invoice;
}

export async function createInvoice(
  data: Omit<InsertInvoice, "invoiceNumber" | "publicToken" | "subtotal" | "taxAmount" | "taxRate"> & {
    publicToken?: string;
    subtotal?: number;
    taxAmount?: number;
    taxRate?: number;
  }
): Promise<Invoice> {
  const all = await db.select().from(invoices);
  const invoiceNumber = `INV-${String(all.length + 1).padStart(5, "0")}`;

  const publicToken = data.publicToken ?? generatePublicToken();
  const subtotal = data.subtotal ?? data.amount;
  const taxAmount = data.taxAmount ?? 0;
  const taxRate = data.taxRate ?? 0;

  const [invoice] = await db
    .insert(invoices)
    .values({
      ...data,
      invoiceNumber,
      publicToken,
      subtotal,
      taxAmount,
      taxRate,
    })
    .returning();
  return invoice;
}

export async function updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice | undefined> {
  const [invoice] = await db
    .update(invoices)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(invoices.id, id))
    .returning();
  return invoice;
}

export async function refundStripePayment(
  paymentId: string
): Promise<{ success: boolean; error?: string }> {
  if (!stripe) return { success: false, error: "Stripe not configured" };
  const [p] = await db.select().from(payments).where(eq(payments.id, paymentId));
  if (!p || p.provider !== "stripe") {
    return { success: false, error: "Invalid payment" };
  }
  try {
    await stripe.refunds.create(
      { payment_intent: p.providerPaymentId! },
      { idempotencyKey: `refund_${p.id}` }
    );
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: (e as Error).message };
  }
}

// ============================================================
// Retainers
// ============================================================

export async function getAllRetainers(): Promise<Retainer[]> {
  return db.select().from(retainers).orderBy(desc(retainers.createdAt));
}

export async function getRetainersByClientId(clientId: string): Promise<Retainer[]> {
  return db.select().from(retainers).where(eq(retainers.clientId, clientId)).orderBy(desc(retainers.createdAt));
}

export async function getRetainerByStripeSubscriptionId(subId: string): Promise<Retainer | undefined> {
  const [r] = await db.select().from(retainers).where(eq(retainers.stripeSubscriptionId, subId));
  return r;
}

export function monthlyEquivalentMrrCents(r: Retainer): number {
  if (r.status !== "active") return 0;
  const amt = r.amount;
  switch (r.interval) {
    case "month":
      return amt * (r.intervalCount || 1);
    case "quarter":
      return Math.round(amt / 3) * (r.intervalCount || 1);
    case "year":
      return Math.round(amt / 12) * (r.intervalCount || 1);
    default:
      return 0;
  }
}

// ============================================================
// Coach billing metrics
// ============================================================

export async function getCoachBillingMetrics(): Promise<{
  mrrCents: number;
  arCents: number;
  arByCurrency: { currency: string; cents: number }[];
  last30dCents: number;
  aging: { bucket: string; cents: number }[];
  overdueInvoices: Invoice[];
}> {
  const allInv = await getAllInvoices();
  const allRet = await getAllRetainers();
  const allPay = await getAllPayments();

  const mrrCents = allRet.reduce((s, r) => s + monthlyEquivalentMrrCents(r), 0);

  const unpaid = allInv.filter((i) => i.status === "sent" || i.status === "overdue" || i.status === "draft");
  const arCents = unpaid.filter((i) => i.status !== "draft").reduce((s, i) => s + i.amount, 0);

  const byCur = new Map<string, number>();
  for (const i of unpaid) {
    if (i.status === "draft") continue;
    byCur.set(i.currency, (byCur.get(i.currency) || 0) + i.amount);
  }
  const arByCurrency = [...byCur.entries()].map(([currency, cents]) => ({ currency, cents }));

  const since = new Date();
  since.setDate(since.getDate() - 30);
  const last30dCents = allPay
    .filter(
      (p) =>
        p.status === "completed" &&
        p.paidAt &&
        new Date(p.paidAt) >= since
    )
    .reduce((s, p) => s + p.amount, 0);

  const now = new Date();
  const aging = [
    { bucket: "0-30d", cents: 0 },
    { bucket: "31-60d", cents: 0 },
    { bucket: "61-90d", cents: 0 },
    { bucket: "90d+", cents: 0 },
  ];
  for (const inv of allInv) {
    if (inv.status !== "sent" && inv.status !== "overdue") continue;
    if (!inv.dueDate) continue;
    const d = new Date(inv.dueDate);
    const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (days <= 0) {
      aging[0]!.cents += inv.amount;
    } else if (days <= 30) {
      aging[0]!.cents += inv.amount;
    } else if (days <= 60) {
      aging[1]!.cents += inv.amount;
    } else if (days <= 90) {
      aging[2]!.cents += inv.amount;
    } else {
      aging[3]!.cents += inv.amount;
    }
  }

  const overdueInvoices = allInv
    .filter((i) => i.status === "overdue" || (i.status === "sent" && i.dueDate && new Date(i.dueDate) < now))
    .sort((a, b) => (a.dueDate && b.dueDate ? +new Date(a.dueDate) - +new Date(b.dueDate) : 0));

  return { mrrCents, arCents, arByCurrency, last30dCents, aging, overdueInvoices };
}

// ============================================================
// Flags
// ============================================================

export function isStripeEnabled(): boolean {
  return !!stripe;
}

export function isPayPalEnabled(): boolean {
  return !!ordersController;
}

export async function resendStripeInvoiceEmail(invoiceId: string): Promise<{ ok: boolean; error?: string }> {
  if (!stripe) return { ok: false, error: "Stripe not configured" };
  const inv = await getInvoice(invoiceId);
  if (!inv?.stripeInvoiceId) {
    return { ok: false, error: "No Stripe invoice" };
  }
  try {
    await stripe.invoices.sendInvoice(inv.stripeInvoiceId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
