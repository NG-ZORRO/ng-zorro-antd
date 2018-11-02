import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getWorkspace } from '../utils/devkit-utils/config';
import { getProjectTargetOptions } from '../utils/project-targets';
import { Schema } from './schema';

const ICON_ASSET_CONFIG = {
  'glob'  : '**/*',
  'input' : './node_modules/@ant-design/icons-angular/src/inline-svg/',
  'output': '/assets/'
};

export default function (options: Schema): Rule {
  return chain([
    addIconToAssets(options)
  ]);
}

function addIconToAssets(options: Schema): (host: Tree) => Tree {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetOptions = getProjectTargetOptions(project, 'build');

    if (!targetOptions.assets) {
      targetOptions.assets = [ { ...ICON_ASSET_CONFIG } ];
    } else {
      let hasIconAssetConfig = false;

      // tslint:disable-next-line
      for (let i = 0; i < targetOptions.assets.length; i++) {
        const asset = targetOptions.assets[ i ];
        if (typeof asset === 'object' && !Array.isArray(asset) && equalObjects(ICON_ASSET_CONFIG, asset)) {
          hasIconAssetConfig = true;
          break;
        }
      }

      if (!hasIconAssetConfig) {
        targetOptions.assets.push({ ...ICON_ASSET_CONFIG });
      }
    }
    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
    return host;
  };
}

function equalObjects(object: object, other: object): boolean {
  const objectKeys = Object.keys(object);
  const otherKeys = Object.keys(other);

  if (objectKeys.length !== otherKeys.length) {
    return false;
  }

  for (let i = 0; i < otherKeys.length; i++) {
    const key = objectKeys[i];
    if (!other.hasOwnProperty(key) || object[key] !== other[key]) {
      return false;
    }
  }

  return true;
}
