"use client";

import { useDevice } from "@/lib/hooks/useDevice";
import { AdaptiveNav } from "./AdaptiveNav";

interface AdaptiveLayoutProps {
  children: React.ReactNode;
}

/**
 * Adaptive Layout Component
 *
 * Provides the main layout structure that adapts based on device type:
 * - Mobile: Content with bottom padding for bottom navigation
 * - Desktop: Content with top padding for horizontal navbar
 *
 * Includes the AdaptiveNav component which switches between
 * mobile bottom navigation and desktop top navigation.
 *
 * @example
 * ```tsx
 * <AdaptiveLayout>
 *   <YourPageContent />
 * </AdaptiveLayout>
 * ```
 */
export function AdaptiveLayout({ children }: AdaptiveLayoutProps) {
  const { isMobile, isHydrated } = useDevice();

  // Prevent layout shift by showing both paddings until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pb-20">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdaptiveNav />
      <main className={isMobile ? "flex-1 pb-20" : "flex-1"}>{children}</main>
    </div>
  );
}
