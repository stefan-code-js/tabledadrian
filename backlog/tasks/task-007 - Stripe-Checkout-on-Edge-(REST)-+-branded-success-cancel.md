---
id: task-007
title: Stripe Checkout on Edge (REST) + branded success/cancel
status: Done
assignee:
  - '@codex'
created_date: '2025-09-25 10:43'
updated_date: '2025-10-01 22:03'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove any Node SDK in edge code. Create sessions via fetch to https://api.stripe.com/v1/checkout/sessions with Authorization: Bearer ${STRIPE_SECRET_KEY} (Cloudflare env). Line items read from pricing.ts. Success/Cancel pages are branded and use KineticHeading/Paragraph. If the secret is absent, mock a session so the UI/flow works in previews.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Stripe checkout uses fetch to api.stripe.com/v1/checkout/sessions (no Node SDK)
- [x] #2 Authorization Bearer token from Cloudflare env (STRIPE_SECRET_KEY)
- [x] #3 Line items read from pricing.ts catalog
- [x] #4 Mock sessions created when secret is absent for previews
- [x] #5 Success page branded with KineticHeading/Paragraph and KeywordHighlighter
- [x] #6 Cancel page branded with KineticHeading/Paragraph and KeywordHighlighter
- [x] #7 Proper error handling and graceful fallbacks
- [x] #8 Edge runtime with proper security headers
- [x] #9 Session validation and order tracking
<!-- AC:END -->
