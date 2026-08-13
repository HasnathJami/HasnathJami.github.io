/**
 * Ports — the contracts the domain owns and the outer layers implement.
 *
 * Everything is async so the content source can move from bundled statics to a
 * CMS or the GitHub API without touching the application or presentation layer.
 */

import type { AppProduct } from "@/domain/entities/app-product";
import type { CodeProject } from "@/domain/entities/code-project";
import type {
  Award,
  CompetitiveRecord,
  Education,
} from "@/domain/entities/credential";
import type { Experience } from "@/domain/entities/experience";
import type { Profile } from "@/domain/entities/profile";
import type {
  LanguageProficiency,
  SkillGroup,
  ToolingGroup,
} from "@/domain/entities/skill";

export interface ProfileRepository {
  getProfile(): Promise<Profile>;
}

export interface ExperienceRepository {
  listExperiences(): Promise<readonly Experience[]>;
}

export interface AppRepository {
  listApps(): Promise<readonly AppProduct[]>;
  findBySlug(slug: string): Promise<AppProduct | null>;
}

export interface CodeProjectRepository {
  listProjects(): Promise<readonly CodeProject[]>;
}

export interface SkillRepository {
  listSkillGroups(): Promise<readonly SkillGroup[]>;
  listLanguageProficiencies(): Promise<readonly LanguageProficiency[]>;
  listToolingGroups(): Promise<readonly ToolingGroup[]>;
}

export interface CredentialRepository {
  listEducation(): Promise<readonly Education[]>;
  listAwards(): Promise<readonly Award[]>;
  getCompetitiveRecord(): Promise<CompetitiveRecord>;
}
