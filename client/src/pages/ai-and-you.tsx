import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  isResourceSetUnlocked,
  ResourceSetUnlockForm,
} from "@/components/resource-set-unlock-form";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
} from "@/lib/animations";
import { SCHOOL_SUITE_PATHWAY_COMPASS_TOOL } from "@/content/school-suite";
import { getResourceSetById } from "@shared/content/resource-sets";

const PORTRAIT = "/images/email/nathaniel-baldock-portrait.png";
const SAFESURFER_ICON = "/images/partners/safesurfer-icon.png";
const SAFESURFER_LOGO = "/images/partners/safesurfer-logo.png";

/** Slightly different on-brand fills so resource cards read as distinct tiles. */
const CARD_TONES = [
  "color-mix(in srgb, var(--nb-accent) 10%, var(--nb-bg-raised))",
  "color-mix(in srgb, var(--nb-green) 12%, var(--nb-bg-raised))",
  "color-mix(in srgb, #F4EFE2 8%, var(--nb-bg-raised))",
  "color-mix(in srgb, var(--nb-accent) 6%, #1a1d24)",
  "color-mix(in srgb, var(--nb-green) 8%, #14161b)",
] as const;

function cardTone(index: number) {
  return CARD_TONES[index % CARD_TONES.length];
}

interface Resource {
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

interface VideoResource extends Resource {
  thumb: string;
  thumbAlt: string;
}

const familySetDef = getResourceSetById("family")!;

const familySetExtras: Resource[] = [
  {
    tag: "Family set",
    title: "Family AI Agreement",
    description: "A simple household covenant for phones, companions, homework, and screens.",
    href: "/resources/worksheet/family-ai-agreement",
    cta: "Open worksheet",
  },
  {
    tag: "Family set",
    title: "Attachment Audit",
    description: "Where has a machine started to replace a person in your home?",
    href: "/resources/worksheet/family-attachment-audit",
    cta: "Open worksheet",
  },
  {
    tag: "Family set",
    title: "Rewiring Family Rhythms",
    description: "Four weeks of small formation habits that keep people ahead of the feed.",
    href: "/resources/worksheet/family-rewiring-rhythms",
    cta: "Open worksheet",
  },
];

const videos: VideoResource[] = [
  {
    tag: "NZ Herald · Under the Influence",
    title: "How AI companion chatbots can turn kids against parents",
    description:
      "Episode 3 of the NZ Herald series on AI companions and the pressure they put on family trust.",
    href: "https://www.nzherald.co.nz/nz/how-ai-companion-chatbots-can-turn-kids-against-parents-under-the-influence-episode-3/NT3T2EN2VNBN3I4HV7TVXP3EAQ/",
    cta: "Watch on NZ Herald",
    external: true,
    thumb: "/images/video-thumbs/nzherald-ai-companions.jpg",
    thumbAlt: "NZ Herald Under the Influence episode thumbnail",
  },
  {
    tag: "Oprah",
    title: "The Dark Side of AI Chatbots",
    description:
      "Warning signs, risks, and reality when conversational AI becomes a presence in a child’s life.",
    href: "https://www.youtube.com/watch?v=K6lVgNfp_ps",
    cta: "Watch on YouTube",
    external: true,
    thumb: "/images/video-thumbs/oprah-ai-chatbots.jpg",
    thumbAlt: "Oprah episode thumbnail on AI chatbots",
  },
  {
    tag: "Practicing the Way",
    title: "Spiritual formation and AI",
    description:
      "Andy Crouch and Jay Kim on formation, presence, and why AI cannot make us prayerful.",
    href: "https://www.youtube.com/watch?v=K2j8053yxbE",
    cta: "Watch on YouTube",
    external: true,
    thumb: "/images/video-thumbs/andy-crouch-formation-ai.jpg",
    thumbAlt: "Andy Crouch and Jay Kim conversation thumbnail",
  },
];

const familyWorksheets: Resource[] = [
  {
    tag: "Worksheet",
    title: "Safe Phrase Protocol",
    description:
      "AI voice cloning needs about three seconds of audio. A family code word defeats the scam in fifteen seconds.",
    href: "/resources/worksheet/presentations-ai-prep-safe-phrase-protocol",
    cta: "Get the worksheet",
  },
  {
    tag: "Family set · free preview",
    title: "Who Is Raising Our Kids?",
    description:
      "Name the voices shaping your children — including the ones that talk back at 2 a.m.",
    href: "/resources/worksheet/family-who-is-raising-our-kids",
    cta: "Open worksheet",
  },
];

const schoolWorksheets: Resource[] = [
  {
    tag: "School leavers",
    title: "Pathway Compass",
    description:
      "A free interactive tool for Years 12–13 and parents: weigh university, trades, work, and a purpose year against AI-era labour reality.",
    href: SCHOOL_SUITE_PATHWAY_COMPASS_TOOL,
    cta: "Open Pathway Compass",
  },
  {
    tag: "Education",
    title: "The VERIFY Method",
    description:
      "A six-step method for checking any AI claim before you use, share, or act on it.",
    href: "/resources/worksheet/edu-verify-method",
    cta: "Open worksheet",
  },
];

const workChurchWorksheets: Resource[] = [
  {
    tag: "Free · 10 minutes",
    title: "AI Use Audit",
    description:
      "Map the tools already in use across your business, church, or school. Get a clear next-step report in your inbox.",
    href: "/audit",
    cta: "Start the audit",
  },
  {
    tag: "Job-seekers",
    title: "Job transition toolkit",
    description:
      "Ghost Job Detector, ATS Survival, Human-in-the-Loop résumé kit, and Skills Bridge.",
    href: "/business/workers",
    cta: "Explore worker tools",
  },
  {
    tag: "Products hub",
    title: "All products & programmes",
    description:
      "Business Pack, schools programmes, audits, and consultation for churches, schools, and local businesses.",
    href: "/products",
    cta: "View products",
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

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <ScrollReveal>
      <div className="mb-6 md:mb-8">
        <p className="nb-mono-label m-0 mb-3 inline-flex items-center gap-3 text-[var(--nb-accent)]">
          <AccentDot />
          <span>{eyebrow}</span>
        </p>
        <h2 className="nb-display m-0 text-[clamp(1.85rem,3.4vw,2.55rem)] leading-[1.12]">
          {title}
        </h2>
        {intro ? (
          <p className="nb-body mt-3 mb-0 max-w-[42em] text-[var(--nb-ink-soft)]">{intro}</p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

function ResourceCard({ r, toneIndex = 0 }: { r: Resource; toneIndex?: number }) {
  const externalProps = r.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={r.href}
      className="nb-card block h-full no-underline transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: "color-mix(in srgb, var(--nb-accent) 18%, var(--nb-rule))",
        background: cardTone(toneIndex),
      }}
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

function VideoCard({ v, toneIndex = 0 }: { v: VideoResource; toneIndex?: number }) {
  return (
    <a
      href={v.href}
      target="_blank"
      rel="noopener noreferrer"
      className="nb-card group block h-full overflow-hidden no-underline transition-transform duration-200 hover:-translate-y-0.5 p-0"
      style={{
        borderColor: "color-mix(in srgb, var(--nb-accent) 18%, var(--nb-rule))",
        background: cardTone(toneIndex),
      }}
    >
      <div className="relative aspect-video overflow-hidden bg-[var(--nb-bg)]">
        <img
          src={v.thumb}
          alt={v.thumbAlt}
          width={640}
          height={360}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in srgb, #0F1014 72%, transparent)",
            border: "1px solid color-mix(in srgb, var(--nb-accent) 55%, transparent)",
            color: "var(--nb-accent)",
          }}
          aria-hidden
        >
          ▶
        </span>
      </div>
      <div className="p-5 md:p-6">
        <p className="nb-mono-label m-0 mb-2 text-[var(--nb-accent)]">{v.tag}</p>
        <h3 className="nb-card-title m-0 mb-2">{v.title}</h3>
        <p className="nb-body m-0 mb-4 text-[var(--nb-ink-soft)]">{v.description}</p>
        <span className="nb-mono-label text-[var(--nb-accent)]">{v.cta} ↗</span>
      </div>
    </a>
  );
}

function ResourceGrid({ items, toneOffset = 0 }: { items: Resource[]; toneOffset?: number }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewportReveal}
      variants={cardSlideUpContainerVariants}
    >
      {items.map((r, i) => (
        <motion.div key={r.href + r.title} variants={cardSlideUpItemVariants}>
          <ResourceCard r={r} toneIndex={toneOffset + i} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function FamilySetUnlockCard() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isResourceSetUnlocked(familySetDef.id));
  }, []);

  return (
    <ScrollReveal>
      <div
        className="nb-card mt-4"
        style={{
          borderColor: "color-mix(in srgb, var(--nb-accent) 28%, var(--nb-rule))",
          background: cardTone(2),
        }}
      >
        <p className="nb-mono-label m-0 mb-3 text-[var(--nb-accent)]">Full set · free with email</p>
        <h3 className="nb-card-title m-0 mb-2">Get the rest of the AI &amp; Family set</h3>
        <p className="nb-body m-0 mb-4 text-[var(--nb-ink-soft)] max-w-[42em]">
          Family AI Agreement, Attachment Audit, and Rewiring Family Rhythms unlock when you sign up
          for the full set.
        </p>

        {unlocked ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {familySetExtras.map((r, i) => (
              <a
                key={r.href}
                href={r.href}
                className="nb-card block no-underline transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderColor: "color-mix(in srgb, var(--nb-accent) 18%, var(--nb-rule))",
                  background: cardTone(i + 3),
                  padding: "1rem 1.1rem",
                }}
              >
                <p className="nb-mono-label m-0 mb-2 text-[var(--nb-accent)]">{r.tag}</p>
                <h4 className="nb-card-title m-0 mb-2 text-[clamp(1.05rem,1.6vw,1.25rem)]">
                  {r.title}
                </h4>
                <p className="nb-body m-0 mb-3 text-[0.9rem] text-[var(--nb-ink-soft)]">
                  {r.description}
                </p>
                <span className="nb-mono-label text-[var(--nb-accent)]">{r.cta} →</span>
              </a>
            ))}
          </div>
        ) : (
          <ResourceSetUnlockForm setDef={familySetDef} onUnlocked={() => setUnlocked(true)} />
        )}
      </div>
    </ScrollReveal>
  );
}

function WorksheetBlock({
  eyebrow,
  title,
  intro,
  items,
  toneOffset = 0,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: Resource[];
  toneOffset?: number;
  footer?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14 last:mb-0">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
      <ResourceGrid items={items} toneOffset={toneOffset} />
      {footer}
    </div>
  );
}

/**
 * Unlisted post-presentation resource hub.
 * Reachable by QR / direct URL only — noindex, not in nav, not in sitemap.
 * Primary URL: /free-resources (alias: /ai-and-you).
 */
export default function AiAndYouTakehomePage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Free resources & take-homes"
        description="Practical follow-up after a presentation: Safe Surfer, Safe Phrase, family and school worksheets, Pathway Compass, AI Use Audit, and recommended videos."
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
              <span>Free resources</span>
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
                Additional Resources
                <span className="text-[var(--nb-accent)]">.</span>
              </span>
            </ScrollReveal>
          </h1>

          <ScrollReveal delay={280}>
            <p className="nb-body-lg mt-7 mb-0 text-[var(--nb-ink-soft)] max-w-[640px] mx-auto">
              Start with a household safety net, then watch the recommended videos, then take the
              worksheets that match your home, school, workplace, or church.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Safe Surfer ── */}
      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(28px, 3.5vw, 40px)", paddingBottom: "clamp(8px, 1.5vw, 16px)" }}
      >
        <div
          className="nb-container max-w-[980px] mx-auto"
          style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
        >
          <SectionHeading
            eyebrow="Start here · household safety net"
            title="Safe Surfer"
            intro="A practical device filter for homes that want a basic floor under the conversation — not a substitute for discipleship."
          />
          <ScrollReveal>
            <a
              href="https://safesurfer.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="nb-card flex flex-col sm:flex-row items-center gap-6 md:gap-8 no-underline transition-transform duration-200 hover:-translate-y-0.5 p-6 md:p-8"
              style={{
                borderColor: "color-mix(in srgb, var(--nb-accent) 35%, var(--nb-rule))",
                background: cardTone(0),
              }}
            >
              <div className="flex flex-col items-center sm:items-start gap-4 sm:flex-1 text-center sm:text-left">
                <p className="nb-body m-0 text-[var(--nb-ink-soft)] max-w-[38em]">
                  Safe Surfer filters and blocks harmful content across phones, tablets, and home
                  networks. Use it as a basic safety net while you keep talking with your kids about
                  companions, scams, and what belongs to people — not machines.
                </p>
                <span className="nb-mono-label text-[var(--nb-accent)]">Visit safesurfer.io ↗</span>
              </div>
              <div className="flex flex-col items-center gap-3 shrink-0">
                <img
                  src={SAFESURFER_ICON}
                  alt="Safe Surfer app icon"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-[22px] object-cover"
                  style={{
                    boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  }}
                />
                <img
                  src={SAFESURFER_LOGO}
                  alt="Safe Surfer"
                  width={180}
                  height={45}
                  className="h-9 w-auto max-w-[180px] object-contain opacity-90"
                />
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Videos ── */}
      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(32px, 4vw, 52px)", paddingBottom: "clamp(12px, 2vw, 20px)" }}
      >
        <div
          className="nb-container max-w-[980px] mx-auto"
          style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
        >
          <SectionHeading
            eyebrow="Section 1 · Videos"
            title="Watch next"
            intro="Three pieces on companions, chatbot risk, and spiritual formation."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {videos.map((v, i) => (
              <motion.div key={v.href} variants={cardSlideUpItemVariants}>
                <VideoCard v={v} toneIndex={i + 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Worksheets ── */}
      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(12px, 2vw, 20px)" }}
      >
        <div
          className="nb-container max-w-[980px] mx-auto"
          style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}
        >
          <SectionHeading
            eyebrow="Section 2 · Worksheets & tools"
            title="Take one home"
            intro="Pick the lane that matches your life this week — family, school, or work and church."
          />

          <WorksheetBlock
            eyebrow="Families"
            title="Home, kids, and household defence"
            intro="Safe Phrase and Who Is Raising Our Kids are open here. Sign up for the full AI & Family set to unlock the rest."
            items={familyWorksheets}
            toneOffset={0}
            footer={<FamilySetUnlockCard />}
          />
          <WorksheetBlock
            eyebrow="School"
            title="Students, parents, and educators"
            intro="Pathway Compass for leavers, and VERIFY for checking AI claims before you act on them."
            items={schoolWorksheets}
            toneOffset={2}
          />
          <WorksheetBlock
            eyebrow="Work & church"
            title="Jobs, teams, and next steps"
            intro="The free AI Use Audit, the job transition toolkit, and all programmes and products."
            items={workChurchWorksheets}
            toneOffset={4}
          />
        </div>
      </section>

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
