import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server/index.ts'],
  outDir: 'dist/server',
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  dts: false,
  external: [
    // Don't bundle dependencies, just transform our code
    '@trpc/server',
    'cors',
    'zod',
    'cookie'
  ],
  esbuildOptions(options) {
    options.packages = 'external';
  }
});