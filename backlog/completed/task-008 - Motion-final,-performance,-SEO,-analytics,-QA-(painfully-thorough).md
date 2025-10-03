---
id: task-008
title: 'Motion final, performance, SEO, analytics, QA (painfully thorough)'
status: Done
assignee:
  - '@codex'
created_date: '2025-09-25 10:43'
updated_date: '2025-10-01 21:58'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Apply KineticHeading/Paragraph site-wide with SplitType/GSAP; keyword accents animate on view; micro-parallax <10px; Framer Motion route transitions and hover/tap micro-states; Lenis smooth scroll; all gated by reduced-motion. Optimize images (next/image AVIF/WebP, correct sizes, fixed aspects); preload the two local fonts only; dynamic import GSAP/Framer where possible; keep CLS ≤ 0.05. Add per-page meta (title/description), OG/Twitter, canonical; JSON-LD (Organization; Product/Offer on pricing pages; BreadcrumbList where deep). Generate sitemap + robots. Wire Plausible or Cloudflare Web Analytics (events: booking CTAs, form start/success, checkout success). Add Sentry (edge+client) with low sample. A11y sweep: heading order, labels, visible focus, alt text, focus trap modal/lightbox, keyboard nav flawless. Click every nav/CTA; fix any console warning to zero.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Per-page meta, canonical, OG/Twitter present on all routes
- [x] #2 JSON-LD implemented where applicable; sitemap and robots aligned
- [x] #3 Kinetic headings/paragraphs and keyword accents applied site-wide with reduced-motion guards
- [x] #4 Performance tightened: images sized, fonts preloaded, dynamic imports; no console warnings
- [x] #5 Analytics wired for booking CTAs, forms, checkout; Sentry active
- [x] #6 Accessibility: headings, labels, focus, alt text; axe and keyboard nav pass
- [x] #7 CI green: lint, typecheck, unit, e2e; production build succeeds
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
$1. Audit page metadata builders and ensure every route uses createPageMetadata with indexable controls, canonical, OG/Twitter, sitemap/robots alignment.
2. Sweep editorial and booking components to replace static headings/paragraphs with Kinetic variants, ensure SplitType animations, keyword accents, and parallax markers respect reduced-motion.
3. Layer Framer motion micro-interactions and hover/tap states on CTAs/cards/nav elements while instrumenting analytics events for bookings, forms, and checkout.
4. Tighten performance (image sizes, priority usage, lazy imports, font preloads) and eliminate console warnings or accessibility regressions.
5. Run lint/tests and perform manual QA across key flows (booking, checkout, navigation).
6. Harmonize review submission UIs with the primary form design system and validate analytics + accessibility.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Completed SEO and metadata sweep across all pages with canonical, OG/Twitter, and JSON-LD where relevant.
- Applied KineticHeading/Paragraph and keyword accents globally with reduced-motion handling.
- Optimized images, fonts, and imports; cleared console warnings; CLS within target.
- Wired analytics events for bookings, contact, reviews; confirmed Sentry active (edge+client).
- Resolved all accessibility findings; axe/keyboard checks clean.
- Full CI passed (lint, typecheck, vitest, Playwright) and production build succeeded.
<!-- SECTION:NOTES:END -->
