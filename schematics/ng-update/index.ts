import { Rule } from '@angular-devkit/schematics';
import { createUpgradeRule, TargetVersion } from '@angular/cdk/schematics';
import chalk from 'chalk';
import { ruleUpgradeData } from './upgrade-data';
import { TooltipLikeTemplateRule } from './upgrade-rules/checks/tooltip-like-template-rule';

/** Entry point for the migration schematics with target of NG-ZORRO v7 */
export function updateToV7(): Rule {
  return createUpgradeRule(TargetVersion.V7, [TooltipLikeTemplateRule], ruleUpgradeData, postUpdate);
}

/** Entry point for the migration schematics with target of NG-ZORRO v9 */
export function updateToV9(): Rule {
  return createUpgradeRule(
    TargetVersion.V9, [TooltipLikeTemplateRule], ruleUpgradeData, postUpdate);
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
