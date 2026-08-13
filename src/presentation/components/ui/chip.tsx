import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type ChipTone = "neutral" | "accent" | "signal";

const TONE_STYLES: Record<ChipTone, string> = {
  neutral: "border-line bg-surface text-ink-muted",
  accent: "border-accent-line bg-accent-soft text-accent",
  signal: "border-transparent bg-signal-soft text-signal",
};

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
  icon?: ReactNode;
}

/** Small pill used for tech stacks, metrics and labels. */
export function Chip({
  children,
  tone = "neutral",
  className,
  icon,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none whitespace-nowrap",
        TONE_STYLES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
