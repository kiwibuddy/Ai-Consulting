import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { DemoLoginDialog } from "@/components/demo-login-dialog";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  heroTextVariants,
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
  tesoroEase,
} from "@/lib/animations";
import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  Shield,
  Users,
  Play,
  FileText,
} from "lucide-react";
import { latestFromNathaniel } from "@/content/latest";

// Problems I solve — the real AI challenge leaders face
const problemsContent = {
  intro: "AI is already being used inside your organisation — usually without clarity, policy, or shared understanding.",
  closing: "The risk isn't AI adoption. The risk is accidental adoption without discernment.",
};

// How I help — 3 outcomes (Tesoro-style: vibrant card colors like Connect/Activate/Spend/Reward)
const howIHelpCardColors = [
  "bg-[#FF6B4C]",   // red-orange (Connect-style)
  "bg-[#FFC93C]",   // yellow/amber (Activate-style)
  "bg-[#4CAF50]",   // green (Spend/Reward-style)
];
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

// Primary CTA label used site-wide
const ctaLabel = "Book a free 30-min consultation";

// Who this is for — 3 audiences with section label, title, description, and image
const whoThisIsFor = [
  {
    label: "FOR CHURCHES & MISSION ORGANISATIONS",
    title: "Churches & mission organisations",
    description: "Navigating AI responsibly.",
    image: "/Teaching-2.png",
    imageAlt: "Teaching and ministry context",
  },
  {
    label: "FOR SCHOOLS AND TRAINING ORGANISATIONS",
    title: "Schools and training organisations",
    description: "Facing workload pressure and change.",
    image: "/School_Profile.png",
    imageAlt: "School and training context",
  },
  {
    label: "FOR NONPROFITS AND NGOS",
    title: "Nonprofits and NGOs",
    description: "Needing clarity, capacity, and better systems.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    imageAlt: "Team collaboration",
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

/* Tesoro-style: generous section spacing, single content width */
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";
const contentMax = "max-w-6xl";

export default function LandingPage() {
  return (
    <div data-theme="tesoro" className="min-h-screen bg-neutral-50 overflow-x-hidden text-neutral-900 font-sans">
      {/* Nav — original design: dark header, white text */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-900/98 backdrop-blur-xl isolate">
        <div className={`container mx-auto ${contentMax} px-6 md:px-10 h-14 md:h-16 flex items-center justify-between gap-6`}>
          <a href="#" className="flex items-center min-w-0">
            <img src="/logo.png?v=2" alt="Nathaniel Baldock — AI Consulting" className="h-10 md:h-12 w-auto flex-shrink-0 dark-header-logo" />
          </a>
          <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
            <a href="#problems" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              The challenge
            </a>
            <a href="#how-i-help" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              How I help
            </a>
            <a href="#who-and-why" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Who it's for
            </a>
            <a href="#proof" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Proof
            </a>
            <a href="#get-started" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Get started
            </a>
            <Link href="/speaking" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Speaking
            </Link>
            <Link href="/resources" className="text-sm text-white/90 hover:text-white transition-colors duration-300">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-3 flex-shrink-0 text-white/90 [&_button]:text-white/90 [&_button:hover]:text-white [&_a]:text-white/90 [&_a:hover]:text-white">
            <ThemeToggle />
            <DemoLoginDialog />
            <Button
              size="sm"
              variant="default"
              className="tesoro-cta-gradient rounded-lg font-medium text-white"
              data-testid="button-get-started"
              asChild
            >
              <Link href="/intake">
                {ctaLabel}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — portrait visible on right; text in left column so it doesn't cover the image */}
      <section className="relative min-h-[85vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-8 scroll-mt-20 overflow-hidden" id="hero">
        {/* Background image: position so subject stays on the right */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <img
            src="/hero-portrait.png"
            alt=""
            className="w-full h-full object-cover object-[20%_center] md:object-[15%_center]"
          />
        </motion.div>
        {/* Gradient overlay: stronger on left so text reads well, lighter on right so portrait shows */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/25" aria-hidden />
        <div className={`container mx-auto ${contentMax} relative z-[2]`}>
          <motion.div
            className="max-w-xl md:max-w-2xl md:text-left text-center space-y-8 md:mr-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white [text-wrap:balance] drop-shadow-sm"
              variants={heroTextVariants}
              custom={0}
            >
              Practical AI for Faith, Education & Mission-Driven Leaders
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 tracking-tight [text-wrap:balance]"
              variants={heroTextVariants}
              custom={0.05}
            >
              I help churches, schools, and nonprofit leaders adopt AI wisely, safely, and usefully — without hype, fear, or over-saturation.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl font-semibold text-white"
              variants={heroTextVariants}
              custom={0.1}
            >
              You'll know what to use, what to avoid, and{" "}
              <span className="hero-accent-phrase">what matters next.</span>
            </motion.p>
            <motion.div
              className="flex flex-col items-center md:items-start gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                variant="default"
                size="lg"
                className="tesoro-cta-gradient rounded-xl font-semibold px-8 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                data-testid="button-hero-cta"
                asChild
              >
                <Link href="/intake">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.a
              href="#problems"
              className="inline-flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>Scroll</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Problems — Tesoro-style: white strip, line-by-line reveal */}
      <section id="problems" className={`${sectionPadding} scroll-mt-20 bg-white border-y border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 flex flex-wrap justify-center gap-x-2 gap-y-1 items-baseline">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 14 }}
                whileInView="visible"
                viewport={landingViewportReveal}
                variants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                The real AI challenge
              </motion.span>
              <motion.span
                className="inline-block problems-accent-phrase"
                initial={{ opacity: 0, y: 14 }}
                whileInView="visible"
                viewport={landingViewportReveal}
                variants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                leaders are facing.
              </motion.span>
            </h2>
            <motion.p
              className="text-neutral-600 text-sm md:text-base"
              variants={staggerRevealItemVariants}
            >
              {problemsContent.intro}
            </motion.p>
            <motion.p
              className="text-lg md:text-xl font-semibold text-neutral-900 pt-2"
              variants={staggerRevealItemVariants}
            >
              {problemsContent.closing}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How I help — Tesoro-style: white section, vibrant cards, staggered card reveal, hover lift */}
      <section id="how-i-help" className={`${sectionPadding} scroll-mt-20 bg-white`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
              How I help
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              I work with leaders to move from confusion to clarity, and from experimentation to responsible practice.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {howIHelp.map((item, i) => (
              <motion.div
                key={i}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3, ease: tesoroEase } }}
                className={`flex flex-col rounded-[22px] p-6 md:p-8 shadow-lg shadow-black/8 hover:shadow-xl hover:shadow-black/12 transition-shadow duration-500 ${howIHelpCardColors[i]} min-h-[220px]`}
              >
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="rounded-xl bg-black/10 p-3 inline-flex">
                    <item.icon className="h-7 w-7 text-black" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-bold text-black text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-black/90 text-sm md:text-base leading-relaxed flex-1">
                  {item.bullets[0]}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-neutral-600 max-w-2xl mx-auto mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            {howIHelpClosing}
          </motion.p>
        </div>
      </section>

      {/* Who this is for — 3 audience blocks; title + subtitle only on first block */}
      {whoThisIsFor.map((item, i) => (
        <motion.section
          key={item.title}
          id={i === 0 ? "who-and-why" : undefined}
          className={`${sectionPadding} scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
          initial="hidden"
          whileInView="visible"
          viewport={landingViewportReveal}
          variants={staggerRevealContainerVariants}
        >
          <div className={`container mx-auto ${contentMax}`}>
            {i === 0 && (
              <motion.div
                className="text-center max-w-3xl mx-auto mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={landingViewportReveal}
                variants={fadeUpRevealVariants}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
                  Who this is for
                </h2>
                <p className="text-neutral-600 text-lg">
                  This work is a strong fit if you lead or serve in:
                </p>
              </motion.div>
            )}
            <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={`space-y-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <motion.p className="text-sm font-medium uppercase tracking-wider text-[hsl(142,76%,42%)] mb-2" variants={staggerRevealItemVariants}>
                  {item.label}
                </motion.p>
                <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-4" variants={staggerRevealItemVariants}>
                  {item.title}
                </motion.h2>
                <motion.p className="text-neutral-600 leading-relaxed mb-6" variants={staggerRevealItemVariants}>
                  {item.description}
                </motion.p>
                <motion.div variants={staggerRevealItemVariants}>
                  <Button variant="default" size="default" className="tesoro-cta-gradient rounded-lg font-medium" asChild>
                    <Link href="/intake">
                      {ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className={`relative rounded-2xl overflow-hidden border border-neutral-200 aspect-[4/3] bg-neutral-100 ${i % 2 === 1 ? "md:order-1" : ""}`}
                variants={staggerRevealItemVariants}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Why work with me — Tesoro-style: white section, staggered list reveal */}
      <motion.section
        className={`${sectionPadding} scroll-mt-20 bg-white border-t border-neutral-200/80`}
        initial="hidden"
        whileInView="visible"
        viewport={landingViewportReveal}
        variants={staggerRevealContainerVariants}
      >
        <div className={`container mx-auto ${contentMax}`}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3" variants={staggerRevealItemVariants}>
              Why work with me
            </motion.h2>
            <motion.p className="text-neutral-600 mb-6" variants={staggerRevealItemVariants}>
              I bring together deep faith context and real technology experience.
            </motion.p>
            <motion.ul
              className="text-neutral-600 space-y-3 list-disc list-inside leading-relaxed mb-8 text-left inline-block"
              variants={staggerRevealContainerVariants}
            >
              {whyWorkWithMeBullets.map((bullet, j) => (
                <motion.li key={j} variants={staggerRevealItemVariants}>
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="flex justify-center" variants={staggerRevealItemVariants}>
              <Button variant="default" size="lg" className="tesoro-cta-gradient rounded-xl font-semibold shadow-lg shadow-primary/20" asChild>
                <Link href="/intake">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Proof — Tesoro-style: light section, staggered card reveal, hover shadow */}
      <section id="proof" className={`${sectionPadding} scroll-mt-20 bg-neutral-50`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
              Built for mission
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              From strategy to shipped product.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            {portfolioItems.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerRevealItemVariants}
                className="flex flex-col rounded-2xl p-6 bg-white border border-neutral-200/80 shadow-sm hover:shadow-lg hover:shadow-neutral-200/60 transition-all duration-500"
              >
                <div className="rounded-xl bg-[hsl(142,76%,42%)]/10 p-3 w-fit mb-4">
                  <item.icon className="h-5 w-5 text-[hsl(142,76%,42%)]" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.impact}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get started — Tesoro-style: white CTA block, reveal animation */}
      <section id="get-started" className={`${sectionPadding} scroll-mt-20 bg-white border-t border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3" variants={staggerRevealItemVariants}>
              Get started
            </motion.h2>
            <motion.p className="text-neutral-600 mb-6" variants={staggerRevealItemVariants}>
              If you're unsure where AI fits — or doesn't — start with a conversation.
            </motion.p>
            <motion.div variants={staggerRevealItemVariants}>
              <Button
                variant="default"
                size="lg"
                className="tesoro-cta-gradient rounded-xl font-semibold px-8 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                data-testid="button-cta-intake"
                asChild
              >
                <Link href="/intake">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.p className="text-sm text-neutral-500 mt-4" variants={staggerRevealItemVariants}>
              No obligation. Honest assessment of fit. Response within 48 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Latest from Nathaniel — above footer */}
      <section className={`${sectionPadding} scroll-mt-20 bg-neutral-50 border-t border-neutral-200/80`}>
        <div className={`container mx-auto ${contentMax}`}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={fadeUpRevealVariants}
          >
            Latest from Nathaniel
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={cardSlideUpContainerVariants}
          >
            {latestFromNathaniel.slice(0, 2).map((item) => (
              <motion.div
                key={`${item.type}-${item.date}-${item.title}`}
                variants={cardSlideUpItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: tesoroEase } }}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-neutral-100 flex items-center justify-center shrink-0">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-neutral-400">
                      {item.type === "video" ? (
                        <Play className="h-12 w-12" />
                      ) : (
                        <FileText className="h-12 w-12" />
                      )}
                      {item.duration && (
                        <span className="text-xs font-medium">{item.duration}</span>
                      )}
                      {item.readTime && (
                        <span className="text-xs font-medium">{item.readTime} read</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-neutral-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1 mb-4">
                    {item.excerpt}
                  </p>
                  <Link
                    href={item.url}
                    className="text-sm font-medium text-[hsl(142,76%,42%)] hover:underline inline-flex items-center gap-1"
                  >
                    {item.type === "video" ? "Watch" : "Read more"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer — Tesoro-style: newsletter + minimal links */}
      <footer className="border-t border-neutral-200 py-16 px-6 md:px-10 bg-neutral-100">
        <div className={`container mx-auto ${contentMax}`}>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-neutral-900 mb-2">Sign up for updates</p>
                <form
                  className="flex gap-2 max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
                    if (input?.value) {
                      // Placeholder: could wire to API later
                      input.value = "";
                    }
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 min-w-0 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]"
                  />
                  <Button type="submit" variant="default" size="default" className="tesoro-cta-gradient rounded-lg shrink-0">
                    Submit
                  </Button>
                </form>
              </div>
              <div className="text-sm text-neutral-600">
                <p>Tauranga, NZ · Working NZ + Global (Zoom)</p>
                <p className="mt-1">
                  Contact:{" "}
                  <a href="mailto:nathanielbaldock@gmail.com" className="hover:text-neutral-900 transition-colors duration-300">
                    nathanielbaldock@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-600">© 2026 Nathaniel Baldock</p>
              <div className="flex items-center gap-6">
                <Link href="/speaking" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Speaking
                </Link>
                <Link href="/resources" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Resources
                </Link>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Credits
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Terms
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
