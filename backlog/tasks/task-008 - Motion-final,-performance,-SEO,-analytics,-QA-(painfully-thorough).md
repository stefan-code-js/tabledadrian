---
id: task-008
title: 'Motion final, performance, SEO, analytics, QA (painfully thorough)'
status: In Progress
assignee:
  - '@droid'
created_date: '2025-09-25 10:43'
updated_date: '2025-09-27 15:03'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Apply KineticHeading/Paragraph site-wide with SplitType/GSAP; keyword accents animate on view; micro-parallax <10px; Framer Motion route transitions and hover/tap micro-states; Lenis smooth scroll; all gated by reduced-motion. Optimize images (next/image AVIF/WebP, correct sizes, fixed aspects); preload the two local fonts only; dynamic import GSAP/Framer where possible; keep CLS ≤ 0.05. Add per-page meta (title/description), OG/Twitter, canonical; JSON-LD (Organization; Product/Offer on pricing pages; BreadcrumbList where deep). Generate sitemap + robots. Wire Plausible or Cloudflare Web Analytics (events: booking CTAs, form start/success, checkout success). Add Sentry (edge+client) with low sample. A11y sweep: heading order, labels, visible focus, alt text, focus trap modal/lightbox, keyboard nav flawless. Click every nav/CTA; fix any console warning to zero.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit page metadata builders and ensure every route uses createPageMetadata with indexable controls, canonical, OG/Twitter, sitemap/robots alignment.
2. Sweep editorial and booking components to replace static headings/paragraphs with Kinetic variants, ensure SplitType animations, keyword accents, and parallax markers respect reduced-motion.
3. Layer Framer motion micro-interactions and hover/tap states on CTAs/cards/nav elements while instrumenting analytics events for bookings, forms, and checkout.
4. Tighten performance (image sizes, priority usage, lazy imports, font preloads) and eliminate console warnings or accessibility regressions.
5. Run lint/tests and perform manual QA across key flows (booking, checkout, navigation).
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Normalized metadata utilities with buildMetadataForPath and indexable controls across all routes.
- Replaced every encoded character artifact in site copy (Cote d'Azur, smart quotes, etc.) to stabilise SEO and UI tests.
- Restyled Book/Team/Remove/Cancel/Success/Gallery flows to use KineticHeading/Paragraph, keyword highlights, and command-palette CTA motion.
- Implemented command palette overlay styling, horizontal scroll guard, and Sentry runtime hooks to keep Cloudflare/Vercel builds clean.

- Hardened booking/contact/reviews APIs for test mode (Turnstile short-circuit) and added review stats payload to satisfy Vitest suite.
- Updated home page to render hero through StructuredPage.PageHero so editorial template tests remain green while keeping cinematic copy.
- npm run test:unit now passes cleanly.
<!-- SECTION:NOTES:END -->
