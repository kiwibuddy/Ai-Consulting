"use client";

import { useEffect, useState } from "react";
import { Link } from "wouter";
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="nb-mobile-toggle border-0 bg-transparent text-white cursor-pointer p-2"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 z-[99] flex flex-col gap-1 p-8 backdrop-blur-xl md:hidden"
          style={{
            background: "rgba(15, 16, 20, 0.96)",
            paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
          }}
          onClick={() => setOpen(false)}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3.5 px-1 text-[22px] font-[family-name:var(--nb-font-display)] text-[var(--nb-ink)] no-underline border-b border-[var(--nb-rule)]"
            >
              {label}
            </Link>
          ))}
          <div className="mt-6">
            <Link href="/intake" className="nb-btn-primary w-full max-w-[360px]" onClick={() => setOpen(false)}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
