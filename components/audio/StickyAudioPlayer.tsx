"use client";

import { Pause, Play, X, Radio } from "lucide-react";
import { useAudioPlayer } from "./AudioPlayerContext";

/**
 * Floating mini-player that appears at the bottom of the screen whenever a
 * track is loaded. Sits above the mobile bottom nav on small screens and
 * docks to the bottom-right on desktop.
 *
 * Renders null when no track is active so it doesn't take up layout space.
 */
export function StickyAudioPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlayPause, seek, close } =
    useAudioPlayer();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const onSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  return (
    <div
      className="fixed z-40 left-0 right-0 bottom-16 lg:left-auto lg:right-6 lg:bottom-6 lg:w-[380px] px-4 lg:px-0"
      role="region"
      aria-label="Audio player"
    >
      <div className="bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md">
        {/* Progress bar (clickable) */}
        <div
          className="h-1.5 bg-neutral-200 cursor-pointer hover:h-2 transition-all"
          onClick={onSeekClick}
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          <div
            className="h-full bg-cashew-green transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 p-3">
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={togglePlayPause}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-cashew-green hover:bg-cashew-green/90 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cashew-green mb-0.5">
              <Radio className="w-3 h-3" />
              <span>Now Playing</span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 truncate">
              {currentTrack.title}
            </p>
            {currentTrack.subtitle && (
              <p className="text-xs text-neutral-500 truncate">{currentTrack.subtitle}</p>
            )}
            <p className="text-[11px] text-neutral-400 mt-0.5 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors"
            aria-label="Close player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
