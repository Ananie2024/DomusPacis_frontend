/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // ← add this too
  },
  images: {
    domains: [
      'localhost',
      'domuspacis.rw',
      'images.unsplash.com',
      'domuspacisbackend-production.up.railway.app',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;