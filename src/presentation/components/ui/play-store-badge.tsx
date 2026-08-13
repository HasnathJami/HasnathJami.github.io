import { cn } from "@/shared/utils/cn";

/** The Google Play triangle, drawn inline so nothing hits an external CDN. */
export function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-4 w-4 shrink-0", className)}
    >
      <path
        fill="#00D2FF"
        d="M3.4 1.6a1.6 1.6 0 0 0-.5 1.2v18.4c0 .5.2.9.5 1.2l.1.1L13.8 12v-.2L3.5 1.6h-.1Z"
      />
      <path fill="#FFCE00" d="M17.2 15.4 13.8 12v-.2l3.4-3.4.1.1 4.1 2.3c1.2.7 1.2 1.8 0 2.4l-4.1 2.3-.1-.1Z" />
      <path fill="#FF3A44" d="m17.3 15.5-3.5-3.5L3.4 22.4c.4.4 1 .5 1.8.1l12.1-7Z" />
      <path fill="#00E676" d="M17.3 8.5 5.2 1.5C4.4 1 3.8 1.1 3.4 1.6L13.8 12l3.5-3.5Z" />
    </svg>
  );
}

interface PlayStoreButtonProps {
  href: string;
  className?: string;
  label?: string;
}

export function PlayStoreButton({
  href,
  className,
  label = "Get it on Google Play",
}: PlayStoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-2.5 transition-all duration-200 hover:border-accent-line hover:bg-surface-raised active:scale-[0.98]",
        className,
      )}
    >
      <PlayGlyph className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[0.6rem] uppercase tracking-wider text-ink-subtle">
          Available on
        </span>
        <span className="text-sm font-semibold text-ink">Google Play</span>
      </span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
