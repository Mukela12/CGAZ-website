"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Maximize2, Play } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { DocumentarySettings } from "@/lib/payload/api";

interface DocumentarySectionProps {
  settings: DocumentarySettings | null;
}

// Background theme styles
const backgroundStyles = {
  dark: "bg-neutral-900",
  light: "bg-white",
  green: "bg-gradient-to-br from-cashew-green to-cashew-dark-green",
};

const textStyles = {
  dark: "text-white",
  light: "text-neutral-900",
  green: "text-white",
};

const subtitleStyles = {
  dark: "text-neutral-300",
  light: "text-neutral-600",
  green: "text-white/90",
};

/**
 * Documentary Section Component
 *
 * Uses YouTube IFrame Player API for:
 * - Instant thumbnail placeholder while loading
 * - True autoplay with no delays
 * - Instant mute/unmute via API (no iframe reload)
 * - Better performance and UX
 */
export function DocumentarySection({ settings }: DocumentarySectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract values with defaults for hooks (before early return)
  const isEnabled = settings?.isEnabled ?? false;
  const videoId = settings?.youtubeVideoId ?? "";
  const showControls = settings?.showControls ?? true;
  const loop = settings?.loop ?? false;
  const bgTheme = settings?.sectionBackground || "dark";
  const title = settings?.title ?? "";
  const subtitle = settings?.subtitle ?? "";

  // YouTube thumbnail URL (maxresdefault for highest quality)
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  // Handle player ready event
  const handlePlayerReady = useCallback((event: YT.PlayerEvent) => {
    setIsPlayerReady(true);
    setIsLoading(false);
    // Hide thumbnail after a short delay to ensure smooth transition
    setTimeout(() => setShowThumbnail(false), 300);
    // Ensure video starts playing
    event.target.playVideo();
  }, []);

  // Handle player state changes
  const handlePlayerStateChange = useCallback((event: YT.OnStateChangeEvent) => {
    // If video starts playing, hide thumbnail
    if (event.data === YT.PlayerState.PLAYING) {
      setShowThumbnail(false);
    }
  }, []);

  // Initialize YouTube Player
  const initializePlayer = useCallback(() => {
    // Don't initialize if player already exists or container not ready
    if (playerRef.current || !document.getElementById("youtube-player")) {
      return;
    }

    if (!videoId) return;

    try {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1, // Required for autoplay (browser policy)
          controls: showControls ? 1 : 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: loop ? 1 : 0,
          playlist: loop ? videoId : undefined,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange,
        },
      });
    } catch (error) {
      console.error("Failed to initialize YouTube player:", error);
      setIsLoading(false);
    }
  }, [videoId, showControls, loop, handlePlayerReady, handlePlayerStateChange]);

  // Load YouTube IFrame API script
  useEffect(() => {
    if (!videoId) return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      // Wait for it to load
      window.onYouTubeIframeAPIReady = initializePlayer;
      return;
    }

    // Load the YouTube IFrame API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);

    // Set up the callback for when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      // Cleanup: destroy player on unmount
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, initializePlayer]);

  // Toggle mute using YouTube API (instant, no reload)
  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;

    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Failed to toggle mute:", error);
    }
  }, [isMuted]);

  // Open fullscreen
  const openFullscreen = useCallback(() => {
    if (!playerRef.current) return;

    try {
      const iframe = playerRef.current.getIframe();
      if (iframe && iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } catch (error) {
      console.error("Failed to open fullscreen:", error);
    }
  }, []);

  // Don't render if no settings, disabled, or no video ID
  if (!settings || !isEnabled || !videoId) {
    return null;
  }

  return (
    <section
      className={cn(
        "py-16 lg:py-24 relative overflow-hidden",
        backgroundStyles[bgTheme]
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
              textStyles[bgTheme]
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "text-lg sm:text-xl max-w-3xl mx-auto",
              subtitleStyles[bgTheme]
            )}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          {/* 16:9 Aspect Ratio Container */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* Thumbnail Placeholder - Shows instantly while player loads */}
            {showThumbnail && (
              <div className="absolute inset-0 z-10">
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Loading overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full" />
                      <span className="text-white/80 text-sm font-medium">
                        Loading video...
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowThumbnail(false)}
                      className="w-20 h-20 bg-cashew-green/90 hover:bg-cashew-green rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* YouTube Player Container - Single div that becomes the iframe */}
            <div
              id="youtube-player"
              className="absolute inset-0 w-full h-full"
            />

            {/* Custom Controls Overlay - Only show after player is ready */}
            {isPlayerReady && !showThumbnail && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-auto">
                  <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {/* Left Controls */}
                    <div className="flex items-center gap-3">
                      {/* Mute/Unmute Button */}
                      <button
                        onClick={toggleMute}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all font-medium",
                          isMuted
                            ? "bg-cashew-green hover:bg-cashew-dark-green text-white shadow-lg"
                            : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                        )}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-5 h-5" />
                            <span className="text-sm">Click to Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-5 h-5" />
                            <span className="text-sm">Sound On</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      {/* Fullscreen Button */}
                      <button
                        onClick={openFullscreen}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unmute Prompt (top right) - only show when muted */}
                {isMuted && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                    className="absolute top-4 right-4 pointer-events-auto"
                  >
                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-2 px-4 py-2.5 bg-cashew-green hover:bg-cashew-dark-green text-white rounded-full shadow-lg transition-colors"
                    >
                      <VolumeX className="w-5 h-5" />
                      <span className="text-sm font-medium">Tap to Unmute</span>
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Watch on YouTube link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm hover:underline",
              bgTheme === "light"
                ? "text-neutral-500"
                : "text-white/60 hover:text-white/80"
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
