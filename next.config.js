/** @type {import('next').NextConfig} */
const path = require('node:path');

let hasSentry = true;

try {
    require.resolve('@sentry/nextjs/package.json');
} catch (error) {
    if (error && typeof error === 'object' && error.code === 'MODULE_NOT_FOUND') {
        hasSentry = false;
    } else {
        throw error;
    }
}

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920, 2400],
        imageSizes: [120, 240, 360, 480, 640, 960],
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/gallery/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/fonts/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },
    async redirects() {
        return [
            { source: '/reserve', destination: '/book', permanent: true },
            { source: '/pricing', destination: '/pricing-calculator', permanent: true },
            { source: '/calculator', destination: '/pricing-calculator', permanent: true },
            { source: '/products', destination: '/services', permanent: true },
            { source: '/residency', destination: '/membership', permanent: true },
            { source: '/residencies', destination: '/membership', permanent: true },
            { source: '/join', destination: '/membership', permanent: true },
            { source: '/bookings', destination: '/book', permanent: true },
        ];
    },
    webpack(config) {
        if (!hasSentry) {
            config.resolve = config.resolve ?? {};
            config.resolve.alias = config.resolve.alias ?? {};
            if (!config.resolve.alias['@sentry/nextjs']) {
                config.resolve.alias['@sentry/nextjs'] = path.join(
                    __dirname,
                    'src',
                    'stubs',
                    'sentry.ts',
                );
            }
        }
        return config;
    },
};

const withSentryConfig = hasSentry
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

