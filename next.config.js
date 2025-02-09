/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      }
    ],
    domains: ['picsum.photos', 'si.geilicdn.com', 'qc-find.oss-cn-beijing.aliyuncs.com', 'img.alicdn.com'],
  }
}

module.exports = nextConfig 