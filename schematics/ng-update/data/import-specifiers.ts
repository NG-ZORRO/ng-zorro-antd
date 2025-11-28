/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface ImportSpecifierUpgradeData {
  replace: string;
  replaceWith: string;
}

const resolve = (module: string): string => `ng-zorro-antd/${module}`;

export const importSpecifiers: VersionChanges<ImportSpecifierUpgradeData> = {
  [TargetVersion.V21]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9528',
    changes: [{
      replace: resolve('water-mark'),
      replaceWith: resolve('watermark'),
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9555',
    changes: [{
      replace: resolve('core/no-animation'),
      replaceWith: resolve('core/animation'),
    }]
  }]
};
