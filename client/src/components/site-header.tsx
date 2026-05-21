"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

const ctaLabel = "Book a free 30-min consultation";

const MARKETING_MODE = import.meta.env.VITE_MARKETING_MODE === "true";

export type PublicPage = "landing" | "about" | "speaking" | "resources" | "pricing" | "login";

interface SiteHeaderProps {
  currentPage?: PublicPage;
}

const navLinkClass = (active: boolean) =>
  cn(
    "nb-site-nav-link text-[13.5px] transition-colors duration-200 no-underline",
    active && "is-active"
  );

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);

    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  const showSolid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between isolate transition-all duration-240",
        showSolid
          ? "h-16 border-b border-[var(--nb-rule)] backdrop-blur-xl"
          : "h-[76px] border-b border-transparent"
      )}
      style={{
        padding: "0 clamp(20px, 4vw, 56px)",
        background: showSolid
          ? "rgba(15, 16, 20, 0.78)"
          : isHome
            ? "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)"
            : "rgba(15, 16, 20, 0.78)",
      }}
    >
      <Link href="/" className="flex items-center shrink-0 no-underline">
        <img
          src="/logo.png?v=2"
          alt="Nathaniel Baldock — AI Consulting"
          className={cn(
            "nb-logo-invert object-contain object-left transition-all duration-240",
            showSolid ? "h-8 max-h-8" : "h-[38px] max-h-[38px]"
          )}
        />
      </Link>

      <nav className="nb-desktop-nav items-center gap-7" style={{ display: "flex" }}>
        <Link href="/" className={navLinkClass(currentPage === "landing")}>
          Home
        </Link>
        <Link href="/about" className={navLinkClass(currentPage === "about")}>
          About Me
        </Link>
        <Link href="/speaking" className={navLinkClass(currentPage === "speaking")}>
          Speaking
        </Link>
        <Link href="/resources" className={navLinkClass(currentPage === "resources")}>
          Resources
        </Link>
        <Link href="/pricing" className={navLinkClass(currentPage === "pricing")}>
          Pricing
        </Link>
        {!MARKETING_MODE && (
          <Link href="/login" className={cn(navLinkClass(currentPage === "login"), "ml-2")}>
            Sign In
          </Link>
        )}
        <Link href="/intake" className="nb-btn-primary nb-btn-primary--sm" data-testid="button-get-started">
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>

      <div className="flex md:hidden items-center gap-2">
        <MobileNav />
      </div>
    </header>
  );
}
