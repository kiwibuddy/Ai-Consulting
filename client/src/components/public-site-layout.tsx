"use client";

import React, { useLayoutEffect, useEffect } from "react";

const SITE_THEME = "site";

/**
 * Wraps all public marketing pages so the "site" theme (green CTA, dark header styling,
 * Tesoro look) is always applied. Do not remove this wrapper from public routes.
 * See .cursor/rules/public-site-theme.mdc for the theme contract.
 *
 * We set data-theme="site" on the document root. We do NOT remove it on unmount so that
 * when navigating between two public pages (e.g. / → /resources) there is no flash of
 * wrong theme. Dashboard layouts set data-theme="app" on document when they mount.
 */
export function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", SITE_THEME);
    // Intentionally no cleanup: avoids flash when switching between public pages (and in dev Strict Mode)
  }, []);

  // Re-apply after paint so we override theme-selector or other effects that might clear it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", SITE_THEME);
  }, []);

  return (
    <div data-theme="site" data-public-site className="min-h-screen">
      {children}
    </div>
  );
}
