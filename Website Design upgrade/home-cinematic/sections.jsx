// ─── All home page sections — Cinematic Hybrid ─────────────────────────────
// Each section is self-contained, reads from CSS vars, and animates on
// scroll via the Reveal primitive from helpers.jsx.
// (Helpers — Reveal, SectionLabel, LiveAIPanel, CTAPrimary, CTASecondary,
// FONT, CTA_GRADIENT — are already in scope from helpers.jsx which is
// concatenated above us in the bundled HTML.)

// ─── Header ───────────────────────────────────────────────────────────────
const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: scrolled ? 64 : 76,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 4vw, 56px)",
      background: scrolled ? "rgba(15,16,20,0.78)" : "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)",
      backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
      borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      transition: "height 240ms ease, background 240ms ease, border-color 240ms ease",
    }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={window.ASSETS.logo} alt="Nathaniel Baldock" style={{
          height: 38, maxHeight: scrolled ? 32 : 38,
          filter: "brightness(0) invert(1)",
          transition: "max-height 240ms ease",
        }} />
      </a>

      {/* Desktop nav */}
      <nav className="nb-desktop-nav" style={{
        display: "flex", gap: 28, alignItems: "center", fontSize: 13.5,
        color: "rgba(255,255,255,0.85)",
      }}>
        <a href="#" style={{ color: "white", fontWeight: 500, textDecoration: "none" }}>Home</a>
        <a href="#approach" style={navLinkStyle}>About</a>
        <a href="#speaking" style={navLinkStyle}>Speaking</a>
        <a href="#latest" style={navLinkStyle}>Resources</a>
        <a href="#pricing" style={navLinkStyle}>Pricing</a>
        <a href="#signin" style={{ ...navLinkStyle, marginLeft: 8 }}>Sign In</a>
        <a href="#contact" style={{
          background: CTA_GRADIENT, color: "white",
          padding: "10px 18px", borderRadius: 8,
          fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em",
          textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>Book a free 30-min call →</a>
      </nav>

      {/* Mobile menu button */}
      <button className="nb-mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)} style={{
        display: "none", border: "none", background: "transparent",
        color: "white", cursor: "pointer", padding: 8,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileOpen ? (
            <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
          ) : (
            <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></>
          )}
        </svg>
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          background: "rgba(15,16,20,0.96)",
          backdropFilter: "blur(20px)",
          zIndex: 99,
          padding: "32px 24px",
          display: "flex", flexDirection: "column", gap: 4,
        }} onClick={() => setMobileOpen(false)}>
          {[
            ["Home", "#top"], ["About", "#approach"], ["Speaking", "#speaking"],
            ["Resources", "#latest"], ["Pricing", "#pricing"], ["Sign In", "#signin"],
          ].map(([t, h]) => (
            <a key={t} href={h} style={{
              color: "var(--ink)", fontSize: 22, fontFamily: FONT.display,
              padding: "14px 4px", textDecoration: "none",
              borderBottom: "1px solid var(--rule)",
            }}>{t}</a>
          ))}
          <div style={{ marginTop: 24 }}>
            <CTAPrimary href="#contact" fullWidth>Book a free 30-min call</CTAPrimary>
          </div>
        </div>
      )}
    </header>
  );
};

const navLinkStyle = {
  color: "rgba(255,255,255,0.78)",
  textDecoration: "none",
  fontWeight: 400,
  transition: "color 200ms ease",
};

// ─── Hero ─────────────────────────────────────────────────────────────────
const Hero = ({ showAI = true }) => {
  return (
    <section id="top" className="nb-hero" style={{
      position: "relative",
      minHeight: "min(900px, 100vh)",
      overflow: "hidden",
      paddingTop: 76,
    }}>
      {/* Background photo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        animation: "nb-slowzoom 14s ease-out forwards",
      }}>
        <img src={window.ASSETS.hero} alt="" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% center",
        }} />
      </div>

      {/* Dark gradients */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(15,16,20,0.94) 0%, rgba(15,16,20,0.82) 30%, rgba(15,16,20,0.48) 58%, rgba(15,16,20,0.18) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to top, rgba(15,16,20,0.92) 0%, transparent 32%, transparent 70%, rgba(15,16,20,0.35) 100%)",
      }} />

      {/* Content */}
      <div className="nb-hero-content" style={{
        position: "relative", zIndex: 5,
        maxWidth: 1440, margin: "0 auto",
        padding: "120px clamp(20px, 4vw, 64px) 80px",
      }}>
        {/* Eyebrow */}
        <Reveal>
          <div className="nb-hero-eyebrow" style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 56,
            fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--ink-soft)",
            flexWrap: "wrap",
          }}>
            <span style={{
              display: "inline-block", width: 7, height: 7, borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)",
            }} />
            <span>AI Consulting</span>
            <span style={{ width: 18, height: 1, background: "var(--rule)" }} />
            <span>Tauranga · Aotearoa · Global</span>
          </div>
        </Reveal>

        {/* Headline + supporting copy + live AI panel layout */}
        <div className="nb-hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 64,
          alignItems: "end",
        }}>
          <div>
            {/* Sculptural italic serif headline */}
            <h1 className="nb-hero-h1" style={{
              margin: 0,
              fontFamily: FONT.display,
              fontWeight: 300,
              fontSize: "clamp(48px, 8.4vw, 108px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              textWrap: "balance",
              paddingBottom: "0.08em",
            }}>
              <Reveal delay={50}>
                <span style={{ display: "block" }}>Practical AI for</span>
              </Reveal>
              <Reveal delay={200}>
                <span style={{ display: "block" }}>
                  people who lead with{" "}
                  <em style={{
                    fontStyle: "italic", fontWeight: 300,
                    fontFamily: FONT.italic,
                    color: "var(--accent)",
                    // text-decoration stays within text flow — an
                    // absolute-positioned underline bar would bleed
                    // into the subtitle below at this font size.
                    textDecoration: "underline",
                    textDecorationColor: "color-mix(in srgb, var(--accent) 45%, transparent)",
                    textDecorationThickness: "0.07em",
                    textUnderlineOffset: "0.05em",
                  }}>
                    discernment
                  </em>
                  <span style={{ color: "var(--accent)" }}>.</span>
                </span>
              </Reveal>
            </h1>

            <Reveal delay={420}>
              <p className="nb-hero-sub" style={{
                margin: "48px 0 0",
                fontSize: "clamp(17px, 1.4vw, 20px)",
                lineHeight: 1.55,
                color: "rgba(244,239,226,0.85)",
                maxWidth: 620,
                letterSpacing: "-0.005em",
              }}>
                I help churches, schools, and mission-driven organisations adopt AI wisely —
                without hype, without fear, and without losing what matters most.
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="nb-hero-ctas" style={{
                display: "flex", alignItems: "center", gap: 18, marginTop: 36, flexWrap: "wrap",
              }}>
                <CTAPrimary href="#contact">Book a free 30-min consultation</CTAPrimary>
                <CTASecondary href="#approach">See how I work</CTASecondary>
              </div>
            </Reveal>
          </div>

          {/* Right column — live AI dialogue panel */}
          {showAI && (
            <Reveal delay={650} className="nb-hero-panel">
              <LiveAIPanel compact label="Live · A typical conversation" />
            </Reveal>
          )}
        </div>

        {/* Mini stats */}
        <Reveal delay={800}>
          <div className="nb-hero-stats" style={{
            display: "flex", gap: 56, marginTop: 80, paddingTop: 28,
            borderTop: "1px solid var(--rule)",
            flexWrap: "wrap",
          }}>
            {[
              ["20+", "Years in mission"],
              ["15+", "Countries served"],
              ["400+", "Leaders trained"],
              ["48h", "Reply, every time"],
            ].map(([n, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{
                  fontFamily: FONT.display, fontSize: "clamp(24px, 2.2vw, 32px)",
                  fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1,
                  color: "var(--ink)",
                }}>{n}</span>
                <span style={{
                  fontFamily: FONT.mono, fontSize: 10.5,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--ink-soft)",
                }}>{l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─── Section 01 — Approach / Pull Quote ──────────────────────────────────
const Approach = () => (
  <section id="approach" style={{
    padding: "clamp(80px, 12vw, 160px) clamp(20px, 4vw, 64px) clamp(60px, 8vw, 100px)",
    background: "var(--bg)",
  }}>
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <SectionLabel num="01">The real challenge leaders are facing</SectionLabel>

      <Reveal>
        <blockquote style={{
          margin: 0,
          fontFamily: FONT.display, fontWeight: 400,
          fontSize: "clamp(38px, 6.2vw, 88px)",
          lineHeight: 1.02,
          letterSpacing: "-0.028em",
          color: "var(--ink)",
          maxWidth: 1100,
          textWrap: "balance",
        }}>
          The risk isn&rsquo;t AI{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-soft)" }}>adoption</em>.
          <br />
          The risk is{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>accidental</em>{" "}
          adoption, without discernment.
        </blockquote>
      </Reveal>

      <div className="nb-approach-paras" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px, 5vw, 72px)",
        marginTop: "clamp(48px, 6vw, 88px)",
      }}>
        <Reveal delay={120}>
          <p style={paraStyle}>
            AI is already inside your organisation. Right now. Interns drafting emails,
            teachers grading essays, volunteers writing the newsletter — usually without
            policy, shared understanding, or a coherent view of where it should and
            shouldn&rsquo;t show up.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p style={paraStyle}>
            I don&rsquo;t sell a stack. I help leaders take stock of what&rsquo;s already
            happening, decide what&rsquo;s worth keeping, and design what comes next — with
            safeguarding, theological integrity, and your specific constraints built in
            from the start.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const paraStyle = {
  fontSize: "clamp(15px, 1.2vw, 17px)",
  lineHeight: 1.7,
  color: "var(--ink-soft)",
  margin: 0,
};

// ─── Section 02 — How I Help ─────────────────────────────────────────────
const HowIHelp = () => (
  <section id="how" style={{
    padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 64px) clamp(80px, 10vw, 120px)",
    background: "var(--bg)",
  }}>
    <div style={{ maxWidth: 1340, margin: "0 auto" }}>
      <SectionLabel num="02">How I help</SectionLabel>

      <Reveal>
        <h2 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(32px, 4.4vw, 60px)",
          lineHeight: 1.04,
          letterSpacing: "-0.028em",
          fontWeight: 400,
          color: "var(--ink)",
          margin: "0 0 64px",
          maxWidth: 920,
          textWrap: "balance",
        }}>
          From confusion to clarity. From experiment to{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>responsible practice</em>.
        </h2>
      </Reveal>

      <div className="nb-how-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: "var(--rule)",
      }}>
        {[
          { n: "01", title: "Clarity & guardrails", body: "AI strategy grounded in your mission and values. Policies and guardrails for staff and leaders. Discernment around what not to use." },
          { n: "02", title: "Practical systems", body: "Internal AI tools that work with your own documents. Workflow improvements that save real time. Tools designed for your context — not Silicon Valley defaults." },
          { n: "03", title: "Training & adoption", body: "Leadership briefings and staff training. Family- and student-safe guidance where relevant. Practical examples people can actually use." },
        ].map((c, i) => (
          <Reveal key={c.n} delay={i * 100}>
            <div className="nb-how-card" style={{
              background: "var(--bg)",
              padding: "clamp(32px, 4vw, 48px) clamp(28px, 3vw, 40px) clamp(40px, 5vw, 56px)",
              borderTop: "1px solid var(--accent)",
              height: "100%",
              boxSizing: "border-box",
            }}>
              <div style={{
                fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--accent)",
                marginBottom: 28,
              }}>{c.n}</div>
              <h3 style={{
                fontFamily: FONT.display,
                fontSize: "clamp(22px, 2.2vw, 30px)",
                fontWeight: 400, letterSpacing: "-0.02em",
                color: "var(--ink)", margin: "0 0 18px", lineHeight: 1.1,
              }}>{c.title}</h3>
              <p style={{
                fontSize: 15.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0,
              }}>{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <p style={{
          fontFamily: FONT.display, fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(18px, 1.6vw, 22px)",
          lineHeight: 1.45, color: "var(--ink-soft)",
          margin: "56px 0 0",
          maxWidth: 780,
          textWrap: "balance",
        }}>
          &mdash; Everything is designed to respect the authority of Scripture, preserve
          human discernment, and protect trust.
        </p>
      </Reveal>
    </div>
  </section>
);

// ─── Section 03 — Who This Is For ────────────────────────────────────────
const AUDIENCES = [
  {
    tag: "Faith & Mission Organisations",
    title: "Equip your church for AI",
    body: "Discover how AI can strengthen discipleship, deepen engagement, and create ministry tools — while understanding the real dangers to guard against.",
    body2: "Equip your leaders and parents through keynotes, seminars, or courses on what AI means for the church, families, and faith.",
    image: window.ASSETS.teaching,
    alt: "Teaching and ministry context",
  },
  {
    tag: "Schools & Training",
    title: "Prepare students for what's next",
    body: "Learn what teachers should actually use AI for, how to manage student use wisely, and where it can free up real time in the classroom.",
    body2: "Give your staff, parents, and students practical clarity through training days or assemblies that replace fear with confidence.",
    image: window.ASSETS.school,
    alt: "School and training context",
  },
  {
    tag: "Nonprofits & NGOs",
    title: "Multiply impact, not complexity",
    body: "Streamline operations, strengthen marketing and engagement, and use AI to amplify the mission you're already doing well.",
    body2: "Align your whole team through workshops or briefings that turn AI from a buzzword into a practical advantage.",
    image: null, // we'll draw a placeholder
    alt: "Team collaboration",
  },
];

const Audiences = ({ showImages = true }) => (
  <section id="who" style={{
    padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 64px)",
    background: "var(--bg)",
    borderTop: "1px solid var(--rule)",
  }}>
    <div style={{ maxWidth: 1340, margin: "0 auto" }}>
      <SectionLabel num="03">Who this is for</SectionLabel>
      <Reveal>
        <h2 style={{
          fontFamily: FONT.display,
          fontSize: "clamp(32px, 4.4vw, 60px)",
          lineHeight: 1.04, letterSpacing: "-0.028em",
          fontWeight: 400, color: "var(--ink)",
          margin: "0 0 80px", maxWidth: 920, textWrap: "balance",
        }}>
          Three audiences. <em style={{ fontStyle: "italic", color: "var(--accent)" }}>One belief</em>:
          AI should serve your people, not replace them.
        </h2>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(60px, 8vw, 100px)" }}>
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.tag} delay={i * 60}>
            <div className="nb-audience-row" style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
              gap: "clamp(36px, 5vw, 80px)",
              alignItems: "center",
            }}>
              {/* Text */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div style={{
                  fontFamily: FONT.mono, fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--accent)", marginBottom: 16,
                }}>
                  0{i + 1} · {a.tag}
                </div>
                <h3 style={{
                  fontFamily: FONT.display,
                  fontSize: "clamp(28px, 3.6vw, 48px)",
                  fontWeight: 400, letterSpacing: "-0.025em",
                  color: "var(--ink)", margin: "0 0 24px", lineHeight: 1.06,
                  textWrap: "balance",
                }}>{a.title}</h3>
                <p style={{
                  fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-soft)",
                  margin: "0 0 14px",
                }}>{a.body}</p>
                <p style={{
                  fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0,
                }}>{a.body2}</p>
                <div style={{ marginTop: 32 }}>
                  <CTASecondary href="#contact">Talk about this →</CTASecondary>
                </div>
              </div>

              {/* Image */}
              <div style={{
                order: i % 2 === 0 ? 2 : 1,
                aspectRatio: "4 / 3",
                overflow: "hidden",
                position: "relative",
                background: "var(--bg-raised)",
                border: "1px solid var(--rule)",
              }}>
                {showImages && a.image ? (
                  <img src={a.image} alt={a.alt} style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    filter: "saturate(0.85) contrast(1.05) brightness(0.92)",
                  }} />
                ) : (
                  // Placeholder block for missing imagery — labelled, not faked
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(124,204,30,0.05), rgba(17,194,92,0.08))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 10,
                  }}>
                    <span style={{
                      fontFamily: FONT.mono, fontSize: 10, letterSpacing: "0.22em",
                      textTransform: "uppercase", color: "var(--accent)",
                    }}>Image placeholder</span>
                    <span style={{
                      fontFamily: FONT.display, fontStyle: "italic", fontWeight: 300,
                      fontSize: 22, color: "var(--ink-soft)",
                    }}>{a.alt}</span>
                  </div>
                )}
                {/* Caption ribbon */}
                <div style={{
                  position: "absolute", left: 16, bottom: 16,
                  background: "rgba(15,16,20,0.78)",
                  backdropFilter: "blur(10px)",
                  padding: "8px 14px",
                  fontFamily: FONT.mono, fontSize: 10,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  border: "1px solid var(--rule-strong)",
                }}>
                  Fig. 0{i + 1}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 04 — Why Work With Me ───────────────────────────────────────
const WhyMe = () => (
  <section id="why" style={{
    padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 64px)",
    background: "var(--bg-raised)",
    borderTop: "1px solid var(--rule)",
    position: "relative",
  }}>
    <div style={{ maxWidth: 1340, margin: "0 auto" }}>
      <SectionLabel num="04">Why work with me</SectionLabel>

      <div className="nb-why-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: "clamp(40px, 6vw, 96px)",
        alignItems: "start",
      }}>
        <div>
          <Reveal>
            <h2 style={{
              fontFamily: FONT.display,
              fontSize: "clamp(34px, 4.6vw, 60px)",
              lineHeight: 1.04, letterSpacing: "-0.028em",
              fontWeight: 400, color: "var(--ink)",
              margin: "0 0 32px", textWrap: "balance",
            }}>
              Deep <em style={{ fontStyle: "italic", color: "var(--accent)" }}>faith context</em>.
              Real <em style={{ fontStyle: "italic", color: "var(--accent)" }}>technology experience</em>.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <ul style={{
              margin: 0, padding: 0, listStyle: "none",
              display: "flex", flexDirection: "column", gap: 18,
            }}>
              {[
                "20+ years in global missions, biblical education, and cross-cultural program development",
                "Experience building and shipping real digital products — mobile apps, web platforms, SaaS",
                "Strong theological, ethical, and safeguarding foundations",
                "I don't sell or reuse your data; I explain clearly where and how AI is used.",
                "AI should serve people and mission — not replace wisdom, responsibility, or relationship.",
              ].map((b, i) => (
                <li key={i} style={{
                  display: "flex", gap: 16, alignItems: "baseline",
                  fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)",
                }}>
                  <span style={{
                    fontFamily: FONT.mono, fontSize: 11,
                    color: "var(--accent)", flexShrink: 0,
                    minWidth: 24,
                  }}>0{i + 1}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="nb-why-stats" style={{
            background: "var(--bg)",
            border: "1px solid var(--rule)",
            padding: "clamp(28px, 3vw, 40px)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 24px",
          }}>
            {[
              ["20+", "Years in mission"],
              ["15+", "Countries served"],
              ["400+", "Leaders trained"],
              ["40k", "Research hours"],
              ["200+", "Contributors led"],
              ["48h", "Reply, always"],
            ].map(([n, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{
                  fontFamily: FONT.display,
                  fontSize: "clamp(32px, 3vw, 42px)",
                  fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1,
                  color: "var(--ink)",
                }}>{n}</span>
                <span style={{
                  fontFamily: FONT.mono, fontSize: 10,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--ink-soft)",
                }}>{l}</span>
              </div>
            ))}

            {/* Tags row */}
            <div style={{
              gridColumn: "1 / -1",
              display: "flex", flexWrap: "wrap", gap: 8,
              marginTop: 8, paddingTop: 24, borderTop: "1px solid var(--rule)",
            }}>
              {["NZ + Global", "Faith · Education · Nonprofit", "Builder + Strategist + Trainer"].map((t) => (
                <span key={t} style={{
                  fontFamily: FONT.mono, fontSize: 10,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  padding: "5px 10px",
                  border: "1px solid var(--rule-strong)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Section 05 — Latest from Nathaniel (NEW) ────────────────────────────
const LATEST = [
  {
    id: "teens-algorithm",
    tag: "AI & Faith · 16 min read",
    title: "When Your Teen's Best Friend Is an Algorithm",
    excerpt: "One in eight teens use AI for mental health advice. Two in three call it a friend. The 2am conversation is changing — and so must we.",
    date: "26 Feb 2026",
  },
  {
    id: "sabbath-rest",
    tag: "AI & Faith · 12 min read",
    title: "Reclaiming the Sabbath in an Always-On World",
    excerpt: "AI hasn't just made us faster. It has trained us to live at a pace our souls cannot sustain. On AI fatigue, human limits, and rest as radical trust.",
    date: "25 Feb 2026",
  },
  {
    id: "frictionless-faith",
    tag: "AI & Faith · 14 min read",
    title: "The Danger of Frictionless Faith",
    excerpt: "AI promises to smooth out every rough edge of life — but the friction it removes is the very space where God forms us. On hurry, effort, and formation.",
    date: "25 Feb 2026",
  },
];

const LatestSection = () => (
  <section id="latest" style={{
    padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 64px)",
    background: "var(--bg)",
    borderTop: "1px solid var(--rule)",
  }}>
    <div style={{ maxWidth: 1340, margin: "0 auto" }}>
      <div className="nb-latest-head" style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        gap: 32, marginBottom: 64, flexWrap: "wrap",
      }}>
        <div>
          <SectionLabel num="05">Latest from Nathaniel</SectionLabel>
          <Reveal>
            <h2 style={{
              fontFamily: FONT.display,
              fontSize: "clamp(32px, 4.4vw, 60px)",
              lineHeight: 1.04, letterSpacing: "-0.028em",
              fontWeight: 400, color: "var(--ink)",
              margin: 0, maxWidth: 880, textWrap: "balance",
            }}>
              Articles on AI, faith, formation,{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>and what matters next</em>.
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <CTASecondary href="#resources">See all resources</CTASecondary>
        </Reveal>
      </div>

      <div className="nb-latest-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: "var(--rule)",
      }}>
        {LATEST.map((a, i) => (
          <Reveal key={a.id} delay={i * 80}>
            <a href={"#" + a.id} className="nb-latest-card" style={{
              display: "flex", flexDirection: "column",
              background: "var(--bg)",
              padding: "clamp(28px, 3vw, 40px)",
              minHeight: 360,
              textDecoration: "none",
              color: "inherit",
              borderTop: "1px solid var(--accent)",
              position: "relative",
              transition: "background 240ms ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-raised)"}
            onMouseOut={(e) => e.currentTarget.style.background = "var(--bg)"}
            >
              <div style={{
                fontFamily: FONT.mono, fontSize: 10.5,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--accent)", marginBottom: 32,
              }}>{a.tag}</div>

              <h3 style={{
                fontFamily: FONT.display,
                fontSize: "clamp(22px, 1.8vw, 27px)",
                fontWeight: 400, letterSpacing: "-0.018em",
                color: "var(--ink)", margin: "0 0 16px",
                lineHeight: 1.12, textWrap: "balance",
              }}>{a.title}</h3>

              <p style={{
                fontSize: 15, lineHeight: 1.65, color: "var(--ink-soft)",
                margin: "0 0 32px",
                display: "-webkit-box", WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>{a.excerpt}</p>

              <div style={{
                marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingTop: 20, borderTop: "1px solid var(--rule)",
              }}>
                <span style={{
                  fontFamily: FONT.mono, fontSize: 10.5,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--ink-dim)",
                }}>{a.date}</span>
                <span style={{
                  color: "var(--accent)", fontSize: 13.5, fontWeight: 500,
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  Read <span>→</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 06 — Final CTA ──────────────────────────────────────────────
const FinalCTA = () => (
  <section id="contact" style={{
    padding: "clamp(100px, 14vw, 180px) clamp(20px, 4vw, 64px)",
    background: "var(--bg-raised)",
    borderTop: "1px solid var(--rule)",
    position: "relative", overflow: "hidden",
  }}>
    {/* Subtle accent glow */}
    <div aria-hidden style={{
      position: "absolute",
      top: "-30%", left: "50%", transform: "translateX(-50%)",
      width: "70%", aspectRatio: "1 / 1",
      background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%)",
      filter: "blur(60px)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <Reveal>
        <div style={{
          fontFamily: FONT.mono, fontSize: 11,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 28,
        }}>— Get started</div>
      </Reveal>
      <Reveal delay={100}>
        <h2 style={{
          fontFamily: FONT.display, fontWeight: 300,
          fontSize: "clamp(40px, 6.4vw, 88px)",
          lineHeight: 1.0, letterSpacing: "-0.032em",
          color: "var(--ink)", margin: "0 0 32px", textWrap: "balance",
        }}>
          If you&rsquo;re unsure where AI fits —{" "}
          <em style={{
            fontStyle: "italic", fontWeight: 300, fontFamily: FONT.italic,
            color: "var(--accent)",
          }}>start with a conversation</em>.
        </h2>
      </Reveal>
      <Reveal delay={250}>
        <p style={{
          fontFamily: FONT.body,
          fontSize: "clamp(16px, 1.3vw, 19px)",
          lineHeight: 1.55, color: "var(--ink-soft)",
          margin: "0 auto 48px", maxWidth: 620,
        }}>
          Honest assessment of fit. No sales pitch. Response within 48 hours.
        </p>
      </Reveal>
      <Reveal delay={400}>
        <div className="nb-final-ctas" style={{
          display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap",
        }}>
          <CTAPrimary href="#contact">Book a free 30-min consultation</CTAPrimary>
          <CTASecondary href="mailto:nathanielbaldock@gmail.com">Or email me directly</CTASecondary>
        </div>
      </Reveal>
    </div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    padding: "clamp(40px, 6vw, 64px) clamp(20px, 4vw, 64px) clamp(32px, 4vw, 40px)",
    background: "var(--bg)",
    borderTop: "1px solid var(--rule)",
  }}>
    <div style={{
      maxWidth: 1340, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      gap: 32, flexWrap: "wrap",
    }}>
      <div style={{ maxWidth: 360 }}>
        <img src={window.ASSETS.logo} alt="Nathaniel Baldock" style={{
          height: 36, filter: "brightness(0) invert(1)", marginBottom: 16,
        }} />
        <p style={{
          fontFamily: FONT.body, fontSize: 13.5, lineHeight: 1.65,
          color: "var(--ink-soft)", margin: 0,
        }}>
          AI Consulting for Faith, Education &amp; Mission-Driven Leaders.
          <br />Based in Tauranga, Aotearoa &mdash; serving NZ &amp; globally.
        </p>
      </div>
      <div style={{
        display: "flex", gap: "clamp(28px, 4vw, 56px)", flexWrap: "wrap",
      }}>
        <FooterCol title="Site">
          <a href="#" style={footerLinkStyle}>Home</a>
          <a href="#approach" style={footerLinkStyle}>About</a>
          <a href="#speaking" style={footerLinkStyle}>Speaking</a>
          <a href="#latest" style={footerLinkStyle}>Resources</a>
          <a href="#pricing" style={footerLinkStyle}>Pricing</a>
        </FooterCol>
        <FooterCol title="Connect">
          <a href="mailto:nathanielbaldock@gmail.com" style={footerLinkStyle}>Email</a>
          <a href="#" style={footerLinkStyle}>LinkedIn</a>
          <a href="#contact" style={footerLinkStyle}>Book a call</a>
        </FooterCol>
        <FooterCol title="Legal">
          <a href="#" style={footerLinkStyle}>Privacy</a>
          <a href="#" style={footerLinkStyle}>Terms</a>
        </FooterCol>
      </div>
    </div>
    <div style={{
      maxWidth: 1340, margin: "48px auto 0",
      paddingTop: 24, borderTop: "1px solid var(--rule)",
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      fontFamily: FONT.mono, fontSize: 10.5,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "var(--ink-dim)",
    }}>
      <span>© 2026 Nathaniel Baldock</span>
      <span>Designed with discernment in Tauranga · NZ</span>
    </div>
  </footer>
);

const FooterCol = ({ title, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 120 }}>
    <span style={{
      fontFamily: FONT.mono, fontSize: 10.5,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: "var(--ink-dim)", marginBottom: 4,
    }}>{title}</span>
    {children}
  </div>
);

const footerLinkStyle = {
  fontFamily: FONT.body, fontSize: 14,
  color: "var(--ink-soft)", textDecoration: "none",
};

Object.assign(window, {
  Header, Hero, Approach, HowIHelp, Audiences, WhyMe, LatestSection, FinalCTA, Footer,
});
