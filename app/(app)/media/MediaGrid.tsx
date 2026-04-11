"use client";

import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@/components/shared/GlassCard";
import { Calendar, MapPin, Play, Radio, Mic, Globe2 } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/AudioPlayerContext";
import {
  resolveAudioFile,
  type MediaLibraryEntry,
  type MediaLibraryType,
} from "@/lib/payload/mediaLibraryTypes";

interface MediaGridProps {
  entries: MediaLibraryEntry[];
}

const typeConfig: Record<MediaLibraryType, { label: string; icon: typeof Play; color: string }> = {
  video: { label: "Video", icon: Play, color: "bg-cashew-green/10 text-cashew-green" },
  radio: { label: "Radio", icon: Radio, color: "bg-zambia-copper/10 text-zambia-copper" },
  podcast: { label: "Podcast", icon: Mic, color: "bg-sky-blue/10 text-sky-blue" },
};

const languageLabels: Record<string, string> = {
  english: "English",
  lozi: "Lozi",
  bemba: "Bemba",
  nyanja: "Nyanja",
  tonga: "Tonga",
  mixed: "Mixed",
};

function getThumbnailUrl(entry: MediaLibraryEntry): string | null {
  const custom = entry.customThumbnail;
  if (custom && typeof custom === "object") {
    const url = custom.cloudinaryUrl || custom.url;
    if (url) return url;
  }
  if (entry.youtubeVideoId) {
    return `https://img.youtube.com/vi/${entry.youtubeVideoId}/hqdefault.jpg`;
  }
  return null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function MediaGrid({ entries }: MediaGridProps) {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudioPlayer();

  if (entries.length === 0) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-neutral-600">
            No entries yet. Check back soon — new videos and radio programs are added regularly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {entries.map((entry) => {
            const config = typeConfig[entry.type] || typeConfig.video;
            const TypeIcon = config.icon;
            const thumb = getThumbnailUrl(entry);
            const audio = resolveAudioFile(entry);
            const isAudio = Boolean(audio);
            const isCurrentlyPlaying =
              isAudio && currentTrack?.id === entry.id && isPlaying;

            // Audio play button handler — triggers global playback without navigating
            const onPlayClick = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              if (!audio) return;
              if (currentTrack?.id === entry.id) {
                togglePlayPause();
              } else {
                playTrack({
                  id: entry.id,
                  title: entry.title,
                  subtitle: entry.location || languageLabels[entry.language] || undefined,
                  src: audio.cloudinaryUrl,
                  durationHint: audio.duration || undefined,
                });
              }
            };

            const cardInner = (
              <GlassCard
                hoverable
                className="h-full bg-white border border-neutral-200 hover:border-cashew-green hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail / waveform area */}
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden group">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={entry.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized={thumb.includes("youtube.com")}
                    />
                  ) : (
                    // Audio-only fallback: decorative gradient with a big icon
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-cashew-green/20 via-zambia-copper/10 to-sky-blue/20" />
                      <TypeIcon className="w-20 h-20 text-white/30" />
                    </div>
                  )}

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    {isAudio ? (
                      <button
                        type="button"
                        onClick={onPlayClick}
                        className="w-16 h-16 rounded-full bg-cashew-green/90 hover:bg-cashew-green flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-cashew-green/40"
                        aria-label={isCurrentlyPlaying ? `Pause ${entry.title}` : `Play ${entry.title}`}
                      >
                        {isCurrentlyPlaying ? (
                          <span className="flex gap-1 items-end">
                            <span className="w-1 h-5 bg-white rounded-sm" />
                            <span className="w-1 h-5 bg-white rounded-sm" />
                          </span>
                        ) : (
                          <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                        )}
                      </button>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-cashew-green/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  {/* Duration badge */}
                  {entry.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
                      {entry.duration}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Type + Language */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
                    >
                      <TypeIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
                      <Globe2 className="w-3 h-3" />
                      {languageLabels[entry.language] || entry.language}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(entry.publishedDate)}</span>
                    </div>
                    {entry.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{entry.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            );

            return (
              <Link key={entry.id} href={`/media/${entry.slug}`}>
                {cardInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
