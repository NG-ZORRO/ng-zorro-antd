/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Rule, SchematicContext } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';
import { ClassNamesMigration } from './data/migrations/class-names';
import { ruleUpgradeData } from './upgrade-data';
import { CalendarTemplateRule } from './upgrade-rules/checks/calendar-input-rule';
import { CarouselTemplateRule } from "./upgrade-rules/checks/carousel-like-template-rule";
import { DateFnsCompatibleRule } from './upgrade-rules/checks/date-fns-compatible-rule';
import { DropdownClassRule } from './upgrade-rules/checks/dropdown-class-rule';
import { DropdownTemplateRule } from './upgrade-rules/checks/dropdown-template-rule';
import { FormTemplateRule } from './upgrade-rules/checks/form-template-rule';
import { GlobalConfigRule } from './upgrade-rules/checks/global-config-rule';
import { GridTemplateRule } from './upgrade-rules/checks/grid-template-rule';
import { IconTemplateRule } from './upgrade-rules/checks/icon-template-rule';
import { ModalTemplateRule } from './upgrade-rules/checks/modal-template-rule';
import { SecondaryEntryPointsRule } from './upgrade-rules/checks/secondary-entry-points-rule';
import { TableTemplateRule } from './upgrade-rules/checks/table-template-rule';
import { TabsInputRule } from './upgrade-rules/checks/tabs-input-rule';
import { TabsOutputRule } from './upgrade-rules/checks/tabs-output-rule';
import { TabsTemplateRule } from './upgrade-rules/checks/tabs-template-rule';
import { TooltipLikeTemplateRule } from './upgrade-rules/checks/tooltip-like-template-rule';

const migrations: NullableDevkitMigration[] = [
  TooltipLikeTemplateRule,
  DropdownTemplateRule,
  DropdownClassRule,
  IconTemplateRule,
  CalendarTemplateRule,
  CarouselTemplateRule,
  GlobalConfigRule,
  DateFnsCompatibleRule,
  FormTemplateRule,
  GridTemplateRule,
  TabsInputRule,
  TabsOutputRule,
  TabsTemplateRule,
  TableTemplateRule,
  ModalTemplateRule,
  SecondaryEntryPointsRule,
  ClassNamesMigration
];

/** Entry point for the migration schematics with target of NG-ZORRO v7 */
export function updateToV7(): Rule {
  return createMigrationSchematicRule(TargetVersion.V7, migrations, ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v9 */
export function updateToV9(): Rule {
  return createMigrationSchematicRule(TargetVersion.V9, migrations, ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v10 */
export function updateToV10(): Rule {
  return createMigrationSchematicRule(TargetVersion.V10, migrations, ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v11 */
export function updateToV11(): Rule {
  return createMigrationSchematicRule(TargetVersion.V11, migrations, ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v12 */
export function updateToV12(): Rule {
  return createMigrationSchematicRule(TargetVersion.V12, migrations, ruleUpgradeData, postUpdate);
}

/** Post-update schematic to be called when update is finished. */
export function postUpdate(context: SchematicContext, targetVersion: TargetVersion,
                           hasFailures: boolean): void {

  context.logger.info('');
  context.logger.info(`  ✓  Updated NG-ZORRO to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
      'output above and fix these issues manually.');
  }

}
