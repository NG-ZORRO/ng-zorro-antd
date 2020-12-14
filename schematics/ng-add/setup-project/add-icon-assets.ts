import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import chalk from 'chalk';
import { Schema } from '../schema';

const iconPathSegment = '@ant-design/icons-angular';
const iconAssetObject = {
  'glob'  : '**/*',
  'input' : './node_modules/@ant-design/icons-angular/src/inline-svg/',
  'output': '/assets/'
};

export function addIconToAssets(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetOptions = getProjectTargetOptions(project, 'build');

    if (!targetOptions.assets) {
      targetOptions.assets = [ { ...iconAssetObject } ];
    } else {
      const assets = targetOptions.assets as Array<string | object>;
      const assetsString = JSON.stringify(assets);
      if (!assetsString.includes(iconPathSegment)) {
        assets.push({ ...iconAssetObject });
      } else {
        console.log();
        console.log(chalk.yellow(`Could not add the icon assets to the CLI project assets ` +
          `because there is already a icon assets file referenced.`));
        console.log(chalk.yellow(`Please manually add the following config to your assets:`));
        console.log(chalk.cyan(JSON.stringify(iconAssetObject, null, 2)));
        return;
      }
    }
  })
}
