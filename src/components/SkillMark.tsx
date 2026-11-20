import {
  AwsEc2,
  AwsEcs,
  AwsEks,
  AwsLambda,
  AwsS3,
  Bun,
  CloudinaryIcon,
  Css3Icon,
  DockerIcon,
  Elasticsearch,
  FastapiIcon,
  Grafana,
  GitIcon,
  Hibernate,
  Html5,
  Java,
  Javascript,
  Kubernetes,
  LanggraphIcon,
  Langsmith,
  MongodbIcon,
  Nginx,
  NextjsIcon,
  NodejsIcon,
  OpentelemetryIcon,
  Prisma,
  Prometheus,
  Python,
  ShadcnUi,
  SqliteIcon,
  SpringIcon,
  Streamlit,
  Swagger,
  SupabaseIcon,
  TailwindIcon,
  TypescriptIcon,
  Uv,
  Zod,
  _React,
} from "@dev.icons/react/mono";
import {
  siApachekafka,
  siApachemaven,
  siBetterauth,
  siFlyway,
  siGithubactions,
  siLangchain,
  siMongoose,
  siPino,
  siPostgresql,
  siPydantic,
  siRedis,
  siClerk,
  siSpringboot,
  siSpringsecurity,
  siSqlalchemy,
  siTanstack,
  type SimpleIcon,
} from "simple-icons";
import { Container } from "lucide-react";

type DeviconComponent = typeof Python;

const DEVICON_MARKS: Record<string, DeviconComponent> = {
  "Amazon EC2": AwsEc2,
  "Amazon ECS": AwsEcs,
  "Amazon EKS": AwsEks,
  "Amazon S3": AwsS3,
  "AWS Lambda": AwsLambda,
  Bun,
  Cloudinary: CloudinaryIcon,
  CSS: Css3Icon,
  Docker: DockerIcon,
  Elasticsearch,
  FastAPI: FastapiIcon,
  Git: GitIcon,
  Grafana,
  Hibernate,
  HTML: Html5,
  Java,
  JavaScript: Javascript,
  Kubernetes,
  LangGraph: LanggraphIcon,
  LangSmith: Langsmith,
  Nginx,
  "Next.js": NextjsIcon,
  "Node.js": NodejsIcon,
  OpenTelemetry: OpentelemetryIcon,
  Prisma,
  Prometheus,
  Python,
  React: _React,
  "shadcn/ui": ShadcnUi,
  "Spring Web": SpringIcon,
  MongoDB: MongodbIcon,
  Streamlit,
  Swagger,
  Supabase: SupabaseIcon,
  "Tailwind CSS": TailwindIcon,
  TypeScript: TypescriptIcon,
  SQLite: SqliteIcon,
  uv: Uv,
  Zod,
};

const SIMPLE_ICON_MARKS: Record<string, SimpleIcon> = {
  Kafka: siApachekafka,
  "Better Auth": siBetterauth,
  Clerk: siClerk,
  Flyway: siFlyway,
  "GitHub Actions": siGithubactions,
  "LangChain": siLangchain,
  "Maven": siApachemaven,
  "Mongoose": siMongoose,
  "Pino": siPino,
  "PostgreSQL": siPostgresql,
  "Pydantic": siPydantic,
  "Redis": siRedis,
  "Spring Boot": siSpringboot,
  "Spring Security": siSpringsecurity,
  "SQLAlchemy": siSqlalchemy,
  "TanStack Query": siTanstack,
};

export const SKILL_ICON_NAMES = [
  ...Object.keys(DEVICON_MARKS),
  ...Object.keys(SIMPLE_ICON_MARKS),
  "Amazon ECR",
] as const;

export function hasSkillMark(name: string): boolean {
  return name === "Amazon ECR" || name in DEVICON_MARKS || name in SIMPLE_ICON_MARKS;
}

export function SkillMark({ name, symbol }: { name: string; symbol: string }) {
  if (name === "Amazon ECR") {
    return (
      <Container
        className="element-icon"
        aria-hidden="true"
        focusable="false"
        strokeWidth={1.75}
      />
    );
  }

  const Devicon = DEVICON_MARKS[name];
  if (Devicon) {
    return (
      <Devicon
        className={name === "Clerk" ? "element-icon element-icon--small" : "element-icon"}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  const simpleIcon = SIMPLE_ICON_MARKS[name];
  if (simpleIcon) {
    return (
      <svg
        className={name === "Clerk" ? "element-icon element-icon--small" : "element-icon"}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d={simpleIcon.path} />
      </svg>
    );
  }

  return <span className="element-symbol">{symbol}</span>;
}
