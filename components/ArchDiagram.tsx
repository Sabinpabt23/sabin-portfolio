"use client";
import { motion } from "framer-motion";

export type ArchNode = { label: string; icon: string };

export default function ArchDiagram({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 gap-0">
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 cursor-default"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center border border-(--border) bg-card text-muted-foreground">
                {node.icon === "browser" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
                    <line x1="9" y1="5.5" x2="9.01" y2="5.5" />
                    <line x1="12" y1="5.5" x2="12.01" y2="5.5" />
                  </svg>
                )}
                {node.icon === "server" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                )}
                {node.icon === "layers" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                )}
                {node.icon === "database" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                  </svg>
                )}
                {node.icon === "layout" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                )}
                {node.icon === "chart" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                  </svg>
                )}
                {node.icon === "flask" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5.5 sm:h-5.5"
                  >
                    <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3" />
                    <line x1="7.5" y1="15" x2="16.5" y2="15" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] sm:text-xs text-muted-foreground font-medium text-center leading-tight max-w-20 sm:max-w-none">
                {node.label}
              </span>
            </motion.div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="flex items-center justify-center"
              >
                {/* Desktop: horizontal arrow */}
                <div className="hidden sm:flex items-center gap-1 mb-4">
                  <div className="w-6 h-px bg-(--border)" />
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    className="text-(--border)"
                    fill="currentColor"
                  >
                    <path d="M0 0L6 5L0 10z" />
                  </svg>
                </div>
                {/* Mobile: vertical arrow */}
                <div className="flex sm:hidden items-center justify-center py-1">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    className="text-(--muted-foreground)/40"
                    fill="currentColor"
                  >
                    <path d="M0 0L5 6L10 0z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
