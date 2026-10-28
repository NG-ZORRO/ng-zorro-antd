/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
    },
    browser: {
      screenshotFailures: false
    }
  }
});
