"use client";

import { useState } from "react";
import { Link } from "wouter";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ctaLabel = "Book a free 30-min consultation";

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/speaking", label: "Speaking" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Sign In" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(100vw-2rem,320px)] bg-neutral-900 border-neutral-700 text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-white sr-only">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 pt-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 px-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              size="sm"
              variant="default"
              className="tesoro-cta-gradient w-full rounded-lg font-medium text-white justify-center"
              asChild
            >
              <Link href="/intake" onClick={() => setOpen(false)}>
                {ctaLabel}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
