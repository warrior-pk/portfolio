"use client";

import gsap from "gsap";
import { PERIODIC_TILES } from "@/lib/site";
import { useMotionGate } from "@/lib/motion-gate";
import { Reveal } from "./Reveal";
import { PinnedSection, type StageTimelineBuilder } from "./PinnedSection";

function SectionTag({ index, id }: { index: string; id: string }) {
  return (
    <p className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase">
      <span>
        {index} — {id}
      </span>
      <span aria-hidden className="h-px w-16 bg-(--color-hairline)" />
    </p>
  );
}

/** About scrub: copy blocks arrive in steps; more copy extends the pin. */
const buildAboutTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(
    q("[data-scrub-step]"),
    { opacity: 0, y: 28, duration: 0.35, stagger: 0.12 },
    0,
  );
};

/** Stack scrub: header steps in, then PeriodicTiles stagger. */
const buildStackTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(q("[data-scrub-step]"), { opacity: 0, y: 28, duration: 0.3 }, 0).from(
    q("[data-scrub-tile]"),
    { opacity: 0, y: 32, scale: 0.96, duration: 0.35, stagger: 0.06 },
    0.15,
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
        className="relative flex min-h-svh flex-col justify-center overflow-hidden border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-4 right-4 text-[7rem] leading-none font-semibold text-(--color-lume)/[0.04] select-none md:text-[10rem]"
        >
          02
        </span>
        <Reveal disabled={pointerFX}>
          <SectionTag index="02" id="about" />
          <h2
            id="about-heading"
            data-scrub-step
            className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl"
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
            {PERIODIC_TILES.map((t) => t.name.toLowerCase()).join(" · ")}
          </p>
        </Reveal>
      </section>
    </PinnedSection>
  );
}

/**
 * 03 Stack: skills rendered exclusively as Periodic tiles (symbol + version)
 * on filled green, the only Breaking Bad visual on the site.
 */
export function StackSection() {
  const { pointerFX } = useMotionGate();
  return (
    <PinnedSection buildTimeline={buildStackTimeline}>
      <section
        id="stack"
        aria-labelledby="stack-heading"
        className="relative flex min-h-svh flex-col justify-center overflow-hidden border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-4 right-4 text-[7rem] leading-none font-semibold text-(--color-lume)/[0.04] select-none md:text-[10rem]"
        >
          03
        </span>
        <Reveal disabled={pointerFX}>
          <SectionTag index="03" id="stack" />
          <h2
            id="stack-heading"
            data-scrub-step
            className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Stack
          </h2>
        </Reveal>
        <ul
          aria-label="skills as periodic tiles"
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {PERIODIC_TILES.map((tile, i) => (
            <li key={tile.symbol}>
              <Reveal
                delay={Math.min(i * 0.06, 0.36)}
                disabled={pointerFX}
                className="h-full"
              >
                <div
                  data-scrub-tile
                  className="group h-full border border-black/50 bg-(--color-tile) p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-(--color-brass) hover:shadow-[0_12px_32px_-12px_color-mix(in_srgb,var(--color-brass)_45%,transparent)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-4xl font-semibold text-white transition-transform duration-300 ease-out group-hover:scale-110">
                      {tile.symbol}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-white/90">
                      {tile.version}
                    </span>
                  </div>
                  <div className="mt-3 font-mono text-xs text-white/85">
                    {tile.name}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </PinnedSection>
  );
}
