---
id: task-013
title: Community guild atlas & passport
status: Done
assignee:
  - '@codex'
created_date: '2025-10-28 22:22'
updated_date: '2025-10-28 22:35'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Launch the post-concierge community experience. Build a cinematic community hub, highlight global enclaves, and codify the member journey so holders and invited guests understand how to engage.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->
- [x] #1 Community homepage at /community features a luxe hero, atlas of global enclaves, and member spotlights sharing data from src/data/community.ts with consistent editorial styling.
- [x] #2 Dedicated /community/passport route illustrates the member journey, perks by tier, and concierge contact surfaces with matching luxe scaffolding and CTAs.
- [x] #3 Community atlas and passport components surface reusable data helpers (regions, stories, tiers) with analytics-friendly instrumentation and responsive layouts.
- [x] #4 README/backlog note the new community surfaces and Vitest coverage validates the community helpers.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Extend backlog CLI or helpers as needed and scaffold data helpers supporting community atlas insights.
2. Design atlas, spotlight, and passport components using existing editorial surfaces plus new luxe styling tokens.
3. Implement /community and /community/passport routes, wire analytics, and update navigation/footer affordances.
4. Add tests + documentation updates, run lint/typecheck/unit/e2e/build.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
$Implemented CommunityAtlas and CommunityPassport components with luxe styling, data attributes, and responsive layouts powering the new community surfaces.

$Launched /community and /community/passport routes with atlas, salon calendar, staged passport, and concierge CTA alignment across navigation and footer.

$Extended community data helpers, added passport datasets, and covered atlas summarization with Vitest plus lint/typecheck/unit/e2e/build verification.
<!-- SECTION:NOTES:END -->
