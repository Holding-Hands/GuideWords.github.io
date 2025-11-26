/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/GuideWords',
  assetPrefix: '/GuideWords/',
}

module.exports = nextConfig
