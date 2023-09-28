/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  isStandaloneApp
} from '@angular/cdk/schematics';

import { ProjectDefinition, WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import { addModuleImportToStandaloneBootstrap, importsProvidersFrom } from '@schematics/angular/private/components';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { blue, yellow } from 'chalk';

import { Schema } from '../schema';

const modulesMap = {
  FormsModule: '@angular/forms',
  HttpClientModule: '@angular/common/http'
};

export function addRequiredModules(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, options.project);
    const mainFile = getProjectMainFile(project);

    if (isStandaloneApp(host, mainFile)) {
      for (const module in modulesMap) {
        if (modulesMap.hasOwnProperty(module)) {
          addModuleImportToStandaloneApp(host, module, mainFile);
        }
      }
    } else {
      const mainPath = getAppModulePath(host, mainFile);
      for (const module in modulesMap) {
        if (modulesMap.hasOwnProperty(module)) {
          addModuleImportToAppModule(host, module, modulesMap[module], project, mainPath);
        }
      } 
    }
  };
}

function addModuleImportToAppModule(host: Tree, moduleName: string, src: string, project: ProjectDefinition, appModulePath: string): void {
  if (hasNgModuleImport(host, appModulePath, moduleName)) {
    console.log(yellow(`Could not set up "${blue(moduleName)}" ` +
      `because "${blue(moduleName)}" is already imported. Please manually ` +
      `check "${blue(appModulePath)}" file.`));
    return;
  }
  addModuleImportToRootModule(host, moduleName, src, project);
}

function addModuleImportToStandaloneApp(host: Tree, moduleName: string, mainPath: string): void {
  if (importsProvidersFrom(host, mainPath, moduleName)) {
    console.log(yellow(`Could not set up "${blue(moduleName)}" ` +
      `because "${blue(moduleName)}" is already imported. Please manually ` +
      `check "${blue(mainPath)}" file.`));
    return;
  }
  addModuleImportToStandaloneBootstrap(host, mainPath, moduleName, modulesMap[moduleName]);
}
