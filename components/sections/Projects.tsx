"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured !== false);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 lg:py-32 relative bg-(--secondary)/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--border) bg-(--secondary) text-xs text-(--primary) mb-4 font-medium tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Things I have <span className="text-(--primary)">built.</span>
          </h2>
          <p className="text-(--muted-foreground) mt-4 max-w-lg mx-auto text-sm sm:text-base px-2">
            Every project starts with architecture. Here is what that looks like
            in practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: (i % 2) * 0.1 }}
              className="flex flex-col rounded-2xl border border-(--border) bg-(--secondary)/20 hover:border-(--primary)/40 transition-colors duration-300 p-6 sm:p-8"
            >
              <p className="text-xs font-medium tracking-widest uppercase mb-2 text-(--primary)">
                {project.subtitle}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-(--foreground) mb-3">
                {project.title}
              </h3>

              <p className="text-(--muted-foreground) leading-relaxed text-sm sm:text-base mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-(--secondary) text-xs font-mono text-(--secondary-foreground) border border-(--border)"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 6 && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono text-(--muted-foreground)">
                    +{project.stack.length - 6} more
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium bg-(--primary)/10 border border-(--primary)/30 text-(--primary) hover:bg-(--primary)/15 hover:border-(--primary)/60 transition-colors duration-200 w-full sm:w-auto"
              >
                View Details
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
