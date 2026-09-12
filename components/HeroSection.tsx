"use client";

import { HeroGrid } from "./HeroGrid";
import { HeroOutro } from "./HeroOutro";
import { HeroPrompt } from "./HeroPrompt";

/**
 * 01 Hero: full-viewport. Name, one-line dev identity, and the single
 * working terminal moment. The grid + glow live here only.
 */
export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative">
      <HeroOutro>
        <div className="relative flex min-h-[auto] flex-col justify-center overflow-hidden px-6 py-24 md:min-h-screen md:px-12">
          <HeroGrid />
          <div className="relative max-w-2xl">
            <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
              01 / hero
            </p>
            <h1
              id="hero-heading"
              className="font-display mt-4 text-5xl font-semibold tracking-tight text-(--color-lume) md:text-7xl"
            >
              warrior-pk
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-(--color-lume)/85">
              Software developer — quiet interfaces, fast pages.
            </p>
            <HeroPrompt />
          </div>
        </div>
      </HeroOutro>
    </section>
  );
}
