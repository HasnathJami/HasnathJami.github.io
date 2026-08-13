import type { AppProduct } from "@/domain/entities/app-product";
import { isProfessional } from "@/domain/entities/app-product";
import type { AppRepository } from "@/domain/repositories";

export interface AppShowcase {
  readonly all: readonly AppProduct[];
  readonly professional: readonly AppProduct[];
  readonly personal: readonly AppProduct[];
  readonly totalScreenshots: number;
}

/** Splits shipped apps into work and personal tracks for the portfolio grid. */
export class GetAppShowcase {
  constructor(private readonly apps: AppRepository) {}

  async execute(): Promise<AppShowcase> {
    const all = await this.apps.listApps();

    return {
      all,
      professional: all.filter(isProfessional),
      personal: all.filter((app) => !isProfessional(app)),
      totalScreenshots: all.reduce(
        (count, app) => count + app.screenshots.length,
        0,
      ),
    };
  }
}
