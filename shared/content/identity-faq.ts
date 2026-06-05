/** Identity FAQs for AI discovery — "Who is Nathaniel Baldock?" style queries. */
export interface IdentityFaqItem {
  question: string;
  answer: string;
}

export const identityFaqs: IdentityFaqItem[] = [
  {
    question: "What does Nathaniel Baldock do?",
    answer:
      "Nathaniel Baldock is an AI strategist, consultant, speaker, and educator based in Tauranga, New Zealand. He helps churches, schools, and mission-driven organisations navigate AI with strategy, training, policy, and practical implementation.",
  },
  {
    question: "Where is Nathaniel Baldock based?",
    answer:
      "Nathaniel Baldock is based in Tauranga, Bay of Plenty, New Zealand. He serves organisations across New Zealand in person and consults globally via video.",
  },
  {
    question: "What is Nathaniel Baldock's background?",
    answer:
      "Nathaniel spent 23 years in global missions with Youth With A Mission, working in 35+ countries. He directed training schools, led teams in Papua New Guinea, co-led biblical research with 200+ researchers across 50 nations, and built digital products including the SourceView Bible app and a coaching portal.",
  },
  {
    question: "Does Nathaniel Baldock provide AI training and consulting?",
    answer:
      "Yes. Nathaniel offers AI consulting, staff training, keynote speaking, workshops, and a free AI Use Audit tool. Engagements include churches, Christian schools, nonprofits, SMEs, and mission organisations.",
  },
  {
    question: "How do I book Nathaniel Baldock?",
    answer:
      "Book a free 30-minute consultation at nathanielbaldock.com/intake, email nathanielbaldock@gmail.com, or use the speaking inquiry form at nathanielbaldock.com/speaking/invite for events.",
  },
];

export function buildIdentityFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: identityFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
