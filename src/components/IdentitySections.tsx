import { PERIODIC_TILES } from "@/lib/site";

/** 02 About: dev identity in 2–3 sentences + one chase/clutch copy line. Words only. */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-(--color-hairline) px-6 py-12 md:border-r md:border-b-0 md:px-12"
    >
      <h2
        id="about-heading"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        About
      </h2>
      <p className="font-display mt-4 text-xl leading-snug text-(--color-lume)/90">
        Fast, quiet interfaces and the systems behind them.
      </p>
      <p className="mt-4 leading-relaxed text-(--color-faint)">
        I&apos;m Piyush Kumar, a software developer exploring tech across
        TypeScript, JavaScript, Java, C++, and Python. Right now I&apos;m
        learning in public — fast, quiet interfaces up front, solid
        fundamentals behind them.
      </p>
    </section>
  );
}

/**
 * 03 Stack: skills rendered exclusively as Periodic tiles (symbol + version)
 * on filled green, the only Breaking Bad visual on the site.
 */
export function StackSection() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="px-6 py-12 md:px-12"
    >
      <h2
        id="stack-heading"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        Stack
      </h2>
      <ul
        aria-label="skills as periodic tiles"
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {PERIODIC_TILES.map((tile) => (
          <li
            key={tile.symbol}
            className="border border-black/50 bg-(--color-tile) p-4"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-4xl font-semibold text-white">
                {tile.symbol}
              </span>
              <span className="font-mono text-xs tabular-nums text-white/90">
                {tile.version}
              </span>
            </div>
            <div className="mt-3 font-mono text-xs text-white/85">
              {tile.name}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
