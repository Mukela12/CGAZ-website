"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Info,
  Users,
  FolderTree,
  Package,
  Newspaper,
  Mail,
  ChevronDown,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
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
    description?: string;
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
      {
        label: "Our Story",
        href: "/about/story",
        description: "Learn about CGAZ's history",
      },
      {
        label: "Mission & Vision",
        href: "/about/mission",
        description: "Our goals and values",
      },
      {
        label: "Leadership",
        href: "/about/leadership",
        description: "Meet our team",
      },
      {
        label: "Partners",
        href: "/about/partners",
        description: "Organizations we work with",
      },
    ],
  },
  {
    id: "farmers",
    label: "For Farmers",
    href: "/farmers",
    icon: Users,
    children: [
      {
        label: "Training Programs",
        href: "/farmers/training",
        description: "Skills development",
      },
      {
        label: "Resources",
        href: "/farmers/resources",
        description: "Tools and guides",
      },
      {
        label: "Success Stories",
        href: "/farmers/stories",
        description: "Farmer testimonials",
      },
      {
        label: "Join CGAZ",
        href: "/farmers/join",
        description: "Become a member",
      },
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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

/**
 * Desktop Top Navigation Component
 *
 * A glassmorphic navigation bar with scroll-based transparency transition:
 * - Transparent background over hero, transitions to glass on scroll
 * - Logo with full organization name
 * - Glassmorphic dropdown menus
 * - Info bar that collapses on scroll
 */
export function DesktopTopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleMouseEnter = (itemId: string) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Info Bar - Collapses on scroll */}
      <motion.div
        initial={false}
        animate={{
          height: scrolled ? 0 : "auto",
          opacity: scrolled ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:block bg-cashew-dark-green text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+260977429666"
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+260 97 742 9666</span>
              </a>
              <a
                href="mailto:info@cgaz.org.zm"
                className="flex items-center gap-2 hover:text-white/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@cgaz.org.zm</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="hover:text-white/80 transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
              <button
                className="flex items-center gap-1 hover:text-white/80 transition-colors ml-2"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar - Glassmorphic */}
      <header
        className={cn(
          "hidden lg:block fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 backdrop-blur-md bg-white/90 shadow-nav border-b border-neutral-200/50"
            : "top-[40px] bg-gradient-to-b from-black/50 via-black/25 to-transparent"
        )}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6"
          role="navigation"
          aria-label="Desktop navigation"
        >
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo/cashew-logo.svg"
                  alt="CGAZ Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-display font-bold text-xl transition-all duration-300",
                    scrolled
                      ? "text-cashew-green group-hover:text-cashew-dark-green"
                      : "text-white group-hover:text-white/90 drop-shadow-md"
                  )}
                >
                  CGAZ
                </span>
                <span
                  className={cn(
                    "text-xs transition-all duration-300 whitespace-nowrap",
                    scrolled ? "text-neutral-600" : "text-white/90 drop-shadow-sm"
                  )}
                >
                  Cashew Growers Association of Zambia
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <ul className="flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const itemActive = isActive(item.href);
                const isDropdownOpen = activeDropdown === item.id;

                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hasChildren ? (
                      <>
                        <button
                          className={cn(
                            "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300",
                            scrolled
                              ? itemActive
                                ? "text-cashew-green bg-cashew-green/5"
                                : "text-neutral-700 hover:text-cashew-green hover:bg-neutral-100/80"
                              : itemActive
                                ? "text-white bg-white/20 drop-shadow-md"
                                : "text-white hover:text-white hover:bg-white/10 drop-shadow-md"
                          )}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isDropdownOpen ? "rotate-180" : ""
                            )}
                          />
                        </button>

                        {/* Dropdown Menu - Glassmorphic */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.96 }}
                              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="absolute top-full left-0 mt-2 w-64 backdrop-blur-lg bg-white/95 rounded-xl shadow-nav-lg border border-neutral-200/50 py-2 z-50 overflow-hidden"
                            >
                              {item.children?.map((child, index) => {
                                const childActive = pathname === child.href;
                                return (
                                  <motion.div
                                    key={child.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                  >
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "block px-4 py-3 transition-all duration-200",
                                        childActive
                                          ? "bg-cashew-green/10 text-cashew-green"
                                          : "hover:bg-neutral-50 text-neutral-700 hover:text-cashew-green"
                                      )}
                                    >
                                      <div className="font-medium">{child.label}</div>
                                      {child.description && (
                                        <div className="text-xs text-neutral-500 mt-0.5">
                                          {child.description}
                                        </div>
                                      )}
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-2 rounded-lg font-medium transition-all duration-300",
                          scrolled
                            ? itemActive
                              ? "text-cashew-green bg-cashew-green/5"
                              : "text-neutral-700 hover:text-cashew-green hover:bg-neutral-100/80"
                            : itemActive
                              ? "text-white bg-white/20 drop-shadow-md"
                              : "text-white hover:text-white hover:bg-white/10 drop-shadow-md"
                        )}
                        aria-current={itemActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-300",
                  scrolled
                    ? "text-neutral-700 hover:text-cashew-green hover:bg-neutral-100/80"
                    : "text-white hover:text-white hover:bg-white/10 drop-shadow-md"
                )}
              >
                Contact
              </Link>
              <Link
                href="/farmers/join"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm rounded-lg font-semibold transition-all duration-300",
                  scrolled
                    ? "bg-cashew-green text-white hover:bg-cashew-dark-green shadow-md hover:shadow-lg"
                    : "bg-cashew-green text-white hover:bg-cashew-dark-green shadow-lg hover:shadow-xl"
                )}
              >
                Join CGAZ
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
