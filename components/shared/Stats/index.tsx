"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

interface StatItem {
  /** Icon component from lucide-react */
  icon: LucideIcon;
  /** Statistic value (e.g., "22,490" or "145") */
  value: string;
  /** Label describing the statistic */
  label: string;
  /** Optional description */
  description?: string;
}

interface StatsProps {
  /** Array of statistics to display */
  stats: StatItem[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Use glassmorphism variant for overlay on images */
  variant?: "default" | "glass";
}

/**
 * Stats Section Component
 *
 * Displays key statistics in an attractive grid layout with:
 * - Icon for each stat
 * - Large number value
 * - Descriptive label
 * - Optional descriptions
 * - Animation on scroll
 * - Glassmorphism effects
 *
 * @example
 * ```tsx
 * <Stats
 *   title="Our Impact"
 *   subtitle="Empowering farmers across Zambia"
 *   stats={[
 *     { icon: Users, value: "22,490", label: "Registered Members" },
 *     { icon: MapPin, value: "145", label: "Service Centers" },
 *   ]}
 * />
 * ```
 */
export function Stats({
  stats,
  title,
  subtitle,
  className,
  variant = "default",
}: StatsProps) {
  const isGlass = variant === "glass";

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 lg:mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                  isGlass ? "text-white" : "text-neutral-900"
                )}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(
                  "text-lg sm:text-xl max-w-3xl mx-auto",
                  isGlass ? "text-white/80" : "text-neutral-600"
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard
                variant={isGlass ? "primary" : "primary"}
                hoverable
                className={cn(
                  "p-6 lg:p-8 text-center h-full",
                  !isGlass && "bg-white shadow-lg hover:shadow-xl"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full mb-4",
                    isGlass
                      ? "bg-white/20 text-white"
                      : "bg-cashew-green/10 text-cashew-green"
                  )}
                >
                  <stat.icon className="w-7 h-7 lg:w-8 lg:h-8" />
                </div>

                {/* Value */}
                <div
                  className={cn(
                    "text-4xl lg:text-5xl font-bold mb-2",
                    isGlass ? "text-white" : "text-neutral-900"
                  )}
                  suppressHydrationWarning
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className={cn(
                    "text-base lg:text-lg font-semibold mb-2",
                    isGlass ? "text-white/90" : "text-neutral-700"
                  )}
                >
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <p
                    className={cn(
                      "text-sm",
                      isGlass ? "text-white/70" : "text-neutral-500"
                    )}
                  >
                    {stat.description}
                  </p>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
