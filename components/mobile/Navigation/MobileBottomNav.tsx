"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, FolderTree, Newspaper, Menu } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: "farmers",
    label: "Farmers",
    href: "/farmers",
    icon: Users,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: FolderTree,
  },
  {
    id: "news",
    label: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    id: "more",
    label: "More",
    href: "/about",
    icon: Menu,
  },
];

/**
 * Mobile Bottom Navigation Component
 *
 * A fixed bottom navigation bar optimized for mobile devices with:
 * - 5 core navigation items
 * - Active state with glassmorphism effect
 * - Safe area insets for notched devices
 * - Touch-optimized tap targets (48x48px minimum)
 * - Smooth animations using Framer Motion
 *
 * @example
 * ```tsx
 * <MobileBottomNav />
 * ```
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-t border-neutral-200 safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={item.href as any}
              className="flex flex-col items-center py-1.5 px-2 min-w-0 flex-1"
              aria-current={isActive ? "page" : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={`p-2.5 rounded-2xl transition-all ${
                  isActive
                    ? "bg-cashew-green text-white shadow-lg shadow-cashew-green/30"
                    : "text-neutral-600 hover:text-cashew-green hover:bg-cashew-green/5"
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </motion.div>
              <span
                className={`text-[10px] font-semibold mt-0.5 transition-colors ${
                  isActive ? "text-cashew-green" : "text-neutral-600"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
