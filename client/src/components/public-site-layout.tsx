"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";

const SITE_THEME = "site";

/**
 * Single theme for the public website: dark header, green CTA (Tesoro).
 * We lock data-theme="site" so no other code can change it while public pages are visible.
 */
function useLockSiteTheme() {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", SITE_THEME);
  }, []);

  const locked = useRef(false);
  useEffect(() => {
    if (locked.current) return;
    locked.current = true;

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (root.getAttribute("data-theme") !== SITE_THEME) {
        root.setAttribute("data-theme", SITE_THEME);
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      locked.current = false;
      observer.disconnect();
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
