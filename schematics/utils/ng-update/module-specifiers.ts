import { getExportDeclaration, getImportDeclaration } from '@angular/cdk/schematics';
import * as ts from 'typescript';

export const ngZorroModuleSpecifier = 'ng-zorro-antd';

export function isNgZorroImportDeclaration(node: ts.Node): boolean {
  return isNgZorroDeclaration(getImportDeclaration(node));
}

export function isNgZorroExportDeclaration(node: ts.Node): boolean {
  return isNgZorroDeclaration(getExportDeclaration(node));
}

function isNgZorroDeclaration(declaration: ts.ImportDeclaration|ts.ExportDeclaration): boolean {
  if (!declaration.moduleSpecifier) {
    return false;
  }

  const moduleSpecifier = declaration.moduleSpecifier.getText();
  return moduleSpecifier.indexOf(ngZorroModuleSpecifier) !== -1
}
