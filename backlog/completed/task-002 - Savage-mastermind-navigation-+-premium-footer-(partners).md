---
id: task-002
title: Savage mastermind navigation + premium footer (partners)
status: Done
assignee:
  - anton
created_date: '2025-09-25 10:40'
updated_date: '2025-10-01 21:59'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the nav with a command-palette style overlay (desktop + mobile): minimal header bar with “Menu”. Clicking “Menu” opens a fullscreen overlay (fixed, backdrop) using GSAP scale+fade; links are large, centered, spaced; clear “X” to close; focus trap, ESC closes, body scroll-lock, restore on close. Provide a quick-search input (filters nav items by text) and a “featured” strip for Membership / Consult / Book. Active route underline using usePathname(). No sticky nav. Footer: build a partners row (logo strip, slow auto-scroll; pause on hover; keyboard-focusable), above a mastermind footer: left = contact + service area; center = micro-manifesto; right = socials + press link; bottom = legal. All monochrome + accents; no borders; elegant rules only where needed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Command-palette style overlay navigation with fullscreen backdrop
- [x] #2 Quick-search input that filters nav items by text
- [x] #3 Featured strip for Membership/Consult/Book with proper styling
- [x] #4 Focus trap, ESC closes, body scroll-lock, restore on close
- [x] #5 Active route underline using usePathname()
- [x] #6 No sticky nav - minimal header bar with Menu button
- [x] #7 Partners row with logo strip, slow auto-scroll, pause on hover
- [x] #8 Mastermind footer: contact + service area, micro-manifesto, socials + press
- [x] #9 All monochrome + accents, no borders, elegant rules only where needed
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit current navigation and footer components for overlay, command-palette, and partners row\n2. Implement command-palette overlay nav with GSAP animation, focus trap, scroll lock, and quick-search\n3. Build partners row with logo strip, auto-scroll, and accessibility\n4. Refactor mastermind footer with correct layout, content, and styling\n5. Remove sticky nav, borders, and ensure monochrome + accent palette\n6. Document changes in Implementation Notes
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Added command-palette overlay to navigation with quick-search and keyboard accessibility.\n- Integrated overlay trigger in NavBar and styled with design tokens.\n- Footer partners row now auto-scrolls (marquee) with pause on hover/focus and full keyboard accessibility.\n- Mastermind footer layout refactored: clear columns, monochrome/accent palette, improved spacing, and accessibility.\n- All sticky nav, unnecessary borders, and color inconsistencies removed.\n- All navigation and footer requirements from backlog and project steps are now implemented.

Adjusted header/footer hit areas to clear Lighthouse touch target warnings and reran the audit (best practices 1.0). Remaining work: refine menu animation timing and chase the performance score regression.

Converted partner marquee to pure CSS with hover/focus pause so nav/footer no longer trigger Lighthouse CLS warnings. Desktop Lighthouse: Perf 1.00 / BP 0.96; next up is polishing menu opening motion + refactoring inline styles.

- Added explicit layering for menu overlay, lightbox, and command palette plus new command palette styling to match spec while preserving accessibility.
- Refactored the `SiteHeader` and `Footer` components to use the design system and Tailwind CSS.
- Fixed all wording, spacing, and title issues to align with the design system.

- Rebuilt SiteHeader overlay and desktop nav with Gemini-spec typography, search polish, and CTA styling; Footer spacing tuned to new spacing scale.
- Ensured navigation interactions keep analytics hooks intact and pass Playwright navigation checks.
- Tests: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build.

- Restored the proven navigation/overlay and footer system to match the documented UI polish; fixed mobile overlay focus trap and partner marquee sizing.
- Ensured CTA copy and spacing remains accessible while keeping analytics hooks intact.
- Tests: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build.

- Reinstated static overlay (no GSAP dependency) so menu button works on mobile/compact web view; added explicit mobile visibility rule for the toggle.
- Limited hero imagery to responsive sizes and lazy loading to recover perf while keeping typography intact.
- Tests: npm run lint, npm run typecheck, npm run test:e2e, npm run build.
<!-- SECTION:NOTES:END -->
