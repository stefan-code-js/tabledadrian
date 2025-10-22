# Table d'Adrian

Next.js 15 experience for Table d'Adrian - a luxury private chef atelier blending wellness cuisine with cinematic storytelling and consistent hospitality UX.

## Quick start

```
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server with live reload |
| `npm run build` | Production build (runs `prebuild` PDF generation beforehand) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint across the monorepo |
| `npm run typecheck` | `tsc --noEmit` for static analysis |
| `npm run test:unit` | Vitest suite |
| `npm run test:e2e` | Playwright end-to-end flows |
| `npm run test` | CI aggregate (`lint`, `typecheck`, `test:unit`, `test:e2e`) |
| `npm run clean` | Remove build/test artefacts |
| `npm run cf:build` | Cloudflare Pages adapter build |

## Environment variables

| Variable | Description |
| --- | --- |
| NEXTAUTH_SECRET | 32-char secret for Auth.js sessions |
| MAILCHIMP_API_KEY / MAILCHIMP_LIST_ID | Newsletter + DSAR tagging |
| RESEND_API_KEY | Transactional email dispatch for DSAR confirmations |
| LEGAL_ENTITY_NAME / LEGAL_ADDRESS / DPO_EMAIL | Displayed on legal pages and footers |
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN / NEXT_PUBLIC_CF_ANALYTICS_TOKEN (optional) | Analytics scripts gated by cookie consent |
| NEXT_PUBLIC_CONTACT_EMAIL | Site-wide contact surfaced in hero/footers |
| RESEND_FROM_EMAIL / RESEND_TO_EMAIL (if using Resend) | Override default DSAR mailboxes |
| Stripe keys (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, pricing IDs) | Checkout flows |

`.env` files are ignored by default; copy `.env.example` (if present) or the values above into `.env.local`.

## Site map and experiences

- **Studio and storytelling**
  - `/` Home - cinematic hero, value propositions, testimonials, newsletter CTA
  - `/about`, `/team`, `/press` - editorial storytelling and PR resources
  - `/gallery`, `/reviews` - imagery and social proof
- **Services and conversion**
  - `/products`, `/services`, `/consult`, `/pricing-calculator`, `/membership`
  - `/book` (booking flow), `/success`, `/cancel`
- **Guest account access**
  - `/auth/login` and `/auth/register` - Auth.js credential flows with zod/react-hook-form validation that mirror the global UI system
- **Member experiences**
  - `/members`, `/members/recipes`, `/alchemy-collectibles`, `/community`, `/community/charter` - gated dashboard, recipe vault, collectible showcase, and community etiquette
- **Legal and compliance hub**
  - `/terms`, `/privacy`, `/privacy/requests`, `/cookies`, `/crypto-tc`, `/refunds`, `/accessibility`, `/dpa`, `/imprint`
  - `/api/privacy/request` handles DSAR submissions (Mailchimp tagging plus Resend emails)
  - Cookie consent banner with granular preferences and consent-aware analytics loading
- **Contact and concierge**
  - `/contact` includes the immersive hero plus direct concierge numbers, press mailboxes, and quick links

Additional routing (admin, experiences, calculator, etc.) is available under `src/app`.

## Authentication architecture

- **Auth.js (NextAuth v5 beta)** relies on the credentials provider with custom password hashing (`scryptSync` with random salt).
- Member records persist to `content/members/members.json` using helper utilities in `src/lib/members.ts`.
- `/api/members/register` receives registration requests from the branded form and stores concierge-managed invitations.
- The session provider is mounted in `src/app/layout.tsx`, enabling `useSession` inside client components when needed.
- Collectible verification and community data draw from `content/collectibles` and `src/data/community.ts`, surfaced through `src/lib/collectibles.ts` and related helpers.

## Legal automation

- Markdown content lives under `content/legal/**/*.md`.
- `scripts/generateLegalPdfs.js` renders PDFs with token replacement via `pdf-lib` during `npm run build`.
- `src/components/LegalLayout` renders shared layout with TOC (`react-toc`), JSON-LD, and env-driven contact.
- Footer exposes complete legal navigation plus cookie preferences toggle and CCPA link.

## Contact channels and access

- `src/components/ContactChannels` exposes concierge email, residency hotline, press desk, and quick access links to booking, consults, login, and registration.
- Footer and navigation highlight consistent account access alongside legal resources.

## Testing and quality

- **Unit tests** - Vitest (`npm run test:unit`) cover booking, pricing, Stripe, and authentication helpers.
- **E2E** - Playwright suite (`npm run test:e2e`) stored in `tests/e2e`.
- **Static analysis** - ESLint (`npm run lint`) plus TypeScript (`npm run typecheck`).
- **CI aggregate** - `npm run test` executes lint -> typecheck -> unit -> e2e for pipeline parity.

## Deployment and hosting

- Designed for the Next.js App Router with static and server components.
- Cloudflare Pages adapter available via `npm run cf:build`.
- Cookie consent wraps analytics (`@vercel/analytics`, `SpeedInsights`, Plausible, Cloudflare) ensuring regulatory compliance.

## Helpful resources

- Content data: `src/data/**`, `content/**`
- Components: `src/components/**`
- API routes: `src/app/api/**`
- Fonts and theme utilities: `src/lib/fonts`, `src/lib/theme`
- Authentication helpers: `src/lib/auth`, `src/lib/members`

For further onboarding steps, review `backlog/docs/` for UX, SEO, and process notes.






