"use client";

interface MediaPlayerProps {
  videoId: string;
  title: string;
}

export function MediaPlayer({ videoId, title }: MediaPlayerProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&playsinline=1`}
          title={title}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
