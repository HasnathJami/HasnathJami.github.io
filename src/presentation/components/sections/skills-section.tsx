import {
  Boxes,
  Cpu,
  Layers,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";

import type { SkillMatrix } from "@/application/use-cases/get-skill-matrix";
import type { SkillGroupId } from "@/domain/entities/skill";
import { Chip } from "@/presentation/components/ui/chip";
import { Reveal } from "@/presentation/components/ui/reveal";
import { Section } from "@/presentation/components/ui/section";

const GROUP_ICONS: Record<SkillGroupId, ComponentType<{ className?: string }>> = {
  mobile: Smartphone,
  "cross-platform": Layers,
  architecture: Boxes,
  "async-data": Zap,
  backend: Terminal,
  quality: Cpu,
};

export function SkillsSection({ matrix }: { matrix: SkillMatrix }) {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="What I build with"
      description="Depth in the Android platform, breadth across cross-platform and backend — enough to own a feature from the API to the pixel."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matrix.groups.map((group, index) => {
          const Icon = GROUP_ICONS[group.id];

          return (
            <Reveal key={group.id} delay={Math.min(index * 0.05, 0.2)}>
              <article className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-subtle">
                  {group.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Chip>{skill}</Chip>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
              Languages
            </h3>
            <dl className="mt-5 space-y-5">
              {matrix.languages.map((proficiency) => (
                <div key={proficiency.level}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-accent">
                    {proficiency.label}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {proficiency.languages.map((language) => (
                      <Chip key={language}>{language}</Chip>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-subtle">
              Frameworks, databases &amp; tools
            </h3>
            <dl className="mt-5 space-y-5">
              {matrix.tooling.map((group) => (
                <div key={group.title}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-accent">
                    {group.title}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
