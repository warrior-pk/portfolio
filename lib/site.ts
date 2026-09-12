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

/** Hidden 18: version string carries the covert tally. */
export const VERSION = "v1.8";

export interface PeriodicTile {
  symbol: string;
  /** Latest version of the stack item — verified 2026-09-12, re-check on touch. */
  version: string;
  name: string;
}

/** Stack renders exclusively as Periodic tiles (symbol + version). */
export const PERIODIC_TILES: PeriodicTile[] = [
  { symbol: "Ts", version: "5.9", name: "TypeScript" },
  { symbol: "Re", version: "19", name: "React" },
  { symbol: "Nx", version: "16", name: "Next.js" },
  { symbol: "No", version: "26", name: "Node" },
  { symbol: "Ta", version: "4", name: "Tailwind" },
  { symbol: "Mo", version: "13", name: "Motion" },
  { symbol: "Pg", version: "18", name: "Postgres" },
  { symbol: "Bu", version: "1.4", name: "Bun" },
];

export interface ContactLink {
  label: string;
  href: string;
  /** placeholder hrefs acceptable only where clearly marked */
  placeholder: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  // hrefs provisional — final URLs pending
  { label: "email", href: "mailto:hello@example.com", placeholder: true },
  { label: "github", href: "https://github.com/", placeholder: true },
  { label: "linkedin", href: "https://www.linkedin.com/", placeholder: true },
  { label: "x", href: "https://x.com/", placeholder: true },
];
