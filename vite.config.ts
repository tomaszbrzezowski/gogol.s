import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pensjonat: resolve(__dirname, 'pensjonat.html'),
        grotasolna: resolve(__dirname, 'grotasolna.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});