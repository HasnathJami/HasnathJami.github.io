import { CircleCheck, Download, Star } from "lucide-react";
import Image from "next/image";

import type { AppProduct } from "@/domain/entities/app-product";
import type { AppShowcase } from "@/application/use-cases/get-app-showcase";
import { Chip } from "@/presentation/components/ui/chip";
import { PlayStoreButton } from "@/presentation/components/ui/play-store-badge";
import { Reveal } from "@/presentation/components/ui/reveal";
import { Section } from "@/presentation/components/ui/section";

import { AppScreenshotGallery } from "./app-screenshot-gallery";

export function AppsSection({ showcase }: { showcase: AppShowcase }) {
  return (
    <Section
      id="apps"
      eyebrow="Portfolio"
      title="Apps I have shipped to Google Play"
      description={`${showcase.all.length} live products — ${showcase.professional.length} built at work, ${showcase.personal.length} on my own time. Every screenshot below is straight from the store listing.`}
    >
      <div className="space-y-8">
        {showcase.all.map((app, index) => (
          <Reveal key={app.id} delay={Math.min(index * 0.06, 0.24)}>
            <AppCard app={app} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function AppCard({ app }: { app: AppProduct }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-8"
      style={{ ["--app-accent" as string]: `rgb(${app.accentRgb})` }}
    >
      {/* Brand wash keyed to the app's own icon colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `rgb(${app.accentRgb} / 0.18)` }}
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <Image
              src={app.iconSrc}
              alt={`${app.name} app icon`}
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-2xl border border-line shadow-card sm:h-16 sm:w-16"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {app.name}
                </h3>
                <Chip tone={app.origin === "professional" ? "accent" : "signal"}>
                  {app.origin === "professional" ? "Professional" : "Personal"}
                </Chip>
              </div>
              <p className="mt-1 text-sm text-ink-muted">{app.tagline}</p>
              <p className="mt-1 font-mono text-xs text-ink-subtle">
                {app.organisation}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {app.metrics.installs ? (
              <Chip icon={<Download className="h-3 w-3" />}>
                {app.metrics.installs} installs
              </Chip>
            ) : null}
            {app.metrics.rating ? (
              <Chip icon={<Star className="h-3 w-3 fill-current" />}>
                {app.metrics.rating.toFixed(1)} on Google Play
              </Chip>
            ) : null}
            <Chip>{app.packageName}</Chip>
          </div>

          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            {app.description}
          </p>

          <ul className="mt-5 space-y-2.5">
            {app.contributions.map((contribution) => (
              <li
                key={contribution}
                className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
              >
                <CircleCheck
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: `rgb(${app.accentRgb})` }}
                />
                {contribution}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {app.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          <div className="mt-7">
            <PlayStoreButton href={app.playStoreUrl} label={`Get ${app.name} on Google Play`} />
          </div>
        </div>

        <div className="min-w-0">
          <AppScreenshotGallery
            appName={app.name}
            screenshots={app.screenshots}
            accentRgb={app.accentRgb}
          />
        </div>
      </div>
    </article>
  );
}
