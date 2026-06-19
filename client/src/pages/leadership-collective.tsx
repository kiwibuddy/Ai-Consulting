import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
  cinematicEase,
} from "@/lib/animations";

const PORTRAIT = "/images/email/nathaniel-baldock-portrait.png";

interface Resource {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

const resources: Resource[] = [
  {
    tag: "Presentation",
    title: "AI: An Unfolding Social Revolution",
    description:
      "The full presentation from the day, covering the shifts AI is driving across society and how we respond with discernment and hope.",
    image: "/images/email/thumb-social-revolution.png",
    href: "https://aia-social-revolutionandchristianre.vercel.app",
    cta: "Open the presentation",
  },
  {
    tag: "Presentation",
    title: "Leveraging AI for Kingdom Impact",
    description:
      "Practical, positive ways to use AI for evangelism, discipleship and church growth.",
    image: "/images/email/thumb-leveraging-ai.png",
    href: "https://www.nathanielbaldock.com/worksheets/presentations/leveraging-ai-for-kingdom-impact.html",
    cta: "Open the presentation",
  },
  {
    tag: "Free tool",
    title: "Free AI Privacy & Data Audit",
    description:
      "A short report for your church or business showing which tools are safe to use, and which breach New Zealand privacy law if you enter personal or business information, plus simple steps to protect it.",
    image: "/images/email/thumb-audit.png",
    href: "https://www.nathanielbaldock.com/audit",
    cta: "Take the free audit",
  },
  {
    tag: "Worksheet",
    title: "The Safe Phrase Protocol",
    description:
      "A simple family worksheet to guard against AI voice-cloning and impersonation scams.",
    image: "/images/email/thumb-safe-phrase.png",
    href: "https://www.nathanielbaldock.com/resources/worksheet/presentations-ai-prep-safe-phrase-protocol",
    cta: "Get the worksheet",
  },
];

const eventDetails = [
  { icon: CalendarDays, label: "When", value: "Thursday 16 July · 7:00 PM", note: "90 minutes" },
  { icon: MapPin, label: "Where", value: "Holy Trinity, Tauranga", note: "" },
  { icon: Ticket, label: "Entry", value: "$10 at the door", note: "" },
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

export default function LeadershipCollectivePage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Thank you for coming — AI session follow-up"
        description="Follow-up resources from Nathaniel Baldock's AI session: the full presentation, a free AI privacy & data audit, and practical tools for your team, family and church."
        canonicalPath="/ai-leadership-collective"
        image={PORTRAIT}
        noindex
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[128px] pb-2 md:pt-[156px] md:pb-4">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-[-60px] h-[460px] w-[860px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-[0.16]"
            style={{ background: "radial-gradient(circle, var(--nb-accent), transparent 70%)", filter: "blur(120px)" }}
          />
        </div>

        <div className="nb-container max-w-3xl mx-auto text-center" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <ScrollReveal>
            <div className="nb-mono-label inline-flex items-center gap-3 justify-center mb-9">
              <AccentDot />
              <span>AI Session · Follow-up</span>
              <span className="w-[18px] h-px bg-[var(--nb-rule)]" />
              <span>Tauranga · Aotearoa</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <img
              src={PORTRAIT}
              alt="Nathaniel Baldock"
              width={120}
              height={120}
              className="mx-auto mb-9 h-[120px] w-[120px] rounded-full object-cover"
              style={{
                border: "3px solid var(--nb-accent)",
                boxShadow: "0 18px 48px rgba(0,0,0,0.45), 0 0 0 6px color-mix(in srgb, var(--nb-accent) 12%, transparent)",
              }}
            />
          </ScrollReveal>

          <h1 className="nb-display nb-display-lg m-0">
            <ScrollReveal delay={160}>
              <span className="block">
                Thank you for{" "}
                <em
                  className="nb-italic-accent font-light"
                  style={{ fontStyle: "italic" }}
                >
                  coming
                </em>
                <span className="text-[var(--nb-accent)]">.</span>
              </span>
            </ScrollReveal>
          </h1>

          <ScrollReveal delay={320}>
            <p className="nb-body-lg mt-7 mb-0 text-[var(--nb-ink-soft)] max-w-[640px] mx-auto">
              It was a real privilege to think through where AI is taking us, and our Christian
              response, together. Here are the resources I promised to help you take the conversation further.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Message + event bento ────────────────────────────── */}
      <section className="nb-inner-section pt-0">
        <div className="nb-container max-w-[1180px] mx-auto" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {/* Message tile */}
            <motion.div
              variants={cardSlideUpItemVariants}
              className="lg:col-span-2 rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-8 md:p-10 shadow-sm"
            >
              <p className="nb-body text-[var(--nb-ink-soft)] m-0">
                Thank you so much for coming to the AI session this week. As I mentioned a few times, our
                conversation focused mostly on the possible{" "}
                <span className="text-[var(--nb-ink)] font-medium">threats</span> we need to be aware of,
                and on the preparation and adjustments we can be making even now so we can best serve and
                lead in the midst of this growing AI impact.
              </p>
              <p className="nb-body text-[var(--nb-ink-soft)] mt-5 mb-0">
                There are also lots of genuinely interesting,{" "}
                <span className="text-[var(--nb-ink)] font-medium">positive</span> ways AI can shape our
                society, our churches and our ministries, and I'd love to follow those up with anyone who's
                interested.
              </p>
              <p className="nb-body text-[var(--nb-ink-soft)] mt-5 mb-0">
                As promised, I wanted to share a few follow-up resources to help you take the conversation
                further. The full presentation, plus some practical tools you can use with your team, your
                family, or your church.
              </p>
            </motion.div>

            {/* Event tile */}
            <motion.div
              variants={cardSlideUpItemVariants}
              className="relative overflow-hidden rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-8"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: "linear-gradient(90deg, var(--nb-green), var(--nb-accent))" }}
              />
              <div className="nb-mono-label flex items-center gap-2.5 mb-4" style={{ color: "var(--nb-accent)" }}>
                <AccentDot />
                <span>Coming up · Save the date</span>
              </div>
              <h2 className="nb-card-title m-0">AI &amp; You: a public evening on AI</h2>
              <p className="text-sm text-[var(--nb-ink-soft)] mt-2 mb-6 leading-relaxed">
                A public follow-up to the Leadership Collective, open to the public and church members
                alike. Bring a friend.
              </p>
              <div className="flex flex-col gap-4">
                {eventDetails.map(({ icon: Icon, label, value, note }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--nb-rule)] bg-[var(--nb-bg-panel)]">
                      <Icon className="h-4 w-4 text-[var(--nb-accent)]" />
                    </span>
                    <div>
                      <div className="nb-mono-label text-[var(--nb-ink-dim)]" style={{ fontSize: 10 }}>
                        {label}
                      </div>
                      <div className="text-sm text-[var(--nb-ink)] leading-snug">
                        {value}
                        {note && <span className="text-[var(--nb-ink-dim)]"> · {note}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Resources (single full-width row) ────────────────── */}
      <section className="nb-inner-section bg-[var(--nb-bg-raised)] border-y border-[var(--nb-rule)]/70">
        <div className="nb-container max-w-[1340px] mx-auto" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <SectionLabel num="01">Follow-up resources</SectionLabel>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {resources.map((r) => (
              <motion.a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: cinematicEase } }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg)] no-underline shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className="nb-mono-label mb-2 inline-flex items-center gap-2"
                    style={{ color: "var(--nb-accent)", fontSize: 10 }}
                  >
                    <AccentDot />
                    {r.tag}
                  </span>
                  <h3 className="nb-card-title text-[18px] leading-snug m-0">{r.title}</h3>
                  <p className="mt-2 mb-0 flex-1 text-[13.5px] leading-relaxed text-[var(--nb-ink-soft)]">
                    {r.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--nb-accent)]">
                    {r.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Closing + verse + sign-off ───────────────────────── */}
      <section className="nb-inner-section">
        <div className="nb-container max-w-3xl mx-auto text-center" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <ScrollReveal>
            <p className="nb-body-lg text-[var(--nb-ink-soft)] m-0">
              Blessings, and I hope all of these resources are useful.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <figure className="my-10 mx-auto max-w-2xl rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-panel)] px-8 py-10 md:px-12 md:py-12">
              <blockquote
                className="nb-display m-0 font-light text-[var(--nb-ink)]"
                style={{ fontStyle: "italic", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.5 }}
              >
                &ldquo;My sheep listen to my voice; I know them, and they follow me.&rdquo;
              </blockquote>
              <figcaption className="nb-mono-label mt-5" style={{ color: "var(--nb-accent)" }}>
                John 10:27
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="inline-flex items-center gap-4 text-left">
              <img
                src={PORTRAIT}
                alt="Nathaniel Baldock"
                width={60}
                height={60}
                className="h-[60px] w-[60px] rounded-full object-cover"
                style={{ border: "2px solid var(--nb-rule-strong)" }}
              />
              <div>
                <p className="text-sm text-[var(--nb-ink-soft)] m-0">Ngā mihi,</p>
                <p className="nb-card-title text-[17px] m-0">Nathaniel Baldock</p>
                <p className="text-[13px] m-0 mt-0.5">
                  <a href="tel:+64204796683" className="text-[var(--nb-ink-soft)] no-underline hover:text-[var(--nb-ink)]">
                    020 479 6683
                  </a>
                  <span className="text-[var(--nb-ink-dim)]"> · </span>
                  <a
                    href="https://www.nathanielbaldock.com"
                    className="font-semibold text-[var(--nb-accent)] no-underline hover:underline"
                  >
                    www.nathanielbaldock.com
                  </a>
                </p>
                <p className="text-[12px] text-[var(--nb-ink-dim)] m-0 mt-0.5">
                  AI Consulting · Tauranga, Aotearoa
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
