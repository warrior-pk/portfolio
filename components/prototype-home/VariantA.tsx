// PROTOTYPE — throwaway variant A ("Terminal bands").
// Closest to current TUI brutalism: single-column full-screen bands + terminal chrome.
// Read-only; links are stubs. Surfaces full state in the top strip.
import { CONTACT_LINKS, PERIODIC_TILES, SECTIONS, VERSION } from "@/lib/site";

export function VariantA() {
  return (
    <div className="bg-(--color-void) text-(--color-lume)">
      <p className="border-b border-(--color-hairline) bg-(--color-panel) px-6 py-2 font-mono text-[11px] text-(--color-faint) md:px-12">
        PROTOTYPE A · state: sections={SECTIONS.length} tiles=
        {PERIODIC_TILES.length} links={CONTACT_LINKS.length} version={VERSION}
      </p>
      <div className="sticky top-0 z-10 border-b border-(--color-hairline) bg-(--color-void)/95 px-6 py-2 font-mono text-xs md:px-12">
        <span className="text-(--color-brass)">$&nbsp;</span>warrior-pk
        --overview <span className="text-(--color-faint)">· try: sic mundus</span>
      </div>

      <section className="flex min-h-screen flex-col justify-center px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
          01 / hero
        </p>
        <h1 className="font-display mt-4 text-6xl font-semibold tracking-tight md:text-8xl">
          warrior-pk
        </h1>
        <p className="mt-4 max-w-md leading-relaxed opacity-85">
          Software developer — quiet interfaces, fast pages.
        </p>
        <p className="mt-6 font-mono text-sm">
          <span className="text-(--color-brass)">❯&nbsp;</span>
          <span className="underline">sic mundus ↵</span>
        </p>
      </section>

      <section className="border-t border-(--color-hairline) px-6 py-24 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
          02 / about
        </p>
        <h2 className="font-display mt-4 text-4xl font-semibold">About</h2>
        <p className="mt-6 max-w-2xl leading-relaxed">
          I&apos;m a software developer building fast, quiet interfaces and the
          systems behind them. TypeScript across the stack — static pages to
          services that stay up.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-(--color-faint)">
          I like work the way great chases are finished: calm under a climbing
          asking rate.
        </p>
      </section>

      <section className="border-t border-(--color-hairline) px-6 py-24 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
          03 / stack
        </p>
        <h2 className="font-display mt-4 text-4xl font-semibold">Stack</h2>
        <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-px border border-(--color-hairline) bg-(--color-hairline) sm:grid-cols-4">
          {PERIODIC_TILES.map((tile) => (
            <li key={tile.index} className="bg-(--color-panel) p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-semibold text-(--color-tile)">
                  {tile.symbol}
                </span>
                <span className="font-mono text-[11px] text-(--color-faint)">
                  {tile.index}
                </span>
              </div>
              <div className="mt-3 font-mono text-xs opacity-80">
                {tile.name}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-(--color-hairline) px-6 py-24 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
          04 / projects
        </p>
        <h2 className="font-display mt-4 text-4xl font-semibold">Projects</h2>
        <div className="mt-6 max-w-3xl border border-(--color-hairline) bg-(--color-panel) px-3 py-2.5 font-mono text-sm">
          <span className="text-(--color-brass)">$&nbsp;</span>ls projects
        </div>
        <p className="mt-2 font-mono text-xs text-(--color-faint)">
          0 results — building in public, check back soon
        </p>
        <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
          {["S.01", "S.02", "S.03"].map((slot) => (
            <li
              key={slot}
              className="min-h-36 border border-(--color-hairline) bg-(--color-panel)/60 p-3 font-mono text-[11px] text-(--color-faint)"
            >
              {slot} · spec slot — forthcoming
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-(--color-hairline) px-6 py-24 md:px-12">
        <p className="font-mono text-[11px] tracking-widest text-(--color-faint)">
          05 / contact
        </p>
        <h2 className="font-display mt-4 text-4xl font-semibold">Contact</h2>
        <ul className="mt-8 max-w-2xl divide-y divide-(--color-hairline) border-y border-(--color-hairline)">
          {CONTACT_LINKS.map((link) => (
            <li key={link.label}>
              <span className="flex items-center justify-between py-3 font-mono text-sm">
                <span>{link.label}</span>
                <span className="text-(--color-faint)">↗</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-16 font-mono text-xs text-(--color-faint)">
          The cold keeps its own ledger. · {VERSION}
        </p>
      </section>
    </div>
  );
}
