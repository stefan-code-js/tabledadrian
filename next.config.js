/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      // You can allow external hosts for images here
      { protocol: 'https', hostname: '**' }
    ]
  }
};

module.exports = nextConfig;