/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SymbolRemovalUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const symbolRemoval: VersionChanges<SymbolRemovalUpgradeData> = {
  [TargetVersion.V22]: [
    {
      pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/XXXXX',
      changes: [
        {
          module: 'ng-zorro-antd/core/time',
          name: 'provideNzDateAdapter',
          message: 'Moved to NzDateAdapter class. Use provideNzDateFnsAdapter or provideNzNativeDateAdapter instead.'
        }
      ]
    }
  ]
};
