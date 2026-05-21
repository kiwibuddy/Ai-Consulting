import { SITE_CONTACT_EMAIL } from "@shared/constants";

export const speakingHero = {
  eyebrow: "Speaking & Workshops",
  titleLine1: "Keynotes & workshops",
  titleLine2: "on faith, AI &",
  titleAccent: "discipleship",
  /** Single hero line — homepage-style; fuller bio lives in speakingAbout below the fold */
  subtitle:
    "Workshops on faith, discipleship, worldview, AI, and practical guardrails for churches, schools, and businesses. A free 30-minute call is the easiest way to match topic and format to your audience.",
  heroCtaLabel: "Book a free 30-min call",
  availableFor:
    "Keynotes · Seminars · Workshops · Multi-Session Courses · Church Services · School Assemblies · Leadership Retreats · Tauranga SME programmes",
};

export const speakingBooking = {
  heading: "Interested in a keynote or workshop?",
  body: "Whether you're planning a conference, leadership retreat, parent seminar, or Sunday morning series, we can explore whether the topic and format fit your audience.",
  availability:
    "Taking a limited number of engagements while building the practice (in-person and virtual options available).",
  ctaHeading: "Schedule a discovery conversation",
  ctaBody:
    "The best way to start is with a brief conversation to understand your needs, audience, and goals. From there we can choose the right format and tailor content to your context.",
  whatToExpect: [
    "30-minute video call to discuss your event",
    "Review of audience demographics and desired outcomes",
    "Format and content recommendations",
    "Transparent pricing and logistics discussion",
    "No obligation — just exploring if it's a good fit",
  ],
  email: SITE_CONTACT_EMAIL,
  /** Subject for mailto: links so you can filter/label these in Gmail */
  mailtoSubject: "Speaking / Consulting inquiry - nathanielbaldock.com",
};

export const speakingAbout = {
  blurb:
    "Nathaniel Baldock is building an AI consulting and speaking practice for faith-based organisations at the intersection of technology, theology, and purpose. He brings 23 years in global missions and NGO work — including leading intensive training programmes (400+ leaders as a YWAM course leader) across 15+ nations — and builds digital tools for churches and nonprofits. He lives in Tauranga, New Zealand, with his wife Alicia and their three children.",
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const speakingFaqs: FAQItem[] = [
  {
    question: "Does Nathaniel travel internationally?",
    answer:
      "Yes. Based in New Zealand but available globally. Virtual presentations are also available for organizations with budget or scheduling constraints.",
  },
  {
    question: "Can topics be combined or customized?",
    answer: "Absolutely. Most engagements blend elements from multiple topics to serve your specific audience and objectives.",
  },
  {
    question: "What size audiences can sessions work for?",
    answer:
      "From intimate leadership teams (10–15) to church services (200+) to conferences (500+). Content scales effectively across audience sizes.",
  },
  {
    question: "Are materials provided for participants?",
    answer:
      "Yes. Digital resources including slides, reading lists, and practical exercises. Printed workbooks available for workshops and courses.",
  },
  {
    question: "Can we record the session?",
    answer: "Yes, for internal use. Commercial distribution requires a separate licensing agreement.",
  },
];
