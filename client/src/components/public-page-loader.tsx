/** Lightweight fallback: top progress bar only (header stays mounted via PublicRoute). */
export function PublicPageProgressFallback() {
  return (
    <main
      className="relative min-h-[calc(100vh-76px)]"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="nb-public-route-progress" aria-hidden />
    </main>
  );
}

/** @deprecated Use PublicPageProgressFallback — kept for exports that still reference the old name. */
export const PublicPageContentLoader = PublicPageProgressFallback;
