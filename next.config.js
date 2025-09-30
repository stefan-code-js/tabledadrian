/** @type {import('next').NextConfig} */
const path = require('node:path');

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async redirects() {
        return [
            { source: '/reserve', destination: '/book', permanent: true },
            { source: '/pricing', destination: '/pricing-calculator', permanent: true },
            { source: '/calculator', destination: '/pricing-calculator', permanent: true },
            { source: '/products', destination: '/services', permanent: true },
            { source: '/memberships', destination: '/membership', permanent: true },
            { source: '/join', destination: '/membership', permanent: true },
            { source: '/bookings', destination: '/book', permanent: true },
        ];
    },
    webpack(config) {
        config.resolve = config.resolve ?? {};
        config.resolve.alias = config.resolve.alias ?? {};
        if (!config.resolve.alias['@sentry/nextjs']) {
            config.resolve.alias['@sentry/nextjs'] = path.join(__dirname, 'src', 'stubs', 'sentry.ts');
        }
        return config;
    },
};

const { existsSync } = require('node:fs');
const { join } = require('node:path');

const sentryPackageJson = join(__dirname, 'node_modules', '@sentry', 'nextjs', 'package.json');

const withSentryConfig = existsSync(sentryPackageJson)
    ? require('@sentry/nextjs').withSentryConfig
    : (config) => config;

module.exports = withSentryConfig(
    nextConfig,
    {
        silent: true,
        dryRun: !process.env.SENTRY_AUTH_TOKEN,
    },
    {
        hideSourcemaps: true,
    }
);

