/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  getChangesForTarget,
  Migration,
  UpgradeData,
  ValueOfChanges,
  VersionChanges
} from '@angular/cdk/schematics';

import {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  cssTokens,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
  symbolRemoval,
  importSpecifiers,
  ImportSpecifierUpgradeData
} from './data';

export interface NzUpgradeData extends UpgradeData {
  importSpecifiers: VersionChanges<ImportSpecifierUpgradeData>;
}

/** Upgrade data that will be used for the NG-ZORRO ng-update schematic. */
export const nzUpgradeData: NzUpgradeData = {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  cssTokens,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
  symbolRemoval,
  importSpecifiers
};

/**
 * Gets the reduced upgrade data for the specified data key. The function reads out the
 * target version and upgrade data object from the migration and resolves the specified
 * data portion that is specifically tied to the target version.
 */
export function getVersionUpgradeData<
  T extends keyof NzUpgradeData,
  U = ValueOfChanges<NzUpgradeData[T]>,
>(migration: Migration<NzUpgradeData>, dataName: T): U[] {
  if (migration.targetVersion === null) {
    return [];
  }

  // Note that below we need to cast to `unknown` first TS doesn't infer the type of T correctly.
  return getChangesForTarget<U>(
    migration.targetVersion,
    migration.upgradeData[dataName] as unknown as VersionChanges<U>,
  );
}
