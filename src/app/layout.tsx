import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SectionDots } from "@/components/SectionDots";
import { StatusBar } from "@/components/StatusBar";
import { TriquetraMark } from "@/components/TriquetraMark";
import { PreloaderDismiss } from "@/components/PreloaderDismiss";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Piyush Kumar — software developer",
  description:
    "Single-route portfolio: quiet interfaces, fast pages. Five sections, one route.",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
    <html lang="en" className={cn(grotesk.variable, mono.variable, "font-sans", geist.variable)}>
      <body className="font-display bg-(--color-void) text-(--color-lume)">
        {/* HTML-first veil: server-rendered, CSS-animated. Visible from first
            paint while JS bundles stream in; dismissed by PreloaderDismiss
            after hydration, or by the inline fallback below if React fails. */}
        <div id="__preloader" aria-hidden="true">
          <TriquetraMark animated className="veil-mark" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function d(){var e=document.getElementById("__preloader");if(e){e.classList.add("is-done");setTimeout(function(){e.remove()},700)}}window.addEventListener("load",function(){setTimeout(d,250)},{once:true});setTimeout(d,4000)})();`,
          }}
        />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-(--color-panel) focus:px-3 focus:py-2 focus:font-mono focus:text-xs"
        >
          skip to content
        </a>
        <LenisProvider>
          <CursorSpotlight />
          <SectionDots />
          <main className="mx-auto max-w-6xl pb-16">{children}</main>
          <StatusBar />
          <PreloaderDismiss />
        </LenisProvider>
      </body>
    </html>
  );
}
