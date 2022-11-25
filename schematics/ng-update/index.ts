/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { createMigrationSchematicRule, NullableDevkitMigration, TargetVersion } from '@angular/cdk/schematics';

import { Rule, SchematicContext } from '@angular-devkit/schematics';

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
import { SpaceTemplateRule } from './upgrade-rules/checks/space-template-rule';
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
  ClassNamesMigration,
  SpaceTemplateRule
];


export function updateToV15(): Rule {
  return createMigrationSchematicRule(TargetVersion.V15, migrations, ruleUpgradeData, postUpdate);
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
