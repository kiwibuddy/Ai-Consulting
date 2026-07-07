import type { ReactNode } from "react";
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
  schoolSuiteOffers,
  type SchoolSuiteOffer,
} from "@/content/school-suite";
import type { SchoolLaneConfig } from "@/content/school-lanes";

export interface ProductLaneOffer {
  id: string;
  label: string;
  detail: string;
  priceNote: string;
  href: string;
  headerImage?: string;
  headerImageUrl?: string;
  recommended?: boolean;
  liveToolHref?: string;
}

export type ProductLaneConfig = Omit<SchoolLaneConfig, "id"> & { id: string };

function schoolHeaderSrc(image: string) {
  return `/school-suite/flyers/headers/${image}?v=5`;
}

function offerHeaderImage(offer: ProductLaneOffer): string {
  if (offer.headerImageUrl) return offer.headerImageUrl;
  const image = offer.headerImage ?? "educators-pd.png";
  return schoolHeaderSrc(image);
}

function OfferCard({ offer }: { offer: ProductLaneOffer }) {

  return (
    <a
      href={offer.href}
      className={`group flex flex-col h-full border bg-[var(--nb-bg-raised)] overflow-hidden transition-colors hover:border-[var(--nb-accent)]/40 ${
        offer.recommended
          ? "border-[var(--nb-accent)]/40 ring-1 ring-[var(--nb-accent)]/25"
          : "border-[var(--nb-rule)]"
      }`}
    >
      <div
        className="w-full aspect-[16/9] bg-cover bg-center bg-[var(--nb-bg)]"
        style={{ backgroundImage: `url('${offerHeaderImage(offer)}')` }}
        role="img"
        aria-label=""
      />
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {offer.recommended && (
          <p
            className="nb-mono-label text-[10px] mb-2 m-0"
            style={{ color: "var(--nb-accent)" }}
          >
            Recommended bundle
          </p>
        )}
        <h3 className="nb-display text-xl font-normal text-[var(--nb-ink)] m-0 mb-2 group-hover:text-[var(--nb-accent)] transition-colors">
          {offer.label}
        </h3>
        <p
          className="nb-mono-label text-[11px] mb-3 m-0"
          style={{ color: "var(--nb-accent)" }}
        >
          {offer.priceNote}
        </p>
        <p className="nb-body text-[15px] m-0 mb-4 flex-1 text-[var(--nb-ink-soft)]">
          {offer.detail}
        </p>
        <p className="nb-mono-label text-[11px] m-0" style={{ color: "var(--nb-accent)" }}>
          View flyer →
        </p>
        {offer.liveToolHref && (
          <p className="nb-body text-[13px] m-0 mt-3 text-[var(--nb-ink-soft)]">
            Or{" "}
            <a
              href={offer.liveToolHref}
              className="text-[var(--nb-accent)] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              try the free live tool
            </a>
          </p>
        )}
      </div>
    </a>
  );
}

function CitationBlock({
  quote,
  source,
  href,
}: {
  quote: string;
  source: string;
  href: string;
}) {
  return (
    <blockquote className="m-0 pl-4 border-l-2 border-[var(--nb-accent)]/50">
      <p className="nb-body text-[15px] m-0 mb-3 text-[var(--nb-ink-soft)] italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <cite className="nb-mono-label text-[11px] not-italic" style={{ color: "var(--nb-accent)" }}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {source}
        </a>
      </cite>
    </blockquote>
  );
}

export interface SchoolLanePageProps {
  config: ProductLaneConfig;
  /** Filter offers by lane id; omit for custom offer list */
  offerLane?: SchoolLaneConfig["id"];
  offers?: ProductLaneOffer[];
  children?: ReactNode;
  secondaryCta?: { label: string; href: string };
  footerResourcesNote?: ReactNode;
  footerSecondaryCta?: { label: string; href: string };
  offersSectionTitle?: string;
  offersSectionIntro?: string;
}

export function SchoolLanePage({
  config,
  offerLane,
  offers: offersOverride,
  children,
  secondaryCta,
  footerResourcesNote,
  footerSecondaryCta,
  offersSectionTitle = "Programmes & flyers",
  offersSectionIntro = "One-page flyers with pricing bands. Open any flyer and print to PDF — or book a call and I'll send a tailored proposal the same day.",
}: SchoolLanePageProps) {
  const offers =
    offersOverride ??
    schoolSuiteOffers.filter((o) => o.lane === (offerLane ?? config.id));

  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalPath={config.canonicalPath}
      />

      <section className="nb-hero relative overflow-hidden pt-[76px] min-h-[min(52vh,560px)] max-h-[640px]">
        <div className="absolute inset-0 z-0 overflow-hidden nb-hero-zoom">
          <img
            src={config.heroImage}
            alt=""
            className="nb-hero-photo w-full h-full object-cover"
            style={{ objectPosition: config.heroObjectPosition ?? "center 35%" }}
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
              {config.eyebrow}
            </motion.p>
            <motion.h1
              className="nb-display nb-display-hero m-0 mb-5 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]"
              variants={staggerRevealItemVariants}
            >
              {config.title}{" "}
              {config.titleAccent && (
                <em className="nb-italic-accent not-italic font-normal italic">
                  {config.titleAccent}
                </em>
              )}
            </motion.h1>
            <motion.p className="nb-body-lg m-0 mb-6 max-w-[600px]" variants={staggerRevealItemVariants}>
              {config.lede}
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={staggerRevealItemVariants}>
              <CinematicPrimaryCTA href="/intake">Request a tailored proposal</CinematicPrimaryCTA>
              <CinematicSecondaryCTA href={secondaryCta?.href ?? "/schools"}>
                {secondaryCta?.label ?? "← Schools pack"}
              </CinematicSecondaryCTA>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="pb-20 nb-section">
        <div className="max-w-[1440px] mx-auto px-[var(--nb-section-x)]">
          {config.problemSections.map((section) => (
            <ScrollReveal key={section.title}>
              <section className="mb-14 md:mb-16">
                <h2 className="nb-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal m-0 mb-6 leading-[1.05]">
                  {section.title}
                </h2>
                <p className="nb-body-lg m-0 mb-8 text-[var(--nb-ink-soft)]">
                  {section.body}
                </p>
                {section.citations && section.citations.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.citations.map((c) => (
                      <div
                        key={c.href}
                        className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-5 md:p-6"
                      >
                        <CitationBlock {...c} />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </ScrollReveal>
          ))}

          {children}

          {offers.length > 0 && (
            <ScrollReveal>
              <section className="mb-16 md:mb-20">
                <div className="mb-8 md:mb-10">
                  <p
                    className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
                    style={{ color: "var(--nb-accent)" }}
                  >
                    Programmes & flyers
                  </p>
                  <h2 className="nb-display font-normal m-0 mb-4 text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.95]">
                    {offersSectionTitle}
                  </h2>
                  <p className="nb-body-lg m-0 text-[var(--nb-ink-soft)] max-w-[52rem]">
                    {offersSectionIntro}
                  </p>
                </div>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={landingViewportReveal}
                  variants={fadeUpRevealVariants}
                >
                  {offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </motion.div>
              </section>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="pt-8 border-t border-[var(--nb-rule)] text-center max-w-xl mx-auto">
              <p className="nb-body-lg m-0 mb-6">
                {footerResourcesNote ?? (
                  <>
                    Free classroom worksheets live on{" "}
                    <Link href="/resources" className="text-[var(--nb-accent)] hover:underline">
                      resources
                    </Link>
                    . Paid delivery includes print-ready kits sent after you book.
                  </>
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CinematicPrimaryCTA href="/intake">Book a free 30-min consultation</CinematicPrimaryCTA>
                <CinematicSecondaryCTA href={footerSecondaryCta?.href ?? "/schools"}>
                  {footerSecondaryCta?.label ?? "← All school lanes"}
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
