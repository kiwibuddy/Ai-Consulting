import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

// Single source of truth: set theme from URL before React runs so first paint is correct
function setThemeFromPath() {
  const path = typeof window !== "undefined" ? window.location.pathname || "/" : "/";
  const isDashboard = path.startsWith("/client") || path.startsWith("/consultant");
  document.documentElement.setAttribute("data-theme", isDashboard ? "app" : "site");
}
setThemeFromPath();

// Register service worker for PWA
if ("serviceWorker" in navigator) {
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
}

createRoot(document.getElementById("root")!).render(<App />);
