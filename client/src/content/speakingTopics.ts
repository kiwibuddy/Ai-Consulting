export interface SpeakingTopic {
  id: string;
  title: string;
  description: string;
  formats: string[];
  forAudience: string;
  outlineUrl?: string;
}

export const speakingTopics: SpeakingTopic[] = [
  {
    id: "being-fully-human",
    title: "Being Fully Human in an AI World",
    description:
      "The flagship 4-module course for the AI age. In an era where AI promises abundance without purpose, this series offers a biblical framework for identity, work, and calling. Four modules: The Great Deception; Identity, Purpose & Work; Raising Co-Creators; The Church's Response.",
    formats: ["4-week course", "Weekend intensive", "2-hour seminar", "60-min keynote"],
    forAudience: "Church leadership teams, parents, educators, ministry staff, faith-based organizations",
    // Add PDF to client/public/outlines/being-fully-human.pdf to enable "View outline" link
    outlineUrl: "/outlines/being-fully-human.pdf",
  },
  {
    id: "spheres-worldview",
    title: "The Spheres Worldview: Co-Creating with God in Every Dimension",
    description:
      "Overcoming the sacred-secular divide that leaves 90% of life 'unspiritual.' This teaching unveils the 7 spheres of society and how every domain—from the kitchen to the boardroom—is sacred space for co-creation with God. Real stories and practical application.",
    formats: ["Full-day workshop", "90-min seminar", "Sunday series (3–4 weeks)", "Leadership retreat"],
    forAudience: "Church congregations, ministry leaders, businesspeople, artists, educators, parents",
    outlineUrl: undefined,
  },
  {
    id: "raising-co-creators",
    title: "Raising Co-Creators: Parenting for Purpose in the AI Age",
    description:
      "Helping children build identity rooted in who they are, not what they produce. As AI makes economic utility obsolete, this session equips parents to raise children anchored in sonship with God—teaching them to hear His voice and find purpose AI can never replace.",
    formats: ["90-min parent seminar", "Half-day workshop", "Marriage/family retreat", "School parent evening"],
    forAudience: "Parents, grandparents, youth workers, Christian school educators",
    outlineUrl: undefined,
  },
  {
    id: "two-roads-converging",
    title: "The Two Roads Converging: Why the Church Must Act Now",
    description:
      "Why the church must act now. Secular AI promises abundance with no answer to 'Why do I exist?'; the church's sacred-secular divide devalues 90% of life. This message reveals how both roads lead to purposelessness and presents the Kingdom alternative.",
    formats: ["Keynote (45–60 min)", "90-min seminar with Q&A", "Sunday morning", "Leadership presentation"],
    forAudience: "Pastors, church boards, denominational leadership, Christian conferences",
    outlineUrl: undefined,
  },
  {
    id: "ai-strategy-faith",
    title: "AI Strategy for Faith-Based Organizations",
    description:
      "Adopting AI responsibly while staying rooted in biblical values. A theological framework and strategic roadmap: use cases for ministry and discipleship, clear boundaries, case studies from churches and nonprofits, and an implementation roadmap tailored to your organization.",
    formats: ["Half-day leadership workshop", "Board consultation (2–3 hrs)", "Staff training day", "Ongoing consultation"],
    forAudience: "Ministry executives, church staff, nonprofit leaders, Christian school administrators, missions agencies",
    outlineUrl: undefined,
  },
  {
    id: "custom",
    title: "Custom Topics: Tailored to Your Audience",
    description:
      "Presentations tailored to your organization's unique challenges at the intersection of faith, technology, and purpose. Recent custom topics include Kingdom economics in an AI world, the Celebration sphere in action, and from consumer Christianity to co-creator discipleship.",
    formats: ["Keynote", "Seminar", "Workshop", "Conference or retreat"],
    forAudience: "Conferences, retreats, special events with specific themes",
    outlineUrl: undefined,
  },
];

export interface SpeakingFormat {
  name: string;
  duration: string;
  description: string;
}

export const speakingFormats: SpeakingFormat[] = [
  {
    name: "Keynote",
    duration: "45–60 min",
    description: "High-impact overview for conferences, large gatherings, or Sunday morning services. Key insights and stories, with optional Q&A.",
  },
  {
    name: "Seminar",
    duration: "90 min – 2 hours",
    description: "Deep dive with teaching, interaction, and practical application. Ideal for evening events, leadership meetings, or conference breakouts.",
  },
  {
    name: "Workshop",
    duration: "Half-day or full-day",
    description: "Immersive experience with teaching, group exercises, case studies, and personal application. Participants leave with actionable tools.",
  },
  {
    name: "Multi-Session Course",
    duration: "4–8 weeks",
    description: "Comprehensive training over multiple sessions for deeper transformation, community discussion, and implementation between meetings.",
  },
  {
    name: "Retreat Component",
    duration: "Flexible",
    description: "Integration into weekend or week-long retreats, combining sessions with reflection, worship, and community.",
  },
  {
    name: "School Assembly or Chapel",
    duration: "Age-appropriate",
    description: "Presentations for Christian schools (middle school through university) on purpose in a rapidly changing world.",
  },
];
