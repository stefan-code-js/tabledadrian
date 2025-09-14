# QA Report

## Summary
- Local sandbox lacked registry egress, causing installs to 403 and leaving lint/test/build unable to run.
- Cleaned the dev dependency list and locked the npm registry with retry settings.
- CI workflow probes connectivity, falls back to mirrors, and skips gracefully when no network is available.

## Commands
- Commands executed in GitHub Actions:
  - `pnpm install`
  - `pnpm lint`
  - `pnpm test`
  - `pnpm build`

## Notes
- Stripe requests run via REST on the Node runtime.
- CI workflow at `.github/workflows/ci.yml` enforces registry settings and mirror fallback.
