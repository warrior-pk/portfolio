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

    if (document.readyState === "complete") {
      const t = window.setTimeout(done, 250);
      return () => window.clearTimeout(t);
    }

    const onLoad = () => window.setTimeout(done, 250);
    // Safety net: never trap the user behind the veil.
    const fallback = window.setTimeout(done, 4000);
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
