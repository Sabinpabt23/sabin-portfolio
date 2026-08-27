"use client";
import { motion, type Variants } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const experiences = [
  {
    role: "Developer Intern",
    company: "Karmachari Sanchaya Kosh (EPF Nepal)",
    location: "Lalitpur, Pulchowk · On-site",
    period: "August 2026 – Present",
    completed: false,
    impact: [
      {
        headline: "Requirements and design",
        detail:
          "Working with development teams and stakeholders on requirements gathering, SRS documentation, system design, and UML/ERD diagrams.",
      },
      {
        headline: "Backend development with .NET",
        detail:
          "Building features and REST APIs on .NET against an Oracle database, within an existing enterprise system.",
      },
    ],
    stack: [".NET", "REST APIs", "Oracle", "UML", "ERD", "SRS"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Leaflet Digital Solutions",
    location: "Kathmandu, Nepal",
    period: "March 2026 – June 2026",
    completed: true,
    impact: [
      {
        headline: "Architecture and implementation",
        detail:
          "Built data-intensive systems with Node.js, Express, Next.js and PostgreSQL, owning both architecture decisions and day-to-day implementation.",
      },
      {
        headline: "Secured API layers",
        detail:
          "Designed and hardened API layers with JWT authentication and role-based access control across multi-tenant applications.",
      },
      {
        headline: "API documentation",
        detail:
          "Produced full Swagger documentation, which cut frontend integration time and reduced back-and-forth over contract details.",
      },
    ],
    stack: ["Node.js", "Express", "Next.js", "PostgreSQL", "JWT", "Swagger"],
  },
];

/* ─────────────────────────────────────────
   Variants
───────────────────────────────────────── */
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <SectionHeader title="Experience" />
        </div>

        {/* ══════════════════════════
            Role cards
        ══════════════════════════ */}
        <div className="space-y-6">
          {experiences.map((experience) => (
            <motion.div
              key={experience.company}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-card border border-(--border) rounded-xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                {/* Role identity row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7 pb-7 border-b border-(--border)">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {experience.role}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                      {experience.company}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-2 flex items-center gap-1.5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {experience.location}
                    </p>
                  </div>

                  {/* Period + status */}
                  <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                      {experience.period}
                    </span>
                    {!experience.completed && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Impact points */}
                <ul className="space-y-5">
                  {experience.impact.map((point, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      variants={itemVariant}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="flex gap-3"
                    >
                      <div className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-snug mb-0.5">
                          {point.headline}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {point.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mt-7 pt-6 border-t border-(--border)">
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-secondary-foreground border border-(--border)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-(--border) rounded-xl p-6 sm:p-7"
        >
          <p className="text-sm text-muted-foreground">
            Currently open to full-time roles and internships.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border) text-sm font-medium hover:bg-secondary transition-colors whitespace-nowrap shrink-0"
          >
            Get in touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
