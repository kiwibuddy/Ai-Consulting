"use client";

import { useEffect } from "react";

/**
 * In production, injects Plausible analytics script.
 * Set VITE_PLAUSIBLE_DOMAIN in .env (e.g. nathanielbaldock.com) to enable.
 */
export function Analytics() {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    if (!domain) return;

    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = domain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
