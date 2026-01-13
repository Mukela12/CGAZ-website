"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the device is mobile or desktop
 * Uses 1024px (lg breakpoint) as the threshold
 *
 * @returns Object with isMobile and isDesktop boolean values
 *
 * @example
 * const { isMobile, isDesktop } = useDevice();
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 */
export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkDevice();

    // Add event listener
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return {
    isMobile,
    isDesktop: !isMobile,
    isHydrated, // Use this to prevent hydration mismatches
  };
}
