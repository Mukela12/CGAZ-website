"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  TrendingUp,
  Leaf,
  Award,
} from "lucide-react";

export default function MissionVisionPage() {
  const coreValues = [
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and accountability in all our dealings with members and partners.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new technologies and methods to improve farming practices and increase productivity.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of working together to achieve common goals and support each other.",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description:
        "We strive for the highest standards in everything we do, from training to market access.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We promote environmentally responsible farming practices that protect our land for future generations.",
    },
    {
      icon: Award,
      title: "Empowerment",
      description:
        "We equip farmers with knowledge, skills, and resources to take control of their livelihoods.",
    },
  ];

  const strategicGoals = [
    {
      title: "Expand Membership",
      description: "Grow to 30,000 registered members by 2027",
      progress: 75,
    },
    {
      title: "Increase Production",
      description: "Double cashew production capacity through improved practices",
      progress: 60,
    },
    {
      title: "Market Development",
      description: "Establish 5 new international export partnerships",
      progress: 40,
    },
    {
      title: "Training Programs",
      description: "Train 20,000 farmers in modern agricultural techniques",
      progress: 80,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Mission & Vision"
        subtitle="Guiding principles that drive our commitment to Zambian cashew farmers."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg"
      />

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cashew-green rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                  Our Mission
                </h2>
              </div>
              <div className="bg-neutral-50 p-8 rounded-2xl border-l-4 border-cashew-green">
                <p className="text-xl text-neutral-700 leading-relaxed font-medium">
                  To empower Zambian cashew farmers through sustainable
                  agricultural practices, comprehensive training, market access,
                  and community support, improving livelihoods and contributing
                  to national food security and economic development.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-64 h-64 bg-gradient-to-br from-cashew-green to-cashew-dark-green rounded-full flex items-center justify-center shadow-2xl">
                <Target className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 bg-gradient-to-br from-sky-blue to-cashew-green rounded-full flex items-center justify-center shadow-2xl">
                <Eye className="w-32 h-32 text-white" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                  Our Vision
                </h2>
              </div>
              <div className="bg-neutral-50 p-8 rounded-2xl border-l-4 border-sky-blue">
                <p className="text-xl text-neutral-700 leading-relaxed font-medium">
                  To be the leading agricultural cooperative in Zambia,
                  recognized for transforming the cashew industry, creating
                  prosperity for farming communities, and establishing Zambia as
                  a premier cashew producer in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              The principles that guide our decisions and shape our relationships
              with members, partners, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-8 bg-white shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-cashew-green/10 rounded-xl mb-4">
                  <value.icon className="w-7 h-7 text-cashew-green" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Strategic Goals (2024-2027)
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our roadmap for continued growth and impact in the coming years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {strategicGoals.map((goal, index) => (
              <GlassCard key={index} className="p-8 bg-neutral-50">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {goal.title}
                </h3>
                <p className="text-neutral-600 mb-6">{goal.description}</p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Progress</span>
                    <span className="font-bold text-cashew-green">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cashew-green to-growth-lime transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Our Commitment to You
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            CGAZ is committed to being more than just an association. We are a
            family, a support network, and a catalyst for positive change in
            Zambian agriculture. Every decision we make, every program we launch,
            and every partnership we form is designed with one goal in mind:
            empowering you to succeed.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Together, we&apos;re not just growing cashews—we&apos;re growing
            opportunities, communities, and a brighter future for Zambia.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
