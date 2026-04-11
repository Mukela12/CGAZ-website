import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { getMediaLibraryEntries, type MediaLibraryType } from "@/lib/payload/api";
import { MediaFilterTabs } from "./MediaFilterTabs";
import { MediaGrid } from "./MediaGrid";

export const metadata = {
  title: "Media Library - CGAZ",
  description:
    "Watch documentaries and listen to radio programs from CGAZ and our farming communities across Zambia.",
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

const validTypes: (MediaLibraryType | "all")[] = ["all", "video", "radio", "podcast"];

export default async function MediaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requested = (params.type || "all") as MediaLibraryType | "all";
  const selectedType = validTypes.includes(requested) ? requested : "all";

  const entries = await getMediaLibraryEntries(selectedType, 100);

  const tabs = [
    { label: "All", value: "all", count: 0 },
    { label: "Videos", value: "video", count: 0 },
    { label: "Radio Programs", value: "radio", count: 0 },
    { label: "Podcasts", value: "podcast", count: 0 },
  ];

  // Count entries per type by running a lightweight fetch for "all" so the
  // tab badges show real numbers. When already on "all" we can compute locally.
  const allEntries =
    selectedType === "all" ? entries : await getMediaLibraryEntries("all", 100);
  for (const tab of tabs) {
    tab.count =
      tab.value === "all"
        ? allEntries.length
        : allEntries.filter((e) => e.type === tab.value).length;
  }

  return (
    <div className="min-h-screen">
      <Hero
        title="Media Library"
        subtitle="Watch our documentaries and listen to radio programs covering cashew farming across Zambia."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg"
      />

      <MediaFilterTabs tabs={tabs} selectedType={selectedType} />

      <MediaGrid entries={entries} />

      <Footer />
    </div>
  );
}
