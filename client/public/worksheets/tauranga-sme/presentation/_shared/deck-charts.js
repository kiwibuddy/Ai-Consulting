/**
 * Tauranga SME — animated SVG charts (rings, horizontal & vertical bars).
 * Invoked by deck.js via `window.animateDeckCharts(activeSlide)` on entry.
 */
(function () {
  "use strict";

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateNumber(from, to, ms, onFrame) {
    var start = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - start) / ms);
      onFrame(from + (to - from) * easeOutCubic(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  window.animateDeckCharts = function (slideEl) {
    if (!slideEl) return;

    slideEl.querySelectorAll(".chart-ring[data-progress]").forEach(function (wrap) {
      var fg = wrap.querySelector(".chart-ring-fill");
      if (!fg) return;
      var target = parseFloat(wrap.getAttribute("data-progress") || "0", 10);
      target = Math.max(0, Math.min(100, target));
      var C = parseFloat(wrap.getAttribute("data-ring-c") || "326.73");
      fg.style.strokeDasharray = String(C);
      var startOff = C;
      var endOff = C * (1 - target / 100);
      fg.style.strokeDashoffset = String(startOff);
      animateNumber(startOff, endOff, 1100, function (v) {
        fg.style.strokeDashoffset = String(v);
      });
    });

    slideEl.querySelectorAll(".mini-ring[data-progress]").forEach(function (ring, idx) {
      var fg = ring.querySelector(".mini-ring-fill");
      if (!fg) return;
      var target = parseFloat(ring.getAttribute("data-progress") || "0", 10);
      target = Math.max(0, Math.min(100, target));
      var C = parseFloat(ring.getAttribute("data-ring-c") || "163.36");
      fg.style.strokeDasharray = String(C);
      var startOff = C;
      var endOff = C * (1 - target / 100);
      fg.style.strokeDashoffset = String(startOff);
      setTimeout(function () {
        animateNumber(startOff, endOff, 850, function (v) {
          fg.style.strokeDashoffset = String(v);
        });
      }, idx * 60);
    });

    slideEl.querySelectorAll(".chart-hbars .chart-hbar-fill").forEach(function (fill, idx) {
      var w = fill.getAttribute("data-w");
      if (!w) return;
      fill.style.transition = "none";
      fill.style.width = "0%";
      fill.offsetHeight;
      setTimeout(function () {
        fill.style.transition = "width 0.9s cubic-bezier(0.23,1,0.32,1)";
        fill.style.width = w + "%";
      }, 120 + idx * 100);
    });

    slideEl.querySelectorAll(".chart-vcols .chart-vbar-fill").forEach(function (fill, idx) {
      var h = fill.getAttribute("data-h");
      if (!h) return;
      fill.style.transition = "none";
      fill.style.height = "0%";
      fill.offsetHeight;
      setTimeout(function () {
        fill.style.transition = "height 0.85s cubic-bezier(0.23,1,0.32,1)";
        fill.style.height = h + "%";
      }, 100 + idx * 75);
    });
  };
})();
