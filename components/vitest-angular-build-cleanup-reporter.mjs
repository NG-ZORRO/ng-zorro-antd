import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default class AngularBuildCleanupReporter {
  onTestRunEnd() {
    // Angular's unit-test builder keeps esbuild's service alive after Vitest
    // finishes in this browser setup. Stop it explicitly so `npm test` exits.
    const esbuildPath = require.resolve('esbuild', { paths: [require.resolve('@angular/build')] });
    require(esbuildPath).stop();
  }
}
