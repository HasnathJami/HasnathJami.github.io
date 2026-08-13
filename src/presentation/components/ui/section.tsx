import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { Reveal } from "./reveal";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contained?: boolean;
}

/** Page section with a consistent header rhythm. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
  contained = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-28", className)}
    >
      <div className={cn(contained && "mx-auto w-full max-w-6xl px-5 sm:px-8")}>
        <Reveal>
          <header className="mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>{eyebrow}</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                {title}
              </h2>
              {description ? (
                <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
      <span aria-hidden className="h-px w-6 bg-accent-line" />
      {children}
    </span>
  );
}
