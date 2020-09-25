import { Migration, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';

export class SecondaryEntryPointsRule extends Migration<UpgradeData> {
  enabled = this.targetVersion === TargetVersion.V9 || this.targetVersion === TargetVersion.V10;

  visitNode(declaration: ts.Node): void {
    if (!ts.isImportDeclaration(declaration) ||
      !ts.isStringLiteralLike(declaration.moduleSpecifier)) {
      return;
    }

    const importLocation = declaration.moduleSpecifier.text;
    if (importLocation === 'ng-zorro-antd/core') {
      this.createFailureAtNode(declaration, 'The entry-point "ng-zorro-antd/core" is remove, ' +
        'use "ng-zorro-antd/core/**" instead.');
    }

    if (importLocation === 'ng-zorro-antd') {
      this.createFailureAtNode(declaration, 'The entry-point "ng-zorro-antd" is remove, ' +
        'use "ng-zorro-antd/**" instead.');
    }

  }
}
