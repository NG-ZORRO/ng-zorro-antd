/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, UpgradeData } from '@angular/cdk/schematics';

import * as ts from 'typescript';

import { isNgZorroImportDeclaration } from "../../../utils/ng-update/module-specifiers";

export abstract class InjectionTokenRule extends Migration<UpgradeData> {
  abstract tokens: string[];

  visitNode(node: ts.Node): void {
    if (ts.isImportDeclaration(node)) {
      this._visitImportDeclaration(node);
    }
  }

  private _visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (!isNgZorroImportDeclaration(node) || !node.importClause ||
      !node.importClause.namedBindings) {
      return;
    }

    const namedBindings = node.importClause.namedBindings;

    if (ts.isNamedImports(namedBindings)) {
      this._checkInjectionToken(namedBindings);
    }
  }

  private _checkInjectionToken(namedImports: ts.NamedImports): void {
    namedImports.elements.filter(element => ts.isIdentifier(element.name)).forEach(element => {
      const importName = element.name.text;

      if (this.tokens.indexOf(importName) !== -1) {
        this.createFailureAtNode(
          element, this.getFailure(importName));
      }
    });
  }

  abstract getFailure(token: string): string;
}
