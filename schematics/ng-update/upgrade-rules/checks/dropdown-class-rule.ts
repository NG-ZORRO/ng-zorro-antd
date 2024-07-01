/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, UpgradeData } from '@angular/cdk/schematics';

import * as ts from 'typescript';

export class DropdownClassRule extends Migration<UpgradeData> {

  enabled = false;

  visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      this._visitIdentifier(node);
    }
  }

  private _visitIdentifier(identifier: ts.Identifier): void {
    if (identifier.getText() === 'NzDropdownContextComponent') {
      this.createFailureAtNode(
        identifier,
        `Found "NzDropdownContextComponent" which has been removed. Your code need to be updated.`);
    }

    if (identifier.getText() === 'NzDropdownService') {
      this.createFailureAtNode(
        identifier,
        `Found usage of "NzDropdownService" which has been removed. Please use "NzContextMenuService" instead.`);
    }
  }
}
