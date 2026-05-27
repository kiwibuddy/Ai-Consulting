/**
 * audit-hero-carousel.js — crossfade carousel for audit welcome screens
 *
 * Initialise every [data-audit-carousel] on DOMContentLoaded. Respects
 * prefers-reduced-motion (first slide only, no autoplay). Pauses while
 * hovering or when tab is hidden.
 */
(function () {
  var INTERVAL_MS = 6400;

  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initCarousel(root) {
    var slides = root.querySelectorAll(".audit-hero-slide");
    var dotsWrap = root.querySelector(".audit-hero-dots");
    if (!slides.length) return;

    var i = 0;
    var n = slides.length;
    var timer = null;
    var dots = [];

    function setSlide(idx) {
      i = ((idx % n) + n) % n;
      slides.forEach(function (el, j) {
        var on = j === i;
        el.classList.toggle("is-active", on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
        if (dots[j]) {
          dots[j].classList.toggle("is-active", on);
          dots[j].setAttribute("aria-selected", on ? "true" : "false");
          dots[j].setAttribute("tabindex", on ? "0" : "-1");
        }
      });
    }

    function next() {
      setSlide(i + 1);
    }

    function start() {
      stop();
      if (reducedMotion() || root.classList.contains("is-paused")) return;
      timer = window.setInterval(next, INTERVAL_MS);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (dotsWrap && n > 1 && !reducedMotion()) {
      slides.forEach(function (_, j) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "audit-hero-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Slide " + (j + 1) + " of " + n);
        dot.addEventListener("click", function () {
          setSlide(j);
          start();
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    setSlide(0);

    if (!reducedMotion() && n > 1) {
      root.classList.remove("audit-hero--static");
      root.addEventListener("mouseenter", function () {
        root.classList.add("is-hover");
        stop();
      });
      root.addEventListener("mouseleave", function () {
        root.classList.remove("is-hover");
        if (!document.hidden) start();
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else if (!root.classList.contains("is-hover")) start();
      });
      start();
    } else {
      root.classList.add("audit-hero--static");
    }
  }

  function boot() {
    document.querySelectorAll("[data-audit-carousel]").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
