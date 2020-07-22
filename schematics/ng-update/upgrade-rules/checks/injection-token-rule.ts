import { Migration, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { isNgZorroImportDeclaration } from "../../../utils/ng-update/module-specifiers";

export class InjectionTokenRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V9;

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

      const deprecatedTokens = ['NZ_MESSAGE_CONFIG', 'NZ_NOTIFICATION_CONFIG', 'NZ_DEFAULT_EMPTY_CONTENT', 'NZ_ICON_DEFAULT_TWOTONE_COLOR'];

      if (deprecatedTokens.indexOf(importName) !== -1) {
        this.createFailureAtNode(
          element, `Found deprecated symbol "${importName}" which has been removed. Use global config to instead please.`);
      }
    });
  }
}
