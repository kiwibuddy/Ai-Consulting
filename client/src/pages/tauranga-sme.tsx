import { useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Loader2,
  Sparkles,
  Building2,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  landingViewportReveal,
  tesoroEase,
} from "@/lib/animations";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, ApiError } from "@/lib/queryClient";
import { taurangaSmeProducts, type Product, type ProductTier } from "@/content/products";

const contentMax = "max-w-6xl";
const sectionPadding = "py-16 md:py-24 px-6 md:px-8";

type CheckoutResponse = { url: string };

interface TrustItem {
  name: string;
  href?: string;
}

const TRUST_ITEMS: TrustItem[] = [
  { name: "Priority One", href: "https://www.priorityone.co.nz/" },
  { name: "Tauranga Business Chamber", href: "https://www.tauranga.org.nz/" },
  { name: "business.govt.nz", href: "https://www.business.govt.nz/operations/getting-started-with-ai/safe-and-smart-ai-use" },
  { name: "Toi Kai Rawa Trust", href: "https://www.priorityone.co.nz/2023/08/16/unlocking-pathways-to-success-empowering-maori-interns-for-a-thriving-region/" },
];

interface SourceItem {
  label: string;
  href: string;
}

const SOURCES: SourceItem[] = [
  { label: "MBIE — Addressing barriers to AI uptake (2025)", href: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand" },
  { label: "Beehive — New AI Advisory Pilot ($765k)", href: "https://www.beehive.govt.nz/release/new-pilot-helps-small-businesses-harness-ai" },
  { label: "OPC — Guidance on AI and the IPPs", href: "https://privacy.org.nz/assets/New-order/Your-rights/AI-guidance-IPPs.pdf" },
  { label: "AI New Zealand — AI tipping point (2025)", href: "https://www.newzealand.ai/c/insights/ai-in-aotearoa-in-2025-by-the-numbers" },
  { label: "Microsoft — NZ’s $3.4B AI advantage", href: "https://news.microsoft.com/source/asia/features/nz-new-ai-economy-report-2025/" },
  { label: "PwC — 2025 Global AI Jobs Barometer (NZ)", href: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf" },
  { label: "Bell Gully — Do you own your AI-generated content?", href: "https://www.bellgully.com/insights/do-you-own-your-ai-generated-content-a-summary-for-nz-businesses/" },
  { label: "Port of Tauranga — Investor Day 2026", href: "https://www.port-tauranga.co.nz/wp-content/uploads/Investor-Day-Presentation-2026.pdf" },
  { label: "Callaghan Innovation — PlantTech research collaboration", href: "https://www.callaghaninnovation.govt.nz/stories/research-collaboration-cultivating-growth-bay-plenty/" },
];

interface SessionPreview {
  number: 1 | 2 | 3 | 4;
  title: string;
  blurb: string;
  status: "live" | "preview";
  href: string;
}

const SESSIONS: SessionPreview[] = [
  {
    number: 1,
    title: "Ready or Not? An Honest AI Readiness Check",
    blurb: "The full 22-slide deck. Local context (Port of Tauranga, PlantTech, Toi Kai Rawa), the SME gap, and the Priority One pathway. Every stat opens its source.",
    status: "live",
    href: "/resources/worksheet/tauranga-sme-presentation-readiness",
  },
  {
    number: 2,
    title: "Where Does AI Actually Save You Time?",
    blurb:
      "Full 22 slides — augmentation vs automation, animated audit visuals, worksheet iframe slide, NZ tool stack lane, local cases (ASB, Halter, Zespri-era biosensor story), Pilot pathway.",
    status: "live",
    href: "/resources/worksheet/tauranga-sme-presentation-time-audit",
  },
  {
    number: 3,
    title: "AI and Your Team — The Conversation",
    blurb:
      "Employer scripting for stability, Māori workforce context & Toi Ki Tua, upskilling lever grid, Employment NZ good-faith escalation guardrails.",
    status: "live",
    href: "/resources/worksheet/tauranga-sme-presentation-team",
  },
  {
    number: 4,
    title: "Staying Legal — NZ Privacy & Copyright",
    blurb:
      "Privacy IPPs & PIAs, copyright + originality framing, Māori Data Sovereignty runway, CDR spillover, and when to brief counsel.",
    status: "live",
    href: "/resources/worksheet/tauranga-sme-presentation-legal",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FAQItem[] = [
  {
    question: "Am I eligible for the Government's AI Advisory Pilot rebate?",
    answer:
      "The Regional Business Partner Network's AI Advisory Pilot ($765k, launched January 2026) co-funds at least 51 SMEs to develop AI adoption plans, with up to $5,000 NZD per business. Eligibility is assessed by Priority One. The Gold tier here is built to deliver exactly the deliverable the Pilot funds — most qualifying SMEs net out ahead. Your Priority One contact will confirm eligibility.",
  },
  {
    question: "What's the refund policy?",
    answer:
      "Bronze and Silver: 14-day refund if the worksheets and Session 1 deck don't earn their keep. Gold: a 7-day window before the kickoff call; once we begin work on your written Adoption Plan, fees are non-refundable.",
  },
  {
    question: "When do Sessions 2–4 actually land?",
    answer:
      "All four decks are shipping as full ~22-slide HTML sessions with clickable citations — Session 2 (Time Audit) includes animated audit charts plus an embedded worksheet slide. Your access email links to each deck.",
  },
  {
    question: "Are these prices in NZD? GST?",
    answer:
      "Yes — all prices are in New Zealand Dollars. GST is included; Stripe will display the breakdown at checkout. We can issue a tax invoice for businesses that need one — just reply to the access email.",
  },
  {
    question: "Can my accountant claim this?",
    answer:
      "For most owner-operators in the Bay of Plenty, yes — these worksheets and templates are professional development and compliance preparation. Always confirm with your own accountant.",
  },
  {
    question: "Do I need to be in the Bay of Plenty?",
    answer:
      "No — the materials use BoP examples (Port of Tauranga, Zespri, PlantTech) because that's the most useful local context, but the Privacy Act, Copyright Act, and Pilot eligibility apply across NZ. Buyers from anywhere in Aotearoa get the same value.",
  },
  {
    question: "What's the Te Tiriti / Māori Data Sovereignty checklist?",
    answer:
      "A one-page checklist (included at the Gold tier) walking you through the MDS principles for AI tool use — how data is collected, stored, governed, and used in ways that respect Te Tiriti obligations. With 44% of the BoP's future workforce being Māori, this matters commercially as well as ethically.",
  },
  {
    question: "What happens after I buy?",
    answer:
      "You'll get an immediate email with a link to all of your assets, plus a Stripe receipt. Silver and Gold include a booking link to schedule your 1:1 call. If anything is missing, just reply to the email — I read every one.",
  },
];

interface PricingCardProps {
  product: Product;
  onCheckout: (tier: ProductTier) => void;
  isLoading: boolean;
  loadingTier: ProductTier | null;
}

function PricingCard({ product, onCheckout, isLoading, loadingTier }: PricingCardProps) {
  const isThisLoading = loadingTier === product.tier;
  const featured = product.featured === true;
  const pilot = product.pilotEligible === true;

  return (
    <motion.div
      variants={cardSlideUpItemVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: tesoroEase } }}
      className={`relative rounded-2xl border bg-white p-6 md:p-8 shadow-sm flex flex-col h-full ${
        featured
          ? "border-[hsl(142,76%,42%)]/40 ring-1 ring-[hsl(142,76%,42%)]/30 shadow-lg"
          : "border-neutral-200"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[hsl(142,76%,42%)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
          <Sparkles className="h-3 w-3" />
          Most Popular
        </span>
      )}
      {pilot && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
          Pilot-Eligible
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-neutral-900">{product.title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{product.tagline}</p>
      </div>

      <div className="mb-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-neutral-900">${product.price}</span>
        <span className="text-sm font-medium text-neutral-500">{product.currency} · one-off</span>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-neutral-600">{product.promise}</p>

      <ul className="space-y-2.5 mb-6">
        {product.includes.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm text-neutral-700">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(142,76%,42%)]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="mb-6 text-xs text-neutral-500">
        <strong className="font-semibold text-neutral-700">Best for:</strong> {product.bestFor}
      </p>

      <div className="mt-auto">
        <Button
          size="lg"
          variant={featured ? "default" : "outline"}
          className={
            featured
              ? "tesoro-cta-gradient w-full rounded-xl font-semibold"
              : "w-full rounded-xl font-semibold border-neutral-300"
          }
          onClick={() => onCheckout(product.tier)}
          disabled={isLoading}
        >
          {isThisLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting…
            </>
          ) : (
            <>
              {product.ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

export default function TaurangaSmePage() {
  const [location] = useLocation();
  const { toast } = useToast();

  const cancelled = useMemo(() => {
    if (typeof window === "undefined") return false;
    const sp = new URLSearchParams(
      window.location.search || (location.includes("?") ? `?${location.split("?")[1]}` : "")
    );
    return sp.get("cancelled") === "1";
  }, [location]);

  useEffect(() => {
    if (cancelled) {
      toast({
        title: "Checkout cancelled",
        description: "No charge was made. You can come back to this any time.",
      });
    }
  }, [cancelled, toast]);

  const checkoutMutation = useMutation({
    mutationFn: async (tier: ProductTier) => {
      return apiRequest<CheckoutResponse>("POST", "/api/public/products/checkout", { tier });
    },
    onSuccess: (res) => {
      if (res.url) {
        window.location.href = res.url;
      }
    },
    onError: (err) => {
      const msg =
        err instanceof ApiError ? (err.body as { error?: string })?.error : null;
      toast({
        title: "Could not start checkout",
        description:
          msg ||
          "Stripe may not be configured yet for this tier. Try again or email me directly.",
        variant: "destructive",
      });
    },
  });

  const onCheckout = (tier: ProductTier) => {
    checkoutMutation.mutate(tier);
  };
  const loadingTier =
    checkoutMutation.isPending && checkoutMutation.variables
      ? (checkoutMutation.variables as ProductTier)
      : null;

  const goldProduct = taurangaSmeProducts.find((p) => p.tier === "gold");

  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <PageSEO
        title="AI-Ready Tauranga: prep for the Government's AI Advisory Pilot"
        description="Three tiers built around the four Tauranga SME worksheets and a 4-session deck — get ready for the RBPN AI Advisory Pilot conversation. NZD pricing, locally researched."
        canonicalPath="/tauranga-sme"
      />
      <SiteHeader />

      <div className="overflow-x-hidden pt-14 md:pt-16">
        {/* Hero */}
        <section className={`pt-20 pb-14 md:pt-28 md:pb-20 px-6 md:px-8 ${contentMax} mx-auto`}>
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.div
              className="flex items-center gap-2 text-[hsl(142,76%,42%)] mb-4"
              variants={staggerRevealItemVariants}
            >
              <Building2 className="h-5 w-5" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">
                Tauranga SME · For Bay of Plenty businesses
              </span>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-5 [text-wrap:balance]"
              variants={staggerRevealItemVariants}
            >
              AI-Ready Tauranga: the prep pack for the Government's AI Advisory Pilot.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-neutral-600 leading-relaxed [text-wrap:balance] mb-4"
              variants={staggerRevealItemVariants}
            >
              In one weekend, you'll have your AI readiness score, a 3-task shortlist that pays back in under 30 days, your team conversation done, and your privacy and copyright obligations checked. So you walk into the funded advisory call ready to talk implementation, not basics.
            </motion.p>
            <motion.p
              className="text-sm text-neutral-500"
              variants={staggerRevealItemVariants}
            >
              Built locally for the Western Bay of Plenty. Eligible Gold buyers can claim up to{" "}
              <strong className="text-neutral-700">$5,000 NZD</strong> through the RBPN AI Advisory Pilot.
            </motion.p>
          </motion.div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-neutral-200/80 bg-white py-6 px-6 md:px-8">
          <div className={`container mx-auto ${contentMax}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Built around the local landscape
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-700">
                {TRUST_ITEMS.map((t) => (
                  <li key={t.name}>
                    {t.href ? (
                      <a
                        href={t.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-neutral-900 transition-colors"
                      >
                        {t.name}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                    ) : (
                      <span>{t.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gold soft-launch banner */}
        <section className="px-6 md:px-8 pt-12 md:pt-16">
          <div className={`container mx-auto ${contentMax}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
              className="rounded-2xl border border-amber-300/60 bg-gradient-to-br from-amber-50 to-white p-6 md:p-8 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-amber-500 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-neutral-900 mb-1">
                    Gold soft-launch — limited to 5 spots before March 2026.
                  </h2>
                  <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                    The Gold tier delivers the written 20-page AI Adoption Plan that the
                    Government's <strong>$765k AI Advisory Pilot</strong> funds — eligible Bay
                    of Plenty SMEs can claim up to <strong>$5,000 NZD</strong> via the Regional
                    Business Partner Network through Priority One. Most qualifying buyers net
                    out ahead.
                  </p>
                </div>
                {goldProduct && (
                  <div className="flex-shrink-0">
                    <Button
                      size="lg"
                      className="rounded-xl font-semibold bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => onCheckout("gold")}
                      disabled={checkoutMutation.isPending}
                    >
                      {loadingTier === "gold" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Redirecting…
                        </>
                      ) : (
                        <>
                          Apply for a Gold spot
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tiers */}
        <section className={`${sectionPadding} bg-neutral-50`}>
          <div className={`container mx-auto ${contentMax}`}>
            <motion.div
              className="text-center mb-12 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
                Pick the tier that matches where you are.
              </h2>
              <p className="text-neutral-600">
                Every tier includes the four worksheets and the Session 1 deck. The Silver and
                Gold tiers add the human help and the funded deliverable.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={cardSlideUpContainerVariants}
            >
              {taurangaSmeProducts.map((product) => (
                <PricingCard
                  key={product.slug}
                  product={product}
                  onCheckout={onCheckout}
                  isLoading={checkoutMutation.isPending}
                  loadingTier={loadingTier}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Four sessions */}
        <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
          <div className={`container mx-auto ${contentMax}`}>
            <motion.div
              className="text-center mb-10 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
                The four sessions.
              </h2>
              <p className="text-neutral-600">
                A 4-part HTML deck designed to run as a presentation and a research artefact —
                every stat opens its source.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={cardSlideUpContainerVariants}
            >
              {SESSIONS.map((s) => (
                <motion.div
                  key={s.number}
                  variants={cardSlideUpItemVariants}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Session {s.number}
                    </p>
                    {s.status === "live" ? (
                      <span className="inline-flex items-center rounded-full bg-[hsl(142,76%,42%)]/10 px-2.5 py-0.5 text-xs font-semibold text-[hsl(142,76%,42%)]">
                        Live now
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                        Preview
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">{s.blurb}</p>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(142,76%,42%)] hover:underline"
                  >
                    {s.status === "live" ? "Watch the full deck" : "See the preview"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sources */}
        <section className={`${sectionPadding} bg-neutral-50`}>
          <div className={`container mx-auto ${contentMax}`}>
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3 text-center">
                Sources
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-6 text-center">
                Every claim cites a source you can read yourself.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1 text-neutral-700 hover:text-[hsl(142,76%,42%)] transition-colors"
                    >
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className={`${sectionPadding} bg-white border-y border-neutral-200/80`}>
          <div className={`container mx-auto ${contentMax}`}>
            <motion.h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              Frequently asked questions
            </motion.h2>
            <motion.div
              className="max-w-2xl mx-auto space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={staggerRevealContainerVariants}
            >
              {FAQ.map((f, i) => (
                <Collapsible key={i}>
                  <motion.div variants={staggerRevealItemVariants}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition-colors [&[data-state=open]>svg]:rotate-180">
                      {f.question}
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="rounded-b-lg border border-t-0 border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600">
                        {f.answer}
                      </p>
                    </CollapsibleContent>
                  </motion.div>
                </Collapsible>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={`${sectionPadding} bg-neutral-50`}>
          <div className={`container mx-auto ${contentMax}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-3">
                Ready when you are.
              </h2>
              <p className="text-neutral-600 max-w-xl mx-auto">
                Pick a tier or email me directly if you'd rather talk first.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {taurangaSmeProducts.map((p) => (
                <Button
                  key={`bottom-${p.slug}`}
                  size="lg"
                  variant={p.featured ? "default" : "outline"}
                  className={
                    p.featured
                      ? "tesoro-cta-gradient rounded-xl font-semibold"
                      : "rounded-xl font-semibold border-neutral-300"
                  }
                  onClick={() => onCheckout(p.tier)}
                  disabled={checkoutMutation.isPending}
                >
                  {loadingTier === p.tier ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    <>
                      ${p.price} · {p.title.split("—")[0].trim()}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="mailto:hello@nathanielbaldock.com?subject=Tauranga%20SME%20enquiry"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                <Mail className="h-4 w-4" />
                Or email me first
              </a>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
