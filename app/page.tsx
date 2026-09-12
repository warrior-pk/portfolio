import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection, StackSection } from "@/components/IdentitySections";
import { ContactFooter, ProjectsShelf } from "@/components/ClosingSections";
// PROTOTYPE — throwaway wiring (sub-shape A): three variants of this route via
// `?variant=A|B|C`, `?variant=prod` for production. Dev-only bar; prod builds
// always render production. Remove host + components/prototype-home on capture.
import { PrototypeHomeHost } from "@/components/prototype-home/PrototypeHomeHost";

/** Single route: five Sections in fixed order. */
export default function Home() {
  return (
    <Suspense>
      <PrototypeHomeHost>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsShelf />
        <ContactFooter />
      </PrototypeHomeHost>
    </Suspense>
  );
}
