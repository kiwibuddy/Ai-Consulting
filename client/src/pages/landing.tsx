import { useLayoutEffect } from "react";
import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { HomepageJsonLd } from "@/components/json-ld";
import { latestFromNathaniel } from "@/content/latest";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import { WhoThisIsForCarousel } from "@/components/public-cinematic/who-this-is-for-carousel";
import { LiveAIPanel } from "@/components/public-cinematic/live-ai-panel";
import { CinematicPrimaryCTA, CinematicSecondaryCTA } from "@/components/public-cinematic/cinematic-cta";
import { SITE_CONTACT_EMAIL, MAILTO_SUBJECT_INQUIRY } from "@shared/constants";
import { articles } from "@/content/articles";
import { worksheets } from "@/content/worksheets";

/** Matches public items on /resources: articles + listed worksheets (excludes internal-only worksheets). */
const publicResourceCount =
  articles.length + worksheets.filter((w) => w.showInResources !== false).length;

const ctaLabel = "Book a free 30-min consultation";

const howIHelp = [
  {
    n: "01",
    title: "Clarity & guardrails",
    body: "Typical engagements include AI strategy grounded in your mission and values, policies and guardrails for staff and leaders, and clear discernment around what not to use.",
  },
  {
    n: "02",
    title: "Practical systems",
    body: "Where it fits your context: tools that work with your own documents, workflow improvements that save real time, and systems designed for your organisation — not Silicon Valley defaults.",
  },
  {
    n: "03",
    title: "Training & adoption",
    body: "Leadership briefings and staff training, family- and student-safe guidance where relevant, and practical examples your team can actually use.",
  },
];

const whoThisIsFor = [
  {
    tag: "Faith & Mission Organisations",
    title: "For churches exploring AI wisely",
    body: "Explore how AI might support discipleship and engagement — and understand the real dangers to guard against before adoption spreads by accident.",
    body2: "Keynotes, seminars, or courses for leaders and parents on what AI means for the church, families, and faith — tailored to your size and maturity.",
    image: "/Teaching-2.png",
    alt: "Teaching and ministry context",
  },
  {
    tag: "Schools & Training",
    title: "For schools preparing students for what's next",
    body: "Clarity on what teachers should use AI for, how to manage student use wisely, and where it might free up real time in the classroom.",
    body2: "Training days or assemblies for staff, parents, and students — practical framing that replaces fear with confidence.",
    image: "/School_Profile.png",
    alt: "School and training context",
  },
  {
    tag: "Nonprofits & NGOs",
    title: "For mission-driven teams",
    body: "Explore where AI might streamline operations, strengthen engagement, and support the mission you already care about — without adding unnecessary complexity.",
    body2: "Workshops or briefings that help your whole team move from buzzword to practical next steps.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    alt: "Team collaboration",
  },
];

const whyBullets = [
  "23 years in global missions, NGO work, biblical education, and cross-cultural program development",
  "Experience building and shipping real digital products — mobile apps, web platforms, SaaS",
  "Strong theological, ethical, and safeguarding foundations",
  "I don't sell or reuse your data; I explain clearly where and how AI is used.",
  "AI should serve people and mission — not replace wisdom, responsibility, or relationship.",
];

const whyStats: ReadonlyArray<readonly [string, string]> = [
  ["23", "Years with international missions, churches & NGOs"],
  ["15+", "Nations — ministry & speaking"],
  ["400+", "Leaders trained over 9-month YWAM courses"],
  [String(publicResourceCount), "Free articles, worksheets & tools"],
];

const whyStatsResearchNote = {
  title: "7 Spheres Bible research",
  body: "Co-led 200+ researchers across 50 nations; ~40k hours of crowdsourced biblical research; new methods & tools for distributed scholarship.",
};

function formatLatestTag(item: (typeof latestFromNathaniel)[number]) {
  if (item.readTime) return `AI & Faith · ${item.readTime}`;
  if (item.duration) return `Video · ${item.duration}`;
  return "Resource";
}

export default function LandingPage() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", "public");
  }, []);

  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Practical AI for leaders with discernment | Nathaniel Baldock"
        description="AI consulting for churches, schools, and mission-driven organisations. Wisdom over hype. People over margins. Based in Tauranga, NZ — serving globally."
        canonicalPath="/"
      />
      <HomepageJsonLd />

      {/* Hero — copy + portrait only; stable crop via nb-hero-photo */}
      <section id="top" className="nb-hero relative overflow-hidden pt-[76px]">
        <div className="absolute inset-0 z-0 overflow-hidden nb-hero-zoom">
          <picture>
            <source media="(max-width: 768px)" srcSet="/hero-portrait.jpg" />
            <img
              src="/hero-portrait-wide.jpg"
              alt=""
              className="nb-hero-photo w-full h-full object-cover"
            />
          </picture>
        </div>
        <div className="nb-hero-gradient-side absolute inset-0 z-[1]" aria-hidden />
        <div className="nb-hero-gradient-bottom absolute inset-0 z-[1]" aria-hidden />

        <div className="nb-hero-inner relative z-[5] max-w-[1440px] mx-auto flex items-center px-[var(--nb-section-x)]">
          <div className="nb-hero-copy w-full max-w-[820px] py-[clamp(56px,8vw,88px)]">
            <ScrollReveal>
              <div className="nb-hero-eyebrow flex flex-wrap items-center gap-3.5 mb-10 nb-mono-label">
                <span
                  className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
                  style={{
                    background: "var(--nb-accent)",
                    boxShadow: "0 0 0 4px color-mix(in srgb, var(--nb-accent) 22%, transparent)",
                  }}
                />
                <span>AI Consulting</span>
                <span className="w-[18px] h-px bg-[var(--nb-rule)]" />
                <span>Tauranga · Aotearoa · Global</span>
              </div>
            </ScrollReveal>

            <h1 className="nb-display nb-display-hero m-0 pb-[0.08em]">
              <ScrollReveal delay={50}>
                <span className="block">Practical AI for</span>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <span className="block">
                  people who lead with{" "}
                  <em
                    className="nb-italic-accent not-italic font-light underline decoration-[color-mix(in_srgb,var(--nb-accent)_45%,transparent)] decoration-[0.07em] underline-offset-[0.05em]"
                    style={{ fontStyle: "italic" }}
                  >
                    discernment
                  </em>
                  <span className="text-[var(--nb-accent)]">.</span>
                </span>
              </ScrollReveal>
            </h1>

            <ScrollReveal delay={420}>
              <p className="nb-body-lg mt-10 mb-0 max-w-[620px]">
                I can help churches, schools, and mission-driven organisations adopt AI wisely —
                without hype, without fear, and without losing what matters most.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={580}>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <CinematicPrimaryCTA href="/intake">{ctaLabel}</CinematicPrimaryCTA>
                <CinematicSecondaryCTA href="#live">A typical question →</CinematicSecondaryCTA>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Live conversation — full width below hero */}
      <section id="live" className="nb-live-section scroll-mt-24" aria-label="Typical conversation">
        <div className="nb-container max-w-[1440px] px-0">
          <LiveAIPanel variant="dock" hideLabel />
        </div>
      </section>

      {/* §01 Approach */}
      <section id="approach" className="nb-section scroll-mt-24">
        <div className="nb-container px-0 max-w-[1240px]">
          <SectionLabel num="01">The real challenge leaders are facing</SectionLabel>
          <ScrollReveal>
            <blockquote className="nb-display nb-display-quote m-0 max-w-[1100px] font-normal">
              The risk isn&apos;t AI{" "}
              <em className="italic font-light text-[var(--nb-ink-soft)]">adoption</em>.
              <br />
              The risk is{" "}
              <em className="nb-italic-accent italic font-light">accidental</em> adoption, without
              discernment.
            </blockquote>
          </ScrollReveal>
          <div
            className="nb-approach-cols grid mt-8 md:mt-10"
            style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(28px, 4vw, 48px)" }}
          >
            <ScrollReveal delay={120}>
              <p className="nb-body m-0">
                AI is already inside your organisation. Right now. Interns drafting emails,
                teachers grading essays, volunteers writing the newsletter — usually without
                policy, shared understanding, or a coherent view of where it should and
                shouldn&apos;t show up.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="nb-body m-0">
                I don&apos;t sell a stack. I work with leaders to take stock of what&apos;s already
                happening, decide what&apos;s worth keeping, and design what comes next — with
                safeguarding, theological integrity, and your specific constraints built in from
                the start.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* AI Use Audit — free diagnostic lead magnet (unnumbered, sits between §01 and §02) */}
      <section
        id="audit"
        aria-labelledby="audit-cta-heading"
        className="nb-section scroll-mt-24"
      >
        <div className="nb-container px-0 max-w-[1240px]">
          <ScrollReveal>
            <div
              className="nb-audit-cta relative overflow-hidden"
              style={{
                borderRadius: 14,
                border: "1px solid var(--nb-rule-strong)",
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--nb-accent) 7%, var(--nb-bg)) 0%, var(--nb-bg) 55%)",
                padding: "clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px)",
              }}
            >
              {/* soft accent glow */}
              <div
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  top: "-40%",
                  right: "-10%",
                  width: "55%",
                  aspectRatio: "1 / 1",
                  background:
                    "radial-gradient(ellipse at center, color-mix(in srgb, var(--nb-accent) 22%, transparent), transparent 60%)",
                  filter: "blur(70px)",
                }}
              />

              <div
                className="nb-audit-grid relative grid items-center"
                style={{
                  gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
                  gap: "clamp(28px, 4vw, 56px)",
                }}
              >
                <div>
                  <div className="nb-mono-label text-[var(--nb-accent)] mb-4">
                    — Free diagnostic · 10 minutes · No sales call
                  </div>
                  <h2
                    id="audit-cta-heading"
                    className="nb-display font-normal m-0 mb-5"
                    style={{
                      fontSize: "clamp(30px, 4vw, 48px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Get{" "}
                    <em className="nb-italic-accent italic font-light">clarity</em> on every AI
                    tool already in your business.
                  </h2>
                  <p
                    className="m-0 mb-6 text-[var(--nb-ink-soft)]"
                    style={{ fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.6, maxWidth: 560 }}
                  >
                    A 10-minute walk-through that maps what your team is actually using, flags what's
                    risky, and tells you exactly what to change today — in plain English, with no
                    jargon and no fear-mongering.
                  </p>

                  <ul className="list-none p-0 m-0 mb-7 flex flex-col gap-2.5">
                    {[
                      "10 minutes, on your phone or laptop",
                      "Optional anonymous survey for your team",
                      "Personalised PDF results emailed to you and us",
                      "Built for owners, pastors, principals & boards",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[14.5px] leading-snug text-[var(--nb-ink-soft)]"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] shrink-0 inline-block"
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: "var(--nb-accent)",
                          }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="/audit"
                      className="nb-btn-primary"
                      data-event="homepage-audit-cta"
                    >
                      Start the free AI audit →
                    </a>
                    <span
                      className="nb-mono-label text-[var(--nb-ink-dim)]"
                      style={{ fontSize: 11 }}
                    >
                      No credit card · No spam · Skip the team step if you prefer
                    </span>
                  </div>
                </div>

                {/* Right-hand decorative panel — mock result chip stack */}
                <div className="nb-audit-mock hidden md:block">
                  <div
                    className="relative"
                    style={{
                      border: "1px solid var(--nb-rule)",
                      borderRadius: 12,
                      background: "var(--nb-bg)",
                      padding: 20,
                      boxShadow:
                        "0 1px 0 color-mix(in srgb, var(--nb-accent) 14%, transparent), 0 20px 40px -24px rgba(0,0,0,0.25)",
                    }}
                  >
                    <div
                      className="nb-mono-label mb-3"
                      style={{ fontSize: 10, color: "var(--nb-ink-dim)" }}
                    >
                      SAMPLE RESULT · ACME LTD
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { tool: "ChatGPT Plus", verdict: "Amber · 1 setting to change", tone: "amber" },
                        { tool: "Microsoft 365 Copilot", verdict: "Green · safe as-is", tone: "green" },
                        { tool: "Otter.ai (free)", verdict: "Red · move to enterprise tier", tone: "red" },
                        { tool: "Canva AI (free)", verdict: "Amber · opt out of training", tone: "amber" },
                      ].map((row) => {
                        const dot =
                          row.tone === "green"
                            ? "var(--nb-accent)"
                            : row.tone === "amber"
                              ? "#e3a93b"
                              : "#d9534f";
                        return (
                          <div
                            key={row.tool}
                            className="flex items-center justify-between gap-3"
                            style={{
                              borderBottom: "1px solid var(--nb-rule)",
                              padding: "6px 0",
                            }}
                          >
                            <span className="text-[13px] font-medium text-[var(--nb-ink)]">
                              {row.tool}
                            </span>
                            <span
                              className="flex items-center gap-2 text-[12px] text-[var(--nb-ink-soft)]"
                            >
                              <span
                                aria-hidden
                                style={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: 999,
                                  background: dot,
                                }}
                              />
                              {row.verdict}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="mt-4 pt-3 text-[11.5px] italic"
                      style={{
                        borderTop: "1px dashed var(--nb-rule)",
                        color: "var(--nb-ink-dim)",
                      }}
                    >
                      Plus a plain-English explanation and direct policy links for every tool.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* §02 What I offer */}
      <section id="how-i-help" className="nb-section scroll-mt-24">
        <div className="nb-container px-0">
          <SectionLabel num="02">What I offer</SectionLabel>
          <ScrollReveal>
            <h2 className="nb-display nb-display-lg font-normal m-0 nb-h2-section max-w-[920px]">
              From confusion to clarity. From experiment to{" "}
              <em className="nb-italic-accent italic font-normal">responsible practice</em>.
            </h2>
          </ScrollReveal>
          <div className="nb-rule-grid">
            {howIHelp.map((c, i) => (
              <ScrollReveal key={c.n} delay={i * 100}>
                <div className="nb-rule-grid-cell h-full">
                  <div className="nb-mono-label text-[var(--nb-accent)] mb-5">{c.n}</div>
                  <h3 className="nb-display text-[clamp(22px,2.2vw,30px)] font-normal tracking-tight m-0 mb-4 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed text-[var(--nb-ink-soft)] m-0">{c.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={300}>
            <p className="font-[family-name:var(--nb-font-display)] italic font-light text-[clamp(18px,1.6vw,22px)] leading-snug text-[var(--nb-ink-soft)] mt-10 max-w-[780px] m-0">
              — Everything is designed to respect the authority of Scripture, preserve human
              discernment, and protect trust.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* §03 Who */}
      <section id="who" className="nb-section nb-section--raised scroll-mt-24">
        <div className="nb-container px-0">
          <SectionLabel num="03">Who this is for</SectionLabel>
          <ScrollReveal>
            <h2 className="nb-display nb-display-lg font-normal m-0 nb-h2-section max-w-[920px]">
              Three audiences.{" "}
              <em className="nb-italic-accent italic font-normal">One belief</em>: AI should serve
              your people, not replace them.
            </h2>
          </ScrollReveal>
          <WhoThisIsForCarousel audiences={whoThisIsFor} />
        </div>
      </section>

      {/* §04 Why me */}
      <section id="why" className="nb-section nb-section--raised scroll-mt-24">
        <div className="nb-container px-0">
          <SectionLabel num="04">Why work with me</SectionLabel>
          <div
            className="nb-why-grid grid items-start gap-12"
            style={{ gridTemplateColumns: "1.1fr 1fr" }}
          >
            <div>
              <ScrollReveal>
                <h2 className="nb-display nb-display-lg font-normal m-0 mb-6">
                  Deep <em className="nb-italic-accent italic font-normal">faith context</em>. Real{" "}
                  <em className="nb-italic-accent italic font-normal">technology experience</em>.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <ul className="list-none p-0 m-0 flex flex-col gap-4">
                  {whyBullets.map((b, idx) => (
                    <li key={idx} className="flex gap-4 items-baseline text-base leading-relaxed text-[var(--nb-ink-soft)]">
                      <span className="font-[family-name:var(--nb-font-mono)] text-[11px] text-[var(--nb-accent)] shrink-0 min-w-[24px]">
                        0{idx + 1}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={200}>
              <div className="border border-[var(--nb-rule)] bg-[var(--nb-bg)] p-8 grid grid-cols-2 gap-8">
                {whyStats.map(([n, l]) => (
                  <div key={`${n}-${l}`} className="flex flex-col gap-1.5">
                    <span className="nb-stat-value text-[clamp(32px,3vw,42px)]">{n}</span>
                    <span className="nb-stat-label">{l}</span>
                  </div>
                ))}
                <p className="col-span-2 text-sm leading-relaxed text-[var(--nb-ink-soft)] m-0 pt-2">
                  <span className="font-medium text-[var(--nb-ink)]">{whyStatsResearchNote.title}</span>
                  {" — "}
                  {whyStatsResearchNote.body}
                </p>
                <div className="col-span-2 flex flex-wrap gap-2 mt-2 pt-6 border-t border-[var(--nb-rule)]">
                  {["NZ + Global", "Faith · Education · Nonprofit", "Builder + Strategist + Trainer"].map(
                    (t) => (
                      <span
                        key={t}
                        className="nb-mono-label px-2.5 py-1 border border-[var(--nb-rule-strong)]"
                        style={{ fontSize: 10 }}
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* §05 Get started — primary conversion, before resources */}
      <section id="get-started" className="nb-section nb-section--raised scroll-mt-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            aspectRatio: "1 / 1",
            background:
              "radial-gradient(ellipse at center, color-mix(in srgb, var(--nb-accent) 14%, transparent), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div className="nb-container px-0 max-w-[980px] text-center relative">
          <ScrollReveal>
            <div className="nb-mono-label text-[var(--nb-accent)] mb-5">— Get started</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="nb-display font-light text-[clamp(40px,6.4vw,88px)] leading-none tracking-tight m-0 mb-6">
              If you&apos;re unsure where AI fits —{" "}
              <em className="nb-italic-accent italic font-light">start with a conversation</em>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <p className="nb-body-lg mx-auto mb-8 max-w-[620px]">
              Honest assessment of fit. No sales pitch. Response within 48 hours.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="nb-final-ctas flex flex-wrap gap-4 justify-center items-center">
              <CinematicPrimaryCTA href="/intake">{ctaLabel}</CinematicPrimaryCTA>
              <CinematicSecondaryCTA
                href={`mailto:${SITE_CONTACT_EMAIL}?subject=${MAILTO_SUBJECT_INQUIRY}`}
              >
                Or email me directly
              </CinematicSecondaryCTA>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <p
              className="m-0 mt-6 text-[var(--nb-ink-dim)]"
              style={{ fontSize: 13.5, lineHeight: 1.6 }}
            >
              Not ready for a call?{" "}
              <a
                href="/audit"
                className="underline underline-offset-4 decoration-[color-mix(in_srgb,var(--nb-accent)_50%,transparent)] hover:decoration-[var(--nb-accent)] text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)] transition-colors"
                data-event="homepage-audit-cta-footer"
              >
                Take the free 10-minute AI use audit
              </a>{" "}
              and get a clear picture first.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* §06 Latest */}
      <section id="latest" className="nb-section nb-section--raised scroll-mt-24">
        <div className="nb-container px-0">
          <div className="flex flex-wrap items-baseline justify-between gap-6 mb-10">
            <div>
              <SectionLabel num="06">Latest from Nathaniel</SectionLabel>
              <ScrollReveal>
                <h2 className="nb-display nb-display-lg font-normal m-0 max-w-[880px]">
                  Articles on AI, faith, formation,{" "}
                  <em className="nb-italic-accent italic font-normal">and what matters next</em>.
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <CinematicSecondaryCTA href="/resources">See all resources →</CinematicSecondaryCTA>
            </ScrollReveal>
          </div>
          <div className="nb-latest-grid nb-rule-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {latestFromNathaniel.slice(0, 3).map((item, i) => (
              <ScrollReveal key={item.url} delay={i * 80}>
                <Link
                  href={item.url}
                  className="nb-rule-grid-cell nb-latest-card flex flex-col min-h-[360px] no-underline text-inherit group"
                >
                  <div className="nb-mono-label text-[var(--nb-accent)] mb-8" style={{ fontSize: 10.5 }}>
                    {formatLatestTag(item)}
                  </div>
                  <h3 className="nb-display text-[clamp(22px,1.8vw,27px)] font-normal tracking-tight m-0 mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[var(--nb-ink-soft)] m-0 mb-8 line-clamp-4 flex-1">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-[var(--nb-rule)]">
                    <span className="nb-mono-label" style={{ color: "var(--nb-ink-dim)", fontSize: 10.5 }}>
                      {item.date}
                    </span>
                    <span className="text-[var(--nb-accent)] text-[13.5px] font-medium flex items-center gap-1.5">
                      Read <span>→</span>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
