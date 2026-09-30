"use client";

import { useEffect } from "react";

/**
 * Dismisses the HTML-first preloader veil (`#__preloader`, rendered by the
 * root layout so it paints before any JS bundle arrives).
 * Fades via `.is-done`, then removes the node. Harmless if already gone
 * (e.g. removed by the inline fallback script).
 */
export function PreloaderDismiss() {
  useEffect(() => {
    const el = document.getElementById("__preloader");
    if (!el) return;

    const done = () => {
      if (!document.contains(el)) return;
      el.classList.add("is-done");
      window.setTimeout(() => el.remove(), 700);
    };

    // Lift as soon as the document can paint (DOMContentLoaded), not on
    // full load: every image/font past this point delays first paint.
    // Safety net: never trap the user behind the veil.
    if (document.readyState === "loading") {
      const onReady = () => window.setTimeout(done, 150);
      const fallback = window.setTimeout(done, 1500);
      document.addEventListener("DOMContentLoaded", onReady, { once: true });
      return () => {
        window.clearTimeout(fallback);
        document.removeEventListener("DOMContentLoaded", onReady);
      };
    }
    const t = window.setTimeout(done, 150);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
