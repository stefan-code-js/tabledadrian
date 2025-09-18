/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
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
