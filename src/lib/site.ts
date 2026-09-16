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
export const VERSION = "v0.5-beta";

export type Mastery = "mastered" | "learning";

/** Screen-reader and keyboard label for a tile: name, version, mastery. */
export function describeTile(tile: PeriodicTile): string {
  return `${tile.name}, version ${tile.version}, ${tile.mastery}`;
}

export interface PeriodicTile {
  symbol: string;
  /** Latest version of the stack item — verified 2026-09-16, re-check on touch. */
  version: string;
  name: string;
  mastery: Mastery;
  /** Chemistry-table column (1..18). */
  col: number;
  /** Chemistry-table row (1..3); 0 is the detached f-row for learning. */
  row: number;
}

/**
 * Stack renders as a chemistry table: families sit relatively close with no
 * names or labels (python, web, typescript, java+build, data, ops), the
 * detached f-row holds learning elements, and blank cells hold the geometry.
 */
export const PERIODIC_TILES: PeriodicTile[] = [
  { symbol: "Ht", version: "5", name: "HTML", mastery: "mastered", col: 1, row: 1 },
  { symbol: "Cs", version: "3", name: "CSS", mastery: "mastered", col: 2, row: 1 },
  { symbol: "Sa", version: "1.93", name: "Sass", mastery: "mastered", col: 11, row: 1 },
  { symbol: "Tw", version: "4.3", name: "Tailwind", mastery: "mastered", col: 12, row: 1 },
  { symbol: "Js", version: "ES25", name: "JavaScript", mastery: "mastered", col: 13, row: 1 },
  { symbol: "Re", version: "19.3", name: "React", mastery: "mastered", col: 14, row: 1 },
  { symbol: "Ts", version: "5.9", name: "TypeScript", mastery: "mastered", col: 15, row: 1 },
  { symbol: "No", version: "24", name: "Node", mastery: "mastered", col: 16, row: 1 },
  { symbol: "Ex", version: "5.1", name: "Express", mastery: "mastered", col: 17, row: 1 },
  { symbol: "Nx", version: "16.3", name: "Next.js", mastery: "mastered", col: 18, row: 1 },
  { symbol: "Py", version: "3.14", name: "Python", mastery: "mastered", col: 4, row: 2 },
  { symbol: "Fa", version: "0.121", name: "FastAPI", mastery: "mastered", col: 5, row: 2 },
  { symbol: "Ja", version: "25", name: "Java", mastery: "mastered", col: 6, row: 2 },
  { symbol: "Sb", version: "4.0", name: "Spring Boot", mastery: "mastered", col: 7, row: 2 },
  { symbol: "Mv", version: "3.9", name: "Maven", mastery: "mastered", col: 8, row: 2 },
  { symbol: "Qt", version: "6.9", name: "Qt", mastery: "mastered", col: 9, row: 2 },
  { symbol: "Mo", version: "8.0", name: "MongoDB", mastery: "mastered", col: 10, row: 2 },
  { symbol: "Rd", version: "8.0", name: "Redis", mastery: "mastered", col: 11, row: 2 },
  { symbol: "My", version: "9.0", name: "MySQL", mastery: "mastered", col: 12, row: 2 },
  { symbol: "Dk", version: "28.0", name: "Docker", mastery: "mastered", col: 4, row: 3 },
  { symbol: "Lx", version: "6.14", name: "Linux", mastery: "mastered", col: 5, row: 3 },
  { symbol: "Ng", version: "1.29", name: "Nginx", mastery: "mastered", col: 6, row: 3 },
  { symbol: "St", version: "1.49", name: "Streamlit", mastery: "learning", col: 4, row: 0 },
  { symbol: "Kb", version: "1.34", name: "Kubernetes", mastery: "learning", col: 5, row: 0 },
  { symbol: "Pg", version: "17", name: "PostgreSQL", mastery: "learning", col: 6, row: 0 },
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
