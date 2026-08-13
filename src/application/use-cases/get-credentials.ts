import type {
  Award,
  CompetitiveRecord,
  Education,
} from "@/domain/entities/credential";
import type { CredentialRepository } from "@/domain/repositories";

export interface Credentials {
  readonly education: readonly Education[];
  readonly awards: readonly Award[];
  readonly competitive: CompetitiveRecord;
}

export class GetCredentials {
  constructor(private readonly credentials: CredentialRepository) {}

  async execute(): Promise<Credentials> {
    const [education, awards, competitive] = await Promise.all([
      this.credentials.listEducation(),
      this.credentials.listAwards(),
      this.credentials.getCompetitiveRecord(),
    ]);

    return { education, awards, competitive };
  }
}
