# Table d’Adrian

A bespoke Next.js 15 application for the Table d’Adrian private chef and wellness atelier. The site renders on the Edge and targets deployment on Cloudflare Pages.

## Development

```bash
npm install
npm run dev
```

## Linting & Tests

```bash
npm run lint
npm test
```

Both commands run locally without a network connection. The test suite uses TypeScript's compiler and Node's built‑in test runner.

## Deployment

The project is prepared for Cloudflare Pages/Workers using `next-on-pages`:

```bash
npm run cf:build
```

The build uses environment variables such as `STRIPE_SECRET_KEY` and the various `PRICE_*` identifiers for Stripe Checkout sessions.

## Features

- Zod-powered review validation
- Edge-friendly Stripe checkout helper
- Strict TypeScript configuration
- Minimal unit tests for core utilities
