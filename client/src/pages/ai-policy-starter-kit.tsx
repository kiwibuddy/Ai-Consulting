import { Link } from "wouter";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import { CinematicPrimaryCTA, CinematicSecondaryCTA } from "@/components/public-cinematic/cinematic-cta";
import { SchoolLanePage } from "@/components/school-lane-page";
import { LeadMagnetUnlockForm } from "@/components/lead-magnet-unlock-form";

const MAGNET_ID = "ai-policy-starter-kit-sample";
const SAMPLE_PDF = "/downloads/ai-policy-starter-kit-sample.pdf";
const SAMPLE_PREVIEW = "/downloads/ai-policy-starter-kit-sample-preview.png";

const WHATS_INSIDE = [
  { label: "Editable policy template", detail: "Plain-language AI policy with bracketed fields you complete in your own voice." },
  { label: "Traffic Light data guide", detail: "A one-page Green / Amber / Red guide to what data can go into AI — pin it up." },
  { label: "Staff acknowledgement form", detail: "A short sign-on-reading form for every staff member and key volunteer." },
  { label: "Four sector versions", detail: "Business, church, not-for-profit, and school — the right language and examples for you." },
];

function StarterKitBody() {
  return (
    <>
      <ScrollReveal>
        <section className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <p
              className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
              style={{ color: "var(--nb-accent)" }}
            >
              Free sample
            </p>
            <h2 className="nb-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal m-0 mb-4 leading-[1.05]">
              A plain-language AI policy your team will actually read
            </h2>
            <p className="nb-body-lg m-0 mb-6 text-[var(--nb-ink-soft)]">
              Built for New Zealand businesses, churches, schools, and not-for-profits. The free
              sample shows you the thinking — the five convictions, the five questions to ask before
              using AI, and the Traffic Light data guide. Grounded in the NZ Privacy Act 2020 and
              international standards (UNESCO, OECD, ISO/IEC 42001, NIST).
            </p>
            <LeadMagnetUnlockForm magnetId={MAGNET_ID} pdfPath={SAMPLE_PDF} />
          </div>
          <div className="lg:col-span-5">
            <a href={SAMPLE_PDF} target="_blank" rel="noopener noreferrer" className="block group">
              <img
                src={SAMPLE_PREVIEW}
                alt="AI Policy Starter Kit free sample preview"
                className="w-full border border-[var(--nb-rule)] shadow-lg transition-transform group-hover:-translate-y-1"
                loading="lazy"
              />
            </a>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16">
          <h2 className="nb-display text-2xl font-normal m-0 mb-6">What&apos;s in the full kit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHATS_INSIDE.map((item) => (
              <div
                key={item.label}
                className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6"
              >
                <p className="nb-body font-medium m-0 mb-2 text-[var(--nb-ink)]">{item.label}</p>
                <p className="nb-body m-0 text-[var(--nb-ink-soft)] text-[15px]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 py-8 px-6 md:px-10 border border-[var(--nb-accent)]/30 bg-[var(--nb-bg-raised)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="nb-mono-label text-[11px] mb-2 m-0" style={{ color: "var(--nb-accent)" }}>
              $500 + GST · self-serve
            </p>
            <h2 className="nb-display text-2xl font-normal m-0 mb-2">Get the full AI Policy Starter Kit</h2>
            <p className="nb-body m-0 text-[var(--nb-ink-soft)]">
              The complete editable pack — policy template, Traffic Light one-pager, acknowledgement
              form, and all four sector versions. Or have it written for you as an upgrade.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CinematicPrimaryCTA href="/audit">Get the kit</CinematicPrimaryCTA>
            <CinematicSecondaryCTA href="/products">See all products</CinematicSecondaryCTA>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <p className="nb-body m-0 mb-10 text-center text-[var(--nb-ink-soft)]">
          Need a facilitated engagement instead?{" "}
          <Link href="/products" className="text-[var(--nb-accent)] hover:underline">
            See governance packages →
          </Link>
        </p>
      </ScrollReveal>
    </>
  );
}

export default function AiPolicyStarterKitPage() {
  return (
    <SchoolLanePage
      config={{
        id: "ai-policy-starter-kit",
        canonicalPath: "/ai-policy-starter-kit",
        seoTitle:
          "Free AI Policy Starter Kit Sample | Nathaniel Baldock — Tauranga NZ",
        seoDescription:
          "Download a free sample of the AI Policy Starter Kit — a plain-language AI policy for NZ businesses, churches, schools, and not-for-profits. Grounded in the Privacy Act 2020.",
        heroImage:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=85",
        heroObjectPosition: "center 40%",
        eyebrow: "Free download",
        title: "AI Policy Starter Kit",
        titleAccent: "the free sample",
        lede: "The plain-language AI policy pack for NZ organisations. See the thinking free — get the full editable kit when you're ready.",
        problemSections: [],
      }}
      offers={[]}
      secondaryCta={{ label: "← All products", href: "/products" }}
      footerSecondaryCta={{ label: "← All products", href: "/products" }}
      footerResourcesNote={
        <>
          Not sure where to start? The{" "}
          <Link href="/audit" className="text-[var(--nb-accent)] hover:underline">
            free AI Use Audit
          </Link>{" "}
          takes ten minutes and points you to the smallest useful next step.
        </>
      }
    >
      <StarterKitBody />
    </SchoolLanePage>
  );
}
