import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { getResources } from "@/lib/payload/api";
import { GlassCard } from "@/components/shared/GlassCard";
import {
  Download,
  FileText,
  File,
  FileSpreadsheet,
  Presentation,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { ResourcesFilter } from "./ResourcesFilter";

export const metadata = {
  title: "Farmer Resources - CGAZ",
  description:
    "Download training materials, technical guides, and resources for cashew farmers in Zambia.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ResourcesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || "all";
  const searchQuery = params.search || "";

  const allResources = await getResources(selectedCategory, searchQuery, 100);

  const categories = [
    { label: "All Resources", value: "all" },
    { label: "Training Materials", value: "training" },
    { label: "Technical Guides", value: "guides" },
    { label: "Reports", value: "reports" },
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "doc":
        return <File className="w-8 h-8 text-blue-500" />;
      default:
        return <FileText className="w-8 h-8 text-neutral-600" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Farmer Resources"
        subtitle="Access training materials, technical guides, and resources."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379295/Cashew-Nursery11_ujzxc6.jpg"
      />
      <ResourcesFilter categories={categories} selectedCategory={selectedCategory} searchQuery={searchQuery} />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {allResources.length === 0 ? (
            <p className="text-center text-neutral-600">No resources available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allResources.map((resource: any) => (
                <GlassCard key={resource.id} className="p-6">
                  {getFileIcon(resource.fileType)}
                  <h3 className="font-bold mt-4">{resource.title}</h3>
                  <a href={resource.cloudinaryUrl} download className="mt-4 inline-flex items-center gap-2 text-cashew-green">
                    <Download className="w-4 h-4" />Download
                  </a>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
