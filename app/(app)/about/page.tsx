"use client";

import { Hero } from "@/components/shared/Hero";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { Footer } from "@/components/shared/Footer";
import { BookOpen, Target, Users, Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSiteMetrics } from "@/lib/hooks/useSiteMetrics";

export default function AboutPage() {
  const { metrics } = useSiteMetrics();
  const aboutSections = [
    {
      icon: BookOpen,
      title: "Our Story",
      description:
        "Learn about CGAZ's journey from humble beginnings to becoming Zambia's leading cashew farming association.",
      href: "/about/story",
      color: "bg-cashew-green",
    },
    {
      icon: Target,
      title: "Mission & Vision",
      description:
        "Discover our mission to empower farmers and our vision for a thriving cashew industry in Zambia.",
      href: "/about/mission",
      color: "bg-sky-blue",
    },
    {
      icon: Users,
      title: "Leadership Team",
      description:
        "Meet the dedicated leaders and staff who guide CGAZ's initiatives and support our farming community.",
      href: "/about/leadership",
      color: "bg-zambia-copper",
    },
    {
      icon: Handshake,
      title: "Our Partners",
      description:
        "Explore our collaborations with government agencies, NGOs, and international organizations.",
      href: "/about/partners",
      color: "bg-growth-lime",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="About CGAZ"
        subtitle="Building a stronger cashew farming community across Zambia through collaboration, innovation, and dedication."
        height="medium"
      />

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6" suppressHydrationWarning>
              The Cashew Growers Association of Zambia (CGAZ) is a farmer-owned
              cooperative established to improve the livelihoods of cashew farmers
              across the nation. We represent {metrics.membersCount.toLocaleString()} registered members operating
              through {metrics.centersCount} development centers in {metrics.districtsCount} districts.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Through sustainable agricultural practices, comprehensive training
              programs, and market access initiatives, we&apos;re building a robust
              cashew industry that benefits farmers, their families, and the entire
              country.
            </p>
          </div>
        </div>
      </section>

      {/* About Sections Grid */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Learn More About CGAZ
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Explore the different aspects of our organization and discover how
              we&apos;re making a difference in Zambia&apos;s agricultural sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {aboutSections.map((section, index) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link key={index} href={section.href as any}>
                <GlassCard
                  hoverable
                  className="p-8 h-full bg-white hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${section.color} text-white mb-6`}
                  >
                    <section.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconAfter={<ArrowRight className="w-4 h-4" />}
                    className="text-cashew-green"
                  >
                    Learn More
                  </Button>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 text-center mb-12">
            CGAZ at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-cashew-green mb-2" suppressHydrationWarning>
                {metrics.membersCount.toLocaleString()}
              </div>
              <div className="text-neutral-600">Registered Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cashew-green mb-2" suppressHydrationWarning>
                {metrics.centersCount}
              </div>
              <div className="text-neutral-600">Development Centers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cashew-green mb-2" suppressHydrationWarning>
                {metrics.districtsCount}
              </div>
              <div className="text-neutral-600">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cashew-green mb-2" suppressHydrationWarning>
                {metrics.growthRate}
              </div>
              <div className="text-neutral-600">Growth Rate (YoY)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Become part of CGAZ and access training, resources, and market
            opportunities that will help your farm thrive.
          </p>
          <Button
            variant="glass"
            size="lg"
            iconAfter={<ArrowRight className="w-5 h-5" />}
            className="bg-white/20 hover:bg-white/30"
          >
            Become a Member
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
