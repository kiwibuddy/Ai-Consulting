import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";

type Tier = "bronze" | "silver" | "gold";

const tierMeta: Record<Tier, { name: string; nextSteps: string[] }> = {
  bronze: {
    name: "AI-Ready Self-Pack",
    nextSteps: [
      "Open the email and click through to the four worksheets in the order listed.",
      "Watch Session 1 (the 22-slide deck) — it'll only take 25 minutes.",
      "Reply to the access email with your one Q&A question whenever you're ready.",
    ],
  },
  silver: {
    name: "AI-Ready Implementation Pack",
    nextSteps: [
      "Use the booking link in your access email to schedule your 60-minute strategy call.",
      "Fill in the Readiness and Time Audit worksheets before our call so we can start strong.",
      "Download the NZ Privacy Impact Assessment template from your access email.",
    ],
  },
  gold: {
    name: "Full AI Adoption Plan",
    nextSteps: [
      "Watch your inbox — I'll personally reach out within 1–2 business days to schedule the kickoff.",
      "Forward the receipt to your accountant; you may be able to claim it as professional development.",
      "Talk to your Priority One contact about the AI Advisory Pilot rebate (up to $5,000 NZD).",
    ],
  },
};

export default function TaurangaSmeWelcomePage() {
  const [location] = useLocation();

  const tier = useMemo<Tier>(() => {
    if (typeof window === "undefined") return "bronze";
    const sp = new URLSearchParams(
      window.location.search || (location.includes("?") ? `?${location.split("?")[1]}` : "")
    );
    const t = sp.get("tier");
    if (t === "silver" || t === "gold") return t;
    return "bronze";
  }, [location]);

  const meta = tierMeta[tier];

  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <PageSEO
        title="Welcome to the Tauranga SME programme"
        description="Your purchase is confirmed. Check your inbox for the access email."
        canonicalPath="/tauranga-sme/welcome"
      />
      <SiteHeader />

      <div className="pt-14 md:pt-16">
        <section className="px-6 md:px-8 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              viewport={landingViewportReveal}
              variants={staggerRevealContainerVariants}
              className="text-center mb-10"
            >
              <motion.div
                variants={staggerRevealItemVariants}
                className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[hsl(142,76%,42%)]/10 text-[hsl(142,76%,42%)] mb-6"
              >
                <CheckCircle2 className="h-8 w-8" />
              </motion.div>
              <motion.p
                variants={staggerRevealItemVariants}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(142,76%,42%)] mb-3"
              >
                Payment received
              </motion.p>
              <motion.h1
                variants={staggerRevealItemVariants}
                className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4 [text-wrap:balance]"
              >
                Welcome to the {meta.name}.
              </motion.h1>
              <motion.p
                variants={staggerRevealItemVariants}
                className="text-lg text-neutral-600 leading-relaxed [text-wrap:balance]"
              >
                Your access email is on its way. It contains the links to all of your worksheets,
                deck, and (depending on your tier) templates and booking links. <strong>Check your
                inbox now</strong> — and your spam folder if it's not there in a couple of minutes.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
              className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-neutral-500" />
                <h2 className="text-base font-semibold text-neutral-900">Your next 3 steps</h2>
              </div>
              <ol className="space-y-3 list-decimal list-inside text-sm text-neutral-700 leading-relaxed">
                {meta.nextSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="tesoro-cta-gradient rounded-xl font-semibold">
                <Link href="/resources/worksheet/tauranga-sme-presentation-readiness">
                  Open Session 1 deck now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl font-semibold border-neutral-300"
              >
                <a href="mailto:hello@nathanielbaldock.com?subject=Tauranga%20SME%20-%20question">
                  <Mail className="mr-2 h-4 w-4" />
                  Email me directly
                </a>
              </Button>
            </div>

            <p className="mt-10 text-center text-xs text-neutral-500">
              Receipt sent separately by Stripe. Tax invoice on request — just reply to the access
              email.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
