import { HeroSection } from "@/components/HeroSection";
import { Masthead } from "@/components/Masthead";
import { AboutSection, StackSection } from "@/components/IdentitySections";
import { ContactFooter, ProjectsShelf } from "@/components/ClosingSections";
import { Marquee } from "@/components/Marquee";

/** Single route: masthead plus five stacked full-screen SiteSections. */
export default function Home() {
  return (
    <>
      <Masthead />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <StackSection />
      <ProjectsShelf />
      <ContactFooter />
    </>
  );
}
