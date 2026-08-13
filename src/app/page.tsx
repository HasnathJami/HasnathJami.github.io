import { portfolio } from "@/di/container";
import { AboutSection } from "@/presentation/components/sections/about-section";
import { AppsSection } from "@/presentation/components/sections/apps-section";
import { ContactSection } from "@/presentation/components/sections/contact-section";
import { ExperienceSection } from "@/presentation/components/sections/experience-section";
import { HeroSection } from "@/presentation/components/sections/hero-section";
import { ProjectsSection } from "@/presentation/components/sections/projects-section";
import { SkillsSection } from "@/presentation/components/sections/skills-section";
import { TechMarquee } from "@/presentation/components/sections/tech-marquee";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { SiteHeader } from "@/presentation/components/layout/site-header";

export default async function HomePage() {
  const [profile, experiences, appShowcase, openSource, skills, credentials] =
    await Promise.all([
      portfolio.getProfile.execute(),
      portfolio.getCareerTimeline.execute(),
      portfolio.getAppShowcase.execute(),
      portfolio.getOpenSourceShowcase.execute(),
      portfolio.getSkillMatrix.execute(),
      portfolio.getCredentials.execute(),
    ]);

  return (
    <>
      <SiteHeader shortName={profile.shortName} resumeSrc={profile.resumeSrc} />

      <main id="main">
        <HeroSection profile={profile} apps={appShowcase.all} />
        <TechMarquee />
        <ExperienceSection experiences={experiences} />
        <AppsSection showcase={appShowcase} />
        <ProjectsSection showcase={openSource} />
        <SkillsSection matrix={skills} />
        <AboutSection profile={profile} credentials={credentials} />
        <ContactSection profile={profile} />
      </main>

      <SiteFooter profile={profile} />
    </>
  );
}
