/*
 * audit-policies.js — Vendor policy data for the AI Use Audit
 *
 * This file is the SINGLE SOURCE OF TRUTH for the policy explainer modals
 * shown in /audit results and for the inline policy links rendered in the
 * client-facing audit emails.
 *
 * Loaded two ways:
 *   • In the browser: via <script src="/audit-policies.js"> — sets
 *     window.AUDIT_POLICIES so audit.html can render the modal.
 *   • On the server: server/routes/audit.ts loads this file through
 *     Node's `vm` module at request time, with mtime-based caching so
 *     edits picked up without a server restart on Railway.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Editing guide for Nathaniel
 * ──────────────────────────────────────────────────────────────────────────
 * Each tier is keyed "<toolId>:<tierId>" — IDs must match TOOLS / tiers
 * arrays in client/public/audit.html. If you rename a tier ID there, rename
 * it here too.
 *
 * Required fields per entry:
 *   status        'verified' or 'needs-review' — used to colour the
 *                 confidence badge in the modal so clients see when info
 *                 has been double-checked vs flagged for follow-up.
 *   lastReviewed  ISO date 'YYYY-MM-DD' — shown to clients in modal footer.
 *   policyUrl     Direct link to vendor's own privacy / data-use page.
 *   policyLabel   Human label for the link (e.g. "OpenAI Privacy Policy").
 *   summary       One short sentence — appears in email + modal subhead.
 *   explainer     Array of paragraph strings — 1-3 paragraphs of plain
 *                 English shown in the modal body.
 *   sources       Array of {label, url} — additional reading. Always
 *                 prefer vendor docs over third-party reviews.
 *
 * Optional:
 *   confidence    'low' | 'medium' | 'high' | 'very-high' — what the
 *                 research report called "Confidence Level". Defaults to
 *                 'medium' if omitted.
 *
 * Initial population is drawn from the research document
 * "Corporate Governance and AI Auditing" (May 2026). Items marked
 * `status: 'needs-review'` either weren't in that report or used
 * non-vendor URLs that should be re-verified.
 * ──────────────────────────────────────────────────────────────────────────
 */

(function () {
  var DATA = {
    // ─── ChatGPT ──────────────────────────────────────────────────────────
    "chatgpt:free": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://openai.com/policies/privacy-policy/",
      policyLabel: "OpenAI Privacy Policy",
      summary:
        "Prompts and responses are used by default to train OpenAI's foundation models, and may be reviewed by humans for quality assurance.",
      explainer: [
        "When you use ChatGPT Free, every message you send becomes part of OpenAI's training data unless you explicitly opt out. That includes spreadsheets you paste, client details, draft emails, and code — anything in the conversation. A small fraction of those conversations are also reviewed by human moderators for safety and quality.",
        "The most important thing to know about the opt-out: it's forward-looking only. Anything OpenAI has already used to train a model cannot be removed from that model. So the safer path for business work is to switch to ChatGPT Team or Enterprise, which contractually exclude your conversations from training — or use a Temporary Chat if you must use a free account.",
      ],
      sources: [
        {
          label: "How your data is used to improve model performance (OpenAI Help)",
          url: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance",
        },
        {
          label: "OpenAI data controls FAQ",
          url: "https://help.openai.com/en/articles/7730893-data-controls-faq",
        },
      ],
    },
    "chatgpt:plus": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://openai.com/policies/privacy-policy/",
      policyLabel: "OpenAI Privacy Policy",
      summary:
        "Paying $20/month doesn't change the training defaults — Plus uses the same consumer-tier terms as Free.",
      explainer: [
        "ChatGPT Plus gives you priority access and newer models, but it sits on exactly the same consumer privacy terms as the free tier. Your conversations are used to train OpenAI's models unless you turn off \"Improve the model for everyone\" in Settings → Data Controls.",
        "If you do disable training, your chat history is preserved in the web interface, but the opt-out only protects future conversations — past ones are already in the training pipeline. For sensitive business work, Team or Enterprise is the right fit; for casual personal use, Plus with training off is workable.",
      ],
      sources: [
        {
          label: "How your data is used to improve model performance (OpenAI Help)",
          url: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance",
        },
      ],
    },
    "chatgpt:team": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://openai.com/business-data/",
      policyLabel: "OpenAI Business Data Privacy",
      summary:
        "Customer data is excluded from model training by default and isolated to your workspace.",
      explainer: [
        "ChatGPT Team and Enterprise plans are governed by OpenAI's Business Terms, which contractually prohibit OpenAI from using your inputs or outputs to train its foundation models. Your workspace is isolated from other customers and admins control role-based access for custom GPTs, integrations, and external actions.",
        "This is the tier I generally recommend for any business that wants people using ChatGPT — it removes the main category of risk (your prompts feeding a public model) without removing the everyday utility staff get from the tool.",
      ],
      sources: [
        {
          label: "Business data privacy, security, and compliance (OpenAI)",
          url: "https://openai.com/business-data/",
        },
        {
          label: "ChatGPT Enterprise security",
          url: "https://openai.com/enterprise-privacy/",
        },
      ],
    },

    // ─── Microsoft Copilot ────────────────────────────────────────────────
    "copilot:standalone": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://privacy.microsoft.com/en-us/privacystatement",
      policyLabel: "Microsoft Privacy Statement",
      summary:
        "Standalone (free) Copilot logs your conversations and uses personalisation data to improve consumer models unless you opt out.",
      explainer: [
        "The free Copilot at copilot.microsoft.com is consumer-tier: personalisations, search histories, and conversation logs are captured by default to train Microsoft's consumer models. Users authenticated through a business Entra ID (Azure AD) account are treated differently, and users under 18 are excluded from training.",
        "To turn training off on a personal Microsoft account: open your profile → Settings → Privacy, then disable \"Training on conversation activity\" and \"Training on voice conversations\". For any business use, you really want to be on Microsoft 365 Copilot instead.",
      ],
      sources: [
        {
          label: "Microsoft Copilot privacy (Microsoft Support)",
          url: "https://support.microsoft.com/en-us/copilot",
        },
      ],
    },
    "copilot:m365": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl:
        "https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection",
      policyLabel: "Microsoft 365 Copilot Enterprise Data Protection",
      summary:
        "Governed by the Enterprise Data Protection framework — your tenant data stays inside your tenant and is never used for training.",
      explainer: [
        "Microsoft 365 Copilot is built on top of your Microsoft 365 tenant, which means it inherits all the data-protection guarantees of your existing Microsoft 365 contract: the Data Processing Addendum (DPA), Product Terms, and the Enterprise Data Protection (EDP) framework. Your documents, emails, and prompts never leave the tenant boundary and are never used to train Microsoft's foundation models.",
        "It also respects existing controls — Purview sensitivity labels, DLP policies, and retention rules all apply automatically. This is one of the strongest privacy postures in this audit, provided your admin has the standard Purview controls turned on.",
      ],
      sources: [
        {
          label: "Enterprise data protection in Microsoft 365 Copilot",
          url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection",
        },
        {
          label: "Microsoft 365 Copilot data security FAQ",
          url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
        },
      ],
    },

    // ─── Google Gemini ────────────────────────────────────────────────────
    "gemini:consumer": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://myactivity.google.com/product/gemini",
      policyLabel: "Gemini Apps Activity controls",
      summary:
        "Gemini Apps Activity is on by default. De-identified prompts can be reviewed by humans and stored for up to 3 years.",
      explainer: [
        "On any personal Google account (not a Workspace business account), Gemini Apps Activity is enabled by default. A sample of your conversations is reviewed by human raters and retained for up to three years to improve Google's models. This setting applies to anything you do at gemini.google.com or in the Gemini app on your phone.",
        "Turning Apps Activity off stops human review and training — but it also disables conversation history beyond 72 hours. That trade-off is deliberate on Google's part: it discourages people from opting out. For business use, you want to be on Gemini for Workspace, which excludes data from training without losing history.",
      ],
      sources: [
        {
          label: "Gemini Apps & your data (Google)",
          url: "https://support.google.com/gemini/answer/13594961",
        },
      ],
    },
    "gemini:workspace": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://workspace.google.com/security/ai-privacy/",
      policyLabel: "Gemini for Workspace Privacy",
      summary:
        "Customer inputs, files, and drafts stay inside your Workspace domain — excluded from training, no human review.",
      explainer: [
        "Gemini for Workspace runs under the same enterprise data protections as the rest of Workspace: ISO 27001/42001, BSI C5, HIPAA-compliant. Your prompts, the files Gemini accesses in Drive, and any drafts it produces are never used to train Google's models and are never reviewed by humans.",
        "Admins can also pin regional data residency (EU or US) and use Workspace DLP to restrict what kinds of sensitive data leave the org. This is one of the safest configurations in the audit when set up correctly.",
      ],
      sources: [
        {
          label: "Gemini for Workspace security & privacy",
          url: "https://workspace.google.com/security/ai-privacy/",
        },
      ],
    },

    // ─── Claude ───────────────────────────────────────────────────────────
    "claude:consumer": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl:
        "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings",
      policyLabel: "Claude consumer privacy settings",
      summary:
        "Since September 2025, Anthropic uses Free/Pro conversations to train Claude unless you opt out. Safety-flagged chats may still be processed.",
      explainer: [
        "Anthropic changed their stance in 2025: by default, consumer Free and Pro Claude accounts now permit Anthropic to use your prompts, documents, and code to train future models. You have to actively go into Menu → Settings → Privacy and turn off \"Help improve Claude\" to opt out — and even then, conversations that get flagged by their safety systems can still be processed for safety training.",
        "The other lever is feedback buttons (thumbs up / thumbs down). Submitting feedback uploads that conversation to Anthropic regardless of your training setting, so the conservative rule is: don't click feedback buttons on consumer Claude. For team work, use Claude for Work instead.",
      ],
      sources: [
        {
          label: "Is my data used for model training? (Claude)",
          url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training",
        },
      ],
    },
    "claude:team": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl:
        "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training",
      policyLabel: "Claude Team / Enterprise data policy",
      summary:
        "Workspace data, inputs, and files are excluded from model training by default. Workspaces are isolated from each other.",
      explainer: [
        "Claude for Work (Team, Pro, and Enterprise) sits on Anthropic's Commercial Terms, which contractually exclude your workspace conversations and uploaded files from model training. Each workspace is isolated — Anthropic staff don't read your conversations and your data isn't accessible to other customers.",
        "The one operational hygiene step worth taking: in Admin Settings → Data and Privacy, disable the \"Rate chats\" feedback buttons across the workspace. That prevents staff from accidentally uploading a conversation through a thumbs-up click.",
      ],
      sources: [
        {
          label: "Anthropic Commercial Terms",
          url: "https://www.anthropic.com/legal/commercial-terms",
        },
      ],
    },

    // ─── Perplexity ───────────────────────────────────────────────────────
    "perplexity:consumer": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://www.perplexity.ai/hub/legal/privacy-policy",
      policyLabel: "Perplexity Privacy Policy",
      summary:
        "Free and Pro Perplexity logs your prompts and uploads by default, shares aggregated analytics with advertising partners, and reserves the right to transfer your data in a corporate acquisition.",
      explainer: [
        "Perplexity's consumer tiers (Free and Pro) treat your search queries, uploaded files, and Gmail/Calendar integrations as training material by default. They also share aggregated analytics with advertising partners. The least-known clause is their \"Business Transactions\" provision: if Perplexity gets acquired, your search history and any uploaded documents can be transferred to the acquirer without further consent.",
        "Turn data retention off in Account Settings → Preferences → AI Data Retention, and disconnect any synced Google or calendar accounts. For real business use, move to Perplexity Enterprise or the Sonar API, which both use a zero-retention framework.",
      ],
      sources: [
        {
          label: "Perplexity AI Data Privacy Policy (analysis by Cape)",
          url: "https://www.cape.co/blog/perplexity-ai-data-privacy-policy",
        },
      ],
    },
    "perplexity:enterprise": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://www.perplexity.ai/hub/legal/privacy-policy",
      policyLabel: "Perplexity Privacy Policy",
      summary:
        "Enterprise workspace data and Sonar API queries are excluded from training. Uploads are purged within 7 days.",
      explainer: [
        "Perplexity Enterprise and the Sonar API are governed by their commercial terms: workspace inputs and API queries are excluded from training, and uploads are purged after 7 days (compared to 30 days on consumer). Sonar API operates under a zero-retention framework where Perplexity only logs billing and token metrics.",
        "Admins can set retention thresholds, restrict third-party syncs, and limit debug logging. This is a solid configuration when paired with the standard admin lock-downs.",
      ],
      sources: [
        {
          label: "Perplexity Enterprise security",
          url: "https://www.perplexity.ai/enterprise",
        },
      ],
    },

    // ─── Grammarly ────────────────────────────────────────────────────────
    "grammarly:consumer": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://www.grammarly.com/privacy-policy",
      policyLabel: "Grammarly Privacy Policy",
      summary:
        "Personal Grammarly accounts analyse the text you write across the web to train Grammarly's ML models unless you opt out.",
      explainer: [
        "On a personal Grammarly account, the text you write through their browser extension or desktop app is captured and used to train Grammarly's machine-learning models by default. They make a best-effort to exclude sensitive fields like passwords and credit-card numbers, but everything else is fair game — including business documents you draft in browser-based editors.",
        "Turn it off in Account Settings → Security & Privacy → \"Product Improvement and Training\". Also turn off tailored assistance to delete the personalisation data they've already built up. For any team use, Business or Enterprise is the right fit — training is off by default there.",
      ],
      sources: [
        {
          label: "Product Improvement and Training Control (Grammarly)",
          url: "https://support.grammarly.com/hc/en-us/articles/25555503115277-Product-Improvement-and-Training-Control",
        },
      ],
    },
    "grammarly:business": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://www.grammarly.com/business/security",
      policyLabel: "Grammarly Business Security",
      summary:
        "Product improvement and training are off by default. Customer data is never used to train foundational models.",
      explainer: [
        "Grammarly Business and Enterprise have training disabled by default and treat customer text as confidential. They enforce AES-256 at rest, TLS 1.2 in transit, and admins can use their own KMS keys in AWS.",
        "Admin hygiene: verify the training toggle is off, mandate SAML SSO, and require FIDO2 (hardware-key) authentication on devices used to access sensitive documents.",
      ],
      sources: [
        {
          label: "Grammarly Business security",
          url: "https://www.grammarly.com/business/security",
        },
      ],
    },

    // ─── Notion AI ────────────────────────────────────────────────────────
    "notion:plus": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://www.notion.com/help/notion-ai-security-practices",
      policyLabel: "Notion AI Security Practices",
      summary:
        "Notion's contracts with their AI subprocessors prohibit training on customer data — workspace embeddings stay isolated.",
      explainer: [
        "Notion AI runs through subprocessors (currently OpenAI and Anthropic) but Notion's commercial agreements with them explicitly prohibit using customer data to train models. The vector embeddings Notion AI uses to make your workspace searchable are isolated per workspace — they can't leak across organisations.",
        "The one knob worth touching: Workspace Settings → Notion AI → either disable \"Enable web search for workspace\" or require confirmation before Notion makes a web request. That stops it from leaking your local document schema into a public search query.",
      ],
      sources: [
        {
          label: "Notion AI security & privacy",
          url: "https://www.notion.com/help/notion-ai-security-practices",
        },
      ],
    },
    "notion:business": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://www.notion.com/help/notion-ai-security-practices",
      policyLabel: "Notion AI Security Practices",
      summary:
        "Same training exclusions as the Plus tier, plus admin-level controls over sub-processors and workspace access.",
      explainer: [
        "Business and Enterprise tiers inherit the same no-training contractual protections as Plus, but add admin-level visibility and control: detailed audit logs, SCIM provisioning, SAML SSO, and granular control over which sub-processors are enabled.",
        "The Enterprise plan also adds a custom DPA and the ability to request specific sub-processor configurations if you have regulatory constraints (e.g. data residency).",
      ],
      sources: [
        {
          label: "Notion AI security & privacy",
          url: "https://www.notion.com/help/notion-ai-security-practices",
        },
      ],
    },

    // ─── HubSpot AI ───────────────────────────────────────────────────────
    "hubspot:standard": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data",
      policyLabel: "HubSpot Machine Learning Data Policy",
      summary:
        "HubSpot's Breeze AI uses your CRM data and files to train its machine-learning models by default — but tenants are isolated and you can opt out globally.",
      explainer: [
        "On a standard HubSpot account, the AI features (Breeze / ML) pull on your CRM data and files to train HubSpot's machine-learning models. Importantly, training is done within tenant boundaries — your data never reaches another customer's models. But it does improve HubSpot's product across the customer base.",
        "Turn it off globally in Settings → AI → Access tab → toggle off \"AI Model Training\". If your account contains regulated information (health, financial), also enable the \"Sensitive Data\" setting — accounts with that on are opted out of training automatically.",
      ],
      sources: [
        {
          label: "HubSpot machine learning data (Knowledge Base)",
          url: "https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data",
        },
      ],
    },
    "hubspot:sensitive": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data",
      policyLabel: "HubSpot Machine Learning Data Policy",
      summary:
        "With \"Sensitive Data\" enabled and the global training opt-out off, HubSpot AI doesn't train on your CRM data.",
      explainer: [
        "When you enable the \"Sensitive Data\" account setting (designed for HIPAA-style use cases) and confirm the global AI training opt-out is off, HubSpot stops using your CRM data to train Breeze or any of its ML models. Tenant isolation guarantees no cross-customer leakage, and your account is treated as a regulated tenant.",
        "Worth pairing this with strict role-based access on the AI features — not every staff member needs to be able to trigger AI generations across the whole CRM.",
      ],
      sources: [
        {
          label: "HubSpot machine learning data (Knowledge Base)",
          url: "https://knowledge.hubspot.com/account-management/hubspot-machine-learning-data",
        },
      ],
    },

    // ─── NotebookLM ───────────────────────────────────────────────────────
    "notebooklm:consumer": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://support.google.com/notebooklm/answer/17004255",
      policyLabel: "NotebookLM data & privacy",
      summary:
        "Notebook sources and chat logs are private by default. Submitting thumbs-up/down feedback triggers human review and 3-year retention.",
      explainer: [
        "On a personal Google account, NotebookLM is unusually private for a consumer Google product: your uploaded sources and chat logs stay in your account, and Google does not train its foundation models on them — unless you submit thumbs-up or thumbs-down feedback. That feedback triggers a human review pathway and retains the surrounding chat context for up to three years.",
        "Practical rule: never click feedback buttons on a personal NotebookLM if the conversation touched anything sensitive, and don't put highly confidential corporate documents into an unmanaged personal notebook in the first place.",
      ],
      sources: [
        {
          label: "NotebookLM data privacy (Google Support)",
          url: "https://support.google.com/notebooklm/answer/17004255",
        },
      ],
    },
    "notebooklm:workspace": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl:
        "https://knowledge.workspace.google.com/admin/users/access/turn-notebooklm-on-or-off-for-users",
      policyLabel: "NotebookLM for Workspace admin guide",
      summary:
        "Governed by Google Cloud/Workspace core agreements — no human review of uploads, no training on domain data.",
      explainer: [
        "NotebookLM on a Workspace account inherits the full Workspace enterprise contract: SOC 1/2/3, ISO 27001, BSI C5 certifications, no human review of your uploads, no training of Google's models on your domain's data. Admins can enable it globally or restrict to specific organisational units.",
        "Worth pairing with Drive sharing restrictions — NotebookLM can only access documents users have permission to read, so tightening Drive sharing limits the blast radius of any single user adding sources.",
      ],
      sources: [
        {
          label: "Turn NotebookLM on/off (Workspace Admin)",
          url: "https://knowledge.workspace.google.com/admin/users/access/turn-notebooklm-on-or-off-for-users",
        },
      ],
    },

    // ─── Canva AI ─────────────────────────────────────────────────────────
    "canva:free-pro": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://www.canva.com/policies/privacy-policy/",
      policyLabel: "Canva Privacy Policy",
      summary:
        "Canva uses design text, prompts, and uploaded media to train its AI models by default. Manual opt-out required, and syncing accounts with Affinity can re-enable it.",
      explainer: [
        "On Canva Free or Pro, the text you type, the prompts you give to Magic Studio, and the media you upload are all used to train Canva's AI models by default. You have to manually opt out in Account Settings → Privacy Controls → \"Use my content for AI/model training\".",
        "Watch out for one trap: syncing your Canva account with Affinity (their professional design suite) or other Canva-linked apps can reset that opt-out to default. Periodically check the toggle and disconnect any linkages you don't need.",
      ],
      sources: [
        {
          label: "Canva Trust Center",
          url: "https://www.canva.com/trust/privacy/",
        },
      ],
    },
    "canva:teams": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://www.canva.com/policies/privacy-policy/",
      policyLabel: "Canva Privacy Policy",
      summary:
        "Canva Teams / Enterprise is governed by Canva Shield — customer content is excluded from foundation model training.",
      explainer: [
        "Canva Teams, Business, and Enterprise plans are covered by Canva Shield, their enterprise data-protection programme. Customer content (designs, uploads, prompts) is excluded from foundation model training, admins can control shared folder visibility, and external sharing can be restricted.",
        "One admin hygiene step: in Admin Settings → Security → Data and Privacy, turn off \"Allow team members to temporarily share affected designs with Canva Support\". That stops staff inadvertently routing a sensitive design through a support ticket.",
      ],
      sources: [
        {
          label: "Canva Trust Center",
          url: "https://www.canva.com/trust/privacy/",
        },
      ],
    },

    // ─── Adobe Firefly ────────────────────────────────────────────────────
    "adobe:individual": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html",
      policyLabel: "Adobe Generative AI User Guidelines",
      summary:
        "Personal Creative Cloud uses the \"Content analysis\" setting to scan your creative work for model training unless you opt out.",
      explainer: [
        "Individual / personal Creative Cloud accounts have a \"Content analysis\" setting that, when on, allows Adobe to scan your creative files and edits to improve their AI models. Turning it off prevents that scanning entirely.",
        "Go to Adobe Account → Privacy Settings → locate \"Content analysis\" → toggle off. Note: Firefly's foundation models themselves are trained on Adobe Stock and licensed/public-domain content, not your work — the content analysis setting only governs what Adobe learns from your behaviour and edits.",
      ],
      sources: [
        {
          label: "Adobe Content Analysis FAQ",
          url: "https://helpx.adobe.com/manage-account/using/machine-learning-faq.html",
        },
      ],
    },
    "adobe:business": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl:
        "https://business.adobe.com/products/firefly-business/custom-models/ai-model-training.html",
      policyLabel: "Firefly for Business model training policy",
      summary:
        "Firefly's foundation models are trained exclusively on licensed and public-domain content. Enterprise content is excluded from training and Adobe offers IP indemnification.",
      explainer: [
        "Firefly for Business is one of the cleanest enterprise creative-AI options because of how the model itself was trained: only Adobe Stock content, openly licensed content, and public-domain images. That means generated images are far less likely to reproduce copyrighted material, and Adobe offers IP indemnification for enterprise customers.",
        "Your enterprise content (the designs you make, custom style models you train) is excluded from foundation training. Admins should restrict custom-model permissions and ensure creators select enterprise-approved partner models from the dropdown rather than community ones.",
      ],
      sources: [
        {
          label: "Firefly for Business model training",
          url: "https://business.adobe.com/products/firefly-business/custom-models/ai-model-training.html",
        },
      ],
    },

    // ─── Midjourney ───────────────────────────────────────────────────────
    "midjourney:basic": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy",
      policyLabel: "Midjourney Privacy Policy",
      summary:
        "Every prompt and every generated image on Basic and Standard plans is PUBLIC on midjourney.com — even from private Discord DMs and private servers. No training opt-out.",
      explainer: [
        "This is the single most surprising finding for many of the businesses I audit: on Midjourney Basic and Standard plans, every prompt you type and every image you generate is published to your public gallery on midjourney.com — even if you generated it in a private Discord direct message or a private Discord server. The basic and standard tiers do not offer a way to opt out of either public visibility or model training.",
        "There is no safe configuration for proprietary work on these tiers. If you're generating anything trademarked, brand-sensitive, or client-confidential, you must be on Pro or Mega with Stealth Mode enabled — and even that doesn't stop the prompts from being used for training.",
      ],
      sources: [
        {
          label: "Midjourney Privacy Policy",
          url: "https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy",
        },
      ],
    },
    "midjourney:pro": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode",
      policyLabel: "Midjourney Stealth Mode docs",
      summary:
        "Stealth Mode hides your creations from public midjourney.com feeds, but does not stop training on your prompts and does not protect Discord-server visibility.",
      explainer: [
        "Pro and Mega plans unlock Stealth Mode (type /settings in Discord and toggle it on — the public button should turn grey). Stealth removes your generations from the public midjourney.com gallery, which is a real upgrade over Basic/Standard.",
        "But two limits remain. First, Stealth does not stop Midjourney from using your prompts and inputs to train models — the training opt-out simply doesn't exist on this platform. Second, Stealth only hides web visibility — if you generate inside a shared Discord channel, other channel members can still see your work. For corporate visual assets, generate only in private servers or via the personal Create web page.",
      ],
      sources: [
        {
          label: "Midjourney Stealth Mode",
          url: "https://docs.midjourney.com/hc/en-us/articles/32019750070669-Stealth-Mode",
        },
      ],
    },

    // ─── Otter.ai ─────────────────────────────────────────────────────────
    "otter:basic-pro": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "medium",
      policyUrl: "https://otter.ai/privacy-policy",
      policyLabel: "Otter.ai Privacy Policy",
      summary:
        "Otter Basic and Pro train their ML models on your de-identified audio and transcripts by default, and have historically faced lawsuits over unconsented recording.",
      explainer: [
        "Otter.ai automatically trains its proprietary models on de-identified customer audio and transcripts on the Basic and Pro tiers. The model-training risk is one issue; the bigger operational risk is consent: Otter has been linked to data breach incidents and litigation around recording meeting participants without consent under US wiretapping laws (California's CIPA in particular).",
        "If you must use the consumer tier, disconnect Google/Outlook calendar linkages so the Otter bot doesn't auto-join meetings, and email support@otter.ai to request data deletion when projects close. For business use, move to Otter Business — or better, a privacy-first alternative like Granola or Fireflies.",
      ],
      sources: [
        {
          label: "Otter.ai Privacy Center",
          url: "https://otter.ai/privacy-policy",
        },
      ],
    },
    "otter:business": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "medium",
      policyUrl: "https://otter.ai/privacy-policy",
      policyLabel: "Otter.ai Privacy Policy",
      summary:
        "Otter Business excludes meeting data from third-party model training but still permits internal training on proprietary systems.",
      explainer: [
        "Otter Business contractually excludes meeting data from third-party model training, but Otter still permits itself to train its own internal models on your data. That's a meaningful improvement over consumer tiers, but it's not as strict as competitors like Fireflies or Fellow.",
        "The other concern at Business tier is calendar-access scope: high-volume calendar integration registers organiser details, attendee emails, and meeting-room URLs. Admins should enable mandatory participant-notification pop-ups and restrict the auto-join feature globally.",
      ],
      sources: [
        {
          label: "Otter.ai Privacy Policy",
          url: "https://otter.ai/privacy-policy",
        },
      ],
    },

    // ─── Fathom ───────────────────────────────────────────────────────────
    "fathom:free": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://fathom.video/privacy-policy",
      policyLabel: "Fathom Privacy Policy",
      summary:
        "Fathom Free uses de-identified meeting assets to improve internal model performance by default. Third-party training is excluded.",
      explainer: [
        "Fathom's free tier uses de-identified meeting transcripts and summaries to improve their own internal models by default. They explicitly do not share that data with third-party model trainers, which is better than Otter's consumer posture — but it's still training-by-default.",
        "Go to Account Settings, find the training controls, and toggle them off to stop Fathom from using your meetings for internal model improvement. Note: calendar linkage on Free still reads organiser and attendee details, so be deliberate about which calendars you connect.",
      ],
      sources: [
        {
          label: "Fathom Privacy Hub",
          url: "https://fathom.video/privacy-policy",
        },
      ],
    },
    "fathom:team": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "high",
      policyUrl: "https://fathom.video/security",
      policyLabel: "Fathom Security & Privacy",
      summary:
        "Fathom Team Edition excludes meeting notes, transcripts, and summaries from all training programs. SOC 2 Type II certified.",
      explainer: [
        "Fathom Team Edition has training off across the board — meeting notes, transcripts, and summaries are excluded from every training programme they run. They're SOC 2 Type II certified and integrate cleanly with Salesforce and HubSpot for sales pipelines.",
        "Admin step: enable the global model-training opt-out at the Admin Panel level to make sure the protection is locked across all org members, not relying on individual settings.",
      ],
      sources: [
        {
          label: "Fathom security & compliance",
          url: "https://fathom.video/security",
        },
      ],
    },

    // ─── Granola ──────────────────────────────────────────────────────────
    "granola:any": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://docs.granola.ai/help-center/consent-security-privacy/model-training",
      policyLabel: "Granola Model Training & Privacy",
      summary:
        "Granola transcribes on-device and immediately deletes raw audio. Enterprise contracts prohibit OpenAI/Anthropic sub-processors from training on the data.",
      explainer: [
        "Granola is architecturally different from most meeting tools: it transcribes audio on-device in real time and deletes the raw audio file immediately after processing. There's no central audio database to compromise. It's SOC 2 Type II certified and runs locally without joining calls as a visible bot.",
        "The personal tier still uses de-identified summaries for model improvement unless you turn it off in Settings → Profile → \"Model Training\". The enterprise tier goes further: contractual prohibition on OpenAI/Anthropic sub-processors training on data, and global training opt-out locked at the admin level. One operational note: because Granola doesn't join as a visible bot, the host must still inform attendees that AI transcription is active to comply with multi-party consent laws.",
      ],
      sources: [
        {
          label: "Granola Privacy Policy",
          url: "https://granola.ai/privacy-policy",
        },
        {
          label: "Participant privacy & consent (Granola blog)",
          url: "https://www.granola.ai/blog/ai-notetaker-participant-privacy-consent",
        },
      ],
    },

    // ─── Fireflies.ai ─────────────────────────────────────────────────────
    "fireflies:any": {
      status: "verified",
      lastReviewed: "2026-05-26",
      confidence: "very-high",
      policyUrl: "https://fireflies.ai/privacy-policy",
      policyLabel: "Fireflies Privacy Policy",
      summary:
        "Fireflies transcribes meetings and contractually restricts downstream API providers from caching or training on the data. SOC 2 Type II, AES-256, TLS 1.3.",
      explainer: [
        "Fireflies takes a strong privacy posture across all tiers: AES-256 at rest, TLS 1.3 in transit on AWS, SOC 2 Type II certified, and downstream API providers (the LLMs they use under the hood) are contractually prohibited from caching or training on meeting data.",
        "Worth doing on any account: in Account Settings, force zero-data-retention with third-party vendors, and set calendar linkage boundaries so the Fireflies bot doesn't auto-join external client sessions you'd rather it stay out of.",
      ],
      sources: [
        {
          label: "Fireflies Trust & Security",
          url: "https://trust.fireflies.ai/faq",
        },
      ],
    },

    // ─── Zoom AI Companion ────────────────────────────────────────────────
    "zoom-ai:consumer": {
      status: "needs-review",
      lastReviewed: "2026-05-26",
      confidence: "medium",
      policyUrl: "https://www.zoom.com/en/trust/privacy/",
      policyLabel: "Zoom Privacy Statement",
      summary:
        "Consumer Zoom AI Companion features should not be used for confidential meetings. Zoom has updated policies several times — verify current settings before recommending.",
      explainer: [
        "Zoom changed their AI training policies multiple times in 2023-2024, with significant public backlash each time. As of the last clear public statement, Zoom does not use customer audio, video, chat, screen sharing, attachments or other communications to train Zoom or third-party AI models. However, the AI Companion features themselves may still use account metadata and usage signals for product improvement.",
        "I have marked this entry \"needs review\" because Zoom's policy has been a moving target. Before recommending the consumer tier, re-check the current AI Companion data settings at the Zoom account level and confirm \"data improvement\" or similar options are off.",
      ],
      sources: [
        {
          label: "Zoom Trust Center",
          url: "https://www.zoom.com/en/trust/",
        },
        {
          label: "Zoom AI Companion overview (Tufts review)",
          url: "https://it.tufts.edu/guides/zoom-audio-and-virtual-conferencing/zoom-ai-companion",
        },
      ],
    },
    "zoom-ai:business": {
      status: "needs-review",
      lastReviewed: "2026-05-26",
      confidence: "medium",
      policyUrl: "https://www.zoom.com/en/trust/privacy/",
      policyLabel: "Zoom Privacy Statement",
      summary:
        "Zoom Business/Enterprise accounts are excluded from AI training by default — but verify the admin AI Companion settings are correctly configured.",
      explainer: [
        "Zoom Business and Enterprise accounts are governed by their commercial DPA, which excludes customer communications from AI training. Admins control which AI Companion features are enabled organisation-wide, who can use them, and what data is retained.",
        "I have marked this entry \"needs review\" because the right answer depends heavily on which AI Companion features your admin has turned on, and Zoom's policy wording has shifted recently. Confirm at the Account Admin → AI Companion settings, and review the current Zoom DPA before final sign-off.",
      ],
      sources: [
        {
          label: "Zoom Trust Center",
          url: "https://www.zoom.com/en/trust/",
        },
      ],
    },
  };

  function lookup(toolId, tierId) {
    if (!toolId || !tierId) return null;
    return DATA[toolId + ":" + tierId] || null;
  }

  if (typeof window !== "undefined") {
    window.AUDIT_POLICIES = DATA;
    window.getPolicyForTier = lookup;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { AUDIT_POLICIES: DATA, getPolicyForTier: lookup };
  }
})();
