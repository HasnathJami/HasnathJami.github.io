import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";

import type { Profile, SocialKind } from "@/domain/entities/profile";
import { ActionLink } from "@/presentation/components/ui/action-link";
import { GitHubIcon, LinkedInIcon } from "@/presentation/components/ui/brand-icons";
import { GlowBackdrop } from "@/presentation/components/ui/glow-backdrop";
import { Reveal } from "@/presentation/components/ui/reveal";
import { SectionEyebrow } from "@/presentation/components/ui/section";

const SOCIAL_ICONS: Partial<
  Record<SocialKind, ComponentType<{ className?: string }>>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  phone: Phone,
};

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <GlowBackdrop />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Contact</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Let&apos;s build something worth installing
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              I&apos;m open to senior Android and cross-platform roles, contract work
              and interesting product collaborations. The fastest way to reach me is
              email.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ActionLink href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                {profile.email}
              </ActionLink>
              <ActionLink href={profile.resumeSrc} variant="secondary" download>
                Download resume
              </ActionLink>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-subtle">
              <MapPin className="h-4 w-4" />
              {profile.location} · Open to remote and relocation
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.kind];

              return (
                <li key={social.kind}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex h-full items-center gap-4 bg-canvas p-5 transition-colors duration-200 hover:bg-surface-raised"
                  >
                    {Icon ? (
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">
                        {social.label}
                      </span>
                      <span className="block truncate text-sm text-ink-subtle">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
