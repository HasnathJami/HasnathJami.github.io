import type { Experience } from "@/domain/entities/experience";
import type { ExperienceRepository } from "@/domain/repositories";

/** Returns roles newest-first, which is how a timeline should read. */
export class GetCareerTimeline {
  constructor(private readonly experiences: ExperienceRepository) {}

  async execute(): Promise<readonly Experience[]> {
    const roles = await this.experiences.listExperiences();

    return [...roles].sort((a, b) => b.period.start.localeCompare(a.period.start));
  }
}
