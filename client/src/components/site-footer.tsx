"use client";

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SITE_CONTACT_EMAIL, MAILTO_SUBJECT_INQUIRY } from "@shared/constants";

const contentMax = "max-w-6xl";

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
    const email = input?.value?.trim();
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

  return (
    <footer className="border-t border-neutral-200 py-16 px-6 md:px-10 bg-neutral-100">
      <div className={`container mx-auto ${contentMax}`}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-flex items-center w-fit">
                <img
                  src="/logo.png?v=2"
                  alt="Nathaniel Baldock — AI Consulting"
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </Link>
            <div>
              <p className="text-sm font-medium text-neutral-900 mb-2">Sign up for updates</p>
              <form
                className="flex gap-2 max-w-md"
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 min-w-0 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]"
                />
<Button type="submit" variant="default" size="default" className="tesoro-cta-gradient rounded-lg shrink-0" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
              </form>
            </div>
            </div>
            <div className="text-sm text-neutral-600">
              <p>Tauranga, NZ · Working NZ + Global (Zoom)</p>
              <p className="mt-1">
                Contact:{" "}
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}?subject=${MAILTO_SUBJECT_INQUIRY}`}
                  className="hover:text-neutral-900 transition-colors duration-300"
                >
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">© 2026 Nathaniel Baldock</p>
            <div className="flex items-center gap-6">
              <Link href="/speaking" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                Speaking
              </Link>
              <Link href="/resources" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                Resources
              </Link>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                Credits
              </a>
              <Link href="/terms" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
