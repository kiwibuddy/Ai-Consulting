import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";

export default function TermsPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      <SiteHeader />
      <main className={`pt-28 pb-20 ${sectionPadding}`}>
        <div className={`container mx-auto ${contentMax}`}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-8">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-500 mb-10">Last updated: February 2026</p>
          <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">1. Agreement</h2>
              <p>
                By using this website and any associated services (consulting, coaching, client portal), you agree to these terms. If you do not agree, please do not use the site or services.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">2. Services</h2>
              <p>
                Nathaniel Baldock provides AI consulting, speaking, and coaching services. Specific scope, deliverables, and fees are agreed separately (e.g. via proposal or engagement letter). This site is for information and intake only unless otherwise agreed.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">3. Use of the site</h2>
              <p>
                You agree to use the site and client portal only for lawful purposes and not to attempt to gain unauthorised access to systems or other users’ data. We reserve the right to suspend or terminate access if we reasonably believe terms have been breached.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">4. Limitation of liability</h2>
              <p>
                To the extent permitted by law, our liability for any claim arising from your use of the site or services is limited to the amount you paid us for the relevant service in the twelve months before the claim. We are not liable for indirect or consequential loss.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">5. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-[hsl(142,76%,42%)] hover:underline">
                  {SITE_CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
          <p className="mt-12">
            <Link href="/" className="text-[hsl(142,76%,42%)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
