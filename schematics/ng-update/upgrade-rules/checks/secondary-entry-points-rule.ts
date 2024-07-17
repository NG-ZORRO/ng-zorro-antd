/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, UpgradeData } from '@angular/cdk/schematics';

import * as ts from 'typescript';

export class SecondaryEntryPointsRule extends Migration<UpgradeData> {
  enabled = false;

  visitNode(declaration: ts.Node): void {
    if (!ts.isImportDeclaration(declaration) ||
      !ts.isStringLiteralLike(declaration.moduleSpecifier)) {
      return;
    }

    const importLocation = declaration.moduleSpecifier.text;
    if (importLocation === 'ng-zorro-antd/core') {
      this.createFailureAtNode(declaration, 'The entry-point "ng-zorro-antd/core" is removed, ' +
        'use "ng-zorro-antd/core/**" instead.');
    }

    if (importLocation === 'ng-zorro-antd') {
      this.createFailureAtNode(declaration, 'The entry-point "ng-zorro-antd" is removed, ' +
        'use "ng-zorro-antd/**" instead.');
    }

  }
}
