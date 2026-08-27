"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  title,
  description,
  align = "left",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={align === "center" ? "text-center" : ""}
    >
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-(--muted-foreground) leading-relaxed ${
            align === "center" ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
