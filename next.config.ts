// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ⬅️ disables ESLint in `next build`
    },
};

export default nextConfig;
