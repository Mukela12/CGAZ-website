import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getMediaLibraryEntries,
  getMediaLibraryEntryBySlug,
  resolveAudioFile,
} from "@/lib/payload/api";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { ArrowLeft, Calendar, MapPin, Globe2, Clock, Play, Radio, Mic } from "lucide-react";
import { MediaPlayer } from "./MediaPlayer";

export async function generateStaticParams() {
  const entries = await getMediaLibraryEntries("all", 100);
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getMediaLibraryEntryBySlug(slug);

  if (!entry) {
    return { title: "Not Found - CGAZ" };
  }

  return {
    title: `${entry.title} - CGAZ`,
    description: entry.description,
  };
}

const typeMeta = {
  video: { label: "Video", Icon: Play },
  radio: { label: "Radio Program", Icon: Radio },
  podcast: { label: "Podcast", Icon: Mic },
} as const;

const languageLabels: Record<string, string> = {
  english: "English",
  lozi: "Lozi",
  bemba: "Bemba",
  nyanja: "Nyanja",
  tonga: "Tonga",
  mixed: "Mixed",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function MediaEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getMediaLibraryEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  // Related entries of the same type (exclude current)
  const related = (await getMediaLibraryEntries(entry.type, 7)).filter(
    (e) => e.slug !== entry.slug,
  ).slice(0, 6);

  const { label: typeLabel, Icon: TypeIcon } = typeMeta[entry.type] || typeMeta.video;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Spacer for fixed nav */}
      <div className="h-20 lg:h-[140px]" />

      <article className="py-8 lg:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-cashew-green mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Media Library
          </Link>

          {/* Type + meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cashew-green/10 text-cashew-green">
              <TypeIcon className="w-3 h-3" />
              {typeLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
              <Globe2 className="w-3 h-3" />
              {languageLabels[entry.language] || entry.language}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {entry.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(entry.publishedDate)}</span>
            </div>
            {entry.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{entry.location}</span>
              </div>
            )}
            {entry.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{entry.duration}</span>
              </div>
            )}
          </div>

          {/* Player (video or audio) */}
          <MediaPlayer
            entryId={entry.id}
            title={entry.title}
            subtitle={entry.location || languageLabels[entry.language] || undefined}
            youtubeVideoId={entry.youtubeVideoId}
            audio={
              (() => {
                const a = resolveAudioFile(entry);
                return a
                  ? { src: a.cloudinaryUrl, durationHint: a.duration || undefined }
                  : null;
              })()
            }
          />

          {/* Description */}
          <div className="mt-8 prose prose-lg max-w-none">
            <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-line">
              {entry.description}
            </p>
          </div>

          {entry.youtubeVideoId && (
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <a
                href={`https://www.youtube.com/watch?v=${entry.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-cashew-green transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </article>

      {/* Related entries */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              More {typeLabel}s
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => {
                const thumb = r.youtubeVideoId
                  ? `https://img.youtube.com/vi/${r.youtubeVideoId}/hqdefault.jpg`
                  : null;
                return (
                  <Link key={r.id} href={`/media/${r.slug}`}>
                    <GlassCard
                      hoverable
                      className="h-full bg-white border border-neutral-200 hover:border-cashew-green transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 relative">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt={r.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-cashew-green/30 to-zambia-copper/20 flex items-center justify-center">
                            <Radio className="w-16 h-16 text-white/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-cashew-green/90 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2">
                          {r.title}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          {formatDate(r.publishedDate)}
                        </p>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
