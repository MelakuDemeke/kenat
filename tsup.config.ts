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
    // Whitespace-only minification: esbuild inlines nigs.json (~35KB) as a
    // pretty-printed object literal by default, nearly doubling its size in
    // the bundle. minifyIdentifiers is deliberately left off here - full
    // identifier mangling would rename error classes (see keepNames note
    // below), and this build otherwise favors readability/debuggability.
    minifyWhitespace: true,
    keepNames: true,
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    target: 'es2020',
    outDir: 'dist',
    globalName: 'Kenat',
    sourcemap: true,
    minify: true,
    // Without this, esbuild's identifier mangling renames error classes
    // (e.g. InvalidEthiopianDateError -> "v"), silently breaking
    // `error.name` / `error.constructor.name` / `toJSON().type` for
    // consumers of this bundle, since KenatError derives its serialized
    // `type` from `this.constructor.name`. Verified via a real browser
    // load: without keepNames, e.name comes back as a single letter.
    keepNames: true,
    splitting: false,
    clean: false,
  },
]);
