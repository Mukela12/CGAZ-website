"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSlideshow } from "@/components/shared/HeroSlideshow";
import { Stats } from "@/components/shared/Stats";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Users, MapPin, Sprout, TrendingUp, ArrowRight } from "lucide-react";
import { useSiteMetrics } from "@/lib/hooks/useSiteMetrics";

export default function Home() {
  // Fetch dynamic site metrics
  const { metrics } = useSiteMetrics();

  // Stats data for CGAZ impact metrics
  const impactStats = [
    {
      icon: Users,
      value: metrics.membersCount.toLocaleString(),
      label: "Registered Members",
      description: "Farmers empowered across Zambia",
      suppressHydration: true,
    },
    {
      icon: MapPin,
      value: metrics.centersCount.toString(),
      label: "Development Centers",
      description: "Serving communities nationwide",
      suppressHydration: true,
    },
    {
      icon: Sprout,
      value: metrics.districtsCount.toString(),
      label: "Districts Covered",
      description: "Expanding our reach",
      suppressHydration: true,
    },
    {
      icon: TrendingUp,
      value: metrics.growthRate,
      label: "Growth Rate",
      description: "Year-over-year improvement",
      suppressHydration: true,
    },
  ];

  // Hero slideshow images showcasing CGAZ's work
  const heroSlides = [
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/FormerRepublicanPresidentH.EEdgar.LunguandGenderMinisterProfessorNandiLuoAdmiresProcessedCashewNutsAtTheCGAZStandDuringTheWomenEmpowermentExhibition34_qifhjq.jpg",
      alt: "Former Republican President H.E Edgar Lungu and Gender Minister Professor Nandi Luo admires processed cashew nuts at CGAZ stand",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg",
      alt: "Cashew Master Trainers at a training session in Limulunga District",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379300/Officiallaunchofthe2025_26cashewseedlingdistributionbyCGAZ22_mhtksl.jpg",
      alt: "Official launch of 2025-26 cashew seedling distribution by CGAZ",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379305/WomenWorkingInACashewProcessingFactoryInMongu19_orkqwl.jpg",
      alt: "Women working in a cashew processing factory in Mongu",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg",
      alt: "Participants at the National Cashew Consultative Forum",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379297/Womenbeneficiariesatthelaunchofthe2025_26cashewseedlingdistribution26_rkynef.jpg",
      alt: "Women beneficiaries at the launch of 2025-26 seedling distribution",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379299/Sun-dryingofrawcashews_kfdmyc.jpg",
      alt: "Sun-drying of raw cashews",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379295/Cashew-Nursery11_ujzxc6.jpg",
      alt: "CGAZ cashew nursery",
    },
    {
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379297/DistributionOfImprovedCashewPlantingMaterials_gvrekg.jpg",
      alt: "Distribution of improved cashew planting materials",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <HeroSlideshow
        title="Empowering Zambian Cashew Farmers"
        subtitle="Supporting 22,490 farmers across 145 centers with sustainable agricultural practices, quality training, and market access opportunities."
        height="large"
        slides={heroSlides}
        autoPlayInterval={5000}
        primaryCta={{
          label: "Learn More",
          href: "/about",
        }}
        secondaryCta={{
          label: "Join CGAZ",
          href: "/farmers/join",
        }}
      />

      {/* Stats Section */}
      <Stats
        title="Our Impact"
        subtitle="Building a thriving cashew farming community across Zambia"
        stats={impactStats}
        className="bg-neutral-50"
      />

      {/* About Preview Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg"
                alt="Participants at the National Cashew Consultative Forum organized by CGAZ"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                About CGAZ
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                The Cashew Growers Association of Zambia (CGAZ) is a
                farmer-owned cooperative dedicated to improving the livelihoods
                of cashew farmers across the nation. We provide training,
                resources, and market access to help our members thrive.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Through sustainable agricultural practices and community-driven
                initiatives, we&apos;re building a robust cashew industry that
                benefits farmers, their families, and the entire country.
              </p>
              <Link href="/about">
                <Button
                  variant="primary"
                  size="lg"
                  iconAfter={<ArrowRight className="w-5 h-5" />}
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services/Programs Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive support for every stage of your cashew farming journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Training Programs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard variant="primary" hoverable className="p-8 h-full">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Training Programs
                </h3>
                <p className="text-white/80 mb-4">
                  Professional training in modern farming techniques, pest
                  management, and sustainable practices.
                </p>
                <Link href="/farmers/training">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Market Access */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard variant="primary" hoverable className="p-8 h-full">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Market Access
                </h3>
                <p className="text-white/80 mb-4">
                  Connect with buyers, access fair prices, and expand your market
                  reach through our network.
                </p>
                <Link href="/products">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Community Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard variant="primary" hoverable className="p-8 h-full">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Community Support
                </h3>
                <p className="text-white/80 mb-4">
                  Join a thriving community of farmers, share knowledge, and grow
                  together.
                </p>
                <Link href="/farmers/stories">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Ready to Join CGAZ?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed">
            Become part of Zambia&apos;s growing cashew farming community. Access
            training, resources, and market opportunities to take your farm to
            the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/farmers/join">
              <Button variant="primary" size="lg" iconAfter={<ArrowRight className="w-5 h-5" />}>
                Join as a Farmer
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
