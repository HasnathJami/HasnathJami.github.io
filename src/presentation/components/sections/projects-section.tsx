import { ArrowUpRight } from "lucide-react";

import type { OpenSourceShowcase } from "@/application/use-cases/get-open-source-showcase";
import { GitHubIcon } from "@/presentation/components/ui/brand-icons";
import { Section } from "@/presentation/components/ui/section";
import { GITHUB_PROFILE } from "@/infrastructure/content/projects.content";

import { ProjectsExplorer } from "./projects-explorer";

export function ProjectsSection({ showcase }: { showcase: OpenSourceShowcase }) {
  return (
    <Section
      id="open-source"
      eyebrow="Open Source"
      title="Code I write in the open"
      description={`${GITHUB_PROFILE.originalRepos} original public repositories — Android and Compose apps, cross-platform experiments, backend services and the fundamentals I keep sharp.`}
      action={
        <a
          href={GITHUB_PROFILE.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
        >
          <GitHubIcon className="h-4 w-4" />
          @{GITHUB_PROFILE.username}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      }
    >
      <ProjectsExplorer
        projects={showcase.projects}
        categories={showcase.categories}
      />
    </Section>
  );
}
