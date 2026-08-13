import { ArrowUpRight, Building2, Calendar, MapPin } from "lucide-react";

import type { Experience } from "@/domain/entities/experience";
import { isCurrentRole } from "@/domain/entities/experience";
import { Chip } from "@/presentation/components/ui/chip";
import { Reveal } from "@/presentation/components/ui/reveal";
import { Section } from "@/presentation/components/ui/section";

export function ExperienceSection({
  experiences,
}: {
  experiences: readonly Experience[];
}) {
  return (
    <Section
      id="work"
      eyebrow="Experience"
      title="Four years of shipping production Android"
      description="Enterprise apps, telecom-scale streaming and field-force tooling — always with an eye on the architecture that has to survive the next feature."
    >
      <ol className="relative space-y-6">
        {/* Timeline spine — decorative only, hidden on small screens. */}
        <span
          aria-hidden
          className="absolute left-[7px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-line md:block"
        />

        {experiences.map((experience, index) => (
          <Reveal as="li" key={experience.id} delay={index * 0.08} className="relative md:pl-10">
            <span
              aria-hidden
              className="absolute left-0 top-8 hidden h-3.5 w-3.5 rounded-full border-2 border-canvas bg-accent md:block"
            />
            <ExperienceCard experience={experience} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const current = isCurrentRole(experience);

  return (
    <article className="rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {experience.role}
            </h3>
            {current ? <Chip tone="signal">Current</Chip> : null}
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
            <Building2 className="h-4 w-4 shrink-0" />
            {experience.companyUrl ? (
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-ink transition-colors hover:text-accent"
              >
                {experience.company}
              </a>
            ) : (
              <span className="font-medium text-ink">{experience.company}</span>
            )}
            {experience.companyNote ? (
              <span className="text-ink-subtle">· {experience.companyNote}</span>
            ) : null}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-1.5 text-sm text-ink-subtle sm:items-end">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {experience.period.display}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {experience.location}
          </span>
        </div>
      </div>

      <p className="mt-5 text-base leading-relaxed text-ink-muted">
        {experience.summary}
      </p>

      <ul className="mt-6 space-y-3">
        {experience.achievements.map((achievement) => (
          <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
            <span
              aria-hidden
              className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            {achievement}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {experience.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
          Products shipped
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {experience.products.map((product) => (
            <li key={product.name}>
              {product.url ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-accent-on"
                >
                  {product.name}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <Chip>{product.name}</Chip>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
