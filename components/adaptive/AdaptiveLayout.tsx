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
 * - Mobile: Top navigation with hamburger menu (no extra padding needed)
 * - Desktop: Top navigation bar with glassmorphic effects
 *
 * Navigation overlays hero sections with transparent background,
 * then becomes solid/glass on scroll.
 *
 * @example
 * ```tsx
 * <AdaptiveLayout>
 *   <YourPageContent />
 * </AdaptiveLayout>
 * ```
 */
export function AdaptiveLayout({ children }: AdaptiveLayoutProps) {
  const { isHydrated } = useDevice();

  // Prevent layout shift by rendering minimal structure until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdaptiveNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
