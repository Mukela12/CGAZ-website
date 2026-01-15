import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  /** Image source URL (local or Cloudinary) */
  src: string;
  /** Alt text for accessibility (required) */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Enable blur placeholder for lazy loading */
  withPlaceholder?: boolean;
  /** Aspect ratio for the container */
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

/**
 * Optimized Image Component
 *
 * A wrapper around Next.js Image with additional optimizations:
 * - Automatic WebP/AVIF conversion
 * - Lazy loading with blur placeholders
 * - Responsive image sets
 * - Support for Cloudinary URLs
 * - Aspect ratio containers
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Cashew farmers working in the field"
 *   aspectRatio="landscape"
 *   withPlaceholder
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  className,
  withPlaceholder = true,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const aspectRatioStyles = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const containerClassName = aspectRatio
    ? cn("relative overflow-hidden", aspectRatioStyles[aspectRatio], className)
    : className;

  const imageProps: Partial<ImageProps> = {
    ...props,
    ...(withPlaceholder && {
      placeholder: "blur" as const,
      blurDataURL:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=",
    }),
  };

  if (aspectRatio) {
    return (
      <div className={containerClassName}>
        <Image src={src} alt={alt} fill className="object-cover" {...imageProps} />
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} {...imageProps} />;
}
