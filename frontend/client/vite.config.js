import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'vite-plugin-postcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [
    react(),
    postcss({
      // Specify the name of your styles file
      extract: 'styles.css',
    }),
  ],
});
