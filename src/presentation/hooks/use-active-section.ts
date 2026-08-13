"use client";

import { useEffect, useState } from "react";

/** Distance from the top of the viewport that counts as "you are here". */
const ACTIVE_LINE_RATIO = 0.3;

/** Above this scroll offset the page is still on the hero, so nothing is active. */
const HERO_OFFSET = 120;

/**
 * Tracks which section the reader is currently on so the nav can highlight it.
 *
 * Deliberately scroll-driven rather than IntersectionObserver-based: the
 * observer leaves a stale highlight when the reader scrolls back up past every
 * observed section.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const resolveActive = () => {
      frame = 0;

      if (window.scrollY < HERO_OFFSET) {
        setActiveId(null);
        return;
      }

      const line = window.scrollY + window.innerHeight * ACTIVE_LINE_RATIO;
      let current: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(resolveActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return activeId;
}
