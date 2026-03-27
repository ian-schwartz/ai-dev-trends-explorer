"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/workflows", label: "Workflows" },
  { href: "/prompting", label: "Prompting" },
  { href: "/compare", label: "Compare" },
  { href: "/videos", label: "Videos" },
  { href: "/buzz", label: "Buzz" },
] as const;

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 ease-out hover:text-violet-300"
          onClick={() => setMobileOpen(false)}
        >
          AI Dev Trends
        </Link>

        {/* Desktop: horizontal links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-zinc-400 transition-colors duration-200 ease-out hover:text-violet-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors duration-200 ease-out hover:bg-zinc-800 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-[max-height] duration-200 ease-out md:hidden ${
          mobileOpen ? "max-h-64" : "max-h-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="border-t border-zinc-800/80 bg-background/98 px-4 py-3">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors duration-200 ease-out hover:bg-zinc-800/80 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
