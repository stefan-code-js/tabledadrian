/**
 * Defines the locales supported by the site and the default locale. This
 * module centralizes language configuration so that both the middleware
 * and the app can import a single source of truth. When adding new
 * languages, update the `locales` array and create translation files
 * under `src/messages` accordingly.
 */
export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';