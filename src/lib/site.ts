/** Site-wide content contracts. Glossary terms in identifiers where natural. */

export interface SiteSection {
  index: string;
  id: "hero" | "about" | "skills" | "projects" | "contact";
  label: string;
}

export const SECTIONS: SiteSection[] = [
  { index: "01", id: "hero", label: "hero" },
  { index: "02", id: "about", label: "about" },
  { index: "03", id: "skills", label: "skills" },
  { index: "04", id: "projects", label: "projects" },
  { index: "05", id: "contact", label: "contact" },
];

/** Site version shown in the status bar. */
export const VERSION = "v0.5-beta";

export type Mastery = "mastered" | "learning";

/** Chemistry-table frame: eighteen columns, seven periods. */
export const TABLE_COLS = 18;
export const TABLE_PERIODS = 7;
/** The detached f-block holds two rows, like lanthanides and actinides. */
export const FROW_ROWS = 2;
/** F-block rows run fifteen wide, like the lanthanide/actinide rows. */
export const FBLOCK_COLS = 15;

export interface FutureSlot {
  /** F-block row (1..2). */
  f: number;
  col: number;
}

/** Reserved f-block capacity for skills not yet started. */
export const FUTURE_SLOTS: FutureSlot[] = [
  { f: 1, col: 7 },
  { f: 1, col: 8 },
  { f: 2, col: 4 },
  { f: 2, col: 5 },
  { f: 2, col: 6 },
  { f: 2, col: 7 },
  { f: 2, col: 8 },
];

/**
 * True void in the main frame: like the reference table, rows 1-3 hold
 * only the outer columns, so the middle columns render no cell at all.
 */
export function isTableVoid(row: number, col: number): boolean {
  return row >= 1 && row <= 3 && col >= 3 && col <= 12;
}

/** Screen-reader and keyboard label for a tile: name, version, mastery. */
export function describeTile(tile: PeriodicTile): string {
  return `${tile.name}, version ${tile.version}, ${tile.yoe} experience, ${tile.mastery}`;
}

export interface PeriodicTile {
  symbol: string;
  /** Latest version of the skills item — verified 2026-09-16, re-check on touch. */
  version: string;
  name: string;
  /** Full display name for the hover card, two to five words. */
  blurb: string;
  /** Years of experience, as shown on the hover card. */
  yoe: string;
  mastery: Mastery;
  /** Chemistry-table column (1..18). */
  col: number;
  /** Chemistry-table row (1..3); 0 is the detached f-row for learning. */
  row: number;
}

/**
 * Skills renders as a chemistry table: families sit relatively close with no
 * names or labels, in four periods shaped like the reference table — a
 * short first row, two full rows, and a fourth row starting the d-block.
 * The detached f-row holds learning elements, and blank cells hold the rest
 * of the geometry.
 */
export const PERIODIC_TILES: PeriodicTile[] = [
  { symbol: "Ht", version: "5", name: "HTML", blurb: "HTML Markup Language", yoe: "3y", mastery: "mastered", col: 1, row: 1 },
  { symbol: "Nx", version: "16.3", name: "Next.js", blurb: "Next.js React Framework", yoe: "3y", mastery: "mastered", col: 18, row: 1 },
  { symbol: "Cs", version: "3", name: "CSS", blurb: "Cascading Style Sheets", yoe: "3y", mastery: "mastered", col: 1, row: 2 },
  { symbol: "Sa", version: "1.93", name: "Sass", blurb: "Sass CSS Preprocessor", yoe: "3y", mastery: "mastered", col: 2, row: 2 },
  { symbol: "Tw", version: "4.3", name: "Tailwind", blurb: "Tailwind CSS Framework", yoe: "3y", mastery: "mastered", col: 13, row: 2 },
  { symbol: "Js", version: "ES25", name: "JavaScript", blurb: "JavaScript Programming Language", yoe: "3y", mastery: "mastered", col: 14, row: 2 },
  { symbol: "Re", version: "19.3", name: "React", blurb: "React UI Library", yoe: "3y", mastery: "mastered", col: 15, row: 2 },
  { symbol: "Ts", version: "5.9", name: "TypeScript", blurb: "TypeScript Programming Language", yoe: "3y", mastery: "mastered", col: 16, row: 2 },
  { symbol: "No", version: "24", name: "Node", blurb: "Node.js JavaScript Runtime", yoe: "3y", mastery: "mastered", col: 17, row: 2 },
  { symbol: "Ex", version: "5.1", name: "Express", blurb: "Express Web Framework", yoe: "3y", mastery: "mastered", col: 18, row: 2 },
  { symbol: "Py", version: "3.14", name: "Python", blurb: "Python Programming Language", yoe: "1y", mastery: "mastered", col: 1, row: 3 },
  { symbol: "Fa", version: "0.121", name: "FastAPI", blurb: "FastAPI Python Framework", yoe: "1y", mastery: "mastered", col: 2, row: 3 },
  { symbol: "Mo", version: "8.0", name: "MongoDB", blurb: "MongoDB Document Database", yoe: "1y", mastery: "mastered", col: 13, row: 3 },
  { symbol: "Rd", version: "8.0", name: "Redis", blurb: "Redis In-Memory Store", yoe: "1y", mastery: "mastered", col: 14, row: 3 },
  { symbol: "My", version: "9.0", name: "MySQL", blurb: "MySQL Relational Database", yoe: "1y", mastery: "mastered", col: 15, row: 3 },
  { symbol: "Dk", version: "28.0", name: "Docker", blurb: "Docker Container Platform", yoe: "1y", mastery: "mastered", col: 16, row: 3 },
  { symbol: "Lx", version: "6.14", name: "Linux", blurb: "Linux Operating System", yoe: "1y", mastery: "mastered", col: 17, row: 3 },
  { symbol: "Ng", version: "1.29", name: "Nginx", blurb: "Nginx Web Server", yoe: "1y", mastery: "mastered", col: 18, row: 3 },
  { symbol: "Ja", version: "25", name: "Java", blurb: "Java Programming Language", yoe: "1y", mastery: "mastered", col: 1, row: 4 },
  { symbol: "Sb", version: "4.0", name: "Spring Boot", blurb: "Spring Boot Java Framework", yoe: "1y", mastery: "mastered", col: 2, row: 4 },
  { symbol: "Mv", version: "3.9", name: "Maven", blurb: "Maven Build Tool", yoe: "1y", mastery: "mastered", col: 4, row: 4 },
  { symbol: "Qt", version: "6.9", name: "Qt", blurb: "Qt Application Framework", yoe: "1y", mastery: "mastered", col: 5, row: 4 },
  { symbol: "St", version: "1.49", name: "Streamlit", blurb: "Streamlit Data App Framework", yoe: "1y", mastery: "learning", col: 4, row: 0 },
  { symbol: "Kb", version: "1.34", name: "Kubernetes", blurb: "Kubernetes Container Orchestration", yoe: "1y", mastery: "learning", col: 5, row: 0 },
  { symbol: "Pg", version: "17", name: "PostgreSQL", blurb: "PostgreSQL Relational Database", yoe: "1y", mastery: "learning", col: 6, row: 0 },
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
