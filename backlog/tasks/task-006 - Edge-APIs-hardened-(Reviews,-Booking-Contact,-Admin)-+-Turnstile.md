---
id: task-006
title: 'Edge APIs hardened (Reviews, Booking/Contact, Admin) + Turnstile'
status: Done
assignee:
  - '@codex'
created_date: '2025-09-25 10:43'
updated_date: '2025-10-01 22:02'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Edge-safe APIs with resilience and security.
• Reviews: fetch + Zod schema; on error return []; edge cache with short TTL + stale-while-revalidate; never throw to client.
• Contact/Booking: Edge route; Zod validation; Cloudflare Turnstile + hidden honeypot + lightweight KV rate-limit; persist to D1; return {ok,id}.
• Admin Leads: server-rendered, read-only, token-gated via env; minimal UI; no PII leaks.
Add graceful UI states so pages never crash; show skeletons/empties instead.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Reviews API: edge-safe with Zod schema, error handling returns [], Turnstile verification, KV storage
- [x] #2 Contact/Booking API: Edge route, Zod validation, Turnstile + honeypot + rate-limit, D1 persistence
- [x] #3 Admin Leads: server-rendered, read-only, token-gated via env, minimal UI, PII masked
- [x] #4 Reviews Stats API: edge-safe with proper error handling and KV retrieval
- [x] #5 All APIs use edge runtime with proper error boundaries
- [x] #6 Rate limiting implemented with KV storage and proper TTL
- [x] #7 Turnstile verification with fallback for missing configuration
- [x] #8 Graceful UI states so pages never crash
- [x] #9 Proper security headers and cache control
<!-- AC:END -->
