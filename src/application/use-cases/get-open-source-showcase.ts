import type {
  CategoryDescriptor,
  CodeProject,
  ProjectCategory,
} from "@/domain/entities/code-project";
import { PROJECT_CATEGORIES } from "@/domain/entities/code-project";
import type { CodeProjectRepository } from "@/domain/repositories";

export interface ProjectGroup {
  readonly category: CategoryDescriptor;
  readonly projects: readonly CodeProject[];
}

export interface OpenSourceShowcase {
  readonly projects: readonly CodeProject[];
  readonly groups: readonly ProjectGroup[];
  readonly categories: readonly CategoryDescriptor[];
  readonly totalStars: number;
}

/** Orders projects so pinned work leads, then groups them by category. */
export class GetOpenSourceShowcase {
  constructor(private readonly projects: CodeProjectRepository) {}

  async execute(): Promise<OpenSourceShowcase> {
    const all = await this.projects.listProjects();

    const ranked = [...all].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.stars !== b.stars) return b.stars - a.stars;
      return a.title.localeCompare(b.title);
    });

    const byCategory = (category: ProjectCategory) =>
      ranked.filter((project) => project.category === category);

    return {
      projects: ranked,
      categories: PROJECT_CATEGORIES,
      groups: PROJECT_CATEGORIES.map((category) => ({
        category,
        projects: byCategory(category.id),
      })),
      totalStars: ranked.reduce((sum, project) => sum + project.stars, 0),
    };
  }
}
