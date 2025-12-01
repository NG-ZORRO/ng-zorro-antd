/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ClassNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const classNames: VersionChanges<ClassNameUpgradeData> = {
  [TargetVersion.V21]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9238',
    changes: [{
      replace: 'NzTabsetComponent',
      replaceWith: 'NzTabsComponent'
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9285',
    changes: [{
      replace: 'NzToolTipComponent',
      replaceWith: 'NzTooltipComponent'
    }, {
      replace: 'NzToolTipModule',
      replaceWith: 'NzTooltipModule'
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9330',
    changes: [{
      replace: 'NzStatisticNumberComponent',
      replaceWith: 'NzStatisticContentValueComponent'
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9527',
    changes: [{
      replace: 'NzDropDownModule',
      replaceWith: 'NzDropdownModule'
    }, {
      replace: 'NzDropDownADirective',
      replaceWith: 'NzDropdownADirective'
    }]
  }, {
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/9528',
    changes: [{
      replace: 'NzWaterMarkModule',
      replaceWith: 'NzWatermarkModule'
    }, {
      replace: 'NzWaterMarkComponent',
      replaceWith: 'NzWatermarkComponent'
    }]
  }]
};
