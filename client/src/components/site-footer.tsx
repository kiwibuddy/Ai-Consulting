"use client";

import { useState } from "react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SITE_CONTACT_EMAIL, MAILTO_SUBJECT_INQUIRY } from "@shared/constants";
import { SOCIAL_PROFILES } from "@shared/content/site-profiles";

export interface SiteFooterProps {
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
}

export function SiteFooter({ onNewsletterSubmit }: SiteFooterProps) {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    if (!input) return;
    const email = input.value?.trim();
    if (!email) return;
    if (onNewsletterSubmit) {
      await onNewsletterSubmit(email);
      input.value = "";
      return;
    }
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      input.value = "";
      toast({ title: "Thanks!", description: "You're signed up for updates." });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast({ title: "Signup failed", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  const footerLink =
    "text-sm text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)] no-underline transition-colors";

  return (
    <footer className="border-t border-[var(--nb-rule)] py-12 md:py-16" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
      <div className="nb-container max-w-[1340px] px-0">
        <div className="flex flex-wrap justify-between items-start gap-8">
          <div className="max-w-[360px]">
            <Link href="/">
              <img src="/logo.png?v=2" alt="Nathaniel Baldock" className="h-9 nb-logo-invert mb-4" />
            </Link>
            <p className="text-[13.5px] leading-relaxed text-[var(--nb-ink-soft)] m-0">
              AI Consulting for Faith, Education &amp; Mission-Driven Leaders.
              <br />
              Based in Tauranga, Aotearoa — serving NZ &amp; globally.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-14">
            <FooterCol title="Site">
              <Link href="/" className={footerLink}>Home</Link>
              <Link href="/about" className={footerLink}>About Me</Link>
              <Link href="/products" className={footerLink}>Products</Link>
              <Link href="/speaking" className={footerLink}>Speaking</Link>
              <Link href="/resources" className={footerLink}>Resources</Link>
              <Link href="/pricing" className={footerLink}>Pricing</Link>
            </FooterCol>
            <FooterCol title="Connect">
              <a href={`mailto:${SITE_CONTACT_EMAIL}?subject=${MAILTO_SUBJECT_INQUIRY}`} className={footerLink}>
                Email
              </a>
              <a
                href={SOCIAL_PROFILES.linkedin}
                className={footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_PROFILES.facebook}
                className={footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href={SOCIAL_PROFILES.youtube}
                className={footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              <Link href="/intake" className={footerLink}>Book a call</Link>
            </FooterCol>
            <FooterCol title="Legal">
              <Link href="/privacy" className={footerLink}>Privacy</Link>
              <Link href="/terms" className={footerLink}>Terms</Link>
            </FooterCol>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--nb-rule)] flex flex-wrap justify-between gap-4 nb-mono-label" style={{ fontSize: 10.5 }}>
          <span>© 2026 Nathaniel Baldock</span>
          <span>Designed with discernment in Tauranga · NZ</span>
        </div>

        <form className="nb-footer-newsletter flex gap-2 max-w-md mt-10" onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Email for updates"
            required
            className="flex-1 min-w-0 rounded-lg border border-[var(--nb-rule-strong)] bg-[var(--nb-bg-raised)] px-4 py-2.5 text-sm text-[var(--nb-ink)] placeholder:text-[var(--nb-ink-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--nb-accent)]"
          />
          <button type="submit" className="nb-btn-primary nb-btn-primary--sm shrink-0" disabled={submitting}>
            {submitting ? "…" : "Submit"}
          </button>
        </form>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 min-w-[120px]">
      <span className="nb-mono-label mb-1" style={{ color: "var(--nb-ink-dim)", fontSize: 10.5 }}>
        {title}
      </span>
      {children}
    </div>
  );
}
