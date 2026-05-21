import { Variants } from "framer-motion";

// Fade up animation for sections and cards
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Stagger container for child animations
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item for use within stagger containers
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Scale up animation for cards on hover
export const scaleUpVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Floating animation for icons/decorative elements
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Subtle pulse animation
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Hero text reveal animation
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Viewport settings for scroll-triggered animations
export const scrollViewport = {
  once: true,
  margin: "-100px",
  amount: 0.2 as const,
};

// Transition presets
export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
};

// ——— Cinematic / editorial: smoother eases and reveal animations ———

/** Smooth deceleration at end */
export const cinematicEase = [0.22, 1, 0.36, 1] as const;
/** @deprecated Use cinematicEase */
export const tesoroEase = cinematicEase;
export const cinematicTransition = { duration: 0.6, ease: cinematicEase };
export const tesoroTransition = cinematicTransition;
export const cinematicTransitionLong = { duration: 0.85, ease: cinematicEase };
export const tesoroTransitionLong = cinematicTransitionLong;

/** Horizontal slide for audience carousel (custom = direction: 1 | -1) */
export const audienceSlideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 48,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: cinematicEase },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -48,
    transition: { duration: 0.5, ease: cinematicEase },
  }),
};

/** Section headline / big text: fade up with more travel and longer duration */
export const fadeUpRevealVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: cinematicEase },
  },
};

/** Stagger with longer delays for cards (Tesoro card entrances) */
export const staggerRevealContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

/** Card/item that slides up and fades in (for grids) */
export const staggerRevealItemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

/** Tesoro-style: cards slide up into place on scroll (larger y, clear stagger) */
export const cardSlideUpContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const cardSlideUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: cinematicEase },
  },
};

/** Line or block of text that reveals with slight delay (for multi-line copy) */
export const lineRevealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: cinematicEase },
  }),
};

/** In-viewport trigger: fire when element enters; reverse when scrolling back up (premium feel) */
export const landingViewportReveal = {
  once: false,
  margin: "0px 0px -80px 0px",
  amount: 0.05,
};

/** Trigger earlier (e.g. for "Who this is for" blocks so images don’t feel late) */
export const earlyViewportReveal = {
  once: false,
  margin: "0px 0px 180px 0px",
  amount: 0.02,
};
