// Hand-drawn SVG marks. Each is a single wobbly path — pen-and-ink feel.
// Stroke color inherits from currentColor so it can be themed.

const MarkUnderline = ({ className = "", style = {}, seed = 0 }) => {
  // Two slightly offset paths for a "second pass" pen feel.
  const paths = [
    "M 4 14 C 80 6, 200 18, 320 10 S 540 16, 596 12",
    "M 8 18 C 90 10, 210 20, 326 14 S 538 19, 590 16",
  ];
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 600 24"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={paths[seed % 2]} opacity="0.92" />
      {seed % 2 === 0 && <path d={paths[1]} opacity="0.35" strokeWidth="2" />}
    </svg>
  );
};

const MarkCircle = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 220 80"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path
      d="M 18 42 C 14 18, 80 6, 130 6 C 188 6, 210 30, 206 48 C 200 70, 130 76, 78 72 C 30 68, 8 56, 18 36"
      opacity="0.85"
    />
  </svg>
);

const MarkStrike = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 400 20"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M 6 14 C 100 8, 200 12, 394 6" opacity="0.9" />
  </svg>
);

const MarkArrow = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 120 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M 6 14 C 30 36, 60 56, 96 68" />
    <path d="M 96 68 L 80 60" />
    <path d="M 96 68 L 90 50" />
  </svg>
);

const MarkCheck = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 60 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M 8 32 C 14 36, 20 42, 26 50 C 32 36, 42 18, 56 8" />
  </svg>
);

// A "scribble" emphasis under a number/title — slashy hatch
const MarkScribble = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 140 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M 6 32 L 24 8 M 22 34 L 44 10 M 40 32 L 62 8 M 58 34 L 80 10 M 76 32 L 98 8 M 94 34 L 116 10 M 112 32 L 132 14" opacity="0.7" />
  </svg>
);

// Decorative star/asterisk
const MarkAsterisk = ({ className = "", style = {} }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M 20 4 L 20 36 M 6 20 L 34 20 M 9 9 L 31 31 M 31 9 L 9 31" />
  </svg>
);

Object.assign(window, {
  MarkUnderline,
  MarkCircle,
  MarkStrike,
  MarkArrow,
  MarkCheck,
  MarkScribble,
  MarkAsterisk,
});
