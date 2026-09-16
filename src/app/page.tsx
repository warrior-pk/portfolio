import { HeroSection } from "@/components/HeroSection";
import { AboutSection, StackSection } from "@/components/IdentitySections";
import { ContactFooter, ProjectsShelf } from "@/components/ClosingSections";
import { Marquee } from "@/components/Marquee";

/** Single route: masthead + hero, marquee, about/stack ledger pair, vault, contact. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <div className="grid border-b border-(--color-hairline) md:grid-cols-2">
        <AboutSection />
        <StackSection />
      </div>
      <ProjectsShelf />
      <ContactFooter />
    </>
  );
}
