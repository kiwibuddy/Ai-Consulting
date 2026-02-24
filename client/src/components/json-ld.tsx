"use client";

import type { FAQItem } from "@/content/speakingPage";
import { SITE_CONTACT_EMAIL } from "@shared/constants";

const SITE_URL = "https://www.nathanielbaldock.com";

/** Homepage: LocalBusiness + Person so Google can show for "AI consultant Tauranga" / "AI consulting New Zealand" */
export function HomepageJsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nathaniel Baldock AI Consulting",
    description:
      "AI consultant in Tauranga, New Zealand. Strategy, training, and advisory for faith-based organisations, churches, schools, and nonprofits. Serving New Zealand and globally.",
    url: SITE_URL,
    email: SITE_CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tauranga",
      addressRegion: "Bay of Plenty",
      addressCountry: "NZ",
    },
    areaServed: [
      { "@type": "Country", name: "New Zealand" },
      { "@type": "City", name: "Tauranga" },
    ],
    serviceType: "AI Consulting",
    image: `${SITE_URL}/hero.jpg`,
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nathaniel Baldock",
    url: SITE_URL,
    jobTitle: "AI Consultant",
    description:
      "AI consultant and speaker in Tauranga, New Zealand. Strategy, training, and advisory for churches, schools, and nonprofits.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tauranga",
      addressCountry: "NZ",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </>
  );
}

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
