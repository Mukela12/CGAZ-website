"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, Play, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useDocumentary } from "@/lib/hooks/useDocumentary";

// YouTube Player API types
interface YTPlayerOptions {
  videoId: string;
  playerVars?: {
    autoplay?: number;
    mute?: number;
    controls?: number;
    modestbranding?: number;
    rel?: number;
    loop?: number;
    playlist?: string;
    playsinline?: number;
    enablejsapi?: number;
    origin?: string;
  };
  events?: {
    onReady?: (event: { target: YouTubePlayer }) => void;
    onStateChange?: (event: { data: number }) => void;
  };
}

interface YTConstructor {
  Player: new (elementId: string, options: YTPlayerOptions) => YouTubePlayer;
}

// Extend window interface to include YouTube API
declare global {
  interface Window {
    YT: YTConstructor;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

/**
 * Documentary Section Component
 *
 * Displays a featured YouTube video with:
 * - Autoplay (muted by default - browser requirement)
 * - Custom unmute button overlay
 * - Play/pause controls
 * - Fullscreen support
 * - Lazy loading (only loads when in viewport)
 * - Responsive 16:9 aspect ratio
 */
export function DocumentarySection() {
  const { settings, isLoading } = useDocumentary();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [apiLoaded, setApiLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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

  // Load YouTube IFrame API
  useEffect(() => {
    if (!settings.youtubeVideoId || !isInView) return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      return;
    }

    // Load the API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      setApiLoaded(true);
    };

    return () => {
      // Cleanup
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, [settings.youtubeVideoId, isInView]);

  // Initialize YouTube Player when API is ready
  useEffect(() => {
    if (!apiLoaded || !settings.youtubeVideoId || !isInView) return;

    // Small delay to ensure container is ready
    const timer = setTimeout(() => {
      if (!document.getElementById("youtube-player")) return;

      try {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: settings.youtubeVideoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: settings.showControls ? 1 : 0,
            modestbranding: 1,
            rel: 0,
            loop: settings.loop ? 1 : 0,
            playlist: settings.loop ? settings.youtubeVideoId : undefined,
            playsinline: 1,
            enablejsapi: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
          events: {
            onReady: (event: { target: YouTubePlayer }) => {
              setPlayerReady(true);
              setIsPlaying(true);
              setShowPlayOverlay(false);
              event.target.mute();
            },
            onStateChange: (event: { data: number }) => {
              // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
              setIsPlaying(event.data === 1);
              if (event.data === 1) {
                setShowPlayOverlay(false);
              }
            },
          },
        }) as YouTubePlayer;
      } catch (err) {
        console.error("Error initializing YouTube player:", err);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }
    };
  }, [apiLoaded, settings.youtubeVideoId, settings.showControls, settings.loop, isInView]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (err) {
      console.error("Error toggling mute:", err);
    }
  }, [isMuted, playerReady]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.error("Error toggling play:", err);
    }
  }, [isPlaying, playerReady]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Don't render if disabled or no video ID
  if (isLoading) {
    return null;
  }

  if (!settings.isEnabled || !settings.youtubeVideoId) {
    return null;
  }

  const bgTheme = settings.sectionBackground || "dark";

  return (
    <section
      ref={containerRef}
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
            {settings.title}
          </h2>
          <p
            className={cn(
              "text-lg sm:text-xl max-w-3xl mx-auto",
              subtitleStyles[bgTheme]
            )}
          >
            {settings.subtitle}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* 16:9 Aspect Ratio Container */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* YouTube Player Container */}
            {isInView && (
              <div
                id="youtube-player"
                className="absolute inset-0 w-full h-full"
              />
            )}

            {/* Placeholder before player loads */}
            {!playerReady && (
              <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-cashew-green rounded-full animate-spin mb-4 mx-auto" />
                  <p className="text-white/60 text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* Custom Controls Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Play Overlay (shows before first interaction) */}
              {showPlayOverlay && playerReady && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto cursor-pointer"
                  onClick={() => {
                    setShowPlayOverlay(false);
                    togglePlay();
                  }}
                >
                  <div className="w-20 h-20 bg-cashew-green rounded-full flex items-center justify-center shadow-lg hover:bg-cashew-dark-green transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.button>
              )}

              {/* Bottom Controls Bar */}
              {playerReady && !showPlayOverlay && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-auto"
                >
                  <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {/* Left Controls */}
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? (
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-white rounded-full" />
                            <div className="w-1 h-4 bg-white rounded-full" />
                          </div>
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                        )}
                      </button>

                      {/* Mute/Unmute Button */}
                      <button
                        onClick={toggleMute}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                          isMuted
                            ? "bg-cashew-green hover:bg-cashew-dark-green text-white"
                            : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                        )}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-5 h-5" />
                            <span className="text-sm font-medium">Click to Unmute</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-5 h-5" />
                            <span className="text-sm font-medium">Sound On</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-5 h-5 text-white" />
                        ) : (
                          <Maximize2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Unmute Prompt (top right) */}
              {playerReady && isMuted && !showPlayOverlay && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-4 right-4 pointer-events-auto"
                >
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-2 px-4 py-2 bg-cashew-green hover:bg-cashew-dark-green text-white rounded-full shadow-lg transition-colors animate-pulse"
                  >
                    <VolumeX className="w-5 h-5" />
                    <span className="text-sm font-medium">Tap to Unmute</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
