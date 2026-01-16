"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { Stats } from "@/components/shared/Stats";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  UserPlus,
  Sprout,
  TrendingUp,
  Users,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSiteMetrics } from "@/lib/hooks/useSiteMetrics";

export default function FarmersPage() {
  const { metrics } = useSiteMetrics();
  const farmerServices = [
    {
      icon: GraduationCap,
      title: "Training Programs",
      description:
        "Comprehensive training in modern cashew farming techniques, pest management, and sustainable practices.",
      href: "/farmers/training",
      color: "bg-cashew-green",
      stats: "15,000+ farmers trained",
    },
    {
      icon: BookOpen,
      title: "Resources & Tools",
      description:
        "Access farming guides, weather forecasts, market prices, and expert advice to optimize your farm.",
      href: "/farmers/resources",
      color: "bg-sky-blue",
      stats: "200+ resources available",
    },
    {
      icon: Trophy,
      title: "Success Stories",
      description:
        "Get inspired by fellow farmers who have transformed their livelihoods through CGAZ membership.",
      href: "/farmers/stories",
      color: "bg-zambia-copper",
      stats: "100+ stories shared",
    },
    {
      icon: UserPlus,
      title: "Join CGAZ",
      description:
        "Become a member and unlock access to training, resources, market opportunities, and community support.",
      href: "/farmers/join",
      color: "bg-growth-lime",
      stats: `${metrics.membersCount.toLocaleString()} active members`,
      suppressHydration: true,
    },
  ];

  const memberBenefits = [
    {
      title: "Quality Training",
      description:
        "Regular workshops and hands-on training in modern farming techniques.",
      icon: GraduationCap,
    },
    {
      title: "Market Access",
      description:
        "Direct connections to buyers offering fair prices for your cashew harvest.",
      icon: TrendingUp,
    },
    {
      title: "Subsidized Inputs",
      description:
        "Access to quality seedlings, fertilizers, and tools at discounted prices.",
      icon: Sprout,
    },
    {
      title: "Community Support",
      description:
        `Join a network of ${metrics.membersCount.toLocaleString()} farmers sharing knowledge and experiences.`,
      icon: Users,
      suppressHydration: true,
    },
    {
      title: "Technical Assistance",
      description:
        "Get expert advice on pest control, soil management, and crop optimization.",
      icon: BookOpen,
    },
    {
      title: "Local Centers",
      description:
        `Visit any of our ${metrics.centersCount} development centers across ${metrics.districtsCount} districts for support.`,
      icon: MapPin,
      suppressHydration: true,
    },
  ];

  const impactStats = [
    {
      icon: Users,
      value: metrics.membersCount.toLocaleString(),
      label: "Active Members",
      description: "Farmers benefiting from CGAZ services",
      suppressHydration: true,
    },
    {
      icon: TrendingUp,
      value: "45%",
      label: "Income Increase",
      description: "Average improvement in farmer income",
    },
    {
      icon: GraduationCap,
      value: "15,000+",
      label: "Trained Farmers",
      description: "Farmers completed training programs",
    },
    {
      icon: MapPin,
      value: metrics.centersCount.toString(),
      label: "Service Centers",
      description: "Locations providing farmer support",
      suppressHydration: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Resources for Farmers"
        subtitle="Empowering cashew farmers with training, resources, and community support to build thriving, sustainable farms."
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379297/Womenbeneficiariesatthelaunchofthe2025_26cashewseedlingdistribution26_rkynef.jpg"
        objectPosition="center 30%"
        height="large"
        primaryCta={{
          label: "Join CGAZ Today",
          href: "/farmers/join",
        }}
        secondaryCta={{
          label: "Explore Resources",
          href: "/farmers/resources",
        }}
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Your Success is Our Mission
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            At CGAZ, we believe every farmer deserves access to the knowledge,
            tools, and markets needed to succeed. Whether you&apos;re just
            starting your cashew farming journey or looking to expand your
            operations, we&apos;re here to support you every step of the way.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Join thousands of farmers across Zambia who are growing their
            businesses and improving their livelihoods through CGAZ membership.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <Stats
        title="Our Impact on Farmers"
        subtitle="Real results from our commitment to farmer empowerment"
        stats={impactStats}
        className="bg-neutral-50"
      />

      {/* Services for Farmers */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              What We Offer Farmers
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Comprehensive support designed to help you grow a profitable and
              sustainable cashew farming business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {farmerServices.map((service, index) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link key={index} href={service.href as any}>
                <GlassCard
                  hoverable
                  className="p-8 h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.color} text-white mb-6`}
                  >
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-sm font-semibold text-cashew-green" suppressHydrationWarning>
                      {service.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-cashew-green transition-colors" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Benefits of CGAZ Membership
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              When you join CGAZ, you gain access to a comprehensive support
              system designed to help your farm thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {memberBenefits.map((benefit, index) => (
              <GlassCard
                key={index}
                className="p-6 bg-white/10 backdrop-blur-md border-white/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/80 leading-relaxed" suppressHydrationWarning>
                  {benefit.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Joining CGAZ is simple. Follow these three easy steps to unlock
              all member benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-green rounded-full text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Visit a Center
              </h3>
              <p className="text-neutral-600">
                Find your nearest CGAZ development center and speak with our
                staff about membership.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-green rounded-full text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Complete Registration
              </h3>
              <p className="text-neutral-600">
                Fill out a simple registration form and pay the annual
                membership fee of ZMW 50.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-green rounded-full text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Start Benefiting
              </h3>
              <p className="text-neutral-600">
                Immediately access training programs, resources, and connect
                with fellow farmers.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              iconAfter={<ArrowRight className="w-5 h-5" />}
            >
              Find Your Nearest Center
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 lg:p-12 bg-white shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-cashew-green/10 rounded-full mb-4">
                <Trophy className="w-10 h-10 text-cashew-green" />
              </div>
            </div>
            <blockquote className="text-xl lg:text-2xl text-neutral-700 leading-relaxed text-center mb-6 italic">
              &quot;Joining CGAZ was the best decision I made for my farm. The
              training programs taught me modern techniques that doubled my
              harvest, and the market connections helped me get fair prices. I
              went from struggling to thriving.&quot;
            </blockquote>
            <div className="text-center">
              <div className="font-bold text-neutral-900 mb-1">
                Daniel Tembo
              </div>
              <div className="text-sm text-neutral-600">
                Cashew Farmer, Choma District • Member since 2016
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-cashew-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed" suppressHydrationWarning>
            Join {metrics.membersCount.toLocaleString()} farmers who are building successful cashew farming
            businesses with CGAZ. Your journey to prosperity starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="glass"
              size="lg"
              className="bg-white text-cashew-green hover:bg-neutral-100"
            >
              Become a Member
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="border-2 border-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
