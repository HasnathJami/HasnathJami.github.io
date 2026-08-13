import type {
  LanguageProficiency,
  SkillGroup,
  ToolingGroup,
} from "@/domain/entities/skill";
import type { SkillRepository } from "@/domain/repositories";

export interface SkillMatrix {
  readonly groups: readonly SkillGroup[];
  readonly languages: readonly LanguageProficiency[];
  readonly tooling: readonly ToolingGroup[];
}

export class GetSkillMatrix {
  constructor(private readonly skills: SkillRepository) {}

  async execute(): Promise<SkillMatrix> {
    const [groups, languages, tooling] = await Promise.all([
      this.skills.listSkillGroups(),
      this.skills.listLanguageProficiencies(),
      this.skills.listToolingGroups(),
    ]);

    return { groups, languages, tooling };
  }
}
