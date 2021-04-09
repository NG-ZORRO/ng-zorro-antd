import { ProjectDefinition, WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport
} from '@angular/cdk/schematics';
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
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    for (const module in modulesMap) {
      addModuleImportToApptModule(host, module, modulesMap[module],
        project, appModulePath, options);
    }

    return;
  };
}

function addModuleImportToApptModule(host: Tree, moduleName: string, src: string,
                                     project: ProjectDefinition, appModulePath: string,
                                     options: Schema): void {
  if (hasNgModuleImport(host, appModulePath, moduleName)) {
    console.log(yellow(`Could not set up "${blue(moduleName)}" ` +
      `because "${blue(moduleName)}" is already imported. Please manually ` +
      `check "${blue(appModulePath)}" file.`));
    return;
  }
  addModuleImportToRootModule(host, moduleName, src, project);
}
