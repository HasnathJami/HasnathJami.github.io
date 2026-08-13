"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Screenshot } from "@/domain/entities/app-product";
import { cn } from "@/shared/utils/cn";

interface AppScreenshotGalleryProps {
  appName: string;
  screenshots: readonly Screenshot[];
  accentRgb: string;
}

/**
 * Horizontally snap-scrolling strip of Play Store screenshots, with a
 * keyboard-navigable lightbox.
 */
export function AppScreenshotGallery({
  appName,
  screenshots,
  accentRgb,
}: AppScreenshotGalleryProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const showPrevious = useCallback(
    () =>
      setLightboxIndex((index) =>
        index === null ? null : (index - 1 + screenshots.length) % screenshots.length,
      ),
    [screenshots.length],
  );

  const showNext = useCallback(
    () =>
      setLightboxIndex((index) =>
        index === null ? null : (index + 1) % screenshots.length,
      ),
    [screenshots.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, showNext, showPrevious]);

  if (screenshots.length === 0) return null;

  const active = lightboxIndex === null ? null : screenshots[lightboxIndex];

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {screenshots.map((shot, index) => (
          <li key={shot.src} className="w-[9.5rem] shrink-0 snap-start sm:w-[11rem]">
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open screenshot ${index + 1} of ${appName}`}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface-sunken transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              style={{ borderColor: `rgb(${accentRgb} / 0.18)` }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 640px) 9.5rem, 11rem"
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {screenshots.length > 2 ? (
        <div className="mt-4 flex items-center gap-2">
          <GalleryButton label="Previous screenshots" onClick={() => scrollByCard(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </GalleryButton>
          <GalleryButton label="Next screenshots" onClick={() => scrollByCard(1)}>
            <ChevronRight className="h-4 w-4" />
          </GalleryButton>
          <span className="ml-1 font-mono text-xs text-ink-subtle">
            {screenshots.length} screens
          </span>
        </div>
      ) : null}

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${appName} screenshots`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <LightboxArrow
              side="left"
              label="Previous screenshot"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
            />

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[86vh] w-auto overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                className="max-h-[86vh] w-auto object-contain"
              />
            </motion.div>

            <LightboxArrow
              side="right"
              label="Next screenshot"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
            />

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white">
              {appName} · {(lightboxIndex ?? 0) + 1} / {screenshots.length}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function GalleryButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
    >
      {children}
    </button>
  );
}

function LightboxArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
        side === "left" ? "left-3 sm:left-8" : "right-3 sm:right-8",
      )}
    >
      {side === "left" ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
}
