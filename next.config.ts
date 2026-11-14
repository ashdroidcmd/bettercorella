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
}

export default withSerwist(nextConfig)
