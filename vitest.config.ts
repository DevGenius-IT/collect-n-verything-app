import {defineConfig} from 'vitest/config';
import {resolve} from "path";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['test/**/*.spec.ts'],
    setupFiles: 'test/vitest.setup.ts',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './'),
    },
  },
});
