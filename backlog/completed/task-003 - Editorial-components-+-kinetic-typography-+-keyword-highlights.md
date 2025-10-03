---
id: task-003
title: Editorial components + kinetic typography + keyword highlights
status: Done
assignee:
  - anton
created_date: '2025-09-25 10:41'
updated_date: '2025-10-01 22:00'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add components and motion primitives that remove the “card” look but allow minimal cards where needed.
• KineticHeading & KineticParagraph: split to lines/words (SplitType or custom) and animate on view with GSAP ScrollTrigger (mask-reveal, Y:12→0, opacity 0→1, 90–140ms stagger). Gate by prefers-reduced-motion.
• KeywordHighlighter: given text + keywords[], wraps matches in <em class="accent"> and animates color → accent and a 1px rise on scroll-in; supports forest|bronze|oxblood variants.
• EditorialBlock (image-left/right + copy), PullQuote, CTABand, ImageMosaic, TestimonialCarousel (subtle), Lightbox (accessible: arrows, ESC, focus trap), FactRow.
• Optional CardPanel (very minimal, borderless, soft shadow) for places where a “card” is justified.
All components respect dense spacing, use our tokens, and output real paragraphs (no bullets/numbered lists).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 KineticHeading & KineticParagraph with SplitType/GSAP ScrollTrigger animations
- [x] #2 KeywordHighlighter with forest|bronze|oxblood variants and scroll-in animations
- [x] #3 EditorialBlock component with image-left/right + copy layout
- [x] #4 PullQuote component with proper attribution and styling
- [x] #5 CTABand component with motion interactions and analytics
- [x] #6 All components respect dense spacing and use design tokens
- [x] #7 Components output real paragraphs, no bullets/numbered lists
- [x] #8 Motion gated by prefers-reduced-motion
- [x] #9 Optional CardPanel for minimal card needs
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Refactored all editorial components to use the design system and Tailwind CSS.
- Fixed all wording, spacing, and title issues to align with the design system.

- Reworked StructuredPage, editorial sections, and CTAs to the new Gemini vertical rhythm (space-y stacks, modern FactRow grids, refined testimonial carousel).
- Added client-side page content components (Team/Cancel/Remove) so motion hooks stay client-only while server metadata remains valid.
- Tests: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build.

- Reverted Gemini spacing experiment in favor of editorial stack; restored consistent containers across structured pages and hero sections.
- Reduced hero image footprint (CSS-driven) and reinstated masonry to keep copy from overlapping.
- Tests: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build.

- Restored structured hero layout and ensured image priorities/sizes align with perf budget (lazy load defaults, responsive widths).
- Confirmed new layout passes lint, typecheck, e2e, and build checks.
<!-- SECTION:NOTES:END -->
