import { Link } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { AboutPageJsonLd, FaqPageJsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/public-cinematic/section-label";
import {
  CinematicPrimaryCTA,
  CinematicSecondaryCTA,
} from "@/components/public-cinematic/cinematic-cta";
import { ScrollReveal } from "@/components/public-cinematic/scroll-reveal";
import { identityFaqs } from "@/content/identity-faq";
import { EXPERTISE_PAGE_PATHS } from "@/content/expertise-pages";
import {
  CANONICAL_BIO,
  SOCIAL_PROFILES,
} from "@shared/content/site-profiles";
import { SITE_CONTACT_EMAIL, MAILTO_SUBJECT_INQUIRY } from "@shared/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink } from "lucide-react";

const services = [
  {
    title: "AI consulting",
    href: "/ai-consulting-for-churches",
    note: "Churches, schools, and mission organisations",
  },
  {
    title: "School training",
    href: "/ai-training-for-schools",
    note: "Staff, parents, and students",
  },
  {
    title: "Nonprofit governance",
    href: "/ai-governance-for-nonprofits",
    note: "Policy, audits, and staff briefings",
  },
  {
    title: "Speaking",
    href: "/ai-speaker-faith-and-technology",
    note: "Keynotes and workshops",
  },
  {
    title: "AI Use Audit",
    href: "/ai-use-audit",
    note: "Free ten-minute tool",
  },
];

const highlights = [
  "23 years in global missions with Youth With A Mission — 35+ countries",
  "Directed training schools; led teams in Papua New Guinea",
  "Co-led 7 Spheres Bible research with 200+ researchers across 50 nations",
  "Built SourceView Bible app, coaching portal, and the free AI Use Audit",
  "Published articles on AI, faith, education, teens, and digital discipleship",
];

export default function WhoIsNathanielBaldockPage() {
  return (
    <div className="nb-page overflow-x-hidden">
      <PageSEO
        title="Who Is Nathaniel Baldock? — AI Consultant, Speaker & Educator (Tauranga, NZ)"
        description="Nathaniel Baldock: AI strategist, consultant, speaker, and educator in Tauranga, New Zealand. 23 years in global missions; helps churches, schools, and nonprofits navigate AI."
        canonicalPath="/who-is-nathaniel-baldock"
      />
      <AboutPageJsonLd />
      <FaqPageJsonLd faqs={identityFaqs} />

      <main className="pt-28 pb-20 nb-section scroll-mt-24">
        <div className="nb-container px-0 max-w-[1240px]">
          <SectionLabel num="01">Start here</SectionLabel>

          <h1 className="nb-display nb-display-lg font-normal m-0 mb-4 max-w-3xl">
            Who is Nathaniel Baldock?
          </h1>
          <p className="nb-body-lg m-0 max-w-2xl mb-10">{CANONICAL_BIO}</p>

          <div className="grid md:grid-cols-5 gap-10 md:gap-14 mb-14 pb-14 border-b border-[var(--nb-rule)]">
            <div className="md:col-span-2">
              <img
                src="/Nathaniel_Portrait.png"
                alt="Nathaniel Baldock — AI consultant, Tauranga, New Zealand"
                className="w-full rounded-md border border-[var(--nb-rule)] object-cover aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-3 space-y-8">
              <section>
                <h2 className="nb-mono-label mb-3" style={{ color: "var(--nb-accent)" }}>
                  At a glance
                </h2>
                <dl className="grid gap-3 m-0 nb-body text-[16px]">
                  <div>
                    <dt className="nb-mono-label text-[11px] text-[var(--nb-ink-dim)] mb-0.5">Full name</dt>
                    <dd className="m-0">Nathaniel Baldock</dd>
                  </div>
                  <div>
                    <dt className="nb-mono-label text-[11px] text-[var(--nb-ink-dim)] mb-0.5">Location</dt>
                    <dd className="m-0">Tauranga, Bay of Plenty, New Zealand</dd>
                  </div>
                  <div>
                    <dt className="nb-mono-label text-[11px] text-[var(--nb-ink-dim)] mb-0.5">Role</dt>
                    <dd className="m-0">AI strategist, consultant, speaker, and educator</dd>
                  </div>
                  <div>
                    <dt className="nb-mono-label text-[11px] text-[var(--nb-ink-dim)] mb-0.5">Organisations served</dt>
                    <dd className="m-0">Churches, Christian schools, nonprofits, NGOs, SMEs, mission organisations</dd>
                  </div>
                  <div>
                    <dt className="nb-mono-label text-[11px] text-[var(--nb-ink-dim)] mb-0.5">Website</dt>
                    <dd className="m-0">
                      <a href="https://www.nathanielbaldock.com" className="text-[var(--nb-accent)]">
                        www.nathanielbaldock.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="nb-mono-label mb-3" style={{ color: "var(--nb-accent)" }}>
                  Career highlights
                </h2>
                <ul className="space-y-2 m-0 pl-5 nb-body text-[16px]">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <ScrollReveal>
            <section className="mb-14 pb-14 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Services
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4 m-0 p-0 list-none">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="block rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] px-5 py-4 no-underline hover:border-[var(--nb-rule-strong)] transition-colors"
                    >
                      <span className="nb-body text-[16px] text-[var(--nb-ink)] block">{s.title}</span>
                      <span className="text-[13px] text-[var(--nb-ink-soft)]">{s.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-14 pb-14 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Publications &amp; resources
              </h2>
              <p className="nb-body text-[17px] m-0 mb-4 max-w-3xl">
                Articles, worksheets, and tools on AI, faith, education, and family discipleship — free on the resources page.
              </p>
              <CinematicSecondaryCTA href="/resources">Browse resources →</CinematicSecondaryCTA>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-14 pb-14 border-b border-[var(--nb-rule)]">
              <h2 className="nb-mono-label mb-4" style={{ color: "var(--nb-accent)" }}>
                Connect
              </h2>
              <ul className="space-y-2 m-0 p-0 list-none nb-body text-[16px]">
                <li>
                  <a
                    href={`mailto:${SITE_CONTACT_EMAIL}?subject=${MAILTO_SUBJECT_INQUIRY}`}
                    className="text-[var(--nb-accent)]"
                  >
                    {SITE_CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_PROFILES.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)]"
                  >
                    LinkedIn <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_PROFILES.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)]"
                  >
                    Facebook <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_PROFILES.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)]"
                  >
                    YouTube <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-14">
              <h2 className="nb-mono-label mb-6" style={{ color: "var(--nb-accent)" }}>
                Frequently asked questions
              </h2>
              <div className="space-y-3 max-w-3xl">
                {identityFaqs.map((faq) => (
                  <Collapsible key={faq.question}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] px-5 py-4 text-left nb-body text-[16px]">
                      <span>{faq.question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pt-3 pb-4 nb-body text-[16px] text-[var(--nb-ink-soft)]">
                      {faq.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <div className="flex flex-wrap items-center gap-4">
            <CinematicPrimaryCTA href="/intake">Book a free 30-min consultation</CinematicPrimaryCTA>
            <CinematicSecondaryCTA href="/about">Longer biography →</CinematicSecondaryCTA>
          </div>

          <p className="mt-8 text-[13px] text-[var(--nb-ink-dim)] nb-mono-label">
            Expertise pages:{" "}
            {EXPERTISE_PAGE_PATHS.map((p, i) => (
              <span key={p}>
                {i > 0 && " · "}
                <Link href={p} className="text-[var(--nb-ink-soft)] hover:text-[var(--nb-ink)]">
                  {p.replace(/^\//, "")}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
