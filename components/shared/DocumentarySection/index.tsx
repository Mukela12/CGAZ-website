"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { DocumentarySettings } from "@/lib/payload/api";

interface DocumentarySectionProps {
  settings: DocumentarySettings | null;
}

/**
 * Documentary Section Component
 *
 * Displays a featured YouTube video with:
 * - Autoplay (muted by default - browser requirement)
 * - Custom unmute button overlay
 * - Fullscreen support
 * - Responsive 16:9 aspect ratio
 */
export function DocumentarySection({ settings }: DocumentarySectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Toggle mute by reloading iframe with different mute parameter
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Open fullscreen
  const openFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  // Don't render if no settings, disabled, or no video ID
  if (!settings || !settings.isEnabled || !settings.youtubeVideoId) {
    return null;
  }

  const bgTheme = settings.sectionBackground || "dark";
  const videoId = settings.youtubeVideoId;

  // Build YouTube embed URL with parameters
  const buildYouTubeUrl = (muted: boolean) => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: muted ? "1" : "0",
      controls: settings.showControls ? "1" : "0",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
      loop: settings.loop ? "1" : "0",
      ...(settings.loop && { playlist: videoId }),
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

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
            {/* YouTube Iframe - rendered immediately */}
            <iframe
              ref={iframeRef}
              key={isMuted ? "muted" : "unmuted"}
              src={buildYouTubeUrl(isMuted)}
              title={settings.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Custom Controls Overlay */}
            <div className="absolute inset-0 pointer-events-none">
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
              bgTheme === "light" ? "text-neutral-500" : "text-white/60 hover:text-white/80"
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Watch on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
