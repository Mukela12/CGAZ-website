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
  ChevronRight,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  href: string | { pathname: string };
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    label: string;
    href: string | { pathname: string };
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
      { label: "Success Stories", href: "/farmers/success-stories" },
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
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

/**
 * Desktop Sidebar Navigation Component
 *
 * A fixed left sidebar navigation optimized for desktop with:
 * - Nested navigation with expandable sections
 * - Logo at top, language selector and social links at bottom
 * - Smooth hover effects and transitions
 * - Active state highlighting
 * - Glassmorphism background effect
 *
 * @example
 * ```tsx
 * <DesktopSidebar />
 * ```
 */
export function DesktopSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["about", "farmers"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isActive = (href: string | { pathname: string }) => {
    const hrefString = typeof href === 'string' ? href : href.pathname;
    if (hrefString === "/") return pathname === "/";
    return pathname.startsWith(hrefString);
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200 flex-col z-40"
      role="navigation"
      aria-label="Desktop navigation"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-200">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/images/logo/cashew-logo.svg"
              alt="CGAZ Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-cashew-green group-hover:text-cashew-dark-green transition-colors">
              CGAZ
            </span>
            <span className="text-xs text-neutral-600">Cashew Growers</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const itemActive = isActive(item.href);

            return (
              <li key={item.id}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                        itemActive
                          ? "bg-cashew-green/10 text-cashew-green"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${
                            itemActive
                              ? "text-cashew-green"
                              : "text-neutral-600 group-hover:text-cashew-green"
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.children?.map((child) => {
                            const childHref = typeof child.href === 'string' ? child.href : child.href.pathname;
                            const childActive = pathname === childHref;
                            return (
                              <li key={typeof child.href === 'string' ? child.href : child.href.pathname}>
                                <Link
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                  href={child.href as any}
                                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                    childActive
                                      ? "text-cashew-green font-medium bg-cashew-green/5"
                                      : "text-neutral-600 hover:text-cashew-green hover:bg-neutral-50"
                                  }`}
                                  aria-current={childActive ? "page" : undefined}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.href as any}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                      itemActive
                        ? "bg-cashew-green/10 text-cashew-green"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                    aria-current={itemActive ? "page" : undefined}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        itemActive
                          ? "text-cashew-green"
                          : "text-neutral-600 group-hover:text-cashew-green"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-neutral-200 space-y-4">
        {/* Language Selector */}
        <button
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors group"
          aria-label="Change language"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-600 group-hover:text-cashew-green" />
            <span className="text-sm font-medium text-neutral-700">English</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-2">
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="p-2 rounded-lg hover:bg-cashew-green/10 transition-colors group"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon className="w-4 h-4 text-neutral-600 group-hover:text-cashew-green transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Version Info */}
        <p className="text-center text-xs text-neutral-500">CGAZ © 2026</p>
      </div>
    </aside>
  );
}
