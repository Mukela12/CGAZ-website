import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { getBlogPosts } from "@/lib/payload/api";
import { NewsSearchFilter } from "./NewsSearchFilter";
import { NewsList } from "./NewsList";

export const metadata = {
  title: "News & Events - CGAZ",
  description:
    "Stay updated with the latest news, events, and success stories from CGAZ and our farming communities.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || "all";
  const searchQuery = params.search || "";

  // Fetch blog posts from CMS
  const allPosts = await getBlogPosts(
    selectedCategory,
    searchQuery,
    50
  );

  const categories = [
    { label: "All", value: "all" },
    { label: "News", value: "news" },
    { label: "Press Release", value: "press-release" },
    { label: "Events", value: "events" },
    { label: "Training", value: "training" },
    { label: "Success Stories", value: "success-stories" },
    { label: "Announcements", value: "announcements" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="News & Events"
        subtitle="Stay updated with the latest news, events, and success stories from CGAZ and our farming communities."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/Officiallaunchofthe2025_26cashewseedlingdistributionbyCGAZ22_mhtksl.jpg"
      />

      {/* Search and Filter Section */}
      <NewsSearchFilter
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* News List */}
      <NewsList posts={allPosts} />

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Subscribe to our newsletter to receive the latest news, updates, and
            success stories from CGAZ directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
            />
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-200 backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-glass hover:shadow-glass-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
