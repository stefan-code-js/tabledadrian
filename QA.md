# QA

- **Root cause**: stale/corrupted lockfile caused install failures in CI.
- **Resolution**: regenerated `package-lock.json` and added CI automation to auto-repair future bad locks.
