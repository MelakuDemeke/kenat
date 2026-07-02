import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    target: 'es2020',
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    target: 'es2020',
    outDir: 'dist',
    globalName: 'Kenat',
    sourcemap: true,
    minify: true,
    splitting: false,
    clean: false,
  },
]);
