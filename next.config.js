/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'domuspacis.rw', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

};

module.exports = nextConfig;
