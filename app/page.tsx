import { HeroSection } from "@/components/HeroSection";
import { AboutSection, StackSection } from "@/components/IdentitySections";
import { ContactFooter, ProjectsShelf } from "@/components/ClosingSections";

/** Single route: masthead + hero, about/stack ledger pair, shelf, contact. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="grid border-b border-(--color-hairline) md:grid-cols-2">
        <AboutSection />
        <StackSection />
      </div>
      <ProjectsShelf />
      <ContactFooter />
    </>
  );
}
