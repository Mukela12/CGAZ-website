"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Users,
  FolderTree,
  Package,
  Newspaper,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    label: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: Info,
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Partners", href: "/about/partners" },
    ],
  },
  {
    id: "farmers",
    label: "For Farmers",
    href: "/farmers",
    icon: Users,
    children: [
      { label: "Training Programs", href: "/farmers/training" },
      { label: "Resources", href: "/farmers/resources" },
      { label: "Success Stories", href: "/farmers/stories" },
      { label: "Join CGAZ", href: "/farmers/join" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: FolderTree,
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    id: "news",
    label: "News & Events",
    href: "/news",
    icon: Newspaper,
  },
];

/**
 * Mobile Top Navigation Component
 *
 * A modern mobile navigation with:
 * - Fixed top bar with logo and hamburger menu
 * - Glassmorphic effect on scroll
 * - Slide-in menu panel from right
 * - Accordion navigation for nested items
 * - Touch-optimized interactions
 */
export function MobileTopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedItem(null);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-white/90 shadow-md border-b border-neutral-200/50"
            : "bg-gradient-to-b from-black/40 to-transparent"
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo/cashew-logo.svg"
                alt="CGAZ"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-display font-bold text-lg transition-colors duration-300",
                  scrolled ? "text-cashew-green" : "text-white"
                )}
              >
                CGAZ
              </span>
              <span
                className={cn(
                  "text-[10px] leading-tight transition-colors duration-300",
                  scrolled ? "text-neutral-500" : "text-white/80"
                )}
              >
                Cashew Growers Association
              </span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              scrolled
                ? "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                : "text-white hover:bg-white/20 active:bg-white/30"
            )}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl z-50 flex flex-col"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/logo/cashew-logo.svg"
                      alt="CGAZ"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-cashew-green">CGAZ</div>
                    <div className="text-xs text-neutral-500">
                      Cashew Growers Association of Zambia
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-neutral-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                  {navItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const itemActive = isActive(item.href);
                    const isExpanded = expandedItem === item.id;
                    const Icon = item.icon;

                    return (
                      <li key={item.id}>
                        {hasChildren ? (
                          <>
                            {/* Parent item with accordion */}
                            <button
                              onClick={() => toggleExpanded(item.id)}
                              className={cn(
                                "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors",
                                itemActive
                                  ? "bg-cashew-green/10 text-cashew-green"
                                  : "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "w-5 h-5 transition-transform duration-200",
                                  isExpanded ? "rotate-180" : ""
                                )}
                              />
                            </button>

                            {/* Child items */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden ml-4 mt-1 space-y-1"
                                >
                                  {item.children?.map((child) => {
                                    const childActive = pathname === child.href;
                                    return (
                                      <motion.li
                                        key={child.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.15 }}
                                      >
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "block px-4 py-2.5 rounded-lg transition-colors",
                                            childActive
                                              ? "bg-cashew-green/10 text-cashew-green font-medium"
                                              : "text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200"
                                          )}
                                        >
                                          {child.label}
                                        </Link>
                                      </motion.li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                              itemActive
                                ? "bg-cashew-green/10 text-cashew-green"
                                : "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Menu Footer - CTA and Contact */}
              <div className="border-t border-neutral-200 p-4 space-y-4">
                {/* Join CTA */}
                <Link
                  href="/farmers/join"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-cashew-green text-white rounded-xl font-semibold hover:bg-cashew-dark-green active:bg-cashew-dark-green transition-colors shadow-md"
                >
                  Join CGAZ Today
                </Link>

                {/* Quick Contact */}
                <div className="flex items-center justify-around pt-2 text-neutral-500">
                  <a
                    href="tel:+260977429666"
                    className="flex flex-col items-center gap-1 p-2 hover:text-cashew-green transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-xs">Call</span>
                  </a>
                  <a
                    href="mailto:info@cgaz.org.zm"
                    className="flex flex-col items-center gap-1 p-2 hover:text-cashew-green transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-xs">Email</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex flex-col items-center gap-1 p-2 hover:text-cashew-green transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs">Find Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
