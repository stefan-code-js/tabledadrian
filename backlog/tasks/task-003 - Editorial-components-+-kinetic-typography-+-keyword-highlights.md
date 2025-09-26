---
id: task-003
title: Editorial components + kinetic typography + keyword highlights
status: In Progress
assignee:
  - anton
created_date: '2025-09-25 10:41'
updated_date: '2025-09-26 12:02'
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
