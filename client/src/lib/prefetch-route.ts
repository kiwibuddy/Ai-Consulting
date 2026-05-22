/**
 * Maps public paths to dynamic import functions so hover prefetch warms the chunk
 * before navigation. Eager-loaded pages are omitted (already in the main graph).
 */
const prefetchByPath: Record<string, () => Promise<unknown>> = {
  "/intake": () => import("@/pages/intake"),
  "/survey": () => import("@/pages/survey"),
  "/privacy": () => import("@/pages/privacy"),
  "/terms": () => import("@/pages/terms"),
  "/forgot-password": () => import("@/pages/forgot-password"),
  "/reset-password": () => import("@/pages/reset-password"),
  "/presentations/contact": () => import("@/pages/presentation-contact"),
  "/tauranga-sme": () => import("@/pages/tauranga-sme"),
  "/tauranga-sme/welcome": () => import("@/pages/tauranga-sme-welcome"),
  "/speaking/invite": () => import("@/pages/speaking-invite"),
  "/resources/the-garden-and-the-tree-of-knowledge-in-your-pocket": () =>
    import("@/pages/article-garden-tree-knowledge"),
  "/resources/when-your-teens-best-friend-is-an-algorithm": () =>
    import("@/pages/article-teens-algorithm-friend"),
  "/resources/sabbath-rest-in-the-age-of-ai": () => import("@/pages/article-sabbath-rest-ai"),
  "/resources/why-your-soul-needs-the-struggle": () => import("@/pages/article-soul-needs-struggle"),
};

const prefetched = new Set<string>();

export function prefetchRoute(path: string): void {
  const normalized = (path || "/").split("?")[0];
  if (prefetched.has(normalized)) return;

  const loader =
    prefetchByPath[normalized] ??
    (normalized.startsWith("/resources/worksheet/")
      ? () => import("@/pages/worksheet-share")
      : normalized.startsWith("/resources/christian-professional/")
        ? () => import("@/pages/christian-professional-worksheet")
        : normalized.startsWith("/pay/")
          ? () => import("@/pages/pay")
          : undefined);

  if (!loader) return;

  prefetched.add(normalized);
  void loader();
}
