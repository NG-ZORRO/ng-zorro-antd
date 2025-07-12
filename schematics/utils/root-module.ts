/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  addDeclarationToModule,
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile
} from '@angular/cdk/schematics';

import { noop, Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { readWorkspace } from '@schematics/angular/utility';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath } from '@schematics/angular/utility/find-module';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import * as ts from 'typescript';

function readIntoSourceFile(host: Tree, modulePath: string): ts.SourceFile {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }
  const sourceText = text.toString('utf-8');

  return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
}

export function addModule(moduleName: string, modulePath: string, projectName: string): Rule {
  return async (host: Tree) => {
    const workspace = await readWorkspace(host);
    const project = getProjectFromWorkspace(workspace, projectName);
    addModuleImportToRootModule(host, moduleName, modulePath, project);
    return noop();
  };
}

export function addDeclaration(componentName: string, componentPath: string, projectName: string): Rule {
  return async (host: Tree) => {
    const workspace = await readWorkspace(host);
    const project = getProjectFromWorkspace(workspace, projectName);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));
    const source = readIntoSourceFile(host, appModulePath);
    const relativePath = buildRelativePath(appModulePath, componentPath);
    const declarationChanges = addDeclarationToModule(source, appModulePath, componentName, relativePath);
    const declarationRecorder = host.beginUpdate(appModulePath);
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    return noop();
  };
}
