import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { motion } from "framer-motion";
import { PageSEO } from "@/components/page-seo";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  CinematicPrimaryCTA,
  CinematicSecondaryCTA,
} from "@/components/public-cinematic/cinematic-cta";
import {
  fadeUpRevealVariants,
  staggerRevealContainerVariants,
  staggerRevealItemVariants,
  landingViewportReveal,
} from "@/lib/animations";

import {
  schoolProductCards,
  SCHOOL_SUITE_PACK,
} from "@/content/school-suite";

const PRODUCTS_HERO_IMAGE = "/images/tauranga-ai-bg.jpg";

interface TierBullet {
  tier: "bronze" | "silver" | "gold";
  text: string;
  label?: string;
}

interface ProductCardData {
  title: string;
  badge: string;
  body: string;
  includes?: string[];
  tierIncludes?: TierBullet[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  featuredLabel?: string;
}

const TIER_BULLET_COLORS: Record<TierBullet["tier"], string> = {
  bronze: "#C8894A",
  silver: "#B8BDC6",
  gold: "#D4AF37",
};

const businessCards: ProductCardData[] = [
  {
    title: "The AI Use Audit",
    badge: "Free · 10 minutes",
    body:
      "Free ten-minute survey: map your tools, get a red/amber/green report in your inbox. Works for businesses, churches, schools, and NGOs. Upgrade when you need more than a report — from a custom policy through to hands-on team training.",
    tierIncludes: [
      { tier: "bronze", text: "custom AI policy and a results review call" },
      {
        tier: "silver",
        text: "everything in Bronze plus a policy walkthrough and usage statements for web, email, and documents",
      },
      {
        tier: "gold",
        text: "team training, role-specific guidance, and a six-month policy refresh",
      },
    ],
    ctaLabel: "Start the free audit",
    ctaHref: "/audit",
  },
  {
    title: "AI-Ready Business Pack",
    badge: "From $197 NZD",
    body:
      "Three tiers for small and medium businesses — self-serve worksheets and decks, or guided support through to a full adoption plan.",
    tierIncludes: [
      {
        tier: "bronze",
        text: "four worksheets and full session decks — prep yourself in one weekend",
      },
      {
        tier: "silver",
        text: "everything in Bronze plus a one-hour strategy call and tool-stack recommendation",
      },
      {
        tier: "gold",
        text: "written 20-page AI Adoption Plan, eight weeks of check-ins, team workshop; RBPN co-funding up to $15,000 NZD (eligible Bay of Plenty SMEs)",
      },
    ],
    ctaLabel: "See the tiers",
    ctaHref: "/tauranga-sme",
    featured: true,
    featuredLabel: "Flagship paid product",
  },
  {
    title: "Job transition toolkit",
    badge: "Free tools · workshops available",
    body:
      "Between roles, recently laid off, or competing in an AI-exposed field? Practical tools to help you refocus, upskill, and understand how AI has changed hiring — from both sides of the table. Start with free checklists and one-pagers; book workshops when you want guided support.",
    includes: [
      "Ghost Job Detector — score listings before you invest another evening",
      "ATS Survival — mechanical fixes for machine-screened résumés",
      "Human-in-the-Loop Résumé Kit, Skills Bridge, and How Hiring Works Now seminars",
    ],
    ctaLabel: "Explore worker tools",
    ctaHref: "/business/workers",
  },
];

const ctaLabel = "Book a free 30-min consultation";

function TierBulletList({ items }: { items: TierBullet[] }) {
  return (
    <ul className="nb-body m-0 mb-6 space-y-2 text-[15px] text-[var(--nb-ink-soft)] list-none p-0">
      {items.map((item) => {
        const color = TIER_BULLET_COLORS[item.tier];
        const label = item.label ?? item.tier.charAt(0).toUpperCase() + item.tier.slice(1);
        return (
          <li key={`${item.tier}-${label}`} className="flex items-start gap-2.5">
            <span
              className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 0 2px color-mix(in srgb, ${color} 28%, transparent)` }}
              aria-hidden
            />
            <span>
              <span className="font-medium" style={{ color }}>
                {label}
              </span>
              : {item.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ProductCard({ card }: { card: ProductCardData }) {
  return (
    <section
      className={`border bg-[var(--nb-bg-raised)] p-6 md:p-8 flex flex-col h-full ${
        card.featured
          ? "border-[var(--nb-accent)]/40 ring-1 ring-[var(--nb-accent)]/30"
          : "border-[var(--nb-rule)]"
      }`}
    >
      {card.featured && (
        <p
          className="nb-mono-label text-[11px] mb-3 m-0"
          style={{ color: "var(--nb-accent)" }}
        >
          {card.featuredLabel ?? "Recommended"}
        </p>
      )}
      <h3 className="nb-display text-2xl font-normal text-[var(--nb-ink)] m-0 mb-2">
        {card.title}
      </h3>
      <p className="nb-mono-label text-[12px] mb-4 m-0" style={{ color: "var(--nb-accent)" }}>
        {card.badge}
      </p>
      <p className="nb-body m-0 mb-4">{card.body}</p>
      {card.tierIncludes && card.tierIncludes.length > 0 && (
        <TierBulletList items={card.tierIncludes} />
      )}
      {card.includes && card.includes.length > 0 && (
        <ul className="nb-body m-0 mb-6 pl-4 space-y-1.5 text-[15px] text-[var(--nb-ink-soft)] list-disc">
          {card.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto">
        <CinematicPrimaryCTA href={card.ctaHref}>{card.ctaLabel}</CinematicPrimaryCTA>
      </div>
    </section>
  );
}

function ProductsLaneHeading({
  num,
  title,
  intro,
}: {
  num: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-10 md:mb-12">
      <p
        className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
        style={{ color: "var(--nb-accent)" }}
      >
        {num}
      </p>
      <h2 className="nb-display font-normal m-0 mb-5 text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] tracking-[-0.02em] max-w-4xl">
        {title}
      </h2>
      <p className="nb-body-lg m-0 max-w-2xl">{intro}</p>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Products & Programmes - AI Packages for Businesses and Schools | Nathaniel Baldock"
        description="Fixed-price AI products: a free AI Use Audit, the AI-Ready Business Pack from $197 NZD, and a complete schools programme from policy to whole-school days. Tauranga-based, serving New Zealand."
        canonicalPath="/products"
      />

      <section
        id="top"
        className="nb-hero relative overflow-hidden pt-[76px] min-h-[min(58vh,640px)] max-h-[720px]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden nb-hero-zoom">
          <img
            src={PRODUCTS_HERO_IMAGE}
            alt=""
            className="nb-hero-photo w-full h-full object-cover"
            style={{ objectPosition: "center 42%" }}
          />
        </div>
        <div className="nb-hero-gradient-side absolute inset-0 z-[1]" aria-hidden />
        <div className="nb-hero-gradient-bottom absolute inset-0 z-[1]" aria-hidden />

        <div className="nb-hero-inner relative z-[5] max-w-[1440px] mx-auto flex items-end px-[var(--nb-section-x)]">
          <motion.div
            className="w-full max-w-[820px] py-[clamp(48px,7vw,80px)]"
            initial="hidden"
            whileInView="visible"
            viewport={landingViewportReveal}
            variants={staggerRevealContainerVariants}
          >
            <motion.p
              className="nb-mono-label m-0 mb-6 flex items-center gap-3"
              variants={staggerRevealItemVariants}
            >
              <span
                className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
                style={{
                  background: "var(--nb-accent)",
                  boxShadow: "0 0 0 4px color-mix(in srgb, var(--nb-accent) 22%, transparent)",
                }}
              />
              Products & programmes
            </motion.p>
            <motion.h1
              className="nb-display nb-display-hero m-0 mb-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]"
              variants={staggerRevealItemVariants}
            >
              Practical AI, packaged.
            </motion.h1>
            <motion.p className="nb-body-lg m-0 mb-4 max-w-[620px]" variants={staggerRevealItemVariants}>
              Two clear pathways: one for businesses and organisations, one for schools. Everything
              here has a price or a clear next step, and is ready to book.
            </motion.p>
            <motion.p
              className="nb-body m-0 max-w-[620px] text-[var(--nb-ink-soft)]"
              variants={staggerRevealItemVariants}
            >
              Not ready to spend? Start with the free ten-minute{" "}
              <a href="/audit" className="text-[var(--nb-accent)] hover:underline">
                AI Use Audit
              </a>
              , or grab a worksheet from{" "}
              <Link href="/resources" className="text-[var(--nb-accent)] hover:underline">
                resources
              </Link>
              .
            </motion.p>
          </motion.div>
        </div>
      </section>

      <main className="pb-20 nb-section scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-[var(--nb-section-x)]">
          <ScrollReveal>
            <ProductsLaneHeading
              num="01"
              title="For businesses & organisations"
              intro="For owners, boards, pastors, and team leads who suspect AI is already in the building and want clarity before it becomes a problem."
            />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-24"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              {businessCards.map((card) => (
                <ProductCard key={card.title} card={card} />
              ))}
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <ProductsLaneHeading
              num="02"
              title="For schools"
              intro="Three lanes for principals and SLT — governance, staff formation, and student-facing sessions. Pick one entry point; the schools pack has full flyers and pricing bands."
            />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              {schoolProductCards.map((card) => (
                <ProductCard key={card.id} card={card} />
              ))}
            </motion.div>

            <p className="nb-body m-0 mb-6 max-w-2xl text-[var(--nb-ink-soft)]">
              Browse the full schools pack with lane sections, the principal leave-behind, and
              print-ready flyers. Book a call and I&apos;ll send a tailored proposal the same day.
            </p>
            <div className="flex flex-wrap gap-4 mb-20 md:mb-24">
              <CinematicPrimaryCTA href="/intake">Request the schools pack</CinematicPrimaryCTA>
              <CinematicSecondaryCTA href={SCHOOL_SUITE_PACK}>Browse all school flyers</CinematicSecondaryCTA>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <section className="py-8 px-6 md:px-8 border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="nb-body m-0 max-w-xl">
                Rather start in person? Keynotes, seminars, and workshops for conferences,
                churches, schools, and teams.
              </p>
              <CinematicSecondaryCTA href="/speaking">Speaking topics</CinematicSecondaryCTA>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-16 text-center max-w-xl mx-auto">
              <p className="nb-body-lg m-0 mb-6">
                Not sure which pathway fits? The audit is free and takes ten minutes. Or book a call
                and I&apos;ll point you to the smallest useful next step.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CinematicPrimaryCTA href="/audit">Start the free audit</CinematicPrimaryCTA>
                <CinematicSecondaryCTA href="/intake">{ctaLabel}</CinematicSecondaryCTA>
              </div>
            </div>
          </ScrollReveal>

          <p className="mt-16 max-w-2xl mx-auto text-center text-xs leading-relaxed text-[var(--nb-ink-soft)]">
            AI disclosure: These products draw on AI-assisted research — I used
            Google NotebookLM to work through source material in depth, and that research helped
            me select the key data points and statistics referenced in the worksheets and decks
            behind each package. Claude (Anthropic) supported the editorial process throughout,
            helping brainstorm, edit, and refine the content, and Cursor.ai supported the technical
            build. Every idea, framework, and recommendation was created and confirmed by me — AI
            assisted the research and editing. I take full responsibility for the accuracy and
            judgement in what's delivered here.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
