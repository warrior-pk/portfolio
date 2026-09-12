# Static-first Next.js for a mostly-static portfolio

The site is content-static (one route, five sections, no backend) but must accept animation and interaction libraries later, so we chose Next.js with static export plus Tailwind, Motion, and Lenis over Astro or Vite+React: Next.js static output keeps hosting trivial while preserving the React ecosystem for motion work.

**Considered Options**: Astro (leaner static output, weaker fit for React motion libs); Vite+React (simple, but no routing/export conventions to grow into).

**Consequences**: hero must stay interactive in under ~1.5s and scroll at 60fps; every animation addition is judged against the single-curve 200–350ms motion budget and `prefers-reduced-motion` off-switch.
