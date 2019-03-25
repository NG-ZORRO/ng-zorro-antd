import { Rule } from '@angular-devkit/schematics';
import { createUpgradeRule, TargetVersion, UpgradeTSLintConfig } from '@angular/cdk/schematics';
import chalk from 'chalk';
import { sync as globSync } from 'glob';
import { materialUpgradeData } from './upgrade-data';

const ruleDirectories = globSync('upgrade-rules/**/', { cwd: __dirname, absolute: true });

/** TSLint upgrade configuration that will be passed to the CDK ng-update rule. */
const tslintUpgradeConfig: UpgradeTSLintConfig = {
  upgradeData: materialUpgradeData,
  extraRuleDirectories: ruleDirectories
};

/** Entry point for the migration schematics with target of NG-ZORRO v7 */
export function updateToV7(): Rule {
  return createUpgradeRule(TargetVersion.V7, tslintUpgradeConfig);
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
