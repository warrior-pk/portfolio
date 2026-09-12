// PROTOTYPE — throwaway variant C ("Ledger masthead").
// Newspaper masthead + ledger: giant display hero, about+stack side-by-side with
// real periodic tiles, projects as a table. No terminal chrome anywhere — no `$`,
// no prompts, no flip hints; the quiet-technical feel comes from type, palette,
// and spacing alone. Read-only; contact cells are stubs.
import { CONTACT_LINKS, PERIODIC_TILES, VERSION } from "@/lib/site";

/**
 * PROTOTYPE stubs: latest versions of each stack item, verified against this
 * machine on 2026-09-12 (repo deps + `node -v` / `bun -v` / `pg_config`).
 * Re-verify before any fold-in — versions rot, and production still uses
 * `index` until the tile contract is deliberately changed.
 */
const STACK_VERSIONS: Record<string, string> = {
  TypeScript: "5.9",
  React: "19",
  "Next.js": "16",
  Node: "26",
  Tailwind: "4",
  Motion: "13",
  Postgres: "18",
  Bun: "1.4",
};

export function VariantC() {
  return (
    <div className="bg-(--color-void) text-(--color-lume)">
      {/* Masthead: name + plain-word index */}
      <header className="border-b border-(--color-hairline) px-6 py-4 md:px-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-2xl font-semibold">warrior-pk</p>
          <nav
            aria-label="sections"
            className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-(--color-faint)"
          >
            {["hero", "about", "stack", "projects", "contact"].map((item) => (
              <a key={item} href={`#ledger-${item}`} className="hover:text-(--color-lume)">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Giant display hero */}
      <section
        id="ledger-hero"
        className="border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-24"
      >
        <h1 className="font-display text-[13vw] leading-[0.9] font-semibold tracking-tight md:text-[9vw]">
          QUIET
          <br />
          INTERFACES
        </h1>
        <p className="mt-8 max-w-md leading-relaxed text-(--color-lume)/85">
          Software developer — quiet interfaces, fast pages.
        </p>
      </section>

      {/* About + stack side by side */}
      <div className="grid border-b border-(--color-hairline) md:grid-cols-2">
        <section
          id="ledger-about"
          className="border-b border-(--color-hairline) px-6 py-12 md:border-r md:border-b-0 md:px-12"
        >
          <h2 className="font-display text-2xl font-semibold">About</h2>
          <p className="font-display mt-4 text-xl leading-snug text-(--color-lume)/90">
            Fast, quiet interfaces and the systems behind them.
          </p>
          <p className="mt-4 leading-relaxed text-(--color-faint)">
            TypeScript across the stack, from static pages like this one to
            services that stay up. Calm under a climbing asking rate —
            committed to seeing it through.
          </p>
        </section>
        <section id="ledger-stack" className="px-6 py-12 md:px-12">
          <h2 className="font-display text-2xl font-semibold">Stack</h2>
          <ul
            aria-label="skills as periodic tiles"
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {PERIODIC_TILES.map((tile) => (
              <li
                key={tile.index}
                className="border border-black/50 bg-(--color-tile) p-4"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-4xl font-semibold text-white">
                    {tile.symbol}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-white/90">
                    {STACK_VERSIONS[tile.name] ?? tile.index}
                  </span>
                </div>
                <div className="mt-3 font-mono text-xs text-white/85">
                  {tile.name}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Projects as ledger table */}
      <section
        id="ledger-projects"
        className="border-b border-(--color-hairline) px-6 py-12 md:px-12"
      >
        <h2 className="font-display text-2xl font-semibold">Projects</h2>
        <p className="mt-3 text-sm text-(--color-faint)">
          Nothing here yet — building in public, check back soon.
        </p>
        <table className="mt-6 w-full font-mono text-sm">
          <thead>
            <tr className="text-left text-[11px] text-(--color-faint)">
              <th className="py-2 pr-4 font-normal">Slot</th>
              <th className="py-2 pr-4 font-normal">Status</th>
              <th className="py-2 text-right font-normal">Spec</th>
            </tr>
          </thead>
          <tbody>
            {["S.01", "S.02", "S.03"].map((slot) => (
              <tr key={slot} className="border-t border-(--color-hairline)">
                <td className="py-3 pr-4">{slot}</td>
                <td className="py-3 pr-4">Empty</td>
                <td className="py-3 text-right text-(--color-faint)">
                  Forthcoming
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Contact as 4-up grid footer */}
      <section id="ledger-contact" className="px-6 py-12 md:px-12">
        <h2 className="font-display text-2xl font-semibold">Contact</h2>
        <div className="mt-6 grid grid-cols-2 gap-px border border-(--color-hairline) bg-(--color-hairline) md:grid-cols-4">
          {CONTACT_LINKS.map((link) => (
            <div
              key={link.label}
              className="bg-(--color-panel) p-6 text-center font-mono text-sm"
            >
              {link.label} ↗
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-xs text-(--color-faint)">
          The cold keeps its own ledger. · {VERSION}
        </p>
      </section>
    </div>
  );
}
