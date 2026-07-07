import { Suspense } from "react";
import { useLocation } from "wouter";
import { PublicSiteLayout } from "@/components/public-site-layout";
import { SiteHeader, type PublicPage } from "@/components/site-header";
import { DelayedPublicSuspenseFallback } from "@/components/suspense-fallback";

export function getPublicPageFromPath(path: string): PublicPage | undefined {
  const p = (path || "/").split("?")[0];
  if (p === "/") return "landing";
  if (p === "/about") return "about";
  if (p === "/speaking" || p.startsWith("/speaking/")) return "speaking";
  if (p.startsWith("/resources")) return "resources";
  if (p === "/pricing") return "pricing";
  if (p === "/products") return "products";
  if (p === "/login") return "login";
  return undefined;
}

function PublicPageEnter({ children }: { children: React.ReactNode }) {
  return <div className="nb-public-page-enter">{children}</div>;
}

/** Public marketing route: persistent header + branded content loader + fade-in. */
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const currentPage = getPublicPageFromPath(location);

  return (
    <PublicSiteLayout>
      <SiteHeader currentPage={currentPage} />
      <Suspense fallback={<DelayedPublicSuspenseFallback />}>
        <PublicPageEnter>{children}</PublicPageEnter>
      </Suspense>
    </PublicSiteLayout>
  );
}
