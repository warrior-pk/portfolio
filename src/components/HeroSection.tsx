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
 * Hero scrub narrative: display lines rise staggered as the pin arrives,
 * then drift upward in parallax while the black-hole visual (fed via
 * shared scrub progress) intensifies and the grid recedes.
 */
const buildHeroTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(
    q("[data-hero-line]"),
    { yPercent: 110, duration: 0.45, stagger: 0.1 },
    0,
  )
    .from(q("[data-hero-copy]"), { opacity: 0, y: 24, duration: 0.3 }, 0.35)
    .to(q("[data-hero-heading]"), { yPercent: -12, duration: 0.55 }, 0.45)
    .to(q("[data-hero-grid]"), { opacity: 0.25, duration: 0.55 }, 0.45);
};

/**
 * 01 Hero: bottom-anchored oversized display type filling the viewport.
 * Under the pointer-FX gate the scrub owns entrances; otherwise lines
 * rise line-by-line on load as before.
 */
export function HeroSection() {
  const { motionOK, pointerFX } = useMotionGate();
  const scrubbed = pointerFX;
  const loadAnimated = motionOK && !scrubbed;

  return (
    <PinnedSection
      onScrub={(progress) => {
        heroScrub.value = progress;
      }}
      buildTimeline={buildHeroTimeline}
    >
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-(--color-hairline)"
      >
        <div aria-hidden data-hero-grid className="blueprint-grid absolute inset-0" />
        <HeroBlob />

        <div className="relative z-10 flex min-h-svh flex-col justify-end px-6 pt-14 pb-10 md:px-12 md:pb-14">
          <div
            data-hero-copy
            className="mb-auto flex flex-wrap items-center justify-between gap-2 pt-2 font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase"
          >
            <span>01 — hero</span>
          </div>

          <h1
            id="hero-heading"
            data-hero-heading
            className="font-display mt-10 text-[clamp(4.5rem,17.5vw,16rem)] leading-[0.84] font-semibold tracking-[-0.03em]"
          >
            {LINES.map((line, i) =>
              loadAnimated ? (
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
                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className={`block ${line.className}`}>
                    {line.text}
                  </span>
                </span>
              ),
            )}
          </h1>

          <p
            data-hero-copy
            className="mt-8 max-w-md leading-relaxed text-(--color-lume)/85"
          >
            Software developer exploring tech — learning in public,
            building in the open.
          </p>
        </div>
      </section>
    </PinnedSection>
  );
}
