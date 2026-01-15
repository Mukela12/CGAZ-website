import Link from "next/link";
import { GlassCard } from "@/components/shared/GlassCard";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

interface NewsListProps {
  posts: any[];
}

export function NewsList({ posts }: NewsListProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "news":
        return "bg-cashew-green/10 text-cashew-green";
      case "press-release":
        return "bg-sky-blue/10 text-sky-blue";
      case "events":
        return "bg-zambia-copper/10 text-zambia-copper";
      case "training":
        return "bg-growth-lime/10 text-growth-lime";
      case "success-stories":
        return "bg-cashew-brown/10 text-cashew-brown";
      case "announcements":
        return "bg-neutral-500/10 text-neutral-600";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      news: "News",
      "press-release": "Press Release",
      events: "Events",
      training: "Training",
      "success-stories": "Success Stories",
      announcements: "Announcements",
    };
    return labels[category] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-lg text-neutral-600">
              No articles found. Check back soon for updates!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Featured Article</h2>
            </div>
            <Link href={`/news/${featuredPost.slug}`}>
              <GlassCard
                hoverable
                className="p-8 lg:p-12 bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image Placeholder */}
                  <div className="lg:w-1/2">
                    <div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
                      <p className="text-neutral-400">Featured Image</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(
                        featuredPost.category
                      )}`}
                    >
                      {getCategoryLabel(featuredPost.category)}
                    </span>

                    <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                      {featuredPost.author && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>
                            {typeof featuredPost.author === "object"
                              ? featuredPost.author.name
                              : "CGAZ"}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredPost.publishedDate)}</span>
                      </div>
                    </div>

                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap mb-6">
                        <Tag className="w-4 h-4 text-neutral-400" />
                        {featuredPost.tags.slice(0, 3).map((tagObj: any, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded"
                          >
                            {typeof tagObj === "object" ? tagObj.tag : tagObj}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 bg-cashew-green text-white hover:bg-cashew-dark-green shadow-md hover:shadow-lg">
                      Read Full Article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-neutral-600">
                No more articles to display.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">Recent Articles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link key={post.id} href={`/news/${post.slug}`}>
                    <GlassCard
                      hoverable
                      className="h-full bg-white border border-neutral-200 hover:border-cashew-green hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Placeholder */}
                      <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                        <p className="text-neutral-400 text-sm">Article Image</p>
                      </div>

                      <div className="p-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {getCategoryLabel(post.category)}
                        </span>

                        <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-neutral-600 mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mb-4">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>
                                {typeof post.author === "object"
                                  ? post.author.name
                                  : "CGAZ"}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedDate)}</span>
                          </div>
                        </div>

                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg font-semibold transition-all duration-200 text-cashew-green hover:bg-cashew-green/10 -ml-2">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
