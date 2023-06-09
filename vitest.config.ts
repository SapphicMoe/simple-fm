import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~/': 'src/',
      '@classes': 'src/classes',
      '@utils': 'src/utils',
    },
  },
});
