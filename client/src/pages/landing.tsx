import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ThemeToggle } from "@/components/theme-toggle";
import { DemoLoginDialog } from "@/components/demo-login-dialog";
import { motion } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  heroTextVariants,
} from "@/lib/animations";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  MapPin,
  MessageCircle,
  Church,
  GraduationCap,
  Heart,
  UserCheck,
  Sparkles,
  Camera,
  Clapperboard,
  Megaphone,
  LayoutDashboard,
  Smartphone,
  Briefcase,
  BookOpen,
  Shield,
  Rocket,
  Handshake,
} from "lucide-react";

const landingViewport = { once: true, margin: "-40px", amount: 0.15 as const };

// Who I Help (four categories)
const whoIHelp = [
  {
    icon: Church,
    title: "Faith & Mission Organisations",
    description:
      "Churches, denominational networks, training schools, global missions. Scripture-safe AI, theological content, leadership development, donor communication.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Schools, training organisations, curriculum developers. Student engagement, teacher workload reduction, accessibility and multilingual education.",
  },
  {
    icon: Heart,
    title: "Nonprofits & NGOs",
    description:
      "Programme delivery teams, humanitarian orgs, social enterprises. Impact reporting, grant writing, beneficiary storytelling, donor engagement.",
  },
  {
    icon: UserCheck,
    title: "Individuals & Leaders",
    description:
      "Senior leaders, pastors, educators, founders. Personal AI systems for thinking and decision-making; strategic planning and research synthesis.",
  },
];

// Six AI Categories — 2026-style icons
const coreAICategories = [
  {
    icon: Sparkles,
    title: "Text",
    subtitle: "Knowledge, Writing, Decision Support",
    whatItLooksLike: [
      "Internal AI copilots trained on your documents",
      "Policy, curriculum, sermon, and training assistants",
      "Scripture-safe, theologically aware content systems",
    ],
  },
  {
    icon: Camera,
    title: "Image",
    subtitle: "Visuals with Integrity",
    whatItLooksLike: [
      "Brand-safe image generation for education and comms",
      "Curriculum and presentation visuals",
      "Clear guardrails for ethical and cultural use",
    ],
  },
  {
    icon: Clapperboard,
    title: "Video",
    subtitle: "Training & Teaching at Scale",
    whatItLooksLike: [
      "AI-assisted teaching and training workflows",
      "Course creation from existing talks",
      "Multilingual and accessibility-aware systems",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing",
    subtitle: "Messaging that Serves, Not Manipulates",
    whatItLooksLike: [
      "Values-aligned messaging systems",
      "Newsletter, donor, and community comms",
      "Website and campaign copy support",
    ],
  },
  {
    icon: Globe,
    title: "Web",
    subtitle: "Dashboards & Practical Tools",
    whatItLooksLike: [
      "Internal dashboards and trackers",
      "Knowledge portals for staff or students",
      "AI-assisted compliance and reporting tools",
    ],
  },
  {
    icon: Smartphone,
    title: "App",
    subtitle: "Purpose-Driven Products",
    whatItLooksLike: [
      "AI product strategy and PRDs",
      "Feature prioritisation grounded in real users",
      "Education and faith-based app consulting",
    ],
  },
];

// Why work with me — 3 compelling reasons (from Landing-Page-Updated-Content.md)
const whyWorkWithMe = {
  values: [
    "20+ years in global missions, biblical education, and cross-cultural program development—not corporate tech.",
    "Theological and ethical guardrails are non-negotiable; safeguarding for vulnerable populations built in from day one.",
    "Your data stays private; your context and values shape every system—no compromise on trust or doctrine.",
  ],
  delivery: [
    "High relationship and personalisation: your unique roadblocks, bottlenecks, and needs drive the entire engagement.",
    "Experience leading teams across 15+ countries and running flagship leadership courses (400+ graduates, University of the Nations).",
    "Strategy to shipped product—from discovery to App Store; training and handoff so you own the capability.",
  ],
  access: [
    "No static playbooks: solutions are completely adapted by the newest AI tools and your organisation's reality.",
    "I design around your capacity, your constraints, and the tools that will serve you next year—not last year's template.",
    "NZ + Global (Zoom); in-person where possible; nonprofit and faith-based discounts available.",
  ],
};

const portfolioItems = [
  {
    title: "SourceView Together",
    type: "Mobile Bible App · iOS & Android",
    year: "2024",
    impact:
      "Full-stack React Native app with Bluetooth sync. Live on App Store & Google Play.",
    icon: Smartphone,
  },
  {
    title: "Kingdom Vocations Platform",
    type: "Web Application · Course Delivery",
    year: "2024",
    impact: "8-module curriculum platform with student portal. Scalable for global delivery.",
    icon: GraduationCap,
  },
  {
    title: "Consulting Hub",
    type: "Web Application · SaaS",
    year: "2024",
    impact: "Client/consultant portal with intake, consultations, resources. Mobile-first PWA.",
    icon: LayoutDashboard,
  },
  {
    title: "SourceView Bible",
    type: "Mobile App · Research",
    year: "2013–2016",
    impact: "$500K+ digital transformation. 200+ contributors, presented to 4,000+.",
    icon: BookOpen,
  },
];

/* Tighter, industry-standard section spacing; wider content for better screen fill */
const sectionPadding = "py-12 md:py-16 px-6 md:px-8";
const sectionTitleMargin = "mb-6 md:mb-8";
const contentMax = "max-w-7xl";

// Inline gradient backgrounds so card colors never disappear (not dependent on Tailwind purge)
const cardGradientStyles: { background: string }[] = [
  { background: "linear-gradient(to bottom right, rgba(254,243,199,0.8), rgba(255,247,237,0.5), transparent)" },
  { background: "linear-gradient(to bottom right, rgba(224,242,254,0.8), rgba(239,246,255,0.5), transparent)" },
  { background: "linear-gradient(to bottom right, rgba(209,250,229,0.8), rgba(240,253,250,0.5), transparent)" },
  { background: "linear-gradient(to bottom right, rgba(237,233,254,0.8), rgba(250,245,255,0.5), transparent)" },
  { background: "linear-gradient(to bottom right, rgba(255,228,230,0.8), rgba(253,242,248,0.5), transparent)" },
  { background: "linear-gradient(to bottom right, rgba(207,250,254,0.8), rgba(240,249,255,0.5), transparent)" },
];
const getCardGradientStyle = (i: number) => cardGradientStyles[i % cardGradientStyles.length];

// Why work with me: 3 full-width cards (carousel) — image + text each
const whyWorkCards = [
  { key: "values", gradient: 0, icon: Shield, title: "Values & safeguarding", bullets: (whyWorkWithMe as { values: string[] }).values, imageSrc: "/why-work-with-me.jpg", imageAlt: "Nathaniel Baldock — Why work with me" },
  { key: "relationship", gradient: 1, icon: Handshake, title: "Relationship & personalisation", bullets: (whyWorkWithMe as { delivery: string[] }).delivery, imageSrc: "/why-work-2.png", imageAlt: "Workshop and teaching — Relationship & personalisation" },
  { key: "adaptive", gradient: 2, icon: Rocket, title: "Adaptive by design", bullets: (whyWorkWithMe as { access: string[] }).access, imageSrc: "/why-work-3.png?v=2", imageAlt: "AI and software development — adaptive tools and custom solutions" },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden text-foreground font-sans">
      {/* Nav — API-style minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background backdrop-blur-xl isolate">
        <div className={`container mx-auto ${contentMax} px-6 md:px-10 h-14 md:h-16 flex items-center justify-between gap-6`}>
          <a href="#" className="flex items-center min-w-0">
            <img src="/logo.png?v=2" alt="Nathaniel Baldock — AI Consulting" className="h-10 md:h-12 w-auto flex-shrink-0" />
          </a>
          <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
            <a href="#who-i-help" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Who I help
            </a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Services
            </a>
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Portfolio
            </a>
            <a href="#get-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Get started
            </a>
          </nav>
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <DemoLoginDialog />
            <Link href="/intake">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
                data-testid="button-get-started"
              >
                Request a consultation
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — API-style: one H1, one subline, two CTAs; subtle gradient */}
      <section className={`pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-8 scroll-mt-20 bg-gradient-to-b from-background via-amber-50/30 dark:via-amber-950/20 to-background overflow-hidden`} id="hero">
        <div className={`container mx-auto ${contentMax} relative`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
            <div className="space-y-8">
              <motion.div className="space-y-6" initial="hidden" animate="visible">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground"
                  variants={heroTextVariants}
                  custom={0}
                >
                  AI Consulting Grounded in 20+ Years of Global Mission Work
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground tracking-tight [text-wrap:balance] max-w-md"
                  variants={heroTextVariants}
                  custom={0.1}
                >
                  Strategy, training, and advisory for faith, education, and impact. NZ + Global.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link href="/intake">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
                    size="lg"
                    data-testid="button-hero-cta"
                  >
                    Request a consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#who-i-help">
                  <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground" data-testid="button-learn-more">
                    See how I help
                  </Button>
                </a>
              </motion.div>
            </div>
            <motion.div
              className="relative z-0 shrink-0 w-full max-w-sm mx-auto lg:max-w-none lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border bg-muted/30 aspect-[4/3] isolate">
                <img
                  src="/hero.jpg?v=2"
                  alt="Nathaniel Baldock — AI consulting for faith, education and impact"
                  className="w-full h-full object-cover relative"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who I help — 4 Cards with soft gradient backgrounds (OpenAI-style) */}
      <section id="who-i-help" className={`pt-7 md:pt-11 pb-12 md:pb-16 px-6 md:px-8 scroll-mt-20 bg-gradient-to-b from-background via-sky-50/25 dark:via-sky-950/15 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Who I help.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Faith, education, nonprofit, and mission-driven teams.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            {whoIHelp.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <div className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border" style={getCardGradientStyle(i)}>
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base font-semibold tracking-tight">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-0">
                    <a href="#services" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </CardFooter>
                </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Six AI categories — 6 Cards with pastel gradient backgrounds (OpenAI-style) */}
      <section id="services" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-amber-50/20 dark:via-amber-950/10 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Six AI categories — designed for your context, grounded in your values.
            </h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            {coreAICategories.map((cat, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <div className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border" style={getCardGradientStyle(i)}>
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-xl bg-white/70 dark:bg-white/15 p-3 w-fit mb-2 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-sm">
                      <cat.icon className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-base font-semibold tracking-tight">{cat.title}</CardTitle>
                    <CardDescription className="text-xs">{cat.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside flex-1">
                      {cat.whatItLooksLike.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why work with me — 3 full-width cards, horizontal carousel, image + text each */}
      <section id="why-work-with-me" className={`${sectionPadding} scroll-mt-20 overflow-hidden`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Why work with me.
            </h2>
          </motion.div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full relative overflow-hidden">
            <CarouselContent className="-ml-0 w-full">
              {whyWorkCards.map((card, i) => (
                <CarouselItem key={card.key} className="pl-0 basis-full min-w-full">
                  <div
                    className="rounded-2xl overflow-hidden border border-border bg-background/95 shadow-sm flex flex-col md:flex-row min-h-[360px] md:min-h-[420px] w-full"
                    style={getCardGradientStyle(card.gradient)}
                  >
                    {/* Image — left on desktop, top on mobile */}
                    <div className="w-full md:w-[45%] min-w-0 flex-shrink-0 overflow-hidden">
                      <img
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        className="w-full h-56 md:h-full min-h-[224px] md:min-h-[420px] object-cover object-center"
                      />
                    </div>
                    {/* Text — right on desktop, below image on mobile */}
                    <div className="flex-1 flex flex-col p-6 md:p-8 lg:p-10 justify-center min-w-0">
                      <div className="rounded-lg bg-white/70 dark:bg-white/15 p-2.5 w-fit mb-4 backdrop-blur-sm">
                        <card.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-4">{card.title}</h3>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                        {card.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots count={3} className="mt-6" />
          </Carousel>
        </div>
      </section>

      {/* Portfolio — 4 Cards with gradient backgrounds */}
      <section id="portfolio" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-emerald-50/20 dark:via-emerald-950/10 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Portfolio.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From strategy to shipped product.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            {portfolioItems.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <div className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border" style={getCardGradientStyle(i)}>
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-xs">{item.type} · {item.year}</CardDescription>
                    <CardTitle className="text-base font-semibold tracking-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.impact}</p>
                  </CardContent>
                </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get started — two-column API-style block with distinct gradient columns */}
      <section id="get-started" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-slate-50/30 dark:via-slate-950/20 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              Get started.
            </h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            <motion.div variants={staggerItemVariants}>
              <div className="rounded-xl border border-border/80 h-full overflow-hidden" style={getCardGradientStyle(0)}>
              <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold tracking-tight">Partner with me</CardTitle>
                  <CardDescription>
                    Work with me on your AI strategy and implementation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-6">
                    <li>AI strategy and hands-on deployment guidance</li>
                    <li>Transparent pricing tailored to your context</li>
                    <li>Response within 48 hours; no commitment required</li>
                  </ul>
                  <Link href="/intake">
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
                      size="lg"
                      data-testid="button-cta-intake"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Request a consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              </div>
            </motion.div>
            <motion.div variants={staggerItemVariants}>
              <div className="rounded-xl border border-border/80 h-full overflow-hidden" style={getCardGradientStyle(1)}>
              <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold tracking-tight">Learn more</CardTitle>
                  <CardDescription>
                    Explore portfolio, services, and how we can work together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-6">
                    <li>Portfolio: from strategy to shipped product</li>
                    <li>Six AI categories and engagement models</li>
                    <li>Contact: nathanielbaldock@gmail.com</li>
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a href="#portfolio">
                      <Button variant="outline" className="rounded-lg">
                        View portfolio
                      </Button>
                    </a>
                    <a href="#services">
                      <Button variant="outline" className="rounded-lg">
                        See services
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          </motion.div>
          <motion.p
            className="text-center text-sm text-muted-foreground mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <CheckCircle className="h-4 w-4 inline mr-1 text-green-600 dark:text-green-400 align-middle" />
            Response within 48 hours · Honest assessment of fit
          </motion.p>
        </div>
      </section>

      {/* Footer — minimal API-style */}
      <footer className="border-t border-border/60 py-12 px-6 md:px-10">
        <div className={`container mx-auto ${contentMax}`}>
          <div className="flex flex-col gap-10">
            <div className="flex justify-center">
              <img src="/logo-full.png?v=2" alt="Nathaniel Baldock — AI Consulting" className="h-20 md:h-24 w-auto" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left text-sm text-muted-foreground">
                <p>Tauranga, NZ · NZ + Global (Zoom)</p>
                <p className="mt-1">© 2026 Nathaniel Baldock</p>
              </div>
              <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms
              </a>
              <a
                href="mailto:nathanielbaldock@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Contact
              </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
