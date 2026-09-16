"use client";

import { useRef } from "react";
import {
  PERIODIC_TILES,
  describeTile,
  isTableVoid,
  TABLE_COLS,
  TABLE_PERIODS,
  FROW_ROWS,
  FBLOCK_COLS,
  FUTURE_SLOTS,
  type PeriodicTile,
} from "@/lib/site";
import { useMotionGate } from "@/lib/motion-gate";
import { useGlowColor } from "@/lib/glow";
import { GlobalSpotlight, ParticleCard } from "./MagicBento";

/**
 * ElementTable: the Skills chemistry table. A full seven-period,
 * eighteen-column frame with explicit empty cells, plus a detached
 * two-row f-block for learning elements and reserved future slots.
 * Families sit grouped by position with no names or labels. Each tile
 * is a MagicBento card with spotlight plus border glow only; without
 * the pointer-FX gate the same content renders as static tiles. The
 * scrub owns the whole table through `data-scrub-table`.
 */
export function ElementTable() {
  const { pointerFX } = useMotionGate();
  const glow = useGlowColor();
  const gridRef = useRef<HTMLDivElement>(null);

  const main = new Map(
    PERIODIC_TILES.filter((t) => t.row !== 0).map((t) => [`${t.row}:${t.col}`, t]),
  );
  const frow = new Map(
    PERIODIC_TILES.filter((t) => t.row === 0).map((t) => [t.col, t]),
  );
  const future = new Set(FUTURE_SLOTS.map((s) => `${s.f}:${s.col}`));

  const periods = Array.from({ length: TABLE_PERIODS }, (_, i) => i + 1);
  const cols = Array.from({ length: TABLE_COLS }, (_, i) => i + 1);
  const frows = Array.from({ length: FROW_ROWS }, (_, i) => i + 1);
  const fcols = Array.from({ length: FBLOCK_COLS }, (_, i) => i + 1);

  return (
    <div
      ref={gridRef}
      aria-label="skills as a periodic table"
      className="bento-section"
      data-scrub-table
      style={{ "--glow-color": glow } as React.CSSProperties}
    >
      {pointerFX && (
        <GlobalSpotlight
          gridRef={gridRef}
          enabled
          spotlightRadius={200}
          glowColor={glow}
        />
      )}
      <ul aria-label="elements" className="element-grid mt-8">
        {periods.flatMap((row) =>
          cols.flatMap((col) => {
            if (isTableVoid(row, col)) return [];
            const tile = main.get(`${row}:${col}`);
            if (!tile) {
              return (
                <li
                  key={`${row}:${col}`}
                  data-cell
                  aria-hidden
                  className="element-gap"
                  style={{ "--ecol": col, "--erow": row } as React.CSSProperties}
                />
              );
            }
            return (
              <ElementCell
                key={tile.symbol}
                tile={tile}
                row={row}
                glow={glow}
                active={pointerFX}
              />
            );
          }),
        )}
      </ul>
      <div className="element-fblock">
        {frows.map((f) => (
          <ul key={f} aria-label={f === 1 ? "learning elements" : "future elements"} className="element-grid">
            {fcols.map((col) => {
              const actual = f === 1 ? frow.get(col) : undefined;
              if (actual) {
                return (
                  <ElementCell
                    key={actual.symbol}
                    tile={actual}
                    row={1}
                    glow={glow}
                    active={pointerFX}
                  />
                );
              }
              if (future.has(`${f}:${col}`)) {
                return (
                  <li
                    key={`future-${f}:${col}`}
                    data-cell
                    aria-hidden
                    className="element-future"
                    style={{ "--ecol": col, "--erow": 1 } as React.CSSProperties}
                  />
                );
              }
              return (
                <li
                  key={`gap-f${f}:${col}`}
                  data-cell
                  aria-hidden
                  className="element-gap"
                  style={{ "--ecol": col, "--erow": 1 } as React.CSSProperties}
                />
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

function ElementCell({
  tile,
  row,
  glow,
  active,
}: {
  tile: PeriodicTile;
  row: number;
  glow: string;
  active: boolean;
}) {
  const placement = {
    "--ecol": tile.col,
    "--erow": row,
  } as React.CSSProperties;
  const face = (
    <>
      <span className="element-version">{tile.version}</span>
      <span className="element-symbol">{tile.symbol}</span>
      <span className="element-name">{tile.name}</span>
    </>
  );

  if (!active) {
    return (
      <li
        data-cell
        data-mastery={tile.mastery}
        style={placement}
        tabIndex={0}
        aria-label={describeTile(tile)}
      >
        <div className="element-tile">{face}</div>
      </li>
    );
  }

  return (
    <li
      data-cell
      data-mastery={tile.mastery}
      style={placement}
      tabIndex={0}
      aria-label={describeTile(tile)}
    >
      <ParticleCard
        className="card card--border-glow element-tile"
        disableAnimations={false}
        particleCount={0}
        glowColor={glow}
        enableTilt={false}
        clickEffect={false}
        enableMagnetism={false}
      >
        {face}
      </ParticleCard>
    </li>
  );
}
