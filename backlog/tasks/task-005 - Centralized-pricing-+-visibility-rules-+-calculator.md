---
id: task-005
title: Centralized pricing + visibility rules + calculator
status: To Do
assignee: []
created_date: '2025-09-25 10:42'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create/complete src/lib/pricing.ts (typed tiers, labels, currency, guest/time ranges). Enforce visibility rules: show numbers only on /membership, /consult, and /pricing (calculator). Everywhere else: narrative value, never numbers. Build/upgrade the Pricing Calculator (client) using the shared model; live totals + guest/time estimates; CTAs to /contact or Stripe checkout as appropriate. All price renderers read solely from pricing.ts.
<!-- SECTION:DESCRIPTION:END -->
