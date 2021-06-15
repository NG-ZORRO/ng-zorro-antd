/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport
} from '@angular/cdk/schematics';

import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { blue, yellow } from 'chalk';

import { Schema } from '../schema';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const animationsModulePath = '@angular/platform-browser/animations';

export function addAnimationsModule(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (options.animations) {
      if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
        console.log();
        return console.log(yellow(`Could not set up "${blue(browserAnimationsModuleName)}" ` +
          `because "${blue(noopAnimationsModuleName)}" is already imported. Please manually ` +
          `set up browser animations.`));
      }
      addModuleImportToRootModule(host, browserAnimationsModuleName,
        animationsModulePath, project);
    } else if (!hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
      addModuleImportToRootModule(host, noopAnimationsModuleName,
        animationsModulePath, project);
    }

    return;
  };
}
