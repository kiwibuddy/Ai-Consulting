import { Resend } from "resend";
import { SITE_CONTACT_EMAIL } from "@shared/constants";
import { getNewestArticle } from "../../shared/content/featured-article";
import { buyerFacingSiteOrigin } from "./products";

// Only create Resend client when API key is set (constructor throws otherwise)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY not set. Email functionality will be disabled.");
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  /** Optional BCC (e.g. coach copy on worksheet completion reports). */
  bcc?: string | string[];
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.warn("Email not sent - RESEND_API_KEY not configured:", options.subject);
    return false;
  }

  try {
    await resend.emails.send({
      from: options.from || process.env.RESEND_FROM_EMAIL || "Nathaniel Baldock AI Consulting <noreply@nathanielbaldock.com>",
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.bcc ? { bcc: options.bcc } : {}),
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// Email Templates

export function intakeSubmittedEmail(ownerOrCoachEmail: string, intakeData: {
  firstName: string;
  lastName: string;
  email: string;
  problemStatement: string;
  organisation?: string;
  industry?: string;
}): EmailOptions {
  const orgLine = intakeData.organisation ? `<tr><td class="label">Organisation</td><td>${intakeData.organisation}</td></tr>` : "";
  const industryLine = intakeData.industry ? `<tr><td class="label">Industry</td><td>${intakeData.industry}</td></tr>` : "";
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://nathanielbaldock.com";
  const dashboardUrl = `${process.env.APP_URL || siteUrl}/consultant/intake`;
  return {
    to: ownerOrCoachEmail,
    subject: "New consultation application received - Nathaniel Baldock AI Consulting",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #fafafa; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: #171717; color: #fff; padding: 20px 24px; }
            .header h1 { margin: 0; font-size: 1.25rem; font-weight: 700; }
            .content { padding: 24px; }
            table.info { width: 100%; border-collapse: collapse; }
            table.info td { padding: 8px 0; vertical-align: top; border-bottom: 1px solid #f0f0f0; }
            table.info td.label { font-weight: 600; color: #16a34a; width: 140px; }
            .btn { display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #22c55e, #84cc16); color: #fff !important; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <h1>New consultation application</h1>
              </div>
              <div class="content">
                <p>A new AI consulting intake form has been submitted:</p>
                <table class="info">
                  <tr><td class="label">Name</td><td>${intakeData.firstName} ${intakeData.lastName}</td></tr>
                  <tr><td class="label">Email</td><td>${intakeData.email}</td></tr>
                  ${orgLine}
                  ${industryLine}
                  <tr><td class="label">Problem statement</td><td>${intakeData.problemStatement}</td></tr>
                </table>
                <p><a href="${dashboardUrl}" class="btn">Review in dashboard</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function accountCreatedEmail(clientEmail: string, clientName: string): EmailOptions {
  return {
    to: clientEmail,
    subject: "Welcome to Nathaniel Baldock AI Consulting - Your Account is Ready!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .email-box { background-color: #e8f4f8; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 14px; margin: 10px 0; }
            .step { display: flex; align-items: flex-start; margin: 10px 0; }
            .step-number { background-color: #3A5A6D; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Nathaniel Baldock AI Consulting!</h1>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <p>Great news! Your consulting application has been accepted. Your account is now ready.</p>
              
              <h3>How to Access Your Portal:</h3>
              <div class="step">
                <span class="step-number">1</span>
                <span>Click the button below to go to the portal</span>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <span>Click <strong>"Sign in with Google"</strong></span>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span>Use your Google account with this email address:</span>
              </div>
              <div class="email-box">${clientEmail}</div>
              
              <p>Once signed in, you can:</p>
              <ul>
                <li>View and manage your consultations</li>
                <li>Access resources and materials</li>
                <li>Track your action items and progress</li>
                <li>Communicate with your consultant</li>
              </ul>
              
              <a href="${process.env.APP_URL || "https://your-app-url.com"}" class="button">Access Your Portal</a>
              
              <p style="margin-top: 20px; font-size: 13px; color: #666;">
                <strong>Note:</strong> Make sure to sign in with your Google account that uses ${clientEmail}. 
                If you don't have a Google account with this email, please contact your consultant.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function sessionScheduledEmail(
  recipientEmail: string,
  recipientName: string,
  sessionData: {
    title: string;
    scheduledAt: string;
    duration: number;
    meetingLink?: string;
  },
  isClient: boolean
): EmailOptions {
  const role = isClient ? "Your consultant" : "Your client";
  const action = isClient ? "confirm" : "review";
  
  return {
    to: recipientEmail,
    subject: isClient 
      ? `New Session Scheduled: ${sessionData.title}`
      : `Session Request: ${sessionData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .session-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .info-row { margin: 8px 0; }
            .label { font-weight: bold; color: #3A5A6D; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${isClient ? "New Session Scheduled" : "Session Request"}</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>${role} has ${isClient ? "scheduled" : "requested"} a consultation:</p>
              <div class="session-info">
                <div class="info-row"><span class="label">Title:</span> ${sessionData.title}</div>
                <div class="info-row"><span class="label">Date & Time:</span> ${new Date(sessionData.scheduledAt).toLocaleString()}</div>
                <div class="info-row"><span class="label">Duration:</span> ${sessionData.duration} minutes</div>
                ${sessionData.meetingLink ? `<div class="info-row"><span class="label">Meeting Link:</span> <a href="${sessionData.meetingLink}">${sessionData.meetingLink}</a></div>` : ""}
              </div>
              <p>Please ${action} this session in your consulting portal.</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}" class="button">View Session</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function sessionReminderEmail(
  recipientEmail: string,
  recipientName: string,
  sessionData: {
    title: string;
    scheduledAt: string;
    duration: number;
    meetingLink?: string;
  }
): EmailOptions {
  return {
    to: recipientEmail,
    subject: `Reminder: Consultation Tomorrow - ${sessionData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .session-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .info-row { margin: 8px 0; }
            .label { font-weight: bold; color: #3A5A6D; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Session Reminder</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>This is a reminder that you have a consultation scheduled for tomorrow:</p>
              <div class="session-info">
                <div class="info-row"><span class="label">Title:</span> ${sessionData.title}</div>
                <div class="info-row"><span class="label">Date & Time:</span> ${new Date(sessionData.scheduledAt).toLocaleString()}</div>
                <div class="info-row"><span class="label">Duration:</span> ${sessionData.duration} minutes</div>
                ${sessionData.meetingLink ? `<div class="info-row"><span class="label">Meeting Link:</span> <a href="${sessionData.meetingLink}">${sessionData.meetingLink}</a></div>` : ""}
              </div>
              <p>We look forward to seeing you!</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}" class="button">View Session Details</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function resourceUploadedEmail(
  clientEmail: string,
  clientName: string,
  resourceData: {
    title: string;
    description?: string;
  }
): EmailOptions {
  return {
    to: clientEmail,
    subject: `New Resource Available: ${resourceData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .resource-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Resource Available</h1>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <p>Your consultant has shared a new resource with you:</p>
              <div class="resource-info">
                <h3>${resourceData.title}</h3>
                ${resourceData.description ? `<p>${resourceData.description}</p>` : ""}
              </div>
              <p>You can access this resource in your consulting portal.</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}/client/resources" class="button">View Resources</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function actionItemAssignedEmail(
  clientEmail: string,
  clientName: string,
  actionData: {
    title: string;
    description?: string;
    dueDate?: string;
  }
): EmailOptions {
  return {
    to: clientEmail,
    subject: `New Action Item: ${actionData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .action-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .info-row { margin: 8px 0; }
            .label { font-weight: bold; color: #3A5A6D; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Action Item Assigned</h1>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <p>Your consultant has assigned you a new action item:</p>
              <div class="action-info">
                <div class="info-row"><span class="label">Task:</span> ${actionData.title}</div>
                ${actionData.description ? `<div class="info-row"><span class="label">Details:</span> ${actionData.description}</div>` : ""}
                ${actionData.dueDate ? `<div class="info-row"><span class="label">Due Date:</span> ${new Date(actionData.dueDate).toLocaleDateString()}</div>` : ""}
              </div>
              <p>Please review and complete this action item.</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}/client/actions" class="button">View Action Items</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function actionItemDueEmail(
  clientEmail: string,
  clientName: string,
  actionData: {
    title: string;
    dueDate: string;
  }
): EmailOptions {
  return {
    to: clientEmail,
    subject: `Action Item Due Tomorrow: ${actionData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #D97706; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .action-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #D97706; }
            .button { display: inline-block; padding: 12px 24px; background-color: #D97706; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Action Item Due Tomorrow</h1>
            </div>
            <div class="content">
              <p>Hi ${clientName},</p>
              <p>This is a reminder that the following action item is due tomorrow:</p>
              <div class="action-info">
                <strong>${actionData.title}</strong>
                <p>Due: ${new Date(actionData.dueDate).toLocaleDateString()}</p>
              </div>
              <p>Please ensure you complete this action item on time.</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}/client/actions" class="button">View Action Items</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function sessionCancelledEmail(
  recipientEmail: string,
  recipientName: string,
  sessionData: {
    title: string;
    scheduledAt: string;
    cancelledBy: string;
  }
): EmailOptions {
  return {
    to: recipientEmail,
    subject: `Session Cancelled: ${sessionData.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #DC2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .session-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #DC2626; }
            .info-row { margin: 8px 0; }
            .label { font-weight: bold; color: #DC2626; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Session Cancelled</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>The following consultation has been cancelled:</p>
              <div class="session-info">
                <div class="info-row"><span class="label">Title:</span> ${sessionData.title}</div>
                <div class="info-row"><span class="label">Scheduled for:</span> ${new Date(sessionData.scheduledAt).toLocaleString()}</div>
                <div class="info-row"><span class="label">Cancelled by:</span> ${sessionData.cancelledBy}</div>
              </div>
              <p>If you have any questions, please reach out to reschedule.</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}" class="button">View Dashboard</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function paymentReceivedEmail(
  recipientEmail: string,
  recipientName: string,
  paymentData: {
    amount: string;
    description: string;
    date: string;
  },
  isCoach: boolean = false
): EmailOptions {
  const subject = isCoach 
    ? `Payment Received: ${paymentData.amount}` 
    : `Payment Confirmation: ${paymentData.amount}`;
  
  const message = isCoach
    ? "You've received a new payment from a client:"
    : "Thank you for your payment. Here are your payment details:";

  return {
    to: recipientEmail,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .payment-info { background-color: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #059669; }
            .amount { font-size: 24px; font-weight: bold; color: #059669; }
            .info-row { margin: 8px 0; }
            .label { font-weight: bold; color: #3A5A6D; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${isCoach ? "Payment Received" : "Payment Confirmation"}</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>${message}</p>
              <div class="payment-info">
                <div class="amount">${paymentData.amount}</div>
                <div class="info-row"><span class="label">Description:</span> ${paymentData.description}</div>
                <div class="info-row"><span class="label">Date:</span> ${paymentData.date}</div>
              </div>
              <p>${isCoach ? "The payment has been processed and will be deposited to your account." : "Thank you for your business!"}</p>
              <a href="${process.env.APP_URL || "https://your-app-url.com"}/${isCoach ? "consultant" : "client"}/billing" class="button">View Billing</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function invoiceSentEmail(
  recipientEmail: string,
  recipientName: string,
  data: { invoiceNumber: string; payUrl: string; amount: string; dueDate: string }
): EmailOptions {
  return {
    to: recipientEmail,
    subject: `Invoice ${data.invoiceNumber} — ${data.amount}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0d9488; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, hsl(142 76% 42%), hsl(92 82% 45%)); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>Your invoice is ready</h1></div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>Please find your invoice <strong>${data.invoiceNumber}</strong> for <strong>${data.amount}</strong>${data.dueDate ? ` (due ${data.dueDate})` : ""}.</p>
              <p><a class="button" href="${data.payUrl}">View &amp; pay invoice</a></p>
              <p style="font-size: 12px; color: #666;">If the button doesn’t work, copy this link: ${data.payUrl}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function invoicePaymentFailedEmail(
  recipientEmail: string,
  recipientName: string,
  invoiceNumber: string,
  amount: string,
  currency: string
): EmailOptions {
  return {
    to: recipientEmail,
    subject: `Payment issue — Invoice ${invoiceNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif;">
          <p>Hi ${recipientName},</p>
          <p>We couldn’t process payment for invoice <strong>${invoiceNumber}</strong> (${amount} ${currency.toUpperCase()}). Please sign in to your client portal to update your payment method or try again.</p>
        </body>
      </html>
    `,
  };
}

export function verificationEmail(userEmail: string, userName: string, verificationToken: string): EmailOptions {
  const baseUrl =
    process.env.APP_URL ||
    process.env.PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://nathanielbaldock.com" : "http://localhost:3000");
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${verificationToken}`;
  
  return {
    to: userEmail,
    subject: "Verify your email - Nathaniel Baldock AI Consulting",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 14px 28px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .note { font-size: 13px; color: #666; margin-top: 20px; }
            .link-box { background-color: #e8f4f8; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 12px; word-break: break-all; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Your Email</h1>
            </div>
            <div class="content">
              <p>Hi ${userName},</p>
              <p>Thanks for signing up for Nathaniel Baldock AI Consulting! Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${verifyUrl}" class="button">Verify Email Address</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <div class="link-box">${verifyUrl}</div>
              <p class="note">This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/** Base URL for the public site (used for logo and links in emails). Set PUBLIC_SITE_URL in env or defaults to production. */
const publicSiteUrl = process.env.PUBLIC_SITE_URL || "https://nathanielbaldock.com";
/** Optional: use a light/white logo for dark header in emails (e.g. EMAIL_LOGO_URL=https://nathanielbaldock.com/logo-white.png). */
const emailLogoUrl = process.env.EMAIL_LOGO_URL || `${publicSiteUrl}/logo.png`;

/** Site theme: dark header (neutral-900), green primary (Tesoro). Keep intake confirmation email in sync. */
const emailHeaderBg = "#171717";
const emailPrimaryGreen = "#22a846"; /* hsl(142 76% 42%) */
const emailPrimaryGreenLime = "#7cb71a"; /* hsl(92 82% 45%) - tesoro-cta-gradient end */

export function intakeConfirmationEmail(clientEmail: string, clientName: string): EmailOptions {
  const logoUrl = emailLogoUrl;
  return {
    to: clientEmail,
    subject: "Request received — we'll be in touch soon - Nathaniel Baldock AI Consulting",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #fafafa; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: ${emailHeaderBg}; color: #ffffff; padding: 28px 24px; text-align: center; }
            .header img { display: block; margin: 0 auto 16px; height: 40px; width: auto; max-width: 180px; object-fit: contain; }
            .header h1 { margin: 0; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; }
            .content { padding: 28px 24px; }
            .content p { margin: 0 0 1em; }
            .content p:last-of-type { margin-bottom: 0; }
            .check { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background-color: ${emailPrimaryGreen}; background: linear-gradient(135deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); border-radius: 50%; color: #fff; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
            .accent { color: ${emailPrimaryGreen}; font-weight: 600; }
            .list { margin: 1em 0; padding-left: 1.25em; }
            .list li { margin-bottom: 0.5em; }
            .footer { padding: 20px 24px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #737373; text-align: center; }
            .footer a { color: ${emailPrimaryGreen}; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="180" height="40" style="max-height:40px;height:40px;width:auto;max-width:180px;" />
                <h1>Request received</h1>
              </div>
              <div class="content">
                <div class="check">✓</div>
                <p>Hi ${clientName},</p>
                <p>Thanks for requesting a free discovery call. I've got your details and will be in touch within 1–2 business days to find a time that works.</p>
                <p><strong>What happens next?</strong></p>
                <ul class="list">
                  <li>I'll review your message and reply by email</li>
                  <li>We'll arrange a 30-minute call — no obligation, no sales pitch</li>
                  <li>We'll explore whether I can help and what that might look like</li>
                </ul>
                <p>If you have any questions in the meantime, just reply to this email.</p>
                <p>Looking forward to connecting!</p>
              </div>
              <div class="footer">
                <a href="${publicSiteUrl}">Nathaniel Baldock AI Consulting</a> · Practical AI for Faith, Education & Mission-Driven Leaders
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

const appBaseUrlForEmail = () =>
  process.env.APP_URL ||
  process.env.PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://nathanielbaldock.com" : "http://localhost:3000");

function escapeHtmlForEmail(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** CTA to the newest public article (same date ordering as the marketing site). */
function freeLatestResourceHtmlForEmail(): string {
  const article = getNewestArticle();
  if (!article) return "";
  const base = appBaseUrlForEmail().replace(/\/$/, "");
  const path = article.url.startsWith("/") ? article.url : `/${article.url}`;
  const href = `${base}${path}`;
  const title = escapeHtmlForEmail(article.title);
  return `<p style="margin: 20px 0 0; padding-top: 18px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #404040; line-height: 1.55;">
  <strong style="color: #262626">Free to read on the site</strong> — our latest resource:<br />
  <a href="${href}" style="color: ${emailPrimaryGreen}; font-weight: 600; text-decoration: none; border-bottom: 1px solid ${emailPrimaryGreen}">${title}</a>
</p>`;
}

// ─────────────────────────────────────────────────────────────────
// Tauranga SME — product access email
// ─────────────────────────────────────────────────────────────────

export interface TaurangaAccessEmailLinks {
  worksheets: {
    readiness: string;
    timeAudit: string;
    team: string;
    legal: string;
  };
  presentation: {
    session1: string;
    session2: string;
    session3: string;
    session4: string;
  };
  templates: {
    pia: string;
    aiUsePolicy: string;
    toolRegister: string;
    teTiritiChecklist: string;
  };
  videoWalkthrough: string;
  bookingUrl?: string;
}

/**
 * Per-purchase access email for the Tauranga SME product.
 *
 * Sent from the Stripe webhook after `checkout.session.completed` matches
 * `metadata.productSlug === "tauranga-sme"`. Tier-specific sections show only
 * the assets the buyer paid for (Bronze = self-pack, Silver = +1:1 +
 * templates, Gold = +adoption plan + check-ins + workshop).
 */
export function taurangaAccessEmail(
  buyerEmail: string,
  buyerName: string | undefined,
  tier: "bronze" | "silver" | "gold",
  links: TaurangaAccessEmailLinks
): EmailOptions {
  const siteOrigin = buyerFacingSiteOrigin();
  const heroImageUrl =
    process.env.TAURANGA_EMAIL_HERO_IMAGE_URL ||
    "https://images.unsplash.com/photo-1718398892763-1695285c617d?auto=format&fit=crop&w=1600&q=82";
  const portraitUrl = `${siteOrigin}/images/email/nathaniel-baldock-portrait.png`;
  const logoUrl = emailLogoUrl;
  const greeting = buyerName ? `Hi ${escapeHtmlForEmail(buyerName)},` : "Hi there,";

  const tierMeta: Record<typeof tier, { name: string; line: string }> = {
    bronze: {
      name: "AI-Ready Self-Pack",
      line:
        "You've got the four worksheets plus all four 22-slide HTML decks — citation modals on every stat. Watch the walkthrough when you're ready for a guided tour.",
    },
    silver: {
      name: "AI-Ready Implementation Pack",
      line: "Everything in the Self-Pack, plus your 60-minute strategy call and the NZ-specific templates. Book your call below.",
    },
    gold: {
      name: "Full AI Adoption Plan",
      line: "Welcome aboard. I'll be in touch personally within 1–2 business days to schedule the kickoff and start drafting your written AI Adoption Plan.",
    },
  };
  const meta = tierMeta[tier];

  const tierStyle = {
    bronze: {
      label: "Bronze",
      accent: "#9a6230",
      ring: "#c9a068",
      bandFrom: "#b87333",
      bandTo: "#7c4f28",
      pillBorder: "#e8c9a8",
      pillInner: "rgba(255, 248, 240, 0.95)",
    },
    silver: {
      label: "Silver",
      accent: "#3d556d",
      ring: "#bcc6d4",
      bandFrom: "#94a3b8",
      bandTo: "#64748b",
      pillBorder: "#e2e8f0",
      pillInner: "rgba(248, 250, 252, 0.92)",
    },
    gold: {
      label: "Gold",
      accent: "#92400e",
      ring: "#e8ca5c",
      bandFrom: "#d4af37",
      bandTo: "#996515",
      pillBorder: "#fde68a",
      pillInner: "rgba(255, 251, 235, 0.92)",
    },
  } satisfies Record<
    typeof tier,
    { label: string; accent: string; ring: string; bandFrom: string; bandTo: string; pillBorder: string; pillInner: string }
  >;

  const s = tierStyle[tier];

  const showTemplates = tier === "silver" || tier === "gold";
  const showBooking = tier === "silver" || tier === "gold";
  const showVideo = true;

  const linkRow = (label: string, href: string) =>
    `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
       <a href="${href}" style="color: ${s.accent}; font-weight: 600; text-decoration: none;">${escapeHtmlForEmail(label)} →</a>
     </td></tr>`;

  const templatesBlock = showTemplates
    ? `
        <h3 style="margin: 28px 0 8px; font-size: 1rem; color: #172032; letter-spacing:-0.02em;">Your templates</h3>
        <p style="margin: 0 0 12px; font-size: 14px; color: #525252;">Each link is unique to your purchase. Save them somewhere private.</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${linkRow("NZ Privacy Impact Assessment template (PDF)", links.templates.pia)}
          ${linkRow("Internal AI Use Policy template (PDF)", links.templates.aiUsePolicy)}
          ${linkRow("AI Tool Register template (XLSX)", links.templates.toolRegister)}
          ${tier === "gold" ? linkRow("Te Tiriti / Māori Data Sovereignty checklist (PDF)", links.templates.teTiritiChecklist) : ""}
        </table>`
    : "";

  const bookingBlock =
    showBooking && links.bookingUrl
      ? `
        <h3 style="margin: 28px 0 8px; font-size: 1rem; color: #172032; letter-spacing:-0.02em;">Book your ${tier === "gold" ? "kickoff" : "1:1 strategy call"}</h3>
        <p style="margin: 0 0 12px;"><a href="${links.bookingUrl}" style="display: inline-block; padding: 12px 22px; background: linear-gradient(135deg, ${s.bandFrom}, ${s.bandTo}); color: #fff !important; text-decoration: none; border-radius: 10px; font-weight: 700; box-shadow: 0 2px 12px rgba(15,23,42,0.12);">Pick a time →</a></p>`
      : "";

  const videoBlock = showVideo
    ? `
        <h3 style="margin: 28px 0 8px; font-size: 1rem; color: #172032; letter-spacing:-0.02em;">Recorded walkthrough</h3>
        <p style="margin: 0 0 8px;"><a href="${links.videoWalkthrough}" style="color: ${s.accent}; font-weight: 600; text-decoration: none;">Watch the four-session walkthrough →</a></p>
        <p style="margin: 0; font-size: 13px; color: #737373;">All four decks are live HTML sessions (22 slides each); the walkthrough page mirrors the same structure.</p>`
    : "";

  return {
    to: buyerEmail,
    subject: `Your Tauranga SME ${meta.name} — access inside`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #f4f6f8;">
          <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">
            <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(15,23,42,0.08); border: 1px solid #e8eaef;">
              <div style="height: 5px; background: linear-gradient(90deg, ${s.bandFrom}, ${s.bandTo});"></div>

              <!-- Hero: Tauranga photography + readable overlay -->
              <div style="background-color: #0f172a; background-image: url('${heroImageUrl}'); background-size: cover; background-position: center 38%;">
                <div style="padding: 26px 22px 56px; text-align: center; background: linear-gradient(185deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.82) 100%);">
                  <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="164" height="36" style="display: block; margin: 0 auto 14px; height: 36px; width: auto; max-width: 180px; opacity: 0.95;" />
                  <div style="display: inline-block; margin-bottom: 10px; padding: 6px 18px; border-radius: 999px; font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #ffffff; border: 2px solid ${s.ring}; background: rgba(255,255,255,0.12); box-shadow: 0 0 0 1px rgba(255,255,255,0.06) inset;">
                    Tauranga SME · ${s.label}
                  </div>
                  <h1 style="margin: 0; font-size: 1.45rem; font-weight: 700; letter-spacing: -0.025em; color: #ffffff; line-height: 1.25; text-shadow: 0 2px 20px rgba(0,0,0,0.35);">${meta.name}</h1>
                </div>
              </div>

              <!-- Portrait overlaps hero (email-safe table) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: -40px;">
                <tr>
                  <td align="center" style="padding: 0 20px 6px;">
                    <img src="${portraitUrl}" alt="Nathaniel Baldock" width="92" height="92" style="display: block; width: 92px; height: 92px; border-radius: 50%; object-fit: cover; border: 4px solid ${s.ring}; box-shadow: 0 12px 32px rgba(15,23,42,0.18); background: ${s.pillInner};" />
                  </td>
                </tr>
              </table>

              <div style="padding: 8px 26px 28px;">
                <p style="margin: 0 0 12px; font-size: 15px;">${greeting}</p>
                <p style="margin: 0 0 12px; font-size: 15px;">Welcome to your <strong style="color: ${s.accent};">${escapeHtmlForEmail(meta.name)}</strong>. Payment received — your Stripe receipt is in a separate email.</p>
                <p style="margin: 0 0 8px; font-size: 15px;">${meta.line}</p>

                <h3 style="margin: 28px 0 10px; font-size: 0.95rem; font-weight: 700; color: #172032; letter-spacing: -0.02em;">Start here — the four worksheets</h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse; border-radius: 10px; overflow: hidden; border: 1px solid #eceef3;">
                  ${linkRow("1. Readiness Self-Assessment", links.worksheets.readiness)}
                  ${linkRow("2. Time Audit (30-minute)", links.worksheets.timeAudit)}
                  ${linkRow("3. Team Conversation Guide", links.worksheets.team)}
                  ${linkRow("4. Privacy & Copyright Basics", links.worksheets.legal)}
                </table>

                <h3 style="margin: 26px 0 10px; font-size: 0.95rem; font-weight: 700; color: #172032; letter-spacing: -0.02em;">The 4-session deck</h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse; border-radius: 10px; overflow: hidden; border: 1px solid #eceef3;">
                  ${linkRow("Session 1 — Ready or Not? (full 22-slide deck)", links.presentation.session1)}
                  ${linkRow("Session 2 — Where AI Saves You Time (full deck)", links.presentation.session2)}
                  ${linkRow("Session 3 — AI and Your Team (full deck)", links.presentation.session3)}
                  ${linkRow("Session 4 — Staying Legal (full deck)", links.presentation.session4)}
                </table>

                ${videoBlock}
                ${templatesBlock}
                ${bookingBlock}

                <p style="margin-top: 28px; font-size: 14px; color: #525252;">If anything is missing or you have a question, just reply to this email. I read every one personally.</p>
                <p style="margin: 0; font-size: 14px; color: #525252;">— Nathaniel</p>
              </div>

              <div style="padding: 18px 24px; border-top: 1px solid #ebecef; font-size: 13px; color: #737373; text-align: center; background: #fafbfc;">
                <a href="${siteOrigin}/tauranga-sme" style="color: ${s.accent}; font-weight: 600; text-decoration: none;">Nathaniel Baldock AI Consulting</a> · Tauranga SME programme
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/** Structured worksheet completion report (generated client-side, echoed in email). */
export interface WorksheetReportEmailPayload {
  kind?: string;
  worksheetId?: string;
  worksheetTitle?: string;
  headline?: string;
  subhead?: string;
  stageLabel?: string;
  confidence?: number;
  generatedAt?: string;
  keyFindings?: string[];
  topOpportunities?: Array<{ title?: string; why?: string; effortLabel?: string }>;
  next30DayPlan?: Array<{ phase?: string; items?: string[] }>;
  recommendedTools?: Array<{ name?: string; note?: string }>;
  coachNote?: string;
  worksheetRecaps?: Array<{ shortTitle?: string; worksheetTitle?: string; headline?: string }>;
}

function worksheetReportBullets(items: string[]): string {
  if (!items?.length) return "";
  return `<ul style="margin: 8px 0 0; padding-left: 20px; font-size: 14px; color: #404040; line-height: 1.55;">
    ${items.slice(0, 12).map((x) => `<li>${escapeHtmlForEmail(String(x))}</li>`).join("")}
  </ul>`;
}

function worksheetReportOppsHtml(
  opps: WorksheetReportEmailPayload["topOpportunities"]
): string {
  if (!opps?.length) return "";
  return opps
    .slice(0, 8)
    .map((o) => {
      const title = escapeHtmlForEmail(o?.title || "");
      const why = escapeHtmlForEmail(o?.why || "");
      const eff = o?.effortLabel ? `<span style="font-size: 12px; color: #737373;">${escapeHtmlForEmail(o.effortLabel)}</span>` : "";
      return `<div style="margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #eceef3;">
        <div style="font-weight: 700; color: #172032; margin-bottom: 4px;">${title}</div>
        <div style="font-size: 14px; color: #525252; line-height: 1.5;">${why}</div>
        ${eff}
      </div>`;
    })
    .join("");
}

function worksheetReportPlanHtml(plan: WorksheetReportEmailPayload["next30DayPlan"]): string {
  if (!plan?.length) return "";
  return plan
    .slice(0, 6)
    .map((ph) => {
      const phase = escapeHtmlForEmail(ph?.phase || "");
      const items = (ph?.items || [])
        .slice(0, 8)
        .map((it) => `<li>${escapeHtmlForEmail(String(it))}</li>`)
        .join("");
      return `<div style="margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">${phase}</div>
        <ul style="margin: 0; padding-left: 18px; font-size: 14px; color: #404040; line-height: 1.55;">${items}</ul>
      </div>`;
    })
    .join("");
}

function worksheetReportToolsHtml(tools: WorksheetReportEmailPayload["recommendedTools"]): string {
  if (!tools?.length) return "";
  return tools
    .slice(0, 8)
    .map(
      (t) =>
        `<div style="margin-bottom: 10px; font-size: 14px; color: #404040;"><strong style="color: #172032;">${escapeHtmlForEmail(t?.name || "")}</strong> — ${escapeHtmlForEmail(t?.note || "")}</div>`,
    )
    .join("");
}

/**
 * Email copy of a completed Tauranga SME worksheet report (built in-browser).
 */
export function worksheetReportEmail(
  recipientEmail: string,
  recipientName: string | undefined,
  report: WorksheetReportEmailPayload,
  opts?: { ccNathaniel?: boolean }
): EmailOptions {
  const siteOrigin = buyerFacingSiteOrigin();
  const portraitUrl = `${siteOrigin}/images/email/nathaniel-baldock-portrait.png`;
  const logoUrl = emailLogoUrl;
  const accent = "#2d5a7b";
  const bandFrom = "#2d5a7b";
  const bandTo = "#84cc16";
  const bookingUrl = process.env.WORKSHEET_REPORT_BOOKING_URL || "https://calendar.app.google/KKC9Bhhsb7XEYqvn7";
  const productUrl = `${siteOrigin}/tauranga-sme`;
  const greeting = recipientName ? `Hi ${escapeHtmlForEmail(recipientName)},` : "Hi there,";
  const title = escapeHtmlForEmail(report.worksheetTitle || "Your worksheet report");
  const headline = escapeHtmlForEmail(report.headline || "Your personalised summary");
  const subhead = escapeHtmlForEmail(report.subhead || "");
  const stage = escapeHtmlForEmail(report.stageLabel || "");
  const conf =
    report.confidence != null ? `Confidence ~${escapeHtmlForEmail(String(report.confidence))}% · ` : "";
  const when = report.generatedAt
    ? escapeHtmlForEmail(new Date(report.generatedAt).toLocaleString("en-NZ", { dateStyle: "medium", timeStyle: "short" }))
    : "";

  const recapBlock =
    report.kind === "master" && report.worksheetRecaps?.length
      ? `<h3 style="margin: 22px 0 8px; font-size: 1rem; color: #172032;">Worksheets included</h3>
         ${report.worksheetRecaps
           .map(
             (w) =>
               `<div style="font-size: 14px; color: #525252; margin-bottom: 8px;"><strong>${escapeHtmlForEmail(w.shortTitle || w.worksheetTitle || "")}</strong> — ${escapeHtmlForEmail(w.headline || "")}</div>`,
           )
           .join("")}`
      : "";

  const coach = report.coachNote
    ? `<div style="margin-top: 22px; padding: 16px 18px; border-radius: 12px; background: linear-gradient(135deg, #f7faf3 0%, #eef6fb 100%); border: 1px solid #dbeafe; font-size: 14px; color: #404040; line-height: 1.65;">
        ${escapeHtmlForEmail(report.coachNote).replace(/\n/g, "<br/>")}
       </div>`
    : "";

  const reengageBlock = `
    <div style="margin-top: 22px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #1f3f57 0%, #244b68 100%); border: 1px solid #2f5f82;">
      <div style="padding: 16px 18px;">
        <div style="font-size: 9px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #9cc8de; margin-bottom: 8px;">Tauranga · Bay of Plenty</div>
        <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 1.12rem; color: #ffffff; font-weight: 700; line-height: 1.3; margin-bottom: 8px;">Want help turning this into a clear next step?</div>
        <div style="font-size: 13px; color: #d8e7f0; line-height: 1.6; margin-bottom: 12px;">
          A 30-minute strategy session helps you choose the right follow-on: governance/policy setup, team rollout support, or implementation planning based on your worksheet outcomes.
        </div>
        <div>
          <a href="${bookingUrl}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#a3e635;color:#172032 !important;text-decoration:none;font-weight:700;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;margin-right:6px;">Book a strategy session</a>
          <a href="${productUrl}" style="display:inline-block;padding:10px 16px;border-radius:999px;border:1px solid #7ea4ba;color:#ffffff !important;text-decoration:none;font-weight:700;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;">View Tauranga SME packages</a>
        </div>
      </div>
    </div>
  `;

  const coachBcc = process.env.WORKSHEET_REPORT_COACH_EMAIL?.trim() || SITE_CONTACT_EMAIL;

  const subject =
    report.kind === "master"
      ? "Your Tauranga SME AI Adoption Master Report"
      : `Your worksheet report — ${report.worksheetTitle || "Tauranga SME"}`;

  return {
    to: recipientEmail,
    bcc: opts?.ccNathaniel ? coachBcc : undefined,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #f4f6f8;">
          <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">
            <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(15,23,42,0.08); border: 1px solid #e8eaef;">
              <div style="height: 5px; background: linear-gradient(90deg, ${bandFrom}, ${bandTo});"></div>
              <div style="padding: 22px 22px 16px; text-align: center; border-bottom: 1px solid #f0f2f6;">
                <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="164" height="36" style="display:block;margin:0 auto 12px;height:36px;width:auto;max-width:180px;" />
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: ${accent};">Bay of Plenty · SME worksheet</div>
              </div>
              <div style="padding: 22px 24px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:18px;">
                  <tr>
                    <td style="vertical-align:top;padding-right:14px;">
                      <p style="margin: 0 0 12px; font-size: 15px;">${greeting}</p>
                      <p style="margin: 0 0 8px; font-size: 14px; color: #525252;">Here's the structured summary from <strong style="color: #172032;">${title}</strong> — saved from your browser session.</p>
                      <p style="margin: 0; font-size: 12px; color: #737373;">${conf}${when}</p>
                    </td>
                    <td style="width: 92px; vertical-align: top;">
                      <img src="${portraitUrl}" alt="" width="88" height="88" style="display:block;border-radius: 14px;object-fit:cover;border:2px solid #e8eaef;" />
                    </td>
                  </tr>
                </table>

                <div style="padding: 16px 18px; border-radius: 14px; background: #fafbfc; border: 1px solid #eceef3;">
                  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">${stage}</div>
                  <h1 style="margin: 0 0 8px; font-size: 1.35rem; font-weight: 700; color: #172032; letter-spacing: -0.02em;">${headline}</h1>
                  <p style="margin: 0; font-size: 14px; color: #525252; line-height: 1.55;">${subhead}</p>
                </div>

                <h3 style="margin: 24px 0 8px; font-size: 1rem; color: #172032;">Key findings</h3>
                ${worksheetReportBullets(report.keyFindings || [])}

                <h3 style="margin: 24px 0 8px; font-size: 1rem; color: #172032;">Prioritised next moves</h3>
                ${worksheetReportOppsHtml(report.topOpportunities)}

                <h3 style="margin: 24px 0 8px; font-size: 1rem; color: #172032;">30-day rhythm</h3>
                ${worksheetReportPlanHtml(report.next30DayPlan)}

                <h3 style="margin: 24px 0 8px; font-size: 1rem; color: #172032;">Tools to consider</h3>
                ${worksheetReportToolsHtml(report.recommendedTools)}

                ${recapBlock}
                ${coach}
                ${reengageBlock}

                <p style="margin-top: 22px; font-size: 13px; color: #737373;">You can also use <strong>Print / Save as PDF</strong> from the worksheet report panel on the site.</p>
              </div>
              <div style="padding: 16px 22px; border-top: 1px solid #ebecef; font-size: 12px; color: #737373; text-align: center; background: #fafbfc;">
                <a href="${siteOrigin}" style="color: ${accent}; font-weight: 600; text-decoration: none;">nathanielbaldock.com</a> · AI consultant · Tauranga
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

/** One-time link to set password and access the client portal (7-day token). */
export function portalActivationEmail(
  userEmail: string,
  firstName: string,
  token: string
): EmailOptions {
  const baseUrl = appBaseUrlForEmail();
  const setPasswordUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}&intent=activate`;
  const logoUrl = emailLogoUrl;
  return {
    to: userEmail,
    subject: `Your client portal is ready, ${firstName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #262626; background-color: #f5f5f4; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
            .card { background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
            .header-accent { height: 5px; background: linear-gradient(90deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); }
            .header { background: #ffffff; padding: 28px 32px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
            .header img { display: block; margin: 0 auto 10px; height: 48px; width: auto; max-width: 200px; object-fit: contain; }
            .header-name { font-size: 13px; font-weight: 600; color: #525252; letter-spacing: 0.04em; text-transform: uppercase; }
            .content { padding: 32px 32px 24px; }
            .content p { margin: 0 0 16px; font-size: 15.5px; }
            .btn-wrap { text-align: left; margin: 20px 0; }
            .btn { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); color: #fff !important; text-decoration: none; border-radius: 999px; font-weight: 700; font-size: 15px; letter-spacing: 0.01em; }
            .divider { border: none; border-top: 1px solid #e5e5e5; margin: 24px 0; }
            .link-box { font-size: 12px; color: #a3a3a3; word-break: break-all; }
            .expiry { font-size: 13px; color: #737373; margin-top: 16px; }
            .footer { padding: 20px 32px; background: #fafaf9; border-top: 1px solid #e5e5e5; font-size: 13px; color: #a3a3a3; text-align: center; }
            .footer a { color: ${emailPrimaryGreen}; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header-accent"></div>
              <div class="header">
                <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="200" height="48" />
                <div class="header-name">Nathaniel Baldock AI Consulting</div>
              </div>
              <div class="content">
                <p>Hi ${firstName}!</p>
                <p>I'm really looking forward to our time together. I've set up a private portal for you where you'll find your session notes, curated resources, and a direct line to me — all in one place.</p>
                <p>Click below to choose your password and step inside. It only takes a moment.</p>
                <div class="btn-wrap">
                  <a class="btn" href="${setPasswordUrl}">Access my portal &rarr;</a>
                </div>
                <hr class="divider" />
                <p class="link-box">If the button doesn't work, paste this link into your browser:<br/>${setPasswordUrl}</p>
                <p class="expiry">This link expires in 7 days. If you weren't expecting this email, you can safely ignore it.</p>
              </div>
              <div class="footer">
                <a href="${publicSiteUrl}">Nathaniel Baldock AI Consulting</a><br/>
                Practical AI for Faith, Education &amp; Mission-Driven Leaders
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function intakeExistingClientEmail(
  userEmail: string,
  firstName: string,
  loginUrl: string
): EmailOptions {
  const logoUrl = emailLogoUrl;
  return {
    to: userEmail,
    subject: "We’ve got your request — sign in to your portal",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #262626; background: #fafafa; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: ${emailHeaderBg}; color: #fff; padding: 24px; text-align: center; }
            .content { padding: 24px; }
            .btn { display: inline-block; padding: 12px 22px; background: linear-gradient(135deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); color: #fff !important; text-decoration: none; border-radius: 999px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header"><img src="${logoUrl}" alt="Logo" height="40" style="height:40px;width:auto" /></div>
              <div class="content">
                <p>Hi ${firstName},</p>
                <p>Thanks — we received your new message. You already have an account; sign in to the client portal for updates and follow-up.</p>
                <p><a class="btn" href="${loginUrl}">Sign in to client portal</a></p>
                ${freeLatestResourceHtmlForEmail()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function intakeGoogleUserEmail(
  userEmail: string,
  displayName: string,
  loginUrl: string
): EmailOptions {
  const logoUrl = emailLogoUrl;
  return {
    to: userEmail,
    subject: "We’ve got your request — sign in with Google",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8" />
          <style>
            body { margin: 0; font-family: -apple-system, sans-serif; line-height: 1.6; color: #262626; background: #fafafa; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: ${emailHeaderBg}; color: #fff; padding: 20px; text-align: center; }
            .content { padding: 24px; }
            .btn { display: inline-block; padding: 12px 22px; background: linear-gradient(135deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); color: #fff !important; text-decoration: none; border-radius: 999px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header"><img src="${logoUrl}" alt="Logo" height="40" style="height:40px" /></div>
              <div class="content">
                <p>Hi ${displayName},</p>
                <p>We received your request. Your account uses Google sign-in — use the same email in the portal.</p>
                <p><a class="btn" href="${loginUrl}">Open sign in</a></p>
                ${freeLatestResourceHtmlForEmail()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function surveyNotificationEmail(options: {
  ownerEmail?: string;
  firstName: string;
  lastName: string;
  email: string;
  aiConcerns: string;
  aiWishlist: string;
  learningPreferences: string[];
  otherLearningMethod?: string | null;
  interestedInUpdates: boolean;
}): EmailOptions {
  const ownerEmail = options.ownerEmail || process.env.SITE_CONTACT_EMAIL || "nathanielbaldock@gmail.com";
  const logoUrl = emailLogoUrl;
  const learningList =
    options.learningPreferences.length > 0
      ? options.learningPreferences.map((item) => `<li>${item}</li>`).join("")
      : "<li>(no specific formats selected)</li>";

  const otherBlock = options.otherLearningMethod
    ? `<tr><td class="label">Other ideas</td><td>${options.otherLearningMethod}</td></tr>`
    : "";

  return {
    to: ownerEmail,
    subject: `New AI survey response - ${options.firstName} ${options.lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #fafafa; }
            .wrapper { max-width: 640px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: ${emailHeaderBg}; color: #ffffff; padding: 24px; text-align: center; }
            .header img { display: block; margin: 0 auto 12px; height: 36px; width: auto; max-width: 170px; object-fit: contain; }
            .header h1 { margin: 0; font-size: 1.4rem; font-weight: 700; letter-spacing: -0.01em; }
            .content { padding: 24px; }
            .content p { margin: 0 0 1em; }
            table.info { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
            table.info td { padding: 8px 0; vertical-align: top; border-bottom: 1px solid #f0f0f0; }
            table.info td.label { font-weight: 600; color: ${emailPrimaryGreen}; width: 140px; }
            .question { margin-top: 16px; }
            .question h3 { margin: 0 0 4px; font-size: 0.95rem; color: #171717; }
            .question p { margin: 0; white-space: pre-wrap; }
            ul { margin: 0.5em 0 0; padding-left: 1.25em; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="170" height="36" />
                <h1>New AI knowledge survey response</h1>
              </div>
              <div class="content">
                <p>Someone just completed your AI survey. Here's what they shared:</p>
                <table class="info">
                  <tr><td class="label">Name</td><td>${options.firstName} ${options.lastName}</td></tr>
                  <tr><td class="label">Email</td><td>${options.email}</td></tr>
                  <tr><td class="label">Wants updates?</td><td>${options.interestedInUpdates ? "Yes" : "No"}</td></tr>
                </table>

                <div class="question">
                  <h3>Q1. What about AI worries them / they wish they understood?</h3>
                  <p>${options.aiConcerns}</p>
                </div>

                <div class="question">
                  <h3>Q2. Where they'd love AI to help (life/work/family/ministry)</h3>
                  <p>${options.aiWishlist}</p>
                </div>

                <div class="question">
                  <h3>Q3. How they'd like to learn</h3>
                  <ul>${learningList}</ul>
                </div>

                ${otherBlock ? `<div class="question">${otherBlock}</div>` : ""}

                <p style="margin-top: 16px; font-size: 13px; color: #737373;">
                  You can reply directly to this email address to follow up personally.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function surveyThankYouEmail(clientEmail: string, clientName: string): EmailOptions {
  const logoUrl = emailLogoUrl;
  return {
    to: clientEmail,
    subject: "Thanks for sharing your thoughts on AI - Nathaniel Baldock",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #262626; background-color: #fafafa; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
            .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
            .header { background: ${emailHeaderBg}; color: #ffffff; padding: 28px 24px; text-align: center; }
            .header img { display: block; margin: 0 auto 16px; height: 40px; width: auto; max-width: 180px; object-fit: contain; }
            .header h1 { margin: 0; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; }
            .content { padding: 28px 24px; }
            .content p { margin: 0 0 1em; }
            .btn { display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, ${emailPrimaryGreen}, ${emailPrimaryGreenLime}); color: #fff !important; text-decoration: none; border-radius: 999px; font-weight: 600; margin-top: 12px; }
            .footer { padding: 20px 24px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #737373; text-align: center; }
            .footer a { color: ${emailPrimaryGreen}; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <img src="${logoUrl}" alt="Nathaniel Baldock AI Consulting" width="180" height="40" />
                <h1>Thank you for sharing</h1>
              </div>
              <div class="content">
                <p>Hi ${clientName},</p>
                <p>Thank you for taking a moment to share how you're feeling about AI and where you'd love help. I really appreciate your honesty and trust.</p>
                <p>I'll personally read through what you wrote and use it to shape the next resources, trainings, and conversations I create.</p>
                <p>If you're curious in the meantime, you can explore articles, talks, and tools I've already started putting together here:</p>
                <p>
                  <a href="${publicSiteUrl}/resources" class="btn">Browse AI resources</a>
                </p>
                <p>If you ever want to ask a question directly, you can also reply to this email.</p>
                <p>Grace and peace,<br />Nathaniel</p>
              </div>
              <div class="footer">
                <a href="${publicSiteUrl}">Nathaniel Baldock AI Consulting</a> · Practical AI for Faith, Education & Mission-Driven Leaders
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function passwordResetEmail(userEmail: string, userName: string, resetToken: string): EmailOptions {
  const baseUrl =
    process.env.APP_URL ||
    process.env.PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://nathanielbaldock.com" : "http://localhost:3000");
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  
  return {
    to: userEmail,
    subject: "Reset your password - Nathaniel Baldock AI Consulting",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #3A5A6D; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 14px 28px; background-color: #3A5A6D; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .note { font-size: 13px; color: #666; margin-top: 20px; }
            .link-box { background-color: #e8f4f8; padding: 12px 16px; border-radius: 6px; font-family: monospace; font-size: 12px; word-break: break-all; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hi ${userName},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <div class="link-box">${resetUrl}</div>
              <p class="note">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email - your password won't be changed.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
