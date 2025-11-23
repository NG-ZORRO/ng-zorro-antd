/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [TargetVersion.V21]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/8934',
    changes: [{
      replace: 'nzCheckBoxChange',
      replaceWith: 'nzCheckboxChange',
      limitedTo: {
        elements: ['nz-tree', 'nz-tree-node']
      }
    }, {
      replace: 'nzTreeCheckBoxChange',
      replaceWith: 'nzTreeCheckboxChange',
      limitedTo: {
        elements: ['nz-tree-select']
      }
    }]
  }]
};
