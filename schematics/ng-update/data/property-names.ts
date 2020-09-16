
import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
  [TargetVersion.V10]: [{
    pr: 'https://github.com/NG-ZORRO/ng-zorro-antd/pull/5779',
    changes: [
      {
        replace: 'nzPosition',
        replaceWith: 'nzPlacement',
        whitelist: {classes: ['NzNotificationDataOptions']}
      }
    ]
  }
  ]
};
