"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { GlassCard } from "@/components/shared/GlassCard";

export default function OurStoryPage() {
  const milestones = [
    {
      year: "2007",
      title: "Foundation",
      description:
        "CGAZ was registered under the Societies Act (Registration No. ORS/101/06/176) by dedicated cashew farmers seeking to rehabilitate degraded land and create sustainable livelihoods in Western Province.",
    },
    {
      year: "2009",
      title: "First Project",
      description:
        "Launched the Mongu Cashew Development and Environmental Protection Project with Ministry of Lands support, establishing the foundation for community cashew development.",
    },
    {
      year: "2011",
      title: "European Commission Support",
      description:
        "Received capacity building support from the European Commission, strengthening organizational systems and farmer training programs.",
    },
    {
      year: "2015",
      title: "World Bank Partnership",
      description:
        "Became Climate Risk Adaptation Facilitator under the Pilot Project for Climate Resilience (PPCR II), developing 250 Community Adaptation Projects across Western Province.",
    },
    {
      year: "2017",
      title: "African Development Bank Project",
      description:
        "Launched the Cashew Infrastructure Development Project (CIDP) with AfDB funding, mobilizing over 22,000 farmers and establishing warehouse receipt systems.",
    },
    {
      year: "2024",
      title: "22,490 Members Strong",
      description:
        "Reached 22,490 members across 145 Cashew Development Centers in 10 districts, with the launch of the GIZ/EU-funded Nalolo Women & Youth Empowerment Project.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Story"
        subtitle="From humble beginnings to becoming Zambia's leading cashew farming association."
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/FormerRepublicanPresidentH.EEdgar.LunguandGenderMinisterProfessorNandiLuoAdmiresProcessedCashewNutsAtTheCGAZStandDuringTheWomenEmpowermentExhibition34_qifhjq.jpg"
        objectPosition="center 35%"
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
                The Cashew Growers Association of Zambia was established in 2007
                with a powerful vision: to build a strong cashew industry where
                Zambians equitably benefit in all stages of the cashew value chain.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                Founded in Western Province, CGAZ emerged from the recognition that
                cashew trees could transform the heavily degraded Kalahari sand
                landscapes into productive orchards, providing sustainable livelihoods
                for vulnerable communities while rehabilitating the environment.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                From our headquarters at the Zambia Agriculture Research Institute
                in Mongu, we have grown to represent over 22,490 farmers across
                145 Cashew Development Centers in 10 districts of Western Province.
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
                  src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379302/PromotingSmallScaleCashewprocessing_rvgssn.jpg"
                  alt="Promoting small scale cashew processing - market access initiatives"
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
