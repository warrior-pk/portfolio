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
import { SkillMark } from "./SkillMark";

/**
 * ElementTable: the Skills chemistry table. A full seven-period,
 * eighteen-column frame with explicit empty cells, plus a detached
 * two-row f-block for DevOps, data, cloud, and observability skills.
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
  const fblock = new Map(
    PERIODIC_TILES.filter((t) => t.row === 0).map((t) => [`${t.frow}:${t.col}`, t]),
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
      <ul aria-label="elements" className="element-grid">
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
                below={row <= 2}
                glow={glow}
                active={pointerFX}
              />
            );
          }),
        )}
      </ul>
      <div className="element-fblock">
        {frows.map((f) => (
          <ul
            key={f}
            aria-label={f === 1 ? "DevOps and databases" : "cloud services and observability"}
            className="element-grid element-frow-grid"
          >
            {fcols.map((col) => {
              const actual = fblock.get(`${f}:${col}`);
              if (actual) {
                return (
                  <ElementCell
                    key={actual.symbol}
                    tile={actual}
                    row={1}
                    below={false}
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
                    className="element-gap"
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
  below,
  glow,
  active,
}: {
  tile: PeriodicTile;
  row: number;
  /** Open the detail card below the tile (top rows) instead of above. */
  below: boolean;
  glow: string;
  active: boolean;
}) {
  const placement = {
    "--ecol": tile.col,
    "--erow": row,
  } as React.CSSProperties;
  const face = (
    <>
      <SkillMark name={tile.name} symbol={tile.symbol} />
    </>
  );
  const card = (
    <div className="tile-card" aria-hidden="true">
      <p className="tile-card-title">{tile.name}</p>
      <p className="tile-card-sub">{tile.blurb ?? tile.name}</p>
      {tile.version || tile.yoe ? (
        <p className="tile-card-meta">
          {[tile.version ? `v${tile.version}` : null, tile.yoe ? `${tile.yoe} exp` : null]
            .filter(Boolean)
            .join(" · ")}
        </p>
      ) : null}
      <button type="button" disabled className="tile-card-proj">
        Projects →
      </button>
    </div>
  );

  if (!active) {
    return (
      <li
        data-cell
        data-block={tile.block}
        data-skill={tile.name}
        data-mastery={tile.mastery}
        data-flip={below || undefined}
        data-edge-l={tile.col <= 2 || undefined}
        data-edge-r={tile.col >= 17 || undefined}
        style={placement}
        tabIndex={0}
        aria-label={describeTile(tile)}
      >
        <div className="element-tile element-tile--mark-only">{face}</div>
        {card}
      </li>
    );
  }

  return (
    <li
      data-cell
      data-block={tile.block}
      data-skill={tile.name}
      data-mastery={tile.mastery}
      data-flip={below || undefined}
      data-edge-l={tile.col <= 2 || undefined}
      data-edge-r={tile.col >= 17 || undefined}
      style={placement}
      tabIndex={0}
      aria-label={describeTile(tile)}
    >
      <ParticleCard
        className="card card--border-glow element-tile element-tile--mark-only"
        disableAnimations={false}
        particleCount={0}
        glowColor={glow}
        enableTilt={false}
        clickEffect={false}
        enableMagnetism={false}
      >
        {face}
      </ParticleCard>
      {card}
    </li>
  );
}
