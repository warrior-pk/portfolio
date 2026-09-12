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
  index: string;
  name: string;
}

/** Stack renders exclusively as Periodic tiles (symbol + index). */
export const PERIODIC_TILES: PeriodicTile[] = [
  { symbol: "Ts", index: "01", name: "TypeScript" },
  { symbol: "Re", index: "02", name: "React" },
  { symbol: "Nx", index: "03", name: "Next.js" },
  { symbol: "No", index: "04", name: "Node" },
  { symbol: "Ta", index: "05", name: "Tailwind" },
  { symbol: "Mo", index: "06", name: "Motion" },
  { symbol: "Pg", index: "07", name: "Postgres" },
  { symbol: "Bu", index: "08", name: "Bun" },
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
