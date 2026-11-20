# Ledger finish as the single route, marquee retired

The site already had the right content and structure but two competing finishes: the prototype's three studies made the trade-off explicit, and the warm editorial Ledger treatment won. We folded Ledger into the real route as a single stylesheet loaded after `globals.css`, and removed the marquee strip: with no interstitial, the hero hands straight to About and the page reads as one continuous ledger.

Considered Options: Eclipse glacier cinema (rejected: drifted toward the dormant dark-world palette and away from the brass identity); Monograph ivory precision (rejected: uppercase Swiss rules overrode the established voice); keeping the marquee (rejected: it repeated the hero copy and broke the ruled page rhythm).
Consequences: `Interstitial` is no longer a domain term; the route is five SiteSections with no strip between them. Ledger tokens and composition live in `src/app/ledger.css`, so future finish changes stay in one place. Prototype switcher, variant host, and marquee component are gone; production HTML carries no prototype attributes.
