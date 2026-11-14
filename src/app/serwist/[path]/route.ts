import { createSerwistRoute } from '@serwist/turbopack'

// Builds and serves the service worker at /serwist/sw.js (Turbopack has no plugin hook for this yet).
export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  swSrc: 'src/sw.ts',
  useNativeEsbuild: true,
})
