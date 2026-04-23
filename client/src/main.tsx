import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

initAnalytics();

// Single source of truth: set theme from URL before React runs so first paint is correct
function setThemeFromPath() {
  const path = typeof window !== "undefined" ? window.location.pathname || "/" : "/";
  const isDashboard = path.startsWith("/client") || path.startsWith("/consultant");
  document.documentElement.setAttribute("data-theme", isDashboard ? "app" : "site");
}
setThemeFromPath();

// PWA: only in production. In dev, a registered SW caches HTML/JS and easily serves a stale
// bundle (wrong theme, old layout) even after Vite config/CSS fixes. Unregister in dev
// to clear a previously registered worker from the same origin.
if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  } else {
    void navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const r of regs) {
        void r.unregister();
      }
    });
  }
}

createRoot(document.getElementById("root")!).render(
  <>
    <VercelAnalytics />
    <App />
  </>
);
