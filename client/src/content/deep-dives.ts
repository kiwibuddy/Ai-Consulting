export interface DeepDiveItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  date: string;
  category?: string;
}

export const deepDives: DeepDiveItem[] = [
  {
    id: "protecting-kids-from-the-digital-god",
    title: "Protecting Kids From the Digital God",
    description:
      "A deep-dive conversation on parenting, formation, and practical boundaries for children growing up in an AI-saturated and screen-shaped culture.",
    url: "/audio/deep-dives/protecting-kids-from-the-digital-god.html",
    date: "2026-03-25",
    category: "Family & Tech",
    duration: "33 min",
  },
  {
    id: "the-intimacy-trap-and-junior-job-crisis",
    title: "The Intimacy Trap and Junior Job Crisis",
    description:
      "A discussion on how AI can imitate connection while weakening real relationships, and how automation pressures early-career roles and pathways.",
    url: "/audio/deep-dives/the-intimacy-trap-and-junior-job-crisis.html",
    date: "2026-03-25",
    category: "Work & Culture",
    duration: "13 min",
  },
];
