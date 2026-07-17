import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Important for electron
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
  }
});
