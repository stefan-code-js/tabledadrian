# Table d’Adrian

## Run commands
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm run clean`

## Stripe testing
1. Set `STRIPE_SECRET_KEY` and relevant `NEXT_PUBLIC_PRICE_*` ids.
2. Run `npm run dev` and visit `/products`.
3. Choose an offering and pay with Stripe test card `4242 4242 4242 4242`.
4. After redirect to `/success` the order is confirmed.

## Page map
- `/` home
- `/products` products & services
- `/about`
- `/menu`
- `/team`
- `/consult`
- `/membership`
- `/reviews`
- `/success`
- `/cancel`

## SEO / a11y / perf notes
- Metadata includes titles, descriptions, canonical links, and social tags.
- Robots.txt and sitemap.xml generated via Next.js.
- Images have alt text and lazy-load.
- Headings and interactive elements are keyboard accessible.
- Local Lighthouse: SEO ≥95, Performance ≥90.

## QA report
- Added Products & Services page with Stripe checkout CTAs.
- Introduced reusable Trust section with FAQs and reasons to choose us.
- Implemented Stripe checkout session helper and in-memory order store.
- Added Vitest with tests for utilities, product data, and checkout session creator.
- Updated CI to run install → lint → typecheck → test → build.
