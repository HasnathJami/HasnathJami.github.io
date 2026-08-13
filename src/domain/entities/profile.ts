/**
 * Domain entity: the person the portfolio is about.
 * Pure data contracts — no framework, no I/O, no UI concerns.
 */

export type SocialKind = "github" | "linkedin" | "email" | "phone" | "resume";

export interface SocialLink {
  readonly kind: SocialKind;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
}

/** A headline number used to communicate impact at a glance. */
export interface Metric {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly caption: string;
}

export interface Profile {
  readonly name: string;
  readonly shortName: string;
  readonly role: string;
  readonly headline: string;
  readonly subheadline: string;
  readonly bio: readonly string[];
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly avatarSrc: string;
  readonly resumeSrc: string;
  readonly availableForWork: boolean;
  readonly socials: readonly SocialLink[];
  readonly metrics: readonly Metric[];
}
