import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      // replace crypto with empty module
      // see: https://github.com/ngneat/falso/issues/353#issuecomment-1564392071
      {
        find: 'crypto',
        replacement: './src/lib/falso.ts',
      },
    ],
  },
});
