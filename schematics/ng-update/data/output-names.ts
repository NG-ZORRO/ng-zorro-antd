import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
  [ TargetVersion.V7 ]: [],
  [ TargetVersion.V9 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/4601',
      changes: [
        {
          replace    : 'nzOnSearchNode',
          replaceWith: 'nzSearchValueChange',
          whitelist  : {
            elements: ['nz-tree']
          }
        }
      ]
    }
  ]
};
