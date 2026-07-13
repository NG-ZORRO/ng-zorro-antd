/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { generate as demo2schematics } from '../schematics/demo2schematics';
import { setVersion } from '../schematics/set-version';

// Generate the schematics in the schematics directory (gulp `generate:schematics`).
demo2schematics();
setVersion();
