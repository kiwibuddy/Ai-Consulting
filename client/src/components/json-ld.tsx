"use client";

import type { FAQItem } from "@/content/speakingPage";
import {
  buildPersonSchema,
  buildProfessionalServiceSchema,
  CANONICAL_BIO,
  PERSON_JOB_TITLE,
  SITE_URL,
} from "@shared/content/site-profiles";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

function JsonLdScript({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/** Homepage: LocalBusiness + Person so Google can show for "AI consultant Tauranga" / "AI consulting New Zealand" */
export function HomepageJsonLd() {
  return (
    <JsonLdScript
      data={[
        buildProfessionalServiceSchema(),
        buildPersonSchema({ jobTitle: "AI Consultant", includeKnowsAbout: false, includeAlumniOf: false }),
      ]}
    />
  );
}

/** About + Who-is pages: richest Person entity on the site. */
export function AboutPageJsonLd() {
  return (
    <JsonLdScript
      data={buildPersonSchema({
        includeEmail: true,
        includeKnowsAbout: true,
        includeAlumniOf: true,
        includeWorksFor: true,
      })}
    />
  );
}

function buildFaqPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** FAQPage JSON-LD for /resources (and other static FAQ pages). */
export function FaqPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  return <JsonLdScript data={buildFaqPageSchema(faqs)} />;
}

export function SpeakingPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  return (
    <JsonLdScript
      data={[
        buildFaqPageSchema(faqs),
        buildPersonSchema({
          jobTitle: PERSON_JOB_TITLE,
          description: CANONICAL_BIO,
          includeEmail: true,
        }),
      ]}
    />
  );
}

export function ExpertisePageJsonLd({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  return <JsonLdScript data={buildFaqPageSchema(faqs)} />;
}

/** Re-export for server-side JSON-LD injection. */
export { buildPersonSchema, buildProfessionalServiceSchema, SITE_URL };
