/** Domain entities: formal education, awards and competitive-programming record. */

export interface Education {
  readonly id: string;
  readonly degree: string;
  readonly field: string;
  readonly institution: string;
  readonly period: string;
  readonly result: string;
}

export type AwardKind = "award" | "milestone";

export interface Award {
  readonly id: string;
  readonly kind: AwardKind;
  readonly title: string;
  readonly issuer: string;
  readonly period: string;
  readonly description: string;
}

export interface JudgeProfile {
  readonly name: string;
  readonly url: string;
}

export interface CompetitiveRecord {
  readonly solvedCount: number;
  readonly summary: string;
  readonly judges: readonly JudgeProfile[];
}
