import Link from "next/link";
import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Sitemap - CGAZ",
  description: "Navigate the Cashew Growers Association of Zambia website.",
};

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Home",
      href: "/",
      children: [],
    },
    {
      title: "About CGAZ",
      href: "/about",
      children: [
        { title: "Our Story", href: "/about/story" },
        { title: "Mission & Vision", href: "/about/mission" },
        { title: "Leadership Team", href: "/about/leadership" },
        { title: "Our Partners", href: "/about/partners" },
      ],
    },
    {
      title: "For Farmers",
      href: "/farmers",
      children: [
        { title: "Training Programs", href: "/farmers/training" },
        { title: "Register for Training", href: "/farmers/training/register" },
        { title: "Resources & Downloads", href: "/farmers/resources" },
        { title: "Success Stories", href: "/farmers/stories" },
        { title: "Join CGAZ", href: "/farmers/join" },
      ],
    },
    {
      title: "Projects",
      href: "/projects",
      children: [],
    },
    {
      title: "Products",
      href: "/products",
      children: [],
    },
    {
      title: "News & Events",
      href: "/news",
      children: [],
    },
    {
      title: "Contact Us",
      href: "/contact",
      children: [],
    },
    {
      title: "Legal",
      href: "#",
      children: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Sitemap"
        subtitle="Navigate our website"
        height="small"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 lg:p-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteStructure.map((section, index) => (
                <div key={index} className="space-y-3">
                  <Link
                    href={section.href as any}
                    className="text-xl font-bold text-neutral-900 hover:text-cashew-green transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="w-5 h-5 text-cashew-green" />
                    {section.title}
                  </Link>
                  {section.children.length > 0 && (
                    <ul className="pl-7 space-y-2">
                      {section.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            href={child.href as any}
                            className="text-neutral-600 hover:text-cashew-green transition-colors"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
