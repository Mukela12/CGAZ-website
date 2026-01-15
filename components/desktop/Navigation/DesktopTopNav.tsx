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
        href: "/farmers/success-stories",
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
 * A horizontal navigation bar optimized for desktop with:
 * - Logo on the left, menu items centered, CTAs on the right
 * - Dropdown menus for nested navigation (About, For Farmers)
 * - Sticky header that stays at top on scroll
 * - Professional association-style layout
 * - Smooth hover effects and transitions
 *
 * @example
 * ```tsx
 * <DesktopTopNav />
 * ```
 */
export function DesktopTopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
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
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-cashew-dark-green text-white">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+260123456789"
                className="flex items-center gap-2 hover:text-cashew-yellow transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+260 123 456 789</span>
              </a>
              <a
                href="mailto:info@cgaz.org"
                className="flex items-center gap-2 hover:text-cashew-yellow transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@cgaz.org</span>
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
                    className="hover:text-cashew-yellow transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
              <button
                className="flex items-center gap-1 hover:text-cashew-yellow transition-colors ml-2"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`hidden lg:block sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-md"
        }`}
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
                <span className="font-bold text-xl text-cashew-green group-hover:text-cashew-dark-green transition-colors">
                  CGAZ
                </span>
                <span className="text-xs text-neutral-600">
                  Cashew Growers Association
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
                          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                            itemActive
                              ? "text-cashew-green bg-cashew-green/5"
                              : "text-neutral-700 hover:text-cashew-green hover:bg-neutral-50"
                          }`}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50"
                            >
                              {item.children?.map((child) => {
                                const childActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block px-4 py-3 transition-colors ${
                                      childActive
                                        ? "bg-cashew-green/5 text-cashew-green"
                                        : "hover:bg-neutral-50 text-neutral-700"
                                    }`}
                                  >
                                    <div className="font-medium">{child.label}</div>
                                    {child.description && (
                                      <div className="text-xs text-neutral-500 mt-0.5">
                                        {child.description}
                                      </div>
                                    )}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                          itemActive
                            ? "text-cashew-green bg-cashew-green/5"
                            : "text-neutral-700 hover:text-cashew-green hover:bg-neutral-50"
                        }`}
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
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg font-semibold transition-all duration-200 text-neutral-700 hover:text-cashew-green hover:bg-neutral-50"
              >
                Contact
              </Link>
              <Link
                href="/farmers/join"
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg font-semibold transition-all duration-200 bg-cashew-green text-white hover:bg-cashew-dark-green shadow-md hover:shadow-lg"
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
