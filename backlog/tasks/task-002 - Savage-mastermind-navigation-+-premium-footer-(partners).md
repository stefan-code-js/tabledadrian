---
id: task-002
title: Savage mastermind navigation + premium footer (partners)
status: Done
assignee:
  - anton
created_date: '2025-09-25 10:40'
updated_date: '2025-09-26 12:02'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the nav with a command-palette style overlay (desktop + mobile): minimal header bar with “Menu”. Clicking “Menu” opens a fullscreen overlay (fixed, backdrop) using GSAP scale+fade; links are large, centered, spaced; clear “X” to close; focus trap, ESC closes, body scroll-lock, restore on close. Provide a quick-search input (filters nav items by text) and a “featured” strip for Membership / Consult / Book. Active route underline using usePathname(). No sticky nav. Footer: build a partners row (logo strip, slow auto-scroll; pause on hover; keyboard-focusable), above a mastermind footer: left = contact + service area; center = micro-manifesto; right = socials + press link; bottom = legal. All monochrome + accents; no borders; elegant rules only where needed.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit current navigation and footer components for overlay, command-palette, and partners row\n2. Implement command-palette overlay nav with GSAP animation, focus trap, scroll lock, and quick-search\n3. Build partners row with logo strip, auto-scroll, and accessibility\n4. Refactor mastermind footer with correct layout, content, and styling\n5. Remove sticky nav, borders, and ensure monochrome + accent palette\n6. Document changes in Implementation Notes
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Added command-palette overlay to navigation with quick-search and keyboard accessibility.\n- Integrated overlay trigger in NavBar and styled with design tokens.\n- Footer partners row now auto-scrolls (marquee) with pause on hover/focus and full keyboard accessibility.\n- Mastermind footer layout refactored: clear columns, monochrome/accent palette, improved spacing, and accessibility.\n- All sticky nav, unnecessary borders, and color inconsistencies removed.\n- All navigation and footer requirements from backlog and project steps are now implemented.
<!-- SECTION:NOTES:END -->
