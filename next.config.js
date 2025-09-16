/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "tabledadrian.com",
                    },
                ],
                destination: "https://www.tabledadrian.com/:path*",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
