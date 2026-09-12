// PROTOTYPE — throwaway. Answers: "What should the single-route portfolio look like?
// Three variants of the whole route, switchable via `?variant=` on the existing `/` route."
// Do NOT promote directly; fold the winner in properly, then move this file to a throwaway branch.
"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const PROTOTYPE_VARIANTS = [
  { key: "A", name: "Terminal bands" },
  { key: "B", name: "Sidebar dossier" },
  { key: "C", name: "Ledger masthead" },
] as const;

export type PrototypeVariantKey = (typeof PROTOTYPE_VARIANTS)[number]["key"];

/** Floating bottom bar: arrows + label, URL-param driven, dev only. */
export function PrototypeSwitcher({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const index = Math.max(
    0,
    PROTOTYPE_VARIANTS.findIndex((v) => v.key === current),
  );
  const safeIndex = index === -1 ? 0 : index;

  const goTo = useCallback(
    (next: number) => {
      const wrapped =
        (next + PROTOTYPE_VARIANTS.length) % PROTOTYPE_VARIANTS.length;
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", PROTOTYPE_VARIANTS[wrapped].key);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") goTo(safeIndex - 1);
      if (e.key === "ArrowRight") goTo(safeIndex + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, safeIndex]);

  // Hidden in production builds so a stray merge can't ship the bar.
  if (process.env.NODE_ENV === "production") return null;

  const active = PROTOTYPE_VARIANTS[safeIndex];

  return (
    <div
      aria-label="prototype variant switcher"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-yellow-300 bg-black px-4 py-2 font-mono text-xs text-yellow-200 shadow-xl"
    >
      <button
        type="button"
        aria-label="previous variant"
        onClick={() => goTo(safeIndex - 1)}
        className="rounded-full px-2 py-1 text-lg leading-none hover:bg-yellow-300 hover:text-black"
      >
        ←
      </button>
      <span className="tabular-nums">
        PROTOTYPE {active.key} ({active.name}) · ?variant={active.key}
      </span>
      <button
        type="button"
        aria-label="next variant"
        onClick={() => goTo(safeIndex + 1)}
        className="rounded-full px-2 py-1 text-lg leading-none hover:bg-yellow-300 hover:text-black"
      >
        →
      </button>
    </div>
  );
}
