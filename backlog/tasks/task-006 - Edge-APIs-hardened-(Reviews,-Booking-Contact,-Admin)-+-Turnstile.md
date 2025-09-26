---
id: task-006
title: 'Edge APIs hardened (Reviews, Booking/Contact, Admin) + Turnstile'
status: To Do
assignee: []
created_date: '2025-09-25 10:43'
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
