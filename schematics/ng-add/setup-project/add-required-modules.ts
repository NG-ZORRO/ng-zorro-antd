import { WorkspaceProject } from '@angular-devkit/core/src/workspace'
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

const modulesMap = {
  NgZorroAntdModule: 'ng-zorro-antd',
  FormsModule: '@angular/forms',
  HttpClientModule: '@angular/common/http'
};

export function addRequiredModules (options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    for (const module in modulesMap) {
      addModuleImportToApptModule(host, module, modulesMap[module],
        project, appModulePath, options);
    }

    return host;
  };
}

function addModuleImportToApptModule(host: Tree, moduleName: string, src: string,
                                     project: WorkspaceProject, appModulePath: string,
                                     options: Schema): void {
  if (hasNgModuleImport(host, appModulePath, moduleName)) {

    // TODO
    if (options.locale.includes('zh')) {
      console.warn(chalk.yellow(`无法设置 "${chalk.bold(moduleName)}" ` +
        `因为 "${chalk.bold(moduleName)}" 已经引入. 请手动 ` +
        `检查 "${chalk.bold(appModulePath)}" 文件。`));
    } else {
      console.warn(chalk.yellow(`Could not set up "${chalk.bold(moduleName)}" ` +
        `because "${chalk.bold(moduleName)}" is already imported. Please manually ` +
        `check "${chalk.bold(appModulePath)}" file.`));
    }
    return;
  }
  addModuleImportToRootModule(host, moduleName, src, project);
}
