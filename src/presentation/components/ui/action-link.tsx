import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type ActionVariant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<ActionVariant, string> = {
  primary:
    "bg-accent text-accent-on hover:bg-accent-hover shadow-[0_8px_24px_-8px_var(--accent)]",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-accent-line hover:text-accent",
  ghost: "text-ink-muted hover:text-ink",
};

interface ActionLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  variant?: ActionVariant;
  children: ReactNode;
  /** Renders target/rel for off-site destinations. */
  external?: boolean;
}

export function ActionLink({
  href,
  variant = "primary",
  external = false,
  className,
  children,
  ...props
}: ActionLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
        VARIANT_STYLES[variant],
        className,
      )}
      {...externalProps}
      {...props}
    >
      {children}
    </Link>
  );
}
