"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

function CountUp({
  target,
  suffix = "",
  delay = 200,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          setTimeout(() => {
            if (started.current) return;
            started.current = true;

            let startTime: number | null = null;
            const duration = 1400;

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(1, elapsed / duration);
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(target * easeOutCubic);
              setCount(currentCount);

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5, rootMargin: "50px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 4, suffix: "+", label: "Years coding" },
  { value: 5, suffix: "", label: "AWS certifications" },
  { value: 6, suffix: "", label: "Projects" },
  { value: 20, suffix: "+", label: "Technologies" },
];

const interests = [
  {
    id: "gaming",
    label: "Gaming",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <path d="M12 12h.01M8 10v4M10 12H6" />
        <circle cx="16" cy="11" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="18" cy="13" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
    desc: "Gaming is what got me into coding in the first place. I wanted to build my own games, and that curiosity led me into programming. I still play now and then, mostly Mobile Legends and sometimes PUBG.",
    funFact: "I once spent more time modding a game than actually playing it.",
  },
  {
    id: "food",
    label: "Food & Culture",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
    desc: "I like trying new dishes and learning about different cultures. Food tells you a lot about where people come from, and exploring new cuisines is one of my favorite ways to understand a place.",
    funFact: "I judge cities by their street food scene.",
  },
  {
    id: "travel",
    label: "Travelling",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      </svg>
    ),
    desc: "I like exploring new places, especially quiet nature spots. A trail, a waterfall, or just a good view is enough to reset my head after a long week.",
    funFact:
      "I prefer getting a little lost. It's the best way to find hidden spots.",
  },
  {
    id: "music",
    label: "Music",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    desc: "There's usually something playing while I work, lo-fi when I need to focus, something with more energy to start the day.",
    funFact: "My playlists are organized by mood, not genre.",
  },
];

/* Animation Variants */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

export default function About() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeInterest, setActiveInterest] = useState(interests[0]);

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <SectionHeader
            title="About"
            description="Backend-focused developer who enjoys figuring out how complex systems fit together."
          />
        </div>

        {/* Main layout grid */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-14 xl:gap-20 items-start mb-20">
          {/* LEFT: Image + Stats */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6 self-start w-full max-w-90 mx-auto lg:mx-0">
            {/* Photo card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full"
            >
              <div className="relative rounded-xl overflow-hidden border border-(--border) bg-card">
                <div className="relative w-full aspect-3/4">
                  <Image
                    src="/images/sabinpanta.jpg"
                    alt="Sabin Pant"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top transition-opacity duration-500 ease-out"
                    loading="lazy"
                    quality={85}
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-secondary animate-pulse" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-2 gap-3 w-full"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={childVariants}
                  className="bg-card border border-(--border) rounded-lg p-4"
                >
                  <div className="text-2xl font-semibold mb-0.5 tabular-nums">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      delay={150 + i * 80}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Story blocks */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 pt-1"
          >
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                How I got here
              </h3>
              <p className="text-muted-foreground leading-[1.8] text-[0.95rem]">
                It started because I wanted to build my own game. That took me
                into Computer Science in high school, where I picked up C and
                C++. Over time my interest shifted from building games to
                understanding how real systems work, and I moved toward backend
                architecture, data pipelines, and cloud infrastructure.
              </p>
            </div>

            <div className="h-px w-full bg-(--border)" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Why backend and system design
              </h3>
              <p className="text-muted-foreground leading-[1.8] text-[0.95rem]">
                Backend is where the harder problems tend to be: handling race
                conditions, keeping data consistent across services, and
                designing a schema that still holds up months later. I usually
                spend time mapping out how the parts of a system talk to each
                other before writing much code.
              </p>
            </div>

            <div className="h-px w-full bg-(--border)" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Where I&apos;m headed
              </h3>
              <p className="text-muted-foreground leading-[1.8] text-[0.95rem]">
                Longer term, I want to work on infrastructure where correctness
                really matters, such as banking systems, payment processing, and
                real-time transactions. I want to build systems people can rely
                on without thinking about them.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interests & Hobbies */}
        <div className="mt-20 w-full">
          <h3 className="text-sm font-semibold text-foreground mb-5">
            Outside work
          </h3>

          {/* Interactive Interest Cards */}
          <div className="rounded-xl border border-(--border) bg-card overflow-hidden flex flex-col md:flex-row relative">
            {/* Left Sidebar (Navigation) */}
            <div className="w-full md:w-64 bg-secondary border-b md:border-b-0 md:border-r border-(--border) flex flex-row md:flex-col p-3 gap-1 overflow-x-auto hide-scrollbar z-20">
              {interests.map((item) => {
                const isActive = activeInterest.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveInterest(item)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-2 transition-colors duration-200 shrink-0 md:shrink ${
                      isActive
                        ? "bg-background border-foreground"
                        : "border-transparent hover:bg-background/60"
                    }`}
                  >
                    <div
                      className={`transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Content Display */}
            <div className="flex-1 relative p-8 md:p-12 min-h-80 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInterest.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-muted-foreground">
                      {activeInterest.icon}
                    </div>
                    <h4 className="text-2xl font-semibold text-foreground tracking-tight">
                      {activeInterest.label}
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-[0.95rem] leading-relaxed mb-6">
                    {activeInterest.desc}
                  </p>

                  <div className="inline-flex items-start gap-3 px-4 py-3 rounded-lg bg-secondary border border-(--border)">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mt-0.5 shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <p className="text-sm text-foreground leading-relaxed">
                      {activeInterest.funFact}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
