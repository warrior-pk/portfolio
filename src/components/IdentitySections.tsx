"use client";

import gsap from "gsap";
import { useMotionGate } from "@/lib/motion-gate";
import { Reveal } from "./Reveal";
import { ElementTable } from "./ElementTable";
import { PinnedSection, type StageTimelineBuilder } from "./PinnedSection";

/** About scrub: copy blocks arrive in steps; more copy extends the pin. */
const buildAboutTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(
    q("[data-scrub-step]"),
    { opacity: 0, y: 28, duration: 0.35, stagger: 0.12 },
    0,
  );
};

/** Skills scrub: the whole table arrives as one unit, not tile by tile. */
const buildSkillsTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(q("[data-scrub-step]"), { opacity: 0, y: 28, duration: 0.3 }, 0).from(
    q("[data-scrub-table]"),
    { opacity: 0, y: 40, duration: 0.45 },
    0.1,
  );
};

/** 02 About: dev identity in 2–3 sentences + one chase/clutch copy line. Words only. */
export function AboutSection() {
  const { pointerFX } = useMotionGate();
  return (
    <PinnedSection buildTimeline={buildAboutTimeline}>
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative flex min-h-[calc(100svh-6rem)] flex-col justify-center overflow-hidden border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-4 right-4 text-[7rem] leading-none font-semibold text-(--color-lume)/[0.04] select-none md:text-[10rem]"
        >
          02
        </span>
        <Reveal disabled={pointerFX}>
          <h2
            id="about-heading"
            data-scrub-step
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            About
          </h2>
        </Reveal>
        <Reveal delay={0.08} disabled={pointerFX}>
          <p
            data-scrub-step
            className="font-display mt-6 text-2xl leading-snug text-(--color-lume)/90 md:text-[1.7rem]"
          >
            Fast, quiet interfaces and the systems behind them.
          </p>
        </Reveal>
        <Reveal delay={0.14} disabled={pointerFX}>
          <p
            data-scrub-step
            className="mt-5 max-w-md leading-relaxed text-(--color-faint)"
          >
            I&apos;m Piyush Kumar, a software developer exploring tech across
            TypeScript, JavaScript, Java, C++, and Python. Right now I&apos;m
            learning in public — fast, quiet interfaces up front, solid
            fundamentals behind them.
          </p>
        </Reveal>
        <Reveal delay={0.2} disabled={pointerFX}>
          <p
            data-scrub-step
            className="mt-8 border-l-2 border-(--color-brass) pl-4 font-mono text-xs leading-relaxed text-(--color-faint)"
          >
            typescript · python · java · react · node · nextjs · spring boot
          </p>
        </Reveal>
      </section>
    </PinnedSection>
  );
}

/**
 * 03 Skills: tech skills rendered as a chemistry table of PeriodicTiles,
 * under a Breaking Bad logo heading.
 */
export function SkillsSection() {
  const { pointerFX } = useMotionGate();
  return (
    <PinnedSection buildTimeline={buildSkillsTimeline}>
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative flex min-h-[calc(100svh-6rem)] flex-col justify-center overflow-hidden border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-4 right-4 text-[7rem] leading-none font-semibold text-(--color-lume)/[0.04] select-none md:text-[10rem]"
        >
          03
        </span>
        <Reveal disabled={pointerFX} className="-mt-6 mb-6 md:-mt-10 md:mb-8">
          <h2
            id="skills-heading"
            data-scrub-step
            aria-label="Tech Skills"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            <span aria-hidden className="flex items-center gap-[0.06em]">
              <span className="bb-tile">
                <span className="bb-sym">Te</span>
              </span>
              <span>ch</span>
            </span>
            <span aria-hidden className="ml-[1.15em] -mt-[0.12em] flex items-center gap-[0.06em]">
              <span className="bb-tile">
                <span className="bb-sym">Sk</span>
              </span>
              <span>ills</span>
            </span>
          </h2>
        </Reveal>
        <Reveal disabled={pointerFX}>
          <ElementTable />
        </Reveal>
      </section>
    </PinnedSection>
  );
}
