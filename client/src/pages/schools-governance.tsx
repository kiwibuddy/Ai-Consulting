import { Link } from "wouter";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import {
  CinematicPrimaryCTA,
  CinematicSecondaryCTA,
} from "@/components/public-cinematic/cinematic-cta";
import { SchoolLanePage } from "@/components/school-lane-page";
import { SCHOOL_GOVERNANCE_FLYER } from "@/content/school-lanes";
import { schoolSuiteOffers } from "@/content/school-suite";

const GOVERNANCE_HERO =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85";

const FRAMEWORK_PARTS = [
  "AI Acceptable Use Policy (staff + students)",
  "Academic Integrity AI Addendum (NZQA-aligned)",
  "Data Privacy AI Provisions (Privacy Act 2020)",
  "Tool Risk Assessment Checklist",
  "Student AI Disclosure Template",
  "Approved Tools Register (Green / Amber / Red)",
  "AI Steering Group terms of reference",
  "Board presentation pack (15 slides)",
  "Staff workshop materials + parent comms",
];

const PHASES = [
  { phase: "1 Discovery", detail: "Surveys, audit, risk register" },
  { phase: "2 Policy", detail: "AUP, integrity, privacy, Board pack" },
  { phase: "3 Implementation", detail: "Staff workshop, parent comms" },
  { phase: "4 Capability", detail: "Dept guides, steering group" },
  { phase: "5 Retainer", detail: "Annual review, tool vetting" },
];

const TIERS = [
  { name: "Enhancement", price: "$3,500", note: "Existing policy refresh" },
  { name: "Standard", price: "$5,900", note: "Partial foundations" },
  { name: "Full Build", price: "$8,500", note: "From zero" },
];

function GovernanceBody() {
  const offer = schoolSuiteOffers.find((o) => o.id === "policy-governance");

  return (
    <>
      <ScrollReveal>
        <section className="mb-14 md:mb-16">
          <p
            className="nb-mono-label m-0 mb-4 text-[clamp(0.75rem,1.2vw,0.875rem)] tracking-[0.22em]"
            style={{ color: "var(--nb-accent)" }}
          >
            Why schools book this lane
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-12">
              <h2 className="nb-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal m-0 mb-4 leading-[1.05]">
                From gap to compliance — not just conversation
              </h2>
              <p className="nb-body-lg m-0 mb-8 text-[var(--nb-ink-soft)]">
                Most NZ schools need a published AI acceptable use policy, NZQA-aligned integrity
                addendum, and Privacy Act provisions when AI processes student data. This consulting
                lane delivers the full suite in ten weeks — with a staff workshop so the policy
                actually lands.
              </p>
            </div>
            <p className="nb-body m-0 lg:col-span-12 text-[var(--nb-ink-soft)] border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6 md:p-8">
              <span className="nb-display text-2xl font-normal text-[var(--nb-ink)] block mb-2">
                $3,500–$8,500
              </span>
              <span className="nb-mono-label text-[11px]" style={{ color: "var(--nb-accent)" }}>
                + GST · by phase
              </span>
              <span className="block mt-4">
                Complimentary 30-minute briefing for your DP or Board rep — walk through the nine
                parts and what applies to your school.
              </span>
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              label: "NZQA",
              body: "NCEA authenticity and assessment-integrity addendum",
            },
            {
              label: "MoE",
              body: "Digital citizenship and Netsafe alignment checked pre-delivery",
            },
            {
              label: "Privacy Act",
              body: "2020 provisions when AI processes student data",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6"
            >
              <p className="nb-mono-label text-[11px] m-0 mb-2" style={{ color: "var(--nb-accent)" }}>
                {item.label}
              </p>
              <p className="nb-body m-0 text-[var(--nb-ink-soft)]">{item.body}</p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16">
          <h2 className="nb-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal m-0 mb-6">
            9-part School AI Policy Framework
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-0 p-0 list-none">
            {FRAMEWORK_PARTS.map((part) => (
              <li
                key={part}
                className="nb-body text-[15px] pl-6 relative text-[var(--nb-ink-soft)] border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-4"
              >
                <span
                  className="absolute left-3 top-4 text-[var(--nb-accent)]"
                  aria-hidden
                >
                  ✓
                </span>
                {part}
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="nb-display text-2xl font-normal m-0 mb-4">5-phase engagement</h2>
            <ul className="m-0 p-0 list-none space-y-3">
              {PHASES.map((p) => (
                <li
                  key={p.phase}
                  className="flex gap-4 border-b border-[var(--nb-rule)] pb-3"
                >
                  <span className="nb-mono-label text-[11px] shrink-0 w-28" style={{ color: "var(--nb-accent)" }}>
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
              {TIERS.map((t) => (
                <li
                  key={t.name}
                  className="border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-5"
                >
                  <p className="nb-display text-xl m-0 mb-1">{t.price}</p>
                  <p className="nb-body m-0 mb-1">{t.name}</p>
                  <p className="nb-body text-[14px] m-0 text-[var(--nb-ink-soft)]">{t.note}</p>
                </li>
              ))}
            </ul>
            <p className="nb-body text-[14px] m-0 mt-4 text-[var(--nb-ink-soft)]">
              Retainer $1,800/yr · City forum $2,900 · 30-minute briefing free
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <p className="nb-body m-0 mb-10 text-center text-[var(--nb-ink-soft)]">
          Not a school?{" "}
          <Link href="/products#business" className="text-[var(--nb-accent)] hover:underline">
            See business, church, and not-for-profit governance →
          </Link>
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mb-14 md:mb-16 py-8 px-6 md:px-10 border border-[var(--nb-accent)]/30 bg-[var(--nb-bg-raised)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="nb-mono-label text-[11px] mb-2 m-0" style={{ color: "var(--nb-accent)" }}>
              {offer?.priceNote ?? "$3,500–$8,500 + GST"}
            </p>
            <h2 className="nb-display text-2xl font-normal m-0 mb-2">
              Complimentary policy briefing
            </h2>
            <p className="nb-body m-0 text-[var(--nb-ink-soft)]">
              Walk your DP or Board rep through the nine parts and what applies to your school.
              ISO 42001, NIST AI RMF, and UNESCO aligned — 50-source framework.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CinematicPrimaryCTA href="/intake">Request a briefing</CinematicPrimaryCTA>
            <CinematicSecondaryCTA href={SCHOOL_GOVERNANCE_FLYER}>
              Download print flyer
            </CinematicSecondaryCTA>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}

export default function SchoolsGovernancePage() {
  return (
  <SchoolLanePage
    config={{
      id: "governance",
      canonicalPath: "/schools/governance",
      seoTitle: "AI Policy & Governance for NZ Schools | Nathaniel Baldock",
      seoDescription:
        "Board-ready school AI policy suite: 9-part framework, NZQA integrity addendum, Privacy Act provisions, tool audit, and staff workshop. $3,500–$8,500 + GST.",
      heroImage: GOVERNANCE_HERO,
      heroObjectPosition: "center 30%",
      eyebrow: "Policy & governance",
      title: "Board-ready",
      titleAccent: "AI compliance.",
      lede:
        "Written acceptable-use policy, assessment-integrity addendum, privacy provisions, and a green/amber/red tool register — delivered in ten weeks with a staff workshop so it lands.",
      problemSections: [],
    }}
    offers={schoolSuiteOffers.filter((o) => o.id === "policy-governance")}
  >
    <GovernanceBody />
  </SchoolLanePage>
  );
}
