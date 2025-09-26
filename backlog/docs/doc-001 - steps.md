---
id: doc-001
title: steps
type: other
created_date: '2025-09-25 10:44'
---
Full UI/UX overhaul: cinematic hero, editorial sections, typography/fonts, palette, grain, FactRows, component system, page-by-page copy, CTA routing, pricing display limits, etc.
Navigation spec: final link set, CTA behavior, overlay accessibility polish, brand styling.
Motion language: GSAP split-text, micro-parallax, Lenis tuning across pages.
Media pipeline: next/image usage, images manifest (src/data/images.ts), blur placeholders, AVIF/WebP, gallery lightbox.
Content and components: HeroCinematic, SectionLead, EditorialBlock, PullQuote, CTABand, ImageMosaic, Testimonials, PricingTier, MenuTeaser, BookButton, etc., with cva/tw-merge setup.
Backend/API gaps: reviews endpoint hardening, booking Stripe fetch (edge), rate-limited reviews/contact/booking, KV + D1 persistence, admin leads secure gating, pricing calculator function parity.
Cloudflare config: wrangler bindings, headers/CSP middleware, Next-on-Pages adapter updates, feature flags.
Analytics/observability: Plausible/CF events for all CTAs, Stripe redirects, etc., plus feature flags.
SEO/social: per-page metadata, dynamic /api/og generator, JSON-LD for Organization/LocalBusiness/Product, sitemap/robots refresh.
Performance + a11y sweeps: fonts, LCP/CLS/INP targets, accessibility tests, console-clean guarantee.
Testing/CI: Vitest coverage, Playwright flows, axe checks, GitHub Actions pipeline, pre-commit hooks, README updates.
Pricing centralization enforcement, removal of duplicated price text across pages.
Cloudflare Pages dual-deploy hardening, Vercel compatibility verification.
Git flow steps & documentation (branching, rebase, commits, PR template) not yet executed.
In short, only observability/analytics foundations and minor API resilience have been tackled—the comprehensive redesign, infrastructure hardening, and deployment/test work remain to deliver.
