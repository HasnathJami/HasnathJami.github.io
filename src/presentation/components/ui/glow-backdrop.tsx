import { cn } from "@/shared/utils/cn";

/** Ambient gradient wash + grid used behind the hero and contact sections. */
export function GlowBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="surface-grid mask-fade-y absolute inset-0 opacity-70" />
      <div
        className="animate-drift absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-a), transparent 68%)" }}
      />
      <div
        className="animate-drift absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full blur-3xl [animation-delay:-6s]"
        style={{ background: "radial-gradient(circle, var(--glow-b), transparent 70%)" }}
      />
    </div>
  );
}
