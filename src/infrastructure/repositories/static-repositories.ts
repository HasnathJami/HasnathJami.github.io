/**
 * Adapters — static, build-time implementations of the domain ports.
 *
 * The content lives in `infrastructure/content` and is bundled at build time,
 * so every read resolves immediately. Swapping in a CMS or the GitHub REST API
 * later means replacing this file and nothing else.
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
import type {
  AppRepository,
  CodeProjectRepository,
  CredentialRepository,
  ExperienceRepository,
  ProfileRepository,
  SkillRepository,
} from "@/domain/repositories";

import { APPS } from "../content/apps.content";
import {
  AWARDS,
  COMPETITIVE_RECORD,
  EDUCATION,
} from "../content/credentials.content";
import { EXPERIENCES } from "../content/experience.content";
import { PROFILE } from "../content/profile.content";
import { CODE_PROJECTS } from "../content/projects.content";
import {
  LANGUAGE_PROFICIENCIES,
  SKILL_GROUPS,
  TOOLING_GROUPS,
} from "../content/skills.content";

export class StaticProfileRepository implements ProfileRepository {
  async getProfile(): Promise<Profile> {
    return PROFILE;
  }
}

export class StaticExperienceRepository implements ExperienceRepository {
  async listExperiences(): Promise<readonly Experience[]> {
    return EXPERIENCES;
  }
}

export class StaticAppRepository implements AppRepository {
  async listApps(): Promise<readonly AppProduct[]> {
    return APPS;
  }

  async findBySlug(slug: string): Promise<AppProduct | null> {
    return APPS.find((app) => app.slug === slug) ?? null;
  }
}

export class StaticCodeProjectRepository implements CodeProjectRepository {
  async listProjects(): Promise<readonly CodeProject[]> {
    return CODE_PROJECTS;
  }
}

export class StaticSkillRepository implements SkillRepository {
  async listSkillGroups(): Promise<readonly SkillGroup[]> {
    return SKILL_GROUPS;
  }

  async listLanguageProficiencies(): Promise<readonly LanguageProficiency[]> {
    return LANGUAGE_PROFICIENCIES;
  }

  async listToolingGroups(): Promise<readonly ToolingGroup[]> {
    return TOOLING_GROUPS;
  }
}

export class StaticCredentialRepository implements CredentialRepository {
  async listEducation(): Promise<readonly Education[]> {
    return EDUCATION;
  }

  async listAwards(): Promise<readonly Award[]> {
    return AWARDS;
  }

  async getCompetitiveRecord(): Promise<CompetitiveRecord> {
    return COMPETITIVE_RECORD;
  }
}
