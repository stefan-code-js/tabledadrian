# Table d'Adrian

Marketing site for Table d'Adrian built with Next.js. Includes simple Stripe checkout and guest reviews stored in Cloudflare KV.

## Local development

```bash
pnpm install
pnpm run dev
```

## Environment variables

Create `.env.local` with:

```
STRIPE_SECRET_KEY=sk_test...
PRICE_CONSULT_REMOTE=price_123
NEXT_PUBLIC_PRICE_CONSULT_90=price_CONSULT_90
NEXT_PUBLIC_PRICE_RESET_4W=price_RESET_4W
NEXT_PUBLIC_PRICE_CONCIERGE_12W=price_CONCIERGE_12W
```

## Stripe test

Use [Stripe test cards](https://stripe.com/docs/testing). Run `pnpm run dev`, press a checkout button, and complete the test payment. Sessions are created via `/api/checkout` using Stripe's REST API.

## Deploy

The project targets Cloudflare Pages using [`next-on-pages`](https://github.com/cloudflare/next-on-pages). Set the Stripe key and KV binding `REVIEWS` in the Pages dashboard.

## Changelog

- add zod validation and typed review storage
- tests for review API and checkout handler
- GitHub Actions workflow for lint/test/build
