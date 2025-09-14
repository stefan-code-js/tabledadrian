# QA Report

## Summary
- Lint, tests, and build executed successfully.
- Build previously stalled; enabling `NEXT_DEBUG` revealed no long-running tasks. Suspected network calls to Google Fonts were removed by dropping unused `next/font/google` helper.
- CI initially failed to locate compiled tests because TypeScript output to `build-test` while the runner expected `build/tests`.

## Commands
- `npm run lint`
- `npm test`
- `NEXT_DEBUG=true npm run build`

## Notes
- Stripe tests use stubbed fetch and test key `sk_test`.
- CI workflow at `.github/workflows/ci.yml`.
- Build issue resolved by eliminating external font downloads so build no longer hangs in restricted networks.
- Test path mismatch resolved by setting `outDir` to `build` and invoking Node on `build/tests/**/*.js`.
