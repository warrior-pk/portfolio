import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { BootMark } from "@/components/BootMark";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { StatusBar } from "@/components/StatusBar";

export const metadata: Metadata = {
  title: "warrior-pk — software developer",
  description:
    "Single-route portfolio: quiet interfaces, fast pages. Five sections, one prompt.",
  icons: { icon: "/favicon.svg" },
};

/** One grotesk for display + one mono for TUI/body-detail, each with system fallbacks. */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="font-display bg-(--color-void) text-(--color-lume)">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-(--color-panel) focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
        >
          skip to content
        </a>
        <LenisProvider>
          <BootMark />
          <CursorSpotlight />
          <main className="mx-auto max-w-6xl pb-16">{children}</main>
          <StatusBar />
        </LenisProvider>
      </body>
    </html>
  );
}
