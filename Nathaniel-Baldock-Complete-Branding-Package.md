# Nathaniel Baldock AI Consulting
## Public Marketing Site — Branding & Marketing Package

**Domain:** [nathanielbaldock.com](https://www.nathanielbaldock.com)  
**Date:** February 9, 2026 (visual identity updated June 2026)  
**Status:** Live — public site uses Cinematic Hybrid theme

---

## Scope — read this first

**This document describes the brand as visitors experience it on the public marketing website** — the pages wrapped in `data-theme="public"` (dark cinematic shell, lime accent, Newsreader typography).

| In scope | Out of scope (separate design systems) |
|----------|------------------------------------------|
| Homepage, About, Speaking, Resources, Pricing | Client / coach login and dashboard (`data-theme="app"`, orange accent) |
| Public articles and resource listings | Standalone worksheets, HTML tools, and presentations |
| Intake / contact flows on public routes | Tauranga SME programme decks and materials |
| Site header, footer, hero, public CTAs | Audit tool UI (`audit.html` shares this palette but is a product surface) |

**Canonical implementation:** `client/src/styles/cinematic.css` · **Tokens reference:** `docs/BRAND_IDENTITY_AND_GUIDELINES.md`

Messaging and growth sections (3–6) below still apply to how you market the consulting practice; **all visual and UI decisions for the public site must follow Section 1.**

---

## Table of Contents
1. Brand Identity System *(public marketing site only)*
2. Website Content Strategy (Public Page Structure)
3. Marketing Messaging Framework
4. Content Assets Needed
5. Launch Checklist
6. Growth Strategy (First 90 Days)

---

## 1. BRAND IDENTITY SYSTEM

*Applies only to the public marketing site (`data-theme="public"`).*

### Brand Name
**Primary:** Nathaniel Baldock  
**Legal/Formal:** Nathaniel Baldock Consulting (optional)  
**Domain:** nathanielbaldock.com

### Tagline System

**Primary Tagline (Homepage hero — live):**  
"Practical AI for people who lead with *discernment*."

**Secondary Taglines (Context-Dependent):**
- "AI Consulting for Faith, Education & Mission-Driven Leaders" (Footer, meta descriptor)
- "Wisdom over hype. People over margins." (Values — homepage and supporting copy)
- "AI Consultant Tauranga · Nathaniel Baldock — AI Consulting New Zealand & Global" (SEO title)
- "Practical AI. Real-World Constraints. Measurable Outcomes." (Process focus — speaking, proposals)

### Brand Positioning Statement

**FOR** faith-based organizations, schools, nonprofits, and mission-driven leaders  
**WHO** need to adopt AI without compromising values, trust, or mission  
**NATHANIEL BALDOCK** is an AI consultant  
**WHO** brings 20+ years of global mission experience PLUS proven technical delivery capability  
**UNLIKE** corporate AI consultants who don't understand your world OR faith consultants who lack technical depth  
**HE** designs and ships real systems—from strategy to App Store—that serve your mission without exploiting it

### Brand Essence

**Core Promise:**  
AI consulting that serves formation, not exploitation

**Brand Personality Attributes:**
- Wise (not flashy)
- Grounded (not hype-driven)
- Proven (not theoretical)
- Human-centered (not tech-obsessed)
- Global (not provincial)
- Calm (not anxious)

**Voice & Tone:**
- Professional but warm
- Confident without arrogance
- Technical without jargon
- Values-explicit without being preachy
- Direct and honest

### Visual Identity — Cinematic Public Theme

The public site uses a **dark editorial shell** with warm cream typography and lime-green accent. This is implemented as CSS custom properties on `[data-theme="public"]` in `client/src/styles/cinematic.css`.

#### Color Palette

**Surfaces:**
- Page background: `#0F1014` (`--nb-bg`) — also `theme-color` in `index.html`
- Raised sections / cards: `#16181D` (`--nb-bg-raised`)
- Panel overlays: `rgba(255, 255, 255, 0.04)` (`--nb-bg-panel`)

**Typography colours:**
- Primary text (cream): `#F4EFE2` (`--nb-ink`)
- Body / secondary: `rgba(244, 239, 226, 0.65)` (`--nb-ink-soft`)
- Muted / captions: `rgba(244, 239, 226, 0.40)` (`--nb-ink-dim`)

**Structure:**
- Dividers: `rgba(244, 239, 226, 0.14)` (`--nb-rule`)
- Strong borders: `rgba(244, 239, 226, 0.24)` (`--nb-rule-strong`)

**Accent & CTA:**
- Lime accent: `#7CCC1E` (`--nb-accent`) — eyebrows, italic emphasis, section numbers, selection
- Green: `#11C25C` (`--nb-green`) — CTA gradient start
- Primary button: `linear-gradient(135deg, #11C25C, #7CCC1E)` (`--nb-cta-gradient`), white label text

**Usage guidelines:**
- Dark ink background on all public page shells — not white full-page backgrounds
- Cream for headlines and body; lime for emphasis — not navy, amber, or orange
- Primary CTAs use the green gradient (`nb-btn-primary`) — never the dashboard orange
- Form fields on public routes use `public-form-light` (white inputs on the dark shell)

#### Typography System

**Display / headings:**
- Font: **Newsreader** (weights 300–700)
- Usage: H1, H2, hero headlines, stat values, card titles
- Classes: `nb-display`, `nb-display-hero`, `nb-display-lg`, `nb-page-title`, `nb-section-title`
- Characteristics: Light weight on hero, tight letter-spacing (`-0.028em` to `-0.035em`)

**Italic accent:**
- Font: **Instrument Serif** (italic, weight 300)
- Usage: Emphasised words in headlines (*discernment*), pull-quote flavour
- Class: `nb-italic-accent`

**Body text:**
- Font: **Inter** (weights 300–700)
- Usage: Paragraphs, navigation, buttons, descriptions
- Classes: `nb-body`, `nb-body-lg`
- Line height: 1.7

**Labels / metadata:**
- Font: **IBM Plex Mono** (400, 500)
- Usage: Eyebrows, section labels, stat labels, hero kicker
- Class: `nb-mono-label`, `nb-eyebrow`, `SectionLabel`
- Style: 11px, uppercase, letter-spacing `0.18em`

**Google Fonts (loaded in `client/index.html`):**
```
Newsreader, Instrument Serif, Inter, IBM Plex Mono
```

**Type scale (public site):**
- Hero H1: `clamp(48px, 8.4vw, 108px)` — `.nb-display-hero`
- Section H2: `clamp(32px, 4.4vw, 60px)` — `.nb-display-lg`
- Page title: `clamp(36px, 5vw, 56px)` — `.nb-page-title`
- Body: `clamp(15px, 1.2vw, 17px)`
- Body large (hero subcopy): `clamp(17px, 1.4vw, 20px)`
- Mono label: 11px uppercase

#### Photography & Imagery Style

**Primary Photography:**
- Real photos of Nathaniel (not stock imagery)
- Natural lighting with warm tones
- Mix of professional setting + field/mission contexts
- Shows cross-cultural work and global reach
- Human-centered (people > technology)

**Photo Types Needed:**
1. Professional headshot (hero section)
2. Working with team (collaboration context)
3. Teaching/training context (establishes expertise)
4. Field work photos (mission contexts - Papua New Guinea, Kenya, etc.)
5. Casual but professional (approachable authority)

**Image Treatment:**
- Dark gradient scrims over hero photography (`nb-hero-gradient-side`, `nb-hero-gradient-bottom`) so copy never sits unreadably on faces
- Subtle warm color grade; natural, not overly processed
- Avoid stock "diverse teams" or neon AI brain illustrations

**Iconography:**
- Lucide icons at modest size; stroke style matching Inter UI weight
- Colour: cream or lime on dark backgrounds — not navy/teal fills

#### Logo System

**Assets (public site):**
| File | Path | Use |
|------|------|-----|
| Wordmark | `client/public/logo.png` | Header, footer |
| Full wordmark | `client/public/logo-full.png` | Wide layouts |
| Favicon | `client/public/favicon.png` | Browser tab, PWA |

**On the public site (dark shell):**
- Logo is **inverted to white** via `.nb-logo-invert` (`filter: brightness(0) invert(1)`)
- Header: `logo.png` at 38px height (scrolled: 32px)
- Footer descriptor (text, not in logo file): *AI Consulting for Faith, Education & Mission-Driven Leaders*

**Logo usage:**
- Minimum clear space: 1× logo height on all sides
- Minimum width: 120px for legibility
- Never stretch, rotate, or add drop-shadows
- On photography: always use header blur/scrim — logo sits on solid or blurred dark bar

#### Public UI components

**Primary CTA** — class `nb-btn-primary`  
Label (standard across public site): **"Book a free 30-min consultation"** → `/intake`  
Green gradient, white text, subtle lime glow on hover.

**Secondary CTA** — class `nb-btn-secondary`  
Text link with bottom border; hover shifts border to lime.

**Section label** — `SectionLabel` / `nb-section-label`  
Mono uppercase with optional number in lime: e.g. `01 — How I help`

**Header** — fixed, scroll-aware blur on `rgba(15, 16, 20, 0.78)`; nav links cream at 78% opacity, full white on hover/active.

**Footer** — dark cinematic three-column layout; inverted logo; newsletter uses `nb-btn-primary--sm`.

---

## 2. WEBSITE CONTENT STRATEGY

*Public marketing routes only. Visual treatment for every page below follows Section 1 (Cinematic Public theme).*

### Site Map (live public navigation)
```
Home (/)
├── About Me (/about)
│   └── Who is Nathaniel Baldock? (/who-is-nathaniel-baldock)
├── Speaking (/speaking)
├── Resources (/resources)
│   ├── Articles (/resources/…)
│   └── Worksheets & tools (listed on Resources; individual URLs)
├── Pricing (/pricing)
├── Book consultation (/intake)
├── Login (/login)          ← public route, but app theme after sign-in
├── Privacy (/privacy)
└── Terms (/terms)
```

Header nav (desktop): **Home · About Me · Speaking · Resources · Pricing · Sign In** + primary CTA **Book a free 30-min consultation**.

> **Wireframe note:** Sections below describe *content structure* for the homepage and related public pages. Where a wireframe says "White" or "Light gray" background, treat that as legacy drafting — **on the live site every section uses the Cinematic Public palette** (`--nb-bg`, `--nb-bg-raised`, cream text). Only form fields inside `public-form-light` use white surfaces.

---

### HOME PAGE - Full Content Structure

#### NAVIGATION BAR
```
[Logo: Nathaniel Baldock — inverted white on dark bar]

Home | About Me | Speaking | Resources | Pricing | Sign In

[CTA: Book a free 30-min consultation]  → /intake
```

---

#### SECTION 1: HERO (live homepage)

**Layout:** Full-bleed portrait with dark gradient scrim; copy overlaid left (desktop) or stacked below photo (mobile)

**Content:**
```
[Eyebrow — IBM Plex Mono, lime dot + uppercase]
AI CONSULTING · TAURANGA · AOTEAROA · GLOBAL

[Main Headline — Newsreader, cream, nb-display-hero]
Practical AI for
people who lead with discernment.

[Subheadline — Inter, nb-body-lg]
I can help churches, schools, and mission-driven organisations adopt AI wisely —
without hype, without fear, and without losing what matters most.

[Primary CTA]
Book a free 30-min consultation

[Secondary promo — Hero Audit Pill]
AI Use Audit (links to /audit)
```

**Visual:**
- `hero-portrait-wide.jpg` (desktop) / `hero-portrait.jpg` (mobile)
- Slow zoom on photo (`nb-hero-zoom`); gradient scrims for legibility
- Dark shell `#0F1014` — not a light split-screen layout

---

#### SECTION 2: DIFFERENTIATION BLOCK

**Layout:** Two columns - Problem left, Solution right  
**Background:** Raised dark section (`--nb-bg-raised`) or default `--nb-bg` per live section order

**Content:**
```
[Section Eyebrow]
WHAT MAKES THIS DIFFERENT

[Left Column - The Problem]
Most AI Consultants Miss the Mark

❌ Corporate tech consultants don't understand faith and nonprofit constraints
❌ Faith-sector consultants lack technical delivery capability
❌ Theory-heavy workshops with no implementation support
❌ One-size-fits-all approaches that ignore your context

[Right Column - Your Solution]
I Bridge Both Worlds

✓ 20 years global mission leadership + proven technical delivery
✓ Coordinated 40,000+ hours of distributed research (200+ contributors from 50+ nations)
✓ Built and shipped mobile apps live in iOS & Android stores
✓ Created multiple web platforms (course delivery, coaching portals, consulting sites)
✓ Trained 400+ young adults in strategic life planning (500+ training sessions)
✓ Presented to audiences of 4,000+ (10,000+ via broadcast)
✓ Deep understanding of theological, ethical, and cultural constraints

[Bottom - Value Proposition]
This is AI consulting for organizations that want to move forward 
wisely, not recklessly.
```

---

#### SECTION 3: VALUES & SAFEGUARDING (TRUST BUILDER)

**Layout:** Icon + Text blocks, 3 columns  
**Background:** White

**Content:**
```
[Section Header]
Values & Safeguarding Built In From Day One

[Column 1 - Icon: Shield]
Theological Guardrails
Scripture-safe AI systems. Doctrinal consistency maintained. 
No compromise on theological integrity or mission alignment.

[Column 2 - Icon: Lock]
Data Privacy & Trust
Your data stays private. Context-appropriate systems. 
No exploitation, no surveillance, no vendor lock-in.

[Column 3 - Icon: People]
Safeguarding Vulnerable Populations
High-trust environments for children, refugees, beneficiaries. 
Ethical frameworks for every implementation.

[CTA]
[Button: Learn About My Approach]
```

---

#### SECTION 4: WHO I HELP

**Layout:** 4 cards in grid  
**Background:** Light background

**Content:**
```
[Section Header]
WHO I HELP
Faith, education, nonprofit, and mission-driven teams

[Card 1 - Icon: Church]
Faith & Mission Organisations

Churches, denominational networks, training schools, global missions

• Scripture-safe AI and theological content creation
• Discipleship and leadership development tools
• Donor communication and impact reporting
• Multilingual ministry support

[Learn More →]

[Card 2 - Icon: Book]
Education

Schools, training organisations, curriculum developers, online learning platforms

• Student engagement and personalized learning
• Teacher workload reduction (grading, feedback, admin)
• Curriculum development and content creation
• Accessibility and multilingual education

[Learn More →]

[Card 3 - Icon: Globe]
Nonprofits & NGOs

Programme delivery, humanitarian orgs, community development, social enterprises

• Impact reporting and grant writing
• Programme design and beneficiary storytelling
• Donor engagement and fundraising communications
• Cross-cultural program delivery

[Learn More →]

[Card 4 - Icon: Person]
Individuals & Leaders

Senior leaders, pastors, educators, founders, executives

• Personal AI systems for thinking and decision-making
• Strategic planning and communication support
• Research synthesis and knowledge management
• Time management and productivity optimization

[Learn More →]
```

---

#### SECTION 5: CORE AI SERVICES

**Layout:** 6 service cards in 2 rows of 3  
**Background:** White

**Content:**
```
[Section Header]
SIX AI CATEGORIES
Designed for your context, grounded in your values

[Card 1]
📝 Text AI
Knowledge, Writing, Decision Support

• Internal AI copilots trained on your documents
• Policy, curriculum, sermon, and training assistants
• Scripture-safe, theologically aware content
• Research synthesis for leadership decisions

Hero Statement: Clear thinking at the speed of leadership.

[Learn More →]

[Card 2]
🎨 Image AI
Visuals with Integrity

• Brand-safe image generation for education and comms
• Curriculum and presentation visuals
• Clear guardrails for ethical and cultural use
• Custom image libraries for your community

Hero Statement: Creativity without compromise.

[Learn More →]

[Card 3]
🎥 Video AI
Training & Teaching at Scale

• AI-assisted teaching and training workflows
• Course creation from existing talks
• Multilingual and accessibility-aware systems
• Scalable content without production burnout

Hero Statement: Teach once. Multiply responsibly.

[Learn More →]

[Card 4]
📢 Marketing AI
Messaging that Serves, Not Manipulates

• Values-aligned messaging systems
• Newsletter, donor, and community comms
• Website and campaign copy support
• Storytelling that honors beneficiaries

Hero Statement: Clarity builds credibility.

[Learn More →]

[Card 5]
🌐 Web AI
Dashboards & Practical Tools

• Internal dashboards and progress trackers
• Knowledge portals for staff or students
• AI-assisted compliance and reporting
• Custom workflows that reduce manual admin

Hero Statement: Useful beats impressive.

[Learn More →]

[Card 6]
📱 App AI
Purpose-Driven Products

• AI product strategy and PRDs
• Feature prioritization grounded in real users
• Education and faith-based app consulting
• Products designed for formation, not addiction

Hero Statement: Build what matters. Leave the rest.

[Learn More →]
```

---

#### SECTION 6: PORTFOLIO (PROOF OF CAPABILITY)

**Layout:** 4 project cards with images  
**Background:** Light gray

**Content:**
```
[Section Header]
PORTFOLIO
From Strategy to Shipped Product—I Don't Just Advise, I Build

[Card 1]
[Project Image: SourceView Together app screenshots]

Mobile Bible App · iOS & Android · 2024
SourceView Together

Full-stack React Native Bible reading app with Bluetooth synchronization 
for group reading. Endorsed by Anglican Bishop of Nairobi. Live on 
App Store & Google Play.

Challenge: Create innovative group Scripture engagement for Gen Z
Solution: Bluetooth-synchronized reading across multiple devices
Impact: Live in app stores, partnerships with Kenyan education initiatives
Tech: React Native, Expo, Bluetooth, Cross-platform mobile

[View Case Study →]

[Card 2]
[Project Image: Kingdom Vocations platform screenshots]

Web Application · Vocational Training · 2024
Kingdom Vocations Platform

Comprehensive 8-module course platform equipping young adults (18-35) 
to discover purpose and create strategic life plans. Integrated curriculum 
with student portal, progress tracking, and resource management.

Challenge: Scale vocational formation training beyond in-person delivery
Solution: Full-stack course platform with engaging student experience
Impact: 8-module curriculum, global accessibility, proven pedagogy
Tech: Next.js, Course CMS, Student authentication, Progress tracking

[View Live Site: kingdomvocations.com →]

[Card 3]
[Project Image: Coaching portal screenshots]

Web Application · SaaS · 2024
Coaching Portal (Client & Coach Hub)

Full client/coach management platform with intake workflows, session 
notes, resource management, notifications, and mobile-first PWA.

Challenge: Eliminate fragmented coaching workflows
Solution: Complete SaaS platform from PRD to production
Impact: 24/7 client access, single dashboard, mobile PWA
Tech: React, PWA, shadcn/ui, Authentication, File management

[View Case Study →]

[Card 4]
[Project Image: SourceView Bible original]

Mobile App · Research Platform · 2013–2016
SourceView Bible (Original)

Coordinated 200+ distributed contributors across 40,000 hours of 
crowdsourced biblical research. Pioneered SphereView methodology. 
Presented to 4,000+ at international conference (10,000+ via broadcast).

Challenge: Innovative Bible engagement with new research methodology
Solution: Senior PM & Lead Developer for iOS/Android launch
Impact: 200+ contributors from 50+ nations, global conference presentation
Tech: Mobile app development, Large-scale distributed coordination

[View Case Study →]

[CTA]
These projects prove I don't just talk about AI and technology
—I ship real products that serve real missions.

[Button: View Full Portfolio]
```

---

#### SECTION 7: ABOUT ME (CREDIBILITY)

**Layout:** Split - Content left, Stats right  
**Background:** White

**Content:**
```
[Section Header]
ABOUT ME
AI Consulting for Organizations That Want to Move Forward Wisely

[Left Column - Story]
I'm not a corporate tech consultant who dabbles in faith work. 
I'm a proven builder who has spent two decades leading digital 
transformations in some of the world's most resource-constrained, 
values-driven contexts.

My background bridges three worlds:

Deep Faith-Sector Experience
20+ years with global missions organization (35,000+ staff worldwide). 
Campus leadership overseeing training for 750+ students from 40+ nations 
quarterly. Pioneered vocational training programs with 400+ graduates. 
Board advisor for global city transformation initiatives. Strategic 
partnerships across 15+ countries from Kenya to Papua New Guinea.

Proven Technical Delivery
Built and shipped mobile apps live in iOS & Android stores. Created 
multiple web platforms (course delivery systems, coaching portals, 
consulting websites). Coordinated 200+ distributed contributors across 
40,000 hours of crowdsourced research. Managed complex global projects 
with teams spanning 50+ nations.

Speaking & Training Authority
Delivered 500+ training sessions to young adults (18-35) helping them 
create strategic life plans through 15-hour intensive courses. Presented 
to audiences of 4,000+ (with 10,000+ via broadcast). Annual training 
intensives across multiple countries. Developed curriculum used in 
international leadership development programs.

This combination means I don't just understand AI tools—I understand 
your world, your constraints, and how to build systems that serve 
your mission without compromising your values.

[Right Column - Stats]
[Stat boxes - large numbers, small labels]

20+
Years Experience

15+
Countries Served

400+
Leaders Trained

40,000+
Research Hours Coordinated

200+
Contributors Led

500+
Training Sessions

[Badges below stats]
NZ + Global (Zoom) · Faith, Education & Nonprofit · Builder + Strategist + Trainer

[CTA]
[Button: Read My Full Story]
```

---

#### SECTION 8: TESTIMONIALS (SOCIAL PROOF)

**Layout:** 4 testimonial cards, 2x2 grid  
**Background:** Light background with subtle pattern

**Content:**
```
[Section Header]
WHAT CLIENTS SAY
Real stories from faith, education, and nonprofit leaders

[Testimonial 1]
"We went from nervous about AI to having a clear roadmap and a 
working prototype in three weeks. Nathaniel's focus on values and 
safeguarding made all the difference—he understands both the 
technology and the mission context. Our team now has practical 
tools we trust and can actually use."

Sarah Chen
Director, Faith-based NGO
Auckland · Faith & Mission

Key Outcome: AI-powered donor communication system that maintains 
dignity and honesty

[Testimonial 2]
"Practical sessions that our staff actually used. No hype, no jargon
—just tools and workflows we could implement the next day. Nathaniel's 
background in training and education meant he knew exactly how to 
equip teachers without overwhelming them."

David Ngata
Principal, Secondary School
Wellington · Education

Key Outcome: Teacher workload reduction through AI-assisted feedback 
workflows

[Testimonial 3]
"Finally, AI consulting that understands our constraints. We got 
clarity on what we can do safely with our budget and team, and where 
to start without risk. The roadmap Nathaniel provided was realistic, 
not aspirational—it actually fit our capacity."

Emma Foster
Programme Lead, Nonprofit
Christchurch · Nonprofit

Key Outcome: Streamlined impact reporting and grant writing processes

[Testimonial 4]
"Nathaniel's 15-hour intensive helped our group of 25 young adults 
(ages 20-30) think clearly about purpose, vocation, and strategy. 
His framework wasn't religious fluff—it was practical, grounded, and 
immediately actionable. Three months later, participants are still 
using the planning tools he taught."

Marcus Williams
Director, Leadership Development Program
Wellington · Education & Training

Key Outcome: Strategic life planning framework adopted by 25 emerging leaders
```

---

#### SECTION 9: HOW WE WORK TOGETHER

**Layout:** 3 process cards + pricing transparency  
**Background:** White

**Content:**
```
[Section Header]
HOW WE WORK TOGETHER
Three engagement models—tailored to your context

[Card 1]
1
AI Strategy Intensives
2–4 Weeks

Best for: Organizations ready to move from exploration to implementation

What You Get:
✓ Discovery and AI readiness assessment
✓ Prioritized use case recommendations
✓ Tool selection and workflow design
✓ Working prototype or pilot system
✓ Implementation roadmap
✓ Team training and documentation

Format: Combination of Zoom sessions and async work

[Learn More →]

[Card 2]
2
Team Training
Zoom or In-Person

Best for: Teams who need practical, role-specific AI skills

What You Get:
✓ Customized to your team's roles and workflows
✓ Hands-on practice, not theoretical lectures
✓ Ethical and safeguarding frameworks
✓ Ongoing support during adoption phase

Options: Half-day, full-day, or multi-session series

[Learn More →]

[Card 3]
3
Ongoing Advisory
Monthly or Quarterly

Best for: Organizations who need consistent support as they scale

What You Get:
✓ Monthly or quarterly consulting sessions
✓ Tool and workflow review and optimization
✓ Leadership decision support on AI strategy
✓ Troubleshooting and course correction
✓ Stay current with AI developments

Cadence: Monthly (2 hours) or Quarterly (half-day)

[Learn More →]

[Below Cards - Pricing Transparency]
TRANSPARENT PRICING

I work with organizations across a wide range of budgets—from small 
churches to global missions networks. Pricing is based on organizational 
size, scope of work, and capacity to invest.

Typical Investment Ranges:

Small Organizations (<50 people): $3,000–$6,000 NZD (Strategy Intensive)
Medium Organizations (50-250): $6,000–$12,000 NZD (Strategy Intensive)
Large Organizations (250+): Custom quote based on scope

Nonprofit and faith-based discounts available.
Specific investment discussed when we discuss your project.

[Button: Request Custom Quote]
```

---

#### SECTION 10: FINAL CTA

**Layout:** Full-width, centered content on dark shell  
**Background:** `--nb-bg` or `--nb-bg-raised` with optional lime accent rule

**Content (cream text, Newsreader headline):**
```
[Headline]
Ready to explore AI for your organisation?

[Subheadline — nb-body-lg]
Let's have a conversation about your context, constraints, and goals.

[CTA — nb-btn-primary, green gradient]
Book a free 30-min consultation

[Secondary — nb-btn-secondary optional]
View pricing →
```

---

#### FOOTER

**Layout:** 3 columns on dark cinematic shell  
**Background:** `--nb-bg` with top border `--nb-rule`

**Content:**
```
[Column 1 - Brand]
[logo.png inverted]
AI Consulting for Faith, Education & Mission-Driven Leaders
Based in Tauranga, Aotearoa — serving NZ & globally

[Column 2 - Quick Links]
Who I Help
Services
Portfolio
About
Contact

[Column 3 - Contact]
Email: nathanielbaldock@gmail.com
Response time: Within 48 hours

Connect:
LinkedIn
[Other social if available]

[Bottom Bar]
© 2026 Nathaniel Baldock. All rights reserved.
Privacy Policy · Terms of Service
```

---

## 3. MARKETING MESSAGING FRAMEWORK

### Core Value Proposition

**One-Sentence Version:**
I help faith, education, and nonprofit organizations adopt AI without compromising values—backed by 20+ years of global mission work and proven technical delivery.

**Elevator Pitch (30 seconds):**
I'm Nathaniel Baldock, and I help organizations like yours adopt AI in ways that serve your mission, not undermine it. Unlike corporate consultants who don't understand your world, or faith consultants who lack technical depth, I bring both: 20 years of global mission leadership plus proven capability building and shipping real products—mobile apps in app stores, web platforms, complete systems from strategy to launch. If you want to move forward wisely, not recklessly, let's talk.

**Full Value Proposition (2 minutes):**
Most AI consultants fall into one of two camps: corporate tech experts who don't understand faith and nonprofit constraints, or faith-sector consultants who can't actually build and ship technology. I bridge both worlds.

I spent 20+ years with a global missions organization leading digital transformations, coordinating 40,000+ hours of distributed research, and training 400+ young adults across 15 countries. But I'm not just a strategist—I'm a proven builder. I've shipped mobile apps to the App Store and Google Play. I've built web platforms and SaaS products from scratch. I've coordinated 200+ contributors on complex technical projects spanning 50+ nations.

This unique combination means when I help your organization adopt AI, you get both strategic wisdom AND technical capability. I understand your theological constraints, your budget limitations, your safeguarding requirements. And I can actually build systems that work—not just write strategy documents.

I work with churches, schools, nonprofits, and mission organizations across New Zealand and globally via Zoom, delivering practical AI solutions in six categories: text, image, video, marketing, web, and app AI. Every engagement is grounded in your values, designed for your constraints, and built for measurable outcomes.

If you want AI consulting that serves formation instead of exploitation, wisdom over hype, and people over margins—let's have a conversation.

### Key Messages by Audience

#### Faith & Mission Organizations
**Primary Message:**
"AI tools that serve Scripture engagement, discipleship, and mission—without compromising theological integrity or exploiting vulnerable populations."

**Supporting Points:**
- Scripture-safe AI systems trained on trusted theological resources
- Safeguarding built in for children, refugees, beneficiaries
- 20+ years global mission experience means I understand your world
- Proven delivery: Bible apps in app stores, training platforms shipped

**Pain Points Addressed:**
- Fear of theological drift from AI systems
- Concern about exploiting beneficiaries through tech
- Limited budgets and technical capacity
- Need for multilingual and cross-cultural tools

#### Education Sector
**Primary Message:**
"AI solutions that reduce teacher workload and enhance student engagement—grounded in pedagogical principles and ethical frameworks."

**Supporting Points:**
- Trained 400+ leaders, understand educational contexts
- Certificate IV in Training and Assessment
- Focus on teacher support, not replacement
- Proven platforms: course delivery systems, student portals

**Pain Points Addressed:**
- Teacher burnout and administrative overload
- Student engagement challenges
- Budget constraints in education
- Need for accessibility and equity

#### Nonprofits & NGOs
**Primary Message:**
"Practical AI that streamlines operations and amplifies impact—without the overhead of corporate consultants or the fluff of theory-only workshops."

**Supporting Points:**
- Coordinated 40,000+ hours of distributed research with 200+ contributors
- Understand resource constraints and compliance requirements
- Focus on measurable outcomes and ROI
- Proven systems: reporting tools, donor platforms

**Pain Points Addressed:**
- Limited staff and budget
- Reporting and compliance burden
- Donor communication challenges
- Need to prove impact to funders

#### Individual Leaders
**Primary Message:**
"Personal AI systems for thinking, writing, and decision-making—backed by wisdom from 20+ years leading global initiatives."

**Supporting Points:**
- One-on-one consulting tailored to your role
- Deep experience in leadership development
- Practical tools you can use immediately
- Calm, grounded approach to fast-changing tech

**Pain Points Addressed:**
- Information overload and decision fatigue
- Communication and writing burden
- Strategic planning complexity
- Staying current with technology

### Competitive Differentiation Messages

**Vs. Corporate AI Consultants:**
"Unlike corporate consultants who treat your nonprofit like a business with different metrics, I understand that people matter more than margins, that trust is non-negotiable, and that your constraints aren't bugs—they're features of faithful stewardship."

**Vs. Faith-Sector Consultants:**
"Unlike faith consultants who can give you strategy documents but can't actually build technology, I ship real products. I've coordinated 200+ contributors across 40,000 hours of research, built mobile apps in app stores, and delivered complete systems from concept to launch."

**Vs. DIY AI Adoption:**
"Unlike going it alone with ChatGPT and hoping for the best, working with me means you get ethical frameworks, safeguarding protocols, and proven workflows—plus the peace of mind that comes from an advisor who's already navigated these waters successfully."

### Objection Handling Messages

**Objection: "AI is too expensive for us"**
Response: "I work with organizations across a wide budget range. Most of my clients start with a 2-4 week strategy intensive ($3K-$6K for small orgs) that identifies high-impact, low-cost use cases you can implement with tools you already have or affordable subscriptions. We focus on practical wins, not expensive enterprise solutions."

**Objection: "We don't have technical capacity"**
Response: "That's exactly why I focus on training and adoption support, not just strategy. I design systems your team can actually use and maintain. My goal is to build your internal capacity, not create dependency on external consultants."

**Objection: "AI feels unethical/dangerous"**
Response: "I agree that most AI implementations ignore ethical concerns. That's why values and safeguarding are built into everything I do from day one. We establish clear guardrails, maintain human oversight, and ensure your systems serve your mission rather than compromise it."

**Objection: "We need to focus on people, not technology"**
Response: "So do I. That's why I only recommend AI that frees your team to focus on people, not replace them. Technology should reduce administrative burden and amplify your human capacity for mission-critical work—not create new problems."

---

## 4. CONTENT ASSETS NEEDED

### Photography
**Priority 1 (Must Have):**
- Professional headshot (hero section) - business casual, warm lighting
- Working/teaching photo (showing expertise)
- Field context photo (mission setting, showing cross-cultural work)

**Priority 2 (Nice to Have):**
- Collaborative setting (with team/clients)
- Multiple locations (office, outdoors, mission field)
- Diverse contexts showing global reach

**Specifications:**
- High resolution (minimum 2000px wide)
- Landscape orientation for hero images
- Warm color temperature
- Natural lighting preferred
- Professional but approachable style

### Video Assets (Optional but Powerful)
**Recommended Videos:**
1. **Personal Introduction (2 minutes)**
   - Who you are, your background
   - Why this work matters
   - Your unique approach

2. **Client Success Story (1 minute each)**
   - Testimonial videos from clients
   - Before/after transformation

3. **Service Explainer (60 seconds each)**
   - How each AI category works
   - Practical examples
   - Expected outcomes

### Written Content
**Blog/Articles (SEO & Thought Leadership):**
1. "AI for Faith Organizations: A Framework for Ethical Adoption"
2. "How Nonprofits Can Use AI Without Losing Their Mission"
3. "Scripture-Safe AI: Maintaining Theological Integrity in Content Creation"
4. "The Real Cost of AI for Small Organizations"
5. "Case Study: How [Client] Reduced Admin Time by 40% with AI"

**Lead Magnets (Email List Building):**
1. "AI Readiness Checklist for Faith & Nonprofit Leaders" (PDF)
2. "10 AI Use Cases for Churches Under 200 Members" (PDF)
3. "The Values-First AI Framework" (PDF + Video)
4. "Budget-Friendly AI Tools for Nonprofits" (Google Doc or Notion)

### Social Media Content
**LinkedIn (Primary Platform for B2B):**
- Post frequency: 3x per week
- Content types: Insights, case studies, tips, industry commentary
- Format: Text posts with occasional images/videos
- Engagement: Respond to comments, engage with faith/nonprofit content

**Sample Post Topics:**
- "3 Questions Every Faith Leader Should Ask Before Adopting AI"
- "This Week I Helped a Small Church..."
- "Most AI consultants miss this about nonprofit work..."
- Share client wins (with permission)
- Commentary on AI news with faith/nonprofit angle

### Email Marketing
**Welcome Sequence (5 emails):**
1. "Thanks for Connecting" - Who I am, what to expect
2. "My Story" - Why I do this work
3. "How I Help" - Services overview
4. "Proof" - Portfolio and client stories
5. "Let's Talk" - Clear CTA for consultation

**Monthly Newsletter:**
- AI insights for faith/nonprofit leaders
- Client success stories
- Practical tips and tools
- Industry news with commentary
- Upcoming availability

---

## 5. LAUNCH CHECKLIST

### Pre-Launch (Weeks 1-2)

**Brand Foundation (public site):**
- [✓] Finalize brand name: Nathaniel Baldock
- [✓] Cinematic public theme live (`cinematic.css`, `data-theme="public"`)
- [✓] Logo + favicon in `client/public/`
- [✓] Brand guidelines: `docs/BRAND_IDENTITY_AND_GUIDELINES.md` + Section 1 of this doc
- [ ] Register nathanielbaldock.com (if not complete)
- [ ] Set up professional email: hello@nathanielbaldock.com or nathaniel@nathanielbaldock.com
- [ ] Optional: 1-page PDF export of public-site brand rules for collaborators

**Website Development:**
- [ ] Set up hosting (recommend: Vercel, Netlify, or Railway for modern stack)
- [ ] Implement website structure (use updated content)
- [ ] Add all written content
- [ ] Source/create photography
- [ ] Set up contact form with email notifications
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Test on mobile devices
- [ ] Check page load speed (aim for <2 seconds)
- [ ] SEO basics: meta titles, descriptions, alt text

**Social Media Setup:**
- [ ] LinkedIn profile optimization
  - Professional photo
  - Headline: "AI Consulting for Faith, Education & Impact Organizations"
  - About section with your story
  - Featured section with portfolio projects
- [ ] Create LinkedIn Company Page (optional but recommended)
- [ ] Reserve other social handles even if not actively using

**Email Infrastructure:**
- [ ] Set up email marketing platform (ConvertKit, Mailchimp, or Buttondown)
- [ ] Create welcome sequence (5 emails)
- [ ] Design email template matching brand
- [ ] Add signup form to website

**Content Creation:**
- [ ] Write 3 blog posts for launch
- [ ] Create 1 lead magnet (PDF checklist or framework)
- [ ] Draft 10 LinkedIn posts (schedule for first 2 weeks)
- [ ] Write case studies for all 4 portfolio projects

### Launch Week (Week 3)

**Day 1-2: Soft Launch**
- [ ] Website goes live
- [ ] Send email to personal network announcing new site
- [ ] Post on personal LinkedIn about launch
- [ ] Test all forms and functionality

**Day 3-5: Public Launch**
- [ ] Official launch post on LinkedIn
- [ ] Share with YWAM network
- [ ] Reach out to past clients for testimonials
- [ ] Post in relevant LinkedIn groups (faith + tech)

**Day 6-7: Momentum Building**
- [ ] Follow up on initial responses
- [ ] Schedule first consultation calls
- [ ] Continue posting valuable content

### Post-Launch (Weeks 4-8)

**Content Marketing:**
- [ ] Publish 1 blog post per week
- [ ] Post on LinkedIn 3x per week
- [ ] Send monthly newsletter (Week 8)
- [ ] Guest post on relevant blogs/publications

**Networking & Outreach:**
- [ ] Reach out to 10 warm contacts per week
- [ ] Attend relevant online events/webinars
- [ ] Join faith + tech communities
- [ ] Offer free "AI Readiness" calls to build pipeline

**Optimization:**
- [ ] Review website analytics weekly
- [ ] A/B test headline and CTAs
- [ ] Gather feedback from visitors
- [ ] Iterate on messaging based on responses

---

## 6. GROWTH STRATEGY (FIRST 90 DAYS)

### Month 1: Foundation & Awareness

**Goals:**
- Website live with all core content
- 10 qualified consultation requests
- 3 initial engagements (even if smaller projects)

**Activities:**
- Personal network outreach (YWAM, past clients, ministry contacts)
- LinkedIn content daily
- Free "AI Readiness Calls" to build pipeline
- Speak at 1-2 online events/webinars

**Metrics:**
- Website visitors: 500+
- LinkedIn profile views: 200+
- Email subscribers: 50+
- Consultation requests: 10+

### Month 2: Proof & Credibility

**Goals:**
- First 2-3 client case studies published
- Speaking engagement or webinar delivered
- 20 qualified consultation requests
- First testimonials collected

**Activities:**
- Publish detailed case studies
- Offer free workshop/webinar to build authority
- Guest post on relevant blogs
- Continue LinkedIn content strategy
- Send first newsletter to growing list

**Metrics:**
- Website visitors: 1,000+
- LinkedIn followers: 300+
- Email subscribers: 150+
- Active projects: 3-5

### Month 3: Scale & Systems

**Goals:**
- Clear service packages and pricing
- Automated onboarding process
- 30+ qualified leads in pipeline
- Referral program established

**Activities:**
- Create productized service offerings
- Implement booking/scheduling system
- Build referral incentive program
- Develop case study template for efficient creation
- Launch paid advertising (if budget allows)

**Metrics:**
- Website visitors: 2,000+
- LinkedIn followers: 500+
- Email subscribers: 300+
- Monthly recurring revenue: $5K-$10K NZD

### Key Partnerships to Pursue

**Target Organizations:**
1. **YWAM Networks** - Leverage existing relationships
2. **Bethlehem College** (Tauranga) - Local educational institution
3. **BTI** - Training organization relationships
4. **Cities Project Global** - Board member connection
5. **Call2All** - Existing partnership in Kenya/Thailand
6. **Anglican Churches** (Kenya/NZ) - SourceView Together endorsement

**Partnership Approach:**
- Offer free workshops/trainings to build credibility
- Create specific offerings for each network
- Develop referral partnerships
- Co-create content (webinars, resources)

### Revenue Projections (Conservative)

**Month 1:**
- 2 Strategy Intensives × $4,000 avg = $8,000 NZD
- 3 Training Sessions × $2,000 avg = $6,000 NZD
- **Total: $14,000 NZD**

**Month 2:**
- 3 Strategy Intensives × $4,000 avg = $12,000 NZD
- 4 Training Sessions × $2,000 avg = $8,000 NZD
- 1 Advisory retainer × $1,500/mo = $1,500 NZD
- **Total: $21,500 NZD**

**Month 3:**
- 4 Strategy Intensives × $4,000 avg = $16,000 NZD
- 5 Training Sessions × $2,000 avg = $10,000 NZD
- 3 Advisory retainers × $1,500/mo = $4,500 NZD
- **Total: $30,500 NZD**

**Quarterly Total: ~$66,000 NZD (~$40,000 USD)**

---

## 7. IMPLEMENTATION PRIORITIES

### Priority 1 (Do First - Week 1):
1. Register nathanielbaldock.com
2. Set up professional email
3. Update LinkedIn profile with new positioning
4. Get professional photos taken
5. Create basic 1-page website (can expand later)

### Priority 2 (Do Next - Weeks 2-3):
1. Build full website with all sections
2. Write blog posts and case studies
3. Create lead magnet PDF
4. Set up email marketing
5. Start LinkedIn content strategy

### Priority 3 (Do Later - Weeks 4-6):
1. Launch paid advertising (if needed)
2. Create video content
3. Develop webinar/workshop
4. Build out email sequences
5. Optimize and iterate based on data

---

## CONCLUSION

This package covers **public marketing** branding and messaging for nathanielbaldock.com. The live site expresses that brand through the **Cinematic Hybrid** theme: dark editorial shell, cream type, lime accent, green CTAs.

**Public brand at a glance:**
- **Look:** `#0F1014` background · `#F4EFE2` text · `#7CCC1E` accent · green gradient CTAs
- **Type:** Newsreader + Instrument Serif + Inter + IBM Plex Mono
- **Promise:** Formation, not exploitation — practical AI with discernment
- **Hero:** *Practical AI for people who lead with discernment.*

**Out of scope here:** Dashboard orange theme, worksheets, SME decks, and standalone HTML tools use their own palettes unless explicitly redesigned to match Section 1.

**Technical reference:** `client/src/styles/cinematic.css` · `.cursor/rules/public-site-theme.mdc`

---

**Document created:** February 9, 2026  
**Public visual identity aligned with live site:** June 2026  
**For:** Nathaniel Baldock  
**Scope:** Public marketing website only
