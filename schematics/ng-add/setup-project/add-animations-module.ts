import { Rule, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport
} from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import chalk from 'chalk';
import { Schema } from '../schema';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const animationsModulePath = '@angular/platform-browser/animations';

export function addAnimationsModule(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (options.animations) {
      if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
        console.log();
        return console.log(chalk.yellow(`Could not set up "${chalk.blue(browserAnimationsModuleName)}" ` +
          `because "${chalk.blue(noopAnimationsModuleName)}" is already imported. Please manually ` +
          `set up browser animations.`));
      }
      addModuleImportToRootModule(host, browserAnimationsModuleName,
        animationsModulePath, project);
    } else if (!hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
      addModuleImportToRootModule(host, noopAnimationsModuleName,
        animationsModulePath, project);
    }

    return host;
  };
}
