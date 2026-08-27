"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";

export default function Projects() {
  const featuredProjects = projects.filter(
    (project) => project.featured !== false,
  );

  return (
    <section id="projects" className="py-24 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-14">
          <SectionHeader
            title="Projects"
            description="A selection of things I've built. Each has a short write-up on the architecture and decisions behind it."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: (i % 2) * 0.08 }}
              className="flex flex-col rounded-xl border border-(--border) bg-card hover:border-(--muted-foreground)/40 transition-colors duration-200 p-6 sm:p-7"
            >
              <p className="text-xs font-medium text-muted-foreground mb-2">
                {project.subtitle}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">
                {project.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-secondary-foreground border border-(--border)"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 6 && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono text-muted-foreground">
                    +{project.stack.length - 6} more
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 w-fit"
              >
                View details
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
