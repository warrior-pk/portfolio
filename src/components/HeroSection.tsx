"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import gsap from "gsap";
import { useMotionGate } from "@/lib/motion-gate";
import { heroScrub } from "@/lib/scrub";
import { PinnedSection, type StageTimelineBuilder } from "./PinnedSection";

const HeroBlob = dynamic(
  () => import("./HeroBlob").then((m) => m.HeroBlob),
  { ssr: false },
);

const LINES = [
  { text: "BUILD", className: "" },
  { text: "BREAK", className: "text-stroke" },
  { text: "REPEAT", className: "" },
];

/**
 * Hero scrub narrative (exit only): the heading drifts upward in parallax
 * while the black-hole visual (fed via shared scrub progress) intensifies
 * and the grid recedes. The text entrance belongs to load, not scroll, so
 * the reveal starts at the pin with no approach lead.
 */
const buildHeroTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.to(q("[data-hero-heading]"), { yPercent: -12, duration: 1 }, 0).to(
    q("[data-hero-grid]"),
    { opacity: 0.25, duration: 1 },
    0,
  );
};

/**
 * 01 Hero: bottom-anchored oversized display type filling the viewport.
 * Lines rise line-by-line on load whenever motion is allowed; scroll
 * owns only the exit drift, never the entrance.
 */
export function HeroSection() {
  const { motionOK } = useMotionGate();

  return (
    <PinnedSection
      onScrub={(progress) => {
        heroScrub.value = progress;
      }}
      buildTimeline={buildHeroTimeline}
      revealFrom={{ start: "top 88px", lead: () => 0 }}
    >
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-(--color-hairline)"
      >
        <div aria-hidden data-hero-grid className="blueprint-grid absolute inset-0" />
        <HeroBlob />

        <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-end px-6 pt-14 pb-10 md:px-12 md:pb-14">
          <div className="mb-auto flex flex-wrap items-center justify-between gap-2 pt-2 font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase">
            <span>01 — hero</span>
          </div>

          <h1
            id="hero-heading"
            data-hero-heading
            className="font-display mt-10 text-[clamp(4.5rem,min(17.5vw,28svh),16rem)] leading-[0.84] font-semibold tracking-[-0.03em]"
          >
            {LINES.map((line, i) =>
              motionOK ? (
                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${line.className}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ) : (
                <span key={line.text} className={`block ${line.className}`}>
                  {line.text}
                </span>
              ),
            )}
          </h1>
        </div>
      </section>
    </PinnedSection>
  );
}
