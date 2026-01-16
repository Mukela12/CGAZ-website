"use client";

import { useDevice } from "@/lib/hooks/useDevice";
import { MobileTopNav } from "@/components/mobile/Navigation/MobileTopNav";
import { DesktopTopNav } from "@/components/desktop/Navigation/DesktopTopNav";

/**
 * Adaptive Navigation Component
 *
 * Automatically switches between mobile top navigation and desktop top navigation
 * based on device screen size (1024px breakpoint).
 *
 * - Mobile (< 1024px): Top navigation with hamburger menu
 * - Desktop (≥ 1024px): Top horizontal navigation bar with glassmorphic effects
 *
 * @example
 * ```tsx
 * <AdaptiveNav />
 * ```
 */
export function AdaptiveNav() {
  const { isMobile, isHydrated } = useDevice();

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return null;
  }

  return isMobile ? <MobileTopNav /> : <DesktopTopNav />;
}
