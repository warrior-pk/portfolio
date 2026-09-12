import { PERIODIC_TILES } from "@/lib/site";
import { Section } from "./Section";

/** 02 About: dev identity in 2–3 sentences + one chase/clutch copy line. Words only. */
export function AboutSection() {
  return (
    <Section id="about" index="02" label="about" labelledBy="about-heading">
      <div className="max-w-2xl">
        <h2
          id="about-heading"
          className="font-display text-3xl font-semibold tracking-tight text-(--color-lume) md:text-4xl"
        >
          About
        </h2>
        <p className="mt-6 leading-relaxed text-(--color-lume)/90">
          I&apos;m a software developer building fast, quiet interfaces and the
          systems behind them. I work mostly in TypeScript across the stack —
          from static pages like this one to services that stay up when it
          matters.
        </p>
        <p className="mt-4 leading-relaxed text-(--color-faint)">
          I like work the way great chases are finished: calm under a climbing
          asking rate, committed to seeing it through.
        </p>
      </div>
    </Section>
  );
}

/**
 * 03 Stack: skills rendered exclusively as Periodic tiles (symbol + index)
 * in a tight grid. The only Breaking Bad visual on the site — the green
 * lives in these tiles and leaks nowhere else.
 */
export function StackSection() {
  return (
    <Section id="stack" index="03" label="stack" labelledBy="stack-heading">
      <div className="max-w-3xl">
        <h2
          id="stack-heading"
          className="font-display text-3xl font-semibold tracking-tight text-(--color-lume) md:text-4xl"
        >
          Stack
        </h2>
        <ul
          aria-label="skills as periodic tiles"
          className="mt-8 grid grid-cols-2 gap-px border border-(--color-hairline) bg-(--color-hairline) sm:grid-cols-4"
        >
          {PERIODIC_TILES.map((tile) => (
            <li
              key={tile.index}
              className="group bg-(--color-panel) p-4 transition-colors duration-200"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-semibold text-(--color-tile)">
                  {tile.symbol}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-(--color-faint)">
                  {tile.index}
                </span>
              </div>
              <div className="mt-3 font-mono text-xs text-(--color-lume)/80">
                {tile.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
