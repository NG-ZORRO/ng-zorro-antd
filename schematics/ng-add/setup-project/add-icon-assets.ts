import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import chalk from 'chalk';
import { Schema } from '../schema';

const iconPathSegment = '@ant-design/icons-angular';
const iconAssetObject = {
  'glob'  : '**/*',
  'input' : './node_modules/@ant-design/icons-angular/src/inline-svg/',
  'output': '/assets/'
};

export function addIconToAssets(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetOptions = getProjectTargetOptions(project, 'build');

    if (!targetOptions.assets) {
      targetOptions.assets = [ { ...iconAssetObject } ];
    } else {
      const assets = targetOptions.assets as Array<string | object>;
      const assetsString = JSON.stringify(assets);
      if (!assetsString.includes(iconPathSegment)) {
        assets.push({...iconAssetObject});
      } else {
        // TODO
        if (options.locale.includes('zh')) {
          console.warn(chalk.red(`无法将图标(icon)资源添加到 CLI 配置下的 assets 中`));
          console.warn(chalk.red(`请手动将以下配置添加到项目 ${chalk.bold('angular.json')} 下的 assets 字段:`));
          console.warn(chalk.yellow(`${chalk.bold(JSON.stringify(iconAssetObject, null, 2))}`));
        } else {
          console.warn(chalk.red(`Could not add the icon assets to the CLI project assets ` +
            `because there is already a icon assets file referenced.`));
          console.warn(chalk.red(`Please manually add the following config to your assets:`));
          console.warn(chalk.yellow(`${chalk.bold(JSON.stringify(iconAssetObject, null, 2))}`));
        }
        return host;
      }
    }
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
    return host;
  };
}
