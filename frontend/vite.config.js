import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
})
