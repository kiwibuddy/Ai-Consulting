/**
 * Tauranga SME — shared modal/citation database.
 *
 * All four sessions (Readiness, Time Audit, Team, Legal) reference this
 * single source of truth. Every stat card with `data-modal="<key>"` opens
 * the matching entry on click.
 *
 * Source: "Report — The Integration of Artificial Intelligence in New
 * Zealand and the Bay of Plenty (2025-2026)" — full bibliography of 41
 * primary sources mirrored below in the BIBLIOGRAPHY constant.
 */
(function (global) {
  "use strict";

  const MODAL_DB = {
    // ─── National macro ─────────────────────────────────────────
    nz_gdp_2038: {
      stat: "$76–$108B",
      title: "Generative AI's projected annual contribution to NZ GDP by 2038",
      body:
        "Microsoft's commissioned analysis estimates generative AI could add $76–108 billion to New Zealand's economy each year by 2038 — roughly 15% of GDP. The size of the prize is large, but capture depends entirely on adoption.",
      source: "Microsoft / NZIER, 2025",
      link: "https://news.microsoft.com/source/asia/features/nz-new-ai-economy-report-2025/",
    },
    nz_tipping_point: {
      stat: "82–87%",
      title: "Of NZ businesses are now using AI in some form",
      body:
        "AI New Zealand's 2025 numbers show NZ has crossed the tipping point — adoption is mainstream. The question is no longer whether to adopt; it's whether your adoption is good adoption.",
      source: "AI New Zealand, 2025",
      link: "https://www.newzealand.ai/c/insights/ai-in-aotearoa-in-2025-by-the-numbers",
    },
    large_business_67: {
      stat: "67%",
      title: "Large business AI use, up from 48% in 2023",
      body:
        "Large businesses jumped from 48% to 67% AI use in just one year. Their procurement and partner expectations are about to flow downhill into your supplier relationships, regardless of whether you've adopted yourself.",
      source: "MBIE, 2025",
      link: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand",
    },
    sme_gap_68: {
      stat: "68%",
      title: "Of NZ small businesses have no plans to invest in AI",
      body:
        "MBIE's research surfaces the SME gap behind the headlines: while large businesses race ahead, two thirds of small businesses have no AI plans. The gap is the most reliable signal of where the next 5 years of competitive disruption land.",
      source: "MBIE — Addressing barriers to AI uptake, 2025",
      link: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand",
    },
    expertise_gap_43: {
      stat: "43%",
      title: "Of NZ non-users cite lack of expertise as the primary blocker",
      body:
        "Of the SMEs not using AI, the largest reason isn't disinterest or cost — it's not knowing how. That's the addressable gap this programme is designed for.",
      source: "MBIE, 2025",
      link: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand",
    },
    pilot_funding: {
      stat: "$765k",
      title: "Government's AI Advisory Pilot — co-funds at least 51 SMEs",
      body:
        "Launched January 2026 through the Regional Business Partner Network, the AI Advisory Pilot co-funds the development of written AI adoption plans for SMEs. Up to $5,000 per qualifying business. Priority One administers eligibility for the Bay of Plenty.",
      source: "Beehive.govt.nz, January 2026",
      link: "https://www.beehive.govt.nz/release/new-pilot-helps-small-businesses-harness-ai",
    },
    nziat_70m: {
      stat: "$70M",
      title: "Government investment in AI research over 7 years",
      body:
        "The NZ Institute for Advanced Technology will receive $70m over seven years for AI research and capability building — a national signal that public investment is following private adoption.",
      source: "MBIE / Beehive, 2025",
      link: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/uptake-focus-new-zealands-strategic-approach",
    },

    // ─── Tauranga / Bay of Plenty ────────────────────────────────
    port_41pct: {
      stat: "41%",
      title: "Of NZ's shipping containers handled by Port of Tauranga (2025)",
      body:
        "The Port handled 41% of NZ's containers in 2025. Its AI investment is a leading indicator for the wider region: when Australasia's most productive port re-engineers around AI for safety and yard management, regional supplier expectations follow.",
      source: "Port of Tauranga Investor Day, 2026",
      link: "https://www.port-tauranga.co.nz/wp-content/uploads/Investor-Day-Presentation-2026.pdf",
    },
    port_75: {
      stat: "75%",
      title: "Carbon reduction at Stella Passage automation project",
      body:
        "The Port's Stella Passage automated stacking cranes are projected to cut carbon emissions by 75% versus traditional terminal operations. This is what AI looks like at the front end of the regional supply chain — not chatbots, but operational re-engineering.",
      source: "Royal HaskoningDHV / Port of Tauranga",
      link: "https://www.royalhaskoningdhv.com/en/projects/future-proofing-terminal-operations-in-new-zealand",
    },
    port_safety_ai: {
      stat: "Health & safety",
      title: "AI deployment to mitigate 'people vs plant' risk at the Port",
      body:
        "The Port is trialing AI to manage the highest-risk interaction in any logistics operation: the boundary between people and heavy plant. The case for AI in heavy industry is overwhelmingly safety, not headcount.",
      source: "NZISM, 2025",
      link: "https://www.nzism.org/events/tauranga-ai-technology-improving-safety-at-port-of-tauranga/",
    },
    planttech: {
      stat: "PlantTech",
      title: "Tauranga research institute pooling AI from Zespri & Robotics Plus",
      body:
        "PlantTech is the regional AI/horticulture research institute, pulling expertise from Zespri, Robotics Plus and partners. Yield prediction and automated disease management are the headline focus — directly relevant to BoP's largest export sector.",
      source: "Callaghan Innovation",
      link: "https://www.callaghaninnovation.govt.nz/stories/research-collaboration-cultivating-growth-bay-plenty/",
    },
    maori_workforce_44: {
      stat: "44%",
      title: "Of the Bay of Plenty's future workforce will be Māori",
      body:
        "The region's demographic future is heavily Māori. Toi Kai Rawa Trust and the Toi Ki Tua internship programme are bridging tertiary education and AI-intensive roles — practical Treaty partnership, not symbolism.",
      source: "Priority One / Toi Kai Rawa Trust",
      link: "https://www.priorityone.co.nz/2023/08/16/unlocking-pathways-to-success-empowering-maori-interns-for-a-thriving-region/",
    },
    knowledge_intensive: {
      stat: "24.7%",
      title: "BoP knowledge-intensive employment vs NZ avg 32.1%",
      body:
        "The region's economy is shifting toward knowledge-intensive work, but lags the national average by 7.4 percentage points. AI adoption is one of the few levers SMEs have to close that gap quickly.",
      source: "Priority One regional analysis",
      link: "https://www.priorityone.co.nz/news/",
    },
    chamber_ai: {
      stat: "Chamber",
      title: "Tauranga Business Chamber strengthening digital and AI capability",
      body:
        "The Chamber has launched dedicated AI capability programmes for member businesses, alongside Priority One. Local infrastructure for AI adoption already exists; the bottleneck is not infrastructure but matching SMEs to it.",
      source: "Tauranga Business Chamber, 2025",
      link: "https://www.tauranga.org.nz/news/chamber-strengthening-digital-and-ai-capability-for-businesses/",
    },

    // ─── Sectoral ──────────────────────────────────────────────
    food_fibre_cagr: {
      stat: "38%",
      title: "Projected annual growth rate for AI in food/beverage (2024–29)",
      body:
        "MPI's snapshot projects 38% CAGR for AI in food and beverage. The sector is conservative, with aging machinery cited as the primary barrier — but the trajectory is unmistakable.",
      source: "MPI — AI snapshot, NZ food systems",
      link: "https://www.mpi.govt.nz/dmsdocument/68112-Artificial-Intelligence-A-snapshot-of-AI-in-New-Zealand-and-global-food-systems",
    },
    halter_220m: {
      stat: "$220M",
      title: "Halter's Series E — AI-driven NZ agritech",
      body:
        "Halter (smart cattle collars / virtual fencing) closed a US$220m Series E round, signalling the scale of capital flowing into NZ-developed AI agritech.",
      source: "Top 10 AI Startups NZ 2026, Nucamp",
      link: "https://www.nucamp.co/blog/top-10-ai-startups-nz-2026",
    },
    finance_skills_93: {
      stat: "9.3%",
      title: "Of NZ job postings demanding AI skills come from finance",
      body:
        "Financial services lead AI skills demand by a wide margin. ASB's virtual assistant deployment — credited with a 30% increase in customer satisfaction — is a representative example.",
      source: "PwC AI Jobs Barometer 2025 (NZ)",
      link: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf",
    },
    asb_30: {
      stat: "30%",
      title: "ASB customer satisfaction increase using AI virtual assistants",
      body:
        "ASB reported a 30% increase in customer satisfaction following its AI virtual-assistant rollout. A useful counterpoint to the pessimistic framing: AI deployed well moves customer experience metrics in the right direction.",
      source: "FintechNZ — Future Bank report",
      link: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/",
    },
    skills_change_66: {
      stat: "66%",
      title: "Faster skills change in AI-exposed roles",
      body:
        "PwC finds skills demand changes 66% faster in AI-exposed roles than in non-exposed ones. The half-life of an entry-level job description is collapsing — and so is the half-life of any static training plan.",
      source: "PwC AI Jobs Barometer 2025 (NZ)",
      link: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf",
    },
    venture_200pct: {
      stat: "+200%",
      title: "YoY growth in NZ venture funding for AI startups",
      body:
        "Venture funding for NZ AI startups grew 200% year-on-year. Capital is no longer the rate-limiter; SME-side absorptive capacity is.",
      source: "Top 10 AI Startups NZ 2026, Nucamp",
      link: "https://www.nucamp.co/blog/top-10-ai-startups-nz-2026",
    },
    data_centre_34: {
      stat: "$3.4B",
      title: "Forecast NZ data-centre & app industry by 2035",
      body:
        "Sustainable data-centre infrastructure is now treated as core national infrastructure. The compute side of the AI economy is being built locally — a strategic asset for sovereignty and resilience.",
      source: "Microsoft / NZIER",
      link: "https://news.microsoft.com/source/asia/features/nz-new-ai-economy-report-2025/",
    },

    // ─── Legal & ethical ────────────────────────────────────────
    opc_ipps_13: {
      stat: "13",
      title: "Privacy Principles apply to all AI data collection",
      body:
        "The OPC guidance is unambiguous: every IPP applies to AI use. Senior leadership approval and (where appropriate) Māori consultation are explicitly expected before deployment of AI tools that touch personal information.",
      source: "Office of the Privacy Commissioner, 2025",
      link: "https://privacy.org.nz/assets/New-order/Your-rights/AI-guidance-IPPs.pdf",
    },
    pia_required: {
      stat: "PIA",
      title: "Privacy Impact Assessment expected before AI deployment",
      body:
        "OPC guidance positions a Privacy Impact Assessment as the working baseline for any AI tool that processes personal data — including third-party SaaS. Skipping the PIA is the most common compliance failure we see.",
      source: "OPC / Anderson Lloyd commentary",
      link: "https://www.al.nz/updates/ai-tools-and-privacy-the-opc-releases-new-guidance/",
    },
    nz_copyright_anomaly: {
      stat: "CGW",
      title: "NZ uniquely recognises 'Computer-Generated Works' under copyright",
      body:
        "NZ is anomalous internationally: the Copyright Act 1994 explicitly protects 'computer-generated works' that meet an objective originality test, even without a human author. Ownership of AI outputs is contested elsewhere; in NZ it has a (still-developing) statutory home.",
      source: "Bell Gully — AI ownership for NZ businesses",
      link: "https://www.bellgully.com/insights/do-you-own-your-ai-generated-content-a-summary-for-nz-businesses/",
    },
    ajpark_ip: {
      stat: "IP review",
      title: "AJ Park: NZ copyright + AI — the practical gaps",
      body:
        "AJ Park's analysis points to the practical gaps for NZ businesses: training data licensing, output ownership in commercial contracts, and supplier indemnities. Most NZ SME contracts haven't been updated for any of this.",
      source: "AJ Park, 2025",
      link: "https://www.ajpark.com/insights/new-zealand-copyright-and-artificial-intelligence/",
    },
    mds_taonga: {
      stat: "Taonga",
      title: "Māori data sovereignty — data treated as a treasure",
      body:
        "Māori Data Sovereignty principles require Māori governance over how Māori data is collected and used. For BoP businesses operating with iwi partners, supplier vetting, customer data, and AI tool selection all sit inside this framework.",
      source: "MDS principles / Acronis NZ summary",
      link: "https://www.acronis.com/en-nz/blog/posts/data-sovereignty-and-compliance-in-new-zealand/",
    },
    biz_govt_safe_smart: {
      stat: "business.govt.nz",
      title: "Government's plain-language SME AI guidance",
      body:
        "business.govt.nz publishes the official 'Safe and Smart AI use' guidance for SMEs — a clear baseline document covering data, vendor checks, employee policies and disclosure.",
      source: "business.govt.nz",
      link: "https://www.business.govt.nz/operations/getting-started-with-ai/safe-and-smart-ai-use",
    },
    rbnz_exposure: {
      stat: "RBNZ",
      title: "AI/robotics exposure assessment of the NZ labour market",
      body:
        "The Reserve Bank's 2026 analytical note uses LLMs to map AI exposure across the NZ labour market — a primary, sober source for which roles are most exposed and which are insulated.",
      source: "RBNZ Analytical Note, 2026",
      link: "https://www.rbnz.govt.nz/hub/publications/analytical-note/2026/assessing-ai-and-robotics-exposure-in-the-nz-labour-market-using-llms",
    },

    // ─── Banking & open data ───────────────────────────────────
    cdr_open_banking: {
      stat: "CDR",
      title: "NZ's Consumer Data Right rollout — open banking first",
      body:
        "MinterEllisonRuddWatts' rundown of the Consumer Data Right confirms open banking is the first sector. SMEs whose AI plans rely on financial data should treat CDR readiness as part of the same workstream.",
      source: "MinterEllisonRuddWatts, 2025",
      link: "https://www.minterellison.co.nz/insights/consumer-data-rights-a-focus-on-open-banking-in-new-zealand",
    },

    // ─── Practical / operational ───────────────────────────────
    chamber_ai_growth: {
      stat: "Chamber",
      title: "AI for business growth — Tauranga Chamber primer",
      body:
        "The Chamber's plain-language primer is a useful starting point for BoP SMEs that want a peer-trusted local source before paying for advisory.",
      source: "Tauranga Business Chamber",
      link: "https://www.tauranga.org.nz/news/ai-for-business-growth/",
    },
    pwc_tourism: {
      stat: "Tourism",
      title: "AI personalisation, efficiency and growth in NZ tourism",
      body:
        "PwC's tourism analysis identifies the highest-leverage AI use cases for hospitality and tourism — relevant to a sizeable share of the BoP economy.",
      source: "PwC, 2025",
      link: "https://www.pwc.com/m1/en/publications/2025/docs/ai-tourism-hospitality.pdf",
    },
    bm_2026: {
      stat: "Plan 2026",
      title: "AI planning guide for NZ small businesses",
      body:
        "Business Mentors NZ's 2026 strategic-planning guide is a practical, plain-English template for SMEs setting AI direction for the year — useful pre-reading for our Time Audit and Readiness worksheets.",
      source: "Business Mentors NZ",
      link: "https://www.businessmentors.org.nz/strategic-planning-guide-nz-small-businesses-ai/",
    },
    cloud_media: {
      stat: "Local tools",
      title: "Local marketing automation tools that work for NZ SMEs",
      body:
        "Cloud Media's tool roundup is a useful local reference for marketing-automation-grade AI tools that fit the NZ small-business context.",
      source: "Cloud Media NZ",
      link: "https://cloudmedia.co.nz/blog/best-ai-tools-for-local-businesses-to-automate-marketing/",
    },
    side_hustle: {
      stat: "1 in 3",
      title: "Young NZers running an active 'side hustle'",
      body:
        "Banking and ethics research finds 1 in 3 young New Zealanders run a side hustle. AI lowers the cost of entry for these micro-businesses — a structural shift in the economy worth pricing into your own model.",
      source: "FintechNZ / Future Bank",
      link: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/",
    },
    auckland_advantage: {
      stat: "$3.4B",
      title: "University of Auckland — NZ's AI advantage",
      body:
        "Auckland's analysis frames the national AI advantage in research-and-talent terms — a useful counter-narrative to the 'NZ is too small' framing that holds many SME owners back.",
      source: "University of Auckland, 2025",
      link: "https://www.auckland.ac.nz/en/news/2025/08/18/new-zealand-s-ai-advantage.html",
    },
    nemko_strategy: {
      stat: "Strategy",
      title: "Nemko — summary of NZ's 2025 AI Strategy",
      body:
        "Nemko Digital's summary of the National AI Strategy is a useful one-page brief for boards and owners deciding how to position relative to government direction.",
      source: "Nemko Digital",
      link: "https://digital.nemko.com/news/new-zealand-ai-strategy-2025",
    },
    aiforum_roadmap: {
      stat: "Roadmap",
      title: "AI Forum NZ — 'Towards our intelligent future'",
      body:
        "AI Forum NZ's roadmap report remains the canonical baseline for understanding NZ's AI institutional landscape.",
      source: "AI Forum NZ",
      link: "https://aiforum.org.nz/wp-content/uploads/2019/09/Towards-Our-Intelligent-Future-AI-Roadmap-Report.pdf",
    },
    scentian_bio: {
      stat: "Scentian",
      title: "AI biosensor trial with the world's largest kiwifruit marketer",
      body:
        "Scentian Bio's deployment with Zespri is a representative example of BoP-anchored AI commercial deployment — sensor-driven, sector-specific, and exportable.",
      source: "AgFunderNews",
      link: "https://agfundernews.com/scentian-bio-deploys-ai-powered-biosensor-tech-in-trial-with-worlds-largest-kiwifruit-marketer",
    },
    energy_leadership: {
      stat: "Energy",
      title: "Western Bay of Plenty Energy Leadership Group",
      body:
        "Priority One's Energy Leadership Group is the regional vehicle for the energy transition — relevant to the cost story for compute and any owner thinking through total cost of AI ownership.",
      source: "Priority One, 2025",
      link: "https://www.priorityone.co.nz/2025/08/21/energy-leadership-group-to-lead-the-western-bays-energy-transition/",
    },

    pwc_admin_60: {
      stat: "~60%",
      title: "Admin, coordination & non-core work",
      body:
        "PwC's Barometer framing for NZ shows the majority of professional time disappearing into coordination, repetitive admin and work that doesn't grow the mission — the practical reason to audit before you vendor-shop.",
      source: "PwC AI Jobs Barometer 2025 (NZ)",
      link: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf",
    },
    pwc_daily_reclaimed: {
      stat: "~52 min",
      title: "Early adopters claw back roughly an hour a day",
      body:
        "PwC's analysis flags material time-back in early AI adoption — roughly an hour/day in reclaimed professional time when pilots are scoped and measured honestly. Translation: measure before you boast.",
      source: "PwC AI Jobs Barometer 2025",
      link: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf",
    },
    toi_ki_tua: {
      stat: "Toi Ki Tua",
      title: "Tertiary → AI-intensive internships in the BoP",
      body:
        "Toi Kai Rawa Trust's internship pathway bridges tertiary learners into AI-heavy roles alongside organisations like Zespri — concrete workforce development, not a slide slogan.",
      source: "Priority One / Toi Kai Rawa Trust",
      link: "https://www.priorityone.co.nz/2023/08/16/unlocking-pathways-to-success-empowering-maori-interns-for-a-thriving-region/",
    },
    young_values_trust: {
      stat: "Values",
      title: "Young NZ workforce expectations",
      body:
        "Survey research on young people's banking habits points to appetite for ethics-forward institutions. Applied to workplaces: ambiguous AI rollout erodes retention; framed, fair rollout builds it.",
      source: "FintechNZ — The Future Bank",
      link: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/",
    },
    employment_good_faith: {
      stat: "Good faith",
      title: "Restructuring & conversation obligations",
      body:
        "When roles genuinely change, Employment NZ expects good-faith consultation, fair processes, and redundancy only where restructuring is substantive — AI doesn't suspend the Employment Relations Act.",
      source: "Employment New Zealand",
      link: "https://www.employment.govt.nz/ending-employment/redundancy/restructuring/",
    },
    originality_standard: {
      stat: "Originality",
      title: "Computer-generated works — the originality standard",
      body:
        "NZ law recognises some computer-generated works, but originality and contractual ownership remain live questions. Contracts and human review gates matter more than the logo on the AI tool.",
      source: "AJ Park / Bell Gully summaries",
      link: "https://www.bellgully.com/insights/do-you-own-your-ai-generated-content-a-summary-for-nz-businesses/",
    },
    bop_upskill_pathways: {
      stat: "Upskill",
      title: "Credentialed pathways in the BoP",
      body:
        "Pair local providers (e.g. Te Pūkenga / Toi Ohomai) with vendor micro-credentials and Priority One workforce programmes so each team member gets a named path, not ad-hoc TikTok tips.",
      source: "Toi Ohomai Institute of Technology",
      link: "https://www.toiohomai.ac.nz/",
    },
  };

  const BIBLIOGRAPHY = [
    { n: 1, title: "AI Technology Improving Safety at Port of Tauranga — NZISM", url: "https://www.nzism.org/events/tauranga-ai-technology-improving-safety-at-port-of-tauranga/" },
    { n: 2, title: "AI adoption in NZ has reached a tipping point — AI New Zealand", url: "https://www.newzealand.ai/c/insights/ai-in-aotearoa-in-2025-by-the-numbers" },
    { n: 3, title: "AI at the heart of tourism and hospitality — PwC", url: "https://www.pwc.com/m1/en/publications/2025/docs/ai-tourism-hospitality.pdf" },
    { n: 4, title: "AI for Business Growth — Tauranga Business Chamber", url: "https://www.tauranga.org.nz/news/ai-for-business-growth/" },
    { n: 5, title: "AI tools and privacy — OPC releases new guidance — Anderson Lloyd", url: "https://www.al.nz/updates/ai-tools-and-privacy-the-opc-releases-new-guidance/" },
    { n: 6, title: "Addressing barriers to AI uptake in NZ — MBIE", url: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand" },
    { n: 7, title: "AI: A snapshot of AI in NZ and global food systems — MPI", url: "https://www.mpi.govt.nz/dmsdocument/68112-Artificial-Intelligence-A-snapshot-of-AI-in-New-Zealand-and-global-food-systems" },
    { n: 8, title: "Assessing AI and Robotics Exposure in NZ Labour Market — RBNZ", url: "https://www.rbnz.govt.nz/hub/publications/analytical-note/2026/assessing-ai-and-robotics-exposure-in-the-nz-labour-market-using-llms" },
    { n: 9, title: "Best AI Tools for Local Businesses — Cloud Media", url: "https://cloudmedia.co.nz/blog/best-ai-tools-for-local-businesses-to-automate-marketing/" },
    { n: 10, title: "Chamber strengthening digital and AI capability — Tauranga Business Chamber", url: "https://www.tauranga.org.nz/news/chamber-strengthening-digital-and-ai-capability-for-businesses/" },
    { n: 11, title: "Data sovereignty and compliance in NZ — Acronis", url: "https://www.acronis.com/en-nz/blog/posts/data-sovereignty-and-compliance-in-new-zealand/" },
    { n: 12, title: "Do you own your AI-generated content? A summary for NZ businesses — Bell Gully", url: "https://www.bellgully.com/insights/do-you-own-your-ai-generated-content-a-summary-for-nz-businesses/" },
    { n: 13, title: "Energy Leadership Group to lead Western Bay's energy transition — Priority One", url: "https://www.priorityone.co.nz/2025/08/21/energy-leadership-group-to-lead-the-western-bays-energy-transition/" },
    { n: 14, title: "Future-proofing terminal operations in NZ — Royal HaskoningDHV", url: "https://www.royalhaskoningdhv.com/en/projects/future-proofing-terminal-operations-in-new-zealand" },
    { n: 15, title: "Investor Day 2026 — Port of Tauranga", url: "https://www.port-tauranga.co.nz/wp-content/uploads/Investor-Day-Presentation-2026.pdf" },
    { n: 16, title: "NZ launches AI advisory pilot for small businesses — eCommerceNews", url: "https://ecommercenews.co.nz/story/nz-launches-ai-advisory-pilot-for-small-businesses" },
    { n: 17, title: "New Zealand AI Strategy 2025 — Nemko Digital", url: "https://digital.nemko.com/news/new-zealand-ai-strategy-2025" },
    { n: 18, title: "New Zealand copyright and artificial intelligence — AJ Park", url: "https://www.ajpark.com/insights/new-zealand-copyright-and-artificial-intelligence/" },
    { n: 19, title: "New Zealand's AI advantage — University of Auckland", url: "https://www.auckland.ac.nz/en/news/2025/08/18/new-zealand-s-ai-advantage.html" },
    { n: 20, title: "Consumer Data Right and open banking — MinterEllisonRuddWatts", url: "https://www.minterellison.co.nz/insights/consumer-data-rights-a-focus-on-open-banking-in-new-zealand" },
    { n: 21, title: "New pilot helps small businesses harness AI — Beehive.govt.nz", url: "https://www.beehive.govt.nz/release/new-pilot-helps-small-businesses-harness-ai" },
    { n: 22, title: "News — Priority One", url: "https://www.priorityone.co.nz/news/" },
    { n: 23, title: "Plan Your 2026 Business Year With AI — Business Mentors NZ", url: "https://www.businessmentors.org.nz/strategic-planning-guide-nz-small-businesses-ai/" },
    { n: 24, title: "PlantTech: Research collaboration cultivating growth in BoP — Callaghan Innovation", url: "https://www.callaghaninnovation.govt.nz/stories/research-collaboration-cultivating-growth-bay-plenty/" },
    { n: 25, title: "PlantTech: Research collaboration (Deep Dive Archive)", url: "https://www.callaghaninnovation.govt.nz/stories/research-collaboration-cultivating-growth-bay-plenty/" },
    { n: 26, title: "Port of Tauranga ESG Profile", url: "https://www.port-tauranga.co.nz/community/port-of-tauranga-esg-profile/" },
    { n: 27, title: "Safe and smart AI use — business.govt.nz", url: "https://www.business.govt.nz/operations/getting-started-with-ai/safe-and-smart-ai-use" },
    { n: 28, title: "Scentian Bio AI biosensor trial with Zespri — AgFunderNews", url: "https://agfundernews.com/scentian-bio-deploys-ai-powered-biosensor-tech-in-trial-with-worlds-largest-kiwifruit-marketer" },
    { n: 29, title: "Setting the course — Port of Tauranga Annual Report", url: "https://www.port-tauranga.co.nz/wp-content/uploads/POTJ201322-PORT-IAR-2025-WEB-FA2.pdf" },
    { n: 30, title: "Showcasing sustainability — Priority One", url: "https://www.priorityone.co.nz/category/showcasing-sustainability/" },
    { n: 31, title: "Supporting business and education — Tauranga City Council", url: "https://www.tauranga.govt.nz/Our-Future/Our-Direction/Supporting-business-and-education" },
    { n: 32, title: "The Economic and Industrial Metamorphosis of NZ and BoP", url: "" },
    { n: 33, title: "The Fearless Future: 2025 Global AI Jobs Barometer — PwC", url: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf" },
    { n: 34, title: "AI Jobs Barometer 2025 — NZ Analysis — PwC", url: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf" },
    { n: 35, title: "The Future Bank starts here — FintechNZ", url: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/" },
    { n: 36, title: "Top 10 AI Startups to Watch in NZ in 2026 — Nucamp / Irene Holden", url: "https://www.nucamp.co/blog/top-10-ai-startups-nz-2026" },
    { n: 37, title: "Unlocking NZ's $3.4 billion AI advantage — Microsoft Source", url: "https://news.microsoft.com/source/asia/features/nz-new-ai-economy-report-2025/" },
    { n: 38, title: "Unlocking Pathways to Success: Empowering Māori Interns — Priority One", url: "https://www.priorityone.co.nz/2023/08/16/unlocking-pathways-to-success-empowering-maori-interns-for-a-thriving-region/" },
    { n: 39, title: "Uptake focus: NZ's strategic approach — MBIE", url: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/uptake-focus-new-zealands-strategic-approach" },
    { n: 40, title: "Guidance on artificial intelligence and the IPPs — Privacy Commissioner", url: "https://privacy.org.nz/assets/New-order/Your-rights/AI-guidance-IPPs.pdf" },
    { n: 41, title: "Towards our intelligent future — AI Forum NZ", url: "https://aiforum.org.nz/wp-content/uploads/2019/09/Towards-Our-Intelligent-Future-AI-Roadmap-Report.pdf" },
  ];

  const BIBLIOGRAPHY_S2 = [
    { n: 1, title: "Addressing barriers to AI uptake in NZ — MBIE", url: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand" },
    { n: 2, title: "PwC — AI Jobs Barometer 2025 (NZ Analysis)", url: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf" },
    { n: 3, title: "Plan your 2026 business year with AI — Business Mentors NZ", url: "https://www.businessmentors.org.nz/strategic-planning-guide-nz-small-businesses-ai/" },
    { n: 4, title: "Safe and smart AI use — business.govt.nz", url: "https://www.business.govt.nz/operations/getting-started-with-ai/safe-and-smart-ai-use" },
    { n: 5, title: "The Future Bank starts here — FintechNZ", url: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/" },
    { n: 6, title: "Top 10 AI Startups to Watch in NZ — Nucamp", url: "https://www.nucamp.co/blog/top-10-ai-startups-nz-2026" },
    { n: 7, title: "Scentian Bio + Zespri biosensor trial — AgFunderNews", url: "https://agfundernews.com/scentian-bio-deploys-ai-powered-biosensor-tech-in-trial-with-worlds-largest-kiwifruit-marketer" },
    { n: 8, title: "MPI — AI snapshot across NZ food systems", url: "https://www.mpi.govt.nz/dmsdocument/68112-Artificial-Intelligence-A-snapshot-of-AI-in-New-Zealand-and-global-food-systems" },
    { n: 9, title: "AI Advisory Pilot — Beehive.govt.nz", url: "https://www.beehive.govt.nz/release/new-pilot-helps-small-businesses-harness-ai" },
    { n: 10, title: "PlantTech & BoP horticulture AI — Callaghan Innovation", url: "https://www.callaghaninnovation.govt.nz/stories/research-collaboration-cultivating-growth-bay-plenty/" },
    { n: 11, title: "NZ AI economy outlook — Microsoft Source", url: "https://news.microsoft.com/source/asia/features/nz-new-ai-economy-report-2025/" },
  ];

  const BIBLIOGRAPHY_S3 = [
    { n: 1, title: "PwC — AI Jobs Barometer 2025 (NZ Analysis)", url: "https://www.pwc.com/gx/en/issues/artificial-intelligence/job-barometer/aijb-2025-new-zealand-analysis.pdf" },
    { n: 2, title: "Assessing AI exposure in the NZ labour market — RBNZ Analytical Note", url: "https://www.rbnz.govt.nz/hub/publications/analytical-note/2026/assessing-ai-and-robotics-exposure-in-the-nz-labour-market-using-llms" },
    { n: 3, title: "Addressing barriers to AI uptake in NZ — MBIE", url: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand" },
    { n: 4, title: "Toi Ki Tua — empowering Māori interns — Priority One", url: "https://www.priorityone.co.nz/2023/08/16/unlocking-pathways-to-success-empowering-maori-interns-for-a-thriving-region/" },
    { n: 5, title: "Supporting business and education — Tauranga City Council", url: "https://www.tauranga.govt.nz/Our-Future/Our-Direction/Supporting-business-and-education" },
    { n: 6, title: "Guidance — AI & the Privacy Act IPPs — OPC", url: "https://privacy.org.nz/assets/New-order/Your-rights/AI-guidance-IPPs.pdf" },
    { n: 7, title: "The Future Bank starts here — FintechNZ", url: "https://fintechnz.org.nz/reports/the-future-bank-starts-here/" },
    { n: 8, title: "Restructuring and redundancy — Employment New Zealand", url: "https://www.employment.govt.nz/ending-employment/redundancy/restructuring/" },
    { n: 9, title: "Data sovereignty in NZ — Acronis", url: "https://www.acronis.com/en-nz/blog/posts/data-sovereignty-and-compliance-in-new-zealand/" },
    { n: 10, title: "Chamber AI capability programme — Tauranga Business Chamber", url: "https://www.tauranga.org.nz/news/chamber-strengthening-digital-and-ai-capability-for-businesses/" },
    { n: 11, title: "Priority One — regional business news", url: "https://www.priorityone.co.nz/news/" },
    { n: 12, title: "Toi Ohomai Institute of Technology", url: "https://www.toiohomai.ac.nz/" },
  ];

  const BIBLIOGRAPHY_S4 = [
    { n: 1, title: "Guidance — AI & the Privacy Act IPPs — OPC", url: "https://privacy.org.nz/assets/New-order/Your-rights/AI-guidance-IPPs.pdf" },
    { n: 2, title: "AI tools & privacy — Anderson Lloyd", url: "https://www.al.nz/updates/ai-tools-and-privacy-the-opc-releases-new-guidance/" },
    { n: 3, title: "Do you own your AI-generated content? — Bell Gully", url: "https://www.bellgully.com/insights/do-you-own-your-ai-generated-content-a-summary-for-nz-businesses/" },
    { n: 4, title: "NZ copyright and artificial intelligence — AJ Park", url: "https://www.ajpark.com/insights/new-zealand-copyright-and-artificial-intelligence/" },
    { n: 5, title: "Data sovereignty in NZ — Acronis", url: "https://www.acronis.com/en-nz/blog/posts/data-sovereignty-and-compliance-in-new-zealand/" },
    { n: 6, title: "Te Mana Raraunga — Māori Data Sovereignty Network", url: "https://www.temanararaunga.maori.nz/" },
    { n: 7, title: "Safe and smart AI use — business.govt.nz", url: "https://www.business.govt.nz/operations/getting-started-with-ai/safe-and-smart-ai-use" },
    { n: 8, title: "Consumer Data Right — MinterEllisonRuddWatts", url: "https://www.minterellison.co.nz/insights/consumer-data-rights-a-focus-on-open-banking-in-new-zealand" },
    { n: 9, title: "Addressing barriers to AI uptake — MBIE", url: "https://www.mbie.govt.nz/business-and-employment/economic-growth/digital-policy/new-zealands-ai-strategy-investing-with-confidence/addressing-barriers-to-ai-uptake-in-new-zealand" },
    { n: 10, title: "Towards our intelligent future — AI Forum NZ", url: "https://aiforum.org.nz/wp-content/uploads/2019/09/Towards-Our-Intelligent-Future-AI-Roadmap-Report.pdf" },
    { n: 11, title: "AI Advisory Pilot — Beehive.govt.nz", url: "https://www.beehive.govt.nz/release/new-pilot-helps-small-businesses-harness-ai" },
    { n: 12, title: "NZ SME AI Advisory Pilot — eCommerceNews", url: "https://ecommercenews.co.nz/story/nz-launches-ai-advisory-pilot-for-small-businesses" },
  ];

  global.MODAL_DB = MODAL_DB;
  global.BIBLIOGRAPHY = BIBLIOGRAPHY;
  global.BIBLIOGRAPHY_BY_SESSION = {
    s1: BIBLIOGRAPHY,
    s2: BIBLIOGRAPHY_S2,
    s3: BIBLIOGRAPHY_S3,
    s4: BIBLIOGRAPHY_S4,
  };
})(typeof window !== "undefined" ? window : globalThis);
