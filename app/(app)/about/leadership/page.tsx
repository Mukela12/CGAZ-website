import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { Mail, Phone } from "lucide-react";
import { getTeamMembers } from "@/lib/payload/api";

export const metadata = {
  title: "Our Team - CGAZ",
  description:
    "Meet the dedicated team at the Cashew Growers Association of Zambia working to empower cashew farmers across Western Province.",
};

// Helper to get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Avatar placeholder component
function AvatarPlaceholder({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = getInitials(name);
  const sizeClasses = {
    sm: "w-20 h-20 text-xl",
    md: "w-32 h-32 text-3xl",
    lg: "w-40 h-40 text-4xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-cashew-green to-cashew-dark-green flex items-center justify-center text-white font-bold`}
    >
      {initials}
    </div>
  );
}

export default async function LeadershipPage() {
  // Fetch real team members from CMS
  const teamMembers = await getTeamMembers();

  // Filter active members and group by department
  const activeMembers = teamMembers.filter((m: any) => m.isActive !== false);

  const management = activeMembers.filter(
    (m: any) => m.department === "management"
  );
  const technical = activeMembers.filter(
    (m: any) => m.department === "technical"
  );
  const fieldOps = activeMembers.filter((m: any) => m.department === "field");
  const admin = activeMembers.filter((m: any) => m.department === "admin");

  // Get photo URL from media relation
  const getPhotoUrl = (member: any) => {
    if (member.photo?.cloudinaryUrl) {
      return member.photo.cloudinaryUrl;
    }
    if (member.photo?.url) {
      return member.photo.url;
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Team"
        subtitle="Meet the dedicated team working to empower cashew farmers across Western Province."
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg"
        objectPosition="center 25%"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            CGAZ Staff Establishment
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            The Cashew Growers Association of Zambia is staffed by a dedicated
            team of professionals committed to empowering smallholder farmers
            and developing the cashew value chain in Western Province.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Our team is headquartered at the Zambia Agriculture Research
            Institute (ZARI) premises in Mongu, where we coordinate activities
            across 145 Cashew Development Centers serving over 22,490 members.
          </p>
        </div>
      </section>

      {activeMembers.length === 0 ? (
        <section className="py-16 lg:py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-neutral-600">
              Team information is being updated. Please check back soon.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Management Team */}
          {management.length > 0 && (
            <section className="py-16 lg:py-24 bg-neutral-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                    Management
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    Leading CGAZ&apos;s strategic initiatives and organizational
                    development.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
                  {management.map((member: any) => (
                    <GlassCard
                      key={member.id}
                      hoverable
                      className="p-6 bg-white shadow-lg text-center max-w-sm w-full"
                    >
                      {/* Profile Photo or Avatar */}
                      <div className="flex justify-center mb-4">
                        {getPhotoUrl(member) ? (
                          <img
                            src={getPhotoUrl(member)}
                            alt={member.name}
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <AvatarPlaceholder name={member.name} size="md" />
                        )}
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-xl font-bold text-neutral-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-cashew-green mb-2">
                        {member.position}
                      </p>
                      {member.qualification && (
                        <p className="text-xs text-neutral-500 mb-3">
                          {member.qualification}
                        </p>
                      )}

                      {/* Bio */}
                      {member.bio && (
                        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      )}

                      {/* Contact Links */}
                      {(member.email || member.phone) && (
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
                        </div>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Technical Team */}
          {technical.length > 0 && (
            <section className="py-16 lg:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                    Technical Team
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    Providing expertise in cashew production, value chain
                    development, and farmer training.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
                  {technical.map((member: any) => (
                    <GlassCard
                      key={member.id}
                      hoverable
                      className="p-6 bg-neutral-50 shadow-lg max-w-sm w-full"
                    >
                      <div className="flex gap-4 mb-4">
                        {/* Profile Photo or Avatar */}
                        <div className="flex-shrink-0">
                          {getPhotoUrl(member) ? (
                            <img
                              src={getPhotoUrl(member)}
                              alt={member.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <AvatarPlaceholder name={member.name} size="sm" />
                          )}
                        </div>

                        {/* Name & Role */}
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold text-cashew-green">
                            {member.position}
                          </p>
                          {member.qualification && (
                            <p className="text-xs text-neutral-500 mt-1">
                              {member.qualification}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      {member.bio && (
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Field Operations Team */}
          {fieldOps.length > 0 && (
            <section className="py-16 lg:py-24 bg-neutral-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                    Field Operations
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    Supporting farmers in the field through outreach, training,
                    and nursery management.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
                  {fieldOps.map((member: any) => (
                    <GlassCard
                      key={member.id}
                      hoverable
                      className="p-6 bg-white shadow-lg max-w-sm w-full"
                    >
                      <div className="flex gap-4 mb-4">
                        {/* Profile Photo or Avatar */}
                        <div className="flex-shrink-0">
                          {getPhotoUrl(member) ? (
                            <img
                              src={getPhotoUrl(member)}
                              alt={member.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <AvatarPlaceholder name={member.name} size="sm" />
                          )}
                        </div>

                        {/* Name & Role */}
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold text-cashew-green">
                            {member.position}
                          </p>
                          {member.qualification && (
                            <p className="text-xs text-neutral-500 mt-1">
                              {member.qualification}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      {member.bio && (
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Administration & Support */}
          {admin.length > 0 && (
            <section className="py-16 lg:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                    Administration & Support
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    Ensuring smooth operations and supporting all CGAZ
                    activities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                  {admin.map((member: any) => (
                    <GlassCard
                      key={member.id}
                      className="p-6 bg-neutral-50 shadow-lg text-center max-w-xs w-full"
                    >
                      {/* Profile Photo or Avatar */}
                      <div className="flex justify-center mb-3">
                        {getPhotoUrl(member) ? (
                          <img
                            src={getPhotoUrl(member)}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <AvatarPlaceholder name={member.name} size="sm" />
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-neutral-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-cashew-green">
                        {member.position}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Have questions about CGAZ or want to learn more about our work?
            Reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:allanchinambu666@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-cashew-green rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a
              href="tel:+260977429666"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              +260 977 429 666
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
