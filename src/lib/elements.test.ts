import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hasSkillMark, SKILL_ICON_NAMES, SkillMark } from "../components/SkillMark";
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

describe("skill table data", () => {
  it("keeps every tile within its main or detached grid", () => {
    for (const tile of PERIODIC_TILES) {
      expect(tile.col).toBeGreaterThanOrEqual(1);
      expect(tile.col).toBeLessThanOrEqual(tile.row === 0 ? FBLOCK_COLS : TABLE_COLS);
      expect(tile.row).toBeGreaterThanOrEqual(0);
      expect(tile.row).toBeLessThanOrEqual(TABLE_PERIODS);
      if (tile.row === 0) expect(tile.frow).toBeGreaterThanOrEqual(1);
    }
  });

  it("uses unique cells and symbols, including both f-block rows", () => {
    const cells = PERIODIC_TILES.map((t) =>
      t.row === 0 ? `f${t.frow}:${t.col}` : `${t.row}:${t.col}`,
    );
    expect(new Set(cells).size).toBe(cells.length);
    const symbols = PERIODIC_TILES.map((t) => t.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
  });

  it("groups skills into the agreed families", () => {
    const namesFor = (block: string) =>
      PERIODIC_TILES.filter((tile) => tile.block === block).map((tile) => tile.name);
    expect(namesFor("S")).toContain("Python");
    expect(namesFor("P")).toContain("Java");
    expect(namesFor("D")).toContain("Node.js");
    expect(namesFor("D")).toContain("React");
    expect(namesFor("D")).toContain("CSS");
    expect(namesFor("D")).not.toContain("Sass");
    expect(namesFor("F")).toContain("Docker");
    expect(namesFor("F")).toContain("PostgreSQL");
    expect(namesFor("F")).toContain("OpenTelemetry");
  });

  it("keeps learning skills with Python and places selected tiles at the right edge", () => {
    const learning = PERIODIC_TILES.filter((tile) => tile.mastery === "learning");
    expect(learning.map((tile) => tile.name)).toEqual([
      "LangChain",
      "LangGraph",
      "LangSmith",
    ]);
    expect(learning.every((tile) => tile.block === "S" && tile.col <= 2)).toBe(true);
    const tile = (name: string) => PERIODIC_TILES.find((entry) => entry.name === name)!;
    expect([tile("Java").row, tile("Java").col]).toEqual([1, 18]);
    expect([tile("Spring Boot").row, tile("Spring Boot").col]).toEqual([2, 18]);
    expect([tile("Nginx").row, tile("Nginx").col]).toEqual([6, 17]);
    expect([tile("Kafka").row, tile("Kafka").col]).toEqual([6, 18]);
  });

  it("reserves clear future slots in the detached rows", () => {
    expect(FUTURE_SLOTS).toHaveLength(6);
    const occupied = new Set(
      PERIODIC_TILES.filter((tile) => tile.row === 0).map((tile) => `${tile.frow}:${tile.col}`),
    );
    for (const slot of FUTURE_SLOTS) {
      expect(slot.f).toBeGreaterThanOrEqual(1);
      expect(slot.f).toBeLessThanOrEqual(FROW_ROWS);
      expect(slot.col).toBeGreaterThanOrEqual(1);
      expect(slot.col).toBeLessThanOrEqual(FBLOCK_COLS);
      expect(occupied.has(`${slot.f}:${slot.col}`)).toBe(false);
    }
  });

  it("preserves the chemistry-table voids", () => {
    expect(TABLE_COLS).toBe(18);
    expect(isTableVoid(1, 2)).toBe(true);
    expect(isTableVoid(2, 13)).toBe(false);
    expect(isTableVoid(3, 12)).toBe(true);
  });

  it("describes family and learning status accessibly", () => {
    expect(describeTile(PERIODIC_TILES[0])).toBe("Python, Python block, version 3.14, 1y experience, mastered");
    const learning = PERIODIC_TILES.find((tile) => tile.name === "LangChain");
    expect(describeTile(learning!)).toBe("LangChain, Python block, learning");
  });

  it("maps available monochrome logos and falls back to initials for gaps", () => {
    const tileNames = new Set(PERIODIC_TILES.map((tile) => tile.name));
    expect(new Set(SKILL_ICON_NAMES).size).toBe(SKILL_ICON_NAMES.length);
    for (const name of SKILL_ICON_NAMES) expect(tileNames.has(name)).toBe(true);
    expect(hasSkillMark("Python")).toBe(true);
    expect(hasSkillMark("OpenTelemetry")).toBe(true);
    for (const name of [
      "FastAPI",
      "Swagger",
      "Git",
      "Tailwind CSS",
      "SQLite",
      "MongoDB",
      "Streamlit",
      "Kubernetes",
      "PostgreSQL",
      "Prometheus",
      "Grafana",
      "Amazon ECR",
      "Clerk",
    ]) {
      expect(hasSkillMark(name)).toBe(true);
    }
    expect(hasSkillMark("ImageKit")).toBe(false);
    expect(hasSkillMark("Express")).toBe(false);
    expect(hasSkillMark("Spring AI")).toBe(false);

    const logoMarkup = renderToStaticMarkup(
      createElement(SkillMark, { name: "Python", symbol: "Py" }),
    );
    const fallbackMarkup = renderToStaticMarkup(
      createElement(SkillMark, { name: "ImageKit", symbol: "Im" }),
    );
    expect(logoMarkup).toContain('aria-hidden="true"');
    expect(logoMarkup).toContain("<svg");
    expect(fallbackMarkup).toContain(">Im</span>");
    expect(fallbackMarkup).not.toContain("ImageKit");
  });

  it("uses the requested text marks where no brand icon is wanted", () => {
    const tile = (name: string) => PERIODIC_TILES.find((entry) => entry.name === name)!;
    expect(tile("Spring AI").symbol).toBe("AI");
    expect(tile("Express").symbol).toBe("Ex");
    expect(tile("bcrypt").symbol).toBe("By");
    expect(tile("Lombok").symbol).toBe("Lo");
  });
});
