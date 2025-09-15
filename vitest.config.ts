// @ts-ignore - vitest types may be unavailable in some environments
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
  },
});
