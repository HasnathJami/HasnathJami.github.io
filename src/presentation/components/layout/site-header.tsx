"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useActiveSection } from "@/presentation/hooks/use-active-section";
import { useScrolled } from "@/presentation/hooks/use-scrolled";
import { NAV_ITEMS } from "@/shared/config/site";
import { cn } from "@/shared/utils/cn";

import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  shortName: string;
  resumeSrc: string;
}

export function SiteHeader({ shortName, resumeSrc }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeId = useActiveSection(sectionIds);

  // Keep the page from scrolling behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-canvas/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-xs font-bold text-accent-on">
            HJ
          </span>
          <span className="hidden sm:inline">{shortName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                activeId === item.id
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {activeId === item.id ? (
                <span className="absolute inset-0 rounded-full bg-surface-raised ring-1 ring-line" />
              ) : null}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={resumeSrc}
            download
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-on transition-colors duration-200 hover:bg-accent-hover sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8"
            aria-label="Sections"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-line/60 py-3.5 text-base transition-colors last:border-0",
                  activeId === item.id ? "text-accent" : "text-ink-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={resumeSrc}
              download
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-accent-on"
            >
              Download résumé
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
