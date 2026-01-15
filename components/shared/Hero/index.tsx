"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { cn } from "@/lib/utils/cn";

interface HeroProps {
  /** Hero title */
  title: string;
  /** Hero subtitle/description */
  subtitle: string;
  /** Background image URL (optional - uses gradient if not provided) */
  backgroundImage?: string;
  /** Primary call-to-action button */
  primaryCta?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  /** Secondary call-to-action button */
  secondaryCta?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  /** Additional CSS classes */
  className?: string;
  /** Hero height variant */
  height?: "small" | "medium" | "large" | "full";
}

/**
 * Hero Section Component
 *
 * Full-width hero section with:
 * - Background image with overlay
 * - Glassmorphism content card
 * - Animated entrance effects
 * - Responsive typography
 * - Call-to-action buttons
 *
 * @example
 * ```tsx
 * <Hero
 *   title="Empowering Zambian Cashew Farmers"
 *   subtitle="Supporting 22,490 farmers across 145 centers"
 *   backgroundImage="/images/hero-farmers.jpg"
 *   primaryCta={{ label: "Learn More", href: "/about" }}
 *   secondaryCta={{ label: "Join CGAZ", href: "/farmers/join" }}
 * />
 * ```
 */
export function Hero({
  title,
  subtitle,
  backgroundImage,
  primaryCta,
  secondaryCta,
  className,
  height = "large",
}: HeroProps) {
  const heightStyles = {
    small: "min-h-[50vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[80vh]",
    full: "min-h-screen",
  };

  return (
    <section
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden",
        heightStyles[height],
        className
      )}
    >
      {/* Background Image or Gradient */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <OptimizedImage
              src={backgroundImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          </>
        ) : (
          /* Agricultural gradient background as fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-cashew-green via-cashew-dark-green to-earth-brown" />
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <GlassCard
            variant="overlay"
            className="p-8 sm:p-10 lg:p-12"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>

            {/* Call-to-Action Buttons */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {primaryCta && (
                  primaryCta.href ? (
                    <Link href={primaryCta.href}>
                      <Button
                        variant="glass"
                        size="lg"
                        iconAfter={<ArrowRight className="w-5 h-5" />}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md"
                      >
                        {primaryCta.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="glass"
                      size="lg"
                      iconAfter={<ArrowRight className="w-5 h-5" />}
                      onClick={primaryCta.onClick}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md"
                    >
                      {primaryCta.label}
                    </Button>
                  )
                )}
                {secondaryCta && (
                  secondaryCta.href ? (
                    <Link href={secondaryCta.href}>
                      <Button
                        variant="glass"
                        size="lg"
                        className="border-2 border-white/40 hover:bg-white/10"
                      >
                        {secondaryCta.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="glass"
                      size="lg"
                      onClick={secondaryCta.onClick}
                      className="border-2 border-white/40 hover:bg-white/10"
                    >
                      {secondaryCta.label}
                    </Button>
                  )
                )}
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Scroll Indicator (optional) */}
      {height === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
