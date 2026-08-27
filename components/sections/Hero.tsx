"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/SabinPant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sabinpant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const facts = [
  { value: "5", label: "AWS certifications" },
  { value: "2", label: "Internships" },
  { value: "6", label: "Projects" },
];

/* ─────────────── TERMINAL ─────────────── */

type TermLine =
  | { kind: "cmd"; cmd: string; delay: number }
  | { kind: "out"; text: string; delay: number }
  | { kind: "status"; text: string; delay: number };

const terminalLines: TermLine[] = [
  { kind: "cmd", cmd: "whoami", delay: 500 },
  { kind: "out", text: "sabin_pant :: full-stack engineer", delay: 900 },
  { kind: "cmd", cmd: "cat approach.txt", delay: 1500 },
  { kind: "out", text: "architecture first. code second.", delay: 1900 },
  { kind: "cmd", cmd: "ls specialties/", delay: 2500 },
  { kind: "out", text: "system-design  auth  APIs  cloud", delay: 2900 },
  { kind: "cmd", cmd: "status --check", delay: 3500 },
  { kind: "status", text: "open to opportunities", delay: 3900 },
];

function Terminal({ reduceMotion }: { reduceMotion: boolean }) {
  const [revealed, setRevealed] = useState<number>(
    reduceMotion ? terminalLines.length : 0,
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setRevealed((n) => Math.max(n, i + 1)), line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  return (
    <div className="rounded-lg border border-(--border) bg-(--card) overflow-hidden">
      {/* Window titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border) bg-(--secondary)">
        <span className="text-xs font-mono text-(--muted-foreground) truncate">
          sabin@portfolio: ~
        </span>
        <span
          aria-hidden
          className="flex items-center gap-3.5 mr-4 font-mono text-sm leading-none text-(--muted-foreground) select-none"
        >
          <span>—</span>
          <span className="text-xs">▢</span>
          <span>✕</span>
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto">
        <div className="min-w-max sm:min-w-0">
          {terminalLines.map((line, i) => (
            <AnimatePresence key={i}>
              {i < revealed && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap"
                >
                  {line.kind === "cmd" && (
                    <span>
                      <span className="text-green-600 dark:text-green-400">
                        $
                      </span>{" "}
                      <span className="text-(--foreground)">{line.cmd}</span>
                    </span>
                  )}
                  {line.kind === "out" && (
                    <span>
                      <span className="text-sky-600 dark:text-sky-400">→</span>{" "}
                      <span className="text-(--muted-foreground)">
                        {line.text}
                      </span>
                    </span>
                  )}
                  {line.kind === "status" && (
                    <span>
                      <span className="text-green-600 dark:text-green-400">
                        →
                      </span>{" "}
                      <span className="text-(--foreground)">{line.text}</span>
                      <motion.span
                        aria-hidden
                        animate={
                          reduceMotion ? undefined : { opacity: [1, 0, 1] }
                        }
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-1 inline-block w-2 h-4 -mb-0.5 bg-green-500"
                      />
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── HERO ─────────────── */

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fade = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen border-b border-(--border)"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.p
              {...fade}
              transition={{ duration: 0.5 }}
              className="text-sm sm:text-base font-medium text-(--muted-foreground) mb-4"
            >
              Full-Stack &amp; Backend Developer
            </motion.p>

            <motion.h1
              {...fade}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]"
            >
              Sabin Pant
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-(--muted-foreground) leading-relaxed max-w-xl"
            >
              Forever curious, always tinkering, never standing still. I&apos;m a
              backend developer who cares about getting the architecture right
              before writing code, building systems and APIs that stay clean as
              they grow.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View projects
                <ArrowRight size={16} />
              </a>
              <a
                href="/SabinPant_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-(--border) text-sm font-medium hover:bg-(--secondary) transition-colors"
              >
                <Download size={15} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex items-center gap-5"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — photo + terminal + facts */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden border border-(--border) bg-(--secondary)">
              <Image
                src="/images/sabinpant.jpg"
                alt="Sabin Pant"
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                priority
                quality={85}
                className="object-cover"
              />
            </div>

            <Terminal reduceMotion={!!prefersReducedMotion} />

            <dl className="grid grid-cols-3 gap-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-lg border border-(--border) bg-(--card) px-3 py-3 text-center"
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums leading-none">
                    {f.value}
                  </dd>
                  <dd className="mt-1.5 text-[11px] text-(--muted-foreground) leading-tight">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
