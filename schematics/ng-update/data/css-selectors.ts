/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CssSelectorUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const cssSelectors: VersionChanges<CssSelectorUpgradeData> = {
  [TargetVersion.V21]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9238',
    changes: [{
      replace: 'nz-tabset',
      replaceWith: 'nz-tabs'
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9330',
    changes: [{
      replace: 'nz-statistic-number',
      replaceWith: 'nz-statistic-content-value'
    }]
  }]
};
