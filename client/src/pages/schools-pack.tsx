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
import { SCHOOL_LANE_HUB_CARDS } from "@/content/school-lanes";

const SCHOOLS_HERO_IMAGE = "/school-suite/flyers/headers/whole-school-day.png";

function LaneEntryCard({
  card,
}: {
  card: (typeof SCHOOL_LANE_HUB_CARDS)[number];
}) {
  return (
    <Link
      href={card.href}
      className={`group flex flex-col h-full border bg-[var(--nb-bg-raised)] overflow-hidden transition-colors hover:border-[var(--nb-accent)]/40 ${
        card.featured
          ? "border-[var(--nb-accent)]/40 ring-1 ring-[var(--nb-accent)]/25"
          : "border-[var(--nb-rule)]"
      }`}
    >
      <div
        className="w-full aspect-[16/9] bg-cover bg-center"
        style={{ backgroundImage: `url('${card.image}')` }}
        role="img"
        aria-label=""
      />
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <p
          className="nb-mono-label text-[11px] mb-3 m-0"
          style={{ color: "var(--nb-accent)" }}
        >
          {card.num} · {card.badge}
        </p>
        {card.featured && (
          <p
            className="nb-mono-label text-[10px] mb-2 m-0"
            style={{ color: "var(--nb-accent)" }}
          >
            Most schools start here
          </p>
        )}
        <h2 className="nb-display text-2xl font-normal text-[var(--nb-ink)] m-0 mb-3 group-hover:text-[var(--nb-accent)] transition-colors">
          {card.title}
        </h2>
        <p className="nb-body m-0 mb-6 flex-1 text-[var(--nb-ink-soft)]">{card.body}</p>
        <p className="nb-mono-label text-[11px] m-0" style={{ color: "var(--nb-accent)" }}>
          Explore this lane →
        </p>
      </div>
    </Link>
  );
}

export default function SchoolsPackPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Schools Pack — AI Programmes for NZ Schools | Nathaniel Baldock"
        description="Print-ready flyers for principals and SLT: AI policy and governance, staff PD, whole-school days, student assemblies, parent evenings, and Years 12–13 pathways. Tauranga-based, serving New Zealand."
        canonicalPath="/schools"
      />

      <section className="nb-hero relative overflow-hidden pt-[76px] min-h-[min(52vh,560px)] max-h-[640px]">
        <div className="absolute inset-0 z-0 overflow-hidden nb-hero-zoom">
          <img
            src={SCHOOLS_HERO_IMAGE}
            alt=""
            className="nb-hero-photo w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
        <div className="nb-hero-gradient-side absolute inset-0 z-[1]" aria-hidden />
        <div className="nb-hero-gradient-bottom absolute inset-0 z-[1]" aria-hidden />

        <div className="nb-hero-inner relative z-[5] max-w-[1440px] mx-auto flex items-end px-[var(--nb-section-x)]">
          <motion.div
            className="w-full max-w-[820px] py-[clamp(40px,6vw,72px)]"
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
              Schools pack
            </motion.p>
            <motion.h1
              className="nb-display nb-display-hero m-0 mb-5 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]"
              variants={staggerRevealItemVariants}
            >
              Practical AI for people who lead with{" "}
              <em className="nb-italic-accent not-italic font-normal italic">discernment</em>.
            </motion.h1>
            <motion.p className="nb-body-lg m-0 mb-6 max-w-[600px]" variants={staggerRevealItemVariants}>
              Three lanes for principals and SLT — pick governance, staff formation, or
              student-facing sessions. Each lane has its own page with context, cited research,
              and print-ready flyers.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={staggerRevealItemVariants}>
              <CinematicPrimaryCTA href="/intake">Request a tailored proposal</CinematicPrimaryCTA>
              <CinematicSecondaryCTA href="/products">All products</CinematicSecondaryCTA>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="pb-20 nb-section">
        <div className="max-w-[1440px] mx-auto px-[var(--nb-section-x)]">
          <ScrollReveal>
            <section className="mb-16 md:mb-20 py-8 px-6 md:px-10 border border-[var(--nb-accent)]/30 bg-[var(--nb-bg-raised)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="nb-mono-label text-[11px] mb-2 m-0" style={{ color: "var(--nb-accent)" }}>
                  Start here for meetings
                </p>
                <h2 className="nb-display text-2xl font-normal m-0 mb-2">
                  Principal leave-behind
                </h2>
                <p className="nb-body m-0 text-[var(--nb-ink-soft)]">
                  Full A4 overview — both lanes, credentials strip, product grid, and contact
                  block. Print this for your next principal conversation.
                </p>
              </div>
              <CinematicPrimaryCTA href="/school-suite/flyers/principal-leave-behind.html">
                Open leave-behind flyer
              </CinematicPrimaryCTA>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-8 md:mb-10">
              <p
                className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
                style={{ color: "var(--nb-accent)" }}
              >
                Choose a lane
              </p>
              <h2 className="nb-display font-normal m-0 mb-4 text-[clamp(1.75rem,4vw,3rem)] leading-[0.95]">
                Three entry points
              </h2>
              <p className="nb-body-lg m-0 max-w-2xl text-[var(--nb-ink-soft)]">
                Each lane has dedicated context, research citations, and the flyers you can print
                for your leadership team or board.
              </p>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={landingViewportReveal}
              variants={fadeUpRevealVariants}
            >
              {SCHOOL_LANE_HUB_CARDS.map((card) => (
                <LaneEntryCard key={card.id} card={card} />
              ))}
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="pt-8 border-t border-[var(--nb-rule)] text-center max-w-xl mx-auto">
              <p className="nb-body-lg m-0 mb-6">
                Free classroom worksheets live on{" "}
                <Link href="/resources" className="text-[var(--nb-accent)] hover:underline">
                  resources
                </Link>
                . Paid delivery includes print-ready kits sent after you book.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CinematicPrimaryCTA href="/intake">Book a free 30-min consultation</CinematicPrimaryCTA>
                <CinematicSecondaryCTA href="/ai-training-for-schools">
                  Schools programme overview
                </CinematicSecondaryCTA>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
