"use client";

import { Pause, Play } from "lucide-react";
import { useAudioPlayer } from "@/components/audio/AudioPlayerContext";

interface MediaPlayerProps {
  entryId: string;
  title: string;
  subtitle?: string;
  // Exactly one of these two is set per entry
  youtubeVideoId?: string | null;
  audio?: {
    src: string;
    durationHint?: number;
  } | null;
}

/**
 * Unified media player for a single Media Library entry.
 *
 * Video entries render a YouTube iframe (embedded playback).
 * Audio entries render a large "Play / Pause" hero button that hands off to
 * the global sticky audio player, so playback persists when the visitor
 * navigates away to another page.
 */
export function MediaPlayer({
  entryId,
  title,
  subtitle,
  youtubeVideoId,
  audio,
}: MediaPlayerProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudioPlayer();

  if (youtubeVideoId) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?modestbranding=1&rel=0&playsinline=1`}
            title={title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (audio) {
    const isCurrent = currentTrack?.id === entryId;
    const showPause = isCurrent && isPlaying;

    const onClick = () => {
      if (isCurrent) {
        togglePlayPause();
      } else {
        playTrack({
          id: entryId,
          title,
          subtitle,
          src: audio.src,
          durationHint: audio.durationHint,
        });
      }
    };

    return (
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-cashew-green via-cashew-green/90 to-zambia-copper p-12 lg:p-16 flex flex-col items-center justify-center text-center text-white">
        <button
          type="button"
          onClick={onClick}
          className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-white text-cashew-green flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-8 focus:ring-white/30"
          aria-label={showPause ? "Pause audio" : "Play audio"}
        >
          {showPause ? (
            <Pause className="w-12 h-12 lg:w-16 lg:h-16" fill="currentColor" />
          ) : (
            <Play className="w-12 h-12 lg:w-16 lg:h-16 ml-2" fill="currentColor" />
          )}
        </button>
        <p className="mt-6 text-sm lg:text-base text-white/80 max-w-md">
          {showPause
            ? "Playing now — keep browsing the site, the audio will follow you."
            : "Press play to listen. The audio will continue playing even if you navigate to other pages."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-neutral-100 p-12 text-center text-neutral-500">
      This entry is missing its media file.
    </div>
  );
}
