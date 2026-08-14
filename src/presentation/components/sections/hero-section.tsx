import { ArrowRight, Download, MapPin } from "lucide-react";
import Image from "next/image";

import type { AppProduct } from "@/domain/entities/app-product";
import type { Profile } from "@/domain/entities/profile";
import { ActionLink } from "@/presentation/components/ui/action-link";
import { GitHubIcon, LinkedInIcon } from "@/presentation/components/ui/brand-icons";
import { GlowBackdrop } from "@/presentation/components/ui/glow-backdrop";
import { Reveal } from "@/presentation/components/ui/reveal";

interface HeroSectionProps {
  profile: Profile;
  apps: readonly AppProduct[];
}

export function HeroSection({ profile, apps }: HeroSectionProps) {
  const github = profile.socials.find((social) => social.kind === "github");
  const linkedin = profile.socials.find((social) => social.kind === "linkedin");

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <GlowBackdrop />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            {profile.availableForWork ? (
              <Reveal>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  Open to senior Android &amp; mobile roles
                </span>
              </Reveal>
            ) : null}

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
                {profile.name.split(" ").slice(0, 2).join(" ")}
                <span className="block text-gradient">
                  {profile.name.split(" ").slice(2).join(" ")}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                {profile.headline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-subtle">
                {profile.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionLink href="#apps">
                  See my work
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </ActionLink>
                <ActionLink href={profile.resumeSrc} variant="secondary" download>
                  <Download className="h-4 w-4" />
                  Resume
                </ActionLink>

                <div className="flex items-center gap-2">
                  {github ? (
                    <a
                      href={github.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="GitHub profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
                    >
                      <GitHubIcon className="h-4 w-4" />
                    </a>
                  ) : null}
                  {linkedin ? (
                    <a
                      href={linkedin.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="LinkedIn profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink-subtle">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="justify-self-center lg:justify-self-end">
            <PortraitCard profile={profile} apps={apps} />
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {profile.metrics.map((metric) => (
              <div key={metric.id} className="bg-canvas p-6">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {metric.value}
                  </span>
                  <span className="mt-2 block text-sm font-medium text-ink">
                    {metric.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-subtle">
                    {metric.caption}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Portrait framed by the icons of the apps currently on Google Play. */
function PortraitCard({
  profile,
  apps,
}: {
  profile: Profile;
  apps: readonly AppProduct[];
}) {
  return (
    <div className="relative w-full max-w-[20rem]">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] opacity-70 blur-2xl"
        style={{
          background:
            "conic-gradient(from 140deg, var(--glow-a), var(--glow-b), var(--glow-a))",
        }}
      />
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-lift">
        <Image
          src={profile.avatarSrc}
          alt={`Portrait of ${profile.name}`}
          width={400}
          height={400}
          priority
          sizes="(max-width: 1024px) 20rem, 20rem"
          className="aspect-square w-full object-cover"
        />
        <div className="border-t border-line bg-canvas/70 px-5 py-4 backdrop-blur">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
            Currently
          </p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-ink">
            Software Engineer (Android)
          </p>
          <p className="text-sm text-ink-muted">Red.Digital — Robi Axiata</p>
        </div>
      </div>

      {/* Sized to the square portrait so the column centres on the photo and
          never runs into the "Currently" strip below it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-square">
        <ul className="pointer-events-auto absolute -left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
          {apps.slice(0, 4).map((app, index) => (
            <li
              key={app.id}
              className="animate-drift rounded-2xl border border-line bg-canvas/90 p-1.5 shadow-card backdrop-blur"
              style={{ animationDelay: `${index * -3.5}s` }}
            >
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${app.name} on Google Play`}
                className="block transition-transform duration-200 hover:scale-110"
              >
                <Image
                  src={app.iconSrc}
                  alt={`${app.name} app icon`}
                  width={40}
                  height={40}
                  className="h-9 w-9 rounded-xl"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
