import { ConstructorChecksUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

/**
 * List of class names for which the constructor signature has been changed. The new constructor
 * signature types don't need to be stored here because the signature will be determined
 * automatically through type checking.
 */
export const constructorChecks: VersionChanges<ConstructorChecksUpgradeData> = {
  [ TargetVersion.V7 ]: [ ]
};
