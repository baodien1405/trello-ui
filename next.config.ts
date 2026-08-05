import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    browserToTerminal: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trungquandev.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

export default nextConfig
