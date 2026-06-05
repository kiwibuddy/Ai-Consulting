import { SITE_CONTACT_EMAIL } from "../constants";

export const SITE_URL = "https://www.nathanielbaldock.com";

export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/in/nathaniel-baldock-0371251bb/",
  facebook: "https://www.facebook.com/buddybaldock",
  youtube: "https://www.youtube.com/@nathanielbaldock5559/playlists",
} as const;

export const SOCIAL_SAME_AS = Object.values(SOCIAL_PROFILES);

export const CANONICAL_BIO =
  "Nathaniel Baldock is an AI strategist, consultant, speaker, and educator based in Tauranga, New Zealand. He helps churches, schools, and mission-driven organisations navigate AI with clarity, ethics, and practical implementation.";

export const PERSON_KNOWS_ABOUT = [
  "Artificial Intelligence",
  "AI strategy",
  "AI ethics",
  "AI governance",
  "Christian education",
  "Digital discipleship",
  "Faith and technology",
  "Nonprofit consulting",
  "AI training",
] as const;

export const PERSON_JOB_TITLE = "AI Consultant & Speaker";

export const ORGANIZATION_NAME = "Nathaniel Baldock AI Consulting";

export interface PersonSchemaOptions {
  jobTitle?: string;
  description?: string;
  includeEmail?: boolean;
  includeKnowsAbout?: boolean;
  includeAlumniOf?: boolean;
  includeWorksFor?: boolean;
}

/** Shared Person schema.org object — keep sameAs identical everywhere. */
export function buildPersonSchema(options: PersonSchemaOptions = {}) {
  const {
    jobTitle = PERSON_JOB_TITLE,
    description = CANONICAL_BIO,
    includeEmail = false,
    includeKnowsAbout = true,
    includeAlumniOf = true,
    includeWorksFor = true,
  } = options;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nathaniel Baldock",
    url: SITE_URL,
    jobTitle,
    description,
    image: `${SITE_URL}/Nathaniel_Portrait.png`,
    sameAs: SOCIAL_SAME_AS,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tauranga",
      addressRegion: "Bay of Plenty",
      addressCountry: "NZ",
    },
  };

  if (includeEmail) {
    schema.email = SITE_CONTACT_EMAIL;
  }

  if (includeKnowsAbout) {
    schema.knowsAbout = [...PERSON_KNOWS_ABOUT];
  }

  if (includeAlumniOf) {
    schema.alumniOf = {
      "@type": "Organization",
      name: "Youth With A Mission",
    };
  }

  if (includeWorksFor) {
    schema.worksFor = {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL,
    };
  }

  return schema;
}

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: ORGANIZATION_NAME,
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
    image: `${SITE_URL}/Nathaniel_Portrait.png`,
  };
}
