import { Rule } from '@angular-devkit/schematics';
import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';
import chalk from 'chalk';
import { ruleUpgradeData } from './upgrade-data';
import { CalendarTemplateRule } from './upgrade-rules/checks/calendar-input-rule';
import { CarouselTemplateRule } from "./upgrade-rules/checks/carousel-like-template-rule";
import { DropdownClassRule } from './upgrade-rules/checks/dropdown-class-rule';
import { DropdownTemplateRule } from './upgrade-rules/checks/dropdown-template-rule';
import { FormTemplateRule } from './upgrade-rules/checks/form-template-rule';
import { IconTemplateRule } from './upgrade-rules/checks/icon-template-rule';
import { InjectionTokenRule } from "./upgrade-rules/checks/injection-token-rule";
import { SecondaryEntryPointsRule } from './upgrade-rules/checks/secondary-entry-points-rule';
import { TooltipLikeTemplateRule } from './upgrade-rules/checks/tooltip-like-template-rule';

/** Entry point for the migration schematics with target of NG-ZORRO v7 */
export function updateToV7(): Rule {
  return createMigrationSchematicRule(TargetVersion.V7, [TooltipLikeTemplateRule], ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v9 */
export function updateToV9(): Rule {
  return createMigrationSchematicRule(
    TargetVersion.V9,
    [
      TooltipLikeTemplateRule,
      DropdownTemplateRule,
      DropdownClassRule,
      IconTemplateRule,
      CalendarTemplateRule,
      CarouselTemplateRule,
      InjectionTokenRule,
      FormTemplateRule,
      SecondaryEntryPointsRule
    ],
    ruleUpgradeData,
    postUpdate
  );
}

/** Post-update schematic to be called when update is finished. */
export function postUpdate(): Rule {
  return () => {
    console.log();
    console.log(chalk.green('  ✓  NG-ZORRO update complete'));
    console.log();
    console.log(
      chalk.yellow(
        '  ⚠  Please check the output above for any issues that were detected ' +
        'but could not be automatically fixed.'
      )
    );
  };
}
