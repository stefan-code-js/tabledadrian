---
id: task-001
title: 'Design system, fonts, palette'
status: In Progress
assignee:
  - anton
created_date: '2025-09-25 10:40'
updated_date: '2025-09-29 23:48'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Design system, fonts, palette (old-money + accents) + dense rhythm
Create the luxury system in globals.css + Tailwind theme. Two self-hosted variable fonts via next/font/local: editorial display serif (H1/H2/pull-quotes) and modern grotesk (body/UI). Expose --font-display, --font-sans. Define tokens: colors --ink:#0A0A0A, --paper:#F7F5F2, grays, accents --forest:#093, --bronze:#7A5C3E, --oxblood:#5A1F1F; radii, shadows, blur, spacing (dense steps), clamp() type scale. Kill visible borders; hairlines only when essential. No dead whitespace: set a tight vertical rhythm (e.g., 6/9/12/18/24/36 px). Apply palette across base elements; remove Google Fonts and any remote font links
<!-- SECTION:DESCRIPTION:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit globals.css and tailwind.config for palette, font, and token setup\n2. Implement two local variable fonts via next/font/local\n3. Expose --font-display, --font-sans CSS vars\n4. Define color tokens, radii, shadows, blur, spacing, clamp() type scale\n5. Remove Google Fonts and remote font links\n6. Apply palette and rhythm to base elements\n7. Remove dead whitespace and visible borders\n8. Document changes in Implementation Notes
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Refactored all major shared components (Team, TrustSection, Testimonials, StructuredPage, CTABand, EditorialBlock, PullQuote, FactRow, CardPanel) to use palette, spacing, and font tokens from the design system.\n- Removed inline styles and hardcoded values in favor of utility classes and CSS variables.\n- Ensured all text and backgrounds use the correct color tokens.\n- Borders and whitespace are minimal and consistent with the design system.\n- No Google Fonts or remote font links remain.\n- All base elements and shared UI now follow the luxury system and dense rhythm as specified in the backlog and project steps document.

Re-ran Lighthouse desktop audit after spacing updates; accessibility score now 1.0 with corrected kicker contrast. Navigation/footers have larger hit areas, but further polish is still needed before handing back to client.

Updated footer marquee to CSS-based animation with reserved height; Lighthouse desktop now reports CLS 0.00 and performance score 1.00. Remaining stretch: audit mobile experience + typography tweaks before final sign-off.

- Updated local font variables to expose --font-display per system spec and retargeted globals/tailwind to consume it.
- Ran npm run lint to confirm design tokens stay consistent.
- Refactored all pages and components to use the design system and Tailwind CSS.
- Fixed all wording, spacing, and title issues to align with the design system.
- Ensured all titles have space between the words.

- Adopted Gemini layout refinements across structured pages (spacing utilities, serif headings) and introduced dedicated client wrappers for motion-heavy views while preserving metadata exports.
- Verified design tokens remain consistent across about/consult/experiences/membership/services via refreshed hero + section stacks.
- Tests: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build (cf:build fails on Windows Vercel CLI; see logs).

- Rolled back to design-system friendly editorial templates so tokenized spacing stays consistent and heavy Tailwind overrides are removed.
- Hero images now respect original aspect CSS (smaller paint area) to improve load/motion performance.
- Validation: npm run lint, npm run typecheck, npm run test:unit, npm run test:e2e, npm run build.
<!-- SECTION:NOTES:END -->
