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
    id: "discernment-age",
    title: "Welcome to the Discernment Age",
    description:
      "The signature keynote. AI can now produce words, images, and advice that sound right, so the scarce skill is telling real from plausible. This talk names the moment we are in and gives leaders a working framework for it. Delivered as biblical theology for churches, as practical leadership for businesses, and as formation for school communities.",
    formats: ["Keynote (45–60 min)", "20-min conference short", "90-min seminar with Q&A", "Sunday morning"],
    forAudience: "Conferences, churches, business events, school communities - adapted to the room",
  },
  {
    id: "ai-in-your-organisation",
    title: "Where Is AI Already in Your Organisation?",
    description:
      "The audit talk. Staff and volunteers are already using AI, usually on personal accounts, usually with no policy. This session walks leaders through the three questions to ask of every tool, the most common ways organisations get it wrong, and the fixes that take one setting change. Ends with a live run of the free ten-minute audit.",
    formats: ["Leadership briefing (60 min)", "Board session", "Staff training (90 min)"],
    forAudience: "Owners, boards, principals, pastors, operations leads",
  },
  {
    id: "sacred-tasks",
    title: "Sacred Tasks: What to Automate, What to Protect",
    description:
      "A hands-on workshop. Participants inventory their week and run every task through three questions: does this need a human, does it need this human, and is the struggle itself part of the point? Everyone leaves with a sorted list - what to automate, what to augment, and the handful of tasks worth protecting because doing them is the job.",
    formats: ["Half-day workshop", "90-min team session", "Staff training day"],
    forAudience: "SME teams, professionals, church staff (workplace and ministry editions)",
  },
  {
    id: "ladder-breaks",
    title: "Calling When the Ladder Breaks",
    description:
      "AI is removing many of the entry-level rungs people used to climb. This talk is for the person on the broken rung and for the leaders and parents around them: what work is for, what to build when the old path is gone, and how identity survives a labour market that keeps moving.",
    formats: ["Keynote (45–60 min)", "Church seminar (90 min)", "Parents' evening"],
    forAudience: "Churches, marketplace groups, parents of school leavers, young adults",
  },
  {
    id: "teaching-discernment-age",
    title: "Teaching for the Discernment Age",
    description:
      "Professional development for teachers. A shared framework for when AI helps learning and when it hollows it out, the VERIFY method for checking AI claims, and classroom-ready practices for assessment integrity. Comes with facilitator materials and a participant workbook.",
    formats: ["Twilight session (90 min)", "Half-day PD", "Full PD day"],
    forAudience: "Principals, teachers, IT leads, chaplaincy teams",
  },
  {
    id: "who-are-you",
    title: "Who Are You Before AI Tells You?",
    description:
      "A direct talk for students aged 13 to 18. What AI companions and algorithmic feeds are engineered to do, why an identity built on output is fragile, and what it looks like to know who you are before the machine offers you a version. No condescension, no scare tactics.",
    formats: ["School assembly", "Chapel", "Youth event"],
    forAudience: "Secondary students; pairs with the staff PD and the parent evening",
  },
  {
    id: "parent-evening",
    title: "Parent & Whānau Evening: AI at Home",
    description:
      "A practical evening for parents. What your kids are actually using, the deepfake and voice-cloning scams every family should prepare for, and how to co-create household AI boundaries kids will actually keep. Families leave with worksheets they can use that week.",
    formats: ["Evening seminar (90 min)", "School or church hosted"],
    forAudience: "Parents, grandparents, caregivers, youth workers",
  },
  {
    id: "spheres-worldview",
    title: "The Spheres Worldview: Co-Creating with God in Every Dimension",
    description:
      "Overcoming the sacred-secular divide that leaves most of life feeling unspiritual. This teaching walks through the spheres of society and how every domain, from the kitchen to the boardroom, is a place of co-creation with God. Drawn from the worldview curriculum Nathaniel created and taught for four years in a credited leadership programme.",
    formats: ["Full-day workshop", "90-min seminar", "Sunday series (3–4 weeks)", "Leadership retreat"],
    forAudience: "Church congregations, ministry leaders, businesspeople, educators, parents",
  },
  {
    id: "ai-acceleration-timeline",
    title: "AI Acceleration Timeline",
    description:
      "A briefing on how fast AI is moving and what the next three years ask of leaders. Delivered to city pastors and civic leaders. Maps the pace of change without fear-mongering, and ends with the practical moves worth making now.",
    formats: ["Leadership briefing (60 min)", "Board session", "Keynote (45–60 min)"],
    forAudience: "City leaders, pastors, boards, civic and business leadership groups",
  },
  {
    id: "custom",
    title: "Custom topics: tailored to your audience",
    description:
      "Presentations built for your organisation's specific questions at the intersection of AI, leadership, and formation. Recent custom work includes an AI acceleration briefing for city leaders, kingdom economics in an AI world, and honest AI use in ministry teams.",
    formats: ["Keynote", "Seminar", "Workshop", "Conference or retreat"],
    forAudience: "Conferences, retreats, events with specific themes",
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
