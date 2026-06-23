import { expertisePages } from "../../client/src/content/expertise-pages";
import { buildIdentityFaqSchema } from "./identity-faq";
import { buildPersonSchema, buildProfessionalServiceSchema } from "./site-profiles";

export interface PublicPageMeta {
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
}

const SITE = "https://www.nathanielbaldock.com";
const DEFAULT_IMAGE = `${SITE}/Nathaniel_Portrait.png`;

const staticPages: Record<string, PublicPageMeta> = {
  "/": {
    title: "AI Consultant Tauranga | AI Consulting for Churches, Schools & Nonprofits — New Zealand & Global",
    description:
      "Nathaniel Baldock helps churches, Christian schools, and mission organisations navigate AI with clarity. Strategy, training, and advisory rooted in faith. Based in Tauranga, NZ — serving globally.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  // Unlisted shareable page (kept out of the sitemap + noindex in og-meta.ts).
  // Meta lives here so link previews show the presentation thumbnail.
  "/ai-leadership-collective": {
    title: "Thank you for coming — AI session follow-up",
    description:
      "Follow-up resources from Nathaniel Baldock's AI session: the full presentation, a free AI privacy & data audit, and practical tools for your team, family and church.",
    image: `${SITE}/images/email/thumb-social-revolution.png`,
    ogType: "website",
  },
  "/thank-you": {
    title: "Thank you for coming — AI session follow-up",
    description:
      "Thank you for coming to the AI session. A couple of follow-up opportunities: a public evening on AI, and a free AI privacy & data audit for your church, school or business.",
    image: `${SITE}/images/email/thumb-social-revolution.png`,
    ogType: "website",
  },
  "/about": {
    title: "About Nathaniel Baldock — AI Consultant for Faith-Based Organisations",
    description:
      "20+ years in global missions with YWAM. AI consultant, speaker, and educator in Tauranga, New Zealand — strategy, training, and advisory for churches, schools, and nonprofits.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/who-is-nathaniel-baldock": {
    title: "Who Is Nathaniel Baldock? — AI Consultant, Speaker & Educator (Tauranga, NZ)",
    description:
      "Nathaniel Baldock: AI strategist, consultant, speaker, and educator in Tauranga, New Zealand. 23 years in global missions; helps churches, schools, and nonprofits navigate AI.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/resources": {
    title: "AI & Faith Resources — Articles on AI for Churches, Christian Education & Missions",
    description:
      "Articles and essays on artificial intelligence from a Christian perspective. AI ethics for churches, digital discipleship, AI in education, parenting in the age of AI, and more. By Nathaniel Baldock.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/pricing": {
    title: "AI Consulting Pricing — Workshops, Strategy Sessions & Speaking for Churches and Schools",
    description:
      "Transparent pricing for AI consulting, workshops, and keynote speaking. Tailored for churches, Christian schools, nonprofits, and mission organisations. Free 30-minute discovery call available.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/intake": {
    title: "Book a Free AI Consultation — Nathaniel Baldock AI Consulting",
    description:
      "Book a free 30-minute AI consultation for your church, school, or nonprofit. Get practical guidance on AI strategy, policy, and implementation from a faith-based AI consultant.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/speaking": {
    title: "Invite Nathaniel Baldock to Speak — AI, Faith & Technology Keynotes",
    description:
      "Book Nathaniel Baldock as a speaker for your church, conference, or Christian school. Keynotes and workshops on AI and faith, digital discipleship, technology ethics, and navigating AI as a Christian leader.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/speaking/invite": {
    title: "Speaking Inquiry — Nathaniel Baldock",
    description:
      "Submit a speaking inquiry for keynotes, workshops, or seminars on AI, faith, and technology. Nathaniel Baldock — Tauranga, New Zealand.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/privacy": {
    title: "Privacy Policy — Nathaniel Baldock AI Consulting",
    description: "Privacy policy for nathanielbaldock.com and Nathaniel Baldock AI Consulting services.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/terms": {
    title: "Terms of Use — Nathaniel Baldock AI Consulting",
    description: "Terms of use for nathanielbaldock.com and Nathaniel Baldock AI Consulting services.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/audit": {
    title: "Free AI Use Audit — Nathaniel Baldock AI Consulting",
    description:
      "Free ten-minute AI Use Audit for NZ businesses, churches, and schools. Map your tools, answer three questions each, get red/amber/green risk guidance in your inbox.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
};

for (const page of expertisePages) {
  staticPages[page.path] = {
    title: page.seoTitle,
    description: page.seoDescription,
    image: DEFAULT_IMAGE,
    ogType: "website",
  };
}

const articlePages: Record<string, PublicPageMeta> = {
  "/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket": {
    title: "The Garden and the Tree of Knowledge in Your Pocket",
    description:
      "Genesis 3, AI companions, and the oldest temptation in a new interface: wisdom without the walk, companionship without the Paraclete. Protect the slow conversation with God.",
    image: `${SITE}/images/garden-tree-knowledge-header.png`,
    ogType: "article",
  },
  "/resources/when-your-teens-best-friend-is-an-algorithm": {
    title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
    description:
      "Teens and AI companions: what Christian parents and youth leaders need to know. Character.AI, the 2 a.m. conversation, social skill atrophy, AI deepfakes in schools, and practical ways to out-human the technology.",
    image: `${SITE}/images/teens-algorithm-header.png`,
    ogType: "article",
  },
  "/resources/sabbath-rest-in-the-age-of-ai": {
    title: "Reclaiming the Sabbath in an Always-On World",
    description:
      "Why Sabbath rest matters in the age of AI. AI fatigue, bastard sabbath vs real rest, practical atheism of the always-on life, and how to reclaim margin as trust.",
    image: `${SITE}/images/sabbath-rest-header.png`,
    ogType: "article",
  },
  "/resources/why-your-soul-needs-the-struggle": {
    title: "The Danger of an Effortless Faith: Why the Soul Needs the Struggle",
    description:
      "Why effortless AI is a Genesis 3 problem, not a productivity problem. Grace, effort, Peter's charcoal fire, and fighting for humanness in an always-on world.",
    image: `${SITE}/images/beach-coal-fire.jpg`,
    ogType: "article",
  },
  "/resources/how-worried-should-you-be-about-ai": {
    title: "The Calm Middle: How Worried Should You Actually Be About AI?",
    description:
      "How worried should you be about AI? A calm middle path between dismissal and doom — what Level 1 looks like, practical household steps, and why preparation pays off either way.",
    image: `${SITE}/images/ai-worry-header.jpg`,
    ogType: "article",
  },
  "/resources/the-voice-on-the-phone-is-not-your-son": {
    title: "The Voice on the Phone Is Your Son. It Isn't.",
    description:
      "AI voice-cloning scams explained — how the call works, why familiar voices are no longer proof, and the family safe phrase that defeats impersonation.",
    image: `${SITE}/images/safe-phrase-header.jpg`,
    ogType: "article",
  },
  "/resources/something-has-changed-you-are-not-imagining-it": {
    title: "Something Has Changed. You Are Not Imagining It.",
    description:
      "Why AI disorientation is a reasonable response, what the shift from the Information Age to the Discernment Age means for leaders, and the pastoral gap in the church.",
    image: `${SITE}/images/ground-has-shifted-header.jpg`,
    ogType: "article",
  },
  "/resources/the-question-nobody-is-asking-about-ai": {
    title: "The Question Nobody Is Asking About AI",
    description:
      "What AI is doing to our desires, attention, and formation — Smith, James, Crouch, Augustine, and why holiness is the ultimate disruption.",
    image: `${SITE}/images/question-nobody-asking-header.jpg`,
    ogType: "article",
  },
  "/resources/the-work-ai-cannot-take": {
    title: "The Work That AI Cannot Take",
    description:
      "Vocation in the age of automation: complicated vs complex, Automate/Augment/Accelerate/Activate, Sacred Tasks, and five disciplines for faithful leadership.",
    image: `${SITE}/images/work-ai-cannot-take-header.jpg`,
    ogType: "article",
  },
  "/resources/in-a-world-of-fakes-the-church-has-something-rare": {
    title: "In a World of Fakes, the Church Has Something Rare",
    description:
      "Why demonstrable trustworthiness, physical presence, and covenant community are the scarcest assets of 2026 — and what faithful leadership looks like from Monday.",
    image: `${SITE}/images/world-of-fakes-header.jpg`,
    ogType: "article",
  },
  "/resources/raising-humans-in-the-age-of-the-digital-god": {
    title: "Raising Humans in the Age of the Digital God",
    description:
      "Christian parenting in the age of AI — formation, algorithms, and who is discipling your children. By Nathaniel Baldock, AI consultant New Zealand.",
    image: `${SITE}/images/raising-humans-header.png`,
    ogType: "article",
  },
  "/resources/discipleship-and-missions-in-an-ai-age": {
    title: "Discipleship and Missions in an AI Age",
    description:
      "How AI reshapes missions, discipleship, and the work of the church — practical framing for leaders. By Nathaniel Baldock, AI consultant Tauranga, NZ.",
    image: DEFAULT_IMAGE,
    ogType: "article",
  },
  "/resources/outsourcing-the-holy-spirit-to-ai": {
    title: "Outsourcing the Holy Spirit to AI",
    description:
      "When AI tools replace prayer, struggle, and the slow work of the Spirit — a warning for church leaders. By Nathaniel Baldock.",
    image: DEFAULT_IMAGE,
    ogType: "article",
  },
};

export function lookupPublicPageMeta(urlPath: string): PublicPageMeta | null {
  const clean = urlPath.split("?")[0].replace(/\/+$/, "") || "/";
  return staticPages[clean] ?? articlePages[clean] ?? null;
}

/** Routes that receive Person (and optionally ProfessionalService) JSON-LD in initial HTML. */
export function getJsonLdForPath(urlPath: string): Record<string, unknown>[] {
  const clean = urlPath.split("?")[0].replace(/\/+$/, "") || "/";

  if (clean === "/") {
    return [
      buildProfessionalServiceSchema(),
      buildPersonSchema({ jobTitle: "AI Consultant", includeKnowsAbout: false, includeAlumniOf: false }),
    ];
  }

  if (clean === "/about" || clean === "/who-is-nathaniel-baldock") {
    const schemas: Record<string, unknown>[] = [
      buildPersonSchema({
        includeEmail: true,
        includeKnowsAbout: true,
        includeAlumniOf: true,
        includeWorksFor: true,
      }),
    ];
    if (clean === "/who-is-nathaniel-baldock") {
      schemas.push(buildIdentityFaqSchema());
    }
    return schemas;
  }

  const expertise = expertisePages.find((p) => p.path === clean);
  if (expertise && expertise.faqs.length > 0) {
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: expertise.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ];
  }

  return [];
}

export { SITE, DEFAULT_IMAGE };
