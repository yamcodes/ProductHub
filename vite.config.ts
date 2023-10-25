import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import React from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), React()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: '/src',
      },
    ],
  },
});
