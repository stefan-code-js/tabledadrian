---
id: task-005
title: Centralized pricing + visibility rules + calculator
status: Done
assignee:
  - '@codex'
created_date: '2025-09-25 10:42'
updated_date: '2025-10-01 22:02'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create/complete src/lib/pricing.ts (typed tiers, labels, currency, guest/time ranges). Enforce visibility rules: show numbers only on /membership, /consult, and /pricing (calculator). Everywhere else: narrative value, never numbers. Build/upgrade the Pricing Calculator (client) using the shared model; live totals + guest/time estimates; CTAs to /contact or Stripe checkout as appropriate. All price renderers read solely from pricing.ts.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Centralized pricing system in src/lib/pricing.ts with typed tiers, labels, currency, guest/time ranges
- [x] #2 Visibility rules enforced: show numbers only on /membership, /consult, and /pricing-calculator
- [x] #3 Everywhere else shows narrative value, never numbers
- [x] #4 Pricing Calculator widget with live totals and guest/time estimates
- [x] #5 CTAs to /contact or Stripe checkout as appropriate
- [x] #6 All price renderers read solely from pricing.ts
- [x] #7 Membership tiers with proper investment, guest ranges, and hosted dinners
- [x] #8 Consult packages with duration, guest scope, and narrative descriptions
- [x] #9 Calculator options with base pricing, per-guest rates, and enhancements
<!-- AC:END -->
