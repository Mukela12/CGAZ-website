import { Hero } from "@/components/shared/Hero";
import { GlassCard } from "@/components/shared/GlassCard";
import { Footer } from "@/components/shared/Footer";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import {
  Calendar,
  MapPin,
  Users,
  Sprout,
  TrendingUp,
  Filter,
  ArrowRight,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/payload/api";
import { ProjectFilter } from "./ProjectFilter";

export const metadata = {
  title: "Projects - CGAZ",
  description:
    "Empowering cashew farmers through sustainable development projects across Zambia's Western Province.",
};

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedStatus = params.status || "all";

  // Fetch projects from CMS
  const allProjects = await getProjects(selectedStatus);

  const statusOptions = [
    { label: "All Projects", value: "all" },
    { label: "Planning", value: "planning" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-sky-blue/10 text-sky-blue";
      case "active":
        return "bg-cashew-green/10 text-cashew-green";
      case "completed":
        return "bg-neutral-500/10 text-neutral-600";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "planning":
        return "Planning";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  // Calculate total impact across all projects
  const totalImpact = allProjects.reduce(
    (acc, project) => {
      if (project.impactMetrics) {
        acc.beneficiaries += project.impactMetrics.beneficiaries || 0;
        acc.treesPlanted += project.impactMetrics.treesPlanted || 0;
        acc.hectares += project.impactMetrics.hectares || 0;
        acc.jobsCreated += project.impactMetrics.jobsCreated || 0;
      }
      return acc;
    },
    { beneficiaries: 0, treesPlanted: 0, hectares: 0, jobsCreated: 0 }
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Projects"
        subtitle="Empowering cashew farmers through sustainable development projects across Zambia's Western Province."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379298/DistributionOfImprovedCashewPlantingMaterials-infront-of-CGAZ-poster_kkspl4.jpg"
      />

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-700">
                Filter by Status:
              </span>
            </div>
            <ProjectFilter
              statusOptions={statusOptions}
              selectedStatus={selectedStatus}
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-600">
                {selectedStatus === "all"
                  ? "No projects available yet. Check back soon as we add more projects to the CMS."
                  : "No projects found for the selected filter."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allProjects.map((project: any) => (
                <GlassCard
                  key={project.id}
                  hoverable
                  className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-300"
                >
                  {/* Featured Image */}
                  {project.featuredImage && (
                    <div className="relative h-48 w-full -mt-0 mb-6">
                      <OptimizedImage
                        src={
                          typeof project.featuredImage === "object"
                            ? project.featuredImage.cloudinaryUrl ||
                              project.featuredImage.url ||
                              ""
                            : ""
                        }
                        alt={
                          typeof project.featuredImage === "object"
                            ? project.featuredImage.alt || project.title
                            : project.title
                        }
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  <div className={`p-8 ${project.featuredImage ? 'pt-0' : ''}`}>
                    {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zambia-copper/10 text-zambia-copper">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                    {project.title}
                  </h3>

                  {/* Project Summary */}
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 text-cashew-green flex-shrink-0" />
                      <span>
                        {formatDate(project.startDate)}
                        {project.endDate && ` - ${formatDate(project.endDate)}`}
                      </span>
                    </div>
                    {project.districts && project.districts.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <MapPin className="w-4 h-4 text-cashew-green flex-shrink-0" />
                        <span>
                          {project.districts
                            .map((d: string) => d.charAt(0).toUpperCase() + d.slice(1))
                            .join(", ")}{" "}
                          District
                          {project.districts.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                    {project.budget && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <TrendingUp className="w-4 h-4 text-cashew-green flex-shrink-0" />
                        <span>Budget: {project.budget}</span>
                      </div>
                    )}
                  </div>

                  {/* Impact Metrics */}
                  {project.impactMetrics && (
                    <>
                      <div className="border-t border-neutral-200 pt-6 mb-6">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-cashew-green" />
                          Project Impact
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {project.impactMetrics.beneficiaries && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Users className="w-3.5 h-3.5 text-cashew-green" />
                                <span className="text-xs text-neutral-500">
                                  Beneficiaries
                                </span>
                              </div>
                              <p className="text-lg font-bold text-neutral-900">
                                {formatNumber(project.impactMetrics.beneficiaries)}
                              </p>
                            </div>
                          )}
                          {project.impactMetrics.treesPlanted && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Sprout className="w-3.5 h-3.5 text-cashew-green" />
                                <span className="text-xs text-neutral-500">
                                  Trees Planted
                                </span>
                              </div>
                              <p className="text-lg font-bold text-neutral-900">
                                {formatNumber(project.impactMetrics.treesPlanted)}
                              </p>
                            </div>
                          )}
                          {project.impactMetrics.women && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Users className="w-3.5 h-3.5 text-cashew-green" />
                                <span className="text-xs text-neutral-500">
                                  Women
                                </span>
                              </div>
                              <p className="text-lg font-bold text-neutral-900">
                                {formatNumber(project.impactMetrics.women)}
                              </p>
                            </div>
                          )}
                          {project.impactMetrics.youth && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <Users className="w-3.5 h-3.5 text-cashew-green" />
                                <span className="text-xs text-neutral-500">
                                  Youth
                                </span>
                              </div>
                              <p className="text-lg font-bold text-neutral-900">
                                {formatNumber(project.impactMetrics.youth)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Funding Partners */}
                  {project.fundingAgency && project.fundingAgency.length > 0 && (
                    <div className="border-t border-neutral-200 pt-4 mb-6">
                      <h4 className="text-xs font-semibold text-neutral-500 mb-3 flex items-center gap-1.5">
                        <Handshake className="w-3.5 h-3.5" />
                        FUNDED BY
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.fundingAgency.map((partner: any) => {
                          const partnerData = typeof partner === 'object' ? partner : null;
                          if (!partnerData) return null;

                          // Check for logo in multiple places: direct logoUrl, uploaded media, or logo relation
                          const logoUrl = partnerData.logoUrl || partnerData.logo?.cloudinaryUrl || partnerData.logo?.url;
                          const partnerName = partnerData.name || 'Partner';

                          return (
                            <div
                              key={partnerData.id}
                              className="flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-100"
                              title={partnerName}
                            >
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt={`${partnerName} logo`}
                                  className="w-5 h-5 object-contain"
                                />
                              ) : (
                                <span className="w-5 h-5 flex items-center justify-center rounded bg-cashew-green/10 text-cashew-green text-xs font-bold">
                                  {partnerName.charAt(0)}
                                </span>
                              )}
                              <span className="text-xs text-neutral-700 font-medium max-w-[100px] truncate">
                                {partnerName.split(' ')[0]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg font-semibold transition-all duration-200 text-cashew-green hover:bg-cashew-green/10 w-full sm:w-auto"
                  >
                    View Project Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      {allProjects.length > 0 && totalImpact.beneficiaries > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Total Project Impact
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Our projects are creating measurable change across Western Province,
                empowering farmers and building sustainable livelihoods.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-cashew-green mb-2">
                  {formatNumber(totalImpact.beneficiaries)}+
                </div>
                <div className="text-neutral-600">Total Beneficiaries</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cashew-green mb-2">
                  {formatNumber(totalImpact.treesPlanted)}+
                </div>
                <div className="text-neutral-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cashew-green mb-2">
                  {formatNumber(totalImpact.hectares)}+
                </div>
                <div className="text-neutral-600">Hectares Covered</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cashew-green mb-2">
                  {formatNumber(totalImpact.jobsCreated)}+
                </div>
                <div className="text-neutral-600">Jobs Created</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Partner With Us
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Join us in creating sustainable change for Zambia&apos;s cashew farming
            communities. Partner with CGAZ to make a lasting impact.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-200 backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-glass hover:shadow-glass-lg"
          >
            Explore Partnerships
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
