"use client";

import Link from "next/link";
import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import {
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Sprout,
} from "lucide-react";

export default function TrainingProgramsPage() {
  const trainingPrograms = [
    {
      title: "Foundation Course: Cashew Farming Basics",
      duration: "3 days",
      level: "Beginner",
      participants: "20-30 farmers",
      frequency: "Monthly",
      description:
        "Comprehensive introduction to cashew farming covering soil preparation, planting, irrigation, and basic maintenance.",
      topics: [
        "Cashew tree biology and varieties",
        "Land preparation and spacing",
        "Planting techniques and timing",
        "Water management and irrigation",
        "Basic pest and disease identification",
      ],
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379305/TrainingincashewNurseryManagement10_vjkgne.jpg",
      color: "bg-cashew-green",
    },
    {
      title: "Advanced Pest Management",
      duration: "2 days",
      level: "Intermediate",
      participants: "15-25 farmers",
      frequency: "Quarterly",
      description:
        "In-depth training on identifying, preventing, and treating common cashew pests and diseases using sustainable methods.",
      topics: [
        "Common pests and disease identification",
        "Integrated Pest Management (IPM)",
        "Organic and chemical control methods",
        "Monitoring and early detection systems",
        "Safe pesticide handling and application",
      ],
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379300/CashewMasterTrainerduringTrainingingraftingofcashewseedlings9_vpu845.jpg",
      color: "bg-zambia-copper",
    },
    {
      title: "Pruning and Tree Management",
      duration: "2 days",
      level: "Intermediate",
      participants: "15-20 farmers",
      frequency: "Bi-annually",
      description:
        "Hands-on training in pruning techniques to improve tree health, increase yields, and facilitate harvesting.",
      topics: [
        "Pruning principles and timing",
        "Tools and safety equipment",
        "Shape training for young trees",
        "Rejuvenation pruning for old trees",
        "Wound treatment and care",
      ],
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/Graftingofcashewseedlings_qj0ken.jpg",
      color: "bg-growth-lime",
    },
    {
      title: "Post-Harvest Handling and Quality Control",
      duration: "2 days",
      level: "All levels",
      participants: "20-30 farmers",
      frequency: "Before harvest season",
      description:
        "Learn best practices for harvesting, processing, and storing cashews to maximize quality and market value.",
      topics: [
        "Optimal harvest timing",
        "Proper harvesting techniques",
        "Drying and storage methods",
        "Quality grading standards",
        "Value addition opportunities",
      ],
      image: "https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379299/Sun-dryingofrawcashews_kfdmyc.jpg",
      color: "bg-sky-blue",
    },
  ];

  const trainingBenefits = [
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description:
        "Learn from experienced agronomists and successful cashew farmers.",
    },
    {
      icon: Sprout,
      title: "Hands-On Practice",
      description:
        "Practical field sessions at demonstration farms for real-world experience.",
    },
    {
      icon: Users,
      title: "Peer Learning",
      description:
        "Network with fellow farmers and share knowledge and experiences.",
    },
    {
      icon: CheckCircle,
      title: "Certification",
      description:
        "Receive certificates upon completion to validate your skills.",
    },
  ];

  const upcomingTraining = [
    {
      title: "Foundation Course: Cashew Farming Basics",
      date: "March 15-17, 2024",
      location: "Choma Development Center",
      spots: 8,
    },
    {
      title: "Advanced Pest Management",
      date: "March 22-23, 2024",
      location: "Livingstone Development Center",
      spots: 12,
    },
    {
      title: "Post-Harvest Handling",
      date: "April 5-6, 2024",
      location: "Monze Development Center",
      spots: 15,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Training Programs"
        subtitle="Comprehensive training to help you build a successful and sustainable cashew farming business."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Invest in Your Knowledge
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            CGAZ&apos;s training programs are designed to equip farmers with the
            knowledge and skills needed to maximize cashew yields, improve
            quality, and increase profitability. Our programs combine classroom
            learning with hands-on practice at demonstration farms.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Over 15,000 farmers have completed our training programs, with many
            reporting significant improvements in their harvests and incomes.
          </p>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Choose from a range of courses designed for different skill levels
              and farming needs.
            </p>
          </div>

          <div className="space-y-8">
            {trainingPrograms.map((program, index) => (
              <GlassCard
                key={index}
                className="overflow-hidden bg-white shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <OptimizedImage
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-4 left-4 px-4 py-2 ${program.color} text-white rounded-lg font-semibold text-sm`}
                    >
                      {program.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-2 p-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      {program.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{program.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{program.frequency}</span>
                      </div>
                    </div>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Topics Covered */}
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-3">
                        Topics Covered:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {program.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="flex items-start gap-2 text-sm text-neutral-600"
                          >
                            <CheckCircle className="w-4 h-4 text-cashew-green flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <Link href="/farmers/training/register">
                        <Button variant="primary" size="md">
                          Register for This Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Training Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose CGAZ Training?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our training programs are designed to deliver practical,
              actionable knowledge you can apply immediately on your farm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trainingBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-green/10 rounded-xl mb-4">
                  <benefit.icon className="w-8 h-8 text-cashew-green" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Training Sessions */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Upcoming Training Sessions
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Register now for our next training sessions. Spots fill up
              quickly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {upcomingTraining.map((session, index) => (
              <GlassCard key={index} className="p-6 bg-white shadow-lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  {session.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4 text-cashew-green flex-shrink-0 mt-0.5" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <MapPin className="w-4 h-4 text-cashew-green flex-shrink-0 mt-0.5" />
                    <span>{session.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mb-4">
                  <span className="text-sm text-neutral-600">
                    Spots remaining:
                  </span>
                  <span className="font-bold text-cashew-green">
                    {session.spots}
                  </span>
                </div>

                <Link href="/farmers/training/register">
                  <Button variant="primary" size="sm" fullWidth>
                    Register Now
                  </Button>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Enhance Your Skills?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Join thousands of farmers who have improved their yields and incomes
            through CGAZ training programs. Register today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/farmers/training/register">
              <Button
                variant="glass"
                size="lg"
                className="bg-white text-cashew-green hover:bg-neutral-100"
              >
                Register for Training
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="glass"
                size="lg"
                className="border-2 border-white hover:bg-white/10"
              >
                Contact Training Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
