# Portfolio

Single-route personal portfolio for Piyush Kumar. Five numbered sections on one route.

## Language

**SiteSection**:
One of the five numbered full-screen sections on the route: hero, about, skills, projects, contact.
_Avoid_: page, tab, screen

**PeriodicTile**:
A tech skill rendered as a periodic-table cell with a centered monochrome logo or short text mark. No skill name or version appears on the tile face; the accessible label and hover details retain the full name. Each skill has a family field and a separate S/P/D/F table block. Family positions cluster related skills, learning state stays with the skill's family, and the detached f-block holds DevOps, database, cloud, and monitoring skills. Selected skills use a subtle colored tile accent while their marks stay monochrome.
_Avoid_: skill badge, tech card, pill

**Vault**:
The projects section in its pre-showcase state: teaser copy plus sealed slots.
_Avoid_: projects grid, portfolio gallery, work list

**Sealed slot**:
One of the three placeholder positions holding space until the interactive showcase unlocks.
_Avoid_: project card, empty state, coming-soon tile

**ContactLink**:
One of the four contact channels (email, github, linkedin, x) with a clearly marked provisional flag.
_Avoid_: social icon, footer link

**StatusBar**:
The slim persistent TUI chrome owning the version string and active-section readout.
_Avoid_: footer, navbar, taskbar

**SectionDots**:
The side-dot plus progress chrome marking the active full-screen SiteSection.
_Avoid_: nav dots, pagination, carousel dots
