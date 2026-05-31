import { useEffect, useState, type ReactNode } from 'react';

type CoverImageProps = {
  src: string | null | undefined;
  /** Rendered when there is no src or the image fails to load. */
  fallback?: ReactNode;
  loading?: 'lazy' | 'eager';
};

/**
 * Cover <img> that degrades gracefully when the URL is missing or fails to
 * load — e.g. a hotlinked live-site image that no longer resolves — by showing
 * the magazine placeholder instead of the browser's broken-image icon.
 */
export default function CoverImage({
  src,
  fallback = <span className="blog-card__placeholder" />,
  loading,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  // A new src (e.g. navigating between posts) gets a fresh chance to load.
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) return <>{fallback}</>;
  return <img src={src} alt="" loading={loading} onError={() => setFailed(true)} />;
}
