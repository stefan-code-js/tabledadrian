/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ⬅️ no lint in `next build`
    },
    typescript: { ignoreBuildErrors: true }, // leave OFF unless you really need it
};
module.exports = nextConfig;
