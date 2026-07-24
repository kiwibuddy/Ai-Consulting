import { Link } from "wouter";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  CinematicPrimaryCTA,
  CinematicSecondaryCTA,
} from "@/components/public-cinematic/cinematic-cta";
import { SchoolLanePage } from "@/components/school-lane-page";
import {
  CHARITY_NOTE_COPY,
  SECTOR_PHASES,
  SECTOR_PRICE_BAND,
  SECTOR_RETAINER,
  SECTOR_TIERS,
  getSectorGovernance,
  type SectorId,
} from "@/content/sector-governance";

function SectorGovernanceBody({ sector }: { sector: SectorId }) {
  const content = getSectorGovernance(sector);
  const examplesLine = content.examples.slice(0, 4).join(", ");

  return (
    <>
      <ScrollReveal>
        <section className="mb-14 md:mb-16">
          <p
            className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
            style={{ color: "var(--nb-accent)" }}
          >
            {content.whyHeading}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-12">
              <h2 className="nb-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal m-0 mb-4 leading-[1.05]">
                {content.sub}
              </h2>
              <p className="nb-body-lg m-0 mb-8 text-[var(--nb-ink-soft)]">{content.lede}</p>
            </div>
            <p className="nb-body m-0 lg:col-span-12 text-[var(--nb-ink-soft)] border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6 md:p-8">
              <span className="nb-display text-2xl font-normal text-[var(--nb-ink)] block mb-2">
                {SECTOR_PRICE_BAND.replace(" + GST", "")}
              </span>
              <span className="nb-mono-label text-[11px]" style={{ color: "var(--nb-accent)" }}>
                + GST · by tier
              </span>
              <span className="block mt-4">
                Complimentary 30-minute briefing — walk through the tiers and what applies to your
                organisation. Typical focus areas include {examplesLine}, and similar sensitive
                material.
              </span>
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {content.complianceHooks.map((item) => (
            <div
              key={item.label}
              className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6"
            >
              <p className="nb-mono-label text-[11px] m-0 mb-2" style={{ color: "var(--nb-accent)" }}>
                {item.label}
              </p>
              <p className="nb-body m-0 text-[var(--nb-ink-soft)]">{item.detail}</p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="nb-display text-2xl font-normal m-0 mb-4">Engagement phases</h2>
            <ul className="m-0 p-0 list-none space-y-3">
              {SECTOR_PHASES.map((p) => (
                <li key={p.phase} className="flex gap-4 border-b border-[var(--nb-rule)] pb-3">
                  <span
                    className="nb-mono-label text-[11px] shrink-0 w-28"
                    style={{ color: "var(--nb-accent)" }}
                  >
                    {p.phase}
                  </span>
                  <span className="nb-body text-[15px] text-[var(--nb-ink-soft)]">{p.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="nb-display text-2xl font-normal m-0 mb-4">Consulting tiers (ex GST)</h2>
            <ul className="m-0 p-0 list-none space-y-4">
              {SECTOR_TIERS.map((t) => (
                <li
                  key={t.name}
                  className={`border bg-[var(--nb-bg-raised)] p-5 ${
                    t.recommended
                      ? "border-[var(--nb-accent)]/40 ring-1 ring-[var(--nb-accent)]/25"
                      : "border-[var(--nb-rule)]"
                  }`}
                >
                  {t.recommended && (
                    <p
                      className="nb-mono-label text-[10px] mb-2 m-0"
                      style={{ color: "var(--nb-accent)" }}
                    >
                      Recommended
                    </p>
                  )}
                  <p className="nb-display text-xl m-0 mb-1">{t.price}</p>
                  <p className="nb-body m-0 mb-1">
                    {t.name}{" "}
                    <span className="text-[var(--nb-ink-soft)] text-[14px]">· {t.duration}</span>
                  </p>
                  <p className="nb-body text-[14px] m-0 mb-3 text-[var(--nb-ink-soft)]">{t.note}</p>
                  <ul className="m-0 pl-4 space-y-1 list-disc nb-body text-[13px] text-[var(--nb-ink-soft)]">
                    {t.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="nb-body text-[14px] m-0 mt-4 text-[var(--nb-ink-soft)]">
              Retainer {SECTOR_RETAINER.price} · 30-minute briefing free
            </p>
          </div>
        </section>
      </ScrollReveal>

      {content.charityNote && (
        <ScrollReveal>
          <section className="mb-14 md:mb-16 border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6 md:p-8">
            <p className="nb-mono-label text-[11px] m-0 mb-2" style={{ color: "var(--nb-accent)" }}>
              Charity &amp; NFP rate
            </p>
            <p className="nb-body m-0 text-[var(--nb-ink-soft)]">{CHARITY_NOTE_COPY}</p>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="mb-14 md:mb-16 py-8 px-6 md:px-10 border border-[var(--nb-accent)]/30 bg-[var(--nb-bg-raised)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="nb-mono-label text-[11px] mb-2 m-0" style={{ color: "var(--nb-accent)" }}>
              {SECTOR_PRICE_BAND}
            </p>
            <h2 className="nb-display text-2xl font-normal m-0 mb-2">Complimentary policy briefing</h2>
            <p className="nb-body m-0 text-[var(--nb-ink-soft)]">
              Walk through the tiers and what applies to your organisation. Privacy Act 2020 and IPP
              3A in view — practical, not a buzzword deck.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CinematicPrimaryCTA href="/intake">Request a briefing</CinematicPrimaryCTA>
            <CinematicSecondaryCTA href="/audit">Start the free audit</CinematicSecondaryCTA>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <p className="nb-body m-0 mb-10 text-center text-[var(--nb-ink-soft)]">
          Running a school?{" "}
          <Link href="/schools/governance" className="text-[var(--nb-accent)] hover:underline">
            See the schools governance lane →
          </Link>
          {content.relatedSeoHref && content.relatedSeoLabel && (
            <>
              {" "}
              ·{" "}
              <Link href={content.relatedSeoHref} className="text-[var(--nb-accent)] hover:underline">
                {content.relatedSeoLabel}
              </Link>
            </>
          )}
        </p>
      </ScrollReveal>
    </>
  );
}

export default function SectorGovernancePage({ sector }: { sector: SectorId }) {
  const content = getSectorGovernance(sector);

  return (
    <SchoolLanePage
      config={{
        id: content.id,
        canonicalPath: content.path,
        seoTitle: content.seoTitle,
        seoDescription: content.seoDescription,
        heroImage: content.heroImage,
        heroObjectPosition: content.heroObjectPosition,
        eyebrow: content.heroTag,
        title: content.title,
        titleAccent: content.titleAccent,
        lede: content.lede,
        problemSections: [],
      }}
      offers={[]}
      secondaryCta={{ label: "← All products", href: "/products" }}
      footerSecondaryCta={{ label: "← All products", href: "/products" }}
      footerResourcesNote={
        <>
          Not sure which tier fits? The{" "}
          <Link href="/audit" className="text-[var(--nb-accent)] hover:underline">
            free AI Use Audit
          </Link>{" "}
          takes ten minutes — or book a call and I&apos;ll point you to the smallest useful next step.
        </>
      }
    >
      <SectorGovernanceBody sector={sector} />
    </SchoolLanePage>
  );
}
