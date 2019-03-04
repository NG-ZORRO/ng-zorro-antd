import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [ TargetVersion.V7 ]: [
    {
      pr     : 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/2969',
      changes: [
        {
          replace    : 'nzSuffix',
          replaceWith: 'nzAddOnAfter',
          whitelist  : {
            attributes: [ 'nzSearch' ]
          }
        }
      ]
    }
  ]
};
