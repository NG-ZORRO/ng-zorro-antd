/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { generate } from '../prerender/ngsw-config';

// Regenerate the ngsw-config to fix https://github.com/angular/angular/issues/23613 (gulp `site:regen-ngsw-config`).
generate().catch(error => {
  console.error(error);
  process.exit(1);
});
