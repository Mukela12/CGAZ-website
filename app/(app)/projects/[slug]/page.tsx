import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/payload/api";
import { Footer } from "@/components/shared/Footer";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import {
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Sprout,
  ArrowLeft,
  Target,
  Handshake,
  ExternalLink,
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export async function generateStaticParams() {
  const projects = await getProjects("all");

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found - CGAZ",
    };
  }

  return {
    title: `${project.title} - CGAZ`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

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

  // Helper function to extract text from Payload rich text JSON
  const extractTextFromRichText = (richText: any): string => {
    if (!richText) return "";
    if (typeof richText === "string") return richText;

    // Handle Lexical rich text format
    if (richText.root && richText.root.children) {
      const extractFromChildren = (children: any[]): string => {
        return children
          .map((child: any) => {
            if (child.text) return child.text;
            if (child.children) return extractFromChildren(child.children);
            return "";
          })
          .join("\n\n");
      };
      return extractFromChildren(richText.root.children);
    }

    // Handle Slate rich text format
    if (Array.isArray(richText)) {
      return richText
        .map((node: any) => {
          if (node.children) {
            return node.children.map((child: any) => child.text || "").join("");
          }
          return "";
        })
        .join("\n\n");
    }

    return "";
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section with Featured Image */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] w-full flex items-end overflow-hidden">
        {/* Background Image or Gradient Fallback */}
        <div className="absolute inset-0 z-0">
          {project.featuredImage ? (
            <>
              <OptimizedImage
                src={
                  typeof project.featuredImage === "object"
                    ? project.featuredImage.cloudinaryUrl || project.featuredImage.url || ""
                    : ""
                }
                alt={
                  typeof project.featuredImage === "object"
                    ? project.featuredImage.alt || project.title
                    : project.title
                }
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-cashew-green via-cashew-dark-green to-earth-brown" />
          )}
        </div>

        {/* Back Button - Simple arrow in corner */}
        <Link
          href="/projects"
          className="absolute top-24 lg:top-28 left-4 sm:left-6 lg:left-8 z-30 flex items-center justify-center w-10 h-10 text-white/90 hover:text-white transition-all backdrop-blur-sm bg-black/20 hover:bg-black/40 rounded-full border border-white/20"
          aria-label="Back to Projects"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Content at Bottom */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 pt-32">
          {/* Status Badges */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                project.status === "active"
                  ? "bg-cashew-green/20 text-white border border-cashew-green/30"
                  : project.status === "planning"
                  ? "bg-sky-blue/20 text-white border border-sky-blue/30"
                  : "bg-white/20 text-white border border-white/30"
              }`}
            >
              {getStatusLabel(project.status)}
            </span>
            {project.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-zambia-copper/20 text-white border border-zambia-copper/30">
                Featured Project
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow-hero max-w-4xl">
            {project.title}
          </h1>

          {/* Summary */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl text-shadow-sm">
            {project.summary}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-5 h-5 text-cashew-green" />
              <span>
                {formatDate(project.startDate)}
                {project.endDate && ` - ${formatDate(project.endDate)}`}
              </span>
            </div>
            {project.districts && project.districts.length > 0 && (
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-cashew-green" />
                <span>
                  {project.districts
                    .map((d: string) => d.charAt(0).toUpperCase() + d.slice(1))
                    .join(", ")}{" "}
                  District{project.districts.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
            {project.budget && (
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="w-5 h-5 text-cashew-green" />
                <span>Budget: {project.budget}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Description */}
              <GlassCard className="p-8 bg-white">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Project Overview
                </h2>
                <div className="prose prose-lg prose-neutral max-w-none">
                  {project.description ? (
                    <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                      {extractTextFromRichText(project.description)}
                    </div>
                  ) : (
                    <p className="text-neutral-600 leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                </div>
              </GlassCard>

              {/* Project Objectives */}
              {project.objectives && project.objectives.length > 0 && (
                <GlassCard className="p-8 bg-white">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-cashew-green" />
                    Project Objectives
                  </h2>
                  <ul className="space-y-3">
                    {project.objectives.map((obj: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cashew-green/10 text-cashew-green text-sm font-semibold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-neutral-600">
                          {typeof obj === "object" ? obj.objective : obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* Gallery/Photos */}
              {project.gallery && project.gallery.length > 0 && (
                <GlassCard className="p-8 bg-white">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((image: any, idx: number) => (
                      <div
                        key={idx}
                        className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center"
                      >
                        <p className="text-neutral-400 text-sm">
                          Project Photo {idx + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Metrics */}
              {project.impactMetrics && (
                <GlassCard className="p-6 bg-white">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cashew-green" />
                    Impact Metrics
                  </h3>
                  <div className="space-y-4">
                    {project.impactMetrics.beneficiaries && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <Users className="w-4 h-4 text-cashew-green" />
                          <span>Beneficiaries</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.beneficiaries)}
                        </p>
                      </div>
                    )}
                    {project.impactMetrics.treesPlanted && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <Sprout className="w-4 h-4 text-cashew-green" />
                          <span>Trees Planted</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.treesPlanted)}
                        </p>
                      </div>
                    )}
                    {project.impactMetrics.women && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <Users className="w-4 h-4 text-cashew-green" />
                          <span>Women Empowered</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.women)}
                        </p>
                      </div>
                    )}
                    {project.impactMetrics.youth && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <Users className="w-4 h-4 text-cashew-green" />
                          <span>Youth Involved</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.youth)}
                        </p>
                      </div>
                    )}
                    {project.impactMetrics.hectares && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <MapPin className="w-4 h-4 text-cashew-green" />
                          <span>Hectares Covered</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.hectares)}
                        </p>
                      </div>
                    )}
                    {project.impactMetrics.jobsCreated && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                          <TrendingUp className="w-4 h-4 text-cashew-green" />
                          <span>Jobs Created</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">
                          {formatNumber(project.impactMetrics.jobsCreated)}
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              )}

              {/* Funding Partners */}
              {project.fundingAgency && project.fundingAgency.length > 0 && (
                <GlassCard className="p-6 bg-white">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-cashew-green" />
                    Funding Partners
                  </h3>
                  <div className="space-y-4">
                    {project.fundingAgency.map((partner: any) => {
                      // Handle both populated object and ID-only references
                      const partnerData = typeof partner === 'object' ? partner : null;
                      if (!partnerData) return null;

                      // Check for logo in multiple places: uploaded media, direct logoUrl, or logo relation
                      const logoUrl = partnerData.logoUrl || partnerData.logo?.cloudinaryUrl || partnerData.logo?.url;
                      const partnerName = partnerData.name || 'Partner';

                      return (
                        <div
                          key={partnerData.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                        >
                          {/* Partner Logo */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center overflow-hidden">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={`${partnerName} logo`}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <span className="text-lg font-bold text-cashew-green">
                                {partnerName.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* Partner Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-neutral-900 text-sm truncate">
                              {partnerName}
                            </p>
                            {partnerData.type && (
                              <p className="text-xs text-neutral-500 capitalize">
                                {partnerData.type.replace(/-/g, ' ')}
                              </p>
                            )}
                          </div>

                          {/* External Link */}
                          {partnerData.website && (
                            <a
                              href={partnerData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 p-1.5 rounded-md hover:bg-neutral-200 transition-colors"
                              aria-label={`Visit ${partnerName} website`}
                            >
                              <ExternalLink className="w-4 h-4 text-neutral-400" />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Link to Partners Page */}
                  <Link
                    href="/about/partners"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-cashew-green hover:text-cashew-dark-green transition-colors"
                  >
                    View all partners
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </GlassCard>
              )}

              {/* CTA Card */}
              <GlassCard className="p-6 bg-gradient-to-br from-cashew-green to-cashew-dark-green text-white">
                <h3 className="text-lg font-bold mb-3">Get Involved</h3>
                <p className="text-sm text-white/90 mb-4">
                  Interested in supporting this project or learning more?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 shadow-glass"
                >
                  Contact Us
                </Link>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
