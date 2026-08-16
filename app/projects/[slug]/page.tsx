import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ArchDiagram from "@/components/ArchDiagram";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found — Sabin Pant" };
  }

  return {
    title: `${project.title} — Sabin Pant`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Sabin Pant`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-(--muted-foreground) hover:text-(--primary) transition-colors duration-200 mb-10 sm:mb-14"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-medium tracking-widest uppercase mb-3 text-(--primary)">
            {project.subtitle}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--foreground)">
            {project.title}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--secondary)/30 overflow-hidden mb-10 sm:mb-14 min-h-55 sm:min-h-70">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border)/50">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-xs text-(--muted-foreground) font-mono truncate">
              {project.title.toLowerCase()}/architecture
            </span>
          </div>
          <ArchDiagram nodes={project.arch} />
        </div>

        <section className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-(--foreground)">
            Overview
          </h2>
          <p className="text-(--muted-foreground) leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {project.longDescription}
          </p>
        </section>

        <section className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-(--foreground)">
            Highlights
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm sm:text-base text-(--secondary-foreground)"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-(--primary)" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex gap-3 flex-wrap pt-2">
          {project.github && (
            <Button variant="outline" size="lg" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </Button>
          )}
          {project.demo && (
            <Button size="lg" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
