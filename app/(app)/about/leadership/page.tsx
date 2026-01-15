"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Mail, Linkedin, Phone } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export default function LeadershipPage() {
  const executiveTeam: TeamMember[] = [
    {
      name: "Dr. Joseph Mwanza",
      role: "Executive Director",
      bio: "With over 20 years of experience in agricultural development, Dr. Mwanza leads CGAZ's strategic vision and operations.",
      image: "/images/team/executive-director.jpg",
      email: "j.mwanza@cgaz.org",
      linkedin: "#",
    },
    {
      name: "Grace Banda",
      role: "Director of Operations",
      bio: "Grace oversees daily operations across all 145 development centers, ensuring quality service delivery to members.",
      image: "/images/team/director-operations.jpg",
      email: "g.banda@cgaz.org",
      linkedin: "#",
    },
    {
      name: "Peter Zulu",
      role: "Director of Training & Development",
      bio: "Peter manages CGAZ's comprehensive training programs, having trained over 15,000 farmers in modern techniques.",
      image: "/images/team/director-training.jpg",
      email: "p.zulu@cgaz.org",
      linkedin: "#",
    },
    {
      name: "Martha Chilufya",
      role: "Director of Market Access",
      bio: "Martha develops and maintains relationships with buyers, opening new markets for CGAZ members domestically and internationally.",
      image: "/images/team/director-market.jpg",
      email: "m.chilufya@cgaz.org",
      linkedin: "#",
    },
  ];

  const boardMembers: TeamMember[] = [
    {
      name: "Hon. Isaac Mbewe",
      role: "Board Chairperson",
      bio: "Former Deputy Minister of Agriculture with extensive experience in agricultural policy and farmer cooperatives.",
      image: "/images/team/board-chair.jpg",
    },
    {
      name: "Prof. Sarah Phiri",
      role: "Vice Chairperson",
      bio: "Agricultural economist and professor at University of Zambia, specializing in rural development.",
      image: "/images/team/board-vice-chair.jpg",
    },
    {
      name: "Daniel Tembo",
      role: "Board Member",
      bio: "Seasoned cashew farmer and founding member of CGAZ, representing grassroots farmer interests.",
      image: "/images/team/board-member-1.jpg",
    },
    {
      name: "Elizabeth Kabwe",
      role: "Board Member",
      bio: "Financial expert with background in agricultural financing and microfinance institutions.",
      image: "/images/team/board-member-2.jpg",
    },
    {
      name: "Michael Sakala",
      role: "Board Member",
      bio: "International trade specialist focusing on agricultural exports and market development.",
      image: "/images/team/board-member-3.jpg",
    },
    {
      name: "Ruth Mwale",
      role: "Board Secretary",
      bio: "Legal professional specializing in cooperative law and agricultural policy advocacy.",
      image: "/images/team/board-secretary.jpg",
    },
  ];

  const regionalCoordinators = [
    {
      name: "John Phiri",
      region: "Southern Region",
      centers: 45,
      members: 8500,
    },
    {
      name: "Christine Banda",
      region: "Central Region",
      centers: 38,
      members: 6800,
    },
    {
      name: "David Ng'oma",
      region: "Eastern Region",
      centers: 42,
      members: 5200,
    },
    {
      name: "Mary Simukoko",
      region: "Western Region",
      centers: 20,
      members: 1990,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Leadership Team"
        subtitle="Meet the dedicated leaders guiding CGAZ's mission to empower cashew farmers across Zambia."
        height="medium"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Leadership with Purpose
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            CGAZ is led by a diverse team of agricultural experts, business
            professionals, and passionate advocates for farmer empowerment. Our
            leadership combines decades of experience in agriculture,
            development, finance, and community organizing.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Together, we&apos;re committed to building a sustainable and
            prosperous future for Zambian cashew farmers.
          </p>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Executive Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our executive team manages day-to-day operations and implements
              strategic initiatives across the organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {executiveTeam.map((member, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-white shadow-lg text-center"
              >
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cashew-green/20">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-cashew-green mb-3">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Contact Links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-neutral-200">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-neutral-100 hover:bg-cashew-green hover:text-white transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="p-2 rounded-lg bg-neutral-100 hover:bg-cashew-green hover:text-white transition-colors"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-100 hover:bg-cashew-green hover:text-white transition-colors"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Board of Directors
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our board provides strategic oversight and ensures CGAZ remains
              accountable to its members and stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boardMembers.map((member, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-6 bg-neutral-50 shadow-lg"
              >
                <div className="flex gap-4 mb-4">
                  {/* Profile Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-3 border-sky-blue/20">
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-sky-blue">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {member.bio}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Coordinators */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Regional Coordinators
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our regional coordinators manage operations and support farmers in
              their respective areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalCoordinators.map((coordinator, index) => (
              <GlassCard
                key={index}
                className="p-6 bg-white shadow-lg text-center"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {coordinator.name}
                </h3>
                <p className="text-sm font-semibold text-cashew-green mb-4">
                  {coordinator.region}
                </p>

                <div className="space-y-2 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Centers:</span>
                    <span className="font-bold text-neutral-900">
                      {coordinator.centers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Members:</span>
                    <span className="font-bold text-neutral-900">
                      {coordinator.members.toLocaleString()}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            CGAZ is always looking for passionate individuals who share our
            commitment to empowering farmers and transforming agriculture in
            Zambia. Explore career opportunities with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cashew-green rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact HR
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
