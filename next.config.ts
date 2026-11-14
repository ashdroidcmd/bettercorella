import { withSerwist } from '@serwist/turbopack'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/serwist/:path*', headers: [{ key: 'Cache-Control', value: 'no-cache' }] },
    ]
  },
  // The town section moved from /city (template) to /town; keep old links working.
  async redirects() {
    return [
      { source: '/city', destination: '/town', permanent: true },
      { source: '/city/:path*', destination: '/town/:path*', permanent: true },
    ]
  },
}

export default withSerwist(nextConfig)
