import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { Masthead } from "@/components/Masthead";
import { Marquee } from "@/components/Marquee";

/**
 * Below-fold SiteSections load behind dynamic boundaries: their HTML is
 * still prerendered (static export), but their JS — including the motion
 * library used by Reveal — stays off the first-paint critical path.
 */
const AboutSection = dynamic(() =>
  import("@/components/IdentitySections").then((m) => m.AboutSection),
);
const SkillsSection = dynamic(() =>
  import("@/components/IdentitySections").then((m) => m.SkillsSection),
);
const ProjectsShelf = dynamic(() =>
  import("@/components/ClosingSections").then((m) => m.ProjectsShelf),
);
const ContactFooter = dynamic(() =>
  import("@/components/ClosingSections").then((m) => m.ContactFooter),
);

/** Single route: masthead plus five stacked full-screen SiteSections. */
export default function Home() {
  return (
    <>
      <Masthead />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <SkillsSection />
      <ProjectsShelf />
      <ContactFooter />
    </>
  );
}
