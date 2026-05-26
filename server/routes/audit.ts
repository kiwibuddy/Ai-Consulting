/**
 * audit.ts  —  Express router mounted at /api/audit
 *
 * POST /api/audit/invite  — send team survey invites + schedule reminders
 * POST /api/audit/submit  — owner audit submission OR team member submission
 *
 * Privacy architecture: no audit data stored in the database.
 * Only audit_sessions table holds {token, biz_name, invited_count, responded_count}.
 * All audit content is transient — processed in memory, sent via email, discarded.
 */

import { Router } from "express";
import crypto from "crypto";
import { Resend } from "resend";
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { auditSessions } from "@shared/schema";

const router = Router();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONSULTANT_EMAIL = process.env.AUDIT_CONSULTANT_EMAIL || "nathanielbaldock@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Nathaniel Baldock AI Consulting <noreply@nathanielbaldock.com>";
const SITE_URL = process.env.PUBLIC_SITE_URL || "https://nathanielbaldock.com";
const AUDIT_URL = process.env.AUDIT_TOOL_URL || `${SITE_URL}/audit`;
const CALENDAR_URL =
  process.env.AUDIT_CALENDAR_URL ||
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0mO1lxN2kh1ewSrKsEVMsCUeSoz4qauDZs0INinAtrgkBL_JxW0kRRHsWg_d_6qe0rT59-syU-";

// ── Types ─────────────────────────────────────────────────────────────────────
interface AuditTool {
  toolId: string;
  toolName: string;
  vendor: string;
  icon: string;
  tierLabel: string;
  dataType: "public" | "internal" | "personal";
  reviewHabit: "always" | "usually" | "rarely";
  rag: "green" | "amber" | "red";
  ragLabel: string;
  flags: string[];
  trainingOn: boolean;
  ipp12: boolean;
  action: string;
  warning: string;
  howHelps?: string; // team submissions only
}

interface OwnerPayload {
  isTeam?: false;
  bizName: string;
  bizSector: string;
  bizSize: string;
  submittedAt: string;
  emails: string[];
  inviteToken?: string;
  inviteCount?: number;
  tools: AuditTool[];
  summary: { green: number; amber: number; red: number };
}

interface TeamPayload {
  isTeam: true;
  teamToken: string;
  bizName: string;
  memberName: string;
  anonymous: boolean;
  submittedAt: string;
  tools: AuditTool[];
  summary: { green: number; amber: number; red: number };
}

type AuditPayload = OwnerPayload | TeamPayload;

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(s: unknown): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const RED = "#b91c1c";
const RED_BG = "#fef2f2";
const RED_BORDER = "#fecaca";
const AMBER = "#b45309";
const AMBER_BG = "#fffbeb";
const AMBER_BORDER = "#fed7aa";
const GREEN = "#15803d";
const GREEN_BG = "#f0fdf4";
const GREEN_BORDER = "#bbf7d0";
const ACCENT = "#1b5566";

function ragColor(r: string) {
  return r === "red" ? RED : r === "amber" ? AMBER : GREEN;
}
function ragBg(r: string) {
  return r === "red" ? RED_BG : r === "amber" ? AMBER_BG : GREEN_BG;
}
function ragBorder(r: string) {
  return r === "red" ? RED_BORDER : r === "amber" ? AMBER_BORDER : GREEN_BORDER;
}
function ragWord(r: string) {
  return r === "red" ? "Act now" : r === "amber" ? "Check this" : "Good to go";
}

// ── BRAND ASSETS (shared by every email) ──────────────────────────────────────
// Resolved at request time so EMAIL_LOGO_URL / PUBLIC_SITE_URL changes on Railway
// take effect without a redeploy.
function brandLogoUrl() {
  return process.env.EMAIL_LOGO_URL || `${SITE_URL}/logo.png`;
}
function brandPortraitUrl() {
  return `${SITE_URL}/images/email/nathaniel-baldock-portrait.png`;
}

/**
 * Dark hero block + overlapping circular portrait — mirrors the Tauranga SME
 * access-email pattern so every customer-facing email feels like the same brand.
 *
 * Used at the top of all 5 audit-tool email templates. Email-safe markup only:
 * inline styles, tables for layout, no flexbox, no CSS classes.
 */
function brandedHero(opts: {
  kicker: string; // small uppercase pre-title, e.g. "Team AI Survey"
  headline: string; // big white H1
  subline?: string; // optional sub-line under H1 (date, member name, etc.)
  ringColor?: string; // accent ring around portrait + pill border (defaults to lime)
}): string {
  const ring = opts.ringColor || "#84cc16";
  const sub = opts.subline
    ? `<div style="font-size:12px;color:#94a3b8;margin-top:6px;">${opts.subline}</div>`
    : "";
  return `
  <div style="height:5px;background:linear-gradient(90deg,${ACCENT},#84cc16);"></div>
  <div style="background:#171717;padding:28px 24px 52px;text-align:center;">
    <img src="${brandLogoUrl()}" alt="Nathaniel Baldock AI Consulting" height="36" style="display:block;margin:0 auto 14px;height:36px;width:auto;opacity:.95;">
    <div style="display:inline-block;margin-bottom:10px;padding:5px 16px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#fff;border:1.5px solid ${ring};">${esc(opts.kicker)}</div>
    <h1 style="margin:0;font-size:1.4rem;font-weight:700;color:#fff;letter-spacing:-.02em;line-height:1.25;">${esc(opts.headline)}</h1>
    ${sub}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:-40px;">
    <tr><td align="center" style="padding:0 20px 6px;">
      <img src="${brandPortraitUrl()}" alt="Nathaniel Baldock" width="88" height="88" style="display:block;width:88px;height:88px;border-radius:50%;object-fit:cover;border:4px solid ${ring};box-shadow:0 12px 32px rgba(15,23,42,.18);background:#fff;">
    </td></tr>
  </table>`;
}

/** Shared minimal footer for client-facing emails. */
function brandedFooter(extra?: string): string {
  return `
  <div style="padding:18px 24px;border-top:1px solid #ebecef;font-size:12px;color:#94a3b8;text-align:center;background:#fafbfc;">
    <a href="${SITE_URL}" style="color:${ACCENT};font-weight:600;text-decoration:none;">Nathaniel Baldock AI Consulting</a>
    &middot; nathanielbaldock.com${extra ? ` &middot; ${extra}` : ""}
  </div>`;
}

// ── ROUTE: POST /api/audit/invite ─────────────────────────────────────────────
router.post("/invite", async (req, res) => {
  if (!resend) return res.status(503).json({ error: "Email service not configured" });

  const { bizName, bizSector, bizSize, emails } = req.body;
  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "No email addresses provided" });
  }

  // Filter to valid-looking, non-empty addresses so we don't spam Resend with junk
  const cleanEmails = (emails as unknown[])
    .map((e) => (typeof e === "string" ? e.trim() : ""))
    .filter((e) => e.length > 0 && e.includes("@"));

  if (cleanEmails.length === 0) {
    return res.status(400).json({ error: "No valid email addresses provided" });
  }

  const token = crypto.randomUUID();
  const surveyUrl = `${AUDIT_URL}?team=${token}&biz=${encodeURIComponent(bizName || "")}`;

  // Store minimal record — no personal data, just counts
  try {
    await db.insert(auditSessions).values({
      token,
      bizName: bizName || "Unknown",
      invitedCount: cleanEmails.length,
      respondedCount: 0,
    });
  } catch (err) {
    console.error("Failed to store audit session:", err);
    // Continue — email sending is the critical path
  }

  // Send invite + scheduled reminder for each member
  const twodays = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  const emailJobs = cleanEmails.flatMap((email) => [
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `${bizName} — a quick question about how you use AI at work`,
      html: buildTeamInviteEmail(bizName, surveyUrl),
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Just a nudge — ${bizName} AI survey closes tomorrow`,
      html: buildTeamReminderEmail(bizName, surveyUrl),
      scheduledAt: twodays,
    } as Parameters<typeof resend.emails.send>[0]),
  ]);

  await Promise.allSettled(emailJobs);
  return res.json({ token, invitedCount: cleanEmails.length });
});

// ── ROUTE: POST /api/audit/submit ─────────────────────────────────────────────
router.post("/submit", async (req, res) => {
  if (!resend) return res.status(503).json({ error: "Email service not configured" });

  const payload = req.body as AuditPayload;
  if (!payload?.tools?.length) return res.status(400).json({ error: "Invalid payload" });

  const when = new Date(payload.submittedAt || Date.now()).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ── TEAM SUBMISSION ──────────────────────────────────────────────────────────
  if (payload.isTeam) {
    const tp = payload as TeamPayload;

    // Increment responded count
    if (tp.teamToken) {
      try {
        await db
          .update(auditSessions)
          .set({ respondedCount: sql`responded_count + 1` })
          .where(eq(auditSessions.token, tp.teamToken));
      } catch (err) {
        console.error("Failed to increment responded count:", err);
      }
    }

    // Email results to consultant only — not to the team member
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONSULTANT_EMAIL,
      subject: `[Team Survey] ${esc(tp.bizName)} — ${esc(tp.memberName || "Anonymous")} · ${tp.summary.red} red`,
      html: buildTeamResultEmail(tp, when),
    });

    return res.json({ ok: true });
  }

  // ── OWNER SUBMISSION ─────────────────────────────────────────────────────────
  const op = payload as OwnerPayload;
  const clientEmails = (op.emails || []).filter(
    (e) => e && e !== CONSULTANT_EMAIL && e.includes("@"),
  );

  const sendJobs = [
    // Client results email (+ BCC consultant)
    clientEmails.length > 0
      ? resend.emails.send({
          from: FROM_EMAIL,
          to: clientEmails,
          bcc: CONSULTANT_EMAIL,
          subject: `Your AI Use Survey — ${esc(op.bizName)}`,
          html: buildOwnerResultEmail(op, when),
        })
      : null,

    // Consultant notification with full JSON
    resend.emails.send({
      from: FROM_EMAIL,
      to: CONSULTANT_EMAIL,
      subject: `[Owner Audit] ${esc(op.bizName)} — ${op.summary.red} red, ${op.summary.amber} amber, ${op.summary.green} green`,
      html: buildConsultantEmail(op, when),
    }),
  ].filter(Boolean);

  await Promise.allSettled(sendJobs as Promise<unknown>[]);
  return res.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

// ── TEAM INVITE ───────────────────────────────────────────────────────────────
function buildTeamInviteEmail(bizName: string, surveyUrl: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#262626;background:#f4f6f8;">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,.08);border:1px solid #e8eaef;">
  ${brandedHero({
    kicker: `Team AI Survey · ${bizName}`,
    headline: "How is AI helping your work?",
    subline: "5 minutes · anonymous · no wrong answers",
  })}
  <div style="padding:8px 28px 28px;">
    <p style="font-size:15px;color:#262626;margin:0 0 12px;">Kia ora,</p>
    <p style="font-size:14px;color:#374151;line-height:1.65;margin:0 0 12px;"><strong>${esc(bizName)}</strong> is putting together a picture of how AI tools are being used in the business — what's already working well, and where a little care could help.</p>
    <p style="font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;">It takes about 5 minutes. It's completely anonymous — we only collect what you choose to share.</p>
    <p style="font-size:13.5px;color:#6b7280;line-height:1.6;margin:0 0 24px;">There are no wrong answers. If a tool is genuinely saving you time or making your work better, we want to know about it so the business can support it properly.</p>
    <p style="text-align:center;margin:0 0 22px;"><a href="${surveyUrl}" style="display:inline-block;background:linear-gradient(135deg,${ACCENT},#15803d);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 30px;border-radius:999px;box-shadow:0 2px 12px rgba(15,23,42,.12);">Take the survey &rarr;</a></p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin-bottom:8px;">
      <p style="font-size:12px;color:#64748b;margin:0;line-height:1.65;"><strong style="color:#374151;">The survey closes in 2 days.</strong> Your responses are anonymous and go directly to an independent consultant — not to your employer. Individual responses are never shared with the business owner.</p>
    </div>
    <p style="font-size:13px;color:#525252;margin:18px 0 0;">— Nathaniel</p>
  </div>
  ${brandedFooter(`Sent on behalf of ${esc(bizName)} · Not legal advice`)}
</div>
</div>
</body></html>`;
}

// ── TEAM REMINDER ─────────────────────────────────────────────────────────────
function buildTeamReminderEmail(bizName: string, surveyUrl: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#262626;background:#f4f6f8;">
<div style="max-width:560px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,.08);border:1px solid #e8eaef;">
  ${brandedHero({
    kicker: `24-hour reminder · ${bizName}`,
    headline: "Quick nudge — survey closes tomorrow",
    subline: "Still 5 minutes · still anonymous",
  })}
  <div style="padding:8px 28px 28px;">
    <p style="font-size:15px;color:#262626;margin:0 0 12px;">Kia ora,</p>
    <p style="font-size:14px;color:#374151;line-height:1.65;margin:0 0 12px;">Just a gentle nudge — the AI use survey for <strong>${esc(bizName)}</strong> closes tomorrow.</p>
    <p style="font-size:13.5px;color:#6b7280;line-height:1.6;margin:0 0 22px;">Takes 5 minutes. Still completely anonymous. No wrong answers — if a tool is helping your work we want to know about it so the business can support it properly.</p>
    <p style="text-align:center;margin:0 0 20px;"><a href="${surveyUrl}" style="display:inline-block;background:linear-gradient(135deg,${ACCENT},#15803d);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 30px;border-radius:999px;box-shadow:0 2px 12px rgba(15,23,42,.12);">Take the survey &rarr;</a></p>
    <p style="font-size:12px;color:#9ca3af;margin:0;line-height:1.6;">If you've already completed it — thank you, no action needed. If you'd rather not, just ignore this.</p>
    <p style="font-size:13px;color:#525252;margin:18px 0 0;">— Nathaniel</p>
  </div>
  ${brandedFooter(`Sent on behalf of ${esc(bizName)} · Not legal advice`)}
</div>
</div>
</body></html>`;
}

// ── TEAM RESULT (to consultant) ───────────────────────────────────────────────
function buildTeamResultEmail(p: TeamPayload, when: string): string {
  const sorted = [...p.tools].sort((a, b) => {
    const rank = { red: 0, amber: 1, green: 2 } as Record<string, number>;
    return rank[a.rag] - rank[b.rag];
  });

  // Check for "how helps" insights
  const insights = sorted.filter((t) => t.howHelps && t.howHelps.trim().length > 0);

  const toolRows = sorted
    .map(
      (t) => `
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:9px 8px;font-size:13px;">${esc(t.icon)} ${esc(t.toolName)}</td>
      <td style="padding:9px 8px;font-size:12px;color:#64748b;">${esc(t.tierLabel)}</td>
      <td style="padding:9px 8px;"><span style="background:${ragColor(t.rag)};color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;">${ragWord(t.rag)}</span></td>
      <td style="padding:9px 8px;font-size:11.5px;color:#374151;max-width:180px;">${t.howHelps ? `<em style="color:#15803d;">"${esc(t.howHelps)}"</em>` : ""}</td>
    </tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#262626;background:#f4f6f8;">
<div style="max-width:680px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,.08);border:1px solid #e8eaef;">
  ${brandedHero({
    kicker: `Team Survey · ${p.bizName}`,
    headline: esc(p.memberName || "Anonymous"),
    subline: `${when} · ${p.summary.red} red · ${p.summary.amber} amber · ${p.summary.green} green`,
  })}
  <div style="padding:8px 26px 28px;">
    <p style="font-size:13px;color:#525252;margin:0 0 16px;text-align:center;font-style:italic;">An anonymous team-member response — for your pre-call prep only.</p>

    <table style="width:100%;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:16px;border-collapse:collapse;">
      <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Tool</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Plan</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Status</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#15803d;">How it helps</th>
      </tr>
      ${toolRows}
    </table>

    ${
      insights.length > 0
        ? `
    <div style="background:linear-gradient(135deg,#f7fee7,#f0fdf4);border:1px solid ${GREEN_BORDER};border-radius:12px;padding:18px;margin-bottom:16px;">
      <div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#15803d;margin-bottom:10px;">&#9989; Staff insights to use on the owner call</div>
      ${insights
        .map(
          (t) => `
        <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid ${GREEN_BORDER};">
          <strong style="font-size:14px;color:#0f172a;">${esc(t.toolName)}</strong>
          <span style="font-size:11px;color:#64748b;"> — ${esc(t.tierLabel)}</span><br>
          <em style="font-size:13.5px;color:#374151;line-height:1.55;">"${esc(t.howHelps || "")}"</em>
        </div>`,
        )
        .join("")}
      <p style="font-size:12.5px;color:#374151;margin:0;line-height:1.55;">Use these on the owner call: validate the tool, show the better-tier version, or suggest the business pay for it.</p>
    </div>`
        : ""
    }

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#64748b;margin-bottom:8px;">Summary</div>
      <span style="font-size:14px;color:${RED};font-weight:700;">${p.summary.red} red</span> &nbsp;
      <span style="font-size:14px;color:${AMBER};font-weight:700;">${p.summary.amber} amber</span> &nbsp;
      <span style="font-size:14px;color:${GREEN};font-weight:700;">${p.summary.green} green</span>
    </div>
  </div>
  ${brandedFooter("Internal · consultant only")}
</div>
</div>
</body></html>`;
}

// ── OWNER RESULT EMAIL (to client) ────────────────────────────────────────────
function buildOwnerResultEmail(p: OwnerPayload, when: string): string {
  const sorted = [...p.tools].sort((a, b) => {
    const rank = { red: 0, amber: 1, green: 2 } as Record<string, number>;
    return rank[a.rag] - rank[b.rag];
  });
  const red = sorted.filter((t) => t.rag === "red");
  const amber = sorted.filter((t) => t.rag === "amber");
  const green = sorted.filter((t) => t.rag === "green");
  const teamLine =
    p.inviteCount && p.inviteCount > 0
      ? `<p style="font-size:13px;color:#6b7280;margin:0 0 20px;">Your team's ${p.inviteCount} survey${p.inviteCount === 1 ? "" : "s"} are on their way. I'll share what the team reported on your follow-up call.</p>`
      : "";

  function toolSection(tools: AuditTool[]) {
    return tools
      .map(
        (t) => `
      <div style="background:${ragBg(t.rag)};border:1px solid ${ragBorder(t.rag)};border-radius:10px;padding:14px 16px;margin-bottom:10px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;">
          <span style="font-size:16px;">${esc(t.icon)}</span>
          <strong style="font-size:15px;color:#0f172a;">${esc(t.toolName)}</strong>
          <span style="font-size:11px;color:#64748b;">— ${esc(t.tierLabel)}</span>
          <span style="margin-left:auto;background:${ragColor(t.rag)};color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;">${ragWord(t.rag)}</span>
        </div>
        ${t.warning ? `<p style="font-size:12.5px;color:#374151;line-height:1.55;margin:0 0 8px;">${esc(t.warning)}</p>` : ""}
        ${t.flags.length ? `<div style="margin-bottom:8px;">${t.flags.map((f) => `<span style="display:inline-block;font-size:10px;color:${AMBER};background:${AMBER_BG};border:1px solid ${AMBER_BORDER};padding:2px 8px;border-radius:999px;margin:2px 3px 2px 0;">${esc(f)}</span>`).join("")}</div>` : ""}
        <div style="font-size:12px;color:#1e40af;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:8px 10px;"><strong>What to do:</strong> ${esc(t.action)}</div>
        ${t.ipp12 ? `<div style="font-size:11px;color:#64748b;margin-top:6px;">&#9432; This tool sends data to overseas servers — cross-border disclosure under IPP 12, NZ Privacy Act 2020.</div>` : ""}
      </div>`,
      )
      .join("");
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#262626;background:#f4f6f8;">
<div style="max-width:640px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,.08);border:1px solid #e8eaef;">
  ${brandedHero({
    kicker: "AI Use Survey",
    headline: esc(p.bizName),
    subline: when,
  })}
  <div style="padding:8px 26px 28px;">
    <p style="font-size:15px;margin:0 0 10px;">Hi ${esc(p.bizName.split(" ")[0])},</p>
    <p style="font-size:14px;color:#525252;margin:0 0 16px;">Here's your AI Use Survey results. I mapped ${p.tools.length} tool${p.tools.length !== 1 ? "s" : ""} across your business.</p>
    ${teamLine}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <tr>
        <td align="center" style="padding:14px;border-right:1px solid #e2e8f0;background:${RED_BG};"><div style="font-size:1.6rem;font-weight:700;color:${RED};">${p.summary.red}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Act now</div></td>
        <td align="center" style="padding:14px;border-right:1px solid #e2e8f0;background:${AMBER_BG};"><div style="font-size:1.6rem;font-weight:700;color:${AMBER};">${p.summary.amber}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Check this</div></td>
        <td align="center" style="padding:14px;background:${GREEN_BG};"><div style="font-size:1.6rem;font-weight:700;color:${GREEN};">${p.summary.green}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Good to go</div></td>
      </tr>
    </table>
    ${red.length ? `<h3 style="font-size:12px;font-weight:700;color:${RED};text-transform:uppercase;letter-spacing:.1em;margin:0 0 12px;">&#128308; Act now</h3>${toolSection(red)}` : ""}
    ${amber.length ? `<h3 style="font-size:12px;font-weight:700;color:${AMBER};text-transform:uppercase;letter-spacing:.1em;margin:20px 0 12px;">&#127992; Check these</h3>${toolSection(amber)}` : ""}
    ${green.length ? `<h3 style="font-size:12px;font-weight:700;color:${GREEN};text-transform:uppercase;letter-spacing:.1em;margin:20px 0 12px;">&#9989; Good to go</h3>${toolSection(green)}` : ""}
    <div style="background:linear-gradient(135deg,#f7fee7,#f0fdf4);border:1px solid ${GREEN_BORDER};border-radius:12px;padding:22px;text-align:center;margin-top:24px;">
      <div style="font-size:1.05rem;font-weight:700;color:#0f172a;margin-bottom:6px;">Ready to talk through what this means?</div>
      <p style="font-size:13.5px;color:#374151;margin:0 0 16px;line-height:1.6;">Book a free 30-minute follow-up call. I'll walk you through your findings — and share what your team's anonymous surveys revealed.</p>
      <a href="${CALENDAR_URL}" style="display:inline-block;background:linear-gradient(135deg,${ACCENT},#15803d);color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 30px;border-radius:999px;box-shadow:0 2px 12px rgba(15,23,42,.12);">Book a follow-up call &rarr;</a>
    </div>
    <p style="font-size:13px;color:#525252;margin:22px 0 0;">— Nathaniel</p>
  </div>
  ${brandedFooter("Not legal advice")}
</div>
</div>
</body></html>`;
}

// ── CONSULTANT NOTIFICATION (owner submission) ────────────────────────────────
function buildConsultantEmail(p: OwnerPayload, when: string): string {
  const sorted = [...p.tools].sort((a, b) => {
    const rank = { red: 0, amber: 1, green: 2 } as Record<string, number>;
    return rank[a.rag] - rank[b.rag];
  });
  const toolRows = sorted
    .map(
      (t) =>
        `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 6px;font-size:13px;">${esc(t.icon)} ${esc(t.toolName)}</td><td style="padding:8px 6px;font-size:12px;color:#64748b;">${esc(t.tierLabel)}</td><td style="padding:8px 6px;"><span style="background:${ragColor(t.rag)};color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;">${ragWord(t.rag)}</span></td><td style="padding:8px 6px;font-size:11.5px;color:#374151;">${esc(t.action)}</td></tr>`,
    )
    .join("");

  const sectorLine = [
    p.bizSector || "",
    p.bizSize ? esc(p.bizSize) : "",
    p.inviteCount ? `${p.inviteCount} team surveys sent` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#262626;background:#f4f6f8;">
<div style="max-width:700px;margin:0 auto;padding:24px 16px;">
<div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,.08);border:1px solid #e8eaef;">
  ${brandedHero({
    kicker: `Owner Audit · ${p.bizName}`,
    headline: `${p.summary.red} red · ${p.summary.amber} amber · ${p.summary.green} green`,
    subline: `${when}${sectorLine ? ` · ${sectorLine}` : ""}`,
  })}
  <div style="padding:8px 26px 28px;">
    <p style="font-size:13px;color:#525252;margin:0 0 16px;text-align:center;font-style:italic;">Owner submission — your pre-call briefing follows. Full JSON at the bottom for the companion tool.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:20px;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:14px;border-right:1px solid #e2e8f0;background:${RED_BG};"><div style="font-size:1.6rem;font-weight:700;color:${RED};">${p.summary.red}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Act now</div></td>
        <td align="center" style="padding:14px;border-right:1px solid #e2e8f0;background:${AMBER_BG};"><div style="font-size:1.6rem;font-weight:700;color:${AMBER};">${p.summary.amber}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Check this</div></td>
        <td align="center" style="padding:14px;background:${GREEN_BG};"><div style="font-size:1.6rem;font-weight:700;color:${GREEN};">${p.summary.green}</div><div style="font-size:10px;color:#64748b;margin-top:2px;">Good to go</div></td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
      <thead><tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Tool</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Plan</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Status</th>
        <th style="padding:9px 8px;text-align:left;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">Action</th>
      </tr></thead>
      <tbody>${toolRows}</tbody>
    </table>

    <div style="background:#0f172a;border-radius:12px;padding:18px;overflow-x:auto;">
      <div style="font-size:9px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#94a3b8;margin-bottom:10px;">Full JSON — paste into companion tool</div>
      <pre style="margin:0;font-family:'SF Mono',Menlo,Consolas,monospace;font-size:10.5px;color:#e2e8f0;white-space:pre-wrap;word-break:break-word;">${esc(JSON.stringify(p, null, 2))}</pre>
    </div>
  </div>
  ${brandedFooter("Internal · consultant only")}
</div>
</div>
</body></html>`;
}

export default router;
