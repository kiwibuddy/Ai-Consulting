import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";

export default function PrivacyPage() {
  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      <SiteHeader />
      <main className={`pt-28 pb-20 ${sectionPadding}`}>
        <div className={`container mx-auto ${contentMax}`}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 mb-10">Last updated: February 2026</p>
          <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">1. Who we are</h2>
              <p>
                This site is operated by Nathaniel Baldock (AI consulting and speaking). Contact:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-[hsl(142,76%,42%)] hover:underline">
                  {SITE_CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">2. Data we collect</h2>
              <p>
                We collect information you provide when you fill in the consultation intake form (name, email, organisation, problem statement, goals, and related fields), when you sign up for email updates in the footer, and when you use the client portal (sessions, notes, profile). We may use cookies and similar technologies for session management and analytics where configured.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">3. How we use it</h2>
              <p>
                We use your data to respond to inquiries, provide consulting and coaching services, send relevant updates (if you opted in), and operate the client portal. We do not sell your data to third parties.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">4. Retention and your rights</h2>
              <p>
                We retain data for as long as needed to provide services and meet legal obligations. You can request access, correction, or deletion of your personal data by contacting us. If you are in the UK or EEA, you have additional rights under applicable privacy laws.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-2">5. Changes</h2>
              <p>
                We may update this policy from time to time. The “Last updated” date at the top will be revised when we do.
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
