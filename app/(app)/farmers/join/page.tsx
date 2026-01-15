"use client";

import Link from "next/link";
import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import {
  CheckCircle,
  Users,
  DollarSign,
  MapPin,
  FileText,
  Phone,
  Mail,
  CreditCard,
  AlertCircle,
} from "lucide-react";

export default function JoinCGAZPage() {
  const membershipBenefits = [
    {
      title: "Comprehensive Training",
      description:
        "Access to all CGAZ training programs, workshops, and demonstration farms.",
    },
    {
      title: "Market Access",
      description:
        "Direct connections to verified buyers offering competitive, fair prices.",
    },
    {
      title: "Quality Inputs",
      description:
        "Subsidized seedlings, fertilizers, and farming tools at member prices.",
    },
    {
      title: "Expert Advisory",
      description:
        "Free consultation with agricultural experts via phone, SMS, or in-person.",
    },
    {
      title: "Resource Library",
      description:
        "Access to 200+ farming guides, weather data, and market information.",
    },
    {
      title: "Community Network",
      description:
        "Join 22,490 farmers sharing knowledge, experiences, and support.",
    },
    {
      title: "Financial Services",
      description:
        "Access to agricultural loans and savings programs through partner banks.",
    },
    {
      title: "Insurance Coverage",
      description:
        "Subsidized crop insurance to protect your investment (optional add-on).",
    },
  ];

  const membershipRequirements = [
    "Be a Zambian citizen or legal resident",
    "Own or lease land for cashew farming (minimum 0.5 hectares)",
    "Commit to sustainable farming practices",
    "Attend at least one training session per year",
    "Pay annual membership fee of ZMW 50",
  ];

  const registrationSteps = [
    {
      number: 1,
      title: "Visit a Center",
      description:
        "Find your nearest CGAZ development center. We have 145 centers across 10 districts.",
      icon: MapPin,
    },
    {
      number: 2,
      title: "Complete Form",
      description:
        "Fill out the membership application form with your personal and farm details.",
      icon: FileText,
    },
    {
      number: 3,
      title: "Pay Membership Fee",
      description:
        "Pay the annual fee of ZMW 50. Payment methods: Cash, Mobile Money, or Bank Transfer.",
      icon: CreditCard,
    },
    {
      number: 4,
      title: "Start Benefiting",
      description:
        "Receive your membership card and immediately access all CGAZ services and resources.",
      icon: CheckCircle,
    },
  ];

  const pricingDetails = [
    {
      item: "Annual Membership Fee",
      price: "ZMW 50",
      description: "One-time payment per year",
    },
    {
      item: "Registration Fee (First Year Only)",
      price: "ZMW 20",
      description: "One-time administrative fee",
    },
    {
      item: "Total First Year",
      price: "ZMW 70",
      description: "Subsequent years: ZMW 50 only",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Join CGAZ Today"
        subtitle="Become part of Zambia's largest cashew farming community and transform your farm into a thriving business."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379306/Womenbeneficiariesatthelaunchofthe2025_26cashewseedlingdistribution26_rkynef.jpg"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Why Join CGAZ?
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            For just ZMW 50 per year, you gain access to comprehensive training,
            expert advice, market connections, and a supportive community of over
            22,000 farmers. Our members report an average income increase of 45%
            within two years of joining.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Whether you&apos;re just starting your cashew farming journey or
            looking to expand your operations, CGAZ provides the support you need
            to succeed.
          </p>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Membership Benefits
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Access a comprehensive support system designed to help your farm
              thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipBenefits.map((benefit, index) => (
              <GlassCard
                key={index}
                className="p-6 bg-white shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-cashew-green/10 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-cashew-green" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Affordable membership that pays for itself many times over.
            </p>
          </div>

          <GlassCard className="p-8 lg:p-12 bg-gradient-to-br from-cashew-green to-cashew-dark-green text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <DollarSign className="w-12 h-12" />
                <div className="text-6xl font-bold">50</div>
                <div className="text-left">
                  <div className="text-sm">ZMW</div>
                  <div className="text-sm opacity-80">per year</div>
                </div>
              </div>
              <p className="text-lg text-white/90">
                Less than ZMW 5 per month for full access to all CGAZ services
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {pricingDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div>
                    <div className="font-semibold text-white">
                      {detail.item}
                    </div>
                    <div className="text-sm text-white/80">
                      {detail.description}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {detail.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/90">
                  <strong>Money-Back Guarantee:</strong> If you attend at least
                  one training session and don&apos;t find value in your
                  membership, we&apos;ll refund your fee within the first 3
                  months. No questions asked.
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Membership Requirements
            </h2>
            <p className="text-lg text-neutral-600">
              Simple requirements to ensure CGAZ serves dedicated cashew farmers.
            </p>
          </div>

          <GlassCard className="p-8 bg-white shadow-lg">
            <ul className="space-y-4">
              {membershipRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cashew-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg text-neutral-700 leading-relaxed">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* How to Register */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              How to Register
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join CGAZ in four simple steps. The entire process takes less than
              30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {registrationSteps.map((step) => (
              <GlassCard
                key={step.number}
                className="p-6 bg-neutral-50 shadow-lg text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-cashew-green rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="mt-8 mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full">
                    <step.icon className="w-8 h-8 text-cashew-green" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg">
              Find Your Nearest Center
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our membership team is here to help. Reach out through any of these
              channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <GlassCard className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
              <p className="text-white/80 mb-4">Monday - Friday, 8AM - 5PM</p>
              <a
                href="tel:+260XXXXXXXXX"
                className="text-cashew-green font-semibold hover:text-growth-lime transition-colors"
              >
                +260 XXX XXX XXX
              </a>
            </GlassCard>

            <GlassCard className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
              <p className="text-white/80 mb-4">We respond within 24 hours</p>
              <a
                href="mailto:membership@cgaz.org"
                className="text-cashew-green font-semibold hover:text-growth-lime transition-colors"
              >
                membership@cgaz.org
              </a>
            </GlassCard>

            <GlassCard className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Visit a Center
              </h3>
              <p className="text-white/80 mb-4">145 centers across Zambia</p>
              <a
                href="/contact"
                className="text-cashew-green font-semibold hover:text-growth-lime transition-colors"
              >
                Find Nearest Center
              </a>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-cashew-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Join 22,490 farmers who are building successful cashew farming
            businesses with CGAZ. Your journey to prosperity starts with one
            simple step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/farmers/training/register">
              <Button
                variant="glass"
                size="lg"
                className="bg-white text-cashew-green hover:bg-neutral-100"
              >
                Register Now
              </Button>
            </Link>
            <a href="/forms/cgaz-application-form.pdf" download="CGAZ-Application-Form.pdf">
              <Button
                variant="glass"
                size="lg"
                className="border-2 border-white hover:bg-white/10"
              >
                Download Application Form
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
