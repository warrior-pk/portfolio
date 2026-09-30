import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SectionDots } from "@/components/SectionDots";
import { StatusBar } from "@/components/StatusBar";
import { TriquetraMark } from "@/components/TriquetraMark";
import { PreloaderDismiss } from "@/components/PreloaderDismiss";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const SITE_URL = "https://me.shipyu.dev";
const SITE_TITLE = "Piyush Kumar | Full-Stack Developer — React, Next.js, TypeScript";
const SITE_DESCRIPTION =
  "Piyush Kumar, full-stack software developer crafting fast, quiet interfaces with React, Next.js, TypeScript and Node.js — backed by Python, Java and Spring Boot.";
const SITE_KEYWORDS = [
  "Piyush Kumar",
  "full-stack developer",
  "software developer",
  "frontend developer",
  "backend developer",
  "React developer",
  "Next.js developer",
  "TypeScript developer",
  "Node.js developer",
  "JavaScript developer",
  "Python developer",
  "Java Spring Boot developer",
  "Tailwind CSS",
  "Prisma",
  "Drizzle ORM",
  "Mongoose",
  "TypeORM",
  "Sequelize",
  "tRPC",
  "REST API",
  "GraphQL",
  "Auth.js",
  "JWT",
  "OAuth",
  "TanStack Query",
  "Zustand",
  "Redux",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "shadcn/ui",
  "server components",
  "SSR",
  "SSG",
  "ISR",
  "microservices",
  "serverless",
  "Vercel",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Vitest",
  "Playwright",
  "WebSockets",
  "Spring Boot",
  "Spring Security",
  "Spring Data JPA",
  "Spring Cloud",
  "Hibernate",
  "Maven",
  "Gradle",
  "microservices developer",
  "API Gateway",
  "service discovery",
  "circuit breaker",
  "Resilience4j",
  "Kafka",
  "RabbitMQ",
  "gRPC",
  "system design",
  "distributed systems",
  "event-driven architecture",
  "load balancing",
  "caching strategies",
  "database sharding",
  "replication",
  "CQRS",
  "saga pattern",
  "observability",
  "Prometheus",
  "Grafana",
  "distributed tracing",
  "AWS",
  "EC2",
  "S3",
  "RDS",
  "Lambda",
  "ECS",
  "EKS",
  "Terraform",
  "Cloudflare",
  "Nginx",
  "reverse proxy",
  "Elasticsearch",
  "Flyway",
  "Liquibase",
  "JUnit",
  "Mockito",
  "Testcontainers",
  "GitHub Actions",
  "Jenkins",
  "Keycloak",
  "OAuth2",
  "AI engineer",
  "LLM",
  "GenAI",
  "RAG",
  "retrieval-augmented generation",
  "AI agents",
  "agentic workflows",
  "prompt engineering",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "vector database",
  "pgvector",
  "Pinecone",
  "Qdrant",
  "embeddings",
  "semantic search",
  "function calling",
  "tool use",
  "MCP",
  "Model Context Protocol",
  "Vercel AI SDK",
  "OpenAI",
  "Anthropic Claude",
  "Hugging Face",
  "Ollama",
  "chatbot development",
  "LLM integration",
  "model serving",
  "hire React developer",
  "hire Next.js developer",
  "hire full-stack developer",
  "portfolio",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Piyush Kumar",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Piyush Kumar", url: SITE_URL }],
  creator: "Piyush Kumar",
  publisher: "Piyush Kumar",
  category: "portfolio",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Piyush Kumar",
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Piyush Kumar portfolio hero — BUILD BREAK REPEAT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

/** Person + WebSite structured data: recruiter-facing identity for search. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Piyush Kumar",
      url: SITE_URL,
      jobTitle: "Full-Stack Software Developer",
      description: SITE_DESCRIPTION,
      email: "mailto:piyu8h@outlook.com",
      sameAs: [
        "https://github.com/warrior-pk",
        "https://www.linkedin.com/in/piyu8h",
        "https://x.com/_piyu8h",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express",
        "tRPC",
        "REST APIs",
        "GraphQL",
        "Prisma",
        "Drizzle",
        "Mongoose",
        "TypeORM",
        "Sequelize",
        "Auth.js",
        "JWT",
        "OAuth",
        "TanStack Query",
        "Zustand",
        "Framer Motion",
        "GSAP",
        "Three.js",
        "shadcn/ui",
        "Tailwind CSS",
        "SSR",
        "SSG",
        "ISR",
        "Server Components",
        "Microservices",
        "Serverless",
        "Vercel",
        "Supabase",
        "WebSockets",
        "CI/CD",
        "Vitest",
        "Playwright",
        "Python",
        "FastAPI",
        "Java",
        "Spring Boot",
        "Spring Security",
        "Spring Data JPA",
        "Spring Cloud",
        "Hibernate",
        "Maven",
        "Gradle",
        "JUnit",
        "Mockito",
        "Microservices",
        "API Gateway",
        "Service Discovery",
        "Circuit Breaker",
        "Resilience4j",
        "Kafka",
        "RabbitMQ",
        "gRPC",
        "System Design",
        "Distributed Systems",
        "Event-Driven Architecture",
        "Load Balancing",
        "Caching Strategies",
        "Database Sharding",
        "Replication",
        "CQRS",
        "Observability",
        "Prometheus",
        "Grafana",
        "Distributed Tracing",
        "AWS",
        "EC2",
        "S3",
        "RDS",
        "Lambda",
        "ECS",
        "EKS",
        "Terraform",
        "Cloudflare",
        "Elasticsearch",
        "Flyway",
        "Liquibase",
        "Testcontainers",
        "GitHub Actions",
        "Jenkins",
        "Keycloak",
        "OAuth2",
        "LLM Integration",
        "RAG Pipelines",
        "AI Agents",
        "Agentic Workflows",
        "Prompt Engineering",
        "LangChain",
        "LangGraph",
        "LlamaIndex",
        "Vector Databases",
        "pgvector",
        "Pinecone",
        "Qdrant",
        "Embeddings",
        "Semantic Search",
        "Function Calling",
        "Model Context Protocol",
        "Vercel AI SDK",
        "OpenAI API",
        "Anthropic Claude",
        "Hugging Face",
        "Ollama",
        "Chatbot Development",
        "Model Serving",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Docker",
        "Kubernetes",
        "Linux",
        "Nginx",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      inLanguage: "en",
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

/** One grotesk for display + one mono for TUI/body-detail, each with system fallbacks. */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(grotesk.variable, mono.variable, "font-sans", geist.variable)}>
      <body className="font-display bg-(--color-void) text-(--color-lume)">
        {/* HTML-first veil: server-rendered, CSS-animated. Visible from first
            paint while JS bundles stream in; dismissed by PreloaderDismiss
            after hydration, or by the inline fallback below if React fails.
            The mark itself is static (no breathe loop): an animating LCP
            candidate keeps repainting and inflates LCP to removal time. */}
        <div
          id="__preloader"
          aria-hidden="true"
          // The inline dismissal script can add .is-done before hydration
          // finishes (it fires on DOMContentLoaded, deliberately earlier
          // than React). That divergence is intentional — silence it.
          suppressHydrationWarning
        >
          <TriquetraMark className="veil-mark" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function d(){var e=document.getElementById("__preloader");if(e){e.classList.add("is-done");setTimeout(function(){e.remove()},700)}}function go(){setTimeout(d,150)}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",go,{once:true})}else{go()}setTimeout(d,1500)})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-(--color-panel) focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
        >
          skip to content
        </a>
        <LenisProvider>
          <CursorSpotlight />
          <SectionDots />
          <main className="mx-auto max-w-6xl pb-16">{children}</main>
          <StatusBar />
          <PreloaderDismiss />
        </LenisProvider>
      </body>
    </html>
  );
}
