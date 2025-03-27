import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import manifest from './manifest.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest }), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'src/background.ts',
      },
    },
  },
});
