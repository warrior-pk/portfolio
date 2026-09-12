"use client";

import { HeroPrompt } from "./HeroPrompt";

const NAV = ["hero", "about", "stack", "projects", "contact"];

/**
 * 01 Hero: masthead plus giant display type. The prompt underneath stays
 * fully working (section commands + dark-world phrase) but visually quiet:
 * a bare input line, no sigils — the terminal is inferred, never stated.
 */
export function HeroSection() {
  return (
    <>
      <header className="border-b border-(--color-hairline) px-6 py-4 md:px-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-2xl font-semibold">warrior-pk</p>
          <nav
            aria-label="sections"
            className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-(--color-faint)"
          >
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-(--color-lume)"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <h1
          id="hero-heading"
          className="font-display text-[13vw] leading-[0.9] font-semibold tracking-tight md:text-[9vw]"
        >
          QUIET
          <br />
          INTERFACES
        </h1>
        <p className="mt-8 max-w-md leading-relaxed text-(--color-lume)/85">
          Software developer — quiet interfaces, fast pages.
        </p>
        <HeroPrompt />
      </section>
    </>
  );
}
