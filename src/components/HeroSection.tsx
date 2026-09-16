"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useMotionGate } from "@/lib/motion-gate";

const HeroBlob = dynamic(
  () => import("./HeroBlob").then((m) => m.HeroBlob),
  { ssr: false },
);

/**
 * 01 Hero: sticky masthead plus bottom-anchored oversized display type.
 * BUILD / BREAK (echo outline) / REPEAT rise line-by-line on load;
 * the terminal prompt is the single interactive moment.
 */
const NAV = ["hero", "about", "stack", "projects", "contact"];

const LINES = [
  { text: "BUILD", className: "" },
  { text: "BREAK", className: "text-stroke" },
  { text: "REPEAT", className: "" },
];

export function HeroSection() {
  const { motionOK } = useMotionGate();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-(--color-hairline) bg-(--color-void)/85 backdrop-blur-md">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4 md:px-12">
          <p className="font-display text-lg font-semibold tracking-tight md:text-2xl">
            Piyush Kumar
            <span aria-hidden className="ml-2 inline-block h-2 w-2 rounded-full bg-(--color-brass)" />
          </p>
          <nav
            aria-label="sections"
            className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-(--color-faint)"
          >
            {NAV.map((item, i) => (
              <a
                key={item}
                href={`#${item}`}
                className="transition-colors duration-200 hover:text-(--color-brass)"
              >
                <span aria-hidden className="mr-1 text-(--color-faint)/50">
                  0{i + 1}
                </span>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-(--color-hairline)"
      >
        <div aria-hidden className="blueprint-grid absolute inset-0" />
        <HeroBlob />

        <div className="relative z-10 flex min-h-[92svh] flex-col justify-end px-6 pt-14 pb-10 md:px-12 md:pb-14">
          <div className="mb-auto flex flex-wrap items-center justify-between gap-2 pt-2 font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase">
            <span>01 — hero</span>
          </div>

          <h1
            id="hero-heading"
            className="font-display mt-10 text-[clamp(4.5rem,17.5vw,16rem)] leading-[0.84] font-semibold tracking-[-0.03em]"
          >
            {LINES.map((line, i) =>
              motionOK ? (
                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${line.className}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ) : (
                <span key={line.text} className={`block ${line.className}`}>
                  {line.text}
                </span>
              ),
            )}
          </h1>

          <p className="mt-8 max-w-md leading-relaxed text-(--color-lume)/85">
            Software developer exploring tech — learning in public,
            building in the open.
          </p>
        </div>
      </section>
    </>
  );
}
