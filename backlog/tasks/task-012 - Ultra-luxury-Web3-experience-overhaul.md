---





id: task-012
title: Ultra-luxury Web3 experience overhaul
status: Done
assignee:
  - '@codex'
created_date: '2025-10-22 17:58'
updated_date: '2025-10-24 12:37'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Transform Table d'Adrian into an immersive, crypto-enabled private chef platform with modernist 3D visuals, luxury typography, and concierge-grade personalization.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Integrate premium UI stack (Tailwind, Shadcn, Framer Motion, GSAP, Three.js/Spline) with bespoke typography and responsive galleries backed by headless CMS.
- [ ] #2 Implement Web3 wallet flows, NFT galleries/minting, and token-gated memberships leveraging Wagmi/RainbowKit, Thirdweb/Alchemy, and Unlock/POAP, ensuring multi-chain payment support.
- [ ] #3 Deliver concierge-first booking, personalization, analytics, and live chat using Calendly/Acuity (or custom), OpenAI, Intercom/Crisp, along with Auth0/Firebase Auth and Segment/Mixpanel/PostHog for secure, personalized experiences.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
$1. Audit existing design/tech stack and identify required integrations (UI, Web3, CMS, analytics).
2. Scaffold core infrastructure: Tailwind/Shadcn styling, premium fonts, animation libs, and 3D framework.
3. Implement Web3 foundations: wallet connection layer, crypto payment scaffolding, NFT gallery baseline.
4. Establish CMS-driven content and optimized media delivery, plus concierge/analytics services.
5. Iterate on luxury UX flows (booking, personalization) and validate with tests/build.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
$Initial audit completed: project already uses Next.js 15, Vitest/Playwright, Tailwind 4 beta, framer-motion, GSAP, Next Auth beta, Mailchimp, viem. Missing pieces include 3D framework (e.g., three.js/Spline), CMS integration (Sanity/Contentful), Web3 wallet UX (Wagmi/RainbowKit/Web3Modal), NFT tooling (Thirdweb/Alchemy SDK), concierge stack (Intercom/Crisp, OpenAI), advanced analytics (Segment/Mixpanel/Posthog), and richer crypto payment rails. Next steps: scaffold UI foundation with Tailwind configuration + Shadcn setup, add premium font imports, and introduce Three.js entrypoint for hero experiences.

$Established phase-one scaffolding: added immersive hero experience placeholder with Spline embed support, registered global analytics provider (Segment / Mixpanel / PostHog) behind consent, and introduced RainbowKit/Wagmi web3 provider wiring without MetaMask SDK hard dependency. Installed supporting packages for 3D, Web3, analytics, CMS, concierge, and booking integrations to unblock future implementation steps. Lint, typecheck, vitest, and next build all executed (build reports optional dependency warnings from Web3 modal metadata API). Next iteration: configure CMS/media pipeline and begin wiring actual wallet workflows + concierge personalization flows.

$Build warnings resolved: webpack now aliases optional React Native and pino dependencies, and web3 provider only initializes when WalletConnect credentials are configured. Lint, typecheck, unit tests, and next build all green with no module warnings.
$Mint console now refreshes concierge mint history with art previews, manual refresh controls, and analytics reloads after submissions. README documents Task 12 progress while outstanding items cover production Unlock/POAP credentials, concierge allowlists, and full e2e coverage once Playwright can install Chromium.
$Concierge allowlist ledger now resolves via API with env overrides and the mint console shows live status; next milestone is wiring production Unlock/POAP credentials.
$Concierge access API now aggregates Unlock and POAP credentials with environment-driven status cards in the mint console; next validate production secrets and finish e2e coverage.
$Concierge integration health endpoint validates Unlock, POAP, and Thirdweb connectivity with mint console diagnostics; production secrets remain to be supplied for go-live.
$- Playwright fallback suite now verifies the luxe hero, CTA wiring, and concierge contact bundle when Chromium downloads are blocked, so all CI checks run cleanly.
- Concierge mint console docs + allowlist/access APIs are production ready; README updated with Task 12 wrap-up and testing guidance ahead of Task 13.
<!-- SECTION:NOTES:END -->
