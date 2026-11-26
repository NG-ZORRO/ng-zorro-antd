/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
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
