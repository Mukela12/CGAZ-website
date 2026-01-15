"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Button } from "@/components/shared/Button";
import {
  Building2,
  Globe,
  Landmark,
  Users,
  Handshake,
  ExternalLink,
} from "lucide-react";

interface Partner {
  name: string;
  logo: string;
  description: string;
  type: string;
  website?: string;
  collaboration: string;
}

export default function PartnersPage() {
  const governmentPartners: Partner[] = [
    {
      name: "Ministry of Agriculture",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/ministry-of-agriculture_lzmqiz.png",
      description:
        "Primary government partner providing policy support, technical assistance, and infrastructure development.",
      type: "Government",
      website: "https://www.agriculture.gov.zm",
      collaboration: "Since 2013",
    },
    {
      name: "Ministry of Commerce, Trade and Industry",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452736/ministry-of-commerce_sfyzmu.jpg",
      description:
        "Facilitating trade agreements and market access opportunities for CGAZ members.",
      type: "Government",
      collaboration: "Since 2018",
    },
  ];

  const internationalPartners: Partner[] = [
    {
      name: "GIZ (Deutsche Gesellschaft)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/giz-logo_h8u91n.png",
      description:
        "German development agency supporting agricultural value chain development and training.",
      type: "Development Partner",
      website: "https://www.giz.de",
      collaboration: "Since 2019",
    },
    {
      name: "European Union",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/eu-logo_mf2oug.png",
      description:
        "Supporting agricultural development and regional integration through development programs.",
      type: "International Organization",
      website: "https://www.eeas.europa.eu",
      collaboration: "Since 2018",
    },
    {
      name: "African Development Bank (AfDB)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452741/afdb-logo_hck4eg.png",
      description:
        "Funding infrastructure development and providing technical assistance for productivity improvement.",
      type: "International Financial Institution",
      website: "https://www.afdb.org",
      collaboration: "Since 2020",
    },
    {
      name: "OACPS (Organisation of ACP States)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/oacps-logo_ydtc17.png",
      description:
        "Supporting sustainable agricultural development and trade facilitation across ACP countries.",
      type: "International Organization",
      website: "https://www.acp.int",
      collaboration: "Since 2017",
    },
    {
      name: "USAID",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/usaid-logo_uke7kt.svg",
      description:
        "Supporting agricultural productivity, market access, and rural development programs.",
      type: "Development Partner",
      website: "https://www.usaid.gov",
      collaboration: "Since 2016",
    },
    {
      name: "IFAD (International Fund for Agricultural Development)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452740/ifad-logo_jxqtvo.webp",
      description:
        "Investing in rural people and supporting smallholder farmer development programs.",
      type: "UN Agency",
      website: "https://www.ifad.org",
      collaboration: "Since 2015",
    },
  ];

  const ngoPartners: Partner[] = [
    {
      name: "Heifer International",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452741/heifer-international_p0mdgq.webp",
      description:
        "Providing livestock integration programs and sustainable agriculture training.",
      type: "NGO",
      website: "https://www.heifer.org",
      collaboration: "Since 2018",
    },
    {
      name: "SNV Netherlands Development Organisation",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452739/snv-logo_ywqrhk.jpg",
      description:
        "Supporting sustainable agricultural development and strengthening local value chains.",
      type: "NGO",
      website: "https://www.snv.org",
      collaboration: "Since 2017",
    },
    {
      name: "Farm Radio International",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/farm-radio-international_axfn8y.webp",
      description:
        "Using radio to share agricultural knowledge and connect farmers with vital information.",
      type: "NGO",
      website: "https://www.farmradio.org",
      collaboration: "Since 2019",
    },
  ];

  const privateSectorPartners: Partner[] = [
    {
      name: "Zambia National Commercial Bank (ZANACO)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/zanaco-logo_luwmlw.png",
      description:
        "Financial partner providing agricultural loans and mobile banking services to members.",
      type: "Financial Institution",
      collaboration: "Since 2015",
    },
    {
      name: "University of Zambia (UNZA)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/unza-logo_d4gj1b.png",
      description:
        "Academic partner providing research support and capacity building for agricultural development.",
      type: "Academic Institution",
      collaboration: "Since 2018",
    },
    {
      name: "Zambia Agriculture Research Institute (ZARI)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/zari-logo_tyg58o.png",
      description:
        "Research partner developing improved cashew varieties and sustainable farming techniques.",
      type: "Research Institution",
      collaboration: "Since 2016",
    },
    {
      name: "International Institute of Tropical Agriculture (IITA)",
      logo: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452736/iita-logo_olt4qu.png",
      description:
        "Providing research and technical expertise in tropical agriculture and crop improvement.",
      type: "Research Institution",
      collaboration: "Since 2019",
    },
  ];

  const partnershipBenefits = [
    {
      icon: Users,
      title: "Access to 22,490 Farmers",
      description:
        "Connect with a large network of organized cashew farmers across 10 districts.",
    },
    {
      icon: Building2,
      title: "Established Infrastructure",
      description:
        "Leverage our 145 development centers for program delivery and outreach.",
    },
    {
      icon: Landmark,
      title: "Government Backing",
      description:
        "Work with a recognized cooperative with strong government support.",
    },
    {
      icon: Handshake,
      title: "Proven Track Record",
      description:
        "Partner with an organization that has delivered results since 2010.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Partners"
        subtitle="Collaborating with government, NGOs, and private sector to empower Zambian cashew farmers."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/AgricultureAndLivestockDeputyMinisterGreyfordMondeBeingBriefedOnTheWesternProvinceCashewDevelopmentInitiativeWhenHeVisitedCGAZPremisesInMongu5_bzb3h8.jpg"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Stronger Together
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            CGAZ&apos;s success is built on strong partnerships with government
            agencies, international organizations, NGOs, and private sector
            companies. Together, we&apos;re creating sustainable value chains and
            improving livelihoods for thousands of farming families.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Our collaborative approach ensures that farmers receive comprehensive
            support—from training and inputs to market access and fair prices.
          </p>
        </div>
      </section>

      {/* Government Partners */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-cashew-green rounded-xl flex items-center justify-center">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Government Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {governmentPartners.map((partner, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-white shadow-lg"
              >
                {/* Logo */}
                <div className="h-28 mb-6 flex items-center justify-center bg-neutral-50 rounded-lg p-4">
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name & Type */}
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-cashew-green font-semibold mb-3">
                  {partner.type} • {partner.collaboration}
                </p>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {partner.description}
                </p>

                {/* Website Link */}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cashew-green hover:text-cashew-dark-green font-medium transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* International Partners */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              International Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {internationalPartners.map((partner, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-neutral-50 shadow-lg"
              >
                <div className="h-28 mb-6 flex items-center justify-center bg-white rounded-lg p-4">
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="250px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-sky-blue font-semibold mb-3">
                  {partner.type}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  {partner.description}
                </p>
                <p className="text-xs text-neutral-500">{partner.collaboration}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* NGO Partners */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-zambia-copper rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              NGO Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {ngoPartners.map((partner, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-white shadow-lg"
              >
                <div className="h-28 mb-6 flex items-center justify-center bg-neutral-50 rounded-lg p-4">
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-zambia-copper font-semibold mb-3">
                  {partner.type} • {partner.collaboration}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {partner.description}
                </p>

                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zambia-copper hover:text-earth-brown font-medium transition-colors"
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Financial Partners */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-growth-lime rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Research & Financial Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {privateSectorPartners.map((partner, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-neutral-50 shadow-lg"
              >
                <div className="h-28 mb-6 flex items-center justify-center bg-white rounded-lg p-4">
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="250px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-growth-lime font-semibold mb-3">
                  {partner.type}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  {partner.description}
                </p>
                <p className="text-xs text-neutral-500">{partner.collaboration}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Partner with CGAZ?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Join our network of partners working to transform Zambia&apos;s
              cashew industry and improve farmer livelihoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
                  <benefit.icon className="w-8 h-8 text-cashew-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Become a Partner
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Are you interested in partnering with CGAZ? We welcome collaborations
            with organizations committed to sustainable agriculture and farmer
            empowerment. Let&apos;s work together to create lasting impact.
          </p>
          <Button variant="primary" size="lg">
            Contact Partnership Team
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
