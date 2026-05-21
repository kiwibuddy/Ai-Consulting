import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

export default function TermsPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <main className="nb-inner-main">
        <div className="nb-container px-0 max-w-[1240px]">
          <h1 className="nb-page-title mb-8">Terms of Service</h1>
          <p className="nb-eyebrow-muted mb-10">Last updated: February 2026</p>
          <div className="nb-prose max-w-none space-y-6">
            <section>
              <h2>1. Agreement</h2>
              <p>
                By using this website and any associated services (consulting, coaching, client portal), you agree to these terms. If you do not agree, please do not use the site or services.
              </p>
            </section>
            <section>
              <h2>2. Services</h2>
              <p>
                Nathaniel Baldock provides AI consulting, speaking, and coaching services. Specific scope, deliverables, and fees are agreed separately (e.g. via proposal or engagement letter). This site is for information and intake only unless otherwise agreed.
              </p>
            </section>
            <section>
              <h2>3. Use of the site</h2>
              <p>
                You agree to use the site and client portal only for lawful purposes and not to attempt to gain unauthorised access to systems or other users’ data. We reserve the right to suspend or terminate access if we reasonably believe terms have been breached.
              </p>
            </section>
            <section>
              <h2>4. Limitation of liability</h2>
              <p>
                To the extent permitted by law, our liability for any claim arising from your use of the site or services is limited to the amount you paid us for the relevant service in the twelve months before the claim. We are not liable for indirect or consequential loss.
              </p>
            </section>
            <section>
              <h2>5. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
              </p>
            </section>
          </div>
          <p className="mt-12">
            <Link href="/" className="nb-btn-secondary">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
