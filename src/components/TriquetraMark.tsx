type Props = {
  className?: string;
  title?: string;
};

/**
 * Dark triquetra artwork (public/dark_logo-veil.webp).
 * Served as a small pre-sized copy so the preloader veil paints fast.
 * Explicit dimensions avoid layout shift; fetchpriority keeps the
 * LCP-candidate veil mark first in line.
 */
export function TriquetraMark({ className, title }: Props) {
  return (
    <img
      src="/dark_logo-veil.webp"
      alt={title ?? "Triquetra mark"}
      width={400}
      height={333}
      fetchPriority="high"
      className={className}
      draggable={false}
    />
  );
}
