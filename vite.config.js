import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/eventos-madrid/' : '/',
  build: {
    target: 'esnext',
    minify: false,
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
    open: true,
    host: true
  }
}));
