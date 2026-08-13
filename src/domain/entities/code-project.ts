/** Domain entity: a public source-code repository worth showcasing. */

export type ProjectCategory =
  | "android"
  | "cross-platform"
  | "backend"
  | "engineering";

export interface CategoryDescriptor {
  readonly id: ProjectCategory;
  readonly label: string;
  readonly description: string;
}

export interface CodeProject {
  readonly id: string;
  /** Repository name exactly as it exists on GitHub. */
  readonly repo: string;
  /** Human-friendly display name. */
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly language: string;
  readonly topics: readonly string[];
  readonly stars: number;
  readonly forks: number;
  readonly category: ProjectCategory;
  /** Pinned projects lead the grid. */
  readonly featured: boolean;
}

export const PROJECT_CATEGORIES: readonly CategoryDescriptor[] = [
  {
    id: "android",
    label: "Android & Compose",
    description: "Native Kotlin apps, Jetpack Compose UI and Android libraries.",
  },
  {
    id: "cross-platform",
    label: "Cross-Platform",
    description: "Flutter and Compose Multiplatform apps sharing one codebase.",
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description: "Spring Boot and Go services, containerised and database-backed.",
  },
  {
    id: "engineering",
    label: "Engineering Craft",
    description: "Testing, algorithms and applied machine-learning work.",
  },
] as const;
