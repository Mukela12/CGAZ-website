"use client";

import { useDevice } from "@/lib/hooks/useDevice";
import { MobileBottomNav } from "@/components/mobile/Navigation/MobileBottomNav";
import { DesktopTopNav } from "@/components/desktop/Navigation/DesktopTopNav";

/**
 * Adaptive Navigation Component
 *
 * Automatically switches between mobile bottom navigation and desktop top navigation
 * based on device screen size (1024px breakpoint).
 *
 * - Mobile (< 1024px): Bottom navigation bar
 * - Desktop (≥ 1024px): Top horizontal navigation bar
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

  return isMobile ? <MobileBottomNav /> : <DesktopTopNav />;
}
