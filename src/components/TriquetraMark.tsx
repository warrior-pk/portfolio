type Props = {
  className?: string;
  /** When true, the mark breathes via pure CSS (used by the HTML-first veil). */
  animated?: boolean;
  title?: string;
};

/**
 * Dark triquetra artwork (public/dark_logo.png).
 * Served as a small pre-sized copy so the preloader veil paints fast.
 */
export function TriquetraMark({ className, animated = false, title }: Props) {
  const cls = [className, animated ? "veil-breathe" : null]
    .filter(Boolean)
    .join(" ");
  return (
    <img
      src="/dark_logo-veil.png"
      alt={title ?? "Triquetra mark"}
      className={cls}
      draggable={false}
    />
  );
}
