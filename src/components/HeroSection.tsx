"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { heroScrub } from "@/lib/scrub";
import { PinnedSection, type StageTimelineBuilder } from "./PinnedSection";

const HeroBlob = dynamic(
  () => import("./HeroBlob").then((m) => m.HeroBlob),
  { ssr: false },
);

/**
 * True after the browser is idle past first paint: the ambient blob is
 * decorative, so its WebGL init never competes with LCP or hydration.
 */
function useAfterPaint(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // `in`-narrowing on window breaks the else branch, so read the
    // callback behind a typeof guard instead.
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback.bind(window)
        : null;
    if (idle) {
      const id = idle(() => setReady(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);
  return ready;
}

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
 * The entrance is CSS-driven (hero-rise): lines paint in final position
 * with first paint and rise as a progressive enhancement, so content
 * never waits on JS hydration. Reduced-motion collapses it via the
 * global gate; scroll owns only the exit drift, never the entrance.
 */
export function HeroSection() {
  const blobReady = useAfterPaint();
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
        {blobReady ? <HeroBlob /> : null}

        <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-end px-6 pt-14 pb-10 md:px-12 md:pb-14">
          <div aria-hidden className="mb-auto pt-2" />

          <h1
            id="hero-heading"
            data-hero-heading
            className="font-display mt-10 text-[clamp(4.5rem,min(17.5vw,28svh),16rem)] leading-[0.84] font-semibold tracking-[-0.03em]"
          >
            {/* Crawler + screen-reader identity: the visual lines are brand
                type, so the h1 carries the name and role as hidden text. */}
            <span className="sr-only">
              Piyush Kumar — full-stack software developer:{" "}
            </span>
            {LINES.map((line, i) => (
              <span key={line.text} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span
                  className={`hero-rise block ${line.className}`}
                  style={{ animationDelay: `${0.1 + i * 0.09}s` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </section>
    </PinnedSection>
  );
}
