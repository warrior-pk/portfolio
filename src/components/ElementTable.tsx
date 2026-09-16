"use client";

import { useRef } from "react";
import { PERIODIC_TILES, describeTile, type PeriodicTile } from "@/lib/site";
import { useMotionGate } from "@/lib/motion-gate";
import { useGlowColor } from "@/lib/glow";
import { GlobalSpotlight, ParticleCard } from "./MagicBento";

/**
 * ElementTable: the Stack chemistry table. Main 18-column grid plus a
 * detached f-row for learning elements, families grouped by position with
 * no names or labels. Gap cells hold the geometry and stay out of
 * assistive tech. Each tile is a MagicBento card with spotlight plus
 * border glow only; without the pointer-FX gate the same content renders
 * as static tiles. The scrub stagger keeps finding cells through
 * `data-scrub-tile` on the placement items.
 */
export function ElementTable() {
  const { pointerFX } = useMotionGate();
  const glow = useGlowColor();
  const gridRef = useRef<HTMLDivElement>(null);
  const main = PERIODIC_TILES.filter((t) => t.row !== 0);
  const frow = PERIODIC_TILES.filter((t) => t.row === 0);

  return (
    <div
      ref={gridRef}
      aria-label="skills as a periodic table"
      className="bento-section"
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
        {main.map((tile) => (
          <ElementCell key={tile.symbol} tile={tile} glow={glow} active={pointerFX} />
        ))}
      </ul>
      <ul aria-label="learning and future elements" className="element-grid element-frow">
        {frow.map((tile) => (
          <ElementCell key={tile.symbol} tile={tile} glow={glow} active={pointerFX} />
        ))}
        <li data-cell aria-hidden className="element-future" style={{ "--ecol": 7, "--erow": 1 } as React.CSSProperties} />
        <li data-cell aria-hidden className="element-future" style={{ "--ecol": 8, "--erow": 1 } as React.CSSProperties} />
      </ul>
    </div>
  );
}

function ElementCell({
  tile,
  glow,
  active,
}: {
  tile: PeriodicTile;
  glow: string;
  active: boolean;
}) {
  const placement = {
    "--ecol": tile.col,
    "--erow": tile.row === 0 ? 1 : tile.row,
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
        data-scrub-tile
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
      data-scrub-tile
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
