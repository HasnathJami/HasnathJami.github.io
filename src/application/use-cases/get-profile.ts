import type { Profile } from "@/domain/entities/profile";
import type { ProfileRepository } from "@/domain/repositories";

export class GetProfile {
  constructor(private readonly profiles: ProfileRepository) {}

  execute(): Promise<Profile> {
    return this.profiles.getProfile();
  }
}
