'use client'

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NewsletterSignup } from "./NewsletterSignup";
import { useSiteMetrics } from "@/lib/hooks/useSiteMetrics";

interface FooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Use glassmorphism variant for overlay on images */
  variant?: "default" | "glass";
}

/**
 * Footer Component
 *
 * Comprehensive footer with:
 * - CGAZ branding and mission statement
 * - Multi-column navigation links
 * - Contact information
 * - Social media links
 * - Copyright notice
 * - Optional glassmorphism styling
 *
 * @example
 * ```tsx
 * <Footer variant="default" />
 * ```
 */
export function Footer({ className, variant = "default" }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { metrics } = useSiteMetrics();

  const navigationSections = [
    {
      title: "About CGAZ",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Mission & Vision", href: "/about/mission" },
        { label: "Leadership Team", href: "/about/leadership" },
        { label: "Our Partners", href: "/about/partners" },
      ],
    },
    {
      title: "For Farmers",
      links: [
        { label: "Training Programs", href: "/farmers/training" },
        { label: "Resources", href: "/farmers/resources" },
        { label: "Success Stories", href: "/farmers/stories" },
        { label: "Join CGAZ", href: "/farmers/join" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Projects", href: "/projects" },
        { label: "Products", href: "/products" },
        { label: "News & Events", href: "/news" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#", ariaLabel: "Visit CGAZ on Facebook" },
    { icon: Twitter, label: "Twitter", href: "#", ariaLabel: "Visit CGAZ on Twitter" },
    { icon: Instagram, label: "Instagram", href: "#", ariaLabel: "Visit CGAZ on Instagram" },
    { icon: Linkedin, label: "LinkedIn", href: "#", ariaLabel: "Visit CGAZ on LinkedIn" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+260 977 429 666" },
    { icon: Mail, text: "allanchinambu666@gmail.com" },
    { icon: MapPin, text: "ZARI, Room 09, Mongu, Zambia" },
  ];

  const baseStyles = variant === "glass"
    ? "backdrop-blur-md bg-white/10 border-t border-white/20"
    : "bg-neutral-900 text-neutral-100";

  const linkStyles = variant === "glass"
    ? "text-white/90 hover:text-white"
    : "text-neutral-400 hover:text-neutral-100";

  const headingStyles = variant === "glass"
    ? "text-white font-semibold"
    : "text-neutral-100 font-semibold";

  return (
    <footer className={cn(baseStyles, "py-12 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src="/images/logo/cashew-logo.png"
                  alt="CGAZ Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <h3 className={cn(headingStyles, "text-2xl")}>
                  CGAZ
                </h3>
              </div>
              <p className={variant === "glass" ? "text-white/80 text-sm" : "text-neutral-400 text-sm"}>
                Cashew Growers Association of Zambia
              </p>
            </div>
            <p className={cn(variant === "glass" ? "text-white/70" : "text-neutral-400", "text-sm mb-6 max-w-sm")} suppressHydrationWarning>
              Empowering {metrics.membersCount.toLocaleString()} cashew farmers across Zambia through sustainable farming practices,
              quality training, and market access.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-4 h-4",
                    variant === "glass" ? "text-white/70" : "text-cashew-green"
                  )} />
                  <span className={cn(
                    "text-sm",
                    variant === "glass" ? "text-white/80" : "text-neutral-400"
                  )}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h4 className={cn(headingStyles, "text-sm mb-4 uppercase tracking-wider")}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={link.href as any}
                      className={cn(
                        linkStyles,
                        "text-sm transition-colors duration-200 hover:underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="my-12">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>

        {/* Divider */}
        <div className={cn(
          "border-t mb-8",
          variant === "glass" ? "border-white/20" : "border-neutral-800"
        )} />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className={cn(
            "text-sm",
            variant === "glass" ? "text-white/70" : "text-neutral-400"
          )}>
            &copy; {currentYear} Cashew Growers Association of Zambia. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <span className={cn(
              "text-sm mr-2",
              variant === "glass" ? "text-white/70" : "text-neutral-400"
            )}>
              Follow us:
            </span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  variant === "glass"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-neutral-800 hover:bg-cashew-green text-neutral-400 hover:text-white"
                )}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Additional Legal Links */}
        <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-wrap justify-center gap-6">
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={"/privacy" as any}
            className={cn(linkStyles, "text-xs transition-colors duration-200")}
          >
            Privacy Policy
          </Link>
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={"/terms" as any}
            className={cn(linkStyles, "text-xs transition-colors duration-200")}
          >
            Terms of Service
          </Link>
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={"/sitemap" as any}
            className={cn(linkStyles, "text-xs transition-colors duration-200")}
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
