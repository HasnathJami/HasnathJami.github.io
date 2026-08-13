/** Domain entity: a role held at a company. */

export interface Period {
  /** ISO-8601 `YYYY-MM`. */
  readonly start: string;
  /** ISO-8601 `YYYY-MM`, or `null` when the role is current. */
  readonly end: string | null;
  /** Human-readable rendering, e.g. `Apr 2023 — Present`. */
  readonly display: string;
}

export interface ShippedProduct {
  readonly name: string;
  readonly url?: string;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly companyNote?: string;
  readonly companyUrl?: string;
  readonly role: string;
  readonly location: string;
  readonly period: Period;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
  readonly products: readonly ShippedProduct[];
}

/** `true` while the role has no end date. */
export const isCurrentRole = (experience: Experience): boolean =>
  experience.period.end === null;
