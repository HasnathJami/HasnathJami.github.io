/** Domain entity: a shipped mobile application published on Google Play. */

/** Whether the app was built at work or on personal time. */
export type AppOrigin = "professional" | "personal";

export interface Screenshot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface StoreMetrics {
  readonly installs?: string;
  readonly rating?: number;
}

export interface AppProduct {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly origin: AppOrigin;
  readonly organisation: string;
  readonly packageName: string;
  readonly playStoreUrl: string;
  readonly iconSrc: string;
  readonly screenshots: readonly Screenshot[];
  readonly stack: readonly string[];
  readonly contributions: readonly string[];
  readonly metrics: StoreMetrics;
  /** Brand accent as an `R G B` triplet, consumed by CSS `rgb()`. */
  readonly accentRgb: string;
}

export const isProfessional = (app: AppProduct): boolean =>
  app.origin === "professional";
