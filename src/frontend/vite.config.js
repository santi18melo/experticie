import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from any device on the network
    port: 5175,
    strictPort: true,
    hmr: {
      overlay: false
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  build: {
    sourcemap: false, // Performance: No sourcemaps in prod
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    css: true,
  }
})
