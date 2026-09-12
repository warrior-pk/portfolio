import { HeroSection } from "@/components/HeroSection";
import { AboutSection, StackSection } from "@/components/IdentitySections";
import { ContactFooter, ProjectsShelf } from "@/components/ClosingSections";

/** Single route: five Sections in fixed order. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ProjectsShelf />
      <ContactFooter />
    </>
  );
}
