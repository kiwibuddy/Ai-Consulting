import { motion } from "framer-motion";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
} from "@/lib/animations";
import { SCHOOL_SUITE_PATHWAY_COMPASS_TOOL } from "@/content/school-suite";

const PORTRAIT = "/images/email/nathaniel-baldock-portrait.png";

interface Resource {
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

const freeTools: Resource[] = [
  {
    tag: "Free · 10 minutes",
    title: "AI Use Audit",
    description:
      "Map the tools already in use across your business, church, or school. Get a clear next-step report in your inbox.",
    href: "/audit",
    cta: "Start the audit",
  },
  {
    tag: "Worksheet",
    title: "Safe Phrase Protocol",
    description:
      "AI voice cloning needs about three seconds of audio. A family code word defeats the scam in fifteen seconds.",
    href: "/resources/worksheet/presentations-ai-prep-safe-phrase-protocol",
    cta: "Get the worksheet",
  },
  {
    tag: "Family set",
    title: "AI & Family worksheets",
    description:
      "Who is shaping your kids, a Family AI Agreement, an Attachment Audit, and four weeks of formation habits.",
    href: "/resources/worksheet/family-who-is-raising-our-kids",
    cta: "Start the family set",
  },
  {
    tag: "School leavers",
    title: "Pathway Compass",
    description:
      "A free interactive tool for Years 12–13 and parents: weigh university, trades, work, and a purpose year against AI-era labour reality.",
    href: SCHOOL_SUITE_PATHWAY_COMPASS_TOOL,
    cta: "Open Pathway Compass",
  },
  {
    tag: "Job-seekers",
    title: "Job transition toolkit",
    description:
      "Ghost Job Detector, ATS Survival, Human-in-the-Loop résumé kit, and Skills Bridge — free tools for both sides of the hiring desk.",
    href: "/business/workers",
    cta: "Explore worker tools",
  },
  {
    tag: "Products hub",
    title: "All products & programmes",
    description:
      "Business Pack, schools programmes, audits, and consultation. Fixed-price options for churches, schools, and local businesses.",
    href: "/products",
    cta: "View products",
  },
];

const safetyNet: Resource[] = [
  {
    tag: "Device filter · recommended",
    title: "Safe Surfer",
    description:
      "A basic household safety net: filter and block harmful content across devices. Not a substitute for conversation — a floor under the house while you disciple.",
    href: "https://safesurfer.io/",
    cta: "Visit Safe Surfer",
    external: true,
  },
];

const watchNext: Resource[] = [
  {
    tag: "NZ Herald · Under the Influence",
    title: "How AI companion chatbots can turn kids against parents",
    description:
      "Episode 3 of the NZ Herald series on AI companions and the pressure they put on family trust.",
    href: "https://www.nzherald.co.nz/nz/how-ai-companion-chatbots-can-turn-kids-against-parents-under-the-influence-episode-3/NT3T2EN2VNBN3I4HV7TVXP3EAQ/",
    cta: "Watch on NZ Herald",
    external: true,
  },
  {
    tag: "Oprah",
    title: "The Dark Side of AI Chatbots",
    description:
      "Warning signs, risks, and reality when conversational AI becomes a presence in a child’s life.",
    href: "https://www.youtube.com/watch?v=K6lVgNfp_ps",
    cta: "Watch on YouTube",
    external: true,
  },
  {
    tag: "Practicing the Way",
    title: "Spiritual formation and AI",
    description:
      "Andy Crouch and Jay Kim on formation, presence, and why AI cannot make us prayerful.",
    href: "https://www.youtube.com/watch?v=K2j8053yxbE",
    cta: "Watch on YouTube",
    external: true,
  },
];

const formation: Resource[] = [
  {
    tag: "Article",
    title: "The Calm Middle",
    description:
      "How worried should you actually be about AI, and what cheap actions help either way.",
    href: "/resources/how-worried-should-you-be-about-ai",
    cta: "Read the article",
  },
  {
    tag: "Article",
    title: "When Your Teen's Best Friend Is an Algorithm",
    description:
      "What shifts when the 2 a.m. conversation moves to a chatbot, and what parents and youth leaders can do.",
    href: "/resources/when-your-teens-best-friend-is-an-algorithm",
    cta: "Read the article",
  },
  {
    tag: "Article",
    title: "The Voice on the Phone Is Not Your Son",
    description:
      "The voice-clone scam, the defence, and why every household needs a safe phrase this week.",
    href: "/resources/the-voice-on-the-phone-is-not-your-son",
    cta: "Read the article",
  },
  {
    tag: "Resources hub",
    title: "All articles & worksheets",
    description:
      "The full library of AI and faith writing, worksheets, and tools on nathanielbaldock.com.",
    href: "/resources",
    cta: "Browse the hub",
  },
];

const work: Resource[] = [
  {
    tag: "Professionals",
    title: "Working professionals worksheets",
    description:
      "Automation vs augmentation, the 52-minute opportunity, your human value proposition, and a five-year map.",
    href: "/resources/worksheet/wp-christian-automation-augmentation",
    cta: "Open the career set",
  },
  {
    tag: "Tauranga SMEs",
    title: "Bay of Plenty business prep",
    description:
      "Readiness, time audit, team conversation, and privacy basics — the free layer of the AI-Ready Business Pack.",
    href: "/resources/worksheet/tauranga-sme-readiness",
    cta: "Open the business set",
  },
];

function AccentDot() {
  return (
    <span
      className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
      style={{
        background: "var(--nb-accent)",
        boxShadow: "0 0 0 4px color-mix(in srgb, var(--nb-accent) 22%, transparent)",
      }}
    />
  );
}

function ResourceCard({ r }: { r: Resource }) {
  const externalProps = r.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={r.href}
      className="nb-card block no-underline transition-transform duration-200 hover:-translate-y-0.5"
      style={{ borderColor: "var(--nb-rule)" }}
      {...externalProps}
    >
      <p className="nb-mono-label m-0 mb-3 text-[var(--nb-accent)]">{r.tag}</p>
      <h3 className="nb-card-title m-0 mb-2">{r.title}</h3>
      <p className="nb-body m-0 mb-4 text-[var(--nb-ink-soft)]">{r.description}</p>
      <span className="nb-mono-label text-[var(--nb-accent)]">
        {r.cta}
        {r.external ? " ↗" : " →"}
      </span>
    </a>
  );
}

function Section({
  label,
  items,
}: {
  label: string;
  items: Resource[];
}) {
  return (
    <section
      className="nb-inner-section"
      style={{ paddingTop: "clamp(28px, 3.5vw, 40px)", paddingBottom: "clamp(12px, 2vw, 20px)" }}
    >
      <div
        className="nb-container max-w-[980px] mx-auto"
        style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
      >
        <ScrollReveal>
          <p className="nb-mono-label m-0 mb-5 text-[var(--nb-ink-dim)]">{label}</p>
        </ScrollReveal>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={cardSlideUpContainerVariants}
        >
          {items.map((r) => (
            <motion.div key={r.href + r.title} variants={cardSlideUpItemVariants}>
              <ResourceCard r={r} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Unlisted take-home hub for the AI & You public evening (Holy Trinity, 16 July 2026).
 * Reachable by QR / direct URL only — noindex, not in nav, not in sitemap.
 * Primary URL: /free-resources (alias: /ai-and-you).
 */
export default function AiAndYouTakehomePage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="AI & You — Free resources & take-homes"
        description="Practical follow-up from AI & You in Tauranga: Safe Phrase, family worksheets, Pathway Compass, Calm Middle, AI Use Audit, Safe Surfer, and recommended videos."
        canonicalPath="/free-resources"
        image={PORTRAIT}
        noindex
      />

      <section className="relative overflow-hidden pt-[128px] pb-2 md:pt-[156px] md:pb-4">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-[-60px] h-[460px] w-[860px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-[0.16]"
            style={{
              background: "radial-gradient(circle, var(--nb-accent), transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div
          className="nb-container max-w-3xl mx-auto text-center"
          style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
        >
          <ScrollReveal>
            <div className="nb-mono-label inline-flex items-center gap-3 justify-center mb-9">
              <AccentDot />
              <span>AI &amp; You · Free resources</span>
              <span className="w-[18px] h-px bg-[var(--nb-rule)]" />
              <span>Tauranga · 16 July 2026</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <img
              src={PORTRAIT}
              alt="Nathaniel Baldock"
              width={96}
              height={96}
              className="mx-auto mb-8 h-[96px] w-[96px] rounded-full object-cover"
              style={{
                border: "3px solid var(--nb-accent)",
                boxShadow:
                  "0 18px 48px rgba(0,0,0,0.45), 0 0 0 6px color-mix(in srgb, var(--nb-accent) 12%, transparent)",
              }}
            />
          </ScrollReveal>

          <h1 className="nb-display nb-display-lg m-0">
            <ScrollReveal delay={160}>
              <span className="block">
                Tonight&rsquo;s take-homes
                <span className="text-[var(--nb-accent)]">.</span>
              </span>
            </ScrollReveal>
          </h1>

          <ScrollReveal delay={280}>
            <p className="nb-body-lg mt-7 mb-0 text-[var(--nb-ink-soft)] max-w-[640px] mx-auto">
              Everything named in the evening, in one place — free tools, family safety, recommended
              videos, and the next step when you want help applying it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Section label="Start here · free tools" items={freeTools} />
      <Section label="Household safety net" items={safetyNet} />
      <Section label="Watch next · videos named tonight" items={watchNext} />
      <Section label="Formation · stay human" items={formation} />
      <Section label="Work · stay valuable" items={work} />

      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(28px, 3.5vw, 48px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <div
          className="nb-container max-w-[980px] mx-auto"
          style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
        >
          <ScrollReveal>
            <div
              className="rounded-[18px] p-7 md:p-9"
              style={{
                border: "1px solid color-mix(in srgb, var(--nb-accent) 35%, var(--nb-rule))",
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--nb-accent) 12%, transparent), color-mix(in srgb, var(--nb-accent) 4%, transparent))",
              }}
            >
              <p className="nb-mono-label m-0 mb-3 text-[var(--nb-accent)]">Next step</p>
              <h2 className="nb-display text-[clamp(1.6rem,3vw,2.2rem)] m-0 mb-3">
                Want help applying this?
              </h2>
              <p className="nb-body m-0 mb-6 text-[var(--nb-ink-soft)] max-w-[36em]">
                Book a free 30-minute consultation. Bring the audit results, a family question, or a
                team decision you are stuck on.
              </p>
              <a
                href="/intake"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 no-underline font-semibold text-[0.95rem]"
                style={{
                  background: "linear-gradient(135deg, #11C25C, #7CCC1E)",
                  color: "#0F1014",
                }}
              >
                Book a free 30-min call →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
