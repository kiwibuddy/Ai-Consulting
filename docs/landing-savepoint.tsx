/**
 * SAVE POINT — Landing page backup (pre–OpenAI/Perplexity redesign).
 *
 * To restore: copy this file to client/src/pages/landing.tsx
 *   cp docs/landing-savepoint.tsx client/src/pages/landing.tsx
 *
 * Contents: Full AI consulting landing with Who I Help, Six AI Categories,
 * Market Reality, Portfolio, How Engagements Work, Testimonials, Investment, Contact.
 * Last saved: 2026-02-01
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { DemoLoginDialog } from "@/components/demo-login-dialog";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  floatVariants,
  heroTextVariants,
  scrollViewport,
} from "@/lib/animations";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  MapPin,
  Calendar,
  MessageCircle,
  Church,
  GraduationCap,
  Heart,
  UserCheck,
  FileText,
  Image as ImageIcon,
  Video,
  Mail,
  LayoutDashboard,
  Smartphone,
  Briefcase,
} from "lucide-react";

// Market Reality (pressure-tested constraints)
const marketReality = {
  intro:
    "Most AI consultants come from corporate tech. I come from 20+ years in global missions, biblical education, and cross-cultural program development—building technology solutions that serve people, not profit margins. Across NZ, faith, nonprofit, and education sectors, I consistently see the same constraints:",
  bullets: [
    "Limited budgets and overstretched staff",
    "High trust and safeguarding requirements (especially around vulnerable populations)",
    "Low tolerance for technical risk and experimental failures",
    "Strong values, weak systems—leaders who know their mission but lack tools",
    "Genuine curiosity about AI, legitimate fear of misuse and unintended harm",
  ],
  closing:
    "Most AI consultants are built for corporates. This practice is not. This work is designed for organisations where people matter more than margins, where trust is non-negotiable, and where technology must serve formation, not exploitation.",
};

// Who I Help (four categories)
const whoIHelp = [
  {
    icon: Church,
    title: "Faith & Mission Organisations",
    description: "Churches, denominational networks, training schools, global missions, Bible translation orgs. Bible engagement and discipleship tools (Scripture-safe AI), theological content creation, leadership development, donor communication, multilingual ministry support.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Schools, training organisations, curriculum developers, online learning platforms. Student engagement and personalized learning, teacher workload reduction, curriculum development, accessibility and multilingual education, staff training.",
  },
  {
    icon: Heart,
    title: "Nonprofits & NGOs",
    description: "Programme delivery teams, humanitarian orgs, community development, social enterprises. Impact reporting, compliance, grant writing, beneficiary storytelling, volunteer coordination, donor engagement, cross-cultural program delivery.",
  },
  {
    icon: UserCheck,
    title: "Individuals & Leaders",
    description: "Senior leaders, pastors, educators, founders, executives. Personal AI systems for thinking, writing, and decision-making; strategic planning and communication support; research synthesis and knowledge management.",
  },
];

// Core AI Categories & Consulting Services (six blocks)
const coreAICategories = [
  {
    icon: FileText,
    title: "Text AI",
    subtitle: "Knowledge, Writing, Decision Support",
    whatItLooksLike: [
      "Internal AI copilots trained on your documents",
      "Policy, curriculum, sermon, and training assistants",
      "Research and synthesis tools for leaders",
      "Scripture-safe, theologically aware content systems",
    ],
    outcomes: ["Reduced admin and prep time", "Consistent voice across teams", "Faster, better-informed decisions"],
    heroStatement: "Clear thinking at the speed of leadership.",
  },
  {
    icon: ImageIcon,
    title: "Image AI",
    subtitle: "Visuals with Integrity",
    whatItLooksLike: [
      "Brand-safe image generation for education and comms",
      "Curriculum and presentation visuals",
      "Clear guardrails for ethical and cultural use",
    ],
    outcomes: ["Less reliance on stock imagery", "Faster content creation", "Visual consistency without risk"],
    heroStatement: "Creativity without compromise.",
  },
  {
    icon: Video,
    title: "Video AI",
    subtitle: "Training & Teaching at Scale",
    whatItLooksLike: [
      "AI-assisted teaching and training workflows",
      "Course creation from existing talks",
      "Multilingual and accessibility-aware systems",
    ],
    outcomes: ["Training that scales without burnout", "Higher engagement", "Content reuse across platforms"],
    heroStatement: "Teach once. Multiply responsibly.",
  },
  {
    icon: Mail,
    title: "Marketing AI",
    subtitle: "Messaging that Serves, Not Manipulates",
    whatItLooksLike: [
      "Values-aligned messaging systems",
      "Newsletter, donor, and community comms",
      "Website and campaign copy support",
    ],
    outcomes: ["Clear, honest communication", "Reduced content fatigue", "Messaging that builds trust"],
    heroStatement: "Clarity builds credibility.",
  },
  {
    icon: LayoutDashboard,
    title: "Web AI",
    subtitle: "Dashboards & Practical Tools",
    whatItLooksLike: [
      "Internal dashboards and trackers",
      "Knowledge portals for staff or students",
      "AI-assisted compliance and reporting tools",
    ],
    outcomes: ["Less manual admin", "Better visibility", "Tools people actually use"],
    heroStatement: "Useful beats impressive.",
  },
  {
    icon: Smartphone,
    title: "App AI",
    subtitle: "Purpose-Driven Products",
    whatItLooksLike: [
      "AI product strategy and PRDs",
      "Feature prioritisation grounded in real users",
      "Education and faith-based app consulting",
    ],
    outcomes: ["Reduced build risk", "Clear product direction", "Apps designed for formation, not addiction"],
    heroStatement: "Build what matters. Leave the rest.",
  },
];

// How Engagements Work (three steps)
const engagementSteps = [
  {
    number: 1,
    title: "AI Strategy Intensives (2–4 weeks)",
    description: "Best for organisations ready to move from exploration to implementation. Discovery, assessment of safe high-impact use cases, tool selection, workflow design, and a working prototype or pilot. Handoff with training and documentation.",
  },
  {
    number: 2,
    title: "Team Training (Zoom or In-Person)",
    description: "Customised to your team's roles and workflows. Hands-on practice, ethical and safeguarding frameworks specific to your context. Half-day to multi-session series. In-person (NZ where possible) or Zoom globally.",
  },
  {
    number: 3,
    title: "Ongoing Advisory",
    description: "Monthly or quarterly consulting. Tool and workflow review, leadership decision support, troubleshooting. Consistent guidance as your AI capabilities mature—build internal capacity, not dependency.",
  },
];

// Why Clients Choose This Work
const whyChooseBullets = [
  "20+ years proven experience across faith, education, nonprofit, and tech—not theory, lived reality",
  "Deep understanding of theological, ethical, and cultural constraints—values aren't negotiable",
  "Demonstrated ability to design, build, and ship real systems—from strategy to App Store",
  "Global perspective with local application—15+ countries, NZ-based",
  "Calm, grounded approach to fast-changing technology—wisdom over hype",
];

// Testimonials (AI consulting–style quotes with key outcomes)
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Director, Faith-based NGO",
    location: "Auckland",
    content: "We went from nervous about AI to having a clear roadmap and a working prototype in three weeks. Nathaniel's focus on values and safeguarding made all the difference—he understands both the technology and the mission context. Our team now has practical tools we trust and can actually use.",
    keyOutcome: "AI-powered donor communication system that maintains dignity and honesty",
    category: "Faith & Mission",
    categoryColor: "primary",
  },
  {
    name: "David Ngata",
    role: "Principal, Secondary School",
    location: "Wellington",
    content: "Practical sessions that our staff actually used. No hype, no jargon—just tools and workflows we could implement the next day. Nathaniel's background in training and education meant he knew exactly how to equip teachers without overwhelming them.",
    keyOutcome: "Teacher workload reduction through AI-assisted feedback and grading workflows",
    category: "Education",
    categoryColor: "success",
  },
  {
    name: "Emma Foster",
    role: "Programme Lead, Nonprofit",
    location: "Christchurch",
    content: "Finally, AI consulting that understands our constraints. We got clarity on what we can do safely with our budget and team, and where to start without risk. The roadmap Nathaniel provided was realistic, not aspirational—it actually fit our capacity.",
    keyOutcome: "Streamlined impact reporting and grant writing processes",
    category: "Nonprofit",
    categoryColor: "secondary",
  },
  {
    name: "Rev. James Wilson",
    role: "Senior Pastor",
    location: "Tauranga",
    content: "Theological and ethical guardrails were non-negotiable for us. Nathaniel delivered exactly that—and a system we trust. He didn't try to sell us on every new AI tool; he helped us discern what truly served our congregation.",
    keyOutcome: "Scripture-safe sermon preparation assistant trained on trusted theological resources",
    category: "Faith & Mission",
    categoryColor: "primary",
  },
];

// Engagement tiers (replaces pricing)
const engagementTiers = [
  { label: "Strategy Intensive", description: "2–4 weeks" },
  { label: "Team Training", description: "Zoom or in-person" },
  { label: "Ongoing Advisory", description: "Monthly or quarterly" },
];

// Portfolio / Proven work (compact)
const portfolioItems = [
  { title: "SourceView Together", type: "Mobile Bible App · iOS & Android", year: "2024", impact: "Full-stack React Native app with Bluetooth sync for group reading. Live on App Store & Google Play. Endorsed by Anglican Bishop of Nairobi." },
  { title: "Kingdom Vocations Platform", type: "Web Application · Course Delivery", year: "2024", impact: "8-module biblical worldview curriculum platform with student portal and content management. Scalable for global delivery." },
  { title: "Coaching Portal", type: "Web Application · SaaS Platform", year: "2024", impact: "Full client/coach management system with intake, sessions, resources, notifications. Mobile-first PWA. Built from PRD to production." },
  { title: "SourceView Bible", type: "Mobile App · Research Platform", year: "2013–2016", impact: "$500K+ digital transformation. Coordinated 200+ contributors, 40,000 hours of research. Presented to 4,000+ at international conference." },
];

/** Section spacing: industry-standard rhythm, cohesive flow (not excessive padding). */
const sectionPadding = "py-12 md:py-16 px-6 md:px-8";
const sectionTitleMargin = "mb-6 md:mb-8";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl px-6 md:px-8 h-16 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Nathaniel Baldock — AI Consulting"
              className="h-14 w-auto flex-shrink-0"
            />
            <div className="hidden sm:block min-w-0">
              <span className="font-serif text-lg font-bold leading-tight block">Nathaniel Baldock</span>
              <span className="text-[11px] text-muted-foreground block">AI Consulting for Faith, Education & Impact</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
            <a href="#who-i-help" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              Who I Help
            </a>
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              Services
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              How It Works
            </a>
            <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              Portfolio
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              About
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-4 rounded-md hover:bg-muted/50">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4 flex-shrink-0">
            <ThemeToggle />
            <DemoLoginDialog />
            <Link href="/intake">
              <Button size="sm" data-testid="button-get-started">
                Request consultation
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero – generous top padding so headline and subtitle are fully visible below fixed header */}
      <section className="pt-[7.5rem] pb-12 md:pt-44 md:pb-16 px-6 md:px-8 hero-gradient relative scroll-mt-20" id="hero">
        <div className="absolute inset-0 grain-subtle" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                className="space-y-5"
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  className="text-primary font-semibold text-xs uppercase tracking-wider"
                  variants={heroTextVariants}
                  custom={0}
                >
                  AI Consulting · NZ + Global · 20+ Years Cross-Cultural Tech Leadership
                </motion.p>
                <motion.h1
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                  variants={heroTextVariants}
                  custom={0.1}
                >
                  Nathaniel Baldock
                </motion.h1>
                <motion.p
                  className="font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground"
                  variants={heroTextVariants}
                  custom={0.2}
                >
                  AI Consulting for Faith, Education &{" "}
                  <span className="text-primary">Impact Organisations</span>
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed [text-wrap:balance]"
                  variants={heroTextVariants}
                  custom={0.3}
                >
                  Practical AI. Real-world constraints. Measurable outcomes. I help faith-based organisations,
                  nonprofits, schools, and mission-driven teams adopt AI without compromising values, trust,
                  or clarity. With 20+ years leading digital transformations across 15+ countries—from managing
                  $500K+ projects to building mobile apps that scale globally—I bring both strategic insight
                  and hands-on technical delivery. Working with clients across New Zealand and globally via Zoom.
                  No hype. No vendor lock-in. No theory-only workshops.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <a href="#contact">
                  <Button className="w-full sm:w-auto" data-testid="button-hero-cta">
                    Request a consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#portfolio">
                  <Button variant="outline" className="w-full sm:w-auto" data-testid="button-learn-more">
                    View Portfolio
                  </Button>
                </a>
              </motion.div>
              <motion.div
                className="flex flex-wrap items-center gap-4 pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span className="text-xs text-muted-foreground">20+ years global experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span className="text-xs text-muted-foreground">Faith, education & nonprofit specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span className="text-xs text-muted-foreground">Mobile apps shipped to App Store & Google Play</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span className="text-xs text-muted-foreground">No vendor lock-in · NZ + Global (Zoom)</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="relative hidden lg:block lg:pl-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero.png"
                  alt="Nathaniel Baldock — AI consulting for faith, education and impact organisations"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-sm font-medium opacity-90 mb-1">Practical AI for impact</p>
                  <p className="text-xs opacity-75">Organisations that put people first</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Reality Section */}
      <section id="market-reality" className={`${sectionPadding} bg-muted/30 scroll-mt-20`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-2">
              Market Reality (Pressure-Tested)
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {marketReality.intro}
            </p>
            <ul className="text-left space-y-2 text-sm text-muted-foreground mb-6 list-disc list-inside">
              {marketReality.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {marketReality.closing}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who I Help Section */}
      <section id="who-i-help" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
              Who I Help
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              Faith, Education, Nonprofit, and Mission-Driven Teams
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-2">
              Organisations that prioritise people, values, and long-term impact
            </p>
            <p className="text-xs text-muted-foreground max-w-lg mx-auto">
              Available in-person (NZ where possible) and globally via Zoom.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainerVariants}
          >
            {whoIHelp.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <Card className="h-full card-premium group flex flex-col flex-1">
                  <CardContent className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="rounded-lg bg-primary/10 p-2.5 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core AI Categories Section */}
      <section id="services" className={`${sectionPadding} bg-muted/30 scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
              Core AI Categories & Consulting Services
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              Six AI Categories—Designed for Your Context, Grounded in Your Values
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Text, image, video, marketing, web, and app AI—each with ethical guardrails and proven frameworks
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainerVariants}
          >
            {coreAICategories.map((cat, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <Card className="h-full card-premium group flex flex-col flex-1">
                  <CardContent className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="rounded-lg bg-primary/10 p-2.5 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <cat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base mb-0.5">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{cat.subtitle}</p>
                    <p className="text-xs font-medium text-primary mb-2">What this looks like:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                      {cat.whatItLooksLike.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-xs font-medium text-primary mb-1">Outcomes:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                      {cat.outcomes.map((outcome, j) => (
                        <li key={j}>{outcome}</li>
                      ))}
                    </ul>
                    <p className="text-sm font-semibold text-foreground italic border-l-2 border-primary pl-3 mt-auto">
                      {cat.heroStatement}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio / Proven Work Section */}
      <section id="portfolio" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
              Portfolio
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              From Strategy to Shipped Product—Proven Technical Delivery
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              I don't just advise. I design, build, and ship real products for faith and education contexts.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainerVariants}
          >
            {portfolioItems.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <Card className="h-full card-premium group flex flex-col flex-1">
                  <CardContent className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="rounded-lg bg-primary/10 p-2.5 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{item.type} · {item.year}</p>
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.impact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How Engagements Work Section */}
      <section id="how-it-works" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
              How Engagements Work
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              Three Engagement Models—Tailored to Your Context
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Strategy intensives, team training, and ongoing advisory. Choose what fits your season and capacity.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainerVariants}
          >
            {engagementSteps.map((step, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <Card className="h-full text-center flex flex-col flex-1">
                  <CardContent className="p-4 md:p-5 flex flex-col flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-3">
                      {step.number}
                    </div>
                    <h4 className="font-semibold text-sm mb-1.5">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-stretch">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
            >
              <div>
                <p className="text-primary font-medium text-xs uppercase tracking-wider mb-2">About Me</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                  AI Consulting Grounded in 20+ Years of Building Technology for Global Impact
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  I'm not a corporate tech consultant who dabbles in faith work. I'm a proven builder who has spent
                  two decades leading digital transformations in some of the world's most resource-constrained,
                  values-driven contexts—from 20+ years with YWAM International to leading $500K+ SourceView Bible
                  projects, training 400+ emerging leaders, and shipping mobile apps to App Store and Google Play.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This combination—deep faith-sector experience, proven technical delivery, and global cross-cultural
                  fluency—means I don't just understand AI tools. I understand your world, your constraints, and how
                  to build systems that serve your mission without compromising your values. <strong className="text-foreground">This is AI consulting for organisations that want to move forward wisely, not recklessly.</strong>
                </p>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="font-semibold text-base mb-3">
                  Why Clients Choose This Work
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4 list-disc list-inside">
                  {whyChooseBullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="badge-landing badge-landing-primary">
                    <MapPin className="h-3 w-3" /> NZ + Global (Zoom)
                  </span>
                  <span className="badge-landing badge-landing-success">
                    <Globe className="h-3 w-3" /> Faith, Education & Nonprofit
                  </span>
                  <span className="badge-landing badge-landing-secondary">
                    20+ Years · Builder + Strategist · App Store Shipped
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeUpVariants}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-2xl" />
              <div className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/holger.jpg"
                  alt="Nathaniel Baldock — AI Consulting for Faith, Education & Impact"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-semibold text-base">Nathaniel Baldock</p>
                  <p className="text-white/80 text-xs">AI Consulting for Faith, Education & Impact</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Clients Choose Section (compact) */}
      <section id="why-choose" className={`${sectionPadding} bg-muted/30 scroll-mt-20`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-2">
              Why Clients Choose This Work
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 text-left list-disc list-inside">
              {whyChooseBullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
              Testimonials
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              What Clients Say
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Real stories from faith, education, and nonprofit leaders
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-5 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainerVariants}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <Card className="h-full flex flex-col flex-1">
                  <CardContent className="p-4 md:p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-primary/10 h-9 w-9 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-3 flex-1">
                      "{testimonial.content}"
                    </p>
                    {"keyOutcome" in testimonial && testimonial.keyOutcome && (
                      <p className="text-xs text-primary font-medium mb-2">Key outcome: {testimonial.keyOutcome}</p>
                    )}
                    <span className={`badge-landing badge-landing-${testimonial.categoryColor}`}>
                      {testimonial.category}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investment / How We Work Together Section */}
      <section id="investment" className={`${sectionPadding} bg-muted/30 scroll-mt-20`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
              <CardContent className="relative p-6 md:p-8">
                <div className="text-center mb-8">
                  <p className="text-primary font-medium text-xs uppercase tracking-wider mb-1">
                    Investment
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                    Transparent Pricing, Tailored to Your Context
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    I work with organisations across a wide range of budgets—from small churches to global missions networks. Pricing is based on organisational size, scope of work, and capacity to invest. Nonprofit and faith-based discounts available.
                  </p>
                </div>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollViewport}
                  variants={staggerContainerVariants}
                >
                  {engagementTiers.map((tier, i) => (
                    <motion.div
                      key={i}
                      className="text-center p-4 bg-background rounded-lg shadow-sm"
                      variants={staggerItemVariants}
                    >
                      <p className="text-sm font-semibold text-foreground mb-1">{tier.label}</p>
                      <p className="text-xs text-muted-foreground">{tier.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-center text-xs text-muted-foreground">
                  Specific investment discussed when we discuss your project
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className={`${sectionPadding} scroll-mt-20`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUpVariants}
          >
            <motion.div
              className="inline-flex rounded-full bg-primary/10 p-3 mb-6"
              variants={floatVariants}
              animate="animate"
            >
              <Calendar className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
              Request a Consultation
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto leading-relaxed">
              Let's explore if we're a good fit. I'll review your inquiry and reach out within 48 hours.
              This isn't a sales pitch—it's a conversation about your context, constraints, and goals.
            </p>
            <Link href="/intake">
              <Button data-testid="button-cta-intake">
                <MessageCircle className="mr-2 h-4 w-4" />
                Request a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 inline mr-1 text-green-600 dark:text-green-400" />
              No commitment required • Response within 48 hours • Honest assessment of fit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nathaniel Baldock — AI Consulting"
                className="h-6 w-auto"
              />
              <div>
                <span className="font-serif font-bold text-sm leading-none block">Nathaniel Baldock</span>
                <span className="text-[10px] text-muted-foreground">AI Consulting for Faith, Education & Impact</span>
                <p className="text-[10px] text-muted-foreground mt-1">Practical AI. Real-world constraints. Measurable outcomes.</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">Tauranga, Bay of Plenty, New Zealand</p>
              <p className="text-xs text-muted-foreground">NZ + Global (Zoom)</p>
              <p className="text-xs text-muted-foreground mt-2">© 2026 Nathaniel Baldock. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="mailto:nathanielbaldock@gmail.com" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
