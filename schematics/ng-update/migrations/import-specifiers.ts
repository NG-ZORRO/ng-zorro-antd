/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration } from '@angular/cdk/schematics';

import * as ts from 'typescript';

import { isNgZorroImportDeclaration } from '../../utils/ng-update/module-specifiers';
import { ImportSpecifierUpgradeData } from '../data';
import { getVersionUpgradeData, NzUpgradeData } from '../upgrade-data';

export class ImportSpecifiersMigration extends Migration<NzUpgradeData> {
  /** Change data that upgrades to the specified target version. */
  data: ImportSpecifierUpgradeData[] = getVersionUpgradeData(this, 'importSpecifiers');


  // Only enable the migration rule if there is upgrade data.
  enabled: boolean = this.data.length !== 0;

  visitNode(node: ts.Node): void {
    if (ts.isImportDeclaration(node)) {
      this.visitImportDeclaration(node);
    }
  }

  private visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (isNgZorroImportDeclaration(node)) {
      return this._createFailureWithReplacement(node);
    }
  }

  /** Creates a failure and replacement for the specified identifier. */
  private _createFailureWithReplacement(identifier: ts.ImportDeclaration): void {
    const upgradeData = this.data.find(({ replace }) => identifier.moduleSpecifier.getText().indexOf(replace) !== -1)!;

    if (upgradeData) {
      const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);

      this.fileSystem.edit(filePath)
        .remove(identifier.moduleSpecifier.getStart() + 1, identifier.moduleSpecifier.getWidth() - 2) // quotes
        .insertRight(identifier.moduleSpecifier.getStart() + 1, upgradeData.replaceWith);
    }
  }
}
