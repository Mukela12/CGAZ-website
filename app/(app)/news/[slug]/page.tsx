import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/payload/api";
import { Footer } from "@/components/shared/Footer";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export async function generateStaticParams() {
  const posts = await getBlogPosts("all", undefined, 100);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found - CGAZ",
    };
  }

  return {
    title: `${post.title} - CGAZ`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to extract text from Payload rich text JSON (Lexical format)
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

    // Handle Slate rich text format (legacy)
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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Back Button */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-cashew-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6 ${getCategoryColor(
              post.category
            )}`}
          >
            {getCategoryLabel(post.category)}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {typeof post.author === "object" ? post.author.name : "CGAZ"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12">
              <div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
                <p className="text-neutral-400">Featured Image</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-neutral max-w-none mb-12">
            {post.content ? (
              <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {extractTextFromRichText(post.content)}
              </div>
            ) : (
              <p className="text-neutral-600 leading-relaxed">
                {post.excerpt || "Content will be available soon."}
              </p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-12 pt-8 border-t border-neutral-200">
              <Tag className="w-4 h-4 text-neutral-400" />
              {post.tags.map((tagObj: any, idx: number) => (
                <span
                  key={idx}
                  className="text-sm bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full"
                >
                  {typeof tagObj === "object" ? tagObj.tag : tagObj}
                </span>
              ))}
            </div>
          )}

          {/* Related Projects (if any) */}
          {post.relatedProjects && post.relatedProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedProjects.map((project: any) => (
                  <GlassCard
                    key={typeof project === "object" ? project.id : project}
                    hoverable
                    className="p-6 bg-white"
                  >
                    <h3 className="font-bold text-neutral-900 mb-2">
                      {typeof project === "object" ? project.title : "Project"}
                    </h3>
                    <Link
                      href={`/projects/${
                        typeof project === "object" ? project.slug : project
                      }`}
                      className="text-cashew-green hover:underline text-sm"
                    >
                      Learn more →
                    </Link>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Share/CTA Section */}
          <div className="bg-gradient-to-br from-cashew-green to-cashew-dark-green rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter for more updates and stories from CGAZ.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-glass hover:shadow-glass-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
