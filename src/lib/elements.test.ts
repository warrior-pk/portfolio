import { describe, expect, it } from "vitest";
import {
  PERIODIC_TILES,
  describeTile,
  isTableVoid,
  TABLE_COLS,
  TABLE_PERIODS,
  FROW_ROWS,
  FBLOCK_COLS,
  FUTURE_SLOTS,
} from "./site";

/**
 * Element data seam: every PeriodicTile owns grid coordinates plus a
 * mastery state, so the chemistry table grows by data edits, never layout
 * rewrites. Expectations come from spec #19 / ticket #20, not the code.
 */
describe("periodic table geometry", () => {
  it("keeps every element inside the 18-column chemistry grid", () => {
    expect(PERIODIC_TILES.length).toBeGreaterThan(0);
    for (const tile of PERIODIC_TILES) {
      expect(tile.col).toBeGreaterThanOrEqual(1);
      expect(tile.col).toBeLessThanOrEqual(18);
      expect(tile.row).toBeGreaterThanOrEqual(0);
      expect(tile.row).toBeLessThanOrEqual(4);
    }
  });

  it("never stacks two elements on one cell", () => {
    const cells = PERIODIC_TILES.map((t) => `${t.row}:${t.col}`);
    expect(new Set(cells).size).toBe(cells.length);
  });

  it("uses unique symbols", () => {
    const symbols = PERIODIC_TILES.map((t) => t.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
  });

  it("anchors the approved families: web basics left, JS/TS right", () => {
    const at = (row: number, col: number) =>
      PERIODIC_TILES.find((t) => t.row === row && t.col === col)?.symbol;
    expect(at(1, 1)).toBe("Ht");
    expect(at(1, 18)).toBe("Nx");
    expect(at(2, 1)).toBe("Cs");
    expect(at(2, 18)).toBe("Ex");
  });

  it("fills rows 2-3 like the reference periods", () => {
    const row = (n: number) =>
      PERIODIC_TILES.filter((t) => t.row === n)
        .map((t) => t.col)
        .sort((a, b) => a - b);
    expect(row(2)).toEqual([1, 2, 13, 14, 15, 16, 17, 18]);
    expect(row(3)).toEqual([1, 2, 13, 14, 15, 16, 17, 18]);
  });

  it("holds the detached f-row for learning and future elements", () => {
    const frow = PERIODIC_TILES.filter((t) => t.row === 0).map((t) => t.symbol);
    expect(frow).toContain("St");
    expect(frow).toContain("Kb");
    expect(frow).toContain("Pg");
  });

  it("marks only f-row elements as learning", () => {
    for (const tile of PERIODIC_TILES) {
      expect(tile.mastery).toBe(tile.row === 0 ? "learning" : "mastered");
    }
  });

  it("names every element with a current version", () => {
    for (const tile of PERIODIC_TILES) {
      expect(tile.name.length).toBeGreaterThan(0);
      expect(tile.version.length).toBeGreaterThan(0);
    }
  });
});

describe("describeTile", () => {
  it("announces name, version, and mastery", () => {
    expect(describeTile(PERIODIC_TILES[0])).toBe("HTML, version 5, mastered");
    const learning = PERIODIC_TILES.find((t) => t.mastery === "learning");
    expect(learning).toBeDefined();
    expect(describeTile(learning!)).toBe(
      `${learning!.name}, version ${learning!.version}, learning`,
    );
  });
});

describe("isTableVoid", () => {
  it("leaves the top-3-row middle open like the reference table", () => {
    expect(isTableVoid(1, 5)).toBe(true);
    expect(isTableVoid(2, 3)).toBe(true);
    expect(isTableVoid(3, 12)).toBe(true);
  });

  it("keeps every other main-grid cell", () => {
    expect(isTableVoid(1, 1)).toBe(false);
    expect(isTableVoid(1, 18)).toBe(false);
    expect(isTableVoid(2, 13)).toBe(false);
    expect(isTableVoid(4, 5)).toBe(false);
    expect(isTableVoid(6, 7)).toBe(false);
  });
});

describe("full table shape", () => {  it("frames seven periods of eighteen columns with a two-row f-block", () => {
    expect(TABLE_COLS).toBe(18);
    expect(TABLE_PERIODS).toBe(7);
    expect(FROW_ROWS).toBe(2);
    expect(FBLOCK_COLS).toBe(15);
  });

  it("renders every block: skills plus empties fill the whole frame", () => {
    const mainCount = PERIODIC_TILES.filter((t) => t.row !== 0).length;
    const voids = 10 * 3;
    const empties = TABLE_COLS * TABLE_PERIODS - mainCount - voids;
    expect(empties).toBe(74);
    const fEmpties =
      FBLOCK_COLS * FROW_ROWS -
      PERIODIC_TILES.filter((t) => t.row === 0).length -
      FUTURE_SLOTS.length;
    expect(fEmpties).toBe(20);
  });

  it("holds future slots inside the f-block, clear of learning tiles", () => {
    expect(FUTURE_SLOTS.length).toBeGreaterThan(0);
    const taken = new Set(
      PERIODIC_TILES.filter((t) => t.row === 0).map((t) => `${t.col}`),
    );
    for (const slot of FUTURE_SLOTS) {
      expect(slot.f).toBeGreaterThanOrEqual(1);
      expect(slot.f).toBeLessThanOrEqual(FROW_ROWS);
      expect(slot.col).toBeGreaterThanOrEqual(1);
      expect(slot.col).toBeLessThanOrEqual(TABLE_COLS);
      if (slot.f === 1) expect(taken.has(`${slot.col}`)).toBe(false);
    }
  });
});
