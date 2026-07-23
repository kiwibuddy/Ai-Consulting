/*
 * operator-data.js — Data module for the INTERNAL Operator Console (/operator)
 *
 * Audience: Nathaniel only. This page is unlisted, noindex, and not linked
 * from anywhere. It is the "expert cockpit" used live in front of a client to
 * walk them through hardening each AI tool.
 *
 * This file provides THREE things to operator.html:
 *
 *   1. TOOLS / CATS / scoreEntry  — a MIRROR of the same structures in
 *      audit.html. audit.html is still the master copy. If you change a
 *      tier's `action`, `warning`, `trainingOn`, or `vendorRisk` there,
 *      change it here too (and vice-versa). A future refactor can make
 *      audit.html load this file so the duplication disappears — until then,
 *      keep the two in sync. Last mirrored: 2026-07-24.
 *
 *   2. OPERATOR_DEEP — the authored "secret sauce" layer, keyed
 *      "<toolId>:<tierId>" (same keys as audit-policies.js). This is the
 *      deep walkthrough content that does NOT exist anywhere else: exact
 *      hardening steps, the upgrade verdict, what data is safe to put in at
 *      that tier, hard red-lines, how to verify a setting stuck, and a
 *      one-line script to say aloud. Entries flagged `authored:true` were
 *      hand-written. Any tier without an OPERATOR_DEEP entry is rendered by
 *      operator.html by DERIVING a baseline walkthrough from the verified
 *      `action` / `warning` strings above + audit-policies.js — nothing is
 *      ever blank, and derived panels are badged so you know to deepen them.
 *
 *   3. STALENESS — thresholds for the "Check for updates" staleness light.
 *
 * The policy explainer + `lastReviewed` timestamps come from the shared
 * audit-policies.js (window.AUDIT_POLICIES), loaded alongside this file.
 *
 * VERIFICATION DISCIPLINE (this repo's house rule): authored steps are
 * anchored to the already-verified `action` strings. Where a step adds a
 * menu path or specific from general knowledge beyond the verified data,
 * treat it as "confirm live" — the staleness light and the per-tool
 * "verified" date are your guard against presenting stale specifics as fact.
 */

(function () {
  // ══════════════════════════════════════════════════════════════════════
  // 1. TOOLS / CATS / scoreEntry  — MIRROR of audit.html (keep in sync)
  // ══════════════════════════════════════════════════════════════════════
  var TOOLS = [
    {id:'chatgpt',name:'ChatGPT',vendor:'OpenAI',icon:'💬',logo:'/logos/chatgpt.svg',cat:'assistants',tiers:[
      {id:'free',label:'Free account',note:'Standard free',vendorRisk:3,trainingOn:true,ipp12:true,action:'Settings › Data Controls › toggle off "Improve the model for everyone"',warning:'Consumer data used for training by default.'},
      {id:'plus',label:'Plus ($20/month)',note:'Paid personal plan',vendorRisk:3,trainingOn:true,ipp12:true,action:'Settings › Data Controls › toggle off "Improve the model for everyone"',warning:'Same training exposure as free tier.'},
      {id:'team',label:'Team or business plan',note:'Shared workspace',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Workspace Settings › confirm data sharing disabled.',warning:'No model training on workspace data.'},
    ]},
    {id:'copilot',name:'Microsoft Copilot',vendor:'Microsoft',icon:'🔷',logo:'/logos/copilot.svg',cat:'assistants',tiers:[
      {id:'standalone',label:'Standalone / free Copilot',note:'copilot.microsoft.com',vendorRisk:2,trainingOn:true,ipp12:true,action:'Profile › Settings › Privacy › turn off training.',warning:'Consumer version trains on data by default.'},
      {id:'m365',label:'Microsoft 365 Copilot',note:'Business subscription',vendorRisk:1,trainingOn:false,ipp12:true,action:'Apply Purview sensitivity labels to tenant.',warning:'Enterprise Data Protection. No model training.'},
    ]},
    {id:'gemini',name:'Google Gemini',vendor:'Google',icon:'🔮',logo:'/logos/gemini.svg',cat:'assistants',tiers:[
      {id:'consumer',label:'Free or personal account',note:'gemini.google.com',vendorRisk:3,trainingOn:true,ipp12:true,action:'My Activity › Gemini Apps › turn off Keep Activity.',warning:'Keep Activity on by default — prompts may be human-reviewed and retained up to 36 months.'},
      {id:'workspace',label:'Gemini for Workspace',note:'Business Google account',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Console › set regional data residency.',warning:'No human review. No model training.'},
    ]},
    {id:'claude',name:'Claude',vendor:'Anthropic',icon:'🤖',logo:'/logos/claude.svg',cat:'assistants',tiers:[
      {id:'consumer',label:'Free or Pro account',note:'claude.ai personal',vendorRisk:2,trainingOn:true,ipp12:true,action:'Settings › Privacy › turn off "Help improve Claude".',warning:'Since Sept 2025 consumer accounts train on conversations by default.'},
      {id:'team',label:'Claude Team / for Work',note:'claude.ai/work',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Settings › Data and Privacy › confirm training off.',warning:'Commercial workspace isolation. No model training.'},
    ]},
    {id:'perplexity',name:'Perplexity',vendor:'Perplexity AI',icon:'🔍',logo:'/logos/perplexity.svg',cat:'assistants',tiers:[
      {id:'consumer',label:'Free or Pro',note:'Personal account',vendorRisk:2,trainingOn:true,ipp12:true,action:'Account Settings › Preferences › AI Data Retention › toggle off.',warning:'Consumer data used for model improvement.'},
      {id:'enterprise',label:'Enterprise Pro',note:'Business plan',vendorRisk:1,trainingOn:false,ipp12:true,action:'API Dashboard › restrict debug logging metrics.',warning:'Zero-retention framework.'},
    ]},
    {id:'grammarly',name:'Grammarly',vendor:'Grammarly',icon:'✍️',logo:'/logos/grammarly.svg',cat:'writing',tiers:[
      {id:'consumer',label:'Free or individual',note:'Personal account',vendorRisk:2,trainingOn:true,ipp12:true,action:'Account Settings › Security & Privacy › toggle off "Product Improvement and Training".',warning:'Text inputs used for training by default.'},
      {id:'business',label:'Business or Enterprise',note:'Team account',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Console › verify training toggles off.',warning:'Training off by default.'},
    ]},
    {id:'notion',name:'Notion AI',vendor:'Notion',icon:'📓',logo:'/logos/notion.svg',cat:'writing',tiers:[
      {id:'plus',label:'Plus or Free with AI',note:'Personal workspace',vendorRisk:2,trainingOn:false,ipp12:true,action:'Workspace Settings › Notion AI › disable web search.',warning:'Verify current sub-processor terms.'},
      {id:'business',label:'Business or Enterprise',note:'Admin workspace',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin settings › verify sub-processor handling.',warning:'Workspace embeddings isolated.'},
    ]},
    {id:'hubspot',name:'HubSpot AI',vendor:'HubSpot',icon:'🧡',logo:'/logos/hubspot.svg',cat:'writing',tiers:[
      {id:'standard',label:'Standard account',note:'Default CRM',vendorRisk:2,trainingOn:true,ipp12:true,action:'Settings › AI › Access tab › toggle off "AI Model Training".',warning:'Uses CRM data for training by default.'},
      {id:'sensitive',label:'Sensitive Data enabled',note:'Regulated-data account',vendorRisk:1,trainingOn:false,ipp12:true,action:'Enable Sensitive Data setting — training is excluded automatically.',warning:'Automatically opted out of AI model training.'},
    ]},
    {id:'notebooklm',name:'NotebookLM',vendor:'Google',icon:'📔',logo:'/logos/notebooklm.svg',cat:'writing',tiers:[
      {id:'consumer',label:'Personal Google account',note:'notebooklm.google.com',vendorRisk:2,trainingOn:false,ipp12:true,action:'Avoid thumbs-up/down ratings — trigger human review.',warning:'Feedback triggers human review, retained up to 3 years.'},
      {id:'workspace',label:'Workspace Core',note:'Business Google account',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Console › turn on NotebookLM for specific org units.',warning:'No human review. Enterprise-grade.'},
    ]},
    {id:'canva',name:'Canva AI',vendor:'Canva',icon:'🎨',logo:'/logos/canva.png',cat:'creative',tiers:[
      {id:'free-pro',label:'Free or Pro',note:'Personal creator',vendorRisk:2,trainingOn:true,ipp12:true,action:'Account Settings › Privacy Controls › toggle off AI training.',warning:'AI training enabled by default as of November 2025.'},
      {id:'teams',label:'Teams or Business',note:'Shared workspace',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Settings › Security › Data and Privacy.',warning:'Content never used for training.'},
    ]},
    {id:'adobe',name:'Adobe Firefly',vendor:'Adobe',icon:'🔥',logo:'/logos/adobe-firefly.svg',cat:'creative',tiers:[
      {id:'individual',label:'Individual or personal',note:'Creative Cloud personal',vendorRisk:2,trainingOn:false,ipp12:true,action:'Adobe Account Privacy Settings › toggle off "Content analysis".',warning:'Content analysis for product improvement is on by default. Your work is not used to train Firefly models.'},
      {id:'business',label:'Firefly for Business',note:'Enterprise Creative Cloud',vendorRisk:1,trainingOn:false,ipp12:true,action:'Enterprise Admin Console › restrict custom model permissions.',warning:'Trained on licensed content only.'},
    ]},
    {id:'midjourney',name:'Midjourney',vendor:'Midjourney',icon:'🖼️',logo:'/logos/midjourney.svg',cat:'creative',tiers:[
      {id:'basic',label:'Basic or Standard',note:'Standard subscription',vendorRisk:3,trainingOn:true,ipp12:true,action:'No safe configuration available. Do not use for business assets.',warning:'All outputs PUBLIC by default. No training opt-out.'},
      {id:'pro',label:'Pro or Mega (Stealth)',note:'Higher tier',vendorRisk:2,trainingOn:true,ipp12:true,action:'Type /settings in Discord › enable Stealth Mode.',warning:'Stealth hides outputs but prompts still used for training.'},
    ]},
    {id:'otter',name:'Otter.ai',vendor:'Otter.ai',icon:'🦦',logo:'/logos/otter.png',cat:'meetings',tiers:[
      {id:'basic-pro',label:'Basic or Pro',note:'Personal plan',vendorRisk:3,trainingOn:true,ipp12:true,action:'Email support@otter.ai to request deletion.',warning:'Trains on audio files by default.'},
      {id:'business',label:'Business plan',note:'Team admin',vendorRisk:2,trainingOn:false,ipp12:true,action:'Admin Panel › enable mandatory participant notifications.',warning:'Excludes from third-party training.'},
    ]},
    {id:'fathom',name:'Fathom',vendor:'Fathom Video',icon:'🎙️',logo:'/logos/fathom.png',cat:'meetings',tiers:[
      {id:'free',label:'Free account',note:'Individual free',vendorRisk:2,trainingOn:true,ipp12:true,action:'Account Settings › training controls › toggle off.',warning:'De-identified meeting assets used for training by default.'},
      {id:'team',label:'Team Edition',note:'Paid team plan',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Panel › enable global training opt-out.',warning:'SOC 2 Type II. No training on meeting content.'},
    ]},
    {id:'granola',name:'Granola AI',vendor:'Granola',icon:'🌾',logo:'/logos/granola.png',cat:'meetings',tiers:[
      {id:'any',label:'Personal or Enterprise',note:'Any plan',vendorRisk:1,trainingOn:true,ipp12:true,action:'Settings › Profile › toggle off "Model Training" (Enterprise is off by default).',warning:'Personal plans may use anonymised notes for training unless opted out. On-device transcription. SOC 2 Type II.'},
    ]},
    {id:'fireflies',name:'Fireflies.ai',vendor:'Fireflies.ai',icon:'✨',logo:'/logos/fireflies.png',cat:'meetings',tiers:[
      {id:'any',label:'Any plan',note:'Free, Pro, or Business',vendorRisk:1,trainingOn:false,ipp12:true,action:'Account Settings › force zero-data-retention.',warning:'Restricts API providers from training on meeting data.'},
    ]},
    {id:'zoom-ai',name:'Zoom AI Companion',vendor:'Zoom',icon:'📹',logo:'/logos/zoom.svg',cat:'meetings',tiers:[
      {id:'consumer',label:'Basic or Pro Zoom',note:'Standard Zoom plan',vendorRisk:2,trainingOn:false,ipp12:true,action:'Review AI Companion settings before enabling in meetings.',warning:'Meeting content is not used for AI training; user feedback may improve Zoom AI features.'},
      {id:'business',label:'Zoom Business or Enterprise',note:'Business account',vendorRisk:1,trainingOn:false,ipp12:true,action:'Admin Portal › AI Companion › configure feature access and retention.',warning:'Customer content excluded from AI training. Full admin controls. SOC 2 Type II.'},
    ]},
  ];
  var CATS = [
    {id:'assistants',label:'AI Assistants',note:'Chat and analysis tools'},
    {id:'writing',label:'Writing and Work Tools',note:'AI inside everyday apps'},
    {id:'creative',label:'Creative Tools',note:'Design, image and video'},
    {id:'meetings',label:'Meetings and Voice',note:'Recording and transcription'},
  ];

  // scoreEntry — mirror of audit.html scoring so the console shows the same RAG.
  function scoreEntry(toolId,tierId,dataType,reviewHabit){
    var tool=TOOLS.find(function(t){return t.id===toolId;});
    if(!tool) return null;
    var tier=tool.tiers.find(function(t){return t.id===tierId;})||tool.tiers[0];
    var ds={public:1,internal:2,personal:3}[dataType]||1;
    var ho={always:1,usually:2,rarely:3}[reviewHabit]||2;
    var vr=tier.vendorRisk;
    var pe=(ds===3&&(tier.ipp12||vr>=2))?3:(ds>=2&&tier.ipp12)?2:1;
    var ai=(ds===3&&ho===3)?3:(ds>=2&&ho>=2)?2:1;
    var hoEff=(ho===3&&ds===1)?2:ho;
    var enterprisePersonal=(ds===3&&vr===1&&ho===1&&!tier.trainingOn);
    var dsEff=enterprisePersonal?2:ds;
    var peEff=enterprisePersonal?2:pe;
    var overall=Math.max(dsEff,hoEff,vr,peEff,ai);
    var rag=overall===3?'red':overall===2?'amber':'green';
    var vendorTierDrivenRed=rag==='red'&&ds===1&&ho<=2;
    var ragLabel=rag==='red'?(vendorTierDrivenRed?'Review settings':'Act now'):rag==='amber'?'Check this':'Good to go';
    var flags=[];
    if(ds===3&&vr===3) flags.push('Sensitive data in an unsafe tool');
    if(pe===3&&ho===3) flags.push('Personal data — unreviewed output');
    if(ai===3&&ho===3) flags.push('High-impact use with little oversight');
    if(enterprisePersonal) flags.push('Personal data offshore - confirm your DPA or vendor agreement covers IPP 12 cross-border disclosure');
    if(tier.trainingOn) flags.push('Tool may train on this data by default');
    return {toolId,tierId,dataType,reviewHabit,tool,tier,scores:{ds,ho,vr,pe,ai},overall,rag,ragLabel,vendorTierDrivenRed,flags};
  }

  // ══════════════════════════════════════════════════════════════════════
  // 2. OPERATOR_DEEP — authored walkthrough layer (keyed toolId:tierId)
  //    Fields:
  //      verdict   short headline: keep / harden / upgrade / avoid
  //      upgrade   the upgrade play (what to move them to + why) or null
  //      steps[]   ordered hardening steps for THIS tier (anchored to `action`)
  //      verify    how to confirm the change actually stuck
  //      safe      {public, internal, personal}: what content is OK to add here
  //                once hardened. Keep short; these show as green/amber/red.
  //      redlines[] hard "never do this" lines for this tier
  //      say       one sentence to say aloud to the client
  //      authored  true (vs derived at render time)
  // ══════════════════════════════════════════════════════════════════════
  var OPERATOR_DEEP = {

    // ─── ChatGPT ────────────────────────────────────────────────────────
    "chatgpt:free": {
      authored:true,
      verdict:"Harden now, then plan the upgrade.",
      upgrade:"For any business use, move to ChatGPT Team (~US$25–30/user/mo). Team runs on OpenAI's Business Terms, which contractually exclude prompts from model training and isolate the workspace. The $20 Plus plan does NOT do this — it's the same consumer terms as Free.",
      steps:[
        "Open Settings › Data Controls.",
        'Toggle OFF "Improve the model for everyone" (this is the training opt-out).',
        "Note out loud: the opt-out is forward-looking only — anything already sent is already in the training pipeline and can't be pulled back.",
        "For one-off sensitive questions, use a Temporary Chat (chat menu › Temporary) — it isn't saved to history or used for training."
      ],
      verify:"Reload Settings › Data Controls and confirm the toggle stays off. If they have multiple logins/devices, check each — the setting is per-account, not per-device.",
      safe:{
        public:"Fine — public marketing copy, general questions, published content.",
        internal:"Only after training is off, and even then keep it generic. No client names, no financials, no unreleased plans.",
        personal:"No. Never paste personal or client PII (names, health, addresses, IDs) into a consumer ChatGPT account, opt-out or not."
      },
      redlines:[
        "No client personal data — this is a NZ Privacy Act IPP 12 cross-border issue on a consumer tier.",
        "Don't rely on Plus 'feeling' more private — it isn't."
      ],
      say:"Turning this one toggle off stops future chats feeding the model. But for anything with a client's name in it, we want you on the Team plan, which puts that protection in the contract, not just a setting."
    },
    "chatgpt:plus": {
      authored:true,
      verdict:"Same risk as Free — the $20 buys speed, not privacy.",
      upgrade:"Move to ChatGPT Team, not just Plus. Plus is consumer terms; Team is Business Terms with training exclusion + workspace isolation + admin controls. This is usually the single highest-value change I recommend to a client who has staff using ChatGPT.",
      steps:[
        "Open Settings › Data Controls.",
        'Toggle OFF "Improve the model for everyone".',
        "Explain the ceiling: even with training off, Plus has no admin oversight, no DPA, no contractual training exclusion.",
        "If staff are already paying for Plus individually, that's the trigger to consolidate onto one Team workspace."
      ],
      verify:"Confirm the Data Controls toggle is off. Ask whether other staff also have Plus accounts — scattered personal Plus logins are the real exposure.",
      safe:{
        public:"Fine.",
        internal:"Generic internal work only, training off. Treat like Free.",
        personal:"No. Upgrade to Team before any client data touches it."
      },
      redlines:[
        "Don't let 'we pay for it' be mistaken for 'it's protected'.",
        "No client PII."
      ],
      say:"The paid Plus plan is faster and gets newer models, but on privacy it's identical to the free one. The upgrade that actually changes your risk is Team."
    },
    "chatgpt:team": {
      authored:true,
      verdict:"Good tier — verify the workspace defaults and you're set.",
      upgrade:null,
      steps:[
        "As workspace admin, open Workspace Settings and confirm data sharing / model improvement is disabled at the workspace level.",
        "Set member roles: who can create GPTs, connect integrations, and use external actions.",
        "Turn on SSO if they have it, so leavers lose access cleanly.",
        "For regulated data, confirm whether they need Enterprise (adds audit logs, longer retention controls, DPA at scale)."
      ],
      verify:"In Admin, confirm the workspace shows training excluded. Spot-check one member account to confirm they can't re-enable sharing.",
      safe:{
        public:"Fine.",
        internal:"Yes — this is what the tier is for.",
        personal:"Generally yes for business-as-usual, but still apply judgement: minimise PII, and for health/financial/regulated data confirm the DPA and consider Enterprise."
      },
      redlines:[
        "Don't assume every staff member is inside the Team workspace — check for stray personal accounts still in use."
      ],
      say:"You're on the right plan. My job here is just to confirm the admin settings match what the contract promises, and to tidy up who can do what."
    },

    // ─── Microsoft Copilot ──────────────────────────────────────────────
    "copilot:standalone": {
      authored:true,
      verdict:"Consumer Copilot — harden or move them into M365.",
      upgrade:"If they pay for Microsoft 365 Business, use Microsoft 365 Copilot instead of the free copilot.microsoft.com. M365 Copilot runs under Enterprise Data Protection: prompts stay in the tenant boundary and aren't used to train foundation models.",
      steps:[
        "In the consumer app: Profile › Settings › Privacy and turn off model-training / personalisation options.",
        "Check whether they're signed in with a personal Microsoft account or a work account — a work account may already route them to the protected experience.",
        "If they have M365 Business, stop using the standalone site for work and switch to the in-app Copilot."
      ],
      verify:"Confirm the account type (personal vs work) in the top-right profile. Work-account + M365 licence is the safe path.",
      safe:{
        public:"Fine.",
        internal:"Only with training off, and prefer moving to M365 Copilot.",
        personal:"No on the consumer standalone version."
      },
      redlines:["Don't mix personal-account Copilot with company documents."],
      say:"There are two Copilots that look identical. The free website is consumer-grade; the one inside your paid Microsoft 365 keeps everything in your company's boundary. Let's get you using that one."
    },
    "copilot:m365": {
      authored:true,
      verdict:"Strong tier — configure Purview and governance.",
      upgrade:null,
      steps:[
        "Apply Microsoft Purview sensitivity labels across the tenant so Copilot respects document classifications.",
        "Review that Copilot only surfaces content a user already has permission to see (it inherits SharePoint/OneDrive permissions — over-sharing there becomes an AI problem).",
        "Set data residency / commitments in the admin centre if NZ/AU residency matters to them.",
        "Confirm audit logging is on."
      ],
      verify:"Check Purview labels are published and that a test user can't get Copilot to surface a document they lack permission to.",
      safe:{
        public:"Fine.",
        internal:"Yes.",
        personal:"Yes for business use within the tenant, provided permissions and labels are set correctly. Fix over-broad SharePoint sharing first."
      },
      redlines:["Copilot will expose whatever a user can already over-access — audit sharing before rollout."],
      say:"The protection is solid at this tier. The real work is making sure Copilot only ever shows each person what they're already allowed to see."
    },

    // ─── Google Gemini ──────────────────────────────────────────────────
    "gemini:consumer": {
      authored:true,
      verdict:"Highest-exposure default — turn off Activity, then upgrade.",
      upgrade:"Move to Gemini for Workspace (part of Google Workspace Business). No human review, no model training, admin controls, and NZ-relevant data residency options.",
      steps:[
        "Go to myactivity.google.com › Gemini Apps.",
        "Turn OFF 'Gemini Apps Activity' (a.k.a. Keep Activity).",
        "Explain the default: with it on, prompts can be human-reviewed and retained up to ~36 months, and reviewers can see them.",
        "Delete existing activity while you're in there."
      ],
      verify:"Reload the Gemini Apps Activity page and confirm it reads 'off'. Confirm the account is personal (@gmail) vs a Workspace account.",
      safe:{
        public:"Fine once Activity is off.",
        internal:"Avoid — the human-review exposure makes this the riskiest consumer assistant. Upgrade first.",
        personal:"No. This is the one I'm most firm about — human reviewers plus 3-year retention on a consumer account."
      },
      redlines:[
        "No client data — the human-review path is the specific risk.",
        "Don't confuse a personal @gmail Gemini with the company Workspace one."
      ],
      say:"Gemini's default is the most exposed of the big assistants — a human can review these chats and they're kept for up to three years. First thing we do is switch that off; then we look at moving you to the Workspace version."
    },
    "gemini:workspace": {
      authored:true,
      verdict:"Good tier — set residency and org-unit access.",
      upgrade:null,
      steps:[
        "In the Google Admin Console, set regional data residency if they need NZ/AU.",
        "Confirm Gemini is enabled only for the org units that should have it.",
        "Confirm no human review / no training applies (Workspace terms)."
      ],
      verify:"Admin Console shows Gemini scoped to the right org units and residency set. No 'Activity' human-review prompt appears for these accounts.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Yes for business use under Workspace terms; set residency for regulated data."},
      redlines:["Make sure staff use the Workspace login, not a side @gmail."],
      say:"On the Workspace version the human-review problem goes away. We just set where the data lives and who's switched on."
    },

    // ─── Claude ─────────────────────────────────────────────────────────
    "claude:consumer": {
      authored:true,
      verdict:"Since Sept 2025 it trains by default — turn it off.",
      upgrade:"For business, move to Claude Team / for Work (claude.ai/work): commercial terms, workspace isolation, no training on your conversations.",
      steps:[
        "Open Settings › Privacy.",
        'Turn OFF "Help improve Claude" (the training toggle).',
        "Note the Sept-2025 change: consumer Free/Pro now train on conversations unless you opt out — older advice that 'Claude never trains' is out of date.",
        "Set data-retention preferences while in Privacy."
      ],
      verify:"Reload Settings › Privacy and confirm 'Help improve Claude' is off on each device/login.",
      safe:{
        public:"Fine.",
        internal:"Generic internal work with training off; prefer Team for anything sensitive.",
        personal:"No on consumer — upgrade to Team first."
      },
      redlines:["Don't rely on the old reputation — the default changed in Sept 2025."],
      say:"Claude used to be the one that never trained on your chats. That changed in late 2025 for personal accounts, so we turn the setting off — and for business work I'd put you on the Team version."
    },
    "claude:team": {
      authored:true,
      verdict:"Good tier — confirm training-off and workspace hygiene.",
      upgrade:null,
      steps:[
        "In Admin Settings › Data and Privacy, confirm training is off for the workspace.",
        "Set member roles and remove any personal accounts still being used for work.",
        "Turn on SSO if available."
      ],
      verify:"Admin panel shows training excluded for the workspace; members can't override it.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Yes for business use; minimise PII and confirm the DPA for regulated data."},
      redlines:["Watch for staff still using personal claude.ai logins alongside the workspace."],
      say:"This is the right plan. We just confirm the admin settings match the contract and that everyone's actually inside the work workspace."
    },

    // ─── Perplexity ─────────────────────────────────────────────────────
    "perplexity:consumer": {
      authored:true,
      verdict:"Turn off AI data retention; treat as a search tool, not a vault.",
      upgrade:"For sensitive/business search at scale, Enterprise Pro adds a zero-retention framework and admin controls.",
      steps:[
        "Open Account Settings › Preferences.",
        "Turn OFF 'AI Data Retention'.",
        "Frame it correctly: Perplexity is a research/search tool — the safest habit is to not paste confidential documents into it at all, just use it to find and synthesise public information."
      ],
      verify:"Reload Preferences and confirm AI Data Retention is off.",
      safe:{
        public:"Fine — this is its sweet spot (public research).",
        internal:"Keep queries generic; don't paste internal docs.",
        personal:"No — don't paste client PII into consumer Perplexity."
      },
      redlines:["Don't use it as a document analyser for confidential files on the consumer tier."],
      say:"Perplexity is brilliant for research on public information. Keep it to that, switch off data retention, and don't paste anything confidential into it."
    },
    "perplexity:enterprise": {
      authored:true,
      verdict:"Good tier — zero-retention; confirm admin logging limits.",
      upgrade:null,
      steps:[
        "In the API/Enterprise dashboard, restrict debug logging metrics.",
        "Confirm the zero-retention framework is active for the org.",
        "Set member access."
      ],
      verify:"Dashboard confirms zero-retention active and debug logging restricted.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Business use OK under the enterprise DPA; still minimise PII."},
      redlines:["Confirm the DPA covers cross-border (IPP 12) for NZ clients."],
      say:"At this tier your searches aren't retained. We just tidy the logging settings and confirm the agreement covers cross-border data."
    },

    // ─── Grammarly ──────────────────────────────────────────────────────
    "grammarly:consumer": {
      authored:true,
      verdict:"Trains on everything you type across the web — opt out, then plan Business.",
      upgrade:"For any team, move to Grammarly Business/Enterprise: training is off by default, text is treated as confidential (AES-256 at rest, TLS 1.2), and admins can mandate SSO + hardware-key sign-in.",
      steps:[
        "Open Account Settings › Security & Privacy.",
        'Toggle OFF "Product Improvement and Training".',
        "Also turn off tailored/personalised assistance to delete the personalisation profile already built from your writing.",
        "Remember it works everywhere the extension runs — so this setting protects browser editors, email, docs, the lot."
      ],
      verify:"Reload Security & Privacy and confirm both toggles are off. Because Grammarly rides the browser extension, check every browser/profile the person uses.",
      safe:{
        public:"Fine — public copy once training is off.",
        internal:"Only after training is off; it captures anything typed in a browser field, so keep drafts generic.",
        personal:"No. It reads text across every site — don't run a consumer account over client or personal data."
      },
      redlines:[
        "It captures text in almost every web field — treat a consumer account as always-on data collection until the toggle is off.",
        "No client personal data on a personal account."
      ],
      say:"Grammarly quietly learns from everything you type in a browser. We switch that off in two clicks — and for the team, the Business version has it off from the start."
    },
    "grammarly:business": {
      authored:true,
      verdict:"Strong tier — confirm training-off and tighten sign-in.",
      upgrade:null,
      steps:[
        "In the Admin Console, verify the product-improvement / training toggle is off (it should be by default).",
        "Mandate SAML SSO so access follows the staff list.",
        "For anyone handling sensitive documents, require FIDO2 / hardware-key authentication."
      ],
      verify:"Admin Console shows training off org-wide and SSO enforced; a test member can't re-enable training on their own account.",
      safe:{public:"Fine.",internal:"Yes — training is off and text is confidential.",personal:"Business use OK; still minimise PII and confirm the DPA covers cross-border (IPP 12)."},
      redlines:["Don't leave members on personal Grammarly logins alongside the Business account."],
      say:"You're on the right plan here. We just confirm training is off and lock down how people sign in."
    },

    // ─── Notion AI ──────────────────────────────────────────────────────
    "notion:plus": {
      authored:true,
      verdict:"Contractually no-training already — the one knob is web search.",
      upgrade:"Business/Enterprise adds admin visibility (audit logs, SCIM, SSO) and a custom DPA with sub-processor control — worth it once more than a few people rely on it.",
      steps:[
        "Understand the good news first: Notion's contracts with its AI sub-processors (OpenAI, Anthropic) prohibit training on your data, and workspace embeddings are isolated per workspace.",
        "Open Workspace Settings › Notion AI.",
        'Disable "Enable web search for workspace" — or set it to require confirmation before any web request.',
        "That stops Notion AI leaking your document/schema context into a public web query."
      ],
      verify:"Workspace Settings › Notion AI shows web search off or confirm-first. Confirm the workspace is a paid Plus workspace, not a stray personal one.",
      safe:{
        public:"Fine.",
        internal:"Yes — no training and isolated embeddings.",
        personal:"Generally OK for business use; minimise PII and, for regulated data, move to Business/Enterprise for the DPA."
      },
      redlines:["Leaving web search fully open lets a prompt push internal context out to a search query — close it."],
      say:"Notion already promises in its contracts not to train on your content. The only thing we tidy is the web-search setting so nothing internal leaks into a public search."
    },
    "notion:business": {
      authored:true,
      verdict:"Good tier — same no-training, now with admin control.",
      upgrade:null,
      steps:[
        "Confirm the same no-training protections as Plus carry through (they do).",
        "Turn on SAML SSO and SCIM provisioning so access tracks HR.",
        "Review which sub-processors are enabled; on Enterprise, request specific configurations if data residency matters.",
        "Keep web search closed or confirm-first."
      ],
      verify:"Admin settings show SSO/SCIM on and audit logs available; sub-processor list matches what you expect.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Business use OK under the DPA; minimise PII and set residency for regulated data."},
      redlines:["Don't assume Enterprise residency is set by default — request it if a client needs it."],
      say:"At this tier the protections are the same, and you also get the audit trail and access controls a growing team needs."
    },

    // ─── HubSpot AI ─────────────────────────────────────────────────────
    "hubspot:standard": {
      authored:true,
      verdict:"Breeze trains on your CRM by default — opt out globally now.",
      upgrade:"If the account holds regulated data (health, financial), enable the Sensitive Data setting — it opts you out of training automatically and permanently.",
      steps:[
        "Open Settings › AI › the Access tab.",
        'Toggle OFF "AI Model Training".',
        "Reassure them on isolation: training happens within tenant boundaries — your CRM data never reaches another customer's models — but it does improve HubSpot's product broadly until you opt out.",
        "If regulated data is involved, enable Sensitive Data as well."
      ],
      verify:"Settings › AI › Access shows AI Model Training off. If Sensitive Data is enabled, confirm the account shows as excluded from training.",
      safe:{
        public:"Fine.",
        internal:"Yes once training is off — this is CRM/marketing content.",
        personal:"Contacts are personal data by nature: opt out of training, restrict who can trigger AI, and confirm the DPA covers cross-border."
      },
      redlines:["A CRM is full of personal data — don't leave AI training on while it's processing your contact records."],
      say:"HubSpot's AI is learning from your customer records by default. One global toggle stops that — and if you hold any regulated data, we switch on Sensitive Data too."
    },
    "hubspot:sensitive": {
      authored:true,
      verdict:"Auto-excluded from training — now control who can trigger AI.",
      upgrade:null,
      steps:[
        "Confirm Sensitive Data is enabled — the account is then automatically opted out of AI model training and can't be opted back in.",
        "Tenant isolation still guarantees no cross-customer leakage.",
        "Apply strict role-based access to AI features — not every staff member needs to run AI generations across the whole CRM."
      ],
      verify:"Account shows Sensitive Data on and training excluded; AI-feature permissions are scoped to the roles that actually need them.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Appropriate for regulated data at this setting; still apply least-privilege access and confirm the DPA."},
      redlines:["Don't hand every user AI-generation rights across the full CRM — scope it."],
      say:"With Sensitive Data on, training is off for good. The remaining job is making sure only the right people can point AI at your records."
    },

    // ─── NotebookLM ─────────────────────────────────────────────────────
    "notebooklm:consumer": {
      authored:true,
      verdict:"Private by default — the trap is the feedback buttons.",
      upgrade:"On a Workspace account it inherits the full enterprise contract (no human review, no domain training) and admins can scope it to org units.",
      steps:[
        "Know the default: uploads and chats stay in the account and Google doesn't train foundation models on them — UNLESS you submit thumbs-up/thumbs-down feedback.",
        "That feedback triggers a human-review pathway and retains the surrounding chat for up to three years.",
        "Rule for the client: never click the feedback buttons on a personal notebook if the conversation touched anything sensitive.",
        "Don't load highly confidential corporate documents into an unmanaged personal notebook in the first place."
      ],
      verify:"There's no toggle here — the control is behaviour. Confirm they understand the feedback-button rule and are on a personal vs Workspace account.",
      safe:{
        public:"Fine.",
        internal:"OK for non-sensitive sources; never rate a chat that touched internal detail.",
        personal:"No — don't put client personal data into an unmanaged personal notebook."
      },
      redlines:[
        "Never click 👍/👎 on a sensitive personal-account chat — that's the one action that sends it to human review for 3 years.",
        "No confidential corporate docs in a personal notebook."
      ],
      say:"NotebookLM is unusually private for a free Google tool — with one catch. The moment you rate an answer thumbs-up or down, a human can review it and it's kept for three years. So we simply never touch those buttons on anything sensitive."
    },
    "notebooklm:workspace": {
      authored:true,
      verdict:"Enterprise-grade — no human review; tighten Drive sharing.",
      upgrade:null,
      steps:[
        "Confirm it inherits the Workspace contract: SOC 1/2/3, ISO 27001, no human review of uploads, no training on domain data.",
        "In the Admin Console, enable NotebookLM globally or restrict to specific organisational units.",
        "Tighten Drive sharing — NotebookLM can only reach documents a user already has permission to read, so restrictive Drive sharing limits the blast radius."
      ],
      verify:"Admin Console shows NotebookLM scoped to the right org units; a test user can't add a source they don't have Drive permission for.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Yes for business use under Workspace terms; pair with tight Drive sharing."},
      redlines:["Over-shared Drive files become AI-reachable — audit sharing before rollout."],
      say:"On Workspace the feedback/human-review problem disappears. The real work is making sure Drive sharing is tidy, because that's what NotebookLM can see."
    },

    // ─── Canva AI ───────────────────────────────────────────────────────
    "canva:free-pro": {
      authored:true,
      verdict:"Trains on your designs, prompts and uploads by default — opt out, and re-check it.",
      upgrade:"Canva Teams/Business/Enterprise is covered by Canva Shield: customer content is excluded from foundation-model training and admins control sharing.",
      steps:[
        "Open Account Settings › Privacy Controls.",
        'Toggle OFF "Use my content for AI/model training".',
        "Warn about the trap: syncing your Canva account with Affinity or other linked apps can reset that opt-out to default.",
        "Disconnect linkages you don't need, and re-check the toggle periodically."
      ],
      verify:"Privacy Controls shows the training toggle off. If they use Affinity or linked apps, re-open the toggle after connecting to confirm it didn't reset.",
      safe:{
        public:"Fine once training is off.",
        internal:"Only after opt-out; keep uploaded assets non-confidential.",
        personal:"No — don't upload client photos, logos under NDA, or personal data to a consumer account."
      },
      redlines:[
        "Linking Affinity can silently re-enable training — re-check after any connection.",
        "No client-confidential brand assets on a personal account."
      ],
      say:"Canva started using your designs to train its AI by default in late 2025. We turn that off — and because linking their other apps can switch it back on, I'll show you where to re-check it."
    },
    "canva:teams": {
      authored:true,
      verdict:"Canva Shield covers you — one support-sharing knob to close.",
      upgrade:null,
      steps:[
        "Confirm Teams/Business/Enterprise runs under Canva Shield — customer content excluded from foundation training.",
        "In Admin Settings › Security › Data and Privacy, review shared-folder visibility and external-sharing limits.",
        'Turn off "Allow team members to temporarily share affected designs with Canva Support" so staff can\'t route a sensitive design through a support ticket.'
      ],
      verify:"Admin Security shows the support-share option off and external sharing scoped; content-for-training is excluded.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Business use OK under Canva Shield; still minimise client PII in uploads."},
      redlines:["Leaving support-sharing on lets a sensitive design leave via a support ticket."],
      say:"At this tier your content is protected by Canva Shield. We just close the one setting that could send a design out through support."
    },

    // ─── Adobe Firefly ──────────────────────────────────────────────────
    "adobe:individual": {
      authored:true,
      verdict:"Firefly doesn't train on your work — but 'Content analysis' is on by default.",
      upgrade:"Firefly for Business adds IP indemnification and enterprise content exclusion — relevant if generated images will be used commercially at scale.",
      steps:[
        "Clarify the nuance out loud: Firefly's models are trained on Adobe Stock + licensed + public-domain content, NOT your work. So generations rarely reproduce copyrighted material.",
        'The setting that IS on by default is "Content analysis" — it lets Adobe analyse your files and edits to improve its products.',
        "Go to Adobe Account › Privacy Settings › locate Content analysis › toggle it OFF to stop that analysis entirely."
      ],
      verify:"Adobe Account › Privacy Settings shows Content analysis off.",
      safe:{
        public:"Fine.",
        internal:"Yes — the model isn't trained on your work; turn off content analysis for good measure.",
        personal:"Business use OK; for regulated/commercial output prefer Firefly for Business and its indemnification."
      },
      redlines:["Don't conflate 'content analysis' with model training — turning it off is about product-analytics, and it's the honest thing to set."],
      say:"Good news: Firefly is trained on licensed stock, not your files, so it's one of the cleaner image tools. There's just one analytics setting on by default that we switch off."
    },
    "adobe:business": {
      authored:true,
      verdict:"One of the cleanest enterprise creative options — govern custom models.",
      upgrade:null,
      steps:[
        "Confirm the model provenance: Firefly is trained only on Adobe Stock, openly licensed, and public-domain content — plus Adobe offers IP indemnification for enterprise customers.",
        "Your enterprise content and any custom style models you train are excluded from foundation training.",
        "In the Enterprise Admin Console, restrict custom-model permissions.",
        "Ensure creators pick enterprise-approved partner models from the dropdown, not community ones."
      ],
      verify:"Admin Console shows custom-model permissions restricted; creators default to enterprise-approved models.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Yes for commercial business use — the indemnification and licensed-training model make this low-risk."},
      redlines:["Community/partner models outside the approved set can carry different training/IP terms — lock the dropdown."],
      say:"This is about as safe as creative AI gets — trained on licensed content, with Adobe standing behind the output. We just govern who can build custom models."
    },

    // ─── Midjourney ─────────────────────────────────────────────────────
    "midjourney:basic": {
      authored:true,
      verdict:"No safe configuration for business work — everything is public.",
      upgrade:"For anything proprietary you MUST be on Pro or Mega with Stealth Mode — and even then prompts are still used for training. If confidentiality matters, prefer Adobe Firefly instead.",
      steps:[
        "Say the surprising part plainly: on Basic and Standard, every prompt and every image is published to your public gallery on midjourney.com — even from a private Discord DM or private server.",
        "There is no opt-out for public visibility OR training on these tiers.",
        "So the action is a decision, not a setting: do not use this tier for trademarked, brand-sensitive, or client work.",
        "If they need Midjourney, upgrade to Pro/Mega and enable Stealth — with eyes open about the training caveat."
      ],
      verify:"There's nothing to toggle safe here. Confirm what they've already generated — it may already be public — and check whether sensitive prompts are sitting in their public gallery.",
      safe:{
        public:"Only for content you're happy to have fully public — the prompt and image both go to your public gallery.",
        internal:"No — outputs are public even from private DMs.",
        personal:"No. Never put client, brand, or personal material through this tier."
      },
      redlines:[
        "Everything is public on this tier, including from private DMs — treat it as a public bulletin board.",
        "No client, trademark, or NDA work — full stop."
      ],
      say:"This is the one that surprises everyone: on the basic Midjourney plans, everything you make is public — even from a private message. There's no setting to fix it, so we simply don't use this tier for anything that matters to a client."
    },
    "midjourney:pro": {
      authored:true,
      verdict:"Stealth hides the web gallery — it does NOT stop training or Discord visibility.",
      upgrade:null,
      steps:[
        "Type /settings in Discord and enable Stealth Mode (the public button should turn grey).",
        "Understand what Stealth does: it removes your generations from the public midjourney.com gallery — a real step up from Basic/Standard.",
        "Understand what it does NOT do: it doesn't stop Midjourney training on your prompts (no opt-out exists), and it doesn't hide work generated in a shared Discord channel from other members.",
        "For corporate assets, generate only in a private server or via the personal Create web page."
      ],
      verify:"In /settings the public toggle is grey (Stealth on). Confirm they generate in a private server or the web Create page, not a shared channel.",
      safe:{
        public:"Fine.",
        internal:"Only in a private server / web Create, and accept that prompts are still used for training.",
        personal:"No — the training caveat means don't feed client-identifying prompts even with Stealth on."
      },
      redlines:[
        "Stealth does not equal private — prompts still train the model, and shared Discord channels still expose your work.",
        "Don't generate corporate assets in a shared channel."
      ],
      say:"Stealth Mode takes your images off the public gallery, which is the big fix. Just know it doesn't stop Midjourney learning from your prompts — so we keep truly sensitive briefs off it entirely."
    },

    // ─── Otter.ai ───────────────────────────────────────────────────────
    "otter:basic-pro": {
      authored:true,
      verdict:"Trains on your audio by default, plus real consent exposure — move off it.",
      upgrade:"Move to Otter Business, or better, a privacy-first alternative like Granola or Fireflies. Consumer Otter carries both training-by-default and a history of unconsented-recording litigation.",
      steps:[
        "Explain the two risks: Otter trains its models on de-identified audio/transcripts by default, and it has faced litigation over recording participants without consent (US wiretapping / California CIPA).",
        "If they must stay on consumer for now: disconnect Google/Outlook calendar links so the Otter bot doesn't auto-join meetings.",
        "Email support@otter.ai to request deletion when a project closes.",
        "Plan the move to Business or a privacy-first tool."
      ],
      verify:"Calendar integrations disconnected (no auto-join). Confirm no meetings are being silently recorded without attendees knowing.",
      safe:{
        public:"Only low-stakes calls you'd be comfortable being recorded and used for training.",
        internal:"No on consumer — training-on plus consent risk.",
        personal:"No. Don't record client or personal conversations on a consumer Otter account."
      },
      redlines:[
        "Auto-join + no consent notice is a legal exposure — disconnect calendar auto-join.",
        "No client meetings on the consumer tier."
      ],
      say:"Otter's free and Pro plans learn from your recordings, and there's a real consent issue with the bot auto-joining calls. My recommendation is to move you onto Business — or a more privacy-first recorder like Granola."
    },
    "otter:business": {
      authored:true,
      verdict:"Better — third-party training excluded, but Otter still trains internally.",
      upgrade:"If you want a stricter posture, Fireflies or Granola exclude training more completely than Otter Business does.",
      steps:[
        "Understand the ceiling: Business excludes meeting data from third-party model training, but Otter still permits itself to train its own internal models on your data.",
        "In the Admin Panel, enable mandatory participant-notification pop-ups.",
        "Restrict the auto-join feature globally.",
        "Mind calendar scope — high-volume integration captures organiser details, attendee emails, and meeting-room URLs."
      ],
      verify:"Admin Panel shows participant notifications mandatory and auto-join restricted.",
      safe:{
        public:"Fine.",
        internal:"Generally OK with notifications on; know Otter still trains internal models on it.",
        personal:"Only with clear consent and notifications; for sensitive client calls, prefer Fireflies/Granola."
      },
      redlines:["Don't rely on Business as a full training opt-out — internal training still applies."],
      say:"Business is a real improvement — it stops outside companies training on your meetings. Otter still trains its own models though, so for your most sensitive calls I'd lean on a stricter tool."
    },

    // ─── Fathom ─────────────────────────────────────────────────────────
    "fathom:free": {
      authored:true,
      verdict:"Internal training on by default — toggle off; third-party is already excluded.",
      upgrade:"Team Edition turns training off across the board (notes, transcripts, summaries), is SOC 2 Type II, and locks the opt-out at admin level.",
      steps:[
        "Note the good part: Fathom does not share meeting data with third-party model trainers — better than consumer Otter.",
        "But it uses de-identified transcripts/summaries to improve its own internal models by default.",
        "Go to Account Settings, find the training controls, and toggle them off.",
        "Be deliberate about which calendars you connect — linkage still reads organiser and attendee details."
      ],
      verify:"Account Settings shows internal-training controls off; only intended calendars are connected.",
      safe:{
        public:"Fine.",
        internal:"OK once training is off; mind who's on the call.",
        personal:"Only with consent and training off; for regulated client data prefer Team Edition."
      },
      redlines:["Don't leave internal training on while recording client calls."],
      say:"Fathom's better than most free recorders — it never sells your meetings to outside AI trainers. It does train its own models by default, so we switch that off."
    },
    "fathom:team": {
      authored:true,
      verdict:"Good tier — training off everywhere; lock it at admin level.",
      upgrade:null,
      steps:[
        "Confirm Team Edition excludes notes, transcripts, and summaries from every training programme.",
        "It's SOC 2 Type II certified and integrates cleanly with Salesforce/HubSpot.",
        "In the Admin Panel, enable the global model-training opt-out so protection doesn't rely on individual settings."
      ],
      verify:"Admin Panel shows the global training opt-out enabled across all members.",
      safe:{public:"Fine.",internal:"Yes.",personal:"Business use OK with consent; confirm the DPA for regulated client data."},
      redlines:["Don't rely on per-user settings — set the global opt-out."],
      say:"On Team Edition your meetings are excluded from training across the board. We just flip the one global switch so it's locked for everyone, not left to each person."
    },

    // ─── Granola ────────────────────────────────────────────────────────
    "granola:any": {
      authored:true,
      verdict:"Best-architected recorder — flip the personal training toggle, still get consent.",
      upgrade:"Enterprise goes further than personal: contractual prohibition on OpenAI/Anthropic sub-processors training on your data, plus a global opt-out locked at admin level (personal training defaults ON).",
      steps:[
        "Explain why it's different: Granola transcribes on-device in real time and deletes the raw audio immediately — there's no central audio store to breach. SOC 2 Type II.",
        'On a personal plan, open Settings › Profile › toggle OFF "Model Training" (it uses de-identified summaries for improvement unless you do).',
        "Because Granola doesn't join as a visible bot, the host must still tell attendees AI transcription is active — that's a consent obligation, not an app setting.",
        "For teams handling client data, move to Enterprise where training is off by default and contractually locked."
      ],
      verify:"Settings › Profile shows Model Training off (personal). Confirm the host announces transcription, since there's no bot to signal it.",
      safe:{
        public:"Fine.",
        internal:"Yes — on-device processing and no audio retention make this a strong pick.",
        personal:"OK with the training toggle off and clear consent; Enterprise for regulated client data."
      },
      redlines:[
        "No visible bot means attendees may not know they're recorded — always announce it (multi-party consent).",
        "Personal-tier training is ON by default — don't skip the toggle."
      ],
      say:"Granola is the best-built of these — it transcribes on your device and throws the audio away instantly. Two things: on a personal plan we turn off the training toggle, and because there's no bot on the call, you still need to tell people it's recording."
    },

    // ─── Fireflies.ai ───────────────────────────────────────────────────
    "fireflies:any": {
      authored:true,
      verdict:"Strong privacy posture on every tier — force zero-retention and fence the calendar.",
      upgrade:null,
      steps:[
        "Note the strong baseline: AES-256 at rest, TLS 1.3 in transit on AWS, SOC 2 Type II, and downstream LLM providers are contractually barred from caching or training on your meeting data — across all tiers.",
        "In Account Settings, force zero-data-retention with third-party vendors.",
        "Set calendar linkage boundaries so the Fireflies bot doesn't auto-join external client sessions you'd rather keep it out of."
      ],
      verify:"Account Settings shows zero-data-retention forced; calendar rules prevent auto-join on external/client meetings.",
      safe:{
        public:"Fine.",
        internal:"Yes — this is a privacy-first recorder.",
        personal:"OK with consent and zero-retention set; confirm the DPA for regulated client data."
      },
      redlines:["Don't let the bot auto-join external client calls without consent — fence the calendar."],
      say:"Fireflies is one of the safer recorders out of the box — outside AI providers can't train on your meetings. We just force zero-retention and make sure the bot only joins the calls you want it on."
    },

    // ─── Zoom AI Companion ──────────────────────────────────────────────
    "zoom-ai:consumer": {
      authored:true,
      verdict:"Doesn't train on your meetings — it's opt-in per meeting; mind the feedback caveat.",
      upgrade:"Business/Enterprise adds a signed DPA, full admin control over AI features and retention, and a HIPAA BAA for healthcare.",
      steps:[
        "Reassure with the fact: since the August 2023 policy rewrite, Zoom does not use your audio, video, chat, screen-sharing or attachments to train its or any third-party AI models — on any AI-Companion-enabled plan.",
        "AI Companion is opt-in: the host must turn it on per meeting, and participants see a notification when it's active.",
        "One caveat: while meeting content isn't used for training, Zoom may use feedback (thumbs up/down, submitted prompts) and usage data to improve AI features.",
        "Review the AI Companion settings before enabling it in a meeting."
      ],
      verify:"Confirm the account is Pro/Business (AI Companion isn't on free Basic). Host sees the per-meeting toggle; participants get the active-notification.",
      safe:{
        public:"Fine.",
        internal:"Yes — content isn't used for training; keep feedback generic.",
        personal:"OK for business use with consent; avoid submitting sensitive text as AI feedback."
      },
      redlines:["Don't paste sensitive detail into AI-Companion feedback prompts — feedback is the one thing Zoom may use."],
      say:"Good news on Zoom — since 2023 they don't train any AI on your meetings, and the assistant only runs when the host turns it on and everyone's notified. Just avoid putting sensitive detail into the thumbs-up/down feedback."
    },
    "zoom-ai:business": {
      authored:true,
      verdict:"Contractual no-training plus full admin control — configure defaults.",
      upgrade:null,
      steps:[
        "Confirm the commercial DPA: Zoom and its sub-processors are contractually barred from using meeting content to train AI — the consumer protection, now backed by a signed contract. SOC 2 Type II; HIPAA BAA available.",
        "In the Admin Portal › AI Companion, enable/disable specific features (meeting summary, smart recording, in-meeting Q&A) globally or per group.",
        "Disable AI Companion for external/guest meetings by default and require host confirmation before activation.",
        "Set retention windows for AI-generated summaries to match your own data-retention policy, and confirm audit logging."
      ],
      verify:"Admin Portal shows AI features scoped, external/guest meetings default-off, host confirmation required, and retention aligned to policy.",
      safe:{
        public:"Fine.",
        internal:"Yes.",
        personal:"Yes for business use under the DPA; for healthcare, put the HIPAA BAA in place and align retention."
      },
      redlines:["Don't leave AI Companion on by default for external/guest meetings."],
      say:"At this tier the no-training promise is in a signed contract, and you control exactly which AI features run and for how long. We set sensible defaults — off for guest meetings, host has to switch it on."
    }

  };

  // ══════════════════════════════════════════════════════════════════════
  // 3. STALENESS — thresholds for the "Check for updates" light
  //    Client-side only: compares each tool's most-recent lastReviewed date
  //    (from audit-policies.js) to today. This is a review-cadence signal,
  //    not a live diff of the vendor's page. A future scheduled scan job can
  //    write real "changed" flags into audit-policies.js and this light will
  //    surface them automatically.
  // ══════════════════════════════════════════════════════════════════════
  var STALENESS = {
    freshDays: 90,   // ≤ this many days since review → green "Up to date"
    dueDays: 180     // ≤ this → amber "Due for review"; beyond → red "Re-verify"
    // (AI vendor policies move fast; 90 days is a deliberately tight cadence.)
  };

  window.OPERATOR = {
    TOOLS: TOOLS,
    CATS: CATS,
    scoreEntry: scoreEntry,
    DEEP: OPERATOR_DEEP,
    STALENESS: STALENESS
  };
})();
