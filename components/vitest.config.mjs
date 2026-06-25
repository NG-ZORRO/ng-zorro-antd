import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Several legacy specs still share browser-level state through overlays,
    // viewport mocks, timers, and prototype spies. Keep files serial and
    // isolated until those specs no longer depend on global browser state.
    fileParallelism: false,
    isolate: true,
    coverage: {
      reportsDirectory: 'coverage-report',
      reporter: ['html', 'text-summary', 'lcovonly', 'cobertura']
    }
  }
});
