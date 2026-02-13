import { Resend } from "resend";

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

export function verificationEmail(userEmail: string, userName: string, verificationToken: string): EmailOptions {
  const verifyUrl = `${process.env.APP_URL || "http://localhost:3000"}/api/auth/verify-email?token=${verificationToken}`;
  
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

export function passwordResetEmail(userEmail: string, userName: string, resetToken: string): EmailOptions {
  const resetUrl = `${process.env.APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
  
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
