export const speakingHero = {
  title: "Equipping the Church for the AI Age",
  intro:
    "Nathaniel brings 20+ years of global missions leadership and cutting-edge AI expertise to help Christian leaders, parents, and organizations navigate the most significant cultural shift of our generation. Through biblical foundations and practical wisdom, he equips audiences to move from confusion to clarity—helping people discover their God-given purpose in a world where AI is redefining what it means to be human.",
  availableFor:
    "Keynotes · Seminars · Workshops · Multi-Session Courses · Church Services · School Assemblies · Leadership Retreats",
};

export interface Testimonial {
  quote: string;
  attribution: string;
}

export const speakingTestimonials: Testimonial[] = [
  {
    quote:
      "Nathaniel's teaching on identity and work completely transformed how I see my role as a teacher. For the first time, I understand that what I do in the classroom is sacred co-creation with God—not just a way to support 'real' ministry.",
    attribution: "Sarah K., Christian School Teacher",
  },
  {
    quote:
      "The Spheres Worldview framework gave our leadership team a common language for discipleship. We've stopped treating business leaders as just donors and started equipping them as kingdom builders in the Economics sphere.",
    attribution: "Pastor Mike Chen, Lead Pastor",
  },
  {
    quote:
      "This was the most important parenting seminar we've ever hosted. Parents left with both urgency and hope—understanding the AI crisis our kids face and equipped with practical tools to build their identity in Christ.",
    attribution: "Jennifer M., Family Ministry Director",
  },
];

export const speakingBooking = {
  heading: "Bring These Insights to Your Organization",
  body: "Whether you're planning a conference, leadership retreat, parent seminar, or Sunday morning series, Nathaniel brings depth, biblical foundation, and practical wisdom that resonates with diverse audiences.",
  availability: "Current availability: 2–4 engagements per month (in-person and virtual options available).",
  ctaHeading: "Schedule a Discovery Conversation",
  ctaBody:
    "The best way to start is with a brief conversation to understand your needs, audience, and goals. Nathaniel will help you choose the right format and customize content for maximum impact.",
  whatToExpect: [
    "30-minute video call to discuss your event",
    "Review of audience demographics and desired outcomes",
    "Format and content recommendations",
    "Transparent pricing and logistics discussion",
    "No obligation—just exploring if it's a good fit",
  ],
  email: "speaking@nathanielbaldock.com",
};

export const speakingAbout = {
  blurb:
    "Nathaniel Baldock is an AI consultant, speaker, and strategist specializing in faith-based organizations at the intersection of technology, theology, and purpose. With 20+ years of global missions leadership (including training 400+ leaders across 15+ countries with YWAM), technical experience building platforms for churches and nonprofits, and deep expertise in AI capabilities and limitations, he bridges technical knowledge with biblical foundations. He lives in Tauranga, New Zealand, with his wife Alicia and their three children.",
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
    question: "What size audiences does Nathaniel typically speak to?",
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
