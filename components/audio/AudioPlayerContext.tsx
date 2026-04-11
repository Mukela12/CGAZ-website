"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Global audio player.
 *
 * A single <audio> element lives in the root layout, owned by this provider.
 * Because root layouts don't remount on Next.js App Router client-side
 * navigation, playback survives across page changes — visitors can start a
 * radio program on /media and browse to /projects without the audio cutting.
 *
 * Any component (a Play button on a card, a detail page, etc.) can call
 *   const { playTrack } = useAudioPlayer()
 *   playTrack({ id, title, subtitle, src })
 * to swap the current track and start playing.
 */

export interface AudioTrack {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  /** Optional duration in seconds, if known ahead of time */
  durationHint?: number;
}

interface AudioPlayerContextValue {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playTrack: (track: AudioTrack) => void;
  togglePlayPause: () => void;
  seek: (seconds: number) => void;
  close: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Create the audio element once on mount so it lives outside React's tree
  // and survives route transitions untouched.
  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    audioRef.current = el;

    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.pause();
      audioRef.current = null;
    };
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    const el = audioRef.current;
    if (!el) return;

    // If it's the same track and it's paused, just resume.
    if (currentTrack?.id === track.id && !isPlaying) {
      el.play().catch((err) => console.warn("Audio play failed:", err));
      return;
    }

    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.durationHint || 0);
    el.src = track.src;
    el.load();
    el.play().catch((err) => console.warn("Audio play failed:", err));
  }, [currentTrack, isPlaying]);

  const togglePlayPause = useCallback(() => {
    const el = audioRef.current;
    if (!el || !currentTrack) return;
    if (el.paused) {
      el.play().catch((err) => console.warn("Audio play failed:", err));
    } else {
      el.pause();
    }
  }, [currentTrack]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(el.duration || seconds, seconds));
  }, []);

  const close = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      playTrack,
      togglePlayPause,
      seek,
      close,
    }),
    [currentTrack, isPlaying, currentTime, duration, playTrack, togglePlayPause, seek, close],
  );

  return (
    <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used inside AudioPlayerProvider");
  }
  return ctx;
}
