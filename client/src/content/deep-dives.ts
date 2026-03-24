export interface DeepDiveItem {
  id: string;
  title: string;
  description: string;
  /** Public route users should open/share. */
  url: string;
  /** Under /public, loaded into an iframe by the shareable worksheet page. */
  iframeSrc: string;
  /** Optional social card image for SEO/share previews. */
  shareImage?: string;
  thumbnail?: string;
  duration?: string;
  date: string;
  category?: string;
}

export const deepDives: DeepDiveItem[] = [
  {
    id: "the-digital-god-in-your-childs-pocket",
    title: "The Digital God in Your Child's Pocket",
    description:
      "AI, your children, and the battle for their hearts, minds, and souls — practical discipleship guidance for Christian parents in an AI-shaped world.",
    url: "/resources/worksheet/the-digital-god-in-your-childs-pocket",
    iframeSrc: "/audio/deep-dives/protecting-kids-from-the-digital-god.html",
    shareImage: "/images/deep-dives/digital-god-card.svg",
    thumbnail: "/images/deep-dives/digital-god-card.svg",
    date: "2026-03-25",
    category: "Family & Tech",
    duration: "33 min",
  },
  {
    id: "the-broken-ladder-and-the-race-for-their-soul",
    title: "The Broken Ladder & the Race for Their Soul",
    description:
      "How AI is reshaping your child's future, relationships, and sense of reality — from broken career ladders to the intimacy trap and faithful family response.",
    url: "/resources/worksheet/the-broken-ladder-and-the-race-for-their-soul",
    iframeSrc: "/audio/deep-dives/the-intimacy-trap-and-junior-job-crisis.html",
    shareImage: "/images/deep-dives/intimacy-trap-card.svg",
    thumbnail: "/images/deep-dives/intimacy-trap-card.svg",
    date: "2026-03-25",
    category: "Work & Culture",
    duration: "13 min",
  },
];

export function getDeepDiveById(id: string | undefined): DeepDiveItem | undefined {
  if (!id) return undefined;
  return deepDives.find((dive) => dive.id === id);
}
