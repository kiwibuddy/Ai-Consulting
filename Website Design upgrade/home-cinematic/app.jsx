// ─── Root App + Tweaks + render ─────────────────────────────────────────
// All identifiers below are already in scope from helpers.jsx + sections.jsx
// + tweaks-panel.jsx (concatenated above us in the bundled HTML).

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "lime",
  "showAIPanel": true,
  "density": "regular",
  "showAudienceImages": true
}/*EDITMODE-END*/;

const ACCENTS = {
  lime:   { main: TESORO.greenBright, soft: TESORO.green,      label: "Lime"  },
  green:  { main: TESORO.green,        soft: TESORO.greenBright, label: "Green" },
  gold:   { main: TESORO.gold,         soft: "#F8C24A",          label: "Gold"  },
};

const DENSITY = {
  compact:  { scale: 0.85, label: "Compact"  },
  regular:  { scale: 1.0,  label: "Regular"  },
  spacious: { scale: 1.15, label: "Spacious" },
};

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = ACCENTS[t.accent] || ACCENTS.lime;
  const density = DENSITY[t.density] || DENSITY.regular;

  // CSS variables drive ALL styling — tweaks live-update without React re-mounting
  // any section. Density is applied via a multiplier on a custom property.
  const cssVars = {
    "--bg":          TESORO.ink,
    "--bg-raised":   "#16181D",
    "--bg-panel":    "rgba(255,255,255,0.04)",
    "--ink":         "#F4EFE2",
    "--ink-soft":    "rgba(244,239,226,0.66)",
    "--ink-dim":     "rgba(244,239,226,0.40)",
    "--rule":        "rgba(244,239,226,0.14)",
    "--rule-strong": "rgba(244,239,226,0.24)",
    "--accent":      accent.main,
    "--accent-soft": accent.soft,
    "--density":     density.scale,
  };

  return (
    <div style={{
      ...cssVars,
      background: "var(--bg)",
      color: "var(--ink)",
      minHeight: "100vh",
      fontFamily: `"Inter", system-ui, sans-serif`,
    }}>
      <Header />
      <Hero showAI={t.showAIPanel} />
      <Approach />
      <HowIHelp />
      <Audiences showImages={t.showAudienceImages} />
      <WhyMe />
      <LatestSection />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent color">
          <TweakColor
            label="Accent"
            value={accent.main}
            options={[
              [TESORO.greenBright, TESORO.green],
              [TESORO.green, TESORO.greenBright],
              [TESORO.gold, "#F8C24A"],
            ]}
            onChange={(palette) => {
              const main = Array.isArray(palette) ? palette[0] : palette;
              const key = main === TESORO.green ? "green" : main === TESORO.gold ? "gold" : "lime";
              setTweak("accent", key);
            }}
          />
        </TweakSection>
        <TweakSection label="Density">
          <TweakRadio
            label="Spacing"
            value={t.density}
            options={[
              { value: "compact",  label: "Compact"  },
              { value: "regular",  label: "Regular"  },
              { value: "spacious", label: "Spacious" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection label="Elements">
          <TweakToggle
            label="Live AI panel in hero"
            value={t.showAIPanel}
            onChange={(v) => setTweak("showAIPanel", v)}
          />
          <TweakToggle
            label="Audience photos"
            value={t.showAudienceImages}
            onChange={(v) => setTweak("showAudienceImages", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
