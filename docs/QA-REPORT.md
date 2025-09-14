# QA Report

## Summary
- Initial pnpm-based workflow and legacy dependencies triggered 403 errors from the npm registry, preventing installs.
- Standardized on npm with a flat ESLint config and cleaned dev dependencies.
- CI now installs via `npm ci` with retry settings and runs lint, test, and build steps.

## Commands
- `npm install` *(fails in sandbox: registry unreachable)*
- `npm run lint`
- `npm test`
- `npm run build`

## Notes
- Stripe requests run via REST on the Node runtime.
- CI workflow at `.github/workflows/ci.yml` uses npm with cache and registry retries.
