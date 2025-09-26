---
id: task-007
title: Stripe Checkout on Edge (REST) + branded success/cancel
status: To Do
assignee: []
created_date: '2025-09-25 10:43'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove any Node SDK in edge code. Create sessions via fetch to https://api.stripe.com/v1/checkout/sessions with Authorization: Bearer ${STRIPE_SECRET_KEY} (Cloudflare env). Line items read from pricing.ts. Success/Cancel pages are branded and use KineticHeading/Paragraph. If the secret is absent, mock a session so the UI/flow works in previews.
<!-- SECTION:DESCRIPTION:END -->
