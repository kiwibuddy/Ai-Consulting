"use client";

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

const contentMax = "max-w-6xl";
const ctaLabel = "Book a free 30-min consultation";

export type PublicPage = "landing" | "about" | "speaking" | "resources" | "pricing" | "login";

interface SiteHeaderProps {
  currentPage?: PublicPage;
}

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-900 backdrop-blur-xl isolate overflow-visible">
      <div className={`container mx-auto ${contentMax} px-4 md:px-10 h-14 md:h-16 flex items-center justify-between gap-3 md:gap-4 min-w-0`}>
        <Link href="/" className="flex items-center shrink-0 h-9 md:h-11 w-[140px] md:w-[160px] min-w-0">
          <img
            src="/logo.png?v=2"
            alt="Nathaniel Baldock — AI Consulting"
            className="h-full w-full max-h-9 md:max-h-11 object-contain object-left dark-header-logo"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-4 xl:gap-6 flex-shrink-0 whitespace-nowrap">
          <Link href="/" className={`text-sm transition-colors duration-300 ${currentPage === "landing" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            Home
          </Link>
          <Link href="/about" className={`text-sm transition-colors duration-300 ${currentPage === "about" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            About Me
          </Link>
          <Link href="/speaking" className={`text-sm transition-colors duration-300 ${currentPage === "speaking" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            Speaking
          </Link>
          <Link href="/resources" className={`text-sm transition-colors duration-300 ${currentPage === "resources" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            Resources
          </Link>
          <Link href="/pricing" className={`text-sm transition-colors duration-300 ${currentPage === "pricing" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-3 flex-shrink-0 text-white/90 [&_button]:text-white/90 [&_button:hover]:text-white [&_a]:text-white/90 [&_a:hover]:text-white">
          <MobileNav />
          <Link href="/login" className={`text-sm transition-colors duration-300 ${currentPage === "login" ? "font-medium text-white" : "text-white/90 hover:text-white"}`}>
            Sign In
          </Link>
          <Button
            size="sm"
            variant="default"
            className="tesoro-cta-gradient rounded-lg font-medium text-white"
            data-testid="button-get-started"
            asChild
          >
            <Link href="/intake">
              {ctaLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
