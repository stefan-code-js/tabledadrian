---
id: task-010
title: Membership & Collectibles Hub
status: Done
assignee:
  - '@codex'
created_date: '2025-10-21 23:25'
updated_date: '2025-10-22 00:12'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Build the authenticated member experience with luxury wording, including login/register, collectible verification, and gated content.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 NextAuth-based login/register flows exist under /auth with zod-validated forms and branded copy.
- [x] #2 Member area at /members uses server-side session checks and layouts to gate access.
- [x] #3 Alchemy Collectibles showcase surfaces NFT tiers and verifies ownership via viem helper or graceful fallback.
- [x] #4 Recipes hub delivers aspirational content cards gated to verified members with CTA for non-holders.
- [x] #5 Contact and brand asset sections updated with curated links, downloadable logos, and premium copy.
- [x] #6 Add unit coverage (vitest) for auth utilities and viem verifier helper, lint/typecheck passing.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Scaffold Auth.js config, member storage, and helper utilities.
2. Build branded login & register flows with zod/react-hook-form.
3. Create members layout with session gating and token ownership checks.
4. Implement collectibles showcase and recipes hub with gated content.
5. Refresh contact + brand assets sections and add vitest coverage.
6. Run lint/typecheck and document final notes.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation summary
- Added credential-based Auth.js configuration with hashed password utilities and a registration API.
- Delivered /auth/login and /auth/register flows with luxury copy, animated shell, and session provider.
- Created /members dashboard plus recipes vault with collectible gating and viem-backed verification.
- Published Alchemy Collectibles landing page, brand-assets hub, and concierge contact channels.
- Added Vitest coverage for password helpers and collectible registry; refreshed README and .gitignore.
- Verified npm install, npm run build, npm run lint, npm run test:e2e, and npm run test to mirror CI/CD.
<!-- SECTION:NOTES:END -->
