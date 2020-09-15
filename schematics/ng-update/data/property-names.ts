
import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
  [TargetVersion.V10]: [{
    pr: '',
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
