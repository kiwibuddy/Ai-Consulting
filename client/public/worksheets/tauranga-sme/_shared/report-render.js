/**
 * DOM mount + email + print. Depends on NB_REPORT_DATA + NB_REPORT_ENGINE.
 * window.NBReport.init({ worksheetId: 'ws1' })
 */
(function () {
  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function serializeReportForApi(report) {
    var z = JSON.parse(JSON.stringify(report));
    delete z.signals;
    delete z.classification;
    return z;
  }

  function mountReport(root, report) {
    if (!root || !report) return;

    var risksHtml = (report.riskFlags || [])
      .map(function (r) {
        return '<span class="ws-report-risk" title="' + escapeHtml(r.detail || "") + '">' + escapeHtml(r.label) + "</span>";
      })
      .join("");

    var findingsHtml =
      "<ul class=\"ws-report-list\">" +
      (report.keyFindings || [])
        .map(function (f) {
          return "<li>" + escapeHtml(f) + "</li>";
        })
        .join("") +
      "</ul>";

    var opps = report.topOpportunities || [];
    var cardsHtml = opps
      .map(function (o) {
        return (
          '<div class="ws-report-card"><h4>' +
          escapeHtml(o.title) +
          "</h4><p>" +
          escapeHtml(o.why) +
          '</p><span class="tag">' +
          escapeHtml(o.effortLabel || "") +
          "</span></div>"
        );
      })
      .join("");

    var planHtml = (report.next30DayPlan || [])
      .map(function (ph) {
        var items = (ph.items || [])
          .map(function (it) {
            return "<li>" + escapeHtml(it) + "</li>";
          })
          .join("");
        return '<div class="ws-report-phase"><strong>' + escapeHtml(ph.phase) + "</strong><ul>" + items + "</ul></div>";
      })
      .join("");

    var toolsHtml = (report.recommendedTools || [])
      .map(function (t) {
        return (
          '<div class="ws-report-tool"><div><strong>' +
          escapeHtml(t.name) +
          "</strong><span>" +
          escapeHtml(t.note) +
          "</span></div></div>"
        );
      })
      .join("");

    var recapHtml = "";
    if (report.worksheetRecaps && report.worksheetRecaps.length) {
      recapHtml =
        '<div class="ws-report-section"><h3>Worksheet recap</h3><ul class="ws-report-list">' +
        report.worksheetRecaps
          .map(function (s) {
            return (
              "<li><strong>" +
              escapeHtml(s.shortTitle || s.worksheetTitle) +
              ":</strong> " +
              escapeHtml(s.headline || "") +
              "</li>"
            );
          })
          .join("") +
        "</ul></div>";
    }

    root.innerHTML =
      '<div class="ws-report-inner" data-report-kind="' +
      escapeHtml(report.kind || "worksheet") +
      '">' +
      '<div class="ws-report-band"></div>' +
      '<div class="ws-report-hero">' +
      '<div class="ws-report-kicker">Your personalised completion report</div>' +
      '<h2 class="ws-report-headline">' +
      escapeHtml(report.headline) +
      "</h2>" +
      '<p class="ws-report-sub">' +
      escapeHtml(report.subhead) +
      "</p>" +
      '<div class="ws-report-meta-row">' +
      '<span class="ws-report-badge ' +
      escapeHtml(report.stageBadge || "") +
      '">' +
      escapeHtml(report.stageLabel) +
      "</span>" +
      '<span class="ws-report-confidence">Confidence ~' +
      escapeHtml(String(report.confidence || "")) +
      "% · Generated " +
      escapeHtml(new Date(report.generatedAt || Date.now()).toLocaleString()) +
      "</span>" +
      "</div></div>" +
      '<div class="ws-report-body">' +
      '<div class="ws-report-section"><h3>Key findings</h3>' +
      findingsHtml +
      "</div>" +
      '<div class="ws-report-section"><h3>Prioritised next moves</h3><div class="ws-report-cards">' +
      cardsHtml +
      "</div></div>" +
      (risksHtml
        ? '<div class="ws-report-section"><h3>Risk flags</h3><div class="ws-report-risks">' + risksHtml + "</div></div>"
        : "") +
      '<div class="ws-report-section"><h3>30-day rhythm</h3><div class="ws-report-timeline">' +
      planHtml +
      "</div></div>" +
      '<div class="ws-report-section"><h3>Tools matched to your situation</h3><div class="ws-report-tools">' +
      toolsHtml +
      "</div></div>" +
      recapHtml +
      '<div class="ws-report-section"><h3>Note from Nathaniel</h3><div class="ws-report-coach">' +
      escapeHtml(report.coachNote || "").replace(/\n/g, "<br/>") +
      "</div></div>" +
      '<label class="ws-report-hp" aria-hidden="true">Company <input type="text" name="company" class="js-rpt-company" tabindex="-1" autocomplete="off" /></label>' +
      '<div class="ws-report-actions">' +
      '<button type="button" class="ws-report-btn-primary js-rpt-print">Download PDF / Print</button>' +
      '<input type="email" class="ws-report-field js-rpt-email" placeholder="Your email" autocomplete="email" />' +
      '<button type="button" class="ws-report-btn-secondary js-rpt-send">Email me this report</button>' +
      '<a href="master-report.html" class="ws-report-btn ws-report-btn-ghost">Combined master report →</a>' +
      '<label style="display:flex;align-items:center;gap:8px;font-size:12px;color:hsl(220,8%,36%);cursor:pointer;"><input type="checkbox" class="js-rpt-cc" /> Also send a copy to Nathaniel (BCC)</label>' +
      '<p class="ws-report-msg js-rpt-msg" aria-live="polite"></p>' +
      "</div></div></div>";

    var printBtn = root.querySelector(".js-rpt-print");
    var sendBtn = root.querySelector(".js-rpt-send");
    var msgEl = root.querySelector(".js-rpt-msg");

    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var emailInput = root.querySelector(".js-rpt-email");
        var hp = root.querySelector(".js-rpt-company");
        var cc = root.querySelector(".js-rpt-cc");
        var to = emailInput && emailInput.value ? emailInput.value.trim() : "";
        if (hp && hp.value) {
          msgEl.textContent = "";
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
          msgEl.className = "ws-report-msg err";
          msgEl.textContent = "Enter a valid email address.";
          return;
        }

        msgEl.className = "ws-report-msg";
        msgEl.textContent = "Sending…";
        sendBtn.disabled = true;

        var payload = {
          worksheetId: report.worksheetId,
          kind: report.kind || "worksheet",
          to: to,
          name: "",
          ccNathaniel: !!(cc && cc.checked),
          company: "",
          report: serializeReportForApi(report),
        };

        var url = window.location.origin + "/api/public/worksheet-report";
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            return r.json().then(function (j) {
              return { ok: r.ok, body: j };
            });
          })
          .then(function (res) {
            sendBtn.disabled = false;
            if (res.ok) {
              msgEl.className = "ws-report-msg ok";
              msgEl.textContent = "Sent — check your inbox (and spam).";
            } else {
              msgEl.className = "ws-report-msg err";
              msgEl.textContent = (res.body && res.body.error) || "Could not send — try again later.";
            }
          })
          .catch(function () {
            sendBtn.disabled = false;
            msgEl.className = "ws-report-msg err";
            msgEl.textContent = "Network error — try again.";
          });
      });
    }
  }

  function mountLockedState(root) {
    if (!root) return;
    root.hidden = false;
    root.innerHTML =
      '<div class="ws-report-inner"><div class="ws-report-body ws-report-lock">' +
      "<h2>Your personalised report unlocks at 100%</h2>" +
      "<p>Keep ticking <strong>Done</strong> on each step. Once you finish this worksheet, you'll get your custom summary, 30-day plan, PDF download, and email send.</p>" +
      "</div></div>";
  }

  var NB = {
    worksheetId: null,
    root: null,
    lastReport: null,
    mode: "worksheet",

    init: function (opts) {
      opts = opts || {};
      this.worksheetId = opts.worksheetId;
      this.mode = opts.mode || "worksheet";
      this.root = document.getElementById("wsReportRoot");
    },

    refresh: function () {
      if (!this.root || !this.worksheetId) return;
      var eng = window.NB_REPORT_ENGINE;
      var rep =
        this.mode === "master"
          ? eng.buildMasterSummary(document)
          : eng.buildFullReport(this.worksheetId, document);
      if (!rep) return;
      this.lastReport = rep;
      mountReport(this.root, rep);
      if (this.mode !== "master") eng.saveSnapshot(this.worksheetId, rep);
    },

    onCompletionChanged: function (percent) {
      if (!this.root) return;
      if (this.mode === "master") return;
      if (percent >= 100) {
        this.root.hidden = false;
        this.refresh();
        try {
          this.root.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (e) {
          this.root.scrollIntoView(true);
        }
      } else {
        mountLockedState(this.root);
      }
    },

    mountMaster: function (rootEl) {
      this.mode = "master";
      this.worksheetId = "master";
      this.root = rootEl || document.getElementById("wsReportRoot");
      var eng = window.NB_REPORT_ENGINE;
      var snaps = eng.loadAllSnapshots();
      if (snaps.length < 2) {
        if (this.root) {
          this.root.hidden = false;
          this.root.innerHTML =
            '<div class="ws-report-inner"><div class="ws-report-body ws-report-lock">' +
            "<h2>Master report locked</h2>" +
            "<p>Complete at least <strong>two</strong> of the four Tauranga SME worksheets to generate your combined adoption snapshot. " +
            "Finish each worksheet to 100% — your summary saves automatically in this browser.</p>" +
            '<p><a class="ws-report-btn ws-report-btn-secondary" style="padding:10px 18px;border-radius:999px;background:hsl(220,18%,12%);color:#fff;" href="https://www.nathanielbaldock.com/resources">Browse resources →</a></p>' +
            "</div></div>";
        }
        return;
      }
      if (!this.root) return;
      this.root.hidden = false;
      var rep = eng.buildMasterSummary(document);
      if (!rep) return;
      this.lastReport = rep;
      mountReport(this.root, rep);
    },
  };

  window.NBReport = NB;
})();
