/**
 * Rule fragments + catalog for Tauranga SME worksheet completion reports.
 * Loaded before report-engine.js — exposes window.NB_REPORT_DATA
 */
(function () {
  var W = window;
  W.NB_REPORT_DATA = {
    SNAPSHOT_PREFIX: "nb-tga-snapshot-",

    WORKBOOKS: {
      ws1: {
        lsKey: "nb-ws1-tga-2026",
        title: "Is your business ready for AI?",
        shortTitle: "Readiness",
      },
      ws2: {
        lsKey: "nb-ws3-tga-2026",
        title: "Where does AI actually save you time?",
        shortTitle: "Time audit",
      },
      ws3: {
        lsKey: "nb-ws4-tga-2026",
        title: "AI and your team",
        shortTitle: "Team",
      },
      ws4: {
        lsKey: "nb-ws2-tga-2026",
        checklistKey: "nb-ws2-checklist-2026",
        title: "Staying legal while using AI",
        shortTitle: "Legal & privacy",
      },
    },

    STAGE_KEYS: ["awareness", "experimenting", "integrating"],

    TOOLS: [
      { id: "chatgpt", name: "ChatGPT / Claude", note: "Strong first drafts for email, quotes, and FAQs — keep customer data out of free tiers.", tags: ["writing", "research", "general"] },
      { id: "perplexity", name: "Perplexity", note: "Research synthesis with citations — verify NZ-specific facts.", tags: ["research"] },
      { id: "canva", name: "Canva AI", note: "Quick marketing visuals; watch brand consistency.", tags: ["creative"] },
      { id: "otter", name: "Otter / Zoom AI", note: "Meeting capture and action items — reduces note-taking load.", tags: ["meetings"] },
      { id: "xero", name: "Xero / MYOB AI", note: "Expense categorisation and forecasting where you already run books.", tags: ["finance"] },
      { id: "business_tier", name: "Business-tier AI accounts", note: "When tools touch real customer data — get data-processing terms in writing.", tags: ["privacy", "governance"] },
      { id: "opc", name: "OPC AI guidance", note: "Plain-language obligations before customer-facing AI.", tags: ["privacy", "compliance"] },
      { id: "priority_one", name: "Priority One", note: "Regional entry for MBIE AI Advisory Pilot co-funding.", tags: ["support", "local"] },
    ],

    /** scored actions for ranking (impact, effort 1–5, riskReduction 1–5) */
    ACTIONS: {
      pilot_call: { title: "Book a funded advisory conversation", why: "Matches businesses at awareness stage with regional support.", impact: 5, effort: 2, riskReduction: 3, tags: ["awareness", "local"] },
      one_task_two_weeks: { title: "Run one AI experiment for two weeks", why: "Converts insight into habit — the pattern that actually sticks.", impact: 5, effort: 3, riskReduction: 2, tags: ["experimenting", "time"] },
      privacy_policy_ai: { title: "Add one AI sentence to your privacy policy", why: "Low effort disclosure that closes a common OPC gap.", impact: 3, effort: 2, riskReduction: 5, tags: ["privacy", "legal"] },
      stop_pasting_pii: { title: "Ban raw customer data in free AI tools", why: "Highest-leverage risk reduction for most SMEs.", impact: 4, effort: 2, riskReduction: 5, tags: ["privacy", "legal"] },
      tool_register: { title: "Start a one-page AI tool register", why: "Demonstrates due diligence and clarifies data flows.", impact: 4, effort: 2, riskReduction: 4, tags: ["governance", "legal"] },
      team_conversation: { title: "Hold a 20-minute team AI conversation", why: "Aligns expectations before shadow IT spreads.", impact: 4, effort: 3, riskReduction: 4, tags: ["team", "culture"] },
      review_policy: { title: "Publish an internal “AI output is draft” rule", why: "Reduces trust incidents and errors in customer-facing work.", impact: 4, effort: 2, riskReduction: 5, tags: ["team", "quality"] },
      time_top_task: { title: "Pick your #1 time drain and match one tool", why: "Your audit points to concentrated savings.", impact: 5, effort: 3, riskReduction: 2, tags: ["time"] },
      pia_customer: { title: "Plan a Privacy Impact Assessment before chatbots", why: "Customer-facing AI triggers PP3/PP8 obligations.", impact: 4, effort: 4, riskReduction: 5, tags: ["privacy", "legal"] },
      chamber: { title: "Join the next Chamber digital / AI session", why: "Keeps you in the local conversation without hype.", impact: 3, effort: 2, riskReduction: 2, tags: ["local", "awareness"] },
    },

    /** narrative fragments keyed by situation */
    COPY: {
      coachSignOff: "— Nathaniel Baldock · AI consultant · Tauranga, Bay of Plenty",

      ws1: {
        awareness: "You're not behind — you're in the same starting position as most NZ SMEs. The win here isn't a strategy deck; it's one credible experiment and a conversation with someone who knows the local funding landscape.",
        experimenting: "You've crossed the hardest gap: from trying to applying. The next leverage is consistency on one use case and tightening how you handle customer data while you scale usage.",
        integrating: "You're ahead of the curve. The upside now is safety and leverage: privacy hygiene, team clarity, and optimising the workflows that already run on AI.",
      },

      ws2: {
        quick: "Your numbers suggest modest but real recoverable time — perfect for a tight experiment rather than a platform overhaul.",
        meaningful: "You're sitting in the sweet spot where AI assistance typically pays back within weeks if you lock one workflow.",
        transformative: "The hours on the table are substantial — prioritise governance alongside speed so savings don't create new risks.",
      },

      ws3: {
        strong_review: "Your team policy bias toward review-before-send is exactly the guardrail that keeps AI useful without naive automation.",
        loose_review: "Case-by-case review can work — document examples of “high scrutiny” tasks so people aren't guessing under pressure.",
        working_out: "You're still deciding rules — that's fine if you time-box it: pick one default this week (e.g. customer-facing = always reviewed).",
      },

      ws4: {
        checklist_high: "Your pre-tool checklist progress shows you're building repeatable diligence — that's rare at SME scale.",
        checklist_low: "Run the five-minute checklist before your next signup — it catches the minority of tools that need real thought.",
        governance_gap: "Privacy and copyright aren't blockers — they're guardrails. A few small documentation habits prevent painful corrections later.",
      },

      master: {
        portfolio_balanced: "Across worksheets, you're building both upside (time and readiness) and guardrails — that's the combination that scales.",
        portfolio_speed: "Momentum is strong on adoption signals — complement it with explicit data-handling rules so speed doesn't outpace safety.",
        portfolio_caution: "Governance awareness is ahead of experimentation — when you pick tools, you'll already know what “safe use” looks like.",
      },
    },
  };
})();
