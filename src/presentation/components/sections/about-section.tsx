import { ArrowUpRight, GraduationCap, Trophy } from "lucide-react";

import type { Credentials } from "@/application/use-cases/get-credentials";
import type { Profile } from "@/domain/entities/profile";
import { Chip } from "@/presentation/components/ui/chip";
import { Reveal } from "@/presentation/components/ui/reveal";
import { Section } from "@/presentation/components/ui/section";

interface AboutSectionProps {
  profile: Profile;
  credentials: Credentials;
}

export function AboutSection({ profile, credentials }: AboutSectionProps) {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer first, product-minded throughout"
      className="bg-canvas-alt"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="space-y-4">
              {profile.bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-6 lg:mt-auto">
              <h3 className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
                <GraduationCap className="h-4 w-4" />
                Education
              </h3>
              {credentials.education.map((education) => (
                <div key={education.id} className="mt-4">
                  <p className="text-base font-medium text-ink">
                    {education.degree} in {education.field}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {education.institution}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-ink-subtle">
                    {education.period} · {education.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
                <Trophy className="h-4 w-4" />
                Recognition
              </h3>
              <ul className="mt-5 space-y-5">
                {credentials.awards.map((award) => (
                  <li key={award.id} className="border-l-2 border-accent-line pl-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink">
                        {award.title}
                      </p>
                      <Chip tone="accent">{award.period}</Chip>
                    </div>
                    <p className="mt-1 text-xs text-ink-subtle">{award.issuer}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {award.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
                Competitive programming
              </h3>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-ink">
                {credentials.competitive.solvedCount}+
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {credentials.competitive.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {credentials.competitive.judges.map((judge) => (
                  <li key={judge.name}>
                    <a
                      href={judge.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-3 py-1 text-xs text-ink-muted transition-colors hover:border-accent-line hover:text-accent"
                    >
                      {judge.name}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
