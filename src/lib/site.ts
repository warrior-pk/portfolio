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
export const VERSION = "v0.9";

export type Mastery = "mastered" | "learning";

export type SkillFamily =
  | "Javascript(frontend)"
  | "Typescript(backend)"
  | "Java"
  | "Python"
  | "Database"
  | "Devops"
  | "Cloud"
  | "Monitoring"
  | "Performance";

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

/** Reserved f-block capacity for skills not yet added to the portfolio. */
export const FUTURE_SLOTS: FutureSlot[] = [
  { f: 1, col: 7 },
  { f: 1, col: 15 },
  { f: 2, col: 9 },
  { f: 2, col: 13 },
  { f: 2, col: 14 },
  { f: 2, col: 15 },
];

/**
 * True void in the main frame: like the reference table, period 1 holds
 * only its two edge elements, and periods 2-3 hold only the outer
 * columns, so the middle columns render no cell at all.
 */
export function isTableVoid(row: number, col: number): boolean {
  if (row === 1) return col >= 2 && col <= 17;
  return row >= 2 && row <= 3 && col >= 3 && col <= 12;
}

/** Screen-reader and keyboard label for a tile: name, version, mastery. */
export function describeTile(tile: PeriodicTile): string {
  const details = [tile.name, `${BLOCK_LABELS[tile.block]} block`];
  if (tile.version) details.push(`version ${tile.version}`);
  if (tile.yoe) details.push(`${tile.yoe} experience`);
  details.push(tile.mastery);
  return details.join(", ");
}

export interface PeriodicTile {
  symbol: string;
  /** Version and experience stay optional so unconfirmed details are not invented. */
  version?: string;
  name: string;
  family: SkillFamily;
  /** Optional short description for the hover card. */
  blurb?: string;
  /** Years of experience, when the user has supplied or confirmed them. */
  yoe?: string;
  mastery: Mastery;
  /** Skill family. Learning tiles stay grouped with their family. */
  block: SkillBlock;
  /** Chemistry-table column (1..18). */
  col: number;
  /** Chemistry-table row (1..7); 0 is the detached f-block. */
  row: number;
  /** F-block row (1..2), only for detached f-block tiles. */
  frow?: number;
}

export type SkillBlock = "S" | "P" | "D" | "F";

export const BLOCK_LABELS: Record<SkillBlock, string> = {
  S: "Python",
  P: "Java",
  D: "JavaScript / TypeScript",
  F: "DevOps / databases",
};

type TileSeed = Omit<PeriodicTile, "mastery"> & { mastery?: Mastery };
const tile = (seed: TileSeed): PeriodicTile => ({ mastery: "mastered", ...seed });

/**
 * Skills follow the user's custom block taxonomy. Learning items retain
 * their source block while using P's group-18 column as a shared status lane.
 * The detached f-block contains DevOps, data, cloud, and observability tools.
 */
export const PERIODIC_TILES: PeriodicTile[] = [
  // S block — Python ecosystem, including its learning items.
  tile({ symbol: "Py", name: "Python", family: "Python", block: "S", row: 1, col: 1, version: "3.14", yoe: "1y" }),
  tile({ symbol: "Fa", name: "FastAPI", family: "Python", block: "S", row: 2, col: 1, version: "0.121", yoe: "1y" }),
  tile({ symbol: "Al", name: "SQLAlchemy", family: "Python", block: "S", row: 2, col: 2 }),
  tile({ symbol: "Uv", name: "uv", family: "Python", block: "S", row: 3, col: 1 }),
  tile({ symbol: "Pd", name: "Pydantic", family: "Python", block: "S", row: 3, col: 2 }),
  tile({ symbol: "Lc", name: "LangChain", family: "Python", block: "S", row: 4, col: 1, mastery: "learning" }),
  tile({ symbol: "Lg", name: "LangGraph", family: "Python", block: "S", row: 4, col: 2, mastery: "learning" }),
  tile({ symbol: "Ls", name: "LangSmith", family: "Python", block: "S", row: 5, col: 1, mastery: "learning" }),
  tile({ symbol: "St", name: "Streamlit", family: "Python", block: "S", row: 5, col: 2, version: "1.49", yoe: "1y" }),
  tile({ symbol: "Sg", name: "Swagger", family: "Python", block: "S", row: 6, col: 1 }),

  // P block — Java ecosystem.
  tile({ symbol: "Ja", name: "Java", family: "Java", block: "P", row: 1, col: 18, version: "25", yoe: "1y" }),
  tile({ symbol: "Sb", name: "Spring Boot", family: "Java", block: "P", row: 2, col: 18, version: "4.0", yoe: "1y" }),
  tile({ symbol: "Gw", name: "Spring API Gateway", family: "Java", block: "P", row: 2, col: 14 }),
  tile({ symbol: "Ss", name: "Spring Security", family: "Java", block: "P", row: 2, col: 15 }),
  tile({ symbol: "Eu", name: "Eureka", family: "Java", block: "P", row: 2, col: 16 }),
  tile({ symbol: "Cf", name: "Config Server", family: "Java", block: "P", row: 2, col: 17 }),
  tile({ symbol: "Sw", name: "Spring Web", family: "Java", block: "P", row: 3, col: 13 }),
  tile({ symbol: "Fy", name: "Flyway", family: "Java", block: "P", row: 3, col: 14 }),
  tile({ symbol: "Hb", name: "Hibernate", family: "Java", block: "P", row: 3, col: 15 }),
  tile({ symbol: "R4", name: "Resilience4j", family: "Java", block: "P", row: 3, col: 16 }),
  tile({ symbol: "Lo", name: "Lombok", family: "Java", block: "P", row: 3, col: 17 }),
  tile({ symbol: "L4", name: "Log4j", family: "Java", block: "P", row: 4, col: 14 }),
  tile({ symbol: "AI", name: "Spring AI", family: "Java", block: "P", row: 4, col: 15 }),
  tile({ symbol: "Mv", name: "Maven", family: "Java", block: "P", row: 4, col: 16, version: "3.9", yoe: "1y" }),
  tile({ symbol: "Ng", name: "Nginx", family: "Performance", block: "P", row: 6, col: 17, version: "1.29", yoe: "1y" }),
  tile({ symbol: "Kf", name: "Kafka", family: "Performance", block: "P", row: 6, col: 18 }),

  // D block — JavaScript and TypeScript, frontend and backend.
  tile({ symbol: "Js", name: "JavaScript", family: "Javascript(frontend)", block: "D", row: 4, col: 4, version: "ES25", yoe: "3y" }),
  tile({ symbol: "Ts", name: "TypeScript", family: "Typescript(backend)", block: "D", row: 4, col: 9, version: "5.9", yoe: "3y" }),
  tile({ symbol: "Ht", name: "HTML", family: "Javascript(frontend)", block: "D", row: 4, col: 5, version: "5", yoe: "3y" }),
  tile({ symbol: "Cs", name: "CSS", family: "Javascript(frontend)", block: "D", row: 4, col: 6, version: "3", yoe: "3y" }),
  tile({ symbol: "Tw", name: "Tailwind CSS", family: "Javascript(frontend)", block: "D", row: 4, col: 7, version: "4.3", yoe: "3y" }),
  tile({ symbol: "Re", name: "React", family: "Javascript(frontend)", block: "D", row: 5, col: 5, version: "19.3", yoe: "3y" }),
  tile({ symbol: "Nx", name: "Next.js", family: "Javascript(frontend)", block: "D", row: 5, col: 4, version: "16.3", yoe: "3y" }),
  tile({ symbol: "Sh", name: "shadcn/ui", family: "Javascript(frontend)", block: "D", row: 6, col: 5 }),
  tile({ symbol: "Zu", name: "Zustand", family: "Javascript(frontend)", block: "D", row: 5, col: 6 }),
  tile({ symbol: "No", name: "Node.js", family: "Typescript(backend)", block: "D", row: 4, col: 10, version: "24", yoe: "3y" }),
  tile({ symbol: "Bu", name: "Bun", family: "Typescript(backend)", block: "D", row: 4, col: 11 }),
  tile({ symbol: "Ex", name: "Express", family: "Typescript(backend)", block: "D", row: 4, col: 12, version: "5.1", yoe: "3y" }),
  tile({ symbol: "Ba", name: "Better Auth", family: "Typescript(backend)", block: "D", row: 5, col: 9 }),
  tile({ symbol: "Zd", name: "Zod", family: "Typescript(backend)", block: "D", row: 5, col: 10 }),
  tile({ symbol: "By", name: "bcrypt", family: "Typescript(backend)", block: "D", row: 5, col: 11 }),
  tile({ symbol: "Ck", name: "Clerk", family: "Typescript(backend)", block: "D", row: 5, col: 12 }),
  tile({ symbol: "Pi", name: "Pino", family: "Typescript(backend)", block: "D", row: 6, col: 9 }),
  tile({ symbol: "Mu", name: "Multer", family: "Typescript(backend)", block: "D", row: 6, col: 10 }),
  tile({ symbol: "Pr", name: "Prisma", family: "Typescript(backend)", block: "D", row: 6, col: 11 }),
  tile({ symbol: "Mg", name: "Mongoose", family: "Typescript(backend)", block: "D", row: 6, col: 12 }),
  tile({ symbol: "Tq", name: "TanStack Query", family: "Javascript(frontend)", block: "D", row: 5, col: 7 }),

  // F block — DevOps and databases, then cloud platforms and observability.
  tile({ symbol: "Gt", name: "Git", family: "Devops", block: "F", row: 0, frow: 1, col: 1 }),
  tile({ symbol: "Dk", name: "Docker", family: "Devops", block: "F", row: 0, frow: 1, col: 2, version: "28.0", yoe: "1y" }),
  tile({ symbol: "Gh", name: "GitHub Actions", family: "Devops", block: "F", row: 0, frow: 1, col: 4 }),
  tile({ symbol: "Mo", name: "MongoDB", family: "Database", block: "F", row: 0, frow: 1, col: 8, version: "8.0", yoe: "1y" }),
  tile({ symbol: "Pv", name: "pgvector", family: "Database", block: "F", row: 0, frow: 1, col: 9 }),
  tile({ symbol: "Es", name: "Elasticsearch", family: "Database", block: "F", row: 0, frow: 1, col: 10 }),
  tile({ symbol: "Rd", name: "Redis", family: "Database", block: "F", row: 0, frow: 1, col: 11, version: "8.0", yoe: "1y" }),
  tile({ symbol: "Sq", name: "SQLite", family: "Database", block: "F", row: 0, frow: 1, col: 12 }),
  tile({ symbol: "Su", name: "Supabase", family: "Database", block: "F", row: 0, frow: 1, col: 13 }),

  tile({ symbol: "Cy", name: "Cloudinary", family: "Cloud", block: "F", row: 0, frow: 2, col: 1 }),
  tile({ symbol: "Im", name: "ImageKit", family: "Cloud", block: "F", row: 0, frow: 2, col: 2 }),
  tile({ symbol: "S3", name: "Amazon S3", family: "Cloud", block: "F", row: 0, frow: 2, col: 3 }),
  tile({ symbol: "E2", name: "Amazon EC2", family: "Cloud", block: "F", row: 0, frow: 2, col: 4 }),
  tile({ symbol: "La", name: "AWS Lambda", family: "Cloud", block: "F", row: 0, frow: 2, col: 5 }),
  tile({ symbol: "Ec", name: "Amazon ECR", family: "Cloud", block: "F", row: 0, frow: 2, col: 6 }),
  tile({ symbol: "En", name: "Amazon ECS", family: "Cloud", block: "F", row: 0, frow: 2, col: 7 }),
  tile({ symbol: "Ek", name: "Amazon EKS", family: "Cloud", block: "F", row: 0, frow: 2, col: 8 }),
  tile({ symbol: "Ot", name: "OpenTelemetry", family: "Monitoring", block: "F", row: 0, frow: 2, col: 10 }),
  tile({ symbol: "Pm", name: "Prometheus", family: "Monitoring", block: "F", row: 0, frow: 2, col: 11 }),
  tile({ symbol: "Gr", name: "Grafana", family: "Monitoring", block: "F", row: 0, frow: 2, col: 12 }),
  tile({ symbol: "Pg", name: "PostgreSQL", family: "Database", block: "F", row: 0, frow: 1, col: 14, version: "17", yoe: "1y" }),
  tile({ symbol: "Kb", name: "Kubernetes", family: "Devops", block: "F", row: 0, frow: 1, col: 3, version: "1.34", yoe: "1y" }),
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
