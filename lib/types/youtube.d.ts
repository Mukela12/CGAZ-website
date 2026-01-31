/**
 * YouTube IFrame Player API Type Definitions
 * @see https://developers.google.com/youtube/iframe_api_reference
 */

// Extend the Window interface
interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady: () => void;
}

// YouTube Player namespace
declare namespace YT {
  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions);

    // Playback controls
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;

    // Volume controls
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;

    // Player state
    getPlayerState(): PlayerState;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;

    // Sizing
    getIframe(): HTMLIFrameElement;
    destroy(): void;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    host?: string;
    playerVars?: PlayerVars;
    events?: PlayerEvents;
  }

  interface PlayerVars {
    autoplay?: 0 | 1;
    cc_lang_pref?: string;
    cc_load_policy?: 0 | 1;
    color?: "red" | "white";
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    end?: number;
    fs?: 0 | 1;
    hl?: string;
    iv_load_policy?: 1 | 3;
    loop?: 0 | 1;
    modestbranding?: 0 | 1;
    mute?: 0 | 1;
    origin?: string;
    playlist?: string;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    start?: number;
  }

  interface PlayerEvents {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: OnStateChangeEvent) => void;
    onPlaybackQualityChange?: (event: OnPlaybackQualityChangeEvent) => void;
    onPlaybackRateChange?: (event: OnPlaybackRateChangeEvent) => void;
    onError?: (event: OnErrorEvent) => void;
    onApiChange?: (event: PlayerEvent) => void;
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: PlayerState;
  }

  interface OnPlaybackQualityChangeEvent extends PlayerEvent {
    data: string;
  }

  interface OnPlaybackRateChangeEvent extends PlayerEvent {
    data: number;
  }

  interface OnErrorEvent extends PlayerEvent {
    data: number;
  }

  const PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };

  type PlayerState = -1 | 0 | 1 | 2 | 3 | 5;
}
