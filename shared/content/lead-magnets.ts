/**
 * Gated PDF lead magnets. Email capture reveals + emails the download link,
 * and the lead is persisted (see lead_magnet_downloads table).
 * Shared between the client landing page and the /api/lead-magnet-request endpoint.
 */

export interface LeadMagnetDefinition {
  id: string;
  /** Human label used in the email subject/heading. */
  label: string;
  /** Public (unlisted) path to the downloadable PDF, served by express.static. */
  pdfPath: string;
  /** Blurb shown in the delivery email. */
  emailBlurb: string;
}

export const LEAD_MAGNETS: LeadMagnetDefinition[] = [
  {
    id: "ai-policy-starter-kit-sample",
    label: "AI Policy Starter Kit — Free Sample",
    pdfPath: "/downloads/ai-policy-starter-kit-sample.pdf",
    emailBlurb:
      "Here is your free sample of the AI Policy Starter Kit — the five convictions, the five questions to ask before using AI, and the Traffic Light data guide. When you are ready for the full editable pack (policy template, one-pager, staff acknowledgement form, and four sector versions), it is a single self-serve purchase.",
  },
];

export const LEAD_MAGNET_ID_VALUES = ["ai-policy-starter-kit-sample"] as const;

export type LeadMagnetId = (typeof LEAD_MAGNET_ID_VALUES)[number];

export function getLeadMagnetById(id: string): LeadMagnetDefinition | undefined {
  return LEAD_MAGNETS.find((m) => m.id === id);
}
