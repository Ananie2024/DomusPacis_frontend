/** @type {import('next').NextConfig} */
const nextConfig = {
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