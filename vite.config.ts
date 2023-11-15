import React from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: '/src',
      },
    ],
  },
});
