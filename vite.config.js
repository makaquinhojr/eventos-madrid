import { defineConfig } from 'vite';

export default defineConfig({
  base: '/eventos-madrid/',
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('js/i18n.js')) {
            return 'i18n';
          }
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false
  },
  server: {
    port: 3000,
    open: true
  }
});
