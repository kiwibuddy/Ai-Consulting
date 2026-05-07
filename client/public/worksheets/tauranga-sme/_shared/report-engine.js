/**
 * Deterministic classification + summary builder.
 * Depends on window.NB_REPORT_DATA — exposes window.NB_REPORT_ENGINE
 */
(function () {
  var D = function () {
    return window.NB_REPORT_DATA;
  };

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return fallback;
    }
  }

  function getRadio(doc, name) {
    var el = doc.querySelector('input[type="radio"][name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  function num(val, def) {
    var n = parseFloat(val);
    return isNaN(n) ? def : n;
  }

  function truncate(s, max) {
    if (!s || typeof s !== "string") return "";
    s = s.trim();
    if (s.length <= max) return s;
    return s.slice(0, max - 1) + "…";
  }

  function scoreAction(a, tags, weights) {
    var w = weights || {};
    var t = a.tags || [];
    var bonus = 0;
    for (var i = 0; i < t.length; i++) {
      if (w[t[i]]) bonus += w[t[i]];
    }
    return a.impact * 2 - a.effort + a.riskReduction * 0.8 + bonus;
  }

  function pickTools(tagsNeeded, max) {
    var tools = D().TOOLS;
    var scored = tools.map(function (t) {
      var sc = 0;
      for (var i = 0; i < tagsNeeded.length; i++) {
        if (t.tags.indexOf(tagsNeeded[i]) >= 0) sc += 2;
      }
      return { t: t, sc: sc };
    });
    scored.sort(function (a, b) {
      return b.sc - a.sc;
    });
    var out = [];
    for (var j = 0; j < scored.length && out.length < max; j++) {
      if (scored[j].sc > 0) out.push(scored[j].t);
    }
    if (out.length === 0) return tools.slice(0, max);
    return out;
  }

  function pickActions(actionIds, weights, limit) {
    var pool = D().ACTIONS;
    var ids = Object.keys(pool);
    var ranked = ids.map(function (id) {
      return { id: id, a: pool[id], sc: scoreAction(pool[id], [], weights) };
    });
    ranked.sort(function (x, y) {
      return y.sc - x.sc;
    });
    var chosen = [];
    var want = actionIds || [];
    for (var w = 0; w < want.length; w++) {
      if (pool[want[w]] && chosen.indexOf(want[w]) < 0) chosen.push(want[w]);
    }
    for (var r = 0; r < ranked.length && chosen.length < limit; r++) {
      if (chosen.indexOf(ranked[r].id) < 0) chosen.push(ranked[r].id);
    }
    return chosen.slice(0, limit).map(function (id) {
      var a = pool[id];
      return {
        id: id,
        title: a.title,
        why: a.why,
        impact: a.impact,
        effort: a.effort,
        effortLabel: a.effort <= 2 ? "Low effort" : a.effort >= 4 ? "Higher effort" : "Medium effort",
      };
    });
  }

  function collectSignalsWs1(doc) {
    var scoreEl = doc.getElementById("scoreInput");
    var score = scoreEl ? num(scoreEl.value, null) : null;
    return {
      gut: getRadio(doc, "gut"),
      usage: getRadio(doc, "usage"),
      repetitive: getRadio(doc, "repetitive"),
      barrier: getRadio(doc, "barrier"),
      privacy: getRadio(doc, "privacy"),
      next: getRadio(doc, "next"),
      readinessScore: score,
    };
  }

  function collectSignalsWs2(doc) {
    var inputs = doc.querySelectorAll(".tb-input");
    var totalRec = 0;
    var breakdown = [];
    inputs.forEach(function (inp, idx) {
      var hrs = num(inp.value, 0);
      var rate = num(inp.getAttribute("data-rate"), 0.5);
      var saved = Math.round(hrs * rate * 10) / 10;
      totalRec += saved;
      breakdown.push({ idx: idx, hours: hrs, recoverable: saved });
    });
    var fields = doc.querySelectorAll(".action-plan .ap-field");
    var plan = [];
    fields.forEach(function (f) {
      plan.push(truncate(f.value, 280));
    });
    return { weeklyRecoverableHours: Math.round(totalRec * 10) / 10, timeBreakdown: breakdown, actionPlanLines: plan };
  }

  function collectSignalsWs3(doc) {
    var review = getRadio(doc, "review");
    var preps = [];
    doc.querySelectorAll(".prep-field").forEach(function (el) {
      preps.push(truncate(el.value, 240));
    });
    return { reviewPolicy: review, prepNotes: preps };
  }

  function collectSignalsWs4(doc) {
    var meta = D().WORKBOOKS.ws4;
    var raw = "{}";
    try {
      raw = localStorage.getItem(meta.checklistKey) || "{}";
    } catch (e) {}
    var cl = safeParse(raw, {});
    var checked = 0;
    for (var k in cl) {
      if (cl[k]) checked++;
    }
    return { checklistDone: checked, checklistTotal: 8, checklistState: cl };
  }

  function classifyWs1(s) {
    var score = s.readinessScore;
    if (score == null || isNaN(score)) score = 3;
    score = Math.max(0, Math.min(8, score));
    var stage = score <= 2 ? "awareness" : score <= 5 ? "experimenting" : "integrating";
    var blockers = [];
    if (s.barrier === "knowledge") blockers.push("knowledge");
    if (s.barrier === "time") blockers.push("time");
    if (s.barrier === "trust") blockers.push("trust");
    if (s.barrier === "relevant") blockers.push("relevance");
    var strengths = [];
    if (parseInt(s.privacy, 10) >= 2) strengths.push("privacy_aware");
    if (parseInt(s.usage, 10) >= 2 || parseInt(s.repetitive, 10) >= 2) strengths.push("hands_on");
    return { stage: stage, readinessScore: score, blockers: blockers, strengths: strengths };
  }

  function classifyWs2(s) {
    var h = s.weeklyRecoverableHours || 0;
    var tier = h < 1 ? "quick" : h <= 3 ? "meaningful" : "transformative";
    return { recoveryTier: tier, hours: h };
  }

  function classifyWs3(s) {
    var rp = s.reviewPolicy || "";
    var maturity = rp === "always" ? "strong" : rp === "context" ? "mixed" : rp === "our" ? "open" : "unknown";
    var filled = (s.prepNotes || []).filter(Boolean).length;
    return { reviewMaturity: maturity, prepDepth: filled };
  }

  function classifyWs4(s) {
    var done = s.checklistDone || 0;
    var pct = Math.round((done / (s.checklistTotal || 8)) * 100);
    var gov = pct >= 75 ? "strong" : pct >= 40 ? "building" : "starter";
    return { checklistPct: pct, governance: gov };
  }

  function buildSummaryWs1(signals, classification) {
    var C = D().COPY.ws1;
    var stage = classification.stage;
    var score = classification.readinessScore;
    var headline =
      stage === "awareness"
        ? "Your readiness profile: strong foundations, early stage"
        : stage === "experimenting"
          ? "Your readiness profile: experimenting — now stabilise one workflow"
          : "Your readiness profile: integrating — optimise safely";

    var subhead =
      "Readiness score " +
      score +
      "/8 · Based on your responses across tools, time, barriers, and privacy awareness.";

    var findings = [];
    findings.push(
      stage === "awareness"
        ? "You're weighted toward awareness-stage behaviours — the MBIE AI Advisory Pilot via Priority One is built for exactly this moment."
        : stage === "experimenting"
          ? "You've moved past experimentation theatre — the win is one recurring task done with AI every week, not more tools."
          : "You're operating ahead of typical SME maturity — privacy, team, and workflow design now matter more than novelty.",
    );
    if (signals.gut === "behind") findings.push('Your gut reaction included feeling "behind" — locally, most SMEs are still at single-digit adoption; timing still favours early movers.');
    if (signals.barrier === "trust") findings.push("Trust in outputs is your stated friction — pair AI with mandatory human review on customer-facing work.");
    if (signals.barrier === "time") findings.push("Time scarcity is the blocker — choose the smallest automation that removes a weekly headache, not a learning project.");
    if (parseInt(signals.privacy, 10) === 0) findings.push("Privacy awareness scored low — before scaling usage, adopt placeholder data in prompts and read OPC AI guidance once.");

    var weight = {
      awareness: stage === "awareness" ? 4 : 2,
      experimenting: stage === "experimenting" ? 4 : 2,
      local: 2,
      privacy: parseInt(signals.privacy, 10) <= 1 ? 4 : 1,
      time: parseInt(signals.repetitive, 10) >= 2 ? 3 : 1,
      team: 1,
      legal: 1,
      governance: 1,
    };
    var actionPick = ["one_task_two_weeks", "pilot_call", "stop_pasting_pii", "tool_register", "chamber"];
    if (stage === "awareness") actionPick = ["pilot_call", "one_task_two_weeks", "chamber", "privacy_policy_ai"];
    if (stage === "integrating") actionPick = ["tool_register", "stop_pasting_pii", "team_conversation", "pia_customer"];

    var risks = [];
    if (parseInt(signals.privacy, 10) <= 1)
      risks.push({ label: "Privacy hygiene", detail: "Customer data in free-tier tools is the fastest path to a serious incident." });
    if (signals.barrier === "trust") risks.push({ label: "Over-trust or under-trust", detail: "Calibrate: draft with AI, decide with humans on anything that affects customers or cash." });

    var tools = pickTools(["general", "local", "privacy"], 4);

    var plan = [
      {
        phase: "Week 1 — Anchor",
        items: [
          "Pick one recurring task (from your worksheet) and schedule three AI-assisted reps this week.",
          "Read the OPC AI guidance PDF once — 20 minutes, high leverage.",
        ],
      },
      {
        phase: "Weeks 2–3 — Build",
        items: [
          "Contact Priority One about regional AI advisory options.",
          "Write down what “good enough” AI output looks like for your top task.",
        ],
      },
      {
        phase: "Week 4 — Review",
        items: ["Stop or scale: either promote the task to standard workflow or swap to a better candidate."],
      },
    ];

    return {
      kind: "worksheet",
      worksheetId: "ws1",
      worksheetTitle: D().WORKBOOKS.ws1.title,
      generatedAt: new Date().toISOString(),
      headline: headline,
      subhead: subhead,
      stageLabel: stage.charAt(0).toUpperCase() + stage.slice(1),
      stageKey: stage,
      stageBadge: "stage-" + stage,
      confidence: Math.min(95, 55 + (signals.next ? 15 : 0) + (score >= 0 ? 8 : 0)),
      keyFindings: findings.slice(0, 5),
      topOpportunities: pickActions(actionPick, weight, 4),
      riskFlags: risks,
      next30DayPlan: plan,
      recommendedTools: tools.map(function (t) {
        return { name: t.name, note: t.note };
      }),
      coachNote: C[stage] + "\n\n" + D().COPY.coachSignOff,
      narrativeTail: C[stage],
    };
  }

  function buildSummaryWs2(signals, classification) {
    var C = D().COPY.ws2;
    var tier = classification.recoveryTier;
    var h = classification.hours;
    var headline = h < 0.5 ? "Your time map: start with one focused lever" : "Your time map: ~" + h + " hrs/week recoverable (estimate)";

    var findings = [];
    findings.push(C[tier]);
    findings.push("Estimates use conservative recovery rates — real savings depend on consistency, not the first prompt.");
    var filled = (signals.actionPlanLines || []).filter(Boolean).length;
    if (filled >= 2) findings.push("You captured specifics in your action plan — that specificity is what separates intent from habit.");
    else findings.push("Add one concrete line to your action plan (task + tool + first time) — vague plans rarely survive the week.");

    var weight = { time: 5, experimenting: 3, privacy: 3, governance: 2 };
    var actionPick = ["time_top_task", "one_task_two_weeks", "stop_pasting_pii", "tool_register"];
    if (h >= 3) actionPick = ["time_top_task", "tool_register", "pia_customer", "team_conversation"];

    var risks = [];
    if (h >= 2) risks.push({ label: "Speed vs. safety", detail: "Higher recoverable time usually means more customer content — use business-tier tools or placeholders." });

    var tools = pickTools(["writing", "meetings", "research", "privacy"], 4);

    var plan = [
      { phase: "Week 1", items: ["Run your chosen task with AI three times; log actual minutes saved.", "Don't switch tools mid-week."] },
      { phase: "Weeks 2–3", items: ["Tighten prompts — save a winner prompt as a template.", "If touching customer data, confirm tool terms or upgrade tier."] },
      { phase: "Week 4", items: ["Decide: promote workflow or pick next task from your grid."] },
    ];

    return {
      kind: "worksheet",
      worksheetId: "ws2",
      worksheetTitle: D().WORKBOOKS.ws2.title,
      generatedAt: new Date().toISOString(),
      headline: headline,
      subhead: "Recovery-tier signal: " + tier.replace(/^\w/, function (c) {
        return c.toUpperCase();
      }),
      stageLabel: tier.charAt(0).toUpperCase() + tier.slice(1),
      stageKey: tier,
      stageBadge: "stage-exp",
      confidence: Math.min(92, 60 + filled * 8),
      keyFindings: findings,
      topOpportunities: pickActions(actionPick, weight, 4),
      riskFlags: risks,
      next30DayPlan: plan,
      recommendedTools: tools.map(function (t) {
        return { name: t.name, note: t.note };
      }),
      coachNote: C[tier] + "\n\n" + D().COPY.coachSignOff,
      narrativeTail: C[tier],
    };
  }

  function buildSummaryWs3(signals, classification) {
    var C = D().COPY.ws3;
    var m = classification.reviewMaturity;
    var tail = m === "strong" ? C.strong_review : m === "mixed" ? C.loose_review : C.working_out;
    var filled = classification.prepDepth || 0;

    var headline = "Your team playbook: " + (m === "strong" ? "guardrails-first" : m === "mixed" ? "context-aware" : "needs a default");

    var findings = [];
    findings.push(tail);
    findings.push("Workforce AI tension is rarely about models — it's about clarity on review, attribution, and what ‘good’ looks like.");
    if (filled >= 2) findings.push("Your prep notes show you've started translating policy into real scenarios — keep that specificity.");

    var weight = { team: 5, governance: 3, experimenting: 2 };
    var actionPick = ["team_conversation", "review_policy", "tool_register", "stop_pasting_pii"];

    var risks = [];
    if (m === "open" || m === "unknown")
      risks.push({
        label: "Ambiguous review standards",
        detail: "Without defaults, people improvise — that's where customer-facing mistakes appear.",
      });

    var tools = pickTools(["general", "governance", "privacy"], 3);

    var plan = [
      { phase: "Week 1", items: ["Run the conversation opener you drafted — listen before you persuade.", "Capture three concerns verbatim — they become your policy agenda."] },
      { phase: "Weeks 2–3", items: ["Publish a one-page internal note: draft vs final, customer-facing vs internal.", "Identify one role with highest AI exposure; pair tools intentionally."] },
      { phase: "Week 4", items: ["Retro: what worked in the experiment? Adjust guardrails accordingly."] },
    ];

    return {
      kind: "worksheet",
      worksheetId: "ws3",
      worksheetTitle: D().WORKBOOKS.ws3.title,
      generatedAt: new Date().toISOString(),
      headline: headline,
      subhead: "Team maturity signal: " + m,
      stageLabel: "Team alignment",
      stageKey: m,
      stageBadge: "stage-team",
      confidence: Math.min(90, 58 + filled * 10),
      keyFindings: findings,
      topOpportunities: pickActions(actionPick, weight, 4),
      riskFlags: risks,
      next30DayPlan: plan,
      recommendedTools: tools.map(function (t) {
        return { name: t.name, note: t.note };
      }),
      coachNote: tail + "\n\n" + D().COPY.coachSignOff,
      narrativeTail: tail,
    };
  }

  function buildSummaryWs4(signals, classification) {
    var C = D().COPY.ws4;
    var gov = classification.governance;
    var pct = classification.checklistPct;
    var tail = pct >= 50 ? C.checklist_high : C.checklist_low;

    var headline = gov === "strong" ? "Your compliance posture: diligence-forward" : "Your compliance posture: build the checklist habit";

    var findings = [];
    findings.push(tail);
    findings.push(C.governance_gap);
    if (pct < 100) findings.push(pct + "% of pre-tool checklist items ticked — finishing them turns goodwill into documented diligence.");

    var weight = { privacy: 6, legal: 5, governance: 4 };
    var actionPick = ["privacy_policy_ai", "stop_pasting_pii", "tool_register", "pia_customer"];

    var risks = [];
    if (pct < 40) risks.push({ label: "Undocumented tool creep", detail: "Signing up tools without the checklist skips PP5 / training-data questions." });

    var tools = pickTools(["privacy", "compliance"], 4);

    var plan = [
      { phase: "Week 1", items: ["Complete remaining checklist items for any active AI tool.", "Replace real customer samples with placeholders in prompts."] },
      { phase: "Weeks 2–3", items: ["Drop one sentence on AI into your website privacy policy.", "Export a simple tool list: name, data touched, link to terms."] },
      { phase: "Week 4", items: ["If customer-facing AI is on the roadmap, sketch who signs off before go-live."] },
    ];

    return {
      kind: "worksheet",
      worksheetId: "ws4",
      worksheetTitle: D().WORKBOOKS.ws4.title,
      generatedAt: new Date().toISOString(),
      headline: headline,
      subhead: "Checklist progress: " + pct + "%",
      stageLabel: "Governance",
      stageKey: gov,
      stageBadge: "stage-legal",
      confidence: Math.min(93, 52 + Math.floor(pct / 3)),
      keyFindings: findings,
      topOpportunities: pickActions(actionPick, weight, 4),
      riskFlags: risks,
      next30DayPlan: plan,
      recommendedTools: tools.map(function (t) {
        return { name: t.name, note: t.note };
      }),
      coachNote: tail + "\n\n" + D().COPY.coachSignOff,
      narrativeTail: tail,
    };
  }

  function collectSignals(worksheetId, doc) {
    if (worksheetId === "ws1") return collectSignalsWs1(doc);
    if (worksheetId === "ws2") return collectSignalsWs2(doc);
    if (worksheetId === "ws3") return collectSignalsWs3(doc);
    if (worksheetId === "ws4") return collectSignalsWs4(doc);
    return {};
  }

  function classify(worksheetId, signals) {
    if (worksheetId === "ws1") return classifyWs1(signals);
    if (worksheetId === "ws2") return classifyWs2(signals);
    if (worksheetId === "ws3") return classifyWs3(signals);
    if (worksheetId === "ws4") return classifyWs4(signals);
    return {};
  }

  function buildSummary(worksheetId, signals, classification) {
    if (worksheetId === "ws1") return buildSummaryWs1(signals, classification);
    if (worksheetId === "ws2") return buildSummaryWs2(signals, classification);
    if (worksheetId === "ws3") return buildSummaryWs3(signals, classification);
    if (worksheetId === "ws4") return buildSummaryWs4(signals, classification);
    return null;
  }

  function buildFullReport(worksheetId, doc) {
    var sig = collectSignals(worksheetId, doc);
    var cls = classify(worksheetId, sig);
    var rep = buildSummary(worksheetId, sig, cls);
    if (rep) {
      rep.signals = sig;
      rep.classification = cls;
    }
    return rep;
  }

  /** Snapshots stored at 100% completion — minimal rows for master report */
  function saveSnapshot(worksheetId, report) {
    var key = D().SNAPSHOT_PREFIX + worksheetId;
    var wb = D().WORKBOOKS[worksheetId] || {};
    var payload = {
      worksheetId: worksheetId,
      worksheetTitle: report.worksheetTitle,
      shortTitle: wb.shortTitle || report.worksheetTitle,
      completedAt: report.generatedAt,
      headline: report.headline,
      stageKey: report.stageKey,
      stageLabel: report.stageLabel,
      keyFindings: (report.keyFindings || []).slice(0, 4),
      actionTitles: (report.topOpportunities || []).map(function (x) {
        return x.title;
      }),
      confidence: report.confidence,
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {}
  }

  function loadAllSnapshots() {
    var ids = ["ws1", "ws2", "ws3", "ws4"];
    var out = [];
    for (var i = 0; i < ids.length; i++) {
      try {
        var raw = localStorage.getItem(D().SNAPSHOT_PREFIX + ids[i]);
        if (raw) {
          var o = safeParse(raw, null);
          if (o && o.worksheetId) out.push(o);
        }
      } catch (e) {}
    }
    return out;
  }

  function buildMasterSummary(doc) {
    var snaps = loadAllSnapshots();
    var MC = D().COPY.master;
    if (snaps.length < 2) return null;

    var headline = "Your Bay of Plenty AI adoption snapshot";
    var subhead = "Combined view across " + snaps.length + " completed worksheets.";

    var hasLegal = snaps.some(function (s) {
      return s.worksheetId === "ws4";
    });
    var hasTime = snaps.some(function (s) {
      return s.worksheetId === "ws2";
    });
    var hasTeam = snaps.some(function (s) {
      return s.worksheetId === "ws3";
    });
    var hasReady = snaps.some(function (s) {
      return s.worksheetId === "ws1";
    });

    var findings = [];
    if (hasReady && hasLegal) findings.push(MC.portfolio_balanced);
    else if (hasTime && hasTeam && !hasLegal) findings.push(MC.portfolio_speed);
    else if (hasLegal && !hasTime) findings.push(MC.portfolio_caution);
    else findings.push(MC.portfolio_balanced);

    snaps.forEach(function (s) {
      var lab = s.shortTitle || s.worksheetTitle || s.worksheetId;
      findings.push("— " + lab + ": " + (s.headline || ""));
    });

    var weight = { privacy: 4, legal: 4, time: 3, team: 3, awareness: 2, local: 2, experimenting: 2, governance: 3 };
    var masterActions = pickActions(
      ["tool_register", "stop_pasting_pii", "one_task_two_weeks", "team_conversation", "privacy_policy_ai", "pilot_call", "pia_customer"],
      weight,
      5,
    );

    var tools = pickTools(["privacy", "general", "local", "governance"], 5);

    var plan = [
      {
        phase: "Week 1 — Align",
        items: ["Pick one customer-facing rule (draft vs final) and one internal rule — publish both.", "Ensure no free-tier tool holds unexplained customer exports."],
      },
      {
        phase: "Weeks 2–3 — Accelerate",
        items: ["Run your highest-yield time experiment if you completed the audit.", "Hold a 20-minute team retro if you completed the team worksheet."],
      },
      {
        phase: "Week 4 — Consolidate",
        items: ["Review tool register + privacy policy sentence — adjust as needed.", "Book a regional advisory conversation if you're still at awareness stage."],
      },
    ];

    return {
      kind: "master",
      worksheetId: "master",
      worksheetTitle: "Tauranga SME — Master report",
      generatedAt: new Date().toISOString(),
      headline: headline,
      subhead: subhead,
      stageLabel: "Portfolio",
      stageKey: "master",
      stageBadge: "stage-master",
      confidence: 88,
      keyFindings: findings.slice(0, 8),
      topOpportunities: masterActions,
      riskFlags: [],
      next30DayPlan: plan,
      recommendedTools: tools.map(function (t) {
        return { name: t.name, note: t.note };
      }),
      coachNote: MC.portfolio_balanced + "\n\n" + D().COPY.coachSignOff,
      narrativeTail: MC.portfolio_balanced,
      worksheetRecaps: snaps,
    };
  }

  window.NB_REPORT_ENGINE = {
    collectSignals: collectSignals,
    classify: classify,
    buildSummary: buildSummary,
    buildFullReport: buildFullReport,
    saveSnapshot: saveSnapshot,
    loadAllSnapshots: loadAllSnapshots,
    buildMasterSummary: buildMasterSummary,
    truncate: truncate,
  };
})();
