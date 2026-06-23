import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, MapPin, Phone, ShieldCheck, Ticket } from "lucide-react";
import { PageSEO } from "@/components/page-seo";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

const PORTRAIT = "/images/email/nathaniel-baldock-portrait.png";

const eventDetails = [
  { icon: CalendarDays, label: "When", value: "Thursday 16 July · 7:00 PM", note: "90 minutes" },
  { icon: MapPin, label: "Where", value: "Holy Trinity, Tauranga", note: "" },
  { icon: Ticket, label: "Entry", value: "$10", note: "" },
];

const eventTopics = [
  {
    label: "Your formation",
    value:
      "Discipleship in an age of AI, and how to stay human, present, and spiritually rooted when the algorithm never sleeps.",
  },
  {
    label: "Your work",
    value:
      "What AI means for jobs here in Tauranga, for business owners and employees alike, and how to stay valuable as the ground shifts beneath us.",
  },
  {
    label: "Your skills",
    value:
      "How to use these tools well and upskill with confidence, without falling for the hype or the traps.",
  },
];

const reviewInsights = [
  {
    label: "The tool",
    value:
      "Some AI tools quietly use whatever you type to train their models. Others keep it private, and most people can't tell which is which.",
  },
  {
    label: "Your plan",
    value:
      "Free and paid tiers often handle your data very differently, even within the same tool.",
  },
  {
    label: "Your data",
    value:
      "Names, counselling notes, finances and student details all carry real risk if they end up in the wrong place.",
  },
];

const reviewPoints = [
  {
    icon: ShieldCheck,
    label: "Review",
    value: "A free survey for your school, church, or ministry to see where you stand",
  },
  {
    icon: FileText,
    label: "Report",
    value: "Which tools are safe, which breach NZ privacy law, and simple steps to protect your data",
  },
  {
    icon: Phone,
    label: "Call",
    value: "A free 30-minute chat to walk through your results together, with deeper help if it would be useful",
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

export default function ThankYouPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Thank you for coming — AI session follow-up"
        description="Thank you for coming to the AI session. Here are a couple of follow-up opportunities: a public evening on AI, and a free AI privacy & data review for your church, school or business."
        canonicalPath="/thank-you"
        image="/images/email/thumb-social-revolution.png"
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

        <div className="nb-container max-w-[1080px] mx-auto text-center" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
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
            <p className="nb-body-lg mt-7 mb-0 text-[var(--nb-ink-soft)] max-w-[940px] mx-auto">
              It was a real privilege to think through where AI is taking us, and our Christian
              response, together. Our conversation focused mostly on the possible{" "}
              <span className="text-[var(--nb-ink)] font-medium">threats</span> we need to be aware
              of, and on the preparation and adjustments we can be making even now so we can best
              serve and lead in the midst of this growing AI impact.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="nb-body-lg mt-5 mb-0 text-[var(--nb-ink-soft)] max-w-[940px] mx-auto">
              There are also lots of genuinely interesting,{" "}
              <span className="text-[var(--nb-ink)] font-medium">positive</span> ways AI can shape
              our society, our churches and our ministries, and I'd love to follow those up with
              anyone who's interested.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={480}>
            <p className="nb-body-lg mt-5 mb-0 text-[var(--nb-ink-soft)] max-w-[940px] mx-auto">
              Here are some resources and follow-up opportunities to help you take the conversation
              further.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Two cards: event + audit ─────────────────────────── */}
      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(36px, 4.5vw, 56px)" }}
      >
        <div className="nb-container max-w-[1080px] mx-auto" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {/* Event card */}
            <motion.div
              variants={cardSlideUpItemVariants}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-8"
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
              <p className="text-sm text-[var(--nb-ink-soft)] mt-2 mb-5 leading-relaxed">
                A public follow-up to the Leadership Collective, open to everyone, church members and
                the wider community alike. A relaxed evening to think honestly about how AI is already
                shaping the way we live, work and follow Jesus, and how we respond with wisdom and
                hope. Bring a friend.
              </p>

              <div className="nb-mono-label mb-3" style={{ color: "var(--nb-ink-dim)", fontSize: 10 }}>
                What we'll walk through together
              </div>
              <div className="flex flex-col">
                {eventTopics.map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-t border-[var(--nb-rule)]/60 py-3 first:border-t-0 first:pt-0"
                  >
                    <div className="nb-mono-label mb-1" style={{ color: "var(--nb-accent)", fontSize: 10 }}>
                      {label}
                    </div>
                    <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed m-0">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-[var(--nb-rule)]/60 pt-5">
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

              <div className="mt-auto pt-6">
                <div
                  className="flex flex-col items-center justify-center rounded-xl border px-5 py-3 text-center"
                  style={{ borderColor: "color-mix(in srgb, var(--nb-accent) 55%, transparent)" }}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--nb-ink)]">
                    <CalendarDays className="h-4 w-4 text-[var(--nb-accent)]" />
                    Save the date
                  </span>
                  <span className="nb-mono-label mt-1" style={{ fontSize: 10, color: "var(--nb-ink-dim)" }}>
                    Full details to follow
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Audit card */}
            <motion.div
              variants={cardSlideUpItemVariants}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-8"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: "linear-gradient(90deg, var(--nb-green), var(--nb-accent))" }}
              />
              <div className="nb-mono-label flex items-center gap-2.5 mb-4" style={{ color: "var(--nb-accent)" }}>
                <AccentDot />
                <span>Free tool · Know your risk</span>
              </div>
              <h2 className="nb-card-title m-0">Free AI Privacy &amp; Data Review</h2>
              <p className="text-sm text-[var(--nb-ink-soft)] mt-2 mb-5 leading-relaxed">
                How safe your information is depends on which tool you use, what plan you're on, and
                what you type into it. That affects our churches and businesses, and it affects us
                personally too.
              </p>

              <div className="nb-mono-label mb-3" style={{ color: "var(--nb-ink-dim)", fontSize: 10 }}>
                What most people miss
              </div>
              <div className="flex flex-col">
                {reviewInsights.map(({ label, value }) => (
                  <div
                    key={label}
                    className="border-t border-[var(--nb-rule)]/60 py-3 first:border-t-0 first:pt-0"
                  >
                    <div className="nb-mono-label mb-1" style={{ color: "var(--nb-accent)", fontSize: 10 }}>
                      {label}
                    </div>
                    <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed m-0">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-[var(--nb-rule)]/60 pt-5">
                {reviewPoints.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--nb-rule)] bg-[var(--nb-bg-panel)]">
                      <Icon className="h-4 w-4 text-[var(--nb-accent)]" />
                    </span>
                    <div>
                      <div className="nb-mono-label text-[var(--nb-ink-dim)]" style={{ fontSize: 10 }}>
                        {label}
                      </div>
                      <div className="text-sm text-[var(--nb-ink)] leading-snug">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <a
                  href="https://www.nathanielbaldock.com/audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold no-underline transition-transform duration-200 hover:translate-y-[-2px]"
                  style={{ background: "var(--nb-accent)", color: "var(--nb-bg)" }}
                >
                  Take the free review
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Verse + sign-off ─────────────────────────────────── */}
      <section
        className="nb-inner-section"
        style={{ paddingTop: "clamp(36px, 4.5vw, 56px)", paddingBottom: "clamp(36px, 4.5vw, 56px)" }}
      >
        <div className="nb-container max-w-3xl mx-auto text-center" style={{ paddingLeft: "var(--nb-section-x)", paddingRight: "var(--nb-section-x)" }}>
          <ScrollReveal>
            <figure className="m-0 mx-auto max-w-2xl rounded-3xl border border-[var(--nb-rule)] bg-[var(--nb-bg-panel)] px-8 py-8 md:px-12 md:py-10">
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

          <ScrollReveal delay={120}>
            <div className="mx-auto mt-9 inline-block text-center">
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
