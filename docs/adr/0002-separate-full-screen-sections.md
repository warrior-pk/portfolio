# Separate full-screen sections, marquee stays interstitial

About and Stack currently share one two-column row and the marquee is a thin strip, so neither is full-screen. We split into five separate full-screen SiteSections (hero, about, stack, projects, contact) because About and Stack are about to grow; the paired grid cannot take more content. The marquee stays a normal-flow Interstitial between hero and about, excluded from pins and SectionDots.
