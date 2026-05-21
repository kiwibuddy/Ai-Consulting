"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";

const ctaLabel = "Book a free 30-min consultation";

const MARKETING_MODE = import.meta.env.VITE_MARKETING_MODE === "true";

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/speaking", label: "Speaking" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
  ...(MARKETING_MODE ? [] : [{ href: "/login", label: "Sign In" }]),
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-mobile-nav-open", "");
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.removeAttribute("data-mobile-nav-open");
    };
  }, [open]);

  const menuPanel =
    open &&
    createPortal(
      <div
        className="nb-mobile-nav-overlay fixed inset-0 z-[99] flex flex-col md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={() => setOpen(false)}
      >
        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-8 pb-8"
          style={{
            paddingTop: "calc(76px + max(0px, env(safe-area-inset-top)))",
            paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-[var(--nb-rule)] px-1 py-3.5 font-[family-name:var(--nb-font-display)] text-[22px] text-[var(--nb-ink)] no-underline"
            >
              {label}
            </Link>
          ))}
          <div className="mt-6">
            <Link
              href="/intake"
              className="nb-btn-primary w-full max-w-[360px]"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>,
      document.body
    );

  return (
    <>
      <button
        type="button"
        className="nb-mobile-toggle relative z-[101] border-0 bg-transparent text-white cursor-pointer p-2"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {menuPanel}
    </>
  );
}
