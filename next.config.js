/** @type {import('next').NextConfig} */
const path = require('path');

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
            { source: '/services', destination: '/products', permanent: true },
            { source: '/memberships', destination: '/membership', permanent: true },
            { source: '/join', destination: '/membership', permanent: true },
            { source: '/bookings', destination: '/book', permanent: true },
        ];
    },
    webpack: (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            gsap: path.join(__dirname, 'src/lib/gsapClient.ts'),
        };
        return config;
    },
};

module.exports = nextConfig;
