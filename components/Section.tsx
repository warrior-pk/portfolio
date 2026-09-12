"use client";

import { FADE_UP_DISTANCE, FADE_UP_MS, MOTION_EASE_CSS } from "@/lib/motion-tokens";
import { useMotionGate } from "@/lib/motion-gate";
import { useOnceVisible } from "@/lib/use-once-visible";
import { Triquetra } from "./Triquetra";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  labelledBy: string;
  divider?: boolean;
  children: React.ReactNode;
}

/**
 * Section: one full-screen band of the single route. Full-screen on
 * desktop, natural heights on small screens. Entrance is a plain fade-up
 * within budget, once per Section.
 */
export function Section({
  id,
  index,
  label,
  labelledBy,
  divider = true,
  children,
}: SectionProps) {
  const { motionOK } = useMotionGate();
  const { ref, visible: shown } = useOnceVisible<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className="relative flex min-h-[auto] scroll-mt-4 flex-col justify-center px-6 py-20 md:min-h-screen md:px-12 md:py-0"
      style={
        motionOK
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : `translateY(${FADE_UP_DISTANCE}px)`,
              transition: `opacity ${FADE_UP_MS}ms ${MOTION_EASE_CSS}, transform ${FADE_UP_MS}ms ${MOTION_EASE_CSS}`,
            }
          : undefined
      }
    >
      {divider ? (
        <div aria-hidden className="mb-10 flex items-center gap-3 md:mb-14">
          <Triquetra className="h-4 w-4 shrink-0 text-(--color-faint)" />
          <span className="h-px flex-1 bg-(--color-hairline)" />
          <span className="font-mono text-[11px] tracking-widest text-(--color-faint)">
            {index} / {label}
          </span>
        </div>
      ) : null}
      {children}
    </section>
  );
}
