"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { GlassCard } from "@/components/shared/GlassCard";

export default function OurStoryPage() {
  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description:
        "CGAZ was established by a group of dedicated cashew farmers seeking to improve their livelihoods and create sustainable farming practices.",
    },
    {
      year: "2013",
      title: "First Training Program",
      description:
        "Launched our first comprehensive training program, reaching 500 farmers across 3 districts with modern farming techniques.",
    },
    {
      year: "2016",
      title: "Government Partnership",
      description:
        "Secured partnership with the Ministry of Agriculture to expand services and establish development centers nationwide.",
    },
    {
      year: "2019",
      title: "10,000 Members",
      description:
        "Reached a major milestone of 10,000 registered members, becoming one of Zambia's largest agricultural cooperatives.",
    },
    {
      year: "2022",
      title: "Export Market Access",
      description:
        "Successfully established export channels, connecting Zambian cashew farmers to international markets.",
    },
    {
      year: "2024",
      title: "22,490 Members Strong",
      description:
        "Continued growth to over 22,000 members across 145 centers, with expanded training and support programs.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Story"
        subtitle="From humble beginnings to becoming Zambia's leading cashew farming association."
        height="medium"
      />

      {/* Story Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                How It All Began
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                The Cashew Growers Association of Zambia was born from a simple
                yet powerful vision: to empower cashew farmers and create a
                thriving, sustainable industry that would benefit generations to
                come.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                In 2010, a small group of passionate farmers in southern Zambia
                came together to address common challenges they faced: limited
                access to quality seedlings, lack of proper training in modern
                farming techniques, and difficulty reaching profitable markets.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                What started as informal meetings under a cashew tree has grown
                into a nationwide movement, representing over 22,000 farmers and
                transforming communities across Zambia.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg"
                alt="CGAZ founding members at the National Cashew Consultative Forum"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Key milestones that shaped CGAZ into the organization it is today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-cashew-green/20" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <GlassCard className="p-6 lg:p-8 bg-white shadow-lg">
                      <div className="inline-block px-4 py-2 bg-cashew-green text-white rounded-full text-sm font-bold mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </GlassCard>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block relative z-10">
                    <div className="w-6 h-6 bg-cashew-green rounded-full border-4 border-white shadow-lg" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Impact Today
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Through dedication and collaboration, we&apos;ve transformed the
              lives of thousands of farming families across Zambia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <OptimizedImage
                  src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg"
                  alt="Cashew Master Trainers at a training session in Limulunga District"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Comprehensive Training
              </h3>
              <p className="text-neutral-600">
                Over 15,000 farmers trained in modern cashew farming techniques,
                pest management, and sustainable practices.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <OptimizedImage
                  src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379305/WomenWorkingInACashewProcessingFactoryInMongu19_orkqwl.jpg"
                  alt="CGAZ market access initiatives - women working in cashew processing factory"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Market Access
              </h3>
              <p className="text-neutral-600">
                Connected farmers to both domestic and international markets,
                increasing incomes by an average of 45%.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <OptimizedImage
                  src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379297/Womenbeneficiariesatthelaunchofthe2025_26cashewseedlingdistribution26_rkynef.jpg"
                  alt="Community development - women beneficiaries at CGAZ development center"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Community Development
              </h3>
              <p className="text-neutral-600">
                Established 145 development centers providing resources, support,
                and a sense of community to farmers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
