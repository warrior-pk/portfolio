interface TriquetraProps {
  className?: string;
}

/**
 * Triquetra: the site's only recurring mark, drawn in code (SVG).
 * Subtle, never explained in the UI. Exactly three placements:
 * favicon, loader mark, Section dividers.
 */
export function Triquetra({ className }: TriquetraProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" opacity={0.55} />
      <path d="M12 5.2c2.4 2.1 3.6 4.2 3.6 6.3a3.6 3.6 0 0 1-7.2 0c0-2.1 1.2-4.2 3.6-6.3Z" />
      <path d="M6.1 15.4c3.1.4 5.4 0 7.2-1.2a3.6 3.6 0 0 1-5.1 5.1c-1.2-1.2-1.9-2.5-2.1-3.9Z" />
      <path d="M17.9 15.4c-3.1.4-5.4 0-7.2-1.2a3.6 3.6 0 0 0 5.1 5.1c1.2-1.2 1.9-2.5 2.1-3.9Z" />
    </svg>
  );
}
