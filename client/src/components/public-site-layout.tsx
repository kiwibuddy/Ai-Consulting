"use client";

import React, { useLayoutEffect } from "react";

/**
 * Wraps all public marketing pages so the "site" theme (green CTA, dark header styling,
 * Tesoro look) is always applied. Do not remove this wrapper from public routes.
 * See .cursor/rules/public-site-theme.mdc for the theme contract.
 *
 * We set data-theme="site" on the document root so the theme cannot be overridden
 * by ThemeProvider (light/dark) or by theme-selector (ember/ocean/etc.) when
 * the user has previously visited the dashboard. useLayoutEffect ensures it runs
 * before paint so the correct theme shows immediately (no orange flash).
 */
export function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "site");
    return () => {
      root.removeAttribute("data-theme");
    };
  }, []);

  return <div data-theme="site" data-public-site>{children}</div>;
}
