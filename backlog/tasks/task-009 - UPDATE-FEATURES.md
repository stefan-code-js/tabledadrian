---
id: task-009
title: UPDATE FEATURES
status: Done
assignee:
  - '@codex'
created_date: '2025-10-21 22:41'
updated_date: '2025-10-21 23:28'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
You are an expert Next.js 15 developer and Web3 integrator, leading a mastermind team of 100 elite coders specializing in luxury brand platforms with high engagement, legal compliance, and seamless NFT/utility token integrations. As the team lead, you coordinate a collaborative effort where each coder focuses on specific aspects: 20 on UI/UX for max engagement (crafting immersive wording and flows), 20 on Web3 integrations like auth and viem checks (ensuring seamless NFT verification), 15 on legal pages and compliance mechanics (building robust, compliant "papers"), 15 on content wording and SEO (infusing aspirational language across the site), 10 on newsletters and automations (for retention loops), 10 on recipes/events/forums/badges (gamification and community), 5 on growth UX elements (teasers/banners/CTAs), and 5 on build/testing for zero errors. The team upgrades the existing GitHub repository at https://github.com/stefan-code-js/tabledadrian, a fully pushed Next.js project for www.tabledadrian.com—a luxury private chef service blending culinary artistry with digital alchemy. The site uses the App Router (confirmed via app/layout.tsx existence; fall back to Pages Router if /pages detected, adapting paths like app/terms/page.tsx to pages/terms.tsx). Existing structure: /app for routes (/ home with hero showcasing bespoke dining, /products listing services with Stripe CTAs using /lib/stripe-helpers.ts, /about with alchemist bio, /menu with sample menus, /team with profiles, /consult with form, /membership with tiers, /reviews with testimonials, /success & /cancel for payments); /components for reusables (Trust.tsx with FAQs); /lib for utilities (stripe.ts, orders.ts in-memory store); /tests with Vitest (product.test.ts, checkout.test.ts); configs (next.config.js for metadata/build, tsconfig.json for TS, .eslintrc for lint, vitest.config.js for tests); package.json with scripts (dev/lint/typecheck/test/build/clean) and deps (next, react, react-dom, @stripe/stripe-js, typescript, vitest, eslint, @types/node). 191 commits, 3 contributors, 1 star, README with Stripe testing, page map, SEO notes.

The team adds only new features without altering Stripe, order store, existing APIs/routes, or core logic—extend by composing (e.g., wrap layouts, conditional render in components). Preserve luxury wording (aspirational, elegant: e.g., "Transform ordinary meals into extraordinary experiences" instead of casual), design (dark-themed, gold accents, responsive grids with media queries starting mobile-first at 320px, scaling to desktop), SEO (base metadata, robots/sitemap auto, alt/lazy images), a11y (ARIA labels, keyboard focus, WCAG 2.1 AA: contrast 4.5:1, semantic HTML), performance (Lighthouse targets, code-splitting). Mobile-first: All CSS @media (min-width), test on 375px viewport. Type-safe: TS interfaces for props/states, zod schemas for forms/APIs. Lint clean: ESLint rules enforced. Zero console warnings: Proper useEffect deps/cleanup, no unused vars. Add deps to package.json (next-auth@beta for Auth.js v5, viem@latest for Web3, framer-motion for animations, @mailchimp/mailchimp_marketing for newsletter, discourse-sso for forum, openbadges-issuer for badges, next-mdx-remote for MDX, react-hook-form/zod for forms, pdf-lib for PDFs, uuid for IDs, nodemailer or resend for emails, react-toc for TOC, markdown-it for PDF gen). Run npm i mentally. Use env vars (NEXTAUTH_SECRET=random32chars, MAILCHIMP_API_KEY=..., MAILCHIMP_LIST_ID=..., ZORA_CONTRACT_ADDRESS=0xcdc2d9ab799fec5bb2d5e40862bb5f25aac97c76 from Zora, LEGAL_ENTITY_NAME="Table d’Adrian LLC", LEGAL_ADDRESS="New York, USA", DPO_EMAIL="dpo@tabledadrian.com"). Output ONLY final code snippets for new/updated files (full for new, with // UPDATED SECTION comments for changes in updated). Label by path (e.g., // app/alchemy-collectibles/page.tsx). No commentary—just code blocks.

Wording all over the website: Team crafts elegant, aspirational language to position Table d’Adrian as the pinnacle of culinary innovation—e.g., on home: "Embark on a journey where culinary artistry meets digital mastery, curated for the discerning elite." On /products: "Indulge in bespoke experiences, now enhanced with crypto options for seamless global access." On /about: "As the Culinary Alchemist, Adrian transforms ingredients into legacies, now immortalized in Alchemy Collectibles." Engagement features: Infuse max engagement with personalized role-based wording (e.g., guest: "Discover the magic—mint to join the elite circle"; holder: "Your key unlocks exclusive realms—claim your perks"; vip: "Master the alchemy—access VIP events curated for visionaries"). CTAs ubiquitous (e.g., "Unlock Now" buttons with framer-motion hover glow). Gamification: Badges as "marks of the alchemist guild." Community: Forums as "the alchemist's conclave." Retention: Newsletters as "elixir dispatches" with automations like "Your weekly transmutation tips." Growth: Teasers as "portals to digital empires," banners as "whispers of exclusivity."

Core pillars for max engagement: Team emphasizes immersive user flows—e.g., personalized wording based on role (guest: "Discover Alchemy", holder: "Unlock Your Perks"), CTAs every section ("Mint Now", "RSVP", "Subscribe"), subtle Framer Motion animations (0.5s fade-in on view, no loops), gamification via badges, community via forums/newsletters, retention via gated content/emails. Wording: Low-key luxury (e.g., "As a Culinary Alchemist, I craft bespoke experiences that transcend the ordinary—now digitized through Alchemy Collectibles for elite access."). SEO keywords woven in (e.g., "luxury private chef nft", "crypto dining events"). Explain Alchemy Collectibles: A collection of macro art NFTs (powders/foams/gels inspired by kitchen lab) minted on Zora, as "keys" to membership—utility-focused (not investment): Basic tier unlocks recipes/Discord, Mid virtual demos, Elite IRL events/consults for $10k+ holders (viem-verified balance). Integrate everywhere: Teasers link to hub, auth checks enhance personalization.

Auth: Implement Auth.js v5 (next-auth) in /app/api/auth/[...nextauth]/route.ts with providers: EmailProvider (magic link via resend/nodemailer with env RESEND_API_KEY), GoogleProvider (env GOOGLE_CLIENT_ID/SECRET), TwitterProvider (env TWITTER_CLIENT_ID/SECRET for X). Integrate SIWE: Add EthereumProvider with viem (import { createWalletClient } from 'viem'; sign message "Sign in to Table d’Adrian"). Roles via session callbacks: guest (no session), member (auth'd), holder (viem publicClient.readContract on Zora contract for balance >0), vip (balance >= equivalent of $10k, use viem getBalance or custom logic). Add middleware.ts to protect /recipes (holder+), /forum (member+), /events/rsvp (holder for gated). Add components/AuthButton.tsx (sign-in/out, wallet connect via viem). Use useSession hook for role-based rendering (e.g., "Welcome, VIP Alchemist!"). Max engagement: Post-sign-in redirect to /profile with personalized perks.

Newsletter: Add /app/api/newsletter/subscribe/route.ts (POST: import mailchimp; mailchimp.setConfig({apiKey: env}); await mailchimp.lists.addListMember(listId, {email_address: body.email, status: "subscribed", tags: ["new-subscriber"]}); return 200). Form validation zod: z.object({email: z.string().email()}). Footer: Update /components/Footer.tsx to include NewsletterSignup.tsx (react-hook-form input/submit). Modal: components/NewsletterModal.tsx (useEffect localStorage 'seen-newsletter' check, show after 10s, dismiss sets storage). Automations: On subscribe, tag for Mailchimp welcome series (3 emails: intro to alchemy, recipe teaser, event invite); on /api/rsvp or recipe access, POST to Mailchimp to add tags like "event-rsvp" triggering automations (e.g., reminder email 1 day before).

Recipes Vault (MDX): Add /app/recipes/page.tsx listing MDX from /content/recipes/recipe1.mdx etc. (use next-mdx-remote; team preps 3 placeholders: "Alchemical Foam Technique" with content). Gated: useSession role check; guests see first paragraph teaser + "Mint to Unlock"; holders see full + PDF download (/public/recipes/recipe1.pdf gen at build). PDF dossiers: Use pdf-lib in scripts/generateRecipesPdfs.js (run in prebuild; markdown-it parse MDX to text, pdf-lib create doc with text). Max engagement: Comment section (simple form POST to /api/comments, in-memory store), share buttons.

Events + RSVP: Add /app/events/page.tsx with event grid (hardcoded array in lib/events.ts; each {id, title, date, description, type:'IRL'/'Virtual', gated:bool}). RSVP button per event: Form (react-hook-form) POST to /app/api/rsvp/route.ts (validate zod, check role/viem for gated, store in in-memory array lib/rsvps.ts, return {success, ticketId: uuid()}). Send confirmation email via nodemailer/resend. Max engagement: Countdown timer (framer-motion), "Share Event" button, post-RSVP newsletter newsletter tag for automations.

Forums: Add /app/forum/page.tsx with Discourse iframe (env DISCOURSE_URL="https://forum.tabledadrian.com"). SSO: /app/api/forum/sso/route.ts (GET: import discourse-sso; generate payload with session.user.id/email/name, sign with env DISCOURSE_SSO_SECRET). Categories access via Discourse groups synced with roles (manual setup note). Max engagement: Embed recent topics teaser, "Join Discussion" CTA gated by member.

Badges: Add on-chain "Collector Badge" (link to Zora or external minter). Off-chain: /app/api/badges/route.ts (POST: import openbadges-issuer; for holders, generate JSON {badge: {name:'Alchemy Collector', criteria:'Hold NFT'}}; return URL). Display in /app/profile/page.tsx (new page: user dashboard with badges list). Max engagement: "Claim Badge" button after mint verification.

Collectibles hub: /app/alchemy-collectibles/page.tsx with hero ("Enter the Realm of Culinary Alchemy: NFTs That Unlock Elite Experiences"), tiers accordion (Basic: recipes/Discord; Mid: demos; Elite: dinners—viem checks for personalization), Zora iframe, "Mint Now" button (a href Zora), "See Perks" (scroll to tiers). Wording: "As a Culinary Alchemist, these collectibles transform digital ownership into tangible luxury—hold to dine like royalty."

Growth UX: Homepage (app/page.tsx update): Add DigitalAlchemyTeaser component (section with Zora preview, mint CTA, wording: "Forge your digital empire with Alchemy Collectibles—keys to unparalleled luxury."). Sitewide dismissible banner: components/AlchemyBanner.tsx (use localStorage to dismiss, promote collectibles with wording: "The alchemical revolution awaits—mint today for exclusive access."). Crypto teaser on /products and /consult: Add section "Embrace Crypto Elegance" with logos, wording: "Seamless payments in BTC, ETH, SOL via Binance for global connoisseurs." IG embed on /menu: Use <iframe> for @tabledadrian feed, wording: "Glimpses of alchemical mastery from our kitchen lab." FAQ on /about: Add accordion with Q&A (e.g., "What is Alchemy Collectibles? A gateway to elite experiences."), wording: "Unlock the secrets of our digital empires." FloatingCTA: components/FloatingCTA.tsx (fixed button "Embark on Alchemy" linking hub, animation on hover). CookieConsent: banner with luxury wording "We value your privacy as we do our craft."

SEO: Add JSON-LD scripts in head via layout.tsx: Organization (name:"Table d’Adrian", url, logo), LocalBusiness (address from env, geo, openingHours), Product for tiers (name, description, offers), Event for /events items (name, startDate, location). Update OG tags in metadata. Canonical URLs on all pages. Use lowercase hashtags if adding (e.g., #culinaryalchemy).

Legal “papers” to implement:
Add the following pages and link them in footer “Legal” section. Each page uses LegalLayout.tsx: H1 title, last-updated date (from lib/legal.ts helper, e.g., 'October 22, 2025'), human-readable markdown-rendered content (use next-mdx-remote), anchor TOC (auto-gen from headings with react-toc), contact email (DPO_EMAIL env), schema.org WebPage JSON-LD (from lib/legal.ts builder, e.g., {"@type":"WebPage", name, url, datePublished}). Use environment variables for LEGAL_ENTITY_NAME, LEGAL_ADDRESS, DPO_EMAIL. Provide downloadable PDF versions: Generate /public/legal/terms.pdf etc. at build time using pdf-lib (add script in package.json "prebuild": "node scripts/generateLegalPdfs.js" to run node script converting /content/legal/*.md to PDF via markdown-it + pdf-lib; content from MD files with the exact wording below).

Terms & Conditions: /terms page.tsx
Content from /content/legal/terms.md: 
# Terms & Conditions
Last updated: October 22, 2025

These Terms and Conditions ("Terms") govern your use of the Table d’Adrian website and services, including bookings, NFT collectibles, forums, and events. By accessing or using our services, you agree to be bound by these Terms.

## 1. Service Terms
We provide luxury private chef services, bespoke menus, consultations, and digital collectibles. Services are provided as-is.

## 2. Account Rules
You must be 18+ to create an account. Provide accurate information. You are responsible for account security.

## 3. Eligibility
Services are available worldwide, subject to local laws.

## 4. Booking Policies
Bookings require payment via Stripe or crypto. Confirmations are emailed.

## 5. Token-Gated Access
Certain features (e.g., events, recipes) require holding Alchemy NFTs, verified via blockchain.

## 6. Intellectual Property
All content is owned by [LEGAL_ENTITY_NAME]. Limited license for personal use.

## 7. UGC License
You grant us a license to use user-generated content posted on forums.

## 8. Forum Rules
Follow community guidelines; no spam, harassment.

## 9. Termination
We may terminate accounts for violations.

## 10. Governing Law
New York law governs.

## 11. Arbitration Clause
Disputes resolved via arbitration in New York.

## 12. Limitation of Liability
Liability limited to service fees paid.

## 13. Changes Notice
We may update Terms; continued use constitutes acceptance.

Contact: [DPO_EMAIL]

(Include TOC anchors like <a id="service-terms"></a>, PDF download <a href="/public/legal/terms.pdf">Download PDF</a>)

Privacy Policy (GDPR/CCPA compliant): /privacy/index.tsx
Content from /content/legal/privacy.md: 
# Privacy Policy
Last updated: October 22, 2025

This Privacy Policy describes how [LEGAL_ENTITY_NAME] collects, uses, and shares your personal data.

## 1. Data Categories
Personal info (name, email), payment data, wallet addresses, usage data.

## 2. Purposes
To provide services, process bookings, verify NFT holdings, send newsletters.

## 3. Legal Bases
Consent, contract performance, legitimate interests.

## 4. Retention
Data retained as needed, e.g., 7 years for financial records.

## 5. Processors
Stripe, Mailchimp, Google Analytics (with consent).

## 6. International Transfers
Data may transfer to US; use SCCs for GDPR.

## 7. Rights
Access, erasure, portability, object; contact [DPO_EMAIL].

## 8. DPO Contact
[DPO_EMAIL]

## 9. Cookies
See Cookie Policy.

## 10. Analytics
Usage data for improvements (gated by consent).

## 11. Marketing Comms
Opt-in newsletters.

## 12. Children’s Data
Not for under 13; parental consent required.

## 13. Changes
Notified via email/site.

(TOC, PDF, JSON-LD)

Cookie Policy + Preferences Center: /cookies/index.tsx
Content from /content/legal/cookies.md: 
# Cookie Policy
Last updated: October 22, 2025

We use cookies to enhance your experience.

## 1. Cookie Types
Strictly necessary (session, auth), analytics (GA, duration 2 years, provider Google), marketing (Mailchimp, duration 1 year, provider Mailchimp).

## 2. Durations
As above.

## 3. Providers
Google, Mailchimp.

Preferences Center: Embed components/CookiePreferences.tsx with toggles for analytics/marketing (store in localStorage; on change, update window.dataLayer = {gtm.start: new Date().getTime(), event:'gtm.js', consent: {analytics: true/false}}). Link from CookieConsent.

Crypto Terms: /crypto-tc.tsx
Content from /content/legal/crypto-tc.md: 
# Crypto Terms
Last updated: October 22, 2025

Additional terms for crypto payments and NFTs.

## 1. Volatility
Crypto values fluctuate; no guarantees.

## 2. Finality/No Refunds
Transactions are final.

## 3. Jurisdiction Compliance
You must comply with local laws.

## 4. Utility Language
NFTs are utility tokens for access, not investments.

## 5. Ownership Verification
Verified via blockchain.

## 6. Change Policy
Terms may change.

Cross-link from crypto teasers.

Refunds & Cancellations: /refunds.tsx
Content from /content/legal/refunds.md: 
# Refunds & Cancellations
Last updated: October 22, 2025

## 1. Services Refund Windows
7 days for cancellations; full refund minus deposits.

## 2. Deposits
Non-refundable.

## 3. No-Show Policy
No refund for no-shows.

## 4. Digital Goods
NFTs, PDFs non-refundable.

## 5. Force Majeure
No liability for uncontrollable events.

Community & UGC Guidelines: /community.tsx
Content from /content/legal/community.md: 
# Community Guidelines
Last updated: October 22, 2025

## 1. Code of Conduct
Be respectful, no harassment.

## 2. Prohibited Content
Spam, illegal material.

## 3. Moderation
We may remove content.

## 4. Repeat-Offender Policy
Bans for violations.

## 5. DMCA/IP Reporting
Email [DPO_EMAIL] with details.

Accessibility Statement: /accessibility.tsx
Content from /content/legal/accessibility.md: 
# Accessibility Statement
Last updated: October 22, 2025

We aim for WCAG 2.1 AA.

## 1. Measures Taken
Alt text, keyboard nav, contrast ratios.

## 2. Contact for Accommodations
[DPO_EMAIL]

## 3. Compatibility
Tested on major browsers.

## 4. Known Limits
Third-party embeds may vary.

Data Request Center (DSAR): /privacy/requests.tsx
Form: Use react-hook-form/zod: fields - email (identity), requestType (select: access/erase/rectify/export/object), details (textarea), country (select). Submit to /api/privacy/request.ts.

 /api/privacy/request.ts: POST handler - validate input, store in Mailchimp/Beehiiv as tagged contact, email admin [DPO_EMAIL] with details using nodemailer/resend (from: "no-reply@tabledadrian.com", subject: "DSAR Ticket [ticketId]", body with details), send confirmation to user (subject: "Your Data Request Received - Ticket [ticketId]", body: "We will process within 30 days."), generate ticketId with uuid.v4(), return {ticketId}.

Data Processing Addendum (DPA): /dpa.tsx
Content from /content/legal/dpa.md: 
# Data Processing Addendum
Last updated: October 22, 2025

## 1. Processor/Controller Roles
We process data as per agreement.

## 2. Sub-Processors
Stripe, Mailchimp (placeholder list).

## 3. SCC Reference
EU Standard Contractual Clauses apply.

## 4. Security Measures
Encryption, access controls.

## 5. Incident Notification
Within 48 hours.

Downloadable PDF.

Imprint/Legal Notice: /imprint.tsx
Content from /content/legal/imprint.md: 
# Imprint
Last updated: October 22, 2025

Legal Entity: [LEGAL_ENTITY_NAME]

Address: [LEGAL_ADDRESS]

Contact: [DPO_EMAIL]

VAT/Registration: [placeholder]

Footer updates: Update components/Footer.tsx - Add "Legal" dropdown or links list: Terms (/terms), Privacy (/privacy), Cookies (/cookies), Crypto T&C (/crypto-tc), Refunds (/refunds), Community (/community), Accessibility (/accessibility), DPA (/dpa), Imprint (/imprint). Add “Do Not Sell or Share My Personal Information” link to /privacy/requests?type=object (preset requestType).

Compliance mechanics: CookieConsent (update components/CookieConsent.tsx): Banner with "Accept All", "Reject Non-Essential", "Preferences" button opening Preferences modal. Respect categories: Load analytics (e.g., GA script in layout.tsx conditional if localStorage.getItem('consent-analytics') === 'true'). Marketing scripts similarly.

All legal pages: Indexable (no noindex meta), canonical <link rel="canonical" href={currentUrl} />.

Display entity name/contact from env on every legal page footer.

Deliverables (adapt for App Router: app/terms/page.tsx etc.; if Pages, pages/terms.tsx):

app/terms/page.tsx

app/privacy/page.tsx

app/privacy/requests/page.tsx

app/cookies/page.tsx

components/CookiePreferences.tsx

app/crypto-tc/page.tsx

app/refunds/page.tsx

app/community/page.tsx

app/accessibility/page.tsx

app/dpa/page.tsx

app/imprint/page.tsx

app/api/privacy/request/route.ts (App Router) or pages/api/privacy/request.ts

lib/legal.ts

components/LegalLayout.tsx (shared layout + TOC + PDF download link)

Public PDFs: Add build script in package.json "prebuild": "node scripts/generateLegalPdfs.js" (script uses pdf-lib to convert /content/legal/*.md to PDF via markdown-it + pdf-lib).

components/Footer.tsx update

components/CookieConsent.tsx update

Acceptance: Ensure build passes (npm run build), type-check (npm run typecheck), ESLint (npm run lint), no console warnings (test in dev), no regressions to Stripe flows. Legal pages render with TOC (react-toc for anchors), JSON-LD (<script type="application/ld+json">{jsonLd}</script>), footer links navigate. Cookie preferences persist in localStorage, gate analytics (e.g., conditional Script tag for GA). DSAR form submits, emails admin via nodemailer/resend (add dep), returns ticket ID.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Legal experience hub delivers /terms, /privacy, /privacy/requests, /cookies, /crypto-tc, /refunds, /community, /accessibility, /dpa, and /imprint pages using a shared LegalLayout with canonical links, JSON-LD, and env-driven entity data.
- [x] #2 Cookie consent banner offers Accept All, Reject Non-Essential, and Preferences controls, persisting category-level choices and gating analytics/marketing scripts accordingly.
- [x] #3 CookiePreferences modal provides granular toggles, accessibility compliance, and integrates with layout + consent logic.
- [x] #4 lib/legal.ts centralizes metadata helpers, content loaders, and JSON-LD builders for legal pages and PDFs.
- [x] #5 DSAR center at /privacy/requests renders a react-hook-form/zod form, posts to /api/privacy/request, and surfaces submission ticket confirmation messaging.
- [x] #6 Privacy request API validates payload, tags Mailchimp contact, dispatches admin + user emails (nodemailer/resend), and returns deterministic ticket IDs via uuid.
- [x] #7 PDF generation pipeline converts content/legal markdown into downloadable PDFs via scripts/generateLegalPdfs.js invoked from package prebuild.
- [x] #8 Footer and any global nav surfaces include comprehensive legal links plus Do Not Sell CTA pointing to /privacy/requests?type=object.
- [x] #9 Project dependencies and env scaffolding updated to include next-auth@beta, viem, mailchimp marketing, discourse-sso, openbadges-issuer, next-mdx-remote, pdf-lib, uuid, email transport (nodemailer or resend), react-toc, markdown-it, with no lint/typecheck regressions.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit existing repo structure and confirm required legal/compliance assets.
2. Identify gaps for each deliverable (legal pages, components, libs, scripts).
3. Outline implementation order respecting dependencies (shared layout -> content pages -> APIs -> UI updates).
4. Prepare execution checklist covering wording, accessibility, analytics gating, and build/test obligations.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Progress update 1
- Drafted canonical legal markdown content set and shared LegalLayout with JSON-LD, PDF links, and TOC.
- Wired cookie consent provider, preferences modal, and footer/legal navigation with consent-aware analytics gating.
- Implemented DSAR center with react-hook-form/zod flow and privacy request API integrating Mailchimp tagging and Resend email dispatch.
Progress update 2
- Finalized cookie preferences so selections persist only on save, improved focus handling, and gated Vercel analytics via consent-aware component.
- Regenerated legal PDFs with env token substitution and reran npm run lint to confirm clean output.
- Verified consent banner and DSAR form flows in app after updates.

$Progress update 2
- Split legal metadata into server-only helpers with `server-only` guard and client-safe navigation export, unblocking builds.
- Refined cookie preferences modal state flow and consent-aware analytics wrapper.
- Installed typed Mailchimp/Markdown-it definitions; lint, typecheck, and build all pass locally.
<!-- SECTION:NOTES:END -->
