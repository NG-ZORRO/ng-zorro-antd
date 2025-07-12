/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getExportDeclaration, getImportDeclaration } from '@angular/cdk/schematics';

import * as ts from 'typescript';

export const ngZorroModuleSpecifier = 'ng-zorro-antd';

export function isNgZorroImportDeclaration(node: ts.Node): boolean {
  return isNgZorroDeclaration(getImportDeclaration(node));
}

export function isNgZorroExportDeclaration(node: ts.Node): boolean {
  return isNgZorroDeclaration(getExportDeclaration(node));
}

function isNgZorroDeclaration(declaration: ts.ImportDeclaration | ts.ExportDeclaration): boolean {
  if (!declaration.moduleSpecifier) {
    return false;
  }

  const moduleSpecifier = declaration.moduleSpecifier.getText();
  return moduleSpecifier.indexOf(ngZorroModuleSpecifier) !== -1;
}
