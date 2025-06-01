// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {}, // fallback for older libs
  },
  resolve: {
    alias: {
      util: 'util/',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      buffer: 'buffer', // no trailing slash this time
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', "util", 'stream-browserify', 'crypto-browserify'],
  },
  server: {
    historyApiFallback: true
  }
});
