"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils/cn";

interface Slide {
  image: string;
  alt: string;
  /** Optional object position for this specific slide */
  objectPosition?: string;
}

interface HeroSlideshowProps {
  /** Hero title */
  title: string;
  /** Hero subtitle/description */
  subtitle: string;
  /** Array of background images to cycle through */
  slides: Slide[];
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
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
  /** Show slide indicators */
  showIndicators?: boolean;
  /** Show progress bar */
  showProgress?: boolean;
  /** Default object position for all slides (can be overridden per slide) */
  objectPosition?: string;
}

/**
 * Hero Slideshow Component
 *
 * Full-width hero section with auto-cycling background slideshow:
 * - Multiple background images that crossfade automatically
 * - Bold typography directly on image (no glass card)
 * - Bottom-left positioned content for cinematic feel
 * - Progress bar showing slide timing
 * - Premium text shadows for legibility
 *
 * @example
 * ```tsx
 * <HeroSlideshow
 *   title="Empowering Zambian Farmers"
 *   subtitle="Supporting farmers across Zambia"
 *   slides={[
 *     { image: "/img1.jpg", alt: "Farmers" },
 *     { image: "/img2.jpg", alt: "Training" },
 *   ]}
 *   primaryCta={{ label: "Learn More", href: "/about" }}
 * />
 * ```
 */
export function HeroSlideshow({
  title,
  subtitle,
  slides,
  autoPlayInterval = 5000,
  primaryCta,
  secondaryCta,
  className,
  height = "large",
  showIndicators = true,
  showProgress = true,
  objectPosition = "center 30%",
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const heightStyles = {
    small: "min-h-[50vh]",
    medium: "min-h-[60vh]",
    large: "min-h-[85vh]",
    full: "min-h-screen",
  };

  // Auto-play slideshow
  useEffect(() => {
    if (slides.length <= 1) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [slides.length, autoPlayInterval]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  if (slides.length === 0) return null;

  return (
    <section
      className={cn(
        "relative w-full flex items-end overflow-hidden",
        heightStyles[height],
        className
      )}
    >
      {/* Background Slideshow - True Crossfade */}
      <div className="absolute inset-0 z-0">
        {/* Render all slides, animate opacity for smooth crossfade */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0"
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <OptimizedImage
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              style={{ objectPosition: slide.objectPosition || objectPosition }}
              priority={index === 0}
            />
          </motion.div>
        ))}

        {/* Enhanced gradient overlay - bottom heavy for text legibility */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && slides.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
          <motion.div
            className="h-full bg-cashew-green"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        </div>
      )}

      {/* Content Container - Bottom Left Positioned */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          {/* Title - Playfair Display with text shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 text-shadow-hero"
          >
            {title}
          </motion.h1>

          {/* Subtitle - Inter with subtle shadow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-2xl mb-10 text-shadow-sm"
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
                      variant="primary"
                      size="lg"
                      iconAfter={<ArrowRight className="w-5 h-5" />}
                      className="bg-cashew-green hover:bg-cashew-dark-green shadow-lg hover:shadow-xl transition-all"
                    >
                      {primaryCta.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    iconAfter={<ArrowRight className="w-5 h-5" />}
                    onClick={primaryCta.onClick}
                    className="bg-cashew-green hover:bg-cashew-dark-green shadow-lg hover:shadow-xl transition-all"
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
                      className="bg-white/15 backdrop-blur-md border-2 border-white/30 hover:bg-white/25 hover:border-white/40 transition-all"
                    >
                      {secondaryCta.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={secondaryCta.onClick}
                    className="bg-white/15 backdrop-blur-md border-2 border-white/30 hover:bg-white/25 hover:border-white/40 transition-all"
                  >
                    {secondaryCta.label}
                  </Button>
                )
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Slide Indicators - Positioned above bottom edge */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 lg:right-12 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-cashew-green w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator (for full height) */}
      {height === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
