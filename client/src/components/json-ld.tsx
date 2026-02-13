"use client";

import type { FAQItem } from "@/content/speakingPage";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

const SITE_URL = "https://www.nathanielbaldock.com";

export function SpeakingPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = {
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nathaniel Baldock",
    url: SITE_URL,
    email: SITE_CONTACT_EMAIL,
    jobTitle: "AI Consultant & Speaker",
    description:
      "AI consultant and speaker specializing in faith-based organizations. Strategy, training, and advisory for churches, schools, and nonprofits.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tauranga",
      addressCountry: "NZ",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
