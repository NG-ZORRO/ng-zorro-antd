import { Migration, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';

export class DropdownClassRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V9;

  visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      this._visitIdentifier(node);
    }
  }

  // tslint:disable-next-line:typedef
  private _visitIdentifier(identifier: ts.Identifier) {
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
