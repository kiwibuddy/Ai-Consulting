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

const ctaLabel = "Book a free 30-min consultation";

const howIHelp = [
  {
    n: "01",
    title: "Clarity & guardrails",
    body: "AI strategy grounded in your mission and values. Policies and guardrails for staff and leaders. Discernment around what not to use.",
  },
  {
    n: "02",
    title: "Practical systems",
    body: "Internal AI tools that work with your own documents. Workflow improvements that save real time. Tools designed for your context — not Silicon Valley defaults.",
  },
  {
    n: "03",
    title: "Training & adoption",
    body: "Leadership briefings and staff training. Family- and student-safe guidance where relevant. Practical examples people can actually use.",
  },
];

const whoThisIsFor = [
  {
    tag: "Faith & Mission Organisations",
    title: "Equip your church for AI",
    body: "Discover how AI can strengthen discipleship, deepen engagement, and create ministry tools — while understanding the real dangers to guard against.",
    body2: "Equip your leaders and parents through keynotes, seminars, or courses on what AI means for the church, families, and faith.",
    image: "/Teaching-2.png",
    alt: "Teaching and ministry context",
  },
  {
    tag: "Schools & Training",
    title: "Prepare students for what's next",
    body: "Learn what teachers should actually use AI for, how to manage student use wisely, and where it can free up real time in the classroom.",
    body2: "Give your staff, parents, and students practical clarity through training days or assemblies that replace fear with confidence.",
    image: "/School_Profile.png",
    alt: "School and training context",
  },
  {
    tag: "Nonprofits & NGOs",
    title: "Multiply impact, not complexity",
    body: "Streamline operations, strengthen marketing and engagement, and use AI to amplify the mission you're already doing well.",
    body2: "Align your whole team through workshops or briefings that turn AI from a buzzword into a practical advantage.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    alt: "Team collaboration",
  },
];

const whyBullets = [
  "20+ years in global missions, biblical education, and cross-cultural program development",
  "Experience building and shipping real digital products — mobile apps, web platforms, SaaS",
  "Strong theological, ethical, and safeguarding foundations",
  "I don't sell or reuse your data; I explain clearly where and how AI is used.",
  "AI should serve people and mission — not replace wisdom, responsibility, or relationship.",
];

const whyStats = [
  ["20+", "Years in mission"],
  ["15+", "Countries served"],
  ["400+", "Leaders trained"],
  ["40k", "Research hours"],
  ["200+", "Contributors led"],
  ["48h", "Reply, always"],
] as const;

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
                I help churches, schools, and mission-driven organisations adopt AI wisely —
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
          <ScrollReveal>
            <LiveAIPanel variant="dock" hideLabel />
          </ScrollReveal>
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
                I don&apos;t sell a stack. I help leaders take stock of what&apos;s already
                happening, decide what&apos;s worth keeping, and design what comes next — with
                safeguarding, theological integrity, and your specific constraints built in from
                the start.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* §02 How I help */}
      <section id="how-i-help" className="nb-section scroll-mt-24">
        <div className="nb-container px-0">
          <SectionLabel num="02">How I help</SectionLabel>
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
                  <div key={l} className="flex flex-col gap-1.5">
                    <span className="nb-stat-value text-[clamp(32px,3vw,42px)]">{n}</span>
                    <span className="nb-stat-label">{l}</span>
                  </div>
                ))}
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
