---
id: task-011
title: Community & Badges Experience
status: Done
assignee:
  - '@codex'
created_date: '2025-10-22 08:27'
updated_date: '2025-10-22 08:44'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Deliver the community engagement layer with events, forum SSO, and collectible badges.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Community hub at /community spotlights upcoming salons/events, member stories, and CTA to forum.
- [x] #2 Forum gateway integrates discourse-sso helper with role-aware messaging and navigation link.
- [x] #3 Events module renders curated calendar cards with filters by region and unlock states.
- [x] #4 Badge showcase highlights openbadges-issuer metadata and ties into member profile perks.
- [x] #5 Navigation and footer link to community features; copy reflects luxury positioning.
- [x] #6 Unit coverage for events helpers and badge issuer adapter; lint/typecheck/tests passing.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit existing community content and identify data requirements.
2. Build community/events data helpers and server components.
3. Implement /community page with events calendar, forum CTA, badges.
4. Integrate discourse SSO endpoint and badge issuer utilities.
5. Update navigation/footer + ensure copy alignment.
6. Add tests and run lint/typecheck/test suites.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation summary
- Reimagined /community as a cinematic hub with hero, events explorer, member stories, and badge gallery.
- Added Discourse SSO API route integrating credentials with forum handshake and linked the community charter.
- Introduced community event/badge data helpers with vitest coverage plus open badges builder.
- Updated navigation/footer to highlight the community hub and charter, polishing cookie banner accessibility.
- Regenerated legal PDFs (including community charter) and refreshed README/env docs for SSO + badges.
- Validated npm run lint, npm run typecheck, npm run test:unit, npm run build, npm run test:e2e.
<!-- SECTION:NOTES:END -->
