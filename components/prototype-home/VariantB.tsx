// PROTOTYPE — throwaway variant B ("Sidebar dossier").
// Radically different from A: fixed left sidebar owns navigation (primary affordance
// is jumping via the index), right side reads as a dossier of cards. Stack becomes
// a vertical ledger table, not a tile grid. Read-only; links are stubs.
import { CONTACT_LINKS, PERIODIC_TILES, SECTIONS, VERSION } from "@/lib/site";

const NAV = [
  { index: "01", id: "hero", label: "hero" },
  { index: "02", id: "about", label: "about" },
  { index: "03", id: "stack", label: "stack" },
  { index: "04", id: "projects", label: "projects" },
  { index: "05", id: "contact", label: "contact" },
];

export function VariantB() {
  return (
    <div className="bg-(--color-void) text-(--color-lume) md:grid md:grid-cols-[240px_1fr]">
      {/* Sidebar: the primary affordance */}
      <aside className="border-b border-(--color-hairline) bg-(--color-panel) p-6 md:sticky md:top-0 md:h-screen md:overflow-auto">
        <p className="font-mono text-[11px] text-(--color-faint)">
          PROTOTYPE B · dossier
        </p>
        <p className="font-display mt-2 text-2xl font-semibold">warrior-pk</p>
        <p className="mt-1 font-mono text-[11px] text-(--color-faint)">
          {VERSION} · {SECTIONS.length} sections · {PERIODIC_TILES.length} tiles
        </p>
        <nav aria-label="prototype dossier index" className="mt-8">
          <ol className="space-y-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#proto-b-${item.id}`}
                  className="flex items-baseline gap-3 rounded border border-transparent px-3 py-2 font-mono text-sm hover:border-(--color-hairline) hover:bg-(--color-void)"
                >
                  <span className="text-[11px] text-(--color-brass)">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-8 font-mono text-[11px] leading-relaxed text-(--color-faint)">
          state: tiles={PERIODIC_TILES.length} links={CONTACT_LINKS.length} ·
          jump via index, don&apos;t scroll blind
        </p>
      </aside>

      {/* Dossier cards */}
      <div className="space-y-6 p-6 md:p-10">
        <section
          id="proto-b-hero"
          className="rounded-lg border border-(--color-hairline) bg-(--color-panel) p-8"
        >
          <p className="font-mono text-[11px] text-(--color-faint)">
            FILE 01 — HERO
          </p>
          <h1 className="font-display mt-3 text-5xl font-semibold">
            warrior-pk
          </h1>
          <p className="mt-3 max-w-lg opacity-85">
            Software developer — quiet interfaces, fast pages.
          </p>
          <p className="mt-4 inline-block rounded bg-(--color-void) px-3 py-2 font-mono text-xs">
            type <span className="text-(--color-brass)">sic mundus</span> to
            flip worlds
          </p>
        </section>

        <section
          id="proto-b-about"
          className="rounded-lg border border-(--color-hairline) bg-(--color-panel) p-8"
        >
          <p className="font-mono text-[11px] text-(--color-faint)">
            FILE 02 — ABOUT
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed">
            Fast, quiet interfaces and the systems behind them. TypeScript
            across the stack. Calm under a climbing asking rate, committed to
            seeing it through.
          </p>
        </section>

        <section
          id="proto-b-stack"
          className="rounded-lg border border-(--color-hairline) bg-(--color-panel) p-8"
        >
          <p className="font-mono text-[11px] text-(--color-faint)">
            FILE 03 — STACK LEDGER ({PERIODIC_TILES.length})
          </p>
          <table className="mt-4 w-full font-mono text-sm">
            <tbody>
              {PERIODIC_TILES.map((tile) => (
                <tr
                  key={tile.index}
                  className="border-t border-(--color-hairline)"
                >
                  <td className="py-2 pr-4 text-(--color-tile)">{tile.symbol}</td>
                  <td className="py-2 pr-4">{tile.name}</td>
                  <td className="py-2 text-right text-(--color-faint)">
                    {tile.index}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section
          id="proto-b-projects"
          className="rounded-lg border border-(--color-hairline) bg-(--color-panel) p-8"
        >
          <p className="font-mono text-[11px] text-(--color-faint)">
            FILE 04 — PROJECTS (0 results)
          </p>
          <ol className="mt-4 space-y-2 font-mono text-sm">
            {["S.01", "S.02", "S.03"].map((slot, i) => (
              <li
                key={slot}
                className="flex justify-between rounded border border-dashed border-(--color-hairline) px-3 py-3"
              >
                <span>{slot} · spec row {i + 1}</span>
                <span className="text-(--color-faint)">forthcoming</span>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="proto-b-contact"
          className="rounded-lg border border-(--color-hairline) bg-(--color-panel) p-8"
        >
          <p className="font-mono text-[11px] text-(--color-faint)">
            FILE 05 — CONTACT
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CONTACT_LINKS.map((link) => (
              <span
                key={link.label}
                className="rounded-full border border-(--color-hairline) px-4 py-2 font-mono text-sm"
              >
                {link.label} ↗
              </span>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-(--color-faint)">
            The cold keeps its own ledger. · {VERSION}
          </p>
        </section>
      </div>
    </div>
  );
}
