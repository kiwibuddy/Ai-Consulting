/**
 * Server-side Open Graph meta tag injection.
 *
 * Social-media crawlers (Facebook, LinkedIn, Twitter/X) fetch the raw HTML and
 * do NOT execute JavaScript.  Because this is an SPA, every route serves the
 * same index.html whose <meta> tags are the homepage defaults.  This module
 * replaces those defaults with the correct per-page values before the HTML is
 * sent, so link previews show the right title, description, and image.
 */

const SITE = "https://www.nathanielbaldock.com";
const DEFAULT_IMAGE = `${SITE}/Nathaniel_Portrait.png`;

interface PageMeta {
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
}

// ── Route → meta mapping ──────────────────────────────────────────────

const staticPages: Record<string, PageMeta> = {
  "/": {
    title: "AI Consultant Tauranga | AI Consulting for Churches, Schools & Nonprofits — New Zealand & Global",
    description:
      "Nathaniel Baldock helps churches, Christian schools, and mission organisations navigate AI with clarity. Strategy, training, and advisory rooted in faith. Based in Tauranga, NZ — serving globally.",
    image: DEFAULT_IMAGE,
    ogType: "website",
  },
  "/about": {
    title: "About Nathaniel Baldock — AI Consultant for Faith-Based Organisations",
    description:
      "20+ years in global missions with YWAM, now helping churches, schools, and nonprofits navigate AI. Based in Tauranga, New Zealand — consulting globally on AI strategy, ethics, and discipleship.",
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
};

const articlePages: Record<string, PageMeta> = {
  "/resources/when-your-teens-best-friend-is-an-algorithm": {
    title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
    description:
      "Teens and AI companions: what Christian parents and youth leaders need to know. How Character.AI and AI chatbots affect teen mental health, why kids prefer algorithms to adults, and practical ways to out-human the technology. AI safety for families.",
    image: `${SITE}/images/teens-algorithm-header.png`,
    ogType: "article",
  },
  "/resources/sabbath-rest-in-the-age-of-ai": {
    title: "Reclaiming the Sabbath in an Always-On World",
    description:
      "Why Sabbath rest matters more than ever in the age of AI. Explores AI fatigue, digital burnout, the biblical theology of human limits, and why Christians must reclaim rest as resistance in an always-on world. A Christian perspective on technology and rest.",
    image: `${SITE}/images/sabbath-rest-header.png`,
    ogType: "article",
  },
  "/resources/why-your-soul-needs-the-struggle": {
    title: "The Danger of Frictionless Faith: Why the Soul Needs the Struggle",
    description:
      "The spiritual danger of letting AI remove all friction from life. Why struggle, effort, and limitation are essential to Christian formation. A faith-based reflection on AI dependence, human identity, and what we lose when we optimise away the hard parts of being human.",
    image: `${SITE}/images/beach-coal-fire.jpg`,
    ogType: "article",
  },
};

function lookupMeta(urlPath: string): PageMeta | null {
  const clean = urlPath.split("?")[0].replace(/\/+$/, "") || "/";
  return staticPages[clean] ?? articlePages[clean] ?? null;
}

// ── HTML rewriting ─────────────────────────────────────────────────────

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/**
 * Replace the default OG / Twitter / title / description / canonical meta tags
 * in the given HTML string with the values for `urlPath`.  Returns the original
 * HTML unchanged if no mapping exists for the path.
 */
export function injectOgMeta(html: string, urlPath: string): string {
  const meta = lookupMeta(urlPath);
  if (!meta) return html;

  const canonicalUrl = `${SITE}${urlPath.split("?")[0].replace(/\/+$/, "") || "/"}`;
  const t = esc(meta.title);
  const d = esc(meta.description);
  const img = esc(meta.image);
  const url = esc(canonicalUrl);

  let out = html;

  // <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);

  // meta name="description"
  out = out.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${d}$2`,
  );

  // canonical
  out = out.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    `$1${url}$2`,
  );

  // OG
  out = out.replace(
    /(<meta\s+property="og:type"\s+content=")[^"]*(")/,
    `$1${meta.ogType}$2`,
  );
  out = out.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${url}$2`,
  );
  out = out.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    `$1${t}$2`,
  );
  out = out.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${d}$2`,
  );
  out = out.replace(
    /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
    `$1${img}$2`,
  );

  // Twitter
  out = out.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    `$1${t}$2`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    `$1${d}$2`,
  );
  out = out.replace(
    /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
    `$1${img}$2`,
  );

  return out;
}
