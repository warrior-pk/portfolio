"use client";

import { useMotionGate } from "@/lib/motion-gate";

const PHRASES = [
  "fast interfaces",
  "quiet systems",
  "build",
  "break",
  "repeat",
  "learning in public",
];

/**
 * Marquee: one infinite strip between hero and ledger. Pure rhythm —
 * duplicated once for the -50% loop, frozen to a static row under
 * reduced-motion.
 */
export function Marquee() {
  const { motionOK } = useMotionGate();

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="px-6 font-mono text-xs tracking-[0.3em] text-(--color-faint) uppercase md:text-sm">
            {phrase}
          </span>
          <span aria-hidden className="text-(--color-brass)">
            //
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b border-(--color-hairline) py-4">
      {motionOK ? (
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center">{row(false)}</div>
      )}
    </div>
  );
}
