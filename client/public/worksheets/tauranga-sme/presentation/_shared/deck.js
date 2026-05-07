/**
 * Tauranga SME — shared deck runtime.
 *
 * Provides slide nav (keyboard + arrow buttons + dots), modal open/close
 * (keyed off `data-modal="<slug>"` against `window.MODAL_DB`), count-up
 * animation on slide enter, and (optional) bibliography rendering for
 * any element with `id="bib-host"`.
 *
 * Each session's `index.html` only needs the slide markup; this file
 * handles the rest. Loaded after `_shared/modal-db.js`.
 */
(function () {
  "use strict";

  const MD = (typeof window !== "undefined" && window.MODAL_DB) || {};
  const bibKey =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-session-bib")
      : null;
  const bibMap = (typeof window !== "undefined" && window.BIBLIOGRAPHY_BY_SESSION) || null;
  const BIB =
    bibKey && bibMap && bibMap[bibKey] && bibMap[bibKey].length
      ? bibMap[bibKey]
      : (typeof window !== "undefined" && window.BIBLIOGRAPHY) || [];

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(function () {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  ready(function () {
    const playOverlay = document.getElementById("play-overlay");
    const startBtn = document.getElementById("start-btn");
    let started = !playOverlay;

    function beginDeck() {
      if (started) return;
      started = true;
      document.documentElement.classList.add("deck-started");
      if (playOverlay) playOverlay.classList.add("hidden");
      enterFullscreen();
      updNav();
    }

    if (started) document.documentElement.classList.add("deck-started");
    else if (startBtn) startBtn.focus();

    if (startBtn)
      startBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        beginDeck();
      });
    if (playOverlay)
      playOverlay.addEventListener("click", function (e) {
        if (e.target === playOverlay) beginDeck();
      });
    // ── Bibliography auto-render ──────────────────────────────
    const bibHost = document.getElementById("bib-host");
    if (bibHost && BIB.length) {
      BIB.forEach(function (b) {
        const div = document.createElement("div");
        div.className = "bib-item";
        const num = document.createElement("span");
        num.className = "bib-num";
        num.textContent = b.n + ".";
        const a = document.createElement("a");
        a.className = "bib-link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.href = b.url || "#";
        a.textContent = b.title;
        div.appendChild(num);
        div.appendChild(a);
        bibHost.appendChild(div);
      });
    }

    // ── Nav engine ────────────────────────────────────────────
    const slides = document.querySelectorAll(".slide");
    const total = slides.length;
    if (!total) return;
    let cur = 0;

    const nb = document.getElementById("nav-bar");
    if (nb) {
      for (let i = 0; i < total; i++) {
        const d = document.createElement("button");
        d.className = "nav-dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Slide " + (i + 1));
        d.addEventListener("click", function () {
          go(i);
        });
        nb.appendChild(d);
      }
    }

    function updNav() {
      document.querySelectorAll(".nav-dot").forEach(function (d, i) {
        d.classList.toggle("active", i === cur);
      });
      const counter = document.getElementById("slide-counter");
      if (counter) counter.textContent = cur + 1 + " / " + total;
      const bar = document.getElementById("progress-bar");
      if (bar) bar.style.width = (total <= 1 ? 100 : (cur / (total - 1)) * 100) + "%";
    }

    function fireCountUps(slide) {
      slide.querySelectorAll(".count-up").forEach(function (el) {
        if (el.dataset.fired) return;
        el.dataset.fired = "1";
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        const dur = 900;
        const start = performance.now();
        function step(t) {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          const display =
            Math.abs(target) >= 100
              ? Math.round(val).toLocaleString()
              : (Math.round(val * 10) / 10).toString();
          el.textContent = display + suffix;
          if (p < 1) requestAnimationFrame(step);
          else
            el.textContent =
              (Math.abs(target) >= 100 ? Math.round(target).toLocaleString() : target.toString()) +
              suffix;
        }
        requestAnimationFrame(step);
      });
    }

    function go(n) {
      if (n < 0 || n >= total || n === cur) return;
      slides[cur].classList.remove("active");
      slides[n].classList.add("active");
      cur = n;
      fireCountUps(slides[cur]);
      updNav();
      if (typeof window.animateDeckCharts === "function") {
        window.animateDeckCharts(slides[cur]);
      }
    }

    // ── Modal ─────────────────────────────────────────────────
    const mo = document.getElementById("modal-overlay");
    function openModal(k) {
      if (!mo) return;
      const d = MD[k];
      if (!d) {
        console.warn("[deck] No modal entry for", k);
        return;
      }
      const set = function (id, v) {
        const el = document.getElementById(id);
        if (el) el.textContent = v;
      };
      set("modal-stat", d.stat || "");
      set("modal-title", d.title || "");
      set("modal-body", d.body || "");
      set("modal-source", d.source ? "Source: " + d.source : "");
      const link = document.getElementById("modal-link");
      if (link)
        link.innerHTML = d.link
          ? '<a href="' + d.link + '" target="_blank" rel="noopener">View source &rarr;</a>'
          : "";
      mo.classList.add("open");
    }
    function closeModal() {
      if (mo) mo.classList.remove("open");
    }
    if (mo) {
      const closeBtn = document.getElementById("modal-close");
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      mo.addEventListener("click", function (e) {
        if (e.target === mo) closeModal();
      });
    }
    document.querySelectorAll("[data-modal]").forEach(function (el) {
      el.addEventListener("click", function () {
        openModal(el.dataset.modal);
      });
    });

    // ── Keyboard ──────────────────────────────────────────────
    document.addEventListener("keydown", function (e) {
      if (!document.documentElement.classList.contains("deck-started")) return;
      if (mo && mo.classList.contains("open")) {
        if (e.key === "Escape") closeModal();
        return;
      }
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(cur + 1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(cur - 1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        go(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    });

    const next = document.getElementById("next-btn");
    if (next) next.addEventListener("click", function () { go(cur + 1); });
    const prev = document.getElementById("prev-btn");
    if (prev) prev.addEventListener("click", function () { go(cur - 1); });

    // ── Touch swipe ───────────────────────────────────────────
    const deck = document.getElementById("deck");
    if (deck) {
      let tx = 0;
      deck.addEventListener(
        "touchstart",
        function (e) { tx = e.touches[0].clientX; },
        { passive: true }
      );
      deck.addEventListener(
        "touchend",
        function (e) {
          if (!document.documentElement.classList.contains("deck-started")) return;
          const dx = e.changedTouches[0].clientX - tx;
          if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
        },
        { passive: true }
      );
    }

    // First slide
    fireCountUps(slides[0]);
    if (typeof window.animateDeckCharts === "function") {
      window.animateDeckCharts(slides[0]);
    }
    updNav();
  });
})();
