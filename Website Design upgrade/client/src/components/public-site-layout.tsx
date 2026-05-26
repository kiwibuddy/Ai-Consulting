"use client";

import React, { useLayoutEffect } from "react";

const SITE_THEME = "site";

/**
 * Single theme for the public website: dark header, green CTA (Tesoro).
 * We lock data-theme="site" so no other code can change it while public pages are visible.
 */
function useLockSiteTheme() {
  const root = document.documentElement;

  useLayoutEffect(() => {
    const apply = () => {
      root.setAttribute("data-theme", SITE_THEME);
      root.removeAttribute("data-color-theme");
    };
    apply();

    const observer = new MutationObserver(() => {
      if (root.getAttribute("data-theme") !== SITE_THEME) {
        apply();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    // Re-apply after paint so we win any race with other effects (e.g. dashboard unmount)
    const rafId = requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
}

export function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  useLockSiteTheme();

  return (
    <div data-theme="site" data-public-site className="min-h-screen">
      {children}
    </div>
  );
}
