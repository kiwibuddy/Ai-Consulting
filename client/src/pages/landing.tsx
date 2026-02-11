import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  Church,
  GraduationCap,
  Heart,
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-react";

const landingViewport = { once: true, margin: "-40px", amount: 0.15 as const };

// Problems I solve — the real AI challenge leaders face
const problemsContent = {
  heading: "The real AI challenge leaders are facing",
  intro: "AI is already being used inside your organisation — usually without clarity, policy, or shared understanding.",
  subheading: "Leaders I work with are dealing with:",
  bullets: [
    "Staff experimenting with AI tools inconsistently and unsafely",
    "Uncertainty about what to allow, restrict, or guide",
    "Concerns about theology, trust, and data privacy",
    'Pressure to "keep up" without compromising values',
    "Lots of noise, very little wisdom",
  ],
  closing: "The risk isn't AI adoption. The risk is accidental adoption without discernment.",
};

// How I help — 3 outcomes
const howIHelp = [
  {
    icon: Shield,
    title: "Clarity & guardrails",
    bullets: [
      "AI strategy grounded in your mission and values",
      "Clear policies and guardrails for staff and leaders",
      "Discernment around what not to use",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Practical systems",
    bullets: [
      "Internal AI tools that work with your own documents and knowledge",
      "Workflow improvements that save real time",
      "Tools designed for your context, not Silicon Valley defaults",
    ],
  },
  {
    icon: Users,
    title: "Training & adoption",
    bullets: [
      "Leadership briefings and staff training",
      "Family- and student-safe guidance where relevant",
      "Practical examples people can actually use",
    ],
  },
];
const howIHelpClosing = "Everything is designed to respect the authority of Scripture, preserve human discernment, and protect trust.";

// Who this is for — 3 audiences
const whoThisIsFor = [
  {
    icon: Church,
    title: "Churches & mission organisations",
    description: "Navigating AI responsibly.",
  },
  {
    icon: GraduationCap,
    title: "Schools and training organisations",
    description: "Facing workload pressure and change.",
  },
  {
    icon: Heart,
    title: "Nonprofits and NGOs",
    description: "Needing clarity, capacity, and better systems.",
  },
];

// Why work with me — all bullets for combined card
const whyWorkWithMeBullets = [
  "20+ years in global missions, biblical education, and cross-cultural program development",
  "Experience building and shipping real digital products",
  "Strong theological, ethical, and safeguarding foundations",
  "I don't sell or reuse your data; I explain clearly where and how AI is used.",
  "AI should serve people and mission — not replace wisdom, responsibility, or relationship.",
];

const portfolioItems = [
  {
    title: "Global Bible Platform",
    type: "Biblical research & digital platform",
    impact:
      "Co-founded a large-scale international biblical research initiative with 200 contributors from 50 nations, leading to a new digital Bible platform and a solo-built app designed to help schools, families, and groups engage Scripture as a shared narrative.",
    icon: BookOpen,
  },
  {
    title: "Education & Training Platforms",
    type: "Curriculum & delivery",
    impact:
      "Designed and delivered curriculum and training platforms used across multiple countries and cultural contexts, supporting scalable education, engagement, and access.",
    icon: GraduationCap,
  },
  {
    title: "AI-Enabled Tools & Workflows",
    type: "Practical systems",
    impact:
      "Designed practical AI-supported systems that reduce administrative load, improve communication, and support better leadership decision-making in real-world contexts.",
    icon: LayoutDashboard,
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
            <a href="#problems" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Problems I solve
            </a>
            <a href="#how-i-help" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              How I help
            </a>
            <a href="#who-and-why" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Who this is for
            </a>
            <a href="#who-and-why" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Why work with me
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
            <Button
              size="sm"
              variant="secondary"
              className="rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
              data-testid="button-get-started"
              asChild
            >
              <Link href="/intake">
                Free AI Clarity Call
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — API-style: one H1, one subline, two CTAs; subtle gradient */}
      <section className={`pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-8 scroll-mt-20 bg-gradient-to-b from-background via-amber-50/30 dark:via-amber-950/20 to-background`} id="hero">
        <div className={`container mx-auto ${contentMax} relative overflow-visible`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative min-h-0">
            <div className="space-y-8 min-w-0">
              <motion.div className="space-y-6 min-w-0" initial="hidden" animate="visible">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] text-foreground [text-wrap:balance] max-w-xl"
                  variants={heroTextVariants}
                  custom={0}
                >
                  Practical AI for Faith, Education & Mission-Driven Leaders
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground tracking-tight [text-wrap:balance] max-w-md"
                  variants={heroTextVariants}
                  custom={0.1}
                >
                  I help churches, schools, and nonprofit leaders adopt AI wisely, safely, and usefully — without hype, fear, or over-saturation.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
                    size="lg"
                    data-testid="button-hero-cta"
                    asChild
                  >
                    <Link href="/intake">
                      Free 30-minute AI Clarity Call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    You'll walk away knowing what to use, what to avoid, and what matters next.
                  </p>
                </div>
                <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground shrink-0" data-testid="button-learn-more" asChild>
                  <a href="#problems">See the challenge</a>
                </Button>
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

      {/* Problems I solve — 2-col: text card left, image right (full section width) */}
      <section id="problems" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-sky-50/25 dark:via-sky-950/15 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              {problemsContent.heading}
            </h2>
          </motion.div>
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            <motion.div variants={staggerItemVariants} className="min-w-0 flex flex-col">
              <div
                className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border flex flex-col"
                style={getCardGradientStyle(0)}
              >
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-base font-semibold tracking-tight">
                      The challenge
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mt-1.5">
                      {problemsContent.intro}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0 flex-1">
                    <p className="text-foreground font-medium">
                      {problemsContent.subheading}
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-outside pl-6 text-sm md:text-base leading-relaxed break-words">
                      {problemsContent.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                    <p className="text-foreground font-medium pt-2 border-t border-border/60">
                      {problemsContent.closing}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={staggerItemVariants} className="min-w-0 relative shrink-0">
              <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 aspect-[4/3] lg:aspect-auto lg:min-h-[320px] w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80"
                  alt="People working together in a modern open office — the real AI challenge leaders face"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="sr-only">
                Photo by <a href="https://unsplash.com/@jasongoodman_youxventures?utm_source=ai-consulting&utm_medium=referral">Jason Goodman</a> on <a href="https://unsplash.com/?utm_source=ai-consulting&utm_medium=referral">Unsplash</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How I help — 3 outcomes */}
      <section id="how-i-help" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-amber-50/20 dark:via-amber-950/10 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className={`text-center ${sectionTitleMargin}`}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">
              How I help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              I work with leaders to move from confusion to clarity, and from experimentation to responsible practice.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            {howIHelp.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants} className="h-full flex flex-col">
                <div className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border" style={getCardGradientStyle(i)}>
                  <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                    <CardHeader>
                      <div className="rounded-xl bg-white/70 dark:bg-white/15 p-3 w-fit mb-2 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-sm">
                        <item.icon className="h-6 w-6 text-foreground/80" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-base font-semibold tracking-tight">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0">
                      <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside flex-1">
                        {item.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            {howIHelpClosing}
          </motion.p>
        </div>
      </section>

      {/* Who this is for + Why work with me — combined: carousel on mobile, 2-col grid on desktop */}
      <section id="who-and-why" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-sky-50/25 dark:via-sky-950/15 to-background overflow-hidden`}>
        <div className={`container mx-auto ${contentMax}`}>
          {/* Mobile: carousel with vertical cards (one card per slide, swipe/scroll) */}
          <motion.div
            className="md:hidden w-full"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={fadeUpVariants}
          >
            <Carousel
              opts={{ align: "start", loop: true, dragFree: false, containScroll: "trimSnaps" }}
              className="w-full relative -mx-2 snap-x snap-mandatory"
            >
              <CarouselContent className="-ml-2 md:-ml-0 flex snap-x snap-mandatory">
                <CarouselItem className="pl-2 md:pl-0 basis-full min-w-full shrink-0 snap-center">
                  <div
                    className="rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border min-h-[320px] flex flex-col"
                    style={getCardGradientStyle(0)}
                  >
                    <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                      <CardHeader>
                        <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-xl font-semibold tracking-tight">
                          Who this is for
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed mt-1.5">
                          This work is a strong fit if you lead or serve in:
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-0 flex-1">
                        {whoThisIsFor.map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="rounded-lg bg-white/50 dark:bg-white/10 p-2 h-fit shrink-0">
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{item.title}</p>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-0 basis-full min-w-full shrink-0 snap-center">
                  <div
                    className="rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border min-h-[320px] flex flex-col"
                    style={getCardGradientStyle(1)}
                  >
                    <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                      <CardHeader>
                        <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-xl font-semibold tracking-tight">
                          Why work with me
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed mt-1.5">
                          I bring together deep faith context and real technology experience.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 flex-1">
                        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-outside pl-5 leading-relaxed">
                          {whyWorkWithMeBullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselDots count={2} className="mt-6" />
            </Carousel>
          </motion.div>
          {/* Desktop: 2-column grid, both cards visible */}
          <motion.div
            className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            <motion.div variants={staggerItemVariants} className="min-h-0 flex flex-col">
              <div
                className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border flex flex-col"
                style={getCardGradientStyle(0)}
              >
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      Who this is for
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mt-1.5">
                      This work is a strong fit if you lead or serve in:
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0 flex-1">
                    {whoThisIsFor.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="rounded-lg bg-white/50 dark:bg-white/10 p-2 h-fit shrink-0">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{item.title}</p>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div variants={staggerItemVariants} className="min-h-0 flex flex-col">
              <div
                className="h-full rounded-xl border border-border/80 overflow-hidden transition-colors hover:border-border flex flex-col"
                style={getCardGradientStyle(1)}
              >
                <Card className="h-full flex flex-col bg-transparent border-0 shadow-none rounded-xl">
                  <CardHeader>
                    <div className="rounded-lg bg-white/60 dark:bg-white/10 p-2.5 w-fit mb-2 backdrop-blur-sm">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      Why work with me
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mt-1.5">
                      I bring together deep faith context and real technology experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc list-outside pl-5 leading-relaxed">
                      {whyWorkWithMeBullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
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
            className="grid md:grid-cols-3 gap-6 items-stretch"
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
                      <CardDescription className="text-xs">{item.type}</CardDescription>
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

      {/* Get started — single CTA */}
      <section id="get-started" className={`${sectionPadding} scroll-mt-20 bg-gradient-to-b from-background via-slate-50/30 dark:via-slate-950/20 to-background`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            variants={staggerContainerVariants}
          >
            <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3 ${sectionTitleMargin}`}>
              Get started
            </h2>
            <motion.p className="text-muted-foreground mb-6" variants={staggerItemVariants}>
              If you're unsure where AI fits — or doesn't — start with a conversation.
            </motion.p>
            <motion.div className="flex flex-col items-center gap-3" variants={staggerItemVariants}>
              <Button
                variant="secondary"
                className="rounded-lg font-medium bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:text-white dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600"
                size="lg"
                data-testid="button-cta-intake"
                asChild
              >
                <Link href="/intake">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Book a Free 30-minute AI Clarity Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                No obligation. Honest assessment of fit. Response within 48 hours.
              </p>
            </motion.div>
            <motion.p
              className="text-center text-sm text-muted-foreground mt-8"
              variants={fadeUpVariants}
            >
              <CheckCircle className="h-4 w-4 inline mr-1 text-green-600 dark:text-green-400 align-middle" />
              Response within 48 hours · Honest assessment of fit
            </motion.p>
          </motion.div>
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
                <p>Tauranga, NZ · Working NZ + Global (Zoom)</p>
                <p className="mt-1">
                  Contact:{" "}
                  <a href="mailto:nathanielbaldock@gmail.com" className="hover:text-foreground transition-colors duration-200">
                    nathanielbaldock@gmail.com
                  </a>
                </p>
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
