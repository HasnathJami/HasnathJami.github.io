/**
 * Composition root.
 *
 * The only place where the application layer is bound to concrete adapters.
 * Presentation code imports `portfolio` and never touches infrastructure.
 */

import { GetAppShowcase } from "@/application/use-cases/get-app-showcase";
import { GetCareerTimeline } from "@/application/use-cases/get-career-timeline";
import { GetCredentials } from "@/application/use-cases/get-credentials";
import { GetOpenSourceShowcase } from "@/application/use-cases/get-open-source-showcase";
import { GetProfile } from "@/application/use-cases/get-profile";
import { GetSkillMatrix } from "@/application/use-cases/get-skill-matrix";
import {
  StaticAppRepository,
  StaticCodeProjectRepository,
  StaticCredentialRepository,
  StaticExperienceRepository,
  StaticProfileRepository,
  StaticSkillRepository,
} from "@/infrastructure/repositories/static-repositories";

const repositories = {
  profile: new StaticProfileRepository(),
  experience: new StaticExperienceRepository(),
  apps: new StaticAppRepository(),
  projects: new StaticCodeProjectRepository(),
  skills: new StaticSkillRepository(),
  credentials: new StaticCredentialRepository(),
} as const;

export const portfolio = {
  getProfile: new GetProfile(repositories.profile),
  getCareerTimeline: new GetCareerTimeline(repositories.experience),
  getAppShowcase: new GetAppShowcase(repositories.apps),
  getOpenSourceShowcase: new GetOpenSourceShowcase(repositories.projects),
  getSkillMatrix: new GetSkillMatrix(repositories.skills),
  getCredentials: new GetCredentials(repositories.credentials),
} as const;
