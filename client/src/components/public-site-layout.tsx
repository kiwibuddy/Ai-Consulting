"use client";

import React, { useLayoutEffect } from "react";

const PUBLIC_THEME = "public";

/** Sets cinematic public theme on document root for public routes. */
function usePublicTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", PUBLIC_THEME);
    root.removeAttribute("data-color-theme");
  }, []);
}

export function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  usePublicTheme();

  return (
    <div data-theme="public" data-public-site className="min-h-screen nb-page">
      {children}
    </div>
  );
}
