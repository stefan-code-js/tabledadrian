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
| `npm run test:e2e` | Playwright end-to-end flows (falls back to the offline integration suite when Chromium binaries are unavailable) |
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
| NEXT_PUBLIC_VERCEL_ANALYTICS_ID (optional) | Leave unset on Netlify; set only when deploying to Vercel to enable their analytics |
| NEXT_PUBLIC_CONTACT_EMAIL | Site-wide contact surfaced in hero/footers |
| RESEND_FROM_EMAIL / RESEND_TO_EMAIL (if using Resend) | Override default DSAR mailboxes |
| Stripe keys (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, pricing IDs) | Checkout flows |
| UNLOCK_LOCK_ADDRESS / NEXT_PUBLIC_UNLOCK_LOCK | Unlock Protocol lock address used to verify concierge keys |
| UNLOCK_NETWORK_ID / NEXT_PUBLIC_UNLOCK_NETWORK | Unlock chain/network id (defaults to Ethereum mainnet `1`) |
| UNLOCK_API_KEY (optional) | Locksmith API key for private lock lookups |
| POAP_API_KEY / NEXT_PUBLIC_POAP_KEY | POAP API token leveraged for attendance scans |
| THIRDWEB_CLIENT_ID / NEXT_PUBLIC_THIRDWEB_CLIENT_ID | Thirdweb client id powering read-only SDK access |
| THIRDWEB_SECRET_KEY (optional) | Server-side Thirdweb secret for concierge intents |
| ZORA_CONTRACT_ADDRESS / NEXT_PUBLIC_COLLECTIBLES_CONTRACT | Collectible drop contract monitored by the mint console |
| COLLECTIBLES_RPC_URL / NEXT_PUBLIC_RPC_URL / ALCHEMY_RPC_URL | Preferred RPC endpoint for collectible reads |
| COLLECTIBLES_CHAIN_ID / NEXT_PUBLIC_COLLECTIBLES_CHAIN_ID / NEXT_PUBLIC_THIRDWEB_CHAIN_ID | Numeric chain id for the collectible drop |

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
- **E2E** - Playwright suite (`npm run test:e2e`) stored in `tests/e2e`. When Chromium cannot be installed, `scripts/runPlaywright.mjs` drives the fallback Vitest runner to assert the luxe hero copy, CTA wiring, and concierge bundles against the production build so CI stays green offline.
- **Static analysis** - ESLint (`npm run lint`) plus TypeScript (`npm run typecheck`).
- **CI aggregate** - `npm run test` executes lint -> typecheck -> unit -> e2e for pipeline parity.

## Deployment and hosting

- Designed for the Next.js App Router with static and server components.
- Netlify deployment is configured via `netlify.toml` (Next.js plugin + Node 22.11). `npm run build` remains the build command.
- Production builds export `NODE_OPTIONS="--max-old-space-size=4096"` so Next.js has enough heap headroom on Netlify and other CI providers. Bump to 6144/8192 if your drop grows further.
- Cloudflare Pages adapter available via `npm run cf:build`.
- Cookie consent wraps analytics providers (Netlify-compatible scripts, Plausible, Cloudflare). Vercel analytics automatically disable when their ID is absent.

## Helpful resources

- Content data: `src/data/**`, `content/**`
- Components: `src/components/**`
- API routes: `src/app/api/**`
- Fonts and theme utilities: `src/lib/fonts`, `src/lib/theme`
- Authentication helpers: `src/lib/auth`, `src/lib/members`

For further onboarding steps, review `backlog/docs/` for UX, SEO, and process notes.

## Task 12 status

Task 12 is **complete**. Highlights:

- Luxe editorial scaffolding, cinematic hero experiences, concierge analytics, and CMS-fed galleries now power every public and member surface with consistent typography and choreography.
- Concierge Web3 flows span wallet connectivity, mint console telemetry, allowlist/access APIs, integration health diagnostics, and live concierge briefings with refreshed documentation.
- The Playwright runner auto-installs Chromium when available and falls back to the offline integration suite so CI verifies the hero, CTA wiring, and concierge bundles even when CDN downloads are blocked—clearing the final testing gap before Task 13 community workstreams.
- Task 12’s acceptance criteria are now formally checked off in Backlog via the CLI helper so the board reflects the completed scope before Task 13 kicks off.

Next focus: kick off **Task 13** to elevate the community and member storytelling atop the completed concierge foundation.

### Concierge allowlist configuration

- `CONCIERGE_ALLOWLIST_WALLETS` — optional comma or newline separated list of `wallet|tier|note` entries that override the seeded concierge ledger (tier defaults to `Allowlist`).
- `CONCIERGE_ALLOWLIST_EMAILS` — optional comma or newline separated list of `email|tier|note` entries for concierge inbox and reservation routing.

If unset, the application serves the curated demo ledger defined in `src/data/conciergeAllowlist.ts`.

### Concierge integration health checks

- `/api/collectibles/health` performs Unlock, POAP, and Thirdweb connectivity diagnostics so concierge operators know when production secrets are live.
- `UNLOCK_HEALTH_WALLET` / `NEXT_PUBLIC_UNLOCK_HEALTH_WALLET` — optional override for the wallet used when probing Unlock.
- `POAP_HEALTH_WALLET` / `NEXT_PUBLIC_POAP_HEALTH_WALLET` — optional override for the wallet used when probing POAP.

If the overrides are not supplied the health checks default to a zero address that exercises credential reachability without revealing guest data.






