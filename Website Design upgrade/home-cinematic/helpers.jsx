// ─── Helpers and primitives for the Cinematic Hybrid home page ──────────────

const { useState, useEffect, useRef, useLayoutEffect } = React;

// Tesoro brand tokens — extracted from client/src/index.css
const TESORO = {
  green:       "#11C25C",
  greenBright: "#7CCC1E",
  gold:        "#FCA10A",
  ink:         "#0F1014",
  inkSoft:     "#16181D",
  cream:       "#F4EFE2",
};

const CTA_GRADIENT = `linear-gradient(135deg, ${TESORO.green}, ${TESORO.greenBright})`;

// Theme object — themed via tweaks. All section components read from CSS vars
// declared on the root element so tweaks live-update without re-render.
const PALETTE = {
  bg:        TESORO.ink,
  bgRaised:  TESORO.inkSoft,
  bgPanel:   "rgba(255,255,255,0.04)",
  ink:       TESORO.cream,
  inkSoft:   "rgba(244,239,226,0.65)",
  inkDim:    "rgba(244,239,226,0.40)",
  rule:      "rgba(244,239,226,0.14)",
  ruleStrong:"rgba(244,239,226,0.24)",
  accent:    TESORO.greenBright,
  accent2:   TESORO.green,
  accentDim: "rgba(124,204,30,0.16)",
};

const FONT = {
  display: `"Newsreader", "Source Serif Pro", Georgia, serif`,
  italic:  `"Instrument Serif", "Newsreader", Georgia, serif`,
  body:    `"Inter", system-ui, sans-serif`,
  mono:    `"IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace`,
};

// ─── Scroll-reveal hook ────────────────────────────────────────────────
// Returns [ref, shown] — flips shown to true the first time the element
// is in (or scrolls into) view. Above-the-fold elements get triggered
// synchronously on next frame so the CSS transition still runs from
// opacity:0 → 1 — IntersectionObserver alone won't fire if the page
// scrolls before the observer registers.
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Already in viewport — animate in immediately on next frame.
    if (r.top < window.innerHeight && r.bottom > 0) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, distance = 18, as: Tag = "div", style = {}, ...rest }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ─── Live AI dialogue panel ────────────────────────────────────────────
// A "show, don't tell" signature element. Cycles through realistic consulting
// Q&A pairs, types each one out, demonstrates AI without leaning on clichés.
const DIALOGUE = [
  { q: "Can AI write our donor newsletter?",     a: "It can. The harder question is what makes you worth writing about in the first place." },
  { q: "Should we let students use ChatGPT?",    a: "Yes — with three guardrails. Let's talk through them before you draft a policy." },
  { q: "How do we grade essays faster with AI?", a: "First: what is grading actually for? If it's feedback, AI helps. If it's judgment, slow down." },
  { q: "Which AI tools should we buy?",          a: "Probably fewer than you think. Start with one workflow. Get it right. Then expand." },
];

const useTyper = (text, speed = 22) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
};

const Caret = ({ color = "currentColor" }) => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: "0.45ch",
      height: "1em",
      background: color,
      marginLeft: 2,
      verticalAlign: "-3px",
      animation: "nb-blink 1s steps(2) infinite",
    }}
  />
);

const LiveAIPanel = ({ compact = false, label = "Live · A typical conversation" }) => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("q");

  useEffect(() => {
    let t;
    const cur = DIALOGUE[idx];
    if (phase === "q")
      t = setTimeout(() => setPhase("a"), cur.q.length * 26 + 600);
    else if (phase === "a")
      t = setTimeout(() => setPhase("hold"), cur.a.length * 20 + 1800);
    else
      t = setTimeout(() => { setIdx((i) => (i + 1) % DIALOGUE.length); setPhase("q"); }, 700);
    return () => clearTimeout(t);
  }, [idx, phase]);

  const cur = DIALOGUE[idx];
  const qText = useTyper(cur.q, 26);
  const aText = useTyper(phase === "a" || phase === "hold" ? cur.a : "", 20);

  return (
    <div style={{
      position: "relative",
      background: "var(--bg-panel)",
      border: "1px solid var(--rule-strong)",
      borderRadius: 6,
      padding: compact ? "20px 22px 22px" : "24px 26px 28px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}>
      {/* Corner label */}
      <div style={{
        position: "absolute", top: -10, left: 18,
        background: "var(--bg-raised)",
        padding: "2px 10px",
        fontFamily: FONT.mono, fontSize: 10,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "var(--ink-soft)",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          display: "inline-block", width: 7, height: 7, borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent)",
        }} />
        {label}
      </div>

      {/* Q */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 4 }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 11, marginTop: 6, color: "var(--accent)", letterSpacing: "0.1em" }}>Q.</span>
        <div style={{ fontFamily: FONT.mono, fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", minHeight: "1.55em" }}>
          {qText}
          {phase === "q" && qText.length < cur.q.length && <Caret color="var(--ink-soft)" />}
        </div>
      </div>

      {/* A */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 14 }}>
        <span style={{ fontFamily: FONT.mono, fontSize: 11, marginTop: 9, color: "var(--ink)", letterSpacing: "0.1em" }}>A.</span>
        <div style={{
          fontFamily: FONT.display, fontStyle: "italic", fontWeight: 400,
          fontSize: 19, lineHeight: 1.4, color: "var(--ink)",
          letterSpacing: "-0.01em", minHeight: "1.4em",
        }}>
          {aText}
          {(phase === "a" || phase === "hold") && aText.length < cur.a.length && <Caret color="var(--ink)" />}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 5, marginTop: 20 }}>
        {DIALOGUE.map((_, i) => (
          <span key={i} style={{
            width: i === idx ? 22 : 6, height: 2,
            background: i === idx ? "var(--accent)" : "var(--rule-strong)",
            transition: "width 280ms ease, background-color 280ms ease",
          }} />
        ))}
      </div>
    </div>
  );
};

// ─── Section label (mono eyebrow used throughout) ──────────────────────
const SectionLabel = ({ num, children }) => (
  <Reveal>
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 56,
      fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
      color: "var(--ink-soft)",
    }}>
      <span style={{ color: "var(--accent)" }}>—</span>
      <span style={{ color: "var(--accent)" }}>{num}</span>
      <span>{children}</span>
    </div>
  </Reveal>
);

// ─── Buttons ────────────────────────────────────────────────────────────
const CTAPrimary = ({ children, href = "#contact", subtle = false, fullWidth = false }) => (
  <a href={href} style={{
    background: subtle ? "transparent" : CTA_GRADIENT,
    border: subtle ? "1px solid var(--rule-strong)" : "none",
    color: "white",
    padding: "16px 26px",
    borderRadius: 10,
    fontSize: 14.5,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    justifyContent: fullWidth ? "center" : "flex-start",
    width: fullWidth ? "100%" : "auto",
    boxShadow: subtle ? "none" : "0 16px 40px color-mix(in srgb, var(--accent) 25%, transparent)",
    transition: "transform 200ms ease, box-shadow 200ms ease, filter 200ms ease",
  }}
  onMouseOver={(e) => { if (!subtle) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.05)"; } }}
  onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}
  >
    {children}
    <span style={{ display: "inline-block", transition: "transform 200ms ease" }}>→</span>
  </a>
);

const CTASecondary = ({ children, href = "#" }) => (
  <a href={href} style={{
    color: "var(--ink)",
    fontSize: 14, fontWeight: 500,
    textDecoration: "none",
    borderBottom: "1px solid var(--ink-soft)",
    paddingBottom: 2,
    letterSpacing: "-0.005em",
    transition: "border-color 200ms ease",
  }}
  onMouseOver={(e) => e.currentTarget.style.borderBottomColor = "var(--accent)"}
  onMouseOut={(e) => e.currentTarget.style.borderBottomColor = "var(--ink-soft)"}
  >
    {children}
  </a>
);

Object.assign(window, {
  TESORO, PALETTE, FONT, CTA_GRADIENT,
  useReveal, Reveal, useTyper, Caret,
  LiveAIPanel, SectionLabel,
  CTAPrimary, CTASecondary, DIALOGUE,
});
