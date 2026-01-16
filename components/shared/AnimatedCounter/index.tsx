"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  /** Target value to count to */
  value: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Format the number with thousand separators */
  formatNumber?: boolean;
  /** Suffix to append (e.g., "%" or "+") */
  suffix?: string;
  /** Prefix to prepend (e.g., "$") */
  prefix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Animated Counter Component
 *
 * Displays a number that animates from 0 to the target value
 * when it becomes visible in the viewport.
 *
 * Features:
 * - Intersection Observer for visibility detection
 * - Smooth easeOutCubic animation
 * - Number formatting with thousand separators
 * - Support for prefixes, suffixes, and decimals
 * - Only animates once
 *
 * @example
 * ```tsx
 * <AnimatedCounter value={22490} formatNumber suffix=" members" />
 * <AnimatedCounter value={85} suffix="%" />
 * ```
 */
export function AnimatedCounter({
  value,
  duration = 2000,
  formatNumber = true,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue(0, value, duration);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated]);

  // Easing function: easeOutCubic for a natural deceleration
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateValue = (start: number, end: number, animDuration: number) => {
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = start + (end - start) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const formatValue = (num: number): string => {
    const rounded = decimals > 0
      ? num.toFixed(decimals)
      : Math.round(num).toString();

    if (formatNumber && decimals === 0) {
      return parseInt(rounded).toLocaleString();
    }

    if (formatNumber && decimals > 0) {
      const [integer, decimal] = rounded.split(".");
      return `${parseInt(integer).toLocaleString()}.${decimal}`;
    }

    return rounded;
  };

  return (
    <span ref={elementRef} className={className} suppressHydrationWarning>
      {prefix}{formatValue(count)}{suffix}
    </span>
  );
}
