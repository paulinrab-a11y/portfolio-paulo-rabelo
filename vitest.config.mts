import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    unstubEnvs: true,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      // Regras e utilitários puros. GSAP e hooks de navegador são cobertos pelos testes end-to-end.
      include: ['src/lib/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/lib/motion.ts', 'src/lib/hooks.ts'],
      thresholds: { lines: 95, functions: 95, statements: 95, branches: 85 },
    },
  },
});
