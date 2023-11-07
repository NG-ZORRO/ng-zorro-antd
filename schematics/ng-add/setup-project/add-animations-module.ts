/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  getProjectFromWorkspace,
  getProjectMainFile,
  getAppModulePath,
  hasNgModuleImport,
  isStandaloneApp
} from '@angular/cdk/schematics';

import { Rule, Tree, noop } from '@angular-devkit/schematics';
import { importsProvidersFrom } from '@schematics/angular/private/components';
import { addRootImport } from '@schematics/angular/utility/standalone/rules';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { blue, yellow } from 'chalk';

import { Schema } from '../schema';

const browserAnimationsModuleName = 'BrowserAnimationsModule';
const noopAnimationsModuleName = 'NoopAnimationsModule';
const animationsModulePath = '@angular/platform-browser/animations';

export function addAnimationsModule(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);

    let hasImportBrowserAnimationsModule: boolean;
    let hasImportNoopAnimationsModule: boolean;
    
    if (isStandaloneApp(host, mainFile)) {
      hasImportBrowserAnimationsModule = importsProvidersFrom(host, mainFile, browserAnimationsModuleName);
      hasImportNoopAnimationsModule = importsProvidersFrom(host, mainFile, noopAnimationsModuleName);
    } else {
      const appModulePath = getAppModulePath(host, mainFile);
      hasImportBrowserAnimationsModule = hasNgModuleImport(host, appModulePath, browserAnimationsModuleName);
      hasImportNoopAnimationsModule = hasNgModuleImport(host, appModulePath, noopAnimationsModuleName);
    }

    if (options.animations) {
      if (hasImportNoopAnimationsModule) {
        console.log();
        console.log(yellow(`Could not set up "${blue(browserAnimationsModuleName)}" ` +
          `because "${blue(noopAnimationsModuleName)}" is already imported. Please manually ` +
          `set up browser animations.`));
        return noop();
      }
      return addRootImport(options.project, ({code, external}) => {
        return code`${external(browserAnimationsModuleName, animationsModulePath)}`;
      });
    } else if (!hasImportBrowserAnimationsModule) {
      return addRootImport(options.project, ({code, external}) => {
        return code`${external(noopAnimationsModuleName, animationsModulePath)}`;
      });
    }

    return noop();
  };
}
