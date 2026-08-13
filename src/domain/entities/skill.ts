/** Domain entity: technical capability, grouped for presentation. */

export type SkillGroupId =
  | "mobile"
  | "cross-platform"
  | "architecture"
  | "async-data"
  | "backend"
  | "quality";

export interface SkillGroup {
  readonly id: SkillGroupId;
  readonly title: string;
  readonly summary: string;
  readonly skills: readonly string[];
}

export type ProficiencyLevel = "intermediate" | "comfortable" | "familiar";

export interface LanguageProficiency {
  readonly level: ProficiencyLevel;
  readonly label: string;
  readonly languages: readonly string[];
}

export interface ToolingGroup {
  readonly title: string;
  readonly items: readonly string[];
}
