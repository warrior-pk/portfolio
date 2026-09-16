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

export interface RevealRange {
  /** ScrollTrigger start position for the reveal timeline. */
  start: string;
  /**
   * Extra scroll distance past the approach point, as a function of pin
   * travel. Entrances finish shortly after parking (not at pin end), so
   * any landing at or past the pin start arrives revealed.
   */
  lead: (travel: number) => number;
}

/**
 * Reveal on approach: scenes start appearing while still lower down and
 * finish shortly after parking; the rest of the pin is dwell and exit.
 */
const APPROACH_REVEAL: RevealRange = {
  start: "top 90%",
  lead: (travel: number) =>
    Math.max(0, window.innerHeight * 0.9 - 88) + travel * 0.3,
};

interface PinnedSectionProps {
  children: ReactNode;
  /** Build the scrubbed inner timeline; selectors resolve inside the stage. */
  buildTimeline?: StageTimelineBuilder;
  /** Receives reveal progress (0..1) for ambient visuals. */
  onScrub?: (progress: number) => void;
  /** Reveal range; hero starts its exit at the pin instead of on approach. */
  revealFrom?: RevealRange;
}

/**
 * PinnedSection: the single pin/scrub seam, two triggers. The pin parks
 * the stage below the sticky masthead; a separate reveal timeline starts
 * on approach so scenes appear early and dot/anchor landings arrive with
 * content already revealed instead of at hidden scene starts. Travel
 * derives from measured content height. Without the pointer-FX gate,
 * children render as a normal full-screen section. Scrub owns entrances
 * inside; the fade-up primitive must stay out via `Reveal disabled`.
 */
export function PinnedSection({
  children,
  buildTimeline,
  onScrub,
  revealFrom = APPROACH_REVEAL,
}: PinnedSectionProps) {
  const { pointerFX } = useMotionGate();
  const stageRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef(buildTimeline);
  buildRef.current = buildTimeline;
  const scrubRef = useRef(onScrub);
  scrubRef.current = onScrub;
  const revealRef = useRef(revealFrom);
  revealRef.current = revealFrom;
  const active = pointerFX;

  useEffect(() => {
    const stage = stageRef.current;
    if (!active || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const travel = () => travelFor(stage.scrollHeight, window.innerHeight);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: "top 88px",
        end: () => `+=${travel()}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: revealRef.current.start,
          end: () => `+=${revealRef.current.lead(travel()) + travel()}`,
          scrub: 1,
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

  return (
    <div ref={stageRef} data-stage>
      {children}
    </div>
  );
}
