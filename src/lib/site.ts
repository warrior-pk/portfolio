/** Site-wide content contracts. Glossary terms in identifiers where natural. */

export interface SiteSection {
  index: string;
  id: "hero" | "about" | "stack" | "projects" | "contact";
  label: string;
}

export const SECTIONS: SiteSection[] = [
  { index: "01", id: "hero", label: "hero" },
  { index: "02", id: "about", label: "about" },
  { index: "03", id: "stack", label: "stack" },
  { index: "04", id: "projects", label: "projects" },
  { index: "05", id: "contact", label: "contact" },
];

/** Site version shown in the status bar. */
export const VERSION = "v0.4-beta";

export interface PeriodicTile {
  symbol: string;
  /** Latest version of the stack item — verified 2026-09-13, re-check on touch. */
  version: string;
  name: string;
}

/** Stack renders exclusively as Periodic tiles (symbol + version). */
export const PERIODIC_TILES: PeriodicTile[] = [
  { symbol: "Ts", version: "7", name: "TypeScript" },
  { symbol: "Ja", version: "25", name: "Java" },
  { symbol: "Py", version: "3.14", name: "Python" },
  { symbol: "No", version: "26", name: "Node" },
  { symbol: "Nx", version: "16.3", name: "Next.js" },
  { symbol: "Re", version: "19.3", name: "React" },
  { symbol: "Sb", version: "4.1", name: "Spring Boot" },
];

export interface ContactLink {
  label: string;
  href: string;
  /** placeholder hrefs acceptable only where clearly marked */
  placeholder: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: "email", href: "mailto:piyu8h@outlook.com", placeholder: false },
  { label: "github", href: "https://github.com/warrior-pk", placeholder: false },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/piyu8h",
    placeholder: false,
  },
  { label: "x", href: "https://x.com/_piyu8h", placeholder: false },
];
