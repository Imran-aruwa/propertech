/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'api.propertechsoftware.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

module.exports = nextConfig