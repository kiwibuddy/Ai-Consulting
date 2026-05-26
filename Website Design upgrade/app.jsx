// Nathaniel Baldock — bespoke home page
// Sculptural type + handcrafted marks + editorial pacing

const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "paper",
  "accent": "amber",
  "marks": true,
  "displayFont": "newsreader",
  "showAIPanel": true
}/*EDITMODE-END*/;

const ACCENTS = {
  amber:  { hex: "#C9651A", soft: "#E8952A", name: "Amber" },
  teal:   { hex: "#1E6B7F", soft: "#2D7A8F", name: "Teal"  },
  navy:   { hex: "#1A2E4A", soft: "#2A4570", name: "Navy"  },
};

const MODES = {
  paper: {
    bg:        "#F2ECE0",
    bgRaised:  "#EFE7D7",
    ink:       "#1A1A1A",
    inkSoft:   "#5A554B",
    rule:      "rgba(26,26,26,0.18)",
    grainOpacity: 0.07,
  },
  ink: {
    bg:        "#15171C",
    bgRaised:  "#1A1D24",
    ink:       "#F0EAD8",
    inkSoft:   "#A39E91",
    rule:      "rgba(240,234,216,0.22)",
    grainOpacity: 0.12,
  },
  bleach: {
    bg:        "#F8F7F2",
    bgRaised:  "#FFFFFF",
    ink:       "#111111",
    inkSoft:   "#5A554B",
    rule:      "rgba(0,0,0,0.12)",
    grainOpacity: 0.04,
  },
};

const DISPLAY_FONTS = {
  newsreader: `"Newsreader", "Source Serif Pro", Georgia, serif`,
  instrument: `"Instrument Serif", "Newsreader", Georgia, serif`,
  plex:       `"IBM Plex Sans", "Inter", system-ui, sans-serif`,
};

// ─────────────────────────────────────────────────────────────────────
// Scroll reveal hook
// ─────────────────────────────────────────────────────────────────────
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, className = "", as: As = "div" }) => {
  const [ref, shown] = useReveal();
  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </As>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Tiny header — minimal editorial
// ─────────────────────────────────────────────────────────────────────
const Header = ({ accent }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: scrolled ? "14px 32px" : "22px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "padding 240ms ease, background-color 240ms ease, border-color 240ms ease",
        backgroundColor: scrolled ? "var(--bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
      }}
    >
      <a href="#top" style={{ color: "var(--ink)", textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "var(--display)", fontStyle: "italic", fontWeight: 500, fontSize: 22, letterSpacing: "-0.01em" }}>
          Nathaniel
        </span>
        <span style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.01em" }}>
          Baldock
        </span>
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: 28, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        <a href="#approach" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>Approach</a>
        <a href="#services" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>Services</a>
        <a href="#work"     style={{ color: "var(--ink-soft)", textDecoration: "none" }}>Work</a>
        <a href="#about"    style={{ color: "var(--ink-soft)", textDecoration: "none" }}>About</a>
        <a
          href="#contact"
          style={{
            color: "var(--bg)",
            backgroundColor: "var(--accent)",
            padding: "9px 16px",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Book a call
        </a>
      </nav>
    </header>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Live AI dialogue panel — cycles through 4 prompt/answer pairs
// ─────────────────────────────────────────────────────────────────────
const DIALOGUE = [
  { q: "How do we use AI to grade papers faster?", a: "First: what is grading actually for? If it's feedback, AI helps. If it's judgment, slow down." },
  { q: "Can AI write our donor newsletter?",       a: "It can. The real question is what makes you worth writing about in the first place." },
  { q: "Should we let students use ChatGPT?",      a: "Yes — with three guardrails. Let's talk through them before you draft a policy." },
  { q: "Which AI tools should we buy?",            a: "Probably fewer than you think. Start with one workflow. Get it right. Then expand." },
];

const useTyper = (text, speed = 22, startDelay = 0) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return out;
};

const AIDialoguePanel = () => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("q"); // q -> a -> hold -> next
  useEffect(() => {
    let t;
    const current = DIALOGUE[idx];
    if (phase === "q") {
      const qDur = current.q.length * 26 + 200;
      t = setTimeout(() => setPhase("a"), qDur + 350);
    } else if (phase === "a") {
      const aDur = current.a.length * 18 + 200;
      t = setTimeout(() => setPhase("hold"), aDur + 1800);
    } else if (phase === "hold") {
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % DIALOGUE.length);
        setPhase("q");
      }, 600);
    }
    return () => clearTimeout(t);
  }, [idx, phase]);

  const current = DIALOGUE[idx];
  const qText = useTyper(current.q, 26, 0);
  const aText = useTyper(phase === "a" || phase === "hold" ? current.a : "", 18, 0);

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--rule)",
        backgroundColor: "color-mix(in srgb, var(--bg-raised), transparent 10%)",
        padding: "20px 22px 22px",
        borderRadius: 2,
      }}
    >
      {/* corner tag */}
      <div style={{
        position: "absolute", top: -10, left: 18,
        backgroundColor: "var(--bg)",
        padding: "0 8px",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--ink-soft)",
      }}>
        Live · A typical conversation
      </div>

      {/* Q */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 4 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", marginTop: 6, letterSpacing: "0.1em" }}>Q.</span>
        <div style={{ fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", minHeight: "1.55em" }}>
          {qText}
          {phase === "q" && qText.length < current.q.length && <Caret />}
        </div>
      </div>

      {/* A */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 14 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink)", marginTop: 8, letterSpacing: "0.1em" }}>A.</span>
        <div style={{
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontSize: 18,
          lineHeight: 1.45,
          color: "var(--ink)",
          minHeight: "1.45em",
          letterSpacing: "-0.005em",
        }}>
          {aText}
          {(phase === "a" || phase === "hold") && aText.length < current.a.length && <Caret />}
        </div>
      </div>

      {/* dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 18 }}>
        {DIALOGUE.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 18 : 6,
            height: 2,
            backgroundColor: i === idx ? "var(--accent)" : "var(--rule)",
            transition: "width 320ms ease, background-color 320ms ease",
          }} />
        ))}
      </div>
    </div>
  );
};

const Caret = () => (
  <span
    style={{
      display: "inline-block",
      width: "0.5ch",
      height: "1em",
      backgroundColor: "currentColor",
      marginLeft: 2,
      verticalAlign: "-2px",
      animation: "blink 1s steps(2) infinite",
    }}
  />
);

// ─────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────
const Hero = ({ marks, showAI }) => {
  return (
    <section id="top" style={{ position: "relative", minHeight: "100vh", padding: "180px 0 120px", display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 48px" }}>

        {/* eyebrow row */}
        <Reveal>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            marginBottom: 56,
          }}>
            <span>AI Consulting</span>
            <Rule />
            <span>Tauranga · Aotearoa · Global</span>
            <Rule />
            <span>Est. 2026</span>
            <Rule grow />
            <span>No. 01 — The Home Page</span>
          </div>
        </Reveal>

        {/* Headline — sculptural */}
        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <h1 style={{
              fontFamily: "var(--display)",
              fontWeight: 400,
              fontSize: "clamp(48px, 7.8vw, 124px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              margin: 0,
            }}>
              <Reveal delay={50}>
                <span style={{ display: "block" }}>AI consulting for</span>
              </Reveal>
              <Reveal delay={200}>
                <span style={{ display: "block", position: "relative" }}>
                  people moving{" "}
                  <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                    <em style={{
                      fontStyle: "italic",
                      fontFamily: `"Newsreader", serif`,
                      fontWeight: 300,
                      color: "var(--accent)",
                    }}>
                      wisely
                    </em>
                    {marks && (
                      <span style={{
                        position: "absolute",
                        left: "-2%",
                        right: "-4%",
                        bottom: "-0.06em",
                        height: "0.3em",
                        color: "var(--accent)",
                        pointerEvents: "none",
                      }}>
                        <MarkUnderline style={{ width: "100%", height: "100%" }} seed={0} />
                      </span>
                    )}
                  </span>
                  ,
                </span>
              </Reveal>
              <Reveal delay={350}>
                <span style={{ display: "block", position: "relative", color: "var(--ink-soft)" }}>
                  <span style={{ position: "relative", display: "inline-block" }}>
                    not recklessly.
                    {marks && (
                      <span style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "48%",
                        height: "0.2em",
                        color: "var(--ink-soft)",
                        opacity: 0.6,
                        pointerEvents: "none",
                      }}>
                        <MarkStrike style={{ width: "100%", height: "100%" }} />
                      </span>
                    )}
                  </span>
                </span>
              </Reveal>
            </h1>

            {/* hand annotation */}
            {marks && (
              <Reveal delay={750}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 28,
                  marginLeft: 20,
                  color: "var(--accent)",
                }}>
                  <span style={{ width: 80, height: 36, display: "inline-block" }}>
                    <MarkArrow style={{ width: "100%", height: "100%", transform: "rotate(-12deg)" }} />
                  </span>
                  <span style={{ fontFamily: `"Caveat", cursive`, fontSize: 26, color: "var(--accent)", lineHeight: 1 }}>
                    twenty years of mission work, applied
                  </span>
                </div>
              </Reveal>
            )}
          </div>

          {/* Right column — live AI panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 12 }}>
            <Reveal delay={500}>
              <p style={{
                fontFamily: "var(--body)",
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--ink)",
                margin: 0,
                maxWidth: 460,
                letterSpacing: "-0.005em",
              }}>
                I help churches, schools, and mission-driven organisations adopt AI in ways that
                serve their people, protect their values, and ship real outcomes — not
                strategy decks that gather dust.
              </p>
            </Reveal>
            {showAI && (
              <Reveal delay={650}>
                <AIDialoguePanel />
              </Reveal>
            )}
            <Reveal delay={800}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <a href="#contact" style={ctaPrimaryStyle}>Book a free 30-min call</a>
                <a href="#work" style={ctaSecondaryStyle}>See the work →</a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* bottom indicators */}
        <Reveal delay={900}>
          <div style={{
            display: "flex",
            gap: 48,
            marginTop: 100,
            paddingTop: 24,
            borderTop: "1px solid var(--rule)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
          }}>
            <Stat n="20+" l="Years in mission" />
            <Stat n="15+" l="Countries served" />
            <Stat n="400+" l="Leaders trained" />
            <Stat n="40k" l="Research hours" />
            <Stat n="∞"  l="Hours saved (we'll see)" muted />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Stat = ({ n, l, muted }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span style={{
      fontFamily: "var(--display)",
      fontSize: 28,
      fontWeight: 500,
      color: muted ? "var(--ink-soft)" : "var(--ink)",
      letterSpacing: "-0.02em",
      lineHeight: 1,
      textTransform: "none",
    }}>{n}</span>
    <span>{l}</span>
  </div>
);

const Rule = ({ grow }) => (
  <span style={{
    height: 1,
    backgroundColor: "var(--rule)",
    flex: grow ? 1 : "0 0 auto",
    width: grow ? "auto" : 24,
  }} />
);

const ctaPrimaryStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "14px 26px",
  backgroundColor: "var(--ink)",
  color: "var(--bg)",
  textDecoration: "none",
  fontFamily: "var(--body)",
  fontWeight: 600,
  fontSize: 15,
  letterSpacing: "-0.005em",
  borderRadius: 999,
  border: "1px solid var(--ink)",
};

const ctaSecondaryStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "14px 18px",
  color: "var(--ink)",
  textDecoration: "none",
  fontFamily: "var(--body)",
  fontWeight: 500,
  fontSize: 15,
};

// ─────────────────────────────────────────────────────────────────────
// Section: The real problem (pull quote)
// ─────────────────────────────────────────────────────────────────────
const ProblemPullQuote = ({ marks }) => (
  <section id="approach" style={{ padding: "160px 48px", position: "relative" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <SectionLabel num="01" label="The real challenge" />
      <Reveal>
        <blockquote style={{
          margin: 0,
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: "clamp(40px, 6.4vw, 96px)",
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          textWrap: "balance",
        }}>
          The risk isn't AI{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            adoption.
            {marks && (
              <span style={{
                position: "absolute",
                left: "-4%",
                right: "-4%",
                top: "-22%",
                bottom: "-30%",
                color: "var(--accent)",
                pointerEvents: "none",
              }}>
                <MarkCircle style={{ width: "100%", height: "100%" }} />
              </span>
            )}
          </span>
          <br />
          The risk is{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>accidental</em> adoption,
          without discernment.
        </blockquote>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 96 }}>
        <Reveal delay={120}>
          <p style={bodyP}>
            AI is already being used inside your organisation. Right now. By interns drafting
            emails, by teachers grading essays, by volunteers writing the newsletter.
            Usually without policy, shared understanding, or a coherent view of where
            it should and shouldn't show up.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p style={bodyP}>
            I don't sell a stack. I help leaders take stock of what's already happening,
            decide what's worth keeping, and design what comes next — with safeguarding,
            theological integrity, and your specific constraints designed in from the start.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const bodyP = {
  fontFamily: "var(--body)",
  fontSize: 19,
  lineHeight: 1.65,
  color: "var(--ink)",
  margin: 0,
  letterSpacing: "-0.003em",
};

const SectionLabel = ({ num, label }) => (
  <Reveal>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.22em",
        color: "var(--accent)",
        textTransform: "uppercase",
      }}>{num}</span>
      <span style={{ height: 1, width: 60, backgroundColor: "var(--rule)" }} />
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.22em",
        color: "var(--ink-soft)",
        textTransform: "uppercase",
      }}>{label}</span>
    </div>
  </Reveal>
);

// ─────────────────────────────────────────────────────────────────────
// Section: Two columns — corporate vs faith vs me (the bridge)
// ─────────────────────────────────────────────────────────────────────
const Difference = ({ marks }) => {
  return (
    <section style={{
      padding: "160px 48px",
      backgroundColor: "var(--bg-raised)",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="02" label="What's different here" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 64, alignItems: "start" }}>
          <Reveal delay={80}>
            <div style={ledgerCol}>
              <div style={ledgerHead}>
                <span style={ledgerNum}>A</span>
                <span style={ledgerTitle}>The corporate AI consultant</span>
              </div>
              <ul style={ledgerList}>
                <li>Slack-and-spreadsheet logic.</li>
                <li>"Faith and nonprofit" filed under "verticals."</li>
                <li>Pricing starts at $80k.</li>
                <li>Has never met a safeguarding officer.</li>
              </ul>
              {marks && <div style={{ color: "var(--ink-soft)", opacity: 0.55, height: 14, marginTop: 24 }}>
                <MarkStrike style={{ width: "60%", height: "100%" }} />
              </div>}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div style={ledgerCol}>
              <div style={ledgerHead}>
                <span style={ledgerNum}>B</span>
                <span style={ledgerTitle}>The faith-sector consultant</span>
              </div>
              <ul style={ledgerList}>
                <li>Speaks the language of mission.</li>
                <li>Writes excellent strategy decks.</li>
                <li>Can't actually ship a working system.</li>
                <li>Will recommend a course of action.</li>
              </ul>
              {marks && <div style={{ color: "var(--ink-soft)", opacity: 0.55, height: 14, marginTop: 24 }}>
                <MarkStrike style={{ width: "70%", height: "100%" }} />
              </div>}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div style={{ ...ledgerCol, borderLeft: "2px solid var(--accent)", paddingLeft: 28 }}>
              <div style={ledgerHead}>
                <span style={{ ...ledgerNum, color: "var(--accent)" }}>—</span>
                <span style={{ ...ledgerTitle, color: "var(--ink)" }}>
                  Me, somewhere{" "}
                  <em style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>between</em>
                </span>
              </div>
              <ul style={{ ...ledgerList, color: "var(--ink)" }}>
                <li>Built and shipped real apps live in the App Store.</li>
                <li>Coordinated 200+ contributors across 50 nations on a 40,000-hour research project.</li>
                <li>Spent 20 years in faith and mission contexts — theology and trust are not new vocabulary.</li>
                <li>Will sit beside your team and build it with them.</li>
              </ul>
              {marks && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginTop: 28,
                  color: "var(--accent)",
                }}>
                  <span style={{ width: 32, height: 32, display: "inline-block" }}>
                    <MarkCheck style={{ width: "100%", height: "100%" }} />
                  </span>
                  <span style={{ fontFamily: `"Caveat", cursive`, fontSize: 24 }}>
                    this part is the bridge
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ledgerCol = {
  fontFamily: "var(--body)",
};

const ledgerHead = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  marginBottom: 20,
  paddingBottom: 12,
  borderBottom: "1px solid var(--rule)",
};

const ledgerNum = {
  fontFamily: "var(--mono)",
  fontSize: 11,
  color: "var(--ink-soft)",
  letterSpacing: "0.2em",
};

const ledgerTitle = {
  fontFamily: "var(--display)",
  fontSize: 22,
  fontWeight: 500,
  color: "var(--ink-soft)",
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
};

const ledgerList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  fontSize: 16,
  lineHeight: 1.45,
  color: "var(--ink-soft)",
};

// ─────────────────────────────────────────────────────────────────────
// Section: Services as numbered editorial list
// ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", name: "Text",      tag: "Knowledge, writing, decision support",
    body: "Internal copilots trained on your own documents. Policy and curriculum assistants that respect your context. Scripture-safe content where it matters." },
  { num: "02", name: "Image",     tag: "Visuals with integrity",
    body: "Brand-safe image generation for education and comms. Clear guardrails for cultural and ethical use. Custom libraries built for your community, not stock." },
  { num: "03", name: "Video",     tag: "Teach once, multiply responsibly",
    body: "AI-assisted workflows that turn one talk into a course. Multilingual and accessibility-aware. Scale without the production-burnout cycle." },
  { num: "04", name: "Marketing", tag: "Messaging that serves, not manipulates",
    body: "Values-aligned messaging systems. Newsletter, donor, and community comms. Storytelling that honors beneficiaries rather than mining them." },
  { num: "05", name: "Web",       tag: "Dashboards and practical tools",
    body: "Internal dashboards. Knowledge portals. Compliance and reporting that runs itself. Custom workflows that cut admin time in half." },
  { num: "06", name: "App",       tag: "Purpose-driven products",
    body: "AI product strategy, real PRDs, and shipped software. Education and faith-based apps built for formation — not attention extraction." },
];

const ServicesList = ({ accent }) => {
  const [hoverIdx, setHoverIdx] = useState(null);
  return (
    <section id="services" style={{ padding: "160px 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="03" label="Six categories" />
        <Reveal>
          <h2 style={{
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: "clamp(40px, 5vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: "0 0 88px",
            maxWidth: 900,
            textWrap: "balance",
          }}>
            What I actually build. <em style={{ fontStyle: "italic", color: "var(--ink-soft)", fontWeight: 300 }}>Six categories</em>, designed for your context.
          </h2>
        </Reveal>

        <ol style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "1px solid var(--rule)",
        }}>
          {SERVICES.map((s, i) => {
            const active = hoverIdx === i;
            return (
              <Reveal key={s.num} delay={i * 40} as="li">
                <div
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr 1.2fr 60px",
                    alignItems: "baseline",
                    gap: 32,
                    padding: "32px 0",
                    borderBottom: "1px solid var(--rule)",
                    cursor: "pointer",
                    transition: "padding 320ms ease, background-color 320ms ease",
                    paddingLeft: active ? 24 : 0,
                    backgroundColor: active ? "color-mix(in srgb, var(--accent) 6%, transparent)" : "transparent",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    color: active ? "var(--accent)" : "var(--ink-soft)",
                    letterSpacing: "0.18em",
                    transition: "color 320ms ease",
                  }}>— {s.num}</span>
                  <div>
                    <div style={{
                      fontFamily: "var(--display)",
                      fontSize: "clamp(36px, 4.5vw, 60px)",
                      lineHeight: 1,
                      fontWeight: 400,
                      letterSpacing: "-0.025em",
                      color: "var(--ink)",
                    }}>
                      {s.name}{" "}
                      <em style={{
                        fontStyle: "italic",
                        fontSize: "0.7em",
                        color: active ? "var(--accent)" : "var(--ink-soft)",
                        fontWeight: 300,
                        transition: "color 320ms ease",
                      }}>
                        AI
                      </em>
                    </div>
                    <div style={{
                      fontFamily: "var(--display)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 20,
                      color: "var(--ink-soft)",
                      marginTop: 6,
                      letterSpacing: "-0.005em",
                    }}>
                      {s.tag}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "var(--body)",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                    margin: 0,
                    maxWidth: 480,
                  }}>{s.body}</p>
                  <span style={{
                    fontFamily: "var(--display)",
                    fontSize: 28,
                    color: active ? "var(--accent)" : "var(--ink-soft)",
                    textAlign: "right",
                    transition: "color 320ms ease, transform 320ms ease",
                    transform: active ? "translateX(8px)" : "translateX(0)",
                  }}>→</span>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Section: Portfolio — editorial entries
// ─────────────────────────────────────────────────────────────────────
const WORK = [
  {
    name: "SourceView Together",
    year: "2024",
    kind: "iOS · Android · Live",
    blurb: "A Bluetooth-synchronised Bible reading app for groups. Built end-to-end in React Native. Endorsed by the Anglican Bishop of Nairobi. Shipped to both stores.",
    metric: "Group-sync reading across multiple devices",
  },
  {
    name: "Kingdom Vocations",
    year: "2024",
    kind: "Web · Course platform",
    blurb: "An eight-module course platform for young adults working out vocation, with student portal, progress, and resource library. Used by training schools worldwide.",
    metric: "8 modules · global cohorts",
  },
  {
    name: "Coaching Portal",
    year: "2024",
    kind: "Web · SaaS · PWA",
    blurb: "A full client/coach hub with intake, session notes, file management, notifications, and a mobile-first PWA. Built from PRD to production single-handed.",
    metric: "End-to-end SaaS, PRD → prod",
  },
  {
    name: "SourceView Bible",
    year: "2013 — 2016",
    kind: "iOS · Android · Distributed research",
    blurb: "Coordinated 200+ contributors across 50 nations through 40,000 hours of crowdsourced biblical research. Pioneered the SphereView methodology.",
    metric: "Presented to 4,000 in-person, 10,000 via broadcast",
  },
];

const Portfolio = ({ marks }) => (
  <section id="work" style={{
    padding: "160px 48px",
    backgroundColor: "var(--bg-raised)",
    borderTop: "1px solid var(--rule)",
    borderBottom: "1px solid var(--rule)",
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <SectionLabel num="04" label="Shipped, not pitched" />
      <Reveal>
        <h2 style={{
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: "clamp(40px, 5.6vw, 84px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          margin: "0 0 16px",
          textWrap: "balance",
        }}>
          The portfolio is the{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>argument.</em>
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p style={{
          fontFamily: "var(--body)",
          fontSize: 19,
          color: "var(--ink-soft)",
          maxWidth: 620,
          marginBottom: 80,
          lineHeight: 1.55,
        }}>
          Real systems in the wild. Not case-study slideware, not theoretical roadmaps —
          things you can install and use today.
        </p>
      </Reveal>

      {WORK.map((w, i) => (
        <Reveal key={w.name} delay={i * 80}>
          <article style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 1.4fr 220px",
            gap: 48,
            padding: "44px 0",
            borderTop: "1px solid var(--rule)",
            alignItems: "baseline",
          }}>
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "var(--ink-soft)",
              letterSpacing: "0.18em",
            }}>{w.year}</span>
            <div>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 400,
                fontSize: "clamp(28px, 3.2vw, 46px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}>{w.name}</div>
              <div style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-soft)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 10,
              }}>{w.kind}</div>
            </div>
            <p style={{
              fontFamily: "var(--body)",
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--ink)",
              margin: 0,
              maxWidth: 560,
            }}>{w.blurb}</p>
            <div style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 19,
              color: "var(--accent)",
              lineHeight: 1.25,
              textAlign: "right",
            }}>{w.metric}</div>
          </article>
        </Reveal>
      ))}

      <div style={{ borderTop: "1px solid var(--rule)" }} />

      {marks && (
        <Reveal delay={200}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 48,
            color: "var(--accent)",
            justifyContent: "flex-end",
          }}>
            <span style={{ fontFamily: `"Caveat", cursive`, fontSize: 28 }}>
              real things, in real stores
            </span>
            <span style={{ width: 56, height: 36, display: "inline-block", transform: "scaleX(-1) rotate(-6deg)" }}>
              <MarkArrow style={{ width: "100%", height: "100%" }} />
            </span>
          </div>
        </Reveal>
      )}
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────
// Section: Values — three short editorial lines with hand marks
// ─────────────────────────────────────────────────────────────────────
const Values = ({ marks }) => (
  <section id="about" style={{ padding: "180px 48px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionLabel num="05" label="What I won't compromise" />

      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        <Reveal delay={40}>
          <ValueLine
            kicker="On hype"
            line={<>Wisdom over <span style={{ position: "relative", display: "inline-block" }}>
              hype.
              {marks && <span style={{
                position: "absolute", left: "-2%", right: "-4%", bottom: "-0.15em", height: "0.32em",
                color: "var(--accent)",
              }}>
                <MarkUnderline style={{ width: "100%", height: "100%" }} seed={1} />
              </span>}
            </span></>}
            body="I won't recommend a tool because it raised a Series B. I'll recommend it because it does the job your team actually needs done."
          />
        </Reveal>
        <Reveal delay={120}>
          <ValueLine
            kicker="On people"
            line={<>People over <span style={{ position: "relative", display: "inline-block" }}>
              margins.
              {marks && <span style={{
                position: "absolute", left: "-12%", right: "-12%", top: "-22%", bottom: "-30%",
                color: "var(--accent)",
              }}>
                <MarkCircle style={{ width: "100%", height: "100%" }} />
              </span>}
            </span></>}
            body="Safeguarding children, refugees, students, donors — these aren't checkboxes. They're the first questions on the brief."
          />
        </Reveal>
        <Reveal delay={200}>
          <ValueLine
            kicker="On product"
            line={<>Systems that <em style={{ fontStyle: "italic", fontWeight: 300 }}>ship</em>, not decks that <span style={{ textDecoration: "line-through", textDecorationColor: "var(--accent)", textDecorationThickness: "2px" }}>sit</span>.</>}
            body="Strategy is welcome, but it's not the deliverable. The deliverable is a thing your team uses on Monday morning."
          />
        </Reveal>
      </div>
    </div>
  </section>
);

const ValueLine = ({ kicker, line, body }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    gap: 64,
    alignItems: "baseline",
    paddingTop: 36,
    borderTop: "1px solid var(--rule)",
  }}>
    <span style={{
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--ink-soft)",
      letterSpacing: "0.22em",
      textTransform: "uppercase",
    }}>{kicker}</span>
    <div>
      <h3 style={{
        fontFamily: "var(--display)",
        fontWeight: 400,
        fontSize: "clamp(40px, 6vw, 88px)",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        margin: 0,
        textWrap: "balance",
      }}>{line}</h3>
      <p style={{
        fontFamily: "var(--body)",
        fontSize: 18,
        lineHeight: 1.55,
        color: "var(--ink-soft)",
        maxWidth: 620,
        marginTop: 24,
      }}>{body}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// Section: About / Stats — large sculptural numerals
// ─────────────────────────────────────────────────────────────────────
const About = ({ marks }) => {
  const stats = [
    { n: "20+",    l: "years inside global missions" },
    { n: "15+",    l: "countries delivered work in" },
    { n: "400+",   l: "leaders personally trained" },
    { n: "40,000", l: "hours of distributed research coordinated" },
    { n: "200+",   l: "contributors led across 50 nations" },
    { n: "4,000",  l: "people in the room at one conference" },
  ];
  return (
    <section style={{
      padding: "160px 48px",
      backgroundColor: "var(--bg-raised)",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel num="06" label="The receipts" />

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, marginBottom: 80, alignItems: "end" }}>
          <Reveal>
            <h2 style={{
              fontFamily: "var(--display)",
              fontWeight: 400,
              fontSize: "clamp(36px, 4.6vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              margin: 0,
              textWrap: "balance",
            }}>
              I didn't take the<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>standard path</em> to AI consulting.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...bodyP, color: "var(--ink-soft)" }}>
              I'm not a corporate technologist who pivoted into faith work. I'm someone
              who spent two decades leading digital transformations inside some of the
              world's most resource-constrained, mission-driven contexts — Papua New Guinea
              to Kenya, classroom to conference stage — and then formalised the technical
              capability that the work always required.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "60px 48px",
          paddingTop: 60,
          borderTop: "1px solid var(--rule)",
        }}>
          {stats.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div>
                <div style={{
                  fontFamily: "var(--display)",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 8.8vw, 144px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                }}>
                  {s.n}
                  {i === 0 && marks && (
                    <span style={{
                      width: 24, height: 24, display: "inline-block", color: "var(--accent)", marginLeft: 4, marginBottom: 8,
                    }}>
                      <MarkAsterisk style={{ width: "100%", height: "100%" }} />
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: "var(--body)",
                  fontSize: 15,
                  color: "var(--ink-soft)",
                  marginTop: 12,
                  letterSpacing: "-0.005em",
                  textWrap: "balance",
                  lineHeight: 1.4,
                  maxWidth: 240,
                }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Section: Final CTA — sculptural, no card
// ─────────────────────────────────────────────────────────────────────
const FinalCTA = ({ marks }) => (
  <section id="contact" style={{ padding: "200px 48px 160px", position: "relative" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <SectionLabel num="07" label="Let's talk" />
      <Reveal>
        <h2 style={{
          fontFamily: "var(--display)",
          fontWeight: 400,
          fontSize: "clamp(56px, 10vw, 168px)",
          lineHeight: 0.94,
          letterSpacing: "-0.035em",
          color: "var(--ink)",
          margin: 0,
          textWrap: "balance",
        }}>
          A conversation.<br />
          <span style={{ color: "var(--ink-soft)" }}>Not a sales pitch.</span>
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, marginTop: 80, alignItems: "end" }}>
        <Reveal delay={100}>
          <p style={{
            ...bodyP,
            fontSize: 21,
            maxWidth: 640,
          }}>
            Thirty minutes, on Zoom or in person if you're in Tauranga. I'll ask about
            your context, your constraints, and what's actually keeping you up at night.
            I'll tell you honestly whether I'm the right person to help. If I'm not,
            I'll tell you who probably is.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
            <a href="mailto:nathaniel@nathanielbaldock.com" style={{
              ...ctaPrimaryStyle,
              fontSize: 17,
              padding: "18px 32px",
              backgroundColor: "var(--accent)",
              borderColor: "var(--accent)",
              color: "var(--bg)",
            }}>
              Book a free 30-min call →
            </a>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              color: "var(--ink-soft)",
              letterSpacing: "0.1em",
            }}>
              Or just email: <span style={{ color: "var(--ink)" }}>nathaniel@nathanielbaldock.com</span>
            </div>
            {marks && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10, color: "var(--accent)", marginTop: 8,
              }}>
                <span style={{ width: 36, height: 36, display: "inline-block", transform: "rotate(180deg)" }}>
                  <MarkArrow style={{ width: "100%", height: "100%" }} />
                </span>
                <span style={{ fontFamily: `"Caveat", cursive`, fontSize: 24 }}>
                  I reply within 48 hours, always
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    padding: "60px 48px 40px",
    borderTop: "1px solid var(--rule)",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
  }}>
    <div style={{
      maxWidth: 1280,
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 24,
      flexWrap: "wrap",
    }}>
      <div>© 2026 · Nathaniel Baldock · Tauranga, Aotearoa</div>
      <div style={{ display: "flex", gap: 24 }}>
        <a href="#" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>LinkedIn</a>
        <a href="#" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>Privacy</a>
        <a href="#" style={{ color: "var(--ink-soft)", textDecoration: "none" }}>Terms</a>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────
// Tweaks panel
// ─────────────────────────────────────────────────────────────────────
const Panel = ({ t, setTweak }) => {
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Substrate">
        <TweakRadio
          label="Mode"
          value={t.mode}
          options={[
            { value: "paper",  label: "Paper"  },
            { value: "ink",    label: "Ink"    },
            { value: "bleach", label: "Bleach" },
          ]}
          onChange={(v) => setTweak("mode", v)}
        />
      </TweakSection>
      <TweakSection title="Accent">
        <TweakRadio
          label="Color"
          value={t.accent}
          options={[
            { value: "amber", label: "Amber" },
            { value: "teal",  label: "Teal"  },
            { value: "navy",  label: "Navy"  },
          ]}
          onChange={(v) => setTweak("accent", v)}
        />
      </TweakSection>
      <TweakSection title="Type">
        <TweakRadio
          label="Display"
          value={t.displayFont}
          options={[
            { value: "newsreader", label: "Newsreader" },
            { value: "instrument", label: "Instrument" },
            { value: "plex",       label: "Plex Sans"  },
          ]}
          onChange={(v) => setTweak("displayFont", v)}
        />
      </TweakSection>
      <TweakSection title="Handwork">
        <TweakToggle
          label="Hand-drawn marks"
          value={t.marks}
          onChange={(v) => setTweak("marks", v)}
        />
        <TweakToggle
          label="Live AI dialogue"
          value={t.showAIPanel}
          onChange={(v) => setTweak("showAIPanel", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────
const App = () => {
  const { useTweaks } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const mode = MODES[t.mode] || MODES.paper;
  const accent = ACCENTS[t.accent] || ACCENTS.amber;

  const cssVars = {
    "--bg":        mode.bg,
    "--bg-raised": mode.bgRaised,
    "--ink":       mode.ink,
    "--ink-soft":  mode.inkSoft,
    "--rule":      mode.rule,
    "--accent":    accent.hex,
    "--accent-soft": accent.soft,
    "--display":   DISPLAY_FONTS[t.displayFont],
    "--body":      `"IBM Plex Sans", "Inter", system-ui, sans-serif`,
    "--mono":      `"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace`,
    backgroundColor: "var(--bg)",
    color: "var(--ink)",
    minHeight: "100vh",
    position: "relative",
  };

  return (
    <div style={cssVars}>
      {/* paper grain overlay */}
      <div aria-hidden="true" style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
        mixBlendMode: t.mode === "ink" ? "screen" : "multiply",
        opacity: mode.grainOpacity,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }} />

      <Header accent={accent} />
      <Hero marks={t.marks} showAI={t.showAIPanel} />
      <ProblemPullQuote marks={t.marks} />
      <Difference marks={t.marks} />
      <ServicesList accent={accent} />
      <Portfolio marks={t.marks} />
      <Values marks={t.marks} />
      <About marks={t.marks} />
      <FinalCTA marks={t.marks} />
      <Footer />

      <Panel t={t} setTweak={setTweak} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
