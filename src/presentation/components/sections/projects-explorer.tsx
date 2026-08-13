"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { useMemo, useState } from "react";

import type {
  CategoryDescriptor,
  CodeProject,
  ProjectCategory,
} from "@/domain/entities/code-project";
import { Chip } from "@/presentation/components/ui/chip";
import { cn } from "@/shared/utils/cn";

/** GitHub's language colours, for the dot on each card. */
const LANGUAGE_COLOURS: Record<string, string> = {
  Kotlin: "#a97bff",
  Java: "#b07219",
  Dart: "#00b4ab",
  Go: "#00add8",
  "Jupyter Notebook": "#da5b0b",
  TypeScript: "#3178c6",
};

type Filter = ProjectCategory | "all";

interface ProjectsExplorerProps {
  projects: readonly CodeProject[];
  categories: readonly CategoryDescriptor[];
}

export function ProjectsExplorer({ projects, categories }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects],
  );

  const counts = useMemo(() => {
    const tally = new Map<Filter, number>([["all", projects.length]]);
    for (const project of projects) {
      tally.set(project.category, (tally.get(project.category) ?? 0) + 1);
    }
    return tally;
  }, [projects]);

  const activeCategory = categories.find((category) => category.id === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <FilterTab
          active={filter === "all"}
          count={counts.get("all") ?? 0}
          onClick={() => setFilter("all")}
        >
          All projects
        </FilterTab>
        {categories.map((category) => (
          <FilterTab
            key={category.id}
            active={filter === category.id}
            count={counts.get(category.id) ?? 0}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </FilterTab>
        ))}
      </div>

      <p className="mt-4 min-h-[1.25rem] text-sm text-ink-subtle">
        {activeCategory?.description ??
          "Selected repositories from 84 public projects on GitHub."}
      </p>

      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function FilterTab({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "border-transparent bg-accent text-accent-on"
          : "border-line bg-surface text-ink-muted hover:border-accent-line hover:text-ink",
      )}
    >
      {children}
      <span className={cn("font-mono text-xs", active ? "opacity-70" : "text-ink-subtle")}>
        {count}
      </span>
    </button>
  );
}

function ProjectCard({ project }: { project: CodeProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-ink">
          {project.title}
        </h3>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.topics.slice(0, 4).map((topic) => (
          <Chip key={topic} className="px-2 py-0.5 text-[0.7rem]">
            {topic}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5 text-xs text-ink-subtle">
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: LANGUAGE_COLOURS[project.language] ?? "#8b8b95" }}
          />
          {project.language}
        </span>
        {project.stars > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {project.stars}
          </span>
        ) : null}
        {project.forks > 0 ? (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {project.forks}
          </span>
        ) : null}
        <span className="ml-auto truncate font-mono text-[0.7rem] opacity-70">
          {project.repo}
        </span>
      </div>
    </a>
  );
}
