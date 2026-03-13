/**
 * Post-build script: generates per-route index.html files with correct OG tags.
 *
 * Vercel serves a static build so there is no server-side processing.  Social
 * crawlers (Facebook, LinkedIn, Twitter) fetch raw HTML without running JS,
 * meaning every page would show the homepage OG image and title.
 *
 * This script reads the built dist/public/index.html, replaces the default
 * meta tags for each known public route, and writes a route-specific
 * index.html (e.g. dist/public/resources/sabbath-rest-in-the-age-of-ai/index.html).
 * Vercel serves static files before applying rewrites, so these files take
 * priority over the SPA fallback.
 *
 * Run: npx tsx scripts/prerender-og.ts  (called automatically by build:client)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist", "public");
const SITE = "https://www.nathanielbaldock.com";
const DEFAULT_IMAGE = `${SITE}/Nathaniel_Portrait.png`;

interface PageMeta {
  title: string;
  description: string;
  image: string;
  ogType: "website" | "article";
}

const pages: Record<string, PageMeta> = {
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

  // Articles
  "/resources/raising-humans-in-the-age-of-the-digital-god": {
    title: "Raising Humans in the Age of the Digital God",
    description:
      "A Christian parent's guide to AI: how artificial intelligence is shaping childhood, what the Bible says about raising kids in a digital world, and practical steps to protect hearts while discipling the next generation. AI and faith perspectives for families.",
    image: `${SITE}/images/raising-humans-header.png`,
    ogType: "article",
  },
  "/resources/outsourcing-the-holy-spirit-to-ai": {
    title: "Outsourcing the Holy Spirit to AI",
    description:
      "Should churches use AI? How pastors and church leaders can embrace artificial intelligence for ministry efficiency without replacing the Holy Spirit. Explores AI ethics for churches, digital idolatry, deepfakes, and why human relationship is the new firewall.",
    image: `${SITE}/images/outsourcing-holy-spirit-header.png`,
    ogType: "article",
  },
  "/resources/discipleship-and-missions-in-an-ai-age": {
    title: "Discipleship and Missions in an AI Age",
    description:
      "How AI is transforming global missions and Christian discipleship. A strategic briefing for pastors, mission leaders, and Christian educators on the intelligence explosion, AI in ministry, and what it means for the Great Commission in 2026 and beyond.",
    image: `${SITE}/images/discipleship-missions-ai-header.png`,
    ogType: "article",
  },
  "/resources/when-your-teens-best-friend-is-an-algorithm": {
    title: "When Your Teen's Best Friend Is an Algorithm: What Parents and Youth Leaders Need to Know",
    description:
      "Teens and AI companions: what Christian parents and youth leaders need to know. How Character.AI and AI chatbots affect teen mental health, why kids prefer algorithms to adults, and practical ways to out-human the technology. AI safety for families.",
    image: `${SITE}/images/teens-algorithm-header.png`,
    ogType: "article",
  },
  "/resources/sabbath-rest-in-the-age-of-ai": {
    title: "Sabbath Rest in the Age of AI: Why Christians Must Learn to Stop",
    description:
      "Why Sabbath rest matters more than ever in the age of AI. Explores AI fatigue, digital burnout, the biblical theology of human limits, and why Christians must reclaim rest as resistance in an always-on world. A Christian perspective on technology and rest.",
    image: `${SITE}/images/sabbath-rest-header.png`,
    ogType: "article",
  },
  "/resources/why-your-soul-needs-the-struggle": {
    title: "Why Your Soul Needs the Struggle: The Spiritual Danger of an AI Life",
    description:
      "The spiritual danger of letting AI remove all friction from life. Why struggle, effort, and limitation are essential to Christian formation. A faith-based reflection on AI dependence, human identity, and what we lose when we optimise away the hard parts of being human.",
    image: `${SITE}/images/beach-coal-fire.jpg`,
    ogType: "article",
  },
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function injectMeta(html: string, routePath: string, meta: PageMeta): string {
  const canonicalUrl = `${SITE}${routePath}`;
  const t = esc(meta.title);
  const d = esc(meta.description);
  const img = esc(meta.image);
  const url = esc(canonicalUrl);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  out = out.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/,`$1${d}$2`);
  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,`$1${url}$2`);
  out = out.replace(/(<meta\s+property="og:type"\s+content=")[^"]*(")/,`$1${meta.ogType}$2`);
  out = out.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,`$1${url}$2`);
  out = out.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,`$1${t}$2`);
  out = out.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,`$1${d}$2`);
  out = out.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,`$1${img}$2`);
  out = out.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,`$1${t}$2`);
  out = out.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,`$1${d}$2`);
  out = out.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,`$1${img}$2`);

  return out;
}

// ── Main ───────────────────────────────────────────────────────────────
// Generate .html files (not directory/index.html) so Vercel's cleanUrls
// maps /foo → foo.html before the SPA rewrite catches it.

const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");
let count = 0;

for (const [route, meta] of Object.entries(pages)) {
  const parentDir = path.join(DIST, path.dirname(route));
  fs.mkdirSync(parentDir, { recursive: true });

  const outPath = path.join(DIST, `${route}.html`);
  fs.writeFileSync(outPath, injectMeta(indexHtml, route, meta), "utf-8");
  count++;
}

console.log(`✓ Pre-rendered OG meta for ${count} routes`);
