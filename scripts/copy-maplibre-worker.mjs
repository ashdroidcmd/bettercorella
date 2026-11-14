// MapLibre runs its tile parsing in a Web Worker that must be served as its own file.
// Copy the worker from node_modules into public/ so Next.js serves it at /vendor/maplibre-gl-worker.mjs.
import { copyFile, mkdir } from 'node:fs/promises'

await mkdir('public/vendor', { recursive: true })
await copyFile('node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs', 'public/vendor/maplibre-gl-worker.mjs')
