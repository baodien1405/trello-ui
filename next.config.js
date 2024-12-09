/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig
