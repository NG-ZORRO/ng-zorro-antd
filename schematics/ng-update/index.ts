/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';

import { Rule, SchematicContext } from '@angular-devkit/schematics';

import { nzMigrations } from './migrations';
import { nzUpgradeData } from './upgrade-data';
import { nzUpgradeRules } from './upgrade-rules';

export function updateToV21(): Rule {
  return createMigrationSchematicRule(
    TargetVersion.V21,
    [...nzUpgradeRules, ...nzMigrations],
    nzUpgradeData,
    postUpdate
  );
}

/** Post-update schematic to be called when update is finished. */
export function postUpdate(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean): void {

  context.logger.info('');
  context.logger.info(`  ✓  Updated NG-ZORRO to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
      'output above and fix these issues manually.');
  }

}
