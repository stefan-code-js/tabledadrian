# QA Report

## Summary
- Missing `package-lock.json` and flaky registry resolved by forcing npm registry with retries and committing lockfile via CI.
- Legacy pnpm and eslintrc dependencies removed; switched to flat ESLint config and canonical Tailwind/PostCSS setup.

## Commands
- `npm install` *(fails in sandbox: registry unreachable)*
- `npm run lint`
- `npm test`
- `npm run build`

## CI
- Workflow: `.github/workflows/ci.yml`
- Latest passing run: TODO

## Notes
- Stripe checkout API runs with `runtime = "nodejs"` to avoid Edge limitations.
