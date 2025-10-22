# Table d'Adrian

Next.js 15 experience for Table d'Adrian - a luxury private chef atelier blending wellness cuisine, token-gated membership, and cinematic storytelling.

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
| ZORA_CONTRACT_ADDRESS | NFT contract used for collectible verification |
| COLLECTIBLES_RPC_URL (optional) | Ethereum RPC endpoint for on-chain checks |
| DISCOURSE_SSO_SECRET | Shared secret for Discourse SSO handshakes |
| DISCOURSE_BASE_URL | Base forum URL (e.g., https://forum.tabledadrian.com) |
| LEGAL_ENTITY_NAME / LEGAL_ADDRESS / DPO_EMAIL | Displayed on legal pages and footers |
| NEXT_PUBLIC_PLAUSIBLE_DOMAIN / NEXT_PUBLIC_CF_ANALYTICS_TOKEN (optional) | Analytics scripts gated by cookie consent |
| NEXT_PUBLIC_CONTACT_EMAIL | Site-wide contact surfaced in hero/footers |
| RESEND_FROM_EMAIL / RESEND_TO_EMAIL (if using Resend) | Override default DSAR mailboxes |
| BADGE_ISSUER_ID / BADGE_ISSUER_NAME / BADGE_ISSUER_URL (optional) | Customize Open Badges issuer metadata |
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
- **Membership and collectibles**
  - `/auth/login` and `/auth/register` - Auth.js credential flows with zod/react-hook-form validation
  - `/members` - gated dashboard summarising status, concierge alerts, quick links
  - `/members/recipes` - token-gated recipe vault with wellness focus
  - `/alchemy-collectibles` - NFT tiers, benefits, and on-chain plus fallback verification
  - `/brand-assets` - downloadable logos, palette, and usage etiquette
  - `/community` - community hub with events, forum CTA, badges showcase
  - `/community/charter` - community charter rendered via LegalLayout
- **Legal and compliance hub**
  - `/terms`, `/privacy`, `/privacy/requests`, `/cookies`, `/crypto-tc`, `/refunds`, `/community/charter`, `/accessibility`, `/dpa`, `/imprint`
  - `/api/privacy/request` handles DSAR submissions (Mailchimp tagging plus Resend emails)
  - Cookie consent banner with granular preferences and consent-aware analytics loading
- **Contact and concierge**
  - `/contact` includes the immersive hero plus direct concierge numbers, press mailboxes, and quick links

Additional routing (admin, experiences, calculator, etc.) is available under `src/app`.

## Membership and collectibles architecture

- **Auth.js (NextAuth v5 beta)** using the credentials provider with custom password hashing (`scryptSync` with random salt).
- **Discourse SSO gateway** validates payloads with `discourse-sso` and redirects to the forum using session data.
- Member records stored in `content/members/members.json` with helper utilities under `src/lib/members.ts`.
- Session provider injected at `src/app/layout.tsx` so client components can access `useSession`.
- Collectible verification leverages `viem` (on-chain) with fallback to concierge-maintained allowlist.
- Recipes, tiers, and holders defined via structured JSON (`content/recipes`, `content/collectibles`).

## Legal automation

- Markdown content lives under `content/legal/**/*.md`.
- `scripts/generateLegalPdfs.js` renders PDFs with token replacement via `pdf-lib` during `npm run build`.
- `src/components/LegalLayout` renders shared layout with TOC (`react-toc`), JSON-LD, and env-driven contact.
- Footer exposes complete legal navigation plus cookie preferences toggle and CCPA link.

## Contact channels and assets

- `src/components/ContactChannels` exposes concierge email, residency hotline, press desk, and quick access links.
- Brand assets (wordmark, monogram, mark) live in `public/media/branding`.
- Footer and navigation highlight membership, collectibles, and brand downloads.

## Testing and quality

- **Unit tests** - Vitest (`npm run test:unit`) cover booking, pricing, Stripe, auth hashing, and collectible eligibility.
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
- Membership helpers: `src/lib/auth`, `src/lib/members`, `src/lib/collectibles`

For further onboarding steps, review `backlog/docs/` for UX, SEO, and process notes.






