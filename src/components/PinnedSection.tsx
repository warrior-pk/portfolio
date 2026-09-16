"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionGate } from "@/lib/motion-gate";
import { travelFor } from "@/lib/scrub";

export type StageTimelineBuilder = (
  tl: gsap.core.Timeline,
  stage: HTMLElement,
) => void;

interface PinnedSectionProps {
  children: ReactNode;
  /** Build the scrubbed inner timeline; selectors resolve inside the stage. */
  buildTimeline?: StageTimelineBuilder;
  /** Receives pin progress (0..1) for ambient visuals. */
  onScrub?: (progress: number) => void;
}

/**
 * PinnedSection: the single pin/scrub seam. When the pointer-FX gate holds,
 * the stage pins 88px below viewport top — under the sticky masthead is
 * never visible — and scrubs its inner timeline over travel derived from
 * measured content height. Otherwise children render as a normal
 * full-screen section. Scrub owns entrances inside; the fade-up
 * primitive must stay out via `Reveal disabled`.
 */
export function PinnedSection({
  children,
  buildTimeline,
  onScrub,
}: PinnedSectionProps) {
  const { pointerFX } = useMotionGate();
  const stageRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef(buildTimeline);
  buildRef.current = buildTimeline;
  const scrubRef = useRef(onScrub);
  scrubRef.current = onScrub;
  const active = pointerFX;

  useEffect(() => {
    const stage = stageRef.current;
    if (!active || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top 88px",
          end: () => `+=${travelFor(stage.scrollHeight, window.innerHeight)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrubRef.current?.(self.progress);
          },
        },
      });
      buildRef.current?.(tl, stage);
    }, stage);
    return () => {
      ctx.revert();
      scrubRef.current?.(0);
    };
  }, [active]);

  return <div ref={stageRef}>{children}</div>;
}
