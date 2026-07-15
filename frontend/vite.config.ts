import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devApiProxyTarget = env.VITE_DEV_API_PROXY_TARGET

  return {
    plugins: [react()],
    server: devApiProxyTarget
      ? {
          proxy: {
            '/api': {
              target: devApiProxyTarget,
              changeOrigin: true,
              buffer: false,
              headers: {
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
              }
            },
          },
        }
      : undefined,
    build: {
      chunkSizeWarningLimit: 900,
    },
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      setupFiles: './src/test/setup.ts',
    },
  }
})
