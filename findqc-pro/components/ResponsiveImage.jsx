import { imageManifest } from "../lib/imageManifest";

function srcSet(candidates = []) {
  return candidates.map(({ src, width }) => `${src} ${width}w`).join(", ");
}

export default function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  width,
  height,
}) {
  const image = imageManifest[src];
  const intrinsicWidth = width || image?.width;
  const intrinsicHeight = height || image?.height;

  return (
    <picture className="responsive-picture">
      {image?.avif?.length > 0 && <source type="image/avif" srcSet={srcSet(image.avif)} sizes={sizes} />}
      {image?.webp?.length > 0 && <source type="image/webp" srcSet={srcSet(image.webp)} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
