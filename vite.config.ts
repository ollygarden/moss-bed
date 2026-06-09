import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: false,
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/components/ui/index.ts'),
        'tailwind-preset': path.resolve(__dirname, 'src/tailwind-preset.ts'),
        'components/ui/Link/index': path.resolve(
          __dirname,
          'src/components/ui/Link/index.tsx'
        ),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'react-hook-form',
        '@hookform/resolvers',
        '@hookform/resolvers/zod',
        'zod',
        'react-datepicker',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'framer-motion',
        /^motion\//,
        /^@radix-ui\//,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    minify: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
