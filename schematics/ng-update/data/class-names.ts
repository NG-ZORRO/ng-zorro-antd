/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
  [TargetVersion.V19]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/8901',
    changes: [{
      replace: 'NzInputNumberModule',
      replaceWith: 'NzInputNumberLegacyModule',
    }, {
      replace: 'NzInputNumberComponent',
      replaceWith: 'NzInputNumberLegacyComponent',
    }]
  }]
};
